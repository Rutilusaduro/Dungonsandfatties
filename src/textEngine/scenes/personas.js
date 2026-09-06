/**
 * NPC Personas
 * Personality overlays for named NPCs. Every variant is gated by the `persona`
 * dimension (derived from NPC.persona) so Bella never speaks Silvia's lines and
 * an examine never describes the wrong woman. Variants are prepended with a
 * weight multiplier so the matching NPC's voice dominates the generic pool.
 */

import PERSONAS from './personas/handcrafted/index.js';

export function registerNPCPersonas(engine) {
  for (const [persona, modules] of Object.entries(PERSONAS)) {
    for (const [key, variants] of Object.entries(modules)) {
      const tagged = variants.map((v) => ({ ...v, when: { ...(v.when || {}), persona } }));
      engine.registerModuleVariants(key, tagged, { weight: 4 });
    }
  }
}

export { PERSONAS };
export default registerNPCPersonas;
