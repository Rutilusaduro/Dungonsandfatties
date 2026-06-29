// Enemy definitions for the single dungeon run.
// Each entry is a plain object; DungeonBuilder stamps them into Character-like
// entities that Combat.js and EnemyController can consume.

import { ARCHETYPES } from '../combat/EnemyController.js';

// Per-instance counter so two copies of the same enemy in one encounter get
// distinct ids (needed for multi-enemy combat + discovery keying). Enemies are
// never serialized (they respawn on resume), so this need not survive a save.
let _enemyInstance = 0;
const slug = (s = '') => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

export function makeEnemy(def) {
  return {
    id:              def.id || `${def.archetype}_${slug(def.name)}_${_enemyInstance++}`,
    name:            def.name,
    _trait:          def.archetype,
    archetype:       ARCHETYPES[def.archetype],
    baseWeight:      def.baseWeight,
    currentWeight:   def.currentWeight ?? def.baseWeight,
    stomachCapacity: def.stomachCapacity ?? def.baseWeight * 0.8,
    fullness:        def.fullness ?? 0,
    willingness:     def.willingness ?? 50,
    description:     def.description,
    conditions:      { has: () => false, add() {}, remove() {}, keys: () => [], size: 0 },
    spellAffects:    [],
    isEnemy:         true,
    xpValue:         def.xpValue ?? 100,
    lootTable:       def.lootTable ?? [],
    bossEvent:       def.bossEvent ?? null,
    defeatText:      def.defeatText ?? null,
    fatThreshold:    def.fatThreshold ?? 0.50,
    phases:          def.phases ?? [],
    requiresFatPhase: def.requiresFatPhase ?? 0,
    isBoss:          def.isBoss ?? false,
    isMiniBoss:      def.isMiniBoss ?? def.isMiniBosse ?? false,
    // Stub _createContext so SpellNarrator doesn't crash on enemies
    _createContext(extra = {}) { return { subject: this, ...extra }; },
    processLongRestNutrition() { return null; },
  };
}

// ── Floor 1 — The Pantry ──────────────────────────────────────

export const FLOOR1_ENEMIES = [
  {
    name: 'Kitchen Imp',
    archetype: 'flyer',
    baseWeight: 80,
    stomachCapacity: 90,
    willingness: 45,
    description: 'A wiry imp that darts between shelves, pelting you with enchanted morsels.',
    xpValue: 80,
    lootTable: ['feeding_fork', 'ring_of_appetite'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The imp drops mid-dart, crashing into a shelf of preserves. Jars rattle and one tips, sloshing brine across its swollen ankles. It lies wedged between two shelves, wings pinned flat under rolls of accumulated fat, chittering indignantly at the ceiling.',
      succumbed: 'The imp stops flinging morsels and starts eating them. Then the ones it was saving. Then a string of dried mushrooms off the wall. It sinks to the pantry floor with a contented wheeze, too full to care that you\'re standing right there.',
      fattened: 'The imp\'s weight tips a shelf. Jars slide and shatter, spilling pickled onions and preserved plums in a spreading slick. The pantry reorganises itself around the new obstacle, shelves groaning sideways, tins stacking themselves into a wall around the bloated little creature.',
    },
  },
  {
    name: 'Pantry Goblin',
    archetype: 'brute',
    baseWeight: 140,
    stomachCapacity: 200,
    willingness: 55,
    description: 'A stocky goblin that lumbers forward, spooning enormous mouthfuls of lard at you.',
    xpValue: 120,
    lootTable: ['padded_robe', 'ring_of_appetite'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The goblin\'s lumbering stops when its legs give out under new weight. It sits down hard on the pantry floor, cracking a stone tile, and looks at its hands like they belong to someone else. The spoon is still in its fist. It has simply forgotten what to do next.',
      succumbed: 'Halfway through spooning lard at you, the goblin turns the spoon on itself. One mouthful becomes five becomes the whole crock. It finishes with a long, resonant belch that rattles the hanging strings of onions, then keels sideways against a sack of flour and closes its eyes.',
      fattened: 'The goblin sits down hard and something under the stone floor cracks. The nearest shelf of preserved goods tilts inward, jars nudging each other, one rolling off and smashing into brine-scented shards at its feet. The pantry feels smaller than it was a minute ago.',
    },
  },
  {
    name: 'The Snack Warden',
    archetype: 'dispeller',
    baseWeight: 200,
    stomachCapacity: 280,
    willingness: 60,
    description: 'A rotund custodian who periodically purges the enchantment weighing her down, making her maddeningly hard to fatten.',
    xpValue: 250,
    lootTable: ['gorging_ladle', 'enchanted_doublet', 'amulet_of_excess'],
    isMiniBosse: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Snack Warden\'s keys jangle slower now, dragged down by the weight pooling around her hips. She purges herself with less precision — missing a pocket of fullness here, skipping a stored pound there. Her uniform strains at every button. She stops walking between shelves and starts standing in one spot, turning in a slow, laboured pivot, lips pressed tight like she refuses to acknowledge what\'s happening to her body.',
      },
      {
        threshold: 1.0,
        text: 'The Warden\'s keys hit the floor. She can no longer lift her arm to hold them. She has doubled — her silhouette swallowing the narrow pantry aisle entirely, jars pressed against her back, shelf brackets digging into her sides. The purging stops. It isn\'t that she gives up; her body simply outweighs the magic. She braces against the shelves and breathes in short, heavy pulls, sweat beading on her forehead, the pantry reorganising itself around her new shape.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Warden sinks slowly against the pantry wall, keys dragging a long scrape across the stone as she goes down. She fills the aisle like a cork fills a bottle. Her hand still reaches for the purging gesture but there is nothing left to purge — every inch of her is simply, undeniably, permanently more.',
      succumbed: 'The Warden stops purging and starts eating. She reaches behind her — without looking, with a terrible muscle memory — and opens a jar of preserved cherries. Then another. Her keys lie forgotten on the floor. She eats the way someone does who has been holding back for years and has finally run out of reasons.',
      fattened: 'The Warden sags against the nearest shelf and the whole rack shifts under her. Jars clatter together, two topple, one rolls into the dark and pops its seal with a wet crack. The pantry feels like it contracted around her, shelves leaning in, the ceiling pressing lower, everything accommodating itself to the fact of her.',
    },
  },
];

// ── Floor 2 — The Kitchen ─────────────────────────────────────

