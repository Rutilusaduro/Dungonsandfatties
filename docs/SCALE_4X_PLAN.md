# Scale 4× Plan — Dungeons & Fatties (v2, J2S-reviewed)

Goal: grow the playable surface by ~4× without the run turning into 36 copies of the same fight. Each step ships something playable end-to-end and merges green.

**Metric for "4×":** total **encounters** (9 → 36) is the headline factor — it's what the player's playtime actually scales with. Other axes scale to *support* that, not all uniformly: floors 4×, levels 4×, items 4×, classes 2× (replay, not run length), spells stay ~flat (53 already authored; new content reuses them).

Current → Target:

| Axis | Now | Target | Factor |
|------|-----|--------|--------|
| Encounters | 9 | 36 | 4× |
| Floors | 3 | 12 | 4× |
| Enemies | 10 | 40 | 4× |
| Archetypes | 4 | 8 | 2× |
| Items | 13 | 52 | 4× |
| Max level | 5 | 20 | 4× |
| Classes | 3 | 6 | 2× |
| Biomes | 1 | 4 | 4× |
| Spells | 53 | ~60 | flat |

---

## Step 1 — Extend the EXISTING content lint (foundation)

`scripts/content-lint.js` + the `content:lint` npm script already exist (`package.json:12`) and already load `SpellLibrary` + `ARCHETYPES` — today it only validates the InteractionTable combo entries. **Extend it**, don't rebuild. Add asserts:
- every `lootTable` key ∈ `ITEMS`
- every `FLOOR_LOOT` key ∈ `ITEMS`
- every floor encounter ref ∈ enemy defs
- every `startingSpell` / `LEVEL_UP_SPELLS` entry ∈ `SpellLibrary`
- every enemy `archetype` ∈ `ARCHETYPES`
- every enemy leaves ≥2 open finisher paths (denies count ≤ 2)

Enemies (`Enemies.js`) and items (`Equipment.js → ITEMS`) are *already* plain data tables — no extraction needed, contra the v1 plan. Verify: done when `npm run content:lint` fails on a deliberately broken loot key.

Why first: 4× content with no ref validation = silent broken drops everywhere. Safety net for steps 4-9.

## Step 2 — Parametric balance curves

Replace magic numbers (XP per kill, `stomachCapacity = baseWeight*0.8`, fill rates, drain 10%) with formulas keyed on floor depth + player level. So 12 floors auto-tune instead of hand-balancing 36 fights. **Cap `maxSpellSlots`** per tier (e.g. L1≤6, L2≤5, L3≤4) so 20 levels of `applyLevelBonus` + equipment don't make slots unbounded.

## Step 3 — Save / Load (explicit serialize/hydrate)

A 36-fight run must persist. **Not a `JSON.stringify` one-liner** — `Character.conditions` is a `new ActiveConditions()` instance (`Character.js:77`) and `knownSpells` is a `Set`; naive JSON drops both. Required:
- `Character.serialize()` → plain object (conditions → `conditions.keys()` array, Sets → arrays)
- `Character.hydrate(data)` → reconstructs instance + `ActiveConditions`
- `DungeonState` already plain-ish — add `serialize`/`hydrate` for `floorIndex`/`encounterIndex`/`lootPile` (lootPile items → item keys, re-looked-up from `ITEMS` on load)
- `knownSpells` → `[...set]` / `new Set(arr)`
- Save to `localStorage` on encounter boundaries (not mid-fight — re-spawn enemies fresh on resume)

Add resume-on-load to `Game.jsx`. Verify: done when a saved run reloads with conditions + known spells intact. Without this, scaling length is hostile — one closed tab loses an hour.

## Step 4 — Floors 4-12 + biomes

9 new floors grouped into 4 biomes (Pantry/Kitchen/Hall + 1 new: e.g. The Cellars). Each biome gets a passive modifier (e.g. Cellars halves fullness drain → fights run longer, reward higher). Biome modifier is the anti-monotony lever.

## Step 5 — Enemies 11-40

