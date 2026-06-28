// Enemy definitions for the single dungeon run.
// Each entry is a plain object; DungeonBuilder stamps them into Character-like
// entities that Combat.js and EnemyController can consume.

import { ARCHETYPES } from '../combat/EnemyController.js';

export function makeEnemy(def) {
  return {
    name:            def.name,
    _trait:          def.archetype,
    archetype:       ARCHETYPES[def.archetype],
    baseWeight:      def.baseWeight,
    currentWeight:   def.currentWeight ?? def.baseWeight,
    stomachCapacity: def.stomachCapacity ?? def.baseWeight * 0.8,
    fullness:        def.fullness ?? 0,
    willingness:     def.willingness ?? 50,
    description:     def.description,
    conditions:      { has: () => false, add() {}, remove() {}, keys: () => [], size: 0 },
    spellAffects:    [],
    isEnemy:         true,
    xpValue:         def.xpValue ?? 100,
    lootTable:       def.lootTable ?? [],
    bossEvent:       def.bossEvent ?? null,
    // Stub _createContext so SpellNarrator doesn't crash on enemies
    _createContext(extra = {}) { return { subject: this, ...extra }; },
    processLongRestNutrition() { return null; },
  };
}

// ── Floor 1 — The Pantry ──────────────────────────────────────

export const FLOOR1_ENEMIES = [
  {
    name: 'Kitchen Imp',
    archetype: 'flyer',
    baseWeight: 80,
    stomachCapacity: 90,
    willingness: 45,
    description: 'A wiry imp that darts between shelves, pelting you with enchanted morsels.',
    xpValue: 80,
    lootTable: ['feeding_fork', 'ring_of_appetite'],
  },
  {
    name: 'Pantry Goblin',
    archetype: 'brute',
    baseWeight: 140,
    stomachCapacity: 200,
    willingness: 55,
    description: 'A stocky goblin that lumbers forward, spooning enormous mouthfuls of lard at you.',
    xpValue: 120,
    lootTable: ['padded_robe', 'ring_of_appetite'],
  },
  {
    name: 'The Snack Warden',
    archetype: 'dispeller',
    baseWeight: 200,
    stomachCapacity: 280,
    willingness: 60,
    description: 'A rotund custodian who periodically purges the enchantment weighing her down, making her maddeningly hard to fatten.',
    xpValue: 250,
    lootTable: ['gorging_ladle', 'enchanted_doublet', 'amulet_of_excess'],
    isMiniBosse: true,
  },
];

// ── Floor 2 — The Kitchen ─────────────────────────────────────

export const FLOOR2_ENEMIES = [
  {
    name: 'Banquet Specter',
    archetype: 'glutton',
    baseWeight: 160,
    stomachCapacity: 350,
    willingness: 80,
    description: 'A ghost that died mid-feast. It gorges on ethereal food, swelling visibly. Succumb finisher opens fastest here.',
    xpValue: 180,
    lootTable: ['gorging_ladle', 'sanctified_buckler', 'hunger_focus'],
  },
  {
    name: 'Oven Imp',
    archetype: 'flyer',
    baseWeight: 90,
    stomachCapacity: 100,
    willingness: 40,
    description: 'Fast and slippery, this imp hurls baked goods from above with unnerving accuracy.',
    xpValue: 160,
    lootTable: ['amulet_of_excess', 'feeding_fork'],
  },
  {
    name: "Chef's Nightmare",
    archetype: 'brute',
    baseWeight: 320,
    stomachCapacity: 500,
    willingness: 65,
    description: 'A massive construct of animated cookware and half-cooked meats. Heavy and relentless. Finishers open once fattened.',
    xpValue: 400,
    lootTable: ['fattening_staff', 'feast_plate', 'arcane_cookbook'],
    isMiniBosse: true,
  },
];

// ── Floor 3 — The Feasting Hall ───────────────────────────────

