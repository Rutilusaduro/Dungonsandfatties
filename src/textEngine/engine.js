// ═══════════════════════════════════════════════════════════════
// MODULAR TEXT ENGINE — core resolver
// Ported from GameDev/src/textEngine/engine.js (branch Primary), with the
// game-specific seam — deriveFor() dimension derivation and the evalWhen()
// selector keys — swapped to Dungons & Fatties' weight + spell-condition
// variables. The resolver machinery (registry, best/pool scoring,
// anti-repetition, filters, {join}, :ref/:group retargeting, recursive
// render, smoothing) is unchanged.
//
// Templates contain slots like {module}, {module:arg}, {module|cap}.
// Modules are registered variant lists; each variant declares `when`
// selector conditions and the engine picks the most specific match.
// ═══════════════════════════════════════════════════════════════
import { getStageId, STAGE_KEYS, sizeClassFor } from './stages.js';
import { RESTRAINT_MATERIAL } from '../game/conditions/ActiveConditions.js';

const DEV = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV;
const warn = (...args) => { if (DEV) console.warn('[textEngine]', ...args); };

// Anti-repetition — pool picks already used this session/week are deprioritized.
export const SESSION_REPEAT_WEIGHT = 0.12;
export const WEEK_REPEAT_WEIGHT = 0.4;

/** Fresh per-event bag — share one Set across renders in a scene, dinner, etc. */
export function createSessionUsed() {
  return new Set();
}

/** Stable key for a variant text line within a module pool. */
export function variantUsageKey(moduleKey, variantIndex, textIndex) {
  return `${moduleKey}#${variantIndex}:${textIndex}`;
}

function repeatMultiplier(usageKey, ctx) {
  if (!usageKey) return 1;
  let m = 1;
  if (ctx.sessionUsed?.has(usageKey)) m *= SESSION_REPEAT_WEIGHT;
  if (ctx.weekUsed?.has(usageKey)) m *= WEEK_REPEAT_WEIGHT;
  return m;
}

function recordVariantUsage(usageKey, ctx) {
  if (!usageKey) return;
  ctx.sessionUsed?.add(usageKey);
  ctx.weekUsed?.add(usageKey);
}

function buildPickEntries(moduleKey, matches, poolBase, ctx, applyPenalty) {
  const entries = [];
  for (const m of matches) {
    const { variant, score, variantIndex } = m;
    const baseW = (variant.weight ?? 1) * Math.pow(poolBase, score);
    const t = variant.text;
    if (Array.isArray(t)) {
      t.forEach((text, textIndex) => {
        const usageKey = variantUsageKey(moduleKey, variantIndex, textIndex);
        const w = baseW * (applyPenalty ? repeatMultiplier(usageKey, ctx) : 1);
        if (w > 0) entries.push({ item: { variant, text, usageKey }, w });
      });
    } else {
      const usageKey = variantUsageKey(moduleKey, variantIndex, 0);
      const w = baseW * (applyPenalty ? repeatMultiplier(usageKey, ctx) : 1);
      if (w > 0) entries.push({ item: { variant, text: t, usageKey }, w });
    }
  }
  return entries;
}

function pickFromEntries(entries, moduleKey, matches, poolBase, ctx) {
  if (!entries.length && matches.length) {
    entries = buildPickEntries(moduleKey, matches, poolBase, ctx, false);
  }
  if (!entries.length) return null;
  return weightedPick(entries);
}

// ── helpers ───────────────────────────────────────────────────

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// weightedPick([{item, w}, ...]) — picks an item with probability ∝ w.
export function weightedPick(entries) {
  let total = 0;
  for (const e of entries) total += e.w;
  if (total <= 0) return entries.length ? entries[0].item : undefined;
  let roll = Math.random() * total;
  for (const e of entries) {
    roll -= e.w;
    if (roll <= 0) return e.item;
  }
  return entries[entries.length - 1].item;
}

