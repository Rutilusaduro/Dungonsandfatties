// MetaState — permanent cross-run state that survives death and resets.
// Stored under a separate localStorage key from the per-run save.
// Contains: devotion bank, altar upgrades purchased, recurring-foe ledger.

import { makeReturnLedger } from './dungeon/ReturnLedger.js';

const META_KEY = 'daf_meta';

export const TOWN_STAGES = [
  { id: 0, name: 'Famished',    devotionRequired: 0    },
  { id: 1, name: 'Fed',         devotionRequired: 250  },
  { id: 2, name: 'Flourishing', devotionRequired: 700  },
  { id: 3, name: 'Abundant',    devotionRequired: 1800 },
  { id: 4, name: 'Opulent',     devotionRequired: 5000 },
];

export const ALTAR_UPGRADES = [
  {
    key: 'extra_slot',
    label: 'Carved Appetite',
    desc: 'Begin each descent with one extra casting token.',
    flavorText: 'The altar drinks what you brought back. It gives you a deeper hunger in return.',
    cost: 100,
    maxRanks: 3,
    minStage: 0,
  },
  {
    key: 'feed_bonus',
    label: 'Heavy Hands',
    desc: 'Force-feedings push further into each foe.',
    flavorText: 'You have fed things in the dark. Your hands remember the weight.',
    cost: 175,
    maxRanks: 3,
    minStage: 1, // requires Fed
  },
  {
    key: 'head_start',
    label: 'Seasoned Descender',
    desc: 'Begin each descent with accumulated experience.',
    flavorText: 'The town has seen you return. They know you now. So do you.',
    cost: 250,
    maxRanks: 3,
    minStage: 2, // requires Flourishing
  },
];

const blank = () => ({ devotion: 0, purchased: {}, returnLedger: makeReturnLedger() });

export function loadMeta() {
  try {
    const raw = JSON.parse(localStorage.getItem(META_KEY));
    if (!raw) return blank();
    return { ...blank(), ...raw, returnLedger: raw.returnLedger ?? makeReturnLedger() };
  } catch { return blank(); }
}

export function saveMeta(meta) {
  try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch { /* no-op */ }
}

export function getTownStage(meta) {
  let stage = TOWN_STAGES[0];
  for (const s of TOWN_STAGES) {
    if (meta.devotion >= s.devotionRequired) stage = s;
  }
  return stage;
}

export function getNextStage(meta) {
  const cur = getTownStage(meta);
  return TOWN_STAGES[cur.id + 1] || null;
}

export function getRank(meta, key) {
  return meta.purchased?.[key] || 0;
}

export function canBuy(meta, upgrade) {
  if (getTownStage(meta).id < upgrade.minStage) return false;
  if (getRank(meta, upgrade.key) >= upgrade.maxRanks) return false;
  return meta.devotion >= upgrade.cost;
}

export function buyUpgrade(meta, upgrade) {
  if (!canBuy(meta, upgrade)) return meta;
  return {
    ...meta,
    devotion: meta.devotion - upgrade.cost,
    purchased: { ...meta.purchased, [upgrade.key]: getRank(meta, upgrade.key) + 1 },
  };
}

// Devotion earned for successful extraction (reached surface).
export function devotionForExtraction(floorIndex, lootCount) {
  return Math.round((floorIndex + 1) * 30 + lootCount * 20);
}

// Partial devotion on death (you lost the haul but the journey still counts).
export function devotionForDeath(floorIndex) {
  return Math.round((floorIndex + 1) * 12);
}
