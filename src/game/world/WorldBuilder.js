/**
 * WorldBuilder — assembles the playable world from data tables.
 */

import Zone from './Zone.js';
import World from './World.js';
import { WORLD_ZONES } from './data/worldZones.js';
import { NPC_ROSTER } from './data/npcRoster.js';
import {
  NPC,
  Innkeeper,
  Merchant,
  Gardener,
  Guard,
  Chef,
} from '../entities/NPC.js';
import { Pig, Duck, Cow } from '../entities/Creature.js';
import { Earth, Wood, Stone, Furniture, Water } from '../environment/EnvironmentalObject.js';
import { Bread, Meat, Pastry, Cream, Food } from '../items/Food.js';

const NPC_CLASS_MAP = {
  Innkeeper,
  Merchant,
  Gardener,
  Guard,
  Chef,
};

const CREATURE_ROSTER = {
  fatling_pig: () => new Pig('Fatling', {
    description: 'A particularly plump pig, seemingly well-fed',
    baseWeight: 280,
    hungerLevel: 30,
  }),
  waddles_duck: () => new Duck('Waddles', {
    description: 'A fat waterfowl waddling through the vegetables',
  }),
  chained_cow: () => new Cow('Chained Cow', {
    description: 'A massive cow, magically enlarged and imprisoned',
    baseWeight: 2000,
    behavior: 'hostile',
  }),
};

/** Theme-appropriate ambient props so zones feel inhabited. */
const THEME_OBJECTS = {
  tavern: [
    () => new Wood('wood_table', 'Sturdy Wooden Table', { description: 'A heavy oak table, sometimes laden with food' }),
    () => new Water('ale_keg', 'Beer Keg', { description: 'A tapped keg standing ready', properties: { contains: 'beer', servings: 20 } }),
  ],
  garden: [
    () => new Earth('earth_soil', 'Rich Earth', { description: 'Dark, fertile soil' }),
    () => new Water('water_fountain', 'Stone Fountain', { description: 'Fresh water bubbling softly' }),
    () => new Stone('stone_bench', 'Stone Bench', { description: 'A bench for resting among the plants' }),
  ],
  kitchen: [
    () => new Furniture('stove', 'Cast Iron Stove', { description: 'Radiating heat and the smell of cooking', durability: 200 }),
    () => new Wood('prep_table', 'Prep Table', { description: 'A long wooden table for preparing food' }),
    () => new Water('water_basin', 'Water Basin', { description: 'For washing ingredients and dishes' }),
  ],
  dungeon: [
    () => new Stone('stone_pillar', 'Ancient Stone Pillar', { description: 'Supporting the ceiling above', durability: 300 }),
    () => new Earth('dungeon_earth', 'Damp Earth', { description: 'Soft earth that could be reshaped' }),
  ],
  market: [
    () => new Wood('market_stall', 'Market Stall', { description: 'A wooden stall crowded with goods' }),
    () => new Furniture('scales', 'Merchant Scales', { description: 'Brass scales for weighing wares' }),
  ],
  temple: [
    () => new Stone('altar_stone', 'Stone Altar', { description: 'Worn smooth by countless offerings' }),
    () => new Furniture('pew', 'Wooden Pew', { description: 'For the faithful to rest during long services' }),
  ],
  noble: [
    () => new Furniture('velvet_chair', 'Velvet Chair', { description: 'Ornate and slightly too narrow' }),
    () => new Water('wine_cabinet', 'Wine Cabinet', { description: 'Dark bottles line the shelves' }),
  ],
  harbor: [
    () => new Wood('dock_plank', 'Dock Plank', { description: 'Salt-crusted wood slick with tide' }),
    () => new Water('rain_barrel', 'Rain Barrel', { description: 'Fresh water collected from the roof' }),
  ],
  town: [
    () => new Stone('cobblestone', 'Cobblestones', { description: 'Worn stones underfoot' }),
    () => new Furniture('bench', 'Town Bench', { description: 'A public bench for weary travelers' }),
  ],
  underground: [
    () => new Earth('wet_earth', 'Wet Earth', { description: 'Cold and yielding underfoot' }),
    () => new Stone('cracked_wall', 'Cracked Wall', { description: 'Moisture seeps through the stone' }),
  ],
};