export const FLOOR2_ENEMIES = [
  {
    name: 'Banquet Specter',
    archetype: 'glutton',
    baseWeight: 160,
    stomachCapacity: 350,
    willingness: 80,
    description: 'A ghost that died mid-feast. It gorges on ethereal food, swelling visibly. Succumb finisher opens fastest here.',
    xpValue: 180,
    lootTable: ['gorging_ladle', 'sanctified_buckler', 'hunger_focus'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The specter stops circling and simply drifts to rest against the kitchen wall, its form thickening and dimming. Even in death it gained weight — the ghost-fat real enough to cast a shadow across the prep counter. It regards you with the unfocused contentment of someone who has eaten everything they intended to eat.',
      succumbed: 'The specter sighs, a sound like warm air escaping an oven, and lowers itself to the kitchen floor. It phases halfway through the flagstones and gets stuck — too heavy, even in spirit, to sink the rest of the way. It doesn\'t try to rise. Its expression is perfect peace.',
      fattened: 'The specter swells until the oven heat bends around it rather than through it. The prep counter vibrates faintly, copper pots swaying on their hooks. Whatever haunts this kitchen has always been part of it — but now it\'s most of it, soft and translucent and enormous, pressing against the tiled walls with the weight of decades of unfinished meals.',
    },
  },
  {
    name: 'Oven Imp',
    archetype: 'flyer',
    baseWeight: 90,
    stomachCapacity: 100,
    willingness: 40,
    description: 'Fast and slippery, this imp hurls baked goods from above with unnerving accuracy.',
    xpValue: 160,
    lootTable: ['amulet_of_excess', 'feeding_fork'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The imp misses a wingbeat and drops, landing chest-first on the brick ledge above the oven door. It scrambles but can\'t get its legs under its new weight. It drapes there over the ledge like a sack of risen dough, tail twitching, wings spread for balance that isn\'t coming.',
      succumbed: 'The imp lands on the oven\'s warm top plate and just stays there. The baked goods meant for you go into its own mouth instead — rolls, pasties, the corner off a burnt loaf. It curls around the heat source and its eyes go half-lidded. The aggression leaves it all at once.',
      fattened: 'The imp drops from the rafters and hits the prep counter hard enough to scatter a bowl of flour into a white cloud. The oven light catches the bloom of powder settling over its new, generous shape. The hooks above it sway from the impact. The kitchen smells of browning dough, and the imp, spread soft and heavy across the counter, smells of both.',
    },
  },
  {
    name: "Chef's Nightmare",
    archetype: 'brute',
    baseWeight: 320,
    stomachCapacity: 500,
    willingness: 65,
    description: 'A massive construct of animated cookware and half-cooked meats. Heavy and relentless. Finishers open once fattened.',
    xpValue: 400,
    lootTable: ['fattening_staff', 'feast_plate', 'arcane_cookbook'],
    isMiniBosse: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Nightmare slows. Its component pots and pans fall out of sync, some swinging early, some dragging behind, the whole construction heaving with accumulated mass. The half-cooked meats threaded through its frame are cooking faster now — the fat in them rendering in the heat of swollen exertion. It charges but covers half the distance it used to before pulling up, clattering and steaming, to recalibrate.',
      },
      {
        threshold: 1.0,
        text: 'The construct\'s lower pots scrape the floor. The animated meats have rendered entirely — grease pooling in the joints where ladles connect to cauldron-lids, the whole thing sliding and slipping in its own drippings. A hanging brace from the kitchen ceiling cracks and the largest pot drops, swinging sideways, dragging the rest of the construct off-centre. The Nightmare lists badly to one side. Still moving. But barely.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Nightmare collapses in stages: first the lower cookware, then the midsection, then the high pots crash down into the pile. What remains is a heap of grease-black iron and overdone meat, heaving with effort that produces no motion. The kitchen ceiling still swings from the disturbance. Something inside the pile is still trying to lift.',
      succumbed: 'The construct goes still and then, slowly, begins feeding itself. The meats thread inward through the pots instead of outward toward you. The cookware turns and tips with strange purpose, each piece filling the next in some internal cycle of consumption. The Nightmare becomes less a weapon and more a machine doing the only thing it was ever really built to do.',
      fattened: 'The construct crashes into the prep counter and the whole counter tears from the wall, tiles cracking, hooks above raining onto the kitchen floor. The Nightmare sits in the rubble, cookware dented and steaming, half-cooked meats pressed against the floor. The kitchen reorganises its own chaos: pots roll to new positions, the debris settles into something like a throne.',
    },
  },
];

// ── Floor 3 — The Feasting Hall ───────────────────────────────

export const FLOOR3_ENEMIES = [
  {
    name: 'Glutton Knight',
    archetype: 'brute',
    baseWeight: 280,
    stomachCapacity: 450,
    willingness: 70,
    description: 'A former champion who traded martial prowess for an unstoppable appetite.',
    xpValue: 280,
    lootTable: ['feast_plate', 'dread_orb'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The knight\'s charge becomes a stagger becomes a halt. He plants his feet and cannot unstick them — the stone floor holds him like he was poured there. His gauntlets scrape across his breastplate as he reaches for leverage that isn\'t there. The feasting hall echoes with his armour\'s creak.',
      succumbed: 'The knight lowers his weapon not in defeat but in distraction. His eyes go to the banquet table — still laden, still magnificent — and he forgets the fight entirely. He seats himself at the nearest setting, plate by plate, working through the feast with the systematic focus he once applied to swordsmanship.',
      fattened: 'The knight hits the banquet table and the whole thing slides on the stone, silverware cascading, candelabras tipping and catching each other. A chandelier above shivers and one crystal drops, turning slow in the torch light before shattering on the flagstones. The great chair at the table\'s end shifts as if making room.',
    },
  },
  {
    name: 'Feasting Wraith',
    archetype: 'dispeller',
    baseWeight: 200,
    stomachCapacity: 300,
    willingness: 55,
    description: 'Incorporeal unless feasting. It purges itself constantly, resisting your fattening spells — until you break its rhythm.',
    xpValue: 320,
    lootTable: ['arcane_cookbook', 'dread_orb'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The wraith becomes solid all at once — the incorporeal trick running out when there\'s simply too much of her to vanish. She stands in the hall\'s torchlight, fully present, fully visible, breathing in a way she hasn\'t had to in years. Confused and enormous and entirely stuck.',
      succumbed: 'The wraith\'s rhythm breaks. She stops purging and lets the next wave of enchantment roll through her — lets herself feel it, solid and warm and real. For the first time since her death she has mass that doesn\'t fight being felt. She settles into it, into the hall\'s cold stone, and does not try to leave.',
      fattened: 'The wraith solidifies all at once under the weight gain and her feet hit the stone floor with a boom that rolls down the feasting hall. A long crack opens in the flagstones beneath her. The chandelier sways. The banquet table shudders. Every torch in its sconce gutters and steadies, as if the hall had held its breath.',
    },
  },
  {
    name: 'The Grand Gourmand',
    archetype: 'brute',
    baseWeight: 500,
    stomachCapacity: 900,
    willingness: 60,
    description: 'The ancient lord of this dungeon. Immense, slow, and fiercely resistant to every finisher path — except the one you\'ve prepared for.',
    xpValue: 1000,
    lootTable: ['legendary_band'],
    isBoss: true,
    requiresFatPhase: 1,
    bossEvent: 'When the Grand Gourmand finally succumbs, the whole hall trembles. The enchanted feast-tables crack under spreading mass. A golden ring — the Gourmand\'s Band — rolls free from the wreckage. Behind the throne, a stairwell you had not seen before yawns downward into the dark.',
    phases: [
      {
        threshold: 0.5,
        text: 'The Grand Gourmand is still fighting but she is fighting differently. Her movements eat more of the floor, each step reshaping the space she occupies. The nearest chandelier sways from the vibration of her footfalls. Two feast-tables have shifted outward — not from impact, from displacement, the room accommodating her expansion without being asked. Her expression hasn\'t changed. Her tactics have. She stops trying to press you back and starts circling, conserving what little motion remains available to her, pulling entire serving platters from the tables as she passes and eating as she turns.',
        aiShift: 'glutton',
      },
      {
        threshold: 1.0,
        text: 'The Grand Gourmand has doubled. The great chair behind her is a ruin — she backed into it without noticing and the carved legs simply gave. A chandelier chain snaps and the fixture crashes into the far end of the hall, candles skittering across the stone. The feast-tables are pressed flush against the walls now. The floor groans under her with every breath she draws. She is still here. She is still hungry. But the room is running out of space for both of you.',
      },
    ],
    defeatText: {
      immobilized: 'The Grand Gourmand stands and then does not. The moment her weight crosses whatever threshold the hall can manage, the floor stops being purely solid and starts being something closer to a cradle. She sinks a quarter-inch into the stone — not through it, just into it — and the hall holds her there. Her hands are at her sides. She breathes in vast, shuddering intervals. The chandeliers have gone quiet.',
      succumbed: 'The Gourmand reaches past you for the nearest platter and eats. She eats with the absorption of someone who has forgotten the fight existed. Course after course from tables that keep extending toward her, accommodating, generous, this hall built for exactly this moment. She does not look at you again. She has somewhere else to be.',
      fattened: 'The Grand Gourmand sways and the hall answers. Both chandeliers shear from their mounts and drop with a sound like a bell struck twice, chains pooling on the stone in spreading rings of gold. The feast-tables crack down their centres, groaning apart. The great chair at the hall\'s head splits along every seam. The stone floor, impossibly, holds. It was built for this. She was always going to end up here.',
    },
  },
];

