/**
 * Harbor district — handcrafted NPC personas.
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export default mergePersonas(

  authorPersona('sal_dock', {
    name: 'Sal the Dockhand',
    bands: {
      slender: 'Sal the Dockhand heaves a crate onto the pier with rope burns on her palms — an athletic woman still mostly muscle and salt, shoulders broad, waist narrow, boots crusted with brine. She loads freight before the tide turns and eats when someone remembers to bring stew, yet her frame looks underfed beside the labor she spends, hunger written in every corded line that has not yet softened into abundance.',
      curvy: 'Sal has begun to soften between shifts — bust filling her oilskin, hips widening beneath rope-belted waist, thighs thickening with muscle and something sweeter. She still heaves crates; the pier still groans. But now there is warmth in her body when she straightens, a curve at her middle that stew and ale have coaxed out of discipline. Rope burns remain. So do new notches on her belt.',
      plump: 'Sal is pleasantly plump now, oilskin adjusted, belly softly rounded as she coils line on the pier — athletic frame buried under plush new curves, arms still strong, middle softer when she bends. She loads crates before the tide and unloads bowls after, ale in one hand, bread in the other, salt on her lips and satisfaction in her eyes. Dockhands whistle; Sal whistles back, patting a hip that sways with new weight.',
      large: 'Sal has grown large and hearty on the docks, oilskin straining across a heavy bust and deep belly, flesh shifting when she lifts — slower, grander, crates riding higher on curves that refuse to hide. She still works before the tide; she works harder now, breath deep, thighs thick, back broad and soft. Stew pots find her at shift end; she finds them back, empty, smiling, salt and satisfaction mixed on her tongue.',
      enormous: 'Sal is enormously full-figured now, a vast soft dockhand who must brace before lifting, oilskin open at the seams, flesh spilling warm against crates she still moves — because Sal always moves — belly vast, bust swaying, arms plush and powerful. The pier knows her silhouette from a distance: wide, salt-crusted, unapologetic. Tide waits; Sal makes it wait longer now, heaving freight and herself with equal stubbornness.',
      immense: 'Sal the Dockhand has become truly immense — a monumental woman of rope and flesh who fills the pier like a moored ship, oilskin replaced by panels that gave up, every inch soft and strong. She loads from a reinforced dolly now, still before the tide, still salt-crusted, belly resting on thighs that spread wide when she rests. Morgan calls her an asset. The harbor calls her legend. Sal calls it dinner.',
    },
    extras: {
      ceiling: 'Sal hangs face-down from candy ropes above the pier, crate crashed below, oilskin bunched, soft athletic body swaying in the sea breeze. "Wrong kind of hoist," she shouts, laughing despite herself. "Cut me down — tide won\'t wait, but my stomach might."',
      hold: 'Sal is frozen mid-lift with crate in arms, other hand on a rounded belly, boots planted wide. Even paralyzed, she looks like she is winning an argument with gravity.',
      full: 'Sal sits on a mooring bollard with crate forgotten, both hands on a belly taut with stew and ale, eyes on the tide, smile slow. "Shift can wait," she murmurs. "This feeling can\'t."',
    },
    greetings: [
      line('Back on the pier? Good — grab a line or grab a bowl. I got both. Preferably after you eat; I hate working alone.', { reputationMin: 50 }, 3),
      line('Hey. Tide\'s turning. Talk fast or haul slow — and if you brought fish stew, talk slower.', { willingnessMin: 60 }, 2),
      line('What. I\'m working. ...Unless you got food. Then I\'m listening.', {}, 1),
    ],
    afterFeeding: [
      line('Now THAT is provisioning. You\'d make a fine dockmate — or a fine troublemaker. Either way, thanks.', { willingnessMin: 65 }, 3),
      line('Solid. Warm. Keeps the salt from sticking. ...Appreciate it.', { willingnessMin: 50, willingnessMax: 64 }, 2),
      line('...Good. Don\'t expect me soft. ...Okay, maybe a little soft today.', {}, 1),
    ],
    topics: {
      friendly: [
        line('Harbor feeds who works it. Lately it\'s been feeding me back — generous, like Tina\'s stew pot.', { stageMin: 4 }, 3),
        line('Morgan sailed heavy crews. I load heavy crates. We both know weight is honest.', { reputationMin: 45 }, 2),
        line('Salt air makes you hungry. I make you useful. Fair trade if you share lunch.', {}, 1),
      ],
    },
  }),

  authorPersona('tina_rope', {
    name: 'Tina the Rope Coiler',
    bands: {
      slender: 'Tina the Rope Coiler laughs over the gulls with a hawser in hand — a mom-bod still mostly promise, forearms strong but waist not yet swallowed by softness, voice carrying across the pier. She coils rope with hypnotic rhythm, yet her frame looks like it could use more of the stew she smells from the dockside pot, hunger deferred for the satisfaction of perfect spirals.',
      curvy: 'Tina has begun to fill out between coils — bust swelling beneath her oilskin, hips widening, waist softening into the mom-bod she wears like a flag. Forearms still like mooring lines; belly beginning to match. She laughs louder now, voice bouncing off new curves, and the hawser rests on a hip that has grown plush enough to hold it without hands.',
      plump: 'Tina is pleasantly plump now, oilskin straining across a belly that presses against rope coils, bust heavy, hips wide, thighs thick when she sits on a bollard to work. Mom-bod in earnest — soft middle, strong arms, laugh that shakes the gulls twice as hard. She coils rope around herself as easily as around cleats, patting her middle between spirals like checking tide.',
      large: 'Tina has grown large and jovial on the docks, oilskin open at the seams, flesh spilling warm as she walks the pier with hawser over shoulder — belly vast for a coiler, bust swaying, forearms still rope-thick atop arms gone plush. Stew finds her; she finds stew back. Every laugh shakes new weight; every coil wraps a frame that refuses to hurry. Sal calls her anchor. Tina calls herself happy.',
      enormous: 'Tina is enormously full-figured now, a vast soft presence on the pier who must sit to coil the heavy lines, oilskin long surrendered, curves rolling with each guffaw that scatters gulls. Mom-bod monumental — belly resting on thighs, bust heavy, arms strong and soft — she works slower, happier, louder. The harbor hears her before it sees her; both sensations include warmth and salt and second helpings.',
      immense: 'Tina the Rope Coiler has become truly immense — a monumental woman of rope and laughter who fills the dockside like a moored laugh, flesh spilling serene on every bollard she sits on. She coils from a wide chair now, hawser draped like a shawl, belly vast, voice still carrying to the gulls and back. Morgan says she could moor a ship to herself. Tina says she already does at supper.',
    },
    extras: {
      ceiling: 'Tina hangs face-down from candy ropes above the pier, hawser tangled below, oilskin bunched, soft mom-bod swaying with each booming laugh. "Well THIS is a coil," she roars, cheerful. "Get me down before the gulls nest in my hair."',
      hold: 'Tina is frozen mid-coil with rope in hands, other hand on a rounded belly, grin stuck wide. Even paralyzed, she looks like she is about to tell a joke.',
      full: 'Tina sits on a bollard with rope forgotten in lap, both hands on a belly taut with stew and bread, head back, laughing softly at the sky. "Best knot I ever tied," she murmurs, patting her middle. "Around my appetite."',
    },
    greetings: [
      line('THERE you are! I was just telling Sal the tide\'s fine but my stew bowl\'s empty. Fix one of those for me, will you?', { reputationMin: 50 }, 3),
      line('Hey darling — pull up a bollard. I was coiling and thinking about seconds. Great combo.', { willingnessMin: 70 }, 2),
      line('Ho! You want rope talk or food talk? I do both loud.', {}, 1),
    ],
    afterFeeding: [
      line('Ohhh YES. That\'s harbor hospitality. My laugh\'s fuller already — listen!', { willingnessMin: 75 }, 3),
      line('Mmm. Warm as a sun deck. Thank you, darling.', { willingnessMin: 60, willingnessMax: 74 }, 2),
      line('...Good. Sal\'ll be jealous. Good.', {}, 1),
    ],
    topics: {
      tavern_chat: [
        line('Dock nights are loud nights — full mugs, full bowls, full bellies. I aim for all three.', { stageMin: 5 }, 3),
        line('Sal loads. I coil. The pot simmers. That\'s religion out here.', { reputationMin: 40 }, 2),
        line('Best conversations happen where rope smells and stew steams. You\'re in the right place.', {}, 1),
      ],
    },
  }),

  authorPersona('pearl_oyster', {
    name: 'Pearl the Oyster Shucker',
    bands: {
      slender: 'Pearl the Oyster Shucker flashes her knife above the stall — a slender woman quick as her blade, wrists narrow, waist small, brine on her lips from samples she insists are "quality control." Shell pop, knife flash, tips in a jar; her body stays knife-thin while her appetite works overtime, hunger visible in the speed she steals oysters when no one watches.',
      curvy: 'Pearl has begun to curve at the shucking block — hips widening beneath her apron, bust filling with a swell hidden under oilskin, thighs softening when she perches on her stool. Knife still flashes; shells still pop. But brine on her lips now accompanies color in her cheeks, a body rounding from samples that grew from tips to whole plates "for accuracy."',
      plump: 'Pearl is pleasantly plump now, apron straining across a belly that betrays every oyster she "quality controlled," bust soft, hips wide, thighs thick on the shucking stool. Knife flash slower — not from skill loss, from breath — shell pop followed by a satisfied exhale. Brine on her lips and fullness in her middle; she grins anyway, quick eyes, plush frame, jar of tips heavier because she keeps fewer samples and eats more.',
      large: 'Pearl has grown large and quick at the oyster stall, apron open at the seams, flesh shifting when she shucks — belly heavy, bust swaying, arms still fast atop plush new weight. Samples became meals; meals became legend. Customers watch the knife and the woman wielding it, both sharp, both softer than advertised. Brine and butter mix on her lips; she licks them between shells, unrepentant.',
      enormous: 'Pearl is enormously full-figured now, a vast soft shucker perched on a reinforced stool, apron long surrendered, curves spilling warm against the ice bed. Knife still flashes — magnificently — but the stall feels smaller, dominated by belly and bust and thighs that spread wide. Tips jar overflows; Pearl overflows too, shell pop punctuating each lazy, blissful breath between orders.',
      immense: 'Pearl the Oyster Shucker has become truly immense — a monumental woman of knife and brine who fills the stall like a tide pool made flesh, perched on a wide chair, blade in hand, belly vast and glistening under apron panels that gave up. She shucks still — for love, for tips, for the joy of eating what she opens — cheeks round, eyes quick, every oyster a confession she accepts with cream and laughter.',
    },
    extras: {
      ceiling: 'Pearl hangs face-down from candy ropes above the oyster stall, knife pinned safely below, apron tangled, soft body swaying over the ice bed. "Wrong shell," she snaps, grinning. "Cut me down before I melt the bed — and before I eat it."',
      hold: 'Pearl is frozen mid-shuck with knife raised, other hand on a rounded belly, brine on her lips, eyes daring you to comment. Even paralyzed, she looks fast.',
      full: 'Pearl slumps on her shucking stool with knife in lap, both hands on a belly taut with oysters and butter, eyes closed, smile lazy. "Quality control," she murmurs. "Extensive quality control."',
    },
    greetings: [
      line('Hey — you want a dozen or a story? I got both. Tips jar\'s light but my samples are heavy. Want one?', { reputationMin: 50 }, 3),
      line('Knife\'s sharp, oysters are fresh, I am... also fresh from lunch. Buy something before I eat the display.', { willingnessMin: 65 }, 2),
      line('Shell pop. What do you need?', {}, 1),
    ],
    afterFeeding: [
      line('Oh — THAT is briny heaven. You just bought loyalty. And maybe a discount. Maybe.', { willingnessMin: 65 }, 3),
      line('Mmm. Good catch. I\'ll remember you when the tide turns.', { willingnessMin: 50, willingnessMax: 64 }, 2),
      line('...Yes. Thank you. Don\'t tell Nell I ate off-shift.', {}, 1),
    ],
    topics: {
      selling: [
        line('Best oysters on the pier — shucked by me, sampled by me, sold to you with professional shame.', { reputationMin: 40 }, 3),
        line('Price is on the board. Freshness is in my hand. Hunger is in my eyes. Plan accordingly.', {}, 2),
        line('Buy a dozen. I\'ll throw in a grin. I\'ll throw in me not eating yours. High value.', { stageMin: 4 }, 2),
      ],
    },
  }),

  authorPersona('tess_warehouse', {
    name: 'Tess the Warehouse Foreman',
    bands: {
      slender: 'Tess the Warehouse Foreman stands on the loading dock with clipboard and whistle — an apple-shaped woman still mostly outline, waist pinched by authority, biceps defined by crates she refuses to let anyone else mark. Nothing enters or leaves without her stamp; nothing enters her ledger without weight recorded — including, lately, a frame that looks underfed beside the freight she guards.',
      curvy: 'Tess has begun to soften on the loading dock — bust filling her vest, hips widening beneath clipboard belt, biceps still strong but arms rounding pleasantly. She still blows the whistle; she still marks every crate. But there is warmth now when she climbs the steps, a curve at her middle that stew and shift-end ale have negotiated into her uniform one notch at a time.',
      plump: 'Tess is pleasantly plump now, vest let out, belly softly rounded as she stamps a manifest — apple shape ripened, bust straining buttons, hips wide, thighs thick when she mounts the dock stairs. Clipboard, whistle, and biceps remain; so does a softness that commands differently now — heavier, slower, impossible to ignore when she blocks a doorway with frame and authority both.',
      large: 'Tess has grown large and immovable on the warehouse floor, vest straining across a heavy bust and deep belly, flesh shifting when she whistle-stops a runner — grander, wider, stamp hitting paper like gavel. Crates still fear her. Dockhands too. Her appetite has joined the payroll: second helpings, third inspections that end at the stew pot, belly resting on clipboard when she sits to review manifests she mostly remembers.',
      enormous: 'Tess is enormously full-figured now, a vast soft foreman who must sit to stamp, vest open at the seams, curves spilling warm against the loading desk. Whistle still blows — breathier now, chestier — and nothing enters without her mark, including desserts Faye logs under "miscellaneous." Belly vast, bust swaying, biceps plush atop arms that still lift when shame demands. The warehouse built a wider chair. Tess filled it.',
      immense: 'Tess the Warehouse Foreman has become truly immense — a monumental woman of clipboard and flesh who fills the loading bay like a living gate, vest replaced by panels, every inch apple-shaped and absolute. She stamps from a reinforced desk now, whistle on a chain that disappears into soft cleavage, belly resting on thighs that spread wide. Crates enter. Crates leave. Tess stays — fed, immovable, legend.',
    },
    extras: {
      ceiling: 'Tess hangs face-down from candy ropes above the loading bay, clipboard crashed below, vest bunched, soft apple-shaped body swaying with indignant authority. "I stamp IN and OUT," she bellows. "Not UP. Cut me down before Faye logs this under \'miscellaneous.\'"',
      hold: 'Tess is frozen mid-whistle with clipboard raised, other hand on a rounded belly, eyes blazing. Even paralyzed, she looks like she is writing you up.',
      full: 'Tess sits at the loading desk with stamp forgotten, both hands on a belly taut with stew and bread, whistle beside her, eyes half-closed. "Inventory complete," she mutters. "Including me."',
    },
    greetings: [
      line('You. Back again. Good — I need someone who reads labels. And who doesn\'t steal from crate twelve. Lunch if you behave.', { reputationMin: 50 }, 3),
      line('State business. Briefly. I was between stamps and between bowls. Both are serious.', { stageMin: 4 }, 2),
      line('This is a warehouse, not a salon. Talk fast. ...Unless you brought stew.', {}, 1),
    ],
    afterFeeding: [
      line('Acceptable cargo. You\'d pass inspection. High praise — I don\'t give it hungry.', { willingnessMin: 55 }, 3),
      line('...Good. Logged under "approved." Don\'t expect a discount.', { willingnessMin: 45, willingnessMax: 54 }, 2),
      line('Unexpected delivery. Not rejected.', {}, 1),
    ],
    topics: {
      warning: [
        line('One crate out of place and you\'re off my dock. I\'ve grown too — doesn\'t mean I\'m soft on theft.', { reputationMax: -15 }, 3),
        line('Mind the forklift. Mind the manifest. Mind that I see everything from this chair now.', { reputationMin: -14, reputationMax: 25 }, 2),
        line('Rules are weighty. So am I. Both will crush you if you test them.', {}, 1),
      ],
      haggle: [
        line('You haggle like a seagull — loud, hungry, annoying. ...Fine. Five percent. Because you made me laugh.', { reputationMin: 45 }, 3),
        line('My prices are stamped. Your offer isn\'t. Fix it or walk.', { reputationMin: 25 }, 2),
        line('Warehouse rates don\'t shrink. Neither do I. Accept reality.', { stageMin: 5 }, 2),
      ],
    },
  }),

  authorPersona('faye_tally', {
    name: 'Faye the Warehouse Tally',
    bands: {
      slender: 'Faye the Warehouse Tally sits at the ledger desk with ink on her fingers — a slender woman precise as her columns, waist narrow, wrists fine, memory sharp enough to catch who under-reported weight by half a sack. Every crate has a number; Faye has a glare for discrepancies and a frame that looks fed on tea instead of dinner, hunger hidden behind professionalism.',
      curvy: 'Faye has begun to soften at the ledger — bust filling her blouse, hips widening beneath the stool, thighs pressing together when she crosses entries. Ink still stains her fingers; memory still catches cheats. But tea has joined pastry in the afternoon column, and her body keeps the receipts — curves rounding, cheeks coloring, a woman whose spreadsheets now include "personal sampling."',
      plump: 'Faye is pleasantly plump now, blouse adjusted, belly softly rounded as she totals manifests — slender precision buried under plush new curves, bust straining buttons, hips wide on a stool that creaks in arithmetic harmony. She remembers every under-reported crate and every snack she "logged as misc." Tess glares; Faye blushes and eats anyway, ink and crumbs mixing on her ledger.',
      large: 'Faye has grown large and meticulous at the tally desk, blouse open at the seams, flesh shifting when she reaches for the high shelf of reference ledgers — belly heavy, bust swaying, thighs thick, mind unchanged. Numbers still balance; so does her appetite, recorded nowhere official and everywhere visible. Dockhands bribe her with fish pastries; Faye accepts payment in full, literal and otherwise.',
      enormous: 'Faye is enormously full-figured now, a vast soft clerk wedged behind a desk expanded twice, blouse long surrendered, curves spilling warm against ledgers that cannot hide her anymore. She still catches cheats — memory sharp — but catches herself eating mid-column too, belly resting on the desk, ink smudged on soft fingers. "Miscellaneous" has become a category of its own. Tess suspects. Faye smiles, precise and full.',
      immense: 'Faye the Warehouse Tally has become truly immense — a monumental woman of ink and flesh who fills the tally office like a living ledger, draped in fabric that gave up, every inch soft and exact. She counts from a reinforced chair now, numbers in head, pastry in hand, belly vast on thighs spread wide. Every crate has a weight. Faye has one too. She records yours. She omits hers. Balance maintained.',
    },
    extras: {
      ceiling: 'Faye hangs face-down from candy ropes above the tally desk, ledger splayed below, blouse tangled, soft body swaying with mortified precision. "This is not in the column," she squeaks. "Cut me down — I\'ll log it under Acts of God. Misc."',
      hold: 'Faye is frozen mid-entry with quill poised, other hand on a rounded belly, ink on her lip. Even paralyzed, she looks like she is calculating your fault.',
      full: 'Faye sits at the desk with ledger closed, both hands on a belly taut with tea and pastry, quill behind ear, eyes closed. "Miscellaneous," she murmurs, smiling. "All of it miscellaneous."',
    },
    greetings: [
      line('Oh — hello. I was reconciling crate twelve. ...And my lunch column. One of us is over budget.', { reputationMin: 50 }, 3),
      line('Yes? Speak numbers if you can. If not, speak pastry. I am flexible today.', { willingnessMin: 55 }, 2),
      line('The ledger is open. So is my schedule. Briefly.', {}, 1),
    ],
    afterFeeding: [
      line('Logged under "gift incoming." Weight accurate. Taste... exceptional. Thank you.', { willingnessMin: 55 }, 3),
      line('...Good. I\'ll round in your favor this once. Don\'t tell Tess.', { willingnessMin: 45, willingnessMax: 54 }, 2),
      line('Unexpected entry. Accepted. Omitted from official totals.', {}, 1),
    ],
    topics: {
      harbor_tales: [
        line('Tide brings crates and rumors. I file the crates. I eat the rumors — with pastry. Both expand.', { stageMin: 4 }, 3),
        line('Morgan\'s crews come back heavier. I note it in margins Tess pretends not to read.', { reputationMin: 40 }, 2),
        line('Every shipment has a story. Most end at the stew pot.', {}, 1),
      ],
      haggle: [
        line('Your numbers don\'t balance. Fix them — or add a pastry line item. I am amenable to creative accounting.', { reputationMin: 45 }, 3),
        line('I count weight for a living. Your offer is light.', { reputationMin: 25 }, 2),
        line('Haggle with Tess. Haggle with me over tea and tart. Different ledgers.', {}, 1),
      ],
    },
  }),

  authorPersona('stella_nav', {
    name: 'Stella the Navigator',
    bands: {
      slender: 'Stella the Navigator stands over charts in the captain\'s cabin ashore — an athletic woman cool as compass glass, waist narrow, wrists fine, courses tattooed on her mind if not yet on a body still mostly line and discipline. She plots while Morgan plots trouble, rum half-empty on the desk, appetite deferred for latitude and longitude.',
      curvy: 'Stella has begun to curve in the chart room — bust filling her coat, hips widening beneath belted waist, thighs softening when she braces against the swell of a floorboard that mimics deck. Courses still perfect; plots still cool. But rum joins bread at the desk, and her body keeps the voyage receipts — rounding slow and sure as a ship finding warm water.',
      plump: 'Stella is pleasantly plump now, coat adjusted, belly softly rounded as she traces routes with charcoal — athletic frame buried under plush curves, bust heavy, hips wide, thighs thick when she sits on the widow seat watching harbor through salt glass. Morgan plots trouble; Stella plots courses and supper both, cool eyes, warmer middle, rum bottle emptier than yesterday.',
      large: 'Stella has grown large and cool in the navigator\'s nook, coat straining across a heavy bust and deep belly, flesh shifting when she rolls a chart — slower, grander, charcoal smudging soft fingers. Courses tattooed on mind and on body now — wide, serene, unflappable — she drinks rum like ballast and eats stew like policy. Morgan laughs; Stella smiles, precise and fed.',
      enormous: 'Stella is enormously full-figured now, a vast soft navigator wedged in the chart room chair expanded twice, coat open at the seams, curves spilling warm against maps that buckle under her middle when she leans. Plots remain flawless; appetite has become another instrument — belly vast, bust swaying, thighs spreading on charts she should not sit on but does anyway. Harbor watches Morgan\'s ship; Stella watches the horizon and the larder with equal calm.',
      immense: 'Stella the Navigator has become truly immense — a monumental woman of charts and flesh who fills the captain\'s cabin ashore like a moored galleon, coat replaced by draped wool, every inch soft and cool. She plots from a reinforced desk now, rum within reach, stew within reach, belly resting on thighs that spread wide over latitude lines. Morgan plots trouble. Stella plots courses around her own abundance. Both arrive on schedule.',
    },
    extras: {
      ceiling: 'Stella hangs face-down from candy ropes above the chart table, maps fluttering below, coat tangled, soft athletic body swaying with cool indignation. "This is not on any chart," she says flatly. "Cut me down. I will recalculate... later."',
      hold: 'Stella is frozen mid-plot with charcoal in hand, other hand on a rounded belly, eyes on the horizon through salt glass. Even paralyzed, she looks like she knows exactly where she is.',
      full: 'Stella sits in the widow seat with chart forgotten, both hands on a belly taut with stew and rum, eyes on the harbor, smile small. "Ballast," she murmurs. "Necessary ballast."',
    },
    greetings: [
      line('You. Good — I could use company that doesn\'t spill rum on the charts. ...Much. Sit. Talk. Eat if you brought it.', { reputationMin: 50 }, 3),
      line('Harbor\'s quiet. My stomach isn\'t. Coincidence? Plot says no.', { willingnessMin: 55 }, 2),
      line('State business. I am between courses — nautical and otherwise.', {}, 1),
    ],
    afterFeeding: [
      line('Acceptable provisioning. You\'d survive my crew. Compliment.', { willingnessMin: 55 }, 3),
      line('...Good. Stable. Like a calm sea. Thank you.', { willingnessMin: 45, willingnessMax: 54 }, 2),
      line('Logged mentally. Appreciated physically.', {}, 1),
    ],
    topics: {
      harbor_tales: [
        line('Morgan sails hungry crews home heavier. I chart the routes; the stew pot charts the rest.', { stageMin: 4 }, 3),
        line('Three seas taught me appetite follows tide. So does mine, ashore.', { reputationMin: 45 }, 2),
        line('Every voyage ends at a table. I am merely... extending the voyage.', {}, 1),
      ],
      friendly: [
        line('You seem seaworthy. Metaphorically. Literally if you share that bread.', { reputationMin: 50 }, 3),
        line('Cool head, warm middle — that\'s my policy now. Morgan\'s is trouble. Pick a mentor.', { stageMin: 5 }, 2),
        line('I plot courses. You plot kindness. Both arrive.', {}, 1),
      ],
    },
  }),

);
