// Dungeon progression state machine.
// Twelve floors across four biomes. Each floor is a seeded ROOM GRAPH you
// traverse (RoomGraph.js): entry -> combat rooms -> a (mini-)boss room that
// gates the stairs -> stairs down. Biome modifiers (the anti-monotony lever)
// ride on the floor and are read in Game.jsx combat.

import { makeEnemy, ENEMY_BY_NAME } from './Enemies.js';
import { ITEMS, FLOOR_LOOT, itemByKey } from '../items/Equipment.js';
import { generateFloor } from './RoomGraph.js';
import { makeReturnLedger, recordDefeat, dueReturns } from './ReturnLedger.js';

// Biome modifiers. null = vanilla. Each non-null field is read in combat:
//   drainScale  — multiplies per-round fullness drain (rich air keeps fights long)
//   feedScale   — multiplies the player's fill-up on the enemy (resistant flesh)
//   willDrift   — adds to the enemy's willingness each round (tempting air → succumb)
const BIOMES = {
  pantry:     { label: 'The Pantry',        modifier: null },
  kitchen:    { label: 'The Kitchen',       modifier: null },
  hall:       { label: 'The Feasting Hall', modifier: null },
  cellars:    { label: 'The Cellars',       modifier: { drainScale: 0.5 } },
  smokehouse: { label: 'The Smokehouse',    modifier: { feedScale: 0.9 } },
  bakery:     { label: 'The Bakery',        modifier: { willDrift: 4 } },
  confect:    { label: 'The Confectionery', modifier: { willDrift: 3 } },
  honeyed:    { label: 'The Honeyed Halls', modifier: { drainScale: 0.6 } },
  undergorge: { label: 'The Undergorge',    modifier: { feedScale: 0.85 } },
};

const FLOOR_DEFS = [
  { id: 1,  name: 'The Pantry',          biome: 'pantry',     description: 'Shelves stretch floor to ceiling, packed with enchanted preserves. Something scurries in the dark.' },
  { id: 2,  name: 'The Kitchen',         biome: 'kitchen',    description: 'Cauldrons bubble with unattended stews. Heat radiates from blackened ovens. Footsteps echo on stone.' },
  { id: 3,  name: 'The Feasting Hall',   biome: 'hall',       description: 'A vast banquet hall frozen mid-celebration. Dust covers the feast-tables. A throne of layered cushions dominates the far end. Behind it, a stair leads down.' },
  { id: 4,  name: 'The Cellars',         biome: 'cellars',    description: 'Cold storage that swallowed the light. The chill keeps everything down here perpetually, unnaturally full.' },
  { id: 5,  name: 'The Cold Larder',     biome: 'cellars',    description: 'Frost rimes every surface. Things hang from hooks that should not still be moving.' },
  { id: 6,  name: 'The Smokehouse',      biome: 'smokehouse', description: 'Curing smoke hangs so thick it cures the air itself. Whatever waits here has been preserved against your magic.' },
  { id: 7,  name: 'The Bakery',          biome: 'bakery',     description: 'The ovens never cooled. The smell alone makes the room hungry, and the air pushes everything toward the table.' },
  { id: 8,  name: 'The Confectionery',   biome: 'confect',    description: 'Sugar-spun arches and pulled-caramel pillars. Sweetness here is a slow, irresistible pull.' },
  { id: 9,  name: 'The Honeyed Halls',   biome: 'honeyed',    description: 'Honey weeps from every seam, gluing the room into one slow golden hush where nothing ever empties.' },
  { id: 10, name: 'The Undergorge',      biome: 'undergorge', description: 'Beneath the dungeon, an appetite older than its walls. The dark itself resists being filled.' },
  { id: 11, name: 'The Endless Table',   biome: 'undergorge', description: 'A banquet with no head and no foot, running into the black in both directions, forever set, forever eaten.' },
  { id: 12, name: 'The Undergorge Throne', biome: 'undergorge', description: 'At the very bottom: a throne grown around the thing that has been eating since before the dungeon was built.' },
];

const FLOOR_META = FLOOR_DEFS.map(d => ({
  ...d,
  biomeLabel: BIOMES[d.biome]?.label || d.name,
  modifier: BIOMES[d.biome]?.modifier || null,
}));

const randSeed = () => (Math.random() * 1e9) | 0;

export class DungeonState {
  constructor(seed = randSeed()) {
    this.seed       = seed;
    this.floorIndex = 0;
    this.completed  = false;
    this.lootPile   = []; // items banked but not yet picked up
    this.returns    = makeReturnLedger();  // recurring-foe arc, keyed by name
    this.injectedReturns = {};             // frozen per-floor snapshot of returns due
    this._loadFloor(0);
  }

