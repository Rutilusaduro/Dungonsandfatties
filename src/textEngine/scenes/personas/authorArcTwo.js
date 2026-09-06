/**
 * Second-pass "arc" variants — relationship progression beats appended to persona pools.
 * Favor high reputation + willingness + weight stage gates for late-arc intimacy.
 */

export function arcLine(text, when = {}, weight = 2) {
  return { when, text, weight };
}

export function arcExamine(text, when = {}) {
  return { when, text };
}

/**
 * Build a persona fragment for mergePersonaBundles (concat, not replace).
 * @param {string} personaKey
 * @param {{
 *   examine?: object[],
 *   greetings?: object[],
 *   afterFeeding?: object[],
 *   offerFood?: object[],
 *   topics?: Record<string, object[]>,
 * }} modules
 */
export function buildArcTwo(personaKey, modules) {
  const out = {};
  if (modules.examine?.length) out['npc.examine'] = modules.examine;
  if (modules.greetings?.length) out['npc.dialogue.greeting'] = modules.greetings;
  if (modules.afterFeeding?.length) out['npc.dialogue.after_feeding'] = modules.afterFeeding;
  if (modules.offerFood?.length) out['npc.dialogue.offer_food'] = modules.offerFood;
  for (const [topic, lines] of Object.entries(modules.topics || {})) {
    out[`npc.dialogue.${topic}`] = lines;
  }
  return { [personaKey]: out };
}

/** Merge many buildArcTwo() fragments into one EXPANSIONS map. */
export function mergeArcTwo(...parts) {
  const out = {};
  for (const part of parts) {
    for (const [persona, modules] of Object.entries(part)) {
      if (!out[persona]) out[persona] = {};
      for (const [key, variants] of Object.entries(modules)) {
        if (!out[persona][key]) out[persona][key] = [];
        out[persona][key].push(...variants);
      }
    }
  }
  return out;
}

/** Common arc gates — compose with spread in `when`. */
export const ARC = {
  early: { stageMax: 2, reputationMin: 15 },
  warming: { stageMin: 3, stageMax: 5, reputationMin: 35, willingnessMin: 45 },
  bonded: { stageMin: 5, reputationMin: 55, willingnessMin: 60 },
  devoted: { stageMin: 7, reputationMin: 65, willingnessMin: 70 },
  culmination: { stageMin: 9, reputationMin: 75, willingnessMin: 80 },
};
