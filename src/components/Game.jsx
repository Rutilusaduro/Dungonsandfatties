import { useState, useEffect } from 'react';
import TextDisplay from './TextDisplay';
import CharacterPanel from './CharacterPanel';
import SpellCaster from './SpellCaster';
import ZoneDisplay from './ZoneDisplay';
import NPCInteraction from './NPCInteraction';
import CharacterCreation from './CharacterCreation';
import GameState from '../game/GameState';
import Character from '../game/Character';
import TextEngine from '../engine/TextEngine';
import SpellLibrary from '../game/magic/SpellLibrary';
import SpellNarrator from '../game/magic/SpellNarrator';
import SpellResolver from '../game/magic/SpellResolver';
import { getTextEngine } from '../textEngine/index.js';
import { RESTRAINT_MATERIAL } from '../game/conditions/ActiveConditions.js';
import { applyPreRestSharing } from '../game/mechanics/NutritionSystem.js';
import { applyFeastExile } from '../game/mechanics/SwellSystem.js';
import World from '../game/world/World';
import CLASS_REGISTRY from '../game/classes/ClassRegistry.js';
import { optionSlotCost } from '../game/magic/slotUtils.js';
import EquipmentPanel from './EquipmentPanel';
import LevelUpPanel from './LevelUpPanel';
import { ITEMS } from '../game/items/Equipment.js';
import { awardXP, applyLevelBonus, levelUpChoices, xpToNextLevel } from '../game/mechanics/ProgressionSystem.js';
import CombatScreen from './CombatScreen';
import { DungeonState } from '../game/dungeon/DungeonState.js';
import { Combat, fillUp, checkWinState, actionsAvailable } from '../game/combat/Combat.js';
import { controllerFor } from '../game/combat/EnemyController.js';
import { saveGame, loadGame, hasSave, clearSave } from '../game/SaveSystem.js';

// Persist lingering spell conditions onto a target so the text engine narrates
// them afterward (examine, dialogue, body.desc) and future spells can react.
function applySpellConditions(spell, target, selectedOption) {
  if (!target) return;
  const spellKey = spell.name.toLowerCase().replace(/ /g, '_');
  const optionName = selectedOption?.name || '';
  const tags = spell.tags || [];

  // Recent-spell memory (drives combo / on-conditioned narration).
  if (!Array.isArray(target.spellAffects)) target.spellAffects = [];
  target.spellAffects.push(spellKey);
  if (target.spellAffects.length > 6) target.spellAffects.shift();

  if (tags.includes('restraint') || tags.includes('paralysis')) {
    target.restrainedBy = spellKey;
    const suspension = optionName === 'Ceiling Suspension' ? 'ceiling' : null;
    if (suspension) target.suspensionState = suspension;
    const material = RESTRAINT_MATERIAL[spellKey] || 'magic';
    target.conditions?.add('restrained', { source: spellKey, material, suspension });
  }
  if (
    (spellKey === 'erupting_earth' && optionName === 'Bury') ||
    (spellKey === 'shape_earth' && optionName === 'Bury Target')
  ) {
    target.conditions?.add('buried', { depth: target.buriedDepth || 1 });
  }
  if (spellKey === 'rapid_digestion') {
    target.isFullness = true;
    target.conditions?.add('satiated', {});
  }
  if (spellKey === 'polymorph') {
    target.conditions?.add('enlarged', {});
  }
  if (spellKey === 'ravenous_expansion') {
    target.conditions?.add('ravenous', {});
  }
}

