/**
 * Character System
 * Handles player character creation and stats
 * D&D-based with weight gain mechanics
 */

import ActiveConditions from './conditions/ActiveConditions.js';
import { canEquip, SLOTS, itemByKey } from './items/Equipment.js';
import { clampSlots } from './mechanics/Balance.js';
import {
  applyBodyWeightChange,
  calculateLivingCalories,
  estimatePendingWeightGain,
  initializeNutritionState,
  processLongRestNutrition,
  recordCalorieConsumption,
} from './mechanics/NutritionSystem.js';

class Character {
  constructor(name, options = {}) {
    this.name = name;
    this.race = options.race || 'Human';
    this.class_ = options.class || 'Adventurer';
    this.level = options.level || 1;
    this.experience = options.experience || 0;

    // D&D Core Stats
    this.stats = {
      strength: options.strength || 10,
      dexterity: options.dexterity || 10,
      constitution: options.constitution || 10,
      intelligence: options.intelligence || 10,
      wisdom: options.wisdom || 10,
      charisma: options.charisma || 10,
    };

    // Health
    this.maxHealth = this.calculateMaxHealth();
    this.currentHealth = this.maxHealth;

    // Weight gain mechanics
    this.baseWeight = options.baseWeight || 150; // in lbs
    this.currentWeight = this.baseWeight;
    this.stomachCapacity = options.stomachCapacity ?? Math.round(this.baseWeight * 0.6);
    this.fullness = 0;
    this.weightGainThreshold = options.weightGainThreshold || 10; // cumulative gain that triggers effects
    this.weightGainAccumulated = 0;
    this.caloriesPerPound = options.caloriesPerPound || 900;
    this.edibleYieldRatio = options.edibleYieldRatio || 0.55;

    // Body composition for flavor/effects
    this.bodyComposition = {
      fat: 0,
      muscle: 0,
      other: 0,
    };

    // Equipment slots: weapon | offhand | armor | accessory
    this.equippedItems = { weapon: null, offhand: null, armor: null, accessory: null };
    this.inventory = []; // unequipped items

    // DnD-style spell slots { 1: N, 2: N, 3: N }
    const defaultSlots = options.spellSlots || { 1: 3, 2: 2, 3: 1 };
    this.spellSlots = { ...defaultSlots };
    this.maxSpellSlots = { ...defaultSlots };
    this._baseSpellSlots = { ...defaultSlots }; // frozen base; equip bonuses layer on top

    // Spell status + conditions (so the player can also be a narration subject)
    this.restrainedBy = null;
    this.suspensionState = null;
    this.gravityMultiplier = options.gravityMultiplier || 1;
    this.effectiveGravity = this.currentWeight * 0.1;
    this.positionedOn = null;
    this.isFloating = false;
    this.floorTethered = false;
    this.isFullness = false;
    this.lastWeightGain = 0;
    this.conditions = new ActiveConditions();

    initializeNutritionState(this, options);
  }

  // Engine context input ({ subject }) — see engine.js deriveFor().
  _createContext(extra = {}) {
    return { subject: this, ...extra };
  }

  calculateMaxHealth() {
    // Simple D&D health calc: base 10 + CON modifier
    const conModifier = Math.floor((this.stats.constitution - 10) / 2);
    return 10 + conModifier;
  }

  getStatModifier(statName) {
    const stat = this.stats[statName];
    return Math.floor((stat - 10) / 2);
  }

  // Apply damage
  takeDamage(amount) {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    return this.currentHealth;
  }

  // Healing
  heal(amount) {
    this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
    return this.currentHealth;
  }

  // Weight gain system
  addWeight(amount) {
    const result = applyBodyWeightChange(this, amount);

    // Update body composition
    if (amount > 0) {
      this.bodyComposition.fat += amount * 0.8;
      this.bodyComposition.other += amount * 0.2;
    }

    // Could trigger stat changes, visual changes, etc.
    return {
      newWeight: this.currentWeight,
      accumulated: this.weightGainAccumulated,
      thresholdMet: this.weightGainAccumulated >= this.weightGainThreshold,
      weightChange: result?.weightChange || 0,
    };
  }

  gainWeight(amount) {
    return this.addWeight(amount);
  }

  // Equipment ──────────────────────────────────────────────────

  equip(item) {
    if (!canEquip(item, this)) return { ok: false, reason: `${this.class_} cannot equip ${item.name}` };
    const prev = this.equippedItems[item.slot];
    this.equippedItems[item.slot] = item;
    this._applyEquipmentBonuses();
    return { ok: true, replaced: prev };
  }

