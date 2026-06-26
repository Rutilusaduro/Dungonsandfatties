// C0–C2 validation: turn loop, mobility throttle, fullness gauge, win-state, finishers
import { describe, it, expect } from 'vitest';
import { Creature } from '../game/entities/Creature.js';
import { matchCombos, TABLE } from '../game/magic/InteractionTable.js';
import {
  ARCHETYPES,
  controllerFor,
  runEncounter,
  applyCondition,
  deniesCondition,
  FINISHER_PRECONDITIONS,
} from '../game/combat/EnemyController.js';
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
import { computeReward } from '../game/combat/Reward.js';
import { getTextEngine } from '../textEngine/index.js';

// A player that force-feeds the enemy with every available action.
function playerFeeder(rate) {
  return ({ opponent, actions }) => {
    for (let i = 0; i < actions; i++) fillUp(opponent, rate * (opponent.stomachCapacity || 0));
  };
}

function combatant(ent, capacity, initiative) {
  ent.stomachCapacity = capacity;
  ent.fullness = 0;
  return { entity: ent, initiative };
}

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

// ── C3: scripted enemy controller ────────────────────────────

describe('archetype trait denial (C3)', () => {
  it('every archetype leaves >= 2 finisher preconditions open', () => {
    for (const [id, trait] of Object.entries(ARCHETYPES)) {
      const open = FINISHER_PRECONDITIONS.filter(c => !(trait.denies || []).includes(c));
      expect(open.length, `archetype ${id}`).toBeGreaterThanOrEqual(2);
    }
  });

  it('deniesCondition reflects each archetype denial list', () => {
    expect(deniesCondition('flyer', 'buried')).toBe(true);
    expect(deniesCondition('flyer', 'restrained')).toBe(false);
    expect(deniesCondition('brute', 'buried')).toBe(false);
    expect(deniesCondition('dispeller', 'restrained')).toBe(true);
  });

  it('applyCondition is blocked by a trait that denies it', () => {
    const flyer = entity('Wisp', 100, 0);
    flyer._trait = 'flyer';
    expect(applyCondition(flyer, 'buried')).toBe(false); // flyer can't be grounded
    expect(flyer.conditions.has('buried')).toBe(false);
    expect(applyCondition(flyer, 'restrained', { source: 'hold_person' })).toBe(true);
    expect(flyer.conditions.has('restrained')).toBe(true);
  });

  it('applyCondition always succeeds on a trait-less or non-denying entity', () => {
    const brute = entity('Ogre', 100, 0);
    brute._trait = 'brute';
    expect(applyCondition(brute, 'buried')).toBe(true);
    expect(brute.conditions.has('buried')).toBe(true);
  });
});

