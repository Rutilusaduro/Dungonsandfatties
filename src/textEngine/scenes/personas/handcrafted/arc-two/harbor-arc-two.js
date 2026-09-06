/**
 * Harbor district — second-pass arc variants (relationship progression).
 * The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
 */
import { buildArcTwo, mergeArcTwo, arcExamine, arcLine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(

  buildArcTwo('sal_dock', {
    examine: [
      arcExamine(
        'Sal heaves a crate onto the pier with rope burns on her palms — oilskin adjusted, belly softly rounded between shifts, athletic frame buried under stew-and-ale curves. She still loads freight before the tide; the pier still groans. But warmth lives in her body when she straightens now, hips swaying with weight Morgan would call honest ballast. Tina\'s pot simmers dockside. Sal makes the tide wait a little longer.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Sal has grown large and hearty on the docks — oilskin straining across a heavy bust and deep belly, flesh shifting when she lifts, slower and grander, crates riding higher on curves that refuse to hide. Morgan sailed heavy crews; Sal loads heavy freight. Both know weight is honest. Stew pots find her at shift end; she finds them back, empty, smiling, salt and satisfaction mixed on her tongue.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Sal the Dockhand fills the pier like a moored ship — monumental, rope and flesh, oilskin replaced by panels that gave up. She loads from a reinforced dolly now, still before the tide, still salt-crusted, belly resting on thighs that spread wide when she rests. Morgan calls her an asset. Stella calls her reliable ballast. The harbor calls her legend.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Back on the pier? Good — grab a line or grab a bowl. Tina\'s stew is hot and Morgan\'s crew stories are louder when I\'m fed.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Hey. Tide\'s turning. Talk fast or haul slow — and if you brought fish stew, talk slower.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Now THAT is provisioning. Morgan would hire you on the spot. You\'d make a fine dockmate — or a fine troublemaker. Either way, thanks.',
        { ...ARC.bonded, willingnessMin: 65 },
        3,
      ),
      arcLine(
        'Solid. Warm. Keeps the salt from sticking. ...Appreciate it. Stella says fed crews navigate better. Dockhands too.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          'Harbor feeds who works it. Morgan sailed hungry crews home heavier; I load crates the same way — honest weight. Lately it\'s been feeding me back, generous, like Tina\'s stew pot and Nell\'s fried samples at close.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('tina_rope', {
    examine: [
      arcExamine(
        'Tina laughs over the gulls with hawser in hand — oilskin straining across a belly that presses against rope coils, mom-bod in earnest, forearms still mooring-line thick atop arms gone plush. She coils with hypnotic rhythm, but the rhythm shakes more now, laugh bouncing off curves that Stella says throw off harbor charts. Sal loads; Tina coils; Morgan\'s stories echo from the captain\'s cabin. The pot simmers. Religion out here.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Tina is large and jovial on the pier — oilskin open at the seams, flesh spilling warm as she walks with hawser over shoulder, belly vast, bust swaying. Stew finds her; she finds stew back. Every laugh shakes new weight; every coil wraps a frame that refuses to hurry. Morgan says she could moor a ship to herself. Tina says she already does at supper with Sal and whoever Nell brings.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Tina the Rope Coiler fills the dockside like a moored laugh — monumental, hawser draped like a shawl, belly vast, voice carrying to the gulls and back. She coils from a wide chair now, flesh spilling serene on every bollard she sits on. Morgan plots trouble ashore; Stella plots courses; Tina plots seconds. All three arrive on schedule.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'THERE you are! I was telling Sal the tide\'s fine but my stew bowl\'s empty — and Morgan\'s cabin smells like rum and roast. Fix one of those for me?',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Hey darling — pull up a bollard. I was coiling and thinking about seconds. Great combo. Nell\'s frying something. Smell it?',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Ohhh YES. That\'s harbor hospitality. My laugh\'s fuller already — listen! Sal\'ll be jealous. Stella\'ll plot it on a chart. Good.',
        { ...ARC.bonded, willingnessMin: 75 },
        3,
      ),
      arcLine(
        'Mmm. Warm as a sun deck. Thank you, darling. Morgan\'s crew eats like this after a good voyage.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          'Dock nights are loud — full mugs, full bowls, full bellies. Morgan\'s sailors swear by it; Nell closes late; I aim for all three. Sal loads. I coil. Stella navigates. That\'s religion out here.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('pearl_oyster', {
    examine: [
      arcExamine(
        'Pearl flashes her knife above the stall — apron straining across a belly that betrays every oyster she "quality controlled," brine on lips that look kiss-swollen from butter and samples. Knife still quick; shell still pops. But breath comes slower now, hips wide on the shucking stool, cheeks flushed from eating what she opens. Nell glares from the fish end when Pearl eats off-shift. Pearl grins anyway.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Pearl has grown large and quick at the oyster stall — apron open at the seams, flesh shifting when she shucks, belly heavy, bust swaying, arms still fast atop plush weight. Samples became meals; tips jar overflows because she keeps fewer and eats more. Customers watch the knife and the woman wielding it — both sharp, both softer than advertised. Nell calls it theft. Morgan calls it dock character.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Pearl the Oyster Shucker fills the stall like a tide pool made flesh — monumental, blade in hand, belly vast and glistening, perched on a wide chair. She shucks for love, for tips, for the joy of eating what she opens. Stella passes with charts; Nell passes with glares and honey cakes anyway. The harbor smells of brine and contentment.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Hey — dozen or a story? I got both. Tips jar\'s light but my samples are heavy. Nell\'s watching. Buy something before I eat the display.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Knife\'s sharp, oysters fresh, I am fresh from lunch Morgan\'s mate bought. Shell pop. What do you need?',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh — THAT is briny heaven. You just bought loyalty. And maybe a discount. Stella says favors are currency on this pier.',
        { ...ARC.bonded, willingnessMin: 65 },
        3,
      ),
      arcLine(
        'Mmm. Good catch. I\'ll remember you when the tide turns. Don\'t tell Nell I ate off-shift. Again.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      selling: [
        arcLine(
          'Best oysters on the pier — shucked by me, sampled by me, sold to you with professional shame Nell writes up in her ledger. Morgan\'s crew buys by the crate. You should too. I\'ll try not to eat yours.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('tess_warehouse', {
    examine: [
      arcExamine(
        'Tess stands on the loading dock with clipboard and whistle — vest let out, apple shape ripened, biceps still strong but arms rounding pleasantly. She stamps manifests and blocks doorways with frame and authority both; Faye logs desserts under "miscellaneous" and Tess pretends not to read the margins. Morgan\'s freight comes through here heavy; lately Tess matches the inventory.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Tess has grown large and immovable on the warehouse floor — vest straining across a heavy bust and deep belly, whistle breathier now, chestier. Nothing enters without her mark, including snacks Faye omits from official totals. Crates fear her. Dockhands too. Her appetite joined the payroll: second helpings, third inspections that end at the stew pot Morgan\'s sailors praise.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Tess the Warehouse Foreman fills the loading bay like a living gate — monumental, clipboard and flesh, stamp hitting paper like gavel from a reinforced desk. Whistle on a chain disappears into soft cleavage; belly rests on thighs spread wide. Crates enter. Crates leave. Tess stays — fed, immovable, legend. Stella charts routes around her chair now. Respectfully.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You. Back again. Good — I need someone who reads labels and doesn\'t steal from crate twelve. Morgan\'s freight is due. Lunch if you behave.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'State business. Briefly. I was between stamps and between bowls. Faye\'s pastry column is suspicious. Both are serious.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Acceptable cargo. You\'d pass inspection — high praise. Morgan\'s quartermaster would agree. I don\'t give it hungry.',
        { ...ARC.bonded, willingnessMin: 55 },
        3,
      ),
      arcLine(
        '...Good. Logged under "approved." Don\'t expect a discount. Do expect me softer. Not on theft.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      warning: [
        arcLine(
          'One crate out of place and you\'re off my dock. Morgan backs my stamps. I\'ve grown too — doesn\'t mean I\'m soft on theft. Ask Nell about fines.',
          { ...ARC.bonded, reputationMax: -15 },
          3,
        ),
      ],
      haggle: [
        arcLine(
          'You haggle like a seagull — loud, hungry, annoying. ...Fine. Five percent. Because you made me laugh and Stella vouched for you.',
          { ...ARC.bonded, reputationMin: 45 },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('faye_tally', {
    examine: [
      arcExamine(
        'Faye sits at the ledger desk with ink on her fingers — blouse adjusted, belly softly rounded as she totals manifests, bust straining buttons, hips wide on a stool that creaks in arithmetic harmony. She remembers every under-reported crate and every snack logged as misc. Tess glares; Faye blushes and eats anyway. Morgan\'s crews come back heavier; Faye notes it in margins Tess pretends not to read.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Faye has grown large and meticulous at the tally desk — blouse open at the seams, belly heavy, bust swaying, mind unchanged. Numbers still balance; appetite recorded nowhere official and everywhere visible. Dockhands bribe her with fish pastries; Stella leaves rum cakes "for inventory." Faye accepts payment in full, literal and otherwise, precise and plush.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Faye the Warehouse Tally fills the office like a living ledger — monumental, ink and flesh, draped in fabric that gave up, belly vast on thighs spread wide. She counts from a reinforced chair, pastry in hand, every crate weighed. Morgan\'s manifests balance. Faye omits her own. Nell\'s fried samples stay miscellaneous. Balance maintained.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Oh — hello. I was reconciling crate twelve and my lunch column. Morgan\'s freight is heavy this week. One of us is over budget. Hint: me.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Yes? Speak numbers if you can. If not, speak pastry. Stella brought rum cake. I am flexible today.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Logged under "gift incoming." Weight accurate. Taste exceptional. Thank you. I\'ll round in your favor — don\'t tell Tess or Nell.',
        { ...ARC.bonded, willingnessMin: 55 },
        3,
      ),
      arcLine(
        '...Good. Omitted from official totals. Morgan\'s quartermaster would appreciate the discretion.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      harbor_tales: [
        arcLine(
          'Tide brings crates and rumors. I file the crates. I eat the rumors — with pastry. Morgan\'s crews return heavier; Stella charts it; I note it in margins. All expand.',
          { ...ARC.bonded },
          3,
        ),
      ],
      haggle: [
        arcLine(
          'Your numbers don\'t balance. Fix them — or add a pastry line item. I am amenable to creative accounting Tess pretends not to see.',
          { ...ARC.bonded, reputationMin: 45 },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('stella_nav', {
    examine: [
      arcExamine(
        'Stella stands over charts in Morgan\'s cabin ashore — coat adjusted, belly softly rounded as she traces routes with charcoal, athletic frame buried under plush curves. Courses still perfect; plots still cool. Rum joins bread at the desk; her body keeps voyage receipts — rounding slow as a ship finding warm water. Morgan plots trouble; Stella plots courses and supper both.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Stella has grown large and cool in the navigator\'s nook — coat straining across a heavy bust and deep belly, flesh shifting when she rolls a chart, slower and grander. Courses tattooed on mind and body now — wide, serene, unflappable — she drinks rum like ballast and eats stew like policy. Morgan laughs; Nell sends fish pastries; Stella smiles, precise and fed.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Stella the Navigator fills the captain\'s cabin ashore like a moored galleon — monumental, charts and flesh, coat replaced by draped wool, belly resting on thighs spread wide over latitude lines. She plots from a reinforced desk, rum within reach, stew within reach. Morgan plots trouble. Stella plots courses around her own abundance. Both arrive on schedule.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You. Good — company that doesn\'t spill rum on Morgan\'s charts. Much. Sit. Talk. Eat if you brought it. Nell usually does.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Harbor\'s quiet. My stomach isn\'t. Morgan\'s between voyages and between roasts. Coincidence? Plot says no.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Acceptable provisioning. You\'d survive Morgan\'s crew. Compliment. I don\'t give those lightly — or on an empty chart table.',
        { ...ARC.bonded, willingnessMin: 55 },
        3,
      ),
      arcLine(
        '...Good. Stable. Like a calm sea. Thank you. Nell\'s fried things come close. You beat them.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      harbor_tales: [
        arcLine(
          'Morgan sails hungry crews home heavier. I chart the routes; the stew pot charts the rest. Nell feeds the pier; Tina feeds the dock. Every voyage ends at a table. I am extending the voyage ashore.',
          { ...ARC.bonded },
          3,
        ),
      ],
      friendly: [
        arcLine(
          'You seem seaworthy. Metaphorically. Literally if you share that bread. Morgan\'s policy is trouble; mine is cool head, warm middle. Pick a mentor.',
          { ...ARC.bonded, reputationMin: 50 },
          3,
        ),
      ],
    },
  }),

);
