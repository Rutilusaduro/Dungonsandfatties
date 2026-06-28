/**
 * NPC System
 * Named and unnamed sentient NPCs with personality, dialogue, and interactions
 */

import { getTextEngine } from '../../textEngine/index.js';
import ActiveConditions from '../conditions/ActiveConditions.js';
import {
  applyBodyWeightChange,
  calculateLivingCalories,
  estimatePendingWeightGain,
  initializeNutritionState,
  processLongRestNutrition,
  recordCalorieConsumption,
} from '../mechanics/NutritionSystem.js';
import { getSizeClass } from '../mechanics/WeightStages.js';

class NPC {
  constructor(name, options = {}) {
    this.name = name;
    this.role = options.role || 'Traveler'; // 'Merchant', 'Guard', 'Innkeeper', etc.
    this.description = options.description || '';
    this.personality = options.personality || 'neutral'; // 'friendly', 'suspicious', 'greedy', 'noble', etc.
    this.persona = options.persona || null; // stable persona key for text-engine gating ('bella', etc.)
    this.gender = 'female'; // All NPCs are female

    // Stats similar to characters
    this.stats = options.stats || {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    };

    // Health and weight
    this.maxHealth = options.maxHealth || 25;
    this.currentHealth = this.maxHealth;
    this.baseWeight = options.baseWeight || 160;
    this.currentWeight = this.baseWeight;
    this.weightGainAccumulated = 0;
    this.previousWeight = this.baseWeight; // Track for dialogue about weight changes
    this.caloriesPerPound = options.caloriesPerPound || 900;
    this.edibleYieldRatio = options.edibleYieldRatio || 0.55;

    // Relationship tracking
    this.playerReputation = options.playerReputation || 0; // -100 to 100
    this.isNamed = options.isNamed !== false;
    this.faction = options.faction || 'neutral';

    // Dialogue and interactions
    this.dialogues = options.dialogues || {};
    this.quests = options.quests || [];
    this.trades = options.trades || []; // Items/services they can trade
    this.dialogue_state = 'greeting'; // Current state in dialogue tree

    // Deterministic id from name so discovery/save state survives a world rebuild
    // on reload (names are unique within a zone). Explicit options.id still wins.
    this.id = options.id || `npc_${name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')}`;

    // Food preferences (for weight gain themed interactions)
    this.foodLoves = options.foodLoves || []; // LOVES these foods
    this.foodLikes = options.foodLikes || []; // Likes these
    this.foodDislikes = options.foodDislikes || []; // Dislikes these

    // Willingness to eat (0-100, affects Suggestion spell)
    this.willingness = options.willingness || 50;

    // Track if we've detected their cravings
    this.cravinessRevealed = false;

    // Gravity and state
    this.gravity = this.currentWeight * 0.1; // gravity = weight * gravityConstant
    this.gravityMultiplier = options.gravityMultiplier || 1;
    this.effectiveGravity = this.gravity;
    this.positionedOn = null;
    this.isFloating = false;
    this.floorTethered = false;
    this.isFullness = false; // Fullness state from Rapid Digestion spell
    this.suspensionState = null; // Track suspension: 'ceiling', 'hybrid' (belly touching), etc.

    // Spell status effects
    this.restrainedBy = null;  // 'hold_person', 'confection_snare', etc.
    this.lastWeightGain = 0;   // Most recent weight gain amount (for reaction scaling)
    this.spellAffects = [];    // Active spell effects on this NPC
    this.conditions = new ActiveConditions(); // Lingering spell conditions (text-engine dims)

    initializeNutritionState(this, options);
  }

  // Get dialogue with context awareness
  getDialogue(state = null, context = {}) {
    const engine = getTextEngine();
    const ctx = this._createContext();
    const dialogueKey = state || this.dialogue_state;
    const moduleKey = `npc.dialogue.${dialogueKey}`;

    let dialogue = engine.render(moduleKey, ctx)
      || `${this.name} looks at you.`;

    // Weight reaction appendix — only if we just gained weight this interaction
    const weightChange = this.currentWeight - this.previousWeight;
    if (weightChange > 0 && !context.skipWeightReaction) {
      this.lastWeightGain = weightChange;
      const reaction = engine.render('npc.reaction.weight_gain', this._createContext());
      if (reaction) dialogue += `\n${reaction}`;
    }

    return dialogue;
  }

