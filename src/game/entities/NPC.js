/**
 * NPC System
 * Named and unnamed sentient NPCs with personality, dialogue, and interactions
 */

class NPC {
  constructor(name, options = {}) {
    this.name = name;
    this.role = options.role || 'Traveler'; // 'Merchant', 'Guard', 'Innkeeper', etc.
    this.description = options.description || '';
    this.personality = options.personality || 'neutral'; // 'friendly', 'suspicious', 'greedy', 'noble', etc.

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
    this.foodPreferences = options.foodPreferences || [];
    this.likes = options.likes || [];
    this.dislikes = options.dislikes || [];
  }

  // Get dialogue based on current state
  getDialogue(state = null) {
    const dialogueKey = state || this.dialogue_state;
    return this.dialogues[dialogueKey] || `${this.name} looks at you silently.`;
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
    return {
      npc: this.name,
      newWeight: this.currentWeight,
      accumulated: this.weightGainAccumulated,
    };
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

// Example Named NPCs

class Innkeeper extends NamedNPC {
  constructor(name = 'Tavern Keeper', options = {}) {
    super(name, {
      role: 'Innkeeper',
      personality: 'friendly',
      description: 'A portly tavern keeper with a hearty laugh',
      baseWeight: 220,
      foodPreferences: ['hearty meals', 'ales', 'pastries'],
      likes: ['good stories', 'coin', 'customers'],
      dialogues: {
        greeting:
          "Welcome to my tavern! What can I get ya? I've got the finest food and drink in town.",
        tavern_chat: "Business is good this season. The harvest was bountiful!",
        offer_food: "Care for a hearty meal? My cook makes the best pies in the region.",
      },
      ...options,
    });
  }
}

class Merchant extends NamedNPC {
  constructor(name = 'Traveling Merchant', options = {}) {
    super(name, {
      role: 'Merchant',
      personality: 'greedy',
      description: 'A shrewd merchant with a keen eye for profit',
      baseWeight: 180,
      likes: ['coin', 'exotic goods', 'deals'],
      dislikes: ['haggling', 'theft'],
      dialogues: {
        greeting: "Ah, a potential customer! Care to see my wares?",
        selling:
          "These items are of the finest quality. Name your price... within reason, of course.",
        haggle: "Hmm, your offer is... interesting. Perhaps we can reach an agreement.",
      },
      ...options,
    });
  }
}

class Guard extends NamedNPC {
  constructor(name = 'Town Guard', options = {}) {
    super(name, {
      role: 'Guard',
      personality: 'stern',
      description: 'A vigilant town guard keeping watch',
      maxHealth: 35,
      baseWeight: 190,
      stats: {
        strength: 14,
        dexterity: 12,
        constitution: 13,
        intelligence: 10,
        wisdom: 12,
        charisma: 10,
      },
      likes: ['order', 'duty', 'discipline'],
      dislikes: ['thieves', 'troublemakers', 'chaos'],
      dialogues: {
        greeting: "State your business here.",
        friendly: "You seem trustworthy. Welcome to town.",
        warning: "Trouble-making won't be tolerated here.",
      },
      ...options,
    });
  }
}

export { NPC, NamedNPC, UnnamedNPC, Innkeeper, Merchant, Guard };
