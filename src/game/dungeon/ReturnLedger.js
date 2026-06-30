// ReturnLedger — tracks dungeon foes that come back fatter after defeat.
// Pure JS, no React. A plain object keyed by enemy NAME (returns keep their
// name, so an enemy's whole arc accumulates in one entry):
//   { [name]: { stage, nextFloor, retired } }
// Beaten by stuffing (immobilized) or weight (fattened) advances the stage;
// every other defeat is terminal. Stage 5 = retired (truly gone, max fat).

export const RETURN_STAGE_MAX = 5;
export const GRADUATION_BONUS = 75;

export function claimGraduation(ledger, name) { delete ledger[name]; }

export function makeReturnLedger() { return {}; }

// Advance a foe's return arc on defeat. Only immobilized/fattened re-arm a
// return; fattened climbs twice as fast (one stage fatter than immobilized).
// floorIndex is where this defeat happened — the return surfaces one floor deeper.
export function recordDefeat(ledger, name, defeatVia, floorIndex, canReturn) {
  if (!canReturn) return;
  if (defeatVia !== 'immobilized' && defeatVia !== 'fattened') return;
  const cur = ledger[name] || { stage: 0, nextFloor: null, retired: false };
  if (cur.retired) return;
  const delta = defeatVia === 'fattened' ? 2 : 1;
  const stage = cur.stage + delta;
  if (stage >= RETURN_STAGE_MAX) {
    ledger[name] = { stage: RETURN_STAGE_MAX, nextFloor: null, retired: true, graduated: true };
  } else {
    ledger[name] = { stage, nextFloor: floorIndex + 1, retired: false };
  }
}

// Foes due to first appear on this floor (stage 1-4, not retired).
export function dueReturns(ledger, floorIndex) {
  const out = [];
  for (const [name, e] of Object.entries(ledger || {})) {
    if (!e.retired && e.nextFloor === floorIndex && e.stage >= 1 && e.stage <= 4) {
      out.push({ name, stage: e.stage });
    }
  }
  return out;
}

// ── self-check: node src/game/dungeon/ReturnLedger.js ──
if (typeof process !== 'undefined' && process.argv?.[1] && import.meta.url === `file://${process.argv[1]}`) {
  const L = makeReturnLedger();
  // non-returner: nothing recorded
  recordDefeat(L, 'Boss', 'fattened', 0, false);
  console.assert(Object.keys(L).length === 0, 'non-returner ignored');
  // succumb doesn't re-arm
  recordDefeat(L, 'Imp', 'succumbed', 0, true);
  console.assert(!L['Imp'], 'succumb does not arm a return');
  // immobilize on floor 0 → stage 1, surfaces floor 1
  recordDefeat(L, 'Imp', 'immobilized', 0, true);
  console.assert(L['Imp'].stage === 1 && L['Imp'].nextFloor === 1, 'immobilize +1, next floor');
  console.assert(dueReturns(L, 1).some(r => r.name === 'Imp' && r.stage === 1), 'due on floor 1');
  console.assert(dueReturns(L, 2).length === 0, 'not due on floor 2');
  // fattened on floor 1 → +2 → stage 3, surfaces floor 2
  recordDefeat(L, 'Imp', 'fattened', 1, true);
  console.assert(L['Imp'].stage === 3 && L['Imp'].nextFloor === 2, 'fattened +2');
  // fattened again on floor 2 → 3+2=5 → retired
  recordDefeat(L, 'Imp', 'fattened', 2, true);
  console.assert(L['Imp'].retired && L['Imp'].stage === 5, 'stage 5 retires');
  console.assert(dueReturns(L, 3).length === 0, 'retired never due');
  // retired stays retired
  recordDefeat(L, 'Imp', 'immobilized', 3, true);
  console.assert(L['Imp'].stage === 5, 'retired is terminal');
  console.log('ReturnLedger self-check OK');
}
