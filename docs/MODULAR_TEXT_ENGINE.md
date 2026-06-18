# Modular Text Engine

State-driven text generation for **Dungons & Fatties**. This is a faithful port
of the GameDev modular text engine (branch `Primary`,
`src/textEngine/engine.js`), with the game-specific seam — the dimension
derivation and the `when` selector keys — swapped to this game's weight and
spell-condition variables. The resolver machinery is identical: best/pool
selection with specificity scoring, per-event anti-repetition, slot filters,
the `{join}` meta-slot, `:ref`/`:group` retargeting, recursive rendering, and a
smoothing pass.

The guiding rule: **never hardcode prose in game logic.** Entities and spells
describe *state*; the engine turns state into words.

---

## 1. Core concepts

- **Module** — a named variant list (`npc.dialogue.greeting`, `body.desc`,
  `spell.scene.hold_person`).
- **Variant** — one option in a module: `{ when, weight?, priority?, text }`.
  `text` is a string, an array of strings (one is picked), or a `(ctx) => string`
  function.
- **Context** — normalized game state. Built by `createContext({ subject, ref,
  globals })`; the derived selector dimensions live on `ctx.d`.
- **Slot** — `{module}` inside text, resolved recursively (depth ≤ 5).
- **Dimension** — a derived value on `ctx.d` matched by `when`.

---

## 2. Selection modes

**`registerPool(key, variants)` — default for new content.**
All matching variants stay RNG-eligible; weight is
`(variant.weight ?? 1) × 3^specificity`. A 2-condition variant outweighs a
wildcard ~9:1, so specific flavor usually wins but generic lines still surface
as spice. Use a higher `weight` to keep a voice dominant (personas use `4`).

**`registerModule(key, variants)` — best-match / suppressive.**
The most specific match wins outright; ties pool. Use when less-specific
variants must be *impossible*, not merely rare (e.g. `npc.examine`, `body.desc`,
where a restraint description must beat the plain weight description).

**`priority`** is a hard gate: only the max-priority matching variants survive.
Used sparingly — e.g. suspended `body.desc` variants carry `priority: 1` so they
win ties against the plain candy-bond variant.

`registerModuleVariants(key, variants, { weight })` prepends overlay variants
(personas) without replacing the base pool, multiplying each by `weight`.

---

## 3. The `when` selector

All keys in a `when` clause combine as **AND**; an array value is **OR**.
Two authoring forms are supported and may be mixed:

- **Flat range keys:** `stageMin`, `stageMax`, `willingnessMin/Max`,
  `reputationMin/Max`, `hungerTierMin/Max`, `fullnessMin/Max`, `gainMin/Max`,
  `weekMin/Max`.
- **Object ranges:** `{ stage: { min: 7 } }`, `{ reputation: { min: 50, max: 90 } }`
  — works on any numeric dimension.
- **Exact / array:** `{ restrainedBy: 'hold_person' }`,
  `{ sizeClass: ['ssbbw', 'immobile'] }`.
- **Globals:** `spell`, `option`, `recentSpell` (per-cast data), plus any key on
  `ctx.globals`.

`when: {}` is the wildcard (score 0) — always include one as a fallback.

### Selector dimensions (this game)

