/**
 * Spell System
 * Base spell class and spell effect management
 */

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

    // Interactions with other spells (by spell name)
    this.interactsWith = options.interactsWith || [];

    // Environmental interactions
    this.environmentalEffects = options.environmentalEffects || [];

    // Tags for spell categories
    this.tags = options.tags || [];
  }

  addEffect(effect) {
    this.effects.push(effect);
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

  addTag(tag) {
    this.tags.push(tag);
    return this;
  }

  canCast(caster) {
    // Override in subclasses for spell requirements
    return true;
  }

  cast(caster, target, context = {}) {
    if (!this.canCast(caster)) {
      return {
        success: false,
        message: `${caster.name} cannot cast ${this.name}`,
      };
    }

    const results = {
      spell: this.name,
      caster: caster.name,
      target: target ? target.name : 'self',
      effects: [],
      environmentalChanges: [],
      interactions: [],
      weightGainFlavor: this.weightGainTheme,
    };

    // Apply spell effects
    for (const effect of this.effects) {
      const result = effect.apply(caster, target, context);
      results.effects.push(result);
    }

    // Check for environmental interactions
    if (context.environmentalObjects) {
      for (const envEffect of this.environmentalEffects) {
        const matchingObjects = context.environmentalObjects.filter(
          obj => obj.type === envEffect.objectType
        );

        for (const obj of matchingObjects) {
          const result = envEffect.implementation(obj, caster, context);
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
      interactions: this.interactsWith,
    };
  }
}

export { Spell, SpellEffect };
