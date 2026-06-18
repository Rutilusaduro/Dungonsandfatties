// ═══════════════════════════════════════════════════════════════
// GROWTH LEXICON — body-type-specific weight-gain prose pools
// Ported from GameDev/src/textEngine/growthLexiconData.js
// {subject.first} → {subject.name} (NPC names are "Role Name", not single names)
// ═══════════════════════════════════════════════════════════════

const BELLY_TEXTS = [
  "{subject.name}'s stomach began to swell outward in soft, heavy rolls, pushing against her waistband as it steadily grew rounder and fuller.",
  "Weight gathered rapidly around {subject.name}'s middle, her once-flat belly rounding out into a thick, protruding gut that hung heavily over her hips.",
  "{subject.name}'s midsection thickened noticeably with every passing minute, soft fat folding into deep rolls that pressed against her arms when she sat.",
  "A heavy, sagging belly formed quickly on {subject.name}, the skin stretching and then softening as it grew outward in a thick, rounded apron.",
  "{subject.name}'s waist disappeared beneath layers of plush, jiggly fat that accumulated around her middle in soft, heavy folds.",
  "{subject.name}'s lower belly surged forward, swelling into a large, overhanging gut that swayed gently with every step she took.",
  "Soft, dense fat packed itself around {subject.name}'s core, turning her midsection into a thick, rounded mass that pressed against her clothing.",
  "{subject.name}'s stomach grew heavier and rounder by the hour, developing a prominent overhang that rested against her thighs when she sat down.",
  "Weight settled rapidly into {subject.name}'s midsection, her belly expanding outward in soft, doughy rolls that jiggled with even small movements.",
  "{subject.name}'s once-slender waist thickened dramatically, swallowed by a heavy, protruding gut that dominated her silhouette.",
  "Fat gathered quickly around {subject.name}'s stomach, creating a thick, sagging belly that hung low and heavy over her waistband.",
  "{subject.name}'s midsection ballooned outward steadily, the skin growing taut before relaxing into plush, folding rolls of soft fat.",
  "A large, rounded belly formed rapidly on {subject.name}, pressing outward and downward as it grew heavier and more pronounced with each passing moment.",
  "{subject.name}'s stomach swelled outward in waves of soft, jiggly fat, forming thick rolls that stacked over one another around her middle.",
  "Weight accumulated quickly in {subject.name}'s core, turning her midsection into a heavy, protruding gut that shifted and swayed when she moved.",
  "{subject.name}'s belly grew steadily rounder and fuller, developing a thick overhang that rested heavily against her lower body.",
  "Soft fat built up rapidly around {subject.name}'s waist, creating deep creases and rolls that pressed together whenever she bent or sat.",
  "{subject.name}'s midsection expanded outward in a heavy, rounded mass, the skin stretching and then softening into plush, doughy folds.",
  "A thick, sagging belly formed quickly on {subject.name}, hanging lower and heavier as more weight settled into her core.",
  "{subject.name}'s stomach grew round and prominent, pushing outward in soft, jiggly waves that became more pronounced with every hour.",
  "Weight gathered heavily around {subject.name}'s middle, her once-flat stomach swelling into a large, overhanging gut that dominated her frame.",
  "{subject.name}'s belly thickened and rounded steadily, developing deep rolls that folded over one another as it grew heavier and more pronounced.",
  "A heavy, protruding stomach formed rapidly on {subject.name}, resting against her thighs and swaying gently with each step she took.",
  "Fat accumulated quickly in {subject.name}'s midsection, turning her waist into a thick, soft mass of plush, jiggling rolls.",
];

