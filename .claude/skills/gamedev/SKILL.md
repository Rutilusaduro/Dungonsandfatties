---
name: gamedev
description: >
  Operating manual for Dungeons & Fatties — a React + Vite text-adventure RPG with
  D&D-style spell slots, a 3-class system, dungeon crawl (3 floors × 3 encounters),
  fattening combat, equipment slots, and XP/level progression.
  Use whenever working on this repo: adding enemies, spells, equipment, dungeon floors,
  combat tweaks, UI components, narrative text, or wiring new mechanics into Game.jsx.
  Triggers on: "add enemy", "new spell", "add floor", "tweak combat", "add item",
  "new class", "change loot", "dungeon content", "balance", "game feel".
---

# Dungeons & Fatties — Gamedev Operating Manual

**Dungeons & Fatties** (repo: `Rutilusaduro/Dungonsandfatties`, branch `claude/combat-fattening-mechanics-j4oa23`) is a React + Vite text-adventure RPG. The player picks a class, explores The Bloated Boar Tavern, then descends 3 dungeon floors — fattening enemies via spells and force-feeding until they're immobilized or succumb, collecting loot, and levelling up.

---

## Stack

| Layer | Path | Notes |
|-------|------|-------|
| Entry | `src/main.jsx` → `src/App.jsx` → `src/components/Game.jsx` | |
| Game engine (pure JS) | `src/game/` | **No React imports here** |
| UI (thin wrappers) | `src/components/` | Calls game engine, sets React state |
| Text engine | `src/textEngine/` | Slot-based prose; see `gamedev-text-engine` skill for deep dive |
| Build | `npm run dev` / `npm run build` | Vite 8, React 19 |
| Tests | `npm test` | Vitest; `src/tests/*.test.js` |

---

## File Map

```
src/game/
  Character.js               — Player class: stats, weight, spell slots, equip/unequip
  GameState.js               — Singleton: setPlayer / getPlayer
  classes/ClassRegistry.js   — 3 class defs: Paladin, Mage, Warlock
  magic/
    Spell.js                 — Base Spell class; .atSlot(n) for multi-tier
    SpellLibrary.js          — All spells registered here
    SpellResolver.js         — cast() → { result }
    SpellNarrator.js         — Flavor text post-cast
    InteractionTable.js      — Spell combo synergies
    slotUtils.js             — optionSlotCost(spell, option) shared formula
  combat/
    Combat.js                — Combat class, fillUp, purge, checkWinState,
                               combatMobilityFor, actionsAvailable
    EnemyController.js       — ARCHETYPES map, controllerFor(traitId)
    Reward.js                — computeReward(loser, winState) → {xp, calorieBank}
  dungeon/
    DungeonState.js          — State machine: floorIndex, encounterIndex, advance()
    Enemies.js               — makeEnemy(def), FLOOR1/2/3_ENEMIES arrays
  items/
    Equipment.js             — Equipment class, ITEMS, FLOOR_LOOT, canEquip
    Food.js                  — Food item types
  mechanics/
    ProgressionSystem.js     — XP_THRESHOLDS, awardXP, applyLevelBonus, levelUpChoices
    NutritionSystem.js       — calorie tracking, long-rest weight gain
    WeightStages.js          — WEIGHT_STAGES 0-11 (by % gain over baseWeight)
    SwellSystem.js           — applyFeastExile (banished to feast realm)
  conditions/
    ActiveConditions.js      — Spell conditions (restrained, buried, satiated…)
  entities/
    NPC.js                   — Sentient NPCs: dialogue, willingness, weight
    Creature.js              — Animals: hunger loop
  environment/
    EnvironmentalObject.js   — Zone props (Earth, Wood, Stone, Furniture, Water)
  world/
    Zone.js                  — Zone: NPCs, creatures, objects, exits, food
    World.js                 — World.createSampleWorld() — tavern, garden, kitchen, dungeon

src/textEngine/
  stages.js                  — getStageId(currentWeight, baseWeight) → 0-11
  engine.js                  — render(moduleKey, ctx) → prose string
  scenes/combat.js           — combat prose pools
  scenes/spell.js            — per-spell narrator pools
  scenes/npc.js              — NPC dialogue pools

src/components/
  Game.jsx                   — Root game loop, all state, all handlers
  CombatScreen.jsx           — Combat overlay (fullness bars, spell list, actions)
  CharacterCreation.jsx      — Class picker + name input
  SpellCaster.jsx            — Spell UI (used OUTSIDE combat)
  EquipmentPanel.jsx         — 4 equipment slots + inventory
  LevelUpPanel.jsx           — Level-up modal, spell choice
  CharacterPanel.jsx         — Weight, stats sidebar
  ZoneDisplay.jsx            — Zone exits, NPCs, creatures
  NPCInteraction.jsx         — Talk / Examine NPC panel
```

