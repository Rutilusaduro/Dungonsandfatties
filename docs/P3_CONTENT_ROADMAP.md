# P3 Content Roadmap — Spell & Interaction Depth

Scoped 2026-06-23. Builds on the unified `InteractionTable` and the
`content:lint` / `npm test` gates from P0–P3.

> **STATUS: complete.** 42 spells, 97 combos. Every spell ≥3 combos (hard-lint).
> P3.2 coverage floor · P3.3 condition combos (8) · P3.4 four themed spells
> (Rooting Glut, Bottomless Gullet, Feeder's Devotion, Swelling Tide) · P3.5
> closeout (coverage flipped to hard-fail). `npm test` 19 green, build passes.

## Goal

Grow the spell + interaction web to a deliberate coverage bar, exercise the
active-condition predicate (built but unused), and add new spells leaning into
three themes: **immobility & size**, **feeder dynamics**, **stuffing & capacity**.

## Non-goals

- No magical/sci-fi transformation theme this push (deferred by choice).
- No new engine systems — everything is table entries + text modules + spell defs.
- No zone work (that's P5).

## Coverage target

**Every registered spell participates in ≥ 3 combos.** Today (38 spells, 58 combos):

| Combos | Spells |
|---|---|
| 0 | Shape Wood, Arcane Appraisal |
| 1 | Prestidigitation, Shape Earth, Morph Mass, Conjure Food, Goodberry, Telekinesis |
| 2 | Oozing Abundance, Feast of Shadows, Detect Cravings, Fireball, Polymorph, Flesh to Food, Ambrosial Aura |

Reaching the floor needs ~25 combo-touches = ~13–15 new combos minimum, before
any themed expansion. The matrix is 8% full (58 of 703 possible pairs), so there
is no shortage of legitimate pairings.

## Make the goal lintable (do this first)

The coverage target is worthless if it's aspirational. Add a **coverage rule to
`content:lint`**: count combos-per-spell, fail (or warn, configurable) any spell
below the floor. Then every later phase has an objective "done" and regressions
are loud.

```
content:lint: 38 spells, 58 combos — 8 spells below floor(3): Shape Wood(0), ...
```

---

## Phases

### P3.2 — Coverage floor + lint rule

- Add the per-spell coverage check to `content:lint` (floor = 3, configurable).
- Fill the 15 holes above with real pairings + interaction prose. Each new combo:
  one `InteractionTable` entry + one `spell.interaction.<partner>.<trigger>` text
  module. Prefer pairings that already make narrative sense (e.g. Shape Wood +
  Enlarge Person → a feeding chair resized for a grown target).
- **Done when:** `content:lint` reports zero spells below floor; `npm test` green.

### P3.3 — Condition-based combo layer

Exercise `requires.condition` (currently zero entries use it). Combos fire on
lasting STATE, not recent casts — the emergent layer. Map conditions to triggers,
leaning into the three themes:

- **Immobility:** cast Enlarge Person on a `restrained` / `buried` / `floor_tethered`
  target → growth she can't flee; cast Erupting Earth on `floor_tethered` → buried
  where she stands.
- **Stuffing:** cast Conjure Food / Create Food and Water on a `ravenous` target →
  instant devouring + bonus calories; cast on `satiated` → forced past the limit.
- **Size milestone:** cast any growth spell on an `enlarged` target → compounding,
  furniture-break flavor.

Target ~8–10 condition entries. Each needs a `requires.condition` key and prose.
Bonus: condition combos now work on `EnvironmentalObject` too (it gained
`ActiveConditions` in P2) — a greased/buried object can participate.

- **Done when:** ≥8 entries use `requires.condition`; a test asserts a
  condition-keyed combo fires when the condition is present and not when absent.

### P3.4 — New themed spells (3–4)

Each spell ships complete: `SpellLibrary` def + `spell.scene.<name>` module with
**weight-stage coverage** + ≥3 combos + ≥1 condition interaction.

Candidate set (rename freely):

- **Immobility — "Rooting Glut"**: applies `floor_tethered` + weight; the target
  settles in place, too heavy and too anchored to rise.
- **Stuffing — "Bottomless Gullet"**: capacity spell; raises how much a target can
  take before `satiated`, turning a feast into a marathon.
- **Feeder — "Feeder's Devotion"**: willingness/relationship buff; makes feeding
  land as care, not coercion — pairs with Suggestion, Detect Cravings, Conjure Food.
- **Size — "Swelling Tide"** (optional 4th): slow runaway growth over a feast,
  combos with the stuffing spells.

- **Done when:** each new spell passes coverage floor on its own; scene prose lints
  clean across weight stages; `npm test` covers one cast of each.

### P3.5 — Closeout + re-baseline

- Re-run coverage lint: confirm every spell (old + new) ≥ floor.
- Update the combo count in this doc and the README feature list.
- **Done when:** `content:lint` clean, `npm test` green, build passes.

---

## Validation summary

- `content:lint` — refs + dup ids + text keys + **coverage floor** (new).
- `npm test` — structure + key resolution + sampled combo firing, incl. one
  condition-keyed and one per new spell.
- Manual `npm run dev` smoke: cast a condition combo, cast each new spell, read
  the narration across two weight stages.

## Risks

- **Filler combos to hit a number.** The floor is a guardrail, not a quota — a
  combo that doesn't read as a real interaction is worse than a hole. Reject
  pairings that need contrived prose; pick a different partner instead.
- **Condition combos depend on conditions actually being set.** Some spells add
  conditions, some don't. Before keying on `enlarged`, confirm Enlarge Person
  stamps it (P1 wired some; audit the rest in P3.3).
- **Weight-stage coverage on new scenes.** New spell prose must cover every stage
  or the house rule breaks; lint catches it only if the scene linter exists —
  confirm/extend it during P3.4.

## Open questions for you

1. **Coverage floor = 3?** Or higher (4–5) for a denser web? Higher = more prose.
2. **New-spell count this roadmap: 3 or 4?** The 4th ("Swelling Tide") is optional.
3. **Lint coverage = hard fail or warn?** Hard fail blocks commits until filled;
   warn lets you ship partial and track the debt.

## Next concrete action

P3.2: add the coverage rule to `content:lint`, see the real hole list, fill the
15 holes with themed pairings.
