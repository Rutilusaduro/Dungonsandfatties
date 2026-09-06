// The Squad — Lead: A7 Artisan | Support: A5 Editor
/**
 * Underground handcrafted personas — dungeon mouth, tombs, tunnels, ritual chambers.
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export const UNDERGROUND_PERSONAS = mergePersonas(
  authorPersona('uma_depth', {
    name: 'Uma',
    bands: {
      slender: `Uma the Depth Watcher keeps her lonely vigil at the dungeon mouth, slim and still as a drawn blade in the half-light. She trades rumors for dried fruit and watches travelers the way deep water watches stones — without judgment, without warmth, without blinking. Her hair is bound tight; her coat smells of cold stone and old warnings. She has not yet grown heavy from the depths, but hunger lives in her eyes, patient as the dark below.`,
      curvy: `Uma has softened into subtle curves, her slender frame rounding where the vigil has grown long and the dried fruit insufficient. She still does not blink often. She still speaks in riddles. But her coat fits differently now, and when she shifts on her stool the motion is slower, more deliberate — a woman who has begun to carry weight the way the depths carry secrets: quietly, permanently.`,
      plump: `Uma is pleasantly plump, a depth watcher whose body has finally matched the slow accumulation of years at the dungeon mouth. She trades rumors and accepts food with the same cryptic nod; both disappear into her without explanation. Her vigil continues. Her hips have widened. The darkness below does not care, but Uma seems to — she rests one hand on her belly when she thinks, as if listening to something deeper than thought.`,
      large: `Uma is very large now, her substantial frame a fixture at the dungeon entrance like a second archway. Travelers lower their voices when they pass; not from fear of the depths, but from the gravity she carries. She still trades rumors for fruit and meat. She eats both without haste, eyes fixed on the dark. "The depths remember," she says, and pats her middle. "So do I."`,
      enormous: `Uma is enormously full-figured, a depth watcher become landmark — vast, still, cryptic at a scale that makes her warnings feel prophetic. She fills her stool and spills beyond it, cold stone at her back, warmth in her body. Rumors flow to her; food flows into her; both vanish without trace. The dungeon mouth seems narrower beside her. The depths seem deeper. Uma seems satisfied, which is more unsettling than any warning.`,
      immense: `Uma has become immense, a living threshold between the world above and the hunger below. Her prodigious bulk guards the entrance like a gate that eats instead of opens. She speaks rarely and eats steadily, dried fruit and bread and meat disappearing into a frame that has grown legendary among travelers. "The depths remember," she whispers. So does everyone who has seen her — and fed her.`,
    },
    extras: {
      ceiling: `Uma hangs face-down from candy ropes at the dungeon mouth, slim body swaying over the descent, eyes still fixed on the dark below. "...The depths will remember this indignity," she murmurs. "So will I."`,
      hold: `Uma is frozen mid-gesture, one finger raised toward the dungeon dark, paralyzed but never blinking. Her stillness is worse than movement — like the depths themselves holding breath.`,
      full: `Uma sits at her vigil, hands on a belly distended by dried fruit and bread and something you brought her that she will not name. "The watch... continues," she breathes, stuffed and cryptic as ever.`,
    },
    greetings: [
      line(`"...You return." Uma does not turn from the dungeon mouth. "The depths stirred when you left. They stir differently now. Speak."`, { reputationMin: 50 }, 3),
      line(`"Footsteps. Yours." A slow blink. "Rumors cost fruit. Warnings cost more. What do you carry?"`, { reputationMin: 25 }, 2),
      line(`"The mouth is hungry. I am... attentive." Her gaze drifts to your hands. "Show me what you've brought."`, { willingnessMin: 40 }, 2),
      line(`"...Yes?" The darkness behind her does not answer. Neither does she, for a long moment. "State your purpose."`, {}, 1),
    ],
    afterFeeding: [
      line(`"...Adequate." Uma's eyes close once. "The depths prefer sacrifice. I prefer this. Remember that."`, { willingnessMin: 50 }, 3),
      line(`"Consumed. Noted." She rests a hand on her stomach. "The watch continues. So does gratitude — in my way."`, { willingnessMin: 35 }, 2),
      line(`"...It will do." A cryptic nod. "Leave before the dark notices your kindness."`, {}, 1),
    ],
    topics: {
      warning: [
        line(`"Three turns down, the air tastes wrong. Five turns, the stones remember your name." Uma's voice is flat. "Ten turns — you stop being a rumor and become inventory."`, { reputationMax: 10 }, 3),
        line(`"The dungeon feeds. Not always on meat." She glances at her own softened waist. "I watch so someone remembers who went in... and who came out heavier."`, { stageMin: 4 }, 2),
        line(`"Bring light. Bring food. Bring sense." A pause. "Two of three will save you."`, {}, 1),
      ],
    },
  }),

  authorPersona('eve_tomb', {
    name: 'Eve',
    bands: {
      slender: `Sister Eve the Tomb Watcher tends the dead with candle stubs and whispered psalms, her slender frame bowed not by weight but by reverence. She moves among the stones like a shadow that chose to stay, lay sister's habit worn thin at the hem, eyes soft with sleepless kindness. She offers tea to the living and silence to the dead. Her appetite is modest — bread, pastry, warmth — but the tombs are cold, and cold makes hunger honest.`,
      curvy: `Sister Eve has softened into gentle curves, her slender devotion rounding where the tomb's chill has driven her to pastry and tea in greater measure. She still whispers psalms; they sound warmer now, as if spoken from a body that has learned comfort. Candle stubs gutter in her wake. She lights them with steady hands and eats with the same care — slowly, gratefully, as if every bite were communion.`,
      plump: `Sister Eve is pleasantly plump, a tomb watcher whose kindness has written itself across her figure like a second habit. She tends the dead with candle stubs and the living with whatever she has baked — often both in the same afternoon. Her laugh is rare and soft; her appetite is neither. She sits on the tomb steps between duties, bread in hand, belly rounded, psalms on her lips, utterly at peace with abundance in a place of endings.`,
      large: `Sister Eve is very large now, her substantial frame moving through the tombs with unhurried grace, candles held before a body that carries its own warmth. The dead do not judge. The living sometimes stare. She offers tea and pastry regardless, habit straining comfortably, voice low and maternal. "Hunger is honest," she says, and pats her middle. "So is comfort. Both are gifts."`,
      enormous: `Sister Eve is enormously full-figured, a lay sister become sanctuary — vast, soft, radiant with candlelight and quiet appetite. She fills the tomb antechamber like a hearth, psalms humming from a throat that knows bread and pastry and the pleasure of both. The dead are tended. The living are fed. Sister Eve has grown into a woman who gives everything, including seconds, and accepts them too.`,
      immense: `Sister Eve has become immense, a tomb watcher whose body has become as generous as her prayers. She moves slowly among the stones, candles bobbing before a frame that seems almost holy in its abundance — not grotesque, not tragic, simply vast and warm in a place of cold. She feeds travelers, feeds herself, whispers psalms over every meal. The tombs remember the dead. Eve remembers to eat. Both feel like devotion.`,
    },
    extras: {
      ceiling: `Sister Eve hangs face-down from candy ropes among the tomb arches, habit askew, candle stubs scattering below. "Even the dead would blush," she whispers. "Please — put me down gently."`,
      hold: `Sister Eve is frozen mid-psalm, lips parted, candle held paralyzed between praying hands. Her eyes are gentle, frightened, forgiving even now.`,
      full: `Sister Eve sits on the tomb steps, candle guttering, hands folded on a belly rounded by pastry and tea and bread offered in kindness. "The psalm... can wait," she murmurs, utterly content.`,
    },
    greetings: [
      line(`"Peace be with you." Sister Eve's smile is candle-soft. "The tombs are quiet today. Sit — I have tea, and time."`, { reputationMin: 50 }, 3),
      line(`"You walk among the dead with living feet. That is a mercy." She gestures to a stone bench. "Rest. Speak if you wish."`, { reputationMin: 30 }, 2),
      line(`"The cold here makes everyone hungry eventually." A gentle nod. "I won't ask what brings you. I'll ask if you've eaten."`, { willingnessMin: 55 }, 2),
      line(`"Yes, child?" Her voice is low, kind. "The dead listen. So do I."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Oh — thank you." Sister Eve presses her hands together, then to her heart. "You feed the living as I tend the dead. Both are sacred work."`, { willingnessMin: 65 }, 3),
      line(`"Warm. Sweet. A kindness." She closes her eyes a moment. "I'll remember this when the candles burn low."`, { willingnessMin: 45 }, 2),
      line(`"...Bless you." Soft, sincere. "Truly."`, {}, 1),
    ],
    topics: {
      friendly: [
        line(`"The dead do not hunger. We who tend them learn to carry it for them — and for ourselves." Eve's smile is sad and warm. "Company helps. So does pastry."`, { reputationMin: 40 }, 3),
        line(`"I whisper psalms so the stones remember names. I eat bread so I remember joy." She pats her rounded middle without shame. "Both are prayers."`, { stageMin: 4 }, 2),
        line(`"Stay awhile. The tombs are lonely. The living shouldn't be."`, {}, 1),
      ],
    },
  }),

  authorPersona('pix_rat', {
    name: 'Pix',
    bands: {
      slender: `Pix the Ratcatcher moves through the undercity grates with athletic quickness, slim and sharp as her quarry, eyes always calculating the next escape route. She knows every culvert, every shadow, every hole that leads somewhere worse or better. Her grin is sly; her hands are faster. She smells of damp brick and old meat. Hunger keeps her lean — for now — but she watches your provisions the way cats watch birds.`,
      curvy: `Pix has softened into curves that slow her not at all — athletic frame rounding at hip and thigh while her feet still find every grate by instinct. She grins more often now, sly and satisfied, patting pockets that bulge with more than coin. "Rats get fat if you feed 'em," she says, and means herself. She still catches quarry. She has become harder to catch in return.`,
      plump: `Pix is pleasantly plump, a ratcatcher whose sly appetite has finally written itself on a body that still moves like lightning — just broader lightning. She squeezes through grates with more effort and more laughter, ale sloshing, belly brushing brick. She knows every tunnel. She knows every tavern that serves portions worth the crawl. Brigit's smokehouse is on her map. So is your pack, if you turn your back.`,
      large: `Pix is very large now, her substantial athletic bulk transformed into something that still fits the undercity — barely — by sheer cunning and sideways motion. She grins when she enters a room; the room feels smaller. Rats scatter. So do manners. She eats without apology, shares without promise, and vanishes with whatever you weren't guarding. "Fat rats live longer," she says. "So do fat catchers."`,
      enormous: `Pix is enormously full-figured, a ratcatcher become legend in the grates — vast, quick when she must be, sly always. She fills culverts that once swallowed her whole; she maps new routes around her own hips. Ale and meat and bread disappear into her like contraband into pockets. She still catches rats. She has become the kind of quarry other hunters whisper about.`,
      immense: `Pix has become immense, a undercity myth whose body has outgrown every grate and every cautionary tale. She moves when she chooses, grins constantly, smells of hickory and mischief. Rats are almost beside the point now — she is the largest thing in most tunnels she enters, and she likes it that way. "Catch me," she says, patting a belly that would take three ratcatchers to circle. Nobody has yet.`,
    },
    extras: {
      ceiling: `Pix hangs face-down from candy ropes in a culvert, athletic body jammed awkwardly against brick, still grinning. "Well. This is a new kind of trap. Cut me down before I eat the ropes."`,
      hold: `Pix is frozen mid-crouch, one hand in a paralyzed lunge toward your pack, eyes sly and furious. She cannot blink. She would steal if she could twitch.`,
      full: `Pix slumps against a grate, hands on a belly distended by meat and ale and something she won't admit she stole. "Can't... run," she grins, stuffed and unrepentant. "Worth it."`,
    },
    greetings: [
      line(`"Heh. Didn't hear you coming — which means you're good or I'm distracted." Pix's eyes flick to your belt. "Betting on distracted. What's the job?"`, { reputationMin: 45 }, 3),
      line(`"Grate's clear. Pockets are... negotiable. Talk fast."`, { reputationMin: 20 }, 2),
      line(`"If you've got meat, we're friends. If you've got secrets, we're better friends." A sly wink. "If you've got both, marry me."`, { willingnessMin: 55 }, 2),
      line(`"...Yeah?" She doesn't stop moving. "Make it quick."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Now that's proper payment." Pix wipes her mouth, grinning. "You ever need a grate opened or a rumor planted, you call Pix. I remember people who feed me."`, { willingnessMin: 60 }, 3),
      line(`"Solid. Greasy. Good." She pats her stomach, satisfied. "Almost makes me honest. Almost."`, { willingnessMin: 45 }, 2),
      line(`"...Not poisoned. Smart." A nod. "Thanks."`, {}, 1),
    ],
    topics: {
      warning: [
        line(`"Don't go past the third culvert east — something down there eats louder than rats." Pix's grin fades. "And I don't mean me. Yet."`, { reputationMax: 5 }, 3),
        line(`"Guards patrol the wide tunnels. Fat guards patrol slow." She glances at her own frame, smug. "Use that. Or feed 'em. Both work."`, { stageMin: 4 }, 2),
        line(`"Trust the grates. Don't trust the water. Don't trust anyone who won't share food."`, {}, 1),
      ],
    },
  }),

  authorPersona('thalia_fungi', {
    name: 'Thalia',
    bands: {
      slender: `Thalia the Mycologist crouches among the undercity fungi with notebook open, pear-shaped frame still slight, eyes bright with forbidden colors. Her sketches name spores the eye should not name; her fingers stain purple and gold. She speaks to mushrooms like colleagues and to people like interesting specimens. Bread and cheese sustain her between discoveries. She has not yet grown heavy from the depths — but curiosity is its own appetite.`,
      curvy: `Thalia has softened into curves that press against her stained coat, pear-shaped body rounding while her mind races faster. She still sketches spores in colors that make watchmen nervous; she still tastes what she should not, "for science." Her notebook has grown thicker. So has she. "Fungi bloom when fed," she murmurs, and glances at her own blooming hips without embarrassment.`,
      plump: `Thalia is pleasantly plump, a mycologist whose love of mushrooms and soup has written itself across every line of her figure. She moves through fungal clusters with unhurried care, belly brushing caps, fingers gentle on poison and prize alike. Her notebook overflows. Her appetite matches her curiosity — vast, fearless, slightly irresponsible. She offers you broth. She has already had three bowls.`,
      large: `Thalia is very large now, her substantial pear-shaped frame a fixture in the fungal groves, coat replaced twice, notebook tucked under a soft arm. She catalogs species and calories with equal zeal. "Growth is growth," she says, patting a belly that has become its own ecosystem. The mushrooms seem to lean toward her. So do apprentices. So does hunger.`,
      enormous: `Thalia is enormously full-figured, a mycologist become landmark in the undercity dark — vast, curious, radiant with spore-dust and satisfaction. She crouches with difficulty now, stands with majesty, sketches from a stool that groans heroically. Her soups are legendary. Her figure is more so. She eats what she studies. She studies what she eats. The distinction has blurred beautifully.`,
      immense: `Thalia has become immense, a living grove of curiosity and abundance. Her prodigious bulk moves through fungal colonies like weather — slow, inevitable, nurturing. Spore prints cover her like freckles. Soup stains her like medals. She names new species after old meals and old meals after new species. Spore the apprentice takes notes. The fungi seem to approve. Thalia certainly does.`,
    },
    extras: {
      ceiling: `Thalia hangs face-down from candy ropes above a cluster of luminous fungi, notebook fluttering below, plump body rotating slowly. "Fascinating — suspended growth conditions. Also undignified. Help?"`,
      hold: `Thalia is frozen mid-sketch, pencil poised over a spore print that will never be finished, eyes wide with scientific outrage. She cannot blink. The mushroom wins.`,
      full: `Thalia sits among the fungi, notebook forgotten, hands on a belly distended by mushroom soup and bread and "one more sample." "The colony... can wait," she breathes, utterly stuffed and radiant.`,
    },
    greetings: [
      line(`"Oh! A visitor — and not a spore cluster!" Thalia beams, purple-stained fingers waving. "Perfect timing. I was about to taste something questionable. Join me?"`, { reputationMin: 50 }, 3),
      line(`"Quiet — you'll disturb the mycelium." A beat. "Actually, talk. Disturbance encourages growth. Like soup."`, { reputationMin: 30 }, 2),
      line(`"If you've brought cheese, you're already my favorite colleague." Her eyes shine. "If you've brought questions, even better."`, { willingnessMin: 58 }, 2),
      line(`"Yes? Document your foot placement — I'm cataloguing compaction patterns."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Exquisite — the umami profile alone deserves a paper." Thalia sighs happily. "You understand fungi and friendship. Rare combination. Thank you."`, { willingnessMin: 65 }, 3),
      line(`"Warm. Savory. Reproducible, I hope." She pats her middle, content. "I'll cite you in my notes. Informally."`, { willingnessMin: 50 }, 2),
      line(`"...A fine specimen of generosity. And flavor." A scribble in the notebook. "Thank you."`, {}, 1),
    ],
    topics: {
      gardening: [
        line(`"Surface gardens grow toward sun. Down here, we grow toward appetite." Thalia gestures at fungi and herself. "Both respond to feeding. Both reward patience."`, { stageMin: 4 }, 3),
        line(`"Spore, my apprentice, asks too many questions. I answer with soup. It works."`, { reputationMin: 35 }, 2),
        line(`"Never cultivate what you won't taste. Never taste what you won't document. I break the second rule often."`, {}, 1),
      ],
    },
  }),

  authorPersona('marlowe_tunnel', {
    name: 'Marlowe',
    bands: {
      slender: `Marlowe the Tunnel Diver maps flooded passages by touch, athletic frame lean and scarred, grin fearless in the dark. She sells what she finds on the black market and keeps what she cannot sell in her pockets — or her stomach, if it's edible. Ale sloshes in her flask. Courage sloshes in everything else. She has not yet grown heavy from the tunnels, but the black market feeds well when you bring back what no one else will fetch.`,
      curvy: `Marlowe has softened into curves that slow her dive not at all — athletic body rounding where ale and black-market suppers add up. She still maps by touch, still grins in flooded dark, but surfaces now with a satisfied pat to her middle and a price list that includes "lunch." Fearless, she calls it. The tunnels call it predictable. Both are right.`,
      plump: `Marlowe is pleasantly plump, a tunnel diver whose fearlessness has extended to appetite without limit. She hauls herself from floodwater with a slap to her belly, maps tucked under one arm, ale in the other. Buyers haggle. Marlowe eats. She has found things in the deep that should not be sold; she has found meals that should not be missed. Her grin is unrepentant.`,
      large: `Marlowe is very large now, her substantial athletic bulk making every flooded passage a tighter squeeze — and every return a grander emergence. She sells maps and warnings and herself as guide; she buys ale and meat with the proceeds and keeps the change in her hips. "The deep rewards the bold," she says, wringing water from hair that has grown as wild as her portions.`,
      enormous: `Marlowe is enormously full-figured, a tunnel diver become legend — vast, fearless, dripping with water and confidence. She maps by touch what others cannot see; she eats what others cannot find. Flooded passages part for her like curtains. Black-market buyers part for her wallet, then her appetite. She laughs in the dark. The dark laughs back, impressed.`,
      immense: `Marlowe has become immense, a living flood in human form — immense, scarred, radiant with ale and adventure and every meal stolen fair from the deep. She no longer fits the narrowest tunnels. She no longer needs to; she owns the wide ones. Maps sell for gold. Marlowe sells for stories. Her body is the best story: fearless, fed, and far too large to drown.`,
    },
    extras: {
      ceiling: `Marlowe hangs face-down from candy ropes above a flooded passage, athletic body dripping, still grinning. "New record — deepest hang yet. Cut me down before the water rises!"`,
      hold: `Marlowe is frozen mid-dive, one hand touching braille-map stones, paralyzed in black water. Her eyes are fearless, furious, already planning revenge.`,
      full: `Marlowe sprawls on a dry ledge, map forgotten, hands on a belly distended by ale and black-market stew. "The tunnel... can wait," she grins, utterly stuffed.`,
    },
    greetings: [
      line(`"Back from the deep — buy a map, buy a story, buy me a drink." Marlowe wrings water from her hair. "You look like someone with coin and curiosity."`, { reputationMin: 45 }, 3),
      line(`"Flooded three bends south. Dry route costs extra." A fearless grin. "Ale costs more. Worth it."`, { reputationMin: 25 }, 2),
      line(`"If you're hiring, I dive. If you're feeding, I dine. If you're both, marry me." She laughs at her own joke. Mostly.`, { willingnessMin: 50 }, 2),
      line(`"Yeah? Talk fast — tide's rising somewhere."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Now that's treasure." Marlowe wipes her mouth, eyes bright. "You ever need someone to fetch what shouldn't be found, you call Marlowe. I owe you a dive."`, { willingnessMin: 55 }, 3),
      line(`"Solid. Salty. Keeps." She pats her stomach, satisfied. "Better than half what I sell."`, { willingnessMin: 40 }, 2),
      line(`"...Good haul. Thanks." Already planning the next meal.`, {}, 1),
    ],
    topics: {
      warning: [
        line(`"Third bend floods without moonlight. Fifth bend whispers. Seventh bend — don't." Marlowe's grin fades. "I charge double to map past five. Triple if you want me to come with you."`, { reputationMax: 10 }, 3),
        line(`"The deep keeps what it eats. I've seen belts, boots, and appetites swallowed whole." She glances at her own frame. "Feed the diver before the dive. Rule one."`, { stageMin: 4 }, 2),
        line(`"Trust the rope. Trust the map. Don't trust still water — it lies."`, {}, 1),
      ],
      haggle: [
        line(`"My maps are art. My dives are suicide. Price reflects both." Marlowe crosses her arms. "For you — I'll knock off a coin. Not two. Don't push."`, { reputationMin: 40 }, 3),
        line(`"Black market rates. Fair-market courage. You want cheap, dive yourself."`, { reputationMin: 20 }, 2),
        line(`"Haggle if you like. The tunnel doesn't discount."`, {}, 1),
      ],
    },
  }),

  authorPersona('venus_ritual', {
    name: 'Venus',
    bands: {
      slender: `Venus the Ritual Acolyte moves through candle smoke with intense focus, hourglass frame still defined, robes smelling of wax and something sweeter she will not name. She never quite meets your eyes — they slide past, inward, toward rites half-whispered and hunger half-acknowledged. Wine and pastry sustain the vigil. Meat she refuses. Appetite she does not, though it has not yet written itself on her slender devotion.`,
      curvy: `Venus has softened into curves that strain her robes, hourglass body rounding where wine and pastry accumulate like offerings. She still does not meet your eyes — but her hands drift to her waist when she thinks, adjusting fabric, adjusting breath. The rituals grow longer. The candles multiply. Something sweeter than wax hangs in the air. Venus eats after midnight, alone, intensely.`,
      plump: `Venus is pleasantly plump, an acolyte whose intensity has found expression in flesh as well as rite. Her robes have been let out twice; her gaze still avoids yours, fixed on flames that dance in colors pastry fat might explain. She whispers incantations over wine, over cream, over bread that rises like devotion. "The body is a vessel," she says, and fills hers without shame when no one watches.`,
      large: `Venus is very large now, her substantial hourglass figure moving through ritual space like a second altar — vast, intense, sweet-scented. Candles gutter in her wake. She never meets your eyes, but her presence meets everything else: robes straining, breath slow, appetite undeniable. Wine and pastry and cream disappear into ritual and body alike. The chamber feels smaller. Venus feels complete.`,
      enormous: `Venus is enormously full-figured, a ritual acolyte become embodiment — prodigious curves swathed in wax-stained fabric, intensity undiminished by scale. She tends flames that warm her skin and fat that warms her soul. Incantations hum from a throat that knows pleasure as well as prayer. She still avoids your gaze. She no longer avoids her own reflection. Something sweeter than wax fills every corner.`,
      immense: `Venus has become immense, a living rite of appetite and mystery. Her prodigious bulk fills the ritual chamber like incense — heavy, sweet, impossible to ignore. Robes have surrendered; candles bow. She moves slowly, intensely, hands often resting on a belly that rises and falls like tide. Wine, pastry, cream — all offerings, all accepted. She never meets your eyes. Everyone else stares anyway.`,
    },
    extras: {
      ceiling: `Venus hangs face-down from candy ropes among ritual candles, robes askew, hourglass body swaying in smoke. "...The rite did not specify this," she whispers, intense and flushed. "Release me. Before the wax drips."`,
      hold: `Venus is frozen mid-incantation, lips parted, hands raised toward flames she cannot feed, eyes averted even in paralysis. Intensity radiates from her still form.`,
      full: `Venus kneels before the altar, robes spread, hands on a belly distended by wine and pastry and cream offered in rapture. "The vessel... is full," she breathes, eyes closed, utterly consumed.`,
    },
    greetings: [
      line(`"...You interrupt the smoke." Venus does not turn, voice low and intense. "Speak softly. The rites are listening — and so am I."`, { reputationMin: 45 }, 3),
      line(`"The chamber welcomes offerings. Wine. Pastry. Silence." A pause. "Not necessarily in that order."`, { reputationMin: 25 }, 2),
      line(`"I don't meet eyes during vigil." Her gaze slides past you. "I accept food during it. Place it down. Slowly."`, { willingnessMin: 45 }, 2),
      line(`"...Yes?" Candle smoke curls between you. "Be brief."`, {}, 1),
    ],
    afterFeeding: [
      line(`"...Adequate offering." Venus's breath catches. "The rites... approve. I approve. Do not expect me to say it twice."`, { willingnessMin: 55 }, 3),
      line(`"Sweet. Warm. Accepted." Her hands tremble slightly. "Leave before I lose focus entirely."`, { willingnessMin: 38 }, 2),
      line(`"...Consumed." A whisper. "Thank you."`, {}, 1),
    ],
    topics: {
      warning: [
        line(`"Beyond this chamber, the footsteps rhyme. Wrong rhyme, wrong end." Venus's voice drops. "I guard the door. The hunger inside guards itself."`, { reputationMax: 5 }, 3),
        line(`"The rituals feed on focus — and on cream, if I'm honest." She does not meet your eyes. "Disturb neither lightly."`, { stageMin: 4 }, 2),
        line(`"Knock once. Enter twice only if invited. Eat always — but not the meat. The rules are peculiar here."`, {}, 1),
      ],
    },
  }),

  authorPersona('ren_scout', {
    name: 'Ren',
    bands: {
      slender: `Ren the Depth Scout maps the upper dungeon by rope-length, athletic frame lean and grim, eyes that have seen too many turns and sold warnings cheaper than maps. She eats meat and bread because rations are rations; she sells truth because lies cost more in the deep. Her voice is flat. Her blade is sharp. Hunger has not yet softened her — but the dungeon sells appetite to everyone eventually.`,
      curvy: `Ren has softened into curves that strain her scout leathers, athletic body rounding where rations grew generous and caution grew thin. She still maps by rope-length, still sells warnings with grim precision, but pauses now at camp with a hand on her hip, chewing slow. "The deep adds weight," she says, like a weather report. "Me too."`,
      plump: `Ren is pleasantly plump, a depth scout whose grim professionalism has made room for appetite without fanfare. She coils rope across a belly that has become equipment in its own right — tested, reliable, expanding. Maps sell. Warnings sell. Ren eats, marks the ledger, dives again. Fearless is what they call her. Fed is what the dungeon calls her. Both are accurate.`,
      large: `Ren is very large now, her substantial athletic bulk making every rope descent a calculation — length, load, leverage. She maps the upper dungeon with the same grim focus she applies to meals: thorough, unflinching, sufficient. Buyers listen when she warns. Enemies listen less. Ren has stopped caring. Her body guards her better than leather now.`,
      enormous: `Ren is enormously full-figured, a depth scout become cautionary tale and success story at once — vast, grim, impossible to ignore at the dungeon mouth. Rope coils around her like affection. Maps tuck into belts that have long surrendered. She sells warnings cheaper than maps because she has seen what happens to the hungry. She is not hungry. She is prepared.`,
      immense: `Ren has become immense, a living map of the upper dungeon's appetite reflected in human form. Her prodigious bulk moves through camp like a fortification — slow, certain, fed. She maps by rope-length still, but the rope is longer now, and so is she. Warnings come free to those who listen. Seconds come free to Ren. She accepts both without smiling.`,
    },
    extras: {
      ceiling: `Ren hangs face-down from candy ropes at a rope-belay point, athletic body swaying over the drop, grim as ever. "Cut me down. Charge you double on the next map if you don't."`,
      hold: `Ren is frozen mid-coil, rope paralyzed in strong hands, eyes flat with cold fury. She cannot blink. The dungeon would laugh if it cared.`,
      full: `Ren sits on her pack, rope forgotten, hands on a belly distended by meat and bread and rations she "needed for the dive." "The map... waits," she mutters, stuffed and grim.`,
    },
    greetings: [
      line(`"You're back." Ren doesn't look up from her rope marks. "Upper third's shifted. Buy the update or learn the hard way."`, { reputationMin: 45 }, 3),
      line(`"Maps cost coin. Warnings cost less because you'll ignore them anyway." A grim exhale. "Talk."`, { reputationMin: 20 }, 2),
      line(`"If you've got meat, sit. If you've got questions, pay." She shifts her pack. "If you've got both, we might survive each other."`, { willingnessMin: 45 }, 2),
      line(`"...Yeah?" Rope in hand. "Make it quick."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Good rations." Ren nods once — equivalent of embrace. "You eat like someone who survives. I respect that. Thanks."`, { willingnessMin: 50 }, 3),
      line(`"Solid. Keeps. I'd pack it." She pats her stomach, pragmatic. "I will."`, { willingnessMin: 35 }, 2),
      line(`"...Noted. Useful." Already coiling rope. "Thanks."`, {}, 1),
    ],
    topics: {
      warning: [
        line(`"Rope-length seven, the floor lies. Rope-length twelve, the air thins. Rope-length fifteen — you stop being a scout and become a story." Ren's voice is flat. "Buy the map."`, { reputationMax: 5 }, 3),
        line(`"The dungeon feeds on fear and whatever you carry." She glances at her own frame. "Travel light. Eat heavy. My rule."`, { stageMin: 4 }, 2),
        line(`"Trust the rope. Trust the marks. Don't trust hunger — it lies about being satisfied."`, {}, 1),
      ],
    },
  }),

  authorPersona('spore_apprentice', {
    name: 'Spore',
    bands: {
      slender: `Spore the Mushroom Apprentice follows Thalia through the fungal groves with eager eyes, slender frame darting between caps, pockets bulging with spore prints and questions she should not ask aloud. She tastes everything her mistress permits and some things she does not — "for comparison." Bread and cheese sustain her between discoveries. Hunger and curiosity wear the same face. She has not yet grown heavy, but both appetites are diligent.`,
      curvy: `Spore has softened into gentle curves, slender eagerness rounding where soup and samples accumulate. She still darts — less far, less fast, with more laughter when she bumps a cap. Thalia calls it "field growth." Spore calls it progress and steals another bowl. Her notebook overflows. Her belt does not. She is learning.`,
      plump: `Spore is pleasantly plump, an apprentice whose pockets and middle bulge with equal enthusiasm. She carries spore prints, forbidden questions, and seconds of mushroom soup without distinction. Thalia sighs. Spore beams. The fungi seem to multiply around her — or maybe she is just larger now, stirring more air, dropping more crumbs, feeding more than she documents.`,
      large: `Spore is very large now, her substantial slender-origin bulk transformed into something that knocks caps when she turns too fast — which is always. She still asks questions she should not. She still tastes what she should not. She has simply grown into a body that cannot hide behind mushrooms anymore. Thalia is proud. Spore is eating. The grove thrives.`,
      enormous: `Spore is enormously full-figured, an apprentice become harvest — vast, eager, radiant with spore-dust and soup stains. She moves through the groves like weather, asking, tasting, growing. Pockets have burst; notebooks ride atop a belly that rises like dough. "Is this normal?" she asks. Thalia says yes. Spore believes her and has another bowl.`,
      immense: `Spore has become immense, a mushroom apprentice whose curiosity and appetite have achieved parity at legendary scale. She fills groves, pockets empty, questions louder than ever, body a testament to every soup and sample and stolen taste. Thalia takes notes. Spore takes seconds. The undercity will tell stories about the apprentice who grew like fungi — fast, soft, everywhere.`,
    },
    extras: {
      ceiling: `Spore hangs face-down from candy ropes above a spore cluster, pockets emptying, plump body rotating. "Mistress! Is this a lesson? I don't like this lesson!"`,
      hold: `Spore is frozen mid-taste, mushroom at paralyzed lips, eyes wide with eager horror. She cannot swallow. She cannot spit. She can only learn.`,
      full: `Spore sits among the caps, notebook forgotten, hands on a belly distended by soup and samples and "just one more." "Thalia... I think I'm full," she whispers, awed.`,
    },
    greetings: [
      line(`"Oh! Hi — sorry, I was cataloguing this cap's compression pattern — hi!" Spore bounces slightly. "Did you bring soup? Cheese? Forbidden questions?"`, { reputationMin: 50 }, 3),
      line(`"Mistress says don't talk to strangers. You're not strange. You're familiar. Soup?"`, { reputationMin: 30 }, 2),
      line(`"I found a new spore color today! Want to see? Want to eat? Want both?" Eyes shining. "Both is best."`, { willingnessMin: 60 }, 2),
      line(`"Yes? Quick — I'm mid-experiment. Mostly edible."`, {}, 1),
    ],
    afterFeeding: [
      line(`"WOW. That — the texture — the warmth — thank you!" Spore scribbles in her notebook. "I'm writing you down as a positive growth factor."`, { willingnessMin: 65 }, 3),
      line(`"Mmm! Mistress makes good soup but yours is... different. Good different!" She pats her belly, beaming. "Thanks!"`, { willingnessMin: 50 }, 2),
      line(`"...Really good. I'll remember." Already reaching for notebook. "Thank you!"`, {}, 1),
    ],
    topics: {
      gardening: [
        line(`"Mistress says fungi are gardens that grow toward appetite instead of sun." Spore pats her middle. "I'm... a garden too? She laughed when I asked."`, { stageMin: 3 }, 3),
        line(`"Never cultivate what you won't taste — that's rule one. Rule two is document. I skip rule two a lot." A guilty grin.`, { reputationMin: 35 }, 2),
        line(`"The grove teaches patience. My stomach teaches impatience. They negotiate."`, {}, 1),
      ],
    },
  }),

  authorPersona('reef_boat', {
    name: 'Reef',
    bands: {
      slender: `Reef the Tunnel Boatman poles her flat-bottom skiff through knee-deep floodwater with laconic grace, mom-bod frame still lean from work rather than rest, eyes measuring bends the way merchants measure coin. She charges by the bend and undercharges no one — fairness is her only sermon. Fish and stew sustain her between poles. She speaks little. The water speaks plenty. Hunger has not yet broadened her, but the tunnels are long.`,
      curvy: `Reef has softened into curves that rock the skiff differently, mom-bod frame rounding where fish stew and tunnel rations add up. She still poles standing, still charges by the bend, but sits between hauls now, one hand on the tiller, one on her hip. "Water rises," she says. "So do appetites." She does not elaborate. She never does.`,
      plump: `Reef is pleasantly plump, a boatman whose skiff sits lower in the water for reasons that have nothing to do with cargo. She poles with unhurried strength, belly brushing the pole on the backstroke, face calm. Fish stew steams in a tin at her feet. Passengers pay by the bend. Reef eats by the bowl. The accounting is simple and honest.`,
      large: `Reef is very large now, her substantial mom-bod bulk making the skiff a brave little vessel — low, slow, certain. She poles through floodwater like a queen through a ballroom, saying little, eating often from the stew tin. Tales of the harbor reach her ears; tales of the tunnels leave her mouth. Both cost passage. Food costs nothing but time, and Reef has plenty.`,
      enormous: `Reef is enormously full-figured, a tunnel boatman become gondola of appetite — vast, laconic, serene on water that barely reaches her knees. The skiff groans affectionately. Passengers sit carefully. Reef poles, eats, poles again, belly swaying with the current. "Bend ahead," she says. "Pay or paddle." She smiles rarely. When she does, the tunnel warms.`,
      immense: `Reef has become immense, a living barge poling through knee-deep myth. Her prodigious bulk fills the skiff to gunwales; water laps higher as if paying tribute. She charges by the bend and lives by the stew pot, fish and ale and bread disappearing into a frame that has become legend among tunnel travelers. Laconic? She has never needed more words. Her size speaks.`,
    },
    extras: {
      ceiling: `Reef hangs face-down from candy ropes above the flood channel, skiff bumping her gently below, plump body swaying. "...Huh." The most words she's ever wasted on indignity. "Put me down."`,
      hold: `Reef is frozen mid-pole, oar paralyzed in strong hands, eyes flat and patient. The water moves. She does not. Typical.`,
      full: `Reef sits in her skiff, pole across her lap, hands on a belly distended by fish stew and bread and passage-payment snacks. "Next bend... later," she murmurs, utterly stuffed.`,
    },
    greetings: [
      line(`"Bend ahead costs two." Reef doesn't stop poling. "Friendship costs less. Food costs nothing if it's fish."`, { reputationMin: 45 }, 3),
      line(`"Skiff's ready. Water's knee-deep. Talk on the way or don't talk."`, { reputationMin: 25 }, 2),
      line(`"You smell like surface. Not an insult. Sit. Stew's warm."`, { willingnessMin: 50 }, 2),
      line(`"...Yeah?" Pole dips. "Pay or paddle."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Good fish. Good bread." Reef nods once, serene. "You ride free next bend. Don't tell the others."`, { willingnessMin: 55 }, 3),
      line(`"Warm. Filling." She pats her stomach, economical. "Thanks."`, { willingnessMin: 40 }, 2),
      line(`"...Solid." Already poling again. "Thanks."`, {}, 1),
    ],
    topics: {
      warning: [
        line(`"Third bend floods when it rains up top. Fifth bend — something big in the water. Not me. Yet." Reef's eyes stay on the channel. "Pay attention."`, { reputationMax: 10 }, 3),
        line(`"Don't stand in the skiff. Don't eat my stew without asking. Don't call the tunnel 'just water.'"`, { stageMin: 3 }, 2),
        line(`"Current lies. I don't. Listen to one of us."`, {}, 1),
      ],
      harbor_tales: [
        line(`"Harbor's salt. Tunnel's silence. Both swallow things." Reef poles slow. "I carried a sailor down once. He talked the whole way. Paid double to shut up."`, { reputationMin: 35 }, 3),
        line(`"Surface folk think tunnels are death. Tunnel folk think surface folk are hungry. Both right."`, { stageMin: 4 }, 2),
        line(`"Every crate at the harbor ends up wet eventually. Every story ends up down here."`, {}, 1),
      ],
    },
  }),

  authorPersona('lyra_guardian', {
    name: 'Lyra',
    bands: {
      slender: `Lyra the Ritual Guardian stands at the chamber door with a candle that never gutters, athletic frame lean and watchful, listening for footsteps that rhyme. She smells of wax and wine and the particular silence of places that hunger. Bread sustains the vigil; pastry she accepts like tribute. Meat she refuses. Appetite she guards as fiercely as the rite — though it has not yet broadened her slender devotion.`,
      curvy: `Lyra has softened into curves that press against guardian leathers, athletic body rounding where bread and wine and pastry accumulate like offerings at the door. She still listens for rhyming footsteps. She still holds the candle steady. But her free hand drifts to her waist during long vigils, and her sermons — when she offers them — sound warmer, fed by something sweeter than duty.`,
      plump: `Lyra is pleasantly plump, a ritual guardian whose watchfulness has made room for abundance without surrendering focus. The candle never gutters. Her belt has. She stands at the chamber door like a second threshold — soft, athletic, immovable. Wine and pastry and bread pass her lips between footstep counts. "The body guards the rite," she says, and pats her middle with solemn pride.`,
      large: `Lyra is very large now, her substantial athletic bulk filling the doorway she protects — vast enough to block, devoted enough to allow. The candle burns steady at her shoulder. Footsteps that rhyme make her tense; footsteps that bring food make her almost smile. She delivers sermons between bites, low and warm, guardian and acolyte both. Venus nods from within. Lyra nods back, chewing.`,
      enormous: `Lyra is enormously full-figured, a ritual guardian become bulwark — prodigious, watchful, radiant with candlelight and satisfaction. The chamber door frames her like an icon. She listens for rhyming footsteps and for the wine cart; both arrive on schedule. Sermons grow longer. Pauses grow softer. She guards the rite with her body now as much as her blade, and the rite approves.`,
      immense: `Lyra has become immense, a living door between worlds — immense, athletic no longer in the narrow sense but powerful in every sense, candle steady, belly vast, sermons rolling like low thunder. She guards Venus's chamber and her own appetite with equal devotion. Bread, wine, pastry — sacraments. Footsteps that rhyme — warnings. Footsteps that bring food — welcome. She has not stopped watching. She has simply grown worth watching too.`,
    },
    extras: {
      ceiling: `Lyra hangs face-down from candy ropes before the ritual door, candle somehow still upright in paralyzed hands, athletic body swaying. "The footsteps rhyme," she intones, furious. "Put me down."`,
      hold: `Lyra is frozen at attention, candle steady, eyes watchful, paralyzed mid-sermon. She cannot blink. The rite continues without her lips.`,
      full: `Lyra stands guard slumped slightly — the first time — hands on a belly distended by bread and wine and pastry taken in vigil. "The door... holds," she murmurs, stuffed and solemn.`,
    },
    greetings: [
      line(`"Halt. State purpose." Lyra's candle steadies. "The chamber behind me is hungry for reverence. I am hungry for... bread. Coincidence is not invitation to trespass."`, { reputationMin: 50 }, 3),
      line(`"Footsteps that rhyme bring warning. Footsteps that don't bring you." She listens a beat. "You may speak."`, { reputationMin: 30 }, 2),
      line(`"I guard the rite. I accept offerings of wine and pastry at the door." A solemn pause. "Speak softly."`, { willingnessMin: 40 }, 2),
      line(`"...Yes?" Candle flares once. "Be brief. Be reverent. Be fed if you must."`, {}, 1),
    ],
    afterFeeding: [
      line(`"Offering accepted." Lyra's voice warms a degree. "The guardian eats so the watch continues. You have my gratitude — and my attention."`, { willingnessMin: 50 }, 3),
      line(`"Bread sustains the vigil. Your bread sustains me." She touches her stomach, solemn. "Thank you."`, { willingnessMin: 35 }, 2),
      line(`"...Received. Noted." Candle steady. "Thank you."`, {}, 1),
    ],
    topics: {
      warning: [
        line(`"Beyond this door, hunger wears ritual clothes. Do not enter uninvited. Do not eat the meat. Do not meet Venus's eyes if she turns." Lyra's voice is low. "I guard. I warn. I eat bread. In that order."`, { reputationMax: 5 }, 3),
        line(`"Footsteps that rhyme are not footsteps. I listen so you need not learn why." She glances at her own softened frame. "The rite grows. So do guardians."`, { stageMin: 4 }, 2),
        line(`"Knock once. Wait. Offer bread if you're wise. Enter only when called."`, {}, 1),
      ],
      temple_sermon: [
        line(`"Hunger is honest. Guard it with devotion, not shame." Lyra's candle steadies. "The shrine teaches fullness as well as fasting. I am... evidence."`, { reputationMin: 40 }, 3),
        line(`"Venus tends the inner rite. I tend the door. Both require feeding." A solemn bite of pastry. "Both reward patience."`, { stageMin: 3 }, 2),
        line(`"Watch. Listen. Eat when offered. The ritual continues."`, {}, 1),
      ],
    },
  }),
);

export default UNDERGROUND_PERSONAS;