export const FLOOR3_ENEMIES = [
  {
    name: 'Glutton Knight',
    archetype: 'brute',
    baseWeight: 280,
    stomachCapacity: 450,
    willingness: 70,
    description: 'A former champion who traded martial prowess for an unstoppable appetite.',
    xpValue: 280,
    lootTable: ['feast_plate', 'dread_orb'],
  },
  {
    name: 'Feasting Wraith',
    archetype: 'dispeller',
    baseWeight: 200,
    stomachCapacity: 300,
    willingness: 55,
    description: 'Incorporeal unless feasting. It purges itself constantly, resisting your fattening spells — until you break its rhythm.',
    xpValue: 320,
    lootTable: ['arcane_cookbook', 'dread_orb'],
  },
  {
    name: 'The Grand Gourmand',
    archetype: 'brute',
    baseWeight: 500,
    stomachCapacity: 900,
    willingness: 60,
    description: 'The ancient lord of this dungeon. Immense, slow, and fiercely resistant to every finisher path — except the one you\'ve prepared for.',
    xpValue: 1000,
    lootTable: ['legendary_band'],
    isBoss: true,
    bossEvent: 'When the Grand Gourmand finally succumbs, the whole hall trembles. The enchanted feast-tables crack under spreading mass. A golden ring — the Gourmand\'s Band — rolls free from the wreckage. Behind the throne, a stairwell you had not seen before yawns downward into the dark.',
  },
];

// ════════════════════════════════════════════════════════════
// SCALE-4X — floors 4-12. Three new biomes, escalating stats.
// ════════════════════════════════════════════════════════════

// ── Floor 4 — The Cellars ─────────────────────────────────────
export const FLOOR4_ENEMIES = [
  {
    name: 'Cellar Slime', archetype: 'leech', baseWeight: 180, stomachCapacity: 260, willingness: 50,
    description: 'A translucent ooze that drinks rendered fat from the cold-store and feeds the surplus straight back at you.',
    xpValue: 200, lootTable: ['basting_brush', 'bib_of_the_bottomless'],
  },
  {
    name: 'Pickle Wraith', archetype: 'trickster', baseWeight: 150, stomachCapacity: 220, willingness: 45,
    description: 'A briny spectre that slips between barrels, sloshing and dodging, never where your spell lands.',
    xpValue: 220, lootTable: ['charm_of_craving', 'skewer_of_searing'],
  },
  {
    name: 'The Brinemother', archetype: 'warden', baseWeight: 300, stomachCapacity: 420, willingness: 58,
    description: 'A vast salted matron who pickles away every ounce you force on her, resisting satiation to the last.',
    xpValue: 460, lootTable: ['quilted_gambeson', 'trencher_shield'], isMiniBoss: true,
  },
];

// ── Floor 5 — The Cold Larder ─────────────────────────────────
export const FLOOR5_ENEMIES = [
  {
    name: 'Lard Golem', archetype: 'brute', baseWeight: 340, stomachCapacity: 480, willingness: 60,
    description: 'A lumbering figure packed from rendered tallow. Slow, soft, and easy to pile higher.',
    xpValue: 260, lootTable: ['cramming_spoon', 'larders_apron'],
  },
  {
    name: 'Frost Imp', archetype: 'flyer', baseWeight: 110, stomachCapacity: 140, willingness: 42,
    description: 'It darts through the chill flinging frozen cream-puffs that burst on impact.',
    xpValue: 240, lootTable: ['whisk_of_the_whirlwind', 'girdle_of_gula'],
  },
  {
    name: 'The Glacier Glutton', archetype: 'glutton', baseWeight: 280, stomachCapacity: 560, willingness: 78,
    description: 'A half-frozen feaster that thaws only to gorge, swelling visibly with every mouthful it steals.',
    xpValue: 520, lootTable: ['ledger_of_gluttony', 'pact_morsel'], isMiniBoss: true,
  },
];

