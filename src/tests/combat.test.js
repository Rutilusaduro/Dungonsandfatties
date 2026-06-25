// C0 validation: turn loop + mobilityLevel throttle + range-band interface
import { describe, it, expect } from 'vitest';
import { Creature } from '../game/entities/Creature.js';
import { Combat, actionsAvailable, mobilityLevelFor, distance, canReach, move, BANDS } from '../game/combat/Combat.js';

// Quick entity factory — set currentWeight directly to bypass NutritionSystem
function entity(name, baseWeight, pctGain = 0) {
  const c = new Creature(name, { baseWeight });
  c.currentWeight = baseWeight * (1 + pctGain / 100);
  return c;
}

describe('mobilityLevel + action throttle', () => {
  it('maps stages to correct mobility levels', () => {
    expect(mobilityLevelFor(entity('a', 100, 0))).toBe('full');      // stage 0
    expect(mobilityLevelFor(entity('b', 100, 150))).toBe('present'); // stage 7
    expect(mobilityLevelFor(entity('c', 100, 200))).toBe('planning'); // stage 8
    expect(mobilityLevelFor(entity('d', 100, 300))).toBe('economy'); // stage 9
    expect(mobilityLevelFor(entity('e', 100, 400))).toBe('minimal'); // stage 10
    expect(mobilityLevelFor(entity('f', 100, 500))).toBe('immobile'); // stage 11
  });

  it('action count drops as weight rises', () => {
    expect(actionsAvailable(entity('slim',    100, 0))).toBe(2); // full
    expect(actionsAvailable(entity('heavy',   100, 300))).toBe(1); // economy
    expect(actionsAvailable(entity('immobile',100, 500))).toBe(0); // immobile
  });

  it('light combatant has strictly more actions than economy-throttled one', () => {
    const slim = entity('slim', 100, 0);
    const bloated = entity('bloated', 100, 300);
    expect(actionsAvailable(slim)).toBeGreaterThan(actionsAvailable(bloated));
  });
});

describe('Combat turn loop', () => {
  it('runs 3 rounds in initiative order and throttle is observable', () => {
    const fighter = entity('Fighter', 100, 0);   // stays slim
    const target  = entity('Target',  100, 0);   // gets fattened each round

    const combat = new Combat([
      { entity: fighter, initiative: 15 },
      { entity: target,  initiative: 8  },
    ]);

    const turns = [];

    // Round 1: target at base weight
    combat.nextRound((c, actions) => { turns.push({ r: 1, name: c.entity.name, actions }); });

    // Fatten target to economy tier before round 2
    target.currentWeight = 100 * 4; // +300% → stage 9 → economy → 1 action

    // Round 2
    combat.nextRound((c, actions) => { turns.push({ r: 2, name: c.entity.name, actions }); });

    // Fatten target to immobile before round 3
    target.currentWeight = 100 * 6; // +500% → stage 11 → immobile → 0 actions

    // Round 3
    combat.nextRound((c, actions) => { turns.push({ r: 3, name: c.entity.name, actions }); });

    const fighterTurns = turns.filter(t => t.name === 'Fighter');
    const targetTurns  = turns.filter(t => t.name === 'Target');

    // Fighter never fattened → always 2 actions across all 3 rounds
    expect(fighterTurns.map(t => t.actions)).toEqual([2, 2, 2]);

    // Target: 2 → 1 → 0 as it gets fatter
    expect(targetTurns.map(t => t.actions)).toEqual([2, 1, 0]);

    // Throttle is strictly decreasing
    expect(targetTurns[0].actions).toBeGreaterThan(targetTurns[1].actions);
    expect(targetTurns[1].actions).toBeGreaterThan(targetTurns[2].actions);
  });

  it('initiative order: higher initiative acts first each round', () => {
    const fast = entity('Fast', 100);
    const slow = entity('Slow', 100);

    const combat = new Combat([
      { entity: slow, initiative: 3 },
      { entity: fast, initiative: 18 },
    ]);

    const order = [];
    combat.nextRound((c) => { order.push(c.entity.name); });

    expect(order).toEqual(['Fast', 'Slow']);
  });

  it('log records every turn', () => {
    const a = entity('A', 100);
    const b = entity('B', 100);
    const combat = new Combat([{ entity: a, initiative: 10 }, { entity: b, initiative: 5 }]);
    combat.nextRound(() => {});
    combat.nextRound(() => {});
    expect(combat.log).toHaveLength(4); // 2 combatants × 2 rounds
    expect(combat.log[0].round).toBe(1);
    expect(combat.log[2].round).toBe(2);
  });
});

describe('range-band interface', () => {
  it('distance between bands is correct', () => {
    const a = { band: 'engaged' };
    const b = { band: 'far' };
    expect(distance(a, b)).toBe(2);
    expect(distance(a, { band: 'near' })).toBe(1);
    expect(distance(a, { band: 'engaged' })).toBe(0);
  });

  it('canReach respects reach parameter', () => {
    const a = { band: 'engaged' };
    const b = { band: 'far' };
    expect(canReach(a, b)).toBe(false);      // reach=1 default
    expect(canReach(a, b, 2)).toBe(true);
    expect(canReach(a, { band: 'near' })).toBe(true);
  });

  it('move changes band by one step and clamps at edges', () => {
    const c = { band: 'engaged' };
    move(c, 'closer');
    expect(c.band).toBe('engaged'); // already at closest

    move(c, 'further');
    expect(c.band).toBe('near');

    move(c, 'further');
    expect(c.band).toBe('far');

    move(c, 'further');
    expect(c.band).toBe('far'); // already at furthest
  });

  it('BANDS order is engaged < near < far', () => {
    expect(BANDS).toEqual(['engaged', 'near', 'far']);
  });
});
