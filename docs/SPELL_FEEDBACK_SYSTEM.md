# Spell Feedback System — Design Document

## Overview

This document specifies how to make spell families mechanically and narratively distinct in Dungeons & Fatties combat. Currently, all spells funnel into fullness gauge changes with generic log entries. The new system introduces **spell categories** with unique mechanical effects and **family-specific combat log narratives** that make casting feel varied, impactful, and immediately comprehensible.

**Key constraint**: No new UI components required; leverage existing combat log + action economy.

---

## 1. Spell Categories & Mechanical Signatures

### 1.1 Feeding Spells (Tag: `feeding`)

**Mechanical signature**: Increase target fullness + reduce target actions next round.

**What "different" feels like**: 
- Fullness bar fills visibly.
- Enemy becomes sluggish — action economy contracts.
- Player senses immediate combat advantage (slower enemy = more player turns before next enemy turn).

**Examples**: `Conjure Morsel`, `Sating Spark`, `Oozing Abundance`, `Erupting Earth`, `Fireball` (roasted food version).

**Combat mechanics**:
- **Fullness increase**: Direct (e.g., `fillUp(enemy, spell.feedAmount)`).
- **Action penalty**: None applied directly; the enemy's reduced mobility from fullness naturally decreases actions available via `actionsAvailable()` (existing logic in `Combat.js`).
- **Narrative weight**: Spell name + food description suggests the enemy is being *consumed into immobility*, not just slowed by an abstract effect.

---

### 1.2 Restraint Spells (Tag: `restraint`)

**Mechanical signature**: Prevent enemy actions (not movement-based, but action-pool-based).

**What "different" feels like**: 
- Enemy action slots drop to 0 or near-0 for a turn.
- Enemy visibly *cannot act* even if at high mobility.
- Player senses control and helplessness on the enemy's side.

**Examples**: `Hold Person`, `Confection Snare`, `Web`, `Sleep`, `Command`.

**Combat mechanics**:
- **Action slot override**: Introduce a `restraint` condition that forces `actions = 0` for that round, overriding mobility calculations.
- **Mechanical implementation**: After `actionsAvailable()` is called, check `entity.conditions.has('restraint')`. If true, clamp actions to 0.
- **Win-state interaction**: `applyCondition(enemy, 'restrained')` already exists in `EnemyController.js` and some archtypes deny it. No change needed; restraint bypasses mobility but respects trait denials.
- **Narrative weight**: Spell makes the enemy literally unable to respond, creating a vulnerable window.

---

### 1.3 Movement Spells (Tag: `movement`)

**Mechanical signature**: Prevent or force movement; alter grid positioning without affecting action slots.

**What "different" feels like**: 
- Enemy position changes visibly (or becomes locked).
- Actions remain available, but the enemy *cannot reposition*.
- Player senses tactical advantage (can keep distance or force engagement).

**Examples**: `Telekinesis`, `Float`, `Enhance Gravity`, `Slow` (movement penalty), `Gust of Wind`.

**Combat mechanics**:
- **Immobilized condition**: A `confined` or `gravity_locked` condition prevents `move()` calls from succeeding.
  - Existing: `move(combatant, dir, opts)` modifies `x, y`.
  - New: Before move, check `entity.conditions.has('confined')`. If true, movement fails silently (position unchanged).
- **Action slots unchanged**: Movement spells do not reduce actions; the enemy still gets 2 actions per turn, but can't *use* them for repositioning.
- **Narrative weight**: Spell traps the enemy in place, making them a sitting target for feeding spells.

---

### 1.4 Transformation Spells (Tag: `transformation`)

**Mechanical signature**: Permanent or long-duration body changes (weight gain, form shifts, metabolism breaks).

**What "different" feels like**: 
- Enemy becomes heavier or larger (visual weight indicator changes).
- Enemy metabolism or hunger state shifts permanently (willingness drops, or hunger increases).
- Combat feels "escalating" — the environment is being shaped against the enemy.

**Examples**: `Ravenous Expansion`, `Haste` (metabolic), `Rapid Digestion`, `Enlarge Person`, `Polymorph`.

**Combat mechanics**:
- **No direct action impact** (unlike feeding or restraint).
- **Stat modification**: Changes `stomachCapacity`, `willingness`, `currentWeight`, etc.
- **Win-state acceleration**: Transformation spells often *enable* later feeding or restraint spells by changing thresholds (e.g., `Ravenous Expansion` doubles stomach capacity, making subsequent feeding spells more valuable).
- **Narrative weight**: Spell rewires the enemy's vulnerabilities, not their immediate turn.

