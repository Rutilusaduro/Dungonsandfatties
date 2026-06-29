# Spell Feedback System — Implementation Technical Specification

This document translates the design into concrete code changes, required modifications, and integration points.

---

## 1. Conditions System Architecture

### 1.1 Entity.conditions Field

Every entity in combat must have a `conditions` collection. Add during combatant creation in `Combat.js`.

**Location**: `src/game/combat/Combat.js`, function `makeCombatant()` (line 197–202)

**Current code**:
```js
function makeCombatant(entity, initiative, pos = {}) {
  if (!entity.stomachCapacity) entity.stomachCapacity = 0;
  if (entity.fullness == null) entity.fullness = 0;
  const x = pos.x ?? 1, y = pos.y ?? 0;
  return { entity, initiative, band: BANDS[Math.min(x, BANDS.length - 1)] || 'near', x, y };
}
```

**After change**:
```js
function makeCombatant(entity, initiative, pos = {}) {
  if (!entity.stomachCapacity) entity.stomachCapacity = 0;
  if (entity.fullness == null) entity.fullness = 0;
  if (!entity.conditions) entity.conditions = new Map(); // NEW
  const x = pos.x ?? 1, y = pos.y ?? 0;
  return { entity, initiative, band: BANDS[Math.min(x, BANDS.length - 1)] || 'near', x, y };
}
```

**Rationale**: Using `Map` allows storing condition metadata (e.g., `conditions.set('restrained', { appliedRound: 3, expiresRound: 5 })`). For now, simple presence/absence via `has()` is sufficient.

### 1.2 Action Economy Integration

**Location**: `src/game/combat/Combat.js`, function `actionsAvailable()` (line 51–53)

**Current code**:
```js
export function actionsAvailable(entity) {
  return ACTIONS_BY_MOBILITY[combatMobilityFor(entity)] ?? 0;
}
```

**After change**:
```js
export function actionsAvailable(entity) {
  // Conditions override mobility calculations
  if (entity.conditions?.has('restrained') || entity.conditions?.has('asleep')) {
    return 0; // Cannot act at all
  }
  if (entity.conditions?.has('slowed')) {
    // Slowed caps at 1 action
    return Math.min(1, ACTIONS_BY_MOBILITY[combatMobilityFor(entity)] ?? 0);
  }
  
  return ACTIONS_BY_MOBILITY[combatMobilityFor(entity)] ?? 0;
}
```

**Impact**: Any spell that applies a `restrained` or `asleep` condition will immediately reduce that entity's actions to 0 in the next `actionsAvailable()` call. Existing finisher denials in `EnemyController.js` already check these conditions; no changes needed there.

### 1.3 Movement Constraint

**Location**: `src/game/combat/Combat.js`, function `move()` (line 165–175)

**Current code**:
```js
export function move(combatant, dir, opts = {}) {
  const step = DIRS[dir];
  if (!step) return;
  const cur = coords(combatant);
  const maxX = opts.maxX ?? (BANDS.length - 1);
  const maxY = opts.maxY ?? 0;
  combatant.x = Math.max(0, Math.min(maxX, cur.x + step.dx));
  combatant.y = Math.max(0, Math.min(maxY, cur.y + step.dy));
  if (combatant.y === 0 && combatant.x < BANDS.length) combatant.band = BANDS[combatant.x];
}
```

**After change**:
```js
export function move(combatant, dir, opts = {}) {
  // Check confinement before allowing movement
  if (combatant.conditions?.has('confined')) {
    return; // Movement blocked silently
  }
  
  const step = DIRS[dir];
  if (!step) return;
  const cur = coords(combatant);
  const maxX = opts.maxX ?? (BANDS.length - 1);
  const maxY = opts.maxY ?? 0;
  combatant.x = Math.max(0, Math.min(maxX, cur.x + step.dx));
  combatant.y = Math.max(0, Math.min(maxY, cur.y + step.dy));
  if (combatant.y === 0 && combatant.x < BANDS.length) combatant.band = BANDS[combatant.x];
}
```

