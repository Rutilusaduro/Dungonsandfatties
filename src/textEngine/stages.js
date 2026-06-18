// ═══════════════════════════════════════════════════════════════
// WEIGHT STAGES — fit to Dungons & Fatties
// Adapted from GameDev/src/gameData/stages.js. This game tracks gain
// per-entity as a PERCENT over each character's own base weight, so a
// 220 lb innkeeper and a 100 lb creature both start at stage 0 and
// climb the same 12-rung ladder as they gain.
// ═══════════════════════════════════════════════════════════════

// 12 stages (ids 0-11), keyed by percent gained over base weight.
export const WEIGHT_STAGES = [
  { id: 0,  key: 'slight',    label: 'Slight',    minPct: 0,   desc: 'At base weight — slender and unchanged.' },
  { id: 1,  key: 'slim',      label: 'Slim',      minPct: 5,   desc: 'A faint softening; the first few pounds settling in.' },
  { id: 2,  key: 'soft',      label: 'Soft',      minPct: 15,  desc: 'Gentle roundness; a belly beginning to pooch.' },
  { id: 3,  key: 'chubby',    label: 'Chubby',    minPct: 30,  desc: 'Visibly rounded; clothes noticeably tighter.' },
  { id: 4,  key: 'plump',     label: 'Plump',     minPct: 50,  desc: 'A real belly; double chin forming; thighs rubbing.' },
  { id: 5,  key: 'heavy',     label: 'Heavy',     minPct: 75,  desc: 'Belly hangs forward; arms thick; a slight waddle.' },
  { id: 6,  key: 'fat',       label: 'Fat',       minPct: 100, desc: 'A clear rolling waddle; belly past the hips.' },
  { id: 7,  key: 'veryFat',   label: 'Very Fat',  minPct: 150, desc: 'Belly cascades toward the knees; movement slow.' },
  { id: 8,  key: 'enormous',  label: 'Enormous',  minPct: 200, desc: 'Fills a couch; getting up takes real effort.' },
  { id: 9,  key: 'colossal',  label: 'Colossal',  minPct: 300, desc: 'Too wide for hallways; shuffles a few steps at most.' },
  { id: 10, key: 'blob',      label: 'Blob',      minPct: 400, desc: 'Completely immobile; an enormous spreading mass.' },
  { id: 11, key: 'leviathan', label: 'Leviathan', minPct: 500, desc: 'Transcended human scale — impossibly, mythically vast.' },
];

// Canonical stage keys — one per WEIGHT_STAGES id (matches GameDev's STAGE_KEYS).
export const STAGE_KEYS = WEIGHT_STAGES.map((s) => s.key);

/** Percent-gain stage id (0-11) for a current/base weight pair. */
export function getStageId(currentWeight, baseWeight) {
  const base = baseWeight || 1;
  const pct = ((currentWeight - base) / base) * 100;
  for (let i = WEIGHT_STAGES.length - 1; i >= 0; i--) {
    if (pct >= WEIGHT_STAGES[i].minPct) return WEIGHT_STAGES[i].id;
  }
  return 0;
}

/** Full stage object for a current/base weight pair. */
export function getStage(currentWeight, baseWeight) {
  return WEIGHT_STAGES[getStageId(currentWeight, baseWeight)];
}

// Coarse body-size class for condition-aware prose
// (thin restrained vs ssbbw restrained, etc.).
export const SIZE_CLASSES = ['thin', 'plump', 'fat', 'ssbbw', 'immobile', 'leviathan'];

export function sizeClassFor(stageId) {
  const s = stageId ?? 0;
  if (s <= 1) return 'thin';
  if (s <= 3) return 'plump';
  if (s <= 5) return 'fat';
  if (s <= 7) return 'ssbbw';
  if (s <= 9) return 'immobile';
  return 'leviathan';
}