const SEASONS = ['fall', 'winter', 'spring', 'summer'];
export function getSeason(week) {
  return SEASONS[Math.floor((Math.max(1, week || 1) - 1) / 4) % 4];
}

// Relative size of subject vs a reference character, by lbs ratio.
export function relSize(subject, ref) {
  if (!subject || !ref || !ref.lbs) return null;
  const r = subject.lbs / ref.lbs;
  if (r < 0.6) return 'much_smaller';
  if (r < 0.85) return 'smaller';
  if (r <= 1.18) return 'similar';
  if (r <= 1.67) return 'larger';
  return 'much_larger';
}

export { STAGE_KEYS };

export function stageBucket(stageId) {
  const id = Math.min(Math.max(0, stageId ?? 0), STAGE_KEYS.length - 1);
  return STAGE_KEYS[id];
}

// ── extensible dimensions ─────────────────────────────────────

const DIMENSION_DERIVERS = new Map();

/** Register a derived dimension callable from `when` via ctx.d[key]. */
export function registerDimension(key, deriveFn) {
  if (DIMENSION_DERIVERS.has(key)) warn(`dimension "${key}" re-registered (overwriting)`);
  DIMENSION_DERIVERS.set(key, deriveFn);
}

function deriveMobilityLevel(d) {
  const stage = d.stage ?? 0;
  if (stage <= 6) return 'full';
  if (stage <= 7) return 'present';
  if (stage <= 8) return 'planning';
  if (stage <= 9) return 'economy';
  if (stage <= 10) return 'minimal';
  return 'immobile';
}

registerDimension('mobilityLevel', (ctx) => deriveMobilityLevel(ctx.d || {}));
registerDimension('isGaining', (ctx) => {
  const delta = ctx.globals?.lastWeightGain ?? ctx.d?.lastWeightGain;
  return (delta ?? 0) > 0;
});

// ── context ───────────────────────────────────────────────────

function deriveHungerTier(entity) {
  const h = entity.hungerLevel;
  if (h == null) return 0;        // NPCs/players don't track creature hunger
  if (h < 25) return 0;
  if (h < 50) return 1;
  if (h < 75) return 2;
  return 3;
}

