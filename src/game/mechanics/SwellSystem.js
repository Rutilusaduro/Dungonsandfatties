// SwellSystem — Feast Exile lifecycle, clocked on long rests.
//
// Lifecycle (all driven by long rests, since the game has no turn clock):
//   1. Cast Feast Exile  -> entity.feastExile = { restsRemaining, gorge, keep }
//                           entity.isExiled = true  (gone; skips normal rest)
//   2. Each long rest    -> restsRemaining--. While > 0 the entity is still away,
//                           feasting. When it hits 0 the entity RETURNS:
//                             - a small permanent gain is banked (keep)
//                             - a large temporary swell is applied to currentWeight
//                               and tracked in entity.swell = { remaining }
//                             - the 'engorged' condition is set for narration
//   3. Each later rest   -> the swell deflates by SWELL_FADE each time; when it
//                           drops below 1 lb the rest is removed from currentWeight
//                           and the 'engorged' condition clears. The banked `keep`
//                           stays — a little softness from every trip.
//
// applyFeastExile(targets) is called from the long-rest handler, like
// applyPreRestSharing. It returns narration notes and mutates entities in place.

import { applyBodyWeightChange } from './NutritionSystem.js';

export const SWELL_FADE = 0.5;        // fraction of the swell that deflates per rest
export const DEFAULT_EXILE_RESTS = 2; // how many rests they're away
export const DEFAULT_GORGE = 120;     // temporary swell lbs gained per rest in exile
export const KEEP_RATIO = 0.15;       // fraction of total gorge kept permanently

/** Send an entity to the feast realm. Returns the exile descriptor. */
export function beginFeastExile(entity, { rests = DEFAULT_EXILE_RESTS, gorgePerRest = DEFAULT_GORGE } = {}) {
  if (!entity) return null;
  entity.feastExile = {
    restsRemaining: Math.max(1, Math.floor(rests)),
    totalRests: Math.max(1, Math.floor(rests)),
    gorgePerRest: Math.max(0, gorgePerRest),
    accumulatedGorge: 0,
  };
  entity.isExiled = true;
  return entity.feastExile;
}

/** Process one long rest's worth of exile + swell-fade for every target. */
export function applyFeastExile(targets = []) {
  const notes = [];

  for (const entity of targets) {
    if (!entity) continue;

    // Still away, feasting.
    if (entity.feastExile) {
      const ex = entity.feastExile;
      ex.accumulatedGorge += ex.gorgePerRest;
      ex.restsRemaining -= 1;

      if (ex.restsRemaining > 0) {
        notes.push(`${entity.name} is still away in the feast realm, gorging without end.`);
        continue;
      }

      // Return: bank a little permanent gain, apply the big temporary swell.
      const keep = Math.max(1, Math.round(ex.accumulatedGorge * KEEP_RATIO));
      const swell = Math.max(0, Math.round(ex.accumulatedGorge - keep));
      applyBodyWeightChange(entity, keep); // permanent
      entity.currentWeight = Math.max(1, Math.floor((entity.currentWeight || 0) + swell)); // temporary
      entity.swell = { remaining: swell };
      entity.conditions?.add?.('engorged', { swell, intensity: swell > 200 ? 3 : swell > 80 ? 2 : 1 });
      entity.isExiled = false;
      entity.feastExile = null;
      notes.push(
        `${entity.name} returns from the feast realm vastly engorged — ${swell} lbs of temporary softness, and ${keep} lbs that will stay for good.`,
      );
      continue;
    }

    // Already back, deflating.
    if (entity.swell && entity.swell.remaining > 0) {
      const shed = Math.max(1, Math.round(entity.swell.remaining * SWELL_FADE));
      const actual = Math.min(shed, entity.swell.remaining);
      entity.currentWeight = Math.max(1, Math.floor((entity.currentWeight || 0) - actual));
      entity.swell.remaining -= actual;

      if (entity.swell.remaining < 1) {
        entity.swell = null;
        entity.conditions?.remove?.('engorged');
        notes.push(`${entity.name}'s feast-realm swell has fully settled; only a little softness remains.`);
      } else {
        notes.push(`${entity.name}'s engorged swell is going down (${entity.swell.remaining} lbs of it left).`);
      }
    }
  }

  return notes;
}

// ── ponytail: one runnable self-check (node src/game/mechanics/SwellSystem.js) ──
if (import.meta.url === `file://${process.argv[1]}`) {
  const mk = () => ({
    name: 'T', baseWeight: 150, currentWeight: 150,
    conditions: { _s: new Set(), add(k) { this._s.add(k); }, remove(k) { this._s.delete(k); }, has(k) { return this._s.has(k); } },
  });
  const e = mk();
  beginFeastExile(e, { rests: 2, gorgePerRest: 100 });
  console.assert(e.isExiled === true, 'exiled flag set');
  applyFeastExile([e]);                       // rest 1: still away
  console.assert(e.isExiled === true && e.currentWeight === 150, 'still away, no weight yet');
  applyFeastExile([e]);                        // rest 2: returns engorged
  console.assert(e.isExiled === false, 'returned');
  console.assert(e.conditions.has('engorged'), 'engorged set on return');
  const peak = e.currentWeight;
  console.assert(peak > 300, `big temp swell, got ${peak}`);
  applyFeastExile([e]);                         // fade 1
  console.assert(e.currentWeight < peak, 'swell deflating');
  let guard = 0;
  while (e.swell && guard++ < 20) applyFeastExile([e]);
  console.assert(!e.conditions.has('engorged'), 'engorged cleared after full fade');
  console.assert(e.currentWeight > 150, `kept a little permanently, got ${e.currentWeight}`);
  console.log('SwellSystem self-check passed. Final weight:', e.currentWeight, '(base 150)');
}
