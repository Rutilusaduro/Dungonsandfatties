import { Spell, SpellEffect } from './Spell';

/**
 * Spell Library
 * Collection of weight-gain themed spells adapted from D&D
 */

class SpellLibrary {
  constructor() {
    this.spells = new Map();
    this.registerDefaultSpells();
  }

  registerSpell(spell) {
    this.spells.set(spell.name, spell);
    return this;
  }

  getSpell(name) {
    return this.spells.get(name);
  }

  getAllSpells() {
    return Array.from(this.spells.values());
  }

  getSpellsByLevel(level) {
    return this.getAllSpells().filter(s => s.level === level);
  }

  getSpellsBySchool(school) {
    return this.getAllSpells().filter(s => s.school === school);
  }

  getSpellsByTag(tag) {
    return this.getAllSpells().filter(s => s.tags.includes(tag));
  }

  registerDefaultSpells() {
    // CANTRIPS / LEVEL 0

    // Prestidigitation - minor magical tricks
    this.registerSpell(
      new Spell('Prestidigitation', {
        level: 0,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '10 feet',
        duration: '1 hour',
        description: 'Perform minor magical effects',
        weightGainTheme: 'Create minor food effects - cooling warm food, heating cold drinks, flavoring meals',
        tags: ['utility', 'flavor'],
      })
        .addEffect(
          new SpellEffect('Minor Effect', 'Perform a minor magical trick', (caster, target) => ({
            type: 'minor_effect',
            description: 'A small magical effect is created',
          }))
        )
    );

    // LEVEL 1

    // Enlarge/Reduce - adapted for weight gain
    this.registerSpell(
      new Spell('Enlarge Person', {
        level: 1,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'One creature doubles in size',
        weightGainTheme:
          'Target grows larger - the spell adds weight, muscle, and presence. They feel heavier, stronger, more imposing.',
        tags: ['transformation', 'size', 'weight-gain-adjacent'],
      })
        .addEffect(
          new SpellEffect('Size Increase', 'Target grows to twice their size', (caster, target) => ({
            type: 'size_change',
            multiplier: 2,
            healthBonus: Math.floor(target.maxHealth * 0.5),
            weightGain: target.baseWeight * 0.5,
            description: `${target.name} swells to twice their normal size!`,
          }))
        )
        .addInteraction(
          'Reduce Person',
          'Casting Reduce Person on an enlarged target shrinks them dramatically'
        )
    );

    // Reduce Person - opposite of Enlarge
    this.registerSpell(
      new Spell('Reduce Person', {
        level: 1,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'One creature halves in size',
        weightGainTheme:
          'Target shrinks to half size - they lose weight and feel lighter. A cruel reversal of growth magic.',
        tags: ['transformation', 'size'],
      })
        .addEffect(
          new SpellEffect('Size Decrease', 'Target shrinks to half their size', (caster, target) => ({
            type: 'size_change',
            multiplier: 0.5,
            healthLoss: Math.floor(target.maxHealth * 0.25),
            weightLoss: target.baseWeight * 0.25,
            description: `${target.name} shrinks to half their size!`,
          }))
        )
        .addInteraction(
          'Enlarge Person',
          'Reduces an enlarged target to tiny proportions'
        )
    );

    // Shape Earth - manipulate earth
    this.registerSpell(
      new Spell('Shape Earth', {
        level: 1,
        school: 'Transmutation',
        castingTime: '1 action',
        range: 'Touch',
        duration: 'Instantaneous',
        description: 'Shape earth and stone into desired forms',
        weightGainTheme:
          'Create feeding areas, basins for liquids, seats of stone for comfort. Build structures that encourage indulgence.',
        tags: ['environmental', 'creation', 'shaping'],
      })
        .addEnvironmentalEffect('earth', 'Reshape earth', (obj, caster, context) => ({
          type: 'reshaped',
          previousForm: obj.form,
          newForm: 'Magically shaped stone',
          description: `${obj.name} has been magically reshaped by ${caster.name}`,
        }))
        .addInteraction(
          'Create Water',
          'Combined with Create Water to make a stone basin filled with liquid'
        )
    );

    // Shape Wood - manipulate wood
    this.registerSpell(
      new Spell('Shape Wood', {
        level: 1,
        school: 'Transmutation',
        castingTime: '1 action',
        range: 'Touch',
        duration: 'Instantaneous',
        description: 'Shape wooden objects into desired forms',
        weightGainTheme:
          'Create wooden chairs, tables, restraints, or feeding stations. Shape wood into tools of indulgence.',
        tags: ['environmental', 'creation', 'shaping'],
      })
        .addEnvironmentalEffect('wood', 'Reshape wood', (obj, caster, context) => ({
          type: 'reshaped',
          previousForm: obj.form,
          newForm: 'Magically shaped wood',
          description: `${obj.name} has been magically reshaped by ${caster.name}`,
        }))
        .addInteraction(
          'Shape Earth',
          'Together create elaborate structures combining stone and wood'
        )
    );

    // Create Water
    this.registerSpell(
      new Spell('Create Water', {
        level: 1,
        school: 'Conjuration',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Instantaneous',
        description: 'Create up to 10 gallons of water',
        weightGainTheme: 'Conjure water, milk, honey, or other liquids for sustenance and pleasure',
        tags: ['conjuration', 'creation', 'sustenance'],
      })
        .addEffect(
          new SpellEffect('Water Creation', 'Create liquid', (caster, target) => ({
            type: 'creation',
            substance: 'water',
            volume: 10,
            unit: 'gallons',
            description: 'Fresh water materializes from thin air',
          }))
        )
        .addInteraction(
          'Shape Earth',
          'Use Shape Earth to create a basin, then fill it with Create Water'
        )
    );

    // LEVEL 2

    // Melf's Acid Arrow - adapted as "Oozing Abundance"
    this.registerSpell(
      new Spell('Oozing Abundance', {
        level: 2,
        school: 'Evocation',
        castingTime: '1 action',
        range: '90 feet',
        duration: 'Instantaneous',
        description: 'An arrow of thick, nutritious ooze strikes a target',
        weightGainTheme:
          'Fire an arrow of condensed food essence that covers the target in thick, calorie-rich sludge. Feeds as it damages.',
        tags: ['ranged', 'feeding', 'transmutation'],
      })
        .addEffect(
          new SpellEffect('Acid Impact', 'Arrow of ooze hits and coats target', (caster, target) => ({
            type: 'damage_and_feed',
            damage: 4,
            calorieTransfer: 50,
            weightGain: 2,
            description: `${target.name} is struck by a gooey arrow of condensed nutrition!`,
          }))
        )
        .addInteraction(
          'Shape Earth',
          'Create channels in earth for the ooze to flow through'
        )
    );

    // Feast of Shadows - create illusory food
    this.registerSpell(
      new Spell('Feast of Shadows', {
        level: 2,
        school: 'Illusion',
        castingTime: '1 minute',
        range: '30 feet',
        duration: '1 hour',
        description: 'Create illusory food that sustains creatures',
        weightGainTheme:
          'Conjure phantom food that feels and tastes real, providing sustenance but also disorientation. Targets gain weight from "eating".',
        tags: ['illusion', 'feeding', 'trickery'],
      })
        .addEffect(
          new SpellEffect('Illusory Feast', 'Create phantom food', (caster, target) => ({
            type: 'feeding',
            feedingType: 'illusory',
            satiation: 75,
            weightGain: 3,
            disorientation: true,
            description: `A phantom feast materializes before ${target.name}. The food looks, smells, and tastes real...`,
          }))
        )
        .addInteraction(
          'True Seeing',
          'Reveals the food as illusions, but those who already ate are still affected'
        )
    );

    // Morph Mass - combine bodies (dark spell)
    this.registerSpell(
      new Spell('Morph Mass', {
        level: 2,
        school: 'Transmutation',
        castingTime: '1 action',
        range: 'Touch',
        duration: 'Permanent',
        description: 'Merge target with earth, stone, or matter around them',
        weightGainTheme:
          'The spell causes a target to absorb material from their surroundings - earth, stone, or organic matter clings to them, weighing them down.',
        tags: ['transformation', 'dark', 'weight-gain'],
      })
        .addEffect(
          new SpellEffect('Mass Absorption', 'Target absorbs surrounding matter', (caster, target) => ({
            type: 'weight_gain',
            amountGained: 10,
            description: `${target.name} absorbs matter from around them, growing heavier!`,
          }))
        )
        .addEnvironmentalEffect('earth', 'Earth merges with target', (obj, caster) => ({
          type: 'absorbed',
          description: `The ${obj.name} is partially absorbed into the target's body`,
        }))
    );

    // LEVEL 1 (continued)

    // Grease - create slippery substance
    this.registerSpell(
      new Spell('Grease', {
        level: 1,
        school: 'Conjuration',
        castingTime: '1 action',
        range: '60 feet',
        duration: '1 minute',
        description: 'Create a slippery, greasy substance',
        weightGainTheme:
          'Conjure sticky, slippery grease to coat surfaces or create a basin. The grease is thick and calorie-rich, perfect for coating food or creating a feeding area.',
        tags: ['conjuration', 'environmental', 'feeding'],
      })
        .addEffect(
          new SpellEffect('Grease Creation', 'Create greasy substance', (caster, target) => ({
            type: 'grease_creation',
            volume: 'covers 10x10 feet',
            description: 'A thick, slippery coating of grease appears',
          }))
        )
        .addEnvironmentalEffect('earth', 'Create grease basin', (obj, caster) => ({
          type: 'grease_basin',
          description: `The ${obj.name} is coated with slippery grease, forming a basin perfect for pooling liquids`,
        }))
        .addInteraction(
          'Create Water',
          'Water poured onto grease creates a slippery puddle perfect for sliding... or pooling calories'
        )
    );

    // Liquid to Ice Cream - transmute water into ice cream
    this.registerSpell(
      new Spell('Delightful Transmutation', {
        level: 2,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Permanent',
        description: 'Transform water into magical ice cream',
        weightGainTheme:
          'Transmute plain water into delicious, high-calorie ice cream. The spell can modify the flavor, and the ice cream gains magical properties - it never melts and can provide unlimited sustenance.',
        tags: ['transmutation', 'food', 'magical', 'feeding'],
      })
        .addEffect(
          new SpellEffect('Water Transmutation', 'Transform water to ice cream', (caster, target) => ({
            type: 'food_creation',
            foodType: 'Ice Cream',
            calorieMult: 2,
            description: 'Water shimmers and solidifies into magical ice cream!',
          }))
        )
        .addEnvironmentalEffect('water', 'Transmute water to ice cream', (obj, caster) => ({
          type: 'transmuted_food',
          from: 'water',
          to: 'ice cream',
          calorieContent: 'Very High',
          magical: true,
          selfReplicating: true,
          description: `The ${obj.name} transforms into magical ice cream that never melts and continuously replicates!`,
        }))
        .addInteraction(
          'Create Water',
          'Create Water followed by this spell creates unlimited magical ice cream'
        )
    );
  }
}

export default SpellLibrary;
