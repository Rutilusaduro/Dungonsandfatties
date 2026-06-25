// C0–C2 validation: turn loop, mobility throttle, fullness gauge, win-state, finishers
import { describe, it, expect } from 'vitest';
import { Creature } from '../game/entities/Creature.js';
import { matchCombos, TABLE } from '../game/magic/InteractionTable.js';
import {
  Combat,
  actionsAvailable,
  mobilityLevelFor,
  combatMobilityFor,
  checkWinState,
  fillUp,
  purge,
  distance,
  canReach,
  move,
  BANDS,
  WILLINGNESS_SUCCUMB,
} from '../game/combat/Combat.js';

// ── Helpers ───────────────────────────────────────────────────

function entity(name, baseWeight, pctGain = 0) {
  const c = new Creature(name, { baseWeight });
  c.currentWeight = baseWeight * (1 + pctGain / 100);
  return c;
}

function withFullness(ent, stomachCapacity, fullness) {
  ent.stomachCapacity = stomachCapacity;
  ent.fullness = fullness;
  return ent;
}

// ── C0: mobilityLevel + action throttle ──────────────────────

describe('mobilityLevel + action throttle', () => {
  it('maps stages to correct mobility levels', () => {
    expect(mobilityLevelFor(entity('a', 100, 0))).toBe('full');       // stage 0
    expect(mobilityLevelFor(entity('b', 100, 150))).toBe('present');  // stage 7
    expect(mobilityLevelFor(entity('c', 100, 200))).toBe('planning'); // stage 8
    expect(mobilityLevelFor(entity('d', 100, 300))).toBe('economy');  // stage 9
    expect(mobilityLevelFor(entity('e', 100, 400))).toBe('minimal');  // stage 10
    expect(mobilityLevelFor(entity('f', 100, 500))).toBe('immobile'); // stage 11
  });

  it('action count drops as weight rises', () => {
    expect(actionsAvailable(entity('slim',     100, 0))).toBe(2); // full
    expect(actionsAvailable(entity('heavy',    100, 300))).toBe(1); // economy
    expect(actionsAvailable(entity('immobile', 100, 500))).toBe(0); // immobile
  });

  it('light combatant has strictly more actions than economy-throttled one', () => {
    expect(actionsAvailable(entity('slim', 100, 0))).toBeGreaterThan(
      actionsAvailable(entity('bloated', 100, 300)),
    );
  });
});

// ── C0: turn loop ─────────────────────────────────────────────

describe('Combat turn loop', () => {
  it('runs 3 rounds in initiative order and throttle is observable', () => {
    const fighter = entity('Fighter', 100, 0);
    const target  = entity('Target',  100, 0);

    const combat = new Combat([
      { entity: fighter, initiative: 15 },
      { entity: target,  initiative: 8  },
    ], { drainRate: 0 }); // no fullness drain for this test

    const turns = [];

    combat.nextRound((c, actions) => { turns.push({ r: 1, name: c.entity.name, actions }); });

    target.currentWeight = 100 * 4; // +300% → stage 9 → economy → 1 action
    combat.nextRound((c, actions) => { turns.push({ r: 2, name: c.entity.name, actions }); });

    target.currentWeight = 100 * 6; // +500% → stage 11 → immobile → 0 actions
    combat.nextRound((c, actions) => { turns.push({ r: 3, name: c.entity.name, actions }); });

    const fighterTurns = turns.filter(t => t.name === 'Fighter');
    const targetTurns  = turns.filter(t => t.name === 'Target');

    expect(fighterTurns.map(t => t.actions)).toEqual([2, 2, 2]);
    expect(targetTurns.map(t => t.actions)).toEqual([2, 1, 0]);
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
    expect(combat.log).toHaveLength(4);
    expect(combat.log[0].round).toBe(1);
    expect(combat.log[2].round).toBe(2);
  });
});

// ── C0: range-band interface ──────────────────────────────────

