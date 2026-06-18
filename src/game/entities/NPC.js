/**
 * NPC System
 * Named and unnamed sentient NPCs with personality, dialogue, and interactions
 */

import { getTextEngine } from '../../textEngine/index.js';

class NPC {
  constructor(name, options = {}) {
    this.name = name;
    this.role = options.role || 'Traveler'; // 'Merchant', 'Guard', 'Innkeeper', etc.
    this.description = options.description || '';
    this.personality = options.personality || 'neutral'; // 'friendly', 'suspicious', 'greedy', 'noble', etc.
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

    // Relationship tracking
    this.playerReputation = options.playerReputation || 0; // -100 to 100
    this.isNamed = options.isNamed !== false;
    this.faction = options.faction || 'neutral';

    // Dialogue and interactions
    this.dialogues = options.dialogues || {};
    this.quests = options.quests || [];
    this.trades = options.trades || []; // Items/services they can trade
    this.dialogue_state = 'greeting'; // Current state in dialogue tree

    // Unique ID
    this.id = options.id || Math.random().toString(36).substr(2, 9);

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
    this.isFullness = false; // Fullness state from Rapid Digestion spell
    this.suspensionState = null; // Track suspension: 'ceiling', 'hybrid' (belly touching), etc.
  }

  // Get dialogue with context awareness
  getDialogue(state = null, context = {}) {
    try {
      const engine = getTextEngine();
      const ctx = this._createContext();

      // Map state to module key
      const moduleKey = state ? `npc.dialogue.${state}` : 'npc.greeting';

      // Try to render from engine
      let dialogue = engine.render(moduleKey, ctx);

      // Fallback if no module found
      if (!dialogue) {
        dialogue = this.dialogues[state] || `${this.name} looks at you.`;
      }

      // Add weight reaction if applicable
      const weightChange = this.currentWeight - this.previousWeight;
      if (weightChange > 0 && !context.skipWeightReaction) {
        const reactionCtx = this._createContext();
        const reaction = engine.render('npc.weight_reaction', reactionCtx);
        if (reaction) {
          dialogue += ` ${reaction}`;
        }
      }

      return dialogue;
    } catch (error) {
      // Fallback to hardcoded dialogue if engine fails
      const dialogueKey = state || this.dialogue_state;
      let dialogue = this.dialogues[dialogueKey] || `${this.name} looks at you.`;

      const weightChange = this.currentWeight - this.previousWeight;
      if (weightChange > 0 && !context.skipWeightReaction) {
        if (weightChange > 20) {
          dialogue += ` She seems noticeably fuller than before!`;
        } else if (weightChange > 10) {
          dialogue += ` She looks a bit rounder.`;
        }
      }

      return dialogue;
    }
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
    } catch (error) {
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
    this.currentWeight += amount;
    this.weightGainAccumulated += amount;
    this.recalculateGravity();
    return {
      npc: this.name,
      newWeight: this.currentWeight,
      accumulated: this.weightGainAccumulated,
      gravity: this.gravity,
    };
  }

  // Recalculate gravity when weight changes
  recalculateGravity() {
    this.gravity = this.currentWeight * 0.1;
  }

  // Feed the NPC (weight gain themed)
  feed(foodName, calorieValue = 100, weight = 1) {
    this.gainWeight(weight);
    this.modifyReputation(5); // Feeding builds relationship

    return {
      npc: this.name,
      food: foodName,
      newWeight: this.currentWeight,
      reputation: this.playerReputation,
    };
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
    };
  }

  // Create context for text engine
  _createContext() {
    return {
      stage: this._deriveWeightStage(),
      corruption: 0,
      bodyType: 'default',
      reputation: this.playerReputation,
      willingness: this.willingness,
      hungerTier: 0,
      fullness: this.isFullness ? 1 : 0,
      season: 'spring',
      mood: this.personality,
      studentId: this.id,
    };
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
      personality: 'friendly',
      description: 'A warm tavern keeper with a cheerful disposition',
      baseWeight: 220,
      willingness: 80, // Very willing to eat
      foodLoves: ['Pastry', 'Cream', 'Pudding', 'Meat'],
      foodLikes: ['Bread', 'IceCream'],
      foodDislikes: [],
      dialogues: {
        greeting:
          "Well hello there, dear! Welcome to the Bloated Boar! What can I get ya? I've got the finest food and drink in town.",
        tavern_chat:
          "Business is wonderful this season! The harvest has been so bountiful. I've been enjoying the abundance myself, as you can see!",
        offer_food:
          "Care for something hearty? My cook makes the most delicious pies. I may have sampled a few myself...",
        after_feeding: "Oh my, that was absolutely delicious! Thank you, dear. I do love a good meal...",
      },
      ...options,
    });
  }
}

