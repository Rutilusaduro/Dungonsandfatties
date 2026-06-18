# Dungeons & Fatties

A web-based text adventure game built with **Vite** and **React**. This is a Dungeons & Dragons-inspired narrative-driven game with weight gain mechanics, using a modular text engine for flexible narrative and UI rendering.

## Project Structure

```
src/
├── engine/
│   └── TextEngine.js          # Core modular text display system
├── game/
│   ├── Character.js            # D&D character with stats and weight mechanics
│   ├── GameState.js            # Global game state management with event system
│   └── StoryEngine.js          # Scene and choice management
├── components/
│   ├── Game.jsx                # Main game controller
│   ├── TextDisplay.jsx         # Renders narrative text
│   ├── ChoicesPanel.jsx        # Displays player choices
│   └── CharacterPanel.jsx      # Displays character stats and inventory
├── App.jsx                      # Root component
├── App.css                      # Game styling
├── index.css                    # Theme and global styles
└── main.jsx                     # Entry point
```

## Core Systems

### TextEngine
A modular text rendering system that handles:
- Text buffering and history (up to 1000 entries)
- Custom text formatters (bold, italic, colored text, etc.)
- Tag system for interactive text elements
- Real-time text updates

### GameState
Central state manager providing:
- Player character management
- Inventory system
- World state tracking
- Flag-based event/quest tracking
- Event listener system for reactive updates

### Character System
D&D-based character with:
- Six core attributes (STR, DEX, CON, INT, WIS, CHA)
- Health and combat system
- **Weight gain mechanics**: Track weight changes, accumulate gain, trigger effects
- Body composition tracking (fat, muscle, etc.)

### StoryEngine
Scene-based narrative system:
- Scene creation and navigation
- Conditional choices (show/hide based on game state)
- Scene hooks (on enter/exit callbacks)
- Choice history tracking

## Getting Started

### Development
```bash
npm install
npm run dev
```

Server runs on `http://localhost:5173/`

### Build
```bash
npm run build
```

## Next Steps

To enhance the game:

1. **Import the modular text engine** from the GameDev repo - refactor TextEngine to match that system
2. **Expand the story content** - add more scenes, NPCs, quests, and encounters
3. **Implement combat system** - turn-based combat with abilities
4. **Add persistence** - save/load game state to localStorage or backend
5. **Visual enhancements** - ASCII art, better styling, animations
6. **Audio system** - background music and sound effects
7. **Item system** - equipment, consumables, quest items with effects

## Features Implemented

- ✅ Modular text engine with formatting
- ✅ D&D character creation and stats
- ✅ Weight gain tracking mechanics
- ✅ Scene-based story system
- ✅ Dynamic choice system (conditional availability)
- ✅ Real-time character panel with stats
- ✅ Game state management with events
- ✅ Dark theme optimized for reading
- ✅ Responsive UI layout

## Architecture Notes

The game uses a **model-view-controller pattern**:
- **Models**: Character, GameState, TextEngine
- **Views**: React components (TextDisplay, ChoicesPanel, etc.)
- **Controller**: Game component orchestrating state and story flow

All major systems are decoupled and can be tested independently.
