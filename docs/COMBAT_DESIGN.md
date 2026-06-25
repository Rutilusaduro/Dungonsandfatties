# Combat Design — Fatten to Win

Grilled and scoped 2026-06-25. Goal: a turn-based combat system where you win by
**fattening targets into immobility, surrender, or consumption** — never by
draining a hit-point bar. Built as a thin orchestration layer over systems that
already exist, not a new engine.

## Goal

Make fattening the *whole* of combat. The same mechanic that grows an NPC is the
mechanic that defeats an enemy — and the mechanic an enemy uses against you. One
meter, both directions. Synergy (combos that manufacture a finisher's
precondition) is the rewarded path; raw stat-stacking still works but is slower
and duller by design.

## Locked decisions (from grill)

| Decision | Choice |
|---|---|
| Primary win | **Immobilize** — weight/gravity gate (mobility throttle), the kill |
| Alt win | **Succumb** — `willingness` flips, target turns gluttonous, self-feeds |
| Lethal win | **Consumed** — vore / Flesh to Food, an explicit defeat state |
| Hit points | **Dropped.** No HP bar. Defeat is a *state*, never 0-HP. `currentHealth` goes dormant |
| Offense model | **Symmetric fattening race (A).** Enemy has no damage — its win-con is fattening *you*, plus disruption (purge, break free, gorge-rage) |
| In-fight meter | **Fullness gauge** (fast, per-encounter) drives the throttle; permanent `currentWeight` gain is a small residue |
| Fullness storage | **Reuse `stomachCapacity` / fullness fields.** No new stat |
| Finishers | **`InteractionTable` entries** whose effect is `defeated`. Gated by `ActiveConditions` preconditions |
| Archetypes | **P4 monster traits** that gate which precondition can be opened. No single dominant lockchain |
| Reward | **Decoupled from win.** Floor-win = thin payout; glut-clear = jackpot. Mechanical + content both scale with final fatness |
| Win-content | **`vic.*` text-engine scene family** — slot skeleton, pooled by stage/finisher/path/persona, bespoke bosses via `priority` |
| Turn order | **Rounds + initiative** (D&D framing) |
| Enemy AI | **Scripted per-trait** for now; utility AI is a later upgrade |
| Positioning | **Abstract range-bands now** (`engaged`/`near`/`far`); grid is a later rendering+movement swap behind a position interface |

## What already exists (combat is mostly wiring)

| Combat need | Existing system |
|---|---|
| Action-economy ladder | `mobilityLevel` in `textEngine/engine.js` — `full → present → planning → economy → minimal → immobile`, derived from weight stage |
| Immobilize-by-weight | `GravitySystem` — effective gravity, breaking points, structural failure |
| Finisher preconditions | `ActiveConditions` — `restrained`, `buried`, `satiated`, `floor_tethered`, `asleep`, `slowed`, … |
| Finishers + synergy | `InteractionTable` — lintable data entries, `requires.condition`, symmetric-by-default |
| Win-content + coverage | text engine + `content:lint` coverage floor |
| Weight stages | `WeightStages` / `stages.js` — 12 stages, `% gain over base` |

The genuinely new code is small: a **turn loop**, a **win-state checker**, and a
**scripted enemy controller**. Everything else is data and content on rails.

---

## Core loop

A combat is a sequence of rounds. Each round, combatants act in initiative order.
A combatant's available actions are throttled by its **`mobilityLevel`** (which
follows weight stage), so a fattened combatant literally gets fewer/weaker turns.

On every actor's turn it may: cast a fattening spell, feed, move a range-band,
apply a condition, attempt a finisher, or (enemy) disrupt. After each action the
**win-state checker** runs against both sides.

### The two meters, unified

- **Fullness** (fast, per-encounter): fills in a few crams. Drives the
  `mobilityLevel` throttle *during* the fight. Stored on the existing
  `stomachCapacity`/fullness fields — no new stat. Enemies can purge it.
- **Weight** (slow, permanent): a small residue of each encounter settles into
  `currentWeight` and carries to the meta game. This is the long progression; it
  is *not* expected to move enemies to stage 10 inside one fight.

### Win / lose states (identical, both directions)

