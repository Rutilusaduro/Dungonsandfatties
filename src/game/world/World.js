/**
 * World System
 * Manages all zones, their connections, and world state
 */

import Zone from './Zone';
import { Earth, Wood, Stone, Furniture, Water } from '../environment/EnvironmentalObject';
import { Pig, Duck, Cow } from '../entities/Creature';
import { Innkeeper, Merchant, Gardener, Guard, Chef } from '../entities/NPC';

class World {
  constructor(options = {}) {
    this.name = options.name || 'The Realm';
    this.description = options.description || '';
    this.zones = new Map();
    this.currentZoneId = null;
    this.timeOfDay = 'day';
    this.season = 'spring';
  }

  // Register a zone
  addZone(zone) {
    this.zones.set(zone.id, zone);
    return this;
  }

  // Get zone by ID
  getZone(zoneId) {
    return this.zones.get(zoneId);
  }

  // Get current zone
  getCurrentZone() {
    return this.getZone(this.currentZoneId);
  }

  // Set current zone
  setCurrentZone(zoneId) {
    const zone = this.getZone(zoneId);
    if (zone) {
      this.currentZoneId = zoneId;
      zone.explore();
      return zone;
    }
    return null;
  }

  // Get all zones
  getAllZones() {
    return Array.from(this.zones.values());
  }

  // Get zone by name
  getZoneByName(name) {
    for (const zone of this.getAllZones()) {
      if (zone.name.toLowerCase().includes(name.toLowerCase())) {
        return zone;
      }
    }
    return null;
  }

  // Move to adjacent zone
  moveToZone(direction) {
    const currentZone = this.getCurrentZone();
    if (!currentZone) return null;

    const nextZoneId = currentZone.exits[direction];
    if (nextZoneId) {
      return this.setCurrentZone(nextZoneId);
    }
    return null;
  }

