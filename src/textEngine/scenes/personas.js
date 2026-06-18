/**
 * NPC Personas
 * Personality overlays for named NPCs using weighted variant registration
 */

export function registerNPCPersonas(engine) {

  // ─────────────────────────────────────────────
  // BARKEEP BELLA — Innkeeper
  // Friendly, warm, loves feeding people, samples her own cooking
  // ─────────────────────────────────────────────

  engine.registerModuleVariants('npc.dialogue.greeting', [
    {
      when: { reputation: { min: 50 } },
      text: 'Well hello there, dear! Come on in! I was just thinking about you. What can I get you today?',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Oh, hello there! Welcome to the Bloated Boar! What can I serve you?',
      weight: 2,
    },
    {
      when: { willingness: { min: 70 } },
      text: 'Come in, come in! Don\'t be shy. We have *plenty* of food today, and I won\'t have you leaving hungry.',
      weight: 2,
    },
    {
      when: {},
      text: 'Welcome to my tavern. What\'ll it be?',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.examine', [
    {
      when: { isRestrained: 1, suspensionState: 'ceiling' },
      text: 'Bella hangs from the rafters by candy vines looped around her wrists, her plump feet swinging helplessly above the tavern floor. Her apron is askew. "Get me DOWN from here!" she hollers, cheeks flushed red.',
    },
    {
      when: { isRestrained: 1, restrainedBy: 'hold_person' },
      text: 'Bella is completely frozen mid-pour, a tankard in her hand, eyes wide and blinking in alarm. Her whole body is locked in place—only her eyes track you, filled with panicked pleading.',
    },
    {
      when: { fullness: 1, stage: { min: 5 } },
      text: 'Bella is slumped in her big chair behind the bar, her enormous belly rising and falling slowly. She looks utterly stuffed, blissful and dazed. "Can\'t... move..." she mumbles happily.',
    },
    {
      when: { stage: { min: 10 } },
      text: 'Bella is absolutely enormous—a true monument to hospitality and good food. Her immense figure radiates warmth as she moves behind the bar with surprising grace, beaming at everyone who enters.',
    },
    {
      when: { stage: { min: 7, max: 9 } },
      text: 'Bella has become wonderfully massive, her prodigious form filling the space behind the bar. She grins broadly, clearly delighted with herself and with life.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'Bella is notably plump and round, with generous curves that speak of years spent happily sampling her own cooking. She smiles warmly at you.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'Barkeep Bella is a cheerful woman with sparkling eyes and an infectious smile. She greets you with genuine warmth.',
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.after_feeding', [
    {
      when: { willingness: { min: 75 } },
      text: 'Oh my goodness, that was absolutely *divine*! Thank you, dear. I do love a good meal... I may need to lie down.',
      weight: 3,
    },
    {
      when: { willingness: { min: 50, max: 74 } },
      text: 'Mmm! That was delicious. Thank you very much. I may have overindulged just a *little*.',
      weight: 2,
    },
    {
      when: {},
      text: 'Well, that was... surprisingly good. Thank you, I suppose.',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.offer_food', [
    {
      when: { reputation: { min: 50 }, willingness: { min: 70 } },
      text: 'Oh! Oh yes, please! I was just thinking I could use a little something. Sit down, sit down—I\'ll try whatever you\'ve brought!',
      weight: 3,
    },
    {
      when: { reputation: { min: 25 } },
      text: 'Food? For me? Oh, you didn\'t have to! ...Though I certainly won\'t say no. What is it?',
      weight: 2,
    },
    {
      when: {},
      text: 'You\'re offering me something to eat? Hmm. Well, what is it?',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.tavern_chat', [
    {
      when: { reputation: { min: 50 } },
      text: 'You know, I\'ve been cooking since I was knee-high. There\'s nothing in this world I love more than seeing a full table and happy faces. *pats belly* Obviously.',
      weight: 3,
    },
    {
      when: { stage: { min: 5 } },
      text: 'I always say—a good tavern keeper is the soul of a town! And a good tavern keeper is never, *ever* thin. *laughs loudly*',
      weight: 2,
    },
    {
      when: {},
      text: 'Quiet night tonight. Good time to catch up on the stew. Care for a bowl?',
      weight: 1,
    },
  ], { weight: 4 });


  // ─────────────────────────────────────────────
  // SILVIA THE MERCHANT — Shrewd trader
  // Calculating, business-minded, self-interested, loves a good deal
  // ─────────────────────────────────────────────

  engine.registerModuleVariants('npc.dialogue.greeting', [
    {
      when: { reputation: { min: 50 } },
      text: 'Ah, my most valuable customer! I was hoping you\'d visit. I have something special I think you\'ll appreciate.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Welcome! I have some excellent goods available today. Interested in a transaction?',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 } },
      text: 'Business, or just browsing?',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.examine', [
    {
      when: { isRestrained: 1, suspensionState: 'ceiling' },
      text: 'Silvia hangs suspended from candy ropes, rotating slowly in the air, her sharp eyes absolutely furious. "This is an assault on a licensed merchant!" she snaps. "You\'ll be hearing from my solicitor."',
    },
    {
      when: { isRestrained: 1, restrainedBy: 'hold_person' },
      text: 'Silvia is frozen mid-gesture, one finger pointed accusingly at nothing. Her eyes are ablaze with cold fury. She can\'t move a muscle, but her gaze alone could peel paint.',
    },
    {
      when: { fullness: 1, stage: { min: 5 } },
      text: 'Silvia is reclined in her merchant\'s chair, both hands resting on her enormous distended belly, looking profoundly satisfied. "I... may have overpaid for that last shipment," she sighs contentedly.',
    },
    {
      when: { stage: { min: 10 } },
      text: 'Silvia is absolutely enormous, her immense frame somehow still elegant. Her sharp eyes miss nothing as she assesses everyone who passes her stall. Size has not dulled her instincts one bit.',
    },
    {
      when: { stage: { min: 7, max: 9 } },
      text: 'Silvia has become quite substantial, her generous curves accentuating her shrewd demeanor. She regards you with calculating eyes, sizing you up as a potential transaction.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'Silvia is noticeably curvier than when you first met her, though her manner remains crisp and businesslike. She appraises you with sharp, calculating eyes.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'Silvia is a sharp-featured woman with keen eyes. Everything about her speaks of shrewd business sense.',
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.after_feeding', [
    {
      when: { willingness: { min: 60 } },
      text: 'Mm. I\'ll admit—that was exceptionally good. I\'d consider stocking that, actually. What\'s your supplier?',
      weight: 3,
    },
    {
      when: {},
      text: 'Palatable. I\'ve had better, but I can\'t complain. ...Thank you.',
      weight: 2,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.selling', [
    {
      when: { reputation: { min: 50 } },
      text: 'For you? I\'ll cut you a favorable rate. This is rare-quality stock—I don\'t offer this to just anyone. Consider it a professional courtesy.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'This is premium merchandise. I\'ve priced it fairly—you won\'t find better quality at this price anywhere in town.',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 } },
      text: 'These prices are firm. I don\'t negotiate down. Take it or leave it.',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.haggle', [
    {
      when: { reputation: { min: 50 } },
      text: 'You drive a hard bargain. *sighs* Fine. But only because I value our arrangement. Don\'t make a habit of this.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'I could go slightly lower—but only slightly. These goods aren\'t sitting unsold because no one wants them.',
      weight: 2,
    },
    {
      when: {},
      text: 'My prices are not a suggestion. However... I suppose I could consider a *modest* adjustment. For the right incentive.',
      weight: 1,
    },
  ], { weight: 4 });


  // ─────────────────────────────────────────────
  // GARDENER GREGG — Peaceful gardener
  // Serene, patient, earthy, connected to nature and growth
  // ─────────────────────────────────────────────

  engine.registerModuleVariants('npc.dialogue.greeting', [
    {
      when: { reputation: { min: 50 } },
      text: 'Welcome, friend. The gardens have been especially abundant this season. Would you like to enjoy them with me?',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Welcome to my garden. Please, enjoy the sights and sounds.',
      weight: 2,
    },
    {
      when: {} ,
      text: 'Hello. The gardens are peaceful today.',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.examine', [
    {
      when: { isRestrained: 1, suspensionState: 'ceiling' },
      text: 'The Gardener hangs from licorice vines coiled around their wrists, swaying gently like a piece of fruit. They seem eerily calm. "Nature takes all things in cycles," they murmur philosophically.',
    },
    {
      when: { isRestrained: 1, restrainedBy: 'hold_person' },
      text: 'The Gardener is frozen mid-trowel, completely paralyzed, a trowel suspended in mid-motion. Only their eyes move, calm and patient even now.',
    },
    {
      when: { fullness: 1, stage: { min: 5 } },
      text: 'The Gardener sits beneath a great tree, their massive belly curved like a hill in the garden landscape. They seem utterly at peace, hands folded, breathing deeply.',
    },
    {
      when: { stage: { min: 10 } },
      text: 'The Gardener has become truly immense, their vast form almost merging with the earth itself. They move slowly and deliberately among the plants, as serene as ever.',
    },
    {
      when: { stage: { min: 7, max: 9 } },
      text: 'The Gardener is enormously large, their rounded figure like a harvest moon brought to earth. They tend their plants with the same quiet patience as always.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'The Gardener is pleasantly plump, with a soft, earthy presence. They move through the garden with unhurried contentment.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'The Gardener is a gentle-looking person, tending the plants with serene, unhurried care.',
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.after_feeding', [
    {
      when: { willingness: { min: 65 } },
      text: 'Mmm... like the earth receiving rain. Thank you. Everything grows when it\'s nourished.',
      weight: 3,
    },
    {
      when: {},
      text: 'That was... good. The body benefits from abundance, just as the soil does.',
      weight: 2,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.gardening', [
    {
      when: { stage: { min: 6 } },
      text: 'I sometimes think I have become like one of my pumpkins. *chuckles softly* There are worse fates. Growth is growth.',
      weight: 3,
    },
    {
      when: { reputation: { min: 40 } },
      text: 'Did you know? The oldest oak in this garden is four hundred years old. I\'ve tended it for thirty. Some things require patience that outlasts a lifetime.',
      weight: 2,
    },
    {
      when: {},
      text: 'The secret to a thriving garden is listening. The plants tell you what they need, if you\'re quiet enough to hear.',
      weight: 1,
    },
  ], { weight: 4 });


  // ─────────────────────────────────────────────
  // CAPTAIN CASSANDRA — Guard Captain
  // Stern, disciplined, vigilant, blunt, professional
  // ─────────────────────────────────────────────

  engine.registerModuleVariants('npc.dialogue.greeting', [
    {
      when: { reputation: { min: 50 } },
      text: 'At ease. Good to see you. The town is secure with capable allies like you around.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'You. State your business.',
      weight: 2,
    },
    {
      when: {} ,
      text: 'Watch yourself. I\'m observing.',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.examine', [
    {
      when: { isRestrained: 1, suspensionState: 'ceiling' },
      text: 'Captain Cassandra is suspended from the ceiling by licorice ropes lashed around her wrists and ankles, her face a mask of barely contained fury. "Release me. NOW." Her voice is ice-cold.',
    },
    {
      when: { isRestrained: 1, restrainedBy: 'hold_person' },
      text: 'Captain Cassandra is locked in absolute paralysis, frozen at rigid attention as if on parade. Her eyes are furious. A vein pulses in her jaw—the only thing she can control.',
    },
    {
      when: { fullness: 1, stage: { min: 5 } },
      text: 'Captain Cassandra is seated on her armored stool, her enormous belly resting in her lap. She looks deeply conflicted—disciplined instincts warring with the haze of utter satiation. "Dismissed," she manages.',
    },
    {
      when: { stage: { min: 10 } },
      text: 'Captain Cassandra has become truly enormous, but she carries her immense weight with military bearing that commands absolute respect. Her eyes are as sharp and watchful as ever.',
    },
    {
      when: { stage: { min: 7, max: 9 } },
      text: 'Captain Cassandra is very large now, her considerable bulk straining her uniform, but her bearing remains disciplined. She watches you with the same relentless vigilance.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'Captain Cassandra has gained noticeable weight, her frame more solid and substantial than before. Her expression remains stern and her posture correct.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'Captain Cassandra is a lean, muscular woman who watches you with vigilant intensity. Her hand rests near her weapon.',
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.after_feeding', [
    {
      when: { willingness: { max: 45 } },
      text: 'I... will allow that was not unpleasant. Don\'t read into it.',
      weight: 3,
    },
    {
      when: { willingness: { min: 46 } },
      text: 'That was... acceptable. My rations have been less filling lately. *clears throat* Don\'t mention this to my troops.',
      weight: 2,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.friendly', [
    {
      when: { reputation: { min: 60 } },
      text: 'You\'ve proven yourself to me. That doesn\'t happen often. I trust few people—fewer still with my back. You\'re one of them now.',
      weight: 3,
    },
    {
      when: { reputation: { min: 40, max: 59 } },
      text: 'I\'ll admit—you\'ve impressed me. I don\'t say that lightly. Keep it up.',
      weight: 2,
    },
    {
      when: {},
      text: 'You\'re... alright. For a civilian.',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.warning', [
    {
      when: { reputation: { max: -25 } },
      text: 'I\'m watching you. One wrong move—*one*—and I will personally escort you to a cell. I\'ve been waiting for an excuse. Don\'t give me one.',
      weight: 3,
    },
    {
      when: { reputation: { min: -24, max: 10 } },
      text: 'I\'d choose my next actions very carefully if I were you. This town has laws, and I enforce them. Personally.',
      weight: 2,
    },
    {
      when: {},
      text: 'I suggest you maintain good behavior in my jurisdiction. The cells are full, but I\'ll make room.',
      weight: 1,
    },
  ], { weight: 4 });


  // ─────────────────────────────────────────────
  // CHEF GERTRUDE — Head Chef
  // Commanding, passionate, proud of her food, easily offended by bad taste
  // ─────────────────────────────────────────────

  engine.registerModuleVariants('npc.dialogue.greeting', [
    {
      when: { reputation: { min: 50 } },
      text: 'Ah, my favorite customer! Welcome! I\'ve prepared something absolutely magnificent. You MUST try it.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Well, come in! The kitchen is prepared. Are you ready for the finest meal of your life?',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 } },
      text: 'You\'re in my kitchen now. Try not to get in the way.',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.examine', [
    {
      when: { isRestrained: 1, suspensionState: 'ceiling' },
      text: 'Chef Gertrude is suspended from the ceiling beams by thick licorice ropes wound around her wrists and ankles, her enormous form swaying with the draft from the ovens. She is absolutely livid. "MY SOUFFLÉ IS IN THE OVEN!"',
    },
    {
      when: { isRestrained: 1, restrainedBy: 'hold_person' },
      text: 'Chef Gertrude is frozen in her command stance, ladle raised mid-gesture, face contorted in outrage. She cannot move, but the expression alone conveys everything: this is unacceptable.',
    },
    {
      when: { fullness: 1, stage: { min: 5 } },
      text: 'Chef Gertrude sits on her reinforced kitchen stool, her immense belly rising and falling with deep, satisfied breaths. A half-eaten plate sits before her. "Perfection," she murmurs. "I\'ve outdone myself."',
    },
    {
      when: { stage: { min: 10 } },
      text: 'Chef Gertrude has become truly enormous—a living testament to the finest cuisine. Her immense form commands the kitchen like a force of nature, and every ingredient trembles in delicious anticipation.',
    },
    {
      when: { stage: { min: 7, max: 9 } },
      text: 'Chef Gertrude is immensely large, her prodigious bulk a badge of culinary pride. She surveys her kitchen with commanding intensity, spatula in hand.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'Chef Gertrude is noticeably plumper now, her generous curves clearly enjoying the benefits of her own masterful cooking. Her presence in the kitchen is absolute.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'Chef Gertrude is a strong-looking woman with piercing eyes and commanding presence. She rules her kitchen absolutely.',
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.after_feeding', [
    {
      when: { willingness: { min: 80 } },
      text: 'MAGNIFICENT. Whoever prepared this—I have opinions, and most of them are compliments. The fat content alone— *chef\'s kiss* —extraordinary.',
      weight: 3,
    },
    {
      when: { willingness: { min: 55, max: 79 } },
      text: 'Mmm. Good technique. Acceptable seasoning. I could show you a few improvements, but yes—that was quite enjoyable.',
      weight: 2,
    },
    {
      when: {},
      text: 'Not bad. Could use more butter. Everything can use more butter. But yes, thank you.',
      weight: 1,
    },
  ], { weight: 4 });

  engine.registerModuleVariants('npc.dialogue.cooking', [
    {
      when: { reputation: { min: 50 } },
      text: 'Watch and learn. This sauce needs to reduce for exactly four more minutes, not three, not five—*four*. The difference between greatness and mediocrity is always in the details. Take note!',
      weight: 3,
    },
    {
      when: { stage: { min: 5 } },
      text: 'I have eaten more extraordinary food than most people will taste in ten lifetimes. *pats belly proudly* And I intend to eat considerably more before I\'m done.',
      weight: 2,
    },
    {
      when: {},
      text: 'Out of my way—I\'m in a critical phase. You can talk when the roux is done.',
      weight: 1,
    },
  ], { weight: 4 });

}

export default registerNPCPersonas;
