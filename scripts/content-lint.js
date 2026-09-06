#!/usr/bin/env node
// content:lint — validates the InteractionTable for dangling refs, dup IDs, missing fields.
// Loud in dev (non-zero exit), silent in prod (not run).

import { TABLE } from '../src/game/magic/InteractionTable.js';
import { CONDITION_KEYS } from '../src/game/conditions/ActiveConditions.js';
import { getTextEngine } from '../src/textEngine/index.js';
import SpellLibrary from '../src/game/magic/SpellLibrary.js';
import { ARCHETYPES } from '../src/game/combat/EnemyController.js';
import { WEIGHT_STAGES } from '../src/textEngine/stages.js';
import { ITEMS, FLOOR_LOOT } from '../src/game/items/Equipment.js';
import * as ENEMY_MODULE from '../src/game/dungeon/Enemies.js';
import CLASS_REGISTRY from '../src/game/classes/ClassRegistry.js';
import { LEVEL_UP_SPELLS } from '../src/game/mechanics/ProgressionSystem.js';
import { WORLD_ZONES } from '../src/game/world/data/worldZones.js';
import { NPC_ROSTER } from '../src/game/world/data/npcRoster.js';
import { SKILL_REGISTRY } from '../src/game/mechanics/SkillRegistry.js';

// SpellLibrary is pure JS (no React) — load it for names + target validation
const lib = new SpellLibrary();
const knownSpells = [...lib.spells.keys()];
// A spell can target a living entity if it allows creature/npc or has no restriction
const targetsLiving = (name) => {
  const vt = lib.getSpell(name)?.validTargets || [];
  return vt.length === 0 || vt.includes('creature') || vt.includes('npc');
};

// Text engine is pure JS — load it to verify every combo's text key resolves
const engine = getTextEngine();

let errors = 0;
const ids = new Set();

for (const entry of TABLE) {
  const tag = `[${entry.id || '(no-id)'}]`;

  if (!entry.id) { console.error(`content:lint ERROR ${tag} missing 'id'`); errors++; }
  if (!entry.trigger) { console.error(`content:lint ERROR ${tag} missing 'trigger'`); errors++; }
  if (!entry.requires) { console.error(`content:lint ERROR ${tag} missing 'requires'`); errors++; }
  if (!entry.text) { console.error(`content:lint ERROR ${tag} missing 'text'`); errors++; }
  if (!entry.description) { console.error(`content:lint ERROR ${tag} missing 'description'`); errors++; }

  if (entry.id) {
    if (ids.has(entry.id)) { console.error(`content:lint ERROR ${tag} DUPLICATE ID`); errors++; }
    ids.add(entry.id);
  }

  if (entry.trigger && !knownSpells.includes(entry.trigger)) {
    console.error(`content:lint ERROR ${tag} unknown trigger spell: '${entry.trigger}'`);
    errors++;
  }

  if (entry.requires?.recentSpell && !knownSpells.includes(entry.requires.recentSpell)) {
    console.error(`content:lint ERROR ${tag} unknown partner spell: '${entry.requires.recentSpell}'`);
    errors++;
  }

  if (entry.requires?.condition && !CONDITION_KEYS.includes(entry.requires.condition)) {
    console.error(`content:lint ERROR ${tag} unknown condition key: '${entry.requires.condition}'`);
    errors++;
  }

  // Condition lives on the target — the trigger must be able to target a living entity,
  // else the combo can never fire.
  if (entry.requires?.condition && entry.trigger && knownSpells.includes(entry.trigger)
      && !targetsLiving(entry.trigger)) {
    console.error(`content:lint ERROR ${tag} trigger '${entry.trigger}' cannot target a living entity, so condition '${entry.requires.condition}' never applies`);
    errors++;
  }

  if (entry.text && !engine.hasModule(entry.text)) {
    console.error(`content:lint ERROR ${tag} text key does not resolve: '${entry.text}'`);
    errors++;
  }

  // Finisher entries (C2) must declare a defeat state the combat checker understands.
  if (entry.finisher) {
    const states = ['immobilized', 'succumbed', 'consumed'];
    if (!entry.defeat || !states.includes(entry.defeat.state)) {
      console.error(`content:lint ERROR ${tag} finisher must declare defeat.state in ${states.join('/')}`);
      errors++;
    }
    if (!entry.requires?.condition) {
      console.error(`content:lint ERROR ${tag} finisher must gate on a condition (the precondition an enemy can deny)`);
      errors++;
    }
  }
}

