# Dungeons & Fatties — Improvement Plan

Grilled and scoped 2026-06-22. Goal: build the world **wide and deep** on a
bulletproof foundation before any story/game layer is set inside it.

## Goal

Deepen spell + interaction + kink/WG content and add monster types, while
making **spell interactions bulletproof**. Flesh out zones one at a time to a
written completeness bar. Firm basis first, grow second.

## Locked decisions (from grill)

| Decision | Choice |
|---|---|
| Interaction architecture | **Unified interaction table** — one enumerable, lintable place for every interaction |
| Table scope | spell+spell, spell+condition, spell+environment, spell+monster-trait all keyed the same way |
| Symmetry | **Symmetric by default** (author once), directional opt-in per entry |
| Combo memory | **Active-condition based** — combos fire on current *state*, not cast-history |
| Failure mode | **Loud in dev, silent-graceful in prod** |
| Migration | **Big-bang rewrite** of `applyComboEffects`, with a one-time behavior snapshot as the verification gate |
| Zone "done" | **Written per-zone completeness checklist**, enforced before moving on |

## The brittleness this kills

`SpellResolver.applyComboEffects` is ~50 hand-written `if` blocks keyed on
`spell.name === 'X' && previousSpells.includes('Y')`. Cracks:

1. String-keyed — a typo silently kills a combo.
2. N² by hand — `A+B` and `B+A` are separate blocks; reverse easily missing.
3. No registry — can't enumerate, can't lint coverage, can't see the hole.
4. Two memory models — `Spell.cast`'s 6-slot `spellAffects` ring vs resolver's
   `previousSpells`; they can disagree.
5. Two interaction systems — `Spell.interactsWith` (text-only) and the resolver
   if-chain (mechanical) drift apart.
6. Zero tests — breakage is found by playing.

Cracks 1–3 get worse with every spell added. Fix the foundation before growing.

---

## Architecture: the unified interaction table

### Trigger model (active-condition)

A combo fires when, at cast time, the world satisfies a **predicate over current
state**, not over cast history:

- target conditions (`target.conditions.has('greased')`, `'enlarged'`, …) —
  the existing `ActiveConditions` (12 keys) is the source of truth.
