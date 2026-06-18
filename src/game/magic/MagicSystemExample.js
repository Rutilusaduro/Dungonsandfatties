/**
 * Magic System Example
 * Demonstrates spell interactions, environmental effects, and the robust magic system
 */

import SpellLibrary from './SpellLibrary';
import World from '../world/World';
import Character from '../Character';

/**
 * EXAMPLE 1: Basic Spell Casting
 * Cast Enlarge Person on a creature
 */
export function exampleBasicSpellCasting() {
  const library = new SpellLibrary();
  const spell = library.getSpell('Enlarge Person');

  const caster = new Character('Wizard Thaddeus', {
    class: 'Wizard',
    strength: 8,
    dexterity: 14,
    intelligence: 16,
  });

  const world = World.createSampleWorld();
  const tavern = world.getCurrentZone();
  const targets = tavern.getCreatures();

  if (targets.length > 0) {
    const result = spell.cast(caster, targets[0], {
      environmentalObjects: tavern.getEnvironmentalObjects(),
    });

    return {
      title: 'Basic Spell Casting',
      description: 'Casting Enlarge Person on a creature',
      result,
    };
  }
}

/**
 * EXAMPLE 2: Environmental Interaction
 * Shape Earth spell affects stone in the garden
 */
export function exampleEnvironmentalInteraction() {
  const library = new SpellLibrary();
  const shapeEarthSpell = library.getSpell('Shape Earth');

  const caster = new Character('Druid Elara', {
    class: 'Druid',
    wisdom: 16,
    constitution: 14,
  });

  const world = World.createSampleWorld();
  world.setCurrentZone('garden');
  const garden = world.getCurrentZone();

  const result = shapeEarthSpell.cast(caster, null, {
    environmentalObjects: garden.getEnvironmentalObjects(),
  });

  return {
    title: 'Environmental Interaction',
    description: 'Shaping earth in the garden to create a basin',
    result,
  };
}

/**
 * EXAMPLE 3: Spell Combination
 * Create a basin with Shape Earth, then fill with Create Water
 * This demonstrates spell interactions
 */
export function exampleSpellCombination() {
  const library = new SpellLibrary();
  const shapeEarthSpell = library.getSpell('Shape Earth');
  const createWaterSpell = library.getSpell('Create Water');

  const caster = new Character('Mage Lysander', {
    class: 'Mage',
    intelligence: 16,
  });

  const world = World.createSampleWorld();
  world.setCurrentZone('garden');
  const garden = world.getCurrentZone();

  // First spell: Shape Earth to create a basin
  const basinCreation = shapeEarthSpell.cast(caster, null, {
    environmentalObjects: garden.getEnvironmentalObjects(),
  });

  // Second spell: Create Water with previous spell context
  const fillBasin = createWaterSpell.cast(caster, null, {
    environmentalObjects: garden.getEnvironmentalObjects(),
    previousSpells: [shapeEarthSpell],
  });

  return {
    title: 'Spell Combination',
    description: 'Using Shape Earth and Create Water together to create a feeding basin',
    steps: [
      {
        step: 1,
        spell: 'Shape Earth',
        result: basinCreation,
      },
      {
        step: 2,
        spell: 'Create Water',
        result: fillBasin,
        interaction: fillBasin.interactions,
      },
    ],
  };
}

/**
 * EXAMPLE 4: Feeding Sequence
 * Use spells to create food, then feed creatures and NPCs
 */
export function exampleFeedingSequence() {
  const library = new SpellLibrary();
  const feastSpell = library.getSpell('Feast of Shadows');

  const caster = new Character('Enchanter Morgana', {
    class: 'Enchanter',
    charisma: 16,
    intelligence: 15,
  });

  const world = World.createSampleWorld();
  world.setCurrentZone('tavern');
  const tavern = world.getCurrentZone();

  // Cast Feast of Shadows
  const creatures = tavern.getCreatures();
  const npcs = tavern.getNPCs();

  const feastResult = feastSpell.cast(caster, creatures[0] || npcs[0], {
    environmentalObjects: tavern.getEnvironmentalObjects(),
  });

  // Simulate feeding
  const feedingResults = [];
  for (const npc of npcs) {
    feedingResults.push(npc.feed('Illusory Feast', 100, 2));
  }

  return {
    title: 'Feeding Sequence',
    description: 'Using magic to create food and feed NPCs, increasing their weight',
    spellCast: feastResult,
    feedingResults,
  };
}