// deriveFor(subject, ref) — maps a Dungons & Fatties entity (NPC / Creature /
// Character: currentWeight, baseWeight, conditions, willingness, reputation,
// hunger, fullness, restraint/suspension state) to selector dimensions.
function deriveFor(subject, ref) {
  if (!subject) return {};

  const base = subject.baseWeight ?? 150;
  const cur = subject.currentWeight ?? base;
  const stage = getStageId(cur, base);

  // Legacy fields kept in sync by the spell layer.
  let restrainedBy = subject.restrainedBy || 'none';
  let suspensionState = subject.suspensionState || 'none';
  let fullness = subject.isFullness ? 1 : 0;
  let buried = 0, mindControlled = 0, oozeCoated = 0, enlarged = 0, slowed = 0;
  let floating = subject.isFloating ? 1 : 0;
  let floorTethered = subject.floorTethered ? 1 : 0;
  let buriedDepth = subject.buriedDepth || 0;

  const cond = subject.conditions;
  if (cond && typeof cond.has === 'function') {
    if (cond.has('restrained')) {
      const c = cond.get('restrained');
      restrainedBy = c.source || restrainedBy;
      if (c.suspension) suspensionState = c.suspension;
    }
    if (cond.has('buried')) buried = 1;
    if (cond.has('mind_controlled')) mindControlled = 1;
    if (cond.has('ooze_coated')) oozeCoated = 1;
    if (cond.has('enlarged')) enlarged = 1;
    if (cond.has('satiated')) fullness = 1;
    if (cond.has('floating')) floating = 1;
    if (cond.has('floor_tethered')) floorTethered = 1;
    if (cond.has('buried')) buriedDepth = cond.get('buried')?.depth || buriedDepth;
    if (cond.has('slowed')) slowed = 1;
  }

  const isRestrained = restrainedBy !== 'none' ? 1 : 0;
  const restraintMaterial = RESTRAINT_MATERIAL[restrainedBy] || (isRestrained ? 'magic' : 'none');
  const hungerTier = deriveHungerTier(subject);
  const ravenous = (hungerTier >= 3 || (cond?.has?.('ravenous'))) ? 1 : 0;
  const capacity = subject.stomachCapacity || 0;

  const refLbs = ref ? (ref.currentWeight ?? ref.baseWeight ?? cur) : null;
  const gravityMultiplier = subject.gravityMultiplier ?? 1;
  const effectiveGravity = subject.effectiveGravity ?? (cur * 0.1 * gravityMultiplier);

  return {
    stage,
    sizeClass: sizeClassFor(stage),
    bodyType: subject.bodyType || 'default',
    persona: subject.persona || null,
    mood: subject.personality || subject.mood || null,
    reputation: subject.playerReputation ?? 0,
    willingness: subject.willingness ?? 50,
    hungerTier,
    ravenous,
    fullness,
    fullnessRatio: capacity ? (subject.fullness || 0) / capacity : (fullness ? 1 : 0),
    isRestrained,
    restrained: isRestrained,
    restrainedBy,
    restraintMaterial,
    suspensionState,
    suspended: suspensionState !== 'none' ? 1 : 0,
    buried,
    buriedDepth,
    floating,
    floorTethered,
    gravityMultiplier,
    effectiveGravity,
    heavyGravity: gravityMultiplier > 1 ? 1 : 0,
    lowGravity: gravityMultiplier < 1 ? 1 : 0,
    positionedOn: subject.positionedOn || 'none',
    lastFoodChoice: subject.lastFoodChoice || null,
    lastFoodPreference: subject.lastFoodPreference || null,
    lastFoodDeliveryMode: subject.lastFoodDeliveryMode || null,
    caloriesEatenToday: subject.caloriesEatenToday ?? 0,
    pendingWeightGain: subject.pendingWeightGain ?? 0,
    lastCaloriesConsumed: subject.lastCaloriesConsumed ?? 0,
    calorieRetentionMultiplier: subject.calorieRetentionMultiplier ?? 1,
    lastRestWeightGain: subject.lastRestWeightGain ?? 0,
    mindControlled,
    oozeCoated,
    enlarged,
    slowed,
    lastWeightGain: subject.lastWeightGain ?? 0,
    subjectId: subject.id ?? null,
    relSize: ref ? relSize({ lbs: cur }, { lbs: refLbs }) : null,
    refStage: ref ? getStageId(refLbs, ref.baseWeight ?? 150) : null,
  };
}

// createContext(raw) — normalizes inputs and derives selector dimensions once.
// `subject` is the focal entity; `ref` is the reference (e.g. the caster) for
// relative comparisons. `globals` carries per-event data (spell, option, recent
// spells, gain amount) that `when` clauses can read directly.
export function createContext(raw = {}) {
  const { subject = null, ref = null, group = null, week = 1, globals = {} } = raw;
  const ctx = {
    subject, ref, group,
    week,
    season: raw.season || getSeason(week),
    globals,
    flags: Object.create(null),
    sessionUsed: raw.sessionUsed instanceof Set ? raw.sessionUsed : createSessionUsed(),
    weekUsed: raw.weekUsed instanceof Set ? raw.weekUsed : new Set(),
    d: deriveFor(subject, ref),
  };
  for (const [key, deriveFn] of DIMENSION_DERIVERS) {
    try {
      ctx.d[key] = deriveFn(ctx);
    } catch (e) {
      warn(`dimension "${key}" derive failed`, e);
    }
  }
  return ctx;
}

// Retarget a context onto another character (used by :ref / :group args so
// {word.size:ref} describes the reference character instead of subject).
function retarget(ctx, who) {
  if (who === 'ref' && ctx.ref) {
    return { ...ctx, subject: ctx.ref, ref: ctx.subject, d: deriveFor(ctx.ref, ctx.subject) };
  }
  if (who === 'group' && ctx.group && ctx.group.length) {
    const proxy = ctx.group[0];
    return { ...ctx, subject: proxy, d: deriveFor(proxy, ctx.ref) };
  }
  return ctx;
}