// Coverage: every spell should participate in >= FLOOR combos (as trigger or partner).
// ponytail: warn-only during the content build; flip COVERAGE_HARD=true at P3.5 closeout.
const COVERAGE_FLOOR = 3;
const COVERAGE_HARD = true; // P3.5 closeout: floor is now enforced, not just warned
// Cantrips are intentionally simple and non-interacting — exempt from combo coverage.
const isCantrip = (name) => { const sp = lib.getSpell(name); return sp?.level === 0 || (sp?.tags || []).includes('cantrip'); };
const touches = Object.fromEntries(knownSpells.filter(s => !isCantrip(s)).map(s => [s, 0]));
for (const entry of TABLE) {
  if (entry.trigger in touches) touches[entry.trigger]++;
  if (entry.requires?.recentSpell in touches) touches[entry.requires.recentSpell]++;
}
const below = Object.entries(touches)
  .filter(([, c]) => c < COVERAGE_FLOOR)
  .sort((a, b) => a[1] - b[1]);

if (below.length > 0) {
  const list = below.map(([s, c]) => `${s}(${c})`).join(', ');
  const msg = `coverage: ${below.length} spell(s) below floor(${COVERAGE_FLOOR}): ${list}`;
  if (COVERAGE_HARD) { console.error(`content:lint ERROR ${msg}`); errors++; }
  else { console.warn(`content:lint WARN  ${msg}`); }
}

// Archetype finisher paths (C3): every enemy must leave >= 2 finisher preconditions
// open, or the fight is a single-solution puzzle, not combat.
const finisherConds = [...new Set(TABLE.filter(e => e.finisher).map(e => e.requires?.condition).filter(Boolean))];
for (const [id, trait] of Object.entries(ARCHETYPES)) {
  const open = finisherConds.filter(c => !(trait.denies || []).includes(c));
  if (open.length < 2) {
    console.error(`content:lint ERROR [archetype:${id}] leaves only ${open.length} open finisher path(s) (${open.join(', ') || 'none'}); need >= 2`);
    errors++;
  }
}

// Victory-scene coverage (C4): vic.size_payoff must resolve a line at EVERY
// weight stage (a glut-clear and a floor-win can't share one readout), and the
// vic.scene composer must render non-empty for both ends of the ladder.
for (const stage of WEIGHT_STAGES) {
  const base = 100;
  const subject = { name: 'Test', baseWeight: base, currentWeight: base * (1 + stage.minPct / 100) };
  const payoff = engine.render('vic.size_payoff', { subject });
  if (!payoff) {
    console.error(`content:lint ERROR [vic.size_payoff] no line resolves at stage ${stage.id} (${stage.key})`);
    errors++;
  }
}
// Combat-fattening coverage (phase 5): combat.fattening must resolve a line at
// every fullness band, so a mid-fight swell never renders empty.
for (const ratio of [0.55, 0.75, 0.9, 1.0]) {
  const subject = { name: 'Test', baseWeight: 100, currentWeight: 220, stomachCapacity: 100, fullness: ratio * 100 };
  const line = engine.render('combat.fattening', { subject });
  if (!line) {
    console.error(`content:lint ERROR [combat.fattening] no line resolves at fullness ${ratio}`);
    errors++;
  }
}

// The full skeleton must compose end-to-end for a representative win.
const vicSmoke = engine.render('vic.scene', {
  subject: { name: 'Test', baseWeight: 100, currentWeight: 400, willingness: 90 },
  globals: { state: 'consumed', via: 'flesh_to_food' },
});
if (!vicSmoke || vicSmoke.split(/\s+/).length < 8) {
  console.error(`content:lint ERROR [vic.scene] skeleton failed to compose: "${vicSmoke}"`);
  errors++;
}

// ── Content refs (Step 1, scale-4x): enemies, loot, class/levelup spell pools ──
const itemKeys = new Set(Object.keys(ITEMS));
const spellSet = new Set(knownSpells);
// All FLOORn_ENEMIES exports, in floor order.
const ALL_ENEMIES = Object.entries(ENEMY_MODULE)
  .filter(([k, v]) => /^FLOOR\d+_ENEMIES$/.test(k) && Array.isArray(v))
  .sort((a, b) => parseInt(a[0].match(/\d+/)[0]) - parseInt(b[0].match(/\d+/)[0]))
  .flatMap(([, v]) => v);

