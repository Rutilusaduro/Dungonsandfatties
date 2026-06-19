export const WEIGHT_STAGES = {
  0: { name: 'Slim', sizeClass: 'thin', description: 'barely-there softness' },
  1: { name: 'Slender', sizeClass: 'thin', description: 'lean and fit' },
  2: { name: 'Toned', sizeClass: 'thin', description: 'athletic and defined' },
  3: { name: 'Softening', sizeClass: 'plump', description: 'developing gentle curves' },
  4: { name: 'Plump', sizeClass: 'plump', description: 'pleasantly rounded' },
  5: { name: 'Curvy', sizeClass: 'plump', description: 'substantial softness' },
  6: { name: 'Heavy', sizeClass: 'fat', description: 'well-padded and thick' },
  7: { name: 'Obese', sizeClass: 'fat', description: 'generous and abundant' },
  8: { name: 'Immense', sizeClass: 'ssbbw', description: 'vast and billowing' },
  9: { name: 'Colossal', sizeClass: 'ssbbw', description: 'enormous and rolling' },
  10: { name: 'Immobile', sizeClass: 'immobile', description: 'spread across everything' },
  11: { name: 'Leviathan', sizeClass: 'leviathan', description: 'a mountain of flesh' },
};

export function calculateWeightStage(entity) {
  if (!entity || !entity.baseWeight || !entity.currentWeight) return 0;

  const percentGain = ((entity.currentWeight - entity.baseWeight) / entity.baseWeight) * 100;

  if (percentGain < 5) return 0;
  if (percentGain < 15) return 1;
  if (percentGain < 30) return 2;
  if (percentGain < 50) return 3;
  if (percentGain < 75) return 4;
  if (percentGain < 100) return 5;
  if (percentGain < 150) return 6;
  if (percentGain < 200) return 7;
  if (percentGain < 300) return 8;
  if (percentGain < 400) return 9;
  if (percentGain < 500) return 10;
  return 11;
}

export function getWeightStageInfo(stage) {
  return WEIGHT_STAGES[Math.max(0, Math.min(11, Math.floor(stage)))];
}

export function getSizeClass(entity) {
  const stage = calculateWeightStage(entity);
  return getWeightStageInfo(stage).sizeClass;
}
