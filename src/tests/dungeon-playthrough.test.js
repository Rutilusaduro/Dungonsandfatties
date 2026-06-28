// Scale-4x step 10 — regression harness.
// Drives a headless playthrough of all 12 floors per class, mirroring the
// combat loop in Game.jsx doCombatPlayerAction (force-feed + a willingness
// "persuade" path, which stands in for the real Suggestion/Command tactics).
// Asserts: every encounter is winnable, the final boss is never a round-1
// auto-win, and slot caps hold after a full level run.

import { describe, it, expect } from 'vitest';
import Character from '../game/Character.js';
import CLASS_REGISTRY from '../game/classes/ClassRegistry.js';
import { DungeonState } from '../game/dungeon/DungeonState.js';
import { Combat, fillUp, checkWinState, actionsAvailable } from '../game/combat/Combat.js';
import { controllerFor } from '../game/combat/EnemyController.js';
import { awardXP, applyLevelBonus } from '../game/mechanics/ProgressionSystem.js';
import { SLOT_CAP } from '../game/mechanics/Balance.js';

const MAX_ROUNDS = 120;

// Simulate one encounter; returns the round the enemy was defeated, or null.
function simEncounter(player, enemy, modifier) {
  const mod = modifier || {};
  for (let round = 1; round <= MAX_ROUNDS; round++) {
    // Player turn: force-feed (fullness path) + persuade (willingness path).
    fillUp(enemy, 0.15 * (enemy.stomachCapacity || 100) * (player.feedBonusMultiplier || 1) * (mod.feedScale ?? 1));
    enemy.willingness = Math.min(100, (enemy.willingness ?? 50) + 6); // stands in for Suggestion/Command
    if (checkWinState(enemy)) return round;

    // Enemy turn (same wiring as Game.jsx).
    const combat = new Combat([
      { entity: player, initiative: 10 },
      { entity: enemy, initiative: 5 },
    ]);
    const selfPos = combat.combatants.find(c => c.entity === enemy);
    const oppPos = combat.combatants.find(c => c.entity === player);
    controllerFor(enemy._trait)({ self: enemy, opponent: player, selfPos, oppPos, actions: actionsAvailable(enemy), combat });

    // Biome willDrift + per-round drain.
    if (mod.willDrift) enemy.willingness = Math.min(100, (enemy.willingness ?? 50) + mod.willDrift);
    const drainScale = mod.drainScale ?? 1;
    for (const [e, rate] of [[player, 0.1 * drainScale], [enemy, 0.1 * (1 - player.feedClingFactor) * drainScale]]) {
      const cap = e.stomachCapacity || 0;
      if (cap) e.fullness = Math.max(0, (e.fullness || 0) - cap * rate);
    }
    player.fullness = 0; // sim player never loses to feeding — winnability test, not a defense test
  }
  return null;
}

describe('full dungeon playthrough is winnable for every class', () => {
  for (const classKey of Object.keys(CLASS_REGISTRY)) {
    it(`${classKey} clears all 12 floors`, () => {
      const def = CLASS_REGISTRY[classKey];
      const player = new Character('Sim', { class: classKey, baseWeight: def.baseWeight, spellSlots: { ...def.spellSlots } });
      player.stomachCapacity = 100000; // ignore incoming feeding for this harness

      const dungeon = new DungeonState();
      let encounters = 0;
      let lastWinRound = 0;
      let guard = 0;

      while (!dungeon.completed && guard++ < 100) {
        const [enemy] = dungeon.spawnEnemies();
        expect(enemy, `floor ${dungeon.floorIndex + 1} spawned an enemy`).toBeTruthy();
        const winRound = simEncounter(player, enemy, dungeon.currentFloor?.modifier);
        expect(winRound, `${classKey} should defeat ${enemy.name}`).not.toBeNull();
        lastWinRound = winRound;
        encounters++;
        awardXP(player, enemy.xpValue || 100);
        applyLevelBonus(player);
        dungeon.advance([enemy]);
      }

      expect(dungeon.completed, `${classKey} run completed`).toBe(true);
      expect(encounters).toBe(36); // 12 floors x 3 encounters
      expect(lastWinRound, 'final boss is not a round-1 auto-win').toBeGreaterThan(1);

      // Slot caps held across the whole level run.
      for (const lvl of Object.keys(SLOT_CAP)) {
        expect(player.maxSpellSlots[lvl] ?? 0).toBeLessThanOrEqual(SLOT_CAP[lvl]);
      }
    });
  }
});