describe('deterministic encounters (C3)', () => {
  it('brute: easy to fatten — loses to immobilized', () => {
    const player = entity('Player', 100, 0);
    const brute  = entity('Brute', 100, 0);
    brute._trait = 'brute';

    const combat = new Combat(
      [combatant(player, 100, 20), combatant(brute, 100, 10)],
      { drainRate: 0 },
    );
    const result = runEncounter({
      combat,
      controllers: { Player: playerFeeder(0.35), Brute: controllerFor('brute') },
    });

    expect(result.loser).toBe('Brute');
    expect(result.winState.state).toBe('immobilized');
  });

  it('flyer: kites but still fattens to immobilized via fullness', () => {
    const player = entity('Player', 100, 0);
    const flyer  = entity('Flyer', 100, 0);
    flyer._trait = 'flyer';

    const combat = new Combat(
      [combatant(player, 100, 20), combatant(flyer, 100, 10)],
      { drainRate: 0 },
    );
    const result = runEncounter({
      combat,
      controllers: { Player: playerFeeder(0.35), Flyer: controllerFor('flyer') },
    });

    expect(result.loser).toBe('Flyer');
    expect(result.winState.state).toBe('immobilized');
  });

  it('glutton: over-eats itself and succumbs unaided', () => {
    const player  = entity('Player', 100, 0);
    const glutton = entity('Glutton', 100, 0);
    glutton._trait = 'glutton';

    // Glutton acts first; player does nothing — it defeats itself.
    const combat = new Combat(
      [combatant(glutton, 100, 20), combatant(player, 100, 10)],
      { drainRate: 0 },
    );
    const result = runEncounter({
      combat,
      controllers: { Glutton: controllerFor('glutton'), Player: () => {} },
    });

    expect(result.loser).toBe('Glutton');
    expect(result.winState.state).toBe('succumbed');
    expect(result.round).toBe(1); // self-feeds past the willingness floor immediately
  });

  it('dispeller: raw fattening stalls out — no one wins', () => {
    const player    = entity('Player', 100, 0);
    const dispeller = entity('Dispeller', 100, 0);
    dispeller._trait = 'dispeller';

    const combat = new Combat(
      [combatant(player, 100, 20), combatant(dispeller, 100, 10)],
      { drainRate: 0 },
    );
    const result = runEncounter({
      combat,
      controllers: { Player: playerFeeder(0.35), Dispeller: controllerFor('dispeller') },
      maxRounds: 40,
    });

    // Each round the dispeller purges the fullness the player piled on, so the
    // fattening path never lands — a stalemate that forces a finisher instead.
    expect(result.loser).toBeNull();
  });

  it('dispeller: an open finisher path (satiated → Flesh to Food) wins', () => {
    const player    = entity('Player', 100, 0);
    const dispeller = entity('Dispeller', 100, 0);
    dispeller._trait = 'dispeller';

    // Player opens the satiated path (dispeller denies restrained, not satiated)
    // and lands the render finisher on round 1.
    const playerFinish = ({ opponent }) => {
      if (applyCondition(opponent, 'satiated')) castFinisher('Flesh to Food', opponent);
    };

    const combat = new Combat(
      [combatant(player, 100, 20), combatant(dispeller, 100, 10)],
      { drainRate: 0 },
    );
    const result = runEncounter({
      combat,
      controllers: { Player: playerFinish, Dispeller: controllerFor('dispeller') },
    });

    expect(result.loser).toBe('Dispeller');
    expect(result.winState.state).toBe('consumed');
    expect(result.round).toBe(1);
  });
});

// ── C4: rewards + victory scene skeleton ──────────────────────

describe('computeReward (C4)', () => {
  it('scales with the loser final stage — a glut-clear dwarfs a floor-win', () => {
    const floor = computeReward(entity('Floor', 100, 5), { state: 'immobilized' });  // stage 1
    const glut  = computeReward(entity('Glut', 100, 300), { state: 'succumbed' });   // stage 9
    expect(floor.stage).toBe(1);
    expect(glut.stage).toBe(9);
    expect(glut.xp).toBeGreaterThan(floor.xp * 5);
    expect(glut.calorieBank).toBeGreaterThan(floor.calorieBank);
    expect(glut.loot).toBeGreaterThan(floor.loot);
  });

  it('consuming the enemy doubles the calorie bank vs an equal-stage non-consume win', () => {
    const eaten   = computeReward(entity('A', 100, 300), { state: 'consumed' });
    const pinned  = computeReward(entity('B', 100, 300), { state: 'succumbed' });
    expect(eaten.stage).toBe(pinned.stage);
    expect(eaten.calorieBank).toBe(pinned.calorieBank * 2);
  });
});

describe('vic.* scene skeleton (C4)', () => {
  const engine = getTextEngine();

  it('size_payoff resolves a line at every weight stage', () => {
    for (const pct of [0, 5, 30, 75, 150, 300, 500]) {
      const subject = entity('S', 100, pct);
      expect(engine.render('vic.size_payoff', { subject })).toBeTruthy();
    }
  });

  it('floor-win and glut-clear produce visibly different prose', () => {
    const floor = engine.render('vic.scene', {
      subject: entity('Mira', 100, 5),
      globals: { state: 'immobilized', via: 'throttle' },
    });
    const glut = engine.render('vic.scene', {
      subject: withFullness(entity('Mira', 100, 300), 100, 0),
      globals: { state: 'consumed', via: 'flesh_to_food' },
    });
    expect(floor).toBeTruthy();
    expect(glut).toBeTruthy();
    expect(floor).not.toBe(glut);
    // The small loser reads as barely-softened; the big one does not.
    expect(floor).toMatch(/little spoil|barely softened/);
  });

  it('the bespoke boss override wins on priority regardless of willingness', () => {
    const gert = entity('Gertrude', 100, 150);
    gert.persona = 'gertrude';
    gert.willingness = 30; // would otherwise hit the "furious" aftermath line
    const out = engine.render('vic.aftermath', { subject: gert });
    expect(out).toMatch(/butter/);
  });
});
