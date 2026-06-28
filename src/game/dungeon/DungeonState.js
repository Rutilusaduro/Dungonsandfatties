// Dungeon progression state machine.
// Three floors, each with encounters (array of enemy def arrays).
// Mini-boss is the last encounter on floors 1-2; true boss is floor 3 last.

import { FLOOR1_ENEMIES, FLOOR2_ENEMIES, FLOOR3_ENEMIES, makeEnemy } from './Enemies.js';
import { ITEMS, FLOOR_LOOT } from '../items/Equipment.js';

const FLOORS = [
  {
    id: 1, name: 'The Pantry',
    description: 'Shelves stretch floor to ceiling, packed with enchanted preserves. Something scurries in the dark.',
    encounters: [
      [FLOOR1_ENEMIES[0]],
      [FLOOR1_ENEMIES[1]],
      [FLOOR1_ENEMIES[2]], // mini-boss
    ],
  },
  {
    id: 2, name: 'The Kitchen',
    description: 'Cauldrons bubble with unattended stews. Heat radiates from blackened ovens. Footsteps echo on stone.',
    encounters: [
      [FLOOR2_ENEMIES[0]],
      [FLOOR2_ENEMIES[1]],
      [FLOOR2_ENEMIES[2]], // mini-boss
    ],
  },
  {
    id: 3, name: 'The Feasting Hall',
    description: 'A vast banquet hall frozen mid-celebration. Dust covers the feast-tables. A throne of layered cushions dominates the far end.',
    encounters: [
      [FLOOR3_ENEMIES[0]],
      [FLOOR3_ENEMIES[1]],
      [FLOOR3_ENEMIES[2]], // boss
    ],
  },
];

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
}