---

## Classes

Defined in `src/game/classes/ClassRegistry.js`:

| Class | Off-hand | Accent | Starting spells (count) | Slot profile (L1/L2/L3) |
|-------|----------|--------|------------------------|--------------------------|
| Paladin | shield | `#c9a227` | 5 | 4/2/1 |
| Mage | tome | `#4a7fc1` | 6 | 3/3/1 |
| Warlock | focus | `#8b5cf6` | 5 | 2/3/2 |

Starting gear is assigned in `Game.jsx → startGame()`:
- All classes: `feeding_fork` (weapon)
- Paladin: `divine_platter` (off-hand)
- Mage: `gluttons_tome` (off-hand)
- Warlock: `hunger_focus` (off-hand)

---

## Spell Slots

```js
// slotLevel formula (in slotUtils.js)
spellLevel <= 1 → slot 1
spellLevel 2-3 → slot 2
spellLevel 4+  → slot 3
```

Each option on a spell can override via `option.slotLevel`. Use `optionSlotCost(spell, option)` (from `slotUtils.js`) everywhere — never inline the formula.

Player slots replenish on Long Rest: `player.spellSlots = { ...player.maxSpellSlots }`.

---

## Combat System

### Core exports from `Combat.js`

```js
combatMobilityFor(entity) → 'full'|'present'|'planning'|'economy'|'minimal'|'immobile'
actionsAvailable(entity)  → 0|1|2
fillUp(entity, amount)    — adds to entity.fullness (capped at stomachCapacity)
purge(entity, amount?)    — drains fullness (default: full clear)
checkWinState(entity)     → null | { state: 'immobilized'|'succumbed'|'consumed', via }
```

Win conditions:
- **Immobilized**: `combatMobilityFor(entity) === 'immobile'`
- **Succumbed**: `entity.willingness >= 75` (glutton archetype gorges itself to this)
- **Consumed**: set externally via `entity._defeatState` (finisher spell hook)

### Enemy archetypes (`EnemyController.js`)

| Archetype | Trait | AI behaviour |
|-----------|-------|-------------|
| `flyer`   | kites, feedRate 18% | stays at distance, pelts player |
| `brute`   | closes, feedRate 30% | rushes in, high feed rate |
| `glutton` | gorgeRate 34%, gorgeWill +14 | self-gorges, raises own willingness |
| `dispeller` | purges self, feedRate 15% | counters fullness each turn; denies `restrained` |

### Combat loop in `Game.jsx`

```
handleEnterDungeon()       — new DungeonState + spawnEnemies + new Combat
doCombatPlayerAction(fn)   — player action fn → enemy AI turn (controllerFor) →
                             per-round fullness drain (10%) → checkWinState
handleCombatCastSpell(spell) — consumes spell slot, fillUp enemy by 20/35/50% stomach
handleForceFeed()          — fillUp enemy 15% stomach (no slot cost)
handleFlee()               — clear combatState + dungeon
handleCombatContinue()     — dungeon.advance() → spawn next OR victory
```

**Important ordering**: `dungeon.advance()` and next `setCombatState` happen BEFORE `gainXP()` to prevent level-up modal racing dungeon state.

---

## Dungeon Structure

`DungeonState` (`src/game/dungeon/DungeonState.js`):

