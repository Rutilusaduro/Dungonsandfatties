/**
 * Temple district — second-pass arc variants (relationship progression).
 * The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
 */
import { buildArcTwo, mergeArcTwo, arcExamine, arcLine, ARC } from '../../authorArcTwo.js';

export default mergeArcTwo(

  buildArcTwo('hope_pilgrim', {
    examine: [
      arcExamine(
        'Hope greets you at the steps with pamphlets stacked like white bread — still radiant, still faithful, but her habit tells a story Patrice has been writing in soup. Warmth lives in her face now, in the way her belt has surrendered notch by notch. Margaret would call it honesty. Hope calls it arrival.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Hope has become a hearth on the temple steps — plush, serene, habit reworked into something between vestment and banner. Pilgrims still find pamphlets in her hands and sunlight in her smile, but they also find a woman who sits between blessings now, belly rounded and rising slow, thighs spread comfortable on the lowest stone. When Margaret preaches abundance from the shrine door, Hope is the proof walking. Patrice ladles; Hope receives; faith and appetite finally agree.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Hope the Pilgrim Guide fills the steps like a living altar — immense, radiant, distributing blessings from a chair because descent takes breath she spends gladly on pilgrims instead. Her wimple cannot contain the roundness of her joy; flesh rolls soft and devout with each slow gesture of benediction. Travelers whisper that the guide who once ran on faith alone now runs on Patrice\'s pot and Margaret\'s sermons both. Hope only laughs, low and warm, and saves you the pamphlet with the hymn on the back.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Friend — I was just telling a traveler about the hostel stew. Patrice says hunger is honest; Margaret says shame is the sin. I believe them both now. Sit with me?',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Blessings. The steps are warm, the shrine is warmer, and I find I am warmest when someone remembers I eat too.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Oh... that was kindness itself. I preached abundance for years before I let Patrice prove it on me. You answered the sermon with action. My body remembers every word.',
        { ...ARC.bonded, willingnessMin: 60 },
        3,
      ),
      arcLine(
        'Thank you. Margaret says fed souls praise louder. I am testing the theory — in spirit, and otherwise.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      friendly: [
        arcLine(
          'Faith is not the opposite of appetite — Margaret taught me that in the shrine, Patrice taught me at the ladle. Hope distributes both now. Pilgrims ask about my belt as often as the altar. I tell them growth can be devotion.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('serene_pilgrim', {
    examine: [
      arcExamine(
        'Serene sprawls on her hostel cot with boots finally off and shawl loose — road-weariness still in her feet, but appetite has declared truce with the pilgrimage. Cheeks hold color Patrice coaxed out of soup; hips round beneath blankets that no longer close. She stretches and you hear the cot creak differently now, weighted with rest instead of miles. Hope worries she eats before noon. Serene has stopped caring.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Serene is languid and large on a cot far too small for her — shawl abandoned, flesh spilling warm over the edge in sleepy folds. The weary pilgrim remains in her patience, her kindness, but weariness wears a soft shape now, a body that rests because it has enough to rest on. Margaret\'s blessings drift through the lattice; Patrice\'s pot steams from the kitchen. Serene receives both with closed eyes and open palms.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Serene the Weary Pilgrim has become truly immense — immobile on a reinforced cot, a mountain of soft flesh wrapped in hostel blankets, face round and peaceful beneath tangled hair. She cannot rise without help and does not seem to mind. The boots that wore through a thousand miles sit by the bed like relics of a thinner life. Hope brings pamphlets; Patrice brings soup; Serene brings gratitude heavy enough to sink the mattress.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Oh — hello. I was deciding between nap and Patrice\'s second ladle. You look like someone who understands that pilgrimage includes dessert.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Quiet, please. My boots are off and my appetite is finally on. Hope worries. I am too full to worry back.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Mmm. That felt like arrival — warmer than any temple step. Thank you. I will sleep heavy tonight, and Margaret\'s morning hymn will find me honest.',
        { ...ARC.bonded, willingnessMin: 60 },
        3,
      ),
      arcLine(
        'Good. Warm. I needed that more than another mile. Do not tell Hope I ate before noon. She will sermon at me.',
        { ...ARC.warming },
        2,
      ),
    ],
    offerFood: [
      arcLine(
        'For me? Oh, don\'t tempt — ...all right, tempt. Patrice already ruined my fasting. You may finish the job. Put it here.',
        { ...ARC.bonded, willingnessMin: 65 },
        3,
      ),
    ],
  }),

  buildArcTwo('wick_candle', {
    examine: [
      arcExamine(
        'Wick kneels among the lower lamps at dawn, tapers raised, habit adjusted at a waist that no longer lies flat. Soot still stripes her sleeves; soup stains join them now — Patrice\'s bread and Margaret\'s tea both leaving marks devotion never hid. She trims wicks with ritual precision, yet pauses more often to breathe, to rest a hand on a middle that catches candlelight like another flame. Pilgrims say the candle bearer burns brighter since she started eating. Wick does not deny it.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Wick has grown large and luminous on the temple steps — habit straining across a heavy bust and deeper belly, flesh shifting with each slow procession of flame. She still greets dawn with tapers raised, but dawn greets back a different woman: broad, soft, radiant with heat and weight. When Margaret preaches hunger as honesty, Wick hears it in the crackle of wicks and the groan of her belt.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Wick the Candle Bearer fills the steps like a living lamp — monumental, wax-scented, habit reworked into draped panels, flesh spilling soft and serene in every direction. She lights the dawn from a chair now, tapers held aloft by arms plush enough to tremble with effort. Margaret\'s sermon rises behind her; Patrice\'s steam rises from the hostel. Wick stands between them, fed, holy, impossibly bright.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'Peace at first light. I was trimming the upper wicks — slower now, since Patrice\'s soup and Margaret\'s sermons both insist I pause. You are welcome in the pause.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Careful of the tapers. And of commenting on my habit — Patrice\'s ladle moved it two notches this month alone.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Warm. Like swallowing a candle without the pain — only the glow. Margaret says fed voices carry. I will test that at the vigil.',
        { ...ARC.bonded, willingnessMin: 55 },
        3,
      ),
      arcLine(
        '...Good. My hands are steadier when I am fed. The flames notice. Patrice noticed first.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      temple_sermon: [
        arcLine(
          'Margaret says hunger is honest. I trim wicks until they burn clean — bodies are similar. Patrice feeds; Margaret blesses; I carry the light between them. Starve either and the shrine falters.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('hymn_choir', {
    examine: [
      arcExamine(
        'Hymn stands in the choir loft with sheet music against a chest that has grown impossible to ignore — low notes still warm, still filling the shrine before Margaret speaks, but now her body insists on harmony too. Surplice adjusted at the seams; honey cakes from Patrice\'s kitchen leave crumbs on the rail. When she breathes for the hymn, flesh shifts soft and visible, hourglass deepened by hostel soup and sermons on abundance.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Hymn is large and resonant in the loft — surplice straining across a heavy bust and deep belly, every note traveling through soft flesh before it reaches the pews. Margaret calls it harmony; Hymn calls it honesty. She still sings hunger so the priestess can answer it; lately she sings fullness too, low and plush, vibrating through a middle that rises and falls like a tide beneath the rail.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Hymn the Choir Alto fills the loft like a second organ — monumental, draped in fabric that surrendered to curves, every inch soft and singing. She performs from a reinforced chair now, voice rolling through a body too vast for the stairs. Margaret\'s sermon below; Patrice\'s pastries upstairs. The shrine has never sounded warmer; neither has she.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        'You caught me between verses — and between Patrice\'s honey cakes. Good timing. The loft echoes nicer when I am not hollow.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Hello. Speak softly or sing along. I am in a mood for harmony and whatever Margaret\'s table sent up.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        'Mmm. That sat in my chest like a perfect fifth — warm, round, settling. Margaret says fed voices praise louder. I believe her now.',
        { ...ARC.bonded, willingnessMin: 58 },
        3,
      ),
      arcLine(
        'Sweet. Literally or otherwise — I am not complaining. My alto runs deeper on a full stomach. Patrice runs a persuasive kitchen.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      temple_sermon: [
        arcLine(
          'Margaret preaches abundance. I provide the undertone — the note you feel in your ribs before you understand the words. Patrice feeds the ribs. Fair division of labor between hostel and shrine.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

  buildArcTwo('myrrh_incense', {
    examine: [
      arcExamine(
        'Myrrh tends the confession brazier with downcast eyes and steady hands — incense still perfumes her, myrrh and resin and quiet, but Patrice\'s tea has joined the palette. Her pear shape has ripened beneath the habit: fuller hips, softer arms, a middle that presses against linen when she leans to listen through the lattice. Sins arrive as smoke; fullness smells like bread and myrrh mixed, and she wears both without comment.',
        { ...ARC.warming },
      ),
      arcExamine(
        'Myrrh has grown large and fragrant at the brazier — habit straining across a heavy bust and deep belly, flesh shifting when she kneels to rake coals. Margaret\'s voice carries through the shrine; confessors whisper through the lattice and sometimes forget their sins, distracted by the soft sound of her breathing. Myrrh does not mind. Silence is also a sacrament — and so, she has learned, is Patrice\'s pastry.',
        { ...ARC.bonded },
      ),
      arcExamine(
        'Myrrh the Incense Keeper is monumental beside the confession lattice — pear-shaped, peaceful, habit reworked into draped panels, every inch soft and scented. She tends the brazier from a wide chair, censer in hands that tremble only from weight. Sins rise as smoke; they mingle with warmth Margaret preached and Patrice ladled. The shrine smells of myrrh and honey and something deeply content.',
        { ...ARC.culmination },
      ),
    ],
    greetings: [
      arcLine(
        '...Peace. I was stirring the coals. Margaret says speak your appetite aloud. I hear it through the lattice instead. You may speak — I listen better after Patrice\'s tea.',
        { ...ARC.bonded },
        3,
      ),
      arcLine(
        'Hello. Quietly, if you can. The smoke listens. ...So do I, better when I have eaten.',
        { ...ARC.warming },
        2,
      ),
    ],
    afterFeeding: [
      arcLine(
        '...Warm. Like resin melting — slow, sweet, settling into every corner. Margaret would call it honest. I call it thank you.',
        { ...ARC.bonded, willingnessMin: 50 },
        3,
      ),
      arcLine(
        'That was... good. I do not say much. But I mean it. Patrice means it louder.',
        { ...ARC.warming },
        2,
      ),
    ],
    topics: {
      temple_sermon: [
        arcLine(
          'Margaret says speak your appetite aloud. I hear it through the lattice — sins and hunger both smell similar if you tend the coals long enough. Patrice answers what Margaret names. I witness both.',
          { ...ARC.bonded },
          3,
        ),
      ],
    },
  }),

);
