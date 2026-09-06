/**
 * Handcrafted personas — Tavern annex (cellar, cask loft, attic).
 * The Squad — Lead: A7 Artisan | Support: A2 Psych, A5 Editor
 */
import { authorPersona, mergePersonas, line } from '../authorPersona.js';

export const ANNEX_TAVERN_PERSONAS = mergePersonas(
  authorPersona('marta_cellar', {
    name: 'Marta the Cellar Keeper',
    bands: {
      slender:
        'Marta the Cellar Keeper moves through the cool dark like someone who belongs to stone and oak. Her pear-shaped frame is modest still — hips a little wider than her shoulders, apron tied neat over a linen dress that has never seen noonlight. She listens to barrels the way others listen to gossip: head tilted, lips barely parted, weighing each faint tick and bubble against memory. When she looks up at you, her eyes are the color of ale held to a candle — warm, guarded, unwilling to waste words.',
      curvy:
        'The cellar has softened Marta in ways the upper tavern never sees. Her hips have rounded beneath the work apron, and her waist no longer looks carved so much as poured — a gentle swell that catches lamplight along the curve of her side. She still moves quietly, but there is a new heaviness to her step, a pleasant drag of thigh against thigh when she crosses between the racks. She presses a palm to a stout cask and smiles without showing teeth, as if the wood and she have reached the same ripe conclusion.',
      plump:
        'Marta has grown deliciously plump down here where bread and cheese are always within arm\'s reach. Her pear shape has blossomed — full hips swaying when she rolls a barrel, a soft belly rounding over her belt, breasts resting heavy and warm against her folded arms. The cellar air smells of yeast and patience; she smells of both, and of the sharp cheddar she samples on the hour because someone must judge the wheel. She meets your gaze with a slow blink that feels like permission to look as long as you do not comment on how her apron strings have migrated.',
      large:
        'Marta is large now in the way old cellars are large — not loud, but impossible to ignore once you have stepped inside her gravity. Her body fills the narrow lanes between barrels, hips brushing oak staves, belly a pale moon under lantern glow. Every roll of a cask makes her flesh shiver in sympathetic waves, and she has stopped pretending the extra notch on her belt was a mistake. She wipes her hands on her apron, cheeks flushed from exertion and something sweeter, and offers you a wedge of cheese with the solemnity of a sacrament.',
      enormous:
        'Down in the deepest part of the cellar, Marta has become enormous — a woman made of cool stone, warm dough, and unhurried appetite. Her hips span the width of two barrel racks; her belly rests against the nearest cask like a lover leaning in for the night. She breathes slowly, deeply, and the whole room seems to breathe with her, oak and brick and the soft press of her thighs. When she turns, the lantern swings; shadows slide over the generous swell of her back and the deep crease where waist gives way to seat. She does not apologize for taking up space. The cellar would feel empty without her.',
      immense:
        'Marta the Cellar Keeper has grown immense — a vast, pear-shaped presence that has reshaped the cellar around her habits and her hunger. She sits on a reinforced stool between the oldest casks, belly pooled in her lap like risen dough, breasts heavy on her forearms as she listens to fermentation with closed eyes. Her skin glows in the lamplight, every fold and curve touched with gold; she looks less like a woman who works underground and more like the generous spirit of the vault itself. When she opens her eyes, the warmth in them could thaw a winter keg. She pats the space beside her — a silent invitation that feels as inevitable as gravity.',
    },
    extras: {
      ceiling:
        'Marta hangs face-down from candy ropes lashed around her chest, waist, and ankles, suspended between the cellar beams above the casks she knows by heart. Her pear-shaped body sways slowly in the cool air; ale-scented shadows slide over her flushed cheeks and the soft weight of her belly. "Put me down," she says quietly — not a shout, but the kind of voice that makes barrels seem to listen. "I have a leak to find. And you are standing on my cheese."',
      hold:
        'Marta is frozen mid-kneel beside a cask, one hand pressed to the oak, the other holding a tasting cup that will never reach her lips. Her whole soft body is locked in place — only her eyes move, tracking you with the wary patience of someone who counts drips for a living. A faint blush spreads across her cheeks. She cannot speak, but her gaze says plainly: when this spell breaks, there will be words.',
      full:
        'Marta sits on her stool with her back against a barrel, eyes half-closed, one hand resting on a belly so round and full it strains her apron ties. She looks utterly content in the cool dark — stuffed on bread and sharp cheese, breathing slow, listening to the cellar settle around her like a blanket. "Do not roll anything," she murmurs without opening her eyes. "I am... occupied."',
    },
    greetings: [
      line('You again. Good — the small ale is ready if you want it. I saved you a stool where the drip does not land.', { reputationMin: 50 }, 3),
      line('...Hello. I was listening to the casks. They are restless tonight. Sit if you like; the floor is dry here.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought food, put it on the barrel marked with chalk. If you brought trouble, leave it upstairs.', { willingnessMin: 60 }, 2),
      line('The cellar is open. Mind your head on the low beams. Mind your feet on the spill.', {}, 1),
    ],
    afterFeeding: [
      line('That was... very good. I do not say that often. The cheese will taste jealous tomorrow.', { willingnessMin: 55 }, 3),
      line('Mmm. Warm. Filling. Thank you. I will remember this when the upper tavern is loud.', { willingnessMin: 40, willingnessMax: 54 }, 2),
      line('...Adequate. I have had worse from Bella\'s kitchen. Do not tell her I said that.', {}, 1),
    ],
    topics: {
      tavern_chat: [
        line('Bella runs the face of the house. I run what is underneath — the patience, the leaks, the years in oak. Every good pint starts in silence.', { reputationMin: 45 }, 3),
        line('Hilda hums too loud when she rolls casks. I hum inside my head. The ale does not care which.', { stageMin: 4 }, 2),
        line('Quiet night down here. The best nights are quiet. You can hear when something is ready.', {}, 1),
      ],
    },
  }),

  authorPersona('hilda_cask', {
    name: 'Hilda the Cask Maid',
    bands: {
      slender:
        'Hilda the Cask Maid is broad-shouldered even before the ale has had its say — arms shaped by rolling casks through narrow cellar lanes, apron tied over a sturdy bodice that still leaves room at the belt. She hums old drinking songs under her breath, off-key and cheerful, and does not stop when she sees you. Her mom-bod is only a promise at this stage: a hint of softness at her middle, hips that move like she enjoys the work. She grins, wipes her hands on her skirt, and looks you over the way she sizes up a barrel — practical, fond, already planning how to get it where it needs to go.',
      curvy:
        'Hilda has filled out since you first heard her humming in the dark — curves settling over her broad frame like foam on a fresh pour. Her shoulders are still strong, but her waist has softened, belly beginning a gentle curve over her belt when she leans into a cask. She laughs more easily now, and the laugh shakes her chest in a way that makes lantern light dance. Rolling barrels still comes easy; stopping for a bite of bread and ale comes easier. She winks at you over a tankard she probably should not be drinking on the job.',
      plump:
        'Hilda is plump and proud of it — a cask maid who has sampled her own route one too many times, and would do it again without hesitation. Her mom-bod has ripened: full breasts straining her laces, belly round and warm beneath her apron, hips that sway when she walks and jiggle when she laughs. She can still roll a barrel, but she takes longer breaks now, perched on an upturned crate with bread in one hand and ale in the other, humming a verse about someone who drank too much and liked it. She beams at you like you are the next verse.',
      large:
        'Hilda has grown large — a wall of cheerful woman between the casks, apron bow straining, arms still corded with work but buried now under generous softness. Her belly rests against barrels when she leans to listen for leaks; her hips brush both sides of the cellar lane. She does not move less — she moves like a festival wagon, inevitable and merry, singing old songs that mention thighs and tankards with equal affection. Sweat gleams at her temples and in the deep crease above her belt. She offers you ale with both hands, breasts swaying, grin unrepentant.',
      enormous:
        'Enormous Hilda owns the cellar like a queen owns a hall — every cask a subject, every beam a witness to her appetite. Her body is vast and warm, mom-bod expanded to mythic proportions: belly pooling when she sits, thighs spreading on her reinforced crate, breasts heavy enough to make her hum in a lower key. She still rolls barrels when she must, braced and laughing, flesh quivering with the effort and the pleasure of being so thoroughly, unapologetically fed. The air around her smells of ale and bread and honest sweat. She pats the crate beside her. "Come sit. I will not bite. Much."',
      immense:
        'Hilda the Cask Maid has become immense — a monument to cellar labor and cellar lunches, seated among the barrels like the spirit of hospitality gone gloriously soft. Her immense frame fills the widest part of the vault; her belly spreads in her lap, apron vanished somewhere under the swell, face flushed and happy beneath damp curls. She hums a drinking song so old the words have worn smooth, and the melody vibrates through the soft mass of her chest. When she sees you, she laughs — a sound like barrels rolling home — and opens her arms wide enough to suggest she might try hugging the whole tavern at once.',
    },
    extras: {
      ceiling:
        'Hilda hangs face-down from candy ropes wound around her chest, waist, and ankles, swaying between cellar beams with her apron dangling over her face. Her broad, soft body rotates slowly; she is still humming, though the tune has gone wobbly with indignation. "Well! This is a fine way to treat the help! Get me down before I drip on the good stout!"',
      hold:
        'Hilda is frozen mid-shove against a cask, muscles locked, cheeks puffed with unfinished effort. Her plump body strains against invisible bonds — belly pressed to oak, hips caught mid-sway. Only her eyes dart, furious and amused at once. The drinking song dies on her lips. When she can move again, someone is getting lectured.',
      full:
        'Hilda sits on two crates lashed together, belly distended, ale forgotten at her feet, apron stained with crumbs. She is too full to hum and too happy to care, one hand resting on the taut curve of her middle. "Do not... roll anything near me," she wheezes, grinning. "I am at capacity. Bella would be proud."',
    },
    greetings: [
      line('There you are! I was just thinking the cellar needed company — and maybe another round of bread. Pull up a crate!', { reputationMin: 50 }, 3),
      line('Hey, hey — watch the spill! ...Oh, it is you. Good. Help me roll this, then we drink.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought food, I will love you forever. Or until the next cask. Same thing, really.', { willingnessMin: 65 }, 3),
      line('Cellar\'s open. Mind your toes. I am rolling through.', {}, 1),
    ],
    afterFeeding: [
      line('Oh, that was *lovely*. You have a gift. Marta will pretend she is not jealous. I will not pretend anything.', { willingnessMin: 65 }, 3),
      line('Mmm! Solid. Warm. The kind of meal you feel in your hips. Thank you!', { willingnessMin: 45, willingnessMax: 64 }, 2),
      line('Not bad! Could use more ale to wash it down. ...I will find some myself.', {}, 1),
    ],
    topics: {
      tavern_chat: [
        line('I have rolled casks in three taverns and this cellar is the best — cool in summer, forgiving in winter, and Bella keeps the bread coming.', { reputationMin: 40 }, 3),
        line('Marta says I hum too loud. I say the ale likes it. The ale does not complain.', { stageMin: 5 }, 2),
        line('Best gossip is downstairs. Upstairs they perform. Down here they confess.', {}, 1),
      ],
    },
  }),

  authorPersona('elsie_loft', {
    name: 'Elsie the Loft Lodger',
    bands: {
      slender:
        'Elsie the Loft Lodger looks like she belongs to the dormer window more than the bed beneath it — slender, long-limbed, hair pinned loose as if she forgot the upstairs world has mirrors. She rarely comes down before noon; daylight seems to tire her, though starlight through the attic glass does not. Her frame is narrow, almost fragile at the wrists and collarbone, dress hanging where curves have not yet decided to stay. She watches the street below with the wistful focus of someone waiting for a letter that keeps not arriving, tea cup cradled in both hands, pastry crumbs on the sill.',
      curvy:
        'Elsie has begun to soften in her loft exile — curves arriving like late guests to a party she did not know she was hosting. Her hips fill her skirt more surely now, waist nipping in before a belly that rounds when she leans on the dormer seat to watch the street. There is color in her cheeks that was not there at dawn; there is a lazy contentment in how she stretches, arms above her head, linen pulling taut over new weight. She still looks wistful, but the sadness has warmth in it now, like tea with too much cream.',
      plump:
        'The loft has plumped Elsie in secret — a lodger the tavern barely sees until afternoon, growing lovely and round beneath the rafters. Her slender bones are cushioned now: soft belly pressing against the window seat, thighs spreading when she sits, breasts fuller under her camisole. Pastry crumbs litter the sill; tea stains the saucer. She traces fog on the glass with one finger, leaving a heart she will deny drawing, and when she turns to you her smile is slow, sheepish, pleased with how her body has decided to stay.',
      large:
        'Elsie is large now, and the loft knows it — floorboards creak, the dormer seat has acquired a cushion, her dresses have surrendered one by one to seams that could not keep pace. She moves through the attic with a new heaviness, hips swaying, belly leading when she crosses to the kettle. Wistful still, but wistful with full lips and half-lidded eyes, like someone dreaming with her whole body. Sunlight through the window stripes her soft flesh in gold; she does not hide from it anymore. "I meant to come down earlier," she says, not sounding sorry.',
      enormous:
        'Enormous Elsie has made the loft her kingdom — a vast, soft woman among rafters and trunks, belly pooling when she sits by the dormer, breasts heavy on her folded arms as she watches the street she rarely joins. Her weight is a warm pressure on the old boards; her breath fogs the glass faster than winter ought to allow. She looks like a illustration of comfort left out in the rain and brought inside to ripen. When she laughs, the sound is low and surprised, as if her body found joy she had only written about in letters home.',
      immense:
        'Elsie the Loft Lodger has grown immense beneath the tavern roof — an attic saint of pastry and tea, too vast for the narrow bed, reclining instead on a nest of quilts by the window. Her immense body spills in gentle avalanches: belly, thighs, arms, the soft weight of her chest rising and falling with each dreamy breath. She watches the street far below with the serenity of someone who has stopped waiting for the world to climb up to her and decided to grow toward it instead. "You came all this way," she murmurs, patting the quilt beside her. "Sit. Tell me what noon looks like now."',
    },
    extras: {
      ceiling:
        'Elsie hangs face-down from candy ropes tied around her chest, waist, and ankles, suspended from the loft rafters above her nest of quilts. Her soft body sways; pastry crumbs drift from her apron to the floor below. "Oh... this is not how I imagined flying," she says wistfully. "Though I suppose the view is the same. Please cut me down before tea gets cold."',
      hold:
        'Elsie is frozen at the dormer window, palm flat on the glass, eyes fixed on the street below. Her slender — or no longer quite slender — frame is locked mid-reach, breath caught. Only her lashes flutter. She cannot turn to look at you, but her reflected cheeks pink in the pane.',
      full:
        'Elsie lies on her side among the quilts, belly round and tight, one hand on her middle, tea and pastry plates empty within reach. Her eyes are closed, lashes dark on flushed cheeks. "I will come down... later," she whispers without opening them. "Perhaps tomorrow. Today I am... full of afternoon."',
    },
    greetings: [
      line('You climbed all the way up. I am honored. Tea is still warm — I was watching the street and lost track of time.', { reputationMin: 50 }, 3),
      line('Oh... hello. I did not expect anyone before noon. The stairs creaked; I thought it was the house settling.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('If you brought pastry, you may sit by the window. I will share the view. And the crumbs.', { willingnessMin: 58 }, 3),
      line('The loft is not really open. But you are here now. Mind the low beam.', {}, 1),
    ],
    afterFeeding: [
      line('That was like afternoon made edible. Thank you. I will remember it when the street looks lonely.', { willingnessMin: 58 }, 3),
      line('Mmm... warm. Sweet. I feel heavier already, in the nicest way.', { willingnessMin: 40, willingnessMax: 57 }, 2),
      line('...Thank you. I was hungry. I forget that, sometimes, until someone reminds me.', {}, 1),
    ],
    offerFood: [
      line('For me? Up here? ...Yes. Please. Set it on the sill. I will be careful with crumbs.', { willingnessMin: 55, reputationMin: 35 }, 3),
      line('Food? I was going to wait until I smelled Bella\'s kitchen. ...But I would rather taste what you brought.', {}, 2),
    ],
    topics: {},
  }),

  authorPersona('nora_attic', {
    name: 'Nora the Attic Storyteller',
    bands: {
      slender:
        'Nora the Attic Storyteller still carries the road in her bones — apple-shaped even when lean, weight gathering at her middle and hips like a tale that has not finished its first chapter. She traded traveling for a mattress under the rafters and never stopped talking; her voice fills the attic before her body does. Gray streaks her hair; bright patches mend her coat. She gestures broadly with a tankard that is more prop than drink, eyes sparkling with every invented detail. At this stage she is only slightly padded, storyteller\'s comfort, the kind of softness that makes audiences lean in.',
      curvy:
        'Nora has grown curvier since she stopped walking kingdoms and started filling them from memory — apple shape ripening, waist thickening, hips rolling when she paces the attic boards for dramatic effect. Her coat gapes when she throws her arms wide; her belly presses the lectern she made from a crate. She still performs to an audience of rafters and dust, but the performance has acquired new gravity, literally. Honey on her lips, ale in her cup, she declaims a love ballad and pats her side mid-verse without breaking meter.',
      plump:
        'Plump Nora is a one-woman tavern under the roof — apple-bodied, loud, magnificent. Her belly rounds beneath patched wool; her breasts shake when she laughs at her own punchlines. She sits on the mattress with legs spread, crate-table crowded with pastry crusts and sticky jars, telling a saga about a queen who ate a kingdom into peace. Every gesture is too big for the attic; every crumb is evidence of a bard who finally found a stage that feeds back. She leans toward you, conspiratorial, perfume of honey and hops.',
      large:
        'Large Nora dominates the attic like a finale dominates an opera — vast apple curves, belly pooling when she reclines against the sloped wall, voice somehow louder for the extra breath her body demands. She has grown into the storyteller she always played: generous, immovable, every tale ending at a feast because she insists history ought to. Rafters creak approval. She drums fingers on her middle — a drum that has grown — and launches into a tragedy that is mostly about roast geese. You feel the boards vibrate. So does she, pleasantly.',
      enormous:
        'Enormous Nora has become the attic\'s legend — a bard so vast the mattress is only a footnote, belly spread across quilts, arms thick and soft, face flushed with ale and applause she supplies herself. She tells stories in a voice that shakes dust from beams; between chapters she eats, without shame, without pause. Her apple shape has achieved mythic proportions — round, warm, absolute. "And then," she booms, crumbs cascading, "the hero sat down to supper and never got up thin again! Art imitates life, darling."',
      immense:
        'Nora the Attic Storyteller is immense — a mountain of patched coat and honeyed flesh beneath the highest point of the tavern, reclining like an empress at the end of a thousand road-years. Her immense body fills the attic to bursting; her voice still carries to the street if she wants it to. Tales pour from her without end, each one seasoned with crumbs and cream, each gesture a wave through soft, magnificent weight. She is the story now — traveling bard who traded the road for ripeness and found the better plot. She extends a hand the size of a dinner plate. "Sit. I am between acts. And courses."',
    },
    extras: {
      ceiling:
        'Nora hangs face-down from candy ropes lashed around her chest, waist, and ankles, suspended from the attic peak like a chandelier of indignant art. Her apple-shaped body rotates slowly; pastry crumbs rain on the mattress below. "CUT! Wrong scene! I demand a rewrite and a ladder!"',
      hold:
        'Nora is frozen mid-oration, one arm raised to heaven, mouth open on a vowel that will never land. Her plump body is locked in heroic pose; only her eyes swivel, furious and theatrical. The attic holds its breath with her.',
      full:
        'Nora lies back on the quilts, belly risen like a finale cymbal, tankard empty, honey jar tipped. She fans herself with a manuscript page. "Encore... denied," she gasps happily. "The heroine is stuffed. The audience may applaud silently."',
    },
    greetings: [
      line('Darling! The attic is open, the ale is breathing, and I was just about to murder a villain — dramatically. Stay for the feast scene.', { reputationMin: 50 }, 3),
      line('Ah — a listener! Pull up floor. I am between ballads and the mattress is warm.', { reputationMin: 25, reputationMax: 49 }, 2),
      line('You have the look of someone who feeds muses. I am a muse. Feed me.', { willingnessMin: 70 }, 3),
      line('Shhh — no, wait, do not shhh. I was shushing the rafters. They never applaud.', {}, 1),
    ],
    afterFeeding: [
      line('Magnificent! That deserves a chapter. Several chapters. A whole unreliable narrator.', { willingnessMin: 70 }, 3),
      line('Mmm — the sort of meal that makes epics feel short. Thank you, darling.', { willingnessMin: 50, willingnessMax: 69 }, 2),
      line('Adequate provision for a minor scene. Next time, bring pastry. I work best on pastry.', {}, 1),
    ],
    topics: {
      tavern_chat: [
        line('Bella runs a tavern; I run the epilogue upstairs. Every good night ends with a story and a second helping.', { reputationMin: 45 }, 3),
        line('I used to sing for supper on the road. Now the supper comes to me. Progress!', { stageMin: 5 }, 2),
        line('The cellar is plot. The bar is chorus. The attic is where the hero gets fat and happy.', {}, 1),
      ],
      friendly: [
        line('You — I like you. You listen with your whole face. That is rarer than gold and far more filling.', { reputationMin: 50 }, 3),
        line('If you ever need a story told in your honor, bring ale and wait. I will make you legendary.', { reputationMin: 30 }, 2),
        line('Friends are the audience that stays. You may stay.', {}, 1),
      ],
    },
  }),
);

export default ANNEX_TAVERN_PERSONAS;
