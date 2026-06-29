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
    defeatText: {
      immobilized: 'The imp misjudges one last dart, belly swinging wide of the shelf. It hits the floor with a soft thud and lies there, wings twitching, too stuffed to do much else.',
      succumbed: 'It stops hurling morsels and starts eating them instead — every enchanted handful meant for you going straight into its own mouth. The fight just quietly stops.',
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
    defeatText: {
      immobilized: 'The spoon drops with a clatter. The goblin stands there, swaying, gut straining its apron strings, one hand pressed to its middle as if surprised something has limits.',
      succumbed: 'It rounds on the nearest shelf and begins eating — not at you, just eating, shoving whatever\'s in reach into its mouth in big graceless scoops. The fight simply ceases to involve you.',
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
    defeatText: {
      immobilized: 'The Warden tries to purge one last time and simply can\'t. She sags into the shelving with a long, surrendering exhale, arms out, keys still clinking at her belt.',
      succumbed: 'She stops pretending the pantry is under her care. She opens a barrel with the key she\'s held for years and starts eating from it directly. The whole custodial performance just evaporates.',
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
    defeatText: {
      immobilized: 'The specter balloons past the point of coherence, its ectoplasmic form stretching translucent and wide until it can\'t move even through the walls anymore. It drifts there, enormous and faintly luminous, no longer able to threaten anything.',
      succumbed: 'Hunger overtakes the last ghost of self-control. The specter phases through you — not as an attack, just to reach the table beyond. It returns to its feast, finally, wholly, and forgets you entirely.',
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
    defeatText: {
      immobilized: 'The imp crash-lands from the oven-top, bouncing once, then lying still. It stares at the ceiling with the vaguely betrayed expression of something that did not think this was possible.',
      succumbed: 'It stops throwing the pastries and starts eating them. Methodically. With concentration. The fight is over; the imp has found something better to do.',
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
    defeatText: {
      immobilized: 'The cookware seizes mid-clatter. Pots lock against each other, the half-cooked meats wedging every joint. The whole heaving construct groans to a standstill, steam curling up from its grates.',
      succumbed: 'Something ancient in the cast iron stirs — a will older than the kitchen\'s purpose. The construct turns every pot and ladle toward itself and begins eating. Methodically. Without stopping.',
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
    defeatText: {
      immobilized: 'The armour\'s joints lock with a sound like a vault door closing. She stands, sword arm pinned at her side, breathing in slow great heaves. A defeated champion — again. Different reason this time.',
      succumbed: 'The knight lowers her sword with something almost like relief. She sinks to one knee, not in surrender but to get closer to the table. The appetite that made her a champion turns entirely inward.',
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
    defeatText: {
      immobilized: 'The wraith tries once more to dissolve and finds it can\'t. It stands there, very solid for something that was never supposed to be, and goes still. Even in defeat it has the dignity of a thing that kept fighting longer than it should.',
      succumbed: 'The rhythm breaks. After so long denying, hunger wins the argument it was always going to win. The wraith stops purging and simply feasts — transparent no longer, solid with satisfaction.',
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
    bossEvent: 'When the Grand Gourmand finally succumbs, the whole hall trembles. The enchanted feast-tables crack under spreading mass. A golden ring — the Gourmand\'s Band — rolls free from the wreckage. Behind the throne, a stairwell you had not seen before yawns downward into the dark.',
    defeatText: {
      immobilized: 'The Grand Gourmand settles with a groan that shakes the chandeliers. Every joint, every seam gives at once. She doesn\'t fall — she spreads, filling the throne like water fills a bowl, enormous and utterly still.',
      succumbed: 'She reaches for another dish — and keeps reaching. The feast becomes everything. The dungeon, the throne, you — all secondary to the next mouthful. She is, at last, perfectly happy.',
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
    defeatText: {
      immobilized: 'The ooze loses coherence entirely — too full to hold a shape. It spreads across the flagstones in a wide, shimmering puddle, too bloated to collect itself back into anything threatening.',
      succumbed: 'It turns inward. The slime begins drinking itself in a slow, satisfied loop, lost in a cycle of gorging that has nothing left to do with you.',
    },
  },
  {
    name: 'Pickle Wraith', archetype: 'trickster', baseWeight: 150, stomachCapacity: 220, willingness: 45,
    description: 'A briny spectre that slips between barrels, sloshing and dodging, never where your spell lands.',
    xpValue: 220, lootTable: ['charm_of_craving', 'skewer_of_searing'],
    defeatText: {
      immobilized: 'The wraith solidifies mid-dodge with a wet, resonant slosh and tips sideways into the nearest barrel. It stays there. The brine helps.',
      succumbed: 'It stops dodging. Hovering in place, it opens itself to every barrel in reach and just starts drinking — the long-denied brine going down in greedy, grateful gulps.',
    },
  },
  {
    name: 'The Brinemother', archetype: 'warden', baseWeight: 300, stomachCapacity: 420, willingness: 58,
    description: 'A vast salted matron who pickles away every ounce you force on her, resisting satiation to the last.',
    xpValue: 460, lootTable: ['quilted_gambeson', 'trencher_shield'], isMiniBoss: true,
    defeatText: {
      immobilized: 'Her resistance fails all at once — not gradually, just done. She sits back against the vats with a long, rumbling exhale that shakes the lids. Salt-cured and still at last.',
      succumbed: 'The iron discipline dissolves like a cube in warm brine. The Brinemother opens her own reserve with a key she\'s never used and begins to eat from it with the deliberate, unhurried appetite of someone who has waited a very long time.',
    },
  },
];

// ── Floor 5 — The Cold Larder ─────────────────────────────────
export const FLOOR5_ENEMIES = [
  {
    name: 'Lard Golem', archetype: 'brute', baseWeight: 340, stomachCapacity: 480, willingness: 60,
    description: 'A lumbering figure packed from rendered tallow. Slow, soft, and easy to pile higher.',
    xpValue: 260, lootTable: ['cramming_spoon', 'larders_apron'],
    defeatText: {
      immobilized: 'The layers collapse inward. The golem sags slowly from the feet up — all that rendered tallow finding its level — until it\'s a warm, trembling mound that isn\'t going anywhere.',
      succumbed: 'Something kindles in the fat. A dim, patient desire. The golem scoops from itself and eats — not violently, just steadily — in big, slow pawfuls, deeply satisfied by the process.',
    },
  },
  {
    name: 'Frost Imp', archetype: 'flyer', baseWeight: 110, stomachCapacity: 140, willingness: 42,
    description: 'It darts through the chill flinging frozen cream-puffs that burst on impact.',
    xpValue: 240, lootTable: ['whisk_of_the_whirlwind', 'girdle_of_gula'],
    defeatText: {
      immobilized: 'It loses altitude in stages — wobbling, then careening, then just falling. Hits the frozen floor with a bounce and a puff of ice crystals. Blinks at the ceiling. Stays there.',
      succumbed: 'It stops mid-throw and eats the cream-puff it was about to launch at you. Then another. Then it finds the pipe in the ceiling and just hangs from it, eating straight from the source, fight entirely forgotten.',
    },
  },
  {
    name: 'The Glacier Glutton', archetype: 'glutton', baseWeight: 280, stomachCapacity: 560, willingness: 78,
    description: 'A half-frozen feaster that thaws only to gorge, swelling visibly with every mouthful it steals.',
    xpValue: 520, lootTable: ['ledger_of_gluttony', 'pact_morsel'], isMiniBoss: true,
    defeatText: {
      immobilized: 'It thaws the last few degrees and goes completely still — not frozen, just done. Breathing in deep, slow waves. Too full and too content to do anything else.',
      succumbed: 'The Glacier Glutton gives up the pretence of fighting and turns every last instinct toward gorging. It stops tracking you. It stops tracking anything. There is only the feast, and it intends to honour it fully.',
    },
  },
];

// ── Floor 6 — The Smokehouse ──────────────────────────────────
export const FLOOR6_ENEMIES = [
  {
    name: 'Smoke Revenant', archetype: 'dispeller', baseWeight: 240, stomachCapacity: 340, willingness: 55,
    description: 'A haze of cured-meat smoke that disperses your feeding magic as fast as you cast it.',
    xpValue: 300, lootTable: ['tenderizing_maul', 'band_of_second_helpings'],
    defeatText: {
      immobilized: 'The smoke thickens into something solid — too dense to drift anymore, too full to disperse. It hangs there like a side of cured meat, suspended, motionless, finally defeated by its own substance.',
      succumbed: 'The haze stops resisting and starts inhaling. It draws in every calorie it spent the fight deflecting, drinking the smokehouse air in long, greedy pulls. It isn\'t fighting you. It\'s feasting.',
    },
  },
  {
    name: 'Hung Hog', archetype: 'brute', baseWeight: 400, stomachCapacity: 560, willingness: 64,
    description: 'An enormous smoked hog, somehow still hungry, swinging from a hook and charging when it drops.',
    xpValue: 320, lootTable: ['brigandine_of_surfeit', 'mantle_of_the_well_fed'],
    defeatText: {
      immobilized: 'The hook holds — barely. The hog swings to a stop, too heavy to build momentum anymore. It hangs there, belly distended, letting out a long slow breath of smoky air. Not going anywhere.',
      succumbed: 'Hunger overrides everything. The hog snaps the chain with a single lurch, drops heavily to the floor, and begins working its way toward the nearest feast-table. You are not the meal. You were never the meal.',
    },
  },
  {
    name: 'The Pitmaster', archetype: 'warden', baseWeight: 420, stomachCapacity: 600, willingness: 66,
    description: 'Tender of the eternal fire. He bastes away your every effort and refuses to be sated.',
    xpValue: 620, lootTable: ['pendant_of_plenty', 'tenderizing_maul'], isMiniBoss: true,
    defeatText: {
      immobilized: 'He sets the basting brush down with great deliberateness. Folds his hands. Sits on the edge of the pit-stone with the gravity of a man who knows when a job is done. He\'s not going anywhere, and he knows it.',
      succumbed: 'For the first time in his long career, the Pitmaster puts the ladle to his own lips. Closes his eyes. Something passes over his face — not defeat. Recognition. He\'s been tending this fire for someone else\'s feast long enough.',
    },
  },
];

// ── Floor 7 — The Bakery ──────────────────────────────────────
export const FLOOR7_ENEMIES = [
  {
    name: 'Dough Horror', archetype: 'glutton', baseWeight: 320, stomachCapacity: 680, willingness: 80,
    description: 'A risen mass of living dough that proofs larger by the second, doubling and doubling.',
    xpValue: 360, lootTable: ['glazing_glaive', 'grimoire_of_swelling'],
    defeatText: {
      immobilized: 'One final proof, and it can\'t contain the pressure. It fills its corner from floor to ceiling and stops — a warm, yeasty wall that smells faintly of victory and butter. It breathes. It does not move.',
      succumbed: 'The dough loses the last thread of aggression and absorbs. Everything sweet in the room goes in — sugar, cream, the enchantment off your spells — until it is round and golden and perfectly content.',
    },
  },
  {
    name: 'Sugar Sprite', archetype: 'trickster', baseWeight: 160, stomachCapacity: 240, willingness: 48,
    description: 'A glittering blur that crystallises out of reach and dissolves your spells in spun sugar.',
    xpValue: 380, lootTable: ['torc_of_the_titan_table', 'aegis_of_plenty'],
    defeatText: {
      immobilized: 'Its wings clog with its own crystallised form. The sprite lands with a bright, chiming crash and sits very still on the floor, faceted and sparkling, a small confectionery disaster.',
      succumbed: 'It stops mid-dodge. Hovers. Something shifts. It begins dissolving itself into a long, blissful sugar-rush, spun sugar unspooling in lazy spirals as the fight becomes irrelevant.',
    },
  },
  {
    name: 'The Head Baker', archetype: 'brute', baseWeight: 480, stomachCapacity: 700, willingness: 68,
    description: 'Flour-dusted and immense, she kneads the very air, pressing weight onto everything in the room.',
    xpValue: 760, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'], isMiniBoss: true,
    defeatText: {
      immobilized: 'She sinks to the flagstones with the slow, heavy grace of bread collapsing out of the oven. Kneads her own belly once, absently, then her hands go still. Flour settles around her like snow.',
      succumbed: 'The Head Baker tastes her own output for the first time in years — just to check the seasoning, she\'d say, if she were saying anything. She isn\'t. She\'s eating. She doesn\'t stop.',
    },
  },
];

// ── Floor 8 — The Confectionery ───────────────────────────────
export const FLOOR8_ENEMIES = [
  {
    name: 'Caramel Colossus', archetype: 'brute', baseWeight: 520, stomachCapacity: 760, willingness: 66,
    description: 'A slow titan of hardening caramel; every spell you land sets into another golden layer.',
    xpValue: 420, lootTable: ['honey_lance', 'hauberk_of_hunger'],
    defeatText: {
      immobilized: 'Another layer sets — the final one. She can\'t move inside her own shell anymore. Stands golden and still in the centre of the confectionery, a monument to the logic of caramel taken to its conclusion.',
      succumbed: 'The caramel turns from armour to treat. She licks each new layer as it forms — tasting it, finding it good. The fight dissolves into something gentler and considerably stickier.',
    },
  },
  {
    name: 'Bonbon Swarmling', archetype: 'leech', baseWeight: 220, stomachCapacity: 340, willingness: 56,
    description: 'A rolling clutch of animate chocolates that gorge each other and spit the overflow at you.',
    xpValue: 440, lootTable: ['signet_of_satiation', 'famine_sigil'],
    defeatText: {
      immobilized: 'The swarm piles into a heap too dense to roll — each bonbon pressed against its neighbours, nowhere to go, the overflow just adding more layers. A very round, very still, very fragrant defeat.',
      succumbed: 'The swarmlings turn on each other in a frenzy of mutual gorging — not hostile, just overwhelmingly hungry. A sweet, unstoppable collapse that has nothing left to do with you.',
    },
  },
  {
    name: 'The Confectioner', archetype: 'dispeller', baseWeight: 460, stomachCapacity: 640, willingness: 70,
    description: 'A precise, terrible artisan who dissolves your enchantments like sugar in hot water.',
    xpValue: 880, lootTable: ['signet_of_satiation', 'famine_sigil'], isMiniBoss: true,
    defeatText: {
      immobilized: 'Her precision goes last. Fingers too heavy with her own confections to hold a dissolution pattern, she lets her hands fall. Sags onto the marble counter. The artisan becomes the artwork.',
      succumbed: 'She samples her own work — just one piece, to check the texture. Then a second. Then she stops telling herself it\'s professional. She eats with the deliberate, unselfconscious pleasure of someone who was always going to end up here.',
    },
  },
];

// ── Floor 9 — The Honeyed Halls ───────────────────────────────
export const FLOOR9_ENEMIES = [
  {
    name: 'Mead Wyrm', archetype: 'glutton', baseWeight: 380, stomachCapacity: 820, willingness: 82,
    description: 'A drunken serpent swollen on spilled mead, gulping anything sweet within reach — itself included.',
    xpValue: 480, lootTable: ['cauldron_breaker', 'torc_of_the_titan_table'],
    defeatText: {
      immobilized: 'The wyrm stops mid-gulp, jaws still open, too swollen to close them. It settles into great coiling loops on the hall floor, breathing out long honey-scented sighs. Not dead. Just absolutely done.',
      succumbed: 'It tips its head back. Swallows. Swallows again. The wyrm loses the thread of everything except the next mouthful — mead, honey, whatever\'s nearest — lost in it, completely and peacefully lost.',
    },
  },
  {
    name: 'Comb Guardian', archetype: 'warden', baseWeight: 500, stomachCapacity: 700, willingness: 64,
    description: 'A waxen sentinel that seals itself against satiation behind walls of dripping honeycomb.',
    xpValue: 500, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'],
    defeatText: {
      immobilized: 'The wax softens. All those careful seals melt at once in the warmth of what you\'ve done, and the Guardian sags into a warm golden heap — still standing, technically, but only by inertia.',
      succumbed: 'Something older than duty stirs. The Guardian pulls open its own wax shell with hands that remember what it was like to be hungry and not in service. It begins eating from the inside. Slowly. Reverently.',
    },
  },
  {
    name: 'The Honey Queen', archetype: 'leech', baseWeight: 560, stomachCapacity: 900, willingness: 72,
    description: 'Vast and golden, she drinks tribute from her swarm and pours the excess down your throat.',
    xpValue: 1000, lootTable: ['plate_of_the_provider', 'aegis_of_plenty'], isMiniBoss: true,
    defeatText: {
      immobilized: 'She can no longer redistribute to the swarm. The tribute that was always meant to flow outward stays hers now, pinning her to the honeycomb throne she built for this exact purpose without knowing it.',
      succumbed: 'The Queen tips the tribute ladle to her own lips. Eyes closed. The swarm goes still. She has been the vessel for so long — it seems only right to be the recipient, just this once. Just forever.',
    },
  },
];

// ── Floor 10 — The Undergorge ─────────────────────────────────
export const FLOOR10_ENEMIES = [
  {
    name: 'Gloom Glutton', archetype: 'glutton', baseWeight: 460, stomachCapacity: 980, willingness: 84,
    description: 'A shadow that learned to eat. It devours the dark itself and bloats on an endless hunger.',
    xpValue: 560, lootTable: ['honey_lance', 'grimoire_of_swelling'],
    defeatText: {
      immobilized: 'The shadow reaches critical mass and stops flowing. Too much darkness consumed, too heavy for even void to support. It settles like a black stain on the floor and does not rise again.',
      succumbed: 'It turns from shadow to self. The glutton stops feeding on the dark around it and turns inward — hungrily, completely — lost in a consumption that has found, at last, the only feast worth having.',
    },
  },
  {
    name: 'Void Colossus', archetype: 'colossus', baseWeight: 540, stomachCapacity: 1200, willingness: 55,
    description: 'Huge and slow, it purges the dark every time you think you\'ve landed the spell.',
    xpValue: 620, lootTable: ['hauberk_of_hunger', 'grimoire_of_swelling'],
    defeatText: {
      immobilized: 'The purges slow. Come less often. Stop. It settles — massive, heaving, finally overtaken by what it could not expel fast enough. The void stops moving. The dungeon goes quiet around it.',
      succumbed: 'The void that drives it inverts. Instead of expelling, it cradles each new pound like something precious — holding on, drawing in, the ancient purge reflex defeated by something older and more patient.',
    },
  },
  {
    name: 'Maw Crawler', archetype: 'flyer', baseWeight: 200, stomachCapacity: 280, willingness: 44,
    description: 'All teeth and appetite, it scuttles along the ceiling spitting gobbets of rendered shadow-fat.',
    xpValue: 580, lootTable: ['hauberk_of_hunger', 'signet_of_satiation'],
    defeatText: {
      immobilized: 'Its grip on the ceiling fails all at once. It hits the stone floor with a heavy, wet thud that shakes the nearest column, bounces once, and doesn\'t get up. All that appetite, pinned by its own results.',
      succumbed: 'It forgets you entirely. Latches to the nearest wall and starts eating through the stone — through the sediment and the centuries — with the focused appetite of something that has finally found a purpose equal to its hunger.',
    },
  },
  {
    name: 'The Famine Lord', archetype: 'warden', baseWeight: 620, stomachCapacity: 860, willingness: 62,
    description: 'A gaunt aristocrat of hunger who purges himself raw, refusing every satisfaction you offer.',
    xpValue: 1120, lootTable: ['signet_of_satiation', 'hauberk_of_hunger'], isMiniBoss: true,
    defeatText: {
      immobilized: 'The purges come slower, then stop. He stands there — full for the first time, quite possibly in his life — and cannot process the fact. The Famine Lord stands as still as his own doctrine. The doctrine has lost.',
      succumbed: 'It happens between one breath and the next. A lifetime of denial becomes something else entirely. He has been starving so long that satisfaction hits him like an ambush — and he falls into it, reaching, desperate, finally free of the ideology that ate him first.',
    },
  },
];

// ── Floor 11 — The Endless Table ──────────────────────────────
export const FLOOR11_ENEMIES = [
  {
    name: 'Gorge Behemoth', archetype: 'brute', baseWeight: 720, stomachCapacity: 1040, willingness: 66,
    description: 'A mountain that walks to dinner. Each footfall shakes loose another course from the rafters.',
    xpValue: 680, lootTable: ['the_endless_fork', 'carapace_of_the_colossus'],
    defeatText: {
      immobilized: 'The footsteps stop. That\'s all. Nothing can move this much weight, not even whatever ancient compulsion has been driving it. The rafters stop shaking. The Endless Table holds its breath.',
      succumbed: 'It drops to all fours and begins eating directly from the floor — indiscriminate, insatiable, no longer interested in you or the fight or anything except the next mouthful, and the one after that.',
    },
  },
  {
    name: 'Abyssal Leech', archetype: 'leech', baseWeight: 420, stomachCapacity: 800, willingness: 90,
    description: 'Gorges with terrifying speed, splitting its appetite between itself and you.',
    xpValue: 720, lootTable: ['codex_of_the_glut', 'heart_of_the_maw'],
    defeatText: {
      immobilized: 'Even at this pace there\'s a limit. The Leech hits it and swells past it and goes still, appetite finally outpaced by fullness — an outcome that clearly surprises it as much as it surprises you.',
      succumbed: 'It stopped thinking about you the moment its own hunger took over completely. It gorges now for the pure, mindless joy of it — voracious and content and entirely beyond caring what you do next.',
    },
  },
  {
    name: 'Surfeit Phantom', archetype: 'trickster', baseWeight: 340, stomachCapacity: 460, willingness: 50,
    description: 'A guest who never stops arriving, flickering down the endless table just out of reach.',
    xpValue: 700, lootTable: ['codex_of_the_glut', 'heart_of_the_maw'],
    defeatText: {
      immobilized: 'The phantom stops flickering. For the first time in its existence it sits down at the table it spent so long haunting — and doesn\'t move. The endless arrival is over. It arrived.',
      succumbed: 'Mid-dodge it catches the scent from the feast table and loses the thread entirely. Whatever errand it was on — whatever flight — stops mattering. It pulls out a chair, sits, and begins the meal it came here for.',
    },
  },
  {
    name: 'The Eternal Guest', archetype: 'glutton', baseWeight: 680, stomachCapacity: 1200, willingness: 86,
    description: 'Seated at the head for a thousand years, still eating, still growing, welcoming you to join the feast forever.',
    xpValue: 1400, lootTable: ['codex_of_the_glut', 'heart_of_the_maw'], isMiniBoss: true, legendaryResists: 1,
    defeatText: {
      immobilized: 'After a thousand years, she finally stops reaching for the next dish. She leans back in the seat that has held her for a millennium, eyes soft with something that might be peace. Utterly still. Utterly full. The feast, at last, complete.',
      succumbed: 'She waves you into a chair beside her. There is room at this table. There has always been room. She pours you something and returns to eating without urgency, without end, as content as she has ever been in ten centuries of hunger.',
    },
  },
];

// ── Floor 12 — The Undergorge Throne (final boss) ─────────────
export const FLOOR12_ENEMIES = [
  {
    name: 'Throne Sentinel', archetype: 'warden', baseWeight: 640, stomachCapacity: 900, willingness: 60,
    description: 'The last guardian before the throne, sworn to purge any magic that would unseat its master.',
    xpValue: 760, lootTable: ['bulwark_of_the_feast', 'carapace_of_the_colossus'],
    defeatText: {
      immobilized: 'Her duty was to endure. It ends the only way it could — not with a sword, but with what she couldn\'t shake loose. She stands like a statue outside the throne room, immovable, still sworn to something that no longer needs her.',
      succumbed: 'The oath breaks before your spells do. She turns her back on the throne she\'s kept for years, and begins to eat. Not a betrayal. Just a hunger that outlasted the vow.',
    },
  },
  {
    name: 'Titan Warden', archetype: 'warden', baseWeight: 700, stomachCapacity: 980, willingness: 58,
    description: 'Guards the final approach to the throne, purging any magic that would slow its patrol.',
    xpValue: 880, lootTable: ['bulwark_of_the_feast', 'carapace_of_the_colossus'],
    defeatText: {
      immobilized: 'The patrol stops. The Titan stands like a monument in the corridor — too still to be anything but done, too vast to fall. The final approach is unguarded. It didn\'t lose. It simply ended.',
      succumbed: 'Something in the long watch breaks loose. The empty halls, the smell of the feast always just beyond — the Titan warden lets go of the post and follows the scent at last.',
    },
  },
  {
    name: 'Herald of the Glut', archetype: 'leech', baseWeight: 580, stomachCapacity: 980, willingness: 74,
    description: 'It announces the coming feast by force-feeding all who approach, gorging on the leavings.',
    xpValue: 800, lootTable: ['crown_of_the_grand_gourmand', 'the_endless_fork'],
    defeatText: {
      immobilized: 'There are no more guests to herald. The Herald sinks to its knees in the approach corridor, full beyond bearing, the announcement unsaid, the feast unannounced. It waits, kneeling, for a procession that isn\'t coming.',
      succumbed: 'It turns its own liturgy on itself — pouring the feast down its own throat with the fervour of a true believer who has finally understood what the ceremony was always actually for.',
    },
  },
  {
    name: 'The Insatiable One', archetype: 'brute', baseWeight: 900, stomachCapacity: 1600, willingness: 64,
    description: 'The true heart of the Undergorge — a god of appetite grown so vast the dungeon was built around it. It has been waiting, and it is still hungry.',
    xpValue: 2500, lootTable: ['crown_of_the_grand_gourmand'], isBoss: true, legendaryResists: 1,
    bossEvent: 'The Insatiable One shudders as the last spell takes hold. For the first time in an age, it is full. The Undergorge groans, the throne splits, and a crown of impossible weight tumbles down to you — the only thing it ever truly owned.',
    defeatText: {
      immobilized: 'It is full. For the first time since the world was young, it is full. The word has no translation — appetite has no grammar for satiation — but the vast form goes still, and the stillness is immense, and something that might be peace settles over the Undergorge like the first quiet in a thousand years.',
      succumbed: 'It does not surrender. It simply stops telling the difference between consuming and being consumed. The appetite turns inward. The god feeds on itself — slowly, completely, satisfied in a way it has never been by anything outside — and, for one long breath, it is enough.',
    },
  },
];