---

## 2. Combat Log Narrative Templates

All combat log entries follow this structure:

```
[Round N] [Caster name] cast [Spell Name]. [Diegetic narrative]. [Mechanical outcome, if relevant].
```

**Diegetic narrative rules**:
- Never mention "fullness gauge," "action slots," "conditions," or game mechanics.
- Describe what the *character* perceives: food arriving, restraints tightening, position shifting, belly swelling.
- Use active, sensory language: taste, weight, movement, restriction.

### 2.1 Feeding Spell Templates

**Pattern**: `[Caster] conjures/casts [food form]. [Target] [is showered with / tastes / swallows]. [Visible outcome: fullness effect on target]`

**Examples**:

| Spell | Narrative |
|-------|-----------|
| `Conjure Morsel` | You conjure a rich morsel. It tumbles into the air—buttery, golden, irresistible. The goblin's eyes widen as she catches it and swallows hard. She slows noticeably, that one bite settling heavy. |
| `Sating Spark` | A mote of hearth-warmth drifts into the goblin's belly and blooms into sleepy, heavy fullness. She blinks, confused—her body suddenly feels so *full*. |
| `Oozing Abundance` | An arrow of thick, nutritious ooze strikes the goblin and splatters across her, clinging and soaking in. She gasps as the sludge coats her throat and settles down her gullet. |
| `Erupting Earth` | The earth erupts with cascading food. The goblin is buried under the avalanche—groaning as she chokes down mouthful after mouthful. Her belly swells visibly. |
| `Fireball` | Flames ignite, and from the inferno emerges roasted food—meat, roots, grain—all perfectly seasoned. The scent is hypnotic. The goblin can't resist. She gorges, gasping, her belly ballooning. |

**Mechanical callout** (optional, if action penalty is relevant):
- If feeding spell reduces enemy mobility from "full" to "planning," append: `Her movements grow sluggish.`
- If it drops to "minimal" or below: `She can barely move under the weight of it all.`

---

### 2.2 Restraint Spell Templates

**Pattern**: `[Caster] casts [Spell]. [Restraint form wraps / traps / freezes target]. [Target] [is immobilized / cannot move / cannot act]`

**Examples**:

| Spell | Narrative |
|-------|-----------|
| `Hold Person` | You whisper a word of binding. The goblin's limbs freeze mid-step—invisible chains of force lock her in place. She struggles, but cannot budge. |
| `Confection Snare` | Sugary vines erupt from the ground and coil around the goblin—licorice-dark, impossibly strong. She thrashes as they tighten, binding her wrists and ankles. |
| `Web` | Sticky silk erupts from your fingertips, filling the air. The goblin is caught mid-stride, tangled in threads so strong she cannot break free. |
| `Sleep` | Your words hang in the air like honey. The goblin's eyes flutter. She sways, fighting the weight of magical exhaustion, then collapses—unconscious. |
| `Command` | You speak a single word, infused with power. The goblin freezes, body locked by the weight of your command, unable to move or speak. |

**Mechanical outcome**: 
- Always include: `She cannot act this round.` or `She cannot move.`
- This makes the action penalty *visible* in the narrative, so the player understands the combat advantage.

---

### 2.3 Movement Spell Templates

**Pattern**: `[Caster] casts [Spell]. [Target's position changes / is locked down]. [Describe the environmental/positional consequence]`

**Examples**:

| Spell | Narrative |
|-------|-----------|
| `Telekinesis` (move to table) | Invisible force seizes the goblin and lifts her onto a nearby table. She scrambles, but the force holds her there—she cannot reach the ground. |
| `Telekinesis` (move to floor) | You yank the goblin back down to solid ground with invisible force. She crashes down hard. |
| `Float` | Gravity releases the goblin, and she drifts upward into the air, weightless. She thrashes, but cannot push herself down—buoyancy holds her suspended. |
| `Enhance Gravity` | The air grows thick and heavy. The goblin staggers as if carrying an enormous weight. She can barely lift her limbs. |
| `Slow` | Time thickens around the goblin. She moves as if through honey—sluggish, dreamlike, unable to keep pace. |
| `Gust of Wind` | A blast of wind roars through the space. The goblin is hurled backward, skidding across the floor until she collides with a wall. |

**Mechanical outcome**: 
- Positioning: `She is now [distance/location].`
- Confinement: `She cannot leave that spot.` or `She is locked in place.`
- Movement penalty: `Her movements are sluggish—she cannot move far.`

