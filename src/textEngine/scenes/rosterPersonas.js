/**
 * Roster-driven persona profiles — auto-generated overlays for all NPCs in NPC_ROSTER.
 * Handcrafted personas in personas.js register first; this supplements every roster entry
 * with weight-stage examine coverage and topic-appropriate dialogue.
 */

import { NPC_ROSTER } from '../../game/world/data/npcRoster.js';
import { registerProfilePersonas } from './personaFactory.js';

// Personas already fully authored in personas.js — skip to avoid dilution.
const HANDCRAFTED = new Set([
  'bella', 'silvia', 'gregg', 'cassandra', 'gertrude',
  'mira', 'tansy', 'lenna',
  'gwen_market', 'margaret_priestess', 'mirabel_countess', 'morgan_captain',
]);

const TOPIC_LINES = {
  tavern_chat: [
    { when: { reputationMin: 40 }, text: 'The regulars have been thin on coin and appetite lately. Still — a warm hearth is worth something.', weight: 2 },
    { when: {}, text: 'Quiet night. Good night for a story and a drink.', weight: 1 },
  ],
  gardening: [
    { when: { stageMin: 4 }, text: 'Everything grows if you feed it long enough — plants, seasons, people.', weight: 2 },
    { when: {}, text: 'The soil remembers what you give it.', weight: 1 },
  ],
  cooking: [
    { when: { reputationMin: 40 }, text: 'Hunger is the oldest language. I speak it fluently.', weight: 2 },
    { when: {}, text: 'Good food takes time. Great food takes appetite.', weight: 1 },
  ],
  selling: [
    { when: { reputationMin: 30 }, text: 'For you I might bend the price — a little.', weight: 2 },
    { when: {}, text: 'Quality costs. You knew that when you walked in.', weight: 1 },
  ],
  haggle: [
    { when: {}, text: 'You drive a hard bargain. I respect that — to a point.', weight: 1 },
  ],
  friendly: [
    { when: { reputationMin: 40 }, text: 'You\'ve earned a measure of trust. Don\'t waste it.', weight: 2 },
    { when: {}, text: 'You seem reliable enough.', weight: 1 },
  ],
  warning: [
    { when: { reputationMax: -20 }, text: 'I\'m watching you. One wrong move.', weight: 2 },
    { when: {}, text: 'Mind your conduct here.', weight: 1 },
  ],
  after_feeding: [
    { when: { willingnessMin: 70 }, text: 'Mmm... that was lovely. Thank you.', weight: 3 },
    { when: { willingnessMin: 45 }, text: 'Filling. I appreciate it.', weight: 2 },
    { when: {}, text: 'That will do, thank you.', weight: 1 },
  ],
  offer_food: [
    { when: { willingnessMin: 65 }, text: 'Oh — for me? I wouldn\'t say no.', weight: 3 },
    { when: {}, text: 'What are you offering?', weight: 1 },
  ],
  market_banter: [
    { when: { reputationMin: 35 }, text: 'Stalls are moving — appetite\'s up. Good for business.', weight: 2 },
    { when: {}, text: 'Fair trade and full baskets. That\'s the market way.', weight: 1 },
  ],
  temple_sermon: [
    { when: { reputationMin: 35 }, text: 'Hunger is honest. The shrine answers it without judgment.', weight: 2 },
    { when: {}, text: 'Peace sits easier after bread shared.', weight: 1 },
  ],
  noble_gossip: [
    { when: { reputationMin: 30 }, text: 'Above the salt, they pretend. Below it, the staff knows.', weight: 2 },
    { when: {}, text: 'Appearances are expensive. Appetites are harder to hide.', weight: 1 },
  ],
  harbor_tales: [
    { when: { reputationMin: 30 }, text: 'Salt air sharpens hunger. The docks never run empty long.', weight: 2 },
    { when: {}, text: 'Every crate has a story. Most end at a table.', weight: 1 },
  ],
};

function rosterToProfile(key, def) {
  const first = def.name.split(' ')[0];
  const voiceHints = {
    friendly: 'warm eyes and an open smile',
    stern: 'a disciplined bearing',
    shrewd: 'sharp, assessing eyes',
    peaceful: 'serene, unhurried grace',
    commanding: 'an authoritative presence',
    boisterous: 'loud laughter never far away',
    wistful: 'a distant, dreaming look',
    reserved: 'quiet composure',
    cheerful: 'bright, easy warmth',
    greedy: 'a merchant\'s calculating gleam',
    noble: 'refined poise',
    suspicious: 'narrowed, watchful eyes',
  };

  const topics = {};
  for (const t of def.dialogueTopics || []) {
    if (t === 'greeting' || t === 'after_feeding' || t === 'offer_food') continue;
    topics[t] = TOPIC_LINES[t] || [{ when: {}, text: `${first} has little to say on that subject.`, weight: 1 }];
  }

  return {
    persona: def.persona,
    displayName: first,
    name: def.name,
    description: def.description,
    voiceHint: voiceHints[def.personality] || 'a distinct presence',
    examineByBand: {
      slender: `${first} is ${def.personality || 'composed'}, ${voiceHints[def.personality] || 'watching you carefully'}. ${def.description}`,
      curvy: `${first} has softened into gentle curves, ${voiceHints[def.personality] || 'carrying new weight with ease'}.`,
      plump: `${first} is pleasantly plump now — ${def.role?.toLowerCase() || 'patron'} whose appetite shows in every line of her figure.`,
      large: `${first} is very large, her ${def.bodyType || 'generous'} frame commanding the space.`,
      enormous: `${first} is enormously full-figured, a walking testament to indulgence.`,
      immense: `${first} has grown immense — legendary abundance in motion.`,
    },
    greetings: [
      { when: { reputationMin: 50 }, text: `${first} brightens. "Good to see you again."`, weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: `"Oh — hello." ${first} nods politely.`, weight: 2 },
      { when: { willingnessMin: 75 }, text: `"Come closer — I could use the company."`, weight: 2 },
      { when: {}, text: `${first} looks up. "Yes?"`, weight: 1 },
    ],
    afterFeeding: TOPIC_LINES.after_feeding,
    offerFood: TOPIC_LINES.offer_food,
    topics,
  };
}

export function registerRosterPersonas(engine) {
  const profiles = {};
  for (const [key, def] of Object.entries(NPC_ROSTER)) {
    if (HANDCRAFTED.has(def.persona)) continue;
    profiles[key] = rosterToProfile(key, def);
  }
  registerProfilePersonas(engine, profiles);
}

export default registerRosterPersonas;
