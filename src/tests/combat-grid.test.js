import { describe, it, expect } from 'vitest';
import { Combat, canReach, move, distance, fillUp, checkWinState } from '../game/combat/Combat.js';

function makeFoe(name, baseWeight = 100) {
  return { id: `foe_${name}`, name, isEnemy: true, _trait: 'brute', baseWeight,
    currentWeight: baseWeight, stomachCapacity: baseWeight, fullness: 0, willingness: 50,
    conditions: { has: () => false }, _createContext() { return { subject: this }; } };
}
const player = () => ({ id: 'p', name: 'Hero', baseWeight: 150, currentWeight: 150, stomachCapacity: 90, fullness: 0, willingness: 50 });

describe('2D grid combat', () => {
  it('places combatants and reach respects distance', () => {
    const p = player();
    const combat = new Combat([
      { entity: p, initiative: 10, x: 0, y: 1 },
      { entity: makeFoe('A'), initiative: 5, x: 4, y: 0 },
    ]);
    const pc = combat.playerCombatant();
    const fc = combat.combatants.find(c => c.entity.isEnemy);
    expect(distance(pc, fc)).toBe(4);
    expect(canReach(pc, fc, 1)).toBe(false);
    // walk the player across to the foe
    for (let i = 0; i < 3; i++) move(pc, 'further', { maxX: 4, maxY: 2 });
    move(pc, 'up', { maxX: 4, maxY: 2 });
    expect(canReach(pc, fc, 1)).toBe(true);
  });

  it('encounter is won only when ALL enemies are defeated', () => {
    const p = player();
    const a = makeFoe('A'), b = makeFoe('B');
    const combat = new Combat([
      { entity: p, initiative: 10, x: 0, y: 1 },
      { entity: a, initiative: 5, x: 4, y: 0 },
      { entity: b, initiative: 5, x: 4, y: 2 },
    ]);
    expect(combat.livingEnemies()).toHaveLength(2);
    expect(combat.encounterWon()).toBe(false);

    // immobilize A by stuffing it to capacity (fullness ratio -> immobile)
    fillUp(a, a.stomachCapacity);
    a._dead = checkWinState(a) ? true : false;
    expect(checkWinState(a)).toBeTruthy();
    expect(combat.livingEnemies()).toHaveLength(1);
    expect(combat.encounterWon()).toBe(false);

    fillUp(b, b.stomachCapacity);
    expect(combat.encounterWon()).toBe(true);
  });

  it('player combatant is identified by !isEnemy', () => {
    const p = player();
    const combat = new Combat([
      { entity: p, initiative: 10 },
      { entity: makeFoe('A'), initiative: 5 },
    ]);
    expect(combat.playerCombatant().entity).toBe(p);
  });
});
