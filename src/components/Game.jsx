import { useState, useEffect } from 'react';
import TextDisplay from './TextDisplay';
import ChoicesPanel from './ChoicesPanel';
import CharacterPanel from './CharacterPanel';
import GameState from '../game/GameState';
import { StoryEngine } from '../game/StoryEngine';
import Character from '../game/Character';
import TextEngine from '../engine/TextEngine';

const Game = () => {
  const [gameState] = useState(() => new GameState());
  const [storyEngine] = useState(() => new StoryEngine());
  const [textEngine] = useState(() => new TextEngine());
  const [currentScene, setCurrentScene] = useState(null);
  const [textBuffer, setTextBuffer] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  const startGame = (playerName) => {
    const character = new Character(playerName, {
      race: 'Human',
      class: 'Adventurer',
      baseWeight: 150,
    });

    gameState.setPlayer(character);
    textEngine.clearBuffer();

    // Setup initial scenes (example)
    setupInitialScenes(storyEngine, gameState, textEngine);

    // Go to first scene
    const firstScene = storyEngine.goToScene('intro', gameState);
    setCurrentScene(firstScene);
    updateTextDisplay(firstScene);
    setGameStarted(true);
  };

  const updateTextDisplay = (scene) => {
    textEngine.clearBuffer();
    textEngine.addText(scene.content);
    setTextBuffer(textEngine.getBuffer());
  };

  const handleChoice = (choiceId) => {
    const nextScene = storyEngine.makeChoice(choiceId, gameState);
    setCurrentScene(nextScene);
    updateTextDisplay(nextScene);
  };

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.gameArea}>
          <TextDisplay textBuffer={textBuffer} />
          {currentScene && (
            <ChoicesPanel
              choices={currentScene.getAvailableChoices(gameState)}
              onChoice={handleChoice}
            />
          )}
        </div>
        <aside style={styles.sidebar}>
          {gameState.getPlayer() && (
            <CharacterPanel character={gameState.getPlayer()} />
          )}
        </aside>
      </div>
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

function setupInitialScenes(storyEngine, gameState, textEngine) {
  // Example intro scene
  storyEngine.createScene(
    'intro',
    'You awaken in a dimly lit tavern. The scent of ale and roasted meat fills the air. A hooded figure in the corner beckons you over...'
  );

  storyEngine.getCurrentScene().addChoice(
    'approach',
    'Approach the figure',
    'meeting'
  );

  storyEngine.getCurrentScene().addChoice(
    'ignore',
    'Ignore them and order a drink',
    'tavern_rest'
  );

  storyEngine.createScene(
    'meeting',
    'The figure pulls back their hood, revealing the weathered face of an old merchant. "I have a job for you, adventurer. Interested?"'
  );

  storyEngine.getCurrentScene().addChoice(
    'accept',
    'Accept the job',
    'quest_accepted'
  );

  storyEngine.getCurrentScene().addChoice(
    'refuse',
    'Refuse and leave',
    'tavern_rest'
  );

  storyEngine.createScene(
    'quest_accepted',
    'The merchant grins. "Excellent! I need you to retrieve a magical artifact from the Goblin\'s Dungeon. I\'ll pay well."'
  );

  storyEngine.getCurrentScene().addChoice(
    'ready',
    'Set off immediately',
    'enter_dungeon'
  );

  storyEngine.createScene(
    'tavern_rest',
    'You settle in for the evening. The tavern keeper brings you a hearty meal and a drink. You feel refreshed.'
  );

  storyEngine.getCurrentScene().addChoice(
    'back_to_start',
    'Return another day',
    'intro'
  );

  storyEngine.createScene(
    'enter_dungeon',
    'You stand before the entrance to the Goblin\'s Dungeon. The air smells of dampness and danger. You hear faint sounds from within...'
  );

  storyEngine.getCurrentScene().addChoice(
    'enter',
    'Enter the dungeon',
    'dungeon_main'
  );

  storyEngine.createScene(
    'dungeon_main',
    'Inside the dungeon, you see three paths. The air is thick with mold and decay. You must choose...'
  );

  storyEngine.getCurrentScene().addChoice(
    'left',
    'Take the left path',
    'dungeon_left'
  );

  storyEngine.getCurrentScene().addChoice(
    'right',
    'Take the right path',
    'dungeon_right'
  );

  storyEngine.createScene(
    'dungeon_left',
    'You find a room full of treasure! But there\'s a hungry ogre sleeping nearby...'
  );

  storyEngine.getCurrentScene().addChoice(
    'sneak',
    'Sneak around the ogre',
    'treasure_found'
  );

  storyEngine.createScene(
    'dungeon_right',
    'You encounter a group of goblins! Combat is unavoidable!'
  );

  storyEngine.getCurrentScene().addChoice(
    'fight',
    'Fight the goblins',
    'combat'
  );

  storyEngine.createScene(
    'treasure_found',
    'Success! You\'ve found the magical artifact and escaped with the treasure!'
  );

  storyEngine.getCurrentScene().addChoice(
    'return',
    'Return to the tavern',
    'quest_complete'
  );

  storyEngine.createScene(
    'combat',
    'The battle is fierce, but you emerge victorious!'
  );

  storyEngine.getCurrentScene().addChoice(
    'continue',
    'Continue deeper into the dungeon',
    'treasure_found'
  );

  storyEngine.createScene(
    'quest_complete',
    'You return to the merchant and receive your reward. Your legend grows...'
  );

  storyEngine.getCurrentScene().addChoice(
    'new_quest',
    'Take another quest',
    'intro'
  );
}

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
  gameArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRight: '1px solid #333',
    overflowY: 'auto',
  },
  sidebar: {
    width: '300px',
    padding: '20px',
    overflowY: 'auto',
    backgroundColor: '#0a0a0a',
    borderLeft: '1px solid #333',
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