30 new defs across the new floors. **Invariant: every enemy leaves ≥2 open finisher paths** (don't stack archetype `denies` past 2). Each gets description prose, `lootTable`, `xpValue`, `bossEvent` for the 4 biome bosses.

## Step 6 — Single-enemy archetypes 5-7 (NO multi-enemy yet)

3 new AI behaviors that fit the **current single-enemy combat loop** (`Game.jsx` references `enemies[0]` exclusively — combat is hardcoded 1v1). Safe candidates: `mirror` (copies player's last action), `hoarder` (blocks/reduces loot drop), `colossus` (slow, huge capacity, immune to single-spell immobilize — forces combo). New scripts go in `EnemyController.ARCHETYPES`.

**Cut from v1: `swarm`.** Multi-enemy is not a script — it's a combat-loop rewrite (win-check iterates `enemies[0]` only; CombatScreen renders one panel). See Step 6b.

## Step 6b — Multi-enemy combat loop (the swarm prerequisite)

If swarm/group fights are wanted, this is its own milestone, not a free archetype:
- `doCombatPlayerAction` + `handleCombatContinue` iterate all `enemies`, not `enemies[0]`
- `checkWinState` per enemy; encounter won when ALL defeated
- `CombatScreen` renders N enemy panels + target selection
- enemy turns loop over living enemies

Verify: a 2-enemy encounter where killing one leaves the fight live. **Decision needed (open question): is group combat in scope for 4×, or defer?** If deferred, drop the 8th archetype target to 7.

## Step 7 — Items 14-52

39 new equipment across 4 slots × 4 rarities. Wire each into `FLOOR_LOOT` by tier; Step 1 lint guards the keys. Add 2-3 new bonus types beyond `bonusSlots`/`feedBonus` (e.g. `drainResist`, `critFeed`) so loot decisions stay interesting at depth. Each new bonus needs a consuming site in combat math (a bonus nothing reads is dead data — lint it).

## Step 8 — Level cap 5 → 20

Extend `XP_THRESHOLDS` to 20 entries (smooth curve, no cliffs). Extend `SLOT_BONUS_BY_CLASS` + `LEVEL_UP_SPELLS` per class to cover 20 levels (Step 2 slot cap stops inflation). **Spell-budget reality:** only 53 spells exist and current pools already draw from them — extending pools to 20 levels × 6 classes will exhaust unique spells. Either author ~10-15 new spells here or let pools repeat across classes (decide in Step 9 audit). Level-up pool must degrade gracefully when all class spells learned (already handled — `levelUpChoices` returns `[]`, panel shows "all learned").

## Step 9 — Classes 4-6 (spell-budget gated)

3 new classes (e.g. Cleric/shield, Druid/focus, Bard/tome) — replay scale. **First task: audit the spell budget.** With 53 spells and 3 existing classes' starting+levelup pools, confirm 3 new classes can field distinct `startingSpells` without total overlap, or author the gap. Then each class needs `startingSpells`, `spellSlots`, `LEVEL_UP_SPELLS`, `SLOT_BONUS_BY_CLASS`, accent color, off-hand starting item in `startGame()`.

## Step 10 — Automated dungeon playthrough test + prose pass

Two deliverables:
1. **Regression harness** (Vitest): full 12-floor auto-playthrough per class. Assert: winnable; no encounter auto-won in round 1 (the "not trivial" metric, made falsifiable — `round > 1` to clear); no broken refs; slot caps hold post-level-20.
2. **Prose pass** — see "Authoring is the critical path" below. Route all enemy/item/boss copy through `weightgain-prose` + `fuck-slop` before this step closes.

---

## Authoring is the critical path (not a footnote)

The code for 4× content is the cheap part. The expensive part is **prose**: ~30 enemy descriptions, 39 item descriptions + passives, 4 biome boss events, level-up flavor. This is the actual schedule driver. Budget it explicitly: prose authoring runs in parallel with steps 4-9, not crammed into step 10. Owner: `weightgain-prose` voice + `fuck-slop` finalize, per repo routing.

---

## Ordering rationale

1-3 are foundation (extended lint, balance math, persistence) — they make 4× content *safe* and *playable* before any of it exists. 4-9 are the content waves, each independently shippable, with prose authored in parallel. 6b + 10 are optional/net. Ship in order; each merges green.

## Risks & rollback

- **Combat monotony** is the real failure mode of "4× content," not bugs. Steps 4 (biome modifiers) + 6 (new archetypes) exist specifically to fight it. More HP-sponge fights ≠ more game. Rollback: biome mods are additive data — disable by clearing the modifier field.
- **Slot inflation** breaks combat math at high level — Step 2 cap is non-negotiable. Rollback: cap is a clamp, removing it reverts to current behavior.
- **Spell exhaustion** at 6 classes × 20 levels (M4). Gate at Step 9 audit before committing class designs.
- **Save format churn**: serialize/hydrate (Step 3) will break on schema changes mid-development. Version the save blob (`{ v: 1, ... }`); on version mismatch, discard + restart rather than crash.

## Open questions for a human

- **Group combat in scope?** Step 6b (multi-enemy) is a real combat rewrite. If yes, it's a milestone; if no, drop archetype target 8→7 and cut `swarm`. Product call.
- **New spells or shared pools?** Step 8/9 spell budget: author ~10-15 new spells (more work, distinct classes) vs. let level-up pools overlap across classes (less work, less identity). Design call.
- **4× = length or replay?** Encounters 4× makes one run longer; classes 2× makes more runs. Confirm the intent — a 36-encounter single run is a very different game from a 9-encounter run with 6 classes.
