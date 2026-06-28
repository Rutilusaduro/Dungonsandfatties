// Equipment slots and item definitions.
// Slots: weapon | offhand | armor | accessory
// offhand is class-gated: Paladin=shield, Mage=tome, Warlock=focus

export const SLOTS = ['weapon', 'offhand', 'armor', 'accessory'];

// Class → allowed offhand type
export const OFFHAND_TYPE = {
  Paladin: 'shield',
  Mage:    'tome',
  Warlock: 'focus',
};

export class Equipment {
  constructor(name, opts = {}) {
    this.name        = name;
    this.slot        = opts.slot || 'accessory';
    this.offhandType = opts.offhandType || null; // 'shield'|'tome'|'focus'|null
    this.rarity      = opts.rarity || 'common';  // common|uncommon|rare|legendary
    this.description = opts.description || '';
    // Stat bonuses — all optional
    this.bonusSlots  = opts.bonusSlots  || {};  // { 1: +1, 2: +1 }
    this.bonusWeight = opts.bonusWeight || 0;   // +lbs to baseWeight (makes you harder to fatten)
    this.feedBonus   = opts.feedBonus   || 0;   // % bonus calories on cast
    this.feedCling   = opts.feedCling   || 0;   // % reduction of target's per-round fullness drain
    this.passiveText = opts.passiveText || '';
  }
}

// canEquip: checks class restriction for offhand slot
export function canEquip(item, character) {
  if (item.slot !== 'offhand') return true;
  const allowed = OFFHAND_TYPE[character.class_];
  return !item.offhandType || item.offhandType === allowed;
}

// ── Item definitions ─────────────────────────────────────────

