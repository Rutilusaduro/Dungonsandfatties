// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
/**
 * Market row district — arc-two relationship progression beats.
 */
import { buildArcTwo, mergeArcTwo, arcLine, arcExamine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(
  buildArcTwo('rhea_cleaver', {
    examine: [
      arcExamine(
        `Rhea still flinches at the cleaver, but her smile when you arrive is steadier — slender frame speckled with blood she apologizes for, apron tied neat. Bess grunts approval from the next block; Rhea saves stew samples in a bowl labeled with your name, nervous pride.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The cleaver apprentice has softened where tastings won, belly pressing the block when she leans to show a cut she mastered for you alone. Nervousness remains; so does warmth — she mentions Lydia's cream puffs and Nia's lunch bread like a map of kindness you're on.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Rhea is a timid mountain behind the block, immensely soft, cleaver careful, appetite confident. Bess calls her reliable; you call her friend — she blushes, belly vast, and offers seconds without fear. "Bess said taste everything," she murmurs. "You said stay brave. Both worked."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Oh! Customer — friend! Bess is nearby if you need expert. I'm... not fainting today. Progress!`,
        { ...ARC.warming },
      ),
      arcLine(
        `Apprentice Rhea. I practiced this cut for you. Watch your fingers. Watch mine too — I'm better now.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `That was so good I forgot to be scared for a whole minute. Thank you — really. I'll remember on bad days.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Real food, not trimmings. You're kind. I might cry happy. Don't tell Bess. Okay tell her.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          `Bess says a butcher who won't taste doesn't deserve the block. I'm trying — for her, for me, for you. Low heat, long time. Like trust.`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('lydia_pastry', {
    examine: [
      arcExamine(
        `Lydia beams over sugar-dusted counters when you arrive, pear-shaped ambition still more dream than dough, but the corner piece with extra cream waits under a napkin — saved, not stolen, she insists. Rosa knows; Rosa approves.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The pastry girl has bloomed like her confections, hips swaying to the oven, cheeks pink from sampling and optimism. She pipes rosettes with your name in icing when the row is quiet, belly pressing glass, laughter shaking the display. Wren blushes buying them; Iris pretends not to notice.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Lydia is the market's sweetest landmark, immensely full-figured, curves and cream in legendary proportion. Ovens heat; she glows; sugar follows like perfume. She will own a shop — for now she owns your favorite stool, belly on the counter, proof of concept delicious. "Quality control," she sighs, blissful. "You inspired the recipe."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `You're back! Saved the corner piece — extra cream. Don't tell Rosa. Actually tell her; she'll be proud.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Hi hi hi! Fresh batch — and a sample line just for you. Saffron's jealous. Nia wants the recipe. You get the first bite.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `OH — incredible! I need to reverse-engineer that flavor. After chewing. And hugging you. Thank you!!`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm! Cream, crunch, kindness — perfect triangle. You're officially my favorite everything. Shop opening? You're invited. Front row. All you can eat.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          `Butter temperature is love language. I'm fluent — Rosetta proof. *pats belly* One day my own sign. Until then, every tart I pipe whispers your name. Metaphorically. Maybe literally.`,
          { ...ARC.bonded },
        ),
      ],
      offer_food: [
        arcLine(
          `For ME? Not a sample I made? Put it here — I'll critique professionally. Verdict: perfect. Like you.`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('iris_apothecary', {
    examine: [
      arcExamine(
        `Iris looks up from mortar with dark eyes that soften a fraction when you enter, hourglass figure precise beneath linen, jars aligned — and a honeyed tea steeping in a cup she pours without asking your ailments first. Trust, measured drop by drop.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The apothecary has softened where honeyed teas and soft bread crossed her threshold as payment, hips swaying to high shelves, voice a murmur meant for your ears alone. Wren blushes when Iris mentions you; Iris does not blush. She smiles, rare and deliberate.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Iris is velvet shadow made lush, immensely full-figured, belly resting against the counter like a sealed letter finally opened. Remedies work; prices bend for you; secrets stay kept — except the one where she admits abundance looks intentional on her. "Dosage generous," she murmurs. "Gratitude likewise."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `You again. Your pulse is calmer than last time. Sit — tell me what aches, inside or out. I'll listen first. Prescribe second.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Apothecary Iris. For you, remedies and honesty. Wren's grinding roots — quietly. We're glad you're here.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Mmm — clean sweetness. You understand balance. I'll remember when mixing your fate. Favorably.`,
        { ...ARC.warming },
      ),
      arcLine(
        `A nourishing gift. The body notes it. So do I. Stay — tea's fresh. Secrets optional. Company required.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      selling: [
        arcLine(
          `For you, fair measure and fair word: take this twice, eat something gentle with it. Wren mixed the batch. I approved it. We both thought of you.`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('wren_herb', {
    examine: [
      arcExamine(
        `Wren ducks her head when you enter, slender frame behind hair that smells of lavender, but honey cake waits on the bench — Aunt Iris said to share, she whispers, cheeks pink. Mortar slows; kindness speeds.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The herb mixer has softened where honey teas and Iris's insistence won, hips curving beneath apron, blush permanent yet smile easier. She mixes remedies with your name on the label — shy lettering, perfect measurements, love in grind.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Wren is a blushing mountain of linen and lavender, immensely soft, mortar steady in plump hands. She cannot hide; she has stopped trying. Honey on her lips, belly on the bench, she grinds roots and accepts pastries with trembling gratitude that steadies each visit. "Iris says I'm ready," she murmurs. "I say I'm yours to thank."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Oh — hello. You're... nice. I remember. Do you need tonic? Or quiet? I saved both.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Um. Wren. Herb mixer. Aunt Iris is watching. Not judging. I made you tea. It's okay if you don't want it. Please want it.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `That was so kind I might cry. Happy cry. Thank you — really really thank you. I'll write it in the ledger. Small letters.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Sweet. Like you. Sorry — too much. But the food was perfect. Stay while I eat? Please?`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      offer_food: [
        arcLine(
          `For me? Nobody — I mean — yes please. Thank you. Sorry. Thank you. Aunt Iris, look — kindness!`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('nia_basket', {
    examine: [
      arcExamine(
        `Nia weaves without pause when you approach, pear-shaped patience steady, reed between teeth, but bread and cheese wait on her stool — market lunch for two, unhurried. Gwen's melons get sturdy carriers; you get the warm corner.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The basket weaver has softened where market lunches lingered, belly resting on her lap as patterns grow intricate — one weave includes a ribbon from June, a joke from Saffron, a thank-you for you in the rim. Strong reed, strong weave, strong fondness.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Nia is the row's rooted oak, immensely full-figured, baskets piled high, curves spilling comfortably. She feeds apprentices, stray children, and you without hurry — proof abundance builds one strand at a time. "Good day's work," she murmurs, patting a belly content. "Good friend's better."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `Back again. Good. Saved a basket with your name in the weave — figuratively. Sit if you're tired.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Nia. Baskets, carriers, lunch. Gwen sent fruit. I saved half. Your half's bigger. Fair.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `Now that's a meal with honest weight. Thank you — my hands work better when my belly's content. So does my heart.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Simple, good. You understand market folk. Stay — I'll weave while you rest. No charge. Ever.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      market_banter: [
        arcLine(
          `Coin follows appetite, Gwen says. I say appetite follows good baskets — and good friends. Full baskets, full bellies. You fill both.`,
          { ...ARC.bonded },
        ),
      ],
      selling: [
        arcLine(
          `This one holds melons and pride. Fair price — I don't stitch greed into the rim. For you? Custom size. Custom handle. No coin if you bring lunch instead.`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('saffron_grinder', {
    examine: [
      arcExamine(
        `Saffron's pestle slows when you arrive, apple-shaped energy pausing mid-grind, cinnamon dusting her cheeks — she sneezes, laughs, and slides a tea cake from under the counter like contraband heat. Negotiations can wait; you cannot.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The spice grinder has softened where tea cakes and temper met common ground, hips swaying when she pivots, voice still stormy but eyeing your pastry before your purse. Nia bets on your visits; Gwen loses gracefully; Saffron wins flavor.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Saffron is a fiery monument at the row's end, immensely full-figured, mortar like drum, belly like boulder, voice like chili on wind. Cross her and pay; feed her and live — you chose wisely long ago. She grinds, haggles, eats, grinds again, patting a stomach victorious. "Worth it," she grunts. "You're worth it."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `You! Good — witness for my price war. Also pastry negotiator. You look capable. You look fed. I approve.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Saffron. Spices, heat, honest weight. Lydia owes me a tart; you owe me nothing. Sit. Eat. Talk.`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `HA — THAT packs flavor. You've earned a discount. Small one. Don't push. Okay push a little.`,
        { ...ARC.warming },
      ),
      arcLine(
        `Mmm. Good heat. Good heart. Thanks. I'll fight anyone who says otherwise. With spices. With fists. Your choice.`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      market_banter: [
        arcLine(
          `Market runs on appetite and argument. I supply both. Gwen pretends to mind. Nia doesn't. You? You calm the storm. Rare. Valuable.`,
          { ...ARC.bonded },
        ),
      ],
      haggle: [
        arcLine(
          `You want cheaper? Make me laugh or make me lunch. You did both. Fine — best price, forever. Don't tell the row. Tell everyone. I dare them.`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),
);