```
Floor 1 — The Pantry     (3 encounters: Kitchen Imp, Pantry Goblin, Snack Warden)
Floor 2 — The Kitchen    (3 encounters: Banquet Specter, Oven Imp, Chef's Nightmare)
Floor 3 — The Feasting Hall (3 encounters: Glutton Knight, Feasting Wraith, Grand Gourmand)
```

Enemy defs live in `src/game/dungeon/Enemies.js` as plain objects passed through `makeEnemy(def)`. Required fields:

```js
{
  name, archetype,       // archetype key: 'flyer'|'brute'|'glutton'|'dispeller'
  baseWeight,            // in lbs
  stomachCapacity,       // capacity for fillUp; default = baseWeight * 0.8
  willingness,           // 0-100; glutton raises this via gorge
  description,           // flavor shown in CombatScreen
  xpValue,
  lootTable: ['item_key', ...],
  bossEvent?,            // string shown in text buffer on defeat (boss only)
}
```

---

## Equipment System

`src/game/items/Equipment.js`:

```js
new Equipment(name, {
  slot,        // 'weapon'|'offhand'|'armor'|'accessory'
  offhandType, // 'shield'|'tome'|'focus' — restricts to matching class off-hand
  rarity,      // 'common'|'uncommon'|'rare'|'legendary'
  description, passiveText,
  bonusSlots,  // e.g. { 2: 1 } → +1 L2 slot
  feedBonus,   // % added to player.feedBonusMultiplier (e.g. 10 → +10%)
  bonusWeight, // adds to effective capacity calculations (future)
})
```

`FLOOR_LOOT[floorNum]` maps floor 1/2/3 → array of item keys that can drop. `DungeonState.advance()` picks from intersecting enemy `lootTable` + floor pool, max 2 unique per encounter.

`_applyEquipmentBonuses()` on Character recomputes `maxSpellSlots` from `_baseSpellSlots` (frozen at construction) + all equipped `bonusSlots`. Handles both equip (+diff) and unequip (−diff, clamped to 0).

---

## Weight Stages

From `src/textEngine/stages.js` — `getStageId(currentWeight, baseWeight) → 0..11`:

| Stage | Key | Min % gain | Label |
|-------|-----|-----------|-------|
| 0 | slight | 0% | Slight |
| 1 | slim | 5% | Slim |
| 2 | soft | 15% | Soft |
| 3 | chubby | 30% | Chubby |
| 4 | plump | 50% | Plump |
| 5 | heavy | 75% | Heavy |
| 6 | fat | 100% | Fat |
| 7 | veryFat | 150% | Very Fat |
| 8 | enormous | 200% | Enormous |
| 9 | colossal | 300% | Colossal |
| 10 | blob | 400% | Blob |
| 11 | leviathan | 500% | Leviathan |

Combat mobility degrades around stages 7-10 (also gated by fullness ratio via `fullnessMobilityFor`). `checkWinState` triggers immobilized at `combatMobilityFor === 'immobile'`.

---

## Progression

`src/game/mechanics/ProgressionSystem.js`:

```
XP thresholds: [0, 0, 300, 900, 2100, 4500]  (levels 1-5)
```

Each level-up:
1. `awardXP(player, amount)` — bumps `player.level`, returns `{ leveledUp, newLevel }`
2. `setLevelUpState({ level, choices })` — triggers `LevelUpPanel`
3. Player picks spell → `handleLevelUpChoice(spellName)`
4. `applyLevelBonus(player)` — adds slot bonuses per `SLOT_BONUS_BY_CLASS[class][level]`

**Level-up spell pools** (`LEVEL_UP_SPELLS` in ProgressionSystem.js): 9 spells per class, shuffled and filtered for unknowns, 3 presented as choices.

---

## Text Engine (brief)

Full docs in the `gamedev-text-engine` skill. Short version for this game:

- `textEngine.addText(str, { type? })` appends to buffer
- `setTextBuffer(textEngine.getBuffer())` forces React re-render (getBuffer returns `[...this.buffer]` — new ref each call)
- `addEntry(text, type?)` is a convenience wrapper in `Game.jsx`
- Spell narration: `SpellNarrator.narrateSpellScene(spell, caster, target, option)` → string
- NPC prose: `engine.render('npc.examine', ctx)` where `ctx = npc._createContext()`

