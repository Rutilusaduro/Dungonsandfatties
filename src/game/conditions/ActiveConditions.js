// ═══════════════════════════════════════════════════════════════
// ActiveConditions — lingering spell-effect tags on any entity.
// The text engine reads these (via deriveFor in engine.js) to select
// radically different narration: a restrained thin target reads nothing
// like a restrained SSBBW, a buried target nothing like a paralyzed one.
//
//   restrained      -> { source, material, suspension, intensity }
//   buried          -> { depth, intensity }
//   mind_controlled -> { by, intensity }
//   ooze_coated     -> { thickness, intensity }
//   enlarged        -> { factor, intensity }
//   ravenous        -> { intensity }
//   satiated        -> { intensity }
//   gravity_enhanced -> { multiplier, intensity }
//   gravity_reduced  -> { multiplier, intensity }
//   floating         -> { height, intensity }
//   floor_tethered   -> { source, intensity }
//   slowed           -> { intensity }
//   engorged         -> { swell, intensity }  // temporary post-Feast-Exile fullness
//   asleep           -> { intensity }          // magically asleep, helpless to feeding
//   pliable          -> { intensity }          // flesh softened, keeps more from every meal
// ═══════════════════════════════════════════════════════════════

export const CONDITION_KEYS = [
  'restrained',
  'buried',
  'mind_controlled',
  'ooze_coated',
  'enlarged',
  'ravenous',
  'satiated',
  'gravity_enhanced',
  'gravity_reduced',
  'floating',
  'floor_tethered',
  'slowed',
  'engorged',
  'asleep',
  'pliable',
];

// Spell key (name lowercased, spaces -> _) -> restraint material.
export const RESTRAINT_MATERIAL = {
  confection_snare: 'candy',
  hold_person: 'magic',
  erupting_earth: 'earth',
  buried: 'earth',
  vineweave_restraint: 'vines',
  grease: 'slick',
  wall_of_force: 'force',
  web: 'webbing',
};

class ActiveConditions {
  constructor() {
    this._map = new Map();
  }

  add(key, meta = {}) {
    this._map.set(key, { key, intensity: meta.intensity ?? 1, ...meta, appliedAt: Date.now() });
    return this;
  }

  remove(key) { this._map.delete(key); return this; }
  has(key) { return this._map.has(key); }
  get(key) { return this._map.get(key) || null; }
  intensity(key) { const c = this._map.get(key); return c ? c.intensity : 0; }
  list() { return [...this._map.values()]; }
  keys() { return [...this._map.keys()]; }
  clear() { this._map.clear(); return this; }
  get size() { return this._map.size; }
}

export default ActiveConditions;
