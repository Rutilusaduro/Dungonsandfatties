#!/usr/bin/env node
// content:lint — validates the InteractionTable for dangling refs, dup IDs, missing fields.
// Loud in dev (non-zero exit), silent in prod (not run).

import { readFileSync } from 'fs';
import { TABLE } from '../src/game/magic/InteractionTable.js';
import { CONDITION_KEYS } from '../src/game/conditions/ActiveConditions.js';

// Parse spell names from SpellLibrary source (avoids importing React-adjacent deps)
const libSrc = readFileSync(new URL('../src/game/magic/SpellLibrary.js', import.meta.url), 'utf-8');
const knownSpells = [...libSrc.matchAll(/new Spell\('([^']+)'/g)].map(m => m[1]);

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
}

if (errors > 0) {
  console.error(`\ncontent:lint: ${errors} error(s). Fix before shipping.`);
  process.exit(1);
} else {
  console.log(`content:lint: ${TABLE.length} entries, ${ids.size} unique IDs — clean.`);
}