const PEAR_TEXTS = [
  "{subject.name}'s hips widened steadily, her thighs growing thick and soft as they pressed together more firmly with every step.",
  "Weight settled heavily into {subject.name}'s lower body, her ass swelling outward in thick, jiggling cheeks while her thighs grew plush and heavy.",
  "{subject.name}'s thighs thickened rapidly, becoming so soft and full that they rubbed together constantly, dimpling with each movement.",
  "{subject.name}'s hips spread outward dramatically, creating a pronounced pear shape as thick, plush fat accumulated around her lower half.",
  "A heavy, wobbling ass formed quickly on {subject.name}, the cheeks growing rounder and fuller as they swayed heavily with every step she took.",
  "{subject.name}'s lower body expanded steadily, her thighs becoming thick and heavy while her hips widened into a dramatic, exaggerated shape.",
  "Soft, dense fat built up rapidly in {subject.name}'s hips and thighs, causing them to press together thickly even when she stood with her feet apart.",
  "{subject.name}'s ass grew heavier and rounder by the hour, the cheeks becoming so plush that they jiggled visibly with every movement.",
  "{subject.name}'s thighs swelled outward in thick, soft waves, becoming so full that they brushed against each other with every step.",
  "Weight gathered heavily in {subject.name}'s lower body, her hips widening dramatically while her thighs grew thick, plush, and constantly touching.",
  "{subject.name}'s ass ballooned outward in heavy, wobbling cheeks, the fat so thick and soft that it shifted and jiggled with every movement.",
  "{subject.name}'s lower half grew steadily heavier, her thighs becoming so thick and full that they dimpled deeply when she sat down.",
  "A thick, plush ass formed rapidly on {subject.name}, the cheeks growing so heavy that they dragged slightly and swayed with every step.",
  "{subject.name}'s hips widened significantly as soft, jiggly fat accumulated around them, creating a dramatic pear-shaped silhouette.",
  "{subject.name}'s thighs grew so thick and soft that they pressed together firmly, the fat spilling over one another when she crossed her legs.",
  "Weight settled rapidly into {subject.name}'s lower body, her ass swelling outward in heavy, round cheeks that jiggled with every movement.",
  "{subject.name}'s lower half expanded steadily, her hips and thighs growing thick and plush as fat accumulated heavily in both areas.",
  "A heavy, wobbling ass formed quickly on {subject.name}, the cheeks so thick and soft that they shifted and bounced with even small movements.",
  "{subject.name}'s thighs thickened dramatically, becoming so full and plush that they rubbed together constantly and dimpled with every step.",
  "{subject.name}'s hips spread outward as thick, soft fat built up rapidly around them, creating a pronounced and exaggerated lower body.",
  "{subject.name}'s ass grew heavier and rounder with every passing hour, the cheeks becoming so plush that they jiggled visibly when she walked.",
  "Weight gathered quickly in {subject.name}'s lower half, her thighs swelling outward in thick, soft waves that pressed together with every movement.",
  "A thick, heavy ass formed steadily on {subject.name}, the cheeks growing so full and soft that they swayed heavily with each step she took.",
  "{subject.name}'s lower body ballooned outward in plush, jiggling waves as fat accumulated heavily in her hips, ass, and thighs.",
];