// ── module registry ───────────────────────────────────────────

const REGISTRY = new Map();
const MODULE_OPTS = new Map();

// registerModule(key, variants, opts)
// variant: { when:{...}, priority?:int, weight?:number, text: string | fn(ctx) | array }
// opts.select: 'best' (default — most specific match wins, ties pool) or
//              'pool' (every matching variant RNG-eligible, weighted by
//              specificity: w = (variant.weight ?? 1) * poolBase**score).
export function registerModule(key, variants, opts = {}) {
  if (key === 'join') { warn(`"join" is a reserved meta-slot and cannot be a module key`); return; }
  if (REGISTRY.has(key)) warn(`module "${key}" re-registered (overwriting)`);
  REGISTRY.set(key, Array.isArray(variants) ? variants : [variants]);
  MODULE_OPTS.set(key, opts);
}

// registerPool — registerModule in 'pool' selection mode (generic + specific
// variants stay co-eligible, specific weighted heavier).
export function registerPool(key, variants, opts = {}) {
  registerModule(key, variants, { select: 'pool', ...opts });
}

/** Prepend higher-priority variants without replacing the base module pool. */
export function registerModuleVariants(key, variants) {
  const extra = Array.isArray(variants) ? variants : [variants];
  const existing = REGISTRY.get(key) || [];
  REGISTRY.set(key, [...extra, ...existing]);
  if (!MODULE_OPTS.has(key)) MODULE_OPTS.set(key, {});
}

export function hasModule(key) { return REGISTRY.has(key); }

// Introspection for lint/debug only.
export function _registryEntries() { return [...REGISTRY.entries()]; }
export function _moduleOpts(key) { return MODULE_OPTS.get(key) || {}; }

// ── selector resolution ───────────────────────────────────────

// Range-object support (`{min, max}`) for object-style `when` values — keeps
// this game's existing content authored as { stage: { min: 7 } } working
// alongside the flat stageMin/stageMax form.
function matchRangeObject(actual, v) {
  if (v.min !== undefined && !(actual >= v.min)) return false;
  if (v.max !== undefined && !(actual <= v.max)) return false;
  return true;
}

// Returns {match:boolean, score:number} for one variant's `when` clause.
function evalWhen(when, ctx) {
  if (!when || Object.keys(when).length === 0) return { match: true, score: 0 };
  const d = ctx.d || {};
  let score = 0;
  let rangeCounted = false;

  for (const [k, v] of Object.entries(when)) {
    let ok;
    switch (k) {
      // Flat weight-stage range form (GameDev-native).
      case 'stageMin': ok = d.stage != null && d.stage >= v; break;
      case 'stageMax': ok = d.stage != null && d.stage <= v; break;
      case 'season': ok = Array.isArray(v) ? v.includes(ctx.season) : ctx.season === v; break;
      case 'weekMin': ok = ctx.week >= v; break;
      case 'weekMax': ok = ctx.week <= v; break;
      // Flat condition/state range forms for this game.
      case 'willingnessMin': ok = (d.willingness ?? 50) >= v; break;
      case 'willingnessMax': ok = (d.willingness ?? 50) <= v; break;
      case 'reputationMin': ok = (d.reputation ?? 0) >= v; break;
      case 'reputationMax': ok = (d.reputation ?? 0) <= v; break;
      case 'hungerTierMin': ok = (d.hungerTier ?? 0) >= v; break;
      case 'hungerTierMax': ok = (d.hungerTier ?? 0) <= v; break;
      case 'fullnessMin': ok = (d.fullnessRatio ?? 0) >= v; break;
      case 'fullnessMax': ok = (d.fullnessRatio ?? 0) <= v; break;
      case 'gainMin': ok = (d.lastWeightGain ?? ctx.globals?.lastWeightGain ?? 0) >= v; break;
      case 'gainMax': ok = (d.lastWeightGain ?? ctx.globals?.lastWeightGain ?? 0) <= v; break;
      case 'spell': ok = ctx.globals?.spell === v; break;
      case 'option': ok = ctx.globals?.option === v; break;
      case 'recentSpell': {
        const recent = ctx.globals?.recentSpells || [];
        ok = Array.isArray(v) ? v.some((x) => recent.includes(x)) : recent.includes(v);
        break;
      }
      default: {
        // dimension on ctx.d, else ctx.globals.
        const actual = d[k] ?? ctx.globals?.[k];
        if (v && typeof v === 'object' && !Array.isArray(v)) {
          ok = matchRangeObject(actual ?? 0, v);
        } else if (Array.isArray(v)) {
          ok = v.includes(actual);
        } else {
          ok = actual === v;
        }
      }
    }
    if (!ok) return { match: false, score: 0 };

    const isRangeKey = k.endsWith('Min') || k.endsWith('Max')
      || (v && typeof v === 'object' && !Array.isArray(v));
    if (isRangeKey) {
      if (!rangeCounted) { score += 1; rangeCounted = true; }
    } else {
      score += 1;
    }
  }
  return { match: true, score };
}

