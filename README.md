# Dungeons & Fatties

A web-based text adventure game built with **Vite** and **React**. This is a Dungeons & Dragons-inspired narrative-driven game with weight gain mechanics, featuring a robust, interactive magic system with extensive spell combinations and environmental interactions.

## Project Structure

```
src/
├── engine/
│   └── TextEngine.js                 # Modular text display system
├── game/
│   ├── Character.js                  # D&D character with stats and weight mechanics
│   ├── GameState.js                  # Global game state and event management
│   ├── StoryEngine.js                # Scene and choice management
│   ├── magic/
│   │   ├── Spell.js                  # Base spell system with effects and interactions
│   │   ├── SpellLibrary.js           # Collection of weight-gain themed spells
│   │   └── MagicSystemExample.js     # Comprehensive examples and demonstrations
│   ├── environment/
│   │   └── EnvironmentalObject.js    # Objects that spells and players interact with
│   ├── entities/
│   │   ├── Creature.js               # Animals and creatures (Pig, Duck, Cow, etc.)
│   │   └── NPC.js                    # Sentient NPCs (Innkeeper, Merchant, Guard, etc.)
│   └── world/
│       ├── Zone.js                   # Individual areas/zones
│       └── World.js                  # World manager with 4 sample zones
└── components/
    ├── Game.jsx                      # Main game controller
    ├── TextDisplay.jsx               # Renders narrative text
    ├── ChoicesPanel.jsx              # Displays player choices
    └── CharacterPanel.jsx            # Displays character stats
```

## Core Systems

### Magic System
**Robust spell framework with extensive interactions:**

**Spell Features:**
- Base Spell class with customizable effects
- Spell-to-spell interactions (synergies and combinations)
- Environmental effects (spells can affect objects in zones)
- Weight-gain theming for all spells adapted from D&D 5e

**Example Spells (Adapted for Weight Gain Theme):**
- **Enlarge Person** - Make targets grow larger, gain weight and strength
- **Reduce Person** - Shrink targets (opposite of Enlarge)
- **Shape Earth** - Reshape earth into basins, tables, structures
- **Shape Wood** - Reshape wood into furniture, restraints, feeding stations
- **Create Water** - Conjure water, milk, honey, and other liquids
- **Oozing Abundance** - Fire arrows of nutritious ooze that damage and feed
- **Feast of Shadows** - Create illusory food that sustains and causes weight gain
- **Morph Mass** - Absorb surrounding matter into target, increasing weight

**Spell Interactions:**
- Shape Earth + Create Water = Fill basins
- Shape Earth + Shape Wood = Create elaborate structures
- Enlarge Person + Reduce Person = Size shifting
- And many more combinations to discover

### Zone System
**Exploration-based world with interconnected areas:**

**4 Sample Zones:**
1. **The Bloated Boar Tavern** - Social hub with food, NPCs, low difficulty
2. **The Abundant Garden** - Peaceful garden with creatures, fertile resources
3. **The Grand Kitchen** - Dangerous cooking area, abundant ingredients
4. **The Depths Below** - Dark dungeon with mysterious inhabitants, high difficulty

**Zone Features:**
- Environmental objects (Stone, Wood, Water, Earth, Furniture)
- Creatures with hunger, feeding, and weight mechanics
- NPCs with dialogue trees and personalities
- Exit connections for world navigation
- Spell affinities (certain spells work better in certain zones)

### Entity Systems

**Creatures:**
- Base Creature class with health, weight, hunger
- Specific types: Pig, Duck, Cow
- Feeding mechanics that increase weight
- Behavioral states (friendly, hostile, neutral, fearful)

**NPCs:**
- Named NPCs (Innkeeper, Merchant, Guard)
- Unnamed NPCs for generic interactions
- Personality and relationship tracking
- Dialogue systems with state management
- Can be fed to build relationships

**Environmental Objects:**
- Stone, Wood, Water, Earth, Furniture types
- Spell affinity system (Shape Earth affects Earth, etc.)
- Durability and state tracking
- Can be reshaped by spells

### Character System
D&D-based character with:
- Six core attributes (STR, DEX, CON, INT, WIS, CHA)
- Health and combat system
- **Weight gain tracking** with multiple levels
- Body composition tracking

### TextEngine
- Text buffering with history
- Custom formatters (bold, italic, colors)
- Real-time updates

## Magic System Examples

See `src/game/magic/MagicSystemExample.js` for comprehensive examples:

1. **Basic Spell Casting** - Cast spells on creatures
2. **Environmental Interaction** - Spells affecting objects in zones
3. **Spell Combinations** - Using multiple spells together for synergies
4. **Feeding Sequences** - Creating food with magic and feeding creatures
5. **Zone Exploration** - Navigating and discovering zones
6. **NPC Interaction** - Dialogue and gift-giving
7. **Weight Gain Tracking** - Monitoring changes from spells and feeding

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

### Testing Magic System
The magic system is fully functional and can be tested with the example file. Integration into the game UI is the next step.

## Next Steps

1. **Integrate magic system into UI** - Add spell casting interface and real-time effects
2. **Expand spell library** - Add 20+ more spells with more interaction combinations
3. **Create more zones** - Add 5-10 additional zones with unique themes
4. **Combat system** - Turn-based magic combat with spell combinations
5. **Creature behavior AI** - Creatures that seek food, react to spells
6. **Save/Load system** - Persist game state and progress
7. **Quests & NPCs** - More complex NPC interactions and quest chains
8. **Visual effects** - Animations for spell casting and transformations

## Architecture

**Design Philosophy:**
- Modular, decoupled systems that are independent and testable
- Spell system is completely separate from UI - can be used in CLI or other interfaces
- Environmental objects, creatures, and NPCs are game data, not UI concerns
- Heavy focus on composition and interaction

**Key Interactions:**
- Spells affect environments and creatures
- Spells interact with other spells for combo effects
- Creatures and NPCs have weight gain that feeds into game progression
- Zones provide context for where spells work best

## Features Implemented

✅ Robust spell system with interactions  
✅ Environmental object manipulation  
✅ Zone/world system with connections  
✅ Creature and NPC systems  
✅ Weight gain mechanics  
✅ Spell library with themed spells  
✅ Feeding and relationship systems  
✅ Comprehensive examples and demonstrations  
✅ GitHub Pages deployment ready  

## Deployed Live

Game is deployed to GitHub Pages:
🎮 **https://Rutilusaduro.github.io/Dungonsandfatties/**