// ── Floor 6 — The Smokehouse ──────────────────────────────────
export const FLOOR6_ENEMIES = [
  {
    name: 'Smoke Revenant', archetype: 'dispeller', baseWeight: 240, stomachCapacity: 340, willingness: 55,
    description: 'A haze of cured-meat smoke that disperses your feeding magic as fast as you cast it.',
    xpValue: 300, lootTable: ['tenderizing_maul', 'band_of_second_helpings'],
  },
  {
    name: 'Hung Hog', archetype: 'brute', baseWeight: 400, stomachCapacity: 560, willingness: 64,
    description: 'An enormous smoked hog, somehow still hungry, swinging from a hook and charging when it drops.',
    xpValue: 320, lootTable: ['brigandine_of_surfeit', 'mantle_of_the_well_fed'],
  },
  {
    name: 'The Pitmaster', archetype: 'warden', baseWeight: 420, stomachCapacity: 600, willingness: 66,
    description: 'Tender of the eternal fire. He bastes away your every effort and refuses to be sated.',
    xpValue: 620, lootTable: ['pendant_of_plenty', 'tenderizing_maul'], isMiniBoss: true,
  },
];

// ── Floor 7 — The Bakery ──────────────────────────────────────
export const FLOOR7_ENEMIES = [
  {
    name: 'Dough Horror', archetype: 'glutton', baseWeight: 320, stomachCapacity: 680, willingness: 80,
    description: 'A risen mass of living dough that proofs larger by the second, doubling and doubling.',
    xpValue: 360, lootTable: ['glazing_glaive', 'grimoire_of_swelling'],
  },
  {
    name: 'Sugar Sprite', archetype: 'trickster', baseWeight: 160, stomachCapacity: 240, willingness: 48,
    description: 'A glittering blur that crystallises out of reach and dissolves your spells in spun sugar.',
    xpValue: 380, lootTable: ['torc_of_the_titan_table', 'aegis_of_plenty'],
  },
  {
    name: 'The Head Baker', archetype: 'brute', baseWeight: 480, stomachCapacity: 700, willingness: 68,
    description: 'Flour-dusted and immense, she kneads the very air, pressing weight onto everything in the room.',
    xpValue: 760, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'], isMiniBoss: true,
  },
];

// ── Floor 8 — The Confectionery ───────────────────────────────
export const FLOOR8_ENEMIES = [
  {
    name: 'Caramel Colossus', archetype: 'brute', baseWeight: 520, stomachCapacity: 760, willingness: 66,
    description: 'A slow titan of hardening caramel; every spell you land sets into another golden layer.',
    xpValue: 420, lootTable: ['honey_lance', 'hauberk_of_hunger'],
  },
  {
    name: 'Bonbon Swarmling', archetype: 'leech', baseWeight: 220, stomachCapacity: 340, willingness: 56,
    description: 'A rolling clutch of animate chocolates that gorge each other and spit the overflow at you.',
    xpValue: 440, lootTable: ['signet_of_satiation', 'famine_sigil'],
  },
  {
    name: 'The Confectioner', archetype: 'dispeller', baseWeight: 460, stomachCapacity: 640, willingness: 70,
    description: 'A precise, terrible artisan who dissolves your enchantments like sugar in hot water.',
    xpValue: 880, lootTable: ['signet_of_satiation', 'famine_sigil'], isMiniBoss: true,
  },
];

// ── Floor 9 — The Honeyed Halls ───────────────────────────────
export const FLOOR9_ENEMIES = [
  {
    name: 'Mead Wyrm', archetype: 'glutton', baseWeight: 380, stomachCapacity: 820, willingness: 82,
    description: 'A drunken serpent swollen on spilled mead, gulping anything sweet within reach — itself included.',
    xpValue: 480, lootTable: ['cauldron_breaker', 'torc_of_the_titan_table'],
  },
  {
    name: 'Comb Guardian', archetype: 'warden', baseWeight: 500, stomachCapacity: 700, willingness: 64,
    description: 'A waxen sentinel that seals itself against satiation behind walls of dripping honeycomb.',
    xpValue: 500, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'],
  },
  {
    name: 'The Honey Queen', archetype: 'leech', baseWeight: 560, stomachCapacity: 900, willingness: 72,
    description: 'Vast and golden, she drinks tribute from her swarm and pours the excess down your throat.',
    xpValue: 1000, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'], isMiniBoss: true,
  },
];

