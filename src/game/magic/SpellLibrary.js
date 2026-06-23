import { Spell, SpellEffect, SpellOption } from './Spell.js';
import { calculateLivingCalories } from '../mechanics/NutritionSystem.js';

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
        .addValidTarget('npc')
        .addValidTarget('creature')
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
          'Conjure phantom food that feels and tastes real, providing sustenance but also disorientation. Eaten illusion-food becomes calories that settle after a long rest.',
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

              return {
                type: 'suggestion',
                targetChoosesFood: true,
                description: `${target.name} is open to eating, but the choice of food is still hers.`,
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

    // LEVEL 3 SPELLS

    // Erupting Earth - food erupts from ground, forces consumption
    this.registerSpell(
      new Spell('Erupting Earth', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '120 feet',
        duration: 'Instantaneous',
        description: 'The earth erupts with conjured food, creating abundance from stone and soil',
        weightGainTheme:
          'Magical soil transforms into sustenance with astounding caloric density. Creatures in the area are buried and forced to consume.',
        tags: ['transmutation', 'food', 'area-effect', 'forced-feeding'],
      })
        .addValidTarget('object')
        .addOption(
          new SpellOption('Vegetable Explosion', 'Light food eruption', (caster, target, context) => ({
            type: 'food_eruption',
            radiusMax: 15,
            foodItems: 12,
            caloriesPerItem: 300,
            consumptionRate: 0.5,
            resistanceModifier: -20,
            description: 'Vegetables and grains erupt from the earth in a gentle cascade!',
          }))
        )
        .addOption(
          new SpellOption('Grain Deluge', 'Standard eruption', (caster, target, context) => ({
            type: 'food_eruption',
            radiusMax: 18,
            foodItems: 18,
            caloriesPerItem: 400,
            consumptionRate: 0.5,
            resistanceModifier: -40,
            description: 'A torrential eruption of grain and feast-foods bursts from the ground!',
          }))
        )
        .addOption(
          new SpellOption('Luxury Eruption', 'Rich food eruption', (caster, target, context) => ({
            type: 'food_eruption',
            radiusMax: 20,
            foodItems: 10,
            caloriesPerItem: 500,
            consumptionRate: 0.6,
            resistanceModifier: -60,
            description: 'Incredibly rich and decadent foods explode from the earth in abundance!',
          }))
        )
        .addOption(
          (() => {
            const opt = new SpellOption('Bury', 'Bury a living target in food', (caster, target, context) => ({
              type: 'food_eruption',
              radiusMax: 10,
              foodItems: 20,
              caloriesPerItem: 400,
              consumptionRate: 0.7,
              resistanceModifier: -80,
              description: 'Food erupts directly around the target, burying them completely!',
            }));
            opt.requiresLivingTarget = true;
            return opt;
          })()
        )
        .addEffect(
          new SpellEffect('Earth Eruption', 'Food erupts from ground', (caster, target, context, selectedOption) => {
            const option = selectedOption || {
              foodItems: 15,
              caloriesPerItem: 400,
              consumptionRate: 0.5,
            };
            return {
              success: true,
              type: 'area_effect',
              effectsPerCreature: option.foodItems,
              weightGainPerCreature: Math.floor(option.caloriesPerItem * option.consumptionRate / 10),
              description: `Food erupts from the earth, covering everything in sight!`,
            };
          })
        )
    );

    // Hold Person - paralyze, force-feed
    this.registerSpell(
      new Spell('Hold Person', {
        level: 3,
        school: 'Enchantment',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'A humanoid is paralyzed by magical command',
        weightGainTheme:
          'The spell paralyzes movement but allows feeding. Held targets cannot resist consumption.',
        tags: ['enchantment', 'restraint', 'forced-feeding'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Gentle Restraint', 'Single target, partial resistance', (caster, target) => ({
            type: 'paralysis',
            targets: 1,
            canResist: true,
            willingness: 50,
            description: 'Target is held in place but retains some will',
          }))
        )
        .addOption(
          new SpellOption('Absolute Paralysis', 'Single target, no resistance', (caster, target) => ({
            type: 'paralysis',
            targets: 1,
            canResist: false,
            willingness: 0,
            description: 'Target is completely immobilized',
          }))
        )
        .addOption(
          new SpellOption('Mass Enthrallment', 'Up to 3 targets in radius', (caster, target) => ({
            type: 'paralysis',
            targets: 3,
            rangeRadius: 30,
            canResist: false,
            willingness: 0,
            description: 'Multiple targets are held in place',
          }))
        )
        .addEffect(
          new SpellEffect('Paralysis', 'Target is paralyzed', (caster, target, context, selectedOption) => ({
            success: true,
            type: 'paralysis_applied',
            targetCanMoveVoluntarily: false,
            canBeForced: true,
            willnessRemovedForFeeding: true,
            description: `${target.name || 'The target'} is frozen in place!`,
          }))
        )
    );

    // Fireball - roasting food, hunger compulsion
    this.registerSpell(
      new Spell('Fireball', {
        level: 3,
        school: 'Evocation',
        castingTime: '1 action',
        range: '150 feet',
        duration: 'Instantaneous',
        description: 'A bright streak flashes and blooms into roaring flame',
        weightGainTheme:
          'Magically roasted food emerges from the flames, perfectly seasoned and impossibly caloric. Creatures compelled to eat.',
        tags: ['evocation', 'food', 'area-effect', 'hunger-compulsion'],
      })
        .addOption(
          new SpellOption('Roasting Abundance', 'Small area roast', (caster, target) => ({
            type: 'food_roasting',
            areaRadius: 10,
            foodItems: 25,
            caloriesPerItem: 400,
            hungerCompulsion: 20,
            description: 'Medium area covered in roasted food',
          }))
        )
        .addOption(
          new SpellOption('Inferno Feast', 'Medium area roast', (caster, target) => ({
            type: 'food_roasting',
            areaRadius: 20,
            foodItems: 45,
            caloriesPerItem: 500,
            hungerCompulsion: 30,
            description: 'Large area blanketed in roasted abundance',
          }))
        )
        .addOption(
          new SpellOption('Cataclysm Spread', 'Large area roast', (caster, target) => ({
            type: 'food_roasting',
            areaRadius: 30,
            foodItems: 70,
            caloriesPerItem: 600,
            hungerCompulsion: 40,
            description: 'Massive area engulfed in roasted food',
          }))
        )
        .addEffect(
          new SpellEffect('Food Roasting', 'Roasted food appears', (caster, target, context, selectedOption) => {
            const option = selectedOption || {
              foodItems: 45,
              caloriesPerItem: 500,
              hungerCompulsion: 30,
            };
            return {
              success: true,
              type: 'area_effect',
              effectsPerCreature: option.foodItems,
              hungerDamage: option.hungerCompulsion,
              description: 'Roasted food emerges from the flames, smelling incredible!',
            };
          })
        )
    );

    // Create Food and Water - conjure food at scale
    this.registerSpell(
      new Spell('Create Food and Water', {
        level: 3,
        school: 'Conjuration',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Instantaneous',
        description: 'Conjure enough delicious food to feed up to 15 creatures',
        weightGainTheme:
          'Magical food shimmers into being with potent nutritional properties. High caloric density.',
        tags: ['conjuration', 'food', 'creation'],
      })
        .addValidTarget('object')
        .addOption(
          new SpellOption('Light Feast', '5 food items', (caster, target) => ({
            type: 'food_created',
            itemCount: 5,
            caloriesPerItem: 400,
            description: 'Basic sustenance materializes',
          }))
        )
        .addOption(
          new SpellOption('Hearty Spread', '10 food items', (caster, target) => ({
            type: 'food_created',
            itemCount: 10,
            caloriesPerItem: 500,
            description: 'Satisfying meal-worth of food appears',
          }))
        )
        .addOption(
          new SpellOption('Grand Banquet', '15 food items', (caster, target) => ({
            type: 'food_created',
            itemCount: 15,
            caloriesPerItem: 600,
            description: 'Opulent feast materializes before you',
          }))
        )
        .addEffect(
          new SpellEffect('Food Conjuration', 'Food is conjured', (caster, target, context, selectedOption) => {
            const option = selectedOption || { itemCount: 10, caloriesPerItem: 500 };
            return {
              success: true,
              type: 'food_created',
              itemCount: option.itemCount,
              totalCalories: option.itemCount * option.caloriesPerItem,
              description: 'Magical food shimmers into existence!',
            };
          })
        )
    );

    // Polymorph - transform to beast with appetite
    this.registerSpell(
      new Spell('Polymorph', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 1 hour',
        description: 'Transform a creature into a new form',
        weightGainTheme:
          'Target transforms into a larger beast form, gaining size, weight, and insatiable appetite.',
        tags: ['transmutation', 'transformation', 'shape-change'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Pig Form', 'Transform to pig', (caster, target) => ({
            type: 'beast_form',
            form: 'pig',
            weightGain: 50,
            willingnessModifier: 40,
            hungerPerRound: 20,
            description: 'Transform into a medium pig form',
          }))
        )
        .addOption(
          new SpellOption('Bear Form', 'Transform to bear', (caster, target) => ({
            type: 'beast_form',
            form: 'bear',
            weightGain: 100,
            willingnessModifier: 60,
            hungerPerRound: 30,
            description: 'Transform into a large bear form',
          }))
        )
        .addOption(
          new SpellOption('Cow Form', 'Transform to cow', (caster, target) => ({
            type: 'beast_form',
            form: 'cow',
            weightGain: 80,
            willingnessModifier: 50,
            hungerPerRound: 25,
            description: 'Transform into a sedentary cow form',
          }))
        )
        .addEffect(
          new SpellEffect('Beast Transformation', 'Transform into beast form', (caster, target, context, selectedOption) => {
            const option = selectedOption || {
              form: 'pig',
              weightGain: 50,
              willingnessModifier: 40,
            };
            return {
              success: true,
              type: 'transformation',
              newForm: option.form,
              weightChange: option.weightGain,
              willingnessModified: true,
              description: `${target.name || 'The target'} transforms into a ${option.form}!`,
            };
          })
        )
    );

    // Rapid Digestion - clear stomach, create fullness state
    this.registerSpell(
      new Spell('Rapid Digestion', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Instantaneous (fullness persists)',
        description: 'Accelerate target\'s digestive system',
        weightGainTheme:
          'Magical haste floods the GI tract. Food already eaten converts more efficiently during the next long rest. Creates satiation state.',
        tags: ['transmutation', 'digestion', 'weight-gain'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Quick Digestion', 'Process 1 stomach', (caster, target) => ({
            type: 'digestion_acceleration',
            stomachsCleared: 1,
            weightGain: 40,
            fullnessDuration: 5,
            description: 'Fast digestion completes',
          }))
        )
        .addOption(
          new SpellOption('Accelerated Metabolism', 'Process 2 stomachs', (caster, target) => ({
            type: 'digestion_acceleration',
            stomachsCleared: 2,
            weightGain: 80,
            fullnessDuration: 10,
            description: 'Rapid digestion processes multiple meals',
          }))
        )
        .addOption(
          new SpellOption('Digestive Frenzy', 'Process 3 stomachs', (caster, target) => ({
            type: 'digestion_acceleration',
            stomachsCleared: 3,
            weightGain: 120,
            fullnessDuration: 15,
            description: 'Extreme digestive overload',
          }))
        )
        .addEffect(
          new SpellEffect('Digestion', 'Rapid digestion occurs', (caster, target, context, selectedOption) => {
            const option = selectedOption || {
              weightGain: 80,
              fullnessDuration: 10,
            };
            if (target.isFullness === undefined) target.isFullness = false;
            target.isFullness = true;
            return {
              success: true,
              type: 'digestion',
              weightGain: option.weightGain,
              fullnessApplied: true,
              description: 'Rapid digestion prepares today\'s food to settle heavily during rest!',
            };
          })
        )
    );

    // Flesh to Food - transform creatures into food
    this.registerSpell(
      new Spell('Flesh to Food', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Instantaneous (permanent)',
        description: 'Transform living flesh into edible food',
        weightGainTheme:
          'Creatures transmute into pure culinary abundance. Living beings become sustenance ready for consumption.',
        tags: ['transmutation', 'conversion', 'food'],
      })
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Delicate Conversion', 'Light food conversion', (caster, target) => ({
            type: 'creature_to_food',
            portionCount: 5,
            caloriesPerPortion: 350,
            quality: 'high',
            description: 'Beast transforms into exquisite food portions',
          }))
        )
        .addOption(
          new SpellOption('Hearty Transformation', 'Standard conversion', (caster, target) => ({
            type: 'creature_to_food',
            portionCount: 10,
            caloriesPerPortion: 350,
            quality: 'standard',
            description: 'Beast transforms into food portions',
          }))
        )
        .addOption(
          new SpellOption('Complete Absorption', 'Maximum yield', (caster, target) => ({
            type: 'creature_to_food',
            portionCount: 15,
            caloriesPerPortion: 300,
            quality: 'variable',
            description: 'Complete transformation including all matter',
          }))
        )
        .addEffect(
          new SpellEffect('Transmutation', 'Creature becomes food', (caster, target, context, selectedOption) => {
            const option = selectedOption || {
              portionCount: 10,
              caloriesPerPortion: 350,
            };
            return {
              success: true,
              type: 'creature_transformed',
              portionCount: option.portionCount,
              totalCalories: option.portionCount * option.caloriesPerPortion,
              description: `${target.name || 'The creature'} transforms into food portions!`,
            };
          })
        )
    );

    // Haste (Metabolic) - eat faster, burn less
    this.registerSpell(
      new Spell('Haste', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'Target moves and acts with supernatural speed',
        weightGainTheme:
          'Eating and food consumption accelerates. Magical metabolism burns fewer calories, improving long-rest conversion.',
        tags: ['transmutation', 'speed', 'weight-gain'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Quick Consumption', 'Double eating speed', (caster, target) => ({
            type: 'metabolic_acceleration',
            eatingSpeedMultiplier: 2,
            caloriBurningRate: 0.5,
            weightGainPerRound: 15,
            description: 'Target eats twice as fast',
          }))
        )
        .addOption(
          new SpellOption('Frenzied Gorging', 'Triple eating speed', (caster, target) => ({
            type: 'metabolic_acceleration',
            eatingSpeedMultiplier: 3,
            caloriBurningRate: 0.3,
            weightGainPerRound: 25,
            description: 'Target eats in frenzy',
          }))
        )
        .addOption(
          new SpellOption('Metabolic Breakdown', 'Quadruple eating speed', (caster, target) => ({
            type: 'metabolic_acceleration',
            eatingSpeedMultiplier: 4,
            caloriBurningRate: 0.1,
            weightGainPerRound: 40,
            description: 'Target metabolism breaks down',
          }))
        )
        .addEffect(
          new SpellEffect('Acceleration', 'Metabolic haste applied', (caster, target, context, selectedOption) => {
            const option = selectedOption || {
              eatingSpeedMultiplier: 2,
              caloriBurningRate: 0.5,
              weightGainPerRound: 15,
            };
            return {
              success: true,
              type: 'haste_applied',
              eatingSpeedMultiplier: option.eatingSpeedMultiplier,
              caloriBurningRate: option.caloriBurningRate,
              description: 'Target moves and eats with supernatural speed!',
            };
          })
        )
    );

    // Duplication - copy objects/food
    this.registerSpell(
      new Spell('Duplication', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Permanent',
        description: 'Create perfect magical duplicates of objects',
        weightGainTheme:
          'Food items multiply. One plate becomes two, two become four. Create infinite food loops.',
        tags: ['transmutation', 'creation', 'duplication'],
      })
        .addValidTarget('object')
        .addOption(
          new SpellOption('Single Copy', 'Create 1 duplicate', (caster, target) => ({
            type: 'object_duplication',
            duplicateCount: 1,
            description: 'One duplicate is created',
          }))
        )
        .addOption(
          new SpellOption('Double Reflection', 'Create 2 duplicates', (caster, target) => ({
            type: 'object_duplication',
            duplicateCount: 2,
            description: 'Two duplicates materialize',
          }))
        )
        .addOption(
          new SpellOption('Triple Abundance', 'Create 3 duplicates', (caster, target) => ({
            type: 'object_duplication',
            duplicateCount: 3,
            description: 'Three duplicates appear',
          }))
        )
        .addEffect(
          new SpellEffect('Duplication', 'Objects are duplicated', (caster, target, context, selectedOption) => {
            const option = selectedOption || { duplicateCount: 2 };
            return {
              success: true,
              type: 'duplication',
              duplicateCount: option.duplicateCount,
              description: 'Perfect magical duplicates appear!',
            };
          })
        )
    );

    // Ravenous Expansion - double stomach capacity, ravenous appetite
    // Note: This spell supports upcasting (Levels 3-7)
    this.registerSpell(
      new Spell('Ravenous Expansion', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, 1 hour',
        description: 'Target\'s stomach swells with magical capacity and hunger',
        weightGainTheme:
          'Target becomes ravenous yet capable. Stomach capacity doubles, desperate hunger sets in. No satiation mechanics.',
        tags: ['transmutation', 'hunger', 'capacity'],
        supportedUpcasts: [3, 4, 5, 6, 7], // Can be upcast to Level 7
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Hungry Stretch', 'Basic expansion', (caster, target) => ({
            type: 'stomach_expansion',
            capacityMultiplier: 2,
            willingnessModifier: -30,
            duration: 3600, // 1 hour in seconds
            maxSwallowWeight: 2000, // Chicken
            description: 'Target\'s stomach swells with hunger',
          }))
        )
        .addOption(
          new SpellOption('Ravenous Void', 'Strong hunger', (caster, target) => ({
            type: 'stomach_expansion',
            capacityMultiplier: 2,
            willingnessModifier: -40,
            duration: 3600,
            maxSwallowWeight: 2000, // Chicken
            description: 'Target becomes ravenous',
          }))
        )
        .addOption(
          new SpellOption('Insatiable Belly', 'Extreme desperation', (caster, target) => ({
            type: 'stomach_expansion',
            capacityMultiplier: 2,
            willingnessModifier: -50,
            duration: 3600,
            maxSwallowWeight: 2000, // Chicken
            description: 'Target\'s belly screams for food',
          }))
        )
        .addEffect(
          new SpellEffect('Expansion', 'Stomach expands dramatically', (caster, target, context, selectedOption, spellLevel = 3) => {
            // Upcasting multipliers
            const upcasts = {
              3: { capacityMultiplier: 2, willingnessModifier: -40, maxSwallowWeight: 2000 }, // Chicken
              4: { capacityMultiplier: 3, willingnessModifier: -50, maxSwallowWeight: 8000 }, // Sheep
              5: { capacityMultiplier: 4, willingnessModifier: -60, maxSwallowWeight: 12000 }, // Pig
              6: { capacityMultiplier: 5, willingnessModifier: -70, maxSwallowWeight: 18000 }, // Cow
              7: { capacityMultiplier: 6, willingnessModifier: -80, maxSwallowWeight: 45000 }, // Elephant
            };
            const upcast = upcasts[spellLevel] || upcasts[3];
            return {
              success: true,
              type: 'stomach_expansion',
              capacityMultiplier: upcast.capacityMultiplier,
              willingnessModifier: upcast.willingnessModifier,
              maxSwallowableCreature: ['Unknown', 'Chicken', 'Sheep', 'Pig', 'Cow', 'Elephant', 'Elephant', 'Whale'][spellLevel] || 'Chicken',
              description: 'Target\'s stomach swells and hunger sets in!',
            };
          })
        )
    );

    // LEVEL 4 SPELLS

    // Culinary Transmutation - turn mundane objects into edible food
    this.registerSpell(
      new Spell('Culinary Transmutation', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Permanent',
        description: 'Transform a mundane object into edible food.',
        weightGainTheme:
          'Tables, barrels, chairs, and other objects become dense edible matter that can be offered, chosen, or used by feeding restraints.',
        tags: ['transmutation', 'food', 'object-conversion'],
      })
        .addValidTarget('object')
        .addOption(
          new SpellOption('Sweet Conversion', 'Turn the object into dessert', (caster, target) => ({
            type: 'object_to_food',
            foodName: 'Pudding',
            servings: 8,
            caloriesPerServing: 450,
            description: `${target?.name || 'The object'} softens into rich dessert portions.`,
          }))
        )
        .addOption(
          new SpellOption('Savory Conversion', 'Turn the object into hearty food', (caster, target) => ({
            type: 'object_to_food',
            foodName: 'Meat',
            servings: 10,
            caloriesPerServing: 500,
            description: `${target?.name || 'The object'} becomes warm, savory portions.`,
          }))
        )
        .addOption(
          new SpellOption('Creamy Conversion', 'Turn the object into cream or custard', (caster, target) => ({
            type: 'object_to_food',
            foodName: 'Cream',
            servings: 12,
            caloriesPerServing: 420,
            description: `${target?.name || 'The object'} melts into thick creamy food.`,
          }))
        )
        .addEffect(
          new SpellEffect('Object Conversion', 'Object becomes food', (caster, target) => ({
            type: 'object_to_food',
            foodName: 'Food',
            servings: 8,
            caloriesPerServing: 400,
            description: `${target?.name || 'The object'} becomes edible food.`,
          }))
        )
        .addInteraction(
          'Suggestion',
          'Targets can choose the transformed food from nearby options'
        )
        .addInteraction(
          'Confection Snare',
          'Forced-feeding bindings can use the transformed food as fuel'
        )
        .addInteraction(
          'Duplication',
          'Transformed food can be copied into a larger supply'
        )
    );

    // Summon Cattle - create heavy edible/targetable creatures
    this.registerSpell(
      new Spell('Summon Cattle', {
        level: 3,
        school: 'Conjuration',
        castingTime: '1 action',
        range: '60 feet',
        duration: '1 hour',
        description: 'Summon cattle into the current area.',
        weightGainTheme:
          'Creates large, heavy food-adjacent creatures that can be fed, enlarged, moved, converted, or used to overwhelm a room.',
        tags: ['conjuration', 'creature', 'food-source', 'gravity'],
      })
        .addOption(
          new SpellOption('One Cow', 'Summon one cow', () => ({
            type: 'summon_cattle',
            count: 1,
            baseWeight: 1200,
            description: 'A cow appears in the area.',
          }))
        )
        .addOption(
          new SpellOption('Small Herd', 'Summon three cattle', () => ({
            type: 'summon_cattle',
            count: 3,
            baseWeight: 1100,
            description: 'A small herd appears in the area.',
          }))
        )
        .addEffect(
          new SpellEffect('Cattle Summoning', 'Cattle appear', () => ({
            type: 'summon_cattle',
            count: 1,
            baseWeight: 1200,
            description: 'A cow appears in the area.',
          }))
        )
        .addInteraction(
          'Flesh to Food',
          'Summoned cattle can become a massive food source'
        )
        .addInteraction(
          'Ravenous Expansion',
          'Ravenous targets can handle larger prey-sized meals'
        )
        .addInteraction(
          'Enhance Gravity',
          'Summoned cattle become serious structural hazards under enhanced gravity'
        )
    );

    // Goodberry - compact portable food
    this.registerSpell(
      new Spell('Goodberry', {
        level: 1,
        school: 'Transmutation',
        castingTime: '1 action',
        range: 'Touch',
        duration: '24 hours',
        description: 'Create compact magical berries packed with nourishment.',
        weightGainTheme:
          'Small, easy-to-eat magical berries create a subtle feeding option that NPCs may choose when stronger food is absent.',
        tags: ['transmutation', 'food', 'healing', 'portable'],
      })
        .addEffect(
          new SpellEffect('Berry Creation', 'Goodberries appear', () => ({
            type: 'goodberry_created',
            count: 10,
            caloriesPerBerry: 180,
            description: 'A handful of magical goodberries appears.',
          }))
        )
        .addInteraction(
          'Suggestion',
          'Suggestion can make a target pick berries as a low-pressure option'
        )
    );

    // Plant Growth - zone-scale food production
    this.registerSpell(
      new Spell('Plant Growth', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Instantaneous',
        description: 'Cause nearby plants to burst into edible abundance.',
        weightGainTheme:
          'Turns gardens, taverns with stored produce, and fertile zones into heavy food supplies.',
        tags: ['transmutation', 'environmental', 'food', 'zone'],
      })
        .addEffect(
          new SpellEffect('Abundant Growth', 'Food-bearing plants surge', () => ({
            type: 'plant_growth_food',
            servings: 12,
            caloriesPerServing: 260,
            description: 'Nearby plants produce sudden edible abundance.',
          }))
        )
        .addInteraction(
          'Create Water',
          'Fresh water increases the yield of edible growth'
        )
        .addInteraction(
          'Ravenous Expansion',
          'Expanded appetite meets a sudden supply of produce'
        )
    );

    // Slow - D&D control spell adapted for metabolism and restraint setups
    this.registerSpell(
      new Spell('Slow', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'Slow a target physically and metabolically.',
        weightGainTheme:
          'The target moves sluggishly, resists less effectively, and burns fewer calories while eating.',
        tags: ['transmutation', 'control', 'metabolism', 'mobility'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addEffect(
          new SpellEffect('Slowing Field', 'Target slows down', (caster, target) => ({
            type: 'slow_applied',
            calorieRetentionMultiplier: 1.5,
            movementPenalty: 'slowed',
            description: `${target?.name || 'The target'} slows under heavy transmutation magic.`,
          }))
        )
        .addInteraction(
          'Confection Snare',
          'Slowed targets are easier for bindings to control'
        )
        .addInteraction(
          'Haste',
          'Opposes or creates unstable metabolism swings'
        )
        .addInteraction(
          'Suggestion',
          'Slowed metabolism makes chosen food settle heavier'
        )
    );

    // Confection Snare - licorice/candy vines for restraint and feeding
    this.registerSpell(
      new Spell('Confection Snare', {
        level: 4,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 1 hour (or until broken)',
        description: 'Conjure animated vines made of candy/licorice for restraint and feeding',
        weightGainTheme:
          'Sugary bonds wrap around targets. Both restraint and temptation. Integrates with gravity system for suspension mechanics.',
        tags: ['transmutation', 'restraint', 'feeding', 'gravity-dependent'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addValidTarget('object')
        .addOption(
          new SpellOption('Restraint Bonds', 'Wrap hands and feet', (caster, target) => ({
            type: 'restraint',
            bindPoint: ['hands', 'feet'],
            movementAllowed: 0,
            feedingPossible: true,
            description: 'Candy vines wrap around limbs',
          }))
        )
        .addOption(
          new SpellOption('Ceiling Suspension', 'Suspend from above', (caster, target, context) => {
            // Check gravity for failure
            const targetGravity = (target.currentWeight || target.baseWeight) * 0.1;
            const vineCapacity = 5; // gravity units
            return {
              type: 'suspension',
              suspensionState: 'ceiling',
              bindPoints: ['wrists', 'ankles', 'waist'],
              maxSupportedWeight: 500, // Fails at 500+ lbs
              movementAllowed: 0,
              feedingPossible: true,
              gravityCheck: targetGravity <= vineCapacity,
              description: 'Vines suspend target from above',
            };
          })
        )
        .addOption(
          new SpellOption('Forced Feeding Gullet', 'Force feed via vines', (caster, target) => ({
            type: 'forced_feeding',
            feedingMethod: 'gullet',
            weightGainPerRound: 30,
            canResist: false,
            description: 'Vines pump food directly down throat',
          }))
        )
        .addOption(
          new SpellOption('Mouth Suction', 'Pull objects into mouth', (caster, target) => ({
            type: 'mouth_suction',
            pullObjectsToMouth: true,
            autoConsumption: true,
            weightGainPerObject: 50,
            canResist: false,
            description: 'Vines pull food/objects into mouth',
          }))
        )
        .addOption(
          new SpellOption('Sticky Entanglement', 'Wrap entire body', (caster, target) => ({
            type: 'entanglement',
            bindPoints: ['entire_body'],
            movementPenalty: 'immobilized',
            feedingPossible: true,
            escapeAllowed: false,
            description: 'Vines wrap target completely',
          }))
        )
        .addEffect(
          new SpellEffect('Snare', 'Confection vines trap target', (caster, target, context, selectedOption) => {
            return {
              success: true,
              type: 'restraint_applied',
              vinesMaterial: 'candy/licorice',
              targetRestricted: true,
              description: 'Sugary vines animate and wrap around the target!',
            };
          })
        )
    );

    // Enhance Gravity - stacking gravity multiplier
    this.registerSpell(
      new Spell('Enhance Gravity', {
        level: 2,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 10 minutes',
        description: 'Multiply the force of gravity on one target. The effect stacks.',
        weightGainTheme:
          'The target becomes effectively heavier without changing mass. Suspensions, furniture, and burial effects all become more dangerous.',
        tags: ['transmutation', 'gravity', 'weight-force', 'stacking'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Heavy Pull', 'Double effective gravity', (caster, target) => ({
            type: 'gravity_enhanced',
            gravityMultiplier: 2,
            description: `${target?.name || 'The target'} is dragged harder toward the ground.`,
          }))
        )
        .addOption(
          new SpellOption('Crushing Pull', 'Triple effective gravity', (caster, target) => ({
            type: 'gravity_enhanced',
            gravityMultiplier: 3,
            description: `${target?.name || 'The target'} is hit by a crushing gravitational surge.`,
          }))
        )
        .addEffect(
          new SpellEffect('Gravity Increase', 'Gravity increases', (caster, target) => ({
            type: 'gravity_enhanced',
            gravityMultiplier: 2,
            description: `${target?.name || 'The target'} grows much heavier under altered gravity.`,
          }))
        )
        .addInteraction(
          'Confection Snare',
          'Can overload ceiling suspension until the bonds tear loose'
        )
        .addInteraction(
          'Telekinesis',
          'Can make tables and other supports fail after placement'
        )
        .addInteraction(
          'Shape Earth',
          'Buried targets sink deeper under multiplied gravity'
        )
    );

    // Telekinesis - move a target onto environmental surfaces
    this.registerSpell(
      new Spell('Telekinesis', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 10 minutes',
        description: 'Move a creature or NPC onto another surface or back to the floor.',
        weightGainTheme:
          'Position a target onto tables, stone benches, floors, or prepared objects, then let gravity determine whether the surface holds.',
        tags: ['transmutation', 'movement', 'gravity', 'positioning'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Move Onto Table', 'Place target on a table-like object', (caster, target) => ({
            type: 'telekinesis_move',
            destination: 'table',
            description: `${target?.name || 'The target'} is lifted and carried toward a table.`,
          }))
        )
        .addOption(
          new SpellOption('Move Onto Bar', 'Place target on a bar counter', (caster, target) => ({
            type: 'telekinesis_move',
            destination: 'bar',
            description: `${target?.name || 'The target'} is lifted and carried toward the bar.`,
          }))
        )
        .addOption(
          new SpellOption('Set On Stool', 'Balance target onto a stool', (caster, target) => ({
            type: 'telekinesis_move',
            destination: 'stool',
            description: `${target?.name || 'The target'} is lowered toward a narrow stool.`,
          }))
        )
        .addOption(
          new SpellOption('Move Onto Stone', 'Place target on a stone surface', (caster, target) => ({
            type: 'telekinesis_move',
            destination: 'stone',
            description: `${target?.name || 'The target'} is lifted and carried toward stone support.`,
          }))
        )
        .addOption(
          new SpellOption('Set On Floor', 'Place target on the floor', (caster, target) => ({
            type: 'telekinesis_move',
            destination: 'floor',
            description: `${target?.name || 'The target'} is lowered to the floor.`,
          }))
        )
        .addEffect(
          new SpellEffect('Telekinetic Movement', 'Target is moved', (caster, target) => ({
            type: 'telekinesis_move',
            destination: 'floor',
            description: `${target?.name || 'The target'} is moved by invisible force.`,
          }))
        )
        .addInteraction(
          'Enhance Gravity',
          'Moving a heavy-gravity target onto furniture can break it'
        )
        .addInteraction(
          'Float',
          'Low-gravity targets are easier to place precisely'
        )
    );

    // Float - reduce gravity until a target can drift upward
    this.registerSpell(
      new Spell('Float', {
        level: 2,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 10 minutes',
        description: 'Reduce the target\'s gravity, potentially making them float.',
        weightGainTheme:
          'The target becomes light enough for suspension, floor tethering, and gravity reversal tricks.',
        tags: ['transmutation', 'gravity', 'floating', 'mobility'],
      })
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addOption(
          new SpellOption('Lighten', 'Halve effective gravity', (caster, target) => ({
            type: 'gravity_reduced',
            gravityMultiplier: 0.5,
            floatThreshold: false,
            description: `${target?.name || 'The target'} becomes easier to lift.`,
          }))
        )
        .addOption(
          new SpellOption('Drift', 'Reduce gravity to a gentle drift', (caster, target) => ({
            type: 'gravity_reduced',
            gravityMultiplier: 0.2,
            floatThreshold: true,
            description: `${target?.name || 'The target'} begins to drift off the ground.`,
          }))
        )
        .addOption(
          new SpellOption('Near Weightless', 'Reduce gravity to almost nothing', (caster, target) => ({
            type: 'gravity_reduced',
            gravityMultiplier: 0.1,
            floatThreshold: true,
            description: `${target?.name || 'The target'} becomes nearly weightless.`,
          }))
        )
        .addEffect(
          new SpellEffect('Gravity Reduction', 'Gravity decreases', (caster, target) => ({
            type: 'gravity_reduced',
            gravityMultiplier: 0.5,
            floatThreshold: false,
            description: `${target?.name || 'The target'} becomes lighter under altered gravity.`,
          }))
        )
        .addInteraction(
          'Confection Snare',
          'Floating targets can be tied down to the floor'
        )
        .addInteraction(
          'Telekinesis',
          'Floating targets can be moved with less structural stress'
        )
        .addInteraction(
          'Enhance Gravity',
          'Can counteract or soften previous gravity enhancement'
        )
    );

    // Arcane Appraisal - magical inspection of structural support
    this.registerSpell(
      new Spell('Arcane Appraisal', {
        level: 1,
        school: 'Divination',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Instantaneous',
        description: 'Reveal how much weight a surface or object can support.',
        weightGainTheme:
          'Read the hidden limits of benches, tables, bars, stools, and other supports before they fail.',
        tags: ['divination', 'inspection', 'support', 'structure'],
      })
        .addValidTarget('object')
        .addValidTarget('npc')
        .addValidTarget('creature')
        .addEffect(
          new SpellEffect('Appraisal', 'Reveal structural support data', (caster, target) => ({
            type: 'structural_appraisal',
            description: `${target?.name || 'The target'} is examined by arcane sight.`,
          }))
        )
        .addInteraction(
          'Telekinesis',
          'Appraisal can identify surfaces that will fail if a target is placed there'
        )
        .addInteraction(
          'Enhance Gravity',
          'Appraisal shows when a support is already close to breaking'
        )
        .addInteraction(
          'Float',
          'Appraisal can judge whether floor tethering or weightlessness matters'
        )
    );

    // Sympathetic Bond - create calorie-sharing link between two entities
    this.registerSpell(
      new Spell('Sympathetic Bond', {
        level: 3,
        school: 'Enchantment',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Until dispelled',
        description: 'Form a mystical bond between two creatures, causing them to share a portion of their calorie intake at rest.',
        weightGainTheme: 'Two hearts beat as one, and their appetites entangle.',
        validTargets: ['npc', 'creature'],
        requiresSecondaryTarget: true,
        secondaryTargetType: 'npc',
        tags: ['enchantment', 'feeding', 'bond'],
      })
        .addOption(
          new SpellOption('Faint Echo', 'Share 25% of calorie intake', (caster, target, context) => ({
            type: 'sympathetic_bond',
            targetId: target.id,
            secondaryId: context.secondaryTarget?.id,
            share: 0.25,
          }))
        )
        .addOption(
          new SpellOption('Shared Indulgence', 'Share 40% of calorie intake', (caster, target, context) => ({
            type: 'sympathetic_bond',
            targetId: target.id,
            secondaryId: context.secondaryTarget?.id,
            share: 0.4,
          }))
        )
        .addOption(
          new SpellOption('Gluttonous Communion', 'Share 60% of calorie intake', (caster, target, context) => ({
            type: 'sympathetic_bond',
            targetId: target.id,
            secondaryId: context.secondaryTarget?.id,
            share: 0.6,
          }))
        )
        .addEffect(
          new SpellEffect('Bond Formation', 'Create sympathetic link', (caster, target, context) => ({
            type: 'sympathetic_bond',
            targetId: target.id,
            secondaryId: context.secondaryTarget?.id,
            share: 0.25,
          }))
        )
        .addInteraction('Suggestion', "Bonded creatures can influence each other's food choices")
        .addInteraction('Erupting Earth', "Bonded creatures share the burden of burial")
        .addInteraction('Confection Snare', "Bonded creatures can be restrained together")
        .addInteraction('Ravenous Expansion', "Bonded creatures amplify each other's hunger")
    );

    // Covetous Siphon - drain weight from one entity to another
    this.registerSpell(
      new Spell('Covetous Siphon', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Instantaneous',
        description: 'Drain weight from one creature and transfer it to another. The weight is drawn from current body weight.',
        weightGainTheme: 'Envious desire manifests as flesh migrating between bodies.',
        validTargets: ['npc', 'creature'],
        requiresSecondaryTarget: false,
        secondaryTargetType: 'entity',
        tags: ['transmutation', 'weight-gain', 'size'],
      })
        .addOption(
          new SpellOption('Skim', 'Transfer 20 lbs', (caster, target, context) => ({
            type: 'weight_siphon',
            sourceId: target.id,
            destination: context.secondaryTarget || caster,
            amount: 20,
            drainAccumulated: false,
          }))
        )
        .addOption(
          new SpellOption('Drain', 'Transfer 50 lbs', (caster, target, context) => ({
            type: 'weight_siphon',
            sourceId: target.id,
            destination: context.secondaryTarget || caster,
            amount: 50,
            drainAccumulated: false,
          }))
        )
        .addOption(
          new SpellOption('Ravenous Theft', 'Transfer all accumulated weight gain', (caster, target, context) => ({
            type: 'weight_siphon',
            sourceId: target.id,
            destination: context.secondaryTarget || caster,
            drainAccumulated: true,
          }))
        )
        .addEffect(
          new SpellEffect('Weight Transfer', 'Siphon weight', (caster, target, context) => ({
            type: 'weight_siphon',
            sourceId: target.id,
            destination: context.secondaryTarget || caster,
            amount: 20,
            drainAccumulated: false,
          }))
        )
        .addInteraction('Reduce Person', 'Siphoned targets shrink further')
        .addInteraction('Enlarge Person', 'Siphon destination benefits from additional mass')
        .addInteraction('Rapid Digestion', 'Siphoned entities digest quickly')
        .addInteraction('Enhance Gravity', 'Siphon destination becomes heavier')
    );

    // Draconic Hunger - summon a dragon's gullet and devour creatures
    this.registerSpell(
      new Spell('Draconic Hunger', {
        level: 4,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Instantaneous',
        description: "A target creature manifests a dragon's gullet and can devour another creature whole, gaining its living-calorie value.",
        weightGainTheme: 'The ancient hunger of dragons awakens in mortal flesh.',
        validTargets: ['npc', 'creature'],
        requiresSecondaryTarget: true,
        secondaryTargetType: 'creature',
        tags: ['transmutation', 'hunger', 'capacity', 'conversion'],
      })
        .addOption(
          new SpellOption('Gluttonous Maw', 'Expand stomach capacity (buff only)', (caster, target, context) => ({
            type: 'dragon_gullet',
            capacityMultiplier: 3,
          }))
        )
        .addOption(
          new SpellOption('Devour the Herd', 'Consume the secondary target creature', (caster, target, context) => ({
            type: 'devour_whole',
            creatureId: context.secondaryTarget?.id,
            creatureName: context.secondaryTarget?.name,
            calories: context.secondaryTarget ? calculateLivingCalories(context.secondaryTarget) : 0,
          }))
        )
        .addEffect(
          new SpellEffect('Dragon Manifestation', 'Manifest draconic hunger', (caster, target, context) => ({
            type: 'dragon_gullet',
            capacityMultiplier: 3,
          }))
        )
        .addInteraction('Summon Cattle', 'Summoned cattle become prey for draconic hunger')
        .addInteraction('Ravenous Expansion', 'Draconic hunger pairs with existing ravenous state')
        .addInteraction('Flesh to Food', 'Devoured creatures are processed differently')
        .addInteraction('Polymorph', 'Draconic forms gain additional appetite')
    );

    // Ambrosial Aura - zone-wide calorie aura for long rest
    this.registerSpell(
      new Spell('Ambrosial Aura', {
        level: 3,
        school: 'Conjuration',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Until long rest',
        description: 'An aura of magical nourishment fills the zone. Every occupant gains additional calories at the next long rest.',
        weightGainTheme: 'The air itself becomes rich with the essence of feast and plenty.',
        validTargets: [],
        requiresSecondaryTarget: false,
        secondaryTargetType: 'none',
        tags: ['conjuration', 'food', 'zone', 'feeding'],
      })
        .addOption(
          new SpellOption('Sweet Haze', '1200 calories per occupant', (caster, target, context) => ({
            type: 'zone_aura',
            calories: 1200,
            preservesFood: true,
          }))
        )
        .addOption(
          new SpellOption('Cloying Mist', '2400 calories per occupant', (caster, target, context) => ({
            type: 'zone_aura',
            calories: 2400,
            preservesFood: true,
          }))
        )
        .addOption(
          new SpellOption('Decadent Fog', '4000 calories per occupant', (caster, target, context) => ({
            type: 'zone_aura',
            calories: 4000,
            preservesFood: true,
          }))
        )
        .addEffect(
          new SpellEffect('Aura Creation', 'Create ambient calorie aura', (caster, target, context) => ({
            type: 'zone_aura',
            calories: 2400,
            preservesFood: true,
          }))
        )
        .addInteraction('Plant Growth', 'Aura enhances magical plant growth')
        .addInteraction('Create Food and Water', 'Aura stacks with conjured food')
    );

    // ═══════════════════════════════════════════════════════════════
    // P3.4 — THEMED SPELLS (immobility / stuffing / feeder / growth)
    // ═══════════════════════════════════════════════════════════════

    // Rooting Glut (immobility) - anchor a target in place under its own weight
    this.registerSpell(
      new Spell('Rooting Glut', {
        level: 2,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '30 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'Bind a target to the ground beneath its own gathering weight.',
        weightGainTheme:
          'The target settles where it stands, anchored and softening, too heavy and too rooted to rise.',
        validTargets: ['creature', 'npc'],
        tags: ['transmutation', 'immobility', 'weight-gain'],
      })
        .addOption(
          new SpellOption('Settle', 'Anchor lightly; the target can still shift', (caster, target) => ({
            type: 'rooting',
            tether: 'light',
            weightGainPerRound: 6,
            description: `${target.name} settles heavily in place.`,
          }))
        )
        .addOption(
          new SpellOption('Take Root', 'Anchor fully; the target cannot rise', (caster, target) => ({
            type: 'rooting',
            tether: 'full',
            weightGainPerRound: 12,
            description: `${target.name} takes root, too heavy and too anchored to stand.`,
          }))
        )
        .addEffect(
          new SpellEffect('Anchoring', 'Root the target in place', (caster, target) => ({
            type: 'rooting',
            tether: 'full',
            weightGainPerRound: 12,
            description: `${target.name} is rooted in place beneath gathering weight.`,
          }))
        )
    );

    // Bottomless Gullet (stuffing) - raise a target's capacity before satiation
    this.registerSpell(
      new Spell('Bottomless Gullet', {
        level: 2,
        school: 'Transmutation',
        castingTime: '1 action',
        range: 'Touch',
        duration: '10 minutes',
        description: 'Expand how much a target can take in before it feels full.',
        weightGainTheme:
          'Fullness retreats. A feast that should have ended becomes a marathon, every limit pushed further back.',
        validTargets: ['creature', 'npc'],
        tags: ['transmutation', 'stuffing', 'capacity', 'weight-gain'],
      })
        .addOption(
          new SpellOption('Widen', 'Double capacity before fullness', (caster, target) => ({
            type: 'capacity',
            capacityMultiplier: 2,
            description: `${target.name}'s capacity widens; fullness feels far away.`,
          }))
        )
        .addOption(
          new SpellOption('Hollow', 'Quadruple capacity; fullness barely registers', (caster, target) => ({
            type: 'capacity',
            capacityMultiplier: 4,
            description: `${target.name} becomes a near-bottomless gullet.`,
          }))
        )
        .addEffect(
          new SpellEffect('Capacity', 'Expand stomach capacity', (caster, target) => ({
            type: 'capacity',
            capacityMultiplier: 2,
            description: `${target.name} can take far more before feeling full.`,
          }))
        )
    );

    // Feeder's Devotion (feeder) - turn feeding into welcome care, raising willingness
    this.registerSpell(
      new Spell("Feeder's Devotion", {
        level: 1,
        school: 'Enchantment',
        castingTime: '1 action',
        range: '30 feet',
        duration: '1 hour',
        description: 'Make every offered bite land as care, raising a target\'s willingness to be fed.',
        weightGainTheme:
          'Feeding stops feeling like coercion and starts feeling like devotion. The target leans into it, wanting the next bite.',
        validTargets: ['creature', 'npc'],
        tags: ['enchantment', 'feeder', 'relationship', 'feeding'],
      })
        .addOption(
          new SpellOption('Warmth', 'Raise willingness by 20', (caster, target) => {
            if (target && target.willingness !== undefined) {
              target.willingness = Math.min(100, target.willingness + 20);
            }
            return {
              type: 'devotion',
              willingnessGain: 20,
              description: `${target.name} warms to the feeding, leaning in for more.`,
            };
          })
        )
        .addOption(
          new SpellOption('Adoration', 'Raise willingness by 40', (caster, target) => {
            if (target && target.willingness !== undefined) {
              target.willingness = Math.min(100, target.willingness + 40);
            }
            return {
              type: 'devotion',
              willingnessGain: 40,
              description: `${target.name} adores being fed, wanting nothing else.`,
            };
          })
        )
        .addEffect(
          new SpellEffect('Devotion', 'Raise willingness to be fed', (caster, target) => {
            if (target && target.willingness !== undefined) {
              target.willingness = Math.min(100, target.willingness + 20);
            }
            return {
              type: 'devotion',
              willingnessGain: 20,
              description: `${target.name} welcomes the feeding.`,
            };
          })
        )
    );

    // Swelling Tide (magical growth) - slow runaway growth that builds over a feast
    this.registerSpell(
      new Spell('Swelling Tide', {
        level: 3,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'Start a slow, mounting swell that compounds as the target keeps eating.',
        weightGainTheme:
          'Growth arrives like a tide — slow at first, then mounting, each wave of indulgence swelling the target a little further than the last.',
        validTargets: ['creature', 'npc'],
        tags: ['transmutation', 'growth', 'weight-gain'],
      })
        .addOption(
          new SpellOption('Rising', 'Gentle mounting swell', (caster, target) => ({
            type: 'swelling_tide',
            weightGainPerRound: 8,
            compounding: true,
            description: `${target.name} begins to swell in slow, mounting waves.`,
          }))
        )
        .addOption(
          new SpellOption('Surge', 'Steep runaway swell', (caster, target) => ({
            type: 'swelling_tide',
            weightGainPerRound: 18,
            compounding: true,
            description: `${target.name} surges outward, each wave larger than the last.`,
          }))
        )
        .addEffect(
          new SpellEffect('Tide', 'Begin a mounting swell', (caster, target) => ({
            type: 'swelling_tide',
            weightGainPerRound: 8,
            compounding: true,
            description: `${target.name} swells in mounting waves.`,
          }))
        )
    );

    // Imbue Life - animate inert matter: coatings feed themselves in, stone rises as golems
    this.registerSpell(
      new Spell('Imbue Life', {
        level: 4,
        school: 'Transmutation',
        castingTime: '1 action',
        range: '60 feet',
        duration: 'Concentration, up to 1 minute',
        description: 'Breathe crude life into inert matter — a coating that feeds itself in, or stone that rises to serve.',
        weightGainTheme:
          'Animated ooze creeps over its host and pours itself into her mouth; shaped stone stands up as a patient little feeder.',
        validTargets: ['creature', 'npc', 'object'],
        tags: ['transmutation', 'animation', 'feeding'],
      })
        .addOption(
          new SpellOption('Animate Coating', 'Bring a target\'s ooze coating to life so it feeds itself in', (caster, target) => ({
            type: 'animate_coating',
            potency: 1,
            description: `The coating on ${target.name} stirs and begins to feed itself into her.`,
          }))
        )
        .addOption(
          new SpellOption('Gorging Coating', 'A stronger animation; the coating pours in greedily', (caster, target) => ({
            type: 'animate_coating',
            potency: 2,
            description: `The coating on ${target.name} surges to life and pours itself down her throat.`,
          }))
        )
        .addOption(
          new SpellOption('Stone Golem', 'Animate nearby stone into one small feeder golem', () => ({
            type: 'animate_golem',
            count: 1,
            baseWeight: 200,
            description: 'A small stone golem grinds upright, ready to feed whoever it is pointed at.',
          }))
        )
        .addOption(
          new SpellOption('Golem Trio', 'Animate three small feeder golems', () => ({
            type: 'animate_golem',
            count: 3,
            baseWeight: 180,
            description: 'Three squat stone golems rise from the rubble.',
          }))
        )
        .addEffect(
          new SpellEffect('Animation', 'Animate a coating to feed itself in', (caster, target) => ({
            type: 'animate_coating',
            potency: 1,
            description: `Inert matter around ${target.name} stirs with crude life.`,
          }))
        )
    );
  }
}

export default SpellLibrary;