/**
 * EXAMPLE 5: Zone Exploration
 * Explore different zones and see their entities and available spells
 */
export function exampleZoneExploration() {
  const world = World.createSampleWorld();
  const zones = world.getAllZones();

  const exploration = zones.map(zone => ({
    name: zone.name,
    theme: zone.theme,
    difficulty: zone.difficulty,
    description: zone.description,
    entities: {
      objects: zone.getEnvironmentalObjects().length,
      creatures: zone.getCreatures().length,
      npcs: zone.getNPCs().length,
    },
    spellAffinities: zone.spellAffinity,
    exits: Object.keys(zone.exits),
  }));

  return {
    title: 'Zone Exploration',
    description: 'Map of available zones and their contents',
    zones: exploration,
  };
}

/**
 * EXAMPLE 6: NPC Interaction
 * Interact with NPCs through dialogue and gifts
 */
export function exampleNPCInteraction() {
  const world = World.createSampleWorld();
  world.setCurrentZone('tavern');
  const tavern = world.getCurrentZone();
  const innkeeper = tavern.getNPCs()[0];

  const interactions = [];

  // Get greeting
  interactions.push({
    action: 'Greet',
    response: innkeeper.getDialogue('greeting'),
  });

  // Offer food
  interactions.push({
    action: 'Offer Food',
    response: innkeeper.nextDialogue('offer_food'),
    repChange: innkeeper.modifyReputation(10),
  });

  // Feed innkeeper
  interactions.push({
    action: 'Feed Hearty Meal',
    result: innkeeper.feed('Hearty Meal', 200, 3),
  });

  return {
    title: 'NPC Interaction',
    description: 'Dialogue and feeding interactions with NPCs',
    npc: innkeeper.name,
    interactions,
  };
}

/**
 * EXAMPLE 7: Weight Gain Tracking
 * Track how spells and feeding affect weight changes
 */
export function exampleWeightGainTracking() {
  const world = World.createSampleWorld();
  world.setCurrentZone('garden');
  const garden = world.getCurrentZone();

  const initialStates = [];
  const finalStates = [];

  // Record initial weights
  for (const creature of garden.getCreatures()) {
    initialStates.push({
      name: creature.name,
      weight: creature.currentWeight,
      accumulated: creature.weightGainAccumulated,
    });
  }

  // Apply spell and feeding
  const library = new SpellLibrary();
  const enlargeSpell = library.getSpell('Enlarge Person');
  const caster = new Character('Growth Mage', { intelligence: 16 });

  if (garden.getCreatures().length > 0) {
    const target = garden.getCreatures()[0];
    enlargeSpell.cast(caster, target, {
      environmentalObjects: garden.getEnvironmentalObjects(),
    });

    // Apply weight gain from spell
    target.gainWeight(50);
  }

  // Record final weights
  for (const creature of garden.getCreatures()) {
    finalStates.push({
      name: creature.name,
      weight: creature.currentWeight,
      accumulated: creature.weightGainAccumulated,
    });
  }

  return {
    title: 'Weight Gain Tracking',
    description: 'Tracking weight changes from spells and interactions',
    before: initialStates,
    after: finalStates,
  };
}

/**
 * Run all examples
 */
export function runAllExamples() {
  return {
    example1: exampleBasicSpellCasting(),
    example2: exampleEnvironmentalInteraction(),
    example3: exampleSpellCombination(),
    example4: exampleFeedingSequence(),
    example5: exampleZoneExploration(),
    example6: exampleNPCInteraction(),
    example7: exampleWeightGainTracking(),
  };
}
