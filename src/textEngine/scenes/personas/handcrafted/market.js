// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
/**
 * Handcrafted market personas — butcher row, bakery, apothecary, weavers, spice.
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export default mergePersonas(

  // ── RHEA THE CLEAVER APPRENTICE ─────────────────────────────────────────────
  authorPersona('rhea_cleaver', {
    name: 'Rhea the Cleaver Apprentice',
    bands: {
      slender: 'Rhea the Cleaver Apprentice stands at the butcher\'s block with a knife that looks too large for her nervous hands. Her slender frame jumps at every chop Bess makes nearby; blood speckles her apron while her cheeks stay pale. She handles steel like it might bite back — which, she will tell you, it often does.',
      curvy: 'Rhea has softened despite the work, slender edges rounding where stew samples and bread heels have begun to stick. She still flinches at the cleaver, but her hips have curves now, and Bess teases her about eating more than she slices. Nervousness remains. So does a blush when meat is tender and so is she.',
      plump: 'Rhea is pleasantly plump beneath a stained apron, belly pressing the block when she leans to learn a new cut. Knives still scare her; hunger does not. She tastes everything Bess approves, and approval has written itself across her figure — soft, warm, proof that the butcher\'s row feeds its own.',
      large: 'Rhea has grown large, a substantial apprentice who trembles less and chews more. Her body fills the stall doorway; cleaver still awkward, appetite newly confident. Bess grunts approval. Customers watch the nervous girl become a woman who knows good meat by heart and by belly.',
      enormous: 'Rhea is enormously full-figured, plush curves spilling around the block she once feared. She still handles knives carefully, but handles seconds with devotion. The market smells of iron and roasting; Rhea smells of stew and satisfaction. Nervousness has become charm. Charm has become generous flesh.',
      immense: 'Rhea has become immense — a timid mountain behind the cleaver, soft and vast and still apologizing when she takes up space. Bess calls her reliable. The scale agrees. She cuts carefully, eats wholeheartedly, and proves that bravery and appetite can grow on the same bench.',
    },
    extras: {
      ceiling: 'Rhea hangs in candy bonds above the butcher\'s row, cleaver dangling from one wrist by a cord. "I\'m going to drop it — I\'m going to —" she wails. Bess shouts advice from below. Rhea would rather be on the ground. Or eating.',
      hold: 'Rhea is frozen mid-slice, knife locked in trembling hand, eyes wide. Blood drips slowly. She cannot flinch away. She cannot finish the cut. Apprenticeship, she thinks, was not supposed to include magic.',
      full: 'Rhea sits on a meat crate, apron askew, hands on a belly swollen with stew and sample sausage. "Bess said taste everything," she murmurs, dazed. "She didn\'t say stop."',
    },
    greetings: [
      line('Oh! Customer — I mean, hello! Bess is right there if you need an expert. I\'m... practicing not fainting.', { reputationMin: 45 }, 3),
      line('Apprentice Rhea. I can help. Probably. What do you need cut — or wrapped?', { reputationMin: 25 }, 2),
      line('If you brought soup, I\'m... on break. Unofficially.', { willingnessMin: 55 }, 2),
      line('Butcher stall. Watch your fingers. Watch mine too, honestly.', {}, 1),
    ],
    afterFeeding: [
      line('That was so good I forgot to be scared for a whole minute. Thank you — really.', { willingnessMin: 70 }, 3),
      line('Mmm. Real food, not just trimmings. You\'re kind.', { willingnessMin: 50 }, 2),
      line('...Thanks. I needed that.', {}, 1),
    ],
    topics: {
      cooking: [
        line('Bess says a butcher who won\'t taste doesn\'t deserve the block. I\'m... trying to deserve it.', { stageMin: 4 }, 3),
        line('Low heat, long time — that\'s stew. That\'s me, lately. Slow and getting fuller.', { reputationMin: 35 }, 2),
        line('Sharp knife, steady hand. I\'m working on both.', {}, 1),
      ],
    },
  }),

  // ── LYDIA THE PASTRY GIRL ───────────────────────────────────────────────────
  authorPersona('lydia_pastry', {
    name: 'Lydia the Pastry Girl',
    bands: {
      slender: 'Lydia the Pastry Girl beams from behind a counter dusted with sugar, pear-shaped ambition in a frame still more dream than dough. Flour ghosts her cheeks; ambition lights her eyes — she wants her own shop someday, and every tart she decorates is practice for a future she can almost taste.',
      curvy: 'Lydia has softened into curves that match her confections, pear shape blooming where cream and cake batter have begun to claim her as their own advertisement. Sugar still dusts her skin; now it clings to hips that sway when she turns to the oven. She wants a shop. Her body already runs one in spirit.',
      plump: 'Lydia is pleasantly plump, belly pressing the counter when she leans to pipe rosettes, cheeks always pink from ovens and optimism. She samples every batch — professional duty, she insists — and the market watches a pastry girl become a pastry woman, soft, sweet, impossible to pass without buying one more.',
      large: 'Lydia has grown large, a substantial vision of butter and bliss behind glass cases that seem too narrow. Her laugh shakes icing; her middle rests on the counter like proof of concept. Rosa says she\'s ready for her own shop. Lydia says she\'s ready for lunch. Both are correct.',
      enormous: 'Lydia is enormously full-figured, a walking bakery window in human form — lush, powdered, radiant. Customers come for éclairs and stay for the show of a woman who has eaten her career into existence. She still dreams of independence. She has already achieved abundance.',
      immense: 'Lydia has become immense — the market\'s sweetest landmark, curves and cream in legendary proportion. Ovens heat; Lydia glows; sugar follows her like a perfume. She will own a shop. For now she owns every gaze, every appetite, every crumb that falls gratefully into her lap.',
    },
    extras: {
      ceiling: 'Lydia hangs in candy ropes above the pastry case, piping bag still clutched, frosting splattering the floor. "The display!" she cries, then giggles. "Okay, and me. Mostly me."',
      hold: 'Lydia is frozen mid-flourish, wrist locked, eyes darting to a cooling rack she cannot reach. A tragedy in buttercream. She will recover. She always does.',
      full: 'Lydia slumps on a stool, chef\'s hat askew, hands cradling a belly stuffed with "quality control." "Rosa never specified how many samples," she sighs, blissful.',
    },
    greetings: [
      line('You\'re back! I saved you the corner piece — the one with extra cream. Don\'t tell Rosa. Actually, tell her; she\'ll be proud.', { reputationMin: 50 }, 3),
      line('Pastry counter! Everything\'s fresh. I\'m Lydia. I\'m also probably covered in sugar. Both true.', { reputationMin: 28 }, 2),
      line('If you\'re here to feed me instead of buy, I\'m *very* open to negotiations.', { willingnessMin: 75 }, 3),
      line('Hi hi hi! Browse, breathe, try not to drool on the glass.', {}, 1),
    ],
    afterFeeding: [
      line('OH — that\'s incredible. I need to reverse-engineer that flavor. After I finish chewing. And breathing. Thank you!!', { willingnessMin: 80 }, 3),
      line('Mmm! You get me. Cream, crunch, kindness — perfect triangle.', { willingnessMin: 60 }, 2),
      line('Yum. You\'re officially my favorite customer today.', {}, 1),
    ],
    offerFood: [
      line('For ME? Not a sample I made? Oh, you\'re wonderful — put it right here, I\'ll critique professionally.', { willingnessMin: 75, reputationMin: 40 }, 3),
      line('Yes please! I\'ll share my notes. I mean crumbs. Same thing.', { willingnessMin: 60 }, 2),
      line('Food gift? Best kind of tip. Hand it over!', {}, 1),
    ],
    topics: {
      cooking: [
        line('Butter temperature is love language. I\'m fluent. *pats belly* Rosetta proof.', { stageMin: 5 }, 3),
        line('One day I\'ll have my own shop sign. Until then I have Rosa\'s ovens and my appetite for homework.', { reputationMin: 40 }, 2),
        line('Bake loud. Eat proud. That\'s the plan.', {}, 1),
      ],
    },
  }),

  // ── IRIS THE APOTHECARY ─────────────────────────────────────────────────────
  authorPersona('iris_apothecary', {
    name: 'Iris the Apothecary',
    bands: {
      slender: 'Iris the Apothecary tends her jars with dark eyes and darker remedies, hourglass figure still defined beneath robes that smell of dried root and secrets. She listens to ailments like confessions, voice low, fingers precise — a woman who trusts tea more than ale and herbs more than gossip, for now.',
      curvy: 'Iris has softened, hourglass curves blooming where honeyed teas and soft bread have crossed her threshold as payment. She still measures tinctures to the drop, but her hips sway when she turns to the high shelf, and customers swear her remedies taste sweeter when she smiles.',
      plump: 'Iris is pleasantly plump, belly gentle beneath layers of linen, voice a murmur over mortar and pestle. She hears secrets; she keeps them. She also keeps samples of every cure — professional diligence, she claims — and diligence has rounded her into something lush and mysterious, healing and hunger intertwined.',
      large: 'Iris has grown large, a substantial apothecary whose presence fills the stall like incense. Jars line the walls; curves line her robe. She diagnoses with a glance and feeds herself with the same care she prescribes — slow, deliberate, until fullness becomes its own remedy.',
      enormous: 'Iris is enormously full-figured, the market\'s velvet shadow — soft, dark-eyed, impossibly composed. Clients lean in for whispers and leave with tonics and the memory of a woman who has made abundance look intentional. Her belly rests against the counter like a sealed letter.',
      immense: 'Iris has become immense — a mystery wrapped in flesh that moves like smoke. Remedies still work. Prices still sting. She has simply grown vast enough to hold every secret the square brings, and every appetite she refuses to name aloud but nourishes anyway.',
    },
    extras: {
      ceiling: 'Iris hangs in candy bonds among her drying herbs, robes tangled, expression unreadable. "An interesting binding agent," she observes coolly. "Ineffective. Like most folk cures."',
      hold: 'Iris is frozen mid-grind, pestle locked over mortar, eyes sharp. She cannot move. She can still judge you. She does.',
      full: 'Iris reclines on a stool, hands on a belly rounded by honey bread and experimental tea blends. "The dosage was... generous," she admits, lids heavy. "I\'ll adjust. Tomorrow."',
    },
    greetings: [
      line('You again. Your pulse is calmer than last time. Sit — tell me what aches, inside or out.', { reputationMin: 50 }, 3),
      line('Apothecary Iris. I sell remedies, not rumors. Though sometimes both help.', { reputationMin: 30 }, 2),
      line('If you\'ve brought tea or honey, we may skip the formalities.', { willingnessMin: 55 }, 2),
      line('Speak softly. The jars are listening.', {}, 1),
    ],
    afterFeeding: [
      line('Mmm — clean sweetness. You understand balance. I\'ll remember that when mixing your fate.', { willingnessMin: 65 }, 3),
      line('A nourishing gift. The body notes it. So do I.', { willingnessMin: 45 }, 2),
      line('...Acceptable. Gratitude is also a tonic.', {}, 1),
    ],
    topics: {
      selling: [
        line('For you, a fair measure and a fair word: take this twice, and eat something gentle with it.', { reputationMin: 45 }, 3),
        line('Quality herbs, honest weight. I don\'t dilute — in tinctures or in trade.', {}, 2),
        line('Coin on the counter. Questions after.', {}, 1),
      ],
    },
  }),

  // ── WREN THE HERB MIXER ─────────────────────────────────────────────────────
  authorPersona('wren_herb', {
    name: 'Wren the Herb Mixer',
    bands: {
      slender: 'Wren the Herb Mixer grinds roots with downcast eyes, Iris\'s shy niece hiding behind hair that smells of lavender and embarrassment. Her slender frame seems to want to vanish into the mortar, cheeks pink at every word spoken toward her — a girl who knows every herb by scent and every compliment by panic.',
      curvy: 'Wren has softened, slender lines blooming where honey teas and Aunt Iris\'s insistence that she eat have begun to win. She still blushes when addressed, but hips curve now beneath her apron, and grinding slows when pastry appears. Shyness remains. So does a warmth she cannot grind away.',
      plump: 'Wren is pleasantly plump, belly pressing the counter when she reaches for high jars, blush permanent, voice a whisper that somehow carries kindness. She mixes remedies for strangers and samples sweets for courage — both recipes work. Her figure proves it.',
      large: 'Wren has grown large, a substantial mixer who still startles when praised but no longer disappears behind the stall. Curves spill softly; mortar steadies in plump hands. Iris says she\'s ready to speak to customers. Wren says she\'s ready for more honey cake. Progress takes many forms.',
      enormous: 'Wren is enormously full-figured, shy warmth embodied in lavish flesh that steams with herbal mist and embarrassment. She ducks her head; patrons lean closer. Her belly rests on the workbench like a secret she\'s tired of keeping. Remedies leave perfect. Wren stays imperfect, soft, adored.',
      immense: 'Wren has become immense — a blushing mountain of linen and lavender, still Iris\'s niece, now also the market\'s gentlest landmark. She cannot hide. She has stopped trying. Honey on her lips, curves in every shadow, she grinds roots and accepts pastries with the same trembling gratitude.',
    },
    extras: {
      ceiling: 'Wren hangs in candy bonds, mortar tipped, herbs raining down. "Aunt Iris!" she squeaks, scarlet. "I\'m fine — I\'m not — okay I\'m not fine."',
      hold: 'Wren is frozen mid-grind, cheeks burning, eyes shut. If she cannot move, she cannot be seen. Logic fails. Magic persists.',
      full: 'Wren sits on a low stool, hands on a rounded belly, honey jar empty beside her. "Iris said one spoon," she murmurs, stuffed. "...I heard two."',
    },
    greetings: [
      line('Oh — hello. You\'re... nice. I remember. Do you need a tonic? Or just... quiet?', { reputationMin: 50 }, 3),
      line('Um. Wren. Herb mixer. I can help. If you talk softly.', { reputationMin: 28 }, 2),
      line('Is that... for me? Food? Oh. Okay. Hi.', { willingnessMin: 60 }, 2),
      line('...Yes?', {}, 1),
    ],
    afterFeeding: [
      line('That was so kind I might cry. Happy cry. Thank you — really really thank you.', { willingnessMin: 70 }, 3),
      line('Mmm. Sweet. Like you. Sorry — that was too much. But the food was perfect.', { willingnessMin: 50 }, 2),
      line('...Thank you. I\'ll remember.', {}, 1),
    ],
    offerFood: [
      line('For me? Nobody — I mean — yes please. Thank you. Sorry. Thank you.', { willingnessMin: 65, reputationMin: 35 }, 3),
      line('Food? I\'ll take it. Quietly. If that\'s okay.', { willingnessMin: 50 }, 2),
      line('Oh. Okay. Yes. Thank you.', {}, 1),
    ],
  }),

  // ── NIA THE BASKET WEAVER ─────────────────────────────────────────────────────
  authorPersona('nia_basket', {
    name: 'Nia the Basket Weaver',
    bands: {
      slender: 'Nia the Basket Weaver sits with reed between her teeth and hands that never idle, pear-shaped patience in a frame still more craft than comfort. She weaves carriers sturdy enough for Gwen\'s heaviest produce, voice unhurried, eyes on the pattern — a woman who feeds others\' harvests before her own.',
      curvy: 'Nia has softened, pear curves filling where market lunches and shared fruit have begun to reward her labor. Reeds still whisper through her fingers, but her waist has thickened, and she pauses to chew slowly, contentedly. Baskets grow strong. So does she.',
      plump: 'Nia is pleasantly plump, belly resting against her lap as she weaves, reed tucked in smile. Merchants trust her work; friends trust her table — always bread, always cheese, always room for one more. Patience woven into wicker has woven itself into her body.',
      large: 'Nia has grown large, a substantial weaver whose stall smells of split cane and lunch. She crafts baskets deep enough for Gwen\'s melons and a figure deep enough to match. The market slows when she laughs; the laugh shakes her generous middle like a bell.',
      enormous: 'Nia is enormously full-figured, the row\'s rooted oak — soft, pear-shaped, immovable calm. Baskets pile high; curves spill comfortably. She feeds weavers\' apprentices, stray children, and herself without hurry, proof that abundance is built one strand at a time.',
      immense: 'Nia has become immense — a living loom of flesh and fiber, still patient, still weaving. Stools creak; reeds bend; Nia does not. She has spent years carrying others\' weight. Now she carries her own beautifully, market matriarch of bread, fruit, and baskets that never break.',
    },
    extras: {
      ceiling: 'Nia hangs in candy bonds above her reed pile, basket half-finished in lap. "Hmph," she grunts, not unkind. "Gwen\'ll laugh. Finish the weave when I\'m down."',
      hold: 'Nia is frozen mid-pattern, reed locked between fingers, eyes calm. She has waited out worse than magic. She can wait this out too.',
      full: 'Nia leans back against her stall, basket abandoned, hands on a belly full of market bread and shared cheese. "Good day\'s work," she murmurs, satisfied.',
    },
    greetings: [
      line('Back again. Good. I saved a basket with your name in the weave — figuratively. Sit if you\'re tired.', { reputationMin: 50 }, 3),
      line('Nia. Baskets, carriers, strong handles. Tell me what you\'re hauling.', { reputationMin: 30 }, 2),
      line('You look hungry. Market\'s loud. My corner\'s quiet. Rest a minute.', { willingnessMin: 60 }, 2),
      line('Weaver at work. Talk while I weave.', {}, 1),
    ],
    afterFeeding: [
      line('Now that\'s a meal with honest weight. Thank you — my hands work better when my belly\'s content.', { willingnessMin: 70 }, 3),
      line('Mmm. Simple, good. You understand market folk.', { willingnessMin: 50 }, 2),
      line('Grateful. Full. Both useful.', {}, 1),
    ],
    topics: {
      market_banter: [
        line('Coin follows appetite, Gwen says. I say appetite follows good baskets. Full baskets, full bellies — market thrives.', { reputationMin: 40 }, 3),
        line('We weave what the square carries. Lately it carries more of me. *chuckles* Fair trade.', { stageMin: 5 }, 2),
        line('Strong reed, strong weave, strong lunch. That\'s the row.', {}, 1),
      ],
      selling: [
        line('This one\'ll hold your melons and your pride. Fair price — I don\'t stitch greed into the rim.', { reputationMin: 35 }, 3),
        line('Custom sizes welcome. Tell me your load; I\'ll tell you your basket.', {}, 2),
        line('Pay honest. Carry honest. That\'s all.', {}, 1),
      ],
    },
  }),

  // ── SAFFRON THE SPICE GRINDER ───────────────────────────────────────────────
  authorPersona('saffron_grinder', {
    name: 'Saffron the Spice Grinder',
    bands: {
      slender: 'Saffron the Spice Grinder attacks her mortar with furious grace, apple-shaped energy in a frame still sharp with cinnamon and defiance. She sneezes, negotiates, grinds — a woman whose pestle never rests and whose tongue is hotter than her paprika, hungry for respect and pastry in equal measure.',
      curvy: 'Saffron has softened, apple curves rounding where tea cakes and temper have met on common ground. She still grinds like a storm, but hips sway when she pivots, and sneezes end in laughter more often than curses. Fire remains. So does frosting.',
      plump: 'Saffron is pleasantly plump, belly pressing the stall when she leans into a particularly stubborn clove, cheeks dusted with spice and pride. She negotiates like a storm and snacks like a woman who knows heat needs fuel. Merchants flinch. Pastry vendors profit.',
      large: 'Saffron has grown large, a substantial grinder whose voice carries over the row and whose body carries over her stool. Mortar never rests; curves spill; deals close fast. She sneezes cinnamon and settles disputes with a stare that has gained gravity — literal and otherwise.',
      enormous: 'Saffron is enormously full-figured, the market\'s spice tempest gone lush — apple-shaped, immovable, fragrant. She grinds, haggles, eats, grinds again. Customers pay premium for pepper and spectacle. Saffron considers both fair.',
      immense: 'Saffron has become immense — a fiery monument at the row\'s end, vast and scented and utterly unyielding. Mortar like a drum; belly like a boulder; voice like chili on the wind. Cross her and pay. Compliment her blend and pay less. Feed her and live.',
    },
    extras: {
      ceiling: 'Saffron hangs in candy ropes amid a cloud of cinnamon, sneezing violently. "I WILL GRIND WHO DID THIS!" she roars. The spice cloud agrees.',
      hold: 'Saffron is frozen mid-pound, pestle high, eyes blazing. She cannot strike. She cannot sneeze. Fury accumulates like ground pepper.',
      full: 'Saffron slumps on her stool, pestle across her lap, belly rounded by tea cakes won in a bet she engineered. "Worth it," she grunts, stuffed and victorious.',
    },
    greetings: [
      line('You! Good — I need a witness for this price war. Also maybe a pastry negotiator. You look capable.', { reputationMin: 50 }, 3),
      line('Saffron. Spices, heat, honest weight. Don\'t touch the saffron unless you\'re buying.', { reputationMin: 28 }, 2),
      line('If you brought something with cinnamon, we can talk terms. Friendly terms.', { willingnessMin: 58 }, 2),
      line('Talk fast. I\'m grinding.', {}, 1),
    ],
    afterFeeding: [
      line('HA — now THAT packs flavor. You\'ve earned a discount. Small one. Don\'t push.', { willingnessMin: 70 }, 3),
      line('Mmm. Good heat. Good heart. Thanks.', { willingnessMin: 50 }, 2),
      line('...Fine. Tasty. Don\'t get smug.', {}, 1),
    ],
    topics: {
      market_banter: [
        line('Market runs on appetite and argument. I supply both. Gwen pretends to mind. She doesn\'t.', { reputationMin: 40 }, 3),
        line('Grind fine, eat finer, haggle finest. That\'s the row\'s gospel.', { stageMin: 4 }, 2),
        line('Loud stalls sell. Loud women sell louder.', {}, 1),
      ],
      haggle: [
        line('You want cheaper? Make me laugh or make me lunch. You\'ve got one shot.', { reputationMin: 45 }, 3),
        line('I\'ll shave a coin off — not because you asked, because you\'re not boring.', { stageMin: 3 }, 2),
        line('Price is spice. Too little insults us both.', {}, 1),
      ],
    },
  }),

);
