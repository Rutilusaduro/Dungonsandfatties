/**
 * Spell Resolver
 * Builds connected spell context and normalizes cast results into shared state.
 */

import { Food, Pastry, Bread, Meat, Cream, Pudding, IceCream } from '../items/Food.js';
import { Cow } from '../entities/Creature.js';
import GravityCalculator from '../mechanics/GravitySystem.js';
import {
  CALORIES_PER_POUND,
  applyBodyWeightChange,
  calculateLivingCalories,
  estimatePendingWeightGain,
  recordCalorieConsumption,
} from '../mechanics/NutritionSystem.js';

const FOOD_TYPES = {
  Pastry,
  Bread,
  Meat,
  Cream,
  Pudding,
  IceCream,
  'Ice Cream': IceCream,
};

const SPELL_KEY_TO_NAME = {
  create_water: 'Create Water',
  shape_earth: 'Shape Earth',
  shape_wood: 'Shape Wood',
  delightful_transmutation: 'Delightful Transmutation',
  enlarge_person: 'Enlarge Person',
  reduce_person: 'Reduce Person',
  feast_of_shadows: 'Feast of Shadows',
  morph_mass: 'Morph Mass',
  grease: 'Grease',
  erupting_earth: 'Erupting Earth',
  hold_person: 'Hold Person',
  rapid_digestion: 'Rapid Digestion',
  ravenous_expansion: 'Ravenous Expansion',
  confection_snare: 'Confection Snare',
  conjure_food: 'Conjure Food',
  create_food_and_water: 'Create Food and Water',
  duplication: 'Duplication',
  fireball: 'Fireball',
  enhance_gravity: 'Enhance Gravity',
  telekinesis: 'Telekinesis',
  float: 'Float',
  culinary_transmutation: 'Culinary Transmutation',
  summon_cattle: 'Summon Cattle',
  goodberry: 'Goodberry',
  plant_growth: 'Plant Growth',
  slow: 'Slow',
};

const gravity = new GravityCalculator();
const IMMEDIATE_BODY_EFFECT_TYPES = new Set([
  'size_change',
  'beast_form',
  'transformation',
  'weight_gain',
]);

const CALORIE_ONLY_EFFECT_TYPES = new Set([
  'forced_feeding',
  'mouth_suction',
  'metabolic_acceleration',
  'haste_applied',
  'stomach_expansion',
  'digestion_acceleration',
  'digestion',
]);

const FOOD_CREATION_EFFECT_TYPES = new Set([
  'food_conjured',
  'food_created',
  'transmuted_food',
  'food_creation',
  'food_eruption',
  'food_roasting',
  'object_to_food',
  'goodberry_created',
  'plant_growth_food',
  'creature_to_food',
  'creature_transformed',
]);

