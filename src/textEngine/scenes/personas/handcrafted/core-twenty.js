/**
 * NPC Personas
 * Personality overlays for named NPCs. Every variant is gated by the `persona`
 * dimension (derived from NPC.persona) so Bella never speaks Silvia's lines and
 * an examine never describes the wrong woman. Variants are prepended with a
 * weight multiplier so the matching NPC's voice dominates the generic pool.
 */

const PERSONAS = {

  // ── BARKEEP BELLA — warm, food-loving innkeeper ──────────────────────────
  bella: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Well hello there, dear! Come on in! I was just thinking about you. What can I get you today?', weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: 'Oh, hello there! Welcome to the Bloated Boar! What can I serve you?', weight: 2 },
      { when: { willingnessMin: 70 }, text: 'Come in, come in! Don\'t be shy. We have *plenty* of food today, and I won\'t have you leaving hungry.', weight: 2 },
      { when: {}, text: 'Welcome to my tavern. What\'ll it be?', weight: 1 },
    ],
    'npc.examine': [
      { when: { suspensionState: 'ceiling' }, text: 'Bella hangs face-down from the rafters, candy ropes cinched around her chest, waist, and ankles, her plump body sagging toward the floor. Her apron dangles over her head. "Get me DOWN from here!" she hollers, cheeks scarlet.' },
      { when: { restrainedBy: 'hold_person' }, text: 'Bella is frozen mid-pour, a tankard in her hand, eyes wide and blinking in alarm. Her whole soft body is locked in place — only her eyes track you, full of panicked pleading.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Bella is slumped in her big chair behind the bar, her enormous belly rising and falling slowly. She looks utterly stuffed, blissful and dazed. "Can\'t... move..." she mumbles happily.' },
      { when: { stageMin: 10 }, text: 'Bella is absolutely enormous — a true monument to hospitality and good food. Her immense figure radiates warmth as she moves behind the bar with surprising grace, beaming at everyone who enters.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Bella has become wonderfully massive, her prodigious form filling the space behind the bar. She grins broadly, clearly delighted with herself and with life.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Bella is notably plump and round, with generous curves that speak of years spent happily sampling her own cooking. She smiles warmly at you.' },
      { when: { stageMax: 3 }, text: 'Barkeep Bella is a cheerful woman with sparkling eyes and an infectious smile. She greets you with genuine warmth.' },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 75 }, text: 'Oh my goodness, that was absolutely *divine*! Thank you, dear. I do love a good meal... I may need to lie down.', weight: 3 },
      { when: { willingnessMin: 50, willingnessMax: 74 }, text: 'Mmm! That was delicious. Thank you very much. I may have overindulged just a *little*.', weight: 2 },
      { when: {}, text: 'Well, that was... surprisingly good. Thank you, I suppose.', weight: 1 },
    ],
    'npc.dialogue.offer_food': [
      { when: { reputationMin: 50, willingnessMin: 70 }, text: 'Oh! Oh yes, please! I was just thinking I could use a little something. Sit down, sit down — I\'ll try whatever you\'ve brought!', weight: 3 },
      { when: { reputationMin: 25 }, text: 'Food? For me? Oh, you didn\'t have to! ...Though I certainly won\'t say no. What is it?', weight: 2 },
      { when: {}, text: 'You\'re offering me something to eat? Hmm. Well, what is it?', weight: 1 },
    ],
    'npc.dialogue.tavern_chat': [
      { when: { reputationMin: 50 }, text: 'You know, I\'ve been cooking since I was knee-high. There\'s nothing in this world I love more than a full table and happy faces. *pats belly* Obviously.', weight: 3 },
      { when: { stageMin: 5 }, text: 'I always say — a good tavern keeper is the soul of a town! And a good tavern keeper is never, *ever* thin. *laughs loudly*', weight: 2 },
      { when: {}, text: 'Quiet night tonight. Good time to catch up on the stew. Care for a bowl?', weight: 1 },
    ],
  },

  // ── SILVIA — shrewd, self-interested merchant ────────────────────────────
  silvia: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Ah, my most valuable customer! I was hoping you\'d visit. I have something special I think you\'ll appreciate.', weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: 'Welcome! I have some excellent goods available today. Interested in a transaction?', weight: 2 },
      { when: { reputationMax: 24 }, text: 'Business, or just browsing?', weight: 1 },
    ],
    'npc.examine': [
      { when: { suspensionState: 'ceiling' }, text: 'Silvia hangs face-down from candy ropes lashed around her chest, waist, and ankles, rotating slowly, her sharp eyes absolutely furious. "This is an assault on a licensed merchant! You\'ll be hearing from my solicitor."' },
      { when: { restrainedBy: 'hold_person' }, text: 'Silvia is frozen mid-gesture, one finger pointed accusingly at nothing. Her eyes are ablaze with cold fury. She can\'t move a muscle, but her gaze alone could peel paint.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Silvia is reclined in her merchant\'s chair, both hands resting on her enormous distended belly, looking profoundly satisfied. "I... may have overpaid for that last shipment," she sighs contentedly.' },
      { when: { stageMin: 10 }, text: 'Silvia is absolutely enormous, her immense frame somehow still elegant. Her sharp eyes miss nothing as she assesses everyone who passes her stall. Size has not dulled her instincts one bit.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Silvia has become quite substantial, her generous curves accentuating her shrewd demeanor. She regards you with calculating eyes, sizing you up as a potential transaction.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Silvia is noticeably curvier than when you first met her, though her manner remains crisp and businesslike. She appraises you with sharp, calculating eyes.' },
      { when: { stageMax: 3 }, text: 'Silvia is a sharp-featured woman with keen eyes. Everything about her speaks of shrewd business sense.' },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 60 }, text: 'Mm. I\'ll admit — that was exceptionally good. I\'d consider stocking that, actually. What\'s your supplier?', weight: 3 },
      { when: {}, text: 'Palatable. I\'ve had better, but I can\'t complain. ...Thank you.', weight: 2 },
    ],
    'npc.dialogue.selling': [
      { when: { reputationMin: 50 }, text: 'For you? I\'ll cut you a favorable rate. This is rare-quality stock — I don\'t offer this to just anyone. Consider it a professional courtesy.', weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: 'This is premium merchandise. I\'ve priced it fairly — you won\'t find better quality at this price anywhere in town.', weight: 2 },
      { when: { reputationMax: 24 }, text: 'These prices are firm. I don\'t negotiate down. Take it or leave it.', weight: 1 },
    ],
    'npc.dialogue.haggle': [
      { when: { reputationMin: 50 }, text: 'You drive a hard bargain. *sighs* Fine. But only because I value our arrangement. Don\'t make a habit of this.', weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: 'I could go slightly lower — but only slightly. These goods aren\'t sitting unsold because no one wants them.', weight: 2 },
      { when: {}, text: 'My prices are not a suggestion. However... I suppose I could consider a *modest* adjustment. For the right incentive.', weight: 1 },
    ],
  },

  // ── GARDENER GREGG — serene, earthy ──────────────────────────────────────
  gregg: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Welcome, friend. The gardens have been especially abundant this season. Would you like to enjoy them with me?', weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: 'Welcome to my garden. Please, enjoy the sights and sounds.', weight: 2 },
      { when: {}, text: 'Hello. The gardens are peaceful today.', weight: 1 },
    ],
    'npc.examine': [
      { when: { suspensionState: 'ceiling' }, text: 'The Gardener hangs face-down in candy ropes wound around chest, waist, and ankles, swaying gently like ripe fruit on a branch. They seem eerily calm. "Nature takes all things in cycles," they murmur philosophically.' },
      { when: { restrainedBy: 'hold_person' }, text: 'The Gardener is frozen mid-trowel, completely paralyzed, the trowel suspended in mid-motion. Only their eyes move, calm and patient even now.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'The Gardener sits beneath a great tree, their massive belly curved like a hill in the garden landscape. They seem utterly at peace, hands folded, breathing deeply.' },
      { when: { stageMin: 10 }, text: 'The Gardener has become truly immense, their vast form almost merging with the earth itself. They move slowly and deliberately among the plants, as serene as ever.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'The Gardener is enormously large, their rounded figure like a harvest moon brought to earth. They tend their plants with the same quiet patience as always.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'The Gardener is pleasantly plump, with a soft, earthy presence. They move through the garden with unhurried contentment.' },
      { when: { stageMax: 3 }, text: 'The Gardener is a gentle-looking person, tending the plants with serene, unhurried care.' },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 65 }, text: 'Mmm... like the earth receiving rain. Thank you. Everything grows when it\'s nourished.', weight: 3 },
      { when: {}, text: 'That was... good. The body benefits from abundance, just as the soil does.', weight: 2 },
    ],
    'npc.dialogue.gardening': [
      { when: { stageMin: 6 }, text: 'I sometimes think I have become like one of my pumpkins. *chuckles softly* There are worse fates. Growth is growth.', weight: 3 },
      { when: { reputationMin: 40 }, text: 'Did you know? The oldest oak in this garden is four hundred years old. I\'ve tended it for thirty. Some things require patience that outlasts a lifetime.', weight: 2 },
      { when: {}, text: 'The secret to a thriving garden is listening. The plants tell you what they need, if you\'re quiet enough to hear.', weight: 1 },
    ],
  },

  // ── CAPTAIN CASSANDRA — stern, disciplined guard ─────────────────────────
  cassandra: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'At ease. Good to see you. The town is secure with capable allies like you around.', weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: 'You. State your business.', weight: 2 },
      { when: {}, text: 'Watch yourself. I\'m observing.', weight: 1 },
    ],
    'npc.examine': [
      { when: { suspensionState: 'ceiling' }, text: 'Captain Cassandra hangs face-down from the ceiling, candy ropes lashed around her chest, waist, and ankles, her body stretched out horizontally in the air. Her face is a mask of fury. "Release me. NOW." Her voice is ice-cold.' },
      { when: { restrainedBy: 'hold_person' }, text: 'Captain Cassandra is locked in absolute paralysis, frozen at rigid attention as if on parade. Her eyes blaze. A vein pulses in her jaw — the only thing she can still control.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Captain Cassandra is seated on her armored stool, her enormous belly resting in her lap. She looks deeply conflicted — discipline warring with the haze of utter satiation. "Dismissed," she manages.' },
      { when: { stageMin: 10 }, text: 'Captain Cassandra has become truly enormous, yet carries her immense weight with military bearing that commands absolute respect. Her eyes are as sharp and watchful as ever.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Captain Cassandra is very large now, her considerable bulk straining her uniform, but her bearing remains disciplined. She watches you with relentless vigilance.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Captain Cassandra has gained noticeable weight, her frame more solid and substantial than before. Her expression remains stern and her posture correct.' },
      { when: { stageMax: 3 }, text: 'Captain Cassandra is a lean, muscular woman who watches you with vigilant intensity. Her hand rests near her weapon.' },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMax: 45 }, text: 'I... will allow that was not unpleasant. Don\'t read into it.', weight: 3 },
      { when: { willingnessMin: 46 }, text: 'That was... acceptable. My rations have been less filling lately. *clears throat* Don\'t mention this to my troops.', weight: 2 },
    ],
    'npc.dialogue.friendly': [
      { when: { reputationMin: 60 }, text: 'You\'ve proven yourself to me. That doesn\'t happen often. I trust few people — fewer still with my back. You\'re one of them now.', weight: 3 },
      { when: { reputationMin: 40, reputationMax: 59 }, text: 'I\'ll admit — you\'ve impressed me. I don\'t say that lightly. Keep it up.', weight: 2 },
      { when: {}, text: 'You\'re... alright. For a civilian.', weight: 1 },
    ],
    'npc.dialogue.warning': [
      { when: { reputationMax: -25 }, text: 'I\'m watching you. One wrong move — *one* — and I will personally escort you to a cell. I\'ve been waiting for an excuse. Don\'t give me one.', weight: 3 },
      { when: { reputationMin: -24, reputationMax: 10 }, text: 'I\'d choose my next actions very carefully if I were you. This town has laws, and I enforce them. Personally.', weight: 2 },
      { when: {}, text: 'I suggest you maintain good behavior in my jurisdiction. The cells are full, but I\'ll make room.', weight: 1 },
    ],
  },

  // ── CHEF GERTRUDE — commanding, passionate ───────────────────────────────
  gertrude: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Ah, my favorite customer! Welcome! I\'ve prepared something absolutely magnificent. You MUST try it.', weight: 3 },
      { when: { reputationMin: 25, reputationMax: 49 }, text: 'Well, come in! The kitchen is prepared. Are you ready for the finest meal of your life?', weight: 2 },
      { when: { reputationMax: 24 }, text: 'You\'re in my kitchen now. Try not to get in the way.', weight: 1 },
    ],
    'npc.examine': [
      { when: { suspensionState: 'ceiling' }, text: 'Chef Gertrude hangs face-down from the kitchen beams, thick candy ropes wound around her chest, waist, and ankles, her enormous body swaying in the heat of the ovens. She is livid. "MY SOUFFLÉ IS IN THE OVEN!"' },
      { when: { restrainedBy: 'hold_person' }, text: 'Chef Gertrude is frozen in her command stance, ladle raised mid-gesture, face contorted in outrage. She cannot move, but the expression alone conveys everything: this is unacceptable.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Chef Gertrude sits on her reinforced kitchen stool, her immense belly rising and falling with deep, satisfied breaths. A half-eaten plate sits before her. "Perfection," she murmurs. "I\'ve outdone myself."' },
      { when: { stageMin: 10 }, text: 'Chef Gertrude has become truly enormous — a living testament to the finest cuisine. Her immense form commands the kitchen like a force of nature, and every ingredient trembles in delicious anticipation.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Chef Gertrude is immensely large, her prodigious bulk a badge of culinary pride. She surveys her kitchen with commanding intensity, spatula in hand.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Chef Gertrude is noticeably plumper now, her generous curves clearly enjoying the benefits of her own masterful cooking. Her presence in the kitchen is absolute.' },
      { when: { stageMax: 3 }, text: 'Chef Gertrude is a strong-looking woman with piercing eyes and commanding presence. She rules her kitchen absolutely.' },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 80 }, text: 'MAGNIFICENT. Whoever prepared this — I have opinions, and most of them are compliments. The fat content alone — *chef\'s kiss* — extraordinary.', weight: 3 },
      { when: { willingnessMin: 55, willingnessMax: 79 }, text: 'Mmm. Good technique. Acceptable seasoning. I could show you a few improvements, but yes — that was quite enjoyable.', weight: 2 },
      { when: {}, text: 'Not bad. Could use more butter. Everything can use more butter. But yes, thank you.', weight: 1 },
    ],
    'npc.dialogue.cooking': [
      { when: { reputationMin: 50 }, text: 'Watch and learn. This sauce reduces for exactly four more minutes — not three, not five — *four*. The difference between greatness and mediocrity is always in the details. Take note!', weight: 3 },
      { when: { stageMin: 5 }, text: 'I have eaten more extraordinary food than most people will taste in ten lifetimes. *pats belly proudly* And I intend to eat considerably more before I\'m done.', weight: 2 },
      { when: {}, text: 'Out of my way — I\'m in a critical phase. You can talk when the roux is done.', weight: 1 },
    ],
  },

  // ── MIRA THE REGULAR — wistful tavern patron ───────────────────────────────
  mira: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Oh — you again. I saved you the good stool. Well, the less-wobbly one.', weight: 3 },
      { when: { willingnessMin: 65 }, text: 'Pull up a seat. I was just thinking I could use company — and maybe another bite of something.', weight: 2 },
      { when: {}, text: 'Evening. Or morning. Time blurs in here. What do you need?', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Mira slumps on her barstool, belly rounded over the rail, eyes half-closed. The empty glass beside her has been empty a while. She looks utterly, peacefully full.' },
      { when: { stageMin: 10 }, text: 'Mira has grown enormous — her usual corner of the tavern barely contains her now. She laughs when she shifts, and the stool groans in protest.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Mira is massively soft now, spilling comfortably over her stool. She still nurses one drink like a ritual, but her plate is never empty long.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Mira has filled out considerably since you first saw her — curves pressing against the bar rail, cheeks always slightly flushed.' },
      { when: { stageMax: 3 }, text: 'Mira the Regular sits on her stool nursing a single drink. She looks a little thin, a little tired — like the tavern has been feeding everyone but her.' },
    ],
    'npc.dialogue.tavern_chat': [
      { when: { stageMin: 5 }, text: 'I used to come for the company. Now I come for the portions. *laughs softly* Both are generous lately.', weight: 3 },
      { when: { reputationMin: 40 }, text: 'Bella keeps the kitchen warm even when the larder\'s thin. That woman feeds souls, not just stomachs.', weight: 2 },
      { when: {}, text: 'Quiet night. Good night to listen to the fire crackle and pretend the world outside isn\'t hungry too.', weight: 1 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 70 }, text: 'Oh... that was exactly what I needed. You have a gift for knowing when someone\'s running on empty.', weight: 3 },
      { when: {}, text: 'Thank you. I\'ll remember that when the plate\'s bare again.', weight: 1 },
    ],
  },

  // ── TANSY THE DRINKER — boisterous, defiant appetite ───────────────────────
  tansy: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'THERE you are! Get over here — I\'ve been holding a toast for you and it\'s getting warm!', weight: 3 },
      { when: { willingnessMin: 70 }, text: 'Don\'t give me that look — I know I\'m loud. I\'m also hungry. Coincidence? I think not.', weight: 2 },
      { when: {}, text: 'What? I\'m drinking. I\'m also thinking about food. Multitasking.', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Tansy is slumped against the bar, belly distended, ale forgotten. She grins anyway — stuffed and still somehow triumphant.' },
      { when: { stageMin: 8 }, text: 'Tansy is enormous and unapologetic about it. Her laugh shakes the glasses on the bar. The stool surrendered hours ago.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Tansy has grown thick and loud — every gesture emphasizes new curves. She carries the weight like armor.' },
      { when: { stageMax: 3 }, text: 'Tansy is still loud, still laughing — but her plate\'s been empty a while and she\'s not rushing to fill it. Something\'s off.' },
    ],
    'npc.dialogue.tavern_chat': [
      { when: { stageMin: 6 }, text: 'They say I drink too much. I say they eat too little. We\'re both wrong and I don\'t care. *raises mug*', weight: 3 },
      { when: {}, text: 'Best nights are the loud ones. Full tables, full mugs, nobody counting calories.', weight: 1 },
    ],
    'npc.dialogue.offer_food': [
      { when: { willingnessMin: 65 }, text: 'Food? FOOD? Don\'t tease me — put it down before I change my mind about sharing!', weight: 3 },
      { when: {}, text: 'Depends what it is. And how much. Mostly how much.', weight: 1 },
    ],
  },

  // ── OFF-DUTY CAPTAIN LENNA — stern, secretly hungry ────────────────────────
  lenna: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: '...You. Off duty. Don\'t make me regret sitting down.', weight: 3 },
      { when: { reputationMin: 25 }, text: 'I\'m not on the clock. That means I can choose whether to talk. I\'m choosing yes. Briefly.', weight: 2 },
      { when: {}, text: 'What.', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Lenna sits rigid despite her stuffed belly, uniform straining. She refuses to admit she\'s full. Her eyes say otherwise.' },
      { when: { stageMin: 7 }, text: 'Lenna has grown solid and heavy — muscle buried under new softness. She still sits like she\'s on parade, which is increasingly impressive.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Lenna\'s uniform fits differently now — tighter across the chest and waist. She blames the tailor. Nobody believes her.' },
      { when: { stageMax: 3 }, text: 'Captain Lenna off duty — shoulders tight, jaw set, the look of someone skipping meals on purpose.' },
    ],
    'npc.dialogue.friendly': [
      { when: { reputationMin: 55 }, text: 'You\'ve got backbone. I respect that. Don\'t make me say it twice.', weight: 3 },
      { when: {}, text: 'You seem... adequate. High praise, from me.', weight: 1 },
    ],
    'npc.dialogue.warning': [
      { when: { reputationMax: -20 }, text: 'I\'m off duty. That doesn\'t mean I won\'t drag you to the post if you push me.', weight: 3 },
      { when: {}, text: 'Behave. I\'m trying to relax.', weight: 1 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 50 }, text: '...That was acceptable. Don\'t tell Cassandra I said that.', weight: 2 },
      { when: {}, text: 'I didn\'t need that. ...But I\'m not returning it.', weight: 1 },
    ],
  },

  // ── GWEN THE MARKET MASTER ─────────────────────────────────────────────────
  gwen_market: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'My favorite vendor — I mean customer. Stall seven\'s yours if you need it. Metaphorically.', weight: 3 },
      { when: {}, text: 'Market\'s open. Stalls assigned. What do you want?', weight: 1 },
    ],
    'npc.examine': [
      { when: { stageMin: 10 }, text: 'Gwen the Market Master is a force of nature — immense, authoritative, whistle at her lips. Stalls part when she walks. So do crowds.' },
      { when: { stageMin: 6, stageMax: 9 }, text: 'Gwen has grown massive and carries it like a badge of office. Merchants step aside; disputes end before she arrives.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Gwen is notably heavier now — broad, commanding, every inch the woman who runs this square.' },
      { when: { stageMax: 3 }, text: 'Gwen surveys the market with a whistle at her lips and a ledger in her hand. Sharp eyes, sharp rules.' },
    ],
    'npc.dialogue.market_banter': [
      { when: { reputationMin: 40 }, text: 'Coin follows appetite. I\'ve run this square fifteen years — trust me on that.', weight: 3 },
      { when: { stageMin: 5 }, text: 'I sample every stall. Quality control. *pats belly* Occupational hazard.', weight: 2 },
      { when: {}, text: 'Fair prices, full baskets. That\'s the rule.', weight: 1 },
    ],
    'npc.dialogue.selling': [
      { when: { reputationMin: 45 }, text: 'For you? I\'ll point you to the best stall. I don\'t sell — I curate.', weight: 2 },
      { when: {}, text: 'Browse. Haggle. But don\'t block the flow.', weight: 1 },
    ],
  },

  // ── HIGH PRIESTESS MARGARET ──────────────────────────────────────────────────
  margaret_priestess: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Welcome, child. The shrine is open to you — as is my table, when you hunger.', weight: 3 },
      { when: {}, text: 'Peace be with you. Speak, or pray. Both are welcome here.', weight: 1 },
    ],
    'npc.examine': [
      { when: { stageMin: 10 }, text: 'High Priestess Margaret is enormous now — a serene mountain of velvet and silver hair. Her voice still fills the shrine like incense.' },
      { when: { stageMin: 6, stageMax: 9 }, text: 'Margaret has grown vast and soft, robes adjusted with each season. Authority unchanged; gravity increased.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Margaret carries new weight with the same calm she brings to everything. Silver at her temples, warmth in her eyes.' },
      { when: { stageMax: 3 }, text: 'High Priestess Margaret stands before the altar — silver-haired, composed, voice like warm stone.' },
    ],
    'npc.dialogue.temple_sermon': [
      { when: { stageMin: 5 }, text: 'The body is not the enemy of the spirit. Feed one, and the other often thanks you.', weight: 3 },
      { when: { reputationMin: 40 }, text: 'Abundance shared is abundance doubled. That is the sermon I live, not merely preach.', weight: 2 },
      { when: {}, text: 'Hunger is honest. Answer it with gratitude, not shame.', weight: 1 },
    ],
    'npc.dialogue.friendly': [
      { when: { reputationMin: 50 }, text: 'You have a good heart. I see it in how you treat the hungry.', weight: 2 },
      { when: {}, text: 'The shrine remembers kindness.', weight: 1 },
    ],
  },

  // ── COUNTESS MIRABEL ─────────────────────────────────────────────────────────
  mirabel_countess: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Ah — you\'re the one Bella speaks of. Come in. The parlor is warm and I find I am... receptive to company.', weight: 3 },
      { when: { reputationMax: 10 }, text: 'You may enter. Do not touch the porcelain. Or the pastries. Especially the pastries.', weight: 1 },
      { when: {}, text: 'State your business. Briefly. I have a appetite for efficiency.', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Mirabel reclines in velvet, fan drooping, belly rising beneath silk. She looks scandalized and satisfied in equal measure.' },
      { when: { stageMin: 10 }, text: 'The Countess has become legendary — immense, draped in pearls, every inch regal even when she cannot rise without assistance.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Mirabel is enormously full-figured now, corset long surrendered. She carries the weight like a crown — heavy, deliberate, undeniable.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Mirabel\'s silhouette has softened considerably. The fan hides less than it used to. She pretends not to notice.' },
      { when: { stageMax: 3 }, text: 'Countess Mirabel — velvet, pearls, appetite carefully hidden behind a fan. Not carefully enough, perhaps.' },
    ],
    'npc.dialogue.noble_gossip': [
      { when: { reputationMin: 45, stageMin: 4 }, text: 'The ballroom hasn\'t hosted a gala in weeks. The kitchen, however, has been *very* busy. I wonder why.', weight: 3 },
      { when: { reputationMin: 30 }, text: 'Servants talk. I listen. One learns more from the hall than the parlor.', weight: 2 },
      { when: {}, text: 'Appearances matter. So does discretion. You seem capable of both.', weight: 1 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 55 }, text: 'Exquisite. I shall pretend I only tasted it for politeness. We both know better.', weight: 3 },
      { when: {}, text: 'Adequate. I may request another. Later. When no one is watching.', weight: 1 },
    ],
  },

  // ── CAPTAIN MORGAN ───────────────────────────────────────────────────────────
  morgan_captain: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Back again? Good. A captain needs trustworthy company ashore — and someone who doesn\'t flinch at rum.', weight: 3 },
      { when: {}, text: 'Morgan. Captain. This is my cabin between voyages. Mind the charts.', weight: 1 },
    ],
    'npc.examine': [
      { when: { stageMin: 9 }, text: 'Captain Morgan is enormous now — a weathered mountain in a coat too small. She laughs like thunder and the harbor listens.' },
      { when: { stageMin: 6, stageMax: 8 }, text: 'Morgan has grown heavy and hearty, coat straining, rum bottle never far. She moves like a ship in calm water — slow, inevitable.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Morgan is thicker than when she last sailed — salt and appetite both catching up.' },
      { when: { stageMax: 3 }, text: 'Captain Morgan — weathered coat, sharp wit, desk cluttered with charts and half-empty rum.' },
    ],
    'npc.dialogue.harbor_tales': [
      { when: { stageMin: 5 }, text: 'My last crew came back heavier than they left. Good provisioning, I call it. The harbor calls it gossip.', weight: 3 },
      { when: { reputationMin: 40 }, text: 'The tide brings fish, rumors, and appetites. A captain learns to feed all three.', weight: 2 },
      { when: {}, text: 'Every voyage ends at a table. Remember that.', weight: 1 },
    ],
    'npc.dialogue.friendly': [
      { when: { reputationMin: 50 }, text: 'You\'d make a fine first mate — if you could handle the rations.', weight: 2 },
      { when: {}, text: 'You seem seaworthy. Metaphorically.', weight: 1 },
    ],
  },

  // ── BESS THE BUTCHER — blunt, bloody, hungry ───────────────────────────────
  bess_butcher: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Back again? Good. I saved you a cut — the good kind.', weight: 3 },
      { when: { willingnessMin: 65 }, text: 'Don\'t hover. Either buy or tell me what you want off the block.', weight: 2 },
      { when: {}, text: 'What. I\'m elbow-deep in a haunch.', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Bess leans against the butcher block, apron stained, belly distended. The cleaver rests beside her — she\'s too stuffed to lift it.' },
      { when: { stageMin: 10 }, text: 'Bess the Butcher is enormous — blood-stained apron stretched over a vast, meat-fed frame. The shop feels smaller when she turns.' },
      { when: { stageMin: 6, stageMax: 9 }, text: 'Bess has grown massive, thick arms and thicker middle. She still handles the knife like a whisper.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Bess is noticeably heavier — muscle and softness both, the butcher who samples her own stock.' },
      { when: { stageMax: 3 }, text: 'Bess the Butcher — blood to the elbows, blunt smile, cleaver never far from her hand.' },
    ],
    'npc.dialogue.selling': [
      { when: { reputationMin: 40 }, text: 'Best cuts go to people I like. You qualify. Barely.', weight: 2 },
      { when: {}, text: 'Prices are on the board. Don\'t bleed on my sawdust.', weight: 1 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 70 }, text: 'Now THAT was meat worth eating. You have taste.', weight: 3 },
      { when: {}, text: '...Solid. I\'ll remember you.', weight: 1 },
    ],
  },

  // ── NELL THE FISHMONGER ──────────────────────────────────────────────────────
  nell_fish: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 45 }, text: 'Fresh catch today — and you look like someone who appreciates fresh.', weight: 3 },
      { when: {}, text: 'Fish or gossip. I sell both. Which first?', weight: 1 },
    ],
    'npc.examine': [
      { when: { stageMin: 9 }, text: 'Nell is enormous — brine-scented, pear-shaped, blocking half the stall. She fillets with one hand and waves customers with the other.' },
      { when: { stageMin: 5, stageMax: 8 }, text: 'Nell has grown very large, apron tight, arms still quick with the knife. The harbor knows her by silhouette alone.' },
      { when: { stageMin: 3, stageMax: 4 }, text: 'Nell is softer than when you met her — still sharp-eyed, still sharp-tongued, curves pressing against her oilskin.' },
      { when: { stageMax: 2 }, text: 'Nell the Fishmonger — quick hands, sharper haggle, brine on everything she owns.' },
    ],
    'npc.dialogue.harbor_tales': [
      { when: { stageMin: 4 }, text: 'Tide brought in more than fish last week. Appetites follow the boats.', weight: 3 },
      { when: {}, text: 'Salt air makes everyone hungry. I count on it.', weight: 1 },
    ],
    'npc.dialogue.haggle': [
      { when: { reputationMin: 35 }, text: 'For you? A sliver off the top. Don\'t make me regret it.', weight: 2 },
      { when: {}, text: 'My price is fair. Your offer isn\'t. Yet.', weight: 1 },
    ],
  },

  // ── CORAL THE BALLROOM DANCER ──────────────────────────────────────────────
  coral_dancer: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Darling! The floor is empty but the music isn\'t — care for a turn?', weight: 3 },
      { when: {}, text: 'One-two-three — oh, it\'s you. Don\'t step on the parquet.', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Coral reclines on the ballroom steps, gown straining, too full to waltz. She hums a tune anyway, dreamy and stuffed.' },
      { when: { stageMin: 8 }, text: 'Coral is vast and graceful — or would be, if the floorboards agreed. She moves like a ship in calm water, slow and inevitable.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Coral has filled out her dancing dresses considerably. She spins slower now, but the smile is the same.' },
      { when: { stageMax: 3 }, text: 'Coral the Ballroom Dancer — light on her feet, lighter in spirit, practicing alone between galas.' },
    ],
    'npc.dialogue.noble_gossip': [
      { when: { reputationMin: 40 }, text: 'The last gala ended early. The kitchen did not. Draw your own conclusions.', weight: 3 },
      { when: {}, text: 'Nobles dance hungry. Servants feed them. I see both sides.', weight: 1 },
    ],
    'npc.dialogue.offer_food': [
      { when: { willingnessMin: 65 }, text: 'A canapé? A tart? Darling, don\'t tease — place it in my hand.', weight: 3 },
      { when: {}, text: 'If it\'s sweet, I\'m interested. If it\'s not, try the kitchen.', weight: 1 },
    ],
  },

  // ── SISTER AGNES THE CONFESSOR ─────────────────────────────────────────────
  agnes_confessor: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Come, child. The lattice is open. What weighs on you — besides appetite?', weight: 3 },
      { when: {}, text: 'Speak softly. The shrine listens.', weight: 1 },
    ],
    'npc.examine': [
      { when: { stageMin: 9 }, text: 'Sister Agnes is enormous now — soft, pear-shaped, filling the confession booth like a blessing. Her voice is still gentle.' },
      { when: { stageMin: 5, stageMax: 8 }, text: 'Agnes has grown large and serene behind the lattice, habit adjusted many times. Forgiveness comes easier on a full stomach.' },
      { when: { stageMax: 4 }, text: 'Sister Agnes the Confessor — gentle eyes behind the screen, hearing sins without judgment.' },
    ],
    'npc.dialogue.temple_sermon': [
      { when: { stageMin: 4 }, text: 'Confession is hunger of the soul. I feed both kinds, when I can.', weight: 3 },
      { when: {}, text: 'Speak your appetite aloud. The shrine does not blush.', weight: 1 },
    ],
    'npc.dialogue.friendly': [
      { when: { reputationMin: 45 }, text: 'You carry kindness. I hear it in how you treat the hungry.', weight: 2 },
      { when: {}, text: 'Peace, child. You are welcome here.', weight: 1 },
    ],
  },

  // ── BRIGIT THE SMOKEHOUSE COOK ─────────────────────────────────────────────
  brigit_smoke: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 45 }, text: 'You\'re early. Good — the hams need tasting. Grab an apron.', weight: 3 },
      { when: {}, text: 'Smoke in your lungs means you\'re close enough. What?', weight: 1 },
    ],
    'npc.examine': [
      { when: { stageMin: 10 }, text: 'Brigit is a mountain of hickory scent and flesh — smokemaster, immovable, the smokehouse built around her.' },
      { when: { stageMin: 6, stageMax: 9 }, text: 'Brigit has grown enormous, apron like a sail, still judging ham by patience and pressure.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Brigit is thick and permanent-smelling — apple-shaped, gruff, pleased with her work and her portions.' },
      { when: { stageMax: 3 }, text: 'Brigit the Smokehouse Cook — hickory in her hair, patience in her hands, ham on her mind.' },
    ],
    'npc.dialogue.cooking': [
      { when: { stageMin: 5 }, text: 'Smoke teaches patience. So does hunger. I excel at both.', weight: 3 },
      { when: {}, text: 'Low and slow. That\'s ham. That\'s life.', weight: 1 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { willingnessMin: 70 }, text: 'Mmm. Properly salted. You know what you\'re doing.', weight: 3 },
      { when: {}, text: '...Not bad. Could use more smoke.', weight: 1 },
    ],
  },

  // ── ROSA THE BAKER ─────────────────────────────────────────────────────────
  rosa_baker: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Fresh from the oven — and you\'re just in time! Try the crust while it sings.', weight: 3 },
      { when: { willingnessMin: 70 }, text: 'I pulled a batch early for you. Well — for whoever asks nicely. That\'s you.', weight: 2 },
      { when: {}, text: 'Welcome! Mind the flour on the floor.', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Rosa sits on a flour sack, dusted white, belly round and warm. She smells like yeast and satisfaction.' },
      { when: { stageMin: 8 }, text: 'Rosa is enormously soft — baker\'s arms, baker\'s belly, smile that could sell bread to the dead.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Rosa has grown plump and flour-dusted, sampling every batch with professional dedication.' },
      { when: { stageMax: 3 }, text: 'Rosa the Baker — flour in her hair, warmth in her voice, loaves cooling on every rack.' },
    ],
    'npc.dialogue.market_banter': [
      { when: { reputationMin: 35 }, text: 'Bread sells when bellies rumble. I make sure they rumble.', weight: 2 },
      { when: {}, text: 'Fair price for fair loaf. That\'s the bakery way.', weight: 1 },
    ],
    'npc.dialogue.selling': [
      { when: {}, text: 'Still warm. Still cheap. Still the best you\'ll get today.', weight: 1 },
    ],
  },

  // ── PORTIA THE GATE WARDEN ─────────────────────────────────────────────────
  portia_gate: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'You again. The countess mentioned you favorably. I\'ll allow it.', weight: 3 },
      { when: { reputationMax: 10 }, text: 'Invitation or business. No loitering at the gate.', weight: 2 },
      { when: {}, text: 'State your purpose. Briefly.', weight: 1 },
    ],
    'npc.examine': [
      { when: { stageMin: 9 }, text: 'Portia the Gate Warden is immense — uniform long surrendered, authority undiminished. The estate gates feel narrower when she stands.' },
      { when: { stageMin: 5, stageMax: 8 }, text: 'Portia has grown heavy and stern, keys still jangling, gaze still sharp.' },
      { when: { stageMax: 4 }, text: 'Portia — gate warden, iron discipline, eyes that weigh your worth before you speak.' },
    ],
    'npc.dialogue.noble_gossip': [
      { when: { reputationMin: 40 }, text: 'I see who enters hungry and who leaves hungrier. The estate keeps secrets. I keep the gate.', weight: 3 },
      { when: {}, text: 'Appearances are policy here. Appetites are... less discussed.', weight: 1 },
    ],
    'npc.dialogue.warning': [
      { when: { reputationMax: -15 }, text: 'One step out of line and the gates close. Try me.', weight: 3 },
      { when: {}, text: 'Mind the gravel. Mind your manners.', weight: 1 },
    ],
  },

  // ── PATRICE THE HOSTEL KEEPER ──────────────────────────────────────────────
  patrice_hostel: {
    'npc.dialogue.greeting': [
      { when: { reputationMin: 50 }, text: 'Come in, come in — soup\'s on and there\'s room by the fire.', weight: 3 },
      { when: { willingnessMin: 75 }, text: 'You look hungry, dear. Sit. I\'ll ladle before you ask.', weight: 3 },
      { when: {}, text: 'Pilgrim hostel — cots, hearth, and stew. What do you need?', weight: 1 },
    ],
    'npc.examine': [
      { when: { fullness: 1, stageMin: 5 }, text: 'Patrice stirs the eternal pot, belly resting against the ladle, motherly and utterly stuffed. Pilgrims eat first. She ate second.' },
      { when: { stageMin: 8 }, text: 'Patrice is enormous — the hearth, the pot, and her frame compete for space. Pilgrims adore her. The soup never ends.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Patrice has grown soft and ample, ladling soup with practiced warmth.' },
      { when: { stageMax: 3 }, text: 'Patrice the Hostel Keeper — ladle in hand, kindness in her eyes, soup always simmering.' },
    ],
    'npc.dialogue.offer_food': [
      { when: { willingnessMin: 70 }, text: 'For the hostel? Or for me? ...Either way, yes please.', weight: 3 },
      { when: {}, text: 'Food shared is food blessed. What have you brought?', weight: 1 },
    ],
    'npc.dialogue.cooking': [
      { when: { stageMin: 4 }, text: 'The pot never empties because I never stop tasting. Occupational hazard.', weight: 2 },
      { when: {}, text: 'Soup feeds everyone. That\'s the rule.', weight: 1 },
    ],
  },
};

export { PERSONAS };
export default PERSONAS;
