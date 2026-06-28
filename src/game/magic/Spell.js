/**
 * Spell System
 * Base spell class with contextual effects and smart targeting
 */

import { TABLE } from './InteractionTable.js';

class SpellEffect {
  constructor(name, description, implementation) {
    this.name = name;
    this.description = description;
    this.implementation = implementation;
  }

  apply(caster, target, context) {
    return this.implementation(caster, target, context);
  }
}

class SpellOption {
  constructor(name, description, implementation) {
    this.name = name;
    this.description = description;
    this.implementation = implementation;
    this.slotLevel = null; // null = derive from spell.level at cast time
  }

  atSlot(level) { this.slotLevel = level; return this; }

  apply(caster, target, context) {
    return this.implementation(caster, target, context);
  }
}

class Spell {
  constructor(name, options = {}) {
    this.name = name;
    this.level = options.level || 1;
    this.school = options.school || 'Evocation';
    this.castingTime = options.castingTime || '1 action';
    this.range = options.range || '60 feet';
    this.duration = options.duration || 'Instantaneous';
    this.components = options.components || { verbal: true, somatic: true, material: false };
    this.description = options.description || '';
    this.weightGainTheme = options.weightGainTheme || '';

    // Effects that this spell performs
    this.effects = options.effects || [];

    // Contextual options (user-selectable effects)
    this.options = options.options || [];

    // Interactions with other spells (by spell name)
    this.interactsWith = options.interactsWith || [];

    // Environmental interactions
    this.environmentalEffects = options.environmentalEffects || [];

    // Target validation - which entity types can this spell target
    this.validTargets = options.validTargets || []; // ['creature', 'npc', 'object', 'area']

    // Tags for spell categories
    this.tags = options.tags || [];

    // Secondary target support for spells that affect multiple entities
    this.requiresSecondaryTarget = options.requiresSecondaryTarget || false;
    this.secondaryTargetType = options.secondaryTargetType || 'none'; // 'creature', 'npc', 'entity', 'none'
  }

  addEffect(effect) {
    this.effects.push(effect);
    return this;
  }

  addOption(option) {
    this.options.push(option);
    return this;
  }

  addInteraction(spellName, description) {
    this.interactsWith.push({ spellName, description });
    return this;
  }

  addEnvironmentalEffect(objectType, description, implementation) {
    this.environmentalEffects.push({
      objectType,
      description,
      implementation,
    });
    return this;
  }

  addValidTarget(targetType) {
    if (!this.validTargets.includes(targetType)) {
      this.validTargets.push(targetType);
    }
    return this;
  }

  addTag(tag) {
    this.tags.push(tag);
    return this;
  }

  // Check if this spell can target the given entity
  canTargetEntity(target) {
    if (!target) return true; // Area spells can target null
    if (!this.validTargets || this.validTargets.length === 0) return true;

    // Check what type target is
    if (target.type === 'creature' || target.behavior !== undefined) {
      return this.validTargets.includes('creature');
    }
    if (target.role || target.personality) {
      return this.validTargets.includes('npc');
    }
    if (target.objectType || target.material) {
      return this.validTargets.includes('object');
    }

    return false;
  }

  // Get available options for a given target
  getAvailableOptions(caster, target) {
    return this.options.filter(opt => {
      if (opt.requiresTarget && !target) return false;
      if (opt.requiresObjectType && target && target.type !== opt.requiresObjectType) {
        return false;
      }
      // requiresLivingTarget: only show for NPCs or creatures
      if (opt.requiresLivingTarget && (!target || (!target.role && !target.personality && !target.behavior))) {
        return false;
      }
      return true;
    });
  }

  canCast() {
    // Override in subclasses for spell requirements
    return true;
  }

  cast(caster, target, context = {}, selectedOption = null, secondaryTarget = null) {
    if (!this.canCast(caster)) {
      return {
        success: false,
        message: `${caster.name} cannot cast ${this.name}`,
      };
    }

    // Validate target
    if (target && !this.canTargetEntity(target)) {
      return {
        success: false,
        message: `${this.name} cannot affect ${target.name}`,
      };
    }

    const results = {
      spell: this.name,
      caster: caster.name,
      target: target ? target.name : 'area',
      secondaryTarget: secondaryTarget ? secondaryTarget.name : null,
      effects: [],
      environmentalChanges: [],
      interactions: [],
      weightGainFlavor: this.weightGainTheme,
      optionUsed: selectedOption ? selectedOption.name : null,
    };

    // Apply selected option if available
    if (selectedOption && this.options.includes(selectedOption)) {
      const optionResult = selectedOption.apply(caster, target, { ...context, secondaryTarget });
      results.effects.push(optionResult);
    } else {
      // Apply default spell effects
      for (const effect of this.effects) {
        const result = effect.apply(caster, target, { ...context, secondaryTarget });
        results.effects.push(result);
      }
    }

    // Check for environmental interactions
    if (context.environmentalObjects && this.environmentalEffects.length > 0) {
      for (const envEffect of this.environmentalEffects) {
        const matchingObjects = context.environmentalObjects.filter(obj => {
          return obj.type === envEffect.objectType || obj.isAffectedBy?.(this.name);
        });

        for (const obj of matchingObjects) {
          const result = envEffect.implementation(obj, caster, context, selectedOption);
          results.environmentalChanges.push(result);
        }
      }
    }

    // Check for spell interactions
    if (context.previousSpells) {
      const previousSpellNames = context.previousSpells.map(s => s.name);
      const interactions = this.interactsWith.filter(
        inter => previousSpellNames.includes(inter.spellName)
      );
      results.interactions = interactions;
    }

    return {
      success: true,
      ...results,
    };
  }

  getInfo() {
    return {
      name: this.name,
      level: this.level,
      school: this.school,
      castingTime: this.castingTime,
      range: this.range,
      duration: this.duration,
      components: this.components,
      description: this.description,
      weightGainTheme: this.weightGainTheme,
      tags: this.tags,
      // ponytail: generated from table — single source of truth
      interactions: TABLE
        .filter(e => e.trigger === this.name || e.requires?.recentSpell === this.name)
        .map(e => ({ spellName: e.requires?.recentSpell || e.trigger, description: e.description })),
      validTargets: this.validTargets,
      hasOptions: this.options.length > 0,
    };
  }
}

export { Spell, SpellEffect, SpellOption };
