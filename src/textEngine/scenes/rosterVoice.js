/**
 * Per-NPC voice generation — turns roster data into unique dialogue and examine prose.
 * Every NPC gets distinct lines keyed on role, personality, food prefs, and description.
 */

const PERSONALITY_GREETING = {
  friendly: [
    { when: { reputationMin: 50 }, text: w => `"There you are!" ${w.first} beams. "I was hoping you'd stop by."`, weight: 3 },
    { when: {}, text: w => `${w.first} offers a warm smile. "Hello — good to see a friendly face."`, weight: 1 },
  ],
  stern: [
    { when: { reputationMin: 40 }, text: w => `"You again." ${w.first} almost smiles. Almost.`, weight: 2 },
    { when: {}, text: w => `${w.first} regards you evenly. "State your business."`, weight: 1 },
  ],
  shrewd: [
    { when: { reputationMin: 45 }, text: w => `"Ah — my favorite customer." ${w.first}'s eyes gleam. "I have just the thing."`, weight: 3 },
    { when: {}, text: w => `${w.first} assesses you in one glance. "Buying or browsing?"`, weight: 1 },
  ],
  peaceful: [
    { when: { reputationMin: 40 }, text: w => `${w.first} looks up serenely. "Welcome. The air is gentle today."`, weight: 2 },
    { when: {}, text: w => `${w.first} nods unhurriedly. "Peace be with you."`, weight: 1 },
  ],
  commanding: [
    { when: { reputationMin: 50 }, text: w => `"Good — you're here." ${w.first} doesn't ask; she informs.`, weight: 3 },
    { when: {}, text: w => `${w.first} looks you over. "Don't touch anything hot."`, weight: 1 },
  ],
  boisterous: [
    { when: {}, text: w => `"HEY!" ${w.first} waves broadly. "Get over here!"`, weight: 3 },
  ],
  gruff: [
    { when: {}, text: w => `${w.first} grunts acknowledgment. "...Yeah?"`, weight: 1 },
  ],
  gentle: [
    { when: { willingnessMin: 60 }, text: w => `${w.first} softens. "Oh — hello, dear. Are you hungry?"`, weight: 2 },
    { when: {}, text: w => `${w.first} greets you quietly, kindly.`, weight: 1 },
  ],
  cryptic: [
    { when: {}, text: w => `${w.first} watches you without blinking. "...The depths remember."`, weight: 1 },
  ],
};

const ROLE_TOPIC = {
  cooking: (w) => [
    { when: { stageMin: 5 }, text: `"A ${w.role} knows hunger," ${w.first} says, patting her middle. "I practice what I preach."`, weight: 3 },
    { when: { reputationMin: 40 }, text: `"Taste before you serve. Rule one." ${w.first} taps the counter.`, weight: 2 },
    { when: {}, text: `"Kitchen's hot. Appetites hotter. That's the job."`, weight: 1 },
  ],
  gardening: (w) => [
    { when: { stageMin: 4 }, text: `"Everything grows if you feed it," ${w.first} murmurs, glancing at her own curves.`, weight: 2 },
    { when: {}, text: `"The soil gives back what you put in. So do people."`, weight: 1 },
  ],
  selling: (w) => [
    { when: { reputationMin: 35 }, text: `"For you? I might make an exception on price."`, weight: 2 },
    { when: {}, text: `"Quality costs. You knew that when you walked in."`, weight: 1 },
  ],
  warning: (w) => [
    { when: { reputationMax: -20 }, text: `"One wrong move," ${w.first} says flatly, "and you'll regret it."`, weight: 3 },
    { when: {}, text: `"Mind yourself here. I am watching."`, weight: 1 },
  ],
  market_banter: (w) => [
    { when: { stageMin: 4 }, text: `"Coin follows appetite," ${w.first} says. "I've watched it for years."`, weight: 2 },
    { when: {}, text: `"Fair trade, full baskets. That's how a ${w.role.toLowerCase()} survives."`, weight: 1 },
  ],
  temple_sermon: (w) => [
    { when: { reputationMin: 35 }, text: `"Hunger is honest," ${w.first} intones. "Answer it with gratitude."`, weight: 2 },
    { when: {}, text: `"The shrine welcomes all who come in need — of body or spirit."`, weight: 1 },
  ],
  noble_gossip: (w) => [
    { when: { reputationMin: 30 }, text: `"Above the salt they pretend," ${w.first} whispers. "Below it, we know."`, weight: 2 },
    { when: {}, text: `"Appearances are costly. Appetites are harder to hide."`, weight: 1 },
  ],
  harbor_tales: (w) => [
    { when: { stageMin: 3 }, text: `"Salt air sharpens hunger," ${w.first} says. "The docks never run empty long."`, weight: 2 },
    { when: {}, text: `"Every crate has a story. Most end at a table."`, weight: 1 },
  ],
  tavern_chat: (w) => [
    { when: { willingnessMin: 65 }, text: `"Pull up a stool," ${w.first} says. "Stories travel better on a full stomach."`, weight: 2 },
    { when: {}, text: `"Quiet night. Good night for a drink and something warm."`, weight: 1 },
  ],
  friendly: (w) => [
    { when: { reputationMin: 45 }, text: `"You've earned my trust," ${w.first} admits. "Don't waste it."`, weight: 2 },
    { when: {}, text: `"You seem reliable. I appreciate that."`, weight: 1 },
  ],
  haggle: (w) => [
    { when: { reputationMin: 40 }, text: `"You drive a hard bargain. Fine — for you, a little less."`, weight: 2 },
    { when: {}, text: `"My price is fair. Yours needs work."`, weight: 1 },
  ],
};