  // Start conversation
  startConversation() {
    this.dialogue_state = 'greeting';
    return this.getDialogue('greeting');
  }

  // Look at NPC - description with weight details
  examine() {
    try {
      const engine = getTextEngine();
      const ctx = this._createContext();
      const description = engine.render('npc.examine', ctx);
      return description || this._examineWithFallback();
    } catch {
      return this._examineWithFallback();
    }
  }

  _examineWithFallback() {
    const weightDiff = this.currentWeight - this.baseWeight;
    const weightDesc =
      weightDiff > 30
        ? ' Her frame is noticeably fuller and rounder.'
        : weightDiff > 15
        ? ' She has gained a bit of weight.'
        : weightDiff > 0
        ? ' She looks slightly heavier than average.'
        : '';

    const reputationDesc =
      this.playerReputation > 50
        ? ' She smiles warmly at you.'
        : this.playerReputation > 25
        ? ' She nods politely.'
        : this.playerReputation < -50
        ? ' She eyes you with suspicion.'
        : this.playerReputation < -25
        ? ' She seems wary of you.'
        : '';

    return `${this.name} is a ${this.personality} woman. ${this.description}${weightDesc}${reputationDesc}`;
  }

  // Progress dialogue
  nextDialogue(choice = 'default') {
    if (this.dialogues[choice]) {
      this.dialogue_state = choice;
      return this.getDialogue(choice);
    }
    return `${this.name} doesn't respond to that.`;
  }

  // Modify reputation with player
  modifyReputation(amount) {
    this.playerReputation = Math.max(-100, Math.min(100, this.playerReputation + amount));
    let reputationStatus = 'neutral';
    if (this.playerReputation > 50) reputationStatus = 'friendly';
    else if (this.playerReputation > 25) reputationStatus = 'favorable';
    else if (this.playerReputation < -50) reputationStatus = 'hostile';
    else if (this.playerReputation < -25) reputationStatus = 'unfavorable';

    return {
      npc: this.name,
      newReputation: this.playerReputation,
      status: reputationStatus,
    };
  }

  // Gain weight
  gainWeight(amount) {
    const result = applyBodyWeightChange(this, amount);
    this.recalculateGravity();
    return {
      npc: this.name,
      newWeight: this.currentWeight,
      accumulated: this.weightGainAccumulated,
      gravity: this.gravity,
      weightChange: result?.weightChange || 0,
    };
  }

  // Recalculate gravity when weight changes
  recalculateGravity() {
    const baseGravity = this.currentWeight * 0.1;
    this.gravity = baseGravity;
    this.effectiveGravity = baseGravity * (this.gravityMultiplier || 1);
  }

  // Feed the NPC (weight gain themed)
  feed(foodName, calorieValue = 100, weight = 1) {
    const calories = calorieValue || weight * 3500;
    this.consumeCalories(calories, foodName);
    this.modifyReputation(5); // Feeding builds relationship

    return {
      npc: this.name,
      food: foodName,
      calories,
      pendingWeightGain: estimatePendingWeightGain(this),
      reputation: this.playerReputation,
    };
  }

  consumeCalories(calories, source = 'Food', options = {}) {
    return recordCalorieConsumption(this, calories, source, options);
  }

  processLongRestNutrition() {
    return processLongRestNutrition(this);
  }

  getCalorieValue(options = {}) {
    return calculateLivingCalories(this, options);
  }

  // Get NPC info for display
  getInfo() {
    return {
      name: this.name,
      role: this.role,
      description: this.description,
      personality: this.personality,
      isNamed: this.isNamed,
      reputation: this.playerReputation,
      health: {
        current: this.currentHealth,
        max: this.maxHealth,
      },
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
    };
  }

  // Create context for text engine. Returns the engine's createContext input
  // shape ({ subject }) so all selector dimensions (weight stage, size class,
  // restraint/suspension/burial/mind-control, hunger, fullness, reputation,
  // willingness) are derived in one place — engine.js deriveFor() — and
  // {subject.*} slots resolve to this NPC.
  _createContext(extra = {}) {
    return { subject: this, sizeClass: getSizeClass(this), ...extra };
  }

