import { useState } from 'react';
import TextDisplay from './TextDisplay';
import CharacterPanel from './CharacterPanel';
import SpellCaster from './SpellCaster';
import ZoneDisplay from './ZoneDisplay';
import NPCInteraction from './NPCInteraction';
import GameState from '../game/GameState';
import Character from '../game/Character';
import TextEngine from '../engine/TextEngine';
import SpellLibrary from '../game/magic/SpellLibrary';
import SpellNarrator from '../game/magic/SpellNarrator';
import SpellResolver from '../game/magic/SpellResolver';
import { getTextEngine } from '../textEngine/index.js';
import { RESTRAINT_MATERIAL } from '../game/conditions/ActiveConditions.js';
import World from '../game/world/World';

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

  // Initialize game
  const startGame = (playerName) => {
    const character = new Character(playerName, {
      race: 'Human',
      class: 'Adventurer',
      baseWeight: 150,
    });

    gameState.setPlayer(character);
    textEngine.clearBuffer();

    // Add initial message
    textEngine.addText(`Welcome, ${playerName}!`);
    textEngine.addText('You find yourself in The Bloated Boar Tavern...');
    setTextBuffer(textEngine.getBuffer());

    // Set starting zone
    const startingZone = world.getCurrentZone();
    setCurrentZone(startingZone);

    setGameStarted(true);
  };

  const handleCastSpell = ({ spell, target, zone, selectedOption }) => {
    if (!spell || !zone) return;

    const caster = gameState.getPlayer();
    if (!caster) return;

    const { result } = SpellResolver.cast({ spell, caster, target, zone, selectedOption });

    textEngine.clearBuffer();

    if (result.success) {
      // Single cohesive scene narrative
      const scene = SpellNarrator.narrateSpellScene(spell, caster, target, selectedOption);
      textEngine.addText(scene);

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
          textEngine.addText(`Synergy: ${interactionText || interaction.description}`);
        });
      }

      if (result.environmentalChanges?.length > 0) {
        result.environmentalChanges.forEach(change => {
          if (change.description) textEngine.addText(`Environment: ${change.description}`);
        });
      }

      if (result.appliedModifiers?.length > 0) {
        result.appliedModifiers.forEach(modifier => {
          textEngine.addText(`Resonance: ${modifier.label}`);
        });
      }

      if (result.createdFoods?.length > 0) {
        const foodNames = result.createdFoods.map(food => food.name).join(', ');
        textEngine.addText(`Created food now persists here: ${foodNames}.`);
      }

      if (result.summonedCreatures?.length > 0) {
        const creatureNames = result.summonedCreatures.map(creature => creature.name).join(', ');
        textEngine.addText(`Summoned creatures now occupy this area: ${creatureNames}.`);
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
        if (parts.length) textEngine.addText(parts.join(' • '));
      }

      // NPC reactions (weight gain + restraint status)
      if (target && target._createContext) {
        if (totalCaloriesLogged > 0) {
          const pendingGain = target.pendingWeightGain || 0;
          textEngine.addText(
            `Nutrition: ${target.name} has taken in ${totalCaloriesLogged} calories today. Estimated long-rest gain: +${pendingGain} lbs.`,
          );
        }

        if (totalImmediateWeightGain > 0) {
          // Check if target is suspended — render special suspended weight gain scene
          if (target.suspensionState === 'ceiling') {
            const engine = getTextEngine();
            const ctx = target._createContext();
            const suspendedScene = engine.render('spell.weight_gain.suspended', ctx);
            if (suspendedScene) {
              textEngine.addText(suspendedScene);
            }
          } else {
            // Normal weight gain reaction
            const weightReaction = SpellNarrator.triggerNPCReactions(target, 'weight_gain', totalImmediateWeightGain);
            if (weightReaction) textEngine.addText(weightReaction);
          }
        }

        // Persist lingering spell conditions so examine / dialogue / body.desc
        // and future spell interactions reflect them.
        applySpellConditions(spell, target, selectedOption);

        // Restraint spells get an immediate panic reaction.
        const isRestraintSpell = spell.tags && (
          spell.tags.includes('restraint') || spell.tags.includes('paralysis')
        );
        if (isRestraintSpell) {
          const restraintReaction = SpellNarrator.triggerNPCReactions(target, 'restrained');
          if (restraintReaction) textEngine.addText(restraintReaction);
        }
      }
    } else {
      textEngine.addText(`${result.message}`);
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

    textEngine.clearBuffer();
    textEngine.addText('You take a long rest. The day\'s meals and magic settle into lasting changes.');

    const summaries = restTargets
      .map(entity => ({ entity, result: entity.processLongRestNutrition?.() }))
      .filter(({ result }) => result && (result.rawCalories > 0 || result.weightGain > 0));

    if (summaries.length === 0) {
      textEngine.addText('No one has eaten enough today for the rest to change their weight.');
    }

    summaries.forEach(({ entity, result }) => {
      textEngine.addText(
        `${entity.name}: ${result.rawCalories} calories eaten, ${result.effectiveCalories} effective calories, +${result.weightGain} lbs after rest.`,
      );

      if (result.weightGain > 0 && entity._createContext) {
        const reaction = SpellNarrator.triggerNPCReactions(entity, 'weight_gain', result.weightGain);
        if (reaction) textEngine.addText(reaction);
      }
    });

    setTextBuffer(textEngine.getBuffer());
  };

  const handleZoneAction = ({ type, direction }) => {
    if (type === 'move') {
      const nextZone = world.moveToZone(direction);
      if (nextZone) {
        setCurrentZone(nextZone);
        textEngine.clearBuffer();
        textEngine.addText(`You move ${direction}...`);
        textEngine.addText(nextZone.description);
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

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
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
            <SpellCaster
              spellLibrary={spellLibrary}
              availableTargets={availableTargets}
              onCastSpell={handleCastSpell}
              currentZone={currentZone}
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
    </div>
  );
};

const StartScreen = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('');

  const handleStart = () => {
    if (playerName.trim()) {
      onStart(playerName);
    }
  };

  return (
    <div style={styles.startScreen}>
      <h1>Dungeons & Fatties</h1>
      <p>A Text-Based Adventure</p>
      <input
        type="text"
        placeholder="Enter your character name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleStart()}
        style={styles.input}
      />
      <button onClick={handleStart} style={styles.button}>
        Start Adventure
      </button>
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
  startScreen: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    backgroundColor: '#2a2a2a',
    color: '#e0e0e0',
    border: '1px solid #444',
    borderRadius: '4px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Game;