// ════════════════════════════════════════════════════════════
// SCALE-4X — floors 4-12. Three new biomes, escalating stats.
// ════════════════════════════════════════════════════════════

// ── Floor 4 — The Cellars ─────────────────────────────────────
export const FLOOR4_ENEMIES = [
  {
    name: 'Cellar Slime', archetype: 'leech', baseWeight: 180, stomachCapacity: 260, willingness: 50,
    description: 'A translucent ooze that drinks rendered fat from the cold-store and feeds the surplus straight back at you.',
    xpValue: 200, lootTable: ['basting_brush', 'bib_of_the_bottomless'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The slime spreads too wide to move with any purpose. It laps at the cold-store floor, thinning at the edges, thickening at the centre, unable to collect itself into anything mobile. A deep cold settles over the cellar as the slime lies there, immovable, glistening.',
      succumbed: 'The slime stops feeding back at you and turns inward, absorbing the rendered fat it stored rather than firing it. It thickens and dims, growing opaque, growing still. The cold-store smells of brine and slow contentment.',
      fattened: 'The slime swells until a brine barrel cracks against its mass. Cold brine floods the cellar floor in a dark wave. The cold-store rack collapses sideways. The slime settles into the flood like it was made for it, enormous and translucent and finally, catastrophically full.',
    },
  },
  {
    name: 'Pickle Wraith', archetype: 'trickster', baseWeight: 150, stomachCapacity: 220, willingness: 45,
    description: 'A briny spectre that slips between barrels, sloshing and dodging, never where your spell lands.',
    xpValue: 220, lootTable: ['charm_of_craving', 'skewer_of_searing'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The wraith misjudges the gap between two barrels and wedges in, the gap accepting her old width and refusing her new one. The barrels hold. She presses and cannot shift. The brine smell is very strong and the cellar is very quiet.',
      succumbed: 'The wraith stops dodging and drifts to rest against the tallest barrel stack, leaning into the cold wood like it\'s a chair she\'s been looking for. Her incorporeal edges stop flickering. She becomes, temporarily, very real and very satisfied.',
      fattened: 'The wraith solidifies from the weight gain and her shoulder clips a barrel stack. Three barrels roll, one shatters, and brine floods the cellar floor in an ankle-deep cold wave. She stands in the flood, looking at it, then at her hands, adjusting to the fact of herself.',
    },
  },
  {
    name: 'The Brinemother', archetype: 'warden', baseWeight: 300, stomachCapacity: 420, willingness: 58,
    description: 'A vast salted matron who pickles away every ounce you force on her, resisting satiation to the last.',
    xpValue: 460, lootTable: ['quilted_gambeson', 'trencher_shield'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Brinemother\'s pickling slows. She reaches for the salt gesture and completes it late — a half-second behind your spells, letting one in two through unprocessed. She is still vast, still immovable-seeming, but her breath comes harder and her apron strings have separated at the back. The barrel she stands beside is being slowly pushed sideways by her expanding hip.',
      },
      {
        threshold: 1.0,
        text: 'The Brinemother stops pickling entirely. Her focus narrows to holding herself upright, and even that is failing — she leans hard against the barrel rack and the rack bends under her. Brine seeps from cracked staves, trickling across the cellar floor. She is twice what she was and the cold-store was not designed for this. The smell of brine and salt fat is overwhelming, thick as fog.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Brinemother settles against the barrel rack and the rack bows out under her. The cold-store door at the far end of the cellar bursts open from the pressure change. She breathes, slowly, and each breath makes the barrels creak. She is part of the cellar now, as fixed as the salt-stained walls.',
      succumbed: 'The Brinemother reaches behind her and opens a barrel — not to preserve herself, but to drink. She tilts the stave and swallows the brine in long pulls, the salt working through her like a tide. She sinks to the floor with the barrel in her arms, enormous and content, preserving herself from the inside.',
      fattened: 'The Brinemother staggers and her shoulder meets the barrel rack. The rack splits down its spine. Four barrels crack against each other and brine floods the cold-store in a stinking wave, ankle-deep and icy. The cellar goes cold and dark and the Brinemother stands in the flood, enormous and immovable, water parting around her feet.',
    },
  },
];

