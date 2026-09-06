/**
 * Arc-two relationship beats — Kitchen annex (pantry, larder, dairy, smokehouse).
 * The Squad — Lead: A7 Artisan | Support: A5 Editor
 */
import { buildArcTwo, mergeArcTwo, arcLine, arcExamine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(
  buildArcTwo('ruth_pantry', {
    examine: [
      arcExamine(
        'Ruth looks up from her ledger when you enter the pantry and does not resume counting immediately. Her once-angular frame has softened — hips rounding, belly a gentle swell beneath an apron she retied with less severity. She slides a stool toward you with her foot, pencil still warm in her hand. "You are early. Good. Gertrude has not sent chaos yet. Sit. I saved pastry — unofficially. Officially it is inventory variance."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The pantry aisle feels wider when Ruth makes room between labeled sacks — plump curves brushing racks without apology, ledger open to a page with your name in the margin disguised as a delivery note. She pats the crate beside her, cheeks dimpling. "Greta says cold rooms need warm company. I say you need honest bread and someone who notices when you skip meals. Sit. I noticed."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Ruth has become immense among her provisions — vast, meticulous, apron long since replaced, body filling the storeroom like a second wall of abundance. She sets the ledger aside without guilt and opens both arms toward the stool that creaks for you both. "You fed me through every recalculation. Sit in my gravity. Labels can wait. Gratitude cannot."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You again. Good — flour delivery intact, pastry shelf unmolested, and a stool saved where the ledger cannot see us being human.',
        { ...ARC.warming },
      ),
      arcLine(
        'Pantry access granted permanently. Sit. I logged you under essential provisions. Greta agrees. Gertrude pretends not to. Eat.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That was... within acceptable variance of perfect. Thank you. I may need to recalculate afternoon portions. Willingly.',
        { ...ARC.warming },
      ),
      arcLine(
        'Noted. Flavor: exceptional. Fullness: considerable. Gratitude: off the ledger and into my hands. Stay until Gertrude sends search parties.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Measure twice; taste once — unless Gertrude orders otherwise. Ruth feeds the pantry; Greta feeds the larder; you feed me without stealing cups of flour. Best kitchen triangle.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('greta_larder', {
    examine: [
      arcExamine(
        'Greta shifts a sack aside with one easy motion when you descend into the chill — warm voice, broad shoulders, mom-bod softening beneath wool that cannot quite keep the cold out. She nudges a stool toward the curing racks with her hip. "Oh — you. Just in time. Ruth sent bread. I saved the warm corner. Sit before your breath fogs twice."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The larder knows your footsteps now. Greta waits with stew and bread on the flour barrel, plump frame radiating heat against stone walls. She pats the space beside her until the bench creaks approval. "Gertrude shouts upstairs. Amélie shouts louder. Down here we eat and breathe. You belong in the quiet with me."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Greta the Larder Maid is immense in the deep chill — vast, soft, monumental, hams hanging above a body that radiates warmth enough for two. She opens her arms without hurry. "You fed me through every cold shift. Sit in my lap if the stool fails. Ruth will ledger it. I will call it honest."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Oh — hello, you. Bread is warm, chill is lying, and I saved a stool with your shape worn into it. Sit. Company makes hunger honest.',
        { ...ARC.warming },
      ),
      arcLine(
        'Cold down here still. Warmer when you come. Meat on hooks; stew on barrel; you on stool. Good arrangement. Speak or eat — both welcome.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Mmm. That hit the right place — cold rooms, warm food, you understanding the pairing. Thank you. I will remember when the next sack needs lifting.',
        { ...ARC.warming },
      ),
      arcLine(
        'Solid. Full. Good in the way only larder quiet allows. Stay until the chill forgets us. Ruth can wait. Gertrude can shout. I have you fed.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Gertrude sends orders; Ruth sends tallies; I send provisions and warmth. Brigit sends samples; you send yourself into my cold room. Best cure I know.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('clara_dairy', {
    examine: [
      arcExamine(
        'Clara looks up from the churn with a laugh that startles the cows quieter than usual. Her pear-shaped frame has ripened in steam — hips wider, belly soft beneath milky forearms, cheeks flushed before you speak. She wipes a cream smudge from her lip and pats the milking stool beside her. "Oh! You came back. I was tasting the new batch — twice — and thinking of you. Sit, sweetheart. Share the guilt."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The creamery smells warmer when Clara makes room on the bench she keeps for tasters who became favorites — plump curves swaying as she skims milk with unhurried grace. She slides cheese toward you without asking. "Helena says my milk makes her wheels sing. I say you make me eat too much brie happily. Sit. The cows approve of you. So do I."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Clara the Dairy Maid is immense in her own kingdom — vast pear softness gleaming with butter light, belly pooled between churn and bench, smile radiant enough to tremble shelves. She takes your hand before you sit. "You fed me cream and kindness until I grew honest. Stay. There is always more curd. Always more room beside me."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Oh! Hello, sweetheart — new batch ready, stool saved, samples already compromised. Join me before I eat your share by accident.',
        { ...ARC.warming },
      ),
      arcLine(
        'You\'re back. Floor\'s slick, heart\'s not. Sit. Everyone leaves softer; you arrive softer already. I like that about you.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh — that was lovely. Cream and kindness both. I will think of it next churn. Thank you for feeding what I share with everyone else.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm. Rich. Gentle. Full like a perfect wheel. Stay with me until the cows settle. I do not want to be generous alone today.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Butter is patience; cheese is memory; you are the invitation I accept most. Helena argues with wheels; I agree with your cooking. Sit often.',
          { ...ARC.bonded },
        ),
      ],
      offer_food: [
        arcLine(
          'For me? Oh — you should. Yes. Place it here. Cream, cheese, butter — I take anything from you. Sit with me while it disappears. Please.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('helena_cheese', {
    examine: [
      arcExamine(
        'Helena sets down her brine notebook when you enter the aging room — chin high, hourglass figure softened but pride untouched. Her waist has thickened; her authority has not. She gestures to the tasting stool with regal impatience. "Ah. You returned. I aged a wheel with your name — metaphorically. Sit. Insult my brie and leave. Otherwise, eat."',
        { ...ARC.warming },
      ),
      arcExamine(
        'Wheels line the shelves; Helena lines the floor between them like royalty among subjects — plump curves magnificent, apron dusted with flour and ambition. She pours wine without asking and touches your wrist briefly. "Clara sends milk; Gertrude sends demands; you send meals worth aging. Sit. I saved the sharpest cheddar and the softest truth — I missed you."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Helena the Cheesemaker is immense in her cathedral of brine — vast hourglass abundance, belly resting like a wheel in its prime, eyes gleaming with affection she would call professional tasting. She opens her arms with ceremonial gravity. "You fed me through every birthday on every wheel. Sit. Be honored. Be full. Be mine to spoil with sharp things and soft moments."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You have the look of someone who appreciates proper cheese — and proper company. Stool ready. Brie breathing. Speak carefully. I am listening warmly.',
        { ...ARC.warming },
      ),
      arcLine(
        'The aging room opens for you alone today. Wine poured. Wheel chosen. Sit before humidity shifts and I shift into sentiment.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Exceptional. Whoever made that understands fat, salt, and pride. My compliments — and my thanks. I will age this memory seven years.',
        { ...ARC.warming },
      ),
      arcLine(
        'Sublime. Full. Worthy of a named wheel. Stay until the brie forgives us for ignoring it. You are better company than humidity.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Cheese is cooked patience. Clara sends milk; I send art; Gertrude sends noise. You send meals I would stock forever. Hierarchy clear. You rise.',
          { ...ARC.bonded },
        ),
      ],
      selling: [
        arcLine(
          'For you — civilized price, improper generosity. Compliments to the cheddar accepted as payment. Insults to the brie still cost extra. Friends get wheels.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('amelie_sous', {
    examine: [
      arcExamine(
        'Amélie kills the burner when she spots you at the pass — knife still in hand, athletic frame rounding where tasting spoons add up, eyes fierce but pleased. She shoves a stool toward you with her hip. "You. Good. Hold this spoon. Taste. Tell me if it needs salt — or if you missed me. Gertrude does not need to know I asked."',
        { ...ARC.warming },
      ),
      arcExamine(
        'Steam parts around Amélie when she makes room at the pass — plump power in chef\'s whites, belly pressing the counter when she leans close to watch your face chew. She rests a hand on your shoulder, calloused and warm. "Ruth counts; Greta hauls; I burn and feed. You survive my kitchen and come back. Highest praise I give. Sit. Eat before the line notices I am soft."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Amélie the Sous Chef is immense at the heart of Gertrude\'s kitchen — vast, fierce, radiant with heat and satisfaction, belly preceding her around corners like a herald. She sets the knife down for you alone and opens both arms. "You fed the terror of the line. Feed me again. Stay until pots tremble. I tremble only for you. Do not tell Gina."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You. Good — spoon ready, roux behaving, ego simmering. Ten seconds became ten minutes when I hoped you would walk in. Taste first. Talk second.',
        { ...ARC.warming },
      ),
      arcLine(
        'Kitchen\'s hot. I\'m hotter when you\'re here. Stool cleared. Wine hidden from Gertrude. Sit. Tell me what you need before I feed you anyway.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Magnificent. Highest praise — eyes closed half a second. Whoever cooked that has talent. Or you have excellent taste in chefs. Thank you.',
        { ...ARC.warming },
      ),
      arcLine(
        'Perfect fat. Perfect salt. Perfect full. I would hire the cook — or keep you at my pass forever. Stay. The line can run itself tonight.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Knife work first; ego second; butter always. Gertrude taught me appetite; you taught me sharing it without shouting. Rare. Sit at my pass whenever.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('gina_slicer', {
    examine: [
      arcExamine(
        'Gina does not look up from the board when you enter — knife moving even, pear-shaped frame rounding beneath smoke-stained apron — but the next slice is thicker than symmetry requires. She nudges a stool with her boot. "You\'re blocking the light again. Move left onto the stool. I saved ham. That was friendly."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The smokehouse is quieter when Gina sets her knife down for you — plump hips leaning against the board, bad joke dying on her lips without regret. She slides a plate of even cuts across scarred wood. "Brigit cures. I slice. You eat. Everyone wins. You win most. Sit. Do not make me say nice things twice."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Gina the Smokehouse Slicer is immense between curing racks — vast pear-shaped legend, knife still level, belly swaying slow, hams hanging above like witnesses. She sheathes the blade for you and almost smiles. "You fed me past symmetry. Stay. Samples unlimited. Jokes still bad. Company best part."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You again. Light\'s still blocked. Stool\'s still saved. Ham\'s still even. That\'s three friendlies. Do not make me add a fourth.',
        { ...ARC.warming },
      ),
      arcLine(
        'Brigit says be social. I am social. Hello. Sit. Meat ready. Conversation optional. You optional — but I prefer you present.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Good fat. Good salt. Whoever made that knows meat. I will say that much. Thanks. Highest tier of Gina praise. There is not a higher tier.',
        { ...ARC.warming },
      ),
      arcLine(
        'Solid. Full. Would slice it again. Would sit with you again. Same thing. Stay until smoke settles. I do not say that to hams.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      cooking: [
        arcLine(
          'Smoke low; cut even; joke bad. Brigit cures; Ruth counts; Amélie yells. You sit and eat what I slice. Best kitchen geometry. Do not tell Amélie I said geometry.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),
);
