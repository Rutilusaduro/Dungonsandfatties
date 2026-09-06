// The Squad — Lead: A7 Artisan | Support: A5 Editor
/**
 * Kitchen annex handcrafted personas — pantry, larder, dairy, smokehouse.
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export const KITCHEN_PERSONAS = mergePersonas(
  authorPersona('ruth_pantry', {
    name: 'Ruth',
    bands: {
      slender: `Ruth the Pantry Clerk stands amid labeled sacks and chalk tallies, her slim figure all angles and precision. Every jar sits with its label facing outward; every shelf bears a hash mark she updated at dawn. She inventories by weight down to the ounce and would notice if a single flour cup went missing before you finished your sentence. Her apron is spotless, her hair pinned with military discipline — the pantry has not yet written softness on her, though she watches who takes what with quiet, appraising eyes.`,
      curvy: `Ruth has begun to soften, her meticulous frame rounding at the hips and waist in ways her ledger cannot fully account for. She still counts every sack by weight, but now pauses between entries to adjust her apron strings when they dig in. The curves are gentle, almost apologetic — as if her body were smuggling indulgence past her own inspection. She blushes when Gertrude sends extra pastry through the door, and pretends the samples are for quality control.`,
      plump: `Ruth is pleasantly plump now, her once-angular silhouette filled out by years of tasting what she catalogs. She still notices when a flour cup goes missing, but her cheeks dimple when she says it, and her voice has lost some of its starch. Her apron strains comfortably across a rounded middle; she smooths it with habitual fingers that linger a moment longer than strictly necessary. The pantry smells of bread and butter, and Ruth smells faintly of both.`,
      large: `Ruth has grown very large, her substantial figure dominating the narrow aisles between storage racks. She moves with surprising grace for someone whose hips brush both sides of the passage, ledger tucked under one soft arm. Inventory takes longer now — she rests between counts, one hand often resting on the curve of her belly as if checking a sack's weight. She remains meticulous, but mercy has entered her margins; a missing cup might earn a sigh instead of a report.`,
      enormous: `Ruth is enormously full-figured, a living monument to everything the pantry holds and everything she has tasted in the name of duty. Her prodigious bulk sways when she reaches high shelves, and she has rearranged the storeroom twice to accommodate herself. She still labels every jar, still faces every tag outward, still knows exactly what should be where — but the woman conducting the audit has become as abundant as the stores she guards. She smiles more. She eats more. The ledger grows honest.`,
      immense: `Ruth has become immense — a pantry clerk whose body has finally outgrown her discipline without surrendering it. She fills the storeroom like a second wall of provisions, apron long since replaced, hair still pinned with the same iron precision. Sacks and jars seem toy-sized beside her; she inventories the realm's appetite and embodies it. When she laughs, which is often now, the whole kitchen hears it. She notices everything, forgives more, and samples with the serene authority of a woman who has made peace with abundance.`,
    },
    extras: {
      ceiling: `Ruth hangs face-down from candy ropes lashed around her chest, waist, and ankles, her plump body suspended above the flour sacks she guards so fiercely. Her ledger flutters to the floor. "Put me down this instant — those sacks are not labeled for aerial storage!"`,
      hold: `Ruth is frozen mid-inventory, pencil poised over her ledger, eyes wide with indignant panic. She cannot move a muscle, but her gaze tracks every jar on the shelf as if counting them by sheer will.`,
      full: `Ruth sits on an upturned crate, ledger forgotten in her lap, both hands resting on a distended belly rounded by one too many sanctioned samples. "The count... can wait," she murmurs, utterly stuffed and strangely serene. "The bread was excellent."`,
    },
    greetings: [
      line(`"You're early." Ruth looks up from her ledger without surprise. "Good. The flour delivery hasn't been miscounted yet. State your business before someone touches the pastry shelf."`, { reputationMin: 50 }, 3),
      line(`"Pantry access requires authorization." Ruth's pencil hovers. "You have the look of someone who might have it. Prove me wrong — pleasantly, if possible."`, { reputationMin: 25, reputationMax: 49 }, 2),
      line(`"If you've come to steal a cup of flour, I will know before you leave the room." Ruth adjusts her apron. "If you've come with bread, we may negotiate."`, { willingnessMin: 55 }, 2),
      line(`"Yes? The inventory is mid-count. Speak quickly, and don't touch anything labeled in red chalk."`, {}, 1),
    ],
    afterFeeding: [
      line(`"That was..." Ruth sets down her pencil with uncharacteristic care. "Within acceptable variance. Thank you. I may need to recalculate my afternoon portions."`, { willingnessMin: 60 }, 3),
      line(`"Noted. Flavor profile: excellent. Caloric density: considerable." She pats her middle, almost shyly. "I suppose I can make room in the ledger for gratitude."`, { willingnessMin: 45, willingnessMax: 59 }, 2),
      line(`"...Acceptable. File it under miscellaneous intake." Ruth's cheeks color. "Don't expect me to skip the next count."`, {}, 1),
    ],
    topics: {
      cooking: [
        line(`"Measure twice. Taste once — unless Gertrude orders otherwise, in which case taste until she says stop." Ruth taps her ledger. "The pantry feeds the kitchen. I feed the pantry's reputation."`, { reputationMin: 40 }, 3),
        line(`"A missing ingredient is a confession waiting to happen." She glances at her own softened waist. "I have become... more lenient about portion sizes. Professionally."`, { stageMin: 4 }, 2),
        line(`"Dry storage, cool air, honest labels. Everything else is Gertrude's problem — and Amélie's knife."`, {}, 1),
      ],
    },
  }),

  authorPersona('greta_larder', {
    name: 'Greta',
    bands: {
      slender: `Greta the Larder Maid is broad-shouldered and still lean in the cool stone room where she works, her frame shaped by hauling sacks rather than sampling them. Her voice stays soft even when she lifts what would break a lesser back, and her forearms speak of years between frost and lamplight. She knows every hook, every curing rack, every corner where the chill settles deepest. Hunger has not yet settled on her — but the larder has taught her patience, and patience, she suspects, is how appetite begins.`,
      curvy: `Greta has softened into gentle curves, her practical strength now wrapped in a body that fills her wool dress more warmly than before. She still hauls sacks without complaint, but pauses afterward with a hand on her hip, breathing slow in the cold air. The larder keeps its chill; Greta carries her own warmth. She hums old songs while she works, and the melody has grown unhurried, like a woman who has learned that rushing dinner is a sin.`,
      plump: `Greta is pleasantly plump, her mom-bod presence as reliable as the stone walls around her. Strong arms and a soft middle — she looks like someone built to carry provisions and enjoy them afterward. She leans against the curing racks when she thinks no one is watching, smiling at the hams as if they were old friends. Her voice stays gentle. Her appetite does not. She brings bread to every shift and finishes it before noon.`,
      large: `Greta is very large now, her substantial figure moving through the larder with the unhurried confidence of someone who knows every inch of the room — including the new inches she has added to it. Sacks that once seemed heavy now rest against her hip while she catches her breath, cheeks flushed from work and from something sweeter. She is still practical. She is still soft-spoken. She is also, unmistakably, a woman who has made friends with every cut of meat in the house.`,
      enormous: `Greta is enormously full-figured, a larder maid whose body has become as generous as the stores she tends. She fills the doorway when she enters, chill air swirling around a frame that radiates warmth. Hams hang above her; she hangs beneath them, laughing quietly at the symmetry. Her arms remain strong. Her belly has become a province. She feeds the kitchen, feeds herself, and sees no contradiction — only the honest work of keeping hunger at bay in a cold room.`,
      immense: `Greta has grown immense, a living larder in her own right — broad, soft, and monumental in the stone cold. She moves slowly not from weakness but from mass, each step deliberate, each breath fogging the air. The kitchen sends her samples; she accepts them with a practical nod and a smile that has lost all embarrassment. She is the reason the cured meats vanish on schedule and the reason the schedule includes seconds. In the deep chill, her warmth is legend.`,
    },
    extras: {
      ceiling: `Greta hangs face-down from thick candy ropes, her plump body swaying between curing racks like an unfortunate ham. "This is undignified," she says softly. "Also cold. Put me down before I drip on the sausage."`,
      hold: `Greta is frozen mid-lift, a sack of salt suspended in her strong arms, paralyzed by magic. Only her eyes move — calm, resigned, already calculating how to explain the delay.`,
      full: `Greta sits on a flour barrel, back against the stone wall, hands spread across a belly rounded by stew and bread and honest appetite. "The larder can wait," she murmurs, eyes half-closed. "So can I."`,
    },
    greetings: [
      line(`"Oh — hello." Greta's voice is warm as a hearth in this cold room. "You're just in time. I was about to break for bread. Company makes it better."`, { reputationMin: 50 }, 3),
      line(`"Mind the hooks — and the low beam." She shifts a sack aside with one easy motion. "What brings you down to the larder?"`, { reputationMin: 25 }, 2),
      line(`"If you've brought meat, I'll find a hook. If you've brought yourself, I'll find a stool." Greta smiles. "The chill makes everyone hungry eventually."`, { willingnessMin: 60 }, 2),
      line(`"Cold down here. Good for storage. Hard on lonely appetites." She nods toward the racks. "Speak your piece."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Mmm." Greta closes her eyes a moment. "That hit the right place. Cold rooms, warm food — you understand the pairing. Thank you."`, { willingnessMin: 65 }, 3),
      line(`"Solid meal. Practical portions." She pats her middle with a work-worn hand. "I'll remember this when the next sack needs lifting."`, { willingnessMin: 50 }, 2),
      line(`"...Good. Not much more to say than that." A small smile. "Good."`, {}, 1),
    ],
    topics: {
      cooking: [
        line(`"The larder teaches patience — meat cures, butter keeps, hunger waits." Greta leans against the stone. "I stopped fighting the lesson somewhere around the third ham."`, { stageMin: 5 }, 3),
        line(`"Gertrude sends down orders. I send up provisions. What happens in between is mostly lifting... and tasting, when Brigit insists."`, { reputationMin: 35 }, 2),
        line(`"Cool air preserves food. Warm company preserves cooks. I provide the first. Try to be the second."`, {}, 1),
      ],
    },
  }),

  authorPersona('clara_dairy', {
    name: 'Clara',
    bands: {
      slender: `Clara the Dairy Maid moves through the creamery with gentle steps, her pear-shaped frame still slight, her forearms milky from churn and pat. She laughs easily — too easily, the cows complain through the wall — and her voice carries warmth that has nothing to do with the ovens. Butter molds line the shelf like small golden hills; she greets each with a touch as tender as if it were alive. She has not yet grown into the abundance she handles every day, but her eyes follow cream the way a lover follows a glance.`,
      curvy: `Clara has softened into curves that suit the dairy — hips widening, waist rounding, cheeks always faintly flushed from steam or shyness. She churns with a rhythm that sways her whole body, and the motion has begun to leave its mark. Her laugh still startles the cows. Her apron ties strain when she bends to lift a full pail. She offers tastes to everyone and takes twice as many herself, blushing each time as if surprised by her own appetite.`,
      plump: `Clara is pleasantly plump, a dairy maid whose love of cream has written itself across every line of her figure. Her pear-shaped body moves through the creamery with unhurried grace, patting butter, skimming milk, pausing often to sample her own work. She smells of warm milk and honey; she tastes of it too, if you believe the kitchen gossip. Her gentleness has not diminished — if anything, it has grown, like something fed daily and well.`,
      large: `Clara is very large now, her substantial curves filling the creamery doorway when she carries the morning's yield. She sets down pails with a soft exhale, one hand drifting to her middle as if checking that the cream inside matches the cream she has become. Her laugh is deeper, richer, and the cows have stopped startling — they seem to approve. She feeds everyone who passes through: a slice of cheese, a spoon of curd, a smile that says there is always more.`,
      enormous: `Clara is enormously full-figured, a dairy maid transformed into something as lush and generous as the butter she shapes. Her body sways when she walks, each movement a slow celebration of milk and patience. The churn stands beside her like a modest cousin. She rests between batches with both hands on her belly, eyes half-lidded, humming tunes the cows seem to know. She has never been stern. She has never been small. She is, now, impossible to ignore.`,
      immense: `Clara has become immense — a living creamery, soft and vast and radiant with the work of years among milk and honey. She fills the room with warmth and presence, her pear-shaped enormity a testament to every wheel of cheese she has aged and every taste she has taken in the name of quality. When she laughs, butter seems to tremble on the shelves. When she offers food, refusal feels unkind. She is gentleness at scale, appetite without shame, and the cows have never been happier.`,
    },
    extras: {
      ceiling: `Clara hangs face-down from candy ropes above the churn, her plump body swaying, milk droplets flecking the floor. "Oh dear — oh — please put me down before the cream separates from embarrassment!"`,
      hold: `Clara is frozen mid-pour, cream streaming from a paralyzed hand in a helpless white arc. Her eyes are wide, gentle, already apologizing to the mess she cannot stop.`,
      full: `Clara sits on a milking stool, hands folded on a belly rounded by cheese and curd and second helpings she swore she would not take. "Just... one moment," she breathes, utterly content. "The cows can wait."`,
    },
    greetings: [
      line(`"Oh! Hello, sweetheart." Clara's smile is warm as fresh milk. "I was just about to taste the new batch — you'd be doing me a kindness to join me."`, { reputationMin: 50 }, 3),
      line(`"Careful — the floor's slick with cream." She offers a hand. "Come in. Everyone leaves this room a little softer around the edges."`, { willingnessMin: 70 }, 3),
      line(`"The cows are restless today. I think they smell butter on me." She laughs, startled by her own joke. "What can I do for you?"`, { reputationMin: 30 }, 2),
      line(`"Hello, dear. If you're hungry, say so early — I get distracted and eat the samples."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Oh — that was lovely." Clara presses a hand to her cheek, then her stomach. "You know exactly what a dairy maid craves. Cream and kindness. Thank you."`, { willingnessMin: 75 }, 3),
      line(`"Mmm. Rich. Gentle. Like you meant it." She smiles, eyes bright. "I'll think of this the next time I churn."`, { willingnessMin: 55 }, 2),
      line(`"How sweet of you." She means the food and the gesture. "I won't forget."`, {}, 1),
    ],
    offerFood: [
      line(`"For me? Oh — you shouldn't — ...all right, yes, place it there." Clara's eyes shine. "Cream, cheese, butter — I'll take anything you offer. Sit with me?"`, { willingnessMin: 70, reputationMin: 40 }, 3),
      line(`"I was going to offer you a taste, and here you are feeding me instead." She laughs softly. "The dairy works in circles. Yes, please."`, { willingnessMin: 55 }, 2),
      line(`"If it's dairy, I never refuse. If it's not dairy, I rarely refuse either." A gentle shrug. "What have you brought?"`, {}, 1),
    ],
    topics: {
      cooking: [
        line(`"Butter is patience. Cheese is memory. Cream is..." Clara blushes. "An invitation. I accept most invitations."`, { stageMin: 4 }, 3),
        line(`"Helena says my milk makes her wheels sing. I say Helena makes me eat too much brie. We are both correct."`, { reputationMin: 40 }, 2),
        line(`"Churn slow. Taste often. Apologize never." She winks. "That's the dairy way."`, {}, 1),
      ],
    },
  }),

  authorPersona('helena_cheese', {
    name: 'Helena',
    bands: {
      slender: `Helena the Cheesemaker stands among her aging wheels with the posture of a woman defending a kingdom, her hourglass frame still defined, her chin always high. Each wheel bears a name and a birthday; she remembers both without looking. Her hands smell of brine and pride. She takes insults to her brie personally and compliments to her cheddar as mere fact. She has not yet grown heavy from her craft — but she tastes everything she makes, and the math of that is not lost on her.`,
      curvy: `Helena has softened into curves that honor her hourglass heritage, hips and bust rounding while her pride remains sharp. She ages her wheels with the same care she now gives her waistline — noting changes, adjusting conditions, refusing to apologize. A slight swell at her middle does not diminish her authority; if anything, it proves she eats what she sells. "Quality control," she says, and dares you to disagree.`,
      plump: `Helena is pleasantly plump, a cheesemaker whose body has matured like her finest wheels — slowly, deliberately, with character. She moves between racks with a sway that commands respect, apron dusted with flour and ambition. Her brie has never been better. Her temper has never been shorter about people who call it "mushy." She pats her belly when she thinks no one watches, and calls it professional research.`,
      large: `Helena is very large now, her substantial hourglass figure filling the aging room like a queen among subjects. Wheels of cheese line the shelves; she lines the floor between them, magnificent and unapologetic. She still names every batch. She still remembers every birthday. She has added her own to the calendar, and celebrates with wine and the sharpest cheddar in the house. Insult her cheese at your peril. Compliment her figure if you dare — she might thank you.`,
      enormous: `Helena is enormously full-figured, a cheesemaker whose abundance rivals the stores she tends. Her prodigious curves strain her best apron; her pride strains nothing — it has only grown. She surveys her kingdom from a stool that creaks heroically, one hand on a belly that speaks of decades of tasting notes. "A good wheel needs time," she says. "So does a good woman." She has had both. She intends to have more.`,
      immense: `Helena has become immense — a legend in the aging room, vast and proud and utterly without humility. Cheese wheels seem modest beside her. She moves like a cathedral, slow and certain, brine and dignity in equal measure. Her brie is worshipped. Her person is stared at. She accepts both as appropriate. When she offers a taste, you take it. When she offers an opinion, you agree. The house voice has never carried farther.`,
    },
    extras: {
      ceiling: `Helena hangs face-down from candy ropes above her prized wheels, face flushed with outrage. "If you make me drip on the brie, I will age your regret for seven years!"`,
      hold: `Helena is frozen mid-gesture, one finger raised in perpetual accusation, paralyzed before a wheel she was about to condemn. Her eyes blaze. The cheese waits, innocent.`,
      full: `Helena reclines on her tasting stool, one hand on a belly distended by wine, bread, and three cheeses she "had to evaluate." "The wheel... can breathe without me," she murmurs, utterly satisfied.`,
    },
    greetings: [
      line(`"Ah. You have the look of someone who appreciates proper cheese." Helena inclines her head. "Speak carefully. I am listening, and I am easily offended on behalf of my wheels."`, { reputationMin: 50 }, 3),
      line(`"The aging room is not a salon — but for you, I might make an exception." She brushes flour from her apron. "What do you want?"`, { reputationMin: 30 }, 2),
      line(`"If you've come to insult my brie, leave now. If you've come with wine, we may negotiate."`, { willingnessMin: 50 }, 2),
      line(`"Yes? I'm mid-inspection. State your business before the humidity shifts."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Exceptional." Helena closes her eyes like a woman at communion. "Whoever made that understands fat, salt, and pride. My compliments — and my thanks."`, { willingnessMin: 70 }, 3),
      line(`"Adequate to excellent, depending on the bite." She touches her waist, satisfied. "I'll allow it. Bring more sometime."`, { willingnessMin: 50 }, 2),
      line(`"...Not an insult to my palate. High praise." A regal nod. "Thank you."`, {}, 1),
    ],
    topics: {
      cooking: [
        line(`"Cheese is cooked patience. Everything else in the kitchen is noise." Helena taps a wheel. "I listen to what ferments. Including myself."`, { stageMin: 5 }, 3),
        line(`"Clara sends milk. I send art. Gertrude sends demands. I send cheese and defiance." A thin smile. "The hierarchy is clear."`, { reputationMin: 40 }, 2),
        line(`"Taste at every stage. Age with intention. Never apologize for sharpness."`, {}, 1),
      ],
      selling: [
        line(`"My wheels are priced by time, care, and my mood." Helena's eyes gleam. "For you — perhaps a civilized figure. Do not haggle over the brie."`, { reputationMin: 45 }, 3),
        line(`"I sell cheese, not apologies. Each wheel has a birthday; each price has a reason."`, { reputationMin: 25 }, 2),
        line(`"Cash or barter. Compliments to the cheddar accepted as partial payment. Insults to the brie cost extra."`, {}, 1),
      ],
    },
  }),

  authorPersona('amelie_sous', {
    name: 'Amélie',
    bands: {
      slender: `Amélie the Sous Chef moves through Gertrude's kitchen like a blade through air — fast, precise, athletic, lean from heat and motion rather than denial. Her knife work is legend; her patience is not. She tastes everything once and critiques it twice, standing narrow-hipped at the pass with arms that know every scar and every sauce. Hunger has not yet softened her edges, but fire has — she glows with it, fierce and focused, Gertrude's right hand and sometimes her conscience.`,
      curvy: `Amélie has begun to curve, her athletic frame rounding where the tasting spoons add up. She still moves faster than most can follow, but now her hips sway when she pivots, and her apron clings differently after a long service. She denies nothing — she simply works harder, as if sweat could balance butter. Gertrude calls it "character development." Amélie calls it "temporary," and reaches for another spoon.`,
      plump: `Amélie is pleasantly plump, a sous chef whose body has finally caught up with her palate. Strong arms and a soft middle — she looks like someone who earns every bite in the heat of the kitchen and refuses to surrender them afterward. She still commands the line with ferocity, but rests one hand on her belly between courses now, breathing slow, smiling sharp. "Fat carries flavor," she says. "So do I."`,
      large: `Amélie is very large now, her substantial athletic bulk transformed into something powerful and plush. She fills the kitchen passage when she hurries — which is always — and the knives still flash, but slower, deliberate, like a woman who knows her own weight and uses it. Gertrude trusts her with the hams. The line fears her. Her appetite matches her standards: uncompromising.`,
      enormous: `Amélie is enormously full-figured, a sous chef become force of nature — vast, hot, unstoppable. She moves through steam and shouting with the authority of someone who has eaten every dish she perfected and kept the best portions for herself. Her belly precedes her around corners. Her knife work remains immaculate. She is Gertrude's pride, the kitchen's terror, and living proof that excellence and indulgence are not enemies.`,
      immense: `Amélie has become immense, a culinary titan whose body commands the kitchen like a second head chef. Immense, fierce, radiant with heat and satisfaction — she tastes, she judges, she eats, she conquers. The line snaps to attention when she speaks. The pots tremble when she laughs. She has outgrown every apron in the house and ordered three more. Gertrude calls her masterpiece. Amélie calls herself hungry. Both are correct.`,
    },
    extras: {
      ceiling: `Amélie hangs face-down from candy ropes above the pass, knife still in a paralyzed hand, athletic body swaying over boiling pots. "GERTRUDE! If my sauce breaks while I'm up here, someone's eating fire!"`,
      hold: `Amélie is frozen mid-chop, knife suspended, eyes furious and blazing. The vegetables wait. She cannot blink. She would swear if she could move.`,
      full: `Amélie slumps on a kitchen stool, chef's whites straining, hands on a belly distended by every course she "quality-checked." "The line... can run itself," she mutters, stuffed and triumphant.`,
    },
    greetings: [
      line(`"You. Good — hold this." Amélie shoves a spoon into your hand without waiting. "Taste. Tell me if it needs salt or courage."`, { reputationMin: 50 }, 3),
      line(`"Kitchen's hot. I'm hotter. Say what you need before the roux burns."`, { reputationMin: 30 }, 2),
      line(`"If Gertrude sent you, I'm busy. If you sent yourself, bring wine or get out of my way."`, { willingnessMin: 75 }, 2),
      line(`"Yes? Ten seconds. I'm reducing."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Magnificent." Amélie's eyes close a half-second — the highest praise she gives. "Whoever cooked that has talent. Or you have excellent taste in chefs. Thank you."`, { willingnessMin: 80 }, 3),
      line(`"Solid technique. Good fat. I'd hire the cook — or steal the recipe." She pats her middle, satisfied. "For now, my compliments."`, { willingnessMin: 60 }, 2),
      line(`"...Not bad. Not bad at all." A sharp nod. "I'll remember it."`, {}, 1),
    ],
    topics: {
      cooking: [
        line(`"Knife work first. Ego second. Butter always." Amélie flips a pan one-handed. "Gertrude taught me the rest — including when to eat the mistakes."`, { reputationMin: 45 }, 3),
        line(`"A sous chef tastes everything twice and regrets nothing." She gestures at her own softened frame. "The math is simple."`, { stageMin: 4 }, 2),
        line(`"Out of the way unless you're plating or eating. Preferably both."`, {}, 1),
      ],
    },
  }),

  authorPersona('gina_slicer', {
    name: 'Gina',
    bands: {
      slender: `Gina the Smokehouse Slicer stands at her board with dry-eyed focus, pear-shaped frame still slight, knife moving in even strokes that would make a surgeon sentimental. Her jokes are bad; her cuts are not. Brigit trusts her with the hams. The kitchen trusts her with nothing else — she is not cruel, merely economical with words and generous with precision. She smells of hickory and patience. She has not yet grown heavy from the smokehouse, but she samples every slice "for symmetry."`,
      curvy: `Gina has softened into curves that press against her smoke-stained apron, her pear-shaped body rounding while her knife stays level. She still delivers jokes that land like wet wood, but now she smiles when no one laughs — a small, private thing. Her slices remain even. Her portions have grown uneven in her favor. Brigit pretends not to notice. Gina pretends that's the point.`,
      plump: `Gina is pleasantly plump, a slicer whose love of meat has written itself in hickory and hip. She works the board with slow confidence, belly brushing the edge when she leans, knife never wavering. "Symmetry," she says, and cuts another sample. Her dry humor has not improved. Her ham has. She rests between hams with a hand on her middle and a expression of professional satisfaction.`,
      large: `Gina is very large now, her substantial pear-shaped figure dominating the smokehouse doorway. She still slices evenly — the knife knows its job, even if her apron has surrendered. Brigit calls her indispensable. The hams call her inevitable. She eats what she cuts and cuts what she eats; the accounting is honest. When she tells a joke, the room goes quiet. When she serves a plate, it does not.`,
      enormous: `Gina is enormously full-figured, a smokehouse legend whose body has become as generous as the hams she tends. Hickory clings to her hair and her pride. She moves slowly, knife flashing, belly swaying, jokes falling dead with reliable precision. Brigit has stopped commenting on portion size. Gina has stopped pretending she cares. The slices are perfect. The slicer is more so.`,
      immense: `Gina has become immense — a monument to smoke, salt, and appetite, vast and pear-shaped and utterly unbothered. She fills the smokehouse like a second fire, radiant and slow and sharp when she chooses. Hams hang above; she occupies below, larger than any of them, knife in hand, joke on lips, sample on tongue. Brigit trusts her completely. Everyone else trusts her portions — there are no small ones.`,
    },
    extras: {
      ceiling: `Gina hangs face-down from candy ropes above the curing racks, knife thankfully sheathed, plump body rotating slowly. "This is the worst joke I've told today. Put me down."`,
      hold: `Gina is frozen mid-slice, ham paralyzed against the board, eyes dry and flat with annoyance. The knife hovers. Even her irritation looks symmetrical.`,
      full: `Gina sits on a chopping block, hands on a belly rounded by ham and sausage and samples taken for "quality." "The smoke... can wait," she says, utterly stuffed. "I can't."`,
    },
    greetings: [
      line(`"You're blocking the light." Gina doesn't look up from the board. "Move left. Or bring meat. Those are your options."`, { reputationMin: 45 }, 3),
      line(`"Brigit says I'm supposed to be friendly." A pause. "Hello. That was friendly."`, { reputationMin: 25 }, 2),
      line(`"If you've come for ham, I've got it. If you've come for conversation, I've got less." She almost smiles. "Almost."`, { willingnessMin: 65 }, 2),
      line(`"...Yeah?" The knife keeps moving. "Talk."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Good fat. Good salt." Gina nods once — equivalent of a standing ovation. "Whoever made that knows meat. I'll say that much."`, { willingnessMin: 70 }, 3),
      line(`"Solid. I'd slice it again." She pats her stomach, economical even in gratitude. "Thanks."`, { willingnessMin: 55 }, 2),
      line(`"...Not bad." The highest tier of Gina praise. "Not bad."`, {}, 1),
    ],
    topics: {
      cooking: [
        line(`"Smoke low. Cut even. Joke bad." Gina's knife flashes. "Three rules. I follow two in public."`, { reputationMin: 35 }, 3),
        line(`"Brigit cures. I slice. The kitchen eats. Everyone wins, especially me."`, { stageMin: 4 }, 2),
        line(`"Patience smells like hickory. Impatience smells like burning. Don't rush a ham or a woman."`, {}, 1),
      ],
    },
  }),
);

export default KITCHEN_PERSONAS;
