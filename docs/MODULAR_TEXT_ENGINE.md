# Modular Text Engine

## Overview

The Modular Text Engine is a state-driven text generation system that creates dynamic, contextually-aware dialogue and narration based on game state. Instead of hardcoding dialogue strings, the engine uses **modules** and **variants** to select appropriate text based on current conditions like NPC weight, reputation, spell effects, and more.

### Key Concepts

- **Module**: A reusable text-generation block (e.g., `npc.greeting`, `spell.effect.erupting_earth`)
- **Variant**: A specific text option within a module, selected based on **when-conditions**
- **Context**: Normalized game state transformed into **dimensions** for variant matching
- **When-Condition**: A rule that determines when a variant should be selected
- **Dimension**: A derived value from game state (e.g., weight stage, reputation, hunger tier)

---

## Architecture

### Core Files

```
src/textEngine/
├── engine.js           # ModularTextEngine class (core logic)
├── lexicon.js          # Word-level vocabulary (weight-gain themed)
├── index.js            # Engine initialization and singleton
└── scenes/
    ├── npc.js          # NPC dialogue modules
    ├── spell.js        # Spell narration modules
    └── personas.js     # Named NPC personality overlays
```

### Initialization

The text engine is initialized as a singleton:

```javascript
import { getTextEngine } from '../textEngine/index.js';

const engine = getTextEngine(); // Lazy-loads engine on first call
```

---

## Creating Modules

### Module Registration Modes

**Best-Match Mode** (`registerModule`):
- Only one variant is selected: the one with highest specificity score
- Use for content that should have a single "best" response
- Example: NPC examine descriptions

```javascript
engine.registerModule('npc.examine', [
  {
    when: { stage: { min: 10 } },
    text: 'She is absolutely enormous...',
  },
  {
    when: { stage: { min: 5, max: 9 } },
    text: 'She is quite large...',
  },
  {
    when: {},
    text: 'She is an average-sized woman.',
  },
]);
```

**Pool Mode** (`registerPool`):
- All matching variants are eligible; one is picked at random (weighted)
- Use for dialogue to avoid repetition
- Example: NPC greetings

```javascript
engine.registerPool('npc.greeting', [
  {
    when: { reputation: { min: 50 } },
    text: ['Oh, hello again!', 'Welcome back, friend!', 'What a pleasant surprise!'],
    weight: 3, // More likely to be selected
  },
  {
    when: { reputation: { max: 24 } },
    text: ['Hello...', 'Oh. It\'s you.'],
    weight: 1,
  },
  {
    when: {},
    text: ['Hello.', 'Yes?'],
  },
]);
```

### Variant Structure

Each variant is an object with the following properties:

```javascript
{
  when: {
    // When-conditions (see below)
    stage: { min: 5, max: 10 },
    reputation: { min: 25 },
    hungerTier: 3,
  },
  text: 'Single text string or array of texts to randomly pick from',
  weight: 2, // Optional: selection weight for pool mode (default: 1)
  priority: 1, // Optional: priority for best-mode (higher = more specific)
}
```

---

## When-Conditions

When-conditions determine **when** a variant should be selected. They match against **context dimensions**.

### Condition Types

**Exact Match:**
```javascript
{ reputation: 50 }  // reputation must equal exactly 50
{ fullness: 1 }     // fullness must equal 1 (true)
```

**Range Match:**
```javascript
{ stage: { min: 5, max: 10 } }      // stage between 5-10
{ reputation: { min: 50 } }         // reputation >= 50
{ willingness: { max: 75 } }        // willingness <= 75
```

**Array Inclusion:**
```javascript
{ season: ['spring', 'summer'] }    // season is spring or summer
```

**Wildcard (Empty):**
```javascript
{ }                                  // Always matches (lowest specificity)
```

### Specificity Scoring

When-conditions are scored by specificity:
- Exact match: +3 points
- Range match: +2 points
- Array match: +2 points
- No condition (wildcard): 0 points

Higher scores = more likely selection in best-match mode.

---

## Context Dimensions

The engine evaluates variants against game state **dimensions**. Dimensions are derived from raw game objects.

### Built-in Dimensions

| Dimension | Type | Range | Meaning |
|-----------|------|-------|---------|
| `stage` | Number | 0-11 | Weight progression: 0=slight, 11=leviathan |
| `corruption` | Number | 0-2 | Narrative arc: 0=innocent, 2=surrendered |
| `bodyType` | String | 11 types | Body shape: pear, apple, hourglass, etc. |
| `reputation` | Number | -100 to 100 | NPC relationship with player |
| `willingness` | Number | 0-100 | NPC susceptibility to eating |
| `hungerTier` | Number | 0-3 | Hunger level: 0=low, 3=ravenous |
| `fullness` | Number | 0-1 | Satiation from Rapid Digestion spell |
| `season` | String | 4 values | spring, summer, fall, winter |
| `mood` | String | Free | NPC personality mood |

### Deriving Dimensions

Dimensions are derived from game objects via context creation:

