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

  it('all 4 new themed spells cast and their scenes resolve', async () => {
    const { getTextEngine } = await import('../textEngine/index.js');
    const engine = getTextEngine();
    for (const name of ['Rooting Glut', 'Bottomless Gullet', "Feeder's Devotion", 'Swelling Tide', 'Gust of Wind', 'Wall of Force', 'Web', 'Mage Hand', 'Command']) {
      const spell = lib.getSpell(name);
      expect(spell, `${name} not registered`).toBeTruthy();
      const { result } = SpellResolver.cast({
        spell, caster: new Character('C'), target: mockNPC(), zone: null, selectedOption: null,
      });
      expect(result.success, `${name} cast failed`).toBe(true);
      const sceneKey = `spell.scene.${name.toLowerCase().replace(/ /g, '_')}`;
      expect(engine.hasModule(sceneKey), `${sceneKey} missing`).toBe(true);
    }
  });

  it('Imbue Life animates an ooze coating to feed itself in', () => {
    const spell = lib.getSpell('Imbue Life');
    const option = spell.options.find(o => o.name === 'Animate Coating');
    const target = mockNPC('Coated');
    target.conditions.add('ooze_coated', { intensity: 2 });
    let fed = 0;
    target.consumeCalories = (c) => { fed += c; return { calories: c, pendingWeightGain: Math.round(c / 3500) }; };

    SpellResolver.cast({ spell, caster: new Character('C'), target, zone: null, selectedOption: option });
    expect(target.conditions.has('ooze_coated')).toBe(false); // coating consumed
    expect(fed).toBeGreaterThan(0); // fed itself in
  });

  it('Imbue Life on an uncoated target feeds nothing', () => {
    const spell = lib.getSpell('Imbue Life');
    const option = spell.options.find(o => o.name === 'Animate Coating');
    const target = mockNPC('Dry');
    let fed = 0;
    target.consumeCalories = (c) => { fed += c; return { calories: c }; };
    SpellResolver.cast({ spell, caster: new Character('C'), target, zone: null, selectedOption: option });
    expect(fed).toBe(0);
  });

  it('Feast Exile sends a target away, returns it engorged, then settles', async () => {
    const { applyFeastExile } = await import('../game/mechanics/SwellSystem.js');
    const spell = lib.getSpell('Feast Exile');
    const option = spell.options.find(o => o.name === 'Deep Exile'); // 2 rests
    const target = mockNPC('Exiled');
    target.baseWeight = 150;
    target.currentWeight = 150;

    SpellResolver.cast({ spell, caster: new Character('C'), target, zone: null, selectedOption: option });
    expect(target.isExiled).toBe(true);

    applyFeastExile([target]); // rest 1: still away
    expect(target.isExiled).toBe(true);
    expect(target.currentWeight).toBe(150);

    applyFeastExile([target]); // rest 2: returns engorged
    expect(target.isExiled).toBe(false);
    expect(target.conditions.has('engorged')).toBe(true);
    expect(target.currentWeight).toBeGreaterThan(300);

    let guard = 0;
    while (target.swell && guard++ < 30) applyFeastExile([target]);
    expect(target.conditions.has('engorged')).toBe(false);     // swell faded
    expect(target.currentWeight).toBeGreaterThan(150);          // kept a little
    expect(target.currentWeight).toBeLessThan(250);             // most of it gone
  });

  it('Sphere of Influence makes every zone occupant ravenous', () => {
    const spell = lib.getSpell('Sphere of Influence');
    const a = mockNPC('Pig'); a.hungerLevel = 20;
    const b = mockNPC('Cow'); b.hungerLevel = 20;
    const npc = mockNPC('Boris'); npc.hungerLevel = 20;
    const creatures = [a, b];
    const npcs = [npc];
    const zone = {
      getCreatures: () => creatures, getNPCs: () => npcs, getFoods: () => [],
      getEnvironmentalObjects: () => [], getRecentSpells: () => [], recordSpellCast() {}, addFood() {},
    };
    SpellResolver.cast({ spell, caster: new Character('C'), target: null, zone, selectedOption: null });
    expect([a, b, npc].every(o => o.conditions.has('ravenous'))).toBe(true);
    expect([a, b, npc].every(o => o.hungerLevel === 100)).toBe(true);
  });

  it('condition combo fires when condition present, not when absent', () => {
    const spell = lib.getSpell('Feast of Shadows');
    const caster = new Character('Caster');

    const hungry = mockNPC('Hungry');
    hungry.conditions.add('ravenous', {});
    const r1 = SpellResolver.cast({ spell, caster, target: hungry, zone: null, selectedOption: null }).result;
    expect(r1.interactions.some(i => i.spellName === 'ravenous')).toBe(true);

    const calm = mockNPC('Calm');
    const r2 = SpellResolver.cast({ spell, caster, target: calm, zone: null, selectedOption: null }).result;
    expect(r2.interactions.some(i => i.spellName === 'ravenous')).toBe(false);
  });
});
