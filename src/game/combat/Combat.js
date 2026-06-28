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

// ── Position interface — grid-backed (C5) ────────────────────
// The C0 range-bands turned out to be the x-axis of a grid: engaged/near/far
// are cells (0,0)/(1,0)/(2,0) on the y=0 lane. So every legacy {band} reads as
// a grid cell, Chebyshev distance reproduces the old band numbers exactly, and
// none of the win-logic above had to change. The grid just adds the y
// dimension, diagonal movement, and line-of-sight on top.
// ponytail: no obstacle map / rendering here — this is the pure-logic seam;
// the text game has no canvas, and obstacles land with the encounter editor.

export const BANDS = ['engaged', 'near', 'far'];

// A position is {x, y}; legacy callers pass {band}, mapped to x on the y=0 lane.
function coords(p) {
  if (p.x != null) return { x: p.x, y: p.y ?? 0 };
  return { x: Math.max(0, BANDS.indexOf(p.band)), y: 0 };
}

// Chebyshev distance — a diagonal step costs 1, matching grid movement. On the
// band lane (same y) this is |dx|, identical to the old indexOf subtraction.
export function distance(a, b) {
  const pa = coords(a), pb = coords(b);
  return Math.max(Math.abs(pa.x - pb.x), Math.abs(pa.y - pb.y));
}

export function canReach(a, b, reach = 1) {
  return distance(a, b) <= reach;
}

const DIRS = {
  closer:  { dx: -1, dy:  0 }, // legacy band axis
  further: { dx: +1, dy:  0 },
  up:      { dx:  0, dy: -1 }, // grid lanes
  down:    { dx:  0, dy: +1 },
};

// move(combatant, dir, opts) — opts.maxX/maxY bound the field (default: band lane).
export function move(combatant, dir, opts = {}) {
  const step = DIRS[dir];
  if (!step) return;
  const cur = coords(combatant);
  const maxX = opts.maxX ?? (BANDS.length - 1);
  const maxY = opts.maxY ?? 0;
  combatant.x = Math.max(0, Math.min(maxX, cur.x + step.dx));
  combatant.y = Math.max(0, Math.min(maxY, cur.y + step.dy));
  // Keep the legacy band view in sync while on the band lane.
  if (combatant.y === 0 && combatant.x < BANDS.length) combatant.band = BANDS[combatant.x];
}

// Line of sight via Bresenham: clear unless a blocked cell sits between a and b.
// blocked(x, y) -> true if that cell stops sight (default: nothing blocks).
export function lineOfSight(a, b, blocked = () => false) {
  let { x: x0, y: y0 } = coords(a);
  const { x: x1, y: y1 } = coords(b);
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  while (x0 !== x1 || y0 !== y1) {
    const e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 <  dx) { err += dx; y0 += sy; }
    if (x0 === x1 && y0 === y1) break;      // endpoint is the target, not an obstacle
    if (blocked(x0, y0)) return false;
  }
  return true;
}

// ── Combat class ──────────────────────────────────────────────

function makeCombatant(entity, initiative, pos = {}) {
  // Ensure fullness fields exist — entities created outside combat may lack them.
  if (!entity.stomachCapacity) entity.stomachCapacity = 0;
  if (entity.fullness == null) entity.fullness = 0;
  const x = pos.x ?? 1, y = pos.y ?? 0;
  return { entity, initiative, band: BANDS[Math.min(x, BANDS.length - 1)] || 'near', x, y };
}

export class Combat {
  constructor(entries, opts = {}) {
    // entries: [{ entity, initiative, x?, y? }]
    // opts: { drainRate (0-1, default 0.1), succumbAt (0-100, default 75) }
    this._drainRate = opts.drainRate ?? 0.1;
    this._opts = opts;
    this.combatants = entries
      .map(e => makeCombatant(e.entity, e.initiative, { x: e.x, y: e.y }))
      .sort((a, b) => b.initiative - a.initiative);
    this.round = 0;
    this.log = [];
  }

  // The player combatant (kind !== enemy) and the living enemy combatants.
  playerCombatant() { return this.combatants.find(c => !c.entity.isEnemy) || null; }
  livingEnemies() { return this.combatants.filter(c => c.entity.isEnemy && !checkWinState(c.entity, this._opts)); }
  encounterWon() { return this.combatants.some(c => c.entity.isEnemy) && this.livingEnemies().length === 0; }

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
