import { describe, it, expect } from 'vitest';
import { buildWorld, getZoneCount, getNpcCount } from '../game/world/WorldBuilder.js';
import { WORLD_ZONES } from '../game/world/data/worldZones.js';
import { NPC_ROSTER } from '../game/world/data/npcRoster.js';
import { initializeSkills, useSkill } from '../game/mechanics/SkillResolver.js';
import { getSkill } from '../game/mechanics/SkillRegistry.js';
import Character from '../game/Character.js';

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

  it('has 60+ NPCs in roster with valid persona keys', () => {
    expect(getNpcCount()).toBeGreaterThanOrEqual(60);
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