const HOURGLASS_TEXTS = [
  "{subject.name}'s curves swelled in tandem, her breasts growing heavy and full while her hips and thighs thickened dramatically into an exaggerated hourglass.",
  "Weight gathered rapidly in both {subject.name}'s upper and lower body, her bust and hips expanding together into a striking, voluptuous hourglass shape.",
  "{subject.name}'s breasts and hips ballooned outward in perfect proportion, creating a dramatic hourglass silhouette as thick, plush fat accumulated in both areas.",
  "{subject.name}'s figure transformed steadily into an extreme hourglass, her bust swelling heavily while her hips and thighs grew thick and soft.",
  "Soft, dense fat built up quickly in {subject.name}'s curves, her breasts growing heavier and rounder while her hips widened dramatically.",
  "{subject.name}'s upper and lower body expanded in tandem, her bust and hips swelling into a pronounced, eye-catching hourglass shape.",
  "{subject.name}'s breasts grew heavy and full as her hips and thighs thickened rapidly, resulting in a dramatic and exaggerated hourglass figure.",
  "Weight settled into {subject.name}'s natural curves, her bust and lower body swelling in perfect sync into a voluptuous, dramatic hourglass.",
  "{subject.name}'s figure became strikingly hourglass as her breasts swelled outward while her hips and thighs thickened into plush, heavy curves.",
  "{subject.name}'s bust and hips expanded dramatically together, creating a pronounced hourglass shape with heavy, plush proportions in both areas.",
  "Soft fat accumulated quickly in {subject.name}'s curves, her breasts growing round and heavy while her hips widened into a dramatic hourglass silhouette.",
  "{subject.name}'s upper and lower body ballooned outward in perfect proportion, transforming her into an exaggerated, voluptuous hourglass.",
  "{subject.name}'s breasts swelled heavily as her hips and thighs thickened rapidly, creating a striking and dramatic hourglass figure.",
  "Weight gathered in {subject.name}'s natural curves, her bust and lower body expanding together into a pronounced and eye-catching hourglass shape.",
  "{subject.name}'s figure transformed steadily as her breasts grew fuller and her hips widened dramatically, resulting in an extreme hourglass silhouette.",
  "{subject.name}'s bust and hips swelled in tandem, thick, plush fat building rapidly in both areas and creating a dramatic hourglass shape.",
  "{subject.name}'s breasts grew heavy and round while her hips and thighs thickened dramatically, forming a striking and exaggerated hourglass figure.",
  "Soft, dense fat accumulated quickly in {subject.name}'s curves, her upper and lower body swelling together into a pronounced, voluptuous hourglass.",
  "{subject.name}'s figure became dramatically hourglass as her breasts swelled outward and her hips widened into thick, plush curves.",
  "Weight settled rapidly into {subject.name}'s natural curves, her bust and hips expanding in perfect sync into an extreme hourglass shape.",
  "{subject.name}'s breasts and lower body ballooned outward together, creating a striking hourglass silhouette with heavy, plush proportions.",
  "{subject.name}'s upper and lower body expanded dramatically, her bust growing heavy while her hips and thighs thickened into a pronounced hourglass figure.",
  "Soft fat built up quickly in {subject.name}'s curves, transforming her into an exaggerated hourglass with heavy breasts and thick, plush hips and thighs.",
  "{subject.name}'s figure transformed steadily into a dramatic hourglass as her breasts swelled and her hips widened dramatically in perfect proportion.",
];

const MOM_BOD_TEXTS = [
  "{subject.name}'s belly softened and rounded steadily, developing a gentle but noticeable overhang that rested against her waistband as it grew heavier.",
  "Soft fat gathered quickly around {subject.name}'s midsection, her stomach becoming plush and slightly sagging as it filled out into a warm, rounded shape.",
  "{subject.name}'s hips widened gradually while her belly grew soft and full, creating a natural, motherly silhouette that felt both comforting and heavy.",
  "{subject.name}'s breasts grew heavier and fuller, resting lower against her softening belly as weight settled into her upper body as well.",
  "A thick, doughy layer of fat formed steadily across {subject.name}'s stomach, her once-firmer midsection becoming soft and gently protruding.",
  "{subject.name}'s lower belly swelled outward in a soft, warm roll that hung slightly over her waistband, growing heavier with every passing hour.",
  "{subject.name}'s thighs thickened steadily, becoming soft and plush as they began to press together more noticeably when she walked or sat.",
  "Weight gathered in {subject.name}'s midsection, turning her stomach into a soft, rounded belly that jiggled gently with movement.",
  "{subject.name}'s body took on a heavier, softer shape as fat settled warmly around her stomach, hips, and thighs in a natural, nurturing way.",
  "{subject.name}'s belly grew steadily rounder and fuller, developing a gentle overhang that rested against her lap when she sat down.",
  "Soft, dense fat built up around {subject.name}'s core, her stomach becoming plush and slightly sagging as it expanded outward.",
  "{subject.name}'s hips and lower belly widened together, creating a soft, motherly figure with a noticeable, warm belly that hung gently.",
  "{subject.name}'s breasts grew heavier and rested lower as her stomach softened and rounded out beneath them.",
  "A thick, soft layer of fat formed across {subject.name}'s midsection, her belly becoming rounder and heavier with each passing hour.",
  "{subject.name}'s thighs grew plush and full, rubbing together softly as weight settled heavily into her lower body.",
  "{subject.name}'s stomach swelled steadily outward in a warm, rounded shape, developing a gentle but noticeable overhang.",
  "Weight gathered quickly around {subject.name}'s middle, turning her once-firmer belly into a soft, doughy mass that jiggled when she moved.",
  "{subject.name}'s lower belly grew heavier and rounder, resting against her thighs and creating a soft, comforting silhouette.",
  "{subject.name}'s body softened overall as fat accumulated steadily in her stomach, hips, and thighs, giving her a heavier, more nurturing shape.",
  "A warm, rounded belly formed steadily on {subject.name}, hanging slightly and shifting gently with every step she took.",
  "{subject.name}'s midsection thickened and softened, developing deep, plush rolls that folded gently over one another.",
  "{subject.name}'s hips widened as her belly grew soft and full, creating a natural, motherly figure with heavy, comforting curves.",
  "Soft fat built up rapidly around {subject.name}'s core, her stomach becoming round and heavy as it pressed outward against her clothing.",
  "{subject.name}'s body grew steadily heavier and softer, her belly developing a gentle overhang while her thighs and hips thickened with plush fat.",
];

