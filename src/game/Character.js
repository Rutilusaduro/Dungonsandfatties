/**
 * Character System
 * Handles player character creation and stats
 * D&D-based with weight gain mechanics
 */

import ActiveConditions from './conditions/ActiveConditions.js';

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
    this.weightGainThreshold = options.weightGainThreshold || 10; // cumulative gain that triggers effects
    this.weightGainAccumulated = 0;

    // Body composition for flavor/effects
    this.bodyComposition = {
      fat: 0,
      muscle: 0,
      other: 0,
    };

    // Equipment and inventory refs
    this.equippedItems = [];

    // Spell status + conditions (so the player can also be a narration subject)
    this.restrainedBy = null;
    this.suspensionState = null;
    this.isFullness = false;
    this.lastWeightGain = 0;
    this.conditions = new ActiveConditions();
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
    this.currentWeight += amount;
    this.weightGainAccumulated += amount;

    // Update body composition
    this.bodyComposition.fat += amount * 0.8;
    this.bodyComposition.other += amount * 0.2;

    // Could trigger stat changes, visual changes, etc.
    return {
      newWeight: this.currentWeight,
      accumulated: this.weightGainAccumulated,
      thresholdMet: this.weightGainAccumulated >= this.weightGainThreshold,
    };
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
    };
  }
}

export default Character;
