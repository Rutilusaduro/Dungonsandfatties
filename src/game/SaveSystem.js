// SaveSystem — versioned localStorage persistence for a dungeon run.
// Enemies respawn fresh on resume (we save at encounter boundaries, not mid-fight),
// so only the player, dungeon progress, loot, and known spells need to survive.

import Character from './Character.js';
import { DungeonState } from './dungeon/DungeonState.js';

const KEY = 'daf_save';
const VERSION = 1;

// Pack the run into a versioned plain blob.
export function packSave({ player, dungeon, knownSpells }) {
  return {
    v: VERSION,
    savedAt: Date.now(),
    player: player.serialize(),
    dungeon: dungeon ? dungeon.serialize() : null,
    knownSpells: [...(knownSpells || [])],
  };
}

// Reconstruct live objects from a blob (returns null on version mismatch).
export function unpackSave(blob) {
  if (!blob || blob.v !== VERSION) return null;
  return {
    player: Character.hydrate(blob.player),
    dungeon: blob.dungeon ? DungeonState.hydrate(blob.dungeon) : null,
    knownSpells: new Set(blob.knownSpells || []),
    savedAt: blob.savedAt,
  };
}

export function saveGame(state) {
  try { localStorage.setItem(KEY, JSON.stringify(packSave(state))); return true; }
  catch { return false; }
}

export function loadGame() {
  let blob;
  try { blob = JSON.parse(localStorage.getItem(KEY)); } catch { return null; }
  const run = unpackSave(blob);
  if (!run) clearSave(); // stale/corrupt → discard rather than crash
  return run;
}

export function hasSave() {
  try { return !!localStorage.getItem(KEY); } catch { return false; }
}

export function clearSave() {
  try { localStorage.removeItem(KEY); } catch { /* no-op */ }
}

// ── self-check: node src/game/SaveSystem.js ──
if (import.meta.url === `file://${process.argv[1]}`) {
  const { ITEMS } = await import('./items/Equipment.js');
  const p = new Character('Tester', { class: 'Mage', baseWeight: 140 });
  p.level = 7; p.experience = 1234;
  p.currentWeight = 210; p.fullness = 33;
  p.equip(ITEMS.gluttons_tome);
  p.conditions.add('satiated', { intensity: 2 });
  const dungeon = new DungeonState();
  dungeon.floorIndex = 1; dungeon.encounterIndex = 2;
  dungeon.lootPile = [ITEMS.feast_plate];

  // round-trip through JSON (no localStorage)
  const blob = JSON.parse(JSON.stringify(packSave({ player: p, dungeon, knownSpells: new Set(['Grease', 'Fireball']) })));
  const run = unpackSave(blob);

  console.assert(run.player.level === 7, 'level survives');
  console.assert(run.player.currentWeight === 210, 'weight survives');
  console.assert(run.player.equippedItems.offhand?.key === 'gluttons_tome', 'equipment restored by key');
  console.assert(run.player.conditions.has('satiated'), 'conditions restored');
  console.assert(run.player.conditions.get('satiated').intensity === 2, 'condition meta survives');
  console.assert(run.dungeon.floorIndex === 1 && run.dungeon.encounterIndex === 2, 'dungeon progress survives');
  console.assert(run.dungeon.lootPile[0]?.key === 'feast_plate', 'lootPile restored by key');
  console.assert(run.knownSpells.has('Fireball'), 'known spells survive');
  // version mismatch → null
  console.assert(unpackSave({ v: 999, player: {} }) === null, 'version mismatch rejected');
  console.log('SaveSystem self-check OK');
}