// ── Floor 5 — The Cold Larder ─────────────────────────────────
export const FLOOR5_ENEMIES = [
  {
    name: 'Lard Golem', archetype: 'brute', baseWeight: 340, stomachCapacity: 480, willingness: 60,
    description: 'A lumbering figure packed from rendered tallow. Slow, soft, and easy to pile higher.',
    xpValue: 260, lootTable: ['cramming_spoon', 'larders_apron'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The golem stops moving and starts simply existing — a column of rendered tallow, pale and enormous, occupying more of the cold larder than any one thing should. The chill settles back around it. The tallow firms slightly in the cold air.',
      succumbed: 'The golem\'s aggression melts along with everything else. It sinks into itself, softening in waves, a slow gravitational process that ends with it spread wide and flat across the larder floor. The temperature drops. The cold larder accepts it.',
      fattened: 'The golem grows until the larder ice cracks beneath it. Sheet-ice fractures in a pattern outward from its feet, the sound like a distant bell. Frozen goods on the wall shelves avalanche off in slow motion — waxed loaves, sealed crocks, a side of frozen venison that hits the floor and slides.',
    },
  },
  {
    name: 'Frost Imp', archetype: 'flyer', baseWeight: 110, stomachCapacity: 140, willingness: 42,
    description: 'It darts through the chill flinging frozen cream-puffs that burst on impact.',
    xpValue: 240, lootTable: ['whisk_of_the_whirlwind', 'girdle_of_gula'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The imp tries to fling one last cream-puff and overbalances. It crashes into the cold larder shelf and ice crystals shower from the impact point. It hangs there against the shelf, frost forming on its new rounded flanks, wings unable to beat without something to push against.',
      succumbed: 'The imp lands and begins eating the cream-puffs it meant to throw at you. Methodically, without ceremony, one after another until the pouch is empty and the imp is round as a snowball. It tucks its wings in and closes its eyes against the cold.',
      fattened: 'The imp hits the cold larder wall and the ice coating cracks from floor to ceiling in a jagged line. Frozen cream-puffs stored on the top shelf cascade down. The chill sharpens as the break lets deeper cold through, and the imp sits in the avalanche of its own ammunition, unable to work up the wings to leave.',
    },
  },
  {
    name: 'The Glacier Glutton', archetype: 'glutton', baseWeight: 280, stomachCapacity: 560, willingness: 78,
    description: 'A half-frozen feaster that thaws only to gorge, swelling visibly with every mouthful it steals.',
    xpValue: 520, lootTable: ['ledger_of_gluttony', 'pact_morsel'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Glacier Glutton is thawing faster than it can refreeze. The crust of ice across its belly has cracked and fallen in sheets, exposing soft pink skin beneath. It gorges with increasing desperation — not to fight you, but because eating is the only thing that feels like staying warm. The cold larder temperature rises a degree. The frozen goods on the top shelf begin to sweat.',
      },
      {
        threshold: 1.0,
        text: 'The Glutton is fully thawed. No ice left, no crust — just weight, enormous and warm, steaming in the cold larder air. The room temperature climbs further and a frozen haunch on the upper shelf begins to drip, fat beading and falling. The Glutton takes up nearly a third of the larder floor. It gorges without stopping now, without strategy, eating because that is what it has always been and the cold has stopped working as a reason not to.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Glutton thaws completely and the cold larder can\'t reclaim it. Its enormous warm weight melts a silhouette into the ice floor, sinking half an inch. Frozen goods drip from shelves above. The cold can\'t contain something that big and that thoroughly fed.',
      succumbed: 'The Glutton stops fighting and starts eating with both hands. The cold larder thaws around it from the inside out — a warm centre in a cold room, everything within reach going soft, the walls weeping condensation, the glutton eating and eating and filling the space with the heat of deep satisfaction.',
      fattened: 'The Glutton\'s expanded mass shatters the larder ice in a ring around it. Cracks race toward the walls and frozen goods avalanche off every shelf: sealed crocks, preserved haunches, whole frozen fish sliding onto the floor in a heavy, cold cascade. The larder stops being cold. The Glutton has warmed it from the centre out.',
    },
  },
];

// ── Floor 6 — The Smokehouse ──────────────────────────────────
export const FLOOR6_ENEMIES = [
  {
    name: 'Smoke Revenant', archetype: 'dispeller', baseWeight: 240, stomachCapacity: 340, willingness: 55,
    description: 'A haze of cured-meat smoke that disperses your feeding magic as fast as you cast it.',
    xpValue: 300, lootTable: ['tenderizing_maul', 'band_of_second_helpings'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The revenant condenses — the smoke pulling inward, gaining mass, unable to dissipate because there is simply too much of it now. The smokehouse haze thickens around it. The revenant stands, solid and enormous and unable to spread thin again, coughing softly in the dark.',
      succumbed: 'The revenant stops dispersing and starts drawing the smoke in. It breathes deeply, pulling the cured-meat haze into itself, growing denser and more real with each breath. The smokehouse clears slightly around it. The revenant becomes, for the first time in its haunting, genuinely present.',
      fattened: 'The revenant solidifies under the weight and the smoke thickens tenfold around it — a new haze pouring off the fat, curling under the hooks, rising to the rafters. The fire pit flares with the added fuel of all that rendered warmth. The smokehouse fills until you can barely see the walls.',
    },
  },
  {
    name: 'Hung Hog', archetype: 'brute', baseWeight: 400, stomachCapacity: 560, willingness: 64,
    description: 'An enormous smoked hog, somehow still hungry, swinging from a hook and charging when it drops.',
    xpValue: 320, lootTable: ['brigandine_of_surfeit', 'mantle_of_the_well_fed'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The hog drops from the hook and the impact shakes the smokehouse floor. It skids forward, carried by momentum and new mass, and comes to rest against the far wall with a sound like a barrel being packed. The hook above swings empty. The hog breathes, enormous and still.',
      succumbed: 'The hog drops off the hook of its own accord and begins eating from the floor — sawdust, drippings, whatever\'s down there — with a single-mindedness that has nothing to do with fighting. It eats until it runs out of things to eat, then lies down in the sawdust and steams gently.',
      fattened: 'The hook strains and snaps and the Hung Hog drops with a crash that shakes every remaining hook in the smokehouse. Smoked haunches swing violently on their chains. The fire pit acknowledges the impact with a flare, sending sparks spiralling up. The hog lies in the sawdust, too large now to hang, too large to do much of anything.',
    },
  },
  {
    name: 'The Pitmaster', archetype: 'warden', baseWeight: 420, stomachCapacity: 600, willingness: 66,
    description: 'Tender of the eternal fire. He bastes away your every effort and refuses to be sated.',
    xpValue: 620, lootTable: ['pendant_of_plenty', 'tenderizing_maul'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Pitmaster\'s basting slows. His arm makes the motion but doesn\'t follow through — the weight dragging his elbow down before the brush connects. He is still standing at his fire pit but he is standing differently, leaning against the pit\'s brick rim, his apron pulled taut across his midsection. The smoke thickens around him like it is drawing close. He squints through it at you with an expression that hasn\'t changed but means something different now.',
      },
      {
        threshold: 1.0,
        text: 'The Pitmaster drops his brush. He doesn\'t bend to retrieve it. He stands at the edge of the fire pit and his shadow covers half the smokehouse floor. The eternal fire reflects in his eyes and in the rendered fat across every surface of him. He opens his mouth and closes it again. He was going to say something about resisting. He no longer believes it.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Pitmaster leans into the fire pit rim and the brick cracks under him. He sags there, enormous, the fire below warming the rendered fat that coats him from basting and from being. The smoke rises around him. He tends the fire still — from this position, from here, which is the only position available.',
      succumbed: 'The Pitmaster reaches for the nearest hung haunch and pulls it down and eats it without tools, without ceremony. He has tended fires for everything that hangs here. He earned this. He eats through two more haunches before he sits down heavily beside the pit, satisfied in a way the eternal fire never made him.',
      fattened: 'The Pitmaster staggers and his shoulder catches the hook rack. Every hook swings. Smoked meat bounces and sways in the thick air. The fire pit flares as displaced air hits the coals, sending a column of sparks up through the smokehouse vent. The Pitmaster stands in the fire-glow, enormous, the smoke coiling around him like it always has, like he belongs to it.',
    },
  },
];