---

## Common Tasks

### Add a new enemy

1. Add a def object to the appropriate `FLOOR_N_ENEMIES` array in `Enemies.js`
2. Ensure all required fields are present (see schema above)
3. Add its item key(s) to `FLOOR_LOOT[n]` in `Equipment.js` if new items needed
4. Create the item in `ITEMS` if it doesn't exist

### Add a new dungeon floor

1. Add a new entry to `FLOORS` in `DungeonState.js`
2. Add enemy arrays in `Enemies.js`
3. Ensure `XP_THRESHOLDS` and `LEVEL_UP_SPELLS` cover the additional level range if needed

### Add a new equipment item

```js
export const ITEMS = {
  my_item: new Equipment('My Item', {
    slot: 'accessory',
    rarity: 'uncommon',
    description: '...',
    passiveText: 'Passive: ...',
    feedBonus: 15,   // +15% to feedBonusMultiplier
    bonusSlots: {},
  }),
};
```
Then add the key to `FLOOR_LOOT[n]` and to enemy `lootTable` arrays.

### Add a new spell to the combat spell list

Spells shown in `CombatScreen` come from `knownSpells` (a `Set<string>` filtered through `SpellLibrary.getAllSpells()`). To make a spell available in combat:
1. Ensure it exists in `SpellLibrary.js`
2. Add it to the class's `startingSpells` (in `ClassRegistry.js`) or level-up pool (`LEVEL_UP_SPELLS`)
3. Combat cast calls `handleCombatCastSpell(spell)` which uses `spell.level` to compute fill amount and slot cost — tune `spell.level` accordingly

### Tune combat balance

Key levers:
- `enemy.stomachCapacity` — how much filling it takes to immobilize
- `enemy.willingness` + `archetype.gorgeWill` — how fast glutton self-succumbs
- `archetype.feedRate` — how hard the enemy fills the player each action
- `player.stomachCapacity = baseWeight * 0.6` (set in Character constructor)
- Fill amounts in combat: L1 spell = 20%, L2 = 35%, L3 = 50%, force-feed = 15%
- Fullness drain per round: 10% of stomachCapacity (after both turns)

### Add a new class

1. Add entry to `CLASS_REGISTRY` in `ClassRegistry.js`:
   ```js
   MyClass: {
     name: 'MyClass', offHand: 'focus'|'tome'|'shield',
     startingSpells: [...],   // must exist in SpellLibrary
     spellSlots: { 1: N, 2: N, 3: N },
     baseWeight: N,
     accentColor: '#xxxxxx',
     passive: 'description of class passive',
   }
   ```
2. Add a starting off-hand item mapping in `Game.jsx → startGame()`
3. Add a `LEVEL_UP_SPELLS.MyClass` array in `ProgressionSystem.js`
4. Add a `SLOT_BONUS_BY_CLASS.MyClass` array (6 entries, index = level)

---

## Build & Test

```bash
npm run dev      # dev server
npm run build    # production build — must pass before committing
npm test         # vitest suite (src/tests/)
```

Build warnings about chunk size (>500kB) are expected and non-blocking.

---

## Key Invariants

- **Engine code never imports React** — keep `src/game/**` free of React
- **`_baseSpellSlots` is frozen at Character construction** — `applyLevelBonus` and `_applyEquipmentBonuses` both update it to avoid drift
- **`optionSlotCost` from `slotUtils.js`** — never inline the L1/L2/L3 formula
- **`doCombatPlayerAction` functional updater** — `gameState.getPlayer()` is called *inside* the updater, not outside it
- **Spell slots consumed in combat** — `handleCombatCastSpell` decrements `player.spellSlots[cost]` before `fillUp`
- **`dungeon.advance()` before `gainXP()`** — prevents level-up modal racing dungeon spawn
- **Re-render pattern** — `setTextBuffer(textEngine.getBuffer())` — `getBuffer()` returns `[...this.buffer]` (new ref each call)