| State | Trigger |
|---|---|
| `immobilized` | mobility throttle bottoms out (gravity/stage gate). The **+200% floor** opens a vulnerability *window* — an escape hatch when losing, not the goal |
| `succumbed` | `willingness` crosses a floor; target turns gluttonous and self-feeds |
| `consumed` | a lethal finisher (vore / Flesh to Food) resolves |

The player loses by entering any of these states themselves. The enemy's
"offense" is the same fattening mechanic pointed back, plus disruption.

---

## Finishers as interaction entries

A finisher is an `InteractionTable` entry whose `effect` sets a defeat state. It
inherits the table's lint, symmetry, and prose-key wiring for free.

```js
{
  id: 'hold_person+shape_earth',          // trigger Shape Earth on a held target
  trigger: 'Shape Earth',
  requires: { condition: 'restrained' },   // precondition the enemy can deny
  symmetric: false,                        // directional: burying the caster reads differently
  text: 'spell.interaction.hold_person.shape_earth',
  effect: ({ target, result }) => {
    // gated again on mass — apex finishers WANT a heavy target
    if (gravityOf(target) >= BURY_THRESHOLD) result.defeat = { state: 'immobilized', via: 'buried' };
  },
}
```

**Preconditions push toward glut, not away.** Apex finishers (`buried`,
belly-crush, structural collapse) require a *heavy* target, so the strongest,
highest-reward seals demand you fattened hard. Vore — the one finisher that wants
a target small enough to swallow — is a low-tier early option, never the apex, so
"keep them small" is never the optimal line.

**No dominant lockchain.** Each finisher's precondition is a condition an enemy
trait can deny:

| Archetype (P4 trait) | Denies | Forces you toward |
|---|---|---|
| Light flyer | `buried`, `floor_tethered` (not grounded) | suspension, raw fatten-to-ground |
| Heavy brute | nothing — but slow; easy to fatten | bury / crush (wants max mass) |
| Willing glutton | resists little | the succumb path; fastest glut-clear |
| Gelatinous | candy restraint (`confection_snare`) | magic restraint, gravity |
| Anti-mage / dispeller | shortens `recently_cast`, purges conditions | fast combos, raw stacking |
| Swarm | single-target finishers | area feeds (Erupting Earth, Fireball) |

Every enemy must leave **≥2 open precondition paths** or it is a puzzle-lock, not
combat.

---

## Reward (decoupled from win)

Winning is a state; the *payout* scales with how fat the target got. Two channels,
both rising with final fatness:

- **Mechanical** — XP, loot, calorie-bank, spell unlocks.
- **Content** — the `vic.*` victory scene tier.

A floor-win (+200%, panic escape) reads terse and yields little. A **glut-clear**
(stage 10+) unlocks the jackpot payout *and* the bespoke prose. The succumb path —
the enemy self-feeding to maximum size — is the highest-mastery, highest-reward
win.

### Win content — one skeleton, combinatorial output

```
"{vic.lead} {vic.finisher} {vic.size_payoff} {vic.aftermath}"
```

| Slot | Keyed on | Reuses |
|---|---|---|
| `vic.lead` | win-path (`floor`/`immobilized`/`succumbed`/`consumed`) | — |
| `vic.finisher` | `option` (bury / suspend / swallow / raw) | combo prose patterns |
| `vic.size_payoff` | `stageMin`/`stageMax` band | clone existing `spell.weight_gain` (6 tiers written) |
| `vic.aftermath` | `willingness` / `persona` | — |

~20 authored fragments → hundreds of distinct victory readouts. A marquee boss
(e.g. a dragon fattened to Leviathan) gets one `priority`-gated bespoke variant
that beats the generic. All of it rides `content:lint`'s weight-stage coverage
floor.

---

## Positioning: range-bands now, grid later

Combat state is **position-agnostic**. Distance is an abstract band
(`engaged`/`near`/`far`); `mobilityLevel` sets how many bands a combatant may move
per turn — so a fattened combatant cannot close on a fleeing one. Reach and
finisher range read the band, never coordinates.