const VOLUPTUOUS_TEXTS = [
  "{subject.name}'s curves swelled dramatically, her breasts growing heavy and full while her hips and thighs thickened into exaggerated, plush proportions.",
  "Weight gathered rapidly in {subject.name}'s bust and lower body, her figure becoming strikingly voluptuous as thick, soft fat accumulated in all the right places.",
  "{subject.name}'s breasts ballooned outward, growing heavier and rounder while her hips widened dramatically into thick, jiggling curves.",
  "{subject.name}'s thighs thickened into heavy, plush masses that pressed together thickly, while her ass swelled outward in large, wobbling cheeks.",
  "{subject.name}'s figure transformed into an extreme hourglass as her bust and hips expanded rapidly in perfect, exaggerated proportion.",
  "Soft, dense fat built up quickly in {subject.name}'s curves, her breasts growing heavy and her hips widening into dramatic, eye-catching proportions.",
  "{subject.name}'s ass swelled outward in thick, heavy cheeks that jiggled and swayed with every movement as her thighs grew plush and full.",
  "{subject.name}'s breasts grew dramatically heavier and rounder, resting lower against her body as her hips and thighs thickened substantially.",
  "{subject.name}'s lower body expanded dramatically, her hips and thighs becoming thick, soft, and constantly pressing together while her ass grew heavy and round.",
  "{subject.name}'s figure became strikingly voluptuous as her bust swelled and her hips widened into exaggerated, plush curves.",
  "Weight settled rapidly into {subject.name}'s natural curves, her breasts and lower body ballooning outward into a dramatic, sensual hourglass shape.",
  "{subject.name}'s thighs grew so thick and soft that they jiggled visibly with every step, while her ass swelled into heavy, wobbling cheeks.",
  "{subject.name}'s breasts grew heavy and full as her hips and thighs thickened dramatically, creating an exaggerated and eye-catching silhouette.",
  "{subject.name}'s figure transformed steadily into an extreme hourglass, her bust and hips swelling in perfect, voluptuous proportion.",
  "Soft fat accumulated quickly in {subject.name}'s curves, her breasts growing round and heavy while her ass and thighs became thick and plush.",
  "{subject.name}'s lower body ballooned outward in thick, jiggling waves, her hips widening dramatically as her ass grew heavy and round.",
  "{subject.name}'s breasts swelled heavily and rested lower as her hips and thighs thickened into exaggerated, sensual curves.",
  "{subject.name}'s figure became dramatically voluptuous as her bust and lower body expanded rapidly in perfect, exaggerated harmony.",
  "{subject.name}'s ass grew so heavy and round that it swayed noticeably with every step, while her thighs thickened into plush, jiggling masses.",
  "Weight gathered quickly in {subject.name}'s natural curves, transforming her into an extreme hourglass with heavy breasts and thick, plush hips and thighs.",
  "{subject.name}'s breasts grew dramatically fuller and heavier as her hips widened and her thighs thickened into exaggerated, sensual proportions.",
  "{subject.name}'s lower body expanded rapidly, her ass swelling into thick, wobbling cheeks while her thighs grew heavy and constantly touching.",
  "{subject.name}'s figure transformed into a striking, exaggerated hourglass as soft, dense fat built up quickly in her bust and lower body.",
  "{subject.name}'s curves ballooned outward dramatically, her breasts growing heavy and round while her hips and thighs thickened into plush, eye-catching proportions.",
];

