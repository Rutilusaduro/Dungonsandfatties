/**
 * World System
 * Manages all zones, their connections, and world state
 */

import Zone from './Zone';
import { Earth, Wood, Stone, Furniture, Water } from '../environment/EnvironmentalObject';
import { Pig, Duck, Cow } from '../entities/Creature';
import { NPC, Innkeeper, Merchant, Gardener, Guard, Chef } from '../entities/NPC';
import { Bread, Meat, Pastry, Cream, Food } from '../items/Food.js';

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
    tavern.addEnvironmentalObject(
      new Furniture('bar_counter', 'Long Tavern Bar', {
        description: 'A polished oak bar crowded with bottles, mugs, and half-finished drinks',
        material: 'wood',
        properties: { supportable_weight: 650, surfaceRole: 'bar', foodCapacity: 16 },
      })
    );
    tavern.addEnvironmentalObject(
      new Furniture('bar_stool_1', 'Bar Stool', {
        description: 'A narrow wooden stool tucked against the bar',
        material: 'wood',
        durability: 70,
        properties: { supportable_weight: 220, seating: true },
      })
    );
    tavern.addEnvironmentalObject(
      new Furniture('bar_stool_2', 'Bar Stool', {
        description: 'A second stool with one rung worn smooth by regulars',
        material: 'wood',
        durability: 70,
        properties: { supportable_weight: 220, seating: true },
      })
    );
    tavern.addEnvironmentalObject(
      new Water('ale_keg', 'Beer Keg', {
        description: 'A tapped keg of dark beer standing behind the bar',
        material: 'wood',
        properties: { contains: 'beer', servings: 20, liquid: true },
      })
    );
    tavern.addEnvironmentalObject(
      new Water('beer_bottle_1', 'Brown Beer Bottle', {
        description: 'A squat bottle beaded with condensation',
        material: 'glass',
        durability: 30,
        properties: { contains: 'beer', servings: 1, portable: true },
      })
    );
    tavern.addEnvironmentalObject(
      new Water('beer_bottle_2', 'Green Beer Bottle', {
        description: 'A half-full bottle left near the edge of the bar',
        material: 'glass',
        durability: 30,
        properties: { contains: 'beer', servings: 1, portable: true },
      })
    );
    tavern.addEnvironmentalObject(
      new Water('beer_glass_1', 'Foaming Beer Glass', {
        description: 'A thick glass mug filled with amber beer and foam',
        material: 'glass',
        durability: 20,
        properties: { contains: 'beer', servings: 1, portable: true },
      })
    );
    tavern.addEnvironmentalObject(
      new Water('beer_glass_2', 'Half-Finished Mug', {
        description: 'A sturdy mug with a ring of foam clinging to the inside',
        material: 'glass',
        durability: 20,
        properties: { contains: 'beer', servings: 1, portable: true },
      })
    );

    tavern.addFood(new Meat('Roasted Tavern Platter', {
      servings: 6,
      caloriesPerServing: 420,
      description: 'A platter of roasted meat set out for hungry patrons.',
      appetizingness: 82,
    }), 'Tavern Stock');
    tavern.addFood(new Bread('Fresh Brown Loaf', {
      servings: 8,
      caloriesPerServing: 180,
      description: 'Fresh tavern bread still warm from the kitchen.',
      appetizingness: 74,
    }), 'Tavern Stock');
    tavern.addFood(new Pastry('Honey Pastry Basket', {
      servings: 5,
      caloriesPerServing: 260,
      description: 'Sticky pastries kept near the bar for regulars.',
      appetizingness: 86,
    }), 'Tavern Stock');
    tavern.addFood(new Cream('Spiced Ale Cream', {
      servings: 4,
      caloriesPerServing: 240,
      description: 'A rich whipped cream topping used for tavern desserts and drinks.',
      appetizingness: 71,
    }), 'Tavern Stock');
    tavern.addFood(new Food('Dark Beer', {
      servings: 8,
      caloriesPerServing: 180,
      tasteType: 'bitter',
      texture: 'foamy',
      color: 'amber',
      shape: 'mug',
      description: 'A round of dark tavern beer poured and ready on the bar.',
      appetizingness: 64,
    }), 'Bar Stock');
    tavern.addFood(new Food('Foamy Ale', {
      servings: 6,
      caloriesPerServing: 190,
      tasteType: 'malty',
      texture: 'frothy',
      color: 'gold',
      shape: 'glass',
      description: 'Fresh ale sloshing in heavy tavern glasses.',
      appetizingness: 66,
    }), 'Bar Stock');

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
    tavern.addNPC(
      new NPC('Mira the Regular', {
        role: 'Bar Patron',
        personality: 'friendly',
        description: 'A relaxed patron perched on a stool with an unfinished drink and a plate of tavern food',
        baseWeight: 185,
        willingness: 68,
        foodLoves: ['Beer', 'Bread', 'Pastry'],
        foodLikes: ['Meat', 'Cream', 'Ice Cream'],
        foodDislikes: [],
      })
    );
    tavern.addNPC(
      new NPC('Tansy the Drinker', {
        role: 'Bar Patron',
        personality: 'boisterous',
        description: 'A loud tavern regular guarding a beer bottle and laughing between bites',
        baseWeight: 210,
        willingness: 72,
        foodLoves: ['Ale', 'Bread', 'Meat'],
        foodLikes: ['Pastry'],
        foodDislikes: ['Cream'],
      })
    );
    tavern.addNPC(
      new Guard('Off-Duty Captain Lenna', {
        role: 'Off-Duty Guard',
        personality: 'stern',
        description: 'A guard off shift, leaning against the bar with a heavy mug and a watchful eye on the room',
        baseWeight: 200,
        foodLikes: ['Beer', 'Meat', 'Bread'],
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
