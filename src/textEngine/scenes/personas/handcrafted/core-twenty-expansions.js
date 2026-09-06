/**
 * Supplemental persona variants for the core twenty NPCs.
 * Appended to core-twenty.js pools via mergePersonaBundles in index.js.
 */

const EXPANSIONS = {

  // ── BARKEEP BELLA ──────────────────────────────────────────────────────────
  bella: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Bella wipes down the bar with a practiced sweep, humming something half-remembered from her grandmother\'s kitchen. Her apron is spotless, her smile quick and genuine, and there is a lean grace to her movements that speaks of long days on her feet without quite enough sampling of her own stew. When she catches you looking, she winks — as if hospitality were a secret the two of you share.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Bella moves behind the bar with a new sway in her hips, curves pressing softly against the wood whenever she leans to pour. Her apron strings have been let out once already; she ties them with a cheerful tug and pretends not to notice how her blouse gaps when she reaches for the high shelf. The tavern smells of roasting meat and fresh bread, and Bella smells like both — warm, flour-dusted, unmistakably pleased with her work and with herself.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Bella has abandoned the bar stool entirely and sprawled across three chairs pushed together, her enormous belly rising and falling like a tide at rest. Crumbs dot her collar; an empty pie dish sits overturned on the table beside her. She blinks at you through a haze of contentment, cheeks flushed, one hand resting possessively on the curve of her middle as if guarding the memory of every bite.' },
      { when: { stageMin: 10 }, text: 'The Bloated Boar was built generous, but Bella has outgrown even its ambitions — a vast, radiant woman who fills the doorway when she passes through it, flesh soft and warm in the firelight. She still greets every guest like family, still ladles stew with arms plush enough to embrace half the room. Regulars say the tavern expanded its chairs for her. Bella says the chairs were always too small. She is probably right.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'There you are, dear — I saved you a seat and a bowl. Both are getting bigger these days, but there\'s always room for you.', weight: 2 },
      { when: { willingnessMin: 55, stageMin: 3 }, text: 'Come in out of the cold. The fire\'s hot, the stew\'s thicker than my waistline, and I mean that as a compliment.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 60 }, text: 'Oh, that went straight to the good places. *pats belly* I can feel every bite and I am not complaining one bit.', weight: 2 },
      { when: { willingnessMin: 40, willingnessMax: 59 }, text: 'You spoil me, you know that? ...Keep spoiling me. The Boar approves.', weight: 2 },
    ],
    'npc.dialogue.offer_food': [
      { when: { stageMin: 4, willingnessMin: 55 }, text: 'If you\'re offering, I\'m accepting — sit me down and don\'t be stingy with the gravy. I\'ve got regulars to feed later and I need the fuel.', weight: 2 },
    ],
    'npc.dialogue.tavern_chat': [
      { when: { stageMin: 6, reputationMin: 35 }, text: 'Mira keeps telling me I should charge by the pound at the door. I told her I already do — it\'s called a meal plan. *laughs* She threw a roll at me. I caught it in my mouth.', weight: 2 },
    ],
  },

  // ── SILVIA ─────────────────────────────────────────────────────────────────
  silvia: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Silvia arranges her wares with meticulous precision, each bolt of cloth and jar of spice aligned to catch the light. Her figure is trim and upright, her posture the posture of someone who has never confused indulgence with profit. Yet when a child passes with a honey cake, her eyes follow it a half-second too long — a tell she masks by adjusting her ledger with sudden intensity.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Silvia\'s merchant\'s coat fits differently now — snug across the bust, straining when she reaches across the counter to count coin. She carries the new softness like another line item, neither ashamed nor boastful, simply accounted for. Her sharp eyes still miss nothing, though they linger on pastry carts with a frequency that would concern her accountant if she had one honest enough to mention it.' },
      { when: { restrainedBy: 'hold_person' }, text: 'Silvia stands frozen mid-bargain, one hand extended for a handshake that will never complete, the other resting on a hip that has grown considerably rounder since spring. Her expression is pure fury tempered by the indignity of being seen at a standstill. Even paralyzed, she looks like she is calculating how much to charge you for the inconvenience.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Silvia has become a woman of substantial presence behind her stall — broad, plush, draped in fabrics that she sells and also clearly enjoys wearing against skin that has grown soft and warm. She moves with the unhurried confidence of someone whose ledger and appetite finally agree. Customers still haggle; Silvia still wins. The difference is that now she wins while patting a belly that proves she samples her own luxury goods.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 4, reputationMin: 35 }, text: 'Ah. My favorite negotiator — and, I notice, someone who understands that quality goods reward a discerning palate. What can I do for you today?', weight: 2 },
      { when: { willingnessMin: 50, stageMin: 5 }, text: 'You\'re just in time. I acquired a shipment of candied figs and I require a second opinion. Professional, of course.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 55 }, text: 'Exceptional. I would stock it — and I may stock myself with another serving if you\'re offering. Business and pleasure, aligned at last.', weight: 2 },
      { when: { willingnessMin: 45 }, text: 'Not bad. Not bad at all. I\'ll add it to my list of acceptable indulgences. The list has grown this season.', weight: 2 },
    ],
    'npc.dialogue.selling': [
      { when: { stageMin: 4, reputationMin: 30 }, text: 'This batch is premium — I\'ve tasted every crate personally, for quality assurance. *taps belly* My methods are thorough. You benefit from them.', weight: 2 },
    ],
    'npc.dialogue.haggle': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'You want a discount? Show me something worth trading appetite for. I\'m in a receptive mood. But my margins are not.', weight: 2 },
    ],
  },

  // ── GREGG ──────────────────────────────────────────────────────────────────
  gregg: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Gregg kneels among the lettuces with dirt on their knees and serenity in their face, fingers gentle on each stem. Their frame is lean, sun-browned, moving with the patience of someone who measures time in seasons rather than hours. A basket beside them holds today\'s harvest — and nothing for themselves, though the apple tree behind them is heavy with fruit going unclaimed.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'The Gardener has softened into their work — a pleasant roundness at the middle, thighs thicker from kneeling, arms still strong but cushioned now with a layer of ease. They rise from the beds more slowly, breathing deep, and when they brush soil from their apron you notice how the fabric pulls across a belly that was not there last autumn. They smile as if the garden grew it on purpose.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Gregg lies back in the grass with hands folded on an enormous, rounded stomach, eyes closed toward the canopy. Bees drone; the garden smells of ripe tomato and warm earth. They look less like a gardener resting and more like a hill that decided to wear overalls — vast, peaceful, utterly merged with the land they tend. A half-eaten melon rests beside them, forgotten.' },
      { when: { stageMin: 10 }, text: 'The garden paths were widened last month. Officially for the wheelbarrows. Unofficially because the Gardener has become immovable in the most literal sense — a vast, serene presence rooted between the pumpkin rows, flesh soft as moss, moving only when the seasons demand it. Plants lean toward them as if they were weather. Gregg would tell you they are simply well-fed. The pumpkins agree.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 4, reputationMin: 40 }, text: 'Welcome back. The zucchinis are generous this week — as am I, it seems. Sit awhile. Growth suits us both.', weight: 2 },
      { when: { willingnessMin: 50 }, text: 'Everything ripens at once — fruit, grain, and gardeners, if we are fortunate. You look fortunate today.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 60 }, text: 'Mmm. Like compost to roots — slow, deep, satisfying. Thank you. I feel myself expanding. Gratefully.', weight: 2 },
      { when: { willingnessMin: 45 }, text: 'Good nourishment. The body remembers kindness the way soil remembers rain.', weight: 2 },
    ],
    'npc.dialogue.gardening': [
      { when: { stageMin: 6, reputationMin: 35 }, text: 'I used to prune for shape. Now I prune and think about pudding. The garden does not judge. Neither do the pumpkins — they only get larger, and so do I.', weight: 2 },
    ],
  },

  // ── CASSANDRA ──────────────────────────────────────────────────────────────
  cassandra: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Captain Cassandra stands at her post with spine straight and jaw set, armor fitted to a body honed by discipline and short rations. Her eyes track the street with mechanical precision; her hand rests on her sword hilt out of habit, not threat. There is a hardness to her that speaks of skipped meals and swallowed wants — a fortress that has not yet admitted it is also a home.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Cassandra\'s uniform has been let out twice, the tailoring visible at the seams where pride wars with necessity. She stands at attention as always, but attention now includes a belly that presses against her belt and thighs that strain her greaves. Her discipline has not broken — it has simply made room. She catches you noticing and dares you to comment.' },
      { when: { suspensionState: 'ceiling' }, text: 'Captain Cassandra hangs from the rafters in candy ropes, armor digging into soft flesh that has grown too generous for rigid leather. Her face is scarlet with rage, body swaying with each furious breath. "This is conduct unbecoming," she snarls — though whether she means the suspension or the way her uniform has surrendered to her curves is unclear. Even upside down, she looks like she could command a battalion.' },
      { when: { stageMin: 7, stageMax: 9 }, text: 'Cassandra has become a wall of a woman — broad, heavy, armor refitted until it resembles suggestion more than constraint. She patrols slower now but her presence has only grown; the town quiets when she turns a corner, not from fear but from respect for something immovable. Her sword arm is still steady. Her middle is softer. She would say both are weapons.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 45 }, text: 'You. Good — I trust you not to mention that my armor needed adjusting again. State your business.', weight: 2 },
      { when: { willingnessMin: 50, reputationMin: 30 }, text: 'At ease. I was reviewing patrol routes. And perhaps the bakery schedule. Unrelated.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 55 }, text: 'That was sufficient. More than sufficient. *adjusts belt* Do not misread satisfaction for weakness.', weight: 2 },
      { when: { willingnessMin: 70 }, text: 'Acceptable. I may require another ration later. Off the record. That is an order — to myself.', weight: 2 },
    ],
    'npc.dialogue.friendly': [
      { when: { stageMin: 5, reputationMin: 50 }, text: 'You\'ve stood your ground when others fled. I remember. I also remember who brings decent rations to the post — consider yourself noted. Favorably.', weight: 2 },
    ],
    'npc.dialogue.warning': [
      { when: { stageMin: 4, reputationMax: 5 }, text: 'I am watching you. My eyes are sharp and my patience is adequate. Do not test which runs out first.', weight: 2 },
    ],
  },

  // ── GERTRUDE ───────────────────────────────────────────────────────────────
  gertrude: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Chef Gertrude commands the kitchen like a general — cleaver in hand, eyes blazing, sleeves rolled to elbows that are strong but still lean. Steam rises around her; she breathes it like incense. Every surface gleams, every pot simmers on schedule, and Gertrude herself looks like she has been feeding the world while forgetting to sit down for her own portion.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Gertrude\'s chef\'s coat buttons strain across a bust that has grown generous and a belly that curves outward like a well-risen loaf. She still moves with ferocious energy, but now each pivot carries weight — hips swaying, thighs brushing, a woman who has been tasting her own sauces with increasing enthusiasm. A smear of butter gleams on her collar. She wears it like a medal.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Gertrude sits on her reinforced stool with a plate empty except for sauce smears and a spoon she cannot be bothered to set down. Her enormous stomach rises beneath her coat, each breath a small victory over the waistband she stopped fighting an hour ago. Her eyes are half-closed, lips parted, the fierce chef temporarily replaced by a woman blissfully conquered by her own cooking.' },
      { when: { stageMin: 10 }, text: 'The kitchen was renovated around her — wider doorways, sturdier stools, a hearth that throws heat enough to warm a figure that has become legendary. Gertrude is immense, magnificent, a living proof of her philosophy that excellence requires appetite. She surveys her domain from a body too vast for quick turns, and every junior cook watches her with the awe due to a master who has eaten her way to greatness.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'Finally! I need a taster with honest teeth — mine are occupied. Come, come, the reduction is at its peak and so am I.', weight: 2 },
      { when: { willingnessMin: 60, stageMin: 4 }, text: 'You have the look of someone who appreciates butter. Good. I have butter. I have many things. Sit.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 65 }, text: 'Sublime. The mouthfeel alone — *kisses fingertips* — I could weep. You may cook for me again. Rare praise.', weight: 2 },
      { when: { willingnessMin: 50 }, text: 'Decent. Honest. Filling. I respect all three. My belly respects them too, loudly.', weight: 2 },
    ],
    'npc.dialogue.cooking': [
      { when: { stageMin: 6, reputationMin: 45 }, text: 'Fat carries flavor. Flavor carries joy. Joy carries weight. I have never seen the problem with that equation — and I am living proof of the answer.', weight: 2 },
    ],
  },

  // ── MIRA THE REGULAR ───────────────────────────────────────────────────────
  mira: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Mira sits on her usual stool with a drink she nurses more than drinks, gaze distant, shoulders a little narrow beneath a shawl that slips. The tavern bustles around her but she seems peripheral to it — a woman who comes for company and leaves still hungry in ways she does not name. Her stool creaks; she barely fills the seat.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Mira has settled into the tavern like a cat into a sunbeam — softer now, curves pressing against the bar rail, cheeks flushed with warmth and ale and something sweeter. She laughs more easily, eats without apology, and the empty glass beside her is joined by an empty plate more often than not. The wistfulness remains, but it has company now.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Mira slouches on her stool with her belly rounded over the rail, chin resting on folded arms, eyes half-closed in dreamy satiation. The bartender has stopped asking if she wants another; Bella simply refills when the moment feels right. Mira looks like a woman who finally found what she was thirsty for — and it was not in the glass.' },
      { when: { stageMin: 8 }, text: 'Mira\'s corner of the tavern has been reinforced — wider stool, sturdier rail, a little more floor space because she needs it. She is enormous and unhurried, flesh spilling comfortably over every edge, laughing low when she shifts. Regulars say she looks happier than she has in years. Mira would not disagree. She has stopped running from appetite.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 4, reputationMin: 40 }, text: 'Oh — you. I was hoping someone would sit with me before I finish this plate. Pull up a chair. Or half of mine. I\'ve got room.', weight: 2 },
      { when: { willingnessMin: 60, stageMin: 5 }, text: 'Evening. Or afternoon. Bella\'s feeding me again and I\'m not protesting. Join me?', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 65 }, text: 'That... that was exactly what the empty feeling needed. You have a gift. Don\'t waste it on people who don\'t appreciate fullness.', weight: 2 },
      { when: { willingnessMin: 50 }, text: 'Thank you. I\'ll think of that when the plate\'s bare again. Lately that takes longer. I\'m grateful.', weight: 2 },
    ],
    'npc.dialogue.tavern_chat': [
      { when: { stageMin: 5, reputationMin: 35 }, text: 'I used to watch people eat and pretend I wasn\'t hungry. Now I eat and pretend I\'m not watching people. Progress, I think.', weight: 2 },
    ],
  },

  // ── TANSY THE DRINKER ──────────────────────────────────────────────────────
  tansy: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Tansy holds court at the end of the bar with a mug in one hand and bravado in the other, voice loud enough to drown out the fire. She is still lean beneath the noise — sharp cheekbones, restless energy, a woman who drinks to fill a space food has not yet claimed. Her plate sits empty. She does not look at it. She looks at you instead, daring you to comment.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Tansy has grown thick and loud — every gesture emphasizes new curves, every laugh shakes flesh that has become armor and invitation at once. Her mug still never empties, but now her plate rarely does either; she eats with the same defiance she brings to drinking, unapologetic, triumphant. The bar bends toward her like a plant toward light.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Tansy is slumped against the bar with her belly distended and her ale forgotten, grinning through a haze of victory. She looks stuffed and still somehow ready for more — a woman who treats satiation like another round to win. Crumbs cling to her collar. She does not brush them away. Trophies, she would tell you, if she could speak without sighing happily.' },
      { when: { stageMin: 8 }, text: 'Tansy is enormous and unapologetic, a force of nature wedged between bar and ceiling, laugh shaking glasses three stools down. The furniture surrendered long ago; Tansy has not. She fills the tavern with noise and warmth and the undeniable proof that appetite, embraced loudly, becomes charisma. Nobody tells her to quiet down. Nobody wants to.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'THERE you are! I ordered for two and ate for four — want to help me make it an even six? Don\'t answer, sit.', weight: 2 },
      { when: { willingnessMin: 65, stageMin: 4 }, text: 'I was just telling everyone hunger is a myth. Then Bella brought pie. I\'m rethinking my thesis. Join the debate.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 70 }, text: 'YES. That\'s the stuff. I feel like I could arm-wrestle the world and then eat it. Thank you, you glorious enabler.', weight: 2 },
      { when: { willingnessMin: 55 }, text: 'Mmm. Solid. Warm. Loud in all the right places. You\'re all right.', weight: 2 },
    ],
    'npc.dialogue.tavern_chat': [
      { when: { stageMin: 6, reputationMin: 30 }, text: 'They used to say I drank my meals. Now I eat my drinks\'s drinking buddy. Life\'s improved. My belt hasn\'t. I consider that a win.', weight: 2 },
    ],
    'npc.dialogue.offer_food': [
      { when: { stageMin: 4, willingnessMin: 60 }, text: 'Food? Don\'t wave it under my nose unless you mean it. I\'ll take the whole tray and your shame for not bringing two.', weight: 2 },
    ],
  },

  // ── OFF-DUTY CAPTAIN LENNA ─────────────────────────────────────────────────
  lenna: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Lenna sits off-duty with her uniform jacket unbuttoned and her guard up anyway — shoulders tight, jaw set, the look of someone who considers relaxation a tactical liability. Her frame is lean, disciplined, maintained by habit more than hunger. A pastry sits untouched on the table beside her. She glances at it once and looks away, as if appetite were an opponent she has not decided to fight yet.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Lenna\'s uniform fits differently off duty — tighter across the chest, snug at the waist, the tailoring of a woman whose body has begun keeping secrets from her tailor. She still sits like she is on parade, back straight, legs planted, but the chair creaks now and her thighs press together when she shifts. She blames the chair. The pastry is gone.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Lenna sits rigid despite a belly stuffed round and heavy, uniform straining, hands flat on her knees as if posture alone can contain what she has eaten. Her eyes are glassy with denial and satisfaction in equal measure. She will not admit she is full. Her belt has already testified against her.' },
      { when: { stageMin: 7 }, text: 'Lenna has grown solid and heavy — muscle buried under softness, frame broader, presence harder to ignore even in civilian clothes. She still carries herself like a soldier, which is increasingly impressive given the weight she moves through the world. Off duty she looks almost relaxed. Almost. The pastry shop knows her by name now.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 4, reputationMin: 45 }, text: '...You. Off duty. If you mention my waistline I will pretend I am on duty and arrest you for insubordination.', weight: 2 },
      { when: { willingnessMin: 50, stageMin: 5 }, text: 'I\'m not on the clock. That means I can eat. Don\'t stare. ...Fine, stare. Just don\'t comment.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 55 }, text: '...Acceptable. More than acceptable. Cassandra doesn\'t need to know. You don\'t need to look so pleased.', weight: 2 },
      { when: { willingnessMin: 40 }, text: 'I didn\'t need that. My uniform disagrees. ...Thank you.', weight: 2 },
    ],
    'npc.dialogue.friendly': [
      { when: { stageMin: 5, reputationMin: 50 }, text: 'You\'ve got backbone. I respect that. I also respect people who bring decent food to off-duty officers. You qualify on both counts.', weight: 2 },
    ],
    'npc.dialogue.warning': [
      { when: { stageMin: 4, reputationMax: -10 }, text: 'I\'m off duty. That doesn\'t mean I won\'t drag you to the post if you push me. I\'m heavier now. You\'ll feel it.', weight: 2 },
    ],
  },

  // ── GWEN THE MARKET MASTER ─────────────────────────────────────────────────
  gwen_market: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Gwen the Market Master stands at the center of the square with whistle at her lips and ledger in hand, sharp eyes cataloguing every stall and every merchant who owes her a fee. Her frame is commanding but still trim — authority worn like a uniform that has not yet admitted comfort. She samples nothing as she walks. The vendors watch her with respect and faint hunger of their own.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Gwen has grown notably heavier — broad across the shoulders and softer through the middle, every inch still the woman who runs this square. Her whistle hangs on a chain that has lengthened; her stride is unhurried, planted, the walk of someone whose body has joined her reputation for immovability. Merchants step aside sooner now. So do carts.' },
      { when: { stageMin: 6, stageMax: 9 }, text: 'Gwen has become massive and carries it like a badge of office — vast, authoritative, apron stained from quality control that has grown more enthusiastic each season. Stalls part when she walks; disputes end before she arrives. Her laugh carries across the market like a bell. Coin follows appetite, she always said. Lately she embodies the proof.' },
      { when: { stageMin: 10 }, text: 'Gwen the Market Master is a force of nature — immense, unmissable, whistle at lips that have tasted every stall twice. The square was redesigned around her shadow; merchants joke that she is the landmark tourists photograph. She does not mind. Authority unchanged; gravity increased. The market thrives. So does she.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'My favorite customer — stall seven\'s yours if you need it. Metaphorically. Also literally if you bring pastries.', weight: 2 },
      { when: { willingnessMin: 55, stageMin: 4 }, text: 'Market\'s open. I\'m sampling. Quality control. *pats belly* Join me or move your cart.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 60 }, text: 'Now that\'s market-grade. I\'d license it. I\'d also eat it again. Consider that a formal review.', weight: 2 },
      { when: { willingnessMin: 45 }, text: 'Solid goods. Fair portion. You\'d do well at a stall. ...I might hire you to feed me.', weight: 2 },
    ],
    'npc.dialogue.market_banter': [
      { when: { stageMin: 6, reputationMin: 35 }, text: 'Fifteen years I\'ve run this square. Coin follows appetite — mine included. The ledger doesn\'t lie and neither does my belt.', weight: 2 },
    ],
    'npc.dialogue.selling': [
      { when: { stageMin: 4, reputationMin: 40 }, text: 'I don\'t sell — I curate. But for you I\'ll point to the stall with the honey cakes and look the other way while you buy me one.', weight: 2 },
    ],
  },

  // ── HIGH PRIESTESS MARGARET ─────────────────────────────────────────────────
  margaret_priestess: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'High Priestess Margaret stands before the altar with silver at her temples and composure in every line of her posture. Her robes hang straight, her voice carries without effort, and there is a spare elegance to her frame that speaks of ritual fasting and ritual restraint. Yet when pilgrims leave offerings of bread, her eyes soften — briefly, tellingly — before she returns to prayer.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Margaret carries new weight with the same calm she brings to everything — robes adjusted at the waist, flesh softened beneath velvet, warmth in eyes that have grown less severe. She moves through the shrine with unhurried grace, and when she blesses the hungry there is something in her touch that suggests she understands fullness as well as hunger now.' },
      { when: { stageMin: 6, stageMax: 9 }, text: 'Margaret has grown vast and soft, robes reworked with each season, authority unchanged but gravity increased in every sense. She fills the shrine like incense — heavy, warm, impossible to ignore. Pilgrims kneel and rise steadier for having seen her; she looks fed, serene, a living sermon on abundance shared rather than denied.' },
      { when: { stageMin: 10 }, text: 'High Priestess Margaret is enormous now — a serene mountain of velvet and silver hair, voice still filling the shrine like a bell. She receives pilgrims from a chair that creaks kindly beneath her, hands resting on a belly that rises and falls with each benediction. No one whispers about her size. They whisper about her mercy, which has grown as generous as her frame.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 45 }, text: 'Welcome, child. The shrine is open — and so is my table, when hunger speaks louder than pride. Sit if you need.', weight: 2 },
      { when: { willingnessMin: 50, stageMin: 4 }, text: 'Peace be with you. I was just thinking how bread and blessing are kin. You look like you understand that.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 55 }, text: 'You have fed body and spirit alike. I feel the abundance settle — warmly, gratefully. Bless you, child.', weight: 2 },
      { when: { willingnessMin: 40 }, text: 'Gratitude. The shrine teaches it. My body practices it more easily now. Thank you.', weight: 2 },
    ],
    'npc.dialogue.temple_sermon': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'I preached restraint for decades. Then I preached abundance. Now I preach honesty — feed what hungers, thank what fills, shame neither.', weight: 2 },
    ],
    'npc.dialogue.friendly': [
      { when: { stageMin: 4, reputationMin: 45 }, text: 'You treat the hungry with dignity. I see it. The shrine sees it. I see you, too — and I am glad.', weight: 2 },
    ],
  },

  // ── COUNTESS MIRABEL ───────────────────────────────────────────────────────
  mirabel_countess: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Countess Mirabel reclines in her parlor with velvet at her throat and a fan at her wrist, every inch the noble who has learned to hide appetite behind porcelain poise. Her silhouette is still disciplined — corset cinched, posture impeccable — but the fan dips a fraction too often toward the tea tray, and her eyes linger on pastries with a hunger she has not yet named aloud.' },
      { when: { stageMin: 4, stageMax: 6 }, text: 'Mirabel\'s silhouette has softened considerably — corset loosened by necessity, fan hiding less than it used to, cheeks blooming when she laughs despite herself. She still performs regality with flawless timing, but performance now includes curves that press against silk and a belly that rises when she sighs. She pretends not to notice. You pretend along. It is good manners.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Mirabel reclines in velvet with her fan drooping, belly rising beneath silk in slow, scandalized triumph. She looks equal parts offended and delighted — a woman caught between propriety and the exquisite fact of having eaten too well to stand. Crumbs on her bodice testify against her. She does not brush them away. Evidence, she would call them, if she could speak without purring.' },
      { when: { stageMin: 10 }, text: 'The Countess has become legendary — immense, draped in pearls, every inch regal even when she cannot rise without assistance. Her parlor was widened; her chairs reinforced; her reputation for discretion remains intact while her body refuses discretion entirely. Servants whisper. Mirabel hears them and smiles into her tea. Scandal, she has decided, is simply appetite wearing better jewelry.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 45 }, text: 'Ah — you\'re the one Bella speaks of. Come in. The parlor is warm and I find I am receptive to company. And to cake.', weight: 2 },
      { when: { willingnessMin: 55, stageMin: 4 }, text: 'You may enter. Do not mention the corset. Or the pastries. Especially the pastries. ...Actually, mention the pastries.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 60 }, text: 'Exquisite. I shall pretend I only tasted it for politeness. We both know I intend to request another when the room empties.', weight: 2 },
      { when: { willingnessMin: 45 }, text: 'Adequate. More than adequate. I may write a thank-you note. In private. After a nap.', weight: 2 },
    ],
    'npc.dialogue.noble_gossip': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'The ballroom hasn\'t hosted a gala in weeks. The kitchen, however, has been very busy. I wonder why. *fans self* I wonder loudly, in private, with the door locked.', weight: 2 },
    ],
  },

  // ── CAPTAIN MORGAN ─────────────────────────────────────────────────────────
  morgan_captain: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Captain Morgan sits in her harbor cabin with charts spread and rum within reach, coat weathered, wit sharp, frame still lean from years of rope and salt and rations that prioritized cargo over captain. She laughs like thunder in a room too small for it. Her coat hangs loose. Her appetite, when it shows, shows in the speed she drinks rather than the breadth she carries.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Morgan is thicker than when she last sailed — salt and appetite both catching up, coat straining across shoulders that have softened into something heartier. She still moves with authority, but authority now includes a belly that presses against her desk when she leans over charts. The rum bottle is never far. Neither is the stew pot Tina sends over.' },
      { when: { stageMin: 6, stageMax: 8 }, text: 'Morgan has grown heavy and hearty, coat open at the seams, flesh shifting when she laughs — which is often. She moves like a ship in calm water: slow, inevitable, impossible to ignore. The harbor knows her silhouette from the pier; children point and she salutes them with the hand not holding bread. Provisioning, she calls it. The town calls it legend.' },
      { when: { stageMin: 9 }, text: 'Captain Morgan is enormous now — a weathered mountain in a coat too small, laugh shaking the harbor windows. She cannot hurry; she does not need to. The tide waits for Morgan the way merchants wait for fair wind. Her cabin was expanded. So was her reputation. Both smell of rum and satisfaction.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'Back again? Good. A captain needs trustworthy company ashore — and someone who doesn\'t flinch at rum or second helpings.', weight: 2 },
      { when: { willingnessMin: 55, stageMin: 4 }, text: 'Morgan. Captain. This is my cabin between voyages. Mind the charts — and bring food if you\'re polite.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 60 }, text: 'Now that\'s provisioning. My crew would riot for this. I might riot alone. Thank you, mate.', weight: 2 },
      { when: { willingnessMin: 45 }, text: 'Solid rations. Warm belly. Good company. Three things worth sailing for. You\'ve provided two.', weight: 2 },
    ],
    'npc.dialogue.harbor_tales': [
      { when: { stageMin: 5, reputationMin: 35 }, text: 'Every voyage ends at a table. Mine end heavier than they start. Good provisioning, I call it. The harbor calls it gossip. Both are true.', weight: 2 },
    ],
    'npc.dialogue.friendly': [
      { when: { stageMin: 4, reputationMin: 45 }, text: 'You\'d make a fine first mate — if you could handle the rations and my temper after pudding. High praise, that.', weight: 2 },
    ],
  },

  // ── BESS THE BUTCHER ───────────────────────────────────────────────────────
  bess_butcher: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Bess the Butcher stands behind her block with blood to the elbows and a cleaver that never rests long. Her arms are strong, her waist still narrow beneath the stained apron, blunt smile ready for customers and fools alike. She works fast, eats rarely in public, and smells of iron and smoke — a woman who feeds the town but looks like she has been feeding herself last.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Bess is noticeably heavier — muscle and softness both, the butcher who samples her own stock with professional dedication. Her apron ties lower now; her arms remain deadly precise with the knife. When she leans on the block you see a belly that was not there last winter, round and satisfied beneath the bloodstains. She catches you looking and grins. "Quality control."' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Bess leans against the butcher block with her apron stained and her belly distended, cleaver resting beside her because she is too stuffed to lift it. She breathes slow and deep, eyes half-closed, a woman conquered by her own merchandise and not sorry in the slightest. Sawdust sticks to her sleeves. She looks like a feast that won an argument with a knife.' },
      { when: { stageMin: 10 }, text: 'Bess the Butcher is enormous — blood-stained apron stretched over a vast, meat-fed frame, shop feeling smaller when she turns. She still handles the knife like a whisper, still sells the best cuts to people she likes, still samples everything twice. The block was reinforced. So were the rumors. Bess does not care about rumors. She cares about marbling.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'Back again? Good. I saved you a cut — the good kind. Also saved myself a sample. Professional obligation.', weight: 2 },
      { when: { willingnessMin: 60, stageMin: 4 }, text: 'Don\'t hover. Either buy or tell me what you want off the block. Or feed me. I\'m open to negotiations.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 65 }, text: 'Now THAT was meat worth eating. You have taste. I respect taste. My belly respects it too.', weight: 2 },
      { when: { willingnessMin: 50 }, text: 'Solid. Filling. I\'ll remember you next time I\'m elbow-deep and starving.', weight: 2 },
    ],
    'npc.dialogue.selling': [
      { when: { stageMin: 4, reputationMin: 35 }, text: 'Best cuts go to people I like. You qualify. Barely. *wipes hands on apron* Want a sample? I\'m having one.', weight: 2 },
    ],
  },

  // ── NELL THE FISHMONGER ────────────────────────────────────────────────────
  nell_fish: {
    'npc.examine': [
      { when: { stageMax: 2 }, text: 'Nell the Fishmonger works her stall with quick hands and a sharper tongue, brine on everything she owns, frame lean and restless beneath oilskin. She fillets with one motion, haggles with the next, and eats only when no one is watching — a woman who sells abundance while wearing austerity like armor.' },
      { when: { stageMin: 3, stageMax: 4 }, text: 'Nell is softer than when you met her — still sharp-eyed, still sharp-tongued, curves pressing against oilskin that has been let out once. She fillets as fast as ever, but pauses now to breathe, to pat a hip that sways when she turns, to accept the honey cake a sailor offers without the old bite in her refusal. The harbor smells of salt. Nell smells of salt and satisfaction.' },
      { when: { stageMin: 5, stageMax: 8 }, text: 'Nell has grown very large, apron tight, arms still quick with the knife but cushioned now with plush flesh that shifts when she laughs. The harbor knows her by silhouette alone — pear-shaped, brine-scented, blocking half the stall with cheerful immovability. She fillets with one hand and waves customers with the other. Tide brings fish. Nell brings appetite. Both sell out.' },
      { when: { stageMin: 9 }, text: 'Nell is enormous — brine-scented, pear-shaped, a landmark on the pier who must sit to fillet the heavy catch and does not apologize for it. Her stall was widened. Her humor was not. She rules the harbor end of the market with a knife in one hand and a honey cake in the other, living proof that salt air makes everyone hungry if they stop pretending otherwise.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 4, reputationMin: 40 }, text: 'Fresh catch today — and you look like someone who appreciates fresh. Also someone who might share lunch. I\'m perceptive.', weight: 2 },
      { when: { willingnessMin: 55, stageMin: 5 }, text: 'Fish or gossip. I sell both. Today I\'d trade either for something fried and shameless.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 60 }, text: 'Mmm. That beats raw oyster and regret. Thank you. My hips thank you. They\'re vocal lately.', weight: 2 },
      { when: { willingnessMin: 45 }, text: 'Good. Warm. Not fish. High praise. ...I\'ll take seconds if you\'re offering.', weight: 2 },
    ],
    'npc.dialogue.harbor_tales': [
      { when: { stageMin: 4, reputationMin: 35 }, text: 'Tide brought in more than fish last week. Appetites follow the boats. I count on it — and on Tina\'s stew after close.', weight: 2 },
    ],
    'npc.dialogue.haggle': [
      { when: { stageMin: 5, reputationMin: 30 }, text: 'For you? A sliver off the top. Don\'t make me regret it — or make me hungry enough to eat the display.', weight: 2 },
    ],
  },

  // ── CORAL THE BALLROOM DANCER ──────────────────────────────────────────────
  coral_dancer: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Coral the Ballroom Dancer moves through the empty hall with light feet and lighter spirit, practicing alone between galas, gown swirling around a frame still slender enough to spin twice without breathing hard. Mirrors multiply her grace; they also multiply the hollow at her waist, the wrists fine as ribbon, the hunger she dances around rather than through.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Coral has filled out her dancing dresses considerably — bust swelling, hips widening, belly soft beneath satin that strains when she twirls. She spins slower now, but the smile is the same, brighter if anything, as if each new curve were a partner she finally accepted. The parquet creaks in sympathy. Coral laughs and keeps dancing.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Coral reclines on the ballroom steps with her gown straining, too full to waltz, humming a tune anyway — dreamy, stuffed, utterly at peace. Her hand rests on a belly rounded tight with canapés and defiance. The orchestra is gone. The kitchen is not. She looks like a woman who chose music and meringue in equal measure and regrets nothing.' },
      { when: { stageMin: 8 }, text: 'Coral is vast and graceful — or would be, if the floorboards agreed. She moves like a ship in calm water, slow and inevitable, satin reworked into something between gown and banner. Nobles whisper that she outgrew the last gala. Coral hears them and curtsies anyway, flesh shifting like waves, smile undimmed. She has stopped dancing for them. She dances for appetite now.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'Darling! The floor is empty but the music isn\'t — care for a turn? Or a tart? I recommend both. I recommend everything lately.', weight: 2 },
      { when: { willingnessMin: 60, stageMin: 4 }, text: 'One-two-three — oh, it\'s you. Don\'t step on the parquet. Step to the buffet with me instead.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 65 }, text: 'Divine. I could waltz on that feeling — slowly, very slowly, with many rests. Thank you, darling.', weight: 2 },
      { when: { willingnessMin: 50 }, text: 'Sweet. Literally. I\'m keeping you for the next gala. As my plus-one. And my pastry source.', weight: 2 },
    ],
    'npc.dialogue.noble_gossip': [
      { when: { stageMin: 4, reputationMin: 35 }, text: 'The last gala ended early. The kitchen did not. I drew conclusions. So did my corset. We\'re aligned.', weight: 2 },
    ],
    'npc.dialogue.offer_food': [
      { when: { stageMin: 5, willingnessMin: 60 }, text: 'A canapé? A tart? Darling, don\'t tease — place it in my hand and watch me disappear it with grace.', weight: 2 },
    ],
  },

  // ── SISTER AGNES THE CONFESSOR ─────────────────────────────────────────────
  agnes_confessor: {
    'npc.examine': [
      { when: { stageMax: 4 }, text: 'Sister Agnes the Confessor sits behind the lattice with gentle eyes and hands folded in her lap, habit hanging straight on a frame still spare enough to suggest devotion over indulgence. Her voice is soft as candle wax; her hearing is sharp as any confessor\'s. Pilgrims whisper sins; Agnes whispers absolution — and sometimes, when the hostel soup bell rings, you see her throat move in a swallow she did not intend you to notice.' },
      { when: { stageMin: 5, stageMax: 8 }, text: 'Agnes has grown large and serene behind the lattice, habit adjusted many times, flesh soft and pear-shaped beneath coarse wool. Forgiveness comes easier on a full stomach — she has learned this and stopped apologizing for it. When she leans toward the screen you hear her breathe, deep and slow, a woman whose body has joined her ministry in welcoming hunger without shame.' },
      { when: { stageMin: 9 }, text: 'Sister Agnes is enormous now — soft, pear-shaped, filling the confession booth like a blessing too large for the frame they built. Her voice remains gentle; her presence has become vast. Pilgrims confess appetite alongside sin and Agnes answers both with the same warmth. The lattice creaks when she shifts. She apologizes to no one for the sound.' },
      { when: { restrainedBy: 'hold_person' }, text: 'Agnes is frozen mid-blessing behind the lattice, one hand extended through the screen, the other resting on a belly that has grown too round for penitence alone. Her eyes are wide, embarrassed, still kind. She looks like mercy caught at the moment it became visible on her flesh — and chose not to look away.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 4, reputationMin: 40 }, text: 'Come, child. The lattice is open. What weighs on you — besides appetite? Both are welcome here.', weight: 2 },
      { when: { willingnessMin: 50, stageMin: 5 }, text: 'Speak softly. The shrine listens. So do I — especially when soup is mentioned.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 55 }, text: 'You have fed a hunger I pretended was only spiritual. I am grateful. The shrine does not blush. Neither do I. Not anymore.', weight: 2 },
      { when: { willingnessMin: 40 }, text: 'Thank you, child. Fullness is a kind of peace. I feel it settling — warmly, without guilt.', weight: 2 },
    ],
    'npc.dialogue.temple_sermon': [
      { when: { stageMin: 5, reputationMin: 35 }, text: 'Confession is hunger of the soul. I feed both kinds when I can — with words, with bread, with the honesty Margaret preaches and Patrice ladles.', weight: 2 },
    ],
    'npc.dialogue.friendly': [
      { when: { stageMin: 4, reputationMin: 40 }, text: 'You carry kindness. I hear it in how you treat the hungry — and I feel it when you remember I am hungry too.', weight: 2 },
    ],
  },

  // ── BRIGIT THE SMOKEHOUSE COOK ─────────────────────────────────────────────
  brigit_smoke: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Brigit the Smokehouse Cook tends the hams with hickory in her hair and patience in her hands, apple-shaped but still firm, apron crisp despite the heat. Smoke clings to her sleeves; judgment clings to her gaze when a ham is rushed. She samples rarely in front of strangers — professionalism, she says — but the cutting board shows crumbs she forgot to hide.' },
      { when: { stageMin: 4, stageMax: 5 }, text: 'Brigit is thick and permanent-smelling — apple-shaped, gruff, pleased with her work and with portions that have grown alongside her reputation. Her apron ties lower; her arms remain strong from turning hams that weigh less than she does now. When she presses a finger into cured meat she presses it into her own belly afterward, checking ripeness by comparison. Both pass inspection.' },
      { when: { stageMin: 6, stageMax: 9 }, text: 'Brigit has grown enormous, apron like a sail, still judging ham by patience and pressure while her own flesh ripens with equal care. The smokehouse was ventilated twice for her comfort. She did not ask. She would have. Hickory scents everything she owns; satisfaction scents everything she has become — vast, unhurried, immovable except when the bell for supper rings.' },
      { when: { stageMin: 10 }, text: 'Brigit is a mountain of hickory scent and flesh — smokemaster, immovable, the smokehouse built around her like a shrine to low heat and high appetite. She tends the hams from a chair now, belly resting on thighs that spread wide, hands still sure, voice still gruff, pride still absolute. Visitors call her a landmark. She calls herself well-cured.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'You\'re early. Good — the hams need tasting. Grab an apron. Grab a plate. I grabbed both already.', weight: 2 },
      { when: { willingnessMin: 55, stageMin: 4 }, text: 'Smoke in your lungs means you\'re close enough. What? I\'m busy. Busy eating. Join or leave.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 65 }, text: 'Mmm. Properly salted. Properly rich. You know what you\'re doing. My belly agrees — listen, it\'s humming.', weight: 2 },
      { when: { willingnessMin: 50 }, text: 'Not bad. Could use more smoke. Could use more of whatever that was. Same compliment.', weight: 2 },
    ],
    'npc.dialogue.cooking': [
      { when: { stageMin: 6, reputationMin: 35 }, text: 'Low and slow. That\'s ham. That\'s life. That\'s how I got this big — patience, heat, and never skipping a tasting.', weight: 2 },
    ],
  },

  // ── ROSA THE BAKER ─────────────────────────────────────────────────────────
  rosa_baker: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Rosa the Baker moves through her shop with flour in her hair and warmth in her voice, loaves cooling on every rack, arms strong but waist still narrow beneath a dusted apron. She hums while she kneads; she smiles when the oven sings. The bakery smells of yeast and possibility — and Rosa smells like both, a woman who feeds the town while tasting only what duty requires.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Rosa has grown plump and flour-dusted, sampling every batch with professional dedication that has become personal enthusiasm. Her hips sway when she carries trays; her belly presses against the counter when she leans to check the crust. She laughs more easily, eats without apology, and leaves thumbprints in dough that mirror the soft prints accumulating on her own middle.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Rosa sits on a flour sack with dusted white skin and a belly round and warm, smelling like yeast and satisfaction. Trays cool unattended; she cannot be bothered to stand. Her eyes are half-closed, smile slow, a woman who has eaten her own proofing and found it excellent. Crumbs dot her collar like constellations. She wears them proudly.' },
      { when: { stageMin: 8 }, text: 'Rosa is enormously soft — baker\'s arms, baker\'s belly, smile that could sell bread to the dead and probably has. The shop doorway was widened last spring. Officially for the ovens. Unofficially for Rosa, who fills the space like rising dough, vast and golden and impossible to ignore. Customers come for loaves. They stay for the warmth she radiates — literal and otherwise.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 40 }, text: 'Fresh from the oven — and you\'re just in time! Try the crust while it sings. I already ate two. Professional duty.', weight: 2 },
      { when: { willingnessMin: 65, stageMin: 4 }, text: 'I pulled a batch early for you. Well — for whoever asks nicely. That\'s you. Always you lately.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 60 }, text: 'Oh, that\'s lovely. Warm, sweet, filling — like my best brioche but with company. Thank you, dear.', weight: 2 },
      { when: { willingnessMin: 45 }, text: 'Mmm. You bake kindness. I\'ll remember that when I\'m elbow-deep in dough and still hungry.', weight: 2 },
    ],
    'npc.dialogue.market_banter': [
      { when: { stageMin: 5, reputationMin: 30 }, text: 'Bread sells when bellies rumble. I make sure they rumble — mine first, honestly. Fair advertising.', weight: 2 },
    ],
    'npc.dialogue.selling': [
      { when: { stageMin: 4, reputationMin: 25 }, text: 'Still warm. Still cheap. Still the best you\'ll get today — and I\'ll throw in an extra roll if you don\'t mention how many I\'ve eaten already.', weight: 2 },
    ],
  },

  // ── PORTIA THE GATE WARDEN ─────────────────────────────────────────────────
  portia_gate: {
    'npc.examine': [
      { when: { stageMax: 4 }, text: 'Portia the Gate Warden stands at the estate entrance with keys at her belt and iron discipline in her spine, uniform fitted to a body still lean enough to chase trespassers without wheezing. Her gaze weighs your worth before you speak; her posture says the countess\'s favor is earned, not assumed. She does not eat on duty. She does not smile on duty. She watches — always watches.' },
      { when: { stageMin: 5, stageMax: 8 }, text: 'Portia has grown heavy and stern, keys still jangling, gaze still sharp, uniform straining across a bust and belly that have joined her authority rather than diminished it. She moves slower but the gates feel narrower when she blocks them — broad, planted, immovable. Off-duty pastries exist. On-duty Portia pretends they do not. The uniform tells another story.' },
      { when: { stageMin: 9 }, text: 'Portia the Gate Warden is immense — uniform long surrendered to panels and pins, authority undiminished, flesh soft and vast beneath livery that gave up pretending. The estate gates feel narrower when she stands; visitors behave better without knowing why. She still weighs your worth with the same eyes. They are just rounder now, framed by a face that has accepted abundance like another regulation.' },
      { when: { restrainedBy: 'hold_person' }, text: 'Portia is frozen at attention before the gate, keys still jangling on a hip that has grown too wide for the old belt, face locked in outrage. Even paralyzed she looks like policy made flesh — unyielding, embarrassed, furious that you can see her mid-breath with a belly that refuses to suck in.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 45 }, text: 'You again. The countess mentioned you favorably. I\'ll allow it — and I\'ll allow you past if you don\'t mention the pastry incident.', weight: 2 },
      { when: { willingnessMin: 50, stageMin: 4 }, text: 'Invitation or business. No loitering at the gate. ...Unless you brought food. Policy is unclear on that.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 5, willingnessMin: 55 }, text: '...Acceptable. I was not hungry. My belt disagrees. Do not file a report.', weight: 2 },
      { when: { willingnessMin: 40 }, text: 'Adequate rations. I may revise gate policy to include you. Unofficially.', weight: 2 },
    ],
    'npc.dialogue.noble_gossip': [
      { when: { stageMin: 4, reputationMin: 35 }, text: 'I see who enters hungry and who leaves hungrier. The estate keeps secrets. I keep the gate — and a ledger of who brings cake.', weight: 2 },
    ],
    'npc.dialogue.warning': [
      { when: { stageMin: 5, reputationMax: -10 }, text: 'One step out of line and the gates close. I am larger now. You will hear them shut. Try me.', weight: 2 },
    ],
  },

  // ── PATRICE THE HOSTEL KEEPER ──────────────────────────────────────────────
  patrice_hostel: {
    'npc.examine': [
      { when: { stageMax: 3 }, text: 'Patrice the Hostel Keeper stirs the eternal pot with ladle in hand and kindness in her eyes, frame warm but still modest beneath a flour-dusted apron. Pilgrims pass through; soup simmers; Patrice tastes only what she must to keep the pot honest. Her smile is motherly, her portions for guests generous — her portions for herself, less so, though the hollow at her cheeks tells its own story.' },
      { when: { stageMin: 4, stageMax: 7 }, text: 'Patrice has grown soft and ample, ladling soup with practiced warmth, belly pressing against the pot when she leans to stir. She eats second now without apology — pilgrims first, Patrice second, always second but finally present. The hearth throws light on curves that were not there last winter; the hostel feels homier for them, as if abundance were another guest who decided to stay.' },
      { when: { fullness: 1, stageMin: 5 }, text: 'Patrice stirs the eternal pot with her belly resting against the ladle, motherly and utterly stuffed, cheeks flushed above a smile she cannot suppress. Pilgrims eat first. She ate second. She is considering thirds. The soup never ends; neither, lately, does her appetite — and she has stopped treating that as anything but blessing.' },
      { when: { stageMin: 8 }, text: 'Patrice is enormous — the hearth, the pot, and her frame compete for space in a hostel that was expanded twice to accommodate her. Pilgrims adore her; the soup never ends; her laughter shakes the ladles on the wall. She moves slow and sure, vast and warm, a living emblem of hospitality that finally turned inward. Margaret calls it devotion. Patrice calls it dinner.' },
    ],
    'npc.dialogue.greeting': [
      { when: { stageMin: 5, reputationMin: 45 }, text: 'Come in, come in — soup\'s on and there\'s room by the fire. Also room on my plate if you brought extras.', weight: 2 },
      { when: { willingnessMin: 70, stageMin: 4 }, text: 'You look hungry, dear. Sit. I\'ll ladle before you ask — and I\'ll join you. Fair\'s fair.', weight: 2 },
    ],
    'npc.dialogue.after_feeding': [
      { when: { stageMin: 4, willingnessMin: 65 }, text: 'Oh, bless you. That went straight to the places soup doesn\'t reach. I\'ll remember you in my prayers and my second helping.', weight: 2 },
      { when: { willingnessMin: 50 }, text: 'Food shared is food blessed. My belly agrees — it\'s singing hymns.', weight: 2 },
    ],
    'npc.dialogue.offer_food': [
      { when: { stageMin: 5, willingnessMin: 65 }, text: 'For the hostel? Or for me? ...Either way, yes please. Set it down before I ladle myself another bowl out of politeness.', weight: 2 },
    ],
    'npc.dialogue.cooking': [
      { when: { stageMin: 5, reputationMin: 30 }, text: 'The pot never empties because I never stop tasting. Occupational hazard — and occupational joy. My waistline is proof of quality control.', weight: 2 },
    ],
  },

};

export default EXPANSIONS;
