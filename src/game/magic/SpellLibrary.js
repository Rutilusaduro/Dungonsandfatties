import { Spell, SpellEffect, SpellOption } from './Spell.js';

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
          'Magical haste floods the GI tract. Pending food instantly becomes permanent weight. Creates satiation state.',
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
              description: 'Rapid digestion processes food instantly into weight!',
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
          'Eating and food consumption accelerates 2x. Magical metabolism only burns 50% of calories. Net rapid weight gain.',
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
              suspensionType: 'ceiling',
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
  }
}

export default SpellLibrary;
