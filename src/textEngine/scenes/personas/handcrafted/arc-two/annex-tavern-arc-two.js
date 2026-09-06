/**
 * Arc-two relationship beats — Tavern annex (cellar, cask loft, attic).
 * The Squad — Lead: A7 Artisan | Support: A2 Psych, A5 Editor
 */
import { buildArcTwo, mergeArcTwo, arcLine, arcExamine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(
  buildArcTwo('marta_cellar', {
    examine: [
      arcExamine(
        'Marta sets down her tasting cup when she sees you and does not pick it up again. Her pear-shaped frame has softened in the cellar dark — hips wider, belly a gentle swell beneath the apron she retied twice today. She pats the stool beside her without looking away from your face. "Hilda says I never invite anyone. She is wrong. I am inviting you. Sit. The small ale is yours."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The cellar has learned your footsteps. Marta waits between the oldest casks with bread and sharp cheddar already cut, her plump body settled on the reinforced stool like she belongs to the oak. When you descend, she does not startle — she exhales, slow and warm, and slides the plate toward you with both hands. "Bella sends pastry sometimes. I send honesty. Eat. Tell me about upstairs. I will tell you what the barrels said."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Marta the Cellar Keeper has grown vast in the vault she rules — belly pooled in her lap, breasts heavy on her forearms, eyes the color of ale held to flame. She opens her arms when you enter, not theatrical, simply certain. "You kept coming back. So did I. Sit in my gravity awhile. Hilda will hum louder on purpose. Ignore her. This stool holds two if we are patient."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You again — good. I saved cheese and a story Hilda does not know yet. Sit where the drip does not land. That is still your spot.',
        { ...ARC.warming },
      ),
      arcLine(
        'The cellar is yours as much as mine now. Small ale, sharp cheddar, no performance. Just us and the casks listening.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That went somewhere warm. I will feel it tomorrow when Bella\'s kitchen smells jealous. Thank you for feeding what I hide downstairs.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm. Full. Honest. Like a cask finally tapped right. You may come back whenever the upper tavern gets loud. I will be here. Fed. Yours to find.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          'Hilda hums; I listen to oak breathe. Bella runs the face; Nora runs the epilogue upstairs. I run the patience underneath — and now I run a stool that saves your name in chalk.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('hilda_cask', {
    examine: [
      arcExamine(
        'Hilda rolls a cask aside with one broad shoulder and beams like you are the verse she was humming toward. Her mom-bod has ripened — belly rounding over her belt, hips swaying when she wipes her hands on her skirt. "There you are! Marta bet you would not come back this week. I bet pastry. Pull up a crate before I eat your share."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The cellar lane feels wider when Hilda makes room for you — she sits on two lashed crates, thighs spread, ale and bread between you like a treaty. Her plump frame still hums old drinking songs, but softer now, for an audience of one. She nudges your knee with hers. "Marta pretends she does not notice us down here. Nora would call it a subplot. I call it lunch. Stay."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Enormous Hilda owns the vault like a queen who rolled every barrel home herself — vast, merry, apron vanished under belly and breast, grin unrepentant. She opens both arms wide enough to suggest hugging the whole tavern, then settles for you. "You fed me. I fed you back in stories and ale. Fair trade. Sit in my lap if the crate creaks. I will not tell Bella. Much."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Hey — you! I was humming about you. Off-key, as usual. Help me roll this cask, then we eat what Marta pretends she did not save.',
        { ...ARC.warming },
      ),
      arcLine(
        'Cellar\'s better when you\'re in it. Crate\'s ready, ale\'s breathing, and I did not eat your bread yet. High praise from me.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh, that was lovely — the kind of meal you feel in your hips tomorrow. Marta will sniff and say nothing. I will say everything. Thank you.',
        { ...ARC.warming },
      ),
      arcLine(
        'Magnificent. Full as a festival wagon. You keep feeding me like that and I will roll casks for you forever. Or until nap. Whichever comes first.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          'Best gossip is downstairs with Marta pretending not to listen. Upstairs Bella performs; attic Nora declaims. Down here we confess and get softer. You fit the cellar now.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('elsie_loft', {
    examine: [
      arcExamine(
        'Elsie shifts on the dormer seat when you climb the last stair, pastry crumbs scattering like small stars. Her once-slender frame has softened — hips filling her skirt, belly a shy curve when she pulls her knees up to make room. She pats the quilt beside her without meeting your eyes for long. "You came up again. I was watching the street and thinking it looked lonelier than usual. Stay. Tell me what noon sounds like now."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The loft has learned your knock. Elsie keeps tea warm and a plate ready on the sill, her plump body nested among quilts she swears are only for cold nights. When you enter, she breathes out a laugh that shakes her new softness. "Nora says I should come downstairs. I say you come upstairs. Fairer trade. Sit. I saved the view — and a pastry with your name on it. Metaphorically."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Elsie the Loft Lodger has grown immense beneath the rafters — vast, dreamy, belly pooled among quilts, face flushed with afternoon she rarely shares. She reaches for your hand before you sit, fingers warm and certain. "You climbed all this way so many times. I stopped waiting for letters. I started waiting for you. Pat the quilt. There is room. Bella sends trays; you send yourself. I prefer you."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You climbed up. I noticed — the stairs creak differently when it is you. Tea is warm. Crumbs are honest. Sit by the window with me?',
        { ...ARC.warming },
      ),
      arcLine(
        'Oh... hello, you. The loft feels less like exile when you are here. I saved pastry and a corner of the quilt. Both are yours.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'That was like afternoon made edible. I feel heavier in the nicest way. I will remember it when the street looks lonely again.',
        { ...ARC.warming },
      ),
      arcLine(
        'Mmm. Full. Warm. Like tea with too much cream and no regrets. Stay until the light changes. I do not want to be wistful alone today.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      offer_food: [
        arcLine(
          'For me? Up here? ...Yes. Always yes from you. Set it on the sill — I will be careful with crumbs if you stay careful with my heart. Silly. Stay anyway.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),

  buildArcTwo('nora_attic', {
    examine: [
      arcExamine(
        'Nora sweeps crumbs from her crate-table with a dramatic flourish when you appear in the attic door. Her apple-shaped frame has ripened — belly rounding beneath patched wool, voice somehow warmer for the extra breath her body demands. She points a tankard like a scepter. "Darling! Act two required a listener. You are cast. Sit. The heroine is softer than last chapter and the feast scene is imminent."',
        { ...ARC.warming },
      ),
      arcExamine(
        'The attic boards know your weight now. Nora reclines against the sloped wall with honey jar and ale within reach, plump curves settled like a finale resting between acts. She grabs your sleeve with theatrical tenderness. "Elsie watches the street. I watch souls. Yours keeps returning — excellent pacing. Stay for the ballad where the bard gets fed and does not apologize."',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Nora the Attic Storyteller has become the legend she always performed — immense, apple-bodied, belly spread across quilts, voice shaking dust from rafters with affection aimed squarely at you. She opens arms wide as a dinner plate. "You fed the muse. The muse feeds you stories that end at supper and never thin. Sit. I am between acts, courses, and modesty. All three lost. Good."',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Ah — my favorite audience! Pull up floor. I was murdering a villain and praising a roast. You arrive at the feast scene. Applaud or feed me. Preferably both.',
        { ...ARC.warming },
      ),
      arcLine(
        'Darling! The attic is open, the ale is breathing, and I saved the line where the hero chooses bread over glory. It was easy. Sit.',
        { ...ARC.bonded },
      ),
    ],
    afterFeeding: [
      arcLine(
        'Magnificent provision! That deserves a chapter — several. I feel epically stuffed and creatively dangerous. Thank you, listener.',
        { ...ARC.warming },
      ),
      arcLine(
        'Sublime. The sort of meal that makes unreliable narrators honest. I will put you in the saga. Fat, happy, and credited by name. Always.',
        { ...ARC.culmination },
      ),
    ],
    topics: {
      tavern_chat: [
        arcLine(
          'Bella runs the chorus; Marta runs the plot in oak; Elsie runs wistful in the loft. I run the epilogue where everyone gets fed. You are in the cast now, darling. Permanent billing.',
          { ...ARC.bonded },
        ),
      ],
      friendly: [
        arcLine(
          'Friends are the audience that stays — you stayed through ballads, crumbs, and belly growth. I like you with my whole generous chest. Rare review. Deserved.',
          { ...ARC.bonded },
        ),
      ],
    },
  }),
);