| Dimension | Meaning |
|-----------|---------|
| `stage` | 0–11 weight stage (percent gain over the entity's own base weight) — see `stages.js` |
| `sizeClass` | coarse body class: `thin` (0–1), `plump` (2–3), `fat` (4–5), `ssbbw` (6–7), `immobile` (8–9), `leviathan` (10–11) |
| `reputation` | NPC ↔ player, −100…100 |
| `willingness` | susceptibility to feeding, 0–100 |
| `hungerTier` | 0–3 (creatures); `ravenous` = 1 at tier 3 |
| `fullness` / `fullnessRatio` | satiation (0/1, and 0–1 ratio if capacity known) |
| `isRestrained` / `restrained` | 0/1 |
| `restrainedBy` | `'none'` \| `'hold_person'` \| `'confection_snare'` \| … (spell key) |
| `restraintMaterial` | `'none'` \| `'candy'` \| `'magic'` \| `'earth'` \| `'vines'` \| `'slick'` |
| `suspensionState` / `suspended` | `'ceiling'` \| `'hybrid'` \| `'none'`; `suspended` 0/1 |
| `buried`, `mindControlled`, `oozeCoated`, `enlarged` | 0/1 |
| `persona` | stable NPC voice key (`'bella'`, `'silvia'`, `'gregg'`, `'cassandra'`, `'gertrude'`) |
| `mobilityLevel` | derived from stage: `full` → `minimal` → `immobile` |
| `relSize` / `refStage` | subject size vs the `ref` (caster) |

All of these come from `engine.js → deriveFor()`. To add a dimension, edit
`deriveFor()` (entity-derived) or call `registerDimension(key, ctx => …)`.

---

## 4. Conditions: how state gets onto a target

Lingering spell effects live in `entity.conditions` (an `ActiveConditions`
instance on every NPC, Creature, and Character). `deriveFor()` reads them into
the dimensions above. They are applied during play by
`Game.jsx → applySpellConditions()` after a cast:

| Spell / option | Condition applied |
|----------------|-------------------|
| any `restraint`/`paralysis`-tagged spell | `restrained` (+ `material`, `suspension`) |
| Confection Snare → *Ceiling Suspension* | `restrained` with `suspension: 'ceiling'` |
| Erupting Earth → *Bury* | `buried` |
| Rapid Digestion | `satiated` (and `isFullness`) |
| Polymorph | `enlarged` |
| Ravenous Expansion | `ravenous` |

Each cast also pushes the spell key onto `target.spellAffects` (capped recent-
spell memory), exposed to `when` as `recentSpell` for combo narration.

---

## 5. Slots, filters, and the `{join}` meta-slot

Inside any `text`:

- `{module}` — resolve another module with the current context.
- `{module:ref}` / `{module:group}` — retarget onto the `ref`/`group` character
  (e.g. `{word.size:ref}` describes the caster).
- **Filters:** `{x|cap}` (capitalize), `{x|lower}`, `{x|a}` (prefix a/an),
  `{x|prefix:, }`, `{x|suffix:.}`. Chainable: `{x|cap|suffix:!}`.
- **Optional clause group:** `{join:body.belly,body.thighs|prefix: }` — resolves
  each module, drops empties, glues survivors with commas + a final "and",
  emitting the prefix only if something survived.
- Literal braces: write `{{` for a literal `{`.

Core vocabulary slots (`vocab.js`): `{word.size}`, `{word.movement}`,
`{word.body}`, `{word.clothing}`, `{word.fullness}`, `{word.eating}`,
`{subject.name}`, `{subject.first}`, `{subject.lbs}`, `{subject.pronoun}` (she),
`{subject.object}` (her), `{subject.possessive}` (her), `{ref.name}`.

Body lexicon slots (`lexicon/body.js`): `{body.desc}` (condition × size-class
full-body line), `{body.belly}`, `{body.rear}`, `{body.thighs}`, `{body.jiggle}`.

---

## 6. The body lexicon — size × condition

`{body.desc}` is the centerpiece: a best-match module crossing `sizeClass` with
the active condition so a **restrained thin** target reads nothing like a
**restrained SSBBW**, a buried Blob nothing like a buried slip of a girl, etc.
Sections cover: free, candy bonds, magical paralysis, ceiling suspension,
burial, mind-control, and ravenous hunger — each across all six size classes.
Compose it into scenes:

```js
text: '{subject.name} stands there — {body.desc}. {body.jiggle|cap}.'
```

---

## 7. Anti-repetition

Pool picks record a stable per-line key. Lines used this **session** (one event)
or this **week** are deprioritized (weights ×0.12 and ×0.4), not excluded; if
every eligible line is penalized, full weights are restored. Share one
`sessionUsed` Set across renders in a single event to vary a multi-line scene.

---

## 8. Authoring rules of thumb

1. **Always include a `when: {}` wildcard** with tone-neutral text that reads
   correctly under any state.
2. **One grammar shape per pool** (all participle clauses, or all full
   sentences) so slots compose cleanly.
3. **Key on positive states**, never "NOT" conditions.
4. **Don't re-register a key** — it overwrites.
5. **Decompose long prose** into a skeleton + fragment slots rather than one
   giant string, so variety is combinatorial.
6. **Personas** live in `scenes/personas.js`, gated by `persona` and prepended
   with `weight: 4`. Preserve quoted dialogue verbatim; genericize narration.

---

## 9. File map

| File | Role |
|------|------|
| `textEngine/engine.js` | Ported resolver + this game's `deriveFor()` / `evalWhen()` |
| `textEngine/stages.js` | 12-stage ladder, `getStageId`, `sizeClassFor` |
| `textEngine/vocab.js` | `{word.*}` / `{subject.*}` slots from the weight-gain lexicon |
| `textEngine/lexicon.js` | Weight-gain vocabulary data (size/movement/body/…) |
| `textEngine/lexicon/body.js` | `{body.desc}` + body sub-part pools (size × condition) |
| `textEngine/scenes/npc.js` | NPC dialogue states, examine, reactions |
| `textEngine/scenes/personas.js` | Per-NPC voice overlays (persona-gated) |
| `textEngine/scenes/spell.js` | Spell scenes, weight-gain, `spell.on_conditioned`, interactions |
| `textEngine/index.js` | Registration order + compatibility facade (`getTextEngine()`) |
| `game/conditions/ActiveConditions.js` | Per-entity lingering-condition store |

---

## 10. Quick render reference

```js
import { getTextEngine } from '../textEngine/index.js';
const engine = getTextEngine();

// Render a module for an entity (NPC/Creature/Character):
engine.render('npc.examine', npc._createContext());

// With a caster reference + per-cast globals (for combos / :ref slots):
engine.render('spell.scene.fireball',
  target._createContext({ ref: caster, globals: { recentSpells: ['hold_person'] } }));

// Inline template with slots + filters:
engine.render('{subject.name} — {body.desc}.', npc._createContext());
```
