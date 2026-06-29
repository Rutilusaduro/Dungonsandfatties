// Balance — central tuning knobs + parametric curves for scale-4x.
// Keeps magic numbers in one place so 12 floors / 20 levels auto-tune
// instead of being hand-balanced per fight.

// Hard cap on spell slots per tier. Without this, 20 levels of applyLevelBonus
// + equipment bonusSlots make slots unbounded and combat math breaks.
export const SLOT_CAP = { 1: 6, 2: 5, 3: 4 };

// Epic spellcasting boost for high-level players. L3 slots scale at 16 and 19.
// ponytail: tune the numbers if late floors feel too easy/hard.
export const EPIC_FILL = {
  base: 0.50,   // L3 fill % (levels 1-15)
  tier1: 0.60,  // L3 fill % (levels 16-18)
  tier2: 0.72,  // L3 fill % (levels 19-20)
};

// Clamp a {1,2,3} slot map in place to SLOT_CAP. Returns the same object.
export function clampSlots(slots) {
  for (const lvl of Object.keys(SLOT_CAP)) {
    if (slots[lvl] != null) slots[lvl] = Math.min(slots[lvl], SLOT_CAP[lvl]);
  }
  return slots;
}

// Enemy stat scale by floor depth (0-indexed floorIndex). Floor 1 = 1.0,
// each floor adds linear lift plus a mild quadratic tail so floor 12 is a
// real wall, not floor 1 with a bigger number.
// ponytail: tuned by feel; turn the two coefficients if late floors run hot/cold.
export function floorScale(floorIndex) {
  const d = Math.max(0, floorIndex);
  return 1 + d * 0.22 + d * d * 0.015;
}

// XP awarded for clearing an encounter, scaled by floor depth off a base.
export function xpForFloor(floorIndex, base = 80) {
  return Math.round(base * floorScale(floorIndex));
}

// Fat path thresholds (fraction of baseWeight gain)
export const FAT_THRESHOLD = {
  regular: 0.50,  // regular enemy defeated
  phase1:  0.50,  // boss phase 1 trigger
  phase2:  1.00,  // boss phase 2 trigger
};

// Fatten spell: lbs added = FATTEN_PCT[spellLevel] * entity.baseWeight
export const FATTEN_PCT = { 1: 0.15, 2: 0.25, 3: 0.35 };

// ── self-check: node src/game/mechanics/Balance.js ──
if (typeof process !== 'undefined' && process.argv?.[1] && import.meta.url === `file://${process.argv[1]}`) {
  console.assert(clampSlots({ 1: 99, 2: 1, 3: 99 })[1] === 6, 'L1 cap');
  console.assert(clampSlots({ 1: 99, 2: 1, 3: 99 })[2] === 1, 'under-cap untouched');
  console.assert(floorScale(0) === 1, 'floor 1 baseline');
  console.assert(floorScale(11) > floorScale(0) * 3, 'floor 12 >> floor 1');
  console.assert(xpForFloor(11) > xpForFloor(0) * 3, 'deep xp scales');
  console.log('Balance self-check OK', { f1: floorScale(0), f12: floorScale(11).toFixed(2), xp12: xpForFloor(11) });
}
