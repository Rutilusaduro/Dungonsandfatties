// XP thresholds and level-up mechanics.
// Levels 1-20 cover a full 12-floor dungeon run.

import { SLOT_CAP } from './Balance.js';

// index = level, value = cumulative XP needed to reach that level. L1 = 0.
// Smooth superlinear curve; no cliffs. Levels 1-5 unchanged from the original.
export const XP_THRESHOLDS = [
  0, 0, 300, 900, 2100, 4500,            // 0-5
  7500, 11500, 16500, 22500, 30000,      // 6-10
  39000, 50000, 63000, 78000, 95000,     // 11-15
  115000, 138000, 165000, 196000, 232000, // 16-20
];

// Spell pools per class for level-up choices (3 options per level-up, player picks 1)
export const LEVEL_UP_SPELLS = {
  Paladin: [
    'Hold Person', 'Ambrosial Aura', 'Create Food and Water',
    'Suggestion', 'Slow', 'Confection Snare',
    'Morph Mass', 'Rapid Digestion', 'Swelling Tide',
  ],
  Mage: [
    'Erupting Earth', 'Fireball', 'Polymorph',
    'Slow', 'Haste', 'Duplication',
    'Flesh to Food', 'Ravenous Expansion', 'Culinary Transmutation',
  ],
  Warlock: [
    'Sympathetic Bond', 'Draconic Hunger', 'Ambrosial Aura',
    'Rooting Glut', 'Feeder\'s Devotion', 'Swelling Tide',
    'Imbue Life', 'Sphere of Influence', 'Malleable Flesh',
  ],
  Cleric: [
    'Hold Person', 'Suggestion', 'Slow',
    'Rapid Digestion', 'Morph Mass', 'Swelling Tide',
    'Imbue Life', 'Sphere of Influence', 'Feast Exile',
  ],
  Druid: [
    'Erupting Earth', 'Shape Earth', 'Polymorph',
    'Ravenous Expansion', 'Malleable Flesh', 'Summon Cattle',
    'Telekinesis', 'Float', 'Gust of Wind',
  ],
  Bard: [
    'Hold Person', 'Slow', 'Haste',
    'Duplication', 'Polymorph', 'Sphere of Influence',
    'Covetous Siphon', 'Wall of Force', 'Telekinesis',
  ],
};

// Slot bonuses granted each level: { 1: +N, 2: +N, 3: +N }.
// Levels 1-5 are the original hand-tuned grants; 6-20 share a rotating tail
// (L1, then L2, then L3) — SLOT_CAP in applyLevelBonus clamps any overflow,
// so late-game grants quietly become no-ops once a tier is maxed.
function slotTail(startLevel, endLevel) {
  const out = [];
  for (let L = startLevel; L <= endLevel; L++) {
    const tier = (L % 3 === 0) ? 1 : (L % 3 === 1) ? 2 : 3;
    out[L] = { [tier]: 1 };
  }
  return out;
}

const SLOT_BONUS_BY_CLASS = {
  Paladin: Object.assign([null, null, { 1: 1 }, { 1: 1, 2: 1 }, { 2: 1 }, { 2: 1, 3: 1 }], slotTail(6, 20)),
  Mage:    Object.assign([null, null, { 2: 1 }, { 2: 1 }, { 2: 1, 3: 1 }, { 3: 1 }], slotTail(6, 20)),
  Warlock: Object.assign([null, null, { 2: 1 }, { 3: 1 }, { 2: 1, 3: 1 }, { 3: 2 }], slotTail(6, 20)),
  Cleric:  Object.assign([null, null, { 1: 1 }, { 1: 1, 2: 1 }, { 2: 1 }, { 2: 1, 3: 1 }], slotTail(6, 20)),
  Druid:   Object.assign([null, null, { 2: 1 }, { 2: 1 }, { 2: 1, 3: 1 }, { 3: 1 }], slotTail(6, 20)),
  Bard:    Object.assign([null, null, { 1: 1 }, { 2: 1 }, { 2: 1, 3: 1 }, { 3: 1 }], slotTail(6, 20)),
};

/**
 * Award XP to a character.
 * Returns { leveledUp, newLevel, xpGained } so the caller can show UI.
 */
export function awardXP(character, amount) {
  character.experience = (character.experience || 0) + amount;
  const prevLevel = character.level;
  const maxLevel = XP_THRESHOLDS.length - 1;

  while (
    character.level < maxLevel &&
    character.experience >= XP_THRESHOLDS[character.level + 1]
  ) {
    character.level += 1;
  }

  const leveledUp = character.level > prevLevel;
  return { leveledUp, newLevel: character.level, xpGained: amount };
}

/**
 * Apply the mechanical bonuses for a level-up (slots).
 * Call AFTER the player picks their spell unlock.
 */
export function applyLevelBonus(character) {
  const bonus = SLOT_BONUS_BY_CLASS[character.class_]?.[character.level] || {};
  for (const [lvl, n] of Object.entries(bonus)) {
    const cap = SLOT_CAP[lvl] ?? Infinity;
    const room = cap - (character.maxSpellSlots[lvl] || 0);
    const grant = Math.max(0, Math.min(n, room));
    character.maxSpellSlots[lvl] = (character.maxSpellSlots[lvl] || 0) + grant;
    character.spellSlots[lvl]    = (character.spellSlots[lvl]    || 0) + grant;
  }
}

const CAPSTONE_LABEL = {
  Paladin:  'Radiant Providence — slots replenish 1 L3 per rest bonus; +20% feed yield.',
  Mage:     'Arcane Ascendancy — L3 spells fill 80% stomach; +1 L2 and +1 L3 slot.',
  Warlock:  "Pact Apotheosis — Willingness drain is permanent; targets can't purge after 3 casts.",
  Cleric:   'Divine Bounty — Long rest restores 2 extra L2 slots; +25% caloric retention.',
  Druid:    'Wild Satiation — Force-feed lands as L1 spell equivalent (+20% base).',
  Bard:     'Song of the Feast — Every spell triggers a 5% bonus gorge on all living enemies.',
};

/**
 * Pick 3 random spell options for the level-up choice.
 * Excludes spells the character already knows.
 */
export function levelUpChoices(character, knownSpells) {
  // Level 20: capstone — present 1 sentinel option, no spell pool
  if (character.level === 20) {
    return [`[CAPSTONE] ${CAPSTONE_LABEL[character.class_] || 'Epic mastery ascends.'}`];
  }
  const pool = (LEVEL_UP_SPELLS[character.class_] || [])
    .filter(name => !knownSpells?.has(name));
  // Fisher-Yates shuffle, take 3
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 3);
}

export function xpToNextLevel(character) {
  const next = character.level + 1;
  return next < XP_THRESHOLDS.length ? XP_THRESHOLDS[next] - character.experience : null;
}
