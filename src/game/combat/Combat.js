// ═══════════════════════════════════════════════════════════════
// Combat — C0 turn loop + range-bands; C1 win-state + fullness gauge.
// Enemy AI lives in C3.
// ═══════════════════════════════════════════════════════════════
import { getStageId } from '../../textEngine/stages.js';

// ponytail: action slots, not action types — later phases add gating by action kind
const ACTIONS_BY_MOBILITY = {
  full:     2,
  present:  2,
  planning: 2,
  economy:  1,
  minimal:  1,
  immobile: 0,
};

// Rank table for taking the worse of two mobility levels.
const MOBILITY_RANK = { full: 0, present: 1, planning: 2, economy: 3, minimal: 4, immobile: 5 };

// Weight-stage → mobility level (C0).
export function mobilityLevelFor(entity) {
  const base = entity.baseWeight ?? 150;
  const stage = getStageId(entity.currentWeight ?? base, base);
  if (stage <= 6)  return 'full';
  if (stage <= 7)  return 'present';
  if (stage <= 8)  return 'planning';
  if (stage <= 9)  return 'economy';
  if (stage <= 10) return 'minimal';
  return 'immobile';
}

// Fullness-ratio → mobility level (C1).
function fullnessMobilityFor(entity) {
  const cap = entity.stomachCapacity || 0;
  if (!cap) return 'full';
  const r = (entity.fullness || 0) / cap;
  if (r >= 1.0)  return 'immobile';
  if (r >= 0.85) return 'minimal';
  if (r >= 0.70) return 'economy';
  if (r >= 0.50) return 'planning';
  return 'full';
}

// Effective combat mobility = worst of weight and fullness throttles.
export function combatMobilityFor(entity) {
  const wm = mobilityLevelFor(entity);
  const fm = fullnessMobilityFor(entity);
  return MOBILITY_RANK[wm] >= MOBILITY_RANK[fm] ? wm : fm;
}

export function actionsAvailable(entity) {
  return ACTIONS_BY_MOBILITY[combatMobilityFor(entity)] ?? 0;
}

// ── Fullness gauge ────────────────────────────────────────────

export function fillUp(entity, amount) {
  const cap = entity.stomachCapacity || 0;
  if (!cap || amount <= 0) return;
  entity.fullness = Math.min(cap, (entity.fullness || 0) + amount);
}

// Drain fullness (purge action or per-round decay).
// amount defaults to full clear (purge action); pass a fraction for decay.
export function purge(entity, amount) {
  const drain = amount ?? (entity.stomachCapacity || 0);
  entity.fullness = Math.max(0, (entity.fullness || 0) - drain);
}

function drainPerRound(entity, rate) {
  const cap = entity.stomachCapacity || 0;
  if (!cap) return;
  entity.fullness = Math.max(0, (entity.fullness || 0) - cap * rate);
}

// ── Win-state checker (C1) ────────────────────────────────────

// Willingness floor at which target succumbs (turns gluttonous, self-feeds).
export const WILLINGNESS_SUCCUMB = 75;

/**
 * Returns a defeat object or null.
 *   { state: 'immobilized' | 'succumbed' | 'consumed', via: string }
 * `consumed` is set externally by finisher entries (C2) via entity._defeatState.
 */
export function checkWinState(entity, opts = {}) {
  const succumbAt = opts.succumbAt ?? WILLINGNESS_SUCCUMB;

  if (entity._defeatState) return entity._defeatState; // finisher override (C2)

  if (combatMobilityFor(entity) === 'immobile')
    return { state: 'immobilized', via: 'throttle' };

  if ((entity.willingness ?? 50) >= succumbAt)
    return { state: 'succumbed', via: 'willingness' };

  return null;
}

// ── Range-band position interface (C0, grid swaps in at C5) ──

export const BANDS = ['engaged', 'near', 'far'];

export function distance(a, b) {
  return Math.abs(BANDS.indexOf(a.band) - BANDS.indexOf(b.band));
}

export function canReach(a, b, reach = 1) {
  return distance(a, b) <= reach;
}

export function move(combatant, dir) {
  const idx = BANDS.indexOf(combatant.band);
  const next = dir === 'closer' ? idx - 1 : idx + 1;
  combatant.band = BANDS[Math.max(0, Math.min(BANDS.length - 1, next))];
}

// ── Combat class ──────────────────────────────────────────────

function makeCombatant(entity, initiative) {
  // Ensure fullness fields exist — entities created outside combat may lack them.
  if (!entity.stomachCapacity) entity.stomachCapacity = 0;
  if (entity.fullness == null) entity.fullness = 0;
  return { entity, initiative, band: 'near' };
}

export class Combat {
  constructor(entries, opts = {}) {
    // entries: [{ entity, initiative }]
    // opts: { drainRate (0-1, default 0.1), succumbAt (0-100, default 75) }
    this._drainRate = opts.drainRate ?? 0.1;
    this._opts = opts;
    this.combatants = entries
      .map(e => makeCombatant(e.entity, e.initiative))
      .sort((a, b) => b.initiative - a.initiative);
    this.round = 0;
    this.log = [];
  }

  // Advance one round.
  // Calls onTurn(combatant, actionsThisRound, combat) for each living actor.
  // Returns array of { combatant, winState } for any defeat that fired this round.
  nextRound(onTurn) {
    this.round++;
    const defeated = [];

    for (const c of this.combatants) {
      const actions = actionsAvailable(c.entity);
      onTurn(c, actions, this);
      const winState = checkWinState(c.entity, this._opts);
      if (winState) defeated.push({ combatant: c, winState });
      this.log.push({ round: this.round, combatant: c.entity.name, actions });
    }

    // Per-round fullness drain (after all turns so a filled combatant feels it next round).
    for (const c of this.combatants) drainPerRound(c.entity, this._drainRate);

    return defeated;
  }
}
