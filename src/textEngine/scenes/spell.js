/**
 * Spell Scene Modules
 * Rich, cohesive scene descriptions for spell casting and effects
 * These are referenced via spell.scene.X module keys, not spell.effect.X
 */

export function registerSpellModules(engine) {

  // ─────────────────────────────────────────────
  // PRESTIDIGITATION (Level 0)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.prestidigitation', [
    {
      when: {},
      text: [
        'A flicker of minor magic dances from your fingertips — a tiny spark, a passing scent of warm bread, a cooling breeze across a heated plate. The effect is small. But everything starts somewhere.',
        'Your fingers trace a brief gesture and magic obliges: a moment of sensory indulgence, conjured from nothing. A hint of sugar on the air. A warmth where there was none.',
        'The spell is minor — a cantrip, a trick — but the effect lands perfectly. The air carries a sudden sweetness, just enough to make whoever is nearby think very hard about food.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // ENLARGE PERSON (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.enlarge_person', [
    {
      when: { isRestrained: 1 },
      text: 'The enlargement spell pulses through the immobilized target. Her body responds with a surge — clothes pulling tight, seams straining, her frame swelling dramatically larger in every direction. She cannot step back. Cannot retreat. Cannot do anything but grow, held in place as she expands into the space around her. The restraints creak and strain against her new size. Her eyes are wide with something between panic and awe.',
    },
    {
      when: { stage: { min: 6 } },
      text: 'Magic rolls through {subject.name}\'s already-considerable form like a tide. She grows — and grows — surging outward and upward in a cascade of expanding flesh. Her clothing surrenders first, seams splitting one after another as she rises to fill the room. She is enormous. She is *more* enormous. The floor groans under the redistribution of weight. She looks down at herself with wide eyes.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: 'The spell takes hold and {subject.name}\'s body surges. She gasps as she rises — taller, broader, her curves becoming something more than curves. Her clothing strains against the growth, buttons pulling at the stitching, fabric stretching across softness that was not there a moment ago. When the spell settles, she is noticeably larger in every dimension. She looks down at herself in stunned silence.',
    },
    {
      when: { stage: { max: 2 } },
      text: 'Transmutation magic ripples through {subject.name} and she simply *grows*. The change is swift and undeniable — she rises a foot, broadens across the shoulders and hips, her slight frame swelling into something softer and more substantial. Her clothes pull tight, then tighter. She looks down at herself slowly, blinking, as if she does not quite recognize what she is looking at.',
    },
  ]);

  // ─────────────────────────────────────────────
  // REDUCE PERSON (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.reduce_person', [
    {
      when: { stage: { min: 6 } },
      text: 'The reduction magic hits {subject.name} and she *contracts* — rapidly, visibly, her substantial frame collapsing inward like a sail losing its wind. She drops in height, narrows across the hips, her presence diminishing as the spell does its work. Her clothes hang loose where moments ago they strained. She looks smaller. She looks stunned. She looks, for the first time in a long while, almost slight.',
    },
    {
      when: {},
      text: 'The spell settles over {subject.name} and she shrinks — not dramatically, but unmistakably. A few inches of height, a narrowing at the shoulders and waist. Her clothing loses its tension and droops around a suddenly smaller frame. She holds her own hands up and stares at them as if checking whether they still belong to her.',
    },
  ]);

  // ─────────────────────────────────────────────
  // SHAPE EARTH (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.shape_earth', [
    {
      when: {},
      text: [
        'You press your will into the earth and it *obeys*. Stone and soil flow like clay, reshaping with a grinding sound into the form you envision. When the magic settles, something new stands where rough stone once was — functional, smooth-edged, and perfectly proportioned.',
        'The ground trembles softly as transmutation magic flows from your hands into the earth. Soil and stone yield to your intent, pressing and folding until the new form is complete. The magic leaves it cool to the touch, clean-edged, and ready.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // SHAPE WOOD (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.shape_wood', [
    {
      when: {},
      text: [
        'You lay your hands on the wood and magic flows through the grain. The timber creaks and shifts — not breaking, but *bending* — reforming itself under your intent. When the spell releases, the wood holds its new shape as firmly as if it had always grown that way.',
        'The wood moves under your spell like something alive — grain flowing, joints reshaping, the whole form yielding to the magic. It settles into its new shape with a final, satisfied creak.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // CREATE WATER (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.create_water', [
    {
      when: {},
      text: [
        'You shape the conjuration and water *appears* — cold, clean, and utterly without explanation. It fills whatever vessel awaits it with a gentle rush, catching the light in ripples. Perfectly fresh. Perfectly real.',
        'The spell completes and liquid materializes from nothing, pouring gently downward in a clean, steady stream. It collects without spilling, bright and cold and inexplicably satisfying to look at.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // OOZING ABUNDANCE (Level 2)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.oozing_abundance', [
    {
      when: { stage: { min: 5 } },
      text: 'The arrow of condensed nutrition streaks through the air and *splashes* across {subject.name}\'s broad form with a thick, wet impact. The ooze spreads immediately — coating her skin, her clothing, flowing into every curve — rich and warm and impossibly caloric. Her body absorbs it faster than she can register. She looks down at herself in dazed confusion as the warmth spreads through her.',
    },
    {
      when: {},
      text: 'A streak of shimmering, thick ooze arcs from your hand and strikes {subject.name} with a wet smack. It clings immediately, coating her in a layer of dense, sweet-smelling nutritive slick. She tries to wipe it away but it is already soaking in, warm and heavy and thoroughly coating whatever it touches.',
    },
  ]);

  // ─────────────────────────────────────────────
  // FEAST OF SHADOWS (Level 2)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.feast_of_shadows', [
    {
      when: { willingness: { min: 60 } },
      text: 'The illusory feast materializes in front of {subject.name} with startling vividness — roasted meats steaming, pastries gleaming, the whole spread radiating warmth and a scent that is almost aggressively real. She stares for only a moment before reaching out. The food responds to her touch. It *tastes* like food. For every purpose that matters to her body, it *is* food.',
    },
    {
      when: {},
      text: 'Phantom food shimmers into existence — a full spread, gleaming with illusory perfection. It looks real. It smells real. When {subject.name} reaches out and touches it, it feels real. The illusion is so thorough that her body responds as though every bite were genuine, digesting what was never truly there.',
    },
  ]);

  // ─────────────────────────────────────────────
  // MORPH MASS (Level 2)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.morph_mass', [
    {
      when: { stage: { min: 5 } },
      text: 'The dark transmutation pulses outward from your hands and finds {subject.name}\'s considerable form. She feels it immediately — a pull, a pressure, the air and stone and matter around her drawn inward and *absorbed*. Her body takes on weight that was not hers. Density shifts through her like a tide coming in. She is, abruptly and undeniably, heavier.',
    },
    {
      when: {},
      text: 'Matter answers the dark compulsion in your spell. It flows — stone dust, earth, the molecular weight of the air itself — drawn inward through {subject.name}\'s skin as though her body were a drain. She staggers slightly as the new weight settles into her, a look of bewilderment crossing her face.',
    },
  ]);

  // ─────────────────────────────────────────────
  // GREASE (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.grease', [
    {
      when: {},
      text: [
        'A sheen of thick, slippery grease erupts across the target area — translucent, glistening, and deeply unfriendly to anyone trying to keep their footing. The smell is rich, almost edible. Whatever surface it coats becomes immediately treacherous.',
        'The spell deposits a generous layer of conjured grease with a sound like something very wet landing very hard. It coats everything in the area in a smooth, slick film that catches the light and resists every attempt to stand on it.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // DELIGHTFUL TRANSMUTATION (Level 2)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.delightful_transmutation', [
    {
      when: {},
      text: [
        'The transmutation spell ripples through the liquid and water becomes something else entirely. The change is visible — a shimmer, a subtle thickening, a shift in color from clear to rich — and the smell arrives a moment later. Creamy, sweet, impossibly indulgent. Whatever was plain water a moment ago is now something significantly more caloric.',
        'You direct the spell and the water answers. Its molecular structure reorders with a shimmer, the liquid thickening and sweetening as the magic takes hold. It sets into a lush, creamy form that holds its shape even in the open air. It does not melt. It does not diminish. It simply waits, perfect and patient, to be consumed.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // SUGGESTION (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.suggestion', [
    {
      when: { willingness: { min: 70 } },
      text: 'The enchantment is almost unnecessary — {subject.name} was already looking at the food. The spell just... clarifies things. Her resistance softens. Her hesitation dissolves. She reaches forward with the calm certainty of someone doing exactly what she wanted to do anyway, and begins to eat.',
    },
    {
      when: { willingness: { min: 40, max: 69 } },
      text: 'The suggestion settles over {subject.name} like a comfortable warmth. She blinks once — and some tension leaves her face. Whatever reluctance she carried a moment ago now seems distant and unimportant. She looks at the food. She considers. She reaches out.',
    },
    {
      when: {},
      text: 'The enchantment reaches {subject.name} and finds its purchase. A subtle shift — her brow unfurrows, her posture loosens, the set of her mouth becomes more agreeable. She does not look controlled. She looks persuaded. There is a difference, and she would insist upon it, even now.',
    },
  ]);

  // ─────────────────────────────────────────────
  // DETECT CRAVINGS (Level 1)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.detect_cravings', [
    {
      when: {},
      text: [
        'Your divination reaches out and finds {subject.name}\'s appetite like a compass finding north. The information arrives not as words but as impressions — textures, smells, the ghost of flavors she has not had in years and desperately wants. You understand what she wants, precisely and completely.',
        'The spell extends your senses past the visible and into something deeper. {subject.name}\'s cravings register like warmth — specific, undeniable, deeply personal. You know, with the certainty of magic, exactly what she wants to eat.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // CONJURE FOOD (Level 2)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.conjure_food', [
    {
      when: { stage: { min: 5 } },
      text: 'The conjuration completes and food simply *arrives* — rich, generous portions that seem scaled to the appetite of someone who genuinely needs a serious meal. Plates of roasted meat, towers of pastry, bowls of cream. The smell radiates outward in a warm wave. It is more than enough. It is exactly right.',
    },
    {
      when: {},
      text: [
        'Food materializes from a point of shimmering air — plate after plate of warm, appetizing portions appearing in sequence. Each one lands with a gentle certainty, as if it had always been waiting to exist here, in this exact moment.',
        'The conjuration answers your spell and food *appears*. Not dramatically — no flash of light, no fanfare — just presence where there was absence before. Warm, real, and perfectly suited to the moment.',
      ],
    },
  ]);

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

  engine.registerModule('spell.scene.culinary_transmutation', [
    {
      when: {},
      text: 'Transmutation rolls through the object and rewrites its purpose. Wood, iron, barrel staves, chair legs, and polish lose their old certainty, softening into edible abundance with a warm, impossible smell. What was furniture a moment ago is now food, portioned and waiting.',
    },
  ]);

  engine.registerModule('spell.scene.summon_cattle', [
    {
      when: {},
      text: 'The air folds open with a low, barn-warm shimmer, and cattle step into the world as if led from some conjured pasture. They are solid, heavy, breathing creatures, immediately changing the weight and appetite of the room.',
    },
  ]);

  engine.registerModule('spell.scene.goodberry', [
    {
      when: {},
      text: 'A cluster of small magical berries appears in your hand, glossy and jewel-bright. They look harmless, almost delicate, but each one is dense with nourishment and quiet magical potency.',
    },
  ]);

  engine.registerModule('spell.scene.plant_growth', [
    {
      when: {},
      text: 'Green magic pulses outward and every edible plant nearby answers at once. Vines thicken, fruit swells, leaves unfurl, and the area fills with sudden ripe abundance, as though a full harvest has been compressed into a single breath.',
    },
  ]);

  engine.registerModule('spell.scene.slow', [
    {
      when: { isRestrained: 1 },
      text: 'Slow magic settles into {subject.name} while she is already held. Her struggles lose speed and force, each movement dragging behind intention. Even her breathing seems heavier, more economical, as the spell makes resistance expensive.',
    },
    {
      when: {},
      text: 'The transmutation catches {subject.name} and drags the tempo out of her body. Movement becomes sluggish, reactions delayed, and her metabolism seems to bank its fires low, keeping more of what she takes in.',
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
      text: 'Thick licorice vines lash from the ceiling, coiling around the target\'s chest, waist, and ankles before snapping taut. They haul upward with tremendous force, hoisting her horizontally into the air—suspended facing downward like a person laid flat but held ten feet up. But her weight is too great. The candy ropes creak, stretch, groan with the strain—and then *tear*. She crashes down, the vines crumbling to sugar fragments beneath her. The spell has failed under the weight of her gravity.',
    },
    {
      when: { stage: { min: 4, max: 6 } },
      text: 'Licorice vines shoot from the ceiling with precision, wrapping firmly around the target\'s chest, waist, and ankles. With a sudden jerk, they haul her upward—not vertical, but *horizontal*, suspended facing downward like she\'s laying flat in the air, held by the candy bonds anchored to the ceiling beams. She gasps and struggles but the vines hold strong, creaking slightly but intact. She\'s suspended helplessly, completely at your mercy, her body stretched out horizontally in the air.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'Licorice vines erupt from the ceiling and catch the target\'s chest, waist, and ankles in one fluid motion, snapping tight before hauling her skyward—but not upright. Instead, she\'s pulled into a horizontal suspension, facing downward, her body stretched out as if laying flat but held in the air by candy bonds. The vines anchor her firmly. She gasps at the sudden elevation, suspended helplessly in an utterly vulnerable position, unable to escape.',
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

  // Weight gain while suspended from ceiling
  engine.registerPool('spell.weight_gain.suspended', [
    {
      when: { stage: { min: 10 } },
      text: 'Her already-massive form balloons further, her belly and sides expanding downward with tremendous force, the licorice bonds creaking dangerously under the mounting strain. She sways heavily in her suspension, the bonds pulling tight as gravity reasserts itself.',
      weight: 2,
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'Her body swells enormously, expanding in all directions as she hangs suspended. Her belly presses hard downward against the licorice bonds, the vines groaning audibly with the new weight. She hangs lower, pulled by her own growing mass.',
      weight: 2,
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'Her form expands visibly while suspended, her belly swelling downward and pressing heavily against the candy bonds. The licorice creaks and strains. She sways with the shift in her weight, suspended lower than before.',
      weight: 2,
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'She gains weight while hanging suspended, her expanding belly drooping downward and pressing against the candy bonds. The licorice strains with the added mass, and she sinks slightly lower in her suspension.',
      weight: 2,
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'Her belly rounds and expands noticeably even as she hangs. Her growing weight pulls downward against the licorice bonds, which creak softly in protest.',
      weight: 2,
    },
    {
      when: { stage: { max: 1 } },
      text: 'Her body softens and fills out while suspended, her belly descending slightly as the added weight tests the bonds.',
      weight: 2,
    },
  ]);


  // ─────────────────────────────────────────────
  // ON-CONDITIONED — any spell cast on a target already under a prior
  // condition. Pool, weighted by specificity; weaves in {body.desc} so the
  // size class shows through (a restrained thin girl vs a restrained SSBBW).
  // ─────────────────────────────────────────────
  engine.registerPool('spell.on_conditioned', [
    { when: { suspended: 1 },
      text: 'Suspended and helpless — {body.desc} — she can do nothing but receive it.', weight: 3 },
    { when: { restrainedBy: 'hold_person' },
      text: 'Still paralyzed where she stands — {body.desc} — she cannot resist so much as a flinch.', weight: 3 },
    { when: { restraintMaterial: 'candy' },
      text: 'Still bound in licorice — {body.desc} — the sweet candy holds her fast through all of it.', weight: 3 },
    { when: { buried: 1 },
      text: 'Already half-buried — {body.desc} — she is in no position to escape any more of it.', weight: 3 },
    { when: { mindControlled: 1 },
      text: 'Mind fogged and pliant — {body.desc} — she welcomes every bit of it with a dreamy smile.', weight: 3 },
    { when: { ravenous: 1 },
      text: 'Ravenous beyond reason, she practically lunges into it, desperate for more.', weight: 2 },
    { when: { fullness: 1 },
      text: 'Already stuffed to bursting, she can only whimper as still more is forced upon her.', weight: 2 },
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

  // GRAVITY SPELLS
  engine.registerModule('spell.scene.enhance_gravity', [
    {
      when: { suspended: 1 },
      text: 'Gravity tightens around {subject.name} like an invisible hand. Her effective weight multiplies all at once, dragging hard against whatever holds her up. Every support point complains under the sudden load.',
    },
    {
      when: { buried: 1 },
      text: 'The gravity spell presses down on {subject.name} with brutal certainty. Soil and stone compact around her as her body becomes effectively heavier, forcing her deeper into the earth that already holds her.',
    },
    {
      when: {},
      text: 'The spell changes no flesh and adds no mass, but the result is immediate: {subject.name} becomes heavier in the only way physics cares about. The floor takes more of her. Furniture looks less trustworthy. Anything holding her up is suddenly under real strain.',
    },
  ]);

  engine.registerModule('spell.scene.telekinesis', [
    {
      when: { floating: 1 },
      text: 'Telekinetic force catches {subject.name} with almost insulting ease. With her gravity already reduced, she drifts where the spell guides her, light enough that placement becomes precise rather than forceful.',
    },
    {
      when: { heavyGravity: 1 },
      text: 'The telekinesis strains as it takes hold of {subject.name}. Altered gravity makes her harder to move, but the invisible force lifts and carries her anyway, placing all that effective weight exactly where you direct it.',
    },
    {
      when: {},
      text: 'Invisible force closes around {subject.name} and lifts. Her feet leave the ground, her balance becomes irrelevant, and the spell carries her smoothly toward the chosen surface before setting her down.',
    },
  ]);

  engine.registerModule('spell.scene.float', [
    {
      when: { heavyGravity: 1 },
      text: 'The float spell fights against the earlier gravity enhancement. The pressure around {subject.name} loosens by degrees, dragging weight out of the equation until her body begins to feel liftable again.',
    },
    {
      when: { restrained: 1 },
      text: 'Gravity releases its grip on {subject.name}, but her restraints still have a vote. Her body grows light, almost buoyant, tugging upward against whatever keeps her tied down.',
    },
    {
      when: {},
      text: 'The spell reduces gravity around {subject.name} in a smooth, uncanny fade. Her stance lightens first, then her balance shifts, and finally the ground seems to become optional beneath her.',
    },
  ]);

  engine.registerModule('spell.scene.arcane_appraisal', [
    {
      when: { supportable_weight: { min: 1 } },
      text: 'Arcane sight maps the target\'s hidden limits in a clean, practical overlay: how much weight it can carry, where the stress gathers, and how close it is to failure. The numbers settle into place like runes overlaid on the object itself.',
    },
    {
      when: {},
      text: 'The spell reads the target as if it were written in force and tension. Support, strain, and breaking point surface in your mind with unnatural clarity.',
    },
  ]);

  engine.registerModule('spell.interaction.create_water.shape_earth', [
    {
      when: {},
      text: 'The conjured water pours into the freshly shaped basin and pools there, held by the new stone walls. What was loose earth a moment ago is now a brimming reservoir — a standing supply, ready to be sweetened, thickened, or transmuted into something far richer.',
    },
  ]);

  engine.registerModule('spell.interaction.create_water.delightful_transmutation', [
    {
      when: {},
      text: 'The conjured water does not merely become dessert; it becomes an invitation. The new ice cream gleams with creamy abundance, cool and sweet and endlessly renewing, turning the room into a private fountain of indulgence.',
    },
  ]);

  engine.registerModule('spell.interaction.detect_cravings.suggestion', [
    {
      when: { willingness: { min: 70 } },
      text: 'Because you know exactly what {subject.name} wants, the suggestion lands like a compliment instead of a command. Her expression softens into pleased anticipation, cheeks warming as the magic frames indulgence as something chosen, flattering, and deliciously personal.',
    },
    {
      when: {},
      text: 'The divination gives the enchantment a precise shape. It whispers in the language of {subject.name}\'s own cravings, making the offered food feel intimate, tailored, and difficult to refuse.',
    },
  ]);

  engine.registerModule('spell.interaction.detect_cravings.conjure_food', [
    {
      when: {},
      text: 'The conjuration forms around the secret tastes you uncovered. Scent, texture, and sweetness arrive in perfect alignment with {subject.name}\'s appetite, making the food feel less summoned than seductively prepared for her alone.',
    },
  ]);

  engine.registerModule('spell.interaction.create_food_and_water.ravenous_expansion', [
    {
      when: { stage: { min: 6 } },
      text: 'The feast is already waiting when the expansion hits. {subject.name}\'s belly swells with new capacity, and the spread in front of her suddenly looks less like a meal than a promise. Her softened body shifts with hungry interest, ready to be filled further.',
    },
    {
      when: {},
      text: 'The prepared food and the new hunger answer each other. A full table meets an expanding appetite, and the magic turns simple eating into a warm, greedy rhythm of want, taste, and growing fullness.',
    },
  ]);

  engine.registerModule('spell.interaction.ravenous_expansion.haste', [
    {
      when: { stage: { min: 5 } },
      text: 'Ravenous capacity meets supernatural speed. {subject.name} eats with breathless eagerness, her softening body keeping every calorie while her hands move almost too quickly to follow. The effect is sensual in its excess: appetite, motion, and growth all accelerating together.',
    },
    {
      when: {},
      text: 'The haste spell catches the hunger and makes it quick. Every bite follows the last with eager momentum, turning a craving into a fast, flushed cascade of indulgence.',
    },
  ]);

  engine.registerModule('spell.interaction.ravenous_expansion.rapid_digestion', [
    {
      when: { stage: { min: 6 } },
      text: 'The expanded hunger becomes permanent softness almost as soon as it is satisfied. {subject.name} shivers as digestion magic rolls through her, converting recent indulgence into new weight that settles warmly across her already generous body.',
    },
    {
      when: {},
      text: 'Hunger opens the door; digestion locks it behind her. The food she craved becomes real added weight, leaving her flushed, full, and visibly softer.',
    },
  ]);

  engine.registerModule('spell.interaction.enlarge_person.oozing_abundance', [
    {
      when: { stage: { min: 6 } },
      text: 'The ooze spreads across all that new surface area, glossy and warm, clinging to every expanded curve before sinking in. {subject.name} looks almost lacquered in abundance, her body fed through the skin as the spell adds still more softness to what enlargement began.',
    },
    {
      when: {},
      text: 'Enlargement gives the nutritive ooze more of her to coat. It glides over newly softened curves and soaks in with a warm shimmer, making the growth feel rich, glossy, and intimate.',
    },
  ]);

  engine.registerModule('spell.interaction.enlarge_person.grease', [
    {
      when: { stage: { min: 5 } },
      text: 'The grease catches on {subject.name}\'s enlarged body in shining highlights. Every softened curve gleams under the spell, turning size into spectacle: glossy, heavy, and impossible not to notice.',
    },
    {
      when: {},
      text: 'The slick conjuration makes the enlargement look deliberate and decadent. Light slides over her softened shape, emphasizing the new weight with a shameless gloss.',
    },
  ]);

  engine.registerModule('spell.interaction.delightful_transmutation.duplication', [
    {
      when: {},
      text: 'The magical ice cream doubles, then seems eager to double again. What was a dessert becomes a supply, and what was a supply becomes temptation with logistics: enough sweetness to make restraint feel theoretical.',
    },
  ]);

  engine.registerModule('spell.interaction.prestidigitation.feast_of_shadows', [
    {
      when: {},
      text: 'The cantrip perfumes the illusion with impossible precision. Butter, sugar, cream, heat, spice - every sensory note becomes intimate and convincing, making the shadow-feast feel sinfully real before the first bite is even taken.',
    },
  ]);

  engine.registerModule('spell.interaction.grease.confection_snare', [
    {
      when: { restraintMaterial: 'candy' },
      text: 'The candy bonds slide through the grease without losing their grip, leaving {subject.name} wrapped in a slick, sweet sheen. The restraint looks less like a trap now and more like confectionery display: sticky, glossy, and indulgently humiliating.',
    },
    {
      when: {},
      text: 'Grease and candy magic merge into a shining tangle. The vines grip where they need to and glaze everywhere else, turning restraint into sticky, sugar-slick spectacle.',
    },
  ]);

  engine.registerModule('spell.interaction.suggestion.enlarge_person', [
    {
      when: { willingness: { min: 70 } },
      text: '{subject.name} receives the growth with a soft, startled breath, but not rejection. The prior suggestion leaves indulgence feeling acceptable, even desirable, and her expanding body seems to luxuriate in every added inch and pound.',
    },
    {
      when: {},
      text: 'The suggestion leaves a permissive warmth behind. When the enlargement comes, it feels less like an attack and more like being coaxed into softness: bigger, heavier, and increasingly aware of her own curves.',
    },
  ]);

  engine.registerModule('spell.interaction.ravenous_expansion.suggestion', [
    {
      when: {},
      text: 'The suggestion barely has to work. Ravenous magic has already made food the center of {subject.name}\'s attention, so the enchantment simply gives her hunger permission to become eager, open, and pleased with itself.',
    },
  ]);

  engine.registerModule('spell.interaction.duplication.create_food_and_water', [
    {
      when: {},
      text: 'The banquet arrives already multiplied. Platters mirror into more platters, portions double before settling, and the whole spread takes on a lavish, almost teasing excess. There is far too much food, which is exactly the point.',
    },
  ]);

  engine.registerModule('spell.interaction.ravenous_expansion.fireball', [
    {
      when: { ravenous: 1 },
      text: 'The roasted feast detonates into a hunger already primed to receive it. Smoke, heat, and savory richness wash over {subject.name}; her ravenous body responds with flushed urgency, every bite promising more softness.',
    },
    {
      when: {},
      text: 'The fireball leaves food instead of flame, and the earlier expansion makes the result feel inevitable. There is room inside her now, and the roasted abundance seems designed to fill it.',
    },
  ]);

  engine.registerModule('spell.interaction.suggestion.haste', [
    {
      when: {},
      text: 'The persuaded appetite becomes quick and eager. {subject.name} moves through each bite with bright, breathless focus, the haste making indulgence look practiced, hungry, and almost flirtatiously enthusiastic.',
    },
  ]);

  engine.registerModule('spell.interaction.suggestion.food_choice.love', [
    {
      when: {},
      text: (ctx) => `The suggestion opens the door, but ${ctx.subject.name} makes the choice herself. Her eyes find ${ctx.subject.lastFoodChoice}, and recognition turns into appetite. She chooses what she already wanted most and eats with obvious pleasure.`,
    },
  ]);

  engine.registerModule('spell.interaction.suggestion.food_choice.like', [
    {
      when: {},
      text: (ctx) => `${ctx.subject.name} scans the nearby food and settles on ${ctx.subject.lastFoodChoice}. It is not forced into her hands; she chooses it, drawn by familiar taste and a softened willingness to indulge.`,
    },
  ]);

  engine.registerModule('spell.interaction.suggestion.food_choice.neutral', [
    {
      when: {},
      text: (ctx) => `${ctx.subject.name} looks over what is available, considering for herself. After a moment she picks ${ctx.subject.lastFoodChoice}, accepting the suggestion without surrendering her own preference.`,
    },
  ]);

  engine.registerModule('spell.interaction.suggestion.food_choice.dislike', [
    {
      when: {},
      text: (ctx) => `${ctx.subject.name} hesitates over the nearby food and finally chooses ${ctx.subject.lastFoodChoice}, though her expression makes clear it was not her first preference. The suggestion nudges her to eat, but taste still matters.`,
    },
  ]);

  engine.registerModule('spell.interaction.suggestion.no_food_available', [
    {
      when: {},
      text: 'The suggestion lands, and {subject.name} actually looks ready to choose something for herself. The problem is practical: there is no prepared food nearby for her to choose.',
    },
  ]);

  engine.registerModule('spell.interaction.feast_of_shadows.rapid_digestion', [
    {
      when: {},
      text: 'The illusion should not leave weight behind, but digestion magic insists otherwise. {subject.name} feels phantom sweetness become bodily consequence, a softening warmth that proves the feast was real enough where it mattered.',
    },
  ]);

  engine.registerModule('spell.interaction.grease.delightful_transmutation', [
    {
      when: {},
      text: 'The slick conjuration sweetens and thickens into a dessert glaze. It shines over every surface it touches, creamy and fragrant, turning slipperiness into something richer, stickier, and far more tempting.',
    },
  ]);

  engine.registerModule('spell.interaction.oozing_abundance.morph_mass', [
    {
      when: { oozeCoated: 1 },
      text: 'The mass spell finds the nutritive ooze already clinging to {subject.name} and folds it inward. The glossy coating disappears into her body in slow waves, leaving fresh softness in its place.',
    },
    {
      when: {},
      text: 'Ooze and mass transmutation cooperate beautifully. What was coating her becomes part of her, converted into dense, warm weight that settles visibly across her figure.',
    },
  ]);

  engine.registerModule('spell.interaction.enlarge_person.reduce_person', [
    {
      when: {},
      text: 'The opposed size magic snaps back through {subject.name} with a dizzying contrast. For a moment she is all remembered largeness and sudden tightness, flushed by the strange awareness of how much body the magic just took away.',
    },
  ]);

  engine.registerModule('spell.interaction.reduce_person.enlarge_person', [
    {
      when: {},
      text: 'The rebound growth arrives with extra plushness, as though the spell is overcorrecting. {subject.name} fills back out with a warm rush, softer than before, newly aware of every curve returning with interest.',
    },
  ]);

  engine.registerModule('spell.interaction.enhance_gravity.ceiling_suspension_break', [
    {
      when: {},
      text: 'The ceiling suspension cannot survive the new force. The candy ropes stretch, squeal, and snap in sequence, dropping {subject.name} hard as enhanced gravity wins the argument.',
    },
  ]);

  engine.registerModule('spell.interaction.enhance_gravity.table_break', [
    {
      when: {},
      text: 'The support underneath {subject.name} fails with a sharp crack. Enhanced gravity turns a risky perch into a broken one, and the surface gives way beneath her effective weight.',
    },
  ]);

  engine.registerModule('spell.interaction.telekinesis.table_break', [
    {
      when: { heavyGravity: 1 },
      text: 'Telekinesis places {subject.name} exactly where intended, but altered gravity makes the landing too much for the surface. The table bows, splinters, and collapses under her.',
    },
    {
      when: {},
      text: 'The chosen surface holds for one breath, then fails. Telekinesis has moved {subject.name} onto it cleanly; gravity handles the rest, snapping the support beneath her.',
    },
  ]);

  engine.registerModule('spell.interaction.float.floor_tether', [
    {
      when: {},
      text: '{subject.name} tries to rise as gravity fades, but the floor anchor catches her. She floats just enough for the restraint to pull taut, leaving her suspended low and tied down at the same time.',
    },
  ]);

  engine.registerModule('spell.interaction.enhance_gravity.shape_earth_burial', [
    {
      when: { buriedDepth: { min: 4 } },
      text: 'Shape Earth opens beneath {subject.name}, and enhanced gravity makes the burial severe. She sinks deeper than the spell alone should allow, earth packing around her with the force of her multiplied weight.',
    },
    {
      when: {},
      text: 'The shaped earth receives {subject.name} and gravity pulls her farther down. What would have been a shallow burial becomes a deeper, tighter hold.',
    },
  ]);

  engine.registerModule('spell.interaction.float.telekinesis', [
    {
      when: {},
      text: 'With gravity reduced, telekinesis barely has to fight physics. {subject.name} glides into place smoothly, more guided than dragged, and the chosen surface receives far less force than it otherwise would.',
    },
  ]);

  engine.registerModule('spell.interaction.float.suggestion_food', [
    {
      when: { floorTethered: 1 },
      text: '{subject.name} is not quite on the ground and not quite free of it. The chosen food has to be brought upward to meet her, rising in little guided motions while the floor tether keeps her from drifting away from the meal.',
    },
    {
      when: { floating: 1 },
      text: 'Reduced gravity changes the whole feeding rhythm. {subject.name} drifts lightly while the chosen food is guided up through the air to meet her, making the act feel less like sitting down to eat and more like being fed inside a slow, buoyant orbit.',
    },
  ]);

  engine.registerModule('spell.interaction.float.confection_snare_food', [
    {
      when: { floorTethered: 1 },
      text: 'The bindings take advantage of the buoyancy without losing control. Food lifts from nearby surfaces in small jerking rises, drawn upward until the tethered target can be fed where she hangs taut above the floor.',
    },
    {
      when: { floating: 1 },
      text: 'With gravity softened, the bindings do not have to drag food across the ground at all. Portions simply rise and spiral inward through the air, feeding {subject.name} in a steady suspended rhythm.',
    },
  ]);

  engine.registerModule('spell.interaction.enhance_gravity.float', [
    {
      when: {},
      text: 'Float pushes back against the prior gravity surge. The crushing pull loosens, not vanishing entirely but becoming negotiable, and {subject.name} regains a little of the lightness gravity had taken away.',
    },
  ]);

  engine.registerModule('spell.interaction.float.enhance_gravity', [
    {
      when: {},
      text: 'Enhanced Gravity wins the contest with Float. The buoyant lift collapses at once, pulling {subject.name} back down as the spell restores weight to the world around her.',
    },
  ]);

  engine.registerModule('spell.interaction.culinary_transmutation.suggestion', [
    {
      when: {},
      text: 'The suggestion points {subject.name} toward the nearby spread, but the choice remains hers. The strange appeal is that some of that food used to be furniture; curiosity and appetite meet halfway.',
    },
  ]);

  engine.registerModule('spell.interaction.culinary_transmutation.confection_snare', [
    {
      when: {},
      text: 'The confection bindings find the transmuted object-food immediately. What used to be furniture becomes feedstock for the spell, pulled close in soft, edible portions.',
    },
  ]);

  engine.registerModule('spell.interaction.culinary_transmutation.duplication', [
    {
      when: {},
      text: 'Duplication catches the transmuted food at the perfect moment. One former object becomes two spreads, then more, turning a single conversion into a practical supply.',
    },
  ]);

  engine.registerModule('spell.interaction.confection_snare.world_food', [
    {
      when: {},
      text: 'The bindings do not need to invent food this time. They seize what is already nearby, dragging prepared portions into their feeding rhythm with efficient magical insistence.',
    },
  ]);

  engine.registerModule('spell.interaction.summon_cattle.flesh_to_food', [
    {
      when: {},
      text: 'The summoned cattle give the conversion spell an enormous target. Living mass becomes prepared abundance, and the room fills with the warm, heavy smell of a feast made from conjured livestock.',
    },
  ]);

  engine.registerModule('spell.interaction.summon_cattle.ravenous_expansion', [
    {
      when: {},
      text: 'The cattle arrive first; then the appetite expands to match them. {subject.name} looks at the heavy animals with a hunger that has suddenly been given scale.',
    },
  ]);

  engine.registerModule('spell.interaction.summon_cattle.enhance_gravity', [
    {
      when: {},
      text: 'Enhanced gravity turns the summoned cattle into moving structural problems. Their hooves hit harder, the floor complains louder, and every heavy body in the room matters more.',
    },
  ]);

  engine.registerModule('spell.interaction.goodberry.suggestion', [
    {
      when: {},
      text: 'The goodberries make the suggestion feel easy. Small, bright, and harmless-looking, they give {subject.name} something she can choose without feeling like she has committed to a full meal.',
    },
  ]);

  engine.registerModule('spell.interaction.create_water.plant_growth', [
    {
      when: {},
      text: 'The conjured water disappears into roots and stems, and the growth answers with extra force. Fruit swells larger, leaves thicken, and the new food arrives juicier and more abundant.',
    },
  ]);

  engine.registerModule('spell.interaction.plant_growth.ravenous_expansion', [
    {
      when: {},
      text: 'Fresh produce erupts into the area just as appetite opens wide. The timing is almost too neat: abundance within reach, and a body newly ready to receive it.',
    },
  ]);

  engine.registerModule('spell.interaction.slow.suggestion', [
    {
      when: {},
      text: 'Slow leaves {subject.name} less hurried and more receptive to the act of eating. Whatever she chooses settles heavier, the spell making indulgence linger in her body.',
    },
  ]);

  engine.registerModule('spell.interaction.slow.confection_snare', [
    {
      when: {},
      text: 'The bindings work better against a slowed target. Every attempt to pull away arrives late, and the candy restraints tighten before {subject.name} can build momentum.',
    },
  ]);

  engine.registerModule('spell.interaction.slow.haste', [
    {
      when: {},
      text: 'Haste tears through the slowing field and the two spells fight inside {subject.name} for a dizzy instant: quick hunger, sluggish burn, and a body caught between incompatible tempos.',
    },
  ]);

  engine.registerModule('spell.interaction.haste.slow', [
    {
      when: {},
      text: 'Slow clamps down over the haste magic, dragging the pace back to something thick and heavy. The frantic edge fades, but the metabolic confusion remains.',
    },
  ]);

  // ─────────────────────────────────────────────
  // SYMPATHETIC BOND (Level 3)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.sympathetic_bond', [
    {
      when: { stage: { min: 6 } },
      text: 'A thread of shimmering magic ties {subject.name} and her bonded partner together. The spell sinks deep — past flesh, past reason, into the bones themselves. When one eats, the other will know it. When one grows heavy, the other will feel the echoing weight. They are entangled now, in a way that no distance can undo.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: 'Enchantment magic weaves between {subject.name} and her partner, binding their appetites into one. A glowing thread loops between them, visible only as a faint shimmer in the air. What she consumes, her bonded will share the burden — or the pleasure — of. The connection settles into place with a soft, strange warmth.',
    },
    {
      when: {},
      text: [
        'A sympathetic bond forms between {subject.name} and her partner, magic drawing their fates closer. They are no longer quite separate — not fully merged, but no longer wholly alone in their hunger.',
        'The spell binds {subject.name} and her partner together at a level deeper than flesh. When she eats, her bonded will taste the echo of it at rest. When she grows, her bonded grows with her. They are part of each other now.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // COVETOUS SIPHON (Level 3)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.covetous_siphon', [
    {
      when: { stage: { min: 6 } },
      text: 'The siphon magic reaches into {subject.name} and *pulls*. Visible ripples of translocation flow across her skin — flesh and softness migrating away, drawn toward another body by pure envious desire. She shrinks perceptibly, contours shifting, weight abandoning her for a new home. The magic is hungry and precise, and she can do nothing but watch as her own body conspires against her.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: 'The transmutation magic takes hold and {subject.name} feels *lighter*. Not weightless — just lighter. Curves that defined her body soften and migrate, drawn away by the covetous spell. She looks down and watches as her own flesh decides to belong elsewhere. The sensation is surreal, almost indecent, and when it ends, she has simply become less.',
    },
    {
      when: {},
      text: [
        'Transmutation magic reaches into {subject.name} and siphons away weight in a slow, cruel drain. Her body protests silently as curves soften and fade, stolen by the spell\'s hungry intent. She is lighter when the magic settles, and somehow both relieved and bereft.',
        'The covetous siphon pulls weight from {subject.name} into another, magic making the transfer seem almost natural. What she had, the spell covets, and what the spell wants, the spell takes.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // DRACONIC HUNGER (Level 4)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.draconic_hunger', [
    {
      when: { stage: { min: 6 } },
      text: 'The draconic hunger unfolds inside {subject.name} like wings opening for the first time. Her jaw *stretches*, impossibly wide, revealing a gullet that should not exist in a mortal frame. The hunger that fills her is ancient and total and *ravenous*. She is no longer entirely herself — something scaled and terrible and hungry has moved in behind her eyes. The magic does not transform her body, but it transforms what she *is* in a way that no enlargement spell ever could.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: '{subject.name}\'s jaw opens wider than it should be able to. Draconic hunger awakens inside her, ancient and demanding, and suddenly she understands what it means to want the way a dragon wants. Her stomach expands, capacity blooming, and an appetite that was never hers before suddenly *is*. She is ravenous in a way she has never been. The hunger is terrifying. The hunger is exhilarating.',
    },
    {
      when: {},
      text: [
        'A dragon\'s hunger settles into {subject.name}\'s bones. Her appetite sharpens and deepens, becoming something far older than her mortal form. She feels the change — not her body growing, but her *appetite* growing, boundless and terrible and magnificent.',
        'The draconic hunger takes root inside {subject.name} and she is suddenly, completely *ravenous*. The hunger is not new to her frame — it is ancient, draconic, and utterly inexorable.',
      ],
    },
  ]);

  // ─────────────────────────────────────────────
  // AMBROSIAL AURA (Level 3)
  // ─────────────────────────────────────────────
  engine.registerModule('spell.scene.ambrosial_aura', [
    {
      when: { stage: { min: 6 } },
      text: 'The air itself becomes indecent. An aura of pure nourishment settles into every corner of the zone — invisible but utterly perceptible. The scent of feasts that have never been prepared. The taste of foods that do not exist. The promise of satiation beyond measure. Every occupant feels it, a constant, gentle pressure toward indulgence. The magic is subtle, patient, and utterly inescapable. By tomorrow\'s rest, every occupant will have benefited from the abundance the spell provides.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: 'A shimmering aura of magical nourishment spreads through the zone. The air becomes rich with the scent of plenty — freshly baked bread, roasted meats, sweet cream — none of it real, all of it deeply persuasive to appetite. Every occupant feels suddenly less hungry and more *ready* to eat. By the time rest comes, everyone will have gained from the zone\'s abundance.',
    },
    {
      when: {},
      text: [
        'The spell settles and the zone becomes subtly, indefinably richer. An aura of calories — pure magical nourishment — spreads like warmth through the air. Every occupant will benefit from it at rest, as if they have been feasting all along.',
        'Conjuration magic fills the zone with the essence of feast and plenty. The aura is not food — nothing to eat, nothing to hold — but its effects are real: every occupant will gain the benefit of the zone\'s nourishment at their next rest.',
      ],
    },
  ]);

  // Interactions for the new spells
  engine.registerModule('spell.interaction.sympathetic_bond.suggestion', [
    {
      when: {},
      text: 'The sympathetic bond makes suggestion even more resonant — {subject.name} and her bonded partner nearly choose in unison. The suggestion feels less like magic and more like an obvious desire they both happened to have.',
    },
  ]);

  engine.registerModule('spell.interaction.sympathetic_bond.erupting_earth', [
    {
      when: {},
      text: 'The bond means that when {subject.name} is buried, her bonded partner feels the weight and pressure as if it were happening to her as well. The sympathetic connection deepens into shared suffering.',
    },
  ]);

  engine.registerModule('spell.interaction.sympathetic_bond.confection_snare', [
    {
      when: {},
      text: 'The bindings ensnare {subject.name} and through the sympathetic bond, her partner feels the tightness as well. They are restrained together, even though only one is truly bound.',
    },
  ]);

  engine.registerModule('spell.interaction.sympathetic_bond.ravenous_expansion', [
    {
      when: {},
      text: 'The hunger expands through {subject.name} and immediately echoes to her bonded partner. Both are ravenous now, and both will be ravenous at rest.',
    },
  ]);

  engine.registerModule('spell.interaction.covetous_siphon.reduce_person', [
    {
      when: {},
      text: 'The reduction magic combines with the siphon\'s theft. {subject.name} loses not just weight, but presence — she becomes smaller in every measurable way.',
    },
  ]);

  engine.registerModule('spell.interaction.covetous_siphon.enlarge_person', [
    {
      when: {},
      text: 'The stolen weight finds its way to the destination, who swells with both magic and newfound mass. The enlargement is doubly effective when paired with a siphon.',
    },
  ]);

  engine.registerModule('spell.interaction.covetous_siphon.rapid_digestion', [
    {
      when: {},
      text: 'The siphoned weight is pulled from {subject.name} just as her digestion accelerates. The magic compounds — she loses mass even as she has nowhere to put what she consumes.',
    },
  ]);

  engine.registerModule('spell.interaction.covetous_siphon.enhance_gravity', [
    {
      when: {},
      text: 'The destination becomes exponentially heavier. Stolen weight combines with enhanced gravity to push the recipient down with terrible force.',
    },
  ]);

  engine.registerModule('spell.interaction.draconic_hunger.summon_cattle', [
    {
      when: {},
      text: 'The summoned cattle arrive just as the draconic hunger awakens. They are prey now, and {subject.name} is the predator. The hunger is immediate. The hunger is overwhelming.',
    },
  ]);

  engine.registerModule('spell.interaction.draconic_hunger.ravenous_expansion', [
    {
      when: {},
      text: 'The draconic hunger combines with the ravenous state and {subject.name}\'s appetite becomes almost unmanageable. She is not just hungry — she is a dragon, and dragons do not stop eating.',
    },
  ]);

  engine.registerModule('spell.interaction.draconic_hunger.flesh_to_food', [
    {
      when: {},
      text: 'The devoured creature is transmuted into food that {subject.name} can consume in ways the draconic spell makes possible. The magic combines — dragon and alchemist working in terrible harmony.',
    },
  ]);

  engine.registerModule('spell.interaction.draconic_hunger.polymorph', [
    {
      when: {},
      text: 'The draconic form\'s appetite is legendary, and the polymorph spell gives {subject.name} all of it. The hunger is immediate and total, and the beast-form is delighted to oblige.',
    },
  ]);

  engine.registerModule('spell.interaction.ambrosial_aura.plant_growth', [
    {
      when: {},
      text: 'The aura enhances the growth, and the plants that erupt are more abundant, more nourishing, and more magically rich than they would be alone.',
    },
  ]);

  engine.registerModule('spell.interaction.ambrosial_aura.create_food_and_water', [
    {
      when: {},
      text: 'The conjured food arrives into a zone already thick with magical nourishment. The aura and the conjured feast stack, making the zone\'s caloric abundance almost overwhelming.',
    },
  ]);

  // ─── P3.2 coverage-fill interactions ─────────────────────────────

  engine.registerModule('spell.interaction.arcane_appraisal.shape_wood', [
    {
      when: {},
      text: 'Knowing exactly where the old chair would have failed, you shape the new wood past that limit — a seat rated for far more than she carries now, an invitation she will grow into.',
    },
  ]);

  engine.registerModule('spell.interaction.arcane_appraisal.telekinesis', [
    {
      when: {},
      text: 'The appraisal already told you the bench would hold. You set {subject.name} down onto it without hesitation, and the wood takes her weight with a confident, unhurried creak.',
    },
  ]);

  engine.registerModule('spell.interaction.arcane_appraisal.shape_earth', [
    {
      when: {},
      text: 'You read the ground\'s hidden tolerance first, then shape it to exceed her — a basin and seat of stone that will not crack no matter how much heavier she becomes.',
    },
  ]);

  engine.registerModule('spell.interaction.shape_earth.shape_wood', [
    {
      when: {},
      text: 'Stone foundation and shaped wood rise together into a single feeding station: a low, broad seat and a table at the perfect reach, everything built so she never has to stand to eat.',
    },
  ]);

  engine.registerModule('spell.interaction.shape_wood.telekinesis', [
    {
      when: {},
      text: 'The feeding chair is already shaped and waiting. You guide {subject.name} down into it, and she settles into the contoured wood as though it were made to hold exactly her — because it was.',
    },
  ]);

  engine.registerModule('spell.interaction.conjure_food.morph_mass', [
    {
      when: {},
      text: 'The conjured spread becomes part of the absorption. Food and earth and matter fold inward together, packing onto {subject.name} in rich, heavy layers she can feel settling.',
    },
  ]);

  engine.registerModule('spell.interaction.polymorph.morph_mass', [
    {
      when: {},
      text: 'The beast-form\'s bulk gives the mass transmutation more to work with. Surrounding matter clings to the already-massive shape, dragging it lower, broader, heavier with every breath.',
    },
  ]);

  engine.registerModule('spell.interaction.goodberry.conjure_food', [
    {
      when: {},
      text: 'The conjured feast dominates the table, but the little berries sit beside it like an afterthought — and an afterthought is exactly what gets eaten absently, handful after handful, long after the main course is gone.',
    },
  ]);

  engine.registerModule('spell.interaction.detect_cravings.goodberry', [
    {
      when: {},
      text: 'Knowing her cravings, you tune each berry to taste of the thing {subject.name} wants most. They vanish three and four at a time, and she barely notices her own hand returning to the bowl.',
    },
  ]);

  engine.registerModule('spell.interaction.conjure_food.prestidigitation', [
    {
      when: {},
      text: 'A flick of minor magic and the conjured food warms, glistens, and releases a scent of butter and sugar into the air. It was tempting before. Now it is impossible to walk past.',
    },
  ]);

  engine.registerModule('spell.interaction.goodberry.prestidigitation', [
    {
      when: {},
      text: 'The cantrip sweetens each berry and warms it on the tongue, turning a plain mouthful of nourishment into a small, moreish pleasure she keeps reaching for.',
    },
  ]);

  engine.registerModule('spell.interaction.detect_cravings.feast_of_shadows', [
    {
      when: {},
      text: 'The illusion shapes itself from her own cravings. Every phantom dish is precisely what {subject.name} most wanted to eat, and her body believes every calorie of it.',
    },
  ]);

  engine.registerModule('spell.interaction.polymorph.fireball', [
    {
      when: {},
      text: 'Roasted abundance rains down on the beast-form, and its already-insatiable appetite takes over. It eats without pause, without thought, swelling visibly as the seasoned feast disappears.',
    },
  ]);

  engine.registerModule('spell.interaction.fireball.flesh_to_food', [
    {
      when: {},
      text: 'What the flames roasted, the transmutation completes — flesh becomes pure, rich, edible abundance, already warm, already seasoned, ready to be devoured.',
    },
  ]);

  engine.registerModule('spell.interaction.ambrosial_aura.oozing_abundance', [
    {
      when: {},
      text: 'The ooze-arrow flies through air already thick with nourishment. It strikes heavier, coats thicker, every drop amplified by the aura into something dense and deeply fattening.',
    },
  ]);

  // ─── P3.3 condition-keyed interactions ───────────────────────────
  // Fire on lasting state, not recent casts.

  engine.registerModule('spell.interaction.condition.restrained.enlarge_person', [
    {
      when: {},
      text: 'Held fast, {subject.name} can do nothing but grow. The spell swells her against her bonds, every new inch pressing harder into the restraints, until she fills the space she cannot leave.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.buried.enlarge_person', [
    {
      when: {},
      text: 'Buried to the waist, {subject.name} begins to grow — and the growth packs the earth tighter around her, the spell wedging her ever more firmly into the ground she cannot climb out of.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.restrained.oozing_abundance', [
    {
      when: {},
      text: 'She cannot dodge. The ooze-arrow strikes a target who can only take it, thick nutritive sludge spreading across skin she cannot wipe clean, feeding into her where she stands.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.satiated.telekinesis', [
    {
      when: {},
      text: 'Stuffed and sluggish, she barely resists as you lift her. {subject.name} is set down onto the waiting seat with a heavy, contented settle, too full to do anything but stay.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.ravenous.feast_of_shadows', [
    {
      when: {},
      text: 'Phantom food in front of real hunger. {subject.name} devours the illusion without question, and her body, convinced, settles every imagined calorie into soft reality.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.satiated.suggestion', [
    {
      when: {},
      text: 'She is already full — and that is exactly when a gentle suggestion does its best work. One more bite, you murmur, and {subject.name} finds room she swore she did not have.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.enlarged.morph_mass', [
    {
      when: {},
      text: 'Already swollen larger than life, {subject.name} gives the mass transmutation an enormous frame to load. Matter folds onto her by the armful, and the enlarged body drinks it in.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.ooze_coated.confection_snare', [
    {
      when: {},
      text: 'The candy bindings find the ooze already slicking her and take hold instantly, sticky meeting sticky. {subject.name} is bound in a glaze of sweet and rich she cannot pull free of.',
    },
  ]);

  // ═══════════════════════════════════════════════════════════════
  // P3.4 — NEW THEMED SPELL SCENES (weight-stage coverage) + COMBOS
  // ═══════════════════════════════════════════════════════════════

  engine.registerModule('spell.scene.rooting_glut', [
    {
      when: { stage: { min: 8 } },
      text: 'The spell reaches a body already vast, and there is simply no fighting it. {subject.name} settles where she stands with a deep, final-sounding groan, her enormous weight rooting her to the spot. She was barely mobile before. Now she is a fixture, sinking softly into her own mass.',
    },
    {
      when: { stage: { min: 4, max: 7 } },
      text: 'Magic pours down through {subject.name} and pools at her feet like setting cement. Her heavy frame anchors in place, and when she tries to shift her weight she finds she simply cannot — rooted, settled, softening further by the second.',
    },
    {
      when: { stage: { max: 3 } },
      text: 'The spell takes hold and {subject.name} feels her footing change — a sudden, gentle heaviness pinning her where she stands. She shifts, testing it, and finds her own body unwilling to move, content to stay and soften right here.',
    },
    {
      when: {},
      text: '{subject.name} is rooted in place beneath her own gathering weight, anchored and slowly settling.',
    },
  ]);

  engine.registerModule('spell.scene.bottomless_gullet', [
    {
      when: { stage: { min: 6 } },
      text: 'The spell opens something in {subject.name} that was already generous. Whatever ceiling her enormous appetite once had simply lifts away, and the hunger behind her eyes turns bottomless — she could clear a banquet table now and ask, quite sincerely, what comes next.',
    },
    {
      when: { stage: { max: 5 } },
      text: 'A warmth spreads through {subject.name}\'s middle, and with it a strange new spaciousness. The familiar limit of fullness retreats, then retreats again, until she realizes with a slow flush that she could keep going far longer than she ever has.',
    },
    {
      when: {},
      text: '{subject.name}\'s capacity widens; the point of fullness slides far out of reach.',
    },
  ]);

  engine.registerModule('spell.scene.feeder\'s_devotion', [
    {
      when: { willingness: { min: 70 } },
      text: 'The enchantment lands on a target already fond of the attention, and it blooms into something close to bliss. {subject.name} leans into the next offered bite with open, grateful want, every feeding now an act of devotion she would never think to refuse.',
    },
    {
      when: {},
      text: 'The magic softens whatever resistance {subject.name} held. Feeding stops feeling like coercion and starts feeling like care — she leans in, lips parting for the next bite before it is even offered, wanting it now in a way she did not a moment ago.',
    },
  ]);

  engine.registerModule('spell.scene.swelling_tide', [
    {
      when: { stage: { min: 6 } },
      text: 'The tide rolls into a body already monumental, and it does not so much grow her as set her in motion — a slow, mounting swell rippling outward, each wave leaving {subject.name} broader and softer than the last, with no shoreline anywhere in sight.',
    },
    {
      when: { stage: { min: 3, max: 5 } },
      text: 'It begins gently — a faint, warm pressure under the skin. Then the first wave breaks and {subject.name} swells, settles, and swells again, the growth mounting with a slow inevitability she can feel building toward something far larger.',
    },
    {
      when: { stage: { max: 2 } },
      text: 'A slow swell starts somewhere deep in {subject.name} and rises outward in patient waves. Each one rounds her a little further, soft and unhurried, the tide only beginning to come in.',
    },
    {
      when: {},
      text: 'A mounting swell rolls through {subject.name} in slow, compounding waves.',
    },
  ]);

  // ─── Rooting Glut combos (immobility) ───
  engine.registerModule('spell.interaction.rooting_glut.enlarge_person', [
    { when: {}, text: 'Rooted in place, {subject.name} can only grow where she stands. The enlargement swells her outward against an anchor she cannot break, every new pound pressing her more firmly into the spot.' },
  ]);
  engine.registerModule('spell.interaction.rooting_glut.morph_mass', [
    { when: {}, text: 'The anchored body is a perfect well for the mass transmutation. Matter piles onto {subject.name} where she sits rooted, and she has no way to rise out from under it.' },
  ]);
  engine.registerModule('spell.interaction.rooting_glut.oozing_abundance', [
    { when: {}, text: 'She is rooted and cannot dodge. The ooze-arrow strikes home and spreads, coating a target who can only sit and take it, feeding into her where she is anchored.' },
  ]);

  // ─── Bottomless Gullet combos (stuffing) ───
  engine.registerModule('spell.interaction.bottomless_gullet.feast_of_shadows', [
    { when: {}, text: 'With fullness pushed out of reach, the illusory feast has nowhere to stop. {subject.name} eats and eats the phantom abundance, her bottomless capacity turning a meal into a marathon her body fully believes.' },
  ]);
  engine.registerModule('spell.interaction.bottomless_gullet.oozing_abundance', [
    { when: {}, text: 'The nutritive ooze pours into a gullet with no floor. There is no fullness to slow it, no limit to reach — just rich abundance sinking endlessly into {subject.name}.' },
  ]);
  engine.registerModule('spell.interaction.bottomless_gullet.suggestion', [
    { when: {}, text: 'Eat your fill, you suggest — and with her capacity made bottomless, "her fill" no longer means anything. {subject.name} simply keeps going, happily, with no end in sight.' },
  ]);

  // ─── Feeder's Devotion combos (feeder) ───
  engine.registerModule('spell.interaction.feeder\'s_devotion.suggestion', [
    { when: {}, text: 'Devotion and suggestion fold seamlessly together. {subject.name} does not feel pushed at all — she feels adored, and so she opens for the next bite as though it were her own dearest idea.' },
  ]);
  engine.registerModule('spell.interaction.feeder\'s_devotion.detect_cravings', [
    { when: {}, text: 'Knowing her cravings and wrapped in devotion, every offering becomes irresistible. {subject.name} is fed precisely what she loves, by someone she now adores, and she melts into the feeding completely.' },
  ]);
  engine.registerModule('spell.interaction.feeder\'s_devotion.oozing_abundance', [
    { when: {}, text: 'What might have startled her instead lands as care. Bathed in devotion, {subject.name} welcomes the rush of nutritive ooze, leaning into the coating rather than away from it.' },
  ]);

  // ─── Swelling Tide combos (growth) ───
  engine.registerModule('spell.interaction.swelling_tide.enlarge_person', [
    { when: {}, text: 'The enlargement crests on an already-rising tide. {subject.name} surges outward all at once, the sudden growth riding the mounting swell into something far larger than either spell alone.' },
  ]);
  engine.registerModule('spell.interaction.swelling_tide.morph_mass', [
    { when: {}, text: 'The mass transmutation feeds the tide and the tide feeds it back. Matter folds onto {subject.name} in waves, each swell heavier than the last, the growth compounding with nowhere to crest.' },
  ]);
  engine.registerModule('spell.interaction.swelling_tide.ravenous_expansion', [
    { when: {}, text: 'A rising tide of growth meets a bottomless new hunger, and the two amplify without limit. {subject.name} swells as she gorges and gorges as she swells, each wave larger than the one before.' },
  ]);

  // ─── New-spell condition interactions ───
  engine.registerModule('spell.interaction.condition.enlarged.rooting_glut', [
    { when: {}, text: 'Already swollen larger than life, {subject.name} is rooted in place by her own enormous mass. The anchor settles over a body that could barely move to begin with, fixing her completely.' },
  ]);
  engine.registerModule('spell.interaction.condition.satiated.bottomless_gullet', [
    { when: {}, text: 'She is stuffed to the brim — exactly the moment the spell opens her further. The fullness {subject.name} just reached dissolves, and abruptly there is room again, far more than before.' },
  ]);
  engine.registerModule('spell.interaction.condition.restrained.feeder\'s_devotion', [
    { when: {}, text: 'Bound and unable to turn away, {subject.name} feels the devotion settle over her instead of panic. She cannot leave the feeding — and now, wrapped in adoration, she finds she no longer wants to.' },
  ]);
  engine.registerModule('spell.interaction.condition.ravenous.swelling_tide', [
    { when: {}, text: 'The tide rises through a body already wild with hunger. Every ravenous bite {subject.name} takes feeds the swell, and the swell deepens the hunger, the two cresting higher and higher together.' },
  ]);

  // ─── Imbue Life (animation: coatings self-feed, stone golems) ───
  engine.registerModule('spell.scene.imbue_life', [
    {
      when: { stage: { min: 6 } },
      text: 'Crude life shudders into the matter around {subject.name}. On a body this vast there is so much to animate — every slick of coating across her enormous form stirs at once, creeping inward of its own accord, intent on feeding her even fuller.',
    },
    {
      when: { stage: { max: 5 } },
      text: 'The spell breathes a dim, eager will into inert matter. Whatever clings to {subject.name} begins to move on its own — purposeful, unhurried, and entirely focused on getting itself inside her.',
    },
    {
      when: {},
      text: 'Inert matter stirs with borrowed life, eager and single-minded, and turns toward the work of feeding.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.ooze_coated.imbue_life', [
    { when: {}, text: 'The ooze sheeting {subject.name} shivers, gathers, and comes alive. It no longer waits to be eaten — it climbs, finds her lips, and pours itself down in thick, deliberate swallows, feeding every rich drop of itself into her until there is nothing left but a softer, fuller her.' },
  ]);
  engine.registerModule('spell.interaction.oozing_abundance.imbue_life', [
    { when: {}, text: 'The ooze-arrow has barely finished spreading before the animation takes it. The fresh coating rises as one purposeful mass and begins funneling itself into {subject.name}, wasting nothing.' },
  ]);
  engine.registerModule('spell.interaction.shape_earth.imbue_life', [
    { when: {}, text: 'The stone you shaped a moment ago grinds and rises. What was a basin or a seat now stands as a squat little golem, patient and tireless, waiting to be pointed at someone to feed.' },
  ]);
  engine.registerModule('spell.interaction.grease.imbue_life', [
    { when: {}, text: 'The conjured grease slicking {subject.name} draws together and quickens. Animated, it slides upward and feeds itself between her lips, rich and slippery and impossible to refuse.' },
  ]);

  // ─── Feast Exile (banishment to the endless banquet) ───
  engine.registerModule('spell.scene.feast_exile', [
    {
      when: { stage: { min: 6 } },
      text: 'The air folds, and {subject.name}\'s considerable form is gone — pulled into a realm where the tables never end and the day never closes. Wherever she is now, she is eating, and she will not stop until the spell brings her back.',
    },
    {
      when: {},
      text: 'Reality opens a soft seam and swallows {subject.name} whole. She vanishes toward a pocket realm of endless banquets, where she will gorge through days that pass in a blink before the magic returns her.',
    },
  ]);

  engine.registerModule('spell.interaction.condition.ravenous.feast_exile', [
    { when: {}, text: 'You banish her mid-hunger, and the feast realm is merciless about it. {subject.name} arrives already starving and falls on the endless banquet like a woman possessed — she will come back having eaten far, far more than a calmer exile could ever hold.' },
  ]);
  engine.registerModule('spell.interaction.condition.satiated.feast_exile', [
    { when: {}, text: 'Already stuffed when the seam takes her, {subject.name} is given a realm where fullness simply does not count. Whatever limit she had reached is left behind in this world; in the next, she keeps going regardless.' },
  ]);
  engine.registerModule('spell.interaction.suggestion.feast_exile', [
    { when: {}, text: 'The suggestion still warm in her mind, {subject.name} steps into the exile willingly, even eagerly — sent off to the endless banquet wanting nothing more than to indulge every moment of it.' },
  ]);

  engine.registerModule('spell.interaction.condition.engorged.enlarge_person', [
    { when: {}, text: 'The enlargement pours into a body still swollen and soft from the feast realm. {subject.name} grows on top of the engorgement, her temporary fullness becoming a foundation for something even more lavish.' },
  ]);
  engine.registerModule('spell.interaction.condition.engorged.suggestion', [
    { when: {}, text: 'Flushed and engorged from her exile, {subject.name} is in no state to refuse anything. The suggestion lands on a woman already drunk on indulgence, and she agrees before you have finished speaking.' },
  ]);
  engine.registerModule('spell.interaction.condition.engorged.confection_snare', [
    { when: {}, text: 'The candy bindings wrap a body still round and yielding from the feast realm. There is so much more of {subject.name} to bind now, every soft swell of her engorged form caught and held in sweet restraint.' },
  ]);

}

export default registerSpellModules;