export const ITEMS = {
  // ── WEAPONS ─────────────────────────────────────────────
  feeding_fork: new Equipment('Feeding Fork', {
    slot: 'weapon', rarity: 'common',
    description: 'A large fork enchanted to guide food to willing mouths.',
    feedBonus: 10,
    passiveText: '+10% caloric yield on all feeding actions.',
  }),
  gorging_ladle: new Equipment('Gorging Ladle', {
    slot: 'weapon', rarity: 'uncommon',
    description: 'Oversized ladle that fills bowls faster than the eye can follow.',
    feedBonus: 25,
    passiveText: '+25% caloric yield.',
  }),
  fattening_staff: new Equipment('Fattening Staff', {
    slot: 'weapon', rarity: 'rare',
    description: 'Staff carved from a fattened dryad\'s oak. Pulses with caloric energy.',
    feedBonus: 40, bonusSlots: { 2: 1 },
    passiveText: '+40% caloric yield; +1 L2 spell slot.',
  }),

  // ── OFFHANDS ─────────────────────────────────────────────
  divine_platter: new Equipment('Divine Platter', {
    slot: 'offhand', offhandType: 'shield', rarity: 'common',
    description: 'A blessed platter that doubles as a shield. Food placed on it is sanctified.',
    feedBonus: 5,
    passiveText: 'Paladin only. +5% caloric yield; absorbs 1 hit per rest.',
  }),
  sanctified_buckler: new Equipment('Sanctified Buckler', {
    slot: 'offhand', offhandType: 'shield', rarity: 'uncommon',
    description: 'Buckler engraved with the Glyph of Abundance.',
    bonusSlots: { 1: 1 },
    passiveText: 'Paladin only. +1 L1 spell slot.',
  }),
  gluttons_tome: new Equipment("Glutton's Tome", {
    slot: 'offhand', offhandType: 'tome', rarity: 'common',
    description: 'A spellbook crammed with recipes and feeding incantations.',
    bonusSlots: { 2: 1 },
    passiveText: 'Mage only. +1 L2 spell slot.',
  }),
  arcane_cookbook: new Equipment('Arcane Cookbook', {
    slot: 'offhand', offhandType: 'tome', rarity: 'rare',
    description: 'Every recipe is a transmutation formula. Caloric equations fill the margins.',
    feedBonus: 20, bonusSlots: { 2: 1, 3: 1 },
    passiveText: 'Mage only. +20% caloric yield; +1 L2 and +1 L3 slot.',
  }),
  hunger_focus: new Equipment('Hunger Focus', {
    slot: 'offhand', offhandType: 'focus', rarity: 'common',
    description: 'A crystallised craving, used to channel pact-hunger into targets.',
    bonusSlots: { 3: 1 },
    passiveText: 'Warlock only. +1 L3 spell slot.',
  }),
  dread_orb: new Equipment('Dread Orb', {
    slot: 'offhand', offhandType: 'focus', rarity: 'rare',
    description: 'Swirling with eldritch hunger. Enemies near it feel inexplicably famished.',
    feedBonus: 15, bonusSlots: { 2: 1, 3: 1 },
    passiveText: 'Warlock only. +15% caloric yield; +1 L2 and +1 L3 slot.',
  }),

  // ── ARMOR ─────────────────────────────────────────────────
  padded_robe: new Equipment('Padded Robe', {
    slot: 'armor', rarity: 'common',
    description: 'Robes with padded interior that make it harder for enemies to judge your true size.',
    bonusWeight: 20,
    passiveText: '+20 effective base weight (harder to fatten).',
  }),
  enchanted_doublet: new Equipment('Enchanted Doublet', {
    slot: 'armor', rarity: 'uncommon',
    description: 'Tailored to expand with the wearer. Enchantment resists enemy feeding.',
    bonusWeight: 40,
    passiveText: '+40 effective base weight.',
  }),
  feast_plate: new Equipment('Feast Plate', {
    slot: 'armor', rarity: 'rare',
    description: 'Plate mail that converts incoming caloric magic into fortification.',
    bonusWeight: 60, bonusSlots: { 1: 1 },
    passiveText: '+60 effective base weight; +1 L1 slot.',
  }),

  // ── ACCESSORIES ───────────────────────────────────────────
  ring_of_appetite: new Equipment('Ring of Appetite', {
    slot: 'accessory', rarity: 'common',
    description: 'Inscribed with a tiny fork. Enemies struck by feeding spells feel extra hunger.',
    feedBonus: 8,
    passiveText: '+8% caloric yield.',
  }),
  amulet_of_excess: new Equipment('Amulet of Excess', {
    slot: 'accessory', rarity: 'uncommon',
    description: 'A golden amulet shaped like a overflowing bowl. Once per rest, next spell costs 0 slots.',
    bonusSlots: { 2: 1 },
    passiveText: '+1 L2 slot.',
  }),
  legendary_band: new Equipment("Gourmand's Band", {
    slot: 'accessory', rarity: 'legendary',
    description: 'Said to have belonged to the Last Feaster. It hums with satisfied fullness.',
    feedBonus: 30, bonusSlots: { 1: 1, 2: 1, 3: 1 },
    passiveText: '+30% caloric yield; +1 slot at every level.',
  }),

  // ════════════════════════════════════════════════════════════
  // SCALE-4X EXPANSION — deeper-floor gear (floors 4-12)
  // ════════════════════════════════════════════════════════════

  // ── WEAPONS ─────────────────────────────────────────────
  basting_brush: new Equipment('Basting Brush', {
    slot: 'weapon', rarity: 'common',
    description: 'A wide brush that lacquers a target in rendered fat between bites.',
    feedBonus: 12,
    passiveText: '+12% caloric yield.',
  }),
  cramming_spoon: new Equipment('Cramming Spoon', {
    slot: 'weapon', rarity: 'uncommon',
    description: 'Bowl deep enough to scoop a whole pie. Heavy in the hand, heavier in the gut.',
    feedBonus: 28,
    passiveText: '+28% caloric yield.',
  }),
  tenderizing_maul: new Equipment('Tenderizing Maul', {
    slot: 'weapon', rarity: 'uncommon',
    description: 'A meat mallet the size of a warhammer. Softens resistance and waistlines alike.',
    feedBonus: 22, feedCling: 15,
    passiveText: '+22% caloric yield; target purges 15% less.',
  }),
  honey_lance: new Equipment('Honey Lance', {
    slot: 'weapon', rarity: 'rare',
    description: 'A lance that weeps warm honey from its tip, gluing every mouthful in place.',
    feedBonus: 38, feedCling: 20,
    passiveText: '+38% caloric yield; target purges 20% less.',
  }),
  glazing_glaive: new Equipment('Glazing Glaive', {
    slot: 'weapon', rarity: 'rare',
    description: 'Its edge leaves a candied shell that sets hard around whatever it touches.',
    feedBonus: 35, bonusSlots: { 1: 1 },
    passiveText: '+35% caloric yield; +1 L1 spell slot.',
  }),
  cauldron_breaker: new Equipment('Cauldron-Breaker', {
    slot: 'weapon', rarity: 'rare',
    description: 'Forged from a cracked stockpot. Every swing splashes scalding broth.',
    feedBonus: 44,
    passiveText: '+44% caloric yield.',
  }),
  the_endless_fork: new Equipment('The Endless Fork', {
    slot: 'weapon', rarity: 'legendary',
    description: 'A fork that never lifts empty. Where it points, food simply is.',
    feedBonus: 55, feedCling: 25, bonusSlots: { 2: 1 },
    passiveText: '+55% caloric yield; target purges 25% less; +1 L2 slot.',
  }),

  // ── OFFHANDS — shield (Paladin) ─────────────────────────
  trencher_shield: new Equipment('Trencher Shield', {
    slot: 'offhand', offhandType: 'shield', rarity: 'uncommon',
    description: 'A shield-sized slab of stale bread, blessed to never go to waste.',
    feedBonus: 12, bonusSlots: { 1: 1 },
    passiveText: 'Paladin only. +12% caloric yield; +1 L1 slot.',
  }),
  aegis_of_plenty: new Equipment('Aegis of Plenty', {
    slot: 'offhand', offhandType: 'shield', rarity: 'rare',
    description: 'Embossed with a cornucopia that never empties. Warm to the touch.',
    bonusSlots: { 1: 1, 2: 1 },
    passiveText: 'Paladin only. +1 L1 and +1 L2 slot.',
  }),
  bulwark_of_the_feast: new Equipment('Bulwark of the Feast', {
    slot: 'offhand', offhandType: 'shield', rarity: 'legendary',
    description: 'A tower shield laid out like a banquet table. Whoever holds it never goes hungry, and neither do their foes.',
    feedBonus: 25, bonusSlots: { 1: 1, 2: 1, 3: 1 },
    passiveText: 'Paladin only. +25% caloric yield; +1 slot at every level.',
  }),

  // ── OFFHANDS — tome (Mage) ──────────────────────────────
  ledger_of_gluttony: new Equipment('Ledger of Gluttony', {
    slot: 'offhand', offhandType: 'tome', rarity: 'uncommon',
    description: 'A tally-book where every meal ever eaten is still being counted.',
    feedBonus: 15, bonusSlots: { 1: 1 },
    passiveText: 'Mage only. +15% caloric yield; +1 L1 slot.',
  }),
  grimoire_of_swelling: new Equipment('Grimoire of Swelling', {
    slot: 'offhand', offhandType: 'tome', rarity: 'rare',
    description: 'The pages thicken and soften the longer it stays open.',
    bonusSlots: { 2: 2 },
    passiveText: 'Mage only. +2 L2 spell slots.',
  }),
  codex_of_the_glut: new Equipment('Codex of the Glut', {
    slot: 'offhand', offhandType: 'tome', rarity: 'legendary',
    description: 'A book so dense with appetite it has to be carried with both arms. Reading it makes the room smell of bread.',
    feedBonus: 30, bonusSlots: { 2: 1, 3: 2 },
    passiveText: 'Mage only. +30% caloric yield; +1 L2 and +2 L3 slots.',
  }),

  // ── OFFHANDS — focus (Warlock) ──────────────────────────
  pact_morsel: new Equipment('Pact Morsel', {
    slot: 'offhand', offhandType: 'focus', rarity: 'uncommon',
    description: 'A single bite of something that bites back. It never gets any smaller.',
    feedBonus: 12, bonusSlots: { 2: 1 },
    passiveText: 'Warlock only. +12% caloric yield; +1 L2 slot.',
  }),
  famine_sigil: new Equipment('Famine Sigil', {
    slot: 'offhand', offhandType: 'focus', rarity: 'rare',
    description: 'A brand that aches with the hunger of everyone it has ever touched.',
    feedCling: 25, bonusSlots: { 3: 1 },
    passiveText: 'Warlock only. target purges 25% less; +1 L3 slot.',
  }),
  heart_of_the_maw: new Equipment('Heart of the Maw', {
    slot: 'offhand', offhandType: 'focus', rarity: 'legendary',
    description: 'A slow-beating organ of pure want. Hold it and you can feel the dungeon itself getting hungry.',
    feedBonus: 28, bonusSlots: { 2: 1, 3: 2 },
    passiveText: 'Warlock only. +28% caloric yield; +1 L2 and +2 L3 slots.',
  }),

  // ── ARMOR ─────────────────────────────────────────────────
  quilted_gambeson: new Equipment('Quilted Gambeson', {
    slot: 'armor', rarity: 'common',
    description: 'Stuffed so thickly that no one can tell where the padding ends and you begin.',
    bonusWeight: 25,
    passiveText: '+25 effective base weight (harder to fatten).',
  }),
  larders_apron: new Equipment("Larder's Apron", {
    slot: 'armor', rarity: 'uncommon',
    description: 'A cook\'s apron with bottomless pockets, always faintly warm.',
    bonusWeight: 35, feedBonus: 10,
    passiveText: '+35 effective base weight; +10% caloric yield.',
  }),
  brigandine_of_surfeit: new Equipment('Brigandine of Surfeit', {
    slot: 'armor', rarity: 'uncommon',
    description: 'Riveted with coins from a glutton-king\'s hoard. Reassuringly heavy.',
    bonusWeight: 50,
    passiveText: '+50 effective base weight.',
  }),
  hauberk_of_hunger: new Equipment('Hauberk of Hunger', {
    slot: 'armor', rarity: 'rare',
    description: 'Mail woven from fasting-chains. It drinks the caloric magic thrown at you.',
    bonusWeight: 70, feedCling: 10,
    passiveText: '+70 effective base weight; targets purge 10% less.',
  }),
  plate_of_the_provider: new Equipment('Plate of the Provider', {
    slot: 'armor', rarity: 'rare',
    description: 'Each plate is stamped with a different dish. Standing still, you hear them sizzle.',
    bonusWeight: 65, bonusSlots: { 2: 1 },
    passiveText: '+65 effective base weight; +1 L2 slot.',
  }),
  carapace_of_the_colossus: new Equipment('Carapace of the Colossus', {
    slot: 'armor', rarity: 'legendary',
    description: 'Salvaged from something that ate a castle. You will never be the largest thing in the room again — except now you might.',
    bonusWeight: 110, bonusSlots: { 1: 1, 2: 1 },
    passiveText: '+110 effective base weight; +1 L1 and +1 L2 slot.',
  }),

  // ── ACCESSORIES ───────────────────────────────────────────
  bib_of_the_bottomless: new Equipment('Bib of the Bottomless', {
    slot: 'accessory', rarity: 'common',
    description: 'No matter how much is spilled on it, it is always somehow clean and ready for more.',
    feedBonus: 10,
    passiveText: '+10% caloric yield.',
  }),
  charm_of_craving: new Equipment('Charm of Craving', {
    slot: 'accessory', rarity: 'common',
    description: 'A little enamel cake on a chain. Looking at it makes everyone nearby peckish.',
    feedCling: 10,
    passiveText: 'Targets purge 10% less.',
  }),
  girdle_of_gula: new Equipment('Girdle of Gula', {
    slot: 'accessory', rarity: 'uncommon',
    description: 'A belt that lets out a notch on its own the moment it senses a feast.',
    bonusWeight: 30, feedBonus: 8,
    passiveText: '+30 effective base weight; +8% caloric yield.',
  }),
  pendant_of_plenty: new Equipment('Pendant of Plenty', {
    slot: 'accessory', rarity: 'uncommon',
    description: 'A drop of amber with a whole roast suspended impossibly inside.',
    bonusSlots: { 1: 1, 2: 1 },
    passiveText: '+1 L1 and +1 L2 slot.',
  }),
  signet_of_satiation: new Equipment('Signet of Satiation', {
    slot: 'accessory', rarity: 'rare',
    description: 'Press it to wax and the seal is a sleeping, sated face.',
    feedBonus: 18, feedCling: 18,
    passiveText: '+18% caloric yield; targets purge 18% less.',
  }),
  torc_of_the_titan_table: new Equipment('Torc of the Titan Table', {
    slot: 'accessory', rarity: 'rare',
    description: 'Heavy gold from a table where the guests were the courses.',
    feedBonus: 22, bonusSlots: { 3: 1 },
    passiveText: '+22% caloric yield; +1 L3 slot.',
  }),
  crown_of_the_grand_gourmand: new Equipment('Crown of the Grand Gourmand', {
    slot: 'accessory', rarity: 'legendary',
    description: 'Taken from a head too vast to wear it any longer. It still smells of the last, endless feast.',
    feedBonus: 40, feedCling: 30, bonusSlots: { 1: 1, 2: 1, 3: 1 },
    passiveText: '+40% caloric yield; targets purge 30% less; +1 slot at every level.',
  }),

  // ── extra mid-tier fillers for floor variety ───────────────
  skewer_of_searing: new Equipment('Skewer of Searing', {
    slot: 'weapon', rarity: 'common',
    description: 'A long iron skewer that keeps its last meal warm for hours.',
    feedBonus: 14,
    passiveText: '+14% caloric yield.',
  }),
  whisk_of_the_whirlwind: new Equipment('Whisk of the Whirlwind', {
    slot: 'weapon', rarity: 'uncommon',
    description: 'Spins on its own, folding air and cream into anything nearby.',
    feedBonus: 24, bonusSlots: { 1: 1 },
    passiveText: '+24% caloric yield; +1 L1 slot.',
  }),
  mantle_of_the_well_fed: new Equipment('Mantle of the Well-Fed', {
    slot: 'armor', rarity: 'uncommon',
    description: 'A fur-lined cloak that seems a size larger every time you put it on.',
    bonusWeight: 45, feedCling: 8,
    passiveText: '+45 effective base weight; targets purge 8% less.',
  }),
  band_of_second_helpings: new Equipment('Band of Second Helpings', {
    slot: 'accessory', rarity: 'uncommon',
    description: 'A plain ring that quietly insists you are not finished yet.',
    feedBonus: 14, bonusSlots: { 1: 1 },
    passiveText: '+14% caloric yield; +1 L1 slot.',
  }),
};

