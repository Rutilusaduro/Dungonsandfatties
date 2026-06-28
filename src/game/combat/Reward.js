// ═══════════════════════════════════════════════════════════════
// Reward — C4: mechanical payout for a won encounter.
// Everything scales off the LOSER'S final weight stage, so the reward
// gradient always points the same way the fight does: fatten harder, earn
// more. A floor-win (barely-immobilized at stage 1) pays a pittance next to
// a glut-clear (stage 9 succumb). Consuming the enemy banks their whole mass.
// ═══════════════════════════════════════════════════════════════
import { getStageId } from '../../textEngine/stages.js';

const BASE_XP = 20;
const BASE_CALORIES = 500;

// Stage multiplier: linear lift plus a quadratic tail so the top of the
// fattening ladder pays out of proportion — the whole point of the race.
// ponytail: tuned by feel, not balance-tested; turn the two coefficients if
// the late-game curve runs hot.
function sizeMultiplier(stage) {
  return 1 + stage * 0.5 + stage * stage * 0.08;
}

// computeReward(loser, winState) -> { xp, loot, calorieBank, stage }
// `loser` is the defeated entity; `winState` is what checkWinState returned.
export function computeReward(loser, winState = {}) {
  const base = loser?.baseWeight ?? 1;
  const cur = loser?.currentWeight ?? base;
  const stage = getStageId(cur, base);
  const mult = sizeMultiplier(stage);

  // Eating the enemy (vore / flesh-to-food) turns the whole body into food.
  const consumed = winState?.state === 'consumed';

  return {
    xp: Math.round(BASE_XP * mult),
    calorieBank: Math.round(BASE_CALORIES * mult * (consumed ? 2 : 1)),
    loot: stage, // ponytail: loot tier == final stage; swap for a real drop table when items land
    stage,
  };
}

// ── self-check ──────────────────────────────────────────────────
// run: node src/game/combat/Reward.js
if (import.meta.url === `file://${process.argv[1]}`) {
  const at = (curMult) => ({ baseWeight: 100, currentWeight: 100 * curMult });
  const floor = computeReward(at(1.05), { state: 'immobilized' }); // stage 1
  const glut = computeReward(at(4.0), { state: 'succumbed' });     // stage 9
  console.assert(floor.stage === 1, `floor stage ${floor.stage}`);
  console.assert(glut.stage === 9, `glut stage ${glut.stage}`);
  console.assert(glut.xp > floor.xp * 5, `glut xp ${glut.xp} not >> floor ${floor.xp}`);
  // Consuming doubles the calorie bank vs an equal-stage non-consume win.
  const eaten = computeReward(at(4.0), { state: 'consumed' });
  console.assert(eaten.calorieBank === glut.calorieBank * 2, 'consume should double calories');
  console.log('Reward self-check OK', { floor, glut, eaten });
}
