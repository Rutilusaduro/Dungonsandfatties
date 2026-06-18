/**
 * Creature System
 * Generic and specific creatures that inhabit zones
 */

class Creature {
  constructor(name, options = {}) {
    this.name = name;
    this.type = options.type || 'creature'; // 'beast', 'humanoid', 'monstrosity', etc.
    this.description = options.description || '';

    // Stats
    this.stats = options.stats || {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 3,
      wisdom: 12,
      charisma: 6,
    };

    // Health
    this.maxHealth = options.maxHealth || 20;
    this.currentHealth = this.maxHealth;

    // Weight system
    this.baseWeight = options.baseWeight || 100;
    this.currentWeight = this.baseWeight;
    this.weightGainAccumulated = 0;

    // Behavior
    this.behavior = options.behavior || 'neutral'; // 'hostile', 'friendly', 'neutral', 'fearful'
    this.isAggressive = options.isAggressive !== false;
    this.canFly = options.canFly || false;
    this.canSwim = options.canSwim || false;

    // Feeding behavior (for weight gain themed game)
    this.diet = options.diet || 'omnivore'; // 'herbivore', 'carnivore', 'omnivore'
    this.hungerLevel = options.hungerLevel || 50; // 0-100
    this.feedingRate = options.feedingRate || 1; // lbs per feeding

    // Unique ID
    this.id = options.id || Math.random().toString(36).substr(2, 9);
  }

  // Feed the creature
  feed(amount) {
    this.hungerLevel = Math.max(0, this.hungerLevel - amount);
    this.currentWeight += this.feedingRate;
    this.weightGainAccumulated += this.feedingRate;

    let status = 'fed';
    if (this.hungerLevel > 75) status = 'very_hungry';
    else if (this.hungerLevel > 50) status = 'hungry';
    else if (this.hungerLevel > 25) status = 'satisfied';
    else status = 'full';

    return {
      creature: this.name,
      hungerLevel: this.hungerLevel,
      newWeight: this.currentWeight,
      status,
    };
  }

  // Increase hunger over time
  incrementHunger(amount = 5) {
    this.hungerLevel = Math.min(100, this.hungerLevel + amount);
    return this.hungerLevel;
  }

  // Take damage
  takeDamage(amount) {
    this.currentHealth = Math.max(0, this.currentHealth - amount);
    return {
      creature: this.name,
      healthRemaining: this.currentHealth,
      isDead: this.currentHealth === 0,
    };
  }

  // Gain weight (from spells, potions, etc.)
  gainWeight(amount) {
    this.currentWeight += amount;
    this.weightGainAccumulated += amount;
    return {
      creature: this.name,
      newWeight: this.currentWeight,
      accumulated: this.weightGainAccumulated,
    };
  }

  // Get creature status
  getStatus() {
    const healthPercent = (this.currentHealth / this.maxHealth) * 100;
    let healthStatus = 'healthy';
    if (healthPercent < 25) healthStatus = 'critically_wounded';
    else if (healthPercent < 50) healthStatus = 'wounded';
    else if (healthPercent < 75) healthStatus = 'injured';

    return {
      name: this.name,
      type: this.type,
      health: { current: this.currentHealth, max: this.maxHealth, status: healthStatus },
      weight: {
        current: this.currentWeight,
        base: this.baseWeight,
        gained: this.weightGainAccumulated,
      },
      hunger: this.hungerLevel,
      behavior: this.behavior,
    };
  }

  // Get description for display
  getDescription() {
    return `${this.name} (${this.type}): ${this.description}`;
  }
}

// Specific creature types

class Beast extends Creature {
  constructor(name, options = {}) {
    super(name, {
      type: 'beast',
      ...options,
    });
  }
}

class Humanoid extends Creature {
  constructor(name, options = {}) {
    super(name, {
      type: 'humanoid',
      ...options,
    });
  }
}

class Monstrosity extends Creature {
  constructor(name, options = {}) {
    super(name, {
      type: 'monstrosity',
      ...options,
    });
  }
}

class Pig extends Beast {
  constructor(name = 'Pig', options = {}) {
    super(name, {
      description: 'A plump pig',
      maxHealth: 15,
      baseWeight: 200,
      diet: 'omnivore',
      feedingRate: 2,
      hungerLevel: 60,
      ...options,
    });
  }
}

class Duck extends Beast {
  constructor(name = 'Duck', options = {}) {
    super(name, {
      description: 'A waterfowl',
      maxHealth: 8,
      baseWeight: 5,
      diet: 'omnivore',
      feedingRate: 0.5,
      canSwim: true,
      hungerLevel: 70,
      ...options,
    });
  }
}

class Cow extends Beast {
  constructor(name = 'Cow', options = {}) {
    super(name, {
      description: 'A large bovine',
      maxHealth: 30,
      baseWeight: 1200,
      diet: 'herbivore',
      feedingRate: 3,
      hungerLevel: 40,
      ...options,
    });
  }
}

export { Creature, Beast, Humanoid, Monstrosity, Pig, Duck, Cow };
