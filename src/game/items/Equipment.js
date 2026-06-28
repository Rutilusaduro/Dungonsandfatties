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
};
