// ═══════════════════════════════════════════════════════════════
// EnemyController — C3: scripted per-trait enemy AI.
// The enemy uses the SAME action set as the player (symmetric offense):
// force-feed the opponent, gorge itself, purge, reposition. A trait also
// DENIES certain finisher preconditions — but never enough to leave fewer
// than 2 open paths (enforced in content:lint).
// Utility AI is a later upgrade; these scripts are the lazy-correct start.
// ponytail: deterministic scripts — no RNG yet; add a seed when variety lands.
// ═══════════════════════════════════════════════════════════════
import { fillUp, purge, move, distance, checkWinState, BANDS } from './Combat.js';

const OPP_DIR = { closer: 'further', further: 'closer', up: 'down', down: 'up' };

// Pick a single grid step that moves selfPos toward (or away from) oppPos,
// stepping along the axis of greatest separation. Field-aware bounds.
function stepRelative(selfPos, oppPos, bounds, away) {
  if (!selfPos || !oppPos) return;
  const dx = oppPos.x - selfPos.x, dy = oppPos.y - selfPos.y;
  let dir;
  if (dx !== 0 && Math.abs(dx) >= Math.abs(dy)) dir = dx > 0 ? 'further' : 'closer';
  else if (dy !== 0) dir = dy > 0 ? 'down' : 'up';
  else if (dx !== 0) dir = dx > 0 ? 'further' : 'closer';
  else return; // same cell
  move(selfPos, away ? OPP_DIR[dir] : dir, bounds);
}

// Finisher preconditions an archetype may deny. Kept in sync with the finisher
// entries by content:lint (which derives the real set from the InteractionTable).
export const FINISHER_PRECONDITIONS = ['restrained', 'buried', 'satiated', 'asleep'];

export const ARCHETYPES = {
  // Light flyer — kites out of reach; can't be grounded, so bury fails.
  flyer: {
    id: 'flyer',
    denies: ['buried'],
    feedRate: 0.18,
    script: (api) => {
      let b = api.actions;
      if (b > 0 && api.distance() < 2) { api.kite(); b--; }
      while (b-- > 0) api.forceFeed();
    },
  },

  // Heavy brute — slow and denies nothing; easy to fatten, wants bury/crush.
  brute: {
    id: 'brute',
    denies: [],
    feedRate: 0.30,
    script: (api) => {
      let b = api.actions;
      if (b > 0 && api.distance() > 0) { api.close(); b--; }
      while (b-- > 0) api.forceFeed();
    },
  },

  // Willing glutton — over-eats itself; rushes toward succumb on its own.
  glutton: {
    id: 'glutton',
    denies: [],
    feedRate: 0.10,
    gorgeRate: 0.34,
    gorgeWill: 14,
    script: (api) => {
      let b = api.actions;
      while (b-- > 0) api.gorge();
    },
  },

  // Anti-mage / dispeller — purges its own fullness every round to shrug off
  // the throttle, so raw fattening stalls; denies restraint. Beat it with an
  // open finisher path (satiated, buried, asleep).
  dispeller: {
    id: 'dispeller',
    denies: ['restrained'],
    feedRate: 0.15,
    script: (api) => {
      let b = api.actions;
      if (b > 0) { api.purgeSelf(); b--; }
      while (b-- > 0) api.forceFeed();
    },
  },

  // Leech — races BOTH gauges: gorges itself (creeping toward its own succumb)
  // while still force-feeding you. Greedy and self-destructive; punish by out-
  // pacing it, or let it overfeed itself. Denies nothing.
  leech: {
    id: 'leech',
    denies: [],
    feedRate: 0.20,
    gorgeRate: 0.15,
    gorgeWill: 8,
    script: (api) => {
      let b = api.actions;
      if (b > 0) { api.gorge(); b--; }   // feeds its own appetite first
      while (b-- > 0) api.forceFeed();
    },
  },

  // Warden — a tougher dispeller. Purges its own fullness AND closes to feed,
  // and its enchantment resists the satiated finisher. Beat it via a different
  // open path (buried/restrained/asleep) or simply out-throttle the purge.
  warden: {
    id: 'warden',
    denies: ['satiated'],
    feedRate: 0.22,
    script: (api) => {
      let b = api.actions;
      if (b > 0) { api.purgeSelf(); b--; }
      if (b > 0 && api.distance() > 0) { api.close(); b--; }
      while (b-- > 0) api.forceFeed();
    },
  },

  // Colossus — shakes off fullness at 50%; player must sustain conditions + pressure.
  // Denies burial (too massive to ground). Requires combo, not spam.
  colossus: {
    id: 'colossus',
    denies: ['buried'],
    feedRate: 0.28,
    script: (api) => {
      let b = api.actions;
      const full = api.self.fullness || 0;
      const cap = api.self.stomachCapacity || 1;
      if (b > 0 && full >= cap * 0.5) { api.purgeSelf(); b--; }
      if (b > 0) { api.close(); b--; }
      while (b-- > 0) api.forceFeed();
    },
  },

  // Trickster — pure evasion. Kites out of reach and purges to stall the
  // throttle, feeding little. Raw fattening crawls; it's built to be finished
  // with a combo, not a gauge race. Denies bury (never grounded).
  trickster: {
    id: 'trickster',
    denies: ['buried'],
    feedRate: 0.08,
    script: (api) => {
      let b = api.actions;
      if (b > 0 && api.distance() < 2) { api.kite(); b--; }
      if (b > 0) { api.purgeSelf(); b--; }
      while (b-- > 0) api.forceFeed();
    },
  },
};