- zone state (`zone has a water reservoir`, `zone has Ice Cream food`).
- monster traits (target's type tags — see Phase 4).

Instant-on-instant combos that leave no lasting condition (e.g.
Prestidigitation + Feast of Shadows) keep working via a short **decaying
`recently_cast:<spell>` condition** stamped on every cast and expiring after a
turn or two. Same predicate machinery, no special case.

### Data shape (one entry)

```js
{
  id: 'grease+enlarge_person',         // stable, lint-checked
  when: {                              // predicate over current state
    spell: 'Enlarge Person',           // the spell being cast (the trigger)
    requires: { condition: 'greased' },// partner state already present on target
  },
  symmetric: true,                     // default; reverse auto-derived
  text: 'spell.interaction.enlarge_person.grease', // must resolve in text engine
  effect: (ctx) => { /* bonus weight/cal/condition; pure, returns deltas */ },
}
```

- `symmetric: true` → engine auto-derives the `greased while casting Enlarge`
  AND `enlarged while casting Grease` directions from one entry. Opt out with
  `directional: true` + an explicit reverse entry when the kink genuinely
  differs by order.
- `effect` is a pure function returning deltas (bonus weight/calories, condition
  adds, food spawns). No direct mutation scattered through a 1600-line file.

### Validation (loud dev / silent prod)

`npm run content:lint` (new) asserts, at build/dev time:

- every `when.spell` / partner name resolves to a real registered spell;
- every `requires.condition` is in `CONDITION_KEYS`;
- every `text` key resolves in the text engine registry;
- no duplicate `id`s; symmetric entries don't collide with a hand-written reverse;
- (later) every monster trait / env type referenced exists.

In dev: throws / red console with the offending `id`. In prod: a bad entry is
skipped, the cast still resolves, no crash reaches the player.

---

## Phases

Each phase is independently shippable and leaves the game playable.

### P0 — Test + lint harness (foundation)

- Add **Vitest** (the boring Vite-native pairing) + `npm test`, `npm run content:lint`.
- One smoke test: cast a spell, assert a result shape. Proves the runner works.
- **Validation:** `npm test` green, `npm run content:lint` runs (no rules yet).

### P1 — Unified interaction table + validator + migration

1. Build the table module + resolver that evaluates predicates against current
   state, with symmetric auto-derivation and the `recently_cast` decay tag.
2. Write `content:lint` rules above.
3. **Snapshot gate (the safety net):** before touching `applyComboEffects`,
   write a test that drives every current combo and records its output
   (interactions fired, bonus deltas, text keys). This is the behavior contract.
4. Big-bang port every if-block into table entries.
5. Re-run the snapshot. Diff = behavior changes you must explicitly accept.
6. Delete `applyComboEffects` once the snapshot passes off the table.
- **Validation:** snapshot test green off the new table; `content:lint` clean;
  manual cast of 5 known combos in `npm run dev`.

### P2 — Collapse the second interaction system

- Decide `Spell.interactsWith`'s fate: either drop it, or make it a *generated
  view* of the table (so docs/tooltips can list "what combos with this") with no
  independent source of truth. No two systems that can drift.
- **Validation:** `content:lint` is the only place combos are defined.

### P3 — Content depth (spells, interactions, kink/WG)

- Expand spells and especially interactions purely as table entries — every new
  combo is now lint-protected and symmetric-by-default.
- Prose via the **weightgain-prose** + **gamedev-text-engine** skills; coverage at
  every weight stage stays enforced by the text linter.
- **Validation:** new combos appear in `content:lint` coverage; prose lints clean.

### P4 — Monster types

- Monster type = stat block + **interaction traits** that plug into the same
  table as `requires`/`when` predicates (e.g. a gelatinous type immune to Grease,
  a type that doubles WG, a type that craves a taste). No new interaction system.
- **Validation:** a monster-trait combo entry passes `content:lint`; feeding/WG
  loop visible in the character/zone panel.

### P5 — Zone completeness + flesh Zone 1 (The Bloated Boar)

Write `docs/ZONE_CHECKLIST.md` — a zone is "done" when it has:

- N spell-reactive environmental objects (each with `isAffectedBy` wired);
- N creatures with a working hunger/feeding/WG loop;
- N NPCs with dialogue tree + relationship tracking;
- examine prose for every object/creature/NPC **at every weight stage**;
- ≥ X discoverable combos that key off this zone's state;
- `spellAffinity` set deliberately.

Then bring **The Bloated Boar Tavern** to bar before any other zone.
- **Validation:** a `zone:lint` check (or extend `content:lint`) reports the
  checklist pass/fail per zone; Zone 1 passes.

---

## Validation summary

- `npm test` — Vitest, including the combo behavior snapshot.
- `npm run content:lint` — dangling spell/condition/text/trait refs, dup ids,
  symmetry collisions, zone checklist coverage.
- Manual `npm run dev` smoke per phase: cast combos, feed a creature, examine
  across weight stages, watch the panel update, zero console errors.

## Risks to watch

- **Active-condition model shifts behavior**: some current combos rely on
  cast-history, not lasting state. The snapshot gate (P1.3) makes every such
  shift visible and a deliberate choice, not an accident.
- **`recently_cast` tuning**: decay window is a feel knob; too long = stale
  combos fire, too short = instant-on-instant combos miss. Leave it configurable.
- **Big-bang scope**: 50 ports in one pass is a large diff; the snapshot is the
  only thing standing between "ported" and "silently regressed." Do not skip it.
- **Symmetry surprises**: auto-derived reverse may read wrong for an
  order-sensitive kink; the `directional` opt-out exists for exactly this.

## Open question (not blocking)

- Monster "type" granularity: a handful of broad types (Gelatinous, Beast,
  Construct, Fey…) each with trait tags, vs many bespoke creatures. Recommend
  broad types + tags so the table stays small and combinatorial. Decide at P4.

## Next concrete action

Start **P0**: add Vitest + scripts + one smoke test, so every later phase has a
gate to prove itself against. Then P1.3's snapshot before any combo is touched.
