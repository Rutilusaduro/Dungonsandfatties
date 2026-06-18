/**
 * Spell Narrator
 * Helper for generating spell narration using the modular text engine
 */

import { getTextEngine } from '../../textEngine/index.js';

export class SpellNarrator {
  static narrateSpellCast(spell, caster) {
    try {
      const engine = getTextEngine();
      const ctx = { spellName: spell.name, spellSchool: spell.school };
      const narration = engine.render('spell.cast', ctx);
      return narration || `You cast ${spell.name}!`;
    } catch (error) {
      return `You cast ${spell.name}!`;
    }
  }

  static narrateSpellEffect(spell, target) {
    try {
      const engine = getTextEngine();
      const moduleKey = `spell.effect.${spell.name.toLowerCase().replace(/ /g, '_')}`;

      // Create context for spell effect
      const ctx = SpellNarrator._createSpellContext(target);

      const narration = engine.render(moduleKey, ctx);
      return narration || spell.description;
    } catch (error) {
      return spell.description;
    }
  }

  static narrateWeightGain(target, amountGained) {
    try {
      const engine = getTextEngine();
      const ctx = SpellNarrator._createSpellContext(target);
      const narration = engine.render('spell.weight_gain', ctx);

      if (narration) {
        return `${narration} (+${Math.floor(amountGained)} lbs)`;
      }
      return `${target.name} gains ${Math.floor(amountGained)} lbs!`;
    } catch (error) {
      return `${target.name} gains ${Math.floor(amountGained)} lbs!`;
    }
  }

  static narrateSpellInteraction(spell1Name, spell2Name, target) {
    try {
      const engine = getTextEngine();
      const key1 = spell1Name.toLowerCase().replace(/ /g, '_');
      const key2 = spell2Name.toLowerCase().replace(/ /g, '_');
      const moduleKey = `spell.interaction.${key1}.${key2}`;

      const ctx = SpellNarrator._createSpellContext(target);
      const narration = engine.render(moduleKey, ctx);

      return narration || null;
    } catch (error) {
      return null;
    }
  }

  static _createSpellContext(target) {
    if (!target) return {};

    // If target is an NPC, use their context derivation method
    if (target._deriveWeightStage) {
      return {
        stage: target._deriveWeightStage(),
        fullness: target.isFullness ? 1 : 0,
        willingness: target.willingness || 50,
        reputation: target.playerReputation || 0,
      };
    }

    return {};
  }
}

export default SpellNarrator;