function flagsAbsent(ctx, requireAbsent) {
  if (!requireAbsent?.length) return true;
  const flags = ctx.flags || {};
  return !requireAbsent.some((flag) => flags[flag]);
}

function applyConsumes(ctx, variant) {
  if (!variant.consumes?.length) return;
  for (const flag of variant.consumes) ctx.flags[flag] = true;
}

function selectVariantRecord(key, ctx) {
  const variants = REGISTRY.get(key);
  if (!variants) { warn(`unknown module "${key}"`); return null; }
  const opts = MODULE_OPTS.get(key) || {};

  if (opts.select === 'pool') {
    const matches = [];
    let maxPriority = -Infinity;
    for (let variantIndex = 0; variantIndex < variants.length; variantIndex++) {
      const variant = variants[variantIndex];
      const { match, score } = evalWhen(variant.when, ctx);
      if (!match || !flagsAbsent(ctx, variant.requireAbsent)) continue;
      const priority = variant.priority || 0;
      if (priority > maxPriority) maxPriority = priority;
      matches.push({ variant, score, priority, variantIndex });
    }
    const eligible = matches.filter((m) => m.priority === maxPriority);
    if (!eligible.length) return null;
    const base = opts.poolBase ?? 3;
    const picked = pickFromEntries(
      buildPickEntries(key, eligible, base, ctx, true),
      key, eligible, base, ctx,
    );
    return picked ?? null;
  }

  let best = [], bestScore = -1, bestPriority = -Infinity;
  for (let variantIndex = 0; variantIndex < variants.length; variantIndex++) {
    const variant = variants[variantIndex];
    const { match, score } = evalWhen(variant.when, ctx);
    if (!match || !flagsAbsent(ctx, variant.requireAbsent)) continue;
    const priority = variant.priority || 0;
    if (score > bestScore || (score === bestScore && priority > bestPriority)) {
      best = [{ variant, score, priority, variantIndex }];
      bestScore = score;
      bestPriority = priority;
    } else if (score === bestScore && priority === bestPriority) {
      best.push({ variant, score, priority, variantIndex });
    }
  }
  if (!best.length) return null;

  const base = opts.poolBase ?? 3;
  const picked = pickFromEntries(
    buildPickEntries(key, best, base, ctx, true),
    key, best, base, ctx,
  );
  return picked ?? null;
}

function selectVariant(key, ctx) {
  const picked = selectVariantRecord(key, ctx);
  if (!picked) return '';
  const variant = picked.variant;
  if (picked.usageKey) recordVariantUsage(picked.usageKey, ctx);
  applyConsumes(ctx, variant);
  const t = picked.text;
  return typeof t === 'function' ? (t(ctx) ?? '') : (t ?? '');
}