A full **grid** (movement, reach, line-of-sight, rendering) is a later phase that
swaps in behind a small position interface — `distance(a, b)`, `canReach(a, b)`,
`move(a, dir)`. Win-logic and finishers never touch coordinates, so the grid is a
rendering+movement upgrade, not a rewrite. The weight-throttle only gets *better*
on a grid (kiting a slowing brute), which is why the band model is shaped to grow
into one.

---

## Phases

Each phase is independently shippable and leaves the game playable. This work
slots behind the existing P4 (monster types) — finisher archetypes *are* monster
traits — and informs P5 (zones host encounters).

### C0 — Combat state + turn loop (no win yet)

- A `Combat` module: combatant list, initiative order, round/turn advance.
- Range-band positions behind the `distance`/`canReach`/`move` interface.
- Actions route through existing spell-cast / feed paths; `mobilityLevel` gates
  action count.
- **Validation:** a Vitest drives 3 rounds of two combatants casting/feeding;
  `mobilityLevel` throttle observably reduces actions as stage rises.

### C1 — Win-state checker + Fullness gauge

- Per-turn checker for `immobilized` / `succumbed` / `consumed`, both sides.
- Fullness gauge on existing capacity fields; drives the throttle; drains
  per-round; purgeable.
- **Validation:** a test fattens a dummy past each gate and asserts the right
  defeat state; a purge drops the throttle back a rung.

### C2 — Finishers as InteractionTable entries

- Add finisher entries (`effect` sets `result.defeat`), gated on conditions +
  mass thresholds. Extend `content:lint` to assert finisher entries resolve and
  every enemy archetype has ≥2 open paths.
- **Validation:** `content:lint` clean; a test fires a finisher when its
  precondition holds and refuses when denied by a trait.

### C3 — Scripted enemy controller

- Per-trait scripts: a flyer kites and force-feeds from range; a glutton rushes
  food and over-eats itself; a dispeller purges then disrupts.
- Enemy uses the *same* action set as the player (symmetry).
- **Validation:** a test runs an encounter to a deterministic win/lose under a
  fixed seed for each archetype.

### C4 — Reward + `vic.*` victory content

- Wire mechanical payout (scales with final stage) + the `vic.*` scene skeleton.
- Author the ~20 base fragments + ≥1 bespoke boss override; coverage lints clean.
- **Validation:** floor-win vs glut-clear produce visibly different payout *and*
  prose; `content:lint` weight-stage coverage passes.

### C5 — Grid (later, optional)

- Swap the range-band interface for a real grid: movement, reach, LoS, rendering.
- Win-logic untouched.
- **Validation:** existing combat tests pass against the grid-backed position
  interface with no win-logic changes.

---

## Validation summary

- `npm test` — turn loop, throttle, each win-gate, finisher gating, per-archetype
  deterministic encounter.
- `npm run content:lint` — finisher entries resolve; every archetype has ≥2 open
  paths; `vic.*` weight-stage coverage.
- Manual `npm run dev` smoke: fight each archetype, hit a floor-win and a
  glut-clear, watch the throttle and the payout/prose differ.

## Risks to watch

- **Fullness-vs-permanent-weight tuning is the entire feel.** Leave both knobs
  configurable; this is where combat reads as fun or as a grind.
- **Glut-clear must out-reward floor-win clearly**, or players speedrun the +200%
  floor and the game's whole reason to exist dies on the table.
- **Trait-gated finishers need ≥2 open paths per enemy** — enforce in lint, not by
  hope, or fights become single-solution puzzles.
- **Scripted AI staleness** — per-trait scripts are the lazy correct start, but a
  player will pattern them fast; the utility-AI upgrade path stays open.
- **Symmetric offense balance** — the enemy fattening *you* must be a real threat
  at low mobility or there's no tension; tune enemy feed-rate against player
  escape options.

## Open questions (not blocking)

1. **+200% floor exact value** — is stage 8 (`Immense`) the right vulnerability
   window, or tune per-archetype?
2. **Fullness drain rate** — per-round, or only on a purge action?
3. **Initiative model** — static (rolled once) or re-rolled as mobility changes?

## Next concrete action

Start **C0**: the `Combat` module + turn loop + range-band interface, with the
Vitest that proves the `mobilityLevel` throttle reduces actions as weight rises.
No win-logic yet — C1 adds it against that gate.
