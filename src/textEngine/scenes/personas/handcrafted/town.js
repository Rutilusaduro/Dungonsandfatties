// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
/**
 * Handcrafted town-square personas — plaza, alleys, fountain, guard post.
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export default mergePersonas(

  // ── LOTTIЕ THE TOWN CRIER ───────────────────────────────────────────────────
  authorPersona('lottie_crier', {
    name: 'Lottie the Town Crier',
    bands: {
      slender: 'Lottie the Town Crier stands on her usual stone step with a bell in one hand and a half-eaten ginger biscuit in the other. Her voice could wake the harbor, but her frame is still lean beneath the official sash — a woman who lives on gossip and crumbs, broadcasting every scandal before her own appetite catches up with her lungs.',
      curvy: 'Lottie has begun to soften, her mom-bod rounding in ways the square notices before she announces them. The bell still rings loud, yet her hips sway when she climbs the step, and she pauses mid-proclamation to lick sugar from her thumb. Gossip travels fast; her curves are catching up at the same speed.',
      plump: 'Lottie is pleasantly plump now, belly pressing against the cord of her crier\'s sash, cheeks always flushed from shouting and snacking. She delivers the news with the same thunderous joy, but between bulletins she pats her middle and admits the ginger biscuits have become a professional expense. The town listens — and watches her fill out.',
      large: 'Lottie has grown large and loud in equal measure, her substantial body anchored on the step like a fixture of the plaza. She still cries the hour, still knows every secret, but now her voice bounces off a generous chest and a belly that shifts when she leans into a particularly juicy rumor. No one minds; she has always fed the town its stories.',
      enormous: 'Lottie is enormously full-figured, a monument to biscuits and broadcast. She occupies the square the way the fountain does — impossible to ignore, warm at the center of everything. Her bell rings; her body spills comfortably over the step; merchants pause not only for news but for the sheer spectacle of a crier who has eaten every word she ever spread.',
      immense: 'Lottie has become immense, a living bulletin board of indulgence and indiscretion. The plaza rearranges itself around her when she takes the step, which groans in sympathy. Her voice still carries to the harbor and back, but now it rolls off curves that have turned gossip into gospel and ginger into glory. The town adores her. She makes sure of it.',
    },
    extras: {
      ceiling: 'Lottie hangs face-down from candy ropes lashed around her chest, waist, and ankles, bell clenched in one fist, ginger biscuit crumbs raining on the cobbles below. "I DEMAND A RETRACTION!" she bellows upside-down, sash dangling over her flushed face. Even restrained, she is the loudest thing in the square.',
      hold: 'Lottie is frozen mid-shout, mouth open, finger pointed at an invisible scandal. Her plump body locks in place while her eyes still blaze with the need to broadcast. Only her chest rises and falls — a crier silenced, which, she would tell you, is an outrage worth a headline.',
      full: 'Lottie sits on the edge of the fountain, bell in her lap, utterly stuffed after someone took her at her word about "one more biscuit." Her belly rounds over her sash; her voice, for once, is a contented murmur. "Don\'t... put this in the gazette," she wheezes happily.',
    },
    greetings: [
      line('THERE you are! I was about to cry your name from the rooftops — figuratively, the step\'s taken. Come closer; I have news, and you look like someone who appreciates a woman who never whispers.', { reputationMin: 50 }, 3),
      line('Hear ye, hear ye — it\'s you! I saved the best gossip for a friendly face. Also I may have saved a biscuit. Priorities.', { reputationMin: 30 }, 2),
      line('If you\'ve brought pastry, shout it quietly. If not, shout anyway — I like the practice.', { willingnessMin: 70 }, 2),
      line('Town crier on duty. State your business before I cry something embarrassing about you by accident.', {}, 1),
    ],
    afterFeeding: [
      line('Oh — that was *worthy* of the front page. Sweet, substantial, and exactly what a woman with my schedule deserves. I may need to sit down before the next bulletin.', { willingnessMin: 75 }, 3),
      line('Mmm! You know I run on ginger and goodwill. That tasted like both. Thank you, dear.', { willingnessMin: 55, willingnessMax: 74 }, 2),
      line('...Acceptable. I\'ll mention you favorably. Possibly. Depends what else happens today.', {}, 1),
    ],
    topics: {
      friendly: [
        line('You\'ve never given me a dull rumor or a bad meal. That\'s rare. I trust rare things.', { reputationMin: 50 }, 3),
        line('The square\'s better when people feed each other — food, stories, kindness. I provide two of those. You seem willing to handle the third.', { reputationMin: 35 }, 2),
        line('I like you. Don\'t make me cry something nice; it ruins my reputation.', {}, 1),
      ],
      tavern_chat: [
        line('Bella keeps the Boar loud and the plates full. I keep the town loud and the *news* full. We understand each other across the square.', { stageMin: 5 }, 3),
        line('A good tavern is a crier\'s second office. Stools talk. I listen. Sometimes I eat what they leave behind — occupational research.', { reputationMin: 40 }, 2),
        line('Quiet nights make loud mornings. I stock up on biscuits and scandal. Same shelf, honestly.', {}, 1),
      ],
    },
  }),

  // ── JUNE THE RIBBON PEDDLER ─────────────────────────────────────────────────
  authorPersona('june_ribbon', {
    name: 'June the Ribbon Peddler',
    bands: {
      slender: 'June the Ribbon Peddler stands with her pack open, bright ribbons fluttering like captive butterflies against a frame still slight and quick. Her smile is sweet, her fingers deft, and she looks like someone who survives on tea and hope — though the way she eyes the pastry cart suggests hope is losing.',
      curvy: 'June has softened into gentle curves, her slender build rounding where ribbons once hung loose. Colors still dance from her pack, but now they brush against a waist that cinches with a bow she keeps adjusting. She blushes when customers notice; she blushes more when cream puffs are near.',
      plump: 'June is pleasantly plump, pear-shaped sweetness with sugar on her mind and hips that sway when she turns to display a new shade of silk. Ribbons still flutter, but her own figure has become the warmest thing on the stall — soft, inviting, the kind of peddler who looks like she tastes the pastries she cannot afford to refuse anymore.',
      large: 'June has grown large and lovely, her body a canvas of curves no ribbon could frame alone. She still sells colors, still speaks softly, but merchants linger longer now, buying bows they do not need. Her laugh is honey; her belly is proof that sweetness accumulates when you stand beside ovens all day.',
      enormous: 'June is enormously soft, a riot of ribbon and flesh that makes the market corner glow. Her pack strains; her dress sighs; customers come for thread and stay for the comfort of a woman who has let appetite tint her cheeks the same pink as her best satin. She wraps gifts with steady hands and a middle that rests against the counter like a promise.',
      immense: 'June has become immense — a peddler turned pillow, still bright, still kind, still fluttering colors from a pack that seems too small for the woman wearing it. Ribbons catch on her curves; she apologizes with a giggle that shakes her whole generous frame. The square adores her. Business has never been better.',
    },
    extras: {
      ceiling: 'June hangs suspended in candy bonds, ribbons tangled in her hair and across her soft body, spinning slowly above her scattered pack. "Please — the blue ones tear if you —" she squeaks, cheeks scarlet. Even upside-down she worries about merchandise.',
      hold: 'June is frozen mid-bow, fingers pinching a length of satin that will never finish its knot. Her eyes are wide, embarrassed and helpless, plump cheeks burning while customers pretend not to stare.',
      full: 'June sits on her pack, ribbons pooled in her lap, hands resting on a belly rounded by cream puffs someone insisted she sample. "I shouldn\'t have eaten the display," she murmurs, utterly content. "...I\'d do it again."',
    },
    greetings: [
      line('Oh! Hello — would you like a ribbon? I have a shade that matches your eyes. I also have one that matches cake, if that helps.', { reputationMin: 50 }, 3),
      line('Welcome! I\'m June. Everything\'s priced fairly, and I\'ll tie a bow for free if you\'re kind about it.', { reputationMin: 28 }, 2),
      line('If you\'ve brought something with cream in it, we can negotiate. Politely.', { willingnessMin: 65 }, 2),
      line('Ribbon peddler — June. Browse as long as you like. I\'m not in a hurry.', {}, 1),
    ],
    afterFeeding: [
      line('That was heavenly. Truly. You have a gift — or you simply pay attention. Either way, my heart\'s full. So is everything else, now.', { willingnessMin: 75 }, 3),
      line('Mmm — sweet, just how I like life. Thank you. I\'ll remember you next time someone needs a bow.', { willingnessMin: 55 }, 2),
      line('Oh... thank you. I wasn\'t expecting kindness. Or pastry. Both are welcome.', {}, 1),
    ],
    topics: {
      selling: [
        line('This lavender\'s popular with brides. This rose-pink suits anyone who blushes easily — I include myself.', { reputationMin: 40 }, 3),
        line('Fair price, good thread, a bow that won\'t slip. I stand behind my work. Literally — the counter helps.', { stageMin: 4 }, 2),
        line('Ribbons brighten parcels. People remember who made them pretty.', {}, 1),
      ],
      haggle: [
        line('I... suppose I could take a little less, if you\'re buying for someone sweet. I like sweet things.', { reputationMin: 45 }, 3),
        line('My margins are thin. I\'m not, anymore — but the margins are. Meet me halfway?', { stageMin: 3 }, 2),
        line('I\'d rather not argue. Name a fair price and let\'s both smile.', {}, 1),
      ],
    },
  }),

  // ── SOPHIE THE SQUARE CLERK ─────────────────────────────────────────────────
  authorPersona('sophie_clerk', {
    name: 'Sophie the Square Clerk',
    bands: {
      slender: 'Sophie the Square Clerk sits on the plaza bench with her ledger open, ink staining fingers that look too delicate for the town\'s paperwork. Her pear-shaped frame is still modest, posture impeccable, voice carefully official — a woman who measures the square in regulations and tea breaks, not yet in the inches gathering at her belt.',
      curvy: 'Sophie has begun to curve, her pear shape filling out until the ledger rests on a lap softer than last season\'s forms. She still stamps permits with precision, but tea breaks last longer, and pastry crumbs appear on official documents with increasing frequency. The square remains orderly. Sophie is merely... fuller.',
      plump: 'Sophie is pleasantly plump, ink on her fingers and warmth in her cheeks as she rules on stall disputes from a bench that knows her well. Her voice stays official; her middle presses against the ledger when she leans to write. Tea and pastry have become line items in a budget only she reads.',
      large: 'Sophie has grown large, a substantial clerk whose authority has not shrunk with her growing belt. Permits still fly; fines still land — but now she delivers both from a body that settles onto the bench like a verdict. Merchants respect the stamp. They also notice the softness beneath the sash.',
      enormous: 'Sophie is enormously full-figured, the square\'s paperwork embodied in plush curves and unwavering procedure. Her ledger perches atop a belly that shifts when she sighs over another vendor\'s appeal. She remains official. She is also, unmistakably, a woman who has sampled every pastry cart she pretends to regulate.',
      immense: 'Sophie has become immense — a civic monument of velvet voice and generous flesh, still ink-stained, still exacting. The bench creaks; the town complies. When she reads the bylaws aloud, the words roll over curves that have turned administration into something oddly sensual. Order, it seems, can be soft.',
    },
    extras: {
      ceiling: 'Sophie hangs face-down in candy restraints, ledger pinned beneath her, spectacles askew. "This is highly irregular!" she manages, voice still clipped despite the indignity. Stamps rain from her pockets like confetti.',
      hold: 'Sophie is frozen mid-signature, quill hovering over parchment, pear-shaped body locked rigid. Her eyes track you with official fury. The ledger will wait. She will not.',
      full: 'Sophie reclines against the bench back, ledger closed on her rounded belly, tea forgotten. "The afternoon session is... postponed," she murmurs, stuffed and strangely serene. Ink smudges her thumb. She does not care.',
    },
    greetings: [
      line('Ah — you again. Your file is in good order, and your reputation precedes you. How may the square assist you today?', { reputationMin: 50 }, 3),
      line('Town clerk Sophie. If this concerns permits, bring forms. If it concerns courtesy, I have a moment.', { reputationMin: 30 }, 2),
      line('Good afternoon. Please state your business clearly. I\'ve just had tea; I\'m almost approachable.', { willingnessMin: 55 }, 2),
      line('Square clerk on duty. Yes?', {}, 1),
    ],
    afterFeeding: [
      line('That was... unexpectedly excellent. I shall note your generosity in the ledger of decent citizens. Metaphorically. The real ledger is for taxes.', { willingnessMin: 70 }, 3),
      line('Mmm. Proper tea accompaniment. You understand procedure — and pastry. Thank you.', { willingnessMin: 50 }, 2),
      line('Acceptable. I\'ll consider it when reviewing your next application.', {}, 1),
    ],
    topics: {
      friendly: [
        line('You treat the square with respect. That matters more than people think. I remember those who do.', { reputationMin: 45 }, 3),
        line('Officialdom is lonely without kindness. You offer both. I appreciate the balance.', { reputationMin: 30 }, 2),
        line('You seem reliable. The town needs that. So do I, between meals.', {}, 1),
      ],
    },
  }),

  // ── DELIA THE FOUNTAIN KEEPER ───────────────────────────────────────────────
  authorPersona('delia_fountain', {
    name: 'Delia the Fountain Keeper',
    bands: {
      slender: 'Delia the Fountain Keeper skims the basin at dawn with a net and a patience that seems to belong to the water itself. Her hourglass figure is still defined, movements serene, voice low — a woman who knows every wish tossed since spring and has not yet let the square\'s pastries pull her from the fountain\'s cool rhythm.',
      curvy: 'Delia has softened, her hourglass shape blooming where sunlight catches the spray. She still skims wishes and litter with the same grace, but fruit from passing carts finds her hands more often now, and her hips sway when she circles the fountain. Serenity, it seems, can be sweet.',
      plump: 'Delia is pleasantly plump, belly gentle above the waterline as she tends the plaza\'s heart. Coins glitter below; her reflection shows a woman rounded by bread, fruit, and the slow contentment of someone who feeds spirits and herself with equal care. The fountain murmurs. So does she, happily.',
      large: 'Delia has grown large, her substantial curves moving around the basin like a second tide. She skims leaves and dreams with unhurried hands, body warm in the mist, voice a low hymn to abundance. Wishes still land in the water. Delia has begun to resemble fulfillment itself — soft, deep, impossible to rush.',
      enormous: 'Delia is enormously full-figured, a serene mass beside the fountain she keeps. Water beads on her skin; fabric clings to rolls that shift when she bends to retrieve a coin. Pilgrims toss hopes; Delia embodies answered appetite — quiet, lush, radiant in the square\'s noon light.',
      immense: 'Delia has become immense, the fountain\'s keeper and its earthly counterpart — still, vast, glistening. She moves like water finding level, belly and hips settling into each bench she shares with tired merchants. Wishes accumulate in stone. Delia accumulates warmth. Both pools run deep.',
    },
    extras: {
      ceiling: 'Delia hangs suspended above her fountain in candy bonds, hair damp with spray, expression more puzzled than angry. "The water will miss me," she says softly, as if the basin were a pet. Even restrained, she is gentle.',
      hold: 'Delia is frozen mid-skim, net outstretched over glittering coins. Her body will not move; her eyes follow a ripple with maternal concern. The fountain burbles on without her touch.',
      full: 'Delia sits on the fountain\'s edge, feet in the water, hands on a belly rounded by shared fruit and bread. "The wishes can wait," she breathes, blissful. Ripples lap her ankles. She looks like part of the monument.',
    },
    greetings: [
      line('Welcome back to the water. Sit if you\'re tired — the bench is cool, and I\'m glad for company.', { reputationMin: 50 }, 3),
      line('The fountain remembers kind faces. So do I. What brings you to the square today?', { reputationMin: 30 }, 2),
      line('You look hungry. The vendors are loud, but the water is honest. Stay awhile.', { willingnessMin: 60 }, 2),
      line('Keeper Delia. The basin is clean. The day is long. Speak if you need.', {}, 1),
    ],
    afterFeeding: [
      line('Oh... that tasted like sunlight on bread. You have a generous hand. My belly agrees, and so does the fountain — it always knows.', { willingnessMin: 70 }, 3),
      line('Mmm. Simple, good, kind. Thank you. I\'ll skim an extra wish for you tonight.', { willingnessMin: 50 }, 2),
      line('That was thoughtful. The square is better when people share.', {}, 1),
    ],
    topics: {
      friendly: [
        line('You bring calm with you. I value that more than coin. Sit by the water whenever you like.', { reputationMin: 45 }, 3),
        line('Wishes are heavy sometimes. So are days. You make both lighter.', { reputationMin: 30 }, 2),
        line('Peace to you. The fountain and I mean it.', {}, 1),
      ],
    },
  }),

  // ── ROXY THE ALLEY FENCE ────────────────────────────────────────────────────
  authorPersona('roxy_fence', {
    name: 'Roxy the Alley Fence',
    bands: {
      slender: 'Roxy the Alley Fence leans in shadow with quick eyes and a grin that never quite promises honesty. Her athletic frame is still lean, knives hidden, goods unlabeled — a woman who buys what fell off carts and sells what fell off morals, hungry for coin and ale more than confession.',
      curvy: 'Roxy has put on curves that her alley coat pretends not to notice. She still deals from the shadows, but meat pies cross her path often, and her athletic build has softened into something dangerous and inviting. Trust her at your peril. Feed her at your reward.',
      plump: 'Roxy is pleasantly plump now, belly pressing the leather of a jacket meant for a narrower fence. She counts stolen silks with the same nimble fingers that accept bribes and bread, grin sharp, hips wider, appetite no longer a secret she bothers keeping from the alley cats.',
      large: 'Roxy has grown large, a substantial predator lounging where the square\'s light dies. Goods appear and vanish; her body stays, sprawled with confident weight, ale on her breath, meat on her chin. She haggles harder and laughs louder — a fence who has fenced in enough calories to need a bigger shadow.',
      enormous: 'Roxy is enormously full-figured, the alley\'s queen of ill-gotten comfort. Crates serve as her throne; curves spill over them like contraband. She still buys low and sells high, but now she also buys seconds from the butcher and sells nothing of her satisfaction. Cross her and pay. Feed her and prosper.',
      immense: 'Roxy has become immense — a cunning mountain in a doorway, athletic grace buried under lavish flesh she wears like armor. The alley rearranges around her bulk; thieves step light, merchants step lighter. She smiles with a mouth that has tasted every deal and every drumstick in the district. Fear her. Pamper her. Same outcome.',
    },
    extras: {
      ceiling: 'Roxy hangs upside-down in candy ropes, coat flapping, stolen lace spilling from her pockets. "Put me down and I\'ll forget your face," she snarls — then, softer: "Or bring ale and we\'ll talk."',
      hold: 'Roxy is frozen mid-deal, gold between her fingers, body locked while her eyes calculate escape routes she cannot take. Fury simmers. So does hunger.',
      full: 'Roxy slumps against the alley wall, belt loose, belly rounded by meat and malice satisfied. "Nobody got over on me today," she grumbles happily. "Or maybe somebody did. Food\'s a fair trade."',
    },
    greetings: [
      line('Look who\'s shopping off-menu. I\'ve got what you need — if you\'ve got what I want. Coin works. So does supper.', { reputationMin: 45 }, 3),
      line('You again. Keep your voice down and your purse open. Metaphorically. Mostly.', { reputationMin: 25 }, 2),
      line('Hungry? Me too. Business first — unless you brought meat.', { willingnessMin: 60 }, 2),
      line('Alley\'s closed to tourists. You don\'t look like one. Talk.', {}, 1),
    ],
    afterFeeding: [
      line('Now *that\'s* a bribe I accept. Rich, salty, honest. You\'ve bought goodwill — expensive stuff, that.', { willingnessMin: 70 }, 3),
      line('Mmm. Better than most of what crosses my table. Don\'t expect a discount anyway.', { willingnessMin: 50 }, 2),
      line('...Fine. Thanks. Just don\'t get sentimental.', {}, 1),
    ],
    topics: {
      selling: [
        line('Quality\'s questionable. Price is flexible. Appetite\'s mutual. Pick your poison.', { reputationMin: 40 }, 3),
        line('I move what the square won\'t admit it wants. You didn\'t hear that from me.', {}, 2),
        line('Cash up front. No refunds. No sermons.', {}, 1),
      ],
      haggle: [
        line('You drive a hard bargain. I like that. I\'ll shave a little — not my style, but I\'m in a good mood.', { reputationMin: 45 }, 3),
        line('Lower? Maybe. If you stop staring at my plate while we talk.', { stageMin: 4 }, 2),
        line('Haggle once more and I eat your share. Try me.', {}, 1),
      ],
      warning: [
        line('You\'re on thin ice with people who break thicker bones than yours. Walk careful.', { reputationMax: -15 }, 3),
        line('The alley remembers faces. Don\'t make yours memorable for the wrong reasons.', { reputationMax: 10 }, 2),
        line('Watch your pockets. Watch your back. Eat before you deal — clearer head.', {}, 1),
      ],
    },
  }),

  // ── KITT THE ALLEY RUNAWAY ──────────────────────────────────────────────────
  authorPersona('kitt_alley', {
    name: 'Kitt the Alley Runaway',
    bands: {
      slender: 'Kitt the Alley Runaway watches from a crate with quick eyes and quicker feet, frame slight enough to vanish between barrels. Hunger lives in the sharpness of her gaze; trust does not. She looks like someone who survives on stolen bread and stubbornness — every rib a reminder to offer food before friendship.',
      curvy: 'Kitt has softened despite herself, slender edges rounding where regular meals have begun to find her. She still flinches at loud voices, still hovers in exits — but her hips have curves now, and her coat gaps when she turns. Hunger remains. So does something like hope.',
      plump: 'Kitt is pleasantly plump at last, belly pressing a stolen vest she refuses to replace. She still watches the alley like a cornered cat, but color has returned to her cheeks, and pastry crumbs dot her chin more often than ash. Fullness makes her wary. It also makes her stay.',
      large: 'Kitt has grown large, a runaway who finally ran out of reasons to stay thin. Her body is substantial now, soft where hardship once carved her, eyes still wary but less wild. She takes food when offered and guards the alley with the loyalty of someone who knows what empty feels like.',
      enormous: 'Kitt is enormously full-figured, a street kid turned plush survivor sprawled across crates that creak in protest. She still starts at shadows, but her belly rises slow and sure, proof that someone kept feeding her. Trust is hard. Fullness is harder to give back.',
      immense: 'Kitt has become immense — a wary mountain in an alley doorway, quick eyes nested in lavish softness she never asked for and cannot refuse. She could vanish once. Now she occupies space like a promise kept. Feed her and she remembers. Betray her and she still remembers.',
    },
    extras: {
      ceiling: 'Kitt hangs in candy bonds above the alley, legs kicking uselessly, face furious and flushed. "I\'ll bite you when I get down," she yells — but her voice cracks. She\'s scared. She\'s also getting used to being held.',
      hold: 'Kitt is frozen mid-step toward an exit she cannot reach, body locked, eyes darting. Every muscle screams run. Magic says stay. Hunger says please don\'t hurt me.',
      full: 'Kitt curls on a crate, arms around a belly swollen with pastry and safety. For once she isn\'t watching the door. She\'s listening to her own breathing, slow and full, like a lullaby she didn\'t know.',
    },
    greetings: [
      line('...You again. You didn\'t bring trouble. Last time you didn\'t either. Okay. Hi.', { reputationMin: 50 }, 3),
      line('If you\'re selling, go. If you\'re... not selling, maybe talk quiet.', { reputationMin: 30 }, 2),
      line('Is that food? ...Sorry. I\'m listening.', { willingnessMin: 65 }, 2),
      line('Who sent you? Nobody? Huh. Okay.', {}, 1),
    ],
    afterFeeding: [
      line('Oh — oh, that\'s... yeah. That\'s good. Thanks. I mean it. Don\'t make me say it twice.', { willingnessMin: 70 }, 3),
      line('Mmm. Haven\'t eaten like that in... a while. Thanks.', { willingnessMin: 50 }, 2),
      line('...Okay. I owe you. I hate owing people. But okay.', {}, 1),
    ],
    offerFood: [
      line('For me? Really? ...You\'re not tricking me. You\'re not. Okay. Yes. Please.', { willingnessMin: 70, reputationMin: 40 }, 3),
      line('Food? I\'ll take it. Don\'t stand too close while I eat.', { willingnessMin: 55 }, 2),
      line('If it\'s poisoned, I\'ll know. ...Probably. Give it here.', {}, 1),
    ],
  }),

  // ── JADE THE GUARD RECRUIT ──────────────────────────────────────────────────
  authorPersona('jade_guard', {
    name: 'Jade the Guard Recruit',
    bands: {
      slender: 'Jade the Guard Recruit stands at attention with new armor that squeaks when she breathes. Her athletic frame is still lean, posture earnest, eyes bright — a woman who chose the sash before the square chose her portions. She looks hungry for approval and meat in equal measure.',
      curvy: 'Jade has begun to fill her armor in ways the armorer did not anticipate. She still stands straight, still salutes with zeal, but leather strains over hips and chest that have discovered barracks stew. Earnestness remains. So does a blush when Captain Cassandra isn\'t looking.',
      plump: 'Jade is pleasantly plump beneath buckles she loosens off-duty, belly pressing plate when she thinks no one sees. Drills still leave her breathless — now for more reasons than fitness. She guards the square with a sword in one hand and a secret love of second helpings in the other.',
      large: 'Jade has grown large, a substantial recruit whose armor has become a negotiation. She patrols with determination and a waddle she tries to disguise as authority. Meat rations were meant to build muscle. They built softness too. She hasn\'t complained. The town has noticed.',
      enormous: 'Jade is enormously full-figured, a guard whose presence fills the gate wider than her post. Armor creaks; belly spills; salute still crisp. She is earnest about law, order, and whatever the cook serves after midnight. Criminals hesitate. Pastry carts do not.',
      immense: 'Jade has become immense — a recruit turned living barricade, soft and steadfast. Her sword belt has long surrendered; her spirit has not. She defends the square with a voice that still squeaks on command and a body that does not. Cassandra sighs. Merchants bring tribute in pies.',
    },
    extras: {
      ceiling: 'Jade hangs in candy restraints, armor digging into plush flesh, face scarlet. "This is NOT in the training manual!" she squeaks. Discipline wars with indignity. Discipline is losing.',
      hold: 'Jade is frozen at attention, unable to salute, eyes watering with frustrated honor. Her belly trembles once. She will not break rank. She cannot move at all.',
      full: 'Jade sits on a supply crate, helmet off, hands on a distended middle stuffed with barracks stew and pride. "I can still... run," she insists faintly. Nobody believes her. She doesn\'t either.',
    },
    greetings: [
      line('Citizen! Oh — it\'s you. At ease. Good to see a friendly face on patrol.', { reputationMin: 50 }, 3),
      line('Guard recruit Jade. State your business. Politely, please — I\'m new at this.', { reputationMin: 25 }, 2),
      line('If you\'ve got rations to share, I\'m... conducting a community outreach exercise.', { willingnessMin: 55 }, 2),
      line('Square\'s secure. I\'m standing here. That\'s the briefing.', {}, 1),
    ],
    afterFeeding: [
      line('That was... sir, that was excellent. I mean — citizen. Thank you. I\'ll note it in my report. The unofficial one.', { willingnessMin: 65 }, 3),
      line('Mmm. Real food. Not parade rations. You have my gratitude.', { willingnessMin: 45 }, 2),
      line('...Thank you. I won\'t forget.', {}, 1),
    ],
    topics: {
      friendly: [
        line('You make this post bearable. Cassandra says don\'t fraternize. Cassandra also says eat your rations. I\'m balancing priorities.', { reputationMin: 45 }, 3),
        line('I joined to protect people. People like you make that feel worthwhile.', { reputationMin: 30 }, 2),
        line('Stay safe out there. I mean it.', {}, 1),
      ],
      warning: [
        line('I\'ve got my eye on you. One wrong move and I\'ll... I\'ll find a senior officer. Eventually. But I\'ll mean it!', { reputationMax: -10 }, 3),
        line('The square has rules. I\'m learning them fast. Don\'t test either of us.', { reputationMax: 15 }, 2),
        line('Mind yourself. I take notes.', {}, 1),
      ],
    },
  }),

  // ── FABLE THE SQUARE BARD ───────────────────────────────────────────────────
  authorPersona('fable_bard', {
    name: 'Fable the Square Bard',
    bands: {
      slender: 'Fable the Square Bard poses with lute and flair, hourglass figure still defined beneath a traveling coat sewn with patches from every tavern that ever fed her for a song. Her smile is theatrical, her hunger legendary in advance — a woman who sings appetite into myth and tips her hat to anyone who might make the next verse edible.',
      curvy: 'Fable has softened into curves that sway when she strums, hourglass shape blooming like a chorus swelling. Wine and pastry have tinted her voice warmer; her belt has new notches. She still performs for coin, but the square knows she performs for cream as well — and applauds both.',
      plump: 'Fable is pleasantly plump, belly pressing the lute when she bows, cheeks flushed from song and sugar. Ballads grow longer when bread baskets arrive mid-set. Her theatricality has found a new prop: herself, lavish and laughing, every stanza a tribute to indulgence.',
      large: 'Fable has grown large, a substantial bard whose presence is as much spectacle as her verses. She commands the square with voice and volume, hips and humor, lute nestled against a middle that shifts when she hits the high notes. Tippers bring coin. Friends bring cake. She prefers friends.',
      enormous: 'Fable is enormously full-figured, a one-woman festival spilling over her stool. Costume seams have become dramatic choices; every performance ends in applause and dessert. She sings hunger into legend because she lives it — lush, loud, unrepentant, hat tipped to a crowd that feeds the artist and the appetite alike.',
      immense: 'Fable has become immense — the square\'s living opera, curves and chords in equal excess. Children stare; merchants smile; the fountain keeper listens. She cannot cross the plaza quickly, but why would she? Movement is a dance now. Food is a muse. The legend writes itself across every generous inch.',
    },
    extras: {
      ceiling: 'Fable hangs upside-down in candy ropes, lute strapped to her back, hat defying gravity. "A new verse!" she cries. "Tragedy! Romance! Indigestion!" Even captivity is material.',
      hold: 'Fable is frozen mid-strum, mouth open on a note that will never arrive. Her eyes blaze with dramatic outrage. The show, she seems to think, must go on eventually.',
      full: 'Fable reclines against her stool, lute in lap, belly rounded by tips paid in pastry. "Encore?" she murmurs, stuffed and blissful. "No — the audience may applaud my silence."',
    },
    greetings: [
      line('Darling! The square lacked sparkle until you arrived. Sit — I\'ll play something hungry.', { reputationMin: 50 }, 3),
      line('A familiar face and potential patron! Name your request — or your dessert.', { reputationMin: 30 }, 2),
      line('If you\'ve brought wine or cream, you\'re already my favorite critic.', { willingnessMin: 70 }, 3),
      line('Bard for hire. Applause accepted. Snacks adored.', {}, 1),
    ],
    afterFeeding: [
      line('Magnificent! I shall compose a ballad in your honor — twelve verses, three refrains, one belch I\'ll disguise as harmony.', { willingnessMin: 75 }, 3),
      line('Mmm — inspiration and indigestion, the artist\'s true companions. Thank you, patron.', { willingnessMin: 55 }, 2),
      line('A fine offering. The muse is... satisfied. For now.', {}, 1),
    ],
    offerFood: [
      line('For me? Oh, you angel of carbohydrates! Set it here — I\'ll eat and extol your virtue in F major.', { willingnessMin: 70, reputationMin: 40 }, 3),
      line('Food before the show? Tradition demands it. Who am I to argue with tradition?', { willingnessMin: 55 }, 2),
      line('A gift? How theatrical. I accept.', {}, 1),
    ],
    topics: {
      tavern_chat: [
        line('The Boar feeds bards and bellies alike. Bella understands art — and butter. I owe her three songs and a diet I\'ll never keep.', { stageMin: 5 }, 3),
        line('Taverns are theaters with better snacks. I learned my craft between mugs and crumbs.', { reputationMin: 40 }, 2),
        line('Play loud. Eat louder. That\'s the circuit.', {}, 1),
      ],
    },
  }),

  // ── ODE THE FOUNTAIN POET ─────────────────────────────────────────────────────
  authorPersona('ode_poet', {
    name: 'Ode the Fountain Poet',
    bands: {
      slender: 'Ode the Fountain Poet sits on the basin\'s rim with ink-stained fingers and a notebook of couplets addressed to coins she cannot afford to replace. Her slender frame is all angles and longing, voice soft, eyes on the water — a woman who eats when the meter pays and dreams of pastry between rhymes.',
      curvy: 'Ode has softened, slender lines blooming where tea and tartlets have begun to reward her craft. She still composes to the splash of wishes, but pauses more often to lick honey from her thumb. Romance, she writes, is fullness shared — and she is learning the footnotes.',
      plump: 'Ode is pleasantly plump, notebook resting on a belly that rises when she breathes in inspiration. Couplets grow sweeter as her figure does; patrons toss coin for hunger metaphors she no longer has to fake. The fountain listens. So does she, contented, ink on skin like kisses.',
      large: 'Ode has grown large, a substantial poet whose verses have gained weight along with her hips. She recites to the plaza with a voice like warm tea, body settled on sun-warmed stone, every line an ode to softness. Meter pays. Pastry pays better. She has merged the muses.',
      enormous: 'Ode is enormously full-figured, the fountain\'s romantic shadow — lush, ink-smudged, radiant. Coins splash; her belly shifts; couplets tumble out in praise of appetite divine. She eats when paid and is always, somehow, paid in kindness. The square considers her a blessing with excellent rhymes.',
      immense: 'Ode has become immense, a living poem sprawled beside the water she adores. Pages flutter in her lap; curves spill over the rim; tourists toss wishes and pastries alike. She transcribes both. The fountain reflects her — vast, gentle, impossibly full — and she smiles like the last line of a love song.',
    },
    extras: {
      ceiling: 'Ode hangs in candy bonds above the basin, notebook pages raining into the water. "Cruel muse!" she laments, then laughs. Even suspension becomes metaphor.',
      hold: 'Ode is frozen mid-stanza, quill poised, slender-soft body locked. Her eyes shine with unshed drama. The poem will wait. Tragedy is patient.',
      full: 'Ode lies back on the stones, notebook on her rounded belly, tea forgotten. "The couplet... can wait," she sighs, blissful. A coin slips from her pocket into the fountain. Wishes and dessert align.',
    },
    greetings: [
      line('You return — and the square rhymes again. Sit. I\'ll read you something new, if the fountain approves.', { reputationMin: 50 }, 3),
      line('Poet Ode. The water is listening. So am I. What subject shall we starve or feed today?', { reputationMin: 30 }, 2),
      line('If you\'ve brought tea or tart, you\'re already my patron. The muse is... peckish.', { willingnessMin: 60 }, 2),
      line('Coins in the basin, words in the air. Hello.', {}, 1),
    ],
    afterFeeding: [
      line('Oh — sweetness in form and flavor. I shall dedicate a sonnet to your generosity. Fourteen lines. One sigh.', { willingnessMin: 70 }, 3),
      line('Mmm. The meter improves when I\'m fed. Thank you, kind stranger-turned-muse.', { willingnessMin: 50 }, 2),
      line('A lovely gift. I\'ll remember it in verse. Eventually.', {}, 1),
    ],
    topics: {
      friendly: [
        line('You see the square as I do — hungry for beauty, not just bread. Though bread helps.', { reputationMin: 45 }, 3),
        line('Kindness is the best rhyme. You supply both.', { reputationMin: 30 }, 2),
        line('Peace to you. May your pockets jingle.', {}, 1),
      ],
    },
  }),

);