// ── Floor 7 — The Bakery ──────────────────────────────────────
export const FLOOR7_ENEMIES = [
  {
    name: 'Dough Horror', archetype: 'glutton', baseWeight: 320, stomachCapacity: 680, willingness: 80,
    description: 'A risen mass of living dough that proofs larger by the second, doubling and doubling.',
    xpValue: 360, lootTable: ['glazing_glaive', 'grimoire_of_swelling'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Dough Horror fills its corner of the bakery and keeps filling it, rising against the walls, pressing flour dust up into the air. It has stopped being a creature and started being a phenomenon — warm and vast and quietly alive, breathing through a dozen slow mouths in its surface.',
      succumbed: 'The Horror begins incorporating everything around it — a dropped rolling pin, a measure of sugar, the warmth of the nearest oven. It rolls over itself in slow, satisfied waves. The bakery smells overwhelmingly of proving bread. Something that can eat forever finally finding enough.',
      fattened: 'The Dough Horror expands against the bakery wall and bread begins rising in sympathy around it — loaves on shelves blooming out of their tins, proving dough on the counter doubling in minutes. Flour clouds the air from disturbed sacks. The ovens, sensing a surplus, click louder.',
    },
  },
  {
    name: 'Sugar Sprite', archetype: 'trickster', baseWeight: 160, stomachCapacity: 240, willingness: 48,
    description: 'A glittering blur that crystallises out of reach and dissolves your spells in spun sugar.',
    xpValue: 380, lootTable: ['torc_of_the_titan_table', 'aegis_of_plenty'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The sprite crystallises mid-dart and doesn\'t dissolve. The sugar sets around her new shape — a glittering solid mass, suspended in mid-air for a moment before the weight drops her to the bakery floor. She lands with a musical crack, sugar-encrusted and very, very stuck.',
      succumbed: 'The sprite dissolves her own sugar defences and lets the enchantment through. The sweetness turns inward. She expands slowly, crystallising at the edges into a confection of herself, sitting in the middle of the bakery floor with an expression of transparent pleasure.',
      fattened: 'The sprite crashes into the shelf of spun-sugar work and it all comes down — fragile towers, pulled threads, a caramelised showpiece that shatters on the bakery floor in a sweet, brittle rain. Flour rises from the impact. The sprite sits in the wreckage, surrounded by the sugar that used to protect her, eating it.',
    },
  },
  {
    name: 'The Head Baker', archetype: 'brute', baseWeight: 480, stomachCapacity: 700, willingness: 68,
    description: 'Flour-dusted and immense, she kneads the very air, pressing weight onto everything in the room.',
    xpValue: 760, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Head Baker\'s kneading slows. Her arms still move but with different rhythm — the weight in them adding texture to every push. Her white apron has gone grey at the stress points. She breathes flour when she breathes out. The bakery ovens seem to be running hotter now; the bread rising in them has started to burst its tins. She notices. She is not used to things escaping containment in her kitchen.',
      },
      {
        threshold: 1.0,
        text: 'The Head Baker fills the central bakery aisle. The proving shelves on either side are pressed outward, tins falling, loaves rolling across the floor. She can no longer reach the back ovens. Her hands are still making the kneading motion — absent, habitual, the baker continuing without the bakery. The flour in the air settles on her in a second skin. She is white and enormous and absolutely in the way.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Baker plants her hands on the work counter and does not straighten up. The counter bows slightly but holds — it was built for her, or something like her. She stands bent over it, enormous and flour-white, breathing heavily, and the bakery works around her: ovens clicking, bread rising, everything continuing as it always has.',
      succumbed: 'The Baker reaches for a loaf straight from the oven without mitts. The crust burns her palm. She eats it anyway, quickly, and reaches for another. The fighting was a distraction. She knows what she is and she knows what a bakery is for. She eats through three loaves before sitting down on the floor, flour clouds rising at the impact.',
      fattened: 'The Baker stumbles and her hip takes the proving shelf off the wall. Fifty tin loaves hit the floor, bread rising from the impact, flour erupting upward in a white column. The ovens respond with a collective clunk of expanding metal. Somewhere in the back a loaf bursts from its tin with a sound like a small celebration. The bakery floor is covered in bread and flour and the Baker stands in the middle of it all, immense and white, as if she baked herself.',
    },
  },
];

