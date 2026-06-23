// P0 smoke: prove the test runner works and the core cast path is intact
import { describe, it, expect } from 'vitest';
import SpellLibrary from '../game/magic/SpellLibrary.js';
import SpellResolver from '../game/magic/SpellResolver.js';
import Character from '../game/Character.js';

describe('smoke', () => {
  it('SpellLibrary initializes', () => {
    const lib = new SpellLibrary();
    expect(lib.spells).toBeDefined();
    const names = [...lib.spells.keys()];
    expect(names.length).toBeGreaterThan(10);
  });

  it('cast returns success shape', () => {
    const lib = new SpellLibrary();
    const spell = lib.getSpell('Prestidigitation');
    const caster = new Character('Caster');
    const target = new Character('Target');

    const { result } = SpellResolver.cast({ spell, caster, target, zone: null, selectedOption: null });
    expect(result.success).toBe(true);
    expect(result.spell).toBe('Prestidigitation');
  });
});
