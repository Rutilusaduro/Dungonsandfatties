/**
 * Second relationship-arc pass for the core twenty leads.
 * Appended via mergePersonaBundles — relationship deepening beats only.
 */
import { buildArcTwo, mergeArcTwo, arcLine, arcExamine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(
  buildArcTwo('bella', {
    examine: [
      arcExamine(
        'Bella greets you from behind the bar with a warmth that has shed its first careful edges — she knows your usual, knows when you linger, and no longer pretends she has not saved you the corner stool. Her apron is flour-dusted, her hips softer than when you first wandered into the Bloated Boar, and when she leans across the wood to refill your bowl her smile says you belong here as much as the stew does.',
        ARC.warming,
      ),
      arcExamine(
        'The tavern feels like an extension of Bella now — and of you, when you are in it. She moves between tables with unhurried pride, belly swaying beneath a tied apron, calling Mira by name and swatting Tansy\'s hand away from the pie tray with fond exasperation. When her eyes find yours over the crowd, there is no performance left, only a woman delighted to share her hearth, her cooking, and the slow, sweet expansion of a life built around feeding people she loves.',
        ARC.bonded,
      ),
      arcExamine(
        'Bella has become the Bloated Boar\'s living promise — vast, radiant, utterly at home in her own abundance. She embraces you at the door when you arrive, soft arms and warmer belly, whispering that the kitchen saved the crust ends because she knew you would come hungry. Regulars cheer when she sits beside you instead of working the bar. She laughs, blushes, does not get up. You would not ask her to. This is what trust tastes like here: shared plates, shared appetite, shared pride in every generous inch.',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'There you are, dear — I told Mira you\'d show, and I told Tansy to stop drinking your portion. Come sit. The stew knows your name now.',
        ARC.bonded,
      ),
      arcLine(
        'Welcome home to the Boar. I\'ve got your bowl, your seat, and absolutely no shame about how much we\'re both planning to eat tonight.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh, sweetheart... you always know exactly what I need. *rests a hand on her middle, eyes soft* Stay awhile. Let me be full and happy with you.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'That was perfect. I feel enormous and adored and I refuse to apologize for either. Thank you for feeding me like I matter.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          'Tansy swears the Boar is changing her into a legend. Mira says it\'s changing her into a woman who stays. I say we\'re all becoming who we were meant to be — fuller, louder, loved. Pull up a chair and prove me right.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('silvia', {
    examine: [
      arcExamine(
        'Silvia still counts every coin, but she counts you among her assets now — a customer whose taste she trusts, whose visits she anticipates without admitting it aloud. Her merchant\'s coat fits snug across new curves; when she offers you candied figs from beneath the counter her fingers brush yours a beat longer than commerce requires. Caution remains in her sharp eyes. Warmth has joined it.',
        ARC.warming,
      ),
      arcExamine(
        'Silvia\'s stall has become a private market within the square — for you, at least. She keeps a stool behind the counter now, plush and scandalous, and sits when you visit, patting her belly with the satisfaction of a woman who has stopped treating appetite as a ledger loss. She quotes prices softer. She samples luxury goods openly. When she says your name, it sounds like profit and fondness finally reconciled.',
        ARC.bonded,
      ),
      arcExamine(
        'Silvia greets you the way nobles greet heirs — with ceremony, with sweets, with the unabashed display of a merchant who has chosen one relationship worth more than margin. Her body is lavish now, fabrics draped over softness she no longer hides, and she pulls you behind the stall to share a crate of glazed dates without looking over her shoulder. "Our arrangement," she murmurs, feeding you one. "Exclusive. Mutual. Delicious."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'My favorite investment has arrived. Sit — I acquired something decadent and I require your opinion. Also your company. Professional.',
        ARC.bonded,
      ),
      arcLine(
        'For you, no counters, no ledgers — only candied figs, warm conversation, and the pleasure of watching us both grow softer on excellent goods.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Exceptional. I would not share that with another soul in this square. *touches your wrist* You understand value — in food and in trust.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'You feed me like I am worth the expense. I am. *smiles, belly rising with a slow breath* Stay. Let me be indulgent with someone who earned it.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      selling: [
        arcLine(
          'This batch is reserved for discerning palates. Yours, specifically. I tasted every crate — thorough quality control — and thought of you with each bite.',
          ARC.warming,
        ),
      ],
      haggle: [
        arcLine(
          'You want a better price? You already have it. What you offer me is taste, loyalty, and the rare gift of someone who does not judge a woman for enjoying her own merchandise.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('gregg', {
    examine: [
      arcExamine(
        'Gregg rises from the beds when they see you, brushing soil from knees that have grown thicker with the seasons. Their smile is unguarded now — no longer merely serene, but glad. A basket waits at your feet, heavy with zucchini and honeycrisp apples, picked before you arrived. "I thought you might stay," they say, voice low as compost. The garden holds its breath with them.',
        ARC.warming,
      ),
      arcExamine(
        'The Gardener walks you through rows that have widened as they have, pointing out pumpkins that mirror their own roundness with quiet delight. Their hand finds yours at the gate, calloused and warm, guiding you to the shade where they keep a blanket and a picnic they pretend is spontaneous. Growth, they murmur, is better shared. Their belly rises when they laugh. So does yours, eventually.',
        ARC.bonded,
      ),
      arcExamine(
        'Gregg waits for you at the garden\'s heart like a hill wearing overalls — vast, rooted, radiant. Paths were widened for wheelbarrows and for them; you are the reason they smile before you speak. They pull you down into the grass beside their enormous, peaceful frame, fruit in one hand, your fingers in the other. "Everything ripens," they whisper. "Even trust. Especially appetite."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'You returned. The zucchinis are glad — so am I. Sit. I saved the sunniest patch and the sweetest apples for us.',
        ARC.bonded,
      ),
      arcLine(
        'Welcome back to the soil, friend. I have grown too large for quick rising — stay with me awhile and grow slower, fuller, happier.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Like rain after drought — deep, slow, grateful. Thank you for nourishing what I was afraid to show anyone.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'I feel rooted in you. *hand on belly, eyes closed* Feed me again when the season turns. I will always make room.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          'I used to grow for the town alone. Now I grow for us — melons heavy enough to share, herbs for tea we drink thigh to thigh in the shade. The garden approves.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('cassandra', {
    examine: [
      arcExamine(
        'Captain Cassandra still stands at attention when she sees you — habit, armor, pride — but her eyes soften a fraction before discipline reasserts itself. She has begun to let you past the wall without a full interrogation. Her uniform strains where softness has earned its place; she does not adjust it when you are near. That is trust, from her. It arrives like a salute: brief, exact, meaningful.',
        ARC.warming,
      ),
      arcExamine(
        'Cassandra meets you off the parade route now, jacket unbuttoned, pastry crumbs betraying an off-duty woman rather than a statue. She sits when you sit — a concession that once would have been unthinkable — and talks about patrols, bakeries, the town\'s safety with less performance and more breath. Her hand brushes yours when she laughs, then retreats, then returns. She is learning warmth the way she learned command: thoroughly.',
        ARC.bonded,
      ),
      arcExamine(
        'Cassandra waits for you at the post with armor loosened and pride intact, enormous and unapologetic, a fortress that chose one person to enter without siege. She feeds you from her own ration tin — an intimacy no medal could match — and leans her heavy shoulder against yours when the square empties. "You have my back," she says quietly. "And my appetite. Guard both well."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'At ease. I cleared ten minutes — twenty if you brought food. Do not make me regret trusting you with my schedule.',
        ARC.bonded,
      ),
      arcLine(
        'You. Good. Sit with me. I am off duty, overstuffed, and unwilling to pretend I do not enjoy your company. That is an order.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        '...Sufficient. More than sufficient. *exhales, belt creaking* You may feed me again. Off the record. That is not weakness. It is trust.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'I would not let another soul see me like this — full, content, undone. You earned that view. Guard it.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          'You stood your ground when others fled. I remember. I also remember who brings rations without asking for praise. You are under my protection — and my table.',
          ARC.bonded,
        ),
      ],
      warning: [
        arcLine(
          'I warn because I care now. Cross the line and I will still haul you in — but I would rather buy you dinner and keep you honest. Choose wisely.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('gertrude', {
    examine: [
      arcExamine(
        'Gertrude still commands the kitchen like a battlefield, but you are no longer civilian — you are the taster she trusts with hot sauce, the guest who may cross the line without a ladle threat. Her coat buttons strain; butter gleams at her collar. When Amelie hurries past with a tray, Gertrude barks orders, then murmurs to you that the girl has promise and a sweet tooth worth cultivating. Pride and appetite share her face now.',
        ARC.warming,
      ),
      arcExamine(
        'The kitchen quiets when Gertrude pulls you to the stove — not from fear, but respect for something intimate. She feeds you from the spoon herself, eyes fierce and fond, belly pressed against the counter as she leans in to watch your reaction. Amelie pretends not to look. Gertrude does not care. "Mine," she says of the recipe — and perhaps of the moment.',
        ARC.bonded,
      ),
      arcExamine(
        'Gertrude receives you from her reinforced stool like a queen in a domain of steam and sin — immense, magnificent, apron stained with the evidence of a life lived in butter. She pats the seat beside her without asking. Two plates wait. "We eat," she declares. "Together. No apologies. No spectators." The kitchen obeys. So do you. Bliss follows.',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Finally! I saved the beurre blanc and a stool. Sit. Tell me everything while I pretend I am not starving for company and cream.',
        ARC.bonded,
      ),
      arcLine(
        'My favorite appetite has arrived. The kitchen is yours. So is the second helping. So am I, for the next hour. Cook with me. Eat with me. Grow with me.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Sublime. You feed me like a peer, not a pupil. *kisses fingertips, then your knuckles* Rare praise. Deserved.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'I am enormous, satisfied, and embarrassingly fond of you. Do not make me say it twice. Feed me again when the ovens cool.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Fat carries flavor. Flavor carries joy. Joy carries weight. I teach Amelie the technique and you the truth — excellence requires appetite, shared without shame.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('mira', {
    examine: [
      arcExamine(
        'Mira saves your stool before you ask — not the wobbly one, the good one, angled toward the fire. She has stopped pretending she does not watch the door for you. Curves spill softly over the rail; her shawl slips when she leans close to speak, voice lower than the tavern noise. Bella passes a bowl without comment. Mira blushes, accepts, shares it with you without looking away.',
        ARC.warming,
      ),
      arcExamine(
        'Mira\'s corner of the Boar has become yours together — two stools pushed near, plates that arrive in pairs, laughter that loses its wistful edge when your knee brushes hers beneath the bar. She talks about empty glasses less and full plates more. When she rests her head on your shoulder, it feels like a confession she no longer needs to make aloud.',
        ARC.bonded,
      ),
      arcExamine(
        'Mira glows in her reinforced corner — enormous, unhurried, finally fed in every sense that mattered. She pulls you onto the wider stool with both hands, belly warm against your side, and whispers that Bella knows, Tansy cheers, and she does not care who sees her happy. "Stay until I cannot move," she murmurs. "Stay longer."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'You came. I was afraid you\'d forget the quiet nights. Sit — I ordered for two and I want you to help me finish.',
        ARC.bonded,
      ),
      arcLine(
        'There you are. My favorite reason to stay past closing. Come be full with me. I saved the softest cushion and the last tart.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'That went exactly where I needed it to — deep, warm, safe. Thank you for seeing the hunger I hid for years.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'I feel held and stuffed and seen. *eyes shining* You are dangerous to my waistline and essential to my heart. Do not stop.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          'Bella says I smile different when you walk in. She\'s right. I used to come here thirsty. Now I come here home.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('tansy', {
    examine: [
      arcExamine(
        'Tansy bellows your name across the Boar before you reach the door — affection disguised as spectacle. She has stopped performing alone. Her mug still never empties, but her other hand reaches for you, pulls you into the warmth of her new curves, declares to the room that you are hers for the evening. Bella rolls her eyes fondly. Mira raises a glass. Tansy does not lower her voice. She never will.',
        ARC.warming,
      ),
      arcExamine(
        'Tansy holds court with you at her side like a coronation — plates stacked, laughter loud, belly proud beneath a laced bodice she stopped pretending fits. She feeds you from her fork without asking, wipes gravy from your chin with her thumb, dares anyone to comment. This is trust in Tansy\'s language: public, defiant, tender beneath the noise.',
        ARC.bonded,
      ),
      arcExamine(
        'Tansy is a celebration when you arrive — vast, triumphant, the tavern bending around her joy. She lifts you into a hug that leaves you breathless and her groaning happily, then sits you both down to a feast she ordered in advance. "We earned this," she shouts. "Every pound. Every bite. Especially with you." The room toasts. You do not resist. Why would you?',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'THERE you are! I saved seats, plates, and dignity — well, two out of three. Get over here and eat like we mean it.',
        ARC.bonded,
      ),
      arcLine(
        'My favorite partner in crime and calories! The night is young, my belt is doomed, and I want you glued to my side until they kick us out.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'YES. That is love in edible form. *belly patted proudly* You know me. You feed me. You stay. Good human.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'I am stuffed, loud, and stupidly happy because of you. Write that on my grave. Better — feed me again tomorrow.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          'Mira says I\'m softer since you started coming around. I say we\'re all softer — and louder — and better fed. She didn\'t argue. Drink to that.',
          ARC.warming,
        ),
      ],
      offer_food: [
        arcLine(
          'If you are offering, I am accepting — and I am pulling you into the booth with me. Do not bring one portion. Bring shameless amounts.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('lenna', {
    examine: [
      arcExamine(
        'Lenna off duty still sits like she is on parade, but she saves the chair across from her when she sees you coming — a tiny rebellion. Her jacket hangs open over curves she no longer starves into discipline. She will not mention it. She will slide a pastry toward you with stiff fingers that soften when you take it. Cassandra\'s name does not come up. You do not need it to.',
        ARC.warming,
      ),
      arcExamine(
        'Lenna meets you where the guards do not look — bakery corner, hostel steps, anywhere rank can loosen. She eats in front of you now without apology, licking sugar from her thumb, watching your face for judgment and finding none. Her laugh is rare and real. Her hand stays on yours a second longer each visit.',
        ARC.bonded,
      ),
      arcExamine(
        'Lenna waits for you with uniform discarded, corset surrendered, belly soft and bare in civilian clothes that finally tell the truth. She pulls you into an alley kiss cool with shame and hot with relief, then feeds you the pastry she claimed was only hers. "I trust you," she whispers. "Do not make me regret it. ...Feed me again."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        '...You. Off duty. I saved twenty minutes and a cinnamon roll. Sit before I change my mind about being nice.',
        ARC.bonded,
      ),
      arcLine(
        'I am not on the clock. I am hungry. I am yours for the evening if you brought food and silence about my waistline.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Acceptable. More than acceptable. *looks away, cheeks pink* Do not tell Cassandra. Do not stop feeding me.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'I would never admit this to the post — I feel safe and full with you. That is worth more than rank.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          'You bring food without strings. You do not mock me when my uniform creaks. That is loyalty. I return it.',
          ARC.bonded,
        ),
      ],
      warning: [
        arcLine(
          'I warn you because I care now. Behave — or I drag you in gently and feed you after. Your choice.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('gwen_market', {
    examine: [
      arcExamine(
        'Gwen\'s whistle still commands the square, but it trills once for you — a private signal above the noise. She leaves her ledger to walk your cart personally, broad hips swaying between stalls, sampling honey cakes with the authority of a woman who has stopped pretending she does not enjoy her own rule. Merchants watch. Gwen does not hurry. You are worth the spectacle.',
        ARC.warming,
      ),
      arcExamine(
        'Gwen pulls you behind stall seven — your stall, she still insists — and sits on a crate that groans kindly beneath her weight. She feeds you market cherries from her palm, juice on her fingers, eyes warm beneath the sharpness. "My square," she says. "My appetite. My favorite customer." The whistle stays in her pocket. That is trust.',
        ARC.bonded,
      ),
      arcExamine(
        'Gwen meets you at dawn before the vendors arrive, enormous in her apron, the market hers and yours in the empty hush. She spreads a feast across two tables — every stall\'s best — and eats beside you without counting coins or calories. "We run this square," she murmurs, belly against your arm. "Together. Full. Proud."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'My favorite customer — stall seven\'s ready and so am I. Walk with me. I\'ll sample everything twice.',
        ARC.bonded,
      ),
      arcLine(
        'Market\'s ours today. Bring appetite. I brought curves and zero regrets. Let\'s eat like landlords.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Market-grade excellence. I\'d license you — and I\'d feed you back. *pats belly* Stay in my square awhile.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'You fill me like fair trade should — generously, honestly. I am vast and grateful. Do not go far.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      market_banter: [
        arcLine(
          'Coin follows appetite — mine, yours, the whole square\'s. Fifteen years I\'ve said it. Now I prove it beside you at every stall.',
          ARC.warming,
        ),
      ],
      selling: [
        arcLine(
          'I curate for you like royalty. Best honey cakes, best company, best reason my belt keeps losing the fight.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('margaret_priestess', {
    examine: [
      arcExamine(
        'High Priestess Margaret greets you at the shrine door with hands that no longer hesitate before touching your shoulder — a benediction become habit. Her robes have been let out again; silver hair catches the candlelight as she walks you toward the side table where bread waits, still warm from Patrice\'s hostel pot. Hope nods from the pilgrim benches. Margaret sees only you.',
        ARC.warming,
      ),
      arcExamine(
        'Margaret receives you in the shrine\'s private alcove — velvet cushion, low table, honesty without audience. She eats with you now, slowly, serenely, each bite a sermon on abundance she once preached and now practices. Her belly rises beneath silk; her voice softens when she says your name like a prayer answered with appetite.',
        ARC.bonded,
      ),
      arcExamine(
        'Margaret waits before the altar in full splendor — enormous, radiant, a living doctrine of shared indulgence. She draws you into an embrace that smells of incense and fresh bread, whispers that Patrice knows, Hope smiles, and the shrine blesses fullness without shame. "Stay," she murmurs against your hair. "Grow with me. Thank God together."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Welcome, beloved child of the table. Patrice sent soup. I saved the crust and the hour — sit with me.',
        ARC.bonded,
      ),
      arcLine(
        'The shrine is open. So is my heart. So is the second bowl. Come — let us be grateful and gloriously full.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'You feed body and spirit alike. I feel blessed — and heavy — and unashamed. Stay while the candles burn.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'This is communion I was afraid to want. *hand over belly, eyes closed* Thank you. Feed me again when the pilgrims sleep.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      temple_sermon: [
        arcLine(
          'Hope asked why I smile during service now. I said abundance shared is abundance doubled. Patrice ladles proof. You bring it to my table.',
          ARC.warming,
        ),
      ],
      friendly: [
        arcLine(
          'You treat the hungry with dignity — including me, when I finally admitted I was hungry. I see you. I am glad.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('mirabel_countess', {
    examine: [
      arcExamine(
        'Mirabel receives you in the parlor with less fan and more honesty — corset loosened one lace for you alone. Dottie\'s footsteps fade down the hall; Camille\'s wine tray waits untouched. The Countess pats the settee beside her, silk whispering over new softness. "Bella spoke well of you," she says. "I find I agree. And I find I am hungry for agreement."',
        ARC.warming,
      ),
      arcExamine(
        'Mirabel shares the parlor like a secret — pastries between you, pearls loose at her throat, laughter unguarded when crumbs fall on velvet. She tells you Dottie smuggles cream puffs; Camille pretends not to notice. Her hand finds yours over the plate. Scandal, she murmurs, is simply trust wearing better jewelry.',
        ARC.bonded,
      ),
      arcExamine(
        'Mirabel awaits you in regal disarray — gown unlaced, belly splendid, fan discarded. Portia looked the other way at the gate. Dottie posted guards at the kitchen. The Countess pulls you down into cushions and feeds you éclairs without performance left. "My darling indulgence," she purrs. "Let the estate whisper. I have you."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Ah — you. Dottie cleared the parlor. Camille chilled the wine. I chilled my propriety. Enter.',
        ARC.bonded,
      ),
      arcLine(
        'My favorite scandal in sensible shoes. Come — corset\'s surrendered, pastries are warm, and I want you beside me all afternoon.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Exquisite. I shall pretend decorum remains. We both know I want another — and your company for it.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'You ruin me beautifully. *fan forgotten, belly rising* Keep ruining. I have pearls and appetite and no regrets.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      noble_gossip: [
        arcLine(
          'Dottie says the kitchen works harder when you visit. Camille blushes. I say the estate finally feels lived in — generously, wickedly, well.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('morgan_captain', {
    examine: [
      arcExamine(
        'Captain Morgan\'s cabin door is open before you knock — charts pushed aside, rum poured for two, stew from Nell\'s stall steaming on the desk. She rises slower than she once did, coat straining, grin sharp as a cutlass. "Trusted company," she says. "Rare ashore. Sit. Tell me everything worth feeding."',
        ARC.warming,
      ),
      arcExamine(
        'Morgan shares her berth like a captain shares tide — inevitably, warmly, with room made for your knees against hers beneath the table. She talks of Nell\'s catch, Sal\'s gossip, voyages that end heavier than they begin. Her palm cups your wrist when you pass bread. The harbor noise fades. Provisioning, she calls this. You call it home.',
        ARC.bonded,
      ),
      arcExamine(
        'Morgan waits at the pier with the town behind her and appetite before her — enormous, weathered, magnificent. She hauls you aboard without ceremony, feeds you ship\'s stew and harbor honey cakes until you both groan, laughs like thunder when her belly brushes yours. "My first mate," she booms. "My table. My tide. Stay moored awhile."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Back ashore — good. Nell sent fish. Sal sent rumors. I saved appetite for you. Board my cabin.',
        ARC.bonded,
      ),
      arcLine(
        'Captain\'s orders: sit, eat, drink, stay until we\'re both too full to sail. I like giving orders you obey.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Now that\'s provisioning. *belly patted, eyes warm* You\'d make any crew loyal. I already am.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Full belly, full trust, best mate ashore. Do not vanish on the tide — feed me again before I sail.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      harbor_tales: [
        arcLine(
          'Sal says the pier\'s softer since we started sharing stew. Nell winks. I say a captain feeds her people — starting with you.',
          ARC.warming,
        ),
      ],
      friendly: [
        arcLine(
          'You\'d make a fine first mate — rations, temper, pudding. I trust you at my back and across my table.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('bess_butcher', {
    examine: [
      arcExamine(
        'Bess wipes her cleaver and sets it down when you enter — not for everyone, just you. Blood to the elbows, blunt smile softer at the edges. She leans against the block, hips wider than last season, and nods toward a cut wrapped in paper. "Saved it," she says. "Good marbling. Like me lately." Trust in Bess sounds like a transaction you both won.',
        ARC.warming,
      ),
      arcExamine(
        'Bess locks the shop door behind you — customers can wait — and feeds you sliced roast from the blade\'s dull side, standing close enough that her apron brushes your chest. She talks with her hands, belly shifting, pride in every pound she carries. "You get the good stuff," she grunts. "People I feed. People I keep."',
        ARC.bonded,
      ),
      arcExamine(
        'Bess receives you after hours with the block scrubbed and a feast of her own merchandise spread wide — enormous, bloodless now, apron tied beneath a belly she pats like a prize hog. She sits you both on crates, pours ale, insists you eat until neither can stand. "My person," she says, rare and rough. "My favorite appetite."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Back again. Good. I saved a cut — and a stool. Sit. Eat. Don\'t make me sentimental.',
        ARC.bonded,
      ),
      arcLine(
        'Shop\'s closed. Belly\'s open. You\'re mine for the evening — meat, ale, and honesty.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'That was meat worth loving. *slow grin* You feed me right. I remember who to carve thick for.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Stuffed solid. Trusted solid. Do not go hungry without me — I\'ll take it personal.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      selling: [
        arcLine(
          'Best cuts go to people I trust. You get the marbled ones — and the truth about how good they make me feel.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('nell_fish', {
    examine: [
      arcExamine(
        'Nell spots you down the pier and waves with the hand not holding a fillet knife — brine on her sleeve, hips swaying wider than when you first haggled. She slides a honey cake from under the counter, oily paper warm. "For you," she says, trying for casual and failing. "Tide\'s good. Company\'s better."',
        ARC.warming,
      ),
      arcExamine(
        'Nell closes her stall early when you visit, sits on crates with you watching the boats, feeds you fried catch she "was not going to sell anyway." Morgan\'s laugh carries from the cabin; Sal shouts across the pier. Nell only hears your voice. Her shoulder fits beneath yours like it belongs there.',
        ARC.bonded,
      ),
      arcExamine(
        'Nell waits at the pier\'s end — enormous, pear-shaped, the harbor\'s landmark and your favorite confession booth. She pulls you into the oilskin smell of her embrace, belly soft against you, whispers that the sea can wait. Fish can wait. She cannot wait to share another meal and the proud weight of a woman finally fed.',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Fresh catch — and fresh gossip. But first: sit. I saved fried things and a view of the tide with you.',
        ARC.bonded,
      ),
      arcLine(
        'You\'re my favorite haul today. Stall\'s closed. Belly\'s open. Tell Morgan nothing. Tell me everything.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Mmm. Warmer than harbor wind. *licks salt from her lip* You know how to feed a woman. I trust you with that.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Full, happy, yours for the afternoon. Feed me again when the tide turns — I\'ll be waiting, wider and grateful.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      harbor_tales: [
        arcLine(
          'Sal swears Morgan\'s getting softer. I swear the pier\'s getting happier. Coincidence? Sit and eat while we decide.',
          ARC.warming,
        ),
      ],
      haggle: [
        arcLine(
          'For you? No haggle. Just fair price and extra portion — you paid in trust already.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('coral_dancer', {
    examine: [
      arcExamine(
        'Coral meets you on the empty ballroom floor with music humming in her throat and a gown that strains when she curtsies — for you, not the nobles. Mirrors multiply her smile. She offers her hand, then a tart from the tray someone left backstage. "Dance later," she murmurs. "Eat now. With me."',
        ARC.warming,
      ),
      arcExamine(
        'Coral dances slow with you alone — one-two-three, belly brushing your palm when she turns, laughter breathless and honest. She has stopped apologizing for the creak in the parquet. Portia would scold. Mirabel would understand. Coral chooses understanding and second helpings, spinning into your arms until the orchestra is only memory.',
        ARC.bonded,
      ),
      arcExamine(
        'Coral reclines on the ballroom steps in satin reworked to glory — vast, dreamy, a ship at rest. She pulls you down beside her, feeds you meringues between kisses of powdered sugar, declares the gala can wait forever. "My partner," she sighs, stuffed and shining. "My feast. My favorite finale."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Darling! The floor is ours — music, tart, and absolutely no calorie counting. Take my hand. Take a bite.',
        ARC.bonded,
      ),
      arcLine(
        'One-two-eat — you\'re here, I\'m enormous, the kitchen left trays. Waltz with me into glorious indigestion.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Divine. I could float — slowly, with rests — and only in your arms. Thank you, darling.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Stuffed, adored, still dancing inside. Keep me — and keep feeding me after the music stops.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      noble_gossip: [
        arcLine(
          'Mirabel says the ballroom misses my waistline. I say it misses joy. You bring both back whenever you visit.',
          ARC.warming,
        ),
      ],
      offer_food: [
        arcLine(
          'Place it in my hand and watch it disappear with grace — and watch me pull you down to share the next one.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('agnes_confessor', {
    examine: [
      arcExamine(
        'Sister Agnes opens the lattice before you speak — a habit now, not duty. Candlelight softens the wool stretched over her curves; her voice is lower, meant for you alone. Patrice\'s soup bowl waits on the stool beside her. "Child," she murmurs, "I saved you absolution and supper. Both are warm."',
        ARC.warming,
      ),
      arcExamine(
        'Agnes confesses appetite now the way others confess sin — quietly, then with relief. She eats across from you in the booth after hours, habit hitched, belly round, fingers brushing yours over bread. Margaret knows. Patrice ladles. Agnes no longer pretends she is only spirit.',
        ARC.bonded,
      ),
      arcExamine(
        'Agnes receives you in the shrine when the candles are low — enormous, gentle, filling the confession booth like mercy made flesh. She draws you through the lattice, not for sin but for supper, whispers forgiveness against your temple, feeds you until you both sigh. "Stay," she breathes. "Be full with me. God does not mind."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Come, beloved. The lattice is open — and so is Patrice\'s pot. Sit. Tell me hunger. I will answer with bread.',
        ARC.bonded,
      ),
      arcLine(
        'Peace, child — and plenty. I want you beside me, stuffed and unashamed, until the shrine bells ring.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'You fed a hunger I hid behind prayer. I am grateful — and heavy — and honest now. Stay.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Fullness is peace. You are peace. *hand on belly* Bless you for not looking away when I grew visible.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      temple_sermon: [
        arcLine(
          'Margaret preaches abundance. Patrice ladles it. I confess I finally believe — especially when you sit with me to eat.',
          ARC.warming,
        ),
      ],
      friendly: [
        arcLine(
          'You remember I am hungry too. That kindness is rarer than saints. I keep you in my prayers — and my second bowl.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('brigit_smoke', {
    examine: [
      arcExamine(
        'Brigit waves you into the smokehouse with a grease-stained hand — hickory thick in the air, hams swinging, her apron tied low over new softness. She does not smile often. She smiles for you. A plate of sliced ham waits on the cutting board. "Taste," she grunts. "Tell me truth. Then stay out of the draft."',
        ARC.warming,
      ),
      arcExamine(
        'Brigit sits on her stool with you perched on an upturned crate, sharing ham straight from the knife, talking low about heat and patience and how both ripened her. Her belly presses against her thighs — vast, proud, smelling of applewood. She feeds you the fatty edge without asking. That is love in Brigit\'s tongue.',
        ARC.bonded,
      ),
      arcExamine(
        'Brigit clears the smokehouse at dusk for you alone — hams forgotten, fire banked, her enormous frame the warmest thing in the room. She pulls you between her knees, feeds you until your hands rest on her belly, grunts that you are hers for the night. Hickory and satisfaction cling to everything. So does trust.',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'You\'re early. Good. Hams need tasting — so do I. Grab a plate. Grab a seat on my good side.',
        ARC.bonded,
      ),
      arcLine(
        'Smokehouse is closed. Belly\'s open. Sit with me until we\'re both too cured to move.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Properly rich. Properly trusted. *slow nod* You can come back when the fire\'s low. I\'ll save the fat.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Full. Warm. Yours. Do not make me say it pretty. Feed me again tomorrow.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Low and slow — ham, trust, this belly. You understand patience. Sit. Taste what we ripened together.',
          ARC.warming,
        ),
      ],
    },
  }),

  buildArcTwo('rosa_baker', {
    examine: [
      arcExamine(
        'Rosa\'s bakery smells like yeast and welcome — and like you, now that she pulls the tray from the oven when your shadow crosses the door. Flour dusts her cheeks and the swell of her bosom; she offers you the first roll, still singing, hips swaying to an oven timer only she hears. "I was hoping," she says, simple as proofing dough.',
        ARC.warming,
      ),
      arcExamine(
        'Rosa locks the front door at your nod, flour on the counter and butter on her fingers, and feeds you warm brioche from her palm. She sits beside you on sacks that groan kindly, belly soft against your arm, talking about crust and courage while the market square quiets outside. Gwen\'s whistle fades. Rosa hears only your laugh.',
        ARC.bonded,
      ),
      arcExamine(
        'Rosa meets you in the bakery after midnight — enormous, golden, dusted white head to soft toe. Trays cover every rack for you alone. She pulls you onto flour sacks, feeds you until the oven cools and your hands know every curve of her apron. "My favorite rising," she whispers. "Stay until we double again."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Fresh from the oven — and you\'re right on time. I pulled extra rolls. Sit. Eat warm with me.',
        ARC.bonded,
      ),
      arcLine(
        'Door\'s locked, dough\'s proofing, and I want you fat and happy before sunrise. My bakery. Our feast.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh, lovely — sweet, warm, safe. *floury hand on yours* You bake kindness into everything you feed me.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'I am round and ruined and grateful. Stay. Let me feed you back when I can stand.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      market_banter: [
        arcLine(
          'Gwen says my bellies sell bread best — mine and my customers\'. I say love rises like dough. You prove it daily.',
          ARC.warming,
        ),
      ],
      selling: [
        arcLine(
          'Still warm. For you, extra rolls and no pretending I haven\'t eaten half the batch already. Honesty is our deal.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('portia_gate', {
    examine: [
      arcExamine(
        'Portia unlocks the side gate before you reach the main arch — policy bent, not broken, for you alone. Keys jangle at a hip grown broader; uniform strains when she turns. Mirabel\'s parlor light glows beyond. Portia\'s eyes hold yours a beat longer than duty requires. "Proceed," she says. "And... welcome back."',
        ARC.warming,
      ),
      arcExamine(
        'Portia walks the estate perimeter with you at dusk, off duty, pastry crumbs on her glove — scandalous, permitted. She talks of who enters hungry, who leaves fuller, which servants smuggle cream. Dottie salutes. Portia almost smiles. Her hand brushes yours at the gate. "You are on the list," she murmurs. "Permanently."',
        ARC.bonded,
      ),
      arcExamine(
        'Portia waits at the gate in livery surrendered to panels and pins — immense, immovable, authority softened only for you. She pulls you into the guardhouse, locks the door, feeds you Mirabel\'s smuggled tart with stern tenderness. "Mine to admit," she whispers. "Mine to feed. Mine to trust with this belly."',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'You again. Good. Gate\'s open — and I saved a tart Dottie will deny. Enter. Briefly off protocol.',
        ARC.bonded,
      ),
      arcLine(
        'Side gate. No ledger. Just you, me, and whatever the kitchen smuggled. Sit. Eat. I\'ll guard your seconds.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        '...Acceptable. More than acceptable. *belt creaks* Do not file a report. Do file another visit.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Full. Trusted. Improper. I would not trade this for any regulation. Feed me again off the books.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      noble_gossip: [
        arcLine(
          'Mirabel enters happier when you\'re expected. Dottie knows. I know. The estate\'s best secret is appetite shared without shame.',
          ARC.warming,
        ),
      ],
      warning: [
        arcLine(
          'I warn because I care now. Cross me and the gate closes — open it again with pastry and repentance.',
          ARC.bonded,
        ),
      ],
    },
  }),

  buildArcTwo('patrice_hostel', {
    examine: [
      arcExamine(
        'Patrice meets you at the hostel door with ladle still in hand and warmth already in her eyes — pilgrims fed, pot simmering, a bowl set aside before you ask. Her apron stretches over softness earned ladling for others first and herself, finally, second. "Come in, dear," she says. "The fire knows you."',
        ARC.warming,
      ),
      arcExamine(
        'Patrice saves the bench by the hearth for you after the pilgrims sleep — two bowls, one spoon between you when shame feels too far away. Margaret\'s blessing lingers on the wall; Hope snores softly upstairs. Patrice\'s knee touches yours. Her belly rises with contentment and confession alike. "Stay," she murmurs. "Let me be fed too."',
        ARC.bonded,
      ),
      arcExamine(
        'Patrice closes the hostel for an hour that belongs to you — enormous, motherly, the pot and her body competing for space. She ladles until you both cannot stir, pulls you against her vast warmth, whispers prayers of thanks into your hair. Agnes would approve. Margaret does. Patrice simply feeds you both until love feels measurable in inches.',
        ARC.culmination,
      ),
    ],
    greetings: [
      arcLine(
        'Come in, beloved — soup\'s on, pilgrims are fed, and I saved the hearty bits for us by the fire.',
        ARC.bonded,
      ),
      arcLine(
        'Hostel\'s yours tonight. Ladle\'s mine. Belly\'s ours. Sit until we\'re both too full to bless anyone.',
        ARC.culmination,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh, thank you — that reached places soup alone cannot. *hand on belly* Stay while the hearth crackles.',
        { ...ARC.bonded, willingnessMin: 70 },
      ),
      arcLine(
        'Full, cherished, home. Feed me again when the pilgrims sleep — I will always make room for you.',
        { ...ARC.culmination, willingnessMin: 80 },
      ),
    ],
    topics: {
      offer_food: [
        arcLine(
          'For the hostel or for me? With you, I stop pretending there is a difference. Set it down and sit.',
          ARC.bonded,
        ),
      ],
      cooking: [
        arcLine(
          'The pot never empties because love keeps tasting — Margaret says devotion; I say seconds with you beside me.',
          ARC.warming,
        ),
      ],
    },
  }),
);