function normalizeSpellName(value) {
  if (!value) return null;
  if (value.name) return value.name;
  if (SPELL_KEY_TO_NAME[value]) return SPELL_KEY_TO_NAME[value];
  return value
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function createFood(foodName, options = {}) {
  const FoodClass = FOOD_TYPES[foodName] || Food;
  const displayName = foodName === 'IceCream' ? 'Ice Cream' : foodName;
  return new FoodClass(displayName, options);
}

function isLivingTarget(target) {
  return !!target && (
    target.role ||
    target.personality ||
    target.behavior !== undefined ||
    target.class_ ||
    typeof target.consumeCalories === 'function'
  );
}

function immediateWeightChangeFromEffect(effect) {
  if (!effect || !IMMEDIATE_BODY_EFFECT_TYPES.has(effect.type)) return 0;
  if (effect.weightLoss) return -Math.abs(effect.weightLoss);
  return effect.weightChange || effect.weightGain || effect.amountGained || 0;
}

function deferredCaloriesFromEffect(effect) {
  if (!effect || IMMEDIATE_BODY_EFFECT_TYPES.has(effect.type)) return 0;
  if (CALORIE_ONLY_EFFECT_TYPES.has(effect.type)) return 0;
  if (FOOD_CREATION_EFFECT_TYPES.has(effect.type)) return 0;
  if (effect.calories) return effect.calories;
  if (effect.calorieTransfer) return Math.max(effect.calorieTransfer, (effect.weightGain || 0) * CALORIES_PER_POUND);
  if (effect.weightGain) return effect.weightGain * CALORIES_PER_POUND;
  if (effect.weightGainPerCreature) return effect.weightGainPerCreature * CALORIES_PER_POUND;
  if (effect.weightGainPerRound) return effect.weightGainPerRound * CALORIES_PER_POUND;
  if (effect.weightGainPerObject) return effect.weightGainPerObject * CALORIES_PER_POUND;
  return 0;
}

class SpellResolver {
  static describeFoodDelivery(target, spellName, result) {
    if (!target?.isFloating) return;

    const anchored = !!target.floorTethered;
    target.lastFoodDeliveryMode = anchored ? 'floating_tethered' : 'floating_free';
    result.environmentalChanges.push({
      type: 'floating_food_delivery',
      description: anchored
        ? `${target.name} is still buoyant under reduced gravity, so nearby food has to be guided upward toward her against the floor tether.`
        : `${target.name} drifts under reduced gravity while nearby food is guided up through the air toward her.`,
    });

    SpellResolver.addInteraction(
      result,
      'Float',
      spellName === 'Suggestion'
        ? 'spell.interaction.float.suggestion_food'
        : 'spell.interaction.float.confection_snare_food',
      spellName === 'Suggestion'
        ? 'Floating changes the way the chosen food reaches the target.'
        : 'Floating changes the way nearby food is pulled into the feeding effect.',
    );
  }

  static buildContext({ zone, target, spell }) {
    const targetSpellNames = (target?.spellAffects || [])
      .map(normalizeSpellName)
      .filter(Boolean);
    const zoneSpellNames = (zone?.getRecentSpells?.() || [])
      .map(entry => entry.name)
      .filter(Boolean);

    const previousSpells = [...new Set([...targetSpellNames, ...zoneSpellNames])]
      .filter(name => name !== spell.name)
      .map(name => ({ name }));

    return {
      environmentalObjects: zone?.getEnvironmentalObjects?.() || [],
      creatures: zone?.getCreatures?.() || [],
      npcs: zone?.getNPCs?.() || [],
      foods: zone?.getFoods?.() || [],
      previousSpells,
      modifiers: SpellResolver.resolveModifiers({ zone, target, spell }),
    };
  }

  static resolveModifiers({ zone, target, spell }) {
    const zoneAffinity = !!zone?.spellAffinity?.includes(spell.name);
    const objectCompatible = !!target?.isAffectedBy?.(spell.name);
    const targetConditions = target?.conditions?.keys?.() || [];
    const recentSpellNames = (target?.spellAffects || []).map(normalizeSpellName).filter(Boolean);

    const modifiers = [];

    if (zoneAffinity) {
      modifiers.push({
        type: 'zone_affinity',
        label: `${zone.name} amplifies ${spell.name}`,
        effectMultiplier: 1.25,
      });
    }

    if (objectCompatible) {
      modifiers.push({
        type: 'object_compatibility',
        label: `${target.name} is naturally receptive to ${spell.name}`,
      });
    }

    if (targetConditions.length > 0) {
      modifiers.push({
        type: 'condition_interaction',
        label: `${target.name}'s active conditions shape the spell response`,
        conditions: targetConditions,
      });
    }

    if (recentSpellNames.length > 0) {
      modifiers.push({
        type: 'recent_spell_memory',
        label: `${target.name} carries traces of ${recentSpellNames.join(', ')}`,
        recentSpells: recentSpellNames,
      });
    }

    return modifiers;
  }

  static cast({ spell, caster, target, zone, selectedOption }) {
    const context = SpellResolver.buildContext({ zone, target, spell });
    const result = spell.cast(caster, target, context, selectedOption);

    if (!result.success) return { result, context, createdFoods: [], appliedModifiers: [] };

    const createdFoods = SpellResolver.applyResultToWorld({
      result,
      context,
      spell,
      target,
      zone,
      selectedOption,
    });

    zone?.recordSpellCast?.(spell, target, result);

    return {
      result: {
        ...result,
        appliedModifiers: context.modifiers,
        createdFoods,
      },
      context,
      createdFoods,
      appliedModifiers: context.modifiers,
    };
  }

  static applyResultToWorld({ result, context, spell, target, zone, selectedOption }) {
    const createdFoods = [];
    const effects = [...(result.effects || []), ...(result.environmentalChanges || [])];

    for (const effect of effects) {
      SpellResolver.applyWeightGain(effect, target, context.modifiers, result, spell);
      SpellResolver.applyGravityEffect({ effect, result, target, zone });
      SpellResolver.applySuggestionEating({ effect, result, target, zone });
      SpellResolver.applyWorldCreationEffect({ effect, result, target, zone, createdFoods });
      SpellResolver.applyForcedFeedingEffect({ effect, result, target, zone });
      const foods = SpellResolver.foodsFromEffect(effect, spell, selectedOption);

      for (const food of foods) {
        zone?.addFood?.(food, spell.name);
        createdFoods.push(food);
      }
    }

    SpellResolver.applyComboEffects({ result, context, spell, target, zone, createdFoods });
    SpellResolver.applyGravityConsequences({ result, spell, target, zone, selectedOption });
    return createdFoods;
  }

  static applyGravityEffect({ effect, result, target, zone }) {
    if (!target) return;

    if (effect.type === 'gravity_enhanced') {
      const multiplier = gravity.multiplyGravity(target, effect.gravityMultiplier || 2);
      target.floatOverride = false;
      target.isFloating = false;
      target.floorTethered = false;
      target.conditions?.remove?.('floating');
      target.conditions?.remove?.('gravity_reduced');
      target.conditions?.add?.('gravity_enhanced', { multiplier });
      result.environmentalChanges.push({
        type: 'gravity_state',
        description: `${target.name}'s effective gravity is now x${multiplier.toFixed(2)}.`,
      });
    }

    if (effect.type === 'gravity_reduced') {
      const multiplier = gravity.reduceGravity(target, effect.gravityMultiplier || 0.5);
      target.floatOverride = !!effect.floatThreshold;
      const effectiveGravity = gravity.updateEntityGravity(target);
      target.isFloating = !!effect.floatThreshold || effectiveGravity <= 0.5;
      if (target.isFloating) {
        target.suspensionState = target.floorTethered ? 'floor_tethered' : 'floating';
        target.conditions?.add?.('floating', { height: 'low' });
      }
      target.conditions?.remove?.('gravity_enhanced');
      target.conditions?.add?.('gravity_reduced', { multiplier });
      result.environmentalChanges.push({
        type: 'gravity_state',
        description: `${target.name}'s effective gravity is now x${multiplier.toFixed(2)}.`,
      });
    }

    if (effect.type === 'telekinesis_move') {
      const placement = SpellResolver.resolveTelekineticPlacement(target, zone, effect.destination);
      target.positionedOn = placement.surface ? placement.surface.id : placement.destination;
      target.suspensionState = placement.destination === 'floor' ? 'none' : target.suspensionState;
      target.floatOverride = false;
      target.isFloating = false;
      target.floorTethered = false;
      target.conditions?.remove?.('floating');
      target.conditions?.remove?.('floor_tethered');

      result.environmentalChanges.push({
        type: 'telekinesis_position',
        description: placement.description,
      });

      if (placement.surface) {
        const failure = gravity.checkStructuralFailure(placement.surface, target);
        if (failure.failed) {
          placement.surface.state = 'broken';
          placement.surface.currentDurability = 0;
          target.positionedOn = 'floor';
          result.environmentalChanges.push({
            type: 'structure_failure',
            description: `${placement.surface.name} breaks under ${target.name}'s effective weight. ${target.name} drops to the floor.`,
          });
          SpellResolver.addInteraction(result,
            'Telekinesis',
            'spell.interaction.telekinesis.table_break',
            'Telekinesis places the target onto a surface that cannot support her effective weight.',
          );
        }
      }
    }

    if (effect.type === 'suspension') {
      target.restrainedBy = 'confection_snare';
      target.suspensionState = effect.suspensionState || 'ceiling';
      target.conditions?.add?.('restrained', {
        source: 'confection_snare',
        material: 'candy',
        suspension: target.suspensionState,
      });
    }

    if (effect.type === 'restraint' || effect.type === 'entanglement') {
      target.restrainedBy = 'confection_snare';
      target.conditions?.add?.('restrained', {
        source: 'confection_snare',
        material: 'candy',
      });

      if (target.isFloating) {
        target.floorTethered = true;
        target.suspensionState = 'floor_tethered';
        target.conditions?.add?.('floor_tethered', { source: 'confection_snare' });
        result.environmentalChanges.push({
          type: 'floor_tethered',
          description: `${target.name} is tied down to the floor while her reduced gravity tries to lift her.`,
        });
        SpellResolver.addInteraction(result,
          'Float',
          'spell.interaction.float.floor_tether',
          'The target floats upward until restraints tie her down to the floor.',
        );
      }
    }

    gravity.updateEntityGravity(target);
  }

  static applySuggestionEating({ effect, result, target, zone }) {
    if (!target || effect.type !== 'suggestion') return;

    const foods = zone?.getFoods?.() || [];
    const availableFoods = foods.filter(food => (food.servings ?? 0) > 0);

    if (availableFoods.length === 0) {
      result.environmentalChanges.push({
        type: 'suggestion_no_food',
        description: `${target.name} looks around for something tempting to eat, but there is no prepared food nearby.`,
      });
      SpellResolver.addInteraction(result,
        'Suggestion',
        'spell.interaction.suggestion.no_food_available',
        'Suggestion succeeds, but no nearby food is available for the target to choose.',
      );
      return;
    }

    const choice = SpellResolver.chooseFoodForTarget(target, availableFoods);
    if (!choice.food) return;

    const consumption = zone.consumeFood?.(choice.food, 1);
    if (!consumption) return;

    const intake = SpellResolver.addCalories(
      target,
      consumption.calories,
      choice.food.name,
      result,
      false,
    );

    if (target.modifyReputation) {
      target.modifyReputation(choice.preference === 'dislike' ? -2 : 6);
    }

    target.lastFoodChoice = choice.food.name;
    target.lastFoodPreference = choice.preference;
    target.lastFoodDeliveryMode = target.isFloating
      ? (target.floorTethered ? 'floating_tethered' : 'floating_free')
      : 'grounded';

    result.effects.push({
      type: 'food_choice',
      foodName: choice.food.name,
      preference: choice.preference,
      calories: consumption.calories,
      pendingWeightGain: intake?.pendingWeightGain || 0,
      description: `${target.name} chooses ${choice.food.name} and eats it. The calories will settle during a long rest.`,
    });

    result.environmentalChanges.push({
      type: 'food_consumed',
      description: `${target.name} chooses ${choice.food.name} from the nearby food and eats one serving (${consumption.calories} calories logged).`,
    });

    SpellResolver.describeFoodDelivery(target, 'Suggestion', result);

    SpellResolver.addInteraction(result,
      'Suggestion',
      `spell.interaction.suggestion.food_choice.${choice.preference}`,
      `${target.name} chooses ${choice.food.name} and eats it.`,
    );
  }

  static applyWorldCreationEffect({ effect, result, target, zone, createdFoods }) {
    if (!zone) return;

    if (effect.type === 'object_to_food') {
      if (!target || !target.id || !target.material) return;
      const profile = SpellResolver.resolveObjectFoodProfile(target, effect);
      const food = createFood(profile.foodName, {
        servings: profile.servings,
        caloriesPerServing: profile.caloriesPerServing,
        isMagical: true,
        tasteType: profile.tasteType,
        texture: profile.texture,
        color: profile.color,
        shape: profile.shape,
        description: profile.description,
      }).makeAppetizing(15);

      zone.removeEnvironmentalObject?.(target.id);
      zone.addFood(food, 'Culinary Transmutation');

      result.createdFoods = [...(result.createdFoods || []), food];
      createdFoods?.push?.(food);
      result.environmentalChanges.push({
        type: 'object_transmuted_to_food',
        description: `${target.name} transforms into ${food.servings} servings of ${food.name}.`,
      });
      return;
    }

    if (effect.type === 'summon_cattle') {
      const count = effect.count || 1;
      const summoned = [];
      for (let i = 0; i < count; i++) {
        const cow = new Cow(`Summoned Cow ${zone.getCreatures().length + i + 1}`, {
          baseWeight: effect.baseWeight || 1200,
          behavior: 'docile',
          hungerLevel: 35,
        });
        zone.addCreature(cow);
        summoned.push(cow);
      }
      result.summonedCreatures = [...(result.summonedCreatures || []), ...summoned];
      result.environmentalChanges.push({
        type: 'creatures_summoned',
        description: `${summoned.length} cattle appear in the area.`,
      });
      return;
    }

    if (effect.type === 'creature_to_food' || effect.type === 'creature_transformed') {
      if (!target || !target.id || !isLivingTarget(target)) return;

      const servings = Math.max(1, effect.portionCount || Math.ceil((target.currentWeight || 100) / 120));
      const qualityYield = {
        high: 0.5,
        standard: target.edibleYieldRatio,
        variable: 0.85,
      };
      const totalCalories = target.getCalorieValue
        ? target.getCalorieValue({ edibleYieldRatio: qualityYield[effect.quality] })
        : calculateLivingCalories(target, { edibleYieldRatio: qualityYield[effect.quality] });
      const caloriesPerServing = Math.max(1, Math.floor(totalCalories / servings));
      const food = createFood('Meat', {
        servings,
        caloriesPerServing,
        isMagical: true,
        tasteType: 'savory',
        texture: effect.quality === 'high' ? 'delicate' : 'hearty',
        appetizingness: effect.quality === 'high' ? 85 : 70,
        description: `Transmuted from ${target.name} at ${target.currentWeight || target.baseWeight} lbs.`,
      });

      food.sourceCreature = target.name;
      food.sourceCreatureWeight = target.currentWeight || target.baseWeight;
      food.sourceCreatureCalories = food.totalCalories;

      zone.removeCreature?.(target.id);
      zone.addFood(food, 'Flesh to Food');
      result.createdFoods = [...(result.createdFoods || []), food];
      createdFoods?.push?.(food);
      result.environmentalChanges.push({
        type: 'creature_transformed_to_food',
        description: `${target.name} transforms into ${servings} servings of food worth ${food.totalCalories} calories.`,
      });
      return;
    }

    if (effect.type === 'goodberry_created') {
      const food = createFood('Goodberry', {
        servings: effect.count || 10,
        caloriesPerServing: effect.caloriesPerBerry || 180,
        isMagical: true,
        isHealing: true,
        healingAmount: 1,
        tasteType: 'sweet',
        texture: 'juicy',
        color: 'red',
        shape: 'berry',
        appetizingness: 65,
        description: 'Small magical berries packed with nourishment.',
      });
      zone.addFood(food, 'Goodberry');
      result.createdFoods = [...(result.createdFoods || []), food];
      createdFoods?.push?.(food);
      result.environmentalChanges.push({
        type: 'goodberries_created',
        description: `${food.servings} goodberries are added to the nearby food.`,
      });
      return;
    }

    if (effect.type === 'plant_growth_food') {
      const fertileBonus = zone.features?.some(feature => (
        ['fertile', 'abundant_resources', 'food_abundant'].includes(feature)
      )) ? 8 : 0;
      const food = createFood('Produce', {
        servings: (effect.servings || 12) + fertileBonus,
        caloriesPerServing: effect.caloriesPerServing || 260,
        isMagical: true,
        tasteType: 'sweet',
        texture: 'ripe',
        color: 'green',
        shape: 'pile',
        appetizingness: 70,
        description: 'A magical pile of ripe produce.',
      });
      zone.addFood(food, 'Plant Growth');
      result.createdFoods = [...(result.createdFoods || []), food];
      createdFoods?.push?.(food);
      result.environmentalChanges.push({
        type: 'plant_growth_food',
        description: `${food.servings} servings of ripe produce burst into availability.`,
      });
      return;
    }

    if (effect.type === 'slow_applied' && target) {
      target.conditions?.add?.('slowed', { intensity: 1 });
      target.calorieRetentionMultiplier = Math.max(
        target.calorieRetentionMultiplier || 1,
        effect.calorieRetentionMultiplier || 1.5,
      );
      target.pendingWeightGain = estimatePendingWeightGain(target);
      result.environmentalChanges.push({
        type: 'target_slowed',
        description: `${target.name}'s movement and metabolism slow down.`,
      });
    }

    if ((effect.type === 'haste_applied' || effect.type === 'metabolic_acceleration') && target) {
      const burnRate = effect.caloriBurningRate ?? 0.5;
      const retentionMultiplier = 1 + Math.max(0, 1 - burnRate);
      target.calorieRetentionMultiplier = Math.max(
        target.calorieRetentionMultiplier || 1,
        retentionMultiplier,
      );
      target.eatingSpeedMultiplier = Math.max(
        target.eatingSpeedMultiplier || 1,
        effect.eatingSpeedMultiplier || 2,
      );
      target.pendingWeightGain = estimatePendingWeightGain(target);
      result.environmentalChanges.push({
        type: 'target_hastened_metabolism',
        description: `${target.name}'s eating pace accelerates; calories will convert more efficiently during rest.`,
      });
    }

    if ((effect.type === 'digestion_acceleration' || effect.type === 'digestion') && target) {
      const stomachsCleared = effect.stomachsCleared || Math.max(1, Math.ceil((effect.weightGain || 40) / 40));
      const retentionMultiplier = 1 + stomachsCleared * 0.25;
      target.isFullness = true;
      target.conditions?.add?.('satiated', {});
      target.calorieRetentionMultiplier = Math.max(
        target.calorieRetentionMultiplier || 1,
        retentionMultiplier,
      );
      target.pendingWeightGain = estimatePendingWeightGain(target);
      result.environmentalChanges.push({
        type: 'digestion_retention',
        description: `${target.name}'s digestion accelerates; today's calories will settle more completely during rest.`,
      });
    }

    if (effect.type === 'stomach_expansion' && target) {
      target.stomachCapacityMultiplier = Math.max(
        target.stomachCapacityMultiplier || 1,
        effect.capacityMultiplier || 2,
      );
      if (target.hungerLevel !== undefined) {
        target.hungerLevel = Math.min(100, target.hungerLevel + 25);
      }
      result.environmentalChanges.push({
        type: 'appetite_expanded',
        description: `${target.name}'s capacity and hunger increase, making more food intake possible before rest.`,
      });
    }

    if (effect.type === 'structural_appraisal' && target) {
      const structure = target;
      const breakingPoint = gravity.getBreakingPoint(structure);
      const supportable = structure.properties?.supportable_weight
        ? Number(structure.properties.supportable_weight)
        : Math.floor(breakingPoint / gravity.gravityConstant);
      const currentLoad = target.currentWeight || target.baseWeight || 0;
      const status = currentLoad > supportable
        ? 'broken'
        : currentLoad > supportable * gravity.breakingPointBuffer
          ? 'stressed'
          : 'safe';

      result.effects.push({
        type: 'structural_report',
        supportableWeight: supportable,
        breakingPoint,
        currentLoad,
        status,
        description: `${target.name} can support about ${Math.floor(supportable)} lbs before failure. Current load: ${Math.floor(currentLoad)} lbs. Status: ${status}.`,
      });
      result.environmentalChanges.push({
        type: 'structural_appraisal',
        description: `${target.name}: supportable weight ${Math.floor(supportable)} lbs, breaking point ${Math.floor(breakingPoint)} units, current load ${Math.floor(currentLoad)} lbs, status ${status}.`,
      });
    }
  }

  static applyForcedFeedingEffect({ effect, result, target, zone }) {
    if (!target || !zone) return;
    if (!['forced_feeding', 'mouth_suction'].includes(effect.type)) return;

    const foods = zone.getFoods?.().filter(food => (food.servings ?? 0) > 0) || [];
    if (foods.length === 0) {
      result.environmentalChanges.push({
        type: 'forced_feeding_no_food',
        description: 'The bindings search for food nearby, but there is nothing prepared to pull in.',
      });
      return;
    }

    const choice = SpellResolver.chooseFoodForTarget(target, foods);
    const servings = effect.type === 'mouth_suction' ? 2 : 1;
    const consumption = zone.consumeFood?.(choice.food, servings);
    if (!consumption) return;

    const intake = SpellResolver.addCalories(
      target,
      consumption.calories,
      choice.food.name,
      result,
      false,
    );
    target.lastFoodChoice = choice.food.name;
    target.lastFoodPreference = choice.preference;
    target.lastFoodDeliveryMode = target.isFloating
      ? (target.floorTethered ? 'floating_tethered' : 'floating_free')
      : 'grounded';

    result.effects.push({
      type: 'forced_food_consumed',
      foodName: choice.food.name,
      calories: consumption.calories,
      pendingWeightGain: intake?.pendingWeightGain || 0,
      description: `${target.name} is fed ${choice.food.name} by the bindings. The calories will settle during a long rest.`,
    });
    result.environmentalChanges.push({
      type: 'forced_food_consumed',
      description: `The bindings use ${choice.food.name} from the nearby food supply (${consumption.calories} calories logged).`,
    });

    SpellResolver.describeFoodDelivery(target, 'Confection Snare', result);

    SpellResolver.addInteraction(result,
      'Confection Snare',
      'spell.interaction.confection_snare.world_food',
      'Confection bindings draw on nearby prepared food.',
    );
  }

  static chooseFoodForTarget(target, foods) {
    const loves = target.foodLoves || [];
    const likes = target.foodLikes || [];
    const dislikes = target.foodDislikes || [];
    const hungerBonus = Math.max(0, target.hungerLevel || 0) / 4;

    const scored = foods.map(food => {
      const aliases = SpellResolver.foodAliases(food.name);
      const isLoved = aliases.some(name => loves.includes(name));
      const isLiked = aliases.some(name => likes.includes(name));
      const isDisliked = aliases.some(name => dislikes.includes(name));
      const preference = isLoved ? 'love' : isLiked ? 'like' : isDisliked ? 'dislike' : 'neutral';
      const preferenceScore = isLoved ? 100 : isLiked ? 55 : isDisliked ? -60 : 10;
      const magicScore = food.isMagical ? 10 : 0;
      const appetizingScore = food.appetizingness || 50;
      const calorieScore = Math.min(40, (food.caloriesPerServing || 100) / 20);
      const freshnessScore = (food.freshness ?? 100) / 10;
      const barScore = SpellResolver.barAffinityScore(target, food);

      return {
        food,
        preference,
        score: preferenceScore + appetizingScore + calorieScore + freshnessScore + magicScore + hungerBonus + barScore,
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored[0] || { food: null, preference: 'neutral', score: 0 };
  }

  static foodAliases(name) {
    const normalized = String(name || '').toLowerCase().replace(/\s+/g, '');
    const aliases = {
      beer: ['Beer', 'Ale', 'Food'],
      ale: ['Beer', 'Ale', 'Food'],
      darkbeer: ['Beer', 'Ale', 'Food'],
      foamyale: ['Beer', 'Ale', 'Food'],
      tavernale: ['Beer', 'Ale', 'Food'],
      beerbread: ['Bread', 'Beer', 'Ale'],
      alepudding: ['Pudding', 'Beer', 'Ale'],
      whippedalecream: ['Cream', 'Beer', 'Ale'],
      icecream: ['IceCream', 'Ice Cream'],
      pastry: ['Pastry'],
      pastries: ['Pastry'],
      bread: ['Bread'],
      meat: ['Meat'],
      cream: ['Cream'],
      pudding: ['Pudding'],
      food: ['Food'],
      produce: ['Produce', 'Food'],
      goodberry: ['Goodberry', 'Food'],
      createfoodandwater: ['Food'],
      eruptingearth: ['Food'],
      fireball: ['Meat', 'Food'],
    };
    return aliases[normalized] || [name];
  }

  static barAffinityScore(target, food) {
    const aliases = SpellResolver.foodAliases(food.name);
    if (!aliases.some(alias => ['Beer', 'Ale'].includes(alias))) return 0;
    const role = String(target?.role || '').toLowerCase();
    const description = String(target?.description || '').toLowerCase();
    if (role.includes('bar patron') || description.includes('drink') || description.includes('bar')) return 35;
    return 0;
  }

  static resolveTelekineticPlacement(target, zone, destination) {
    if (destination === 'floor' || !zone) {
      return {
        destination: 'floor',
        surface: null,
        description: `${target.name} is set down on the floor.`,
      };
    }

    const objects = zone.getEnvironmentalObjects?.() || [];
    const surface = objects.find(obj => {
      const name = obj.name.toLowerCase();
      if (destination === 'table') return name.includes('table') || obj.properties?.supportable_weight;
      if (destination === 'bar') return obj.properties?.surfaceRole === 'bar' || name.includes('bar');
      if (destination === 'stool') return obj.properties?.seating || name.includes('stool');
      if (destination === 'stone') return obj.type === 'stone' || name.includes('bench') || name.includes('pillar');
      return false;
    });

    if (!surface) {
      return {
        destination: 'floor',
        surface: null,
        description: `No suitable ${destination} support is available, so ${target.name} is lowered to the floor.`,
      };
    }

    return {
      destination,
      surface,
      description: `${target.name} is moved onto ${surface.name}.`,
    };
  }

  static applyGravityConsequences({ result, spell, target, zone, selectedOption }) {
    if (!target) return;
    gravity.updateEntityGravity(target);

    if (target.suspensionState === 'ceiling') {
      const failure = gravity.checkCeilingSuspensionFailure(target);
      if (!failure.canSupport) {
        target.suspensionState = 'none';
        target.restrainedBy = null;
        target.conditions?.remove?.('restrained');
        result.environmentalChanges.push({
          type: 'ceiling_suspension_failed',
          description: `The ceiling suspension fails under ${target.name}'s effective gravity. The candy bonds tear loose and ${target.name} crashes down.`,
        });
        SpellResolver.addInteraction(result,
          'Confection Snare',
          'spell.interaction.enhance_gravity.ceiling_suspension_break',
          'Enhanced gravity breaks the ceiling suspension.',
        );
      }
    }

    if (target.positionedOn && !['floor', 'none'].includes(target.positionedOn)) {
      const surface = zone?.getEntityById?.(target.positionedOn);
      if (surface && surface.state !== 'broken') {
        const failure = gravity.checkStructuralFailure(surface, target);
        if (failure.failed) {
          surface.state = 'broken';
          surface.currentDurability = 0;
          target.positionedOn = 'floor';
          result.environmentalChanges.push({
            type: 'structure_failure',
            description: `${surface.name} gives way under ${target.name}'s changed effective weight.`,
          });
          SpellResolver.addInteraction(result,
            'Enhance Gravity',
            'spell.interaction.enhance_gravity.table_break',
            'Enhanced gravity breaks the surface supporting the target.',
          );
        }
      }
    }

    if (target.isFloating) {
      const floorAnchor = zone?.getEnvironmentalObjects?.().find(obj => (
        obj.type === 'earth' || obj.type === 'stone' || obj.name.toLowerCase().includes('floor')
      ));
      if (floorAnchor && (target.restrainedBy === 'confection_snare' || target.conditions?.has?.('restrained'))) {
        target.floorTethered = true;
        target.suspensionState = 'floor_tethered';
        target.conditions?.add?.('floor_tethered', { source: target.restrainedBy || 'restraint' });
        result.environmentalChanges.push({
          type: 'floor_tethered',
          description: `${target.name} is floating, but the restraints anchor her down to the floor.`,
        });
        SpellResolver.addInteraction(result,
          'Float',
          'spell.interaction.float.floor_tether',
          'The target floats upward until restraints tie her down to the floor.',
        );
      }
    }

    if (spell.name === 'Shape Earth' && selectedOption?.name === 'Bury Target') {
      const multiplier = target.gravityMultiplier ?? 1;
      if (multiplier > 1) {
        const depth = Math.max(2, Math.floor(multiplier));
        target.buriedDepth = (target.buriedDepth || 1) + depth;
        target.conditions?.add?.('buried', { depth: target.buriedDepth, intensity: depth });
        result.environmentalChanges.push({
          type: 'deep_burial',
          description: `${target.name}'s enhanced gravity drags her deeper into the shaped earth.`,
        });
        SpellResolver.addInteraction(result,
          'Enhance Gravity',
          'spell.interaction.enhance_gravity.shape_earth_burial',
          'Enhanced gravity makes the burial deeper.',
        );
      }
    }
  }

  static applyWeightGain(effect, target, modifiers = [], result = null, spell = null) {
    if (!target || !isLivingTarget(target)) return;

    const immediateChange = immediateWeightChangeFromEffect(effect);
    if (immediateChange) {
      const applied = target.gainWeight
        ? target.gainWeight(immediateChange)
        : applyBodyWeightChange(target, immediateChange);
      effect.immediateWeightGain = Math.max(0, applied?.weightChange || immediateChange);
      effect.weightAppliedImmediately = true;
      return;
    }

    const baseCalories = deferredCaloriesFromEffect(effect);
    if (!baseCalories) return;

    const multiplier = modifiers.reduce((current, modifier) => {
      return modifier.effectMultiplier ? current * modifier.effectMultiplier : current;
    }, 1);
    const calories = Math.max(1, Math.floor(baseCalories * multiplier));

    const intake = SpellResolver.addCalories(
      target,
      calories,
      spell?.name || effect.type || 'Magic',
      result,
      false,
    );
    effect.calories = calories;
    effect.pendingWeightGain = intake?.pendingWeightGain || 0;
  }

  static foodsFromEffect(effect, spell, selectedOption) {
    const foods = [];

    if (effect.type === 'food_conjured') {
      foods.push(createFood(effect.food, {
        caloriesPerServing: effect.calories,
        isMagical: !!effect.magical,
        description: effect.description,
      }));
    }

    if (effect.type === 'food_created') {
      const itemCount = effect.itemCount || selectedOption?.itemCount || 1;
      const caloriesPerItem = effect.caloriesPerItem || selectedOption?.caloriesPerItem || 250;
      foods.push(createFood('Food', {
        servings: itemCount,
        caloriesPerServing: caloriesPerItem,
        isMagical: true,
        description: effect.description,
      }));
    }

    if (effect.type === 'transmuted_food' || effect.type === 'food_creation') {
      const foodName = effect.to || effect.foodType || 'Food';
      const food = createFood(foodName === 'ice cream' ? 'Ice Cream' : foodName, {
        isMagical: true,
        description: effect.description,
      });
      if (effect.selfReplicating) food.enableReplication();
      if (effect.calorieMult) food.enhanceCalories((effect.calorieMult - 1) * 100, true);
      foods.push(food);
    }

    if (effect.type === 'food_eruption' || effect.type === 'food_roasting') {
      foods.push(createFood(spell.name, {
        servings: effect.foodItems || 1,
        caloriesPerServing: effect.caloriesPerItem || 300,
        isMagical: true,
        description: effect.description,
      }));
    }

    return foods;
  }

  static resolveObjectFoodProfile(target, effect) {
    const lowerName = String(target?.name || '').toLowerCase();
    const containsBeer = target?.properties?.contains === 'beer';
    const isBottle = lowerName.includes('bottle');
    const isGlass = lowerName.includes('glass') || lowerName.includes('mug');
    const isKeg = lowerName.includes('keg') || lowerName.includes('barrel');
    const isBar = lowerName.includes('bar');

    if (containsBeer || isBottle || isGlass || isKeg) {
      if (effect.foodName === 'Pudding') {
        return {
          foodName: 'Pudding',
          servings: Math.max(2, effect.servings || 4),
          caloriesPerServing: 320,
          tasteType: 'sweet',
          texture: 'smooth',
          color: 'amber',
          shape: 'bowl',
          description: `Ale pudding transmuted from ${target.name}.`,
        };
      }
      if (effect.foodName === 'Cream') {
        return {
          foodName: 'Cream',
          servings: Math.max(3, effect.servings || 5),
          caloriesPerServing: 260,
          tasteType: 'sweet',
          texture: 'creamy',
          color: 'tan',
          shape: 'dollop',
          description: `Whipped ale cream transmuted from ${target.name}.`,
        };
      }
      return {
        foodName: 'Bread',
        servings: Math.max(3, effect.servings || 5),
        caloriesPerServing: 280,
        tasteType: 'savory',
        texture: 'soft',
        color: 'brown',
        shape: 'loaf',
        description: `Beer bread transmuted from ${target.name}.`,
      };
    }

    if (isBar) {
      return {
        foodName: effect.foodName || 'Food',
        servings: Math.max(10, effect.servings || 10),
        caloriesPerServing: (effect.caloriesPerServing || 400) + 80,
        description: `A broad tavern spread transmuted from ${target.name}.`,
      };
    }

    return {
      foodName: effect.foodName || 'Food',
      servings: effect.servings || 8,
      caloriesPerServing: effect.caloriesPerServing || 400,
      description: `Transmuted from ${target.name}.`,
    };
  }

  static addInteraction(result, spellName, moduleKey, description) {
    result.interactions.push({ spellName, moduleKey, description });
  }

  static addCalories(target, calories, source = 'Magic', result = null, announce = true) {
    if (!target || !isLivingTarget(target) || !calories) return null;
    const intake = target.consumeCalories
      ? target.consumeCalories(calories, source)
      : recordCalorieConsumption(target, calories, source);

    if (announce && result && intake) {
      result.environmentalChanges.push({
        type: 'calories_logged',
        description: `${target.name} takes in ${intake.calories} calories. Estimated rest gain: +${intake.pendingWeightGain} lbs.`,
      });
    }

    return intake;
  }

  static addBonusCalories(target, amount, source, result = null) {
    if (!target || !amount) return null;
    const calories = Math.max(1, Math.floor(amount * CALORIES_PER_POUND));
    const intake = SpellResolver.addCalories(target, calories, source, result, false);
    if (result && intake) {
      result.effects.push({
        type: 'bonus_calories',
        calories,
        pendingWeightGain: intake.pendingWeightGain,
        source,
        description: `${source} adds ${calories} calories to the daily nutrition ledger.`,
      });
      result.environmentalChanges.push({
        type: 'bonus_calories',
        description: `${source} adds ${calories} calories to ${target.name}'s long-rest nutrition.`,
      });
    }
    return intake;
  }

  static addBonusWeight(target, amount, result = null, source = 'Body magic') {
    if (!target || !amount) return;
    const applied = target.gainWeight
      ? target.gainWeight(amount)
      : applyBodyWeightChange(target, amount);
    if (result && applied) {
      result.effects.push({
        type: 'immediate_body_weight',
        immediateWeightGain: Math.max(0, applied.weightChange || amount),
        source,
        description: `${source} changes ${target.name}'s weight immediately.`,
      });
    }
    return applied;
  }

  static applyComboEffects({ result, context, spell, target, zone, createdFoods }) {
    const previousSpellNames = context.previousSpells.map(previous => previous.name);

    if (spell.name === 'Create Water' && previousSpellNames.includes('Shape Earth')) {
      result.environmentalChanges.push({
        type: 'combo_resource',
        description: 'The newly shaped basin catches the conjured water, creating a usable magical reservoir.',
      });
    }

    if (
      spell.name === 'Delightful Transmutation' &&
      previousSpellNames.includes('Create Water') &&
      zone
    ) {
      const iceCream = createFood('Ice Cream', {
        servings: 10,
        isMagical: true,
        description: 'A persistent reservoir of magical ice cream created from conjured water.',
      }).enableReplication();
      zone.addFood(iceCream, 'Create Water + Delightful Transmutation');
      createdFoods.push(iceCream);
      SpellResolver.addInteraction(result,
        'Create Water',
        'spell.interaction.create_water.delightful_transmutation',
        'Conjured water is converted into a persistent, self-replicating ice cream supply.',
      );
    }

    if (spell.name === 'Suggestion' && previousSpellNames.includes('Detect Cravings')) {
      if (target && target.willingness !== undefined) {
        target.willingness = Math.min(100, target.willingness + 15);
      }
      SpellResolver.addInteraction(result,
        'Detect Cravings',
        'spell.interaction.detect_cravings.suggestion',
        'Known cravings make the suggestion feel personal and welcome.',
      );
    }

    if (spell.name === 'Conjure Food' && previousSpellNames.includes('Detect Cravings')) {
      const preferredFood = target?.foodLoves?.[0] || target?.foodLikes?.[0];
      if (preferredFood && zone) {
        const food = createFood(preferredFood, {
          isMagical: true,
          description: `${preferredFood} shaped by divined craving.`,
        }).makeAppetizing(25);
        zone.addFood(food, 'Detect Cravings + Conjure Food');
        createdFoods.push(food);
      }
      SpellResolver.addInteraction(result,
        'Detect Cravings',
        'spell.interaction.detect_cravings.conjure_food',
        'The conjured food keys itself to the target favorite tastes.',
      );
    }

    if (spell.name === 'Ravenous Expansion' && previousSpellNames.includes('Create Food and Water')) {
      SpellResolver.addBonusCalories(target, 12, 'Create Food and Water + Ravenous Expansion', result);
      SpellResolver.addInteraction(result,
        'Create Food and Water',
        'spell.interaction.create_food_and_water.ravenous_expansion',
        'The prepared feast and expanded appetite form a self-reinforcing indulgence loop.',
      );
    }

    if (spell.name === 'Haste' && previousSpellNames.includes('Ravenous Expansion')) {
      SpellResolver.addBonusCalories(target, 18, 'Ravenous Expansion + Haste', result);
      SpellResolver.addInteraction(result,
        'Ravenous Expansion',
        'spell.interaction.ravenous_expansion.haste',
        'Expanded capacity and accelerated eating combine into rapid overindulgence.',
      );
    }

    if (spell.name === 'Rapid Digestion' && previousSpellNames.includes('Ravenous Expansion')) {
      SpellResolver.addBonusCalories(target, 20, 'Ravenous Expansion + Rapid Digestion', result);
      SpellResolver.addInteraction(result,
        'Ravenous Expansion',
        'spell.interaction.ravenous_expansion.rapid_digestion',
        'New hunger and accelerated digestion convert recent indulgence into permanent softness.',
      );
    }

    if (spell.name === 'Oozing Abundance' && previousSpellNames.includes('Enlarge Person')) {
      SpellResolver.addBonusCalories(target, 10, 'Enlarge Person + Oozing Abundance', result);
      target?.conditions?.add?.('ooze_coated', { source: 'oozing_abundance', intensity: 2 });
      SpellResolver.addInteraction(result,
        'Enlarge Person',
        'spell.interaction.enlarge_person.oozing_abundance',
        'The enlarged body gives the nutritive ooze more surface to coat and feed.',
      );
    }

    if (spell.name === 'Grease' && previousSpellNames.includes('Enlarge Person')) {
      SpellResolver.addInteraction(result,
        'Enlarge Person',
        'spell.interaction.enlarge_person.grease',
        'Grease catches the light across the enlarged target, emphasizing every softened curve.',
      );
    }

    if (spell.name === 'Duplication' && previousSpellNames.includes('Delightful Transmutation')) {
      const existingIceCream = zone?.getFoods?.().find(food => food.name === 'Ice Cream');
      if (existingIceCream && zone) {
        const duplicate = createFood('Ice Cream', {
          servings: existingIceCream.servings,
          caloriesPerServing: existingIceCream.caloriesPerServing,
          isMagical: true,
          description: 'A doubled copy of the transmuted magical ice cream.',
        }).enableReplication();
        zone.addFood(duplicate, 'Delightful Transmutation + Duplication');
        createdFoods.push(duplicate);
      }
      SpellResolver.addInteraction(result,
        'Delightful Transmutation',
        'spell.interaction.delightful_transmutation.duplication',
        'The magical dessert doubles into an escalating supply.',
      );
    }

    if (spell.name === 'Feast of Shadows' && previousSpellNames.includes('Prestidigitation')) {
      SpellResolver.addBonusCalories(target, 5, 'Prestidigitation + Feast of Shadows', result);
      SpellResolver.addInteraction(result,
        'Prestidigitation',
        'spell.interaction.prestidigitation.feast_of_shadows',
        'Minor sensory magic makes the illusion taste and smell dangerously convincing.',
      );
    }

    if (spell.name === 'Confection Snare' && previousSpellNames.includes('Grease')) {
      SpellResolver.addInteraction(result,
        'Grease',
        'spell.interaction.grease.confection_snare',
        'Sticky candy and glossy grease merge into a slick, sweet restraint.',
      );
    }

    if (spell.name === 'Enlarge Person' && previousSpellNames.includes('Suggestion')) {
      SpellResolver.addBonusWeight(target, 8, result, 'Suggestion + Enlarge Person');
      SpellResolver.addInteraction(result,
        'Suggestion',
        'spell.interaction.suggestion.enlarge_person',
        'A willing indulgent mindset makes the growth feel luxuriant instead of shocking.',
      );
    }

    if (spell.name === 'Suggestion' && previousSpellNames.includes('Ravenous Expansion')) {
      if (target && target.willingness !== undefined) {
        target.willingness = Math.min(100, target.willingness + 20);
      }
      SpellResolver.addInteraction(result,
        'Ravenous Expansion',
        'spell.interaction.ravenous_expansion.suggestion',
        'The target is already hungry enough that the suggestion barely needs to push.',
      );
    }

    if (spell.name === 'Create Food and Water' && previousSpellNames.includes('Duplication')) {
      const banquet = createFood('Food', {
        servings: 20,
        caloriesPerServing: 650,
        isMagical: true,
        description: 'A doubled banquet anchored by prior duplication magic.',
      });
      zone?.addFood?.(banquet, 'Duplication + Create Food and Water');
      createdFoods.push(banquet);
      SpellResolver.addInteraction(result,
        'Duplication',
        'spell.interaction.duplication.create_food_and_water',
        'The conjured banquet inherits duplication magic and arrives already multiplied.',
      );
    }

    if (spell.name === 'Fireball' && previousSpellNames.includes('Ravenous Expansion')) {
      SpellResolver.addBonusCalories(target, 15, 'Ravenous Expansion + Fireball', result);
      SpellResolver.addInteraction(result,
        'Ravenous Expansion',
        'spell.interaction.ravenous_expansion.fireball',
        'The blast roasted feast lands on a target primed to crave every bite.',
      );
    }

    if (spell.name === 'Haste' && previousSpellNames.includes('Suggestion')) {
      SpellResolver.addInteraction(result,
        'Suggestion',
        'spell.interaction.suggestion.haste',
        'A persuaded appetite becomes eager, quick, and hard to slow down.',
      );
    }

    if (spell.name === 'Rapid Digestion' && previousSpellNames.includes('Feast of Shadows')) {
      SpellResolver.addBonusCalories(target, 10, 'Feast of Shadows + Rapid Digestion', result);
      SpellResolver.addInteraction(result,
        'Feast of Shadows',
        'spell.interaction.feast_of_shadows.rapid_digestion',
        'Illusory indulgence becomes physically consequential as digestion magic makes the body believe.',
      );
    }

    if (spell.name === 'Delightful Transmutation' && previousSpellNames.includes('Grease')) {
      SpellResolver.addInteraction(result,
        'Grease',
        'spell.interaction.grease.delightful_transmutation',
        'The slick conjuration sweetens into a dessert-like glaze.',
      );
    }

    if (spell.name === 'Morph Mass' && previousSpellNames.includes('Oozing Abundance')) {
      SpellResolver.addBonusWeight(target, 16, result, 'Oozing Abundance + Morph Mass');
      SpellResolver.addInteraction(result,
        'Oozing Abundance',
        'spell.interaction.oozing_abundance.morph_mass',
        'Nutrient-rich ooze gives the mass transmutation more material to fold inward.',
      );
    }

    if (spell.name === 'Reduce Person' && previousSpellNames.includes('Enlarge Person')) {
      SpellResolver.addInteraction(result,
        'Enlarge Person',
        'spell.interaction.enlarge_person.reduce_person',
        'Opposed size magic rebounds, leaving the target flushed by the sudden contrast.',
      );
    }

    if (spell.name === 'Enlarge Person' && previousSpellNames.includes('Reduce Person')) {
      SpellResolver.addBonusWeight(target, 6, result, 'Reduce Person + Enlarge Person');
      SpellResolver.addInteraction(result,
        'Reduce Person',
        'spell.interaction.reduce_person.enlarge_person',
        'The rebound from reduction makes the new growth arrive with extra softness.',
      );
    }

    if (spell.name === 'Telekinesis' && previousSpellNames.includes('Float')) {
      SpellResolver.addInteraction(result,
        'Float',
        'spell.interaction.float.telekinesis',
        'Reduced gravity makes telekinetic placement easier and gentler.',
      );
    }

    if (spell.name === 'Float' && previousSpellNames.includes('Enhance Gravity')) {
      SpellResolver.addInteraction(result,
        'Enhance Gravity',
        'spell.interaction.enhance_gravity.float',
        'Float pushes back against the previous gravity enhancement.',
      );
    }

    if (spell.name === 'Enhance Gravity' && previousSpellNames.includes('Float')) {
      target.conditions?.remove?.('floating');
      target.conditions?.remove?.('floor_tethered');
      target.floatOverride = false;
      target.isFloating = false;
      target.floorTethered = false;
      SpellResolver.addInteraction(result,
        'Float',
        'spell.interaction.float.enhance_gravity',
        'Enhanced gravity cancels the float and drags the target back down.',
      );
    }

    if (spell.name === 'Suggestion' && previousSpellNames.includes('Culinary Transmutation')) {
      SpellResolver.addInteraction(result,
        'Culinary Transmutation',
        'spell.interaction.culinary_transmutation.suggestion',
        'Suggestion lets the target choose from food made out of nearby objects.',
      );
    }

    if (spell.name === 'Confection Snare' && previousSpellNames.includes('Culinary Transmutation')) {
      SpellResolver.addInteraction(result,
        'Culinary Transmutation',
        'spell.interaction.culinary_transmutation.confection_snare',
        'Confection bindings can draw transformed object-food into their feeding routine.',
      );
    }

    if (spell.name === 'Duplication' && previousSpellNames.includes('Culinary Transmutation')) {
      SpellResolver.addInteraction(result,
        'Culinary Transmutation',
        'spell.interaction.culinary_transmutation.duplication',
        'The transformed object-food becomes a duplicating supply.',
      );
    }

    if (spell.name === 'Flesh to Food' && previousSpellNames.includes('Summon Cattle')) {
      SpellResolver.addInteraction(result,
        'Summon Cattle',
        'spell.interaction.summon_cattle.flesh_to_food',
        'Summoned cattle become an enormous food source.',
      );
    }

    if (spell.name === 'Ravenous Expansion' && previousSpellNames.includes('Summon Cattle')) {
      SpellResolver.addInteraction(result,
        'Summon Cattle',
        'spell.interaction.summon_cattle.ravenous_expansion',
        'Summoned cattle give the expanded appetite something large to focus on.',
      );
    }

    if (spell.name === 'Enhance Gravity' && previousSpellNames.includes('Summon Cattle')) {
      SpellResolver.addInteraction(result,
        'Summon Cattle',
        'spell.interaction.summon_cattle.enhance_gravity',
        'Large summoned bodies become more hazardous under enhanced gravity.',
      );
    }

    if (spell.name === 'Suggestion' && previousSpellNames.includes('Goodberry')) {
      SpellResolver.addInteraction(result,
        'Goodberry',
        'spell.interaction.goodberry.suggestion',
        'Goodberries offer a small, easy choice for a suggested target.',
      );
    }

    if (spell.name === 'Plant Growth' && previousSpellNames.includes('Create Water')) {
      const bonusFood = createFood('Produce', {
        servings: 6,
        caloriesPerServing: 280,
        isMagical: true,
        description: 'Extra produce grown from conjured water.',
      });
      zone?.addFood?.(bonusFood, 'Create Water + Plant Growth');
      createdFoods.push(bonusFood);
      SpellResolver.addInteraction(result,
        'Create Water',
        'spell.interaction.create_water.plant_growth',
        'Conjured water increases the edible growth yield.',
      );
    }

    if (spell.name === 'Ravenous Expansion' && previousSpellNames.includes('Plant Growth')) {
      SpellResolver.addInteraction(result,
        'Plant Growth',
        'spell.interaction.plant_growth.ravenous_expansion',
        'Fresh abundance meets an expanded appetite.',
      );
    }

    if (spell.name === 'Suggestion' && previousSpellNames.includes('Slow')) {
      SpellResolver.addInteraction(result,
        'Slow',
        'spell.interaction.slow.suggestion',
        'Slowed metabolism makes the target chosen food settle heavier.',
      );
    }

    if (spell.name === 'Confection Snare' && previousSpellNames.includes('Slow')) {
      SpellResolver.addInteraction(result,
        'Slow',
        'spell.interaction.slow.confection_snare',
        'Slowed movement helps the bindings control the target.',
      );
    }

    if (spell.name === 'Haste' && previousSpellNames.includes('Slow')) {
      target?.conditions?.remove?.('slowed');
      if (target) target.calorieRetentionMultiplier = 1;
      SpellResolver.addInteraction(result,
        'Slow',
        'spell.interaction.slow.haste',
        'Haste disrupts the slowing field and creates metabolic whiplash.',
      );
    }

    if (spell.name === 'Slow' && previousSpellNames.includes('Haste')) {
      SpellResolver.addInteraction(result,
        'Haste',
        'spell.interaction.haste.slow',
        'Slow counters haste and forces the pace back down.',
      );
    }
  }

  static totalImmediateWeightGain(result) {
    return (result.effects || []).reduce((sum, effect) => {
      return sum + (effect.immediateWeightGain || 0);
    }, 0);
  }

  static totalCaloriesLogged(result) {
    return (result.effects || []).reduce((sum, effect) => {
      if (effect.weightAppliedImmediately) return sum;
      if (FOOD_CREATION_EFFECT_TYPES.has(effect.type)) return sum;
      return sum + (effect.calories || 0);
    }, 0);
  }
}

export default SpellResolver;
