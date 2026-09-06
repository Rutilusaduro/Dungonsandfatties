/**
 * Helpers for handcrafted persona modules.
 * Every persona should use full-sentence examine variants and dialogue beats.
 */

/** Standard weight-stage examine ladder — pass prose strings per band. */
export function examineLadder(name, bands, extras = {}) {
  const out = [];
  if (extras.ceiling) {
    out.push({ when: { suspensionState: 'ceiling' }, text: extras.ceiling });
  }
  if (extras.hold) {
    out.push({ when: { restrainedBy: 'hold_person' }, text: extras.hold });
  }
  if (extras.snare) {
    out.push({ when: { restrainedBy: 'confection_snare' }, text: extras.snare });
  }
  if (extras.full) {
    out.push({ when: { fullness: 1, stageMin: 5 }, text: extras.full });
  }
  if (bands.slender) out.push({ when: { stageMax: 1 }, text: bands.slender });
  if (bands.curvy) out.push({ when: { stageMin: 2, stageMax: 3 }, text: bands.curvy });
  if (bands.plump) out.push({ when: { stageMin: 4, stageMax: 5 }, text: bands.plump });
  if (bands.large) out.push({ when: { stageMin: 6, stageMax: 7 }, text: bands.large });
  if (bands.enormous) out.push({ when: { stageMin: 8, stageMax: 9 }, text: bands.enormous });
  if (bands.immense) out.push({ when: { stageMin: 10 }, text: bands.immense });
  out.push({ when: {}, text: bands.fallback || bands.slender || `${name} stands before you.` });
  return out;
}

export function pool(key, variants) {
  return { [key]: variants };
}

export function greet(lines) {
  return { 'npc.dialogue.greeting': lines };
}

export function fed(lines) {
  return { 'npc.dialogue.after_feeding': lines };
}

export function offer(lines) {
  return { 'npc.dialogue.offer_food': lines };
}

export function topic(key, lines) {
  return { [`npc.dialogue.${key}`]: lines };
}

export function mergePersona(...parts) {
  return Object.assign({}, ...parts);
}
