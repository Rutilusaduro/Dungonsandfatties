/**
 * Zone System
 * Individual zones/areas containing environmental objects, creatures, and NPCs
 */

class Zone {
  constructor(id, name, options = {}) {
    this.id = id;
    this.name = name;
    this.description = options.description || '';
    this.theme = options.theme || 'generic'; // 'forest', 'dungeon', 'town', 'tavern', etc.
    this.difficulty = options.difficulty || 'low'; // 'low', 'medium', 'high', 'deadly'

    // Zone contents
    this.environmentalObjects = new Map(); // id -> EnvironmentalObject
    this.creatures = new Map(); // id -> Creature
    this.npcs = new Map(); // id -> NPC

    // Zone rules/properties
    this.features = options.features || []; // 'dark', 'slippery', 'trapped', etc.
    this.isIndoors = options.isIndoors || false;
    this.weather = options.weather || 'clear';
    this.lightLevel = options.lightLevel || 'bright'; // 'dark', 'dim', 'bright'

    // Spell interactions - which spells work well here
    this.spellAffinity = options.spellAffinity || [];

    // Zone state
    this.explored = false;
    this.discovered = false;
    this.timeOfDay = options.timeOfDay || 'day';

    // Connections to other zones
    this.exits = options.exits || {}; // direction -> zone_id
  }

  // Add environmental object
  addEnvironmentalObject(object) {
    this.environmentalObjects.set(object.id, object);
    return this;
  }

  // Add creature
  addCreature(creature) {
    this.creatures.set(creature.id, creature);
    return this;
  }

  // Add NPC
  addNPC(npc) {
    this.npcs.set(npc.id, npc);
    return this;
  }

  // Remove entities
  removeCreature(creatureId) {
    this.creatures.delete(creatureId);
    return this;
  }

  removeNPC(npcId) {
    this.npcs.delete(npcId);
    return this;
  }

  // Get all entities in zone
  getEnvironmentalObjects() {
    return Array.from(this.environmentalObjects.values());
  }

  getCreatures() {
    return Array.from(this.creatures.values());
  }

  getNPCs() {
    return Array.from(this.npcs.values());
  }

  // Get specific entity
  getEntityById(id) {
    return (
      this.environmentalObjects.get(id) || this.creatures.get(id) || this.npcs.get(id) || null
    );
  }

  // Get entities by name
  getEntitiesByName(name) {
    const results = [];

    for (const obj of this.getEnvironmentalObjects()) {
      if (obj.name.toLowerCase().includes(name.toLowerCase())) {
        results.push(obj);
      }
    }

    for (const creature of this.getCreatures()) {
      if (creature.name.toLowerCase().includes(name.toLowerCase())) {
        results.push(creature);
      }
    }

    for (const npc of this.getNPCs()) {
      if (npc.name.toLowerCase().includes(name.toLowerCase())) {
        results.push(npc);
      }
    }

    return results;
  }

  // Update creature hunger
  updateCreatures() {
    const updates = [];
    for (const creature of this.getCreatures()) {
      creature.incrementHunger(2);
      updates.push({
        creature: creature.name,
        hungerLevel: creature.hungerLevel,
      });
    }
    return updates;
  }

  // Get zone description for display
  getDescription() {
    return `
${this.name}
${this.description}

Weather: ${this.weather}
Light: ${this.lightLevel}
Time: ${this.timeOfDay}

Features: ${this.features.length > 0 ? this.features.join(', ') : 'None notable'}
    `;
  }

  // Get zone status (all entities)
  getStatus() {
    return {
      zone: this.name,
      theme: this.theme,
      difficulty: this.difficulty,
      environmentalObjects: this.getEnvironmentalObjects().length,
      creatures: this.getCreatures().length,
      npcs: this.getNPCs().length,
      explored: this.explored,
      discovered: this.discovered,
    };
  }

  // Mark as explored/discovered
  explore() {
    this.explored = true;
    this.discovered = true;
    return this;
  }

  // Add spell affinity (spells that work well here)
  addSpellAffinity(spellName) {
    if (!this.spellAffinity.includes(spellName)) {
      this.spellAffinity.push(spellName);
    }
    return this;
  }

  // Add exit to another zone
  addExit(direction, zoneId) {
    this.exits[direction] = zoneId;
    return this;
  }

  // Get available exits
  getExits() {
    return Object.keys(this.exits);
  }
}

export default Zone;
