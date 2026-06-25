// ═══════════════════════════════════════════════════════════════
// Combat — C0: turn loop + range-band position interface.
// Win-state checker lives in C1. Enemy AI lives in C3.
// ═══════════════════════════════════════════════════════════════
import { getStageId } from '../../textEngine/stages.js';

// ponytail: action slots, not action types — C1 adds gating by action kind
const ACTIONS_BY_MOBILITY = {
  full:     2,
  present:  2,
  planning: 2,
  economy:  1,
  minimal:  1,
  immobile: 0,
};

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

export function actionsAvailable(entity) {
  return ACTIONS_BY_MOBILITY[mobilityLevelFor(entity)] ?? 0;
}

// Range-band position interface — grid swaps in behind this in C5.
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

// Combatant slot: wraps any entity (Creature / NPC / Character) with combat state.
function makeCombatant(entity, initiative) {
  return { entity, initiative, band: 'near' };
}

export class Combat {
  constructor(entries) {
    // entries: [{ entity, initiative }]
    this.combatants = entries
      .map(e => makeCombatant(e.entity, e.initiative))
      .sort((a, b) => b.initiative - a.initiative);
    this.round = 0;
    this.log = [];
  }

  // Advance one round; calls onTurn(combatant, actionsThisRound, combat) for each actor in order.
  nextRound(onTurn) {
    this.round++;
    for (const c of this.combatants) {
      const actions = actionsAvailable(c.entity);
      onTurn(c, actions, this);
      this.log.push({ round: this.round, combatant: c.entity.name, actions });
    }
  }
}
