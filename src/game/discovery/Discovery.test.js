import { describe, it, expect } from 'vitest';
import { Discovery, idOf } from './Discovery.js';

// Mirrors the gate SpellCaster applies: a candidate is targetable only if seen.
function gatedTargets(zoneId, candidates, discovery) {
  return candidates.filter(e => !discovery || discovery.has(zoneId, idOf(e)));
}

describe('Discovery fog-of-war', () => {
  const boris = { id: 'npc_barkeep_boris', name: 'Barkeep Boris' };
  const mira = { id: 'npc_mira', name: 'Mira the Regular' };

  it('hides un-revealed entities from a gated target list', () => {
    const d = new Discovery();
    expect(gatedTargets('tavern', [boris, mira], d)).toEqual([]);
    d.reveal('tavern', boris);
    expect(gatedTargets('tavern', [boris, mira], d)).toEqual([boris]);
  });

  it('revealAll surfaces everything present and is idempotent', () => {
    const d = new Discovery();
    expect(d.revealAll('tavern', [boris, mira])).toHaveLength(2);
    expect(d.revealAll('tavern', [boris, mira])).toHaveLength(0);
    expect(gatedTargets('tavern', [boris, mira], d)).toHaveLength(2);
  });

  it('is location-scoped and survives a serialize round-trip', () => {
    const d = new Discovery();
    d.reveal('tavern', boris);
    expect(d.has('garden', idOf(boris))).toBe(false);
    const round = Discovery.hydrate(JSON.parse(JSON.stringify(d.serialize())));
    expect(round.has('tavern', idOf(boris))).toBe(true);
  });

  it('null discovery means no gate (filters show all)', () => {
    expect(gatedTargets('tavern', [boris, mira], null)).toHaveLength(2);
  });
});