---

### 2.4 Transformation Spell Templates

**Pattern**: `[Caster] casts [Spell]. [Target's body changes / appetite shifts]. [Describe the new state]`

**Examples**:

| Spell | Narrative |
|-------|-----------|
| `Ravenous Expansion` | The goblin's belly swells grotesquely—her stomach capacity blooming, her hunger *desperate*. She clutches her distended gut, groaning, *starving* despite her bulk. |
| `Haste` (metabolic) | Time accelerates around the goblin. Her jaw works at impossible speed—food vanishes into her mouth as fast as you can conjure it. Her body burns through calories at a supernatural rate. |
| `Rapid Digestion` | Magical haste floods her gut. Her food churns violently, processing faster than nature allows. By tomorrow, today's feast will have settled into permanent weight. |
| `Enlarge Person` | The goblin swells. Her frame expands, doubling in size—taller, heavier, more imposing. She towers over you now, but also... *bigger* means *heavier*. |
| `Polymorph` (to pig) | The goblin's form ripples and transforms into a pig—squat, round, voracious. Her hunger is immediate and overwhelming. |

**Mechanical outcome**: 
- If belly swells: `Her stomach capacity increases.`
- If hunger/willingness changes: `Her appetite becomes desperate.` or `Her willingness wavers.`
- If weight increases: `She gains significant weight.`

---

## 3. Action Economy Integration

### 3.1 Current System Review

From `Combat.js`:
- `ACTIONS_BY_MOBILITY` maps mobility states to action slots (e.g., `full: 2, minimal: 1, immobile: 0`).
- Enemy AI calls actions in a loop; if actions == 0, the enemy passes the round.
- Fullness affects mobility, which affects actions—the *existing* pipeline already handles feeding spell cascades.

### 3.2 New Conditions System

Introduce a `conditions` object on every entity (if not present). Conditions are named flags with optional metadata.

**Conditions to support**:
- `restrained`: Enemy cannot act; action slots = 0 for this round.
- `confined`: Enemy cannot move (movement actions fail).
- `asleep`: Enemy cannot act and is vulnerable to finishers.
- `slowed`: Enemy movement is reduced; action slots capped at 1.
- (Others as designed in existing finisher tables.)

**Implementation sketch** (not pseudo-code, just structure):
```
entity.conditions = entity.conditions || new Set();

// After actionsAvailable is calculated, check conditions:
if (entity.conditions.has('restrained') || entity.conditions.has('asleep')) {
  return 0; // Override to zero actions
}
if (entity.conditions.has('slowed')) {
  return Math.min(actions, 1); // Cap at 1
}
```

### 3.3 Spell Application to Conditions

In `SpellResolver.js` (or the combat casting handler):

**Feeding spells**: Call `fillUp()` directly; no condition needed. Fullness → mobility reduction → action reduction (automatic).

**Restraint spells**: Call `applyCondition(enemy, 'restrained')`. The existing `applyCondition()` in `EnemyController.js` already respects trait denials.

**Movement spells (immobilize)**: Call `applyCondition(enemy, 'confined')`. Before any movement, check this condition.

**Movement spells (reposition)**: Call `move()` directly; no condition, just repositioning.

**Transformation spells**: Modify entity stats (stomachCapacity, willingness, weight, etc.); no condition needed.

---

## 4. Log Message Architecture

### 4.1 Where Messages Live

**Current**: Combat log is in `Combat.js`, line 235:
```js
this.log.push({ round: this.round, combatant: c.entity.name, actions });
```

This is bare-bones. It logs only round and action counts.

**Proposed change**: Extend log entries to include spell-specific narrative.

```js
this.log.push({
  round: this.round,
  combatant: c.entity.name,
  actions,
  spellCast: {
    name: 'Conjure Morsel',
    category: 'feeding',
    target: 'goblin',
    narrative: 'You conjure a rich morsel. It tumbles toward the goblin's mouth...',
    mechanicalOutcome: 'her mobility drops to "planning"'
  }
});
```

### 4.2 Narrative Generation

Create a new module: `src/game/combat/SpellNarrative.js`

**Responsibility**: Given a spell, caster, target, and mechanical outcome, generate a diegetic log entry.

**Function signature**:
```js
function narrativeFor(spell, caster, target, mechanicalOutcome = {}) {
  // mechanicalOutcome = { fullnessGain, mobilityShift, conditionApplied, etc. }
  // Returns { narrative, mechanicalSummary }
}
```

