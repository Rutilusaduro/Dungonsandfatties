/**
 * Spell Scene Modules
 * Rich, cohesive scene descriptions for spell casting and effects
 * These are referenced via spell.scene.X module keys, not spell.effect.X
 */

export function registerSpellModules(engine) {

  // ─────────────────────────────────────────────
  // ERUPTING EARTH
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.erupting_earth', [
    {
      when: { isRestrained: 1 },
      text: 'The earth buckles and EXPLODES beneath the helpless target. Mountains of food erupt upward—roasted haunches of meat, golden-crusted loaves, cream-filled pastries—and cascade directly down onto her immobile form. Buried to the shoulders in edible abundance, her body automatically consumes what it can reach. She cannot dodge. She cannot turn away. She can only swallow.',
    },
    {
      when: { stage: { min: 7 } },
      text: 'The ground cracks open in a thunderclap of conjured abundance! Waves of food blast upward—whole roasted animals, enormous loaves, shimmering pastries glazed with magic. The already-enormous target disappears entirely beneath the cascade, buried under a mountain of glorious sustenance. The sheer weight of it holds her down as her body, overwhelmed, consumes and consumes.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'The earth heaves and splits with a tremendous crack! Plumes of conjured food explode upward in a glorious cascade—roasted chickens, golden breads, gleaming pastries, and rich cream pies scatter across the area. The target staggers as the eruption engulfs her, food raining down from every angle, the smell alone thick enough to make her mouth water against her will.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'The soil shimmers once—then explodes upward in a spectacular spray of conjured food! Fruits, breads, roasted meats, and sweets erupt like a geyser and rain down across the area. The target is immediately covered—food piling onto her shoulders, arms, filling the space around her ankles. The aroma is impossible to resist.',
    },
  ]);

  // ─────────────────────────────────────────────
  // HOLD PERSON
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.hold_person', [
    {
      when: { stage: { min: 8 } },
      text: 'A translucent shell of magical force snaps into place around the target. Her immense frame strains against it—gravity alone would drag her down—but the spell holds with iron certainty. Every muscle is locked. Every joint is frozen. She breathes in shallow, rapid bursts, eyes wide and terrified. She cannot move. She cannot fight. She can only feel... and swallow.',
    },
    {
      when: { stage: { min: 4, max: 7 } },
      text: 'Magical force crystallizes around the target like invisible glass. One moment she was moving; the next she is a statue—arms locked mid-gesture, legs rooted to the spot, mouth open in a silent gasp. Her eyes dart wildly. She tries to struggle. Nothing responds. She is completely, utterly paralyzed—only her breathing continues, and her throat still works.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'The air around the target shimmers and snaps tight. She freezes instantly—caught mid-step, mid-breath, mid-expression—locked in an invisible cage of magical force. Panic flickers in her eyes as she realizes she cannot move even a finger. Her throat bobs once, reflexively. That still works. Everything else is gone.',
    },
  ]);

  // ─────────────────────────────────────────────
  // FIREBALL (Roasting Abundance variant)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.fireball', [
    {
      when: { isRestrained: 1 },
      text: 'You point and a streak of magical fire arcs directly at the immobilized target. But instead of burning her, the flame erupts into a FEAST—perfectly roasted meats, crackling and golden, materialize around her in an avalanche of delicious heat. Smoke curls upward, rich with the scent of herbs and rendered fat. She cannot escape. She cannot turn away from the smell. Her body, starved by magical compulsion, begins to consume what it can reach.',
    },
    {
      when: { stage: { min: 7 } },
      text: 'The fireball screams across the air and detonates in a spectacular display—not of destruction, but of *abundance*. The blast radius fills instantly with perfectly roasted whole animals, cauldrons of stew, and towers of pastry. The target—already immense—is engulfed in the fragrant wave. The hunger compulsion radiates outward: any creature in the blast must eat or feel as though they are starving. The roasted food smells impossibly good. Irresistibly good.',
    },
    {
      when: { stage: { min: 3, max: 6 } },
      text: 'A bright streak flashes from your finger and blooms into a roaring burst—not of flame, but of magically roasted food. Sizzling haunches of meat, crackling-skinned birds, and fragrant loaves of bread explode outward from the center. Every creature in the radius catches the scent simultaneously and feels an almost physical *ache* to eat. The food is impossibly good—piping hot, perfectly seasoned, ready.',
    },
    {
      when: { stage: { max: 2 } },
      text: 'The spell streaks forward and detonates with a warm, rich explosion. Instead of fire, roasted meats and golden pastries scatter across the area. The smell hits first—smoky, buttery, overwhelmingly delicious. Anyone nearby feels an immediate pang of hunger, a compulsion to consume. The food steams in the air. It would be almost rude not to eat it.',
    },
  ]);

  // ─────────────────────────────────────────────
  // CREATE FOOD AND WATER
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.create_food_and_water', [
    {
      when: { stage: { min: 5 } },
      text: 'You shape the conjuration and food *manifests*—not as a few scraps but as a proper feast. Platters of roasted meat gleaming with rendered fat, towers of cream-filled pastries, bowls of rich stew fragrant with herbs. The food shimmers with magical vitality. It is somehow more than real food—more filling, more satisfying, impossibly caloric. It persists indefinitely, patient and waiting.',
    },
    {
      when: {},
      text: 'The conjuration completes and food simply *appears*—as if it had always been there. Plates of warm bread, sliced meats, cheeses, pastries, all suffused with a faint magical shimmer that makes them look impossibly appetizing. They don\'t spoil. They don\'t diminish. They simply wait to be eaten.',
    },
  ]);

  // ─────────────────────────────────────────────
  // POLYMORPH
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.polymorph', [
    {
      when: { stage: { min: 6 } },
      text: 'Transformation ripples through the target\'s already-considerable form. Her body *surges*—expanding, reshaping, spine curving, limbs thickening—as the beast-form overtakes her. Her clothing tears away as her new shape asserts itself. Whatever beast she becomes, it is large—very large—and immediately, visibly *hungry*. Her eyes, though changed, still hold a flicker of recognition. Her stomach growls loud enough to shake the air.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: 'The target\'s body ripples like water as the transformation surges through her. She gasps—then the gasp deepens into a groan as she grows, her form reshaping into something larger, denser, hungrier. The beast-form she takes is heavy and powerful, and it arrives starving. Her new mouth opens. Her new tongue moves. One thought dominates the animal mind: eat.',
    },
    {
      when: { stage: { max: 2 } },
      text: 'The target\'s form shudders once—then transforms. Her body swells, reshapes, her human features softening into something bestial. The growth is sudden and disorienting. Whatever she becomes is immediately and urgently hungry in a way she has never felt before. The beast brain has simple priorities. Food is the first.',
    },
  ]);

  // ─────────────────────────────────────────────
  // RAPID DIGESTION
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.rapid_digestion', [
    {
      when: { stage: { min: 8 } },
      text: 'You direct the spell at the target\'s belly and something *accelerates* inside her. Her stomach clenches, gurgles loudly—once, twice—then works with magical speed, processing everything within in seconds. Her eyes go wide as she feels the weight of it converting instantly: every bite she\'d eaten, every ounce of stored food, transmuted to solid mass in a heartbeat. Then—satiation. Deep, absolute, almost painful satiation. She couldn\'t eat another bite if her life depended on it. That\'s the trap.',
    },
    {
      when: { stage: { min: 4, max: 7 } },
      text: 'The magic courses through the target\'s digestive system like lightning. Her stomach gurgles with tremendous urgency as the acceleration takes hold—food processing in seconds instead of hours. She doubles forward slightly, hands flying to her belly, feeling the conversion happen in real time. Then it stops, and the satiation hits like a wall. She is completely, overpoweringly full. She would need a dispel to eat another morsel.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'The spell finds its mark. The target grabs her stomach instinctively as it churns and gurgles loudly—an unseemly sound, loud enough for bystanders to notice. Food processes at magical speed. What would take hours takes seconds. She gasps as the fullness settles in—heavy, immediate, inescapable. Her appetite is gone. Thoroughly, completely gone. Until a dispel removes it.',
    },
  ]);

  // ─────────────────────────────────────────────
  // FLESH TO FOOD
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.flesh_to_food', [
    {
      when: { stage: { min: 5 } },
      text: 'The transmutation lands and the creature *becomes food*. Not gradually, not painfully—it simply shimmers once, then is replaced by an enormous pile of perfectly prepared portions. The smell is immediate and rich. What was a living beast is now a feast, every cut perfectly trimmed, perfectly fresh, radiating the warmth of magic-preserved cooking. The yield is staggering.',
    },
    {
      when: {},
      text: 'The creature flickers—a shimmer of transmutation—and then it is gone, replaced by perfectly prepared food portions. The transformation is instantaneous and thorough. Nothing is wasted. The portions are fresh, fragrant, impossibly well-prepared. A clean magical conversion: beast to feast.',
    },
  ]);

  // ─────────────────────────────────────────────
  // HASTE (Metabolic variant)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.haste', [
    {
      when: { stage: { min: 6 } },
      text: 'Metabolic acceleration floods through the target. Her eyes light up—a peculiar manic energy—as she begins to move faster, eat faster, her hands reaching for food with accelerating urgency. But the magic has altered the math: she burns almost nothing. Every bite she takes goes straight to mass. Her enormous form shifts as she feeds at double speed with half the burn rate. The numbers are not in her favor.',
    },
    {
      when: {},
      text: 'The acceleration spell takes hold of the target\'s metabolism, but routes around the muscles and into the gut. She doesn\'t move faster—she *eats* faster, her movements at mealtimes suddenly twice as quick, driven by a hunger that doesn\'t diminish. But her burn rate has been halved. The math is brutal: double consumption, half the calories burned. Whatever she eats, she keeps.',
    },
  ]);

  // ─────────────────────────────────────────────
  // DUPLICATION
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.duplication', [
    {
      when: {},
      text: 'You focus the conjuration on your target and the magic *copies*. A shimmer spreads across the object\'s surface—then a perfect double materializes beside it. They are identical in every measurable way: same weight, same smell, same magical vitality. If it was food before, it is food now—twice. The duplicates persist. They don\'t fade. They don\'t spoil.',
    },
  ]);

  // ─────────────────────────────────────────────
  // RAVENOUS EXPANSION
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.ravenous_expansion', [
    {
      when: { stage: { min: 7 } },
      text: 'The expansion magic strikes and something deep inside the target *stretches*. Her already-immense stomach swells further, capacity doubling as magical tissue accommodation takes hold. But the hunger that floods in alongside it is worse—a raving, desperate ache that her rational mind cannot override. Her hands are already moving toward food before she\'s finished processing what happened. She needs to eat. She *needs* to.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'The spell hits and the target exhales sharply as her stomach expands—not uncomfortable, just sudden. The capacity floods in and with it comes the hunger: immediate, overwhelming, animal in its urgency. She grabs at her midsection, feeling the new space, and feels the desperate need to fill it. Her willingness to resist has collapsed. She is ravenous. She will eat whatever is available.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'The magic hits the target\'s belly and she doubles slightly, gasping as her stomach swells to accommodate twice its normal volume. A wave of hunger crashes through her—not metaphorical hunger, but a genuine, driving, animal need that she has never felt before. Her eyes are wide. Her hands shake. She needs food. Now.',
    },
  ]);

  // ─────────────────────────────────────────────
  // CONFECTION SNARE — Option-specific scenes
  // ─────────────────────────────────────────────

  // Option 1: Restraint Bonds
  engine.registerModule('spell.scene.confection_snare.restraint_bonds', [
    {
      when: { stage: { min: 7 } },
      text: 'Thick licorice ropes erupt from the floor and coil around the target with terrifying speed. They wrap her wrists behind her back, lash her ankles together, and cinch a wide band around her torso—straining against the sheer volume of her to find purchase. The candy hardens almost immediately. The smell of anise and sugar fills the air. She struggles against the bonds, but they tighten in response, sticky and unyielding. She isn\'t going anywhere.',
    },
    {
      when: { stage: { min: 3, max: 6 } },
      text: 'Candy vines shoot from the ground and wrap around the target\'s wrists and ankles before she can react. The licorice is stronger than it looks—the bonds tighten as she pulls against them, leaving dark smears of sugar on her skin. A third vine coils around her waist and anchors her to the floor. She is completely, sweetly, inescapably immobilized.',
    },
    {
      when: { stage: { max: 2 } },
      text: 'Slender licorice vines whip around the target\'s wrists and cross behind her back, lashing her arms together with a snap. More coil around her ankles. The candy is sticky—it clings to everything it touches and tightens under tension. She struggles and finds the bonds only pull tighter. The anise smell is overwhelming at this range.',
    },
  ]);

  // Option 2: Ceiling Suspension
  engine.registerModule('spell.scene.confection_snare.ceiling_suspension', [
    {
      when: { stage: { min: 7 } },
      text: 'The licorice vines surge upward—but they find their limit. They wrap around the target\'s wrists and haul upward with tremendous force, but her weight is too great. The candy ropes creak, stretch, snap taut—and then *tear*. She doesn\'t rise. The vines are not strong enough to lift her. They crumble to sugar fragments at her feet. The spell has failed under the weight of her gravity.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'Licorice vines shoot from the ground, coil around the target\'s wrists, and *pull*—hoisting her upward with surprising force. She rises, feet leaving the floor, dangling from candy ropes anchored to the ceiling beams. She kicks and writhes but the vines hold, creaking but intact. Strands fray slightly under the strain. She swings helplessly, suspended, completely at your mercy.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'Licorice vines erupt and catch the target\'s wrists in a single fluid motion, then haul her skyward. She rises fast, gasping as her feet leave the ground. The ropes anchor to the ceiling and hold firm—she hangs suspended, swinging slightly, unable to find purchase. The candy smells sickly sweet this close to her face. She tries to pull free and only swings.',
    },
  ]);

  // Option 3: Forced Feeding
  engine.registerModule('spell.scene.confection_snare.forced_feeding', [
    {
      when: { stage: { min: 6 } },
      text: 'The licorice vines target her mouth with surgical precision. A thick rope of candy pushes between her lips, forcing them apart, before beginning to pump food directly down her throat—thick, sweet, dense, impossibly caloric. She gags, she chokes, her eyes water—but the vines don\'t stop. They cannot be bitten through. They don\'t fatigue. The food flows in a steady, relentless stream, and her body, overwhelmed, has no choice but to swallow.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: 'A licorice vine coils around the target\'s jaw and forces her mouth open. She tries to pull away, to close her teeth, to spit—and the vine responds by tightening, keeping her mouth wide as a second vine begins pushing food directly into her. It\'s sweet and dense and she can\'t spit it out fast enough. The vine works faster than she can resist. She swallows reflexively, again and again, her eyes wide and horrified.',
    },
    {
      when: { stage: { max: 2 } },
      text: 'The candy vines move with alarming speed, coiling around the target\'s head and forcing her mouth open with surprising strength. She makes a muffled sound of protest before the first wave of food is pushed past her lips. The vine pumps steadily. Her throat works involuntarily. She has to swallow or choke, and the vine gives her no pause to choose.',
    },
  ]);

  // Option 4: Mouth Suction
  engine.registerModule('spell.scene.confection_snare.mouth_suction', [
    {
      when: { stage: { min: 6 } },
      text: 'The licorice vines converge around the target\'s mouth, creating a grotesque suction seal. Everything within reach—food, loose items—begins to slide toward her. She thrashes against it, but the suction is relentless, drawing things inexorably toward and into her. Objects don\'t just approach—they *disappear* into her. Her body accepts what the spell forces into it whether she consents or not.',
    },
    {
      when: {},
      text: 'The candy vines form a collar around the target\'s neck and jaw, and suddenly the air itself seems to pull toward her mouth. Food items nearby slide along the floor, drawn by unseen suction. They reach her—and they go in. Smaller items vanish entirely. The target can\'t stop it. The vines direct the flow, and she provides the consumption.',
    },
  ]);

  // Option 5: Sticky Entanglement
  engine.registerModule('spell.scene.confection_snare.sticky_entanglement', [
    {
      when: { stage: { min: 6 } },
      text: 'The candy vines explode into a web of sticky entanglement—wrapping around the target from every direction simultaneously, coating her arms, legs, torso in thick adhesive licorice and taffy. Each strand that touches her sticks and holds. She\'s wrapped in layer after layer, her movements growing slower as the candy hardens. The smell is thick and sweet. She is coated, bound, and thoroughly immobilized.',
    },
    {
      when: {},
      text: 'Candy vines spiral around the target, coating her in sticky licorice and taffy. Every move she makes entangles her further—the adhesive bonds multiply as she struggles. Her arms are pressed against her sides. Her legs are bound together. The candy hardens slightly as the seconds pass, and with each hardening, she becomes more immovably stuck.',
    },
  ]);


  // ─────────────────────────────────────────────
  // WEIGHT GAIN NARRATION
  // Used as supplementary narration appended to spell scenes
  // ─────────────────────────────────────────────
  engine.registerPool('spell.weight_gain', [
    {
      when: { stage: { min: 10 } },
      text: 'Her already-immense form somehow expands further still—defying comprehension, growing beyond what the eye can comfortably track.',
      weight: 2,
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'Her prodigious size swells to even greater proportions, flesh filling in with magical speed.',
      weight: 2,
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'Her form balloons outward in real time, rounding and expanding with unnatural speed.',
      weight: 2,
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'She visibly gains weight—her body softening, filling out, her silhouette rounding noticeably.',
      weight: 2,
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'She grows somewhat rounder, the change visible to anyone watching.',
      weight: 2,
    },
    {
      when: { stage: { max: 1 } },
      text: 'She gains a noticeable amount of weight, her figure softening slightly.',
      weight: 2,
    },
  ]);


  // ─────────────────────────────────────────────
  // SPELL INTERACTIONS — Combined effect narration
  // ─────────────────────────────────────────────

  engine.registerModule('spell.interaction.hold_person.erupting_earth', [
    {
      when: {},
      text: 'The paralyzed target cannot dodge, cannot duck, cannot even turn away. The food eruption buries her completely—and her locked body begins consuming it automatically, helpless against her own swallowing reflex.',
    },
  ]);

  engine.registerModule('spell.interaction.rapid_digestion.hold_person', [
    {
      when: {},
      text: 'Satiated and paralyzed—she is completely helpless. Her stomach has been cleared, but the satiation lingers. She is trapped in fullness she cannot eat through, held still by magic she cannot fight.',
    },
  ]);

  engine.registerModule('spell.interaction.fireball.hold_person', [
    {
      when: {},
      text: 'Roasted food rains down on the paralyzed target. She cannot move. She cannot resist. The magical hunger compulsion from the blast demands consumption, and her body—still capable of swallowing—obliges.',
    },
  ]);

  engine.registerModule('spell.interaction.polymorph.erupting_earth', [
    {
      when: {},
      text: 'The transformed beast\'s greatly enlarged form provides more surface area for the food eruption to coat. Its animal appetite, already elevated, drives it to consume the bounty with single-minded urgency.',
    },
  ]);

  engine.registerModule('spell.interaction.hold_person.confection_snare', [
    {
      when: {},
      text: 'Paralyzed and now bound in candy—doubly secured by magic and licorice. She cannot fight either. She cannot fight both. She can only endure whatever comes next.',
    },
  ]);

  engine.registerModule('spell.interaction.confection_snare.erupting_earth', [
    {
      when: {},
      text: 'Bound by candy vines, she cannot escape the food eruption. The cascade buries her to the neck, licorice bonds still holding firm beneath the pile. She is thoroughly, helplessly covered.',
    },
  ]);

}

export default registerSpellModules;