// ── Floor 10 — The Undergorge ─────────────────────────────────
export const FLOOR10_ENEMIES = [
  {
    name: 'Gloom Glutton', archetype: 'glutton', baseWeight: 460, stomachCapacity: 980, willingness: 84,
    description: 'A shadow that learned to eat. It devours the dark itself and bloats on an endless hunger.',
    xpValue: 560, lootTable: ['honey_lance', 'grimoire_of_swelling'],
  },
  {
    name: 'Maw Crawler', archetype: 'flyer', baseWeight: 200, stomachCapacity: 280, willingness: 44,
    description: 'All teeth and appetite, it scuttles along the ceiling spitting gobbets of rendered shadow-fat.',
    xpValue: 580, lootTable: ['hauberk_of_hunger', 'signet_of_satiation'],
  },
  {
    name: 'The Famine Lord', archetype: 'warden', baseWeight: 620, stomachCapacity: 860, willingness: 62,
    description: 'A gaunt aristocrat of hunger who purges himself raw, refusing every satisfaction you offer.',
    xpValue: 1120, lootTable: ['signet_of_satiation', 'hauberk_of_hunger'], isMiniBoss: true,
  },
];

// ── Floor 11 — The Endless Table ──────────────────────────────
export const FLOOR11_ENEMIES = [
  {
    name: 'Gorge Behemoth', archetype: 'brute', baseWeight: 720, stomachCapacity: 1040, willingness: 66,
    description: 'A mountain that walks to dinner. Each footfall shakes loose another course from the rafters.',
    xpValue: 680, lootTable: ['the_endless_fork', 'carapace_of_the_colossus'],
  },
  {
    name: 'Surfeit Phantom', archetype: 'trickster', baseWeight: 340, stomachCapacity: 460, willingness: 50,
    description: 'A guest who never stops arriving, flickering down the endless table just out of reach.',
    xpValue: 700, lootTable: ['codex_of_the_glut', 'heart_of_the_maw'],
  },
  {
    name: 'The Eternal Guest', archetype: 'glutton', baseWeight: 680, stomachCapacity: 1200, willingness: 86,
    description: 'Seated at the head for a thousand years, still eating, still growing, welcoming you to join the feast forever.',
    xpValue: 1400, lootTable: ['codex_of_the_glut', 'heart_of_the_maw'], isMiniBoss: true,
  },
];

// ── Floor 12 — The Undergorge Throne (final boss) ─────────────
export const FLOOR12_ENEMIES = [
  {
    name: 'Throne Sentinel', archetype: 'warden', baseWeight: 640, stomachCapacity: 900, willingness: 60,
    description: 'The last guardian before the throne, sworn to purge any magic that would unseat its master.',
    xpValue: 760, lootTable: ['bulwark_of_the_feast', 'carapace_of_the_colossus'],
  },
  {
    name: 'Herald of the Glut', archetype: 'leech', baseWeight: 580, stomachCapacity: 980, willingness: 74,
    description: 'It announces the coming feast by force-feeding all who approach, gorging on the leavings.',
    xpValue: 800, lootTable: ['crown_of_the_grand_gourmand', 'the_endless_fork'],
  },
  {
    name: 'The Insatiable One', archetype: 'brute', baseWeight: 900, stomachCapacity: 1600, willingness: 64,
    description: 'The true heart of the Undergorge — a god of appetite grown so vast the dungeon was built around it. It has been waiting, and it is still hungry.',
    xpValue: 2500, lootTable: ['crown_of_the_grand_gourmand'], isBoss: true,
    bossEvent: 'The Insatiable One shudders as the last spell takes hold. For the first time in an age, it is full. The Undergorge groans, the throne splits, and a crown of impossible weight tumbles down to you — the only thing it ever truly owned.',
  },
];