const Game = () => {
  const [gameState] = useState(() => new GameState());
  const [textEngine] = useState(() => new TextEngine());
  const [spellLibrary] = useState(() => new SpellLibrary());
  const [world] = useState(() => World.createSampleWorld());

  const [gameStarted, setGameStarted] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [textBuffer, setTextBuffer] = useState([]);
  const [selectedNPC, setSelectedNPC] = useState(null);
  const [knownSpells, setKnownSpells] = useState(null);
  const [levelUpState, setLevelUpState] = useState(null); // { level, choices }
  const [dungeon, setDungeon] = useState(null);        // DungeonState instance
  const [combatState, setCombatState] = useState(null); // { combat, enemies, round, status, log }
  const [savedRunExists] = useState(() => hasSave());

  // Autosave: persist the run whenever progress-bearing state changes.
  // Combat isn't restored (enemies respawn on resume) so we don't save combatState itself.
  useEffect(() => {
    if (!gameStarted) return;
    const player = gameState.getPlayer();
    if (player) saveGame({ player, dungeon, knownSpells });
  }, [gameStarted, dungeon, knownSpells, combatState, levelUpState]);

  // Resume a saved run.
  const resumeGame = () => {
    const run = loadGame();
    if (!run) return;
    gameState.setPlayer(run.player);
    setKnownSpells(run.knownSpells);
    setDungeon(run.dungeon);
    textEngine.clearBuffer();
    textEngine.addText(`Welcome back, ${run.player.name}.`);
    textEngine.addText('Your run resumes where you left it.');
    setTextBuffer(textEngine.getBuffer());
    setCurrentZone(world.getCurrentZone());
    setGameStarted(true);
  };

  // Initialize game
  const startGame = (playerName, classKey) => {
    const classDef = CLASS_REGISTRY[classKey];
    if (!classDef) throw new Error(`Unknown class: ${classKey}`);
    clearSave(); // fresh run abandons any prior save
    const character = new Character(playerName, {
      race: 'Human',
      class: classKey,
      baseWeight: classDef.baseWeight,
      spellSlots: { ...classDef.spellSlots },
    });
    setKnownSpells(new Set(classDef.startingSpells));

    // Starting gear by class offhand type
    const startingGear = {
      shield: ITEMS.divine_platter,
      tome:   ITEMS.gluttons_tome,
      focus:  ITEMS.hunger_focus,
    };
    const startWeapon = ITEMS.feeding_fork;
    character.equip(startWeapon);
    const offhand = startingGear[classDef.offHand];
    if (offhand) character.equip(offhand);

    gameState.setPlayer(character);
    textEngine.clearBuffer();

    // Add initial message
    textEngine.addText(`Welcome, ${playerName}!`);
    textEngine.addText('You find yourself in The Bloated Boar Tavern...');
    textEngine.addText('Barkeep Boris leans across the bar, voice hushed: "Listen close, adventurer. There\'s a dungeon beneath this very tavern — three floors of cursed kitchens, haunted feasting halls, and the Grand Gourmand himself at the bottom. Sealed himself in there centuries ago and never stopped eating. Every soul who went down came back changed, if they came back at all. Trapdoor\'s behind the staircase. Use the \'Enter Dungeon\' button when you\'re ready. Don\'t say I didn\'t warn you."')
    setTextBuffer(textEngine.getBuffer());

    // Set starting zone
    const startingZone = world.getCurrentZone();
    setCurrentZone(startingZone);

    setGameStarted(true);
  };

  const addEntry = (text, type) => textEngine.addText(text, type ? { type } : {});

  const handleCastSpell = ({ spell, target, secondaryTarget, zone, selectedOption }) => {
    if (!spell || !zone) return;

    const caster = gameState.getPlayer();
    if (!caster) return;

    const slotLevel = optionSlotCost(spell, selectedOption);
    const available = caster.spellSlots[slotLevel] ?? 0;
    if (available <= 0) {
      addEntry(`— ${spell.name} —`, 'divider');
      addEntry(`No level ${slotLevel} spell slots remaining. Long rest to restore.`, 'error');
      setTextBuffer(textEngine.getBuffer());
      return;
    }
    caster.spellSlots[slotLevel] -= 1;

    const { result } = SpellResolver.cast({ spell, caster, target, secondaryTarget, zone, selectedOption });

    // Append to history (no clearBuffer) — add a divider to separate actions.
    addEntry(`— ${spell.name}${selectedOption ? ` (${selectedOption.name})` : ''} —`, 'divider');

    if (result.success) {
      // Single cohesive scene narrative
      const scene = SpellNarrator.narrateSpellScene(spell, caster, target, selectedOption);
      addEntry(scene);

      if (result.interactions?.length > 0) {
        result.interactions.forEach(interaction => {
          let interactionText = '';
          if (interaction.moduleKey && target?._createContext) {
            const engine = getTextEngine();
            interactionText = engine.render(
              interaction.moduleKey,
              target._createContext({
                ref: caster,
                globals: {
                  spell: spell.name.toLowerCase().replace(/ /g, '_'),
                  recentSpells: target.spellAffects || [],
                },
              }),
            );
          }
          const text = interactionText || interaction.description;
          if (text) addEntry(text, 'synergy');
        });
      }

      if (result.environmentalChanges?.length > 0) {
        result.environmentalChanges.forEach(change => {
          if (change.description) addEntry(change.description, 'info');
        });
      }

      if (result.createdFoods?.length > 0) {
        const foodNames = result.createdFoods.map(food => food.name).join(', ');
        addEntry(`${foodNames} ${result.createdFoods.length === 1 ? 'appears' : 'appear'} here.`, 'info');
      }

      if (result.summonedCreatures?.length > 0) {
        const creatureNames = result.summonedCreatures.map(c => c.name).join(', ');
        addEntry(`${creatureNames} ${result.summonedCreatures.length === 1 ? 'arrives' : 'arrive'}.`, 'info');
      }

      const totalImmediateWeightGain = SpellResolver.totalImmediateWeightGain(result);
      const totalCaloriesLogged = SpellResolver.totalCaloriesLogged(result);

      // Knowledge spells (Detect Cravings) surface revealed preferences as text.
      const knowledgeEffect = result.effects.find(e => e.type === 'knowledge_gained');
      if (knowledgeEffect && target) {
        const parts = [];
        if (knowledgeEffect.loves?.length) parts.push(`Loves: ${knowledgeEffect.loves.join(', ')}`);
        if (knowledgeEffect.likes?.length) parts.push(`Likes: ${knowledgeEffect.likes.join(', ')}`);
        if (knowledgeEffect.dislikes?.length) parts.push(`Dislikes: ${knowledgeEffect.dislikes.join(', ')}`);
        if (parts.length) addEntry(parts.join(' • '), 'info');
      }

      // NPC reactions (weight gain + restraint status)
      if (target && target._createContext) {
        if (totalImmediateWeightGain > 0) {
          if (target.suspensionState === 'ceiling') {
            const engine = getTextEngine();
            const suspendedScene = engine.render('spell.weight_gain.suspended', target._createContext());
            if (suspendedScene) addEntry(suspendedScene);
          } else {
            const weightReaction = SpellNarrator.triggerNPCReactions(target, 'weight_gain', totalImmediateWeightGain);
            if (weightReaction) addEntry(weightReaction);
          }
        }

        // Show pending rest gain only if the spell fed the target (not for restraints etc.)
        if (totalCaloriesLogged > 0 && totalImmediateWeightGain === 0) {
          const pendingGain = target.pendingWeightGain || 0;
          if (pendingGain > 0) addEntry(`${target.name} will gain an estimated +${pendingGain} lbs after rest.`, 'info');
        }

        applySpellConditions(spell, target, selectedOption);

        const isRestraintSpell = spell.tags && (
          spell.tags.includes('restraint') || spell.tags.includes('paralysis')
        );
        if (isRestraintSpell) {
          const restraintReaction = SpellNarrator.triggerNPCReactions(target, 'restrained');
          if (restraintReaction) addEntry(restraintReaction);
        }
      }
    } else {
      addEntry(result.message, 'error');
    }

    setTextBuffer(textEngine.getBuffer());
  };

  const handleLongRest = () => {
    if (!currentZone) return;

    const player = gameState.getPlayer();
    const restTargets = [
      player,
      ...currentZone.getNPCs(),
      ...currentZone.getCreatures(),
    ].filter(Boolean);

    addEntry('— Long Rest —', 'divider');
    addEntry('The day\'s meals and magic settle into lasting changes.');

    // Restore spell slots
    if (player) player.spellSlots = { ...player.maxSpellSlots };

    const sharingNotes = applyPreRestSharing(restTargets, currentZone);
    sharingNotes.forEach(note => addEntry(note, 'info'));

    const exileNotes = applyFeastExile(restTargets);
    exileNotes.forEach(note => addEntry(note, 'info'));

    const summaries = restTargets
      .filter(entity => !entity.isExiled)
      .map(entity => ({ entity, result: entity.processLongRestNutrition?.() }))
      .filter(({ result }) => result && (result.rawCalories > 0 || result.weightGain > 0));

    if (summaries.length === 0) {
      addEntry('No one has eaten enough today for the rest to change their weight.', 'info');
    }

    summaries.forEach(({ entity, result }) => {
      if (result.weightGain > 0 && entity._createContext) {
        const reaction = SpellNarrator.triggerNPCReactions(entity, 'weight_gain', result.weightGain);
        if (reaction) addEntry(reaction);
        else addEntry(`${entity.name} gains +${result.weightGain} lbs.`);
      } else if (result.rawCalories > 0) {
        addEntry(`${entity.name} ate today but doesn't gain weight yet.`, 'info');
      }
    });

    setTextBuffer(textEngine.getBuffer());
  };

  const handleZoneAction = ({ type, direction }) => {
    if (type === 'move') {
      const nextZone = world.moveToZone(direction);
      if (nextZone) {
        setCurrentZone(nextZone);
        addEntry(`— You move ${direction} —`, 'divider');
        addEntry(nextZone.description);
        setTextBuffer(textEngine.getBuffer());
      }
    }
  };

  const handleNPCInteract = (npc) => {
    setSelectedNPC(npc);
  };

  const handleNPCAction = ({ type, npc, dialogue, description }) => {
    textEngine.clearBuffer();

    if (type === 'talk') {
      textEngine.addText(`${npc}:`);
      textEngine.addText(dialogue);
    } else if (type === 'examine') {
      textEngine.addText(description);
    }

    setTextBuffer(textEngine.getBuffer());
  };

  const handleCloseNPC = () => {
    setSelectedNPC(null);
  };

  const handleEquip = (item, invIndex) => {
    const player = gameState.getPlayer();
    if (!player) return;
    const result = player.equip(item);
    if (!result.ok) return;
    player.inventory.splice(invIndex, 1);
    if (result.replaced) player.inventory.push(result.replaced);
    setTextBuffer(textEngine.getBuffer()); // force re-render
  };

  const handleUnequip = (slot) => {
    const player = gameState.getPlayer();
    if (!player) return;
    const item = player.unequip(slot);
    if (item) player.inventory.push(item);
    setTextBuffer(textEngine.getBuffer());
  };

  const gainXP = (amount) => {
    const player = gameState.getPlayer();
    if (!player) return;
    const { leveledUp, newLevel } = awardXP(player, amount);
    addEntry(`+${amount} XP`, 'info');
    if (leveledUp) {
      const choices = levelUpChoices(player, knownSpells);
      setLevelUpState({ level: newLevel, choices });
    }
    setTextBuffer(textEngine.getBuffer());
  };

  const handleLevelUpChoice = (spellName) => {
    const player = gameState.getPlayer();
    applyLevelBonus(player);
    if (spellName) {
      setKnownSpells(prev => new Set([...(prev || []), spellName]));
      addEntry(`— Level ${player.level} —`, 'divider');
      addEntry(`You learned ${spellName}!`);
    }
    setLevelUpState(null);
    setTextBuffer(textEngine.getBuffer());
  };

  // ── Dungeon / Combat ─────────────────────────────────────────

  const handleEnterDungeon = () => {
    const player = gameState.getPlayer();
    if (!player) return;
    const ds = new DungeonState();
    const enemies = ds.spawnEnemies();
    const combat = new Combat([
      { entity: player, initiative: 10 },
      ...enemies.map(e => ({ entity: e, initiative: 5 })),
    ]);
    setDungeon(ds);
    setCombatState({ combat, enemies, round: 1, status: 'active', log: [`${enemies[0]?.name} appears!`] });
  };

  const doCombatPlayerAction = (actionFn) => {
    setCombatState(prev => {
      if (!prev || prev.status !== 'active') return prev;
      const player = gameState.getPlayer();
      if (!player) return prev;
      const { combat, enemies } = prev;
      const enemy = enemies[0];
      const newLog = [...prev.log];

      // Player action
      const msg = actionFn(player, enemy);
      if (msg) newLog.push(msg);

      // Check enemy defeat after player action
      const enemyDefeated = checkWinState(enemy);
      if (enemyDefeated) {
        newLog.push(`${enemy.name} is defeated!`);
        return { ...prev, round: prev.round + 1, status: 'won', log: newLog.slice(-8) };
      }

      // Enemy turn
      const selfPos = combat.combatants.find(c => c.entity === enemy);
      const oppPos  = combat.combatants.find(c => c.entity === player);
      const actions = actionsAvailable(enemy);
      const ctrl = controllerFor(enemy._trait);
      ctrl({ self: enemy, opponent: player, selfPos, oppPos, actions, combat });
      newLog.push(`${enemy.name} retaliates.`);

      // Per-round fullness drain (mirrors Combat.nextRound drainRate=0.1).
      // Player's feedCling makes the ENEMY drain less, so feeding sticks.
      const enemyDrain = 0.1 * (1 - player.feedClingFactor);
      for (const [e, rate] of [[player, 0.1], [enemy, enemyDrain]]) {
        const cap = e.stomachCapacity || 0;
        if (cap) e.fullness = Math.max(0, (e.fullness || 0) - cap * rate);
      }

      // Check player defeat
      const playerDefeated = checkWinState(player);
      if (playerDefeated) {
        newLog.push('You have been overwhelmed!');
        return { ...prev, round: prev.round + 1, status: 'lost', log: newLog.slice(-8) };
      }

      return { ...prev, round: prev.round + 1, log: newLog.slice(-8) };
    });
  };

  const handleCombatCastSpell = (spell) => {
    doCombatPlayerAction((player, enemy) => {
      const lvl = spell.level ?? 1;
      const cost = lvl <= 1 ? 1 : lvl <= 3 ? 2 : 3;
      if ((player.spellSlots[cost] ?? 0) <= 0) return `No L${cost} slots — ${spell.name} fizzles.`;
      player.spellSlots[cost] -= 1;
      const pct = cost === 1 ? 0.20 : cost === 2 ? 0.35 : 0.50;
      fillUp(enemy, pct * (enemy.stomachCapacity || 100) * (player.feedBonusMultiplier || 1));
      return `You cast ${spell.name} on ${enemy.name}.`;
    });
  };

  const handleForceFeed = () => {
    doCombatPlayerAction((player, enemy) => {
      fillUp(enemy, 0.15 * (enemy.stomachCapacity || 100) * (player.feedBonusMultiplier || 1));
      return `You force-feed ${enemy.name}.`;
    });
  };

  const handleFlee = () => {
    setCombatState(null);
    setDungeon(null);
    addEntry('— Fled —', 'divider');
    addEntry('You escape into the shadows, heart pounding.');
    setTextBuffer(textEngine.getBuffer());
  };

  const handleCombatContinue = () => {
    if (!combatState || !dungeon) return;
    const { enemies, status } = combatState;

    if (status === 'won') {
      const enemy = enemies[0];
      if (enemy.bossEvent) addEntry(enemy.bossEvent);

      // Advance dungeon + spawn next BEFORE gainXP so level-up modal doesn't race
      const { loot, floorComplete, dungeonComplete } = dungeon.advance(enemies);
      const player = gameState.getPlayer();
      loot.forEach(item => player.inventory.push(item));
      if (loot.length) addEntry(`Loot: ${loot.map(i => i.name).join(', ')}.`, 'info');

      if (dungeonComplete) {
        addEntry('— Dungeon Cleared! —', 'divider');
        addEntry('You have conquered the dungeon. A legend is born.');
        setCombatState(null);
        setDungeon(null);
        clearSave(); // run finished — don't resurrect it
      } else {
        if (floorComplete) addEntry(`Floor complete! Entering ${dungeon.currentFloor?.name || 'next floor'}.`);
        const nextEnemies = dungeon.spawnEnemies();
        const nextCombat = new Combat([
          { entity: player, initiative: 10 },
          ...nextEnemies.map(e => ({ entity: e, initiative: 5 })),
        ]);
        setCombatState({ combat: nextCombat, enemies: nextEnemies, round: 1, status: 'active', log: [`${nextEnemies[0]?.name} appears!`] });
      }
      gainXP(enemy.xpValue || 100);
    } else {
      // lost — retreat
      setCombatState(null);
      setDungeon(null);
      addEntry('— Defeated —', 'divider');
      addEntry('You retreat, licking your wounds.');
    }
    setTextBuffer(textEngine.getBuffer());
  };

  if (!gameStarted) {
    return <CharacterCreation onStart={startGame} onResume={savedRunExists ? resumeGame : null} />;
  }

  const player = gameState.getPlayer();
  const availableTargets = currentZone
    ? [...currentZone.getCreatures(), ...currentZone.getNPCs()]
    : [];

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.primaryPanel}>
          <TextDisplay textBuffer={textBuffer} />
          <div style={styles.actionBar}>
            <button onClick={handleLongRest} style={styles.restButton}>
              Long Rest
            </button>
            {!combatState && (
              <button onClick={handleEnterDungeon} style={styles.dungeonButton}>
                Enter Dungeon
              </button>
            )}
          </div>
          {currentZone && (
            <div style={styles.zoneSection}>
              <ZoneDisplay
                zone={currentZone}
                onZoneAction={handleZoneAction}
                onNPCInteract={handleNPCInteract}
              />
            </div>
          )}
        </div>

        <aside style={styles.sidebar}>
          <div style={styles.panelSection}>
            {player && <CharacterPanel character={player} />}
          </div>

          <div style={styles.panelSection}>
            <EquipmentPanel
              character={player}
              onEquip={handleEquip}
              onUnequip={handleUnequip}
            />
          </div>

          <div style={styles.panelSection}>
            <SpellCaster
              spellLibrary={spellLibrary}
              knownSpells={knownSpells}
              availableTargets={availableTargets}
              onCastSpell={handleCastSpell}
              currentZone={currentZone}
              playerStats={player ? {
                currentWeight: player.currentWeight,
                baseWeight: player.baseWeight,
                gravity: player.gravity,
                caloriesEatenToday: player.caloriesEatenToday,
                conditions: player.conditions?.keys?.() || [],
                spellSlots: { ...player.spellSlots },
                maxSpellSlots: { ...player.maxSpellSlots },
              } : null}
            />
          </div>
        </aside>
      </div>

      {selectedNPC && (
        <NPCInteraction
          npc={selectedNPC}
          onClose={handleCloseNPC}
          onAction={handleNPCAction}
        />
      )}

      {levelUpState && (
        <LevelUpPanel
          level={levelUpState.level}
          choices={levelUpState.choices}
          onChoose={handleLevelUpChoice}
        />
      )}

      {combatState && (
        <CombatScreen
          player={player}
          enemies={combatState.enemies}
          round={combatState.round}
          status={combatState.status}
          combatLog={combatState.log}
          knownSpells={knownSpells}
          spellLibrary={spellLibrary}
          playerStats={{ actionsLeft: actionsAvailable(player), spellSlots: player.spellSlots, maxSpellSlots: player.maxSpellSlots }}
          onCastSpell={handleCombatCastSpell}
          onForceFeed={handleForceFeed}
          onFlee={handleFlee}
          onContinue={handleCombatContinue}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    fontFamily: 'Georgia, serif',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  primaryPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #333',
    overflowY: 'auto',
  },
  zoneSection: {
    maxHeight: '50%',
    borderTop: '1px solid #333',
    overflowY: 'auto',
  },
  sidebar: {
    width: '320px',
    overflowY: 'auto',
    backgroundColor: '#0a0a0a',
    borderLeft: '1px solid #333',
    display: 'flex',
    flexDirection: 'column',
  },
  panelSection: {
    borderBottom: '1px solid #333',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    padding: '10px 14px',
    borderTop: '1px solid #333',
    borderBottom: '1px solid #333',
    backgroundColor: '#121212',
  },
  restButton: {
    padding: '8px 14px',
    backgroundColor: '#4a6a2a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  dungeonButton: {
    padding: '8px 14px',
    backgroundColor: '#6a2a2a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Game;
