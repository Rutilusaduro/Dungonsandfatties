import { Spell, SpellEffect, SpellOption } from './Spell';

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

    // Enlarge Person - adapted for weight gain
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
        tags: ['transformation', 'size', 'weight-gain'],
      })
        .addValidTarget('creature')
        .addValidTarget('npc')
        .addEffect(
          new SpellEffect('Size Increase', 'Target grows to twice their size', (caster, target) => {
            const weightGain = target.baseWeight * 0.5;
            return {
              type: 'size_change',
              multiplier: 2,
              healthBonus: Math.floor(target.maxHealth * 0.5),
              weightChange: weightGain,
              description: `${target.name} swells to twice their normal size, gaining ${Math.floor(weightGain)} lbs!`,
            };
          })
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

    // Shape Earth - manipulate earth and stone with options
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
        .addValidTarget('object')
        .addOption(
          new SpellOption('Create Basin', 'Shape into a basin for holding liquids',
            (caster, target, context) => {
              if (target && target.properties) {
                target.properties.capacity = 100;
                target.properties.canHoldLiquid = true;
              }
              return {
                type: 'object_transformation',
                newForm: 'stone basin',
                description: `The earth/stone reshapes into a perfect basin for holding liquids!`,
              };
            }
          )
        )
        .addOption(
          new SpellOption('Create Seat', 'Shape into a comfortable stone seat',
            (caster, target, context) => ({
              type: 'object_transformation',
              newForm: 'comfortable stone seat',
              description: `The earth rises and shapes into a comfortable seat for dining!`,
            })
          )
        )
        .addOption(
          new SpellOption('Create Pedestal', 'Shape into a tall pedestal or table',
            (caster, target, context) => {
              if (target && target.properties) {
                target.properties.capacity = 50;
                target.properties.maxFoodItems = 8;
              }
              return {
                type: 'object_transformation',
                newForm: 'stone pedestal table',
                description: `The earth rises into a perfect stone table for displaying food!`,
                foodCapacity: 8,
              };
            }
          )
        )
        .addOption(
          new SpellOption('Bury Target', 'Bury a living target under stone',
            (caster, target, context) => {
              // This only works on creatures/NPCs, not objects
              if (target && (target.behavior !== undefined || target.role)) {
                return {
                  type: 'entrapment',
                  description: `${target.name} is rapidly buried under hardened earth!`,
                  trapped: true,
                };
              }
              return {
                type: 'error',
                description: 'This form only works on living creatures!',
              };
            }
          )
        )
        .addEnvironmentalEffect('earth', 'Reshape earth', (obj, caster, context, selectedOption) => {
          if (selectedOption) {
            return {
              type: 'reshaped',
              previousForm: obj.form,
              newForm: selectedOption.name,
              description: `${obj.name} has been shaped into a ${selectedOption.name}!`,
            };
          }
          return {
            type: 'reshaped',
            previousForm: obj.form,
            newForm: 'Magically shaped stone',
            description: `${obj.name} has been magically reshaped`,
          };
        })
        .addInteraction(
          'Create Water',
          'Combined with Create Water to make a stone basin filled with liquid'
        )
    );

    // Shape Wood - manipulate wood with options
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
        .addValidTarget('object')
        .addOption(
          new SpellOption('Enlarge & Reinforce', 'Make the table larger and more sturdy to hold more food',
            (caster, target, context) => {
              if (target && target.properties) {
                target.properties.capacity = (target.properties.capacity || 1) * 1.5;
                target.properties.maxFoodItems = (target.properties.maxFoodItems || 5) + 5;
              }
              return {
                type: 'object_enhancement',
                description: `${target ? target.name : 'The wood'} grows larger and more sturdy!`,
                foodCapacity: target?.properties?.maxFoodItems || 10,
              };
            }
          )
        )
        .addOption(
          new SpellOption('Create Manacles', 'Shape the wood into restraints',
            (caster, target, context) => ({
              type: 'object_transformation',
              newForm: 'wooden manacles',
              description: `The wood transforms into sturdy restraints!`,
            })
          )
        )
        .addOption(
          new SpellOption('Create Chair', 'Shape into a comfortable feeding chair',
            (caster, target, context) => ({
              type: 'object_transformation',
              newForm: 'comfortable wooden chair',
              description: `The wood reshapes into a sturdy chair, perfect for sitting and eating!`,
            })
          )
        )
        .addOption(
          new SpellOption('Create Feeding Trough', 'Shape into a trough for animals',
            (caster, target, context) => ({
              type: 'object_transformation',
              newForm: 'wooden feeding trough',
              description: `The wood becomes a large trough, perfect for feeding creatures!`,
            })
          )
        )
        .addEnvironmentalEffect('wood', 'Reshape wood', (obj, caster, context, selectedOption) => {
          if (selectedOption) {
            return {
              type: 'reshaped',
              previousForm: obj.form,
              newForm: selectedOption.name,
              description: `${obj.name} has been shaped into a ${selectedOption.name}!`,
            };
          }
          return {
            type: 'reshaped',
            previousForm: obj.form,
            newForm: 'Magically shaped wood',
            description: `${obj.name} has been magically reshaped`,
          };
        })
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

    // LEVEL 1 (continued)

    // Suggestion - make an NPC eat food
    this.registerSpell(
      new Spell('Suggestion', {
        level: 1,
        school: 'Enchantment',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Instantaneous',
        description: 'Gently persuade a creature to eat food',
        weightGainTheme:
          'Magically encourage an NPC to consume food. The more willing they are naturally, the easier the spell. They gain weight from eating and appreciate your generosity.',
        tags: ['enchantment', 'feeding', 'social'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption(
            'Gentle Persuasion',
            'Kindly suggest they eat something nearby',
            (caster, target, context) => {
              if (!target) return { type: 'error', description: 'No target selected' };

              // Check willingness (if NPC)
              const willingness = target.willingness || 50;
              const success = willingness > 30; // Moderate willingness needed

              if (!success) {
                return {
                  type: 'persuasion_failed',
                  description: `${target.name} politely declines. She doesn't seem interested in eating right now.`,
                };
              }

              // Success - they eat and gain weight
              const weightGain = 5;
              if (target.gainWeight) {
                target.gainWeight(weightGain);
              } else if (target.currentWeight !== undefined) {
                target.currentWeight += weightGain;
              }

              // Build reputation
              if (target.modifyReputation) {
                target.modifyReputation(10);
              }

              return {
                type: 'feeding_success',
                weightGain: weightGain,
                description: `${target.name} smiles and eats some food. She gains ${weightGain} lbs and seems pleased with your generosity.`,
              };
            }
          )
        )
        .addEffect(
          new SpellEffect('Persuasion', 'Suggest eating to target', (caster, target) => ({
            type: 'suggestion',
            description: `${target.name} seems momentarily tempted by the suggestion...`,
          }))
        )
    );

    // Detect Cravings - reveal food preferences
    this.registerSpell(
      new Spell('Detect Cravings', {
        level: 1,
        school: 'Divination',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Instantaneous',
        description: 'Sense what foods an NPC craves',
        weightGainTheme:
          'Magically perceive what foods an NPC loves, likes, and dislikes. Use this knowledge to encourage feeding.',
        tags: ['divination', 'knowledge', 'feeding'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addEffect(
          new SpellEffect('Craving Detection', 'Reveal food preferences', (caster, target) => {
            if (!target) return { type: 'error', description: 'No target' };

            const loves = target.foodLoves || [];
            const likes = target.foodLikes || [];
            const dislikes = target.foodDislikes || [];

            let description = `You sense ${target.name}'s cravings:\n`;
            if (loves.length > 0) {
              description += `💜 LOVES: ${loves.join(', ')}\n`;
            }
            if (likes.length > 0) {
              description += `💚 LIKES: ${likes.join(', ')}\n`;
            }
            if (dislikes.length > 0) {
              description += `❌ DISLIKES: ${dislikes.join(', ')}`;
            }

            // Mark that we've revealed their cravings
            if (target.cravinessRevealed !== undefined) {
              target.cravinessRevealed = true;
            }

            return {
              type: 'knowledge_gained',
              description: description,
              loves: loves,
              likes: likes,
              dislikes: dislikes,
            };
          })
        )
    );

    // Conjure Food - create food items to place
    this.registerSpell(
      new Spell('Conjure Food', {
        level: 2,
        school: 'Conjuration',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Permanent',
        description: 'Conjure food items to place in the world',
        weightGainTheme:
          'Magically create delicious food items. Choose the type to match an NPC\'s preferences for maximum effectiveness.',
        tags: ['conjuration', 'food', 'creation'],
      })
        .addValidTarget('object')
        .addOption(
          new SpellOption('Conjure Pastries', 'Create sweet pastries', (caster, target) => ({
            type: 'food_conjured',
            food: 'Pastry',
            calories: 250,
            description: 'Golden pastries materialize in a shimmer of magic!',
          }))
        )
        .addOption(
          new SpellOption('Conjure Meat', 'Create hearty meat portions', (caster, target) => ({
            type: 'food_conjured',
            food: 'Meat',
            calories: 300,
            description: 'Savory meat portions appear with an appetizing aroma!',
          }))
        )
        .addOption(
          new SpellOption('Conjure Bread', 'Create fresh bread', (caster, target) => ({
            type: 'food_conjured',
            food: 'Bread',
            calories: 150,
            description: 'Warm, fresh bread materializes, still steaming!',
          }))
        )
        .addOption(
          new SpellOption('Conjure Cream', 'Create rich cream', (caster, target) => ({
            type: 'food_conjured',
            food: 'Cream',
            calories: 200,
            description: 'A generous dollop of rich, creamy substance appears!',
          }))
        )
        .addOption(
          new SpellOption('Conjure Pudding', 'Create smooth pudding', (caster, target) => ({
            type: 'food_conjured',
            food: 'Pudding',
            calories: 180,
            description: 'A bowl of smooth, delicious pudding appears!',
          }))
        )
        .addOption(
          new SpellOption('Conjure Ice Cream', 'Create magical ice cream', (caster, target) => ({
            type: 'food_conjured',
            food: 'IceCream',
            calories: 220,
            magical: true,
            description: 'A scoop of magical ice cream materializes, never to melt!',
          }))
        )
        .addEffect(
          new SpellEffect('Food Creation', 'Conjure food items', (caster, target) => ({
            type: 'food_created',
            description: 'Magical food shimmers into existence!',
          }))
        )
    );
  }
}

export default SpellLibrary;
