/**
 * NPC Scene Modules
 * Dialogue variants for NPCs with personality, reputation, and weight awareness
 */

export function registerNPCModules(engine, lexicon) {
  // Greeting module - initial conversation opener
  engine.registerPool('npc.greeting', [
    {
      when: { reputation: { min: 50 }, willingness: { min: 70 } },
      text: ['Oh, hello again! I\'ve been hoping to see you.', 'Welcome back, friend!', 'What a pleasant surprise!'],
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 }, willingness: { min: 50 } },
      text: ['Hello there. Come to visit?', 'Oh, it\'s you. How nice.', 'Well, this is a pleasant enough encounter.'],
      weight: 2,
    },
    {
      when: { reputation: { max: 24 }, willingness: { min: 50 } },
      text: ['I suppose we could chat.', 'Hello... I think.', 'Oh. It\'s you.'],
      weight: 1,
    },
    {
      when: { reputation: { min: 25 }, willingness: { max: 49 } },
      text: ['Hmm. Yes, hello.', 'What do you want?', 'I\'m a bit busy...'],
      weight: 1,
    },
    {
      when: { reputation: { max: -25 } },
      text: ['Why are you here?', 'I have nothing to say to you.', 'Stay back.'],
      weight: 2,
    },
    {
      when: {},
      text: ['Hello.', 'Oh, it\'s you.', 'Yes?'],
    },
  ]);

  // Examine module - detailed description of NPC
  engine.registerModule('npc.examine', [
    {
      when: { stage: { min: 10 }, reputation: { min: 50 } },
      text: 'A truly magnificent woman before you, of such enormous proportions that she\'s become something of a legend. She smiles warmly at you, her vast body radiating warmth and contentment.',
    },
    {
      when: { stage: { min: 8, max: 9 }, reputation: { min: 50 } },
      text: 'An absolutely massive woman, her immense size practically dwarfing everything around her. She greets you with genuine affection, clearly happy to see you.',
    },
    {
      when: { stage: { min: 6, max: 7 }, reputation: { min: 50 } },
      text: 'A wonderfully large woman with curves that speak of years of indulgence and comfort. She beams at you with obvious fondness.',
    },
    {
      when: { stage: { min: 4, max: 5 }, reputation: { min: 50 } },
      text: 'A pleasingly plump woman with a soft, generous figure. She smiles warmly at you.',
    },
    {
      when: { stage: { min: 2, max: 3 }, reputation: { min: 50 } },
      text: 'A curvy woman with a friendly demeanor. She nods politely at you with a smile.',
    },
    {
      when: { stage: { max: 1 }, reputation: { min: 50 } },
      text: 'A slender woman with kind eyes. She smiles warmly at you.',
    },
    {
      when: { stage: { min: 10 } },
      text: 'An absolutely enormous woman, whose size is almost difficult to comprehend. Her massive proportions leave little question as to her love of eating.',
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'An immensely large woman, her prodigious size making her impossible to ignore.',
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'A very large woman with substantial curves.',
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'A noticeably plump woman with a soft, rounded figure.',
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'A somewhat curvy woman with gentle roundness.',
    },
    {
      when: { stage: { max: 1 } },
      text: 'A slender woman.',
    },
  ]);

  // Weight reaction module - how NPC responds to weight gain
  engine.registerModule('npc.weight_reaction', [
    {
      when: { stage: { min: 10 } },
      text: 'She seems almost impossibly larger than before.',
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'She\'s gained an absolutely enormous amount of weight.',
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'She\'s become considerably heavier and rounder.',
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'She\'s gained a noticeable amount of weight.',
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'She seems a bit rounder than before.',
    },
    {
      when: { stage: { max: 1 } },
      text: 'She looks slightly heavier.',
    },
  ]);

  // Eating dialogue - response to being fed
  engine.registerPool('npc.eating_response', [
    {
      when: { willingness: { min: 80 } },
      text: ['Oh, how delicious! Thank you!', 'Mmm, that was wonderful!', 'I do love a good meal...'],
      weight: 3,
    },
    {
      when: { willingness: { min: 60, max: 79 } },
      text: ['That was quite nice.', 'Mmm, not bad at all.', 'Very satisfying, thank you.'],
      weight: 2,
    },
    {
      when: { willingness: { min: 40, max: 59 } },
      text: ['That was... pleasant, I suppose.', 'It was filling, at least.', 'Yes, well, I didn\'t mind it.'],
      weight: 1,
    },
    {
      when: { willingness: { max: 39 } },
      text: ['I suppose it was edible.', 'Do I have to have more?', 'That\'s enough, thank you.'],
      weight: 1,
    },
  ]);

  // Fullness dialogue - when satiated from Rapid Digestion
  engine.registerModule('npc.fullness', [
    {
      when: { fullness: 1 },
      text: 'She pats her belly contentedly and sighs. "I\'m absolutely stuffed... I couldn\'t possibly eat another bite right now."',
    },
    {
      when: { fullness: 0 },
      text: 'She seems ready for her next meal.',
    },
  ]);

  // Hunger dialogue - based on hunger tier
  engine.registerPool('npc.hunger_response', [
    {
      when: { hungerTier: 3 },
      text: ['I\'m absolutely famished!', 'Do you have anything to eat? Please?', 'I could eat... everything.'],
      weight: 3,
    },
    {
      when: { hungerTier: 2 },
      text: ['I\'m quite hungry, actually.', 'Some food would be nice right now.', 'I\'m feeling a bit peckish.'],
      weight: 2,
    },
    {
      when: { hungerTier: 1 },
      text: ['I could use a snack.', 'Maybe something small to eat?', 'A little hungry, nothing major.'],
      weight: 1,
    },
    {
      when: { hungerTier: 0 },
      text: ['I\'m satisfied for now.', 'I\'m not particularly hungry.', 'I just ate, so I\'m fine.'],
      weight: 1,
    },
  ]);

  // Refusal due to fullness (from Rapid Digestion)
  engine.registerModule('npc.fullness_refusal', [
    {
      when: { fullness: 1 },
      text: 'She shakes her head. "I\'m far too full right now. Maybe later..."',
    },
    {
      when: { fullness: 0 },
      text: 'She nods, ready to eat.',
    },
  ]);
}

export default registerNPCModules;
