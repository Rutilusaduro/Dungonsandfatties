// Class skills — active abilities distinct from spells. Usable in combat and exploration.
// Each skill has a cooldown (encounters) and a diegetic effect.

export const SKILL_CATEGORIES = {
  combat: 'Combat',
  support: 'Support',
  social: 'Social',
  exploration: 'Exploration',
};

export const SKILL_REGISTRY = {
  // ── Paladin ──────────────────────────────────────────────────────────────
  holy_sustenance: {
    id: 'holy_sustenance',
    name: 'Holy Sustenance',
    class: 'Paladin',
    category: 'support',
    cooldown: 2,
    description: 'Bless the next feeding — it lands with sacred weight, filling faster and lingering longer.',
    effect: 'feed_boost',
    magnitude: 0.35,
  },
  divine_rebuke: {
    id: 'divine_rebuke',
    name: 'Divine Rebuke',
    class: 'Paladin',
    category: 'combat',
    cooldown: 3,
    description: 'A flash of holy force staggers a foe and pins their appetite open for a moment.',
    effect: 'willingness_spike',
    magnitude: 25,
  },
  sanctuary_feast: {
    id: 'sanctuary_feast',
    name: 'Sanctuary Feast',
    class: 'Paladin',
    category: 'exploration',
    cooldown: 4,
    description: 'Consecrate the area — food here tastes richer and satisfies deeper for a short while.',
    effect: 'zone_food_aura',
    magnitude: 0.5,
  },

  // ── Mage ───────────────────────────────────────────────────────────────────
  arcane_survey: {
    id: 'arcane_survey',
    name: 'Arcane Survey',
    class: 'Mage',
    category: 'exploration',
    cooldown: 1,
    description: 'Sense cravings, hidden food, and magical residue in the current area.',
    effect: 'reveal_cravings',
    magnitude: 1,
  },
  metabolic_insight: {
    id: 'metabolic_insight',
    name: 'Metabolic Insight',
    class: 'Mage',
    category: 'combat',
    cooldown: 2,
    description: 'Read a foe\'s fullness rhythm — your next spell fills where they are weakest.',
    effect: 'crit_feed_next',
    magnitude: 1,
  },
  transmute_rations: {
    id: 'transmute_rations',
    name: 'Transmute Rations',
    class: 'Mage',
    category: 'support',
    cooldown: 3,
    description: 'Turn ambient matter into a modest serving of rich food.',
    effect: 'conjure_snack',
    magnitude: 400,
  },

  // ── Warlock ────────────────────────────────────────────────────────────────
  pact_whisper: {
    id: 'pact_whisper',
    name: 'Pact Whisper',
    class: 'Warlock',
    category: 'social',
    cooldown: 2,
    description: 'Your patron\'s voice curls through the air — hunger answers before reason can.',
    effect: 'willingness_spike',
    magnitude: 30,
  },
  siphon_essence: {
    id: 'siphon_essence',
    name: 'Siphon Essence',
    class: 'Warlock',
    category: 'combat',
    cooldown: 3,
    description: 'Drain a sliver of a foe\'s fullness into yourself as raw potential.',
    effect: 'siphon_fill',
    magnitude: 0.15,
  },
  eldritch_lure: {
    id: 'eldritch_lure',
    name: 'Eldritch Lure',
    class: 'Warlock',
    category: 'exploration',
    cooldown: 4,
    description: 'Something unseen stirs appetites nearby — NPCs grow more receptive.',
    effect: 'zone_willingness_aura',
    magnitude: 15,
  },

  // ── Cleric ─────────────────────────────────────────────────────────────────
  blessed_offering: {
    id: 'blessed_offering',
    name: 'Blessed Offering',
    class: 'Cleric',
    category: 'support',
    cooldown: 2,
    description: 'Sanctify food so it nourishes body and spirit alike.',
    effect: 'feed_boost',
    magnitude: 0.4,
  },
  turn_the_hungry: {
    id: 'turn_the_hungry',
    name: 'Turn the Hungry',
    class: 'Cleric',
    category: 'combat',
    cooldown: 3,
    description: 'Holy radiance overwhelms resistance — a foe\'s guard drops around food.',
    effect: 'willingness_spike',
    magnitude: 20,
  },
  communal_bread: {
    id: 'communal_bread',
    name: 'Communal Bread',
    class: 'Cleric',
    category: 'exploration',
    cooldown: 3,
    description: 'Break bread with those present — reputation rises with every shared bite.',
    effect: 'reputation_boost',
    magnitude: 10,
  },

  // ── Druid ──────────────────────────────────────────────────────────────────
  wild_forage: {
    id: 'wild_forage',
    name: 'Wild Forage',
    class: 'Druid',
    category: 'exploration',
    cooldown: 1,
    description: 'The land offers what it has — berries, roots, and ripe things hidden nearby.',
    effect: 'conjure_snack',
    magnitude: 300,
  },
  growth_spurt: {
    id: 'growth_spurt',
    name: 'Growth Spurt',
    class: 'Druid',
    category: 'combat',
    cooldown: 3,
    description: 'Life swells in a living target — a sudden, organic swell of mass.',
    effect: 'weight_burst',
    magnitude: 40,
  },
  natures_embrace: {
    id: 'natures_embrace',
    name: 'Nature\'s Embrace',
    class: 'Druid',
    category: 'support',
    cooldown: 4,
    description: 'Vines and soft earth cradle a target — they settle, relax, and accept more.',
    effect: 'willingness_spike',
    magnitude: 18,
  },

  // ── Bard ───────────────────────────────────────────────────────────────────
  honeyed_tongue: {
    id: 'honeyed_tongue',
    name: 'Honeyed Tongue',
    class: 'Bard',
    category: 'social',
    cooldown: 1,
    description: 'A flattering word, a knowing smile — defenses soften before the first bite.',
    effect: 'willingness_spike',
    magnitude: 15,
  },
  feast_ballad: {
    id: 'feast_ballad',
    name: 'Feast Ballad',
    class: 'Bard',
    category: 'combat',
    cooldown: 3,
    description: 'A lilting refrain that makes every mouthful feel like a celebration.',
    effect: 'feed_boost',
    magnitude: 0.3,
  },
  rumor_mill: {
    id: 'rumor_mill',
    name: 'Rumor Mill',
    class: 'Bard',
    category: 'exploration',
    cooldown: 2,
    description: 'Gossip travels fast — learn who in the area hungers for what.',
    effect: 'reveal_cravings',
    magnitude: 1,
  },
};

