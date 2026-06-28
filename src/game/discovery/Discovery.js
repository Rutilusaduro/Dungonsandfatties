// Discovery — per-location fog-of-war. You can only target/talk to things you
// have "seen". State is a Map<locationId, Set<entityId>>: serializes cleanly to
// plain arrays, resets naturally per location, and never mutates the shared
// entity objects (NPCs persist across zones; dungeon enemies are shared defs).
//
// Pure JS — no React, no engine coupling.

// Stable key for any discoverable thing. NPC/Creature/EnvironmentalObject all
// carry a stable `id`; foods (no id) fall back to a name slug.
export function idOf(entity) {
  if (!entity) return null;
  if (entity.id) return entity.id;
  if (entity.name) return `x_${entity.name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`;
  return null;
}

export class Discovery {
  constructor() {
    this.seen = new Map(); // locationId -> Set<entityId>
  }

  _set(locId) {
    let s = this.seen.get(locId);
    if (!s) { s = new Set(); this.seen.set(locId, s); }
    return s;
  }

  has(locId, entityId) {
    return !!this.seen.get(locId)?.has(entityId);
  }

  // Reveal one entity (accepts an entity object or a raw id).
  reveal(locId, entity) {
    const id = typeof entity === 'string' ? entity : idOf(entity);
    if (id) this._set(locId).add(id);
    return this;
  }

  // "Look around": reveal every entity present. Returns the ids newly revealed.
  revealAll(locId, entities = []) {
    const set = this._set(locId);
    const fresh = [];
    for (const e of entities) {
      const id = idOf(e);
      if (id && !set.has(id)) { set.add(id); fresh.push(id); }
    }
    return fresh;
  }

  forLocation(locId) {
    return this.seen.get(locId) ?? new Set();
  }

  serialize() {
    return Object.fromEntries([...this.seen].map(([k, s]) => [k, [...s]]));
  }

  static hydrate(obj = {}) {
    const d = new Discovery();
    if (obj) for (const [k, arr] of Object.entries(obj)) d.seen.set(k, new Set(arr || []));
    return d;
  }
}

// ── self-check: node src/game/discovery/Discovery.js ──
if (typeof process !== 'undefined' && process.argv?.[1] && import.meta.url === `file://${process.argv[1]}`) {
  const d = new Discovery();
  const boris = { id: 'npc_barkeep_boris', name: 'Barkeep Boris' };
  const food = { name: 'Honey Pastry Basket' };
  console.assert(!d.has('tavern', 'npc_barkeep_boris'), 'unseen before reveal');
  const fresh = d.revealAll('tavern', [boris, food]);
  console.assert(fresh.length === 2, 'two newly revealed');
  console.assert(d.has('tavern', 'npc_barkeep_boris'), 'seen after reveal');
  console.assert(d.has('tavern', idOf(food)), 'food revealed by name slug');
  console.assert(d.revealAll('tavern', [boris]).length === 0, 'no double-reveal');
  console.assert(!d.has('garden', 'npc_barkeep_boris'), 'location-scoped');
  const round = Discovery.hydrate(JSON.parse(JSON.stringify(d.serialize())));
  console.assert(round.has('tavern', 'npc_barkeep_boris'), 'survives serialize round-trip');
  console.log('Discovery self-check OK');
}
