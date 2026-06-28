// RoomGraph — per-floor room layout for dungeon traversal.
// Seeded so a floor regenerates identically on resume (only cleared/discovered
// flags persist). Each floor: an entry, a combat room per regular enemy, a
// (mini-)boss room that GATES the stairs, a loot side-room, and the stairs.
// Pure JS — no React.

import * as ENEMIES from './Enemies.js';
import { FLOOR_LOOT } from '../items/Equipment.js';

const OPP = { north: 'south', south: 'north', east: 'west', west: 'east' };

// mulberry32 — tiny deterministic RNG.
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function link(rooms, aId, dir, bId) {
  rooms[aId].exits[dir] = bId;
  rooms[bId].exits[OPP[dir]] = aId;
}

// generateFloor(floorIndex, seed) -> { rooms: {id->Room}, entryId, stairsId }
export function generateFloor(floorIndex, seed = 1) {
  const floorNum = floorIndex + 1;
  const enemyDefs = ENEMIES[`FLOOR${floorNum}_ENEMIES`] || [];
  const lootKeys = FLOOR_LOOT[floorNum] || [];
  const rand = mulberry32(seed * 2654435761 + floorNum);

  const regulars = enemyDefs.slice(0, -1);     // non-gate encounters
  const gate = enemyDefs[enemyDefs.length - 1]; // mini-boss / boss — gates the stairs

  const rooms = {};
  const mk = (id, contents) => { rooms[id] = { id, exits: {}, contents, discovered: false, looked: false, cleared: false }; };
  const prefix = `f${floorNum}`;

  // Main corridor: entry -> [combat per regular] -> gate -> stairs
  const corridor = [];
  mk(`${prefix}_entry`, { kind: 'empty' });
  corridor.push(`${prefix}_entry`);

  regulars.forEach((def, i) => {
    const id = `${prefix}_c${i}`;
    mk(id, { kind: 'combat', enemyDefs: [def] });
    corridor.push(id);
  });

  const gateId = `${prefix}_gate`;
  mk(gateId, { kind: 'combat', enemyDefs: gate ? [gate] : [], isGate: true });
  corridor.push(gateId);

  const stairsId = `${prefix}_stairs`;
  mk(stairsId, { kind: 'stairs' });
  // stairs linked ONLY to the gate room, so the (mini-)boss is on every path to it.

  // Lay the corridor along east, with the stairs hanging off the gate to the east.
  for (let i = 0; i < corridor.length - 1; i++) link(rooms, corridor[i], 'east', corridor[i + 1]);
  link(rooms, gateId, 'east', stairsId);

  // Loot side-room: branch north/south off a random non-gate corridor room.
  if (lootKeys.length) {
    const branchable = corridor.slice(0, -1); // exclude the gate
    const host = branchable[Math.floor(rand() * branchable.length)];
    const dir = rand() < 0.5 ? 'north' : 'south';
    const lootId = `${prefix}_loot`;
    const picks = [...lootKeys].sort(() => rand() - 0.5).slice(0, 2);
    mk(lootId, { kind: 'loot', lootKeys: picks });
    link(rooms, host, dir, lootId);
  }

  return { rooms, entryId: `${prefix}_entry`, stairsId };
}

// Reachable room ids from entry via exits (BFS).
export function reachableFrom(rooms, startId) {
  const seen = new Set([startId]);
  const q = [startId];
  while (q.length) {
    const cur = q.shift();
    for (const next of Object.values(rooms[cur]?.exits || {})) {
      if (!seen.has(next)) { seen.add(next); q.push(next); }
    }
  }
  return seen;
}

// ── self-check: node src/game/dungeon/RoomGraph.js ──
if (typeof process !== 'undefined' && process.argv?.[1] && import.meta.url === `file://${process.argv[1]}`) {
  for (let f = 0; f < 12; f++) {
    for (const seed of [1, 7, 42, 999]) {
      const { rooms, entryId, stairsId } = generateFloor(f, seed);
      const ids = Object.keys(rooms);
      console.assert(ids.length >= 4 && ids.length <= 6, `floor ${f + 1} seed ${seed}: ${ids.length} rooms (want 4-6)`);
      const reach = reachableFrom(rooms, entryId);
      console.assert(reach.has(stairsId), `floor ${f + 1} seed ${seed}: stairs unreachable`);
      // Gate is on every path to stairs: stairs' only neighbour is the gate room.
      const stairNeighbours = Object.values(rooms[stairsId].exits);
      console.assert(stairNeighbours.length === 1 && rooms[stairNeighbours[0]].contents.isGate,
        `floor ${f + 1} seed ${seed}: stairs not gated by the boss room`);
    }
  }
  console.log('RoomGraph self-check OK');
}
