// SaveSystem — versioned localStorage persistence for a dungeon run.
// Enemies respawn fresh on resume (we save at encounter boundaries, not mid-fight),
// so only the player, dungeon progress, loot, and known spells need to survive.

import Character from './Character.js';
import { DungeonState } from './dungeon/DungeonState.js';

const KEY = 'daf_save';
const VERSION = 3;

// Pack the run into a versioned plain blob.
// `discovery` is an already-serialized plain object (Discovery.serialize()) or null;
// kept as a passthrough here so SaveSystem doesn't depend on the Discovery class.
export function packSave({ player, dungeon, knownSpells, discovery }) {
  return {
    v: VERSION,
    savedAt: Date.now(),
    player: player.serialize(),
    dungeon: dungeon ? dungeon.serialize() : null,
    knownSpells: [...(knownSpells || [])],
    discovery: discovery || null,
  };
}

// Forward-migrate an older blob to the current shape. v1 had no discovery and a
// linear dungeon; both are tolerated downstream (Discovery starts empty, the
// dungeon hydrates without rooms and regenerates on resume).
function migrate(blob) {
  if (blob.v === 1) {
    blob = { ...blob, v: 2, discovery: null };
  }
  if (blob.v === 2) {
    // v3 adds the recurring-foe ledger; DungeonState.hydrate defaults it empty.
    blob = { ...blob, v: 3 };
  }
  return blob;
}

// Reconstruct plain run data from a blob (returns null on unmigratable version).
// `discovery` stays a plain object here; the caller (Game.jsx) wraps it with
// Discovery.hydrate so this module stays Discovery-agnostic.
export function unpackSave(blob) {
  if (!blob) return null;
  if (blob.v !== VERSION) blob = migrate(blob);
  if (blob.v !== VERSION) return null; // still mismatched → unrecoverable
  return {
    player: Character.hydrate(blob.player),
    dungeon: blob.dungeon ? DungeonState.hydrate(blob.dungeon) : null,
    knownSpells: new Set(blob.knownSpells || []),
    discovery: blob.discovery || null,
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
if (typeof process !== 'undefined' && process.argv?.[1] && import.meta.url === `file://${process.argv[1]}`) {
  const { ITEMS } = await import('./items/Equipment.js');
  const p = new Character('Tester', { class: 'Mage', baseWeight: 140 });
  p.level = 7; p.experience = 1234;
  p.currentWeight = 210; p.fullness = 33;
  p.equip(ITEMS.gluttons_tome);
  p.conditions.add('satiated', { intensity: 2 });
  const dungeon = new DungeonState();
  dungeon.floorIndex = 1;
  dungeon.lootPile = [ITEMS.feast_plate];
  dungeon.recordEncounterDefeat('Kitchen Imp', 'fattened'); // arm a recurring return

  // round-trip through JSON (no localStorage)
  const blob = JSON.parse(JSON.stringify(packSave({ player: p, dungeon, knownSpells: new Set(['Grease', 'Fireball']) })));
  const run = unpackSave(blob);

  console.assert(run.player.level === 7, 'level survives');
  console.assert(run.player.currentWeight === 210, 'weight survives');
  console.assert(run.player.equippedItems.offhand?.key === 'gluttons_tome', 'equipment restored by key');
  console.assert(run.player.conditions.has('satiated'), 'conditions restored');
  console.assert(run.player.conditions.get('satiated').intensity === 2, 'condition meta survives');
  console.assert(run.dungeon.floorIndex === 1, 'dungeon progress survives');
  console.assert(run.dungeon.lootPile[0]?.key === 'feast_plate', 'lootPile restored by key');
  console.assert(run.dungeon.returns['Kitchen Imp']?.stage === 2, 'recurring-foe ledger survives round-trip');
  console.assert(run.knownSpells.has('Fireball'), 'known spells survive');
  console.assert(run.discovery === null, 'discovery defaults null');

  // discovery passthrough round-trips
  const disco = { tavern: ['npc_1', 'obj_2'] };
  const blob2 = JSON.parse(JSON.stringify(packSave({ player: p, dungeon, knownSpells: new Set(), discovery: disco })));
  const run2 = unpackSave(blob2);
  console.assert(run2.discovery?.tavern?.includes('obj_2'), 'discovery survives round-trip');

  // v1 blob migrates to v2 (no discovery field) instead of being rejected
  const v1 = JSON.parse(JSON.stringify(packSave({ player: p, dungeon, knownSpells: new Set(['Grease']) })));
  v1.v = 1; delete v1.discovery;
  const migrated = unpackSave(v1);
  console.assert(migrated !== null, 'v1 blob migrates, not rejected');
  console.assert(migrated.discovery === null, 'migrated v1 has null discovery');
  console.assert(migrated.knownSpells.has('Grease'), 'v1 fields survive migration');

  // unmigratable future version → null
  console.assert(unpackSave({ v: 999, player: {} }) === null, 'future version rejected');

  // enemy ids are unique per instance
  const { makeEnemy, FLOOR1_ENEMIES } = await import('./dungeon/Enemies.js');
  const e1 = makeEnemy(FLOOR1_ENEMIES[0]), e2 = makeEnemy(FLOOR1_ENEMIES[0]);
  console.assert(e1.id && e2.id && e1.id !== e2.id, 'enemy instances get distinct ids');

  console.log('SaveSystem self-check OK');
}
