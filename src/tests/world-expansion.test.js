import { describe, it, expect } from 'vitest';
import { buildWorld, getZoneCount, getNpcCount } from '../game/world/WorldBuilder.js';
import { WORLD_ZONES } from '../game/world/data/worldZones.js';
import { NPC_ROSTER } from '../game/world/data/npcRoster.js';
import { initializeSkills, useSkill } from '../game/mechanics/SkillResolver.js';
import { getSkill, skillsForClass, SKILL_REGISTRY } from '../game/mechanics/SkillRegistry.js';
import Character from '../game/Character.js';
import { getTextEngine, initializeTextEngine } from '../textEngine/index.js';

describe('10x world expansion', () => {
  it('builds 40 connected zones', () => {
    expect(getZoneCount()).toBe(40);
    const world = buildWorld();
    expect(world.getAllZones().length).toBe(40);

    const visited = new Set();
    const queue = ['tavern'];
    while (queue.length) {
      const id = queue.shift();
      if (visited.has(id)) continue;
      visited.add(id);
      const zone = world.getZone(id);
      expect(zone, `missing zone ${id}`).toBeTruthy();
      for (const target of Object.values(zone.exits)) {
        if (!visited.has(target)) queue.push(target);
      }
    }
    expect(visited.size).toBe(40);
  });

  it('has 80 NPCs in roster (10× from ~8)', () => {
    expect(getNpcCount()).toBe(80);
    for (const def of Object.values(NPC_ROSTER)) {
      expect(def.persona).toBeTruthy();
      expect(def.name).toBeTruthy();
      expect(def.dialogueTopics).toContain('greeting');
    }
  });

  it('every zone npcKey resolves in roster', () => {
    for (const zone of WORLD_ZONES) {
      for (const key of zone.npcKeys || []) {
        expect(NPC_ROSTER[key], `${zone.id} → ${key}`).toBeTruthy();
      }
    }
  });

  it('world places 80 NPC instances across zones', () => {
    const world = buildWorld();
    let total = 0;
    for (const zone of world.getAllZones()) {
      total += zone.getNPCs().length;
    }
    expect(total).toBe(80);
  });

  it('district dialogue topics resolve in text engine', () => {
    initializeTextEngine();
    const engine = getTextEngine();
    for (const topic of ['market_banter', 'temple_sermon', 'noble_gossip', 'harbor_tales']) {
      expect(engine.hasModule(`npc.dialogue.${topic}`)).toBe(true);
    }
  });

  it('handcrafted personas render examine at multiple weight stages', () => {
    initializeTextEngine();
    const engine = getTextEngine();
    const npc = Object.assign(new (class {})(), {
      name: 'Countess Mirabel',
      persona: 'mirabel_countess',
      role: 'Countess',
      personality: 'regal',
      baseWeight: 172,
      currentWeight: 400,
      playerReputation: 60,
      willingness: 50,
      conditions: { keys: () => [] },
    });
    const ctx = { subject: npc };
    const text = engine.render('npc.examine', ctx);
    expect(text.length).toBeGreaterThan(20);
    expect(text.toLowerCase()).toContain('mirabel');
  });

  it('class skills: 18 total, 3 per class across 6 classes', () => {
    expect(Object.keys(SKILL_REGISTRY).length).toBe(18);
    for (const cls of ['Paladin', 'Mage', 'Warlock', 'Cleric', 'Druid', 'Bard']) {
      expect(skillsForClass(cls).length).toBe(3);
    }
  });

  it('class skills initialize and fire in exploration', () => {
    const player = new Character('Tester', { class: 'Mage' });
    initializeSkills(player, 'Mage');
    expect(player.knownSkills.length).toBeGreaterThanOrEqual(2);
    expect(getSkill(player.knownSkills[0])).toBeTruthy();

    const world = buildWorld();
    const tavern = world.getZone('tavern');
    const npc = tavern.getNPCs()[0];
    const result = useSkill('arcane_survey', { player, zone: tavern, target: npc });
    expect(result.ok).toBe(true);
    expect(npc.cravinessRevealed).toBe(true);
  });
});
