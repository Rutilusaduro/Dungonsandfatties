#!/usr/bin/env node
// content:lint — validates the InteractionTable for dangling refs, dup IDs, missing fields.
// Loud in dev (non-zero exit), silent in prod (not run).

import { TABLE } from '../src/game/magic/InteractionTable.js';
import { CONDITION_KEYS } from '../src/game/conditions/ActiveConditions.js';
import { getTextEngine } from '../src/textEngine/index.js';
import SpellLibrary from '../src/game/magic/SpellLibrary.js';

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
}

// Coverage: every spell should participate in >= FLOOR combos (as trigger or partner).
// ponytail: warn-only during the content build; flip COVERAGE_HARD=true at P3.5 closeout.
const COVERAGE_FLOOR = 3;
const COVERAGE_HARD = true; // P3.5 closeout: floor is now enforced, not just warned
const touches = Object.fromEntries(knownSpells.map(s => [s, 0]));
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

if (errors > 0) {
  console.error(`\ncontent:lint: ${errors} error(s). Fix before shipping.`);
  process.exit(1);
} else {
  console.log(`content:lint: ${TABLE.length} entries, ${ids.size} unique IDs, ${knownSpells.length} spells — clean.`);
}
