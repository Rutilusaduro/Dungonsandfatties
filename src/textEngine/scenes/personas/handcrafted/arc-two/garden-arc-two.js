/**
 * Arc-two relationship beats — Garden expansion (orchard, greenhouse, bees, wax).
 * The Squad — Lead: A7 Artisan | Support: A1 Mobile, A5 Editor
 */
import { buildArcTwo, mergeArcTwo, arcLine, arcExamine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(
  buildArcTwo('petra_orchard', {
    examine: [
      arcExamine(
        'Petra sets her paring knife on the stump between you and pats the seat she has worn smooth. Her pear-shaped frame has curved with the seasons — hips wider, belly a gentle harvest beneath her stained apron. Late apples gleam in the basket; she offers one without urging. "You return when the fruit is honest. Sit. Tilde will smell cider on your breath later. Good. Growth should travel."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The old tree knows your shade. Petra waits there with bread and sliced apple, plump body settled like a season that decided to stay. She slides the basket toward you with fingers that smell of sugar and skin. "Gregg tends beds; I tend years. You tend me without rushing. Rare. Sit. The last row is ours today."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Petra the Orchardist is immense among trunks she planted as a girl — vast pear shape, belly pooled on the stump, hands resting on warmth she no longer apologizes for. She opens her arms toward the ladder you both know you will not need. "You fed me through many harvests. I fed you patience and fruit. Sit in my shade. There is always room for one more slice."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You are just in time — the late apples are sweet and I saved the best row for someone who listens. That is still you.',
        { ...ARC.warming },
      ),
      arcLine(
        'Welcome back to the grove. Walk soft. I have knives, time, and a stump with your name worn into it. Metaphorically. Sit.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That was worth waiting for — like the last apple on the branch. The trees approve; I can tell. Thank you for not rushing ripeness.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm. Full. Warm. Honest. I will sit with this feeling under the old tree. Come find me whenever you need shade that understands appetite.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          'Petra picks; Tilde presses; Gregg tends beds. Between us the town eats and softens. You are part of that balance now — patient, fed, welcome every season.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('tilde_cider', {
    examine: [
      arcExamine(
        'Tilde ladles cider into two cups before you reach the bench, steam curling around her grandmotherly smile. Her mom-bod has ripened at the press — belly rounding, hips soft, apron flour-dusted from tarts she swears are only samples. She pats the space beside her with a hand that lingers on her own warmth. "There you are, dear. Petra sent windfalls; I sent sharp juice. You sent yourself. Sit before pastry cools."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The cider shed smells sweeter when Tilde makes room for you on the reinforced bench — plump thighs spreading, press idle, pastry plate already halved in your honor. She pours without asking and watches your eyes water with pride. "Oma does not share benches with many. You earned this one. Tell Petra the apples were right about you."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Tilde the Cider Oma is immense beside the press — vast, warm, belly risen like dough, hands folded on it as if cradling the next batch and your place in her routine. She opens arms that encompass half the shed. "You fed oma. Oma feeds everyone. Today oma feeds only you until we are both silly and full. Sit. The windfalls can wait."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'There you are, dear — cup\'s warm, pastry shamefully fresh, bench saved. Petra\'s apples and my cider agree you are family now.',
        { ...ARC.warming },
      ),
      arcLine(
        'Welcome back to the press. Taste first, talk second. I already poured two. Oma does not forget who keeps coming.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh, that was love in a bowl. Hips honest, heart warmer. I will heat cider whenever you knock. Forever, or until I forget — never.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm! Full as oma should be — happy, soft, grateful. You may sit in my lap if the bench groans. I will blame the apples. Stay.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          'Windfalls make sharp cider; steady visits make soft grandmothers. Petra picks; I press; you drink and return. Best arrangement in the garden, dear.',
          { ...ARC.bonded },
        ),
      ],
      offer_food: [
        arcLine(
          'For oma? You should — and you did. Put it here. I will match it with cider until we are both glowing. Violet can judge humidity later.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('violet_greenhouse', {
    examine: [
      arcExamine(
        'Violet sets down her misting bottle when you enter and does not pick it up again immediately. Her hourglass figure has filled beneath linen — waist still defined, belly soft, hips brushing pots she swore she cleared. She adjusts a gauge with one hand and gestures to the tea tray with the other. "You are on time. Seedling morale is high. I have noted your arrival in the ledger. Sit. Do not touch the gauges. You may touch the bench I saved."',
        { ...ARC.warming },
      ),
      arcExamine(
        'Condensation fogs the glass when Violet makes space for you between benches — plump curves navigating leaves with practiced care, tea poured to optimal temperature. She blushes when her hip bumps your knee and does not move away. "Sage overwaters. I over-prepare tea for you. Data suggests... fondness. Sit. The orchids are judging us less today."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Violet the Greenhouse Mistress has become a climate unto herself — immense hourglass softness steaming among orchids, belly pooled on her reinforced stool, gauges forgiven for once. She rests a gentle hand on yours before you sit. "You fed me through every stage I failed to predict. Sit in my humidity. I prepared too much tea. As usual. For you, always."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You are on time — seedlings at optimal morale, tea at optimal temperature, bench cleared within acceptable parameters. Welcome back.',
        { ...ARC.warming },
      ),
      arcLine(
        'Greenhouse open for you. Step where I step. Sage is elsewhere, thankfully. Sit. I have been waiting to report growth — mine and yours.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That exceeded acceptable deliciousness parameters. Thank you. I will log it beside humidity readings. Both elevated. Coincidence unlikely.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm. Warm. Full. Within range of perfect. Stay until the glass defogs. I prefer your company to the gauges today. Rare admission.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          'Sage overwaters; I over-count. Ivy counts heartbeats. You count as someone who respects glass and growth. The ferns survive because we all care differently.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('sage_fern', {
    examine: [
      arcExamine(
        'Sage bounces up from the fern trays — once, carefully, because her newly curved body wobbles with enthusiasm. Dirt smudges soft hips; pastry crumbs dot her lip. She grabs your sleeve with watering-can fingers. "You\'re here! I was telling Frondelia about you. She is also named Frondelia. Growth is confusing. Sit before I water you by accident."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The path wears Sage\'s seat-curve now; she pulls you down beside her with plump thighs spreading, ferns leaning in like eavesdroppers. Her belly rounds when she laughs — often, at her own jokes. "Violet says I over-everything. I over-miss you when you do not visit. Fair? Sit. I saved pastry. Had pastry. Saved some."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Sage the Fern Apprentice is immense among her trays — vast, joyous, belly like a hillock, arms wide enough to hug half the greenhouse glass. She beams up at you from her fern nest without shame. "I got bigger. You kept coming back. We are both winning. Sit. I will not water you. Probably."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You\'re here! Okay — hi! I saved you a fern. Not really. I saved you pastry. Really. Sit before I bounce into you again.',
        { ...ARC.warming },
      ),
      arcLine(
        'Hi hi hi — Violet is lecturing someone else. Bench is warm. Crumbs are yours. I am also yours. That came out loud. Sit anyway.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That was AMAZING. I feel like I could grow a whole new me. Thank you thank you — the ferns understand. I think. I do.',
        { ...ARC.warming },
      ),
      arcLine(
        'Full! Happy! Fern-level happy! Stay on the path with me. I will not water you. I will just sit here and glow at you.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          'Ferns like shade; I like pastries; Violet likes rules. You like me anyway. Best compromise in the garden. Sit with me whenever. Frondelia approves.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('yara_bee', {
    examine: [
      arcExamine(
        'Yara lifts her veil when she sees you approach the hives, calm as summer dusk. Her athletic frame has softened — hips rounding, belly a gentle swell beneath work-stained cuffs. Bees orbit without panic; she pats the bench beside her with honey-gilded fingers. "You walk quietly. The colony noticed. I noticed sooner. Sit. Comb is warm. So am I."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The apiary settles when Yara makes room for you on her bench — plump thighs spreading, pastry crumbs mingling with pollen on her apron. A drone lands on her shoulder; she does not flinch. "Luna takes my wax. I take your company. Fair trade. Sit. Eat. The bees do not mind. Neither do I."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Yara the Beekeeper is immense at the heart of her hives — vast, serene, belly rising like slow surf, bees walking her arms as if she were meadow made flesh. She opens her warmth beside her without hurry. "You fed me through many blooms. Sit in my calm. There is always room for sweetness between us."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You walk quietly — praise still stands. Comb is ready. Bench is saved. Move slow. Breathe slow. I already did, thinking of you.',
        { ...ARC.warming },
      ),
      arcLine(
        'Welcome back to the apiary. Bees remember kindness. So do I. Sit. Pastry or comb — both are yours today.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That was honey-sweet without the stick. I will sit with it awhile. Thank you for feeding what the hives only hum about.',
        { ...ARC.warming },
      ),
      arcLine(
        'Full. Good full. Like a hive before winter. Stay beside me until the sun moves. I do not hurry with you anymore.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          'Bees do not rush bloom. Luna takes wax; Ivy takes heartbeats; I take your patience. The garden runs on trades softer than coin — you are one of mine now.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('luna_wax', {
    examine: [
      arcExamine(
        'Luna looks up from a half-wicked hog candle as if you shimmered into the doorway on purpose. Her pear-shaped frame has ripened in the warm room — belly soft over her belt, hips swaying through aisles of molds. She giggles at a joke only she heard, then pats the bench with wax-dusted fingers. "You came back. Hog or flower? ...You. I choose you. Sit before I melt."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The workshop glows when Luna clears hog candles from the crate you always share — plump curves pooled on the reinforced bench, honey pastry halved without asking. She stares at you like a cloud that learned devotion. "Yara\'s wax, my hands, your coin — or your company. I prefer company. You keep buying me with presence."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Luna the Wax Maker is immense in her too-small room — vast pear softness gleaming with wax dust and honey light, belly spread in her lap like unfinished tapers. She smiles across the distance because turning her head is effort worth making. "Feed me or buy a candle. You did both. Stay. I am wickless and happy. For you."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Oh — you shimmered. I mean arrived. Welcome back. Bench cleared. Hog moved. Flower waiting. You waiting. Good.',
        { ...ARC.warming },
      ),
      arcLine(
        'Hello... I was making candles for you. They are all hogs. Honest hogs. Sit. Pastry is warm. Dreams are spilling. I do not mind.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That tasted like sunlight stored in comb. I will dream about it — and about you. Thank you. I will make you a hog candle. A loving hog.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm... soft, sweet, heavy in the nicest way. Stay until the wax cools. I cool faster with you here. Stay.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      selling: [
        arcLine(
          'Yara\'s wax, my hands, your company — best currency. Hogs last because nobody burns them. I would burn nothing you gave me. Buy a flower anyway. For luck.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('ivy_herbal', {
    examine: [
      arcExamine(
        'Ivy hums a single note when you enter the herb shed, seedlings leaning as if you were light they favored. Her slender frame has bloomed — waist soft, hips filling her skirt, cheeks permanently warm from tea steam. She tucks a mint leaf behind your ear with fingers that smell of chamomile. "Welcome back. I brewed for a heavy heart. Yours looks lighter. Stay anyway."',
        { ...ARC.warming },
      ),
      arcExamine(
        'Tea never cools before Ivy pours your cup — plump belly pressing the bench when she shifts cushions she insisted were for patients. She folds your hand into both of hers, calm eyes steady. "Violet counts humidity; I count how often you return. Prescription: bread, tea, and you on this cushion until we are both rooted."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Ivy the Herbalist is immense among hanging bundles — vast, serene softness spread on cushions, belly and breasts a landscape of tea-warm comfort. She pats the space beside her without hurry. "You fed every mood I could not name. Sit. I saved tea and bread for moods only you reach. Growth responds to gentleness. So do I."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Welcome back. Step softly — mint is napping. Tea is ready. Cushion is yours. Tell me what you need to grow today.',
        { ...ARC.warming },
      ),
      arcLine(
        'Hello, you. Kettle knew you were coming. I hum louder when you are near. Sit. Bread for moods tea cannot reach.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That was nourishment in the truest sense. I feel rooted. Thank you for feeding what I prescribe but rarely accept.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm. Warm. Gentle. Full like good rain after drought. Stay on the cushion with me. No prescriptions today. Only rest. Together.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          'Leaves tell you when they are ready — by scent, not calendar. You arrived when I was ready for company. Violet counts numbers; I count you among my gentlest harvests.',
          { ...ARC.bonded },
        ),
      ],
      offer_food: [
        arcLine(
          'Food offered in kindness is the best herb. From you, it is medicine I will take without arguing. Set it here. I will make tea to match your heart.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),
);
