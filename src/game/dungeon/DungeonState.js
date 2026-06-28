// Dungeon progression state machine.
// Twelve floors across four biomes; each floor is 2 encounters + a (mini-)boss.
// Each biome carries a combat modifier (the anti-monotony lever) — see Game.jsx
// doCombatPlayerAction for the consuming sites.

import * as ENEMIES from './Enemies.js';
import { makeEnemy } from './Enemies.js';
import { ITEMS, FLOOR_LOOT, itemByKey } from '../items/Equipment.js';

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

const FLOORS = FLOOR_DEFS.map(d => {
  const enemies = ENEMIES[`FLOOR${d.id}_ENEMIES`] || [];
  return {
    ...d,
    biomeLabel: BIOMES[d.biome]?.label || d.name,
    modifier: BIOMES[d.biome]?.modifier || null,
    encounters: enemies.map(en => [en]), // one enemy per encounter (1v1 combat)
  };
});

export class DungeonState {
  constructor() {
    this.floorIndex    = 0;
    this.encounterIndex = 0;
    this.completed     = false;
    this.lootPile      = []; // items awarded but not yet picked up
  }

  get currentFloor() { return FLOORS[this.floorIndex] || null; }

  get currentEncounterDefs() {
    const floor = this.currentFloor;
    if (!floor) return null;
    return floor.encounters[this.encounterIndex] || null;
  }

  // Build live enemy objects for the current encounter.
  spawnEnemies() {
    const defs = this.currentEncounterDefs;
    if (!defs) return [];
    return defs.map(makeEnemy);
  }

  // Call after winning an encounter: generate loot + advance.
  // Returns { loot, floorComplete, dungeonComplete }
  advance(enemies) {
    // Collect loot from defeated enemies
    const floorNum = this.floorIndex + 1;
    const pool     = FLOOR_LOOT[floorNum] || [];
    const loot     = [];
    for (const enemy of enemies) {
      const drops = enemy.lootTable || [];
      for (const key of drops) {
        if (pool.includes(key) && ITEMS[key]) loot.push(ITEMS[key]);
      }
    }
    // Pick at most 2 unique drops per encounter (don't flood inventory)
    const unique = [...new Map(loot.map(i => [i.name, i])).values()].slice(0, 2);
    this.lootPile.push(...unique);

    this.encounterIndex += 1;
    const floor = this.currentFloor;

    if (!floor || this.encounterIndex >= floor.encounters.length) {
      // Floor complete
      this.floorIndex    += 1;
      this.encounterIndex = 0;
      if (this.floorIndex >= FLOORS.length) {
        this.completed = true;
        return { loot: unique, floorComplete: true, dungeonComplete: true };
      }
      return { loot: unique, floorComplete: true, dungeonComplete: false };
    }

    return { loot: unique, floorComplete: false, dungeonComplete: false };
  }

  drainLoot() {
    const items = [...this.lootPile];
    this.lootPile = [];
    return items;
  }

  // Save/load: enemies respawn fresh on resume, so only progress + loot persist.
  serialize() {
    return {
      floorIndex:     this.floorIndex,
      encounterIndex: this.encounterIndex,
      completed:      this.completed,
      lootPile:       this.lootPile.map(it => it.key).filter(Boolean),
    };
  }

  static hydrate(data = {}) {
    const ds = new DungeonState();
    ds.floorIndex     = data.floorIndex ?? 0;
    ds.encounterIndex = data.encounterIndex ?? 0;
    ds.completed      = data.completed ?? false;
    ds.lootPile       = (data.lootPile || []).map(itemByKey).filter(Boolean);
    return ds;
  }
}