// ── Floor 8 — The Confectionery ───────────────────────────────
export const FLOOR8_ENEMIES = [
  {
    name: 'Caramel Colossus', archetype: 'brute', baseWeight: 520, stomachCapacity: 760, willingness: 66,
    description: 'A slow titan of hardening caramel; every spell you land sets into another golden layer.',
    xpValue: 420, lootTable: ['honey_lance', 'hauberk_of_hunger'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Colossus stops. The caramel locks around its joints. It stands with one arm raised, mid-swing, golden and enormous — a statue that breathes. The confectionery is warmer now, the caramel softening near its core even as it sets on the surface.',
      succumbed: 'The Colossus begins consuming its own caramel shell. Layer by layer, from the outside in, peeling golden strips and eating them. The room fills with burning-sugar smell. It settles inward as it goes, a tide of amber and contentment.',
      fattened: 'The Colossus crashes against the copper work surface and caramel sets in the dent it leaves. The whole surface warps, sugar crystallising in cracks across the floor around its feet. Caramel drips from it like sweat — golden, slow, sweet-smelling — pooling and setting into the cracks as it falls, making the confectionery floor into an exhibit.',
    },
  },
  {
    name: 'Bonbon Swarmling', archetype: 'leech', baseWeight: 220, stomachCapacity: 340, willingness: 56,
    description: 'A rolling clutch of animate chocolates that gorge each other and spit the overflow at you.',
    xpValue: 440, lootTable: ['signet_of_satiation', 'famine_sigil'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The swarm coheres into one mass — the individual bonbons too full to separate, pressed together by mutual weight. The result sits in the middle of the confectionery floor: a single, enormous, slowly breathing chocolate. The smell is overwhelming.',
      succumbed: 'The swarm stops spitting and starts swallowing. Each bonbon feeds its neighbour until they\'re all feeding each other in a closed loop of surplus. The overflow has nowhere to go. The swarmling becomes a dense, still, amber-dark pile, gorged past motion.',
      fattened: 'The swarm coalesces under the fat gain and crashes into the display case. Glass shatters. Sugar-dusted confections scatter across the floor. Caramel sets around the pile in a moat. The Confectionery\'s centrepiece display is gone, replaced by a pile of very full bonbons, and somehow it is a more complete decoration.',
    },
  },
  {
    name: 'The Confectioner', archetype: 'dispeller', baseWeight: 460, stomachCapacity: 640, willingness: 70,
    description: 'A precise, terrible artisan who dissolves your enchantments like sugar in hot water.',
    xpValue: 880, lootTable: ['signet_of_satiation', 'famine_sigil'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Confectioner\'s precision slips. She reaches for your enchantment to dissolve it and misjudges — the pull too strong, her hands not quite where she expects them to be. Her white gloves no longer fit cleanly and the extra bulk affects her timing by a fraction. A fraction is everything in confectionery. She dissolves less. She sweats more. The caramel on the work surface nearest her begins to set wrong, following her warmth rather than the recipe.',
      },
      {
        threshold: 1.0,
        text: 'The Confectioner stops dissolving. She stands at her marble slab, hands flat on its surface, and lets the enchantments sit in her. She has spent a professional lifetime mastering dissolution. She did not master this. The caramel on the slab has hardened around her fingers. The sugar crystals on the walls near her have grown an extra millimetre. She becomes, against every instinct, an exhibit in her own confectionery.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Confectioner leans on her marble slab and the slab, which has never moved in forty years of professional use, slides two inches. She does not correct it. She is too busy being exactly where she is — enormous and still and caramel-warm, her craft undone by the very precision that made her good at it.',
      succumbed: 'The Confectioner eats a piece off the display. Then the second. She eats through the display with the critical eye of a professional finding fault, and once she runs out of faults she keeps going. She eats without plate or presentation, standing at the case in her work gloves, eating everything she made today and not minding.',
      fattened: 'The Confectioner staggers into the copper piping above her workstation and a cascade of warm caramel pours across the marble slab. She stands in it. The caramel sets around her feet, crystallising up her ankles, making her part of the exhibit. Sugar crystallises on her shoulders in fine white prickles. The confectionery accepts her as a permanent installation.',
    },
  },
];

// ── Floor 9 — The Honeyed Halls ───────────────────────────────
export const FLOOR9_ENEMIES = [
  {
    name: 'Mead Wyrm', archetype: 'glutton', baseWeight: 380, stomachCapacity: 820, willingness: 82,
    description: 'A drunken serpent swollen on spilled mead, gulping anything sweet within reach — itself included.',
    xpValue: 480, lootTable: ['cauldron_breaker', 'torc_of_the_titan_table'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The wyrm stops coiling. It spreads flat, enormously long and enormously wide, occupying the corridor in a soft, breathing carpet. The honeycomb above it bends inward. The mead smell is thick enough to taste.',
      succumbed: 'The wyrm finds a spilled mead barrel and drinks directly from the crack. Satisfied and drowning in itself, it coils into a vast golden ring and closes its eyes. The hall goes quiet except for the slow sound of something very large settling.',
      fattened: 'The wyrm expands against the honeycomb wall and the wax cells crush inward, releasing a flood of honey across the floor. It pools around the wyrm\'s vast form. The honeyed hall goes sweet and amber and very still, the wax moulding itself around the wyrm\'s shape as if it always grew here.',
    },
  },
  {
    name: 'Comb Guardian', archetype: 'warden', baseWeight: 500, stomachCapacity: 700, willingness: 64,
    description: 'A waxen sentinel that seals itself against satiation behind walls of dripping honeycomb.',
    xpValue: 500, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Guardian\'s wax seals crack. The honeycomb walls press inward as the Guardian expands outward and the two meet in the middle, wax moulding to skin, the sentinel becoming part of the structure it was meant to guard.',
      succumbed: 'The Guardian opens a honeycomb cell behind it and drinks. Then another, and another, the wax crumbling as it goes. It does not seal itself. It does not resist. The hall fills with the smell of opened honey and the Guardian, settling into its own weight, finally lets something in.',
      fattened: 'The Guardian\'s expansion presses the honeycomb walls outward. Cells crack and honey floods the floor, ankle-deep and slow. The wax re-forms around the Guardian\'s new shape — growing fast, building itself to the new dimensions, sealing the Guardian into the hall as a permanent fixture.',
    },
  },
  {
    name: 'The Honey Queen', archetype: 'leech', baseWeight: 560, stomachCapacity: 900, willingness: 72,
    description: 'Vast and golden, she drinks tribute from her swarm and pours the excess down your throat.',
    xpValue: 1000, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Honey Queen\'s swarm grows agitated. They sense what is happening to her and swarm tighter, bringing tribute faster, as if quantity could correct the quality of the problem. The Queen accepts it all — she is still drinking from them, still pouring excess toward you, but her movements have thickened. The throne of honeycomb she presses back against is deforming under her. The wax is warm enough to take a new shape.',
      },
      {
        threshold: 1.0,
        text: 'The swarm goes still. They settle on every surface in the hall and do not move — not tribute-bearing, not aggressive, just present. The Honey Queen is twice what she was. Her honeycomb throne has collapsed into a plinth of compressed wax and she sits on it like she was born to, the hall quiet and amber and thick with the smell of hot honey. She is still receiving. She is no longer fighting.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Honey Queen sinks into her throne and the throne sinks into the hall floor. The wax moulds upward around her, warm and accommodating, the hive remodelling itself in real time. The swarm circles and settles. The hall goes quiet with the specific quiet of a place doing what it was built for.',
      succumbed: 'The Queen stops distributing tribute and starts consuming it. She drinks directly from the honeycomb cells within reach, the swarm watching in a stillness that reads as approval. She fills the throne-space with her satisfaction, golden and enormous, and the hall goes perfectly, deeply quiet.',
      fattened: 'The Honey Queen expands and the honeycomb walls press into her rather than the other way around. Wax cells crush and honey floods the hall floor in a gold-brown wave. The swarm rises and then settles back down, every bee landing on every surface, the hive going completely still. The honeyed halls hold their breath around their queen.',
    },
  },
];