// Stamp each item with its registry key so saves can store keys, not instances.
for (const [k, item] of Object.entries(ITEMS)) item.key = k;

// Look up the shared Equipment instance for a saved key (null if unknown).
export function itemByKey(key) { return ITEMS[key] || null; }

// Loot table: floor → rarity weight
// ponytail: flat list keyed by floor; weighted random in LootTable.js
export const FLOOR_LOOT = {
  1: ['feeding_fork', 'padded_robe', 'ring_of_appetite', 'divine_platter', 'gluttons_tome', 'hunger_focus'],
  2: ['gorging_ladle', 'enchanted_doublet', 'amulet_of_excess', 'sanctified_buckler', 'dread_orb'],
  3: ['fattening_staff', 'feast_plate', 'arcane_cookbook', 'legendary_band'],
  // Floors 4-12 (scale-4x). Tiers climb common→legendary with depth.
  4: ['basting_brush', 'skewer_of_searing', 'quilted_gambeson', 'bib_of_the_bottomless', 'charm_of_craving', 'trencher_shield'],
  5: ['cramming_spoon', 'whisk_of_the_whirlwind', 'larders_apron', 'girdle_of_gula', 'ledger_of_gluttony', 'pact_morsel'],
  6: ['tenderizing_maul', 'brigandine_of_surfeit', 'band_of_second_helpings', 'pendant_of_plenty', 'mantle_of_the_well_fed'],
  7: ['glazing_glaive', 'plate_of_the_provider', 'aegis_of_plenty', 'grimoire_of_swelling', 'torc_of_the_titan_table'],
  8: ['honey_lance', 'hauberk_of_hunger', 'signet_of_satiation', 'famine_sigil'],
  9: ['cauldron_breaker', 'plate_of_the_provider', 'torc_of_the_titan_table', 'aegis_of_plenty'],
  10: ['honey_lance', 'hauberk_of_hunger', 'signet_of_satiation', 'grimoire_of_swelling'],
  11: ['the_endless_fork', 'carapace_of_the_colossus', 'codex_of_the_glut', 'heart_of_the_maw'],
  12: ['bulwark_of_the_feast', 'crown_of_the_grand_gourmand', 'the_endless_fork', 'carapace_of_the_colossus'],
};
