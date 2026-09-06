/**
 * Noble district — handcrafted NPC personas.
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export default mergePersonas(

  authorPersona('dottie_maid', {
    name: 'Dottie the Head Maidservant',
    bands: {
      slender: 'Dottie the Head Maidservant moves through the manor with keys jangling at her belt — a pear-shaped woman still mostly promise at this stage, hips narrow beneath a crisp uniform, waist pinched by efficiency rather than appetite. She runs the household while the nobles pretend they do, yet her own meals seem stolen between tasks: sharp eyes, quick hands, a frame that looks fed on duty instead of dinner. When she turns, you hear the keys and see shoulder blades working beneath linen, competence written in every lean line.',
      curvy: 'Dottie has begun to soften in the service of the estate — hips rounding beneath her uniform, bust filling the bodice with a swell she adjusts without comment, thighs brushing when she climbs the servants\' stairs. Keys still jangle; orders still snap. But there is warmth now in the pear shape she carries, a woman who samples the kitchen\'s stew while inspecting it, who looks less like austerity and more like someone the manor is finally feeding back.',
      plump: 'Dottie is pleasantly plump now, uniform let out at the waist, belly softly rounded as she inventories the silver with one hand and rests the other on a hip that has grown plush. She still runs the household with iron efficiency — keys, schedules, scolding Pixie — yet her body declares a truce with the kitchen she oversees. Thighs thick, arms soft, bust straining buttons; when Wendy passes with a tray, Dottie\'s eyes follow it with professional interest and personal hunger.',
      large: 'Dottie has grown large and commanding in the manor corridors, uniform straining across a heavy bust and deep belly, flesh shifting with each authoritative stride. Keys still jangle; nobles still defer without knowing they do. Her pear shape has ripened into something formidable — wide hips, soft arms, a middle that precedes her into every room. She tastes what she serves now openly, unapologetic, telling Pixie that quality control requires calories. No one argues with a woman who holds every key.',
      enormous: 'Dottie is enormously full-figured now, a vast soft presence in the servants\' hall who must breathe before climbing the main stairs, uniform open at the seams, flesh spilling serene and competent. Keys still hang at her belt, buried sometimes beneath rolls of linen and belly. She runs the estate from a chair in the pantry now, issuing orders between bites of stew, thighs spreading wide, bust heavy on the ledger. Mirabel calls her indispensable. The kitchen calls her inspiration.',
      immense: 'Dottie the Head Maidservant has become truly immense — a monumental woman of keys and curves who fills the manor\'s back corridors like a living inventory, uniform replaced by custom panels, every inch pear-shaped and authoritative. She cannot hurry; she does not need to. Pixie brings trays; Wendy brings gossip; Dottie receives both from a reinforced chair, belly vast, voice unchanged, eyes sharp. The nobles pretend they run the house. Dottie pretends she has not outgrown every doorway. Neither pretense fools anyone.',
    },
    extras: {
      ceiling: 'Dottie hangs face-down from candy ropes in the servants\' corridor, keys scattered on the floor below, uniform bunched, soft pear-shaped body swaying with indignant dignity. "I hold every key in this estate," she hollers, flushed. "Including the one that unlocks dignity. Fetch it."',
      hold: 'Dottie is frozen mid-scold with one finger raised and the other on a rounded belly, keys silent for once, eyes blazing. Even paralyzed, she looks like a woman who will remember this in your performance review.',
      full: 'Dottie sits in the pantry with ledger forgotten, both hands on a belly taut with stew and bread, keys digging into soft hip. "Quality control," she mutters, eyes half-closed. "Purely professional. ...Pass the cheese."',
    },
    greetings: [
      line('Back again? Good — I could use someone who doesn\'t track mud on the parquet. The kitchen has stew if you\'ve got manners.', { reputationMin: 50 }, 3),
      line('State your business. Briefly. I was tasting the soup — professionally.', { stageMin: 4 }, 2),
      line('Yes? The countess is upstairs. The kitchen is downstairs. I am everywhere. Choose wisely.', {}, 1),
    ],
    afterFeeding: [
      line('Mm. Properly seasoned — and properly portioned. You have the makings of a decent guest. Or a decent conspirator.', { willingnessMin: 55 }, 3),
      line('...Good. I\'ll note you in the ledger under "useful." High praise.', { willingnessMin: 45, willingnessMax: 54 }, 2),
      line('Unexpected. Not unwelcome. Don\'t tell Camille I ate before the tasting hour.', {}, 1),
    ],
    topics: {
      cooking: [
        line('I run this kitchen by tasting it. Lately that takes longer — and more ladles. Occupational hazard of excellence.', { stageMin: 5 }, 3),
        line('Pixie steals nibbles. I steal whole bowls. Hierarchy, you see.', { reputationMin: 40 }, 2),
        line('Stew first. Silver second. Gossip whenever it simmers.', {}, 1),
      ],
    },
  }),

  authorPersona('pixie_scullery', {
    name: 'Pixie the Scullery Girl',
    bands: {
      slender: 'Pixie the Scullery Girl grins from the kitchen doorway with flour on her cheek — a slender young woman built for slipping through scullery gaps, wrists narrow, waist small enough that Dottie calls her "knife-shaped" without affection. She steals nibbles from upstairs trays and denies it with a smile that could sell innocence to the devil. Her uniform hangs loose; her eyes sparkle with mischief and with hunger she refuses to admit except when a pastry disappears.',
      curvy: 'Pixie has begun to curve despite her thieving ways — hips rounding beneath a uniform that no longer hangs, bust filling with a swell she hides under aprons, thighs softening when she crouches to reach the low cupboards she uses as hideouts for stolen cream puffs. She still grins; she still denies everything. But the grin comes slower now, fuller, and crumbs cling to lips that look kiss-swollen from sweetness.',
      plump: 'Pixie is pleasantly plump now, scullery uniform straining across a belly that betrays every tray she "never touched," cheeks always dusted with flour and color. She still steals — more successfully, because Dottie\'s lectures leave less time for patrol — and still denies it with a smile that wobbles when she is full. Hips wide, bust soft, thighs thick enough to knock pots when she spins; the manor\'s nibbles have written themselves on her body in pastry ink.',
      large: 'Pixie has grown large and unrepentant in the scullery, uniform open at the seams, belly heavy with evidence of upstairs trays raided and downstairs stew sampled. She grins anyway — enormous, plush, leaning against counters that creak — and offers you a stolen tart with floury fingers. Dottie scolds; Pixie listens with one ear and both hands on her middle, patting the fullness like a pet she refuses to name.',
      enormous: 'Pixie is enormously full-figured now, a vast soft scullery girl wedged happily between sink and prep table, uniform long surrendered, flesh spilling warm and mischievous. She still steals; the theft has simply scaled with her appetite. Trays vanish faster; so do whole cakes. When she laughs, everything shakes — belly, bust, the stacks of plates she should be washing. Camille calls it a disaster. Wendy calls it solidarity.',
      immense: 'Pixie the Scullery Girl has become truly immense — a monumental woman of flour and mischief who fills the scullery like a risen dough, perched on a reinforced stool because standing washes fewer dishes anyway. She grins from a round face framed by hair gone wild, belly vast, arms plush when she passes you a tart she definitely stole and you definitely should eat. Dottie has given up scolding. The kitchen has given up hiding sweets.',
    },
    extras: {
      ceiling: 'Pixie hangs face-down from candy ropes above the scullery sink, uniform tangled, flour raining down like snow, soft body jiggling with each giggling breath. "I was going for the high shelf," she snorts. "Not the ceiling. Help me down before Dottie sees — she\'ll say I did it on purpose."',
      hold: 'Pixie is frozen mid-reach into a pastry tray, one hand caught, the other on a rounded belly, grin stuck in place, eyes darting anyway. Even paralyzed, she looks like she is planning the next theft.',
      full: 'Pixie slumps on a flour sack, tray empty beside her, both hands on a belly taut with stolen cream puffs, grin lazy and satisfied. "I didn\'t eat them," she mumbles, eyes closed. "They ate me. Totally different."',
    },
    greetings: [
      line('Oh — hi! You want a tart? I have one. I definitely did not find it on Mirabel\'s tray. Definitely.', { reputationMin: 50 }, 3),
      line('Shh. Dottie\'s counting ladles. I\'m counting bites. You look like you could use both kinds of trouble.', { willingnessMin: 70 }, 2),
      line('What? I\'m busy. Busy being innocent. It takes a lot of pastry.', {}, 1),
    ],
    afterFeeding: [
      line('YES. That is what I am talking about. Put it right here — I can make room. Watch me make room.', { willingnessMin: 75 }, 3),
      line('Mmm. You are better than upstairs leftovers. And those are pretty good.', { willingnessMin: 60, willingnessMax: 74 }, 2),
      line('...Okay. Yes. Thank you. Don\'t tell Dottie. She\'ll say I am spoiled. She\'s right.', {}, 1),
    ],
    offerFood: [
      line('For ME? Oh, you angel. Put it down — I\'ll hide it from Dottie or share with you. Probably share. Maybe.', { willingnessMin: 70 }, 3),
      line('Food? I was going to steal something anyway. This is morally superior.', { reputationMin: 35 }, 2),
      line('If it\'s sweet, hand it over. If it\'s not, add butter first.', {}, 1),
    ],
  }),

  authorPersona('camille_wine', {
    name: 'Camille the Sommelier',
    bands: {
      slender: 'Camille the Sommelier stands in the cellar mouth with a tasting glass in hand — a slender hourglass not yet filled, waist pinched, hips a suggestion beneath a tailored jacket, eyes sharp enough to strip varnish from a barrel. She knows every vintage in the estate and pairs cheese with cruelty when tested, yet her own frame looks underfed beside the abundance she guards, as if she lives on aroma instead of supper.',
      curvy: 'Camille has begun to curve in the candlelit cellar — bust filling her jacket, hips widening beneath tailored wool, waist still cinched but softer now, hourglass coming into focus. She still swirls and sniffs with refined precision, still cuts you with a glance if you misname a grape — but there is warmth in her body that wine alone did not provide. Cheese platters leave evidence; she blames the humidity.',
      plump: 'Camille is pleasantly plump now, jacket adjusted, belly softly rounded as she holds a glass to the light — hourglass deepened, bust heavy, hips swaying when she descends the cellar steps. She pairs wine with cheese and cruelty still, but the cruelty has softened at the edges, reserved for people who confuse merlot with malbec. Her palate has not dulled; her uniform has. Tipsy swears Camille only tastes. The empty rinds suggest otherwise.',
      large: 'Camille has grown large and luxurious in the wine cellar, jacket straining across a heavy bust and deep belly, flesh shifting with each slow procession between racks. She still knows every vintage; she also knows every cheese that melts against a tongue after the third glass. Hourglass amplified — nipped waist, wide hips, bust that precedes her into tastings — she moves like someone who has decided refinement includes second helpings.',
      enormous: 'Camille is enormously full-figured now, a vast soft sommelier who must sit for long tastings, jacket open at the seams, curves spilling warm and scented with oak and butter. She still pairs with cruelty when tested — but the test takes longer now, interrupted by breath, by a hand on a belly that no longer lies flat under silk. Tipsy giggles from the shadows. Camille does not dignify it. She pours another glass instead.',
      immense: 'Camille the Sommelier has become truly immense — a monumental woman of wine and flesh who fills the tasting room like a cask made flesh, draped in fabric that gave up pretending to be a jacket. She conducts pairings from a wide chair, voice refined, eyes half-closed in bliss when brie meets burgundy on a tongue that has grown plush. The estate whispers. Camille listens, smiles, and asks for the cheese wheel with the triple cream.',
    },
    extras: {
      ceiling: 'Camille hangs face-down from candy ropes among the cellar racks, tasting glass shattered below, jacket bunched, soft hourglass body swaying in the barrel heat. "This is not a proper vintage," she says, icily flushed. "Nor a proper posture. Cut me down before the ’98 sees this."',
      hold: 'Camille is frozen mid-swirl, glass in hand, other hand on a rounded belly, chin high even in paralysis. She looks like a portrait titled "Indignity, Reserva."',
      full: 'Camille reclines on a tasting couch with glass forgotten, both hands on a belly taut with cheese and wine, eyes closed, lips parted. "Notes of plum," she murmurs. "And regret. Mostly plum."',
    },
    greetings: [
      line('Ah — you again. I opened something special. Do not ask which rack; ask whether you deserve a pour. Today, perhaps yes.', { reputationMin: 50 }, 3),
      line('Welcome to the cellar. Mind the humidity — and my waistline. Both have risen this season.', { stageMin: 4 }, 2),
      line('State your business. If it is "buy wine," fine. If it is "insult merlot," finer — I enjoy the exercise.', {}, 1),
    ],
    afterFeeding: [
      line('Exquisite. Pair that with silence and a second helping. I am conducting research.', { willingnessMin: 50 }, 3),
      line('...Acceptable. I shall pretend I only tasted for quality control. We both know I enjoyed it.', { willingnessMin: 40, willingnessMax: 49 }, 2),
      line('Unexpected pairing. Not unwelcome. Do not tell Tipsy. She will want a bite.', {}, 1),
    ],
    topics: {
      selling: [
        line('This vintage is rare. That price is fair. My patience is neither — but for you, I can be persuaded to pour a taste.', { reputationMin: 45 }, 3),
        line('Buy the bottle or buy my recommendation. Both cost coin. Only one gets you drunk gracefully.', {}, 2),
        line('Wine sells to appetite. I have studied both extensively lately.', { stageMin: 5 }, 2),
      ],
      haggle: [
        line('You haggle like a dockhand at a gala. ...Fine. A sliver off — because your palate amuses me.', { reputationMin: 50 }, 3),
        line('My prices breathe with the cellar. Yours should rise to meet them.', { reputationMin: 30 }, 2),
        line('Discounts are for friends. Insults are free. Choose.', {}, 1),
      ],
    },
  }),

  authorPersona('wendy_lady', {
    name: 'Wendy the Lady-in-Waiting',
    bands: {
      slender: 'Wendy the Lady-in-Waiting stands in Mirabel\'s shadow with a tray in hand — a pear-shaped woman still mostly outline, hips narrow beneath a modest gown, waist pinched by loyalty rather than lace. She hears the countess sigh and brings another dish without being asked, yet her own appetite hides behind service: cheeks a little hollow, wrists fine, devotion written in every lean line she spends on someone else\'s hunger.',
      curvy: 'Wendy has begun to soften in Mirabel\'s service — hips rounding beneath her gown, bust filling with a swell she hides under shawls, thighs brushing when she curtsies. She still anticipates every sigh, still arrives with trays before the countess asks, but now there is warmth in her body that matches her loyalty. Pastry crumbs on her lips betray tastings "for quality." Wendy blushes and curtsies anyway.',
      plump: 'Wendy is pleasantly plump now, gown adjusted at the seams, belly softly rounded as she glides between parlor and pantry with trays that grow heavier — or she grows softer, same effect. Mirabel\'s shadow has thickened: pear shape ripened, bust straining bodice, hips swaying with each deferential step. She hears a sigh and brings two plates now, one for the countess, one for the lady-in-waiting who finally eats in the open.',
      large: 'Wendy has grown large and devoted in the estate corridors, gown straining across a heavy bust and deep belly, flesh shifting when she curtsies — which takes longer now, breath, balance, a hand sometimes on her middle for steadiness. She still serves Mirabel first. She serves herself second without apology learned from Pixie and Patrice both. Trays tremble; so does she, plush and earnest, cheeks always flushed from kitchen heat and fullness.',
      enormous: 'Wendy is enormously full-figured now, a vast soft lady-in-waiting who must set the tray down before she curtsies, gown open at the seams, curves spilling warm and loyal. Mirabel sighs; Wendy arrives with pastries and tea and her own portion visible in the sway of her belly. Service and appetite have merged — she anticipates hunger in others because she tends her own openly now, pear-shaped, breathless, radiant with duty and dessert.',
      immense: 'Wendy the Lady-in-Waiting has become truly immense — a monumental woman of trays and tenderness who fills Mirabel\'s antechamber like a living sideboard, gown replaced by draped silk, every inch pear-shaped and devoted. She moves from a reinforced chair now, countess beside her, both women soft and regal, Wendy still first to rise when Mirabel sighs — slower, grander, carrying abundance like another form of loyalty.',
    },
    extras: {
      ceiling: 'Wendy hangs face-down from candy ropes in the parlor antechamber, tray crashed below, gown tangled, soft pear-shaped body swaying with mortified loyalty. "The countess—" she gasps. "She cannot see me like this. Please. I serve better right-side up."',
      hold: 'Wendy is frozen mid-curtsy with tray balanced impossibly, other hand on a rounded belly, eyes pleading toward Mirabel\'s door. Even paralyzed, she looks like she is listening for a sigh.',
      full: 'Wendy sits on a vanity stool with tray empty beside her, both hands on a belly taut with cream puffs and tea, eyes closed, waiting for Mirabel\'s bell anyway. "She will want more," she murmurs, smiling. "So will I."',
    },
    greetings: [
      line('Oh — hello. Forgive me, I was listening for the countess. ...And for the kitchen bell. Both sound similar when you are hungry.', { reputationMin: 50 }, 3),
      line('Welcome. Mirabel is dressing. I am... also preparing. For service. And snacks.', { willingnessMin: 65 }, 2),
      line('Yes? If you need the countess, wait. If you need pastry, I might have saved one.', {}, 1),
    ],
    afterFeeding: [
      line('Oh... that is kindness itself. Mirabel teaches grace; you teach fullness. I need both today.', { willingnessMin: 65 }, 3),
      line('Thank you. I will serve better for it. Strange, but true.', { willingnessMin: 50, willingnessMax: 64 }, 2),
      line('...Yes. Thank you. The countess must not know I ate first. ...Again.', {}, 1),
    ],
    offerFood: [
      line('For me? Oh — you should not. ...But please do. Mirabel\'s sighs can wait five minutes.', { willingnessMin: 65 }, 3),
      line('Food? I taste everything I carry anyway. This is more honest.', { reputationMin: 40 }, 2),
      line('If it is sweet, yes. If Mirabel wants it, we negotiate.', {}, 1),
    ],
    topics: {
      noble_gossip: [
        line('The countess sighs when she wants pastry. I sigh when I want to keep up with her appetite. We are both well fed lately.', { stageMin: 4 }, 3),
        line('Ballroom galas end early. Kitchen fires burn late. Draw your own map of the estate.', { reputationMin: 45 }, 2),
        line('Loyalty is anticipating hunger. I have become very good at it — for both of us.', {}, 1),
      ],
    },
  }),

  authorPersona('tipsy_cellar', {
    name: 'Tipsy the Cellar Sipper',
    bands: {
      slender: 'Tipsy the Cellar Sipper leans against a barrel with a half-empty glass — a mom-bod still mostly promise, soft lines suggested but not yet fulfilled, cheeks flushed from "tasting" rather than weight. Camille swears Tipsy only sips; the empty bottles suggest a broader vocabulary. She moves with loose grace, uniform slightly askew, smile always one glass ahead of propriety.',
      curvy: 'Tipsy has begun to fill out in the cellar shadows — bust swelling beneath a loosened uniform, hips widening, waist softening into the mom-bod she was always destined for. She still leans on barrels; they lean back now. Camille\'s glare has sharpened; Tipsy\'s grin has too, rounder, warmer, accompanied by the clink of another bottle she definitely only smelled.',
      plump: 'Tipsy is pleasantly plump now, uniform straining across a belly that Camille blames on "atmospheric pressure," bust heavy, hips wide, thighs thick when she slides off a barrel — which she does often. She tastes wine with solemn dedication and cheese with none at all, stuffing cubes into her cheeks while nodding about tannins. Empty bottles accumulate like evidence; Tipsy calls it "research."',
      large: 'Tipsy has grown large and merry in the wine cellar, uniform open at the seams, flesh spilling soft and flushed with every sip she admits to and every bite she does not. Mom-bod in full bloom — heavy bust, round belly, hips that sway when she navigates between racks — she pairs Camille\'s vintages with indiscriminate enthusiasm and her own appetite with total honesty. Sober she is charming. Full she is legend.',
      enormous: 'Tipsy is enormously full-figured now, a vast soft presence among the casks, perched on a stool because barrels complain when she leans too long. Uniform long surrendered; curves roll warm and wine-flushed — belly vast, bust swaying, arms plush when she raises a glass in toast to no one. Camille has stopped counting bottles. Tipsy has stopped pretending. The cellar smells of oak and contentment.',
      immense: 'Tipsy the Cellar Sipper has become truly immense — a monumental woman of wine and warmth wedged happily between racks, flesh spilling serene and slightly unsteady, smile permanent, eyes half-closed in bliss. She conducts tastings from a wide chair now, glass in one hand, cheese in the other, belly resting on thighs that spread wide. Camille calls it a scandal. The empty bottles call it art.',
    },
    extras: {
      ceiling: 'Tipsy hangs face-down from candy ropes between cellar racks, glass somehow still in hand, uniform tangled, soft body swaying with giggling dizziness. "Wrong kind of hanging vintage," she slurs, cheerfully. "Cut me down — I\'ll share. Maybe."',
      hold: 'Tipsy is frozen mid-pour, bottle tilted, other hand on a rounded belly, grin stuck in place. Even paralyzed, she looks like she is toasting someone.',
      full: 'Tipsy sprawls on a tasting couch with bottle beside her and both hands on a belly taut with cheese and wine, eyes closed, smile wide. "Only tasted," she mumbles. "Everything. Only tasted everything."',
    },
    greetings: [
      line('Heyyy — you! Good timing. I was just... quality control. Join me. Camille isn\'t looking. Probably.', { reputationMin: 50 }, 3),
      line('Welcome to the cellar. Mind the step — and the bottles. I mind the cheese. Priorities.', { willingnessMin: 75 }, 2),
      line('Hiiii. If you need wine, ask Camille. If you need fun, ask me. If you need both, sit down.', {}, 1),
    ],
    afterFeeding: [
      line('Ohhh that is GOOD. Put it right here — next to the wine. Everything pairs with wine.', { willingnessMin: 80 }, 3),
      line('Mmm. You get me. Camille gets grapes. You get... whatever this is. More, please.', { willingnessMin: 65, willingnessMax: 79 }, 2),
      line('...Yes. Thank you. Don\'t tell Camille. She\'ll say I am drunk. I am fed. Different.', {}, 1),
    ],
    topics: {
      noble_gossip: [
        line('Galas upstairs, guzzling downstairs. The estate\'s true vintage is secrets — and cheese.', { stageMin: 5 }, 3),
        line('Mirabel sighs. Wendy runs. I sit. We all cope differently.', { reputationMin: 40 }, 2),
        line('Nobles dance hungry. I fix that. With bottles. And brie.', {}, 1),
      ],
      selling: [
        line('I shouldn\'t sell Camille\'s stock. ...But I could point you at a bottle and look away. For a friend. And a snack.', { reputationMin: 45 }, 3),
        line('Prices are on the label. Discounts are in my glass. Negotiate accordingly.', {}, 2),
        line('Buy wine. I\'ll throw in a story. I\'ll throw in cheese if you bring it.', {}, 1),
      ],
    },
  }),

  authorPersona('vale_herald', {
    name: 'Vale the Gate Herald',
    bands: {
      slender: 'Vale the Gate Herald stands at the estate entrance with a trumpet she polishes more than she plays — an athletic woman still sharp-edged, uniform crisp, chin high, waist narrow beneath brass buttons. She announces visitors with formal precision and decides who is respectable enough to enter, yet her frame looks underfed beside the banquets she guards, discipline written in every lean muscle.',
      curvy: 'Vale has begun to soften at the gate — bust filling her uniform, hips widening beneath the brass, waist less knife-edge, more hourglass restrained by wool. She still polishes the trumpet; she still announces with formality that brooks no nonsense. But there is warmth now when she breathes before a fanfare, a body rounding in ways uniform tailors notice before she does.',
      plump: 'Vale is pleasantly plump now, uniform let out at the waist, belly softly rounded beneath brass buttons as she stands gate watch — athletic frame buried under plush new curves, thighs thick, bust straining jacket. She announces visitors with the same formal precision, but the trumpet rests on a hip that has grown soft; fanfares take more breath now, more chest, more of a woman who samples the kitchen between shifts and no longer apologizes.',
      large: 'Vale has grown large and imposing at the estate gate, uniform straining across a heavy bust and deep belly, flesh shifting when she snaps to attention — slower, grander, brass digging into soft middle. Authority undiminished; gravity increased. She still decides who enters; she also decides when to eat, and the decisions have grown generous. Trumpet fanfares rumble through a chest that has become impossible to ignore.',
      enormous: 'Vale is enormously full-figured now, a vast soft herald who must sit between announcements, uniform open at the seams, curves spilling warm beneath brass that has given up pretending. She still polishes the trumpet; she polishes off platters too, belly vast, thighs spreading on the gate chair, voice still formal when she declares names — and still hungry when she finishes, patting a middle that precedes her into every proclamation.',
      immense: 'Vale the Gate Herald has become truly immense — a monumental woman of brass and flesh who fills the gatehouse like a living fanfare, uniform replaced by custom panels, every inch soft and authoritative. She announces from a reinforced dais now, trumpet raised by arms plush with effort, belly resting on thighs that spread wide. The estate gates feel narrower when she stands. So does her appetite. Both are respected.',
    },
    extras: {
      ceiling: 'Vale hangs face-down from candy ropes above the gatehouse, trumpet dented below, uniform bunched, soft athletic body swaying with outraged dignity. "I am the voice of this estate," she booms, flushed. "Not its decoration. Cut me down at once."',
      hold: 'Vale is frozen mid-fanfare, trumpet at lips, other hand on a rounded belly, eyes blazing. Even paralyzed, she looks like she is announcing your disgrace.',
      full: 'Vale sits on the gate dais with trumpet in lap, both hands on a belly taut with roast and wine, brass buttons straining. "The next visitor," she murmurs, eyes half-closed, "can wait. I am... digesting policy."',
    },
    greetings: [
      line('You again. The countess spoke favorably. I shall announce you — quietly, today. My breath is reserved.', { reputationMin: 50 }, 3),
      line('State your purpose. Briefly. I was between fanfares and between meals. Both require dignity.', { stageMin: 4 }, 2),
      line('Halt. Identify yourself. ...If you have pastry, declare that first.', {}, 1),
    ],
    afterFeeding: [
      line('...Acceptable tribute. I shall remember you when the gate opens. And when the kitchen bell rings.', { willingnessMin: 45 }, 3),
      line('Good. Formal. Filling. You understand ceremony.', { willingnessMin: 35, willingnessMax: 44 }, 2),
      line('Unexpected. Not unwelcome. Do not expect a fanfare. My trumpet needs rest.', {}, 1),
    ],
    topics: {
      noble_gossip: [
        line('I announce who enters hungry and who leaves heavier. The estate prefers the latter — quietly.', { reputationMin: 45 }, 3),
        line('Ballroom gossip travels up. Kitchen gossip travels out. I hear both from the gate.', { stageMin: 5 }, 2),
        line('Appearances are policy. Appetites are... less advertised. I advertise nothing I am not paid in roast.', {}, 1),
      ],
      warning: [
        line('One false step and the gates close. I have been waiting for an excuse to use the trumpet angrily.', { reputationMax: -15 }, 3),
        line('Mind the gravel. Mind your manners. Mind that I am larger than I was and still sharp.', { reputationMin: -14, reputationMax: 20 }, 2),
        line('The estate tolerates much. Contempt is not on the list.', {}, 1),
      ],
    },
  }),

  authorPersona('keys_pianist', {
    name: 'Keys the Ballroom Pianist',
    bands: {
      slender: 'Keys the Ballroom Pianist sits at the grand piano with fingers poised — a slender woman in a dark gown, wrists fine, waist narrow, dramatic posture compensating for a frame still mostly line rather than curve. She plays waltzes between galas and snacks on canapés meant for guests who never arrive, yet her own body looks underfed beside the music she draws from the keys, hunger deferred for art.',
      curvy: 'Keys has begun to curve on the piano bench — bust filling her gown, hips widening beneath silk, waist softening into an hourglass the ballroom lights adore. She still plays waltzes between empty galas; she still snacks on canapés with dramatic sighs. But now the bench creaks differently, and when she reaches for high notes, flesh shifts soft and visible, art and appetite negotiating truce.',
      plump: 'Keys is pleasantly plump now, gown adjusted at the seams, belly softly rounded as she plays — fingers dancing across keys while her body sways with new weight, bust heavy, hips spreading on a bench that groans in harmony. Canapés meant for absent guests find their way to her mouth with theatrical inevitability; cream stains her lips; she licks them slowly between movements, unapologetic, magnificent.',
      large: 'Keys has grown large and dramatic at the grand piano, gown straining across a heavy bust and deep belly, flesh shifting with each passionate arpeggio. Empty ballroom, full woman — she plays for ghosts and feeds herself like a star who knows the audience is late. Thighs thick on the bench, arms soft when they lift in crescendo, voice breathless when she speaks between pieces: "More champagne. And those little tarts."',
      enormous: 'Keys is enormously full-figured now, a vast soft pianist who must sit sideways on the bench, gown open at the seams, curves spilling warm against ivory keys. Waltzes slow to match her breath; canapés disappear in batches. She plays still — magnificently — belly rising and falling like a metronome set to indulgence, bust swaying when she hits the low chords, dramatic and fed and utterly unrepentant.',
      immense: 'Keys the Ballroom Pianist has become truly immense — a monumental woman of music and flesh who fills the piano nook like a second instrument, gown replaced by draped velvet, every inch soft and theatrical. She plays from a reinforced bench, fingers still precise, body vast and radiant, canapé crumbs on her décolletage like stars. Galas may never come. Keys performs anyway — for the echo, for the cream puffs, for the sheer joy of being too much.',
    },
    extras: {
      ceiling: 'Keys hangs face-down from candy ropes above the grand piano, gown tangled, sheet music fluttering like white birds, soft body swaying with dramatic outrage. "I was mid-crescendo," she wails. "This is NOT pianissimo. Help me down — gently. The bench is jealous enough."',
      hold: 'Keys is frozen mid-arpeggio, fingers on keys, other hand on a rounded belly, chin lifted in suffering artistry. Even paralyzed, she looks like she is playing through the pain.',
      full: 'Keys slumps on the piano bench with sheet music in her lap, both hands on a belly taut with canapés and champagne, eyes closed, humming a waltz through lips stained with cream. "Encore," she murmurs. "But food first. Always food first."',
    },
    greetings: [
      line('Darling! You caught me between movements — and between courses. Sit. Listen. If you brought pastry, place it on the lid. That is also music.', { reputationMin: 50 }, 3),
      line('Ah. An audience of one. Perfect. I was going to eat these canapés dramatically anyway. You may applaud with your mouth.', { willingnessMin: 70 }, 2),
      line('The ballroom is empty. The piano is not. Neither am I — hungry, that is. Speak quickly or feed slowly.', {}, 1),
    ],
    afterFeeding: [
      line('Magnificent. That deserves an encore — and so do I, after that. Play something slow while I settle.', { willingnessMin: 75 }, 3),
      line('Mmm. Rich. Like a minor key resolving. Thank you, darling.', { willingnessMin: 60, willingnessMax: 74 }, 2),
      line('...Yes. Art requires fuel. You understand.', {}, 1),
    ],
    offerFood: [
      line('For me? Oh, you angel of the green room. Place it here — on the keys if you must. I will forgive the crumbs.', { willingnessMin: 70 }, 3),
      line('Food? I was going to steal canapés anyway. This is more civilized.', { reputationMin: 40 }, 2),
      line('If it is sweet or buttered, yes. If it is neither, butter it.', {}, 1),
    ],
    topics: {
      noble_gossip: [
        line('Galas cancel. Appetites do not. I play for the empty room and eat for the guests who feared their waistlines. Cowards.', { stageMin: 5 }, 3),
        line('Mirabel sighs upstairs. I sigh at the piano. Wendy runs between us. The estate runs on pastry.', { reputationMin: 45 }, 2),
        line('Nobles dance when they appear. I feed myself when they don\'t. Both are performances.', {}, 1),
      ],
    },
  }),

);