  // Derive weight stage (0-11) from current weight
  _deriveWeightStage() {
    const percentGain = ((this.currentWeight - this.baseWeight) / this.baseWeight) * 100;
    if (percentGain < 5) return 0;
    if (percentGain < 15) return 1;
    if (percentGain < 30) return 2;
    if (percentGain < 50) return 3;
    if (percentGain < 75) return 4;
    if (percentGain < 100) return 5;
    if (percentGain < 150) return 6;
    if (percentGain < 200) return 7;
    if (percentGain < 300) return 8;
    if (percentGain < 400) return 9;
    if (percentGain < 500) return 10;
    return 11;
  }
}

// Specific NPC types

class NamedNPC extends NPC {
  constructor(name, options = {}) {
    super(name, {
      isNamed: true,
      ...options,
    });
  }
}

class UnnamedNPC extends NPC {
  constructor(role = 'Traveler', options = {}) {
    super(`${role} #${Math.random().toString(36).substr(7)}`, {
      role,
      isNamed: false,
      ...options,
    });
  }
}

// Example Named NPCs (All Female)

class Innkeeper extends NamedNPC {
  constructor(name = 'Barkeep Bella', options = {}) {
    super(name, {
      role: 'Innkeeper',
      persona: 'bella',
      personality: 'friendly',
      bodyType: 'mom_bod',
      description: 'A warm tavern keeper with a cheerful disposition',
      baseWeight: 220,
      willingness: 80,
      foodLoves: ['Pastry', 'Cream', 'Pudding', 'Meat'],
      foodLikes: ['Bread', 'IceCream'],
      foodDislikes: [],
      ...options,
    });
  }
}

class Merchant extends NamedNPC {
  constructor(name = 'Silvia the Merchant', options = {}) {
    super(name, {
      role: 'Merchant',
      persona: 'silvia',
      personality: 'shrewd',
      bodyType: 'hourglass',
      description: 'A clever merchant with keen eye for opportunity and fine goods',
      baseWeight: 180,
      willingness: 60,
      foodLoves: ['IceCream', 'Cream', 'Pudding'],
      foodLikes: ['Pastry', 'Meat'],
      foodDislikes: ['Bread'],
      ...options,
    });
  }
}

class Gardener extends NamedNPC {
  constructor(name = 'Gardener Gregg', options = {}) {
    super(name, {
      role: 'Gardener',
      persona: 'gregg',
      personality: 'peaceful',
      bodyType: 'pear',
      description: 'A serene gardener who tends the plants with care and patience',
      baseWeight: 210,
      willingness: 70,
      foodLoves: ['Bread', 'Cream', 'Meat'],
      foodLikes: ['Pastry', 'IceCream'],
      foodDislikes: [],
      ...options,
    });
  }
}

class Guard extends NamedNPC {
  constructor(name = 'Captain Cassandra', options = {}) {
    super(name, {
      role: 'Guard Captain',
      persona: 'cassandra',
      personality: 'stern',
      bodyType: 'athletic',
      description: 'A vigilant guard captain keeping watch with unwavering dedication',
      maxHealth: 35,
      baseWeight: 190,
      willingness: 40,
      foodLoves: ['Meat'],
      foodLikes: ['Bread', 'Pastry'],
      foodDislikes: ['Cream', 'Pudding'],
      stats: {
        strength: 14,
        dexterity: 12,
        constitution: 13,
        intelligence: 10,
        wisdom: 12,
        charisma: 10,
      },
      ...options,
    });
  }
}

class Chef extends NamedNPC {
  constructor(name = 'Chef Gertrude', options = {}) {
    super(name, {
      role: 'Chef',
      persona: 'gertrude',
      personality: 'commanding',
      bodyType: 'apple',
      description: 'A skilled chef who runs a tight but delicious kitchen',
      baseWeight: 260,
      willingness: 90,
      foodLoves: ['Meat', 'Cream', 'Pudding', 'Pastry'],
      foodLikes: ['Bread', 'IceCream'],
      foodDislikes: [],
      ...options,
    });
  }
}

export { NPC, NamedNPC, UnnamedNPC, Innkeeper, Merchant, Gardener, Guard, Chef };