**Categories to pattern-match**:
1. If spell has tag `feeding`: Use feeding template + append mobility shift if relevant.
2. If spell has tag `restraint`: Use restraint template + append action lockdown outcome.
3. If spell has tag `movement`: Use movement template + append position or confinement outcome.
4. If spell has tag `transformation`: Use transformation template + append stat shifts.

**Default fallback**: If no tag matches, use generic template: `[Caster] casts [Spell Name]. [Spell description]. [Mechanical outcome].`

### 4.3 Spell Tag Requirement

For the narrative system to work, every spell must have at least one tag from:
- `feeding`
- `restraint`
- `movement`
- `transformation`
- (Others as needed, but these four are the core.)

**Action item for content:lint**: Validate that all spells have one of these tags; warn if missing.

---

## 5. Implementation Checklist

### Phase 1: Conditions System (Low-risk foundation)
- [ ] Add `entity.conditions` to every combatant in `Combat.js` constructor (line 197-202).
- [ ] Implement `Entity.conditions` as a Set or Map with `add()`, `has()`, `remove()` methods.
- [ ] Update `actionsAvailable()` to respect `restrained` and `slowed` conditions.
- [ ] Add `confined` check to `move()` before applying positional changes.

### Phase 2: Spell Narrative Module (Decoupled from combat)
- [ ] Create `src/game/combat/SpellNarrative.js`.
- [ ] Implement `narrativeFor(spell, caster, target, mechanicalOutcome)`.
- [ ] Add narrative templates for all four categories (feed, restraint, movement, transformation).
- [ ] Add fallback generic template.

### Phase 3: Combat Log Integration (Plumbing)
- [ ] Modify `Combat.js` log entry structure to include `spellCast` field.
- [ ] Update spell casting handlers (in `SpellResolver.js` or wherever spells are cast) to:
  - Generate `mechanicalOutcome` object (fullness gain, conditions applied, position changes).
  - Call `narrativeFor()` to get narrative text.
  - Include both in log entry.

### Phase 4: Spell Tag Audit (Content validation)
- [ ] Audit all 50+ spells in `SpellLibrary.js` to ensure they have appropriate tags.
- [ ] Add missing tags (most existing spells have tags; just validate).
- [ ] Update `content:lint` to enforce that all spells in combat have a category tag.

### Phase 5: Playtesting & Tuning
- [ ] Test that narratives render correctly in the UI (text adventure log).
- [ ] Confirm that conditions (restrained, confined) feel responsive and fair.
- [ ] Gather feedback: Does the narrative make spells feel different? Do players understand the mechanical outcomes?
- [ ] Iterate on narrative templates based on feedback.

---

## 6. Example Combat Flow

### Scenario: Player vs. Goblin

**Round 1: Player casts Confection Snare (restraint spell)**

```
[Round 1] You cast Confection Snare at the goblin.

Narrative:
"Sugary vines erupt from the ground and coil around the goblin—licorice-dark, 
impossibly strong. She thrashes as they tighten, binding her wrists and ankles. 
She cannot act this round."

Mechanical outcome:
- Condition applied: 'restrained'
- Enemy actions: 0 (overridden from 2)
```

**Round 1: Enemy's turn (passes due to restraint)**

```
[Round 1] The goblin struggles against the vines but cannot break free. 
She passes her turn, helpless.
```

**Round 2: Player casts Conjure Morsel (feeding spell)**

```
[Round 2] You cast Conjure Morsel at the goblin.

Narrative:
"A warm, buttery morsel winks into the air and tumbles toward the goblin. 
She can't resist—it's right in her face. She swallows hard. The food settles 
heavy in her belly. Her breathing becomes shallow."

Mechanical outcome:
- Fullness gain: +50 (goblin now 60% full)
- Mobility shift: 'present' → 'planning' (due to fullness)
- Actions next round: 2 → 1
```

**Round 2: Enemy's turn (restrained condition expires after Round 1)**

```
[Round 2] The goblin writhes free from the vines. Her movements are sluggish 
with the weight of food. She manages only one action...

She force-feeds you some vile concoction (1 of 1 action used).
```

**Round 3: Player casts Erupting Earth (feeding spell, area)**

```
[Round 3] You cast Erupting Earth.

Narrative:
"The earth erupts with cascading food—roasted meat, roots, grain, all perfectly 
seasoned. The goblin is buried under the avalanche. She can't help herself—
she chokes down mouthful after mouthful, her belly swelling obscenely."

Mechanical outcome:
- Fullness gain: +120 (goblin now 95% full)
- Mobility shift: 'planning' → 'minimal'
- Actions next round: 1 → 0 (immobilized)
```