class Merchant extends NamedNPC {
  constructor(name = 'Silvia the Merchant', options = {}) {
    super(name, {
      role: 'Merchant',
      personality: 'shrewd',
      description: 'A clever merchant with keen eye for opportunity and fine goods',
      baseWeight: 180,
      willingness: 60, // Moderately willing
      foodLoves: ['IceCream', 'Cream', 'Pudding'],
      foodLikes: ['Pastry', 'Meat'],
      foodDislikes: ['Bread'],
      dialogues: {
        greeting:
          "Ah, a potential customer! Care to see my exotic wares? I've acquired some truly special items.",
        selling:
          "These goods are of exceptional quality. Name your price... within reason, of course.",
        haggle:
          "Your offer is... intriguing. Perhaps we can come to an agreement, especially if you sweeten the deal with some refreshments.",
        after_feeding:
          "Mmm, quite excellent! You certainly know how to negotiate. Perhaps we can do business more often.",
      },
      ...options,
    });
  }
}

class Gardener extends NamedNPC {
  constructor(name = 'Gardener Gregg', options = {}) {
    super(name, {
      role: 'Gardener',
      personality: 'peaceful',
      description: 'A serene gardener who tends the plants with care and patience',
      baseWeight: 210,
      willingness: 70,
      foodLoves: ['Bread', 'Cream', 'Meat'],
      foodLikes: ['Pastry', 'IceCream'],
      foodDislikes: [],
      dialogues: {
        greeting:
          "Welcome to the garden, dear. It's such a lovely day to enjoy nature's abundance.",
        gardening:
          "The plants are growing wonderfully. There's something satisfying about watching things flourish and grow, don't you think?",
        after_feeding:
          "Thank you for the meal. I do enjoy taking time to appreciate good food and the simple pleasures of life.",
      },
      ...options,
    });
  }
}

class Guard extends NamedNPC {
  constructor(name = 'Captain Cassandra', options = {}) {
    super(name, {
      role: 'Guard Captain',
      personality: 'stern',
      description: 'A vigilant guard captain keeping watch with unwavering dedication',
      maxHealth: 35,
      baseWeight: 190,
      willingness: 40, // Less willing to be swayed
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
      dialogues: {
        greeting: "State your business here.",
        friendly: "You seem trustworthy. The town is safer with honorable folk like yourself.",
        warning: "Trouble-making won't be tolerated here. Not on my watch.",
        after_feeding:
          "I appreciate the gesture. Proper nutrition keeps one sharp for duty.",
      },
      ...options,
    });
  }
}

class Chef extends NamedNPC {
  constructor(name = 'Chef Gertrude', options = {}) {
    super(name, {
      role: 'Chef',
      personality: 'commanding',
      description: 'A skilled chef who runs a tight but delicious kitchen',
      baseWeight: 260,
      willingness: 90, // Chef loves food!
      foodLoves: ['Meat', 'Cream', 'Pudding', 'Pastry'],
      foodLikes: ['Bread', 'IceCream'],
      foodDislikes: [],
      dialogues: {
        greeting: "What brings you to my kitchen? Are you here to appreciate fine cuisine?",
        cooking:
          "Cooking is an art form. Every meal is an opportunity to create something magnificent.",
        after_feeding:
          "Ah, now THAT is exquisite! You have good taste. A fine meal is one of life's greatest pleasures.",
      },
      ...options,
    });
  }
}

export { NPC, NamedNPC, UnnamedNPC, Innkeeper, Merchant, Gardener, Guard, Chef };
