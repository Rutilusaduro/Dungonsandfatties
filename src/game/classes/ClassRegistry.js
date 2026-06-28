const CLASS_REGISTRY = {
  Paladin: {
    name: 'Paladin',
    offHand: 'shield',
    description: 'Divine warrior who compels foes to overindulge. Excels at close range with protective auras and holy sustenance.',
    passive: 'Divine Sustenance: Goodberry heals double; Command compels targets to eat immediately.',
    startingSpells: ['Goodberry', 'Command', 'Enlarge Person', 'Enhance Gravity', 'Rooting Glut'],
    spellSlots: { 1: 4, 2: 2, 3: 1 },
    baseWeight: 180,
    accentColor: '#c9a227',
  },
  Mage: {
    name: 'Mage',
    offHand: 'tome',
    description: 'Arcane scholar who conjures endless feasts and transmutes flesh. Master of area saturation.',
    passive: 'Arcane Appetite: Conjured food has +25% caloric density.',
    startingSpells: ['Prestidigitation', 'Mage Hand', 'Detect Cravings', 'Grease', 'Conjure Food', 'Oozing Abundance'],
    spellSlots: { 1: 3, 2: 3, 3: 1 },
    baseWeight: 140,
    accentColor: '#4a7fc1',
  },
  Warlock: {
    name: 'Warlock',
    offHand: 'focus',
    description: 'Pact-bound summoner who curses enemies with insatiable hunger. Commands eldritch creatures to do the feeding.',
    passive: "Pact of Gluttony: Siphoned weight persists across rests.",
    startingSpells: ['Feast of Shadows', 'Bottomless Gullet', 'Float', 'Covetous Siphon', 'Summon Cattle'],
    spellSlots: { 1: 2, 2: 3, 3: 2 },
    baseWeight: 150,
    accentColor: '#8b5cf6',
  },
};

export default CLASS_REGISTRY;