**Round 3: Enemy's turn (passes, immobilized from fullness)**

```
[Round 3] The goblin is too full to move. She sways, pinned by her own gluttony.
She passes her turn.

[Win-state check] The goblin's mobility is 'immobile'. Combat concludes.
Encounter won!
```

---

## 7. Spell Family Summary Table

| Category | Mechanic | Narrative Feel | Examples |
|----------|----------|-----------------|----------|
| **Feeding** | Fullness ↑ → Actions ↓ | Food assault; enemy slows | Conjure Morsel, Erupting Earth, Fireball |
| **Restraint** | Actions → 0 (this round) | Helpless; player in control | Hold Person, Confection Snare, Web, Sleep |
| **Movement** | Position locked OR gravity shift | Tactical; enemy trapped | Telekinesis, Float, Enhance Gravity, Slow |
| **Transformation** | Stats change; enables combos | Long-term rewrite of matchup | Ravenous Expansion, Haste, Polymorph |

---

## 8. Design Rationale

### Why This Works

1. **Minimal code surface**: Conditions system is orthogonal to existing fullness/mobility logic. No breakage.
2. **Narrative without UI**: Combat log is already rendered; we just enrich the text. No new buttons or displays.
3. **Spell distinctiveness**: Players now *see and feel* that restraint spells are different from feeding spells. No ambiguity.
4. **Action economy integration**: Conditions + fullness work together. Feeding spells stack with restraint spells, creating combo potential (feed → restrain → feed again).
5. **Playtesting clarity**: Narratives make mechanical outcomes legible. "She cannot act this round" is explicit in the log, not buried in a UI meter.

### Why Not Other Approaches

- **"Add a new UI widget"**: Would require artist time and complicate the text-game aesthetic.
- **"Color the log entries"**: Better than nothing, but doesn't explain *why* spells are different mechanically.
- **"Add VFX descriptions only"**: Without action changes, combat feels same-y. A feeding spell and a restraint spell would still resolve identically.

---

## 9. Future Extensions

This system is built for growth:

- **Spell combos**: Once conditions are in place, bonus effects can trigger when two spells hit the same target in sequence (e.g., "Restrained + Feeding = force-feed without resistance").
- **Enemy-side narratives**: When enemies cast spells, generate narratives for them too. "The goblin casts Force Feed on you—her foul magic..."
- **Persistent conditions**: Some spells could apply multi-round conditions (e.g., `slowed` persists 2 rounds). Conditions system supports this trivially.
- **Condition chains**: A spell could *require* a condition to be present to work (e.g., "Bury only works on restrained or confined targets"). Enforceable via `canCast()`.

---

## 10. Deliverables Summary

1. **Conditions System**: Minimal entity.conditions set on all combatants; checked in action economy + movement logic.
2. **SpellNarrative Module**: Generates diegetic log text for all four spell families.
3. **Updated Combat Log**: Captures spell category, narrative, and mechanical outcome in each log entry.
4. **Spell Tag Audit**: Ensure all combat spells tagged with category.
5. **content:lint Rule**: Enforce that combat spells have a category tag.

**No new UI, no new art, no breaking changes to existing systems.**

---

## Appendix: Spell Category Tag Reference

### Feeding Spells
`Conjure Morsel`, `Sating Spark`, `Greasy Flick`, `Oozing Abundance`, `Erupting Earth`, `Fireball`, `Create Food and Water`, `Feast of Shadows`, `Goodberry`, `Plant Growth`, `Morph Mass`

### Restraint Spells
`Hold Person`, `Confection Snare`, `Web`, `Sleep`, `Command`, (others in design)

### Movement Spells
`Telekinesis`, `Float`, `Enhance Gravity`, `Slow`, `Gust of Wind`, `Move` (if implemented)

### Transformation Spells
`Ravenous Expansion`, `Haste`, `Rapid Digestion`, `Enlarge Person`, `Polymorph`, `Duplication`, `Flesh to Food`

### Utility (non-combat, not needed for feedback system)
`Prestidigitation`, `Shape Earth`, `Shape Wood`, `Create Water`, `Grease`, `Delightful Transmutation`, `Detect Cravings`, `Conjure Food`, `Suggestion`, `Arcane Appraisal`, `Culinary Transmutation`, `Summon Cattle`