  unequip(slot) {
    if (!SLOTS.includes(slot)) return null;
    const item = this.equippedItems[slot];
    this.equippedItems[slot] = null;
    this._applyEquipmentBonuses();
    return item;
  }

  _applyEquipmentBonuses() {
    const next = { ...this._baseSpellSlots };
    for (const item of Object.values(this.equippedItems)) {
      if (!item) continue;
      for (const [lvl, bonus] of Object.entries(item.bonusSlots || {})) {
        next[lvl] = (next[lvl] || 0) + bonus;
      }
    }
    clampSlots(next);
    for (const lvl of Object.keys(next)) {
      const prevMax = this.maxSpellSlots[lvl] || 0;
      const newMax = next[lvl];
      const diff = newMax - prevMax;
      this.maxSpellSlots[lvl] = newMax;
      if (diff > 0) {
        this.spellSlots[lvl] = (this.spellSlots[lvl] || 0) + diff;
      } else if (diff < 0) {
        this.spellSlots[lvl] = Math.max(0, (this.spellSlots[lvl] || 0) + diff);
      }
    }
  }

  get feedBonusMultiplier() {
    let bonus = 0;
    for (const item of Object.values(this.equippedItems)) {
      if (item) bonus += (item.feedBonus || 0);
    }
    return 1 + bonus / 100;
  }

  // Fraction (0..0.6) by which equipped feedCling reduces a target's per-round
  // fullness drain — makes your feeding "stick" against purgers.
  get feedClingFactor() {
    let pct = 0;
    for (const item of Object.values(this.equippedItems)) {
      if (item) pct += (item.feedCling || 0);
    }
    return Math.min(0.6, pct / 100);
  }

  consumeCalories(calories, source = 'Food', options = {}) {
    return recordCalorieConsumption(this, calories, source, options);
  }

  processLongRestNutrition() {
    const result = processLongRestNutrition(this);
    if (result?.weightGain > 0) {
      this.bodyComposition.fat += result.weightGain * 0.8;
      this.bodyComposition.other += result.weightGain * 0.2;
    }
    return result;
  }

  getCalorieValue(options = {}) {
    return calculateLivingCalories(this, options);
  }

  // ── Save / load ──────────────────────────────────────────────
  // Equipment instances → keys; conditions → plain dump. Everything else
  // is plain numbers/strings/objects and survives JSON round-trip as-is.
  serialize() {
    const out = {};
    for (const [k, v] of Object.entries(this)) {
      if (k === 'equippedItems' || k === 'inventory' || k === 'conditions') continue;
      out[k] = v;
    }
    out.equippedItems = Object.fromEntries(
      Object.entries(this.equippedItems).map(([slot, it]) => [slot, it?.key ?? null]),
    );
    out.inventory  = this.inventory.map(it => it.key).filter(Boolean);
    out.conditions = this.conditions.serialize();
    return out;
  }

  static hydrate(data) {
    const c = new Character(data.name, { race: data.race, class: data.class_ });
    Object.assign(c, data);
    c.equippedItems = { weapon: null, offhand: null, armor: null, accessory: null };
    for (const [slot, key] of Object.entries(data.equippedItems || {})) {
      if (key) c.equippedItems[slot] = itemByKey(key);
    }
    c.inventory   = (data.inventory || []).map(itemByKey).filter(Boolean);
    c.conditions  = new ActiveConditions().hydrate(data.conditions || []);
    return c;
  }

  // Get character description
  getDescription() {
    const weightDiff = this.currentWeight - this.baseWeight;
    const weightStatus = weightDiff > 0 ? `${weightDiff}+ lbs` : `at base weight`;

    return `
${this.name} the ${this.race} ${this.class_}
Level ${this.level} | Experience: ${this.experience}
HP: ${this.currentHealth}/${this.maxHealth}
Weight: ${this.currentWeight} lbs (${weightStatus})
    `;
  }

  // Get stats summary
  getStats() {
    return {
      name: this.name,
      race: this.race,
      class: this.class_,
      level: this.level,
      stats: this.stats,
      health: { current: this.currentHealth, max: this.maxHealth },
      weight: {
        current: this.currentWeight,
        base: this.baseWeight,
        accumulated: this.weightGainAccumulated,
      },
      nutrition: {
        caloriesEatenToday: this.caloriesEatenToday,
        caloriesEatenLifetime: this.caloriesEatenLifetime,
        pendingWeightGain: estimatePendingWeightGain(this),
        lastCaloriesConsumed: this.lastCaloriesConsumed,
        retentionMultiplier: this.calorieRetentionMultiplier,
        edibleCalories: this.getCalorieValue(),
      },
      spellSlots: { ...this.spellSlots },
      maxSpellSlots: { ...this.maxSpellSlots },
    };
  }
}

export default Character;