/** Starting skills per class (unlocked at L1). More unlock via level milestones. */
export const CLASS_STARTING_SKILLS = {
  Paladin: ['holy_sustenance', 'divine_rebuke'],
  Mage: ['arcane_survey', 'metabolic_insight'],
  Warlock: ['pact_whisper', 'siphon_essence'],
  Cleric: ['blessed_offering', 'turn_the_hungry'],
  Druid: ['wild_forage', 'growth_spurt'],
  Bard: ['honeyed_tongue', 'feast_ballad'],
};

/** Skills granted at specific levels (cumulative). */
export const LEVEL_SKILL_UNLOCKS = {
  3: { Paladin: ['sanctuary_feast'], Mage: ['transmute_rations'], Warlock: ['eldritch_lure'],
       Cleric: ['communal_bread'], Druid: ['natures_embrace'], Bard: ['rumor_mill'] },
};

export function skillsForClass(className) {
  return Object.values(SKILL_REGISTRY).filter(s => s.class === className);
}

export function getSkill(id) {
  return SKILL_REGISTRY[id] || null;
}

export function startingSkillsForClass(className) {
  return (CLASS_STARTING_SKILLS[className] || []).map(getSkill).filter(Boolean);
}

export function unlockSkillsAtLevel(className, level) {
  const unlock = LEVEL_SKILL_UNLOCKS[level]?.[className] || [];
  return unlock.map(getSkill).filter(Boolean);
}
