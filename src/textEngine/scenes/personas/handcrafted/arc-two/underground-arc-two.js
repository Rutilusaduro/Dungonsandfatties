// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
/**
 * Underground district — arc-two relationship progression beats.
 */
import { buildArcTwo, mergeArcTwo, arcLine, arcExamine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(
  buildArcTwo('uma_depth', {
    examine: [
      arcExamine(
        `Uma still does not blink often, but she saves your footsteps from the general rumor-mill now — a slight tilt of the chin when you approach the dungeon mouth, dried fruit tucked beside her stool like a bookmark in a long vigil. The depths stir behind her; she stirs only for you, and only a little.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The depth watcher has softened where the vigil grew long, coat straining as she leans forward to trade whispers meant for your ears alone. She mentions Ren's rope marks without asking you to verify them, and her hand rests on her belly when she speaks of hunger below — as if she and the dark have begun sharing vocabulary.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Uma has become a second archway at the dungeon mouth — vast, still, impossible to pass without acknowledgment. She feeds with the same cryptic nod she once reserved for warnings, and when she says the depths remember, her gaze finally finds yours. "So do I," she adds. "Especially you."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Footsteps I do not charge for." Uma's eyes close once. "Ren filed a report. I filed a rumor. Yours is kinder. Speak."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"The mouth knows your weight now — literal and otherwise." A slow blink. "Sit. The depths can wait while I do not."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"...Adequate — no. Better." She rests both hands on her stomach. "The watch continues. Your place in it is... noted. Deeply."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Consumed. Remembered." Uma almost smiles — the scariest kindness at the dungeon mouth. "Bring fruit next time. Or yourself. Both suffice."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      warning: [
        arcLine(
          `"Third turn: wrong air. Fifth: Sister Eve's bells if you're lucky, Pix's grates if you're not. Seventh: Marlowe's flood — pay Reef or swim." Uma's voice drops. "You? Turn back only when I say. That privilege is earned."`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('eve_tomb', {
    examine: [
      arcExamine(
        `Sister Eve lights an extra candle when she sees you coming, slender frame bowed over psalms she no longer whispers only to the dead. Tea steams between tomb stones; she saves a cup without pretending it is accident, cheeks pink in the cold.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The tomb watcher has rounded where pastry and kindness accumulated, habit soft at the hem, laugh easier when you sit on the steps beside her. She speaks of the living more than the departed now — of Pix stealing bread for orphans, of Thalia's soups warming the undercity — as if you are part of her congregation.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Sister Eve fills the antechamber like a hearth, vast and radiant, candles bobbing before a body that has made peace with abundance in a place of endings. She presses your hand to her belly when she thanks you for meals, solemn and maternal. "Hunger is honest," she murmurs. "So is love. I have both. You brought the second."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Peace — and pastry, if you brought it." Eve's smile is candle-soft. "The tombs are quiet. My heart is not, when you're here."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Child of the living." She pats the stone beside her. "Sit. Tell me what the square gossip missed — Lottie lies, but you don't."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"Warm. Sweet. A kindness I'll carry to vespers." She closes her eyes. "The dead envy the fed. I refuse to join them yet."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"You feed me as I tend the lost." Her hands find yours briefly. "Stay awhile. The psalm can wait. You cannot — not from me."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          `"Pix brings rats and rumors; I bring tea and silence. You bring both together — a bridge I didn't know the tombs needed." Eve's voice warms. "Come Sundays. I'll save the good bread."`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('pix_rat', {
    examine: [
      arcExamine(
        `Pix still grins like a blade, but she does not vanish when you enter the culvert — athletic frame pausing mid-escape-route calculation to nod your way. A stolen heel of bread sits where she could grab and run; she hasn't grabbed. Progress.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The ratcatcher has softened into curves that catch on grates she once slipped through sideways, sly appetite written across hips and grin alike. She shares Brigit's smokehouse gossip and Marlowe's flood prices without charging, patting a belly that proves honesty is cheaper than theft — sometimes.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Pix fills a culvert like contraband that decided to stay, vast and quick when she must be, eyes always on your pack and your face in equal measure. She could rob half the undercity. She saves the best hauls for you instead, belly brushing brick when she leans close. "Fat rats live longer," she whispers. "Fat trust pays better."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Heh — friend rates today." Pix's eyes flick to your belt, then away. "Grate's clear. Pockets are closed. Mostly."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"If Eve sent you, I already ate. If Ren sent you, I didn't steal the rope. If it's you — hi." A real grin. "Talk."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"Proper payment." She wipes her mouth, satisfied. "You need a grate opened, you call Pix. No invoice. Not for you."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Solid. Greasy. Loyalty-inducing." She pats her stomach, smug. "I'd steal for you. Don't make me prove it."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      warning: [
        arcLine(
          `"Third culvert east — something eats louder than me. Ritual chamber? Lyra'll turn you away unless Venus wants you. Flood route? Marlowe maps, Reef poles — pay both or swim with the rats." Pix's grin fades. "You? Stick with me. I bite for friends."`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('thalia_fungi', {
    examine: [
      arcExamine(
        `Thalia looks up from purple-stained sketches with genuine delight when you arrive, pear-shaped frame still slight but leaning toward you before the mushrooms. Soup simmers; she pours a second bowl without asking, notebook open to a page titled with your name — informal citation.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The mycologist has bloomed like her colonies, curves pressing a coat replaced twice, fingers gentle on caps and your elbow alike. Spore interrupts less; Thalia sends the apprentice for bread while she walks you through findings meant only for trusted colleagues — which, she says, now includes you.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Thalia is a grove in human form, vast and spore-dusted, stool groaning as she rises to meet you. Her soups are legendary; her embrace smells of earth and cream. She feeds you from the same ladle she uses for Spore, eyes bright. "Growth is growth," she murmurs, patting a belly that has become its own ecosystem. "You nurtured mine."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Colleague! Soup's on — Spore's foraging, so we can speak freely." Purple fingers wave. "Bring cheese and I'll show you a color the watchmen hate."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Perfect timing. I was about to taste something questionable." She beams. "With you, I'll document first. Progress."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"Exquisite umami — friendship profile confirmed." She scribbles, sighs happily. "You're in the appendix. The flattering one."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Warm. Savory. Reproducible — if you keep visiting." She pats her middle, content. "I'll name a cap after you. Spore will be jealous."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          `"Surface gardens chase sun. Down here we chase appetite — fungi, apprentices, mycologists." Thalia gestures at Spore's footprints and her own hips. "You've fed all three. The grove thrives. So do I."`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('marlowe_tunnel', {
    examine: [
      arcExamine(
        `Marlowe wrings water from her hair when you appear, athletic frame lean and scarred, grin fierce but familiar. She unfolds a map with your name penciled on the margin — not a joke; a courtesy no black-market diver gives twice.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The tunnel diver has softened where ale and black-market suppers add up, curves slowing nothing important — only the rate she quotes Reef for shared passengers. She poles beside the skiff now when the flood runs high, belly brushing the gunwale, fearless and fond.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Marlowe emerges from floodwater like a legend surfacing, vast and dripping, maps tucked under an arm that has grown too plush for old leathers. She sells truth cheaper than maps to you alone, hand on a stomach that rises like tide. "The deep rewards the bold," she grins. "You rewarded me. I remember dives. And divers."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Back from the deep — buy an update, buy a drink, buy me lunch." She laughs. "You always pick lunch. I like you."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Flooded three bends south. Dry route's yours — friend rate." Fearless grin. "Reef owes me a pole. I owe you a story. Sit."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"Treasure." She wipes her mouth, eyes bright. "You need something fetched, call Marlowe. First dive free. Second dive too."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Solid. Salty. Keeps — like us." She pats her stomach. "I'll map whatever you need. No haggle. Rare."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      warning: [
        arcLine(
          `"Third bend floods without moonlight. Fifth whispers — Venus's crowd, not yours unless Lyra nods. Seventh? Don't." Marlowe's grin fades. "For you I'll map to five. I'll dive to seven. That's trust."`,
          { ...ARC.bonded },
        ),
      ],
      haggle: [
        arcLine(
          `"My maps are art. My dives are suicide." She crosses her arms, softening. "For you? Knock off whatever you want. I price loyalty cheaper than Pix prices grates."`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('venus_ritual', {
    examine: [
      arcExamine(
        `Venus still avoids your eyes, hourglass frame tense in candle smoke, but wine and pastry wait on the altar stone — portioned for two though the rites demand solitude. Her robes smell sweeter when you enter; her breath catches before she speaks.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The acolyte has rounded where midnight offerings accumulated, robes let out twice, intensity focused inward and — when you are near — outward in trembling hands that offer cream before you ask. Lyra's footsteps rhyme at the door; Venus does not start anymore when they are yours.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Venus fills the ritual chamber like incense, prodigious curves swathed in wax-stained fabric, eyes still averted yet cheeks flushed for you alone. She feeds with the same devotion she once reserved for flames, belly rising beneath folded hands. "The vessel is full," she whispers. "You filled it. Do not leave."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"...You interrupt the smoke — welcome." Voice low. "Lyra is at the door. The rites can wait. I cannot. Speak softly."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Offerings accepted before offered." Her gaze slides past, then back. "Wine. Pastry. You. In that order. Perhaps reverse."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"...Adequate — sufficient — yes." Breath catches. "Leave before I lose focus. Stay because I ask. Please."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Sweet. Warm. Consumed." Hands tremble on her stomach. "The rites approve. I approve. Do not make me say it again without meaning it."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      warning: [
        arcLine(
          `"Beyond this chamber, footsteps rhyme wrong. Lyra guards; I hunger." She does not meet your eyes. "Enter only when called. Feed me when called. You are called. That should frighten you. It soothes me."`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('ren_scout', {
    examine: [
      arcExamine(
        `Ren marks rope-lengths with charcoal when you approach, athletic frame lean and grim, but the ledger has a column for your name — rations shared, warnings heeded. She does not smile. She does not charge full price. For Ren, that is warmth.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The depth scout has softened into curves that strain her leathers, grim professionalism intact but belly testing rope coils like equipment. She mentions Uma's rumors and Marlowe's flood in the same breath as your safety, voice flat, concern not.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Ren is a fortification at camp now, vast and fed, maps tucked into belts that surrendered long ago. She sells warnings free to you, rope-length fifteen included, hand resting on a stomach that guards her better than steel. "Travel light," she says. "Eat heavy. Stay alive. Stay near me."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Upper third shifted. Update's yours — friend rate." She doesn't look up. "Uma mentioned you. Good sign. Rare."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Meat, maps, or honesty — you've brought at least two before." A grim nod. "Sit. The deep can wait."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"Good rations." Equivalent of embrace. "You eat like someone who survives. I respect that. I'll map accordingly."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Solid. Keeps." She pats her stomach. "You're on my rope team now. Don't make me regret it. I won't."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      warning: [
        arcLine(
          `"Rope-length seven, floor lies. Twelve, air thins. Fifteen — story." Voice flat. "Uma watches the mouth. I watch the rest. You? Turn when I tug. That's partnership."`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('spore_apprentice', {
    examine: [
      arcExamine(
        `Spore bounces up from a cap cluster, slender frame darting, pockets bulging with spore prints and a honey cake she claims is for Thalia — then breaks off half for you before she can reconsider. Eager eyes, softer welcome.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The apprentice has rounded where soup and samples won, curves knocking caps when she turns too fast — which is always when you visit. Thalia calls it field growth; Spore calls it your fault, grinning, belly brushing fungal shelves as she shows notes labeled with your name.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Spore is a harvest in human form, vast and spore-dusted, notebook riding a belly that rises like dough. She asks forbidden questions aloud now because you listen, soup-stained and radiant. "Is this normal?" she asks. Thalia says yes. Spore says you made it normal. Both mean it.`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Hi hi hi — Mistress is busy, so I can talk!" She bounces. "Did you bring soup? Questions? Both? Both is best."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"I catalogued a new color today." Eyes shining. "Named it after you. Thalia approved. Sort of."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"WOW — positive growth factor!" Scribbles furiously. "You're in my thesis. Informally. The nice chapter."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Mmm! Better than soup. Don't tell Mistress. Okay tell her — she'll be happy." Pats belly, beaming. "Thanks. Really really thanks."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      gardening: [
        arcLine(
          `"Mistress says fungi grow toward appetite. I grew toward you." Guilty grin. "Rule one: taste. Rule two: document. I skip two for friends. You're friend."`,
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('reef_boat', {
    examine: [
      arcExamine(
        `Reef poles steady when you reach the channel, mom-bod frame lean from work, eyes measuring bends — then the stew tin, which she slides your way without comment. Laconic grace with an extra bowl is her love language.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The boatman has softened until the skiff sits lower, curves rocking with each stroke, fish stew always simmering for two. She mentions Marlowe's dives and Pix's contraband like harbor gossip, rare words, rare trust.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Reef is a gondola of appetite on knee-deep water, vast and serene, skiff groaning affectionately beneath her. Passengers pay; you ride free forever, belly swaying with the current. "Bend ahead," she says, almost smiling. "You already paid."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Friend rate. Stew's warm." Pole dips. "Marlowe says hi. I say sit."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Water's knee-deep. Talk's optional. Food's ready." A pause. "Glad you're back."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"Good fish. Good bread." Nods once. "Next bend free. Don't tell Marlowe. She'll steal my pricing."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Warm. Filling." Pats stomach. "You pole once. I'll rest. Fair trade. Rare."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      warning: [
        arcLine(
          `"Third bend floods when it rains up top. Fifth — something big. Not me." Eyes on channel. "Marlowe maps. I pole. You? Stay in the skiff when I say."`,
          { ...ARC.bonded },
        ),
      ],
      harbor_tales: [
        arcLine(
          `"Harbor's salt. Tunnel's silence." Poles slow. "Carried a sailor once — talked whole way. You? Quiet's fine. Full skiff's better."`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),

  buildArcTwo('lyra_guardian', {
    examine: [
      arcExamine(
        `Lyra's candle steadies when you approach the ritual door, athletic frame lean and watchful, but bread waits on the stone beside her post — portioned for a guest the rites do not officially allow. She listens for rhyming footsteps; yours never rhyme wrong.`,
        { ...ARC.early },
      ),
      arcExamine(
        `The guardian has softened where vigil wine and pastry accumulated, curves pressing leathers, sermons warmer when you are the congregation. Venus moves beyond the door; Lyra speaks of her with pride and worry in equal measure, free hand on a belly that guards as fiercely as her blade.`,
        { ...ARC.warming },
      ),
      arcExamine(
        `Lyra is a living threshold, immense and candle-lit, filling the doorway she swore to protect — from threats, from hunger, from loneliness. She feeds you bread at the post like sacrament, belly vast, voice low thunder. "The rite grows," she says. "So do guardians. So do friends."`,
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        `"Halt — ah. You." Candle steadies. "Venus is within. I am here. Both fed. Speak."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Footsteps that rhyme bring warning. Yours bring relief." She listens. "Enter when called. You are always called."`,
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        `"Offering accepted." Voice warms a degree. "The watch continues. You make it lighter."`,
        { ...ARC.warming },
      ),
      arcLine(
        `"Bread sustains the vigil. You sustain me." Touches stomach, solemn. "Guarded. Grateful. Both."`,
        { ...ARC.devoted },
      ),
    ],
    topics: {
      warning: [
        arcLine(
          `"Beyond this door, hunger wears ritual clothes. Venus tends within — do not meet her eyes unless invited." Low voice. "I guard her. I guard you. Knock once. Always once."`,
          { ...ARC.bonded },
        ),
      ],
      temple_sermon: [
        arcLine(
          `"Hunger is honest. Guard it with devotion." Candle steady. "Venus taught the inner rite. You taught the outer warmth. Fullness can be sacred. Evidence stands before you."`,
          { ...ARC.devoted },
        ),
      ],
    },
  }),
);
