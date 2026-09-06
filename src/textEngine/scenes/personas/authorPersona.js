/**
 * Compact authoring helper — turns prose config into a persona module entry.
 */
import { examineLadder } from './helpers.js';

export function line(text, when = {}, weight = 2) {
  return { when, text, weight };
}

/**
 * @param {string} personaKey
 * @param {{
 *   name: string,
 *   bands: Record<string, string>,
 *   extras?: Record<string, string>,
 *   greetings?: object[],
 *   afterFeeding?: object[],
 *   offerFood?: object[],
 *   topics?: Record<string, object[]>,
 * }} config
 */
export function authorPersona(personaKey, config) {
  const modules = {
    'npc.examine': examineLadder(config.name, config.bands, config.extras || {}),
  };

  if (config.greetings?.length) {
    modules['npc.dialogue.greeting'] = config.greetings;
  }
  if (config.afterFeeding?.length) {
    modules['npc.dialogue.after_feeding'] = config.afterFeeding;
  }
  if (config.offerFood?.length) {
    modules['npc.dialogue.offer_food'] = config.offerFood;
  }
  for (const [topic, variants] of Object.entries(config.topics || {})) {
    modules[`npc.dialogue.${topic}`] = variants;
  }

  return { [personaKey]: modules };
}

/** Merge many authorPersona() results into one PERSONAS map. */
export function mergePersonas(...parts) {
  return Object.assign({}, ...parts);
}