describe('range-band interface', () => {
  it('distance between bands is correct', () => {
    expect(distance({ band: 'engaged' }, { band: 'far'  })).toBe(2);
    expect(distance({ band: 'engaged' }, { band: 'near' })).toBe(1);
    expect(distance({ band: 'engaged' }, { band: 'engaged' })).toBe(0);
  });

  it('canReach respects reach parameter', () => {
    const a = { band: 'engaged' };
    const b = { band: 'far' };
    expect(canReach(a, b)).toBe(false);
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

// ── C1: fullness gauge ────────────────────────────────────────

describe('fullness gauge', () => {
  it('fillUp adds to fullness and caps at stomachCapacity', () => {
    const e = withFullness(entity('glutton', 100), 200, 0);
    fillUp(e, 100);
    expect(e.fullness).toBe(100);
    fillUp(e, 200); // would overfill
    expect(e.fullness).toBe(200); // capped at capacity
  });

  it('fillUp is a no-op when stomachCapacity is 0', () => {
    const e = entity('empty', 100);
    e.stomachCapacity = 0;
    fillUp(e, 100);
    expect(e.fullness || 0).toBe(0);
  });

  it('purge drains fullness to 0 by default', () => {
    const e = withFullness(entity('stuffed', 100), 200, 180);
    purge(e);
    expect(e.fullness).toBe(0);
  });

  it('purge with amount does partial drain', () => {
    const e = withFullness(entity('bloated', 100), 200, 200);
    purge(e, 50);
    expect(e.fullness).toBe(150);
  });

  it('purge does not go below 0', () => {
    const e = withFullness(entity('slim', 100), 200, 10);
    purge(e, 500);
    expect(e.fullness).toBe(0);
  });
});

// ── C1: fullness drives mobility throttle ─────────────────────

describe('fullness → mobility throttle', () => {
  it('fullness ≥ 50% capacity drops to planning mobility', () => {
    const e = withFullness(entity('fed', 100), 200, 100); // 50% full
    expect(combatMobilityFor(e)).toBe('planning');
  });

  it('fullness ≥ 70% capacity drops to economy mobility', () => {
    const e = withFullness(entity('stuffed', 100), 200, 140); // 70% full
    expect(combatMobilityFor(e)).toBe('economy');
  });

  it('fullness ≥ 85% capacity drops to minimal mobility', () => {
    const e = withFullness(entity('bloated', 100), 200, 170); // 85% full
    expect(combatMobilityFor(e)).toBe('minimal');
  });

  it('fullness at capacity = immobile', () => {
    const e = withFullness(entity('burst', 100), 200, 200); // 100% full
    expect(combatMobilityFor(e)).toBe('immobile');
    expect(actionsAvailable(e)).toBe(0);
  });

  it('weight throttle wins when worse than fullness throttle', () => {
    // entity is economy from weight but only planning from fullness
    const e = withFullness(entity('heavy', 100, 300), 200, 100); // +300% weight = economy; 50% full = planning
    expect(combatMobilityFor(e)).toBe('economy'); // weight wins (worse)
  });

  it('fullness throttle wins when worse than weight', () => {
    // slim entity, but stomach 90% full
    const e = withFullness(entity('slim', 100, 0), 200, 180); // weight=full; fullness=minimal
    expect(combatMobilityFor(e)).toBe('minimal');
    expect(actionsAvailable(e)).toBe(1);
  });
});

// ── C1: win-state checker ─────────────────────────────────────

describe('checkWinState', () => {
  it('returns null when entity is fine', () => {
    const e = entity('fighter', 100, 0);
    expect(checkWinState(e)).toBeNull();
  });

  it('immobilized via weight: stage 11+ triggers defeat', () => {
    const e = entity('blob', 100, 500); // stage 11 → immobile
    const result = checkWinState(e);
    expect(result).toEqual({ state: 'immobilized', via: 'throttle' });
  });

  it('immobilized via fullness: capacity full triggers defeat', () => {
    const e = withFullness(entity('stuffed', 100, 0), 200, 200); // 100% full
    const result = checkWinState(e);
    expect(result).toEqual({ state: 'immobilized', via: 'throttle' });
  });

  it('succumbed when willingness crosses floor', () => {
    const e = entity('willing', 100, 0);
    e.willingness = WILLINGNESS_SUCCUMB;
    const result = checkWinState(e);
    expect(result).toEqual({ state: 'succumbed', via: 'willingness' });
  });

  it('succumbed threshold is configurable via opts', () => {
    const e = entity('reluctant', 100, 0);
    e.willingness = 60;
    expect(checkWinState(e, { succumbAt: 90 })).toBeNull();
    expect(checkWinState(e, { succumbAt: 55 })).toEqual({ state: 'succumbed', via: 'willingness' });
  });

  it('consumed: finisher sets _defeatState and checker reads it', () => {
    const e = entity('prey', 100, 0);
    e._defeatState = { state: 'consumed', via: 'vore' };
    const result = checkWinState(e);
    expect(result).toEqual({ state: 'consumed', via: 'vore' });
  });

  it('consumed takes priority over immobilized', () => {
    const e = entity('prey', 100, 500); // would be immobilized
    e._defeatState = { state: 'consumed', via: 'flesh_to_food' };
    expect(checkWinState(e).state).toBe('consumed');
  });
});

// ── C1: nextRound returns defeats + drains fullness ──────────

describe('nextRound integration (C1)', () => {
  it('nextRound returns defeat when entity crosses a gate mid-round', () => {
    const fighter = entity('Fighter', 100, 0);
    const prey    = entity('Prey',    100, 500); // stage 11 from the start

    const combat = new Combat([
      { entity: fighter, initiative: 10 },
      { entity: prey,    initiative: 5  },
    ]);

    const defeats = combat.nextRound(() => {});
    expect(defeats).toHaveLength(1);
    expect(defeats[0].winState.state).toBe('immobilized');
    expect(defeats[0].combatant.entity.name).toBe('Prey');
  });

  it('purge drops throttle back a rung between rounds', () => {
    const e = entity('glutton', 100, 0);
    e.stomachCapacity = 200;
    e.fullness = 190; // 95% → minimal → 1 action

    const combat = new Combat([{ entity: e, initiative: 10 }], { drainRate: 0 });

    let actions1;
    combat.nextRound((c, a) => { actions1 = a; });
    expect(actions1).toBe(1); // minimal from fullness

    // Player purges between rounds
    purge(e);
    expect(e.fullness).toBe(0);

    let actions2;
    combat.nextRound((c, a) => { actions2 = a; });
    expect(actions2).toBe(2); // back to full (no weight gain)

    expect(actions2).toBeGreaterThan(actions1);
  });

  it('per-round drain reduces fullness each round', () => {
    const e = entity('eating', 100, 0);
    e.stomachCapacity = 200;
    e.fullness = 200; // start full

    // drainRate 0.5 = 50% of capacity per round = 100 units
    const combat = new Combat([{ entity: e, initiative: 10 }], { drainRate: 0.5 });
    combat.nextRound(() => {});
    expect(e.fullness).toBe(100); // 200 - 100

    combat.nextRound(() => {});
    expect(e.fullness).toBe(0);   // 100 - 100
  });
});

// ── C2: finishers as InteractionTable entries ────────────────

// Simulate the resolver's combo path: match, then run effects with { target }.
function castFinisher(triggerSpell, target) {
  const matches = matchCombos(triggerSpell, [], target, null);
  for (const { entry } of matches) {
    if (entry.effect) entry.effect({ target });
  }
  return matches;
}

describe('finishers (C2)', () => {
  it('every finisher entry declares a valid defeat state + condition gate', () => {
    const states = ['immobilized', 'succumbed', 'consumed'];
    const finishers = TABLE.filter(e => e.finisher);
    expect(finishers.length).toBeGreaterThan(0);
    for (const f of finishers) {
      expect(states).toContain(f.defeat?.state);
      expect(f.requires?.condition).toBeTruthy();
    }
  });

  it('bury fires on a restrained HEAVY target → immobilized', () => {
    const e = entity('bound-blob', 100, 250); // stage 9 (heavy, ≥8)
    e.conditions.add('restrained', { source: 'hold_person' });
    castFinisher('Shape Earth', e);
    expect(e._defeatState).toEqual({ state: 'immobilized', via: 'buried' });
  });

  it('bury REFUSES a restrained but LIGHT target (mass gate denies apex)', () => {
    const e = entity('bound-thin', 100, 0); // stage 0 (light)
    e.conditions.add('restrained', { source: 'hold_person' });
    const matches = castFinisher('Shape Earth', e);
    expect(matches.some(m => m.entry.id === 'finisher.bury')).toBe(true); // combo matched
    expect(e._defeatState).toBeUndefined(); // but mass gate blocked the defeat
  });

  it('bury does not even match when the precondition (restrained) is absent', () => {
    const e = entity('free-blob', 100, 250); // heavy but not restrained
    const matches = matchCombos('Shape Earth', [], e, null);
    expect(matches.some(m => m.entry.id === 'finisher.bury')).toBe(false);
    expect(e._defeatState).toBeUndefined();
  });

  it('crush fires on a buried HEAVY target → immobilized via gravity', () => {
    const e = entity('sunk', 100, 300); // stage 9
    e.conditions.add('buried', { depth: 2 });
    castFinisher('Enhance Gravity', e);
    expect(e._defeatState).toEqual({ state: 'immobilized', via: 'gravity' });
  });

  it('render fires on a satiated target → consumed (no mass gate)', () => {
    const e = entity('stuffed', 100, 0); // any size
    e.conditions.add('satiated');
    castFinisher('Flesh to Food', e);
    expect(e._defeatState).toEqual({ state: 'consumed', via: 'flesh_to_food' });
  });

  it('swallow (vore) fires on an asleep SMALL target → consumed', () => {
    const e = entity('napping-mouse', 100, 0); // stage 0, small
    e.conditions.add('asleep');
    castFinisher('Draconic Hunger', e);
    expect(e._defeatState).toEqual({ state: 'consumed', via: 'vore' });
  });

  it('swallow REFUSES an asleep HEAVY target (vore wants small — inverted gate)', () => {
    const e = entity('napping-blob', 100, 300); // stage 9, too big to swallow
    e.conditions.add('asleep');
    castFinisher('Draconic Hunger', e);
    expect(e._defeatState).toBeUndefined();
  });

  it('a fired finisher is read by checkWinState', () => {
    const e = entity('victim', 100, 250);
    e.conditions.add('restrained', { source: 'hold_person' });
    castFinisher('Shape Earth', e);
    expect(checkWinState(e)).toEqual({ state: 'immobilized', via: 'buried' });
  });
});
