// P1 snapshot: every table entry is structurally valid + key combos fire correctly
import { describe, it, expect } from 'vitest';
import { TABLE, matchCombos } from '../game/magic/InteractionTable.js';
import { CONDITION_KEYS } from '../game/conditions/ActiveConditions.js';
import ActiveConditions from '../game/conditions/ActiveConditions.js';
import SpellLibrary from '../game/magic/SpellLibrary.js';
import SpellResolver from '../game/magic/SpellResolver.js';
import Character from '../game/Character.js';

// Minimal NPC-shaped target accepted by all spells
function mockNPC(name = 'Target', recentSpellKeys = []) {
  return {
    name,
    role: 'generic',
    personality: 'neutral',
    conditions: new ActiveConditions(),
    spellAffects: recentSpellKeys, // already in snake_case key format
    willingness: 50,
    health: 100,
    currentWeight: 150,
    consumeCalories: (cal) => ({ calories: cal, pendingWeightGain: cal / 3500 }),
    gainWeight: (amt) => ({ weightChange: amt }),
  };
}

const lib = new SpellLibrary();
const KNOWN_SPELLS = [...lib.spells.keys()];

describe('InteractionTable structure', () => {
  it('no duplicate IDs', () => {
    const ids = TABLE.map(e => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('every entry has required fields', () => {
    for (const entry of TABLE) {
      expect(entry.id, `${entry.id} missing id`).toBeTruthy();
      expect(entry.trigger, `${entry.id} missing trigger`).toBeTruthy();
      expect(entry.requires, `${entry.id} missing requires`).toBeTruthy();
      expect(entry.text, `${entry.id} missing text`).toBeTruthy();
      expect(entry.description, `${entry.id} missing description`).toBeTruthy();
    }
  });

  it('every trigger spell is registered in SpellLibrary', () => {
    const unknown = TABLE.map(e => e.trigger).filter(n => !KNOWN_SPELLS.includes(n));
    expect(unknown).toEqual([]);
  });

  it('every partner recentSpell is registered in SpellLibrary', () => {
    const unknown = TABLE
      .filter(e => e.requires.recentSpell)
      .map(e => e.requires.recentSpell)
      .filter(n => !KNOWN_SPELLS.includes(n));
    expect(unknown).toEqual([]);
  });

  it('every requires.condition is a known CONDITION_KEY', () => {
    const unknown = TABLE
      .filter(e => e.requires.condition)
      .map(e => e.requires.condition)
      .filter(k => !CONDITION_KEYS.includes(k));
    expect(unknown).toEqual([]);
  });

  it('every text key resolves in the text engine', async () => {
    const { getTextEngine } = await import('../textEngine/index.js');
    const engine = getTextEngine();
    const dangling = TABLE.filter(e => !engine.hasModule(e.text)).map(e => `${e.id} -> ${e.text}`);
    expect(dangling).toEqual([]);
  });
});

describe('matchCombos', () => {
  it('fires for matching recentSpell', () => {
    const matches = matchCombos('Create Water', ['Shape Earth'], null, null);
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].entry.id).toBe('create_water+shape_earth');
  });

  it('no match when partner absent', () => {
    const matches = matchCombos('Create Water', [], null, null);
    expect(matches).toHaveLength(0);
  });

  it('multiple combos fire for same trigger', () => {
    // Ravenous Expansion fires against both Create Food and Water, Summon Cattle, Plant Growth
    const matches = matchCombos('Ravenous Expansion',
      ['Create Food and Water', 'Summon Cattle', 'Plant Growth'], null, null);
    expect(matches.length).toBe(3);
  });
});

describe('combo integration: key pairs fire end-to-end', () => {
  function castWithPrevious(spellName, previousNames) {
    const spell = lib.getSpell(spellName);
    const caster = new Character('Caster');
    const recentKeys = previousNames.map(n => n.toLowerCase().replace(/ /g, '_'));
    const target = mockNPC('Target', recentKeys);
    const { result } = SpellResolver.cast({ spell, caster, target, zone: null, selectedOption: null });
    return result;
  }

  it('Haste+Ravenous Expansion fires bonus calories', () => {
    const result = castWithPrevious('Haste', ['Ravenous Expansion']);
    const hasCombo = result.interactions.some(i => i.spellName === 'Ravenous Expansion');
    expect(hasCombo).toBe(true);
  });

  it('Oozing Abundance+Enlarge Person fires bonus calories', () => {
    const result = castWithPrevious('Oozing Abundance', ['Enlarge Person']);
    const hasCombo = result.interactions.some(i => i.spellName === 'Enlarge Person');
    expect(hasCombo).toBe(true);
  });

  it('Morph Mass+Oozing Abundance fires bonus weight', () => {
    const result = castWithPrevious('Morph Mass', ['Oozing Abundance']);
    const hasCombo = result.interactions.some(i => i.spellName === 'Oozing Abundance');
    expect(hasCombo).toBe(true);
  });

  it('Rapid Digestion+Feast of Shadows fires', () => {
    const result = castWithPrevious('Rapid Digestion', ['Feast of Shadows']);
    const hasCombo = result.interactions.some(i => i.spellName === 'Feast of Shadows');
    expect(hasCombo).toBe(true);
  });

  it('newly-wired Draconic Hunger combo fires', () => {
    const result = castWithPrevious('Ravenous Expansion', ['Draconic Hunger']);
    const hasCombo = result.interactions.some(i => i.spellName === 'Draconic Hunger');
    expect(hasCombo).toBe(true);
  });

  it('newly-wired Covetous Siphon combo fires', () => {
    const result = castWithPrevious('Enlarge Person', ['Covetous Siphon']);
    const hasCombo = result.interactions.some(i => i.spellName === 'Covetous Siphon');
    expect(hasCombo).toBe(true);
  });
});