function ctx(def) {
  const first = def.name.split(' ')[0];
  const love = def.foodLoves?.[0] || 'something good';
  const like = def.foodLikes?.[0] || 'a meal';
  return { first, role: def.role, love, like, body: def.bodyType, personality: def.personality };
}

function mapLines(templateList, w) {
  return templateList.map(t => ({
    when: t.when || {},
    text: typeof t.text === 'function' ? t.text(w) : t.text,
    weight: t.weight ?? 2,
  }));
}

export function buildUniqueExamineBands(def) {
  const w = ctx(def);
  const base = def.description?.replace(/\.$/, '') || `${w.first} works as the ${w.role.toLowerCase()}`;
  return {
    slender: `${w.first} is the ${w.role.toLowerCase()} here — ${base}. ${capitalize(w.personality)}, and still slight; she looks like she could use a proper ${w.love.toLowerCase()}.`,
    curvy: `${w.first} has softened into gentle curves, her ${w.body} frame rounding out. The ${w.role.toLowerCase()}'s appetite is starting to show.`,
    plump: `${w.first} is pleasantly plump now — a ${w.role.toLowerCase()} whose love of ${w.love.toLowerCase()} has written itself on every line of her figure.`,
    large: `${w.first} is very large, her ${w.body} body commanding the space. As ${w.role.toLowerCase()}, she carries the weight like part of the job description.`,
    enormous: `${w.first} is enormously full-figured — the kind of ${w.role.toLowerCase()} legends get told about after closing time.`,
    immense: `${w.first} has grown immense, a living monument to ${w.love.toLowerCase()} and every ${w.like.toLowerCase()} she ever accepted.`,
  };
}

export function buildUniqueGreetings(def) {
  const w = ctx(def);
  const pool = PERSONALITY_GREETING[def.personality] || PERSONALITY_GREETING.friendly;
  const lines = mapLines(pool, w);
  lines.push({
    when: { willingnessMin: 70 },
    text: `"If you've brought ${w.love}," ${w.first} says, "I'm listening."`,
    weight: 2,
  });
  lines.push({
    when: {},
    text: `${w.first} looks up from her work as ${w.role.toLowerCase()}. "Yes?"`,
    weight: 1,
  });
  return lines;
}

export function buildUniqueAfterFeeding(def) {
  const w = ctx(def);
  return [
    { when: { willingnessMin: 75 }, text: `"Oh — that ${w.love} was divine. You know my tastes."`, weight: 3 },
    { when: { willingnessMin: 50, willingnessMax: 74 }, text: `"Mmm. Solid ${w.like}. Thank you."`, weight: 2 },
    { when: { willingnessMax: 49 }, text: `"...Acceptable. I suppose."`, weight: 1 },
    { when: {}, text: `"That will do. Thank you."`, weight: 1 },
  ];
}

export function buildUniqueOfferFood(def) {
  const w = ctx(def);
  return [
    { when: { willingnessMin: 70, reputationMin: 40 }, text: `"For me? Oh — if it's ${w.love}, don't tease. Put it down."`, weight: 3 },
    { when: { willingnessMin: 55 }, text: `"I'm not saying no to food. What is it?"`, weight: 2 },
    { when: {}, text: `"Offering something? I'm a ${w.role.toLowerCase()} — I'm always weighing an appetite."`, weight: 1 },
  ];
}

export function buildUniqueTopics(def) {
  const w = ctx(def);
  const topics = {};
  for (const t of def.dialogueTopics || []) {
    if (['greeting', 'after_feeding', 'offer_food'].includes(t)) continue;
    if (ROLE_TOPIC[t]) {
      topics[t] = ROLE_TOPIC[t](w);
    } else {
      topics[t] = [{ when: {}, text: `${w.first} considers. "As ${w.role.toLowerCase()}, I don't have much to say about that."`, weight: 1 }];
    }
  }
  return topics;
}

function capitalize(s) {
  if (!s) return 'Composed';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function buildEnrichedProfile(key, def) {
  const w = ctx(def);
  return {
    persona: def.persona,
    displayName: w.first,
    name: def.name,
    description: def.description,
    examineByBand: buildUniqueExamineBands(def),
    examineFull: `${w.first} sits utterly stuffed, ${w.role.toLowerCase()} duties forgotten, hands resting on a distended belly. Even ${w.love.toLowerCase()} couldn't tempt another bite.`,
    examineRestrained: {
      ceiling: `${w.first} hangs suspended — ${w.role.toLowerCase()}, candy bonds, indignity complete. "Put me DOWN."`,
      hold: `${w.first} is frozen mid-task, ${w.role.toLowerCase()} paralyzed by magic, eyes wide with helpless fury.`,
    },
    greetings: buildUniqueGreetings(def),
    afterFeeding: buildUniqueAfterFeeding(def),
    offerFood: buildUniqueOfferFood(def),
    topics: buildUniqueTopics(def),
  };
}
