/**
 * Temple district — handcrafted NPC personas.
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export default mergePersonas(

  authorPersona('hope_pilgrim', {
    name: 'Hope the Pilgrim Guide',
    bands: {
      slender: 'Hope the Pilgrim Guide stands at the temple steps with a pamphlet in one hand and sunlight in the other — a slender woman in a travel-stained habit, cheeks a little hollow, smile nonetheless radiant. Her belt sits on the last notch, her wrists fine, her faith apparently the only thing she has been feeding generously lately. When she turns to greet you, the pamphlet flutters like a white wing and you notice how her collarbone shows above the linen, how hunger has sharpened her features without dulling her warmth.',
      curvy: 'Hope has begun to soften since you first saw her at the steps — a gentle curve at her hips, a fuller sweep beneath her habit, cheeks no longer hollow but blooming with color. She still greets every traveler with the same radiant pamphlet and the same unwavering smile, yet now there is a warmth in her body that matches the warmth in her voice, as if the shrine\'s hospitality is finally reaching the woman who distributes it. Her belt has moved one notch inward; she does not comment on it. Her eyes do, though — bright, grateful, quietly pleased.',
      plump: 'Hope is pleasantly plump now, her pilgrim\'s habit adjusted twice and due for a third, the fabric pulling softly across a rounded belly and fuller bust. She still stands at the steps greeting travelers, but she stands differently — weight settled low and comfortable, thighs touching beneath the hem, arms softer when she presses pamphlets into waiting hands. The hollow-cheeked guide is gone; in her place is a woman who looks fed, who looks like she believes abundance is holy, who pats her middle absently between blessings as if checking that goodness has taken root.',
      large: 'Hope has grown large and serene at the temple steps, her habit straining at the seams with each new adjustment, her frame spreading wide in a way that makes her look less like a guide and more like a welcoming hearth. Pilgrims still find her there with pamphlets and prayers, but they also find curves — a heavy bust, a deep belly, hips that sway when she descends the steps to meet them. She moves slower than she used to, yet nothing about her feels diminished; she glows, plush and devout, as if every meal Patrice ladled was a sacrament she finally accepted for herself.',
      enormous: 'Hope is enormously full-figured now, a vast soft presence on the temple steps who must breathe before each descent and still greets every soul with pamphlet extended and smile undimmed. Her habit has surrendered to panels and pins; beneath it, abundance rolls and settles with each step — a heavy belly that precedes her, thighs that brush with friction, arms plush enough to feel like an embrace before she speaks. Pilgrims whisper that the guide who once ran on faith alone now runs on soup and bread as well. Hope only laughs, low and warm, and presses another blessing into your palm.',
      immense: 'Hope the Pilgrim Guide has become truly immense — a monumental woman of faith and flesh who fills the temple steps like a living altar, habit reworked into something between vestment and banner, every inch of her soft and radiant. She cannot hurry anymore; she does not need to. Travelers come to her, drawn by the legend of the guide who grew as generous as the shrine itself — belly vast and swaying, bust heavy, face round and blissful beneath her wimple. She distributes pamphlets from a chair now, and when she lifts her arms to bless the crowd, the gesture is slow, sumptuous, and utterly sincere.',
    },
    extras: {
      ceiling: 'Hope hangs face-down from candy ropes lashed around her chest, waist, and ankles above the temple steps, habit tangled over her head, pamphlets scattered on the stones below like fallen prayers. Her plush body sways with each helpless breath — even suspended, she looks more startled than angry. "Please," she calls, voice muffled by linen, "the travelers are waiting. And I was about to eat lunch."',
      hold: 'Hope is frozen mid-bow at the temple steps, one hand extended with a pamphlet, the other resting on a belly that has grown too full to suck in. Only her eyes move — wide, embarrassed, still somehow hopeful. She resembles a statue of hospitality caught at the moment generosity became visible on her body.',
      full: 'Hope sits on the lowest temple step, pamphlets forgotten in her lap, both hands cradling a belly rounded tight with soup and bread. Her eyes are half-closed, cheeks flushed, breath slow and deep. "Forgive me," she murmurs, not sounding sorry at all. "Patrice\'s pot... speaks louder than fasting ever did."',
    },
    greetings: [
      line('Blessings upon you, friend — I saved you the good pamphlet, the one with the hymn on the back. Come, the shrine is warm, and I find I am warmer still when I have company.', { reputationMin: 50 }, 3),
      line('Welcome to the steps. Mind the uneven stone — and mind your appetite, if you can. The hostel soup has been... persuasive lately.', { willingnessMin: 55 }, 2),
      line('Peace to you, traveler. Need directions, or need someone to tell you it is all right to be hungry here?', {}, 1),
    ],
    afterFeeding: [
      line('Oh... that was kindness itself. I preach abundance, and you answered with it. My body remembers every sermon I forgot to eat.', { willingnessMin: 55 }, 3),
      line('Thank you. I will carry that fullness with me today — in spirit, and otherwise.', { willingnessMin: 40, willingnessMax: 54 }, 2),
      line('You need not feed me. ...But I am glad you did. The shrine teaches gratitude. I am practicing.', {}, 1),
    ],
    topics: {
      friendly: [
        line('Faith is not the opposite of appetite. I learned that from Patrice\'s ladle and Margaret\'s sermons both. Hunger is honest — answer it, and the soul stops pretending it is above the body.', { stageMin: 4 }, 3),
        line('I guide pilgrims to the shrine. Lately they ask about my belt notches as often as the altar. I tell them growth can be devotion too.', { reputationMin: 45 }, 2),
        line('If you need a quiet corner, the steps face east at dawn. If you need bread, the hostel is behind you. I recommend both.', {}, 1),
      ],
    },
  }),

  authorPersona('serene_pilgrim', {
    name: 'Serene the Weary Pilgrim',
    bands: {
      slender: 'Serene the Weary Pilgrim sits on a hostel cot with boots unlaced and faith intact — a slender woman worn thin by the road, shoulder blades visible beneath a threadbare shawl, wrists delicate as candle stems. Her eyes are tired but kind, her appetite visibly returning after too many miles of hard bread and harder ground. Every time she shifts, you hear the cot creak and see how little of her fills it, how much of her exhaustion is simply not enough food.',
      curvy: 'Serene has begun to fill out since she reached the temple — soft curves emerging where the road carved her hollow, hips rounding beneath her shawl, cheeks gaining color like dawn on stone. She still looks weary, but it is the weariness of someone who has stopped running from hunger rather than the weariness of someone who never ate. She stretches on her cot and you see the new weight settle pleasantly, a quiet victory over miles that tried to thin her away.',
      plump: 'Serene is pleasantly plump now, sprawled on the hostel cot with boots finally off and belly softly rounded beneath a shawl that no longer closes. The road still lives in her calloused feet and sun-darkened hands, but her body has declared a truce with appetite — thighs thicker, bust fuller, a lazy warmth in her eyes when Patrice\'s soup arrives. She looks less like a penitent and more like a woman who decided the pilgrimage could include second helpings.',
      large: 'Serene has grown large and languid in the pilgrim hostel, her cot groaning beneath a frame that has traded austerity for abundance with visible relief. She moves slowly, plushly, belly heavy when she sits up to accept tea, hips spreading wide against the blanket. The weary pilgrim remains — you still see it in her feet, her patience — but now weariness wears a soft shape, a body that finally rests because it has enough to rest on.',
      enormous: 'Serene is enormously full-figured now, a vast soft woman on a cot far too small for her, shawl long abandoned, flesh spilling over the edge in warm, sleepy folds. She breathes like someone who has eaten well and intends to again, belly rising slow and deep, thighs thick enough that the cot legs splay. The road made her thin; the shrine is making her legend. She smiles when she sees you, lazy and content, as if every mile walked was worth arriving here hungry.',
      immense: 'Serene the Weary Pilgrim has become truly immense — immobile on a reinforced cot, a mountain of soft flesh wrapped in hostel blankets, face round and peaceful beneath tangled hair. She cannot rise without help and does not seem to mind; Patrice brings soup, Margaret brings blessings, and Serene receives both with closed eyes and open palms. The boots that wore through still sit by the bed like relics of a thinner life she no longer remembers wanting.',
    },
    extras: {
      ceiling: 'Serene hangs face-down from candy ropes above her hostel cot, shawl fallen, soft body swaying with each breath like a bell slowly tolling. "I walked a thousand miles," she groans, not unkindly. "I did not walk them to hang from the rafters. Set me down — gently. Everything jiggles."',
      hold: 'Serene is frozen mid-stretch on her cot, arms above her head, belly rounded and exposed beneath a lifted shift. Her eyes track you with exhausted amusement. Even paralyzed, she looks like a woman who has decided rest is a virtue.',
      full: 'Serene lies back on her cot, one hand on a belly taut with soup, eyes closed, a smile on her lips. "The road can wait," she murmurs. "So can I. So can everything, until this feeling passes — or until Patrice ladles again."',
    },
    greetings: [
      line('Oh — hello. Forgive me, I was deciding whether to nap or eat. The hostel makes both easy.', { reputationMin: 50 }, 3),
      line('You caught me resting. Good. Resting is better with company — and with snacks, if you have any.', { willingnessMin: 60 }, 2),
      line('...Hello. Quiet, please. My boots are off and my appetite is finally on.', {}, 1),
    ],
    afterFeeding: [
      line('Mmm. That is the first thing that felt like arrival since I saw the temple steps. Thank you. I will sleep heavy tonight.', { willingnessMin: 60 }, 3),
      line('Good. Warm. I needed that more than another hymn.', { willingnessMin: 45, willingnessMax: 59 }, 2),
      line('...Yes. Thank you. Do not tell Hope I ate before noon. She worries.', {}, 1),
    ],
    offerFood: [
      line('For me? Oh, don\'t tempt — ...all right, tempt. I have walked off every scruple I had. Put it here.', { willingnessMin: 65 }, 3),
      line('Food? I was going to wait for supper. ...I suppose pilgrimage teaches patience, not martyrdom.', { reputationMin: 35 }, 2),
      line('If it is soup or bread, yes. If it is penance, I have had enough road.', {}, 1),
    ],
  }),

  authorPersona('wick_candle', {
    name: 'Wick the Candle Bearer',
    bands: {
      slender: 'Wick the Candle Bearer moves along the temple steps at dawn with a taper in each hand — a slender woman in a soot-smudged habit, wrists fine, waist narrow, smoke clinging to her sleeves like a second skin. She trims wicks with precise, ritual gestures, yet her body looks underfed beside the abundance she tends, as if she has been feeding candles instead of herself. When she bows, you see her shoulder blades shift beneath thin linen, devotion written in angles rather than curves.',
      curvy: 'Wick has softened since you first watched her trim the dawn wicks — subtle curves filling out her habit, hips rounding beneath the hem, bust gaining a gentle swell that catches candlelight. She still moves with ritual precision, still greets sunrise with smoke on her sleeves, but now there is warmth in her body that matches the flames she carries. Her belt sits easier; her cheeks hold color. She looks like a woman beginning to accept that flesh, too, can be an offering.',
      plump: 'Wick is pleasantly plump now, habit adjusted at the waist, belly softly rounded as she kneels to light the lower lamps along the steps. Soot still stripes her sleeves and smoke still perfumes her hair, but her frame has grown plush — thighs pressing together when she rises, arms softer when she lifts the taper. She trims wicks with the same devotion as always, yet pauses more often to breathe, to rest a hand on a middle that no longer lies flat, as if fullness were another kind of vigil.',
      large: 'Wick has grown large and luminous on the temple steps, her habit straining across a heavy bust and deeper belly, flesh shifting with each slow procession of flame. She still greets dawn with tapers raised, but dawn greets back a different woman — broad, soft, radiant with heat and weight. Candle grease spots her sleeves; soup stains join them now. When she bends to trim a wick, you hear her exhale, feel the gravity of a body that has traded austerity for abundance without losing reverence.',
      enormous: 'Wick is enormously full-figured now, a vast soft presence on the temple steps who must set her tapers on a ledge before she can kneel. Her habit has been let out twice; beneath it, abundance rolls and settles with each breath — belly heavy, bust swaying, thighs thick enough to slow her ritual circuit. Smoke still clings to her, but so does the scent of Patrice\'s bread. Pilgrims whisper that the candle bearer burns brighter since she started eating. Wick only smiles and trims another wick, cheeks round in firelight.',
      immense: 'Wick the Candle Bearer has become truly immense — a monumental woman of wax and warmth who fills the temple steps like a living lamp, habit reworked into draped panels, flesh spilling soft and serene in every direction. She lights the dawn from a chair now, tapers held aloft by arms plush enough to tremble with the effort, belly vast and rising slow with each breath. The flames reflect in her eyes and on the curve of her cheeks; she looks fed, holy, and impossibly bright.',
    },
    extras: {
      ceiling: 'Wick hangs face-down from candy ropes above the temple lamps, tapers scattered on the steps below, habit bunched around her waist, soft body swaying in the draft that gutters the flames. "The dawn vigil—" she sputters, indignant and flushed. "Put me down. The wicks trim themselves poorly without me."',
      hold: 'Wick is frozen mid-kneel with a snuffer in one hand and the other resting on a rounded belly, eyes wide in the candlelight. She looks like a shrine statue caught at the moment devotion became visible on her flesh.',
      full: 'Wick sits among the lower lamps, snuffer forgotten, both hands on a belly taut with bread and tea. Candle smoke curls around her; she breathes slow and deep, eyes half-closed. "The flames digest quickly," she murmurs. "I do not."',
    },
    greetings: [
      line('Peace at first light — I was trimming the upper wicks. You are early, or I am slow. Both can be true since the soup started.', { reputationMin: 50 }, 3),
      line('Careful of the tapers. And of commenting on my habit — it has moved two notches this month alone.', { stageMin: 4 }, 2),
      line('The lamps are lit. So am I, in the sense that I am awake. Ask what you need.', {}, 1),
    ],
    afterFeeding: [
      line('Warm. Like swallowing a candle without the pain — only the glow. Thank you. I will carry that through the vigil.', { willingnessMin: 50 }, 3),
      line('...Good. My hands are steadier when I am fed. The flames notice.', { willingnessMin: 40, willingnessMax: 49 }, 2),
      line('You need not feed the candle bearer. ...But the shrine teaches acceptance. I am practicing.', {}, 1),
    ],
    topics: {
      temple_sermon: [
        line('Margaret says hunger is honest. I trim wicks until they burn clean — bodies are similar. Starve either and the light falters.', { stageMin: 5 }, 3),
        line('Smoke rises. So do souls. So, lately, does my belt line. All of it upward, if you ask Margaret.', { reputationMin: 40 }, 2),
        line('The steps are lit at dawn so no one stumbles. I think that includes me, when I forget to eat.', {}, 1),
      ],
    },
  }),

  authorPersona('hymn_choir', {
    name: 'Hymn the Choir Alto',
    bands: {
      slender: 'Hymn the Choir Alto stands in the shrine choir loft with sheet music in hand — a slender woman in a plain surplice, hourglass potential visible only in the promise of her frame, not yet fulfilled. Her voice is low and warm even in silence; her body is still catching up to it, wrists fine, waist narrow, the kind of thin that makes each note seem drawn from somewhere deeper than lungs. When she breathes for practice, you see her ribs shift beneath linen, devotion in every line.',
      curvy: 'Hymn has begun to curve since Margaret first praised her low notes — hips rounding beneath her surplice, bust filling the fabric with a soft swell, waist cinching the hourglass into view. Her voice remains low and warm, impossible to ignore, but now her body insists on being heard as well. She holds sheet music against a chest that rises fuller with each breath, cheeks blooming when the hymn ends, as if music and meals both agree on making her softer.',
      plump: 'Hymn is pleasantly plump now, surplice adjusted at the seams, belly softly rounded as she sings from the loft — low notes vibrating through flesh that has grown plush and receptive. Her hourglass shape has deepened: heavy bust, nipped waist, hips that sway when she descends the choir stairs. Margaret says the shrine sounds fuller; Hymn says the hostel soup sounds louder. Both are true. When she finishes a verse, she rests a hand on her middle and smiles, breathless and content.',
      large: 'Hymn has grown large and resonant in the choir loft, her surplice straining across a heavy bust and deep belly, every note seeming to travel through soft flesh before it reaches the shrine. She still fills the space before Margaret speaks — low, warm, impossible to ignore — but now the space fills back, curves pressing against the rail, thighs thick when she stands for the offertory. Song and appetite have made her magnificent; the congregation listens with their ears and their eyes.',
      enormous: 'Hymn is enormously full-figured now, a vast soft alto who must sit for the long hymns, surplice open at the seams, flesh spilling warm and steady with each sustained note. Her voice has not diminished — if anything it deepens, rumbling through a belly that rises and falls like a tide. The choir loft creaks when she shifts; Margaret calls it harmony. Hymn laughs between verses, low and plush, and accepts the honey cakes Patrice sends up like offerings.',
      immense: 'Hymn the Choir Alto has become truly immense — a monumental woman of music and flesh who fills the loft like a second organ, surplice replaced by draped fabric, every inch soft and singing. She performs from a reinforced chair now, voice rolling through a body too vast for the stairs, cheeks round, eyes half-closed in bliss when a note holds. The shrine has never sounded warmer; neither has she.',
    },
    extras: {
      ceiling: 'Hymn hangs face-down from candy ropes in the choir loft, surplice tangled, sheet music fluttering to the pews below like white birds. Her plush body sways with each indignant breath. "I was mid-phrase," she calls, voice still low and warm despite everything. "This is not how I intended to hold that note."',
      hold: 'Hymn is frozen mid-song with one hand on her chest and the other on a rounded belly, mouth open, eyes wide. Even paralyzed, she looks like she could finish the hymn if someone would unstick her lungs.',
      full: 'Hymn sits in the loft with sheet music in her lap, both hands on a belly taut from honey cakes and cream, eyes closed, humming a descant through lips that look kiss-swollen from sweetness. "The high notes can wait," she murmurs. "The low ones feel better full."',
    },
    greetings: [
      line('Oh — you caught me between verses. Good timing. I was just thinking the loft echoes nicer when I am not hollow.', { reputationMin: 50 }, 3),
      line('Hello. Speak softly or sing along — I am in a mood for harmony and maybe pastry.', { willingnessMin: 60 }, 2),
      line('The choir is resting. I am resting. My voice is low; so is my blood sugar. Both improve with company.', {}, 1),
    ],
    afterFeeding: [
      line('Mmm. That sat in my chest like a perfect fifth — warm, round, settling. Thank you. I will sing better for it.', { willingnessMin: 58 }, 3),
      line('Sweet. Literally or otherwise — I am not complaining. My alto runs deeper on a full stomach.', { willingnessMin: 45, willingnessMax: 57 }, 2),
      line('...Thank you. Margaret says fed voices praise louder. I am testing the theory.', {}, 1),
    ],
    topics: {
      temple_sermon: [
        line('Margaret preaches abundance. I provide the undertone — the note you feel in your ribs before you understand the words. Lately my ribs have more to feel.', { stageMin: 5 }, 3),
        line('The hymn before the sermon is mine. I sing hunger so Margaret can answer it. Fair division of labor.', { reputationMin: 40 }, 2),
        line('Low voices carry. So do soft bodies, I am learning. Both fill the shrine.', {}, 1),
      ],
    },
  }),

  authorPersona('myrrh_incense', {
    name: 'Myrrh the Incense Keeper',
    bands: {
      slender: 'Myrrh the Incense Keeper tends the brazier beside the confession lattice — a quiet woman in a plain habit, pear-shaped potential suggested in hips that have not yet filled, waist still narrow, movements slow and deliberate. Smoke curls around her wrists; myrrh clings to her hair and sleeves. She knows every sin by its scent, they say, yet her own body keeps its secrets thinly — collarbone visible, belly flat, the kind of restraint that looks like devotion and smells like hunger deferred.',
      curvy: 'Myrrh has softened at the confession brazier — hips widening beneath her habit, thighs touching when she kneels to stir coals, bust gaining a gentle curve that catches incense light. She still moves quietly, still reads sin in smoke, but her body speaks now too, rounding in ways she does not comment on. The lattice hides faces; it cannot hide the new sway in her walk when she rises, the color in her cheeks when Patrice\'s tea arrives.',
      plump: 'Myrrh is pleasantly plump now, habit adjusted at the waist, belly softly rounded as she feeds the brazier beside the confession booth. Incense still perfumes her — myrrh, resin, quiet — but soup has joined the palette. Her pear shape has ripened: fuller hips, softer arms, a middle that presses against linen when she leans to listen through the lattice. Sins still arrive as smoke. So does satisfaction, visible in the slow breath she takes when she thinks no one is watching.',
      large: 'Myrrh has grown large and fragrant at the brazier, habit straining across a heavy bust and deep belly, flesh shifting softly when she kneels to rake coals. She still tends confession with downcast eyes and steady hands, yet the booth feels smaller beside her — abundance settling warm and patient, thighs thick, hips wide. Every sin has a scent; fullness smells like bread and myrrh mixed, and she wears both.',
      enormous: 'Myrrh is enormously full-figured now, a vast soft keeper of incense who must sit on a stool to tend the brazier, habit open at the seams, flesh spilling serene and scented. Smoke curls around her like a veil; beneath it, curves roll slow and heavy — belly vast, bust swaying, arms plush when she lifts the censer. Confessors whisper through the lattice and sometimes forget their sins, distracted by the soft sound of her breathing. Myrrh does not mind. Silence is also a sacrament.',
      immense: 'Myrrh the Incense Keeper has become truly immense — a monumental woman of smoke and softness beside the confession lattice, habit reworked into draped panels, every inch pear-shaped and peaceful. She tends the brazier from a wide chair, censer in hands that tremble only from weight, not weakness. Sins still rise as smoke; they mingle now with the warmth of a body that has stopped refusing abundance. The shrine smells of myrrh and honey and something deeply content.',
    },
    extras: {
      ceiling: 'Myrrh hangs face-down from candy ropes beside the confession brazier, habit tangled, incense spilling across the stones in a fragrant cloud. Her soft body sways, pear-shaped even inverted. "...I was listening," she says quietly, not angry — only embarrassed. "Set me down. The coals need tending."',
      hold: 'Myrrh is frozen mid-kneel at the brazier, one hand on the censer, the other resting on a rounded belly, eyes downcast as always. Smoke curls around her immobile frame; she looks like a statue of patience that has begun to soften.',
      full: 'Myrrh sits beside the lattice with the censer forgotten, both hands on a belly taut with tea and pastry, eyes closed, incense smoke drifting around her like a blessing. "Fullness is also a confession," she murmurs. "I am learning to admit it without shame."',
    },
    greetings: [
      line('...Peace. I was stirring the coals. You may speak — the lattice is open, and so, lately, is my schedule for tea.', { reputationMin: 50 }, 3),
      line('Hello. Quietly, if you can. The smoke listens. ...So do I, better when I have eaten.', { willingnessMin: 50 }, 2),
      line('...Yes? I am here. The brazier is lit. That is enough for now.', {}, 1),
    ],
    afterFeeding: [
      line('...Warm. Like resin melting — slow, sweet, settling into every corner. Thank you. I will remember this when the smoke turns bitter.', { willingnessMin: 45 }, 3),
      line('That was... good. I do not say much. But I mean it.', { willingnessMin: 35, willingnessMax: 44 }, 2),
      line('...You need not feed me. I accept anyway. Gratitude is also incense.', {}, 1),
    ],
    topics: {
      temple_sermon: [
        line('Margaret says speak your appetite aloud. I hear it through the lattice instead — sins and hunger both smell similar if you tend the coals long enough.', { stageMin: 4 }, 3),
        line('Incense rises. Regret sinks. Fullness stays. I have been studying which lasts longest.', { reputationMin: 40 }, 2),
        line('The brazier never goes cold. Neither, I have decided, should anyone who serves it.', {}, 1),
      ],
    },
  }),

);
