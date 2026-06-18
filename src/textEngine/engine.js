/**
 * Modular Text Engine
 * State-driven text generation with variant selection, anti-repetition, and templating
 */

class ModularTextEngine {
  constructor() {
    this.modules = {}; // key -> {variants, mode: 'best'|'pool', opts}
    this.dimensions = {}; // key -> deriveFn
    this.sessionUsed = new Set(); // Track text used this session
    this.weekUsed = new Map(); // Track text used this week {textHash -> timestamp}

    // Anti-repetition weights
    this.SESSION_REPEAT_WEIGHT = 0.12;
    this.WEEK_REPEAT_WEIGHT = 0.4;

    // Register built-in dimensions
    this.registerDimension('stage', (ctx) => ctx.stage ?? 0);
    this.registerDimension('corruption', (ctx) => ctx.corruption ?? 0);
    this.registerDimension('bodyType', (ctx) => ctx.bodyType ?? 'default');
    this.registerDimension('reputation', (ctx) => ctx.reputation ?? 0);
    this.registerDimension('willingness', (ctx) => ctx.willingness ?? 50);
    this.registerDimension('hungerTier', (ctx) => ctx.hungerTier ?? 0);
    this.registerDimension('fullness', (ctx) => (ctx.fullness ?? false) ? 1 : 0);
    this.registerDimension('season', (ctx) => ctx.season ?? 'spring');
    this.registerDimension('mood', (ctx) => ctx.mood ?? 'neutral');
  }

  /**
   * Register a module with "best match" selection (highest specificity wins)
   */
  registerModule(key, variants, opts = {}) {
    this.modules[key] = {
      variants: Array.isArray(variants) ? variants : [variants],
      mode: 'best',
      opts,
    };
  }

  /**
   * Register a module with "pool" selection (all matching variants eligible, weighted random)
   */
  registerPool(key, variants, opts = {}) {
    this.modules[key] = {
      variants: Array.isArray(variants) ? variants : [variants],
      mode: 'pool',
      opts,
    };
  }

  /**
   * Register custom context dimension derivation function
   */
  registerDimension(key, deriveFn) {
    this.dimensions[key] = deriveFn;
  }

  /**
   * Add variant overlays to existing module (for persona specialization)
   */
  registerModuleVariants(key, newVariants, opts = {}) {
    if (!this.modules[key]) {
      this.registerModule(key, newVariants, opts);
      return;
    }

    const weight = opts.weight ?? 1;
    const weighted = newVariants.map((v) => ({
      ...v,
      weight: (v.weight ?? 1) * weight,
    }));

    this.modules[key].variants.unshift(...weighted);
  }

  /**
   * Normalize game state into context with derived dimensions
   */
  createContext(rawState) {
    const ctx = { raw: rawState, d: {} };

    for (const [key, deriveFn] of Object.entries(this.dimensions)) {
      ctx.d[key] = deriveFn(rawState);
    }

    return ctx;
  }

  /**
   * Score variant specificity based on when-conditions matching context
   */
  _scoreVariant(variant, ctx) {
    if (!variant.when) return 0;

    let score = 0;
    const whenKeys = Object.keys(variant.when);

    for (const key of whenKeys) {
      const condition = variant.when[key];
      const contextValue = ctx.d[key];

      if (contextValue === undefined) continue;

      // Range condition: {min, max}
      if (typeof condition === 'object' && !Array.isArray(condition)) {
        const { min, max } = condition;
        if (min !== undefined && contextValue < min) return -Infinity;
        if (max !== undefined && contextValue > max) return -Infinity;
        score += 2; // Range match is specific
      }
      // Exact match
      else if (contextValue === condition) {
        score += 3; // Exact match is most specific
      }
      // Array inclusion
      else if (Array.isArray(condition) && condition.includes(contextValue)) {
        score += 2;
      }
    }

    return score;
  }

  /**
   * Select variant from module based on context
   */
  _selectVariant(key, ctx) {
    const module = this.modules[key];
    if (!module) return null;

    const { variants, mode } = module;
    const scored = variants
      .map((v) => ({
        variant: v,
        score: this._scoreVariant(v, ctx),
      }))
      .filter((s) => s.score >= 0); // Only positive scores

    if (scored.length === 0) return null;

    if (mode === 'best') {
      // Return highest-scoring variant
      scored.sort((a, b) => b.score - a.score);
      return scored[0].variant;
    } else if (mode === 'pool') {
      // Weighted random pick from all matching variants
      return this._weightedPick(scored);
    }

    return null;
  }

  /**
   * Random selection from array
   */
  pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Weighted random pick from scored variants
   */
  _weightedPick(scoredVariants) {
    const entries = scoredVariants.map((s) => ({
      variant: s.variant,
      weight: (s.variant.weight ?? 1) * s.score, // Score × weight
    }));

    const totalWeight = entries.reduce((sum, e) => sum + e.weight, 0);
    let pick = Math.random() * totalWeight;

    for (const entry of entries) {
      pick -= entry.weight;
      if (pick <= 0) return entry.variant;
    }

    return entries[0].variant;
  }

  /**
   * Render template by resolving slots and variant selection
   */
  render(template, ctx, opts = {}) {
    // Handle non-string templates
    if (Array.isArray(template)) {
      template = this.pick(template);
    }
    if (!template) return '';

    // Resolve recursively
    return this._resolveTemplate(template, ctx, 0, opts);
  }

  /**
   * Recursively resolve template slots
   */
  _resolveTemplate(template, ctx, depth = 0, opts = {}) {
    if (depth > 5) return template; // Max recursion depth

    return template.replace(/\{([^}]+)\}/g, (match, slotExpr) => {
      const [moduleKey, ...rest] = slotExpr.split(':');

      // Select variant for module
      const variant = this._selectVariant(moduleKey.trim(), ctx);
      if (!variant) return match; // Fallback to original

      let text = variant.text;
      if (Array.isArray(text)) {
        text = this.pick(text);
      }

      // Apply anti-repetition penalty
      if (opts.antiRepeat !== false) {
        const hash = `${moduleKey}:${text}`;
        if (this.sessionUsed.has(hash)) {
          return match; // Skip recently used text
        }
        this.sessionUsed.add(hash);
      }

      // Recursively resolve nested slots
      text = this._resolveTemplate(text, ctx, depth + 1, opts);

      return text;
    });
  }

  /**
   * Clear session tracking for testing
   */
  resetSession() {
    this.sessionUsed.clear();
  }
}

export default ModularTextEngine;
