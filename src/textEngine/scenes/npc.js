/**
 * NPC Scene Modules
 * Fully modular dialogue, examine, and reaction variants.
 * All NPC text routes through these modules — no hardcoded strings in NPC classes.
 */

export function registerNPCModules(engine, lexicon) {

  // ─── GREETING ────────────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.greeting', [
    {
      when: { reputation: { min: 50 }, willingness: { min: 70 } },
      text: [
        'Oh, hello again! I\'ve been hoping to see you.',
        'Welcome back, friend! Always a pleasure.',
        'What a wonderful surprise!',
      ],
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: [
        'Hello there. Come to visit?',
        'Oh, it\'s you. How nice.',
        'Well, this is a pleasant encounter.',
      ],
      weight: 2,
    },
    {
      when: { isRestrained: 1 },
      text: [
        'I... can\'t move. What did you do to me?',
        'Please... I\'m helpless here. What do you want?',
      ],
      weight: 4,
    },
    {
      when: { reputation: { max: -25 } },
      text: [
        'Why are you here?',
        'I have nothing to say to you.',
        'Keep your distance.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: ['Hello.', 'Oh, it\'s you.', 'Yes?'],
    },
  ]);

  // ─── AFTER FEEDING ────────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.after_feeding', [
    {
      when: { willingness: { min: 75 } },
      text: [
        'Mmm... oh my. That was absolutely wonderful.',
        'Oh, how delicious! Thank you so much.',
        'I do love a good meal... thank you, dear.',
      ],
      weight: 3,
    },
    {
      when: { willingness: { min: 50, max: 74 } },
      text: [
        'That was quite nice, I suppose.',
        'Very filling, thank you.',
        'Not bad at all.',
      ],
      weight: 2,
    },
    {
      when: { willingness: { max: 49 } },
      text: [
        'I suppose it was decent.',
        'That\'s... enough, thank you.',
        'I\'d prefer not to have more.',
      ],
      weight: 1,
    },
    {
      when: {},
      text: ['Thank you.', 'That was filling.'],
    },
  ]);

  // ─── OFFER FOOD ───────────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.offer_food', [
    {
      when: { willingness: { min: 70 } },
      text: [
        'Oh, do you have something to eat? I\'d love a bite!',
        'I\'m always ready for a good meal. What do you have?',
        'Hungry? I\'m always hungry. What have you got?',
      ],
      weight: 3,
    },
    {
      when: { willingness: { min: 40, max: 69 } },
      text: [
        'I suppose I could eat something.',
        'Maybe a small bite. What is it?',
        'I\'m not particularly hungry, but... what are you offering?',
      ],
      weight: 2,
    },
    {
      when: { willingness: { max: 39 } },
      text: [
        'I\'m not very hungry, thank you.',
        'I\'d rather not, if it\'s all the same.',
      ],
      weight: 1,
    },
    {
      when: {},
      text: ['What are you offering?', 'Hmm?'],
    },
  ]);

  // ─── TAVERN CHAT ─────────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.tavern_chat', [
    {
      when: { reputation: { min: 50 }, stage: { min: 3 } },
      text: [
        'Business has been wonderful this season! The harvest was so bountiful — I\'ve been enjoying the abundance myself, as you can see!',
        'The tavern\'s been full every night. Plenty of good food and company to go around!',
      ],
      weight: 3,
    },
    {
      when: { reputation: { min: 25 } },
      text: [
        'A fine night for a drink and a meal, don\'t you think?',
        'The regulars have been keeping me busy. Always good for business.',
        'Can\'t complain. The food\'s good and the company\'s decent.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'Things are quiet tonight.',
        'Just another evening at the tavern.',
        'Not much to say. What\'ll you have?',
      ],
    },
  ]);

  // ─── SELLING (merchant) ───────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.selling', [
    {
      when: { reputation: { min: 50 } },
      text: [
        'For you, I\'ll offer my finest wares at a special price. You\'ve been a valued customer.',
        'These goods are of the highest quality. I\'ll give you first pick.',
      ],
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: [
        'These goods are of exceptional quality. Name your price... within reason, of course.',
        'I\'ve recently acquired some very fine merchandise. Interested?',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'Browse my wares. Everything is priced fairly.',
        'I have what you need, if the price is right.',
      ],
    },
  ]);

  // ─── HAGGLING (merchant) ─────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.haggle', [
    {
      when: { reputation: { min: 50 } },
      text: [
        'Your offer is reasonable. For a friend, I can work with that.',
        'You drive a hard bargain, but I respect that. Deal.',
      ],
      weight: 3,
    },
    {
      when: { willingness: { min: 60 } },
      text: [
        'Your offer is... intriguing. Perhaps we can agree, especially if you sweeten the deal with refreshments.',
        'I\'d need something more. What else can you offer?',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'That\'s not enough. Try again.',
        'A merchant has to make a living, you know.',
      ],
    },
  ]);

  // ─── GARDENING (gardener) ────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.gardening', [
    {
      when: { stage: { min: 3 } },
      text: [
        'The plants are growing wonderfully. There\'s something satisfying about watching things flourish and grow, don\'t you think?',
        'Every living thing tends toward abundance, if you give it what it needs.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'The garden is doing well today. Peaceful, isn\'t it?',
        'I find great comfort in tending things that grow.',
        'Nature has a way of providing, if you pay attention.',
      ],
    },
  ]);

  // ─── COOKING (chef) ───────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.cooking', [
    {
      when: { stage: { min: 4 } },
      text: [
        'Cooking is an art form. Every meal is an opportunity to create something magnificent. I\'ve created quite a few lately.',
        'The best chefs are the ones who truly appreciate what they make. Every bite.',
      ],
      weight: 2,
    },
    {
      when: { reputation: { min: 50 } },
      text: [
        'I\'m preparing something extraordinary today. You\'ll want to try it.',
        'A master chef cooks with passion. Would you like to see what I\'m making?',
      ],
      weight: 3,
    },
    {
      when: {},
      text: [
        'Cooking is an art form. Every meal is an opportunity to create something magnificent.',
        'Don\'t rush me — good food takes time.',
        'The kitchen doesn\'t run on schedules. It runs on quality.',
      ],
    },
  ]);

  // ─── FRIENDLY (guard) ────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.friendly', [
    {
      when: { reputation: { min: 50 } },
      text: [
        'You seem trustworthy. The town is safer with honorable folk like yourself around.',
        'At ease. I\'ve got my eye on you, and I like what I see.',
      ],
      weight: 3,
    },
    {
      when: {},
      text: [
        'You\'ve proven yourself reliable. I respect that.',
        'The town needs people like you.',
      ],
    },
  ]);

  // ─── WARNING (guard) ──────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.warning', [
    {
      when: { reputation: { max: -25 } },
      text: [
        'Trouble-making won\'t be tolerated here. Not on my watch.',
        'I\'ve got my eye on you. One wrong move.',
        'Don\'t test me. I\'ve dealt with worse.',
      ],
      weight: 3,
    },
    {
      when: {},
      text: [
        'Mind your conduct here.',
        'Stay in line.',
      ],
    },
  ]);

  // ─── MARKET BANTER ───────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.market_banter', [
    {
      when: { reputation: { min: 40 }, stage: { min: 4 } },
      text: [
        'Stalls are fuller when bellies are. Coin follows appetite — always has.',
        'You look like someone who understands supply and demand. The demand, especially.',
      ],
      weight: 2,
    },
    {
      when: { willingness: { min: 60 } },
      text: [
        'Sample? Of course there\'s a sample. There\'s always a sample if you ask sweetly.',
        'The best customers are the hungry ones. You seem... promising.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'Prices are fair. Quality is better. Hunger makes both feel like bargains.',
        'Market day hums when everyone\'s thinking about their next meal.',
      ],
    },
  ]);

  // ─── TEMPLE SERMON ───────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.temple_sermon', [
    {
      when: { reputation: { min: 50 }, stage: { min: 5 } },
      text: [
        'Abundance is not sin when it is shared. The altar remembers who brought bread to the hungry.',
        'The body is a vessel. Fill it with gratitude, not guilt — though both can be heavy.',
      ],
      weight: 3,
    },
    {
      when: { willingness: { min: 55 } },
      text: [
        'Hunger teaches humility. Satisfaction teaches grace. Both are holy, in their season.',
        'We break bread so no one breaks alone. That is the oldest sermon I know.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'The shrine welcomes all who come in hunger — of body or spirit.',
        'Prayer is quieter after a good meal. The soul settles when the belly does.',
      ],
    },
  ]);

  // ─── NOBLE GOSSIP ────────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.noble_gossip', [
    {
      when: { reputation: { min: 50 }, stage: { min: 4 } },
      text: [
        'The countess hosted three courses last night and ate five. The servants talk — but only to those they trust.',
        'Mirabel\'s corset maker has been summoned twice this month. Draw your own conclusions.',
      ],
      weight: 3,
    },
    {
      when: { reputation: { min: 25 } },
      text: [
        'Between us? The ballroom hasn\'t seen a gala in weeks, but the kitchen hasn\'t slowed.',
        'Nobles pretend at restraint. The servants\' hall tells a different story.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'One does not repeat what one hears above the salt. But one may hint.',
        'The estate thrives on appearances. Appetites are the one thing they cannot quite hide.',
      ],
    },
  ]);

  // ─── HARBOR TALES ────────────────────────────────────────────────────────────

  engine.registerPool('npc.dialogue.harbor_tales', [
    {
      when: { reputation: { min: 40 }, stage: { min: 3 } },
      text: [
        'Sailors swear the tide brings more than fish — rumors, cravings, things that grow fat on long voyages.',
        'Morgan\'s last crew came back heavier than they left. She calls it good provisioning.',
      ],
      weight: 2,
    },
    {
      when: { willingness: { min: 55 } },
      text: [
        'A ship eats cargo. A crew eats everything else. The harbor feeds both.',
        'Salt air sharpens hunger. That\'s why the stalls do such brisk business.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'Every crate that lands has a story. Most of them end at a dinner table.',
        'The docks never sleep hungry for long — too much trade, too much temptation.',
      ],
    },
  ]);

  // ─── EXAMINE ─────────────────────────────────────────────────────────────────
  // Status-aware: restrained/suspended/stuffed variants take priority over weight stage.

  engine.registerModule('npc.examine', [
    // ── Restrained: ceiling suspension ──
    {
      when: { isRestrained: 1, suspensionState: 'ceiling' },
      text: 'She hangs from licorice vines looped around her wrists, feet swinging uselessly in the air. The candy bonds creak under her weight. Her eyes are wide with indignity.',
    },
    {
      when: { isRestrained: 1, suspensionState: 'hybrid', stage: { min: 5 } },
      text: 'Suspended by candy vines, her substantial belly has descended far enough to rest on the ground, forming an odd hybrid support. The vines still hold her wrists overhead but her weight has found its own way down.',
    },
    // ── Restrained: candy snare / bonds ──
    {
      when: { isRestrained: 1, restrainedBy: 'confection_snare' },
      text: 'Candy-rope vines coil around her wrists and ankles, holding her completely immobile. The sweet smell of licorice fills the air around her. Her expression is somewhere between furious and embarrassed.',
    },
    // ── Restrained: magical paralysis ──
    {
      when: { isRestrained: 1, restrainedBy: 'hold_person' },
      text: 'She is completely frozen, locked in place by an invisible magical force. She can breathe — barely — and blink, but nothing else. Her eyes dart around, alive with helpless awareness.',
    },
    // ── Stuffed / Satiated ──
    {
      when: { fullness: 1, stage: { min: 5 } },
      text: 'She sits motionless, her massively distended belly rising and falling slowly. She looks thoroughly, excessively full — the kind of full that doesn\'t go away soon.',
    },
    {
      when: { fullness: 1 },
      text: 'She looks thoroughly satiated, hands resting on her belly, eyes half-lidded. "I couldn\'t eat another bite," is written all over her face.',
    },
    // ── Weight stage + reputation ──
    { when: { stage: { min: 10 }, reputation: { min: 50 } }, text: 'A truly magnificent woman of such enormous proportions she\'s become something of a legend. She smiles warmly at you, her vast body radiating contentment.' },
    { when: { stage: { min: 8, max: 9 }, reputation: { min: 50 } }, text: 'An absolutely massive woman, her immense size dwarfing nearly everything around her. She greets you with genuine affection.' },
    { when: { stage: { min: 6, max: 7 }, reputation: { min: 50 } }, text: 'A wonderfully large woman with curves that speak of years of indulgence. She beams at you with obvious fondness.' },
    { when: { stage: { min: 4, max: 5 }, reputation: { min: 50 } }, text: 'A pleasingly plump woman with a soft, generous figure. She smiles warmly at you.' },
    { when: { stage: { min: 2, max: 3 }, reputation: { min: 50 } }, text: 'A curvy woman with a friendly demeanor. She nods politely with a smile.' },
    { when: { stage: { max: 1 }, reputation: { min: 50 } }, text: 'A slender woman with kind eyes. She smiles warmly at you.' },
    { when: { stage: { min: 10 } }, text: 'An absolutely enormous woman — her massive proportions leave little question as to her love of eating.' },
    { when: { stage: { min: 8, max: 9 } }, text: 'An immensely large woman, her prodigious size making her impossible to ignore.' },
    { when: { stage: { min: 6, max: 7 } }, text: 'A very large woman with substantial curves.' },
    { when: { stage: { min: 4, max: 5 } }, text: 'A noticeably plump woman with a soft, rounded figure.' },
    { when: { stage: { min: 2, max: 3 } }, text: 'A somewhat curvy woman with gentle roundness.' },
    { when: { stage: { max: 1 } }, text: 'A slender woman.' },
  ]);

  // ─── WEIGHT GAIN REACTIONS ────────────────────────────────────────────────────

  engine.registerPool('npc.reaction.weight_gain', [
    {
      when: { lastWeightGain: { min: 100 } },
      text: [
        'She staggers, overwhelmed by the sudden, dramatic change. She stares down at herself in disbelief, barely able to comprehend the transformation.',
        'Her breath catches. She grabs at her sides, finding far more of herself than there was a moment ago. A shudder runs through her.',
      ],
      weight: 3,
    },
    {
      when: { lastWeightGain: { min: 51, max: 99 } },
      text: [
        'She gasps, hands flying to her sides. "I... I\'m so much fuller!" Her face flushes as she takes stock of herself.',
        'She looks down at herself in shock, eyes wide. Her clothes strain at the seams from the sudden change.',
      ],
      weight: 3,
    },
    {
      when: { lastWeightGain: { min: 21, max: 50 } },
      text: [
        '"Whoa—" She pats herself, surprised by the noticeable difference. Her expression is flushed, somewhat overwhelmed.',
        'She blinks, glancing down at herself. The change is unmistakable. She touches her sides tentatively.',
      ],
      weight: 3,
    },
    {
      when: { lastWeightGain: { min: 1, max: 20 } },
      text: [
        'She pats her belly reflexively, feeling slightly fuller than before. A small, surprised smile crosses her face.',
        '"Did I...?" she murmurs quietly, glancing down at herself with mild surprise.',
      ],
      weight: 2,
    },
    {
      when: {},
      text: [
        'She blinks, registering the change.',
        'Something has shifted. She notices.',
      ],
    },
  ]);

  // ─── RESTRAINED REACTIONS ─────────────────────────────────────────────────────

  engine.registerPool('npc.reaction.restrained', [
    {
      when: { restrainedBy: 'hold_person' },
      text: [
        'Her eyes go wide with pure panic. She\'s completely frozen — not a finger, not a toe. The horror of total paralysis is visible in her face.',
        '"I... I can\'t move!" Her eyes dart frantically but the rest of her is stone-still.',
        'She tries to struggle and finds she cannot. Every muscle has simply stopped. The realization crosses her face slowly.',
      ],
      weight: 3,
    },
    {
      when: { restrainedBy: 'confection_snare', suspensionState: 'ceiling' },
      text: [
        '"Let me DOWN!" she cries from above, feet kicking futilely against nothing. The candy vines hold her suspended, wrists overhead, completely helpless.',
        'She hangs there, indignant and powerless. "This is UNDIGNIFIED!" she shouts at no one in particular.',
      ],
      weight: 3,
    },
    {
      when: { restrainedBy: 'confection_snare' },
      text: [
        '"What are these?! Get them off me!" She struggles against the candy bonds, which only tighten in response. The sweet smell seems to mock her.',
        'She yanks against the licorice vines with everything she has. They don\'t budge. "I\'m stuck!" she announces, mortified.',
        '"These are... candy?" she asks in disbelief, staring at the bonds. Then: "I... can\'t get free!"',
      ],
      weight: 3,
    },
    {
      when: {},
      text: [
        'She struggles but cannot free herself.',
        '"Release me!" she demands, to no effect.',
      ],
    },
  ]);

  // ─── FULLNESS MODULE ──────────────────────────────────────────────────────────

  engine.registerModule('npc.fullness', [
    {
      when: { fullness: 1 },
      text: 'She pats her belly and sighs. "I\'m absolutely stuffed... I couldn\'t possibly eat another bite right now."',
    },
    {
      when: { fullness: 0 },
      text: 'She seems ready for her next meal.',
    },
  ]);

  // ─── HUNGER RESPONSE ─────────────────────────────────────────────────────────

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
      text: ['I could use a snack.', 'Maybe something small to eat?'],
      weight: 1,
    },
    {
      when: { hungerTier: 0 },
      text: ['I\'m satisfied for now.', 'I\'m not particularly hungry.'],
      weight: 1,
    },
  ]);

  // ─── EATING RESPONSE ──────────────────────────────────────────────────────────

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
      text: ['That was... pleasant, I suppose.', 'It was filling, at least.'],
      weight: 1,
    },
    {
      when: { willingness: { max: 39 } },
      text: ['I suppose it was edible.', 'That\'s enough, thank you.'],
      weight: 1,
    },
  ]);
}

export default registerNPCModules;
