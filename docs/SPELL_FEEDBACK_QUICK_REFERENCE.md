# Spell Feedback System — Quick Reference

## Problem Statement

**Current state**: All spells funnel into fullness gauge changes. Combat log is bare-bones ("You cast X"). No mechanical or narrative differentiation between spell types.

**Goal**: Make spell families mechanically and narratively distinct in combat feedback without new UI.

---

## Solution Overview

### Four Spell Families

| Family | Mechanic | Narrative | Example |
|--------|----------|-----------|---------|
| **Feeding** | Fullness ↑ → mobility ↓ → actions ↓ (auto via existing system) | Food assault; sensory description | `Conjure Morsel`, `Erupting Earth` |
| **Restraint** | Condition applied: `restrained` → actions = 0 (override) | Helplessness; enemy locked down | `Hold Person`, `Confection Snare` |
| **Movement** | Condition applied: `confined` OR repositioning | Tactical trap; position-based control | `Telekinesis`, `Float`, `Enhance Gravity` |
| **Transformation** | Stat changes (stomach, willingness, weight) | Fate rewrite; long-term impact | `Ravenous Expansion`, `Polymorph` |

### Required Changes

1. **Add `conditions` system to entities** (minimal)
   - Entity.conditions = Map (stores condition flags)
   - Check `restrained`/`asleep` in `actionsAvailable()` → return 0
   - Check `confined` in `move()` → prevent movement

2. **Create `SpellNarrative.js` module** (new file)
   - Generates diegetic log text per spell family
   - Templates for each category + fallback

3. **Extend combat log** (plumbing)
   - Capture spell narrative + mechanical outcome in log entry
   - No new UI; just richer text

4. **Audit spell tags** (content validation)
   - All combat spells must have one tag: `feeding`, `restraint`, `movement`, or `transformation`

---

## Implementation Checklist

### Tier 1: Foundation (Must-do)
- [ ] Add `entity.conditions = new Map()` in `Combat.makeCombatant()`
- [ ] Update `actionsAvailable()` to return 0 if `restrained`/`asleep`
- [ ] Update `move()` to check `confined` and return early if set
- [ ] Import `applyCondition()` from `EnemyController.js` (already exists; use as-is)

### Tier 2: Narrative (Core Feature)
- [ ] Create `src/game/combat/SpellNarrative.js`
- [ ] Implement `narrativeFor(spell, caster, target, mechanicalOutcome)` function
- [ ] Build template families: `FeedingTemplates`, `RestraintTemplates`, `MovementTemplates`, `TransformationTemplates`
- [ ] Add fallback generic template

### Tier 3: Integration (Plumbing)
- [ ] In spell casting handler (`SpellResolver.js` or equivalent):
  - Extract mechanical outcome from spell result
  - Call `narrativeFor()` to generate narrative
  - Attach both to combat log entry
- [ ] Update combat log entry structure to include `{ spell: { name, category, narrative, mechanicalOutcome } }`

### Tier 4: Validation (Content Safety)
- [ ] Audit `SpellLibrary.js`: Ensure all combat spells have a category tag
- [ ] Add `content:lint` rule: "All combat spells must have one of: feeding, restraint, movement, transformation"
- [ ] Tag any missing spells (most already have tags; just validate)

### Tier 5: Testing (Sign-off)
- [ ] Unit: Condition application, action override, movement block
- [ ] Integration: Spell cast → narrative gen → log entry
- [ ] Playtesting: Do different families feel mechanically distinct?

---

## File Changes Summary

| File | Change | Risk | Effort |
|------|--------|------|--------|
| `src/game/combat/Combat.js` | +3 small changes (conditions init, 2 checks) | Low | 30 min |
| `src/game/combat/SpellNarrative.js` | New file; 300 lines templates | Low | 2 hours |
| `src/game/magic/SpellResolver.js` | +spy on results, call narrativeFor() | Medium | 1 hour |
| `src/game/magic/SpellLibrary.js` | Audit + tag missing spells | Low | 30 min |
| `src/game/mechanics/content_lint.js` | Add tag validation rule | Low | 30 min |

