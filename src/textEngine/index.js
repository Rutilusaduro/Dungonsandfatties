/**
 * Text Engine Initialization
 * Sets up the modular text engine with all modules and lexicon
 */

import ModularTextEngine from './engine.js';
import { lexicon } from './lexicon.js';
import registerNPCModules from './scenes/npc.js';
import registerSpellModules from './scenes/spell.js';
import registerNPCPersonas from './scenes/personas.js';

class TextEngineInitializer {
  static createInstance() {
    const engine = new ModularTextEngine();

    // Register all scene modules
    registerNPCModules(engine, lexicon);
    registerSpellModules(engine);
    registerNPCPersonas(engine);

    // Attach lexicon for easy access
    engine.lexicon = lexicon;

    return engine;
  }
}

let globalEngine = null;

export function initializeTextEngine() {
  if (!globalEngine) {
    globalEngine = TextEngineInitializer.createInstance();
  }
  return globalEngine;
}

export function getTextEngine() {
  if (!globalEngine) {
    return initializeTextEngine();
  }
  return globalEngine;
}

export { ModularTextEngine, lexicon };
