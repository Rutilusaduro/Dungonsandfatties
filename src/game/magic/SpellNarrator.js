/**
 * Spell Narrator
 * Helper for generating spell narration using the modular text engine
 */

import { getTextEngine } from '../../textEngine/index.js';

export class SpellNarrator {

  /**
   * Build a single cohesive scene narrative: "You cast X. [rich scene description]"
   * For Confection Snare, appends the option sub-key to the module path.
   */
  static narrateSpellScene(spell, caster, target, selectedOption = null) {
    try {
      const engine = getTextEngine();
      const spellKey = spell.name.toLowerCase().replace(/ /g, '_');
      const optionKey = selectedOption ? selectedOption.name.toLowerCase().replace(/ /g, '_') : null;

      // Whether the target already carried a spell condition BEFORE this cast
      // (Game.jsx applies new conditions after narration), so the interaction
      // layer reacts to prior state rather than the condition we just applied.
      const hadPriorCondition = SpellNarrator._hasCondition(target);

      const ctx = SpellNarrator._spellCtx(target, caster, {
        spell: spellKey,
        option: optionKey,
        recentSpells: (target && target.spellAffects) ? [...target.spellAffects] : [],
        lastWeightGain: target ? (target.lastWeightGain || 0) : 0,
      });

      let scene = '';

      // Confection Snare: option-specific sub-modules
      if (spell.name === 'Confection Snare' && optionKey) {
        scene = engine.render(`spell.scene.confection_snare.${optionKey}`, ctx);
      }

      // Fall back to generic spell.scene.X
      if (!scene) scene = engine.render(`spell.scene.${spellKey}`, ctx);

      // Last resort: spell description
      if (!scene) scene = spell.description;

      // Interaction layer: spell cast on an already-conditioned target
      // (restrained / suspended / paralyzed / buried / mind-controlled / stuffed).
      let interaction = '';
      if (hadPriorCondition) {
        interaction = engine.render('spell.on_conditioned', ctx) || '';
      }

      const optionLabel = selectedOption ? ` (${selectedOption.name})` : '';
      const tail = interaction ? ` ${interaction}` : '';
      return `You cast ${spell.name}${optionLabel}. ${scene}${tail}`;
    } catch (error) {
      return `You cast ${spell.name}.`;
    }
  }

  /** True if the target currently carries any lingering spell condition. */
  static _hasCondition(target) {
    if (!target) return false;
    if (target.conditions && typeof target.conditions.size === 'number' && target.conditions.size > 0) return true;
    return !!target.restrainedBy || !!target.isFullness;
  }

  /** Build an engine context targeting `target` with `caster` as the reference. */
  static _spellCtx(target, caster = null, globals = {}) {
    if (target && target._createContext) {
      return target._createContext({ ref: caster || null, globals });
    }
    return { subject: target || null, ref: caster || null, globals };
  }

  /**
   * Generate an NPC reaction to a status change.
   * reactionType: 'weight_gain' | 'restrained'
   * amount: lbs gained (for weight_gain)
   */
  static triggerNPCReactions(target, reactionType, amount = 0) {
    try {
      const engine = getTextEngine();

      // Update target tracking before rendering
      if (reactionType === 'weight_gain') {
        target.lastWeightGain = amount;
      }

      const ctx = SpellNarrator._createSpellContext(target);

      if (reactionType === 'weight_gain') {
        const growthProse = engine.render('word.growth', ctx);
        const reaction = engine.render('npc.reaction.weight_gain', ctx);
        const parts = [growthProse, reaction].filter(Boolean);
        return parts.join(' ');
      }

      const moduleKey = `npc.reaction.${reactionType}`;
      const reaction = engine.render(moduleKey, ctx);

      return reaction || '';
    } catch (error) {
      return '';
    }
  }

  // ── Legacy helpers kept for backward compatibility ──────────────────────

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
      return engine.render(moduleKey, ctx) || null;
    } catch (error) {
      return null;
    }
  }

  static _createSpellContext(target) {
    if (!target) return {};
    if (target._createContext) {
      return target._createContext();
    }
    // Fallback for non-NPC targets
    if (target._deriveWeightStage) {
      return {
        stage: target._deriveWeightStage(),
        fullness: target.isFullness ? 1 : 0,
        willingness: target.willingness || 50,
        reputation: target.playerReputation || 0,
        isRestrained: target.restrainedBy ? 1 : 0,
        restrainedBy: target.restrainedBy || 'none',
        suspensionState: target.suspensionState || 'none',
        lastWeightGain: target.lastWeightGain || 0,
      };
    }
    return {};
  }
}

export default SpellNarrator;
