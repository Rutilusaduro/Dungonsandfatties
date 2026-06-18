/**
 * Food System
 * Foods with taste, calories, and magical properties
 */

class Food {
  constructor(name, options = {}) {
    this.name = name;
    this.description = options.description || '';

    // Taste and appearance
    this.tasteType = options.tasteType || 'neutral'; // 'sweet', 'savory', 'spicy', 'sour', 'bitter', 'umami', 'neutral'
    this.appetizingness = options.appetizingness || 50; // 0-100, how appealing it looks/smells
    this.texture = options.texture || 'normal'; // 'smooth', 'creamy', 'crunchy', 'chewy', etc.
    this.color = options.color || 'brown';
    this.shape = options.shape || 'amorphous'; // 'spherical', 'cube', 'pile', etc.

    // Nutrition
    this.caloriesPerServing = options.caloriesPerServing || 100;
    this.servings = options.servings || 1;
    this.totalCalories = this.caloriesPerServing * this.servings;

    // Magical properties
    this.isMagical = options.isMagical || false;
    this.isReplicating = options.isReplicating || false; // Self-duplicating food
    this.isHealing = options.isHealing || false; // Heals eater when consumed
    this.healingAmount = options.healingAmount || 0;

    // Modifications (from spells)
    this.modifications = options.modifications || []; // List of applied spell effects
    this.baseCalories = this.caloriesPerServing; // Track original value for comparisons

    // Preferences (for NPCs)
    this.createdAt = Date.now();
    this.freshness = 100; // Degrades over time
  }

  // Modify caloric content (via spells)
  setCalories(amount) {
    this.caloriesPerServing = amount;
    this.totalCalories = this.caloriesPerServing * this.servings;
    this.modifications.push({
      type: 'calorie_enhancement',
      newAmount: amount,
      timestamp: Date.now(),
    });
    return this;
  }

  // Increase calories by percentage or amount
  enhanceCalories(amount, isPercentage = false) {
    if (isPercentage) {
      this.caloriesPerServing = Math.floor(this.caloriesPerServing * (1 + amount / 100));
    } else {
      this.caloriesPerServing += amount;
    }
    this.totalCalories = this.caloriesPerServing * this.servings;
    this.modifications.push({
      type: 'calorie_boost',
      amount: isPercentage ? `${amount}%` : amount,
      newTotal: this.caloriesPerServing,
      timestamp: Date.now(),
    });
    return this;
  }

  // Change taste
  changeTaste(newTaste) {
    this.tasteType = newTaste;
    this.modifications.push({
      type: 'taste_change',
      newTaste,
      timestamp: Date.now(),
    });
    return this;
  }

  // Change appearance
  changeAppearance(shape, color, texture) {
    this.shape = shape;
    this.color = color;
    this.texture = texture;
    this.modifications.push({
      type: 'appearance_change',
      newShape: shape,
      newColor: color,
      newTexture: texture,
      timestamp: Date.now(),
    });
    return this;
  }

  // Make food more appetizing
  makeAppetizing(amount = 20) {
    this.appetizingness = Math.min(100, this.appetizingness + amount);
    this.modifications.push({
      type: 'appetizing_enhancement',
      amount,
      newAppetizingness: this.appetizingness,
      timestamp: Date.now(),
    });
    return this;
  }

  // Enable self-replication
  enableReplication() {
    this.isReplicating = true;
    this.isMagical = true;
    this.modifications.push({
      type: 'replication_enabled',
      timestamp: Date.now(),
    });
    return this;
  }

  // Enable healing property
  enableHealing(healAmount = 10) {
    this.isHealing = true;
    this.isMagical = true;
    this.healingAmount = healAmount;
    this.modifications.push({
      type: 'healing_enabled',
      healAmount,
      timestamp: Date.now(),
    });
    return this;
  }

  // Increase servings (self-replication over time)
  replicate() {
    if (this.isReplicating) {
      this.servings += 1;
      this.totalCalories = this.caloriesPerServing * this.servings;
      return {
        success: true,
        message: `${this.name} has replicated! Now ${this.servings} servings.`,
      };
    }
    return {
      success: false,
      message: `${this.name} cannot replicate.`,
    };
  }

  // Convert calories to weight
  caloriesAsWeight() {
    // Rough conversion: 3500 calories = 1 lb
    return Math.floor(this.totalCalories / 3500);
  }

  // Get food info for display
  getInfo() {
    return {
      name: this.name,
      description: this.description,
      taste: this.tasteType,
      appearance: {
        color: this.color,
        shape: this.shape,
        texture: this.texture,
        appetizingness: this.appetizingness,
      },
      nutrition: {
        caloriesPerServing: this.caloriesPerServing,
        servings: this.servings,
        totalCalories: this.totalCalories,
        estimatedWeight: this.caloriesAsWeight(),
      },
      magical: {
        isMagical: this.isMagical,
        isReplicating: this.isReplicating,
        isHealing: this.isHealing,
        healingAmount: this.healingAmount,
      },
      modifications: this.modifications,
    };
  }

  // Get description for narrative
  getDescription() {
    const appetizing = this.appetizingness > 70 ? 'mouth-watering' : this.appetizingness > 40 ? 'appealing' : 'uninspiring';
    const magical = this.isMagical ? ' (shimmers with magical energy)' : '';
    return `A ${appetizing} ${this.shape} of ${this.color} ${this.name}${magical}. It smells ${this.tasteType}.`;
  }
}

// Specific food types

class Pastry extends Food {
  constructor(name = 'Pastry', options = {}) {
    super(name, {
      tasteType: 'sweet',
      caloriesPerServing: 250,
      texture: 'flaky',
      color: 'golden',
      shape: 'pastry',
      ...options,
    });
  }
}

class Bread extends Food {
  constructor(name = 'Bread', options = {}) {
    super(name, {
      tasteType: 'savory',
      caloriesPerServing: 150,
      texture: 'crusty',
      color: 'brown',
      shape: 'loaf',
      ...options,
    });
  }
}

class Meat extends Food {
  constructor(name = 'Meat', options = {}) {
    super(name, {
      tasteType: 'savory',
      caloriesPerServing: 300,
      texture: 'tender',
      color: 'red',
      shape: 'steak',
      ...options,
    });
  }
}

class Cream extends Food {
  constructor(name = 'Cream', options = {}) {
    super(name, {
      tasteType: 'sweet',
      caloriesPerServing: 200,
      texture: 'creamy',
      color: 'white',
      shape: 'dollop',
      appetizingness: 75,
      ...options,
    });
  }
}

class Pudding extends Food {
  constructor(name = 'Pudding', options = {}) {
    super(name, {
      tasteType: 'sweet',
      caloriesPerServing: 180,
      texture: 'smooth',
      color: 'brown',
      shape: 'bowl',
      appetizingness: 80,
      ...options,
    });
  }
}

class IceCream extends Food {
  constructor(name = 'Ice Cream', options = {}) {
    super(name, {
      tasteType: 'sweet',
      caloriesPerServing: 220,
      texture: 'creamy',
      color: 'pale',
      shape: 'scoop',
      appetizingness: 90,
      isMagical: true,
      ...options,
    });
  }
}

export { Food, Pastry, Bread, Meat, Cream, Pudding, IceCream };