const THEME_FOODS = {
  tavern: [
    () => new Meat('Roasted Platter', { servings: 4, caloriesPerServing: 420, appetizingness: 82 }),
    () => new Bread('Fresh Loaf', { servings: 6, caloriesPerServing: 180, appetizingness: 74 }),
    () => new Pastry('Honey Pastry', { servings: 4, caloriesPerServing: 260, appetizingness: 86 }),
  ],
  kitchen: [
    () => new Meat('Roasting Joint', { servings: 5, caloriesPerServing: 380, appetizingness: 88 }),
    () => new Cream('Whipped Cream', { servings: 3, caloriesPerServing: 240, appetizingness: 70 }),
  ],
  market: [
    () => new Pastry('Market Tart', { servings: 3, caloriesPerServing: 220, appetizingness: 80 }),
    () => new Bread('Market Roll', { servings: 5, caloriesPerServing: 160, appetizingness: 72 }),
  ],
  garden: [
    () => new Food('Ripe Berries', { servings: 4, caloriesPerServing: 90, tasteType: 'sweet', appetizingness: 78 }),
  ],
  harbor: [
    () => new Meat('Smoked Fish', { servings: 3, caloriesPerServing: 280, appetizingness: 76 }),
  ],
};

function buildDialogueMap(def) {
  const map = {};
  for (const topic of def.dialogueTopics || ['greeting']) {
    if (topic !== 'greeting') map[topic] = topic;
  }
  return map;
}

function createNPC(key, def) {
  const Ctor = def.classType ? NPC_CLASS_MAP[def.classType] : NPC;
  const opts = {
    role: def.role,
    persona: def.persona,
    personality: def.personality,
    bodyType: def.bodyType,
    description: def.description,
    baseWeight: def.baseWeight,
    willingness: def.willingness,
    foodLoves: def.foodLoves || [],
    foodLikes: def.foodLikes || [],
    foodDislikes: def.foodDislikes || [],
    dialogues: buildDialogueMap(def),
    id: `npc_${key}`,
  };

  if (Ctor && Ctor !== NPC) {
    return new Ctor(def.name, opts);
  }
  return new NPC(def.name, opts);
}

function populateZone(zone, def) {
  const theme = def.theme || 'town';
  const objects = THEME_OBJECTS[theme] || THEME_OBJECTS.town;
  for (const mk of objects) zone.addEnvironmentalObject(mk());

  const foods = THEME_FOODS[theme];
  if (foods) {
    for (const mk of foods) zone.addFood(mk(), `${def.name} Stock`);
  }

  for (const npcKey of def.npcKeys || []) {
    const npcDef = NPC_ROSTER[npcKey];
    if (npcDef) zone.addNPC(createNPC(npcKey, npcDef));
  }

  for (const ck of def.creatureKeys || []) {
    const mk = CREATURE_ROSTER[ck];
    if (mk) zone.addCreature(mk());
  }
}

export function buildWorld(options = {}) {
  const world = new World({
    name: options.name || 'The Fattening Realm',
    description: options.description || 'A magical world where indulgence and transformation await at every turn.',
  });

  const zoneMap = new Map();

  for (const def of WORLD_ZONES) {
    const zone = new Zone(def.id, def.name, {
      description: def.description,
      theme: def.theme,
      difficulty: def.difficulty,
      isIndoors: def.isIndoors,
      lightLevel: def.lightLevel,
      features: def.features,
      spellAffinity: def.spellAffinity || [],
      exits: {},
    });
    populateZone(zone, def);
    zoneMap.set(def.id, zone);
    world.addZone(zone);
  }

  for (const def of WORLD_ZONES) {
    const zone = zoneMap.get(def.id);
    for (const [dir, targetId] of Object.entries(def.exits || {})) {
      zone.addExit(dir, targetId);
    }
  }

  world.setCurrentZone(options.startZone || 'tavern');
  return world;
}

export function getZoneCount() {
  return WORLD_ZONES.length;
}

export function getNpcCount() {
  return Object.keys(NPC_ROSTER).length;
}

export default buildWorld;