const TOP_HEAVY_TEXTS = [
  "{subject.name}'s breasts swelled outward rapidly, growing heavy and full while her upper body thickened ahead of the rest of her frame.",
  "Weight gathered quickly in {subject.name}'s chest, her bust ballooning into dramatic, plush proportions that strained every seam.",
  "{subject.name}'s breasts grew heavier and rounder by the hour, resting lower as soft fat accumulated across her upper body.",
  "{subject.name}'s bust expanded dramatically, thick plush fat building in her chest while her belly softened beneath the new weight.",
  "{subject.name}'s upper body surged forward in soft, heavy waves — breasts leading, fullness following.",
  "{subject.name}'s chest thickened visibly, her breasts growing so full that they dominated her silhouette from the first step.",
];

const DEFAULT_TEXTS = [
  "{subject.name}'s middle softened and rounded, fat settling in visible inches around her waist.",
  "Weight accumulated quickly across {subject.name}'s frame, her stomach swelling into a thicker, heavier curve.",
  "{subject.name}'s body thickened steadily, softness gathering where the gain landed fastest.",
];

export function registerGrowthLexicon(engine) {
  // Per-body-type prose pools — anti-repetition rotation built in
  engine.registerPool('word.growth.belly', [{ when: {}, text: BELLY_TEXTS }]);
  engine.registerPool('word.growth.apple', [{ when: {}, text: BELLY_TEXTS }]);
  engine.registerPool('word.growth.rotund', [{ when: {}, text: BELLY_TEXTS }]);
  engine.registerPool('word.growth.pear', [{ when: {}, text: PEAR_TEXTS }]);
  engine.registerPool('word.growth.hourglass', [{ when: {}, text: HOURGLASS_TEXTS }]);
  engine.registerPool('word.growth.mom_bod', [{ when: {}, text: MOM_BOD_TEXTS }]);
  engine.registerPool('word.growth.voluptuous', [{ when: {}, text: VOLUPTUOUS_TEXTS }]);
  engine.registerPool('word.growth.fertility_goddess', [{ when: {}, text: VOLUPTUOUS_TEXTS }]);
  engine.registerPool('word.growth.topHeavy', [{ when: {}, text: TOP_HEAVY_TEXTS }]);
  engine.registerPool('word.growth.straight', [{ when: {}, text: DEFAULT_TEXTS }]);
  engine.registerPool('word.growth.athletic', [{ when: {}, text: DEFAULT_TEXTS }]);
  engine.registerPool('word.growth.default', [{ when: {}, text: DEFAULT_TEXTS }]);

  // Dispatcher: best-match by bodyType → correct per-body-type pool
  engine.registerModule('word.growth', [
    { when: { bodyType: 'apple' },             text: '{word.growth.apple}' },
    { when: { bodyType: 'rotund' },            text: '{word.growth.rotund}' },
    { when: { bodyType: 'pear' },              text: '{word.growth.pear}' },
    { when: { bodyType: 'hourglass' },         text: '{word.growth.hourglass}' },
    { when: { bodyType: 'mom_bod' },           text: '{word.growth.mom_bod}' },
    { when: { bodyType: 'voluptuous' },        text: '{word.growth.voluptuous}' },
    { when: { bodyType: 'fertility_goddess' }, text: '{word.growth.fertility_goddess}' },
    { when: { bodyType: 'topHeavy' },          text: '{word.growth.topHeavy}' },
    { when: { bodyType: 'straight' },          text: '{word.growth.straight}' },
    { when: { bodyType: 'athletic' },          text: '{word.growth.athletic}' },
    { when: {} ,                               text: '{word.growth.default}' },
  ]);
}
