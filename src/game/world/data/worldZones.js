/**
 * World zone definitions for The Fattening Realm.
 * Pure data — consumed by World bootstrap / zone factory.
 */

export const WORLD_ZONES = [
  // ── Core tavern hub (4 existing zones, enhanced) ───────────────────────────
  {
    id: 'tavern',
    name: 'The Bloated Boar Tavern',
    description:
      'The tavern feels hollow at this hour. Half the tables stand empty and the platters arrive sparse. Bread scent from the kitchen runs thinner than it used to, and the barrels behind the counter sit lower than anyone will admit aloud.',
    theme: 'tavern',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['cozy', 'food_abundant', 'social'],
    spellAffinity: ['Prestidigitation', 'Conjure Morsel'],
    exits: {
      north: 'garden',
      east: 'kitchen',
      south: 'main_street',
      west: 'cellar',
      up: 'loft',
      down: 'dungeon',
    },
    npcKeys: ['barkeep_bella', 'mira_regular', 'tansy_drinker', 'lenna_off_duty'],
  },
  {
    id: 'garden',
    name: 'The Garden',
    description:
      'A walled garden that once overflowed with color and fruit. The trees remain and the rows stay planted, but the yield has thinned for months. Something beneath the soil seems to drink the richness downward.',
    theme: 'garden',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['fertile', 'peaceful', 'abundant_resources'],
    spellAffinity: ['Shape Earth', 'Create Water', 'Enlarge Person'],
    exits: {
      south: 'tavern',
      north: 'orchard',
      east: 'bee_yard',
      west: 'greenhouse',
    },
    npcKeys: ['gregg_gardener'],
    creatureKeys: ['fatling_pig', 'waddles_duck'],
  },
  {
    id: 'kitchen',
    name: 'The Grand Kitchen',
    description:
      'An enormous kitchen alive with heat and motion. Massive ovens glow, long tables hold ingredients of every kind, and copper pots hang from the ceiling. The air is thick with baking bread, roasting meat, and sweet pastry.',
    theme: 'kitchen',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'bright',
    features: ['hot', 'aromatic', 'active', 'dangerous_equipment'],
    spellAffinity: ['Create Water', 'Enlarge Person', 'Feast of Shadows'],
    exits: {
      west: 'tavern',
      north: 'pantry',
      east: 'smokehouse',
      south: 'dairy_room',
    },
    npcKeys: ['gertrude_chef'],
  },
  {
    id: 'dungeon',
    name: 'The Depths Below',
    description:
      'A dark passage carved from stone and earth beneath the tavern. Moisture beads on the ceiling and the air tastes of damp decay. Pale fungal growths lace the walls, pulsing faintly in the black.',
    theme: 'dungeon',
    difficulty: 'high',
    isIndoors: true,
    lightLevel: 'dark',
    features: ['dangerous', 'trapped', 'magical_aura'],
    spellAffinity: ['Shape Earth', 'Morph Mass'],
    exits: {
      up: 'tavern',
      down: 'catacombs',
    },
    npcKeys: ['dungeon_watcher_uma'],
    creatureKeys: ['chained_cow'],
  },

  // ── Tavern annex ───────────────────────────────────────────────────────────
  {
    id: 'cellar',
    name: 'Tavern Cellar',
    description:
      'Cool stone steps descend into rows of casks and ale racks. The air is sharp with yeast and oak. Candle stubs throw long shadows between barrels stamped with names no one reads anymore.',
    theme: 'tavern',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['cool', 'storage', 'echoing'],
    exits: {
      east: 'tavern',
      down: 'sewer_junction',
    },
    npcKeys: ['cellar_keeper_marta', 'cask_maid_hilda'],
  },
  {
    id: 'loft',
    name: 'Tavern Loft',
    description:
      'A cramped upper room under the roof beams, warmed by chimney breath from below. Straw mattresses, travel chests, and forgotten banners crowd the rafters. Dust motes drift through slanted light from a single dormer.',
    theme: 'tavern',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['private', 'dusty', 'lodging'],
    exits: {
      down: 'tavern',
    },
    npcKeys: ['loft_lodger_elsie', 'attic_storyteller_nora'],
  },

  // ── Garden expansion ───────────────────────────────────────────────────────
  {
    id: 'orchard',
    name: 'The Orchard',
    description:
      'Older than the tavern itself, the orchard spreads in gnarled rows of apple and pear. Windfalls lie sweetening in the grass, and bees drowse among bruised fruit. Ladders lean against trunks like sleeping sentries.',
    theme: 'garden',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['fruitful', 'seasonal', 'peaceful'],
    spellAffinity: ['Shape Earth', 'Create Water'],
    exits: {
      south: 'garden',
      east: 'greenhouse',
    },
    npcKeys: ['orchardist_petra', 'cider_oma_tilde'],
  },
  {
    id: 'greenhouse',
    name: 'The Greenhouse',
    description:
      'Glass panes trap heat and humidity until the world outside feels imaginary. Vines climb wire frames, herbs crowd clay pots, and condensation runs down the walls in steady tears.',
    theme: 'garden',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'bright',
    features: ['humid', 'controlled', 'fragrant'],
    spellAffinity: ['Create Water', 'Enlarge Person'],
    exits: {
      east: 'garden',
      west: 'orchard',
    },
    npcKeys: ['greenhouse_mistress_violet', 'fern_apprentice_sage'],
  },
  {
    id: 'bee_yard',
    name: 'The Bee Yard',
    description:
      'Painted hives stand in neat ranks at the garden edge. The hum is constant, a low golden vibration. Wax combs dry on racks beside jars of amber honey catching the sun.',
    theme: 'garden',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['buzzing', 'sweet', 'productive'],
    exits: {
      west: 'garden',
    },
    npcKeys: ['beekeeper_yara', 'wax_maker_luna'],
  },

  // ── Kitchen annex ──────────────────────────────────────────────────────────
  {
    id: 'pantry',
    name: 'The Pantry',
    description:
      'Shelves climb to the ceiling with sacks of flour, wheels of cheese, and jars of preserved fruit. The stone floor stays cool even when the kitchen roars. Every surface smells of grain and dried herbs.',
    theme: 'kitchen',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['cool', 'stocked', 'organized'],
    exits: {
      south: 'kitchen',
    },
    npcKeys: ['pantry_clerk_ruth', 'larder_maid_greta'],
  },
  {
    id: 'smokehouse',
    name: 'The Smokehouse',
    description:
      'A low brick chamber where hams and sausages hang in dense rows. Smoke curls from smoldering chips and stains the beams black. The heat is dry and savory, clinging to hair and clothes.',
    theme: 'kitchen',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['smoky', 'savory', 'preserved_meats'],
    exits: {
      west: 'kitchen',
    },
    npcKeys: ['smokehouse_cook_brigit'],
  },
  {
    id: 'dairy_room',
    name: 'The Dairy Room',
    description:
      'Churns and milk pans line slate counters cooled by spring water running through channels. Butter pats sit wrapped in cloth, and soft cheese ages on racks with handwritten dates.',
    theme: 'kitchen',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'bright',
    features: ['cool', 'creamy', 'fresh'],
    exits: {
      north: 'kitchen',
    },
    npcKeys: ['dairy_maid_clara', 'cheesemaker_helena'],
  },

  // ── Underground ────────────────────────────────────────────────────────────
  {
    id: 'catacombs',
    name: 'The Catacombs',
    description:
      'Narrow passages open into niches stacked with bones wrapped in rotting cloth. Chalk marks and faded prayers cover the walls. Footsteps vanish into silence a few paces ahead.',
    theme: 'underground',
    difficulty: 'high',
    isIndoors: true,
    lightLevel: 'dark',
    features: ['ancient', 'sacred', 'unsettling'],
    spellAffinity: ['Shape Earth', 'Morph Mass'],
    exits: {
      up: 'dungeon',
      east: 'mushroom_grotto',
      south: 'flooded_tunnel',
    },
    npcKeys: ['tomb_watcher_sister_eve'],
  },
  {
    id: 'sewer_junction',
    name: 'Sewer Junction',
    description:
      'Brick tunnels meet beneath the town in a round chamber where three channels merge. Water runs knee-deep in places, carrying refuse and the occasional gleam of something dropped from above.',
    theme: 'underground',
    difficulty: 'medium',
    isIndoors: true,
    lightLevel: 'dark',
    features: ['wet', 'foul', 'hidden'],
    exits: {
      up: 'cellar',
      east: 'flooded_tunnel',
      north: 'back_alley',
    },
    npcKeys: ['ratcatcher_pix'],
  },
  {
    id: 'mushroom_grotto',
    name: 'Mushroom Grotto',
    description:
      'Bioluminescent fungi cap the cavern in pale blue and green. Shelves of cultivated mushrooms grow from rotting logs. The air is earthy and sweet, like bread rising in darkness.',
    theme: 'underground',
    difficulty: 'medium',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['luminescent', 'fungal', 'cultivated'],
    spellAffinity: ['Shape Earth', 'Create Water'],
    exits: {
      west: 'catacombs',
      north: 'ritual_chamber',
    },
    npcKeys: ['mycologist_thalia'],
  },
  {
    id: 'flooded_tunnel',
    name: 'Flooded Tunnel',
    description:
      'The passage dips until cold water reaches the waist. Stalactites drip into black pools that swallow torchlight. Something splashes just beyond sight whenever you pause to listen.',
    theme: 'underground',
    difficulty: 'high',
    isIndoors: true,
    lightLevel: 'dark',
    features: ['flooded', 'dangerous', 'echoing'],
    exits: {
      north: 'catacombs',
      west: 'sewer_junction',
    },
    npcKeys: ['tunnel_diver_marlowe'],
  },
  {
    id: 'ritual_chamber',
    name: 'Ritual Chamber',
    description:
      'A circular room carved with symbols that hurt to read too long. A stone basin stands at the center, stained dark. Wax from countless candles forms a frozen waterfall down the walls.',
    theme: 'underground',
    difficulty: 'high',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['arcane', 'forbidden', 'ancient'],
    spellAffinity: ['Morph Mass', 'Feast of Shadows'],
    exits: {
      south: 'mushroom_grotto',
    },
    npcKeys: ['ritual_acolyte_venus'],
  },

  // ── Town ───────────────────────────────────────────────────────────────────
  {
    id: 'main_street',
    name: 'Main Street',
    description:
      'The cobbled artery of the town runs between shopfronts and hanging signs. Cart wheels rattle over stones worn smooth by generations. Voices and cooking smoke drift from every doorway.',
    theme: 'town',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['busy', 'commercial', 'central'],
    exits: {
      north: 'tavern',
      east: 'town_square',
      west: 'guard_post',
      south: 'market_square',
    },
    npcKeys: ['town_crier_lottie', 'ribbon_peddler_june'],
  },
  {
    id: 'town_square',
    name: 'Town Square',
    description:
      'A broad plaza ringed by civic buildings and a weathered statue of some forgotten patron. Pigeons bicker over crumbs while townsfolk cross on errands. The bell tower casts a long shadow at noon.',
    theme: 'town',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['public', 'historic', 'gathering'],
    exits: {
      west: 'main_street',
      north: 'fountain_plaza',
      east: 'temple_steps',
      south: 'estate_gate',
    },
    npcKeys: ['square_clerk_sophie'],
  },
  {
    id: 'fountain_plaza',
    name: 'Fountain Plaza',
    description:
      'A marble fountain splashes in the square north end, its basin crusted with copper verdigris. Benches ring the water where lovers and gossipers linger. Coins glint at the bottom like buried wishes.',
    theme: 'town',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['scenic', 'romantic', 'public'],
    exits: {
      south: 'town_square',
    },
    npcKeys: ['plaza_fountain_keeper_delia'],
  },
  {
    id: 'back_alley',
    name: 'Back Alley',
    description:
      'A narrow lane behind the respectable fronts, smelling of ash and stale beer. Laundry lines cross between windows. Footsteps sound too close here, and honest folk hurry through.',
    theme: 'town',
    difficulty: 'medium',
    isIndoors: false,
    lightLevel: 'dim',
    features: ['shady', 'cramped', 'secretive'],
    exits: {
      east: 'guard_post',
      south: 'sewer_junction',
      west: 'warehouse',
    },
    npcKeys: ['alley_fence_roxy', 'alley_runaway_kitt'],
  },
  {
    id: 'guard_post',
    name: 'Guard Post',
    description:
      'A fortified booth of timber and iron at the street west end. Wanted notices paper the walls. Arms racks and a duty roster suggest someone always watches who enters town.',
    theme: 'town',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'bright',
    features: ['military', 'official', 'secure'],
    exits: {
      east: 'main_street',
      west: 'back_alley',
    },
    npcKeys: ['cassandra_captain', 'guard_recruit_jade'],
  },

  // ── Market ─────────────────────────────────────────────────────────────────
  {
    id: 'market_square',
    name: 'Market Square',
    description:
      'Stalls unfold each morning in a riot of color and shouted prices. Fabric, produce, trinkets, and spices compete for attention. The ground is stained with fruit juice and crushed herbs.',
    theme: 'market',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['bustling', 'colorful', 'commercial'],
    exits: {
      north: 'main_street',
      east: 'spice_stall',
      west: 'butcher_shop',
      south: 'bakery_front',
      down: 'apothecary',
    },
    npcKeys: ['market_master_gwen'],
  },
  {
    id: 'spice_stall',
    name: 'Spice Stall',
    description:
      'Saffron, pepper, cinnamon, and stranger things fill burlap sacks behind a canvas awning. The merchant measures by thumb and promises with a smile. Every breath burns pleasantly in the nose.',
    theme: 'market',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['exotic', 'aromatic', 'traded'],
    exits: {
      west: 'market_square',
    },
    npcKeys: ['silvia_spice'],
  },
  {
    id: 'butcher_shop',
    name: 'Butcher Shop',
    description:
      'Hooks display cuts of meat behind a fly-spotted window. The block is scarred deep, the knives sharp enough to whisper. Sawdust on the floor soaks up what the day leaves behind.',
    theme: 'market',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'bright',
    features: ['meaty', 'sharp', 'practical'],
    exits: {
      east: 'market_square',
    },
    npcKeys: ['butcher_bess', 'cleaver_apprentice_rhea'],
  },
  {
    id: 'bakery_front',
    name: 'Bakery Front',
    description:
      'Warm air spills from the open door carrying sugar and yeast. Loaves cool on racks visible through the window. A bell above the frame still rings for every customer who pushes through.',
    theme: 'market',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'bright',
    features: ['warm', 'sweet', 'inviting'],
    exits: {
      north: 'market_square',
    },
    npcKeys: ['baker_rosa', 'pastry_girl_lydia'],
  },
  {
    id: 'apothecary',
    name: 'The Apothecary',
    description:
      'Glass bottles line dark shelves behind a counter of polished yew. Dried roots hang from the ceiling like strange fruit. The proprietor mixes by smell and memory, never measuring twice the same way.',
    theme: 'market',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['medicinal', 'mysterious', 'herbal'],
    exits: {
      up: 'market_square',
    },
    npcKeys: ['apothecary_iris', 'herb_mixer_niece_wren'],
  },

  // ── Temple ─────────────────────────────────────────────────────────────────
  {
    id: 'temple_steps',
    name: 'Temple Steps',
    description:
      'Wide stone steps climb to carved doors banded in bronze. Pilgrims kneel on the lower treads to pray before entering. Incense smoke drifts down like a blessing you can taste.',
    theme: 'temple',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['sacred', 'solemn', 'welcoming'],
    exits: {
      west: 'town_square',
      up: 'shrine_interior',
    },
    npcKeys: ['pilgrim_guide_hope'],
  },
  {
    id: 'shrine_interior',
    name: 'Shrine Interior',
    description:
      'Colored light falls through high windows onto a central altar hung with offerings. Candles burn in tiers along the walls. Footsteps echo softly on worn flagstones polished by devotion.',
    theme: 'temple',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['holy', 'quiet', 'ornate'],
    exits: {
      down: 'temple_steps',
      east: 'confession_booth',
      south: 'pilgrim_hostel',
    },
    npcKeys: ['high_priestess_margaret'],
  },
  {
    id: 'confession_booth',
    name: 'Confession Booth',
    description:
      'A wooden partition divides penitent from listener in a small side alcove. The lattice screen hides faces but not the weight of sighs. Whispered secrets accumulate like dust in the corners.',
    theme: 'temple',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dark',
    features: ['private', 'intimate', 'sacred'],
    exits: {
      west: 'shrine_interior',
    },
    npcKeys: ['confessor_sister_agnes'],
  },
  {
    id: 'pilgrim_hostel',
    name: 'Pilgrim Hostel',
    description:
      'Simple cots and a communal hearth shelter travelers who cannot afford inn prices. Soup simmers eternally in an iron pot. Boots dry by the fire while stories pass between strangers.',
    theme: 'temple',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['humble', 'warm', 'communal'],
    exits: {
      north: 'shrine_interior',
    },
    npcKeys: ['hostel_keeper_patrice', 'weary_pilgrim_serene'],
  },

  // ── Noble district ─────────────────────────────────────────────────────────
  {
    id: 'estate_gate',
    name: 'Estate Gate',
    description:
      'Iron gates stand open between stone pillars topped with carved boars. Gravel paths lead toward a manor visible through trimmed hedges. Liveried staff glance at visitors who lack invitation.',
    theme: 'noble',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['grand', 'guarded', 'exclusive'],
    exits: {
      north: 'town_square',
      east: 'servants_hall',
      south: 'grand_ballroom',
    },
    npcKeys: ['gate_warden_portia'],
  },
  {
    id: 'grand_ballroom',
    name: 'Grand Ballroom',
    description:
      'Crystal chandeliers throw light across parquet floors polished to mirror sheen. Musicians galleries stand empty between galas, yet the room still hums with remembered waltzes and spilled champagne.',
    theme: 'noble',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'bright',
    features: ['elegant', 'spacious', 'luxurious'],
    exits: {
      north: 'estate_gate',
      up: 'countess_parlor',
      down: 'wine_cellar_noble',
    },
    npcKeys: ['ballroom_dancer_coral'],
  },
  {
    id: 'countess_parlor',
    name: 'Countess Parlor',
    description:
      'Velvet chairs surround a low table set with porcelain and gilt. Portraits of stern ancestors judge from the walls. The countess receives only those she deems worth the climb.',
    theme: 'noble',
    difficulty: 'medium',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['refined', 'private', 'political'],
    exits: {
      down: 'grand_ballroom',
    },
    npcKeys: ['countess_mirabel'],
  },
  {
    id: 'servants_hall',
    name: 'Servants Hall',
    description:
      'A long servants corridor behind the grand rooms where staff eat standing up between duties. Lockers hold uniforms; a bell pull summons instant obedience. The smell of roast from upstairs never quite reaches here.',
    theme: 'noble',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['utilitarian', 'busy', 'hidden'],
    exits: {
      west: 'estate_gate',
    },
    npcKeys: ['head_maidservant_dottie', 'scullery_girl_pixie'],
  },
  {
    id: 'wine_cellar_noble',
    name: 'Noble Wine Cellar',
    description:
      'Racks of vintage bottles sleep in cool darkness beneath the ballroom. Chalk marks track years and occasions. A single candle is enough to read labels worth more than most houses.',
    theme: 'noble',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dark',
    features: ['rare', 'cool', 'valuable'],
    exits: {
      up: 'grand_ballroom',
    },
    npcKeys: ['sommelier_camille'],
  },

  // ── Harbor ─────────────────────────────────────────────────────────────────
  {
    id: 'docks',
    name: 'The Docks',
    description:
      'Timber piers stretch into gray water where gulls scream and rigging clatters. Salt stings the air and tar warms in the sun. Crates stack high waiting for carts that may never come.',
    theme: 'harbor',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['maritime', 'busy', 'salty'],
    exits: {
      north: 'warehouse',
      west: 'fishmonger_stall',
      east: 'captain_quarters',
    },
    npcKeys: ['dockhand_sal', 'rope_coiler_tina'],
  },
  {
    id: 'fishmonger_stall',
    name: 'Fishmonger Stall',
    description:
      'Fresh catch lies iced on slatted tables, scales flashing silver and pink. The monger shouts the day prices over gull cries. Brine runs in channels cut through the planks.',
    theme: 'harbor',
    difficulty: 'low',
    isIndoors: false,
    lightLevel: 'bright',
    features: ['fresh', 'pungent', 'commercial'],
    exits: {
      east: 'docks',
    },
    npcKeys: ['fishmonger_nell', 'oyster_shucker_pearl'],
  },
  {
    id: 'warehouse',
    name: 'Harbor Warehouse',
    description:
      'A cavernous storehouse of spice bales, rope coils, and unmarked crates. Dust motes swirl in light from high clerestory windows. Footsteps boom on hollow boards overhead.',
    theme: 'harbor',
    difficulty: 'medium',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['industrial', 'stored_goods', 'echoing'],
    exits: {
      east: 'back_alley',
      south: 'docks',
    },
    npcKeys: ['warehouse_foreman_tess'],
  },
  {
    id: 'captain_quarters',
    name: 'Captain Quarters',
    description:
      'A snug cabin built ashore for a sea captain between voyages. Charts curl on the desk beside a bottle of rum half empty. A widow seat looks out over the harbor through salt-streaked glass.',
    theme: 'harbor',
    difficulty: 'low',
    isIndoors: true,
    lightLevel: 'dim',
    features: ['nautical', 'private', 'weathered'],
    exits: {
      west: 'docks',
    },
    npcKeys: ['sea_captain_morgan'],
  },
];

export default WORLD_ZONES;
