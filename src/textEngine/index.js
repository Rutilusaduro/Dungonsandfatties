// ═══════════════════════════════════════════════════════════════
// TEXT ENGINE — initialization + compatibility facade
// The ported engine (engine.js) is a module of standalone functions over a
// global registry. This file registers all vocab/scene modules and exposes a
// small facade object so existing callers can keep using
//   engine.render(moduleKey, ctx) / engine.registerPool(...) / etc.
// ═══════════════════════════════════════════════════════════════

import * as Engine from './engine.js';
import { lexicon } from './lexicon.js';
import { registerVocab } from './vocab.js';
import { registerBodyLexicon } from './lexicon/body.js';
import { registerGrowthLexicon } from './lexicon/growth.js';
import registerNPCModules from './scenes/npc.js';
import registerSpellModules from './scenes/spell.js';
import registerNPCPersonas from './scenes/personas.js';

// Wrap a raw dims object / {subject,...} / full ctx into an engine context.
function toContext(raw) {
  if (!raw) {
    return Engine.createContext({});
  }
  // Already a full engine context.
  if (raw.d && raw.sessionUsed) return raw;
  // A createContext input ({ subject, ref, globals, ... }).
  if (raw.subject || raw.ref || raw.group || raw.globals) {
    return Engine.createContext(raw);
  }
  // A bare dims object (legacy hand-built context).
  return {
    subject: null, ref: null, group: null, week: 1, season: 'spring',
    globals: {}, flags: Object.create(null),
    sessionUsed: new Set(), weekUsed: new Set(),
    d: raw,
  };
}

// The facade — method shape preserved from the previous engine class so all
// existing scene/persona/spell registration and render calls keep working.
const engine = {
  registerModule: (key, variants, opts) => Engine.registerModule(key, variants, opts),
  registerPool: (key, variants, opts) => Engine.registerPool(key, variants, opts),

  // Persona overlay: prepend variants, multiplying each by an optional weight
  // so named NPCs dominate generic pool picks (old { weight: 4 } behavior).
  registerModuleVariants: (key, variants, opts = {}) => {
    const w = opts.weight ?? 1;
    const list = (Array.isArray(variants) ? variants : [variants]).map((v) => ({
      ...v,
      weight: (v.weight ?? 1) * w,
    }));
    Engine.registerModuleVariants(key, list);
  },

  hasModule: (key) => Engine.hasModule(key),
  createContext: (raw) => Engine.createContext(raw),

  // render(moduleKeyOrTemplate, ctxOrDims, opts)
  render: (keyOrTemplate, rawOrCtx, opts = {}) => {
    try {
      const ctx = toContext(rawOrCtx);
      const template = Engine.hasModule(keyOrTemplate) ? `{${keyOrTemplate}}` : keyOrTemplate;
      return Engine.render(template, ctx, opts);
    } catch (e) {
      return '';
    }
  },

  lexicon,
};

let globalEngine = null;

export function initializeTextEngine() {
  if (!globalEngine) {
    // Registration order: vocab + body lexicon first (slots), then scenes,
    // then persona overlays (prepended so they win ties).
    registerVocab();
    registerBodyLexicon();
    registerGrowthLexicon(engine);
    registerNPCModules(engine, lexicon);
    registerSpellModules(engine);
    registerNPCPersonas(engine);
    globalEngine = engine;
  }
  return globalEngine;
}

export function getTextEngine() {
  return globalEngine || initializeTextEngine();
}

export { lexicon };
export default getTextEngine;