for (const e of ALL_ENEMIES) {
  const tag = `[enemy:${e.name || '(no-name)'}]`;
  if (!e.name) { console.error(`content:lint ERROR ${tag} missing 'name'`); errors++; }
  if (!ARCHETYPES[e.archetype]) {
    console.error(`content:lint ERROR ${tag} unknown archetype: '${e.archetype}'`); errors++;
  }
  for (const key of e.lootTable || []) {
    if (!itemKeys.has(key)) { console.error(`content:lint ERROR ${tag} lootTable key not in ITEMS: '${key}'`); errors++; }
  }
}

for (const [floor, keys] of Object.entries(FLOOR_LOOT)) {
  for (const key of keys) {
    if (!itemKeys.has(key)) { console.error(`content:lint ERROR [FLOOR_LOOT:${floor}] key not in ITEMS: '${key}'`); errors++; }
  }
}

for (const [cls, def] of Object.entries(CLASS_REGISTRY)) {
  for (const name of def.startingSpells || []) {
    if (!spellSet.has(name)) { console.error(`content:lint ERROR [class:${cls}] startingSpell not in SpellLibrary: '${name}'`); errors++; }
  }
}

for (const [cls, pool] of Object.entries(LEVEL_UP_SPELLS)) {
  for (const name of pool) {
    if (!spellSet.has(name)) { console.error(`content:lint ERROR [LEVEL_UP_SPELLS:${cls}] spell not in SpellLibrary: '${name}'`); errors++; }
  }
}

// World expansion inventory (10× scope gates)
const ZONE_MIN = 40;
const NPC_MIN = 80;
const SKILL_MIN = 18;
if (WORLD_ZONES.length < ZONE_MIN) {
  console.error(`content:lint ERROR [world] ${WORLD_ZONES.length} zones — need >= ${ZONE_MIN}`);
  errors++;
}
const rosterKeys = Object.keys(NPC_ROSTER);
if (rosterKeys.length < NPC_MIN) {
  console.error(`content:lint ERROR [world] ${rosterKeys.length} NPCs — need >= ${NPC_MIN}`);
  errors++;
}
for (const zone of WORLD_ZONES) {
  for (const key of zone.npcKeys || []) {
    if (!NPC_ROSTER[key]) {
      console.error(`content:lint ERROR [world:${zone.id}] unknown npcKey '${key}'`);
      errors++;
    }
    for (const [dir, target] of Object.entries(zone.exits || {})) {
      if (!WORLD_ZONES.some(z => z.id === target)) {
        console.error(`content:lint ERROR [world:${zone.id}] exit ${dir} → unknown zone '${target}'`);
        errors++;
      }
    }
  }
}
for (const topic of ['market_banter', 'temple_sermon', 'noble_gossip', 'harbor_tales']) {
  if (!engine.hasModule(`npc.dialogue.${topic}`)) {
    console.error(`content:lint ERROR [world] missing dialogue module npc.dialogue.${topic}`);
    errors++;
  }
}
if (Object.keys(SKILL_REGISTRY).length < SKILL_MIN) {
  console.error(`content:lint ERROR [skills] ${Object.keys(SKILL_REGISTRY).length} skills — need >= ${SKILL_MIN}`);
  errors++;
}

// Every roster NPC must have persona + dialogue topics
for (const [key, def] of Object.entries(NPC_ROSTER)) {
  if (!def.persona) {
    console.error(`content:lint ERROR [npc:${key}] missing persona`);
    errors++;
  }
  if (!def.dialogueTopics?.includes('greeting')) {
    console.error(`content:lint ERROR [npc:${key}] missing greeting topic`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\ncontent:lint: ${errors} error(s). Fix before shipping.`);
  process.exit(1);
} else {
  console.log(`content:lint: ${TABLE.length} combos, ${ALL_ENEMIES.length} enemies, ${itemKeys.size} items, ${knownSpells.length} spells, ${WORLD_ZONES.length} zones, ${rosterKeys.length} NPCs, ${Object.keys(SKILL_REGISTRY).length} skills — clean.`);
}