**Impact**: Movement spells that apply `confined` condition will prevent repositioning while leaving actions available.

---

## 2. SpellNarrative Module

Create a new file: `src/game/combat/SpellNarrative.js`

### 2.1 Module Structure

```js
/**
 * SpellNarrative — Generate diegetic combat log entries for spells.
 * No UI dependencies; pure text generation.
 */

/**
 * narrativeFor(spell, caster, target, mechanicalOutcome)
 * @param {Spell} spell - The spell being cast
 * @param {Entity} caster - Who is casting
 * @param {Entity} target - Who is being targeted (can be null for area spells)
 * @param {Object} mechanicalOutcome - { fullnessGain, conditionApplied, mobilityShift, etc. }
 * @returns {Object} { narrative, mechanicalSummary }
 */
export function narrativeFor(spell, caster, target, mechanicalOutcome = {}) {
  const templates = selectTemplateFamily(spell);
  return templates.generate(spell, caster, target, mechanicalOutcome);
}

/**
 * selectTemplateFamily(spell) — Match spell to narrative family
 */
function selectTemplateFamily(spell) {
  // Check tags in order of precedence
  if (spell.tags?.includes('restraint')) return RestraintTemplates;
  if (spell.tags?.includes('feeding')) return FeedingTemplates;
  if (spell.tags?.includes('movement')) return MovementTemplates;
  if (spell.tags?.includes('transformation')) return TransformationTemplates;
  return FallbackTemplates;
}
```

### 2.2 Feeding Templates