**Total effort**: ~5 hours implementation + playtesting.

---

## Code Snippets: Key Integration Points

### 1. Conditions Init (Combat.js)
```js
function makeCombatant(entity, initiative, pos = {}) {
  if (!entity.stomachCapacity) entity.stomachCapacity = 0;
  if (entity.fullness == null) entity.fullness = 0;
  if (!entity.conditions) entity.conditions = new Map(); // NEW
  // ... rest of function
}
```

### 2. Action Override (Combat.js)
```js
export function actionsAvailable(entity) {
  if (entity.conditions?.has('restrained') || entity.conditions?.has('asleep')) {
    return 0;
  }
  if (entity.conditions?.has('slowed')) {
    return Math.min(1, ACTIONS_BY_MOBILITY[combatMobilityFor(entity)] ?? 0);
  }
  return ACTIONS_BY_MOBILITY[combatMobilityFor(entity)] ?? 0;
}
```

### 3. Movement Block (Combat.js)
```js
export function move(combatant, dir, opts = {}) {
  if (combatant.conditions?.has('confined')) return; // NEW
  // ... rest of function
}
```

### 4. Narrative Generation (SpellNarrative.js)
```js
export function narrativeFor(spell, caster, target, mechanicalOutcome = {}) {
  const templates = selectTemplateFamily(spell);
  return templates.generate(spell, caster, target, mechanicalOutcome);
}

function selectTemplateFamily(spell) {
  if (spell.tags?.includes('restraint')) return RestraintTemplates;
  if (spell.tags?.includes('feeding')) return FeedingTemplates;
  if (spell.tags?.includes('movement')) return MovementTemplates;
  if (spell.tags?.includes('transformation')) return TransformationTemplates;
  return FallbackTemplates;
}
```

### 5. Spell Casting Integration (SpellResolver.js)
```js
// After spell is resolved:
const mechanicalOutcome = extractMechanicalOutcome(spellResult);
const { narrative, mechanicalSummary } = narrativeFor(spell, caster, target, mechanicalOutcome);

spellResult.combatLog = {
  narrative,
  mechanicalSummary,
  category: getSpellCategory(spell),
};
```

### 6. Log Entry (wherever spells are logged)
```js
combat.log.push({
  round: combat.round,
  combatant: c.entity.name,
  type: 'spell_cast',
  spell: {
    name: spell.name,
    category: spell.tags?.[0], // or computed
    narrative: result.combatLog.narrative,
    mechanicalOutcome: result.combatLog.mechanicalSummary,
  },
});
```

---

## Design Principles

1. **No new UI**: Everything flows through existing combat log text.
2. **Conditions over modifications**: Use conditions for state, not stat tweaks.
3. **Diegetic narrative only**: Never mention "fullness gauge," "action slots," or mechanics; only what the character perceives.
4. **Spell tags as law**: Spell → tag → narrative family. Audited via lint.
5. **Orthogonal to existing systems**: Conditions don't break fullness/mobility logic; they layer on top.

---

## Testing Scenarios

### Scenario 1: Feeding Spell Stack
- Cast feeding spell 3 times in sequence.
- Expect: Log shows progressively heavier food impact; enemy slows each time.
- Pass condition: Narrative and mechanical outcomes align; enemy actions reduce as fullness increases.

### Scenario 2: Restraint → Feeding
- Cast restraint spell, then feeding spell.
- Expect: Restraint log says "cannot act"; feeding log applies while enemy is helpless.
- Pass condition: Enemy has 0 actions while restrained.

### Scenario 3: Movement Confinement
- Cast movement spell that applies `confined`.
- Expect: Enemy cannot use `move()` commands; position locked.
- Pass condition: Enemy attempt to flee fails; position unchanged.

### Scenario 4: Transformation Combo
- Cast transformation spell (e.g., `Ravenous Expansion`), then feeding.
- Expect: Transformation narrative describes belly/willingness change; feeding spell narratively reflects new state.
- Pass condition: Subsequent feeding spells have clearer impact; log shows the chain.

