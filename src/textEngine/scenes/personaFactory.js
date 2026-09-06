/**
 * PersonaFactory — builds text-engine persona overlays from compact NPC profiles.
 * Generates weight-stage examine coverage and registers via registerModuleVariants.
 */

const STAGE_BANDS = [
  { min: 0, max: 1, key: 'slender' },
  { min: 2, max: 3, key: 'curvy' },
  { min: 4, max: 5, key: 'plump' },
  { min: 6, max: 7, key: 'large' },
  { min: 8, max: 9, key: 'enormous' },
  { min: 10, max: 11, key: 'immense' },
];

function bandExamine(profile, band) {
  const byBand = profile.examineByBand || {};
  if (byBand[band.key]) return byBand[band.key];
  const name = profile.displayName || profile.name?.split(' ')[0] || 'She';
  const templates = {
    slender: `${name} is slender, with ${profile.voiceHint || 'a quiet presence'}.`,
    curvy: `${name} has grown softly curvy — ${profile.voiceHint || 'her frame rounding pleasantly'}.`,
    plump: `${name} is pleasantly plump now, ${profile.voiceHint || 'carrying extra weight with ease'}.`,
    large: `${name} is very large, ${profile.voiceHint || 'her substantial curves impossible to miss'}.`,
    enormous: `${name} is enormously full-figured — ${profile.voiceHint || 'a towering presence of indulgence'}.`,
    immense: `${name} has become truly immense, ${profile.voiceHint || 'legendary in her abundance'}.`,
  };
  return templates[band.key] || templates.slender;
}

function buildExamineVariants(profile) {
  const variants = [
    {
      when: { suspensionState: 'ceiling' },
      text: profile.examineRestrained?.ceiling
        || `${profile.displayName || 'She'} hangs suspended, candy bonds creaking under her weight, face flushed with indignity.`,
    },
    {
      when: { restrainedBy: 'hold_person' },
      text: profile.examineRestrained?.hold
        || `${profile.displayName || 'She'} is frozen in place by invisible force, eyes wide with helpless awareness.`,
    },
    {
      when: { fullness: 1, stageMin: 5 },
      text: profile.examineFull
        || `${profile.displayName || 'She'} sits utterly stuffed, hands resting on a distended belly, eyes half-lidded with satiation.`,
    },
  ];

  for (const band of STAGE_BANDS) {
    variants.push({
      when: { stageMin: band.min, stageMax: band.max },
      text: bandExamine(profile, band),
    });
  }
  variants.push({
    when: {},
    text: profile.description || `${profile.displayName || 'She'} stands before you.`,
  });
  return variants;
}

function buildGreetingVariants(profile) {
  const lines = profile.greetings || [
    { when: { reputationMin: 50 }, text: `Oh, hello! I was hoping you'd come by.`, weight: 3 },
    { when: { reputationMin: 25, reputationMax: 49 }, text: `Hello there. Good to see you.`, weight: 2 },
    { when: {}, text: `Yes? Can I help you?`, weight: 1 },
  ];
  return lines.map(l => ({
    when: l.when || {},
    text: Array.isArray(l.text) ? l.text : [l.text],
    weight: l.weight ?? 2,
  }));
}

function buildTopicVariants(profile, topicKey, lines) {
  if (!lines?.length) return null;
  return lines.map(l => ({
    when: l.when || {},
    text: Array.isArray(l.text) ? l.text : [l.text],
    weight: l.weight ?? 2,
  }));
}

/**
 * Convert NPC_PROFILES map into PERSONAS shape for registerNPCPersonas.
 */
export function buildPersonasFromProfiles(profiles) {
  const personas = {};

  for (const [key, profile] of Object.entries(profiles)) {
    const personaKey = profile.persona || key;
    const modules = {};

    modules['npc.dialogue.greeting'] = buildGreetingVariants(profile);
    modules['npc.examine'] = buildExamineVariants(profile);

    if (profile.afterFeeding) {
      modules['npc.dialogue.after_feeding'] = buildTopicVariants(profile, 'after_feeding', profile.afterFeeding);
    }
    if (profile.offerFood) {
      modules['npc.dialogue.offer_food'] = buildTopicVariants(profile, 'offer_food', profile.offerFood);
    }

    for (const [topic, lines] of Object.entries(profile.topics || {})) {
      const modKey = topic.startsWith('npc.') ? topic : `npc.dialogue.${topic}`;
      const built = buildTopicVariants(profile, topic, lines);
      if (built) modules[modKey] = built;
    }

    personas[personaKey] = modules;
  }

  return personas;
}

export function registerProfilePersonas(engine, profiles) {
  const personas = buildPersonasFromProfiles(profiles);
  for (const [persona, modules] of Object.entries(personas)) {
    for (const [modKey, variants] of Object.entries(modules)) {
      const tagged = variants.map(v => ({
        ...v,
        when: { ...(v.when || {}), persona },
        text: Array.isArray(v.text) ? v.text : [v.text],
      }));
      engine.registerModuleVariants(modKey, tagged, { weight: 4 });
    }
  }
}

export default registerProfilePersonas;
