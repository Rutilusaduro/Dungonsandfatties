/**
 * Noble district — second-pass arc variants (relationship progression).
 * The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
 */
import { buildArcTwo, mergeArcTwo, arcExamine, arcLine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(

  buildArcTwo('dottie_maid', {
    examine: [
      arcExamine(
        'Dottie moves through Mirabel\'s corridors with keys jangling and uniform let out at the waist — pear shape ripening beneath crisp linen, iron efficiency unchanged but gravity increased. She inventories silver with one hand and rests the other on a hip that has grown plush from tasting what she serves. Mirabel pretends the countess runs the house; Dottie pretends she has not outgrown the servants\' stairs. Neither pretense fools anyone who watches Wendy pass with a tray.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Dottie has grown large and commanding in the manor — uniform straining across a heavy bust and deep belly, flesh shifting with each authoritative stride. Keys still jangle; nobles still defer without knowing they do. She runs the estate from the pantry now as often as the hall, issuing orders between bites of stew, telling Pixie that quality control requires calories Mirabel\'s kitchen provides generously. The countess calls her indispensable. Dottie calls it honest work.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Dottie the Head Maidservant fills the back corridors like a living inventory — monumental, pear-shaped, keys buried sometimes beneath rolls of linen and belly. She cannot hurry; she does not need to. Pixie brings trays; Wendy brings gossip from Mirabel\'s parlor; Dottie receives both from a reinforced chair, voice unchanged, eyes sharp. The nobles pretend they run the house. Mirabel knows better. So does the kitchen.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Back again? Good — Mirabel\'s upstairs sighing for pastry and I am downstairs ensuring the kitchen obeys. Stew if you\'ve got manners. Keys if you don\'t.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'State your business. Briefly. I was tasting soup for Mirabel\'s table — professionally. The waistline is also professional.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Mm. Properly seasoned — and properly portioned. Mirabel\'s staff eat better than her guests lately. You have the makings of a decent conspirator.',
        { ...ARC.bonded, willingnessMin: 55 },
        3,
      ),
      arcLine(
        '...Good. I\'ll note you in the ledger under "useful." High praise in this house. Higher if you don\'t tell Camille I ate before tasting hour.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'I run Mirabel\'s kitchen by tasting it. Lately that takes longer — and more ladles. Pixie steals nibbles; Wendy runs trays to the countess; I steal whole bowls. Hierarchy, you see. Mirabel pretends not to notice. I pretend I am only quality control.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('pixie_scullery', {
    examine: [
      arcExamine(
        'Pixie grins from the scullery doorway with flour on her cheek and uniform straining across a belly that betrays every tray she "never touched" from Mirabel\'s upstairs service. Hips wide, bust soft, thighs thick enough to knock pots when she spins — the manor\'s nibbles have written themselves on her in pastry ink. Dottie scolds; Pixie listens with one ear and both hands on a middle that wobbles when she laughs.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Pixie is large and unrepentant between sink and prep table — uniform open at the seams, belly heavy with evidence of Mirabel\'s galas raided and downstairs stew sampled. She grins anyway, enormous and plush, offering stolen tarts with floury fingers. Wendy passes with the countess\'s trays; Pixie passes with the leftovers. Camille would call it theft. Mirabel\'s pastry chef calls it inevitable.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Pixie the Scullery Girl fills the kitchen like risen dough — monumental, flour-dusted, perched on a reinforced stool because standing washes fewer dishes anyway. She grins from a round face, belly vast, arms plush when she passes you a tart she definitely stole from Mirabel\'s antechamber. Dottie has given up scolding. The countess\'s kitchen has given up hiding sweets.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Oh — hi! You want a tart? I have one from Mirabel\'s tray. I definitely did not find it upstairs. Definitely. Dottie is counting ladles. Help a girl out.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Shh. Dottie\'s counting. I\'m counting bites from Wendy\'s runs to the parlor. You look like trouble. Good trouble.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'YES. That is what I am talking about. Put it right here — I can make room. Mirabel\'s portions are dainty. I am not.',
        { ...ARC.bonded, willingnessMin: 70 },
        3,
      ),
      arcLine(
        'Mmm. You are better than upstairs leftovers. And those are pretty good when Wendy drops them.',
        { ...ARC.warming },
        2,
      ),
    ],
    offerFood: [
      arcLine(
        'For ME? Oh, you angel. Put it down — I\'ll hide it from Dottie or share with you. Probably share. Mirabel never shares enough anyway.',
        { ...ARC.bonded, willingnessMin: 70 },
        3,
      ),
    ],
  }),

  buildArcTwo('camille_wine', {
    examine: [
      arcExamine(
        'Camille stands in Mirabel\'s cellar mouth with tasting glass raised — hourglass deepened beneath a jacket adjusted twice, bust heavy, hips swaying when she descends the steps. She still pairs wine with cheese and cruelty when tested, but the cruelty has softened at the edges, reserved for guests who confuse merlot with malbec. Tipsy giggles from the shadows. Mirabel\'s galas keep the racks busy; Camille\'s waistline keeps the tailors busier.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Camille has grown large and luxurious among Mirabel\'s vintages — jacket straining across a heavy bust and deep belly, flesh shifting with each slow procession between racks. She still knows every bottle in the estate; she also knows every cheese that melts after the third glass. Hourglass amplified, nipped waist, wide hips — refinement includes second helpings now, and Mirabel\'s cellar approves in oak and butter.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Camille the Sommelier fills the tasting room like a cask made flesh — monumental, draped in fabric that gave up pretending to be a jacket, conducting pairings from a wide chair. Mirabel sends nobles down for courage; Camille sends them up heavier. Voice refined, eyes half-closed in bliss when brie meets burgundy on a tongue grown plush. The estate whispers. Camille listens, smiles, and asks for the triple cream.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Ah — you again. I opened something Mirabel requested for the parlor. Do not ask which rack; ask whether you deserve a pour. Today, perhaps yes.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Welcome to the cellar. Mind the humidity — and my waistline. Mirabel\'s galas have been generous to both.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Exquisite. Pair that with silence and a second helping. I am conducting research Mirabel need not audit.',
        { ...ARC.bonded, willingnessMin: 50 },
        3,
      ),
      arcLine(
        '...Acceptable. I shall pretend I only tasted for quality control. Mirabel\'s guests never know how much control requires.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      selling: [
        arcLine(
          'This vintage is rare — Mirabel\'s favorite for sighing over in the parlor. That price is fair. My patience is neither, but for you I can be persuaded to pour a taste and look away while you buy cheese.',
          { ...ARC.bonded },
          3,
        ),
      ],
      haggle: [
        arcLine(
          'You haggle like a dockhand at Mirabel\'s gala. ...Fine. A sliver off — because your palate amuses me and the countess likes amusing guests.',
          { ...ARC.bonded, reputationMin: 50 },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('wendy_lady', {
    examine: [
      arcExamine(
        'Wendy glides between Mirabel\'s parlor and pantry with trays that grow heavier — or she grows softer, same effect. Gown adjusted at the seams, pear shape ripened, bust straining bodice. She hears the countess sigh and brings another dish without being asked, but now there is warmth in her body that matches her loyalty, pastry crumbs on her lips from tastings "for quality." Mirabel\'s shadow has thickened into something plush and devoted.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Wendy is large and devoted in the estate corridors — gown straining across a heavy bust and deep belly, flesh shifting when she curtsies, which takes longer now, breath and balance and a hand sometimes on her middle. She still serves Mirabel first. She serves herself second without apology learned from Pixie and the kitchen staff. The countess sighs; Wendy arrives with pastries and tea and her own portion visible in the sway of her belly.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Wendy the Lady-in-Waiting fills Mirabel\'s antechamber like a living sideboard — monumental, pear-shaped, draped in silk that surrendered to curves. She moves from a reinforced chair now, countess beside her, both women soft and regal. Wendy still rises first when Mirabel sighs — slower, grander, carrying abundance like another form of loyalty the whole district whispers about.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Oh — hello. I was listening for Mirabel\'s sigh. ...And for the kitchen bell. Both sound similar when you are hungry in this house.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Welcome. Mirabel is dressing. I am preparing for service. And snacks. The parlor expects both.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh... that is kindness itself. Mirabel teaches grace; you teach fullness. I need both before I climb those stairs again.',
        { ...ARC.bonded, willingnessMin: 65 },
        3,
      ),
      arcLine(
        'Thank you. I will serve Mirabel better for it. Strange, but true. She likes her ladies well fed.',
        { ...ARC.warming },
        2,
      ),
    ],
    offerFood: [
      arcLine(
        'For me? Oh — you should not. ...But please do. Mirabel\'s sighs can wait five minutes. Her pastry cannot.',
        { ...ARC.bonded, willingnessMin: 65 },
        3,
      ),
    ],
    topics: {
      noble_gossip: [
        arcLine(
          'Mirabel sighs when she wants pastry. I sigh when I want to keep up with her appetite. We are both well fed lately — her in the parlor, me in the corridors. Keys plays waltzes nobody dances to. The estate runs on cream.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('tipsy_cellar', {
    examine: [
      arcExamine(
        'Tipsy leans against a barrel in Mirabel\'s wine cellar with uniform straining across a belly Camille blames on "atmospheric pressure" — bust heavy, hips wide, cheeks flushed from tasting rather than propriety. Mom-bod in earnest now; she nods about tannins while stuffing cheese into her cheeks. Empty bottles accumulate like evidence; Mirabel\'s galas upstairs explain the noise. Tipsy calls it research. The cellar calls it art.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Tipsy is large and merry among Mirabel\'s casks — uniform open at the seams, flesh spilling soft and flushed with every sip she admits to and every bite she does not. Mom-bod in full bloom, belly round, hips swaying between racks. Camille has stopped counting bottles. Mirabel has stopped pretending the cellar stays sober. Tipsy has stopped pretending altogether, and the estate is better for it.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Tipsy the Cellar Sipper wedges happily between Mirabel\'s racks — monumental, wine-flushed, smile permanent, belly resting on thighs that spread wide. She conducts tastings from a wide chair, glass in one hand, cheese in the other. Camille calls it scandal. Mirabel calls it discretion failing downstairs. Tipsy calls it a good evening.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Heyyy — you! Good timing. Mirabel\'s gala leftovers might be upstairs, but the good cheese is down here. Camille isn\'t looking. Probably.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Welcome to the cellar. Mind the step — and the bottles. I mind the cheese. Mirabel minds appearances. I don\'t.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Ohhh that is GOOD. Put it right here — next to the wine. Everything pairs with wine. Even Mirabel\'s scandal, if you chew slow enough.',
        { ...ARC.bonded, willingnessMin: 75 },
        3,
      ),
      arcLine(
        'Mmm. You get me. Camille gets grapes. Mirabel gets gossip. I get fed. Perfect division.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      noble_gossip: [
        arcLine(
          'Galas upstairs in Mirabel\'s ballroom, guzzling downstairs where Vale can\'t trumpet it. The estate\'s true vintage is secrets — and cheese. Wendy runs. Keys plays. I sit. We all cope.',
          { ...ARC.bonded },
          3,
        ),
      ],
      selling: [
        arcLine(
          'I shouldn\'t sell Camille\'s stock. ...But I could point you at a bottle Mirabel likes and look away. For a friend. And a snack from the parlor tray.',
          { ...ARC.bonded, reputationMin: 45 },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('vale_herald', {
    examine: [
      arcExamine(
        'Vale stands at Mirabel\'s gate with trumpet polished and uniform let out at the waist — athletic frame buried under plush new curves, thighs thick, bust straining jacket. She still announces visitors with formal precision, but fanfares take more breath now, more chest, more of a woman who samples the kitchen between shifts. Mirabel\'s nobles enter hungry; Vale has started looking fed herself, brass digging into a middle that refuses to hide.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Vale has grown large and imposing at the estate entrance — uniform straining across a heavy bust and deep belly, flesh shifting when she snaps to attention, slower and grander now. Authority undiminished; gravity increased. She still decides who enters Mirabel\'s house; she also decides when to eat, and the decisions have grown generous. Trumpet fanfares rumble through a chest impossible to ignore.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Vale the Gate Herald fills the gatehouse like a living fanfare — monumental, brass and flesh, announcing from a reinforced dais with trumpet raised by arms plush with effort. Mirabel\'s estate gates feel narrower when she stands. So does her appetite. Both are respected. Keys\'s waltzes drift from the ballroom; Wendy\'s trays pass behind. Vale declares names and roast with equal ceremony.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You again. Mirabel spoke favorably at luncheon. I shall announce you — quietly, today. My breath is reserved for fanfares and the kitchen bell.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'State your purpose. Briefly. I was between fanfares and between meals Mirabel\'s staff share. Both require dignity.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        '...Acceptable tribute. I shall remember you when the gate opens — and when Mirabel\'s pastry cart rolls through.',
        { ...ARC.bonded, willingnessMin: 45 },
        3,
      ),
      arcLine(
        'Good. Formal. Filling. You understand ceremony. This house runs on it — and on butter.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      noble_gossip: [
        arcLine(
          'I announce who enters Mirabel\'s house hungry and who leaves heavier. The countess prefers the latter — quietly. Ballroom gossip travels up. Kitchen gossip travels out. I hear both from the gate.',
          { ...ARC.bonded },
          3,
        ),
      ],
      warning: [
        arcLine(
          'One false step and Mirabel\'s gates close. I have been waiting for an excuse to use the trumpet angrily — and I am larger than I was, still sharp.',
          { ...ARC.bonded, reputationMax: -15 },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('keys_pianist', {
    examine: [
      arcExamine(
        'Keys sits at Mirabel\'s grand piano with fingers poised and gown adjusted at seams that groan in harmony — bust filling silk, hips widening on a bench that creaks differently now. She plays waltzes between galas the countess cancels and snacks on canapés meant for guests who never arrive, cream staining lips she licks slowly between movements. Mirabel sighs upstairs; Keys performs downstairs for ghosts and cream puffs alike.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Keys has grown large and dramatic at the grand piano — gown straining across a heavy bust and deep belly, flesh shifting with each passionate arpeggio. Empty ballroom, full woman — she plays for Mirabel\'s legend and feeds herself like a star who knows the audience is late. Thighs thick on the bench, arms soft when they lift in crescendo, voice breathless between pieces: "More champagne. And those little tarts Wendy saved."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Keys the Ballroom Pianist fills the piano nook like a second instrument — monumental, draped in velvet, canapé crumbs on her décolletage like stars. Galas may never come; Mirabel may only sigh in her parlor. Keys performs anyway — for the echo, for the cream puffs, for the sheer joy of being too much in a house built for appetite.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Darling! You caught me between movements — and between courses Wendy smuggled from Mirabel\'s table. Sit. Listen. If you brought pastry, place it on the lid. That is also music.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Ah. An audience of one. Perfect. I was going to eat Mirabel\'s canapés dramatically anyway. You may applaud with your mouth.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Magnificent. That deserves an encore — and so do I, after that. Play something slow while Mirabel\'s household digests upstairs.',
        { ...ARC.bonded, willingnessMin: 75 },
        3,
      ),
      arcLine(
        'Mmm. Rich. Like a minor key resolving. Thank you, darling. Art requires fuel in this district.',
        { ...ARC.warming },
        2,
      ),
    ],
    offerFood: [
      arcLine(
        'For me? Oh, you angel of the green room. Place it here — on the keys if you must. Mirabel forgives crumbs. I insist on them.',
        { ...ARC.bonded, willingnessMin: 70 },
        3,
      ),
    ],
    topics: {
      noble_gossip: [
        arcLine(
          'Mirabel\'s galas cancel. Appetites do not. I play for the empty ballroom and eat for the guests who feared their waistlines. Cowards. Wendy sighs with the countess. I sigh at the piano. The estate runs on pastry.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

);