---

## Spell Tags Checklist

### Must-Tag for Combat
- All spells appearing in dungeon encounters or combat encounters need a category tag.
- Priority: High-level spells (L2+) and commonly-cast spells.

### Tags to Use
```
feeding           # Increases fullness, slows enemy
restraint         # Prevents actions; enemy immobilized
movement          # Controls position or prevents movement
transformation    # Permanent stat changes; enables combos
```

### Existing Tags (Don't Remove)
Keep existing tags like `'conjuration'`, `'enchantment'`, `'transmutation'` etc. Just add category tag alongside.

Example:
```js
// Before
tags: ['conjuration', 'feeding']

// After (no change, already correct)
tags: ['conjuration', 'feeding']
```

---

## Success Metrics

### Metrics to Track Post-Implementation

1. **Clarity**: Can playtesters understand spell effects from narrative alone (without reading code)?
   - Target: > 80% of testers can predict spell outcome before seeing mechanical output.

2. **Distinction**: Do spell families feel mechanically different?
   - Target: Feeding vs. restraint vs. movement feel like different buttons, not just flavor.

3. **Engagement**: Do players re-read logs and experiment with combos?
   - Target: Players voluntarily describe their strategy afterward; ask for spell combinations.

4. **Fairness**: Do enemy defeats feel earned, not random?
   - Target: Players describe their victory as a chain reaction, not luck.

---

## Open Design Questions

1. **Condition persistence**: Do conditions auto-expire after one round, or persist until dispelled?
   - Current: Persist (simpler for Phase 1). Add expiration in Phase 2 if needed.

2. **Stacking**: Can `restrained` and `confined` apply to the same entity?
   - Current: Yes (Map allows arbitrary conditions). Both checked independently in action/move logic.

3. **Spell upgrades**: Do higher-level variants of the same spell get different narratives?
   - Current: Same template for all variants (e.g., all `Force Feed` levels use same narrative). Variations via mechanical outcome only.

4. **Enemy narratives**: Should enemies have spells with narratives too?
   - Current Phase 1: Player-only. Phase 2: Add "The goblin cast Force Feed on you..." support.

---

## Known Limitations (Phase 1)

- Conditions don't auto-expire; manual cleanup required between encounters.
- Multi-target spells use single narrative or generic "affects N targets" language.
- No conditional narratives based on previous spells (e.g., "She's already full from the morsel—the ooze just adds insult").
- Enemy AI doesn't adapt based on conditions (existing behavior preserved).

All of these are solvable in Phase 2 without breaking Phase 1 changes.

---

## Quick Debug Checklist

If spell narrative isn't showing:
- [ ] Spell has a category tag? Check `SpellLibrary.js`.
- [ ] `narrativeFor()` was called? Add console.log in `SpellResolver.js`.
- [ ] Log entry structure includes `spell` field? Check combat log schema.
- [ ] UI is rendering `spellCast.narrative`? Check log display component.

If condition doesn't work:
- [ ] Entity has `.conditions` Map? Check `makeCombatant()`.
- [ ] Condition was applied? Check `applyCondition()` called with correct key.
- [ ] Action override is checked? Grep for `restrained` in `actionsAvailable()`.
- [ ] Movement block is checked? Grep for `confined` in `move()`.

---

## Links to Full Docs

- **System Design**: `docs/SPELL_FEEDBACK_SYSTEM.md`
- **Implementation Spec**: `docs/SPELL_FEEDBACK_IMPLEMENTATION.md`
- **Combat Examples**: `docs/SPELL_FEEDBACK_EXAMPLES.md`
- **This file**: `docs/SPELL_FEEDBACK_QUICK_REFERENCE.md`

Start here → Read SPELL_FEEDBACK_SYSTEM.md → Reference IMPLEMENTATION spec → Review EXAMPLES for playtesting → Use QUICK_REFERENCE for dev lookups.
