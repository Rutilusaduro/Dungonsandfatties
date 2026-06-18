/**
 * Gravity System
 * Weight-based physics for breaking points, structural integrity, and future gravity manipulation
 */

class GravityCalculator {
  constructor(options = {}) {
    this.gravityConstant = options.gravityConstant || 0.1; // Base gravity multiplier
    this.breakingPointBuffer = options.breakingPointBuffer || 0.8; // Safety margin (80% of structural integrity)
  }

  // Calculate gravity for an NPC or creature based on weight
  calculateGravity(entity) {
    if (!entity.currentWeight) return 0;
    return entity.currentWeight * this.gravityConstant * this.getGravityMultiplier(entity);
  }

  calculateBaseGravity(entity) {
    if (!entity.currentWeight) return 0;
    return entity.currentWeight * this.gravityConstant;
  }

  getGravityMultiplier(entity) {
    return entity?.gravityMultiplier ?? 1;
  }

  updateEntityGravity(entity) {
    if (!entity) return 0;
    const gravity = this.calculateGravity(entity);
    entity.effectiveGravity = gravity;
    entity.gravity = gravity;
    entity.isFloating = !!entity.floatOverride || gravity <= 0.5;
    return gravity;
  }

  multiplyGravity(entity, factor) {
    if (!entity) return 1;
    entity.gravityMultiplier = (entity.gravityMultiplier ?? 1) * factor;
    this.updateEntityGravity(entity);
    return entity.gravityMultiplier;
  }

  reduceGravity(entity, factor) {
    if (!entity) return 1;
    entity.gravityMultiplier = Math.max(0.05, (entity.gravityMultiplier ?? 1) * factor);
    this.updateEntityGravity(entity);
    return entity.gravityMultiplier;
  }

  // Get the breaking point for an environmental object or structure
  getBreakingPoint(object) {
    if (object?.properties?.supportable_weight) {
      return Number(object.properties.supportable_weight) * this.gravityConstant;
    }

    if (!object.breakingPoint) {
      // Default breaking point based on material and size
      const materialStrength = {
        wood: 8,
        stone: 30,
        metal: 50,
        candy: 3,
        licorice: 2,
        fabric: 1,
      };

      const baseDensity = materialStrength[object.material] || 5;
      const sizeMultiplier = {
        tiny: 0.5,
        small: 1,
        medium: 1.5,
        large: 2.5,
        huge: 4,
      };

      const size = object.size || 'medium';
      object.breakingPoint = baseDensity * (sizeMultiplier[size] || 1);
    }

    return object.breakingPoint;
  }

  // Check if a structure can support an entity's weight
  canSupport(structure, entity) {
    const entityGravity = this.calculateGravity(entity);
    const breakingPoint = this.getBreakingPoint(structure);
    return entityGravity <= breakingPoint * this.breakingPointBuffer;
  }

  // Check if structure fails under weight
  checkStructuralFailure(structure, entity) {
    const entityGravity = this.calculateGravity(entity);
    const breakingPoint = this.getBreakingPoint(structure);

    if (entityGravity > breakingPoint) {
      return {
        failed: true,
        failureType: 'catastrophic',
        reason: `Weight (${Math.floor(entityGravity)} units) exceeds breaking point (${Math.floor(breakingPoint)} units)`,
      };
    }

    if (entityGravity > breakingPoint * this.breakingPointBuffer) {
      return {
        failed: true,
        failureType: 'imminent',
        reason: `Weight (${Math.floor(entityGravity)} units) approaches breaking point (${Math.floor(breakingPoint)} units)`,
      };
    }

    return { failed: false };
  }

  // Apply gravity effects when suspended (belly touches ground)
  applyBellyContactSupport(structure, entity) {
    // Ground provides effectively infinite support when belly touches
    return {
      originalBreakingPoint: this.getBreakingPoint(structure),
      newBreakingPoint: Infinity,
      supportType: 'hybrid', // vines + ground
      description: `${entity?.name || 'The target'} gains additional support from belly contact with the ground`,
    };
  }

  // Calculate if ceiling suspension fails
  checkCeilingSuspensionFailure(entity, ceilingHeight = null) {
    const entityGravity = this.calculateGravity(entity);
    const vineStrength = 5; // Candy/licorice vines have low strength

    return {
      gravity: entityGravity,
      vineCapacity: vineStrength,
      canSupport: entityGravity <= vineStrength,
      failureWeight: Math.ceil((vineStrength / this.gravityConstant) / 10) * 10, // Round to nearest 10 lbs
      ceilingHeight,
      description: entityGravity > vineStrength
        ? `Too heavy! Target weighs too much for the vines (${Math.floor(entityGravity)} vs ${vineStrength} strength)`
        : `Vines can support target (${Math.floor(entityGravity)} vs ${vineStrength} strength)`,
    };
  }
}

export default GravityCalculator;
