export const CALORIES_PER_POUND = 3500;

export function initializeNutritionState(entity, options = {}) {
  entity.caloriesEatenToday = options.caloriesEatenToday || 0;
  entity.caloriesEatenLifetime = options.caloriesEatenLifetime || 0;
  entity.pendingWeightGain = options.pendingWeightGain || 0;
  entity.lastCaloriesConsumed = options.lastCaloriesConsumed || 0;
  entity.lastCalorieSource = options.lastCalorieSource || null;
  entity.lastRestWeightGain = options.lastRestWeightGain || 0;
  entity.calorieRetentionMultiplier = options.calorieRetentionMultiplier || 1;
  entity.nutritionLog = options.nutritionLog || [];
}

export function getEffectiveDailyCalories(entity) {
  const rawCalories = Math.max(0, Math.floor(entity?.caloriesEatenToday || 0));
  const multiplier = Math.max(0, entity?.calorieRetentionMultiplier || 1);
  return Math.floor(rawCalories * multiplier);
}

export function estimatePendingWeightGain(entity) {
  return Math.floor(getEffectiveDailyCalories(entity) / CALORIES_PER_POUND);
}

export function recordCalorieConsumption(entity, calories, source = 'Food', options = {}) {
  if (!entity) return null;

  const rawCalories = Math.max(0, Math.floor(calories || 0));
  entity.caloriesEatenToday = Math.max(0, Math.floor(entity.caloriesEatenToday || 0)) + rawCalories;
  entity.caloriesEatenLifetime = Math.max(0, Math.floor(entity.caloriesEatenLifetime || 0)) + rawCalories;
  entity.lastCaloriesConsumed = rawCalories;
  entity.lastCalorieSource = source;
  entity.pendingWeightGain = estimatePendingWeightGain(entity);

  const entry = {
    source,
    calories: rawCalories,
    kind: options.kind || 'food',
    at: Date.now(),
  };
  entity.nutritionLog = [...(entity.nutritionLog || []), entry].slice(-12);

  return {
    calories: rawCalories,
    effectiveCaloriesToday: getEffectiveDailyCalories(entity),
    pendingWeightGain: entity.pendingWeightGain,
    source,
  };
}

export function applyBodyWeightChange(entity, amount) {
  if (!entity || !amount) return null;

  const change = Math.floor(amount);
  if (!change) return null;

  entity.currentWeight = Math.max(1, Math.floor((entity.currentWeight || entity.baseWeight || 1) + change));
  entity.weightGainAccumulated = Math.max(
    0,
    Math.floor((entity.currentWeight || 0) - (entity.baseWeight || entity.currentWeight || 0)),
  );
  entity.lastWeightGain = change > 0 ? change : 0;

  if (typeof entity.recalculateGravity === 'function') {
    entity.recalculateGravity();
  } else {
    const baseGravity = (entity.currentWeight || 0) * 0.1;
    entity.gravity = baseGravity;
    entity.effectiveGravity = baseGravity * (entity.gravityMultiplier || 1);
  }

  return {
    name: entity.name,
    weightChange: change,
    newWeight: entity.currentWeight,
    accumulated: entity.weightGainAccumulated,
  };
}

export function processLongRestNutrition(entity) {
  if (!entity) return null;

  const rawCalories = Math.max(0, Math.floor(entity.caloriesEatenToday || 0));
  const effectiveCalories = getEffectiveDailyCalories(entity);
  const weightGain = Math.floor(effectiveCalories / CALORIES_PER_POUND);

  if (weightGain > 0) {
    applyBodyWeightChange(entity, weightGain);
  } else {
    entity.lastWeightGain = 0;
  }

  entity.lastRestWeightGain = weightGain;
  entity.caloriesEatenToday = 0;
  entity.pendingWeightGain = 0;
  entity.lastCaloriesConsumed = 0;
  entity.lastCalorieSource = null;
  entity.calorieRetentionMultiplier = 1;

  return {
    name: entity.name,
    rawCalories,
    effectiveCalories,
    weightGain,
    newWeight: entity.currentWeight,
  };
}

export function calculateLivingCalories(entity, options = {}) {
  const currentWeight = Math.max(1, Math.floor(entity?.currentWeight || entity?.baseWeight || 1));
  const edibleYieldRatio = options.edibleYieldRatio ?? entity?.edibleYieldRatio ?? 0.55;
  const caloriesPerPound = options.caloriesPerPound ?? entity?.caloriesPerPound ?? 900;
  return Math.max(1, Math.floor(currentWeight * edibleYieldRatio * caloriesPerPound));
}

export function applyPreRestSharing(restTargets, zone) {
  const notes = [];

  const snapshot = new Map();
  restTargets.forEach(entity => {
    snapshot.set(entity.id, Math.max(0, Math.floor(entity.caloriesEatenToday || 0)));
  });

  // Process sympathetic bonds
  restTargets.forEach(entity => {
    if (!entity.bondedTo || typeof entity.bondedTo !== 'object') return;

    Object.entries(entity.bondedTo).forEach(([partnerId, bondData]) => {
      const partner = restTargets.find(e => e.id === partnerId);
      if (!partner) return;

      const partnerSnapshot = snapshot.get(partnerId) || 0;
      const shareAmount = Math.floor(partnerSnapshot * (bondData.share || 0.25));

      if (shareAmount > 0) {
        recordCalorieConsumption(entity, shareAmount, 'Sympathetic Bond', { kind: 'bond' });
        notes.push(`${entity.name} receives ${shareAmount} calories from bonded ${partner.name}.`);
      }
    });
  });

  // Process zone aura
  if (zone?.aura?.calories && zone.aura.calories > 0) {
    restTargets.forEach(entity => {
      recordCalorieConsumption(entity, zone.aura.calories, 'Ambrosial Aura', { kind: 'aura' });
      notes.push(`${entity.name} absorbs ${zone.aura.calories} calories from the zone's aura.`);
    });
  }

  return notes;
}