export function deniesCondition(traitId, key) {
  return (ARCHETYPES[traitId]?.denies || []).includes(key);
}

// Apply a condition, respecting the target's trait denial. Returns false if denied.
export function applyCondition(entity, key, meta = {}) {
  const t = entity._trait;
  if (t && deniesCondition(t, key)) return false;
  entity.conditions.add(key, meta);
  return true;
}

// Bound action helpers handed to a script. Each call is one action.
function makeApi({ self, opponent, selfPos, oppPos, actions, trait, field }) {
  const bounds = { maxX: field?.maxX ?? (BANDS.length - 1), maxY: field?.maxY ?? 0 };
  return {
    self, opponent, actions,
    distance: () => distance(selfPos, oppPos),
    forceFeed: () => fillUp(opponent, trait.feedRate * (opponent.stomachCapacity || 0)),
    gorge: () => {
      fillUp(self, (trait.gorgeRate ?? trait.feedRate) * (self.stomachCapacity || 0));
      self.willingness = Math.min(100, (self.willingness ?? 50) + (trait.gorgeWill ?? 0));
    },
    purgeSelf: () => purge(self),
    // Move relative to the player's actual cell (2D, field-aware).
    kite: () => stepRelative(selfPos, oppPos, bounds, true),
    close: () => stepRelative(selfPos, oppPos, bounds, false),
  };
}

// Returns a controller fn for runEncounter: (ctx) => void.
export function controllerFor(traitId) {
  const trait = ARCHETYPES[traitId];
  if (!trait) throw new Error(`unknown archetype: ${traitId}`);
  return (ctx) => trait.script(makeApi({ ...ctx, trait }));
}

// Drive an encounter to a terminal state.
// controllers: { [combatantName]: (ctx) => void }  where ctx =
//   { self, opponent, selfPos, oppPos, actions, combat }
// Returns { round, loser, winState } — loser is null on timeout (draw).
export function runEncounter({ combat, controllers, maxRounds = 50 }) {
  for (let r = 0; r < maxRounds; r++) {
    const defeats = combat.nextRound((c, actions) => {
      const oppPos = combat.combatants.find(x => x !== c);
      const ctrl = controllers[c.entity.name];
      if (ctrl) {
        ctrl({
          self: c.entity,
          opponent: oppPos?.entity,
          selfPos: c,
          oppPos,
          actions,
          combat,
        });
      }
    });
    if (defeats.length) {
      const d = defeats[0];
      return { round: combat.round, loser: d.combatant.entity.name, winState: d.winState };
    }
  }
  return { round: combat.round, loser: null, winState: null };
}

// Re-export for callers that already imported the controller module.
export { checkWinState };