// ── filters ───────────────────────────────────────────────────

function applyFilters(text, filters) {
  let out = text;
  for (const f of filters) {
    if (f === 'cap') out = out ? out.charAt(0).toUpperCase() + out.slice(1) : out;
    else if (f === 'lower') out = out.toLowerCase();
    else if (f === 'a') out = out ? (/^[aeiou]/i.test(out) ? 'an ' : 'a ') + out : out;
    else if (f.startsWith('prefix:')) out = out ? f.slice(7) + out : out;
    else if (f.startsWith('suffix:')) out = out ? out + f.slice(7) : out;
    else warn(`unknown filter "${f}"`);
  }
  return out;
}

// ── template resolution ───────────────────────────────────────

// {name}, {name:arg}, {name|filter}, {name:arg|filter|filter:x}
const SLOT_RE = /\{([a-zA-Z][\w.]*)(?::([^|}]*))?((?:\|[^}]*)?)\}/g;
const ESCAPE_TOKEN = ''; // private-use char, never in prose
const MAX_DEPTH = 5;

function resolveSlot(name, slotCtx, depth, trace) {
  const raw = String(selectVariant(name, slotCtx));
  let leaf = true;
  SLOT_RE.lastIndex = 0;
  let m;
  while ((m = SLOT_RE.exec(raw))) {
    if (!m[1].startsWith('subject.')) { leaf = false; break; }
  }
  const out = resolveText(raw, slotCtx, depth + 1, trace);
  if (trace && out.trim()) trace.push({ key: name, text: out.trim(), leaf, depth });
  return out;
}

function resolveText(text, ctx, depth, trace) {
  if (depth >= MAX_DEPTH) {
    SLOT_RE.lastIndex = 0;
    if (SLOT_RE.test(text)) {
      warn('max recursion depth reached; stripping unresolved slots');
      SLOT_RE.lastIndex = 0;
      text = text.replace(SLOT_RE, '');
    }
    return text;
  }
  SLOT_RE.lastIndex = 0;
  return text.replace(SLOT_RE, (_, name, arg, filterStr) => {
    const filters = filterStr ? filterStr.split('|').filter(Boolean) : [];

    // {join:a,b,c|...} — resolve each listed module, drop empties, glue with
    // commas + a final "and". Pair with |prefix:/|suffix: for optional clauses.
    if (name === 'join') {
      const parts = (arg || '')
        .split(',').map((k) => k.trim()).filter(Boolean)
        .map((k) => resolveSlot(k, ctx, depth, trace).trim())
        .filter(Boolean);
      const out = parts.length <= 1 ? (parts[0] || '')
        : parts.length === 2 ? `${parts[0]} and ${parts[1]}`
        : `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]}`;
      return applyFilters(out, filters);
    }

    let slotCtx = ctx;
    if (arg === 'ref' || arg === 'group') slotCtx = retarget(ctx, arg);
    else if (arg) slotCtx = { ...ctx, arg };
    return applyFilters(resolveSlot(name, slotCtx, depth, trace), filters);
  });
}

function smooth(text) {
  return text
    .replace(/ {2,}/g, ' ')
    .replace(/ ([.,!?;:])/g, '$1')
    .replace(/\.{2,}/g, '.')
    .replace(/(^|[.!?] )([a-z])/g, (_, lead, ch) => lead + ch.toUpperCase())
    .trim();
}

// render(template, ctx, opts) — single public entry point. Never throws:
// unknown modules emit "" with a dev warning.
export function render(template, ctx, opts = {}) {
  let text = String(template).replace(/\{\{/g, ESCAPE_TOKEN);
  text = resolveText(text, ctx, 0, opts.trace || null);
  text = text.replace(new RegExp(ESCAPE_TOKEN, 'g'), '{');
  return opts.noSmooth ? text : smooth(text);
}