// ── Floor 10 — The Undergorge ─────────────────────────────────
export const FLOOR10_ENEMIES = [
  {
    name: 'Gloom Glutton', archetype: 'glutton', baseWeight: 460, stomachCapacity: 980, willingness: 84,
    description: 'A shadow that learned to eat. It devours the dark itself and bloats on an endless hunger.',
    xpValue: 560, lootTable: ['honey_lance', 'grimoire_of_swelling'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Glutton stops eating the dark and becomes it — too massive to move, too dense for the shadows to slip around. The Undergorge presses in from all sides. The Glutton is indistinguishable from the walls now, soft and vast and breathing in the black.',
      succumbed: 'The Glutton turns itself inside out with wanting. It devours the last of the visible dark and sits in the centre of the dim Undergorge corridor, satisfied for the first time, a shadow that has finally eaten enough.',
      fattened: 'The Glutton swells until the dark solidifies around it. The Undergorge itself seems to thicken, shadows gaining substance, the void pressing in and shaping itself to the new volume. The corridor narrows. The walls come closer. Something down here has always been hungry and now it is full.',
    },
  },
  {
    name: 'Maw Crawler', archetype: 'flyer', baseWeight: 200, stomachCapacity: 280, willingness: 44,
    description: 'All teeth and appetite, it scuttles along the ceiling spitting gobbets of rendered shadow-fat.',
    xpValue: 580, lootTable: ['hauberk_of_hunger', 'signet_of_satiation'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Crawler loses its purchase on the ceiling and drops. It hits the Undergorge floor and the sound is wet and heavy. It lies there on its back, legs cycling uselessly, too round to right itself, gobbets of shadow-fat pooling under it.',
      succumbed: 'The Crawler stops spitting and starts eating — its own gobbets, then the shadow-fat dripping from the ceiling, then the dark itself. It grows round and still on the ceiling until its own weight peels it free and it drifts gently to the floor.',
      fattened: 'The Crawler drops from the ceiling with a crash that echoes through the Undergorge. Void shapes on the floor beneath it — dark pooling into its form like the floor is taking a mould. It lies in the impression, enormous and toothful and unable to do anything with either.',
    },
  },
  {
    name: 'The Famine Lord', archetype: 'warden', baseWeight: 620, stomachCapacity: 860, willingness: 62,
    description: 'A gaunt aristocrat of hunger who purges himself raw, refusing every satisfaction you offer.',
    xpValue: 1120, lootTable: ['signet_of_satiation', 'hauberk_of_hunger'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Famine Lord\'s purges are still elegant — but they are no longer complete. He emerges from each one slightly more than he was before, the gauntness filling in by degrees he cannot will away. His tailored coat is straining. He looks down at himself with an expression of pure aristocratic affront, as if his body has done something unforgivable in company. He purges again, immediately, but the interval before the next purge is longer.',
      },
      {
        threshold: 1.0,
        text: 'The Famine Lord stops purging. He stands in the Undergorge corridor in his ruined coat — every seam split, every button on the floor — and the gauntness that defined him is simply gone. He is vast. He is everything he ever denied himself, made unavoidably present. The dark of the Undergorge solidifies around him. He does not move. He is determining what he is now that he is no longer what he was.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Famine Lord stops mid-purge and stays stopped. He stands in the Undergorge corridor in a posture of absolute unwillingness, every muscle refusing to acknowledge what his body has become, and his body simply does not care. He breathes. He is very large. He does not purge again.',
      succumbed: 'The Lord reaches for the food he has been refusing all this time — and the Undergorge, which is a place of appetite, provides it. From somewhere in the dark: a plate, a glass, something warm. He eats with the rigid control of someone determined to hate every moment of it. The control is the first thing to go.',
      fattened: 'The Famine Lord\'s purge gesture goes wide and the Undergorge dark solidifies around him in response, void shapes pressing to his silhouette, the darkness forming itself to his new dimensions as if conducting an inventory. He stands in the shaped dark, enormous and furious and pinned there by the substance of his own appetites.',
    },
  },
];

// ── Floor 11 — The Endless Table ──────────────────────────────
export const FLOOR11_ENEMIES = [
  {
    name: 'Gorge Behemoth', archetype: 'brute', baseWeight: 720, stomachCapacity: 1040, willingness: 66,
    description: 'A mountain that walks to dinner. Each footfall shakes loose another course from the rafters.',
    xpValue: 680, lootTable: ['the_endless_fork', 'carapace_of_the_colossus'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Behemoth stops mid-stride and cannot complete the step. Its raised foot comes down with an impact that rattles every course on the Endless Table and it simply stays there, a monument, the table extending another ten feet to accommodate the space it now occupies.',
      succumbed: 'The Behemoth seats itself at the table. It takes up seven chairs worth of bench and barely notices. The Endless Table extends toward it. Course after course arrives and is eaten. The Behemoth has found its purpose and its purpose is enormous.',
      fattened: 'The Behemoth\'s footfall shakes the table hard enough that every place setting rattles. A new seat appears at the far end, solidifying out of the table\'s endless extension — wider than the others, lower, built for something much larger. The Endless Table has made room. The hall stretches to provide it.',
    },
  },
  {
    name: 'Surfeit Phantom', archetype: 'trickster', baseWeight: 340, stomachCapacity: 460, willingness: 50,
    description: 'A guest who never stops arriving, flickering down the endless table just out of reach.',
    xpValue: 700, lootTable: ['codex_of_the_glut', 'heart_of_the_maw'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Phantom stops arriving and starts being. Solid, enormous, seated at the table in a chair that bends under the new reality of her. She flickers once and goes still. The table extends automatically to give her more room. She has finally arrived somewhere she can\'t leave.',
      succumbed: 'The Phantom finds a seat and stays in it. The flickering stops. She is here, at this table, at this place, and the Endless Table sets a plate before her without being asked. She eats. She has been travelling too long to refuse a meal.',
      fattened: 'The Phantom solidifies mid-flicker and the Endless Table lurches to accommodate the sudden weight. New settings appear in a rush to either side of where she landed, place after place extending into the dark. The hall stretches. The Phantom sits in the new centre, enormous and real and no longer going anywhere.',
    },
  },
  {
    name: 'The Eternal Guest', archetype: 'glutton', baseWeight: 680, stomachCapacity: 1200, willingness: 86,
    description: 'Seated at the head for a thousand years, still eating, still growing, welcoming you to join the feast forever.',
    xpValue: 1400, lootTable: ['codex_of_the_glut', 'heart_of_the_maw'], isMiniBoss: true,
    phases: [
      {
        threshold: 0.5,
        text: 'The Eternal Guest is visibly more present than she was a thousand years ago. The chair she has occupied since the feast began is cracking at the joints, the carved arms pressed outward. She eats faster — not panicking, just accelerating, the way someone does when they sense the meal approaching its end and want to get everything in. Her welcome is still warm. Her hands are very full.',
      },
      {
        threshold: 1.0,
        text: 'The Eternal Guest\'s chair fails completely, spilling her sideways along the table\'s edge. She catches herself, enormous arms gripping the table, which bends under the pressure. The Endless Table extends another hundred feet in both directions. New place settings appear up and down its length. The hall fills with the smell of every course ever served here, all at once, as if the feast remembers the weight of this moment. She rises back to seated, self-possessed, devastating. She is still eating.',
        aiShift: 'glutton',
      },
    ],
    defeatText: {
      immobilized: 'The Eternal Guest sinks into the table rather than the chair, pressing down until the wood bends and holds her in a permanent indentation. She has been eating here for a thousand years and the table has learned her shape. This shape takes longer to learn. The Endless Table extends further into the dark, adding course after course that she can reach without moving.',
      succumbed: 'The Guest sets down her fork for the first time in a thousand years. She picks up the course that was placed before her last and eats it without the fork, without ceremony, with both hands. The table goes quiet. Even the Endless Table pauses, place settings holding still, as if it wants to watch.',
      fattened: 'The Guest\'s expansion shifts the table. The entire Endless Table moves — not breaks, moves — resetting itself around her new position at its centre. A dozen new place settings materialise on either side, the carved chairs wider, the bench longer. The hall stretches. A new seat appears at the very far end, a throne-sized thing, made for something the feast has been waiting to meet.',
    },
  },
];