```js
const FeedingTemplates = {
  generate(spell, caster, target, outcome) {
    const targetName = target?.name || 'the air';
    const narrative = FeedingTemplates.selectNarrative(spell, targetName, outcome);
    const mechanical = FeedingTemplates.mechanicalSummary(outcome);
    return { narrative, mechanicalSummary: mechanical };
  },

  selectNarrative(spell, targetName, outcome) {
    // Match by spell name, or use generic template
    const templates = {
      'Conjure Morsel': () => `A warm, buttery morsel winks into the air and tumbles toward ${targetName}. She catches it and swallows hard. It settles heavy in her belly.`,
      'Sating Spark': () => `A mote of hearth-warmth drifts into ${targetName}'s belly and blooms into sleepy, heavy fullness. She blinks, confused—her body suddenly feels so full.`,
      'Greasy Flick': () => `A fat golden bead of drippings flicks out and splatters across ${targetName}, clinging warm. The grease soaks in and settles.`,
      'Oozing Abundance': () => `An arrow of thick, nutritious ooze strikes ${targetName} and splatters across her, clinging and soaking in. She gasps as the sludge coats her throat and settles down her gullet.`,
      'Erupting Earth': () => `The earth erupts with cascading food—roasted meat, roots, grain. ${targetName} is buried under the avalanche, choking down mouthful after mouthful. Her belly swells visibly.`,
      'Fireball': () => `Flames ignite, and from the inferno emerges roasted food—perfectly seasoned. The scent is hypnotic. ${targetName} can't resist. She gorges, gasping, her belly ballooning.`,
      'Create Food and Water': () => `Magical food shimmers into being. ${targetName} stares at the abundance, unable to resist. She begins to eat, and eat, and eat...`,
      'Feast of Shadows': () => `A phantom feast materializes before ${targetName}. The food looks, smells, and tastes real. She devours it eagerly, feeling genuinely full.`,
      'Plant Growth': () => `Nearby plants burst into edible abundance. ${targetName} is surrounded by fresh fruits and vegetables. She can't help but start eating.`,
    };

    const generatorFn = templates[spell.name] || FeedingTemplates.genericFeedingNarrative;
    return generatorFn(targetName);
  },

  genericFeedingNarrative(targetName) {
    return `You cast a feeding spell. ${targetName} ingests the magical sustenance. She feels heavier.`;
  },

  mechanicalSummary(outcome) {
    if (!outcome.mobilityShift) return '';
    const { from, to } = outcome.mobilityShift;
    const shifts = {
      'full:present': 'Her movements slow.',
      'full:planning': 'Her movements become sluggish.',
      'present:planning': 'She moves with visible effort now.',
      'present:economy': 'She can barely move with the weight.',
      'planning:economy': 'The weight presses down on her.',
      'planning:minimal': 'She sways, nearly immobilized.',
      'economy:minimal': 'She can barely lift her limbs.',
      'minimal:immobile': 'She is pinned by her own bulk.',
    };
    return shifts[`${from}:${to}`] || '';
  },
};
```

### 2.3 Restraint Templates

```js
const RestraintTemplates = {
  generate(spell, caster, target, outcome) {
    const targetName = target?.name || 'the target';
    const narrative = RestraintTemplates.selectNarrative(spell, targetName);
    return { 
      narrative, 
      mechanicalSummary: 'She cannot act this round.'
    };
  },

  selectNarrative(spell, targetName) {
    const templates = {
      'Hold Person': () => `You whisper a word of binding. ${targetName} freezes mid-step—invisible chains of force lock her in place. She struggles, but cannot budge.`,
      'Confection Snare': () => `Sugary vines erupt from the ground and coil around ${targetName}—licorice-dark, impossibly strong. She thrashes as they tighten, binding her wrists and ankles.`,
      'Web': () => `Sticky silk erupts from your fingertips, filling the air. ${targetName} is caught mid-stride, tangled in threads so strong she cannot break free.`,
      'Sleep': () => `Your words hang in the air like honey. ${targetName}'s eyes flutter. She sways, fighting the weight of magical exhaustion, then collapses—unconscious.`,
      'Command': () => `You speak a single word, infused with power. ${targetName} freezes, body locked by the weight of your command, unable to move or speak.`,
    };

    const generatorFn = templates[spell.name] || RestraintTemplates.genericRestraintNarrative;
    return generatorFn(targetName);
  },

  genericRestraintNarrative(targetName) {
    return `You cast a restraint spell. ${targetName} is immobilized.`;
  },
};
```

### 2.4 Movement Templates

```js
const MovementTemplates = {
  generate(spell, caster, target, outcome) {
    const targetName = target?.name || 'the target';
    const narrative = MovementTemplates.selectNarrative(spell, targetName, outcome);
    const mechanical = MovementTemplates.mechanicalSummary(spell, outcome);
    return { narrative, mechanicalSummary: mechanical };
  },

  selectNarrative(spell, targetName, outcome) {
    const templates = {
      'Telekinesis': () => {
        if (outcome.destination === 'table') {
          return `Invisible force seizes ${targetName} and lifts her onto a nearby table. She scrambles, but the force holds her there.`;
        }
        if (outcome.destination === 'floor') {
          return `You yank ${targetName} back down to solid ground with invisible force. She crashes down hard.`;
        }
        return `${targetName} is yanked by invisible force and repositioned.`;
      },
      'Float': () => `Gravity releases ${targetName}, and she drifts upward into the air, weightless. She thrashes, but cannot push herself down—buoyancy holds her suspended.`,
      'Enhance Gravity': () => `The air grows thick and heavy. ${targetName} staggers as if carrying an enormous weight. She can barely lift her limbs.`,
      'Slow': () => `Time thickens around ${targetName}. She moves as if through honey—sluggish, dreamlike, unable to keep pace.`,
      'Gust of Wind': () => `A blast of wind roars through the space. ${targetName} is hurled backward, skidding across the floor until she collides with a wall.`,
    };

    const generatorFn = templates[spell.name] || MovementTemplates.genericMovementNarrative;
    return generatorFn(targetName);
  },

  genericMovementNarrative(targetName) {
    return `You cast a movement spell. ${targetName}'s position shifts.`;
  },

  mechanicalSummary(spell, outcome) {
    if (outcome.conditionApplied === 'confined') {
      return 'She cannot move from this spot.';
    }
    if (outcome.repositioned) {
      return `She is now at ${outcome.newPosition || 'a new location'}.`;
    }
    return '';
  },
};
```

### 2.5 Transformation Templates

```js
const TransformationTemplates = {
  generate(spell, caster, target, outcome) {
    const targetName = target?.name || 'the target';
    const narrative = TransformationTemplates.selectNarrative(spell, targetName, outcome);
    const mechanical = TransformationTemplates.mechanicalSummary(outcome);
    return { narrative, mechanicalSummary: mechanical };
  },

  selectNarrative(spell, targetName, outcome) {
    const templates = {
      'Ravenous Expansion': () => `${targetName}'s belly swells grotesquely—her stomach capacity blooming, her hunger *desperate*. She clutches her distended gut, groaning, *starving* despite her bulk.`,
      'Haste': () => `Time accelerates around ${targetName}. Her jaw works at impossible speed—food vanishes into her mouth as fast as you can conjure it.`,
      'Rapid Digestion': () => `Magical haste floods ${targetName}'s gut. Her food churns violently, processing faster than nature allows.`,
      'Enlarge Person': () => `${targetName} swells. Her frame expands, doubling in size—taller, heavier, more imposing. She towers over you now.`,
      'Polymorph': () => `${targetName}'s form ripples and transforms. She is now a different shape—squatter, rounder, more voracious.`,
    };

    const generatorFn = templates[spell.name] || TransformationTemplates.genericTransformationNarrative;
    return generatorFn(targetName);
  },

  genericTransformationNarrative(targetName) {
    return `You cast a transformation spell. ${targetName}'s body shifts and changes.`;
  },

  mechanicalSummary(outcome) {
    const summaries = [];
    if (outcome.stomachCapacityChange) {
      const pct = (outcome.stomachCapacityChange * 100).toFixed(0);
      summaries.push(`Her stomach capacity ${outcome.stomachCapacityChange > 0 ? 'increases' : 'decreases'} by ${pct}%.`);
    }
    if (outcome.willingnessChange) {
      if (outcome.willingnessChange > 0) {
        summaries.push('Her appetite grows ravenous.');
      } else {
        summaries.push('Her willingness wavers.');
      }
    }
    if (outcome.weightGain) {
      summaries.push(`She gains ${outcome.weightGain} lbs.`);
    }
    return summaries.join(' ');
  },
};
```

### 2.6 Fallback Template

```js
const FallbackTemplates = {
  generate(spell, caster, target, outcome) {
    const targetName = target?.name || 'the area';
    const narrative = `You cast ${spell.name} at ${targetName}. ${spell.description || 'A magical effect occurs.'}`;
    return { narrative, mechanicalSummary: '' };
  },
};
```

---

## 3. Combat Log Integration

### 3.1 Log Entry Structure

**Location**: `src/game/combat/Combat.js`, class `Combat` (line 205–243)

**Current structure** (line 235):
```js
this.log.push({ round: this.round, combatant: c.entity.name, actions });
```

**After change** (still in `nextRound()` or in a dedicated spell-cast logging method):
```js
// When a spell is cast (happens during onTurn callback), log it
this.log.push({
  round: this.round,
  combatant: c.entity.name,
  type: 'spell_cast',
  spell: {
    name: 'Conjure Morsel',
    category: 'feeding',
    caster: c.entity.name,
    target: target?.name || 'area',
    narrative: 'A warm, buttery morsel winks into the air...',
    mechanicalOutcome: 'Her mobility drops to "planning".',
  },
});
```

**Alternative**: If spell casting is already instrumented elsewhere (e.g., `SpellResolver.js`), add logging there instead.

### 3.2 Where Spell Casting Happens

**Location**: `src/game/magic/SpellResolver.js` (line 158+)

The spell resolver is where cast results are computed. After a spell is resolved, capture the result and generate narrative.

**Integration point**:
```js
static resolveCast(spell, caster, target, context) {
  const result = spell.cast(caster, target, context);
  
  // NEW: Generate narrative and mechanical summary
  const mechanicalOutcome = SpellResolver.extractMechanicalOutcome(result);
  const { narrative, mechanicalSummary } = narrativeFor(spell, caster, target, mechanicalOutcome);
  
  // Log it
  result.combatLog = {
    narrative,
    mechanicalSummary,
    category: SpellResolver.getSpellCategory(spell),
  };
  
  return result;
}
```

**Support function** (extract what changed from the spell result):
```js
static extractMechanicalOutcome(spellResult) {
  // Inspect the effects array and build summary
  const outcome = {};
  
  for (const effect of spellResult.effects || []) {
    if (effect.type === 'damage_and_feed') {
      outcome.fullnessGain = effect.calorieTransfer || 0;
    }
    if (effect.type === 'paralysis_applied') {
      outcome.conditionApplied = 'restrained';
    }
    if (effect.type === 'telekinesis_move') {
      outcome.repositioned = true;
      outcome.destination = effect.destination;
    }
    // ... etc. for each effect type
  }
  
  return outcome;
}
```

---

## 4. Condition Application in Spells

### 4.1 How Spells Apply Conditions

When a spell is cast in combat and a restraint effect fires, call:

```js
applyCondition(target.entity, 'restrained', { appliedRound: combat.round });
```

Existing import from `EnemyController.js`:
```js
import { applyCondition } from '../combat/EnemyController.js';
```

The `applyCondition()` function already respects trait denials, so no changes needed there.

### 4.2 Conditions Expire (Optional, Phase 2)

For now, conditions persist until manually cleared. In future, add expiration:

```js
// In a pre-turn cleanup step:
for (const [condition, meta] of entity.conditions.entries()) {
  if (meta.expiresRound && meta.expiresRound <= combat.round) {
    entity.conditions.delete(condition);
  }
}
```

---

## 5. Spell Tag Audit

### 5.1 Required Tags

All spells used in combat encounters **must** have at least one of:
- `feeding`
- `restraint`
- `movement`
- `transformation`

### 5.2 Existing Spells Status (Spot Check)

From `SpellLibrary.js`, these already have appropriate tags:

- `Conjure Morsel`: tags `['cantrip', 'conjuration', 'feeding']` ✓
- `Hold Person`: tags `['enchantment', 'restraint', 'forced-feeding']` ✓
- `Telekinesis`: tags `['transmutation', 'movement', 'gravity', 'positioning']` ✓
- `Ravenous Expansion`: tags `['transmutation', 'hunger', 'capacity']` → **needs `transformation`**
- `Confection Snare`: tags `['transmutation', 'restraint', 'feeding', ...]` ✓

### 5.3 content:lint Update

Add a rule to `content:lint`:

```js
// pseudo-code
function validateSpellTags(spell) {
  const combatTags = ['feeding', 'restraint', 'movement', 'transformation'];
  const hasTag = combatTags.some(tag => spell.tags.includes(tag));
  
  if (!hasTag && spell.level > 0 && isUsedInCombat(spell.name)) {
    warn(`Spell '${spell.name}' is used in combat but missing a category tag. Add one of: ${combatTags.join(', ')}`);
  }
}
```

---

## 6. Integration Checklist: Minimal Changes

### Must-Change Files

1. **`src/game/combat/Combat.js`**
   - Add `entity.conditions` initialization in `makeCombatant()`.
   - Update `actionsAvailable()` to check `restrained`/`asleep` conditions.
   - Update `move()` to check `confined` condition.

2. **`src/game/combat/SpellNarrative.js` (new file)**
   - Implement narrative generation module.

3. **`src/game/magic/SpellResolver.js` (or similar)**
   - Call `narrativeFor()` after spell resolution.
   - Attach result to spell result object.

4. **`src/game/magic/SpellLibrary.js`**
   - Add missing tags (if any) to spells used in combat encounters.

### Optional (Phase 2+)

- `src/game/mechanics/content_lint.js`: Add spell tag validation rule.
- UI layer: Render log entries with spell narratives (already in place if using existing log display).

---

## 7. Testing Checklist

### Unit Tests

- [ ] Condition application: `applyCondition(entity, 'restrained')` → `entity.conditions.has('restrained')` returns true.
- [ ] Action override: `actionsAvailable(entity)` returns 0 when `restrained` is set.
- [ ] Movement block: `move()` silently fails when `confined` is set; position unchanged.
- [ ] Narrative generation: `narrativeFor(feedingSpell, ...)` returns text from `FeedingTemplates`.

### Integration Tests

- [ ] Casting restraint spell → log entry includes narrative + mechanical outcome.
- [ ] Feeding spell → fullness increases + mobility shifts + narrative reflects it.
- [ ] Movement spell → position changes (or doesn't, if `confined`) + narrative describes it.
- [ ] Enemy AI respects `restrained` condition → passes turn or has 0 actions.

### Playtesting

- [ ] Combat log is readable and makes sense in the flow.
- [ ] Spell families feel distinct in practice (not just on paper).
- [ ] No unexpected condition conflicts (e.g., `restrained` + `confined` together).

---

## 8. Backwards Compatibility

**No breaking changes**:
- Existing spells continue to work; `conditions` is optional.
- Existing enemy AI doesn't require changes (conditions are checked in `actionsAvailable()`, which AI already calls).
- Log structure is extended, not replaced; old code reading `combatant` field still works.

---

## 9. Performance Implications

**Negligible**:
- Condition checks are O(1) map lookups.
- Narrative generation is string concatenation; only happens once per spell cast.
- No new loops or recursive calls.

---

## 10. Open Questions for Implementation

1. **Condition persistence**: Should conditions auto-expire after a round, or persist until manually cleared?
   - *Suggestion*: For now, persist. Add expiration logic in Phase 2 if needed.

2. **Condition stacking**: Can an entity have multiple conditions (e.g., both `restrained` and `slowed`)?
   - *Suggestion*: Yes, Map allows arbitrary conditions. Combine effects in `actionsAvailable()` if multiple present.

3. **Who applies conditions to enemies?**: Does the enemy AI script, or the spell resolver?
   - *Suggestion*: The spell resolver applies conditions to targets. Enemy AI doesn't need to.

4. **Narrative for player-cast vs. enemy-cast spells**: Should narratives differ?
   - *Suggestion*: For now, target-agnostic. Future: add caster perspective (e.g., "The goblin casts Force Feed on *you*").

5. **Multi-target spells**: How to narrate area effects?
   - *Suggestion*: Generate one narrative per target, or one generic narrative + `[affected: 3 enemies]`.

---

## 11. Files Changed Summary

| File | Change | Impact |
|------|--------|--------|
| `Combat.js` | +conditions init, +action override, +movement block | High (core mechanic) |
| `SpellNarrative.js` | New file | Medium (no dependencies) |
| `SpellResolver.js` | +call narrativeFor() | Medium (spy on results) |
| `SpellLibrary.js` | Add tags where missing | Low (metadata only) |
| `content_lint.js` | Add tag validation rule | Low (static check) |

---

## 12. Summary: "What Changes for the Player?"

**Before**:
- "You cast Fireball. The goblin takes damage."
- "You cast Hold Person. The goblin can't move."
- (Same combat log style for all spells.)

**After**:
- "You cast Fireball. Roasted food emerges from the inferno. The goblin gorges, her belly swelling. Her mobility drops to 'planning'."
- "You cast Hold Person. Invisible chains lock the goblin in place. She cannot act this round."
- (Distinct narratives per family; mechanical outcomes in plain language.)

Combat feels more responsive and spells feel mechanically distinct. The player understands *why* casting Restraint then Feeding is more effective than casting Feeding twice.
