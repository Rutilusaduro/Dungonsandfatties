import { useState, useEffect } from 'react';
import TextDisplay from './TextDisplay';
import CharacterPanel from './CharacterPanel';
import SpellCaster from './SpellCaster';
import ZoneDisplay from './ZoneDisplay';
import NPCInteraction from './NPCInteraction';
import GameState from '../game/GameState';
import Character from '../game/Character';
import TextEngine from '../engine/TextEngine';
import SpellLibrary from '../game/magic/SpellLibrary';
import World from '../game/world/World';

const Game = () => {
  const [gameState] = useState(() => new GameState());
  const [textEngine] = useState(() => new TextEngine());
  const [spellLibrary] = useState(() => new SpellLibrary());
  const [world] = useState(() => World.createSampleWorld());

  const [gameStarted, setGameStarted] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [textBuffer, setTextBuffer] = useState([]);
  const [gameMode, setGameMode] = useState('exploration'); // 'exploration' or 'story'
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

    // Prepare context for spell casting
    const context = {
      environmentalObjects: zone.getEnvironmentalObjects(),
      creatures: zone.getCreatures(),
      npcs: zone.getNPCs(),
      previousSpells: [], // Track spell history for interactions
    };

    // Cast the spell with the selected option
    const result = spell.cast(caster, target, context, selectedOption);

    // Add narrative to text display
    textEngine.clearBuffer();
    if (result.success) {
      let castText = `✨ ${caster.name} casts ${spell.name}!`;
      if (result.optionUsed) {
        castText += ` (${result.optionUsed})`;
      }
      textEngine.addText(castText);

      if (result.weightGainFlavor) {
        textEngine.addText(result.weightGainFlavor);
      }

      if (result.effects.length > 0) {
        result.effects.forEach(effect => {
          if (effect.description) {
            textEngine.addText(effect.description);
          }
        });
      }

      if (result.environmentalChanges.length > 0) {
        textEngine.addText('Environmental effects:');
        result.environmentalChanges.forEach(change => {
          if (change.description) {
            textEngine.addText(`  • ${change.description}`);
          }
        });
      }

      if (result.interactions.length > 0) {
        textEngine.addText('Spell combinations:');
        result.interactions.forEach(inter => {
          textEngine.addText(`  • ${inter.description}`);
        });
      }
    } else {
      textEngine.addText(`❌ ${result.message}`);
    }

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
