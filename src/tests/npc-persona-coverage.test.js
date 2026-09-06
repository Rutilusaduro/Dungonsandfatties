import { describe, it, expect } from 'vitest';
import { NPC_ROSTER } from '../game/world/data/npcRoster.js';
import { buildEnrichedProfile } from '../textEngine/scenes/rosterVoice.js';
import { initializeTextEngine, getTextEngine } from '../textEngine/index.js';
import { getStageId } from '../textEngine/stages.js';

function mockNpc(def, weightGainPct) {
  const base = def.baseWeight || 160;
  const current = base * (1 + weightGainPct / 100);
  return {
    name: def.name,
    persona: def.persona,
    role: def.role,
    personality: def.personality,
    bodyType: def.bodyType,
    baseWeight: base,
    currentWeight: current,
    playerReputation: 30,
    willingness: def.willingness ?? 50,
    restrainedBy: null,
    suspensionState: null,
    isFullness: false,
    conditions: { keys: () => [] },
  };
}

describe('NPC persona coverage', () => {
  it('every roster NPC has enriched or handcrafted profile fields', () => {
    for (const [key, def] of Object.entries(NPC_ROSTER)) {
      const profile = buildEnrichedProfile(key, def);
      expect(profile.examineByBand.slender.length).toBeGreaterThan(20);
      expect(profile.examineByBand.immense.length).toBeGreaterThan(10);
      expect(profile.greetings.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('all 80 personas render non-empty examine at low, mid, and high weight', () => {
    initializeTextEngine();
    const engine = getTextEngine();
    const stages = [0, 50, 150, 400]; // % gain over base → stages ~0, 3, 6, 10

    for (const def of Object.values(NPC_ROSTER)) {
      for (const pct of stages) {
        const subject = mockNpc(def, pct);
        const stage = getStageId(subject.currentWeight, subject.baseWeight);
        const text = engine.render('npc.examine', { subject });
        expect(text.length, `${def.persona} stage ${stage} (${pct}% gain)`).toBeGreaterThan(15);
      }
    }
  });

  it('district topic dialogue resolves for sample NPCs', () => {
    initializeTextEngine();
    const engine = getTextEngine();
    const samples = [
      { def: NPC_ROSTER.market_basket_weaver_nia, topic: 'market_banter' },
      { def: NPC_ROSTER.temple_candle_bearer_wick, topic: 'temple_sermon' },
      { def: NPC_ROSTER.ballroom_pianist_keys, topic: 'noble_gossip' },
      { def: NPC_ROSTER.warehouse_tally_faye, topic: 'harbor_tales' },
    ];
    for (const { def, topic } of samples) {
      const subject = mockNpc(def, 20);
      const line = engine.render(`npc.dialogue.${topic}`, { subject });
      expect(line.length).toBeGreaterThan(10);
    }
  });
});
