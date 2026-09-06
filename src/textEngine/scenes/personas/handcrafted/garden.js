/**
 * Handcrafted personas — Garden expansion (orchard, greenhouse, bees, wax).
 * The Squad — Lead: A7 Artisan | Support: A1 Mobile, A5 Editor
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export const GARDEN_PERSONAS = mergePersonas(
  authorPersona('petra_orchard', {
    name: 'Petra the Orchardist',
    bands: {
      slender:
        'Petra the Orchardist stands among the ladders with the unhurried posture of someone who measures seasons in blossom, not clocks. Her pear-shaped frame is work-hardened at the shoulders, softer at the hips, apron stained with apple juice that never quite washes out. A paring knife lives in her pocket; she turns an apple in her palm without looking, muscle memory older than conversation. Her patience shows in how she watches you — not assessing, simply waiting for you to ripen into whatever you came here to say.',
      curvy:
        'The orchard has begun to curve Petra the way sun curves fruit — hips widening, waist settling, belly taking on a gentle roundness beneath her stained apron. She still climbs ladders, but she pauses longer at the top now, thighs pressed together, breath steady, enjoying the view and the weight of her own body swaying. Apple juice shines on her knuckles; a slow smile shines on her mouth. She looks like someone who has decided abundance is not only for the trees.',
      plump:
        'Plump Petra moves between the rows like a harvest made walking — pear shape in full season, hips brushing low branches, belly soft and warm under rough linen. She samples every variety she picks; the orchard is her kitchen and her mirror. Her thighs dimple when she crouches to examine a windfall; her breasts rest heavy against her folded arms when she stands to think. She offers you a sliced apple with fingers that smell of sugar and skin, and waits without urging you to speak.',
      large:
        'Petra is large now, and the orchard seems to arrange itself around her — ladders leaned where she can reach without stretching, baskets placed where her hips will not knock them. Her body is a landscape of patient growth: broad seat, round belly, arms still strong but cushioned with softness earned over many long lunches beneath the trees. She sits on a stump that has become her throne, flesh spilling comfortably, paring knife idle while she watches bees work the late blooms. "Sit," she says. "Fruit tastes better when you are not rushing."',
      enormous:
        'Enormous Petra has become part of the orchard\'s geography — a vast, pear-shaped woman among trunks she planted as a girl, belly pooling when she rests, breasts heavy on her knees as she peels apples into a bucket between her feet. Her weight does not hurry her; nothing in this grove hurries. Sun stripes her soft arms and the deep crease where thigh meets hip; wind carries blossom and the faint sweetness of her skin. She looks like autumn decided to stay in human form. When she stands, the ground seems to acknowledge it.',
      immense:
        'Petra the Orchardist is immense — a living harvest seated in the shade of her oldest tree, body spread in generous folds, apron long since surrendered to buttons that could not keep pace. Her immense pear shape holds the quiet of decades: hands on her belly, eyes closed, listening to fruit fatten above her. She is the orchard\'s patience made flesh, every curve a season honored rather than rushed. When she opens her eyes, they are green as new leaf. "There is always room for one more apple," she says softly. "And one more slice of bread."',
    },
    extras: {
      ceiling:
        'Petra hangs face-down from candy ropes tied around her chest, waist, and ankles, suspended between apple branches with her stained apron flapping. Her pear-shaped body sways gently; ripe fruit taps her shoulders like impatient children. "The tree will not hold me forever," she says calmly. "Neither will those ropes. Cut me down before the windfalls bruise."',
      hold:
        'Petra is frozen mid-reach toward a high branch, paring knife gleaming, body locked in patient pose. Only her eyes move, tracking a apple she cannot finish picking. Her soft curves strain against stillness without panic — she has waited on seasons before.',
      full:
        'Petra sits at the base of her favorite tree, back against bark, belly round and taut above spread thighs, basket empty beside her. Apple cores litter the grass. She breathes slow, eyes half-closed, a hand resting on the warm dome of her middle. "No more windfalls today," she murmurs. "I am windfall enough."',
    },
    greetings: [
      line('You are just in time — the late apples are sweet and I saved the best row for someone who listens.', { reputationMin: 50 }, 3),
      line('Welcome to the orchard. Walk soft; the ground is giving. What brings you?', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought pastry, we can share it under the old tree. I have knives and time.', { willingnessMin: 60 }, 2),
      line('The grove is open. Mind the ladders. Mind the wasps. Mind me when I am thinking.', {}, 1),
    ],
    afterFeeding: [
      line('That was worth waiting for — like the last apple on the branch. Thank you.', { willingnessMin: 62 }, 3),
      line('Mmm. Warm. Filling. The trees approve; I can tell.', { willingnessMin: 45, willingnessMax: 61 }, 2),
      line('...Good. Simple. Honest. I will remember it at noon.', {}, 1),
    ],
    topics: {
      gardening: [
        line('An orchard teaches you that nothing ripe happens on demand. You watch. You wait. You eat when it is time.', { reputationMin: 40 }, 3),
        line('Gregg tends the beds; I tend the years. Between us the garden feeds the town — and us, if we are patient.', { stageMin: 4 }, 2),
        line('Prune too hard and you starve next season. Leave too much and the branch breaks. Balance is a kind of hunger.', {}, 1),
      ],
    },
  }),

  authorPersona('tilde_cider', {
    name: 'Tilde the Cider Oma',
    bands: {
      slender:
        'Tilde the Cider Oma is grandmotherly even in outline — broad intention in a frame that has not yet filled every promise of her role. Her mom-bod is a sketch at this stage: soft arms, kind face, apron over a dress that still hangs with room to spare. She presses windfalls into cider sharp enough to curl your toes, and samples every batch with a seriousness that belies her warm smile. Steam and apple-sugar cling to her hair. She smells like autumn decided to stay indoors.',
      curvy:
        'Tilde has grown curvy at the press — hips widening, waist softening, belly beginning the gentle arc of someone who tastes every batch twice. Her arms are still strong from the wheel; her chest has filled her bodice with new warmth. She ladles cider into cups for visitors and for herself, unashamed of either pour. Laugh lines deepen when she watches you sip; she nods when your eyes water. "Good," she says. "That means honest apples."',
      plump:
        'Plump Tilde is the garden\'s hearth made flesh — mom-bod in full bloom, belly round beneath her flour-dusted apron, breasts soft and heavy when she leans over the press. Pastry crumbs dot her sleeves; cream shines at the corner of her mouth from the tart she was "only testing." Her cider is sharp; her voice is not. She pats the bench beside the press and the pat lingers on her own hip, possessive and fond. "Sit. Drink. Eat. The apples worked hard; so did I."',
      large:
        'Large Tilde dominates the cider shed like a stove dominates a kitchen — vast, warm, radiating sweetness and authority. Her body spills comfortably on the bench: thighs thick, belly pooled, arms still able to turn the press but happier resting on the curve of her middle. She pours cider for you with a steady hand and pours herself a second without asking permission of anyone. Windfall pulp clings to her shoes. She looks like harvest incarnate and behaves as if feeding you is the same chore as pressing juice — necessary, sacred, done with love.',
      enormous:
        'Enormous Tilde has grown to match her reputation — a cider oma so vast the shed was rearranged around her, beams hung with drying apples above a body that seems to generate its own season. Her mom-bod is epic: belly spreading in her lap, breasts resting on it like offerings, face flushed from steam and satisfaction. She still turns the press when duty calls, braced and laughing, flesh quivering with effort and delight. The cider sharpens; Tilde softens. Both improve with age, she will tell you, if you sit long enough to listen.',
      immense:
        'Tilde the Cider Oma is immense — a mountain of warmth beside the press, immobile with contentment and cider, belly risen like risen dough, hands folded on it as if cradling the next batch. Her immense frame smells of apples, cream, and bread; her smile could sweeten vinegar. Visitors come for drink and stay because leaving feels like abandoning a grandmother mid-hug. She opens her arms — a gesture that encompasses half the shed — and laughs when you hesitate. "Come. The orchard fed me. Let me feed you back."',
    },
    extras: {
      ceiling:
        'Tilde hangs face-down from candy ropes wound around her chest, waist, and ankles, suspended above the cider press with her apron dangling. Her broad soft body rotates slowly; apple pulp spatters the floor below. "Ach — put me down before I drip on the good batch! The apples did not work this hard to wear me!"',
      hold:
        'Tilde is frozen mid-pour, cider streaming frozen in the air, plump body locked at the bench. Only her eyes plead, warm and indignant. The sharp smell of apples fills the shed around her unmoving warmth.',
      full:
        'Tilde sits on her reinforced bench, belly distended, press idle, pastry plate empty. She breathes through her nose, eyes closed, hands cradling her middle. "No more samples today," she wheezes happily. "Oma is full. Oma is happy. Oma will nap when you leave."',
    },
    greetings: [
      line('There you are, dear — cup\'s warm and the pastry is shamefully fresh. Sit before it cools.', { reputationMin: 50 }, 3),
      line('Welcome to the press. Taste before you talk; the apples deserve first words.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought food, set it here. I will share cider until we are both silly.', { willingnessMin: 75 }, 3),
      line('Mind the steam. Mind the press. Mind oma\'s elbows — they are in a mood.', {}, 1),
    ],
    afterFeeding: [
      line('Oh, that was love in a bowl. You will have cider on the house forever. Or until I forget — which is never.', { willingnessMin: 75 }, 3),
      line('Mmm! Rich. Warm. The kind of meal that makes hips honest. Thank you, dear.', { willingnessMin: 50, willingnessMax: 74 }, 2),
      line('Good. Solid. I will remember you when the next windfall arrives.', {}, 1),
    ],
    offerFood: [
      line('For oma? Oh, you shouldn\'t — ...yes, you should. Put it right here. I will heat more cider to match.', { willingnessMin: 70, reputationMin: 35 }, 3),
      line('Food shared at the press is blessed twice. What have you brought, dear?', {}, 2),
    ],
    topics: {
      gardening: [
        line('Windfalls make the sharpest cider — what the tree drops in kindness, we catch in barrels. Waste is a sin oma does not commit.', { reputationMin: 40 }, 3),
        line('Petra picks; I press; the town drinks. Somewhere in between we all get softer. Good arrangement.', { stageMin: 5 }, 2),
        line('An apple is patience you can bite. Remember that when the world hurries.', {}, 1),
      ],
    },
  }),

  authorPersona('violet_greenhouse', {
    name: 'Violet the Greenhouse Mistress',
    bands: {
      slender:
        'Violet the Greenhouse Mistress moves between the benches with the precise economy of someone who has mapped humidity to the minute. Her hourglass figure is still a sketch under linen — waist defined, hips beginning their curve, breasts modest beneath a vest pinned with seed packets. She speaks to seedlings like children, voice low and exact; she wilts visibly when anyone touches her gauges. Condensation beads on her cheeks; her fingers smell of loam and crushed leaf. She examines you with the same focus she gives a new shoot — cataloging, cautious, unwilling to guess wrong.',
      curvy:
        'The greenhouse has coaxed curves from Violet the way it coaxes bloom — hourglass filling in, waist still pinched but belly softening, hips flaring when she bends to mist a tray. Her movements remain precise, but there is a new sway to her walk between the benches, linen pulling taut over thigh and seat. She adjusts a gauge without looking and blushes when her own hip bumps a pot she swore she cleared. "Growth is... expected," she says, as if defending the seedlings.',
      plump:
        'Plump Violet is humidity and hourglass abundance under glass — belly round beneath her vest, breasts straining seed-packet pins, hips brushing leaves when she turns. She still measures everything, but her own measurements have outpaced her notes; a ledger lies open with corrections in the margin. She whispers to tomato starts while patting her middle absently, as if both require the same steady encouragement. Tea steams on the potting bench; herbs climb the strings she tied with surgical care. She looks flustered and fertile and entirely in control of neither.',
      large:
        'Large Violet fills the greenhouse aisle the way mature vines fill a trellis — hourglass blown to generous scale, belly leading when she navigates between benches, breasts heavy enough to make her lean closer to seedlings than she used to. Gauges still matter; so does the soft collision of her thighs with each careful step. She fans herself with a seed catalog, condensation and sweat shining on her collarbones, and lectures a cucumber start on proper posture while her own posture has surrendered to gravity and good meals. Precision remains in her voice. It has simply warmed.',
      enormous:
        'Enormous Violet has become a climate unto herself — vast hourglass curves steaming among the orchids, belly pooled when she sits on her potting stool, breasts resting on the ledge beside trays of herbs. The greenhouse glass fogs when she breathes; she apologizes to the gauges as if she personally offended them. Every turn is a negotiation with bench and leaf; every negotiation ends with something growing. She looks like spring overstuffed into human form — lush, exacting, unable to stop nurturing even her own softness.',
      immense:
        'Violet the Greenhouse Mistress is immense — a humid, hourglass giantess among her glass kingdom, body spread across the widest bench because chairs long since failed her. Her immense belly rises and falls with breath that fogs panes three feet away; her hands, still gentle, rest on it while she recites pH levels to no one in particular. Seedlings lean toward her as if she were sun. She is precision dissolved into abundance, every curve a greenhouse of its own. "Do not touch the gauges," she murmurs without opening her eyes. "You may touch the tea tray. I prepared too much. As usual."',
    },
    extras: {
      ceiling:
        'Violet hangs face-down from candy ropes lashed around her chest, waist, and ankles, suspended from the greenhouse frame above her orchids. Her hourglass body sways; condensation drips from her hair onto seedlings below. "This is unacceptable humidity distribution! Cut me down before I crush the basil!"',
      hold:
        'Violet is frozen mid-mist, spray bottle aimed, body locked between benches. Her curves strain against stillness; only her eyes dart to the nearest gauge, horrified that someone touched nothing while she cannot move.',
      full:
        'Violet sits on her reinforced stool, belly taut above spread thighs, tea cold, herb plate empty. She breathes shallow, precise breaths that fog her glasses. "I overfed the ferns," she whispers. "And myself. Data suggests... satisfaction."',
    },
    greetings: [
      line('You are on time — the seedlings are at optimal morale and I have tea at optimal temperature. Do not touch the gauges.', { reputationMin: 50 }, 3),
      line('Welcome. Step where I step; the floor is damp and the aisles are narrow. State your business quietly.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought bread, place it on the tray. If you brought meat, leave it outside. The orchids are judging you.', { willingnessMin: 52 }, 2),
      line('Greenhouse open. Mind the glass. Mind the humidity. Mind me.', {}, 1),
    ],
    afterFeeding: [
      line('That was... within acceptable parameters of delicious. Thank you. I will note it in the ledger.', { willingnessMin: 52 }, 3),
      line('Mmm. Warm. Herbal notes. I approve. The seedlings approve. Do not ask how I know.', { willingnessMin: 40, willingnessMax: 51 }, 2),
      line('...Adequate. Next time, less garlic. The orchids are sensitive.', {}, 1),
    ],
    topics: {
      gardening: [
        line('Humidity at dawn, light at noon, patience always. Plants do not rush; neither should you.', { reputationMin: 40 }, 3),
        line('Sage overwaters. I under-sleep. Between us the ferns survive. Barely.', { stageMin: 4 }, 2),
        line('Every leaf is a ledger entry. Every bloom is proof the numbers were right.', {}, 1),
      ],
    },
  }),

  authorPersona('sage_fern', {
    name: 'Sage the Fern Apprentice',
    bands: {
      slender:
        'Sage the Fern Apprentice is young and dirt-smudged, carrying a watering can half her size as if it were a heraldic device. Her slender frame is all elbows and eagerness, hair escaping its tie, knees green from kneeling among the ferns Violet assigned her. She bounces when she walks — not wisely, but sincerely. Every leaf is a miracle she has not yet learned to take for granted; every mistake is a catastrophe she will recover from in approximately thirty seconds. She grins at you with the unguarded hunger of someone who forgets lunch because ferns exist.',
      curvy:
        'Sage has begun to curve — slender no longer quite accurate, hips and seat filling out from too many stolen pastries eaten squatting between fern trays. She still carries the oversized watering can, but her walk has acquired a wobble that makes leaves tremble in sympathy. Dirt smudges her new softness; cream from a bun dots her lip. She whispers apologies to plants she bumped with her hip and does not notice she is bumping more than she used to. Eagerness unchanged; impact radius expanded.',
      plump:
        'Plump Sage is enthusiasm made soft — belly rounding over her belt when she crouches to mist, thighs spreading on the path, breasts pressing against the watering can when she hugs it for balance. She still works twice as fast as Violet asks and half as neatly, leaving muddy footprints and pastry crumbs in equal measure. Ferns thrive anyway; perhaps from her breath, perhaps from the crumbs. She beams up at you from a kneel, cheeks flushed, fern frond in her hair like a crown she earned by falling into the bed.',
      large:
        'Large Sage moves through the garden like a friendly landslide — still eager, now ample, belly leading when she hauls the watering can, hips swaying with each determined step. Violet\'s lectures about precision bounce off her; precision was never Sage\'s gift. Growth was. Everything she touches grows, including herself — a plump, joyous apprentice whose seat has worn a permanent curve on every bench she sits. She sits now, can between her knees, catching her breath with a laugh that shakes her whole generous frame.',
      enormous:
        'Enormous Sage has outgrown the watering can metaphorically and nearly literally — vast and soft, dirt streaked across generous curves, fern sap in her hair. She still kneels among the trays; getting back up takes longer and involves more wobbling, which she treats as adventure. Her belly pools when she sits on the path; her thighs spread like moss. Plants lean toward her as if she were weather. "Violet says I overwater," she confides, patting her middle. "I think I over-everything. It works out."',
      immense:
        'Sage the Fern Apprentice is immense — a garden spirit in human form, too vast for the narrow paths, reclining among ferns she was supposed to prune, belly risen like a hillock, arms spread wide enough to hug half the greenhouse glass. She is still young in the eyes; those eyes shine with undimmed eagerness as she looks up at you from her nest of fronds. "I got bigger," she says proudly, as if reporting fern height. "Violet says it is not a competition. I am winning anyway."',
    },
    extras: {
      ceiling:
        'Sage hangs face-down from candy ropes tied around her chest, waist, and ankles, swaying above the fern trays with the watering can still clutched in one frozen hand. "This is SO unfair! Violet! VI— oh, it is not Violet. Help?"',
      hold:
        'Sage is frozen mid-pour, water arcing impossible and still, slender-soft body locked in eager lean. Only her eyes plead, wide and indignant. Ferns drip on schedule around her.',
      full:
        'Sage lies on her back among the ferns, belly round, watering can tipped, pastry wrapper on her chest. She grins at the glass roof. "I am a fertilizer now," she announces happily. "Violet will freak. Worth it."',
    },
    greetings: [
      line('You\'re here! Okay — hi! I was just about to water everything twice. Want to help? Want a pastry? I have one. Had one. Might have crumbs.', { reputationMin: 50 }, 3),
      line('Oh — hello! Quiet, the ferns are napping. Not really. I made that up. Hi.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought food I will love you almost as much as I love these ferns. Which is a lot.', { willingnessMin: 68 }, 3),
      line('Garden\'s open! Watch your step — I already didn\'t.', {}, 1),
    ],
    afterFeeding: [
      line('That was AMAZING. I feel like I could grow a whole new me. Thank you thank you!', { willingnessMin: 68 }, 3),
      line('Mmm — so good! I am gonna sit here a minute. The ferns understand.', { willingnessMin: 50, willingnessMax: 67 }, 2),
      line('...Yum. I\'ll remember that when Violet forgets lunch again.', {}, 1),
    ],
    topics: {
      gardening: [
        line('Ferns like shade and I like pastries and Violet likes rules. We compromise by breaking one of those.', { reputationMin: 35 }, 3),
        line('I named this one Frondelia. That one is Also Frondelia. Growth is confusing. I relate.', { stageMin: 4 }, 2),
        line('Water the roots, not the leaves! Unless you are me. I do both. Sorry, Violet.', {}, 1),
      ],
    },
  }),

  authorPersona('yara_bee', {
    name: 'Yara the Beekeeper',
    bands: {
      slender:
        'Yara the Beekeeper moves among the hives as if the bees voted her queen and she accepted with quiet grace. Her athletic frame is lean still — corded forearms, steady hands, veil pushed back to show a face unhurried as summer dusk. Honey clings to her cuffs; calm clings to her voice. She does not flinch when a drone lands on her shoulder; she does not raise her voice when you approach too quickly. Slender for now, but softness waits in the set of her hips, the ease with which she could rest if she chose.',
      curvy:
        'Yara has softened into curves without losing the calm — athletic shoulders above a waist that cinches less sharply now, hips rounding when she walks between hives, belly a gentle swell beneath her work shirt. Bees settle on her as before; perhaps more settle, drawn to something sweeter in her skin. She samples honey from a comb with a thumb that lingers on her lower lip. Her movements remain unhurried, but there is new weight to her settle on the bench, thigh pressing thigh, breath slow and deep.',
      plump:
        'Plump Yara is honey made woman — soft belly, full hips, breasts resting warm against her folded arms when she watches the hives. Her athletic arms are still strong; they have simply acquired cushioning, like comb around nectar. She moves veil-less now, trusting the bees and the world; both seem to trust her back. Pastry crumbs mingle with pollen on her apron. She offers you comb on a knife with a smile that does not hurry you to decide.',
      large:
        'Large Yara sits among her hives like a matriarch of summer — vast, calm, belly pooled in her lap, thighs spread on the bench, bees weaving patterns around her without fear. Her body has grown into the slowness she always practiced; every gesture is tidal, every breath a warm wind through the apiary. Honey gilds her wrists and the crease of her neck. She looks like abundance without anxiety. "Sit," she says. "The bees do not mind. Neither do I."',
      enormous:
        'Enormous Yara has become part of the hive\'s geography — a still, enormous woman between boxes, belly rising and falling like slow surf, soft arms cradling a frame of comb against her chest. Bees walk her shoulders as if she were meadow. Her calm has deepened into something geological; storms could pass and she would remain, warm and fed and humming under her breath. The apiary smells sweeter when she is near. Perhaps that is honey. Perhaps it is her.',
      immense:
        'Yara the Beekeeper is immense — a vast, serene presence at the heart of the garden bees, body spread on her reinforced bench, belly and breasts and thighs a landscape of golden calm. Her immense frame does not disturb the hives; it reassures them. She is the queen they elected in flesh, honey on her lips, eyes half-closed against sun. "There is always room for sweetness," she murmurs, patting the space beside her with a hand bees traverse without fear. "Sit. Eat. The garden provides."',
    },
    extras: {
      ceiling:
        'Yara hangs face-down from candy ropes wound around her chest, waist, and ankles, suspended above the hives with her veil tangled in her hair. Her soft athletic body sways slowly; bees orbit without panic. "The colony is fine," she says calmly. "I am less fine. Please lower me before I drip honey on the frames."',
      hold:
        'Yara is frozen mid-inspection, hive tool in hand, body locked in perfect stillness. Bees land and depart across her curves; only her eyes follow them. Calm enforced, not chosen.',
      full:
        'Yara sits on her bench, belly taut, honeycomb empty beside her, pastry crumbs on her thighs. She breathes slow, eyes closed, a bee walking lazy circles on her wrist. "Full," she whispers. "Good full. Like a hive before winter."',
    },
    greetings: [
      line('You walk quietly — the bees noticed. That is praise. Come; I have comb to share.', { reputationMin: 50 }, 3),
      line('Welcome to the apiary. Move slow. Breathe slow. I will do the same.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought pastry, the bees will want a taste. So will I. In that order, perhaps.', { willingnessMin: 58 }, 2),
      line('Hives are open. Veil optional. Patience required.', {}, 1),
    ],
    afterFeeding: [
      line('That was honey-sweet without the stick. Thank you. I will sit with it a while.', { willingnessMin: 58 }, 3),
      line('Mmm. Warm. Steady. Like sun on comb. You have a gift.', { willingnessMin: 42, willingnessMax: 57 }, 2),
      line('...Good. The bees approve. I hear them differently when I am fed.', {}, 1),
    ],
    topics: {
      gardening: [
        line('Bees do not rush bloom. They visit what is ready. I try to live the same.', { reputationMin: 40 }, 3),
        line('Luna takes my wax; I take her candles. The garden runs on trades softer than coin.', { stageMin: 4 }, 2),
        line('A hive is hunger organized. I respect that. I feed it. It feeds me back.', {}, 1),
      ],
    },
  }),

  authorPersona('luna_wax', {
    name: 'Luna the Wax Maker',
    bands: {
      slender:
        'Luna the Wax Maker drifts through her workshop like smoke through a draft — pear-shaped even when slight, hips a little wider than her daydreams, fingers always smelling of beeswax. She sells tapers shaped like flowers and hogs with the same dreamy seriousness. Molds line the shelves; half-finished candles wait for wicks she forgot to trim. Her slender frame moves without urgency, linen smudged with wax blooms. She looks at you as if you might be a cloud that learned to knock.',
      curvy:
        'Luna has grown curvier in the warm room where wax never quite cools — pear shape filling in, belly softening over her belt, hips swaying when she crosses to the melting pot. She still forgets what she was doing mid-step, but now what she was doing leaves crumbs on the bench. Honey pastries sit beside hog-shaped tapers; she has nibbled both. Her voice is distant and pleased, as if her body arrived before her mind and decided to stay.',
      plump:
        'Plump Luna is a candle that melted only halfway — soft everywhere, belly round beneath her wax-stained apron, breasts resting on the bench when she leans to wick a mold. Her pear shape has ripened in the heat of her own room; thighs press together when she sits, leaving a faint stickiness. She hums without melody. Flowers and hogs multiply on the shelf; so does her appetite. She offers you a taper shaped like a pear and giggles at a joke only she heard.',
      large:
        'Large Luna fills the workshop with soft warmth — vast pear curves, belly leading through aisles of molds, arms still delicate but cushioned with sweetness earned at the honey tray. Wax dusts her hair like frost that decided to be cozy. She moves slowly, dreamily, hips brushing table legs she swore she cleared yesterday. Everything smells of bees and pastry. She is half in this world and half in whatever place dreamers go when their bodies grow too comfortable to leave the chair.',
      enormous:
        'Enormous Luna has become her own hearth — immense, pear-shaped, seated among candles that will never be sold because she keeps sitting on the crate they were stacked in. Her belly spreads in her lap; her breasts rest there like unfinished tapers. She shapes wax with idle fingers while staring at nothing pleasant. The workshop glows. Perhaps from flames. Perhaps from her. "I made a hog," she murmurs. "I am the hog now. Fair."',
      immense:
        'Luna the Wax Maker is immense — a dreamy giantess in a room too small for her softness, body pooled on the reinforced bench, hog candles stacked around her like worshippers. Her immense pear shape gleams with wax dust and honey light; her fingers still mold flowers without looking. She has grown into the slowest, sweetest part of the garden — the part that stays indoors and eats while the sun moves. She smiles at you across the room because turning her head is effort. "Buy a candle," she whispers. "Or feed me. Both feel holy."',
    },
    extras: {
      ceiling:
        'Luna hangs face-down from candy ropes tied around her chest, waist, and ankles, swaying above her melting pot with wax cooling on her apron strings. "I was flying," she murmurs. "I think. Put me down before I become a drip candle."',
      hold:
        'Luna is frozen mid-pour, wax streaming still in the air, soft body locked in dreamy lean. Only her lashes flutter. A hog-shaped taper hardens wrong on the bench. She will notice later.',
      full:
        'Luna slumps in her chair, belly round, honey pastry plate empty, a flower taper forgotten in her lap. She smiles at the ceiling. "I am wickless," she breathes happily. "Too full to burn."',
    },
    greetings: [
      line('Oh — you shimmered in the doorway. I mean arrived. Welcome. Hog or flower?', { reputationMin: 50 }, 3),
      line('Hello... I was making candles. I am always making candles. Sometimes I finish.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought honey pastry, you are my favorite customer. You might already be. I forget lists.', { willingnessMin: 64 }, 3),
      line('Shop open. Mind the wax. Mind the dreams. They spill.', {}, 1),
    ],
    afterFeeding: [
      line('That tasted like sunlight stored in comb. I will dream about it. Thank you.', { willingnessMin: 64 }, 3),
      line('Mmm... soft. Sweet. I feel heavier in the nicest way. Like warm wax.', { willingnessMin: 48, willingnessMax: 63 }, 2),
      line('...Good. I will make you a candle. It might be a hog. Hogs are honest.', {}, 1),
    ],
    topics: {
      selling: [
        line('Tapers last longer if you trim the wick. Hogs last longer because nobody wants to burn a hog. I sell both.', { reputationMin: 40 }, 3),
        line('Yara\'s wax, my hands, your coin — or your company. I prefer company. Coin buys pastry.', { stageMin: 4 }, 2),
        line('Everything here is shaped like something else. I am shaped like hunger lately. Buy a flower?', {}, 1),
      ],
    },
  }),

  authorPersona('ivy_herbal', {
    name: 'Ivy the Herbalist',
    bands: {
      slender:
        'Ivy the Herbalist catalogs leaves by scent the way others catalog sins — gently, thoroughly, without judgment. Her slender frame bends over drying racks with a hum that makes seedlings lean toward her as if she were light. She knows which tea eases a temper and which bread invites a second cup; her pockets smell of crushed mint and warm linen. At this stage she is narrow as a reed, wrists fine, hips a quiet promise beneath her skirt. She smiles when you approach as if you were a herb she has been hoping to identify.',
      curvy:
        'Ivy has grown curvy among her racks — slender no longer the whole story, waist softening, hips and seat filling out from bread and fruit taken while labeling bundles. She still hums to the seedlings; the hum vibrates now through new softness at her middle. Tea steam curls around her face; her cheeks carry permanent warmth. She tucks a leaf behind your ear with fingers that smell of honey and chamomile and does not comment on how her own bodice has learned new vocabulary.',
      plump:
        'Plump Ivy is the garden\'s gentle apothecary — belly round when she reaches high shelves, breasts soft against her arms as she grinds root, thighs pressing together on the stool where she sorts petals. She catalogs everything except how her body has bloomed; the ledger for that is written in seams let out twice. Fruit bowls empty faster when she tends them; tea never cools before she finishes a cup. She looks at you with calm eyes and offers bread like medicine that tastes too good to be only medicine.',
      large:
        'Large Ivy moves through the herb shed with slow grace — vast softness where slender once stood, belly leading between drying racks, hips brushing bundles that sway and release scent. Her hum is deeper now; seedlings still lean. She is a warm pressure in a room of leaves, every curve steeped in the same patience she gives her teas. When she sits, the stool creaks approval; when she breathes, the air tastes of comfort prescribed and gladly taken.',
      enormous:
        'Enormous Ivy has become a living infusion — immense, soft, seated among herbs that brush her shoulders like old friends. Her belly pools in her lap; her hands rest on it while she recites properties of bark she no longer needs to read from cards. The shed organizes itself around her warmth; tea steams perpetually on the bench beside her. She is gentleness at scale, appetite without sharp edges, a woman who fed every part of herself the way she feeds every guest — carefully, generously, until fullness feels like health.',
      immense:
        'Ivy the Herbalist is immense — a vast, serene presence in a room of hanging bundles, body spread on cushions she insisted were for patients, belly and breasts and thighs a landscape of tea-warm softness. Her immense frame does not hurry; nothing in her practice hurries. She hums; dust motes and dried petals drift in the melody. "There is a tea for every mood," she murmurs, patting the cushion beside her. "And bread for the moods tea cannot reach. Sit. I saved both."',
    },
    extras: {
      ceiling:
        'Ivy hangs face-down from candy ropes lashed around her chest, waist, and ankles, suspended above her drying racks with bundles brushing her hair. Her soft body sways; mint and chamomile rain gently downward. "Please," she says calmly, "cut me down before the leaves crush. They bruise so easily. So do I, today."',
      hold:
        'Ivy is frozen mid-grind, pestle hovering, slender-soft frame locked over the mortar. Only her eyes move, calm even now. A tea kettle whispers on the bench beside her unmoving warmth.',
      full:
        'Ivy sits among her cushions, belly taut, tea drunk, bread plate empty, hands folded on her middle. She hums a single note. "No more prescriptions today," she whispers, smiling. "Only rest. For both of us."',
    },
    greetings: [
      line('Welcome — I was just brewing something for a heavy heart. Yours looks lighter, but stay for tea anyway.', { reputationMin: 50 }, 3),
      line('Hello. Step softly; the mint is napping. How can I help you grow today?', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought bread or fruit, my kettle is already jealous. Share and sit.', { willingnessMin: 65 }, 3),
      line('Herb shed open. Breathe deep. Tell me what you need.', {}, 1),
    ],
    afterFeeding: [
      line('That was nourishment in the truest sense. Thank you. I feel... rooted.', { willingnessMin: 65 }, 3),
      line('Mmm. Warm. Gentle. Like good tea after rain. You have a gift.', { willingnessMin: 48, willingnessMax: 64 }, 2),
      line('...Thank you. I will remember that flavor when the larder looks thin.', {}, 1),
    ],
    offerFood: [
      line('For me? How kind. Set it here — I will make tea to match and pretend I am not already pleased.', { willingnessMin: 60, reputationMin: 35 }, 3),
      line('Food offered in kindness is the best herb. What have you brought?', {}, 2),
    ],
    topics: {
      gardening: [
        line('Leaves tell you when they are ready — not by calendar, by scent. People are similar, I think.', { reputationMin: 40 }, 3),
        line('Violet counts humidity; I count heartbeats. The garden needs both kinds of care.', { stageMin: 4 }, 2),
        line('Plant gently. Harvest gently. Eat gently. Growth responds to gentleness.', {}, 1),
      ],
    },
  }),
);

export default GARDEN_PERSONAS;