  _loadFloor(idx) {
    // Freeze which returns surface on this floor the first time we enter it, so
    // resume (which regenerates rooms from seed) reproduces the same layout.
    if (!this.injectedReturns[idx]) this.injectedReturns[idx] = dueReturns(this.returns, idx);
    const { rooms, entryId, stairsId } = generateFloor(idx, this.seed, this.injectedReturns[idx]);
    this.rooms        = rooms;
    this.entryId      = entryId;
    this.stairsId     = stairsId;
    this.currentRoomId = entryId;
    rooms[entryId].discovered = true;
  }

  // Record an encounter defeat into the recurring-foe ledger. Only foes flagged
  // canReturn, beaten by immobilized/fattened, re-arm a heavier return.
  recordEncounterDefeat(name, defeatVia) {
    const canReturn = !!ENEMY_BY_NAME[name]?.canReturn;
    recordDefeat(this.returns, name, defeatVia, this.floorIndex, canReturn);
  }

  // Returns due to first surface on the current floor (for a herald line).
  pendingReturns() { return this.injectedReturns[this.floorIndex] || []; }

  get currentFloor() { return FLOOR_META[this.floorIndex] || null; }
  get currentRoom()  { return this.rooms[this.currentRoomId] || null; }
  get modifier()     { return this.currentFloor?.modifier || null; }
  get canDescend()   { return this.currentRoom?.contents?.kind === 'stairs'; }

  exits() { return Object.keys(this.currentRoom?.exits || {}); }

  // "Look around" the current room — reveals its contents (foe/loot/stairs).
  look() { if (this.currentRoom) this.currentRoom.looked = true; return this.currentRoom; }

  // Move through an exit; reveals the room. Returns the new room or null.
  move(dir) {
    const nextId = this.currentRoom?.exits?.[dir];
    if (!nextId) return null;
    this.currentRoomId = nextId;
    this.rooms[nextId].discovered = true;
    return this.rooms[nextId];
  }

  // Live enemy objects for a combat room.
  roomEnemies(room = this.currentRoom) {
    return (room?.contents?.enemyDefs || []).map(makeEnemy);
  }

  // Mark a room handled; bank + return any loot (combat drops or loot-room items).
  clearRoom(roomId = this.currentRoomId) {
    const room = this.rooms[roomId];
    if (!room || room.cleared) return [];
    room.cleared = true;
    let items = [];
    if (room.contents.kind === 'loot') {
      items = (room.contents.lootKeys || []).map(itemByKey).filter(Boolean);
    } else if (room.contents.kind === 'combat') {
      const pool = FLOOR_LOOT[this.floorIndex + 1] || [];
      const drops = [];
      for (const def of room.contents.enemyDefs || []) {
        for (const k of def.lootTable || []) if (pool.includes(k) && ITEMS[k]) drops.push(ITEMS[k]);
      }
      items = [...new Map(drops.map(i => [i.name, i])).values()].slice(0, 2);
    }
    this.lootPile.push(...items);
    return items;
  }

  // Descend the stairs → next floor, or complete the dungeon.
  descend() {
    if (!this.canDescend) return { floorComplete: false, dungeonComplete: false };
    this.floorIndex += 1;
    if (this.floorIndex >= FLOOR_META.length) {
      this.completed = true;
      return { floorComplete: true, dungeonComplete: true };
    }
    this._loadFloor(this.floorIndex);
    return { floorComplete: true, dungeonComplete: false };
  }

  drainLoot() {
    const items = [...this.lootPile];
    this.lootPile = [];
    return items;
  }

  // Save/load: rooms regenerate from (seed, floorIndex); only flags + position persist.
  serialize() {
    const roomFlags = {};
    for (const [id, r] of Object.entries(this.rooms)) roomFlags[id] = { cleared: r.cleared, discovered: r.discovered, looked: r.looked };
    return {
      seed:          this.seed,
      floorIndex:    this.floorIndex,
      currentRoomId: this.currentRoomId,
      completed:     this.completed,
      lootPile:      this.lootPile.map(it => it.key).filter(Boolean),
      returns:       this.returns,
      injectedReturns: this.injectedReturns,
      roomFlags,
    };
  }

  static hydrate(data = {}) {
    const ds = new DungeonState(data.seed ?? randSeed());
    ds.floorIndex = data.floorIndex ?? 0;
    // Restore the ledger + frozen snapshots BEFORE regenerating the floor so the
    // injected return rooms come back identically.
    ds.returns = data.returns ?? makeReturnLedger();
    ds.injectedReturns = data.injectedReturns ?? {};
    ds._loadFloor(ds.floorIndex); // regenerate this floor from the seed
    if (data.currentRoomId && ds.rooms[data.currentRoomId]) ds.currentRoomId = data.currentRoomId;
    for (const [id, f] of Object.entries(data.roomFlags || {})) {
      if (ds.rooms[id]) { ds.rooms[id].cleared = f.cleared; ds.rooms[id].discovered = f.discovered; ds.rooms[id].looked = f.looked; }
    }
    ds.completed = data.completed ?? false;
    ds.lootPile  = (data.lootPile || []).map(itemByKey).filter(Boolean);
    return ds;
  }
}
