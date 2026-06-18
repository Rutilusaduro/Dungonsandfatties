/**
 * Environmental Objects
 * Objects in zones that can be affected by spells and interactions
 */

class EnvironmentalObject {
  constructor(id, name, type, options = {}) {
    this.id = id;
    this.name = name;
    this.type = type; // 'earth', 'wood', 'water', 'stone', etc.
    this.description = options.description || '';
    this.form = options.form || 'Natural';
    this.material = options.material || type;
    this.durability = options.durability || 100; // Max durability
    this.currentDurability = this.durability;
    this.canBeInteractedWith = options.canBeInteractedWith !== false;
    this.affectedBy = options.affectedBy || []; // List of spell names that can affect this
    this.state = options.state || 'intact';
    this.properties = options.properties || {};
  }

  // Get information about the object
  getInfo() {
    const info = {
      id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      form: this.form,
      state: this.state,
      durability: {
        current: this.currentDurability,
        max: this.durability,
        percentage: (this.currentDurability / this.durability) * 100,
      },
      affectedBy: this.affectedBy,
    };

    // Add properties if they exist
    if (this.properties && Object.keys(this.properties).length > 0) {
      info.properties = this.properties;
    }

    return info;
  }

  // Take damage or change state
  damage(amount) {
    this.currentDurability = Math.max(0, this.currentDurability - amount);
    if (this.currentDurability === 0) {
      this.state = 'destroyed';
    } else if (this.currentDurability < this.durability * 0.25) {
      this.state = 'heavily_damaged';
    } else if (this.currentDurability < this.durability * 0.5) {
      this.state = 'damaged';
    }
    return this.currentDurability;
  }

  // Change form (via spells like Shape Earth)
  reshape(newForm) {
    this.form = newForm;
    this.state = 'reshaped';
    return {
      success: true,
      message: `${this.name} has been reshaped to: ${newForm}`,
    };
  }

  // Check if a spell affects this object
  isAffectedBy(spellName) {
    return this.affectedBy.includes(spellName);
  }

  // Add a spell that can affect this
  addAffectingSpell(spellName) {
    if (!this.affectedBy.includes(spellName)) {
      this.affectedBy.push(spellName);
    }
  }
}

// Specific types of environmental objects

class Stone extends EnvironmentalObject {
  constructor(id, name, options = {}) {
    super(id, name, 'stone', {
      durability: 150,
      description: 'A large stone',
      affectedBy: ['Shape Earth'],
      ...options,
    });
  }
}

class Wood extends EnvironmentalObject {
  constructor(id, name, options = {}) {
    super(id, name, 'wood', {
      durability: 80,
      description: 'A wooden object',
      affectedBy: ['Shape Wood'],
      ...options,
    });
  }
}

class Water extends EnvironmentalObject {
  constructor(id, name, options = {}) {
    super(id, name, 'water', {
      durability: 50,
      description: 'A body of water',
      affectedBy: ['Create Water', 'Freeze Water'],
      ...options,
    });
  }
}

class Earth extends EnvironmentalObject {
  constructor(id, name, options = {}) {
    super(id, name, 'earth', {
      durability: 100,
      description: 'Packed earth',
      affectedBy: ['Shape Earth'],
      ...options,
    });
  }
}

class Furniture extends EnvironmentalObject {
  constructor(id, name, options = {}) {
    super(id, name, 'furniture', {
      durability: 100,
      description: 'A piece of furniture',
      affectedBy: ['Shape Wood', 'Enlarge Person', 'Reduce Person'],
      ...options,
    });
  }
}

export { EnvironmentalObject, Stone, Wood, Water, Earth, Furniture };