  // Create a sample world
  static createSampleWorld() {
    const world = new World({
      name: 'The Fattening Realm',
      description:
        'A magical world where indulgence and transformation await at every turn.',
    });

    // TAVERN ZONE
    const tavern = new Zone('tavern', 'The Bloated Boar Tavern', {
      description:
        'A warm and welcoming tavern filled with the aromas of hearty food and drinks. The wooden tables are laden with platters of meat, bread, and pastries. The inn is decorated with hunting trophies and cozy fireplaces.',
      theme: 'tavern',
      difficulty: 'low',
      isIndoors: true,
      lightLevel: 'dim',
      features: ['cozy', 'food_abundant', 'social'],
    });

    // Add objects to tavern
    tavern.addEnvironmentalObject(
      new Wood('wood_table_1', 'Sturdy Wooden Table', {
        description: 'A heavy oak table laden with food',
        properties: { capacity: 'large', supportable_weight: 500 },
      })
    );
    tavern.addEnvironmentalObject(
      new Wood('wood_chair_1', 'Comfortable Chair', {
        description: 'A well-crafted chair, slightly worn from use',
      })
    );
    tavern.addEnvironmentalObject(
      new Water('water_barrel', 'Barrel of Water', {
        description: 'A large barrel of fresh water for drinking and cooking',
      })
    );

    // Add NPCs to tavern
    tavern.addNPC(
      new Innkeeper('Barkeep Boris', {
        description: 'A jolly innkeeper with a generous belly',
        baseWeight: 240,
        foodPreferences: ['hearty stews', 'fresh bread', 'honey mead'],
      })
    );
    tavern.addNPC(
      new Merchant('Silvia the Spice Merchant', {
        description: 'A merchant woman with exotic spices and foods from distant lands',
        baseWeight: 170,
      })
    );

    // GARDEN ZONE
    const garden = new Zone('garden', 'The Abundant Garden', {
      description:
        'A lush garden overflowing with produce. Fruit trees hang heavy with ripe fruit, vegetable patches overflow with abundance, and flowering vines cover the stone walls. The air is thick with the scent of growing things.',
      theme: 'garden',
      difficulty: 'low',
      isIndoors: false,
      lightLevel: 'bright',
      features: ['fertile', 'peaceful', 'abundant_resources'],
      spellAffinity: ['Shape Earth', 'Create Water', 'Enlarge Person'],
    });

    // Add objects to garden
    garden.addEnvironmentalObject(
      new Earth('earth_soil', 'Rich Earth', {
        description: 'Dark, fertile soil perfect for gardening',
      })
    );
    garden.addEnvironmentalObject(
      new Water('water_fountain', 'Stone Fountain', {
        description: 'A fountain bubbling with fresh water',
      })
    );
    garden.addEnvironmentalObject(
      new Stone('stone_bench', 'Stone Bench', {
        description: 'A comfortable stone bench for resting',
      })
    );

    // Add creatures to garden
    garden.addCreature(
      new Pig('Fatling', {
        description: 'A particularly plump pig, seemingly well-fed',
        baseWeight: 280,
        hungerLevel: 30,
      })
    );
    garden.addCreature(
      new Duck('Waddles', {
        description: 'A fat waterfowl waddling through the vegetables',
      })
    );

    // Add NPCs to garden
    garden.addNPC(new Gardener());

    // KITCHEN ZONE
    const kitchen = new Zone('kitchen', 'The Grand Kitchen', {
      description:
        'An enormous kitchen filled with the bustle of cooking. Massive ovens glow with heat, long tables hold ingredients of every kind, and copper pots hang from the ceiling. The scent is intoxicating - a mixture of baking bread, roasting meats, and sweet pastries.',
      theme: 'kitchen',
      difficulty: 'low',
      isIndoors: true,
      lightLevel: 'bright',
      features: ['hot', 'aromatic', 'active', 'dangerous_equipment'],
      spellAffinity: ['Create Water', 'Enlarge Person', 'Feast of Shadows'],
    });

    // Add objects to kitchen
    kitchen.addEnvironmentalObject(
      new Furniture('stove', 'Large Cast Iron Stove', {
        description: 'A massive cooking stove radiating heat',
        durability: 200,
      })
    );
    kitchen.addEnvironmentalObject(
      new Wood('prep_table', 'Wooden Prep Table', {
        description: 'A large wooden table for preparing food',
      })
    );
    kitchen.addEnvironmentalObject(
      new Water('water_basin', 'Large Water Basin', {
        description: 'A basin for washing ingredients and dishes',
      })
    );

    // Add NPCs to kitchen
    kitchen.addNPC(new Chef());

    // DUNGEON ZONE
    const dungeon = new Zone('dungeon', 'The Depths Below', {
      description:
        'A dark dungeon carved from stone and earth. Moisture drips from the ceiling, and the air smells of dampness and decay. Strange fungal growths cover the walls. This is no place for the faint of heart.',
      theme: 'dungeon',
      difficulty: 'high',
      isIndoors: true,
      lightLevel: 'dark',
      features: ['dangerous', 'trapped', 'magical_aura'],
      spellAffinity: ['Shape Earth', 'Morph Mass', 'Dark magic'],
    });

    // Add objects to dungeon
    dungeon.addEnvironmentalObject(
      new Stone('stone_pillar', 'Ancient Stone Pillar', {
        description: 'A massive pillar supporting the ceiling',
        durability: 300,
      })
    );
    dungeon.addEnvironmentalObject(
      new Earth('dungeon_earth', 'Damp Earth', {
        description: 'Soft, moist earth that could be reshaped',
      })
    );

    // Add creatures to dungeon
    dungeon.addCreature(
      new Cow('Chained Cow', {
        description: 'A massive cow, magically enlarged and imprisoned',
        baseWeight: 2000,
        behavior: 'hostile',
      })
    );

    // Set zone connections
    tavern.addExit('north', 'garden');
    tavern.addExit('east', 'kitchen');
    tavern.addExit('down', 'dungeon');

    garden.addExit('south', 'tavern');
    kitchen.addExit('west', 'tavern');
    dungeon.addExit('up', 'tavern');

    // Add zones to world
    world.addZone(tavern);
    world.addZone(garden);
    world.addZone(kitchen);
    world.addZone(dungeon);

    // Start in tavern
    world.setCurrentZone('tavern');

    return world;
  }
}

export default World;
