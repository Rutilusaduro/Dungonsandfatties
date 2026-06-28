// XP thresholds and level-up mechanics.
// Levels 1-5 cover a single dungeon run.

export const XP_THRESHOLDS = [0, 0, 300, 900, 2100, 4500];
// index = level, value = XP needed to reach that level. Level 1 = 0.

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
};

// Slot bonuses granted each level: { 1: +N, 2: +N, 3: +N }
const SLOT_BONUS_BY_CLASS = {
  Paladin: [null, null, { 1: 1 }, { 1: 1, 2: 1 }, { 2: 1 }, { 2: 1, 3: 1 }],
  Mage:    [null, null, { 2: 1 }, { 2: 1 }, { 2: 1, 3: 1 }, { 3: 1 }],
  Warlock: [null, null, { 2: 1 }, { 3: 1 }, { 2: 1, 3: 1 }, { 3: 2 }],
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
    character.maxSpellSlots[lvl] = (character.maxSpellSlots[lvl] || 0) + n;
    character.spellSlots[lvl]    = (character.spellSlots[lvl]    || 0) + n;
  }
}

/**
 * Pick 3 random spell options for the level-up choice.
 * Excludes spells the character already knows.
 */
export function levelUpChoices(character, knownSpells) {
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
