// Enemy definitions for the single dungeon run.
// Each entry is a plain object; DungeonBuilder stamps them into Character-like
// entities that Combat.js and EnemyController can consume.

import { ARCHETYPES } from '../combat/EnemyController.js';

export function makeEnemy(def) {
  return {
    name:            def.name,
    _trait:          def.archetype,
    archetype:       ARCHETYPES[def.archetype],
    baseWeight:      def.baseWeight,
    currentWeight:   def.currentWeight ?? def.baseWeight,
    stomachCapacity: def.stomachCapacity ?? def.baseWeight * 0.8,
    fullness:        def.fullness ?? 0,
    willingness:     def.willingness ?? 50,
    description:     def.description,
    conditions:      { has: () => false, add() {}, remove() {}, keys: () => [], size: 0 },
    spellAffects:    [],
    isEnemy:         true,
    xpValue:         def.xpValue ?? 100,
    lootTable:       def.lootTable ?? [],
    bossEvent:       def.bossEvent ?? null,
    // Stub _createContext so SpellNarrator doesn't crash on enemies
    _createContext(extra = {}) { return { subject: this, ...extra }; },
    processLongRestNutrition() { return null; },
  };
}

// ── Floor 1 — The Pantry ──────────────────────────────────────

export const FLOOR1_ENEMIES = [
  {
    name: 'Kitchen Imp',
    archetype: 'flyer',
    baseWeight: 80,
    stomachCapacity: 90,
    willingness: 45,
    description: 'A wiry imp that darts between shelves, pelting you with enchanted morsels.',
    xpValue: 80,
    lootTable: ['feeding_fork', 'ring_of_appetite'],
  },
  {
    name: 'Pantry Goblin',
    archetype: 'brute',
    baseWeight: 140,
    stomachCapacity: 200,
    willingness: 55,
    description: 'A stocky goblin that lumbers forward, spooning enormous mouthfuls of lard at you.',
    xpValue: 120,
    lootTable: ['padded_robe', 'ring_of_appetite'],
  },
  {
    name: 'The Snack Warden',
    archetype: 'dispeller',
    baseWeight: 200,
    stomachCapacity: 280,
    willingness: 60,
    description: 'A rotund custodian who periodically purges the enchantment weighing her down, making her maddeningly hard to fatten.',
    xpValue: 250,
    lootTable: ['gorging_ladle', 'enchanted_doublet', 'amulet_of_excess'],
    isMiniBosse: true,
  },
];

// ── Floor 2 — The Kitchen ─────────────────────────────────────

export const FLOOR2_ENEMIES = [
  {
    name: 'Banquet Specter',
    archetype: 'glutton',
    baseWeight: 160,
    stomachCapacity: 350,
    willingness: 80,
    description: 'A ghost that died mid-feast. It gorges on ethereal food, swelling visibly. Succumb finisher opens fastest here.',
    xpValue: 180,
    lootTable: ['gorging_ladle', 'sanctified_buckler', 'hunger_focus'],
  },
  {
    name: 'Oven Imp',
    archetype: 'flyer',
    baseWeight: 90,
    stomachCapacity: 100,
    willingness: 40,
    description: 'Fast and slippery, this imp hurls baked goods from above with unnerving accuracy.',
    xpValue: 160,
    lootTable: ['amulet_of_excess', 'feeding_fork'],
  },
  {
    name: "Chef's Nightmare",
    archetype: 'brute',
    baseWeight: 320,
    stomachCapacity: 500,
    willingness: 65,
    description: 'A massive construct of animated cookware and half-cooked meats. Heavy and relentless. Finishers open once fattened.',
    xpValue: 400,
    lootTable: ['fattening_staff', 'feast_plate', 'arcane_cookbook'],
    isMiniBosse: true,
  },
];

// ── Floor 3 — The Feasting Hall ───────────────────────────────

export const FLOOR3_ENEMIES = [
  {
    name: 'Glutton Knight',
    archetype: 'brute',
    baseWeight: 280,
    stomachCapacity: 450,
    willingness: 70,
    description: 'A former champion who traded martial prowess for an unstoppable appetite.',
    xpValue: 280,
    lootTable: ['feast_plate', 'dread_orb'],
  },
  {
    name: 'Feasting Wraith',
    archetype: 'dispeller',
    baseWeight: 200,
    stomachCapacity: 300,
    willingness: 55,
    description: 'Incorporeal unless feasting. It purges itself constantly, resisting your fattening spells — until you break its rhythm.',
    xpValue: 320,
    lootTable: ['arcane_cookbook', 'dread_orb'],
  },
  {
    name: 'The Grand Gourmand',
    archetype: 'brute',
    baseWeight: 500,
    stomachCapacity: 900,
    willingness: 60,
    description: 'The ancient lord of this dungeon. Immense, slow, and fiercely resistant to every finisher path — except the one you\'ve prepared for.',
    xpValue: 1000,
    lootTable: ['legendary_band'],
    isBoss: true,
    bossEvent: 'When the Grand Gourmand finally succumbs, the whole hall trembles. The enchanted feast-tables crack under spreading mass. A golden ring — the Gourmand\'s Band — rolls free from the wreckage.',
  },
];