**For NPCs** (in `NPC.js`):
```javascript
_createContext() {
  return {
    stage: this._deriveWeightStage(),      // Calculate from currentWeight/baseWeight
    reputation: this.playerReputation,      // Direct from NPC
    willingness: this.willingness,          // Direct from NPC
    fullness: this.isFullness ? 1 : 0,      // Convert boolean to 0/1
    mood: this.personality,                 // Direct from NPC
    // ... more dimensions
  };
}
```

**Weight Stage Derivation**:
```
percentGain < 5%:   stage = 0  (slight)
5-15%:              stage = 1  (soft)
15-30%:             stage = 2  (round)
...
> 500%:             stage = 11 (leviathan)
```

### Registering Custom Dimensions

To add a custom dimension:

```javascript
engine.registerDimension('customKey', (ctx) => {
  // ctx contains the raw game object
  return derivedValue;
});
```

Example:
```javascript
engine.registerDimension('moonPhase', (ctx) => {
  return ctx.game.world.moonPhase; // 0-3
});
```

---

## Text Templates

Module text can include **template slots** that resolve to nested modules.

### Slot Syntax

```javascript
{
  text: 'She {npc.weight_reaction} at you.',
  // Resolves to: "She seems rounder than before at you." (if weight gained)
}
```

### Nested Resolution

Slots are resolved recursively, allowing arbitrarily deep nesting:

```javascript
{
  text: 'The {spell.name} effect causes {npc.reaction}, leaving her {npc.fullness}.'
}
```

### Max Depth

Template recursion has a maximum depth of 5 levels to prevent infinite loops.

---

## Lexicon

The lexicon provides **word-level vocabulary** that scales with weight stage and body type.

### Word Categories

**Size Words**:
```javascript
lexicon.pickWord('size', 5);  // 'heavy', 'hefty', 'substantial', 'powerful'
```

**Movement Words**:
```javascript
lexicon.pickWord('movement', 8);  // 'quakes with each step', 'lumbers impossibly'
```

**Body Part Words** (body-type aware):
```javascript
lexicon.pickWord('body', 6, 'pear');  // 'colossal hips'
lexicon.pickWord('body', 3, 'apple'); // 'full belly'
```

**Clothing Fit Words**:
```javascript
lexicon.pickWord('clothing', 7);  // 'bursts at the seams', 'tears visibly'
```

**Fullness Words**:
```javascript
lexicon.pickWord('fullness', 10);  // 'apocalyptically full', 'universe-full'
```

### Using Lexicon in Modules

```javascript
engine.registerModule('npc.examine', [
  {
    when: { stage: { min: 8 } },
    text: (ctx) => {
      const sizeWord = lexicon.pickWord('size', ctx.stage);
      return `She is ${sizeWord}.`;
    },
  },
]);
```

---

## NPC Personas

Named NPCs (Barkeep Bella, Silvia Merchant, etc.) have **personality overlays** that add character-specific dialogue variants.

### Registering Persona Variants

```javascript
engine.registerModuleVariants('npc.greeting', bellaVariants, { weight: 4 });
// weight: 4 means Bella's variants are 4x more likely than generic variants
```

### Named NPCs (with personas)

1. **Barkeep Bella** (Innkeeper) - Friendly, food-loving, hospitable
2. **Silvia the Merchant** - Shrewd, business-minded, calculating
3. **Gardener Gregg** - Peaceful, content, appreciates growth
4. **Captain Cassandra** - Stern, disciplined, vigilant
5. **Chef Gertrude** - Commanding, passionate about food, proud

Each named NPC has variants registered with weight multiplier 4, making their personality dominate in dialogue generation.

---

## Spell Narration

Spells use the text engine to generate dynamic narration. The `SpellNarrator` helper provides methods for common spell narration tasks.

### Spell Effect Narration

```javascript
import SpellNarrator from '../../game/magic/SpellNarrator.js';

const narration = SpellNarrator.narrateSpellEffect(spell, target);
// Returns: "The earth erupts with a tremendous force..."
```

### Weight Gain Narration

```javascript
const narration = SpellNarrator.narrateWeightGain(target, 50);
// Returns: "She becomes noticeably heavier and rounder. (+50 lbs)"
```

### Spell Interaction Narration

```javascript
const interaction = SpellNarrator.narrateSpellInteraction(
  'Hold Person',
  'Erupting Earth',
  target
);
// Returns: "The paralyzed target cannot escape as the food eruption buries them..."
```

---

## Adding New Dialogue

### Step 1: Create Module Registration

In `src/textEngine/scenes/npc.js`:

```javascript
engine.registerPool('npc.custom_dialogue', [
  {
    when: { reputation: { min: 50 }, stage: { min: 5 } },
    text: [
      'She greets you warmly, her large frame beaming with contentment.',
      'She smiles at you, clearly satisfied with life.',
    ],
    weight: 3,
  },
  {
    when: { reputation: { max: 24 } },
    text: 'She looks at you with indifference.',
    weight: 1,
  },
  {
    when: {},
    text: 'She nods to you.',
  },
]);
```

### Step 2: Call from NPC Method

In `src/game/entities/NPC.js`:

```javascript
getCustomDialogue() {
  try {
    const engine = getTextEngine();
    const ctx = this._createContext();
    return engine.render('npc.custom_dialogue', ctx);
  } catch (error) {
    return 'She looks at you.';
  }
}
```

