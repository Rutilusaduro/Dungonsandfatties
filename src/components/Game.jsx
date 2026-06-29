import { useState, useEffect, useRef } from 'react';
import TextDisplay from './TextDisplay';
import CharacterPanel from './CharacterPanel';
import SpellCaster from './SpellCaster';
import LocationView from './LocationView';
import { zoneToLocation, roomToLocation } from '../game/discovery/locationAdapter.js';
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
import { Combat, fillUp, fattenUp, checkFatPhase, isFatDefeated, checkWinState, actionsAvailable, canReach, lineOfSight, move as moveCombatant, distance } from '../game/combat/Combat.js';
import { FAT_THRESHOLD, FATTEN_PCT } from '../game/mechanics/Balance.js';
import { controllerFor } from '../game/combat/EnemyController.js';
import { saveGame, loadGame, hasSave, clearSave } from '../game/SaveSystem.js';
import { Discovery, idOf } from '../game/discovery/Discovery.js';

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

// Combat field dimensions (cells are 0-indexed). 5 wide x 3 tall.
const FIELD = { maxX: 4, maxY: 2 };

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
  const [dungeonTick, setDungeonTick] = useState(0);   // bump to re-render after in-place room mutation
  const [combatState, setCombatState] = useState(null); // { combat, enemies, round, status, log }
  const [floorWeights, setFloorWeights] = useState(new Map()); // enemyName → currentWeight, cleared on floor change
  const bossPhaseRef = useRef({}); // enemyId → highestPhaseReached (ref so it's accessible inside functional updaters)
  const [savedRunExists] = useState(() => hasSave());
  const [discovery, setDiscovery] = useState(() => new Discovery()); // fog-of-war: what you've seen
  const [discoveryTick, setDiscoveryTick] = useState(0); // bump to force re-render after reveal

  // All discoverable things present in a zone, with their entity refs.
  const zonePresent = (zone) => [
    ...(zone.getNPCs?.() || []),
    ...(zone.getCreatures?.() || []),
    ...(zone.getEnvironmentalObjects?.() || []),
    ...(zone.getFoods?.() || []),
  ];

  const findEntity = (zone, id) => zonePresent(zone).find(e => idOf(e) === id) || null;

  // "Look around": reveal everything present and narrate what you notice.
  const handleLookAround = () => {
    if (!currentZone) return;
    const present = zonePresent(currentZone);
    const before = discovery.forLocation(currentZone.id).size;
    discovery.revealAll(currentZone.id, present);
    const after = discovery.forLocation(currentZone.id).size;
    addEntry('— You look around —', 'divider');
    if (present.length === 0) {
      addEntry('Nothing here but you and the quiet.');
    } else if (after === before) {
      addEntry('You\'ve already taken in everything here.', 'info');
    } else {
      const names = present.map(e => e.name).join(', ');
      addEntry(`You take in your surroundings. You notice: ${names}.`);
    }
    setDiscoveryTick(t => t + 1);
    setTextBuffer(textEngine.getBuffer());
  };

  // "Examine X": render the entity's detailed description into the log.
  const handleExamine = (row) => {
    const entity = currentZone && findEntity(currentZone, row.id);
    if (!entity) return;
    addEntry(`— You examine ${entity.name} —`, 'divider');
    const detail = entity.examine?.() || entity.description || `${entity.name}. Nothing more to note.`;
    addEntry(detail);
    setTextBuffer(textEngine.getBuffer());
  };

  // "Talk to X" from the location list → existing NPC flow (still fog-gated).
  const handleTalkRow = (row) => {
    const npc = currentZone && findEntity(currentZone, row.id);
    if (npc) handleNPCInteract(npc);
  };

  // Arrive blind: entering a zone reveals nothing until you "Look around".

  // Autosave: persist the run whenever progress-bearing state changes.
  // Combat isn't restored (enemies respawn on resume) so we don't save combatState itself.
  useEffect(() => {
    if (!gameStarted) return;
    const player = gameState.getPlayer();
    if (player) saveGame({ player, dungeon, knownSpells, discovery: discovery.serialize() });
  }, [gameStarted, dungeon, knownSpells, combatState, levelUpState, discoveryTick, dungeonTick]);

  // Resume a saved run.
  const resumeGame = () => {
    const run = loadGame();
    if (!run) return;
    gameState.setPlayer(run.player);
    setKnownSpells(run.knownSpells);
    setDungeon(run.dungeon);
    setDiscovery(Discovery.hydrate(run.discovery));
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
    // Every class knows the basic fattening cantrips — at-will, no slot cost.
    const CANTRIPS = ['Conjure Morsel', 'Sating Spark', 'Greasy Flick'];
    setKnownSpells(new Set([...classDef.startingSpells, ...CANTRIPS]));

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
    textEngine.addText('Barkeep Boris leans across the bar, voice dropping low. "You\'ve got the look of someone who goes hunting for trouble. There\'s plenty of it under our feet. A stair behind the cellar door drops into the old dungeon — kitchens that still cook, halls still laid for a feast no one living was invited to. They say something waits at the bottom that never once stopped eating. Mind the cold down there. It does strange things to a person\'s appetite."')
    setTextBuffer(textEngine.getBuffer());

    // Set starting zone
    const startingZone = world.getCurrentZone();
    setCurrentZone(startingZone);

    setGameStarted(true);
  };

  const addEntry = (text, type) => textEngine.addText(text, type ? { type } : {});

  const handleCastSpell = (args) => {
    try {
      castSpellImpl(args);
    } catch (err) {
      // A single spell must never white-screen the game — log it and surface it.
      console.error('Spell cast failed:', err);
      addEntry(`The spell sputters and fails — something went wrong (${err.message}).`, 'error');
      setTextBuffer(textEngine.getBuffer());
    }
  };

  const castSpellImpl = ({ spell, target, secondaryTarget, zone, selectedOption }) => {
    if (!spell || !zone) return;

    const caster = gameState.getPlayer();
    if (!caster) return;

    const slotLevel = optionSlotCost(spell, selectedOption);
    if (slotLevel > 0) { // cantrips (slot 0) are at-will and cost nothing
      const available = caster.spellSlots[slotLevel] ?? 0;
      if (available <= 0) {
        addEntry(`— ${spell.name} —`, 'divider');
        addEntry(`No level ${slotLevel} spell slots remaining. Long rest to restore.`, 'error');
        setTextBuffer(textEngine.getBuffer());
        return;
      }
      caster.spellSlots[slotLevel] -= 1;
    }

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
    // Fog-of-war: can't talk to someone you haven't seen.
    if (currentZone && !discovery.has(currentZone.id, npc.id)) {
      addEntry('You haven\'t noticed anyone like that here. Try looking around first.', 'info');
      setTextBuffer(textEngine.getBuffer());
      return;
    }
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

  // Enter the dungeon → drop into the first room (traversal, not instant combat).
  const handleEnterDungeon = () => {
    const player = gameState.getPlayer();
    if (!player) return;
    const ds = new DungeonState();
    setDungeon(ds);
    setDungeonTick(t => t + 1);
    addEntry(`— ${ds.currentFloor?.name} —`, 'divider');
    addEntry(ds.currentFloor?.description || 'You descend into the dark.');
    setTextBuffer(textEngine.getBuffer());
  };

  // Build a combat from the current room's enemies.
  const startRoomCombat = (ds) => {
    const player = gameState.getPlayer();
    const enemies = ds.roomEnemies();
    if (!enemies.length) return;
    enemies.forEach(e => {
      e._dead = false;
      // Restore weight gained earlier on this floor.
      const stored = floorWeights.get(e.name);
      if (stored != null) e.currentWeight = stored;
    });
    // Player anchors left-center; enemies spread along the right edge.
    const combat = new Combat([
      { entity: player, initiative: 10, x: 0, y: 1 },
      ...enemies.map((e, i) => ({ entity: e, initiative: 5, x: FIELD.maxX, y: Math.min(i, FIELD.maxY) })),
    ]);
    const floor = ds.currentFloor;
    setCombatState({
      combat, enemies, round: 1, status: 'active', modifier: floor?.modifier || null,
      selectedEnemyId: enemies[0].id, field: FIELD,
      log: [enemies.length > 1 ? `${enemies.length} foes block your way!` : `${enemies[0]?.name} blocks your way!`],
    });
  };

  // ── Dungeon traversal ────────────────────────────────────────

  const handleDungeonLook = () => {
    if (!dungeon) return;
    const room = dungeon.look();
    setDungeonTick(t => t + 1);
    addEntry('— You look around —', 'divider');
    const k = room?.contents?.kind;
    if (room?.cleared) addEntry('This room is quiet now. Nothing left here.');
    else if (k === 'combat') addEntry(`${room.contents.enemyDefs[0]?.name} ${room.contents.isGate ? 'looms between you and the way down' : 'lurks here'}.`);
    else if (k === 'loot') addEntry('A cache of supplies sits within reach.');
    else if (k === 'stairs') addEntry('A stairwell spirals down into deeper dark.');
    else addEntry('An empty room. Only exits and dust.');
    setTextBuffer(textEngine.getBuffer());
  };

  const handleDungeonMove = (dir) => {
    if (!dungeon) return;
    const room = dungeon.move(dir);
    if (!room) return;
    setDungeonTick(t => t + 1);
    addEntry(`— You go ${dir} —`, 'divider');
    addEntry(dungeon.currentFloor?.name + '. The passage opens into another room.');
    setTextBuffer(textEngine.getBuffer());
  };

  const handleDungeonExamine = (row) => {
    if (!dungeon) return;
    const room = dungeon.currentRoom;
    if (row.id.endsWith('_foe')) {
      const foe = room.contents.enemyDefs[0];
      addEntry(`— You size up ${foe.name} —`, 'divider');
      addEntry(foe.description || `${foe.name}.`);
    } else if (row.id.endsWith('_loot')) {
      addEntry('— You inspect the cache —', 'divider');
      addEntry('Glints of gear amid the supplies — gather it to find out what.');
    }
    setTextBuffer(textEngine.getBuffer());
  };

  const handleRoomPrompt = (id) => {
    if (!dungeon) return;
    if (id === 'engage') {
      startRoomCombat(dungeon);
    } else if (id === 'take') {
      const items = dungeon.clearRoom();
      const player = gameState.getPlayer();
      items.forEach(it => player.inventory.push(it));
      addEntry('— You gather the loot —', 'divider');
      addEntry(items.length ? `You pocket: ${items.map(i => i.name).join(', ')}.` : 'The cache was bare.');
      setDungeonTick(t => t + 1);
      setTextBuffer(textEngine.getBuffer());
    } else if (id === 'descend') {
      const { dungeonComplete } = dungeon.descend();
      if (dungeonComplete) {
        addEntry('— Dungeon Cleared! —', 'divider');
        addEntry('You have conquered the dungeon. A legend is born.');
        setDungeon(null);
        clearSave();
        setFloorWeights(new Map());
      } else {
        addEntry(`— ${dungeon.currentFloor?.name} —`, 'divider');
        addEntry(dungeon.currentFloor?.description || 'You descend deeper.');
        setFloorWeights(new Map()); // new floor — weight persistence resets
        bossPhaseRef.current = {};
        setDungeonTick(t => t + 1);
      }
      setTextBuffer(textEngine.getBuffer());
    } else if (id === 'leave') {
      addEntry('— You retreat to the surface —', 'divider');
      addEntry('The dungeon will be waiting when you return.');
      setDungeon(null);
      setTextBuffer(textEngine.getBuffer());
    }
  };

  const handleSelectEnemy = (enemyId) => {
    setCombatState(prev => prev ? { ...prev, selectedEnemyId: enemyId } : prev);
  };

  // Run one combat turn: the player's chosen action, then every living enemy
  // acts (you-then-all-enemies), then drain + win checks. `mutate(ctx)` returns
  // { ok, msg }: if ok is false the turn is aborted (no enemy turn, no round
  // spent) so a misjudged reach just costs a message, not the round.
  const runPlayerTurn = (mutate) => {
    setCombatState(prev => {
      if (!prev || prev.status !== 'active') return prev;
      try {
        return runPlayerTurnImpl(prev, mutate);
      } catch (err) {
        console.error('Combat action failed:', err);
        return { ...prev, log: [...prev.log, `That action misfired (${err.message}).`].slice(-10) };
      }
    });
  };

  const runPlayerTurnImpl = (prev, mutate) => {
    {
      const player = gameState.getPlayer();
      if (!player) return prev;
      const { combat } = prev;
      const mod = prev.modifier || {};
      const log = [...prev.log];
      const playerPos = combat.playerCombatant();
      const selEnemyC = combat.combatants.find(c => c.entity.id === prev.selectedEnemyId && c.entity.isEnemy);

      const res = mutate({ player, combat, mod, log, playerPos, selEnemy: selEnemyC?.entity, selEnemyPos: selEnemyC });
      if (res?.msg) log.push(res.msg);
      if (res && res.ok === false) {
        return { ...prev, log: log.slice(-10) }; // aborted — no turn spent
      }

      // Mark any enemies defeated by the player's action.
      const living = combat.livingEnemies().map(c => c.entity);
      for (const e of prev.enemies) {
        if (!e._dead && !living.includes(e)) {
          e._dead = true;
          e._defeatCondition = checkWinState(e)?.state ?? 'immobilized';
          log.push(`${e.name} is defeated!`);
          const dt = e.defeatText?.[e._defeatCondition];
          if (dt) log.push(dt);
        }
      }

      // Boss phase check — fire phase transitions for living enemies that crossed a fat threshold.
      for (const e of prev.enemies) {
        if (e._dead) continue;
        const phase = checkFatPhase(e);
        if (phase > 0) {
          const prevPhase = bossPhaseRef.current[e.id] ?? 0;
          if (phase > prevPhase) {
            bossPhaseRef.current[e.id] = phase;
            const phaseEntry = e.phases?.[phase - 1]; // phases is 0-indexed; phase1=index0
            if (phaseEntry?.text) log.push(phaseEntry.text);
            if (phaseEntry?.aiShift) e._trait = phaseEntry.aiShift;
          }
        }
      }

      if (combat.encounterWon()) {
        // Check fat phase gate for bosses — can't be immobilized/succumbed until fat threshold met.
        const unmetGate = combat.livingEnemies().find(ec => {
          const req = ec.entity.requiresFatPhase ?? 0;
          if (!req) return false;
          return (bossPhaseRef.current[ec.entity.id] ?? 0) < req;
        });
        if (unmetGate) {
          log.push(`${unmetGate.entity.name} shrugs off the finisher — she must be fattened further first.`);
          // Restore the enemy so the encounter continues.
          unmetGate.entity._dead = false;
          unmetGate.entity._defeatState = undefined;
        } else {
          return { ...prev, round: prev.round + 1, status: 'won', log: log.slice(-10) };
        }
      }

      // Enemy turns: each living foe acts on the player.
      for (const ec of combat.livingEnemies()) {
        const ctrl = controllerFor(ec.entity._trait);
        ctrl({ self: ec.entity, opponent: player, selfPos: ec, oppPos: playerPos, actions: actionsAvailable(ec.entity), combat, field: prev.field || FIELD });
        if (mod.willDrift) ec.entity.willingness = Math.min(100, (ec.entity.willingness ?? 50) + mod.willDrift);
      }
      log.push('The foes press in.');

      // Per-round fullness drain for everyone (biome drainScale scales it).
      const drainScale = mod.drainScale ?? 1;
      for (const c of combat.combatants) {
        const rate = (c.entity === player) ? 0.1 * drainScale : 0.1 * (1 - player.feedClingFactor) * drainScale;
        const cap = c.entity.stomachCapacity || 0;
        if (cap) c.entity.fullness = Math.max(0, (c.entity.fullness || 0) - cap * rate);
      }

      if (checkWinState(player)) {
        log.push('You collapse, too stuffed to fight on!');
        return { ...prev, round: prev.round + 1, status: 'lost', log: log.slice(-10) };
      }

      // Keep the selected target valid (jump to a living foe if the old one fell).
      let sel = prev.selectedEnemyId;
      if (!combat.livingEnemies().some(c => c.entity.id === sel)) sel = combat.livingEnemies()[0]?.entity.id ?? null;
      return { ...prev, round: prev.round + 1, selectedEnemyId: sel, log: log.slice(-10) };
    }
  };

  // Spell reach: ranged with a per-spell range (cells) + line of sight. Generous
  // by default — a spell should reach across the field; force-feed is the melee option.
  const spellRange = (spell) => spell.combatRange ?? ((spell.level ?? 1) <= 2 ? 4 : 6);

  // When a fill pushes a foe across a fullness band, narrate her swelling.
  const FATTEN_BANDS = [0.5, 0.7, 0.85, 1.0];
  const narrateFatten = (enemy, beforeFull, log) => {
    const cap = enemy.stomachCapacity || 0;
    if (!cap) return;
    const before = beforeFull / cap, after = (enemy.fullness || 0) / cap;
    if (FATTEN_BANDS.some(bnd => before < bnd && after >= bnd)) {
      const line = getTextEngine().render('combat.fattening', enemy._createContext());
      if (line) log.push(line);
    }
  };

  const handleCombatCastSpell = (spell) => {
    runPlayerTurn(({ player, mod, log, selEnemy, selEnemyPos, playerPos }) => {
      if (!selEnemy || !selEnemyPos) return { ok: false, msg: 'No target — pick a foe first.' };
      const range = spellRange(spell);
      if (distance(playerPos, selEnemyPos) > range || !lineOfSight(playerPos, selEnemyPos)) {
        return { ok: false, msg: `${selEnemy.name} is out of range for ${spell.name}. Move closer or pick a nearer foe.` };
      }
      const lvl = spell.level ?? 1;
      const isCantrip = lvl <= 0;
      const cost = isCantrip ? 0 : lvl <= 1 ? 1 : lvl <= 3 ? 2 : 3;
      if (!isCantrip) {
        if ((player.spellSlots[cost] ?? 0) <= 0) return { ok: false, msg: `No L${cost} slots — ${spell.name} fizzles.` };
        player.spellSlots[cost] -= 1;
      }
      const pct = isCantrip ? 0.10 : cost === 1 ? 0.20 : cost === 2 ? 0.35 : 0.50;
      const before = selEnemy.fullness || 0;
      if (spell.isFatten || spell.options?.[0]?.isFatten) {
        // Fatten path: add permanent weight instead of (or in addition to) fullness.
        const lbs = Math.round((FATTEN_PCT[cost] ?? FATTEN_PCT[1]) * (selEnemy.baseWeight ?? 100));
        fattenUp(selEnemy, lbs);
        log.push(`You cast ${spell.name} on ${selEnemy.name}. She puts on ${lbs} lbs.`);
        if (isFatDefeated(selEnemy)) {
          selEnemy._dead = true;
          selEnemy._defeatCondition = 'fattened';
          log.push(`${selEnemy.name} has grown too heavy to continue — she's defeated!`);
        }
      } else {
        fillUp(selEnemy, pct * (selEnemy.stomachCapacity || 100) * (player.feedBonusMultiplier || 1) * (mod.feedScale ?? 1));
        log.push(`You cast ${spell.name} on ${selEnemy.name}.`);
        narrateFatten(selEnemy, before, log);
      }
      return { ok: true };
    });
  };

  const handleForceFeed = () => {
    runPlayerTurn(({ player, mod, log, selEnemy, selEnemyPos, playerPos }) => {
      if (!selEnemy || !selEnemyPos) return { ok: false, msg: 'No target — pick a foe first.' };
      if (!canReach(playerPos, selEnemyPos, 1)) {
        return { ok: false, msg: `${selEnemy.name} is too far to force-feed. Move adjacent first.` };
      }
      const before = selEnemy.fullness || 0;
      fillUp(selEnemy, 0.15 * (selEnemy.stomachCapacity || 100) * (player.feedBonusMultiplier || 1) * (mod.feedScale ?? 1));
      log.push(`You force-feed ${selEnemy.name}.`);
      narrateFatten(selEnemy, before, log);
      return { ok: true };
    });
  };

  const handleCombatMove = (dir) => {
    runPlayerTurn(({ combat, playerPos }) => {
      const before = `${playerPos.x},${playerPos.y}`;
      moveCombatant(playerPos, dir, { maxX: FIELD.maxX, maxY: FIELD.maxY });
      if (`${playerPos.x},${playerPos.y}` === before) return { ok: false, msg: 'You can\'t move that way — the field edge stops you.' };
      return { ok: true, msg: `You reposition ${dir}.` };
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
      for (const e of enemies) {
        const dt = e.defeatText?.[e._defeatCondition];
        if (dt) addEntry(dt, 'italic');
      }

      // Persist per-floor weight gains for enemies that weren't fattened to death.
      setFloorWeights(prev => {
        const next = new Map(prev);
        for (const e of enemies) {
          if (e._defeatCondition !== 'fattened' && e.currentWeight != null) {
            next.set(e.name, e.currentWeight);
          }
        }
        return next;
      });

      // Clear the room (banks loot), drop combat → back to traversal. Award XP last
      // so a level-up modal doesn't race the room transition.
      const items = dungeon.clearRoom();
      const player = gameState.getPlayer();
      items.forEach(item => player.inventory.push(item));
      addEntry(`— ${enemy.name} defeated —`, 'divider');
      if (items.length) addEntry(`Loot: ${items.map(i => i.name).join(', ')}.`, 'info');
      addEntry(dungeon.canDescend || dungeon.currentRoom?.contents?.isGate
        ? 'The way deeper is clear.'
        : 'The room falls quiet. You may move on.');
      setCombatState(null);
      setDungeonTick(t => t + 1);
      gainXP(enemy.xpValue || 100);
    } else {
      // lost — flee the dungeon, keep the character
      setCombatState(null);
      setDungeon(null);
      addEntry('— Defeated —', 'divider');
      addEntry('You retreat to the surface, licking your wounds.');
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
            {!dungeon && (
              <button onClick={handleLongRest} style={styles.restButton}>
                Long Rest
              </button>
            )}
          </div>
          {dungeon && !combatState ? (
            <div style={styles.zoneSection}>
              <LocationView
                location={(() => {
                  const loc = roomToLocation(dungeon);
                  return loc ? { ...loc, prompts: [...loc.prompts, { id: 'leave', label: 'Retreat to the surface', tone: 'neutral' }] } : loc;
                })()}
                onLookAround={handleDungeonLook}
                onExamine={handleDungeonExamine}
                onMove={handleDungeonMove}
                onPrompt={handleRoomPrompt}
              />
            </div>
          ) : currentZone && !combatState && (
            <div style={styles.zoneSection}>
              <LocationView
                location={(() => {
                  const loc = zoneToLocation(currentZone, discovery);
                  if (loc && currentZone.id === 'dungeon') {
                    return { ...loc, prompts: [...loc.prompts, { id: 'enter_dungeon', label: 'Descend into the depths', tone: 'danger' }] };
                  }
                  return loc;
                })()}
                onLookAround={handleLookAround}
                onExamine={handleExamine}
                onTalk={handleTalkRow}
                onMove={(dir) => handleZoneAction({ type: 'move', direction: dir })}
                onPrompt={(id) => { if (id === 'enter_dungeon') handleEnterDungeon(); }}
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
              discovery={discovery}
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
          combat={combatState.combat}
          enemies={combatState.enemies}
          field={combatState.field || FIELD}
          selectedEnemyId={combatState.selectedEnemyId}
          round={combatState.round}
          status={combatState.status}
          combatLog={combatState.log}
          knownSpells={knownSpells}
          spellLibrary={spellLibrary}
          playerStats={{ spellSlots: player.spellSlots, maxSpellSlots: player.maxSpellSlots }}
          onSelectEnemy={handleSelectEnemy}
          onCastSpell={handleCombatCastSpell}
          onForceFeed={handleForceFeed}
          onMove={handleCombatMove}
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