// ── Floor 12 — The Undergorge Throne (final boss) ─────────────
export const FLOOR12_ENEMIES = [
  {
    name: 'Throne Sentinel', archetype: 'warden', baseWeight: 640, stomachCapacity: 900, willingness: 60,
    description: 'The last guardian before the throne, sworn to purge any magic that would unseat its master.',
    xpValue: 760, lootTable: ['bulwark_of_the_feast', 'carapace_of_the_colossus'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Sentinel stops purging when it stops being able to reach the gestures. Enormous and planted before the throne door, it becomes an obstacle in both directions — the door behind it and you before it, neither reachable. It breathes and guards nothing it can influence.',
      succumbed: 'The Sentinel\'s last purge turns inward, and then stops turning at all. It sits against the throne room wall, its oath intact and unperformable, enormous and still. The throne door stands open behind it. The Sentinel does not move to close it.',
      fattened: 'The Sentinel staggers and the throne room floor cracks under the new weight. The heralds on either side of the door kneel — not in submission, in structural necessity, ducking the force of the tremor. The crown carved above the door tilts leftward. The Sentinel stands in the crack it made, the new centre of the antechamber.',
    },
  },
  {
    name: 'Herald of the Glut', archetype: 'leech', baseWeight: 580, stomachCapacity: 980, willingness: 74,
    description: 'It announces the coming feast by force-feeding all who approach, gorging on the leavings.',
    xpValue: 800, lootTable: ['crown_of_the_grand_gourmand', 'the_endless_fork'],
    fatThreshold: 0.50,
    defeatText: {
      immobilized: 'The Herald can no longer herald. It stands before the throne door, too large to step aside, its announcement gesture reduced to a slow, ceremonial wave it cannot complete. The gorging stops. There is nothing left to take from and nowhere left to go.',
      succumbed: 'The Herald announces itself. It gorges on its own surplus — the leavings of its leavings — in a recursive consumption that grows still and contented. The announcement it was going to make is eaten along with everything else.',
      fattened: 'The Herald crashes against the throne room wall and the heralds\' banners on either side tear from their mounts, spiralling down. The carved crown above the throne door cracks straight across. The heralds depicted in the stonework seem to kneel toward the newly enlarged Herald standing among their ruins.',
    },
  },
  {
    name: 'The Insatiable One', archetype: 'brute', baseWeight: 900, stomachCapacity: 1600, willingness: 64,
    description: 'The true heart of the Undergorge — a god of appetite grown so vast the dungeon was built around it. It has been waiting, and it is still hungry.',
    xpValue: 2500, lootTable: ['crown_of_the_grand_gourmand'], isBoss: true,
    requiresFatPhase: 2,
    bossEvent: 'The Insatiable One shudders as the last spell takes hold. For the first time in an age, it is full. The Undergorge groans, the throne splits, and a crown of impossible weight tumbles down to you — the only thing it ever truly owned.',
    phases: [
      {
        threshold: 0.5,
        text: 'The Insatiable One stirs. Something in its expression shifts — not pain, not defeat, something older. It has been hungry so long that satiation has become a foreign country and your spells are drawing it there against its will. The dungeon reacts: the Undergorge walls bleed cold air, the floor trembles in long slow pulses, the carved glyphs along the corridor outside the throne room light and dim and light again. The god is being reached. The god does not wish to be reached. It charges with the fury of something ancient learning it is not invulnerable.',
        aiShift: 'brute',
      },
      {
        threshold: 1.0,
        text: 'The Undergorge shakes. The throne of the Insatiable One warps under its weight — the stone flexing, not breaking, because even the architecture worships here — but warping, the carved tributaries of appetite pressed into new shapes. The ceiling drops a layer of dust in one long exhale. The god is doubled. Something that has sat at the centre of this place for longer than the dungeon has existed is now too large for the throne that was built around it. The gate is open. The finishing blow can land.',
      },
    ],
    defeatText: {
      immobilized: 'The Insatiable One fills the throne room. Not metaphorically — it presses against every wall simultaneously, the carved tributaries embedded in its sides, the throne warped into a plinth beneath its weight. It breathes and the dungeon breathes with it. Every corridor in the Undergorge vibrates. For the first time since the dungeon was built, the thing at its centre is not hungry. It does not know what to do with the silence where the wanting was.',
      succumbed: 'The Insatiable One eats the last spell you cast and then the air you cast it from. Then the dark. Then something deeper than the dark that does not have a name. Its eyes close. Its breathing slows to the interval of geological time. The Undergorge has never been quiet before. It is very quiet now. The throne, cracked and warped and pressed into its immense sides, holds. The crown on the floor waits.',
      fattened: 'The Insatiable One doubles and the Undergorge throne room fails around it. Not catastrophically — the walls do not fall, the ceiling holds — but the throne cracks straight down its ancient spine, the carved tributaries splitting apart. The heralds on the walls crack at the knees. The crown above the high arch tilts and drops, turning slowly through the air, and hits the floor before you with a sound that travels the length of the dungeon. Everything above is quiet. Everything is changed.',
    },
  },
];