### Step 3: Call from Game Component

In `src/components/Game.jsx`:

```javascript
const dialogue = npc.getCustomDialogue();
this.state.textEngine.addText(dialogue);
```

---

## Adding New Spell Narration

### Step 1: Create Effect Module

In `src/textEngine/scenes/spell.js`:

```javascript
engine.registerModule('spell.effect.my_spell', [
  {
    when: {},
    text: 'A magical effect erupts with spectacular power!',
  },
]);
```

### Step 2: Update Spell Effect

In `src/game/magic/SpellLibrary.js`:

```javascript
.addEffect(
  new SpellEffect('Main Effect', 'Description', (caster, target) => {
    const narration = SpellNarrator.narrateSpellEffect(spell, target);
    
    return {
      type: 'custom_effect',
      description: narration,
      weightChange: 50,
    };
  })
)
```

---

## Anti-Repetition

The engine tracks recently used text to prevent repetition.

### How It Works

- **Session Tracking**: `sessionUsed` Set tracks text used this session
- **Week Tracking**: `weekUsed` Map tracks text with timestamps
- **Penalty**: Recently used text gets weight penalty in pool selection

### Configuration

```javascript
this.SESSION_REPEAT_WEIGHT = 0.12;  // 12% of original weight if used this session
this.WEEK_REPEAT_WEIGHT = 0.4;      // 40% of original weight if used this week
```

### Resetting Session

```javascript
engine.resetSession(); // Clear session tracking (for testing)
```

---

## Error Handling

The engine has graceful fallbacks. If narration fails, hardcoded text is returned.

### Safe Rendering Pattern

```javascript
try {
  const engine = getTextEngine();
  const ctx = this._createContext();
  const text = engine.render('module.key', ctx);
  return text || fallbackText;
} catch (error) {
  return fallbackText;
}
```

---

## Testing

### Unit Testing Variant Selection

```javascript
const engine = new ModularTextEngine();

engine.registerModule('test.variant', [
  { when: { stage: 5 }, text: 'High stage' },
  { when: { stage: { max: 4 } }, text: 'Low stage' },
]);

const ctx = { d: { stage: 5 } };
const result = engine.render('test.variant', ctx);
expect(result).toBe('High stage');
```

### Testing with NPC

```javascript
const npc = new Innkeeper();
npc.playerReputation = 75;
const dialogue = npc.getDialogue();
expect(dialogue).toContain('friendly');
```

---

## Best Practices

1. **Always include a wildcard variant** (`when: {}`) as fallback
2. **Use when-conditions for clarity** - explicit is better than implicit
3. **Keep text arrays under 5 items** - more = unpredictable
4. **Test weight stages 0, 5, and 11** - edge cases matter
5. **Document custom dimensions** - future authors need to know
6. **Use persona weight: 4** - dominates generics without being oppressive
7. **Leverage lexicon words** - consistency across game
8. **Organize modules by feature** - easier to maintain

---

## Example: Complete NPC Module

```javascript
engine.registerPool('npc.greeting', [
  // High reputation + willing to eat
  {
    when: { reputation: { min: 50 }, willingness: { min: 70 } },
    text: [
      'Oh, what a wonderful surprise! I was just thinking of you!',
      'Welcome, dear friend! Come in, come in!',
    ],
    weight: 4, // Very likely
  },

  // Neutral reputation
  {
    when: { reputation: { min: -24, max: 49 } },
    text: [
      'Oh, hello there. How are you?',
      'Welcome. What brings you here?',
    ],
    weight: 2,
  },

  // Low reputation
  {
    when: { reputation: { max: -25 } },
    text: [
      'I have nothing to say to you.',
      'Stay back.',
    ],
    weight: 1,
  },

  // Fallback
  {
    when: {},
    text: 'Hello.',
  },
]);
```

---

## Troubleshooting

**Text not appearing?**
- Check that module key matches exactly (case-sensitive)
- Verify when-conditions are being met
- Confirm context dimensions are derived correctly

**Same text repeating?**
- Anti-repetition may have penalized variants
- Call `engine.resetSession()` in testing
- Add more variant options

**Narration feels generic?**
- Persona weight may be too low (should be 4)
- Add more specific when-conditions
- Use lexicon words for variation

---

## API Reference

### ModularTextEngine

```javascript
engine.registerModule(key, variants, opts)
engine.registerPool(key, variants, opts)
engine.registerDimension(key, deriveFn)
engine.registerModuleVariants(key, variants, opts)
engine.createContext(rawState)
engine.render(template, ctx, opts)
engine.pick(arr)
engine.resetSession()
```

### SpellNarrator

```javascript
SpellNarrator.narrateSpellCast(spell, caster)
SpellNarrator.narrateSpellEffect(spell, target)
SpellNarrator.narrateWeightGain(target, amountGained)
SpellNarrator.narrateSpellInteraction(spell1, spell2, target)
```

---

**Last Updated**: 2026-06-18  
**Engine Version**: 1.0  
**Compatibility**: All weight-gain themed dialogues and spell narration
