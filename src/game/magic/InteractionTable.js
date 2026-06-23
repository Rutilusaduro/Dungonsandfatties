// InteractionTable — unified spell interaction registry
//
// Every combo in the game lives here. One enumerable, lintable source of truth.
// content:lint asserts every trigger, partner, and condition key is valid.
//
// Entry shape:
//   id         — stable unique key, format: 'triggerSpell+partnerSpell' (snake_case)
//   trigger    — spell name being cast NOW that activates this combo
//   requires   — predicate: { recentSpell } | { condition } | { zoneState }
//     recentSpell  — string: partner spell must be in target/zone recent-spell ring
//     condition    — string: CONDITION_KEY must be active on target
//     zoneState    — fn(zone): boolean for arbitrary zone predicates
//   symmetric  — true: auto-derive reverse direction (same text+effect, roles swapped)
//   text       — text engine module key (must resolve in content:lint)
//   description — fallback prose / lint reference
//   effect(ctx) — optional fn. ctx = { target, zone, result, createdFoods, createFood,
//                   bonusCalories(amt, src), bonusWeight(amt, src) }
//                 Handles mechanics only; evaluator adds the interaction text.

const TABLE = [

  // ── Water + Earth ─────────────────────────────────────────────────────────
  {
    id: 'create_water+shape_earth',
    trigger: 'Create Water',
    requires: { recentSpell: 'Shape Earth' },
    symmetric: false,
    text: 'spell.interaction.create_water.shape_earth',
    description: 'The newly shaped basin catches the conjured water, creating a usable magical reservoir.',
    effect: ({ result }) => {
      result.environmentalChanges.push({
        type: 'combo_resource',
        description: 'The newly shaped basin catches the conjured water, creating a usable magical reservoir.',
      });
    },
  },

  // ── Ice Cream chain ───────────────────────────────────────────────────────
  {
    id: 'delightful_transmutation+create_water',
    trigger: 'Delightful Transmutation',
    requires: { recentSpell: 'Create Water' },
    symmetric: false,
    text: 'spell.interaction.create_water.delightful_transmutation',
    description: 'Conjured water is converted into a persistent, self-replicating ice cream supply.',
    effect: ({ zone, createdFoods, createFood }) => {
      if (!zone) return;
      const iceCream = createFood('Ice Cream', {
        servings: 10,
        isMagical: true,
        description: 'A persistent reservoir of magical ice cream created from conjured water.',
      }).enableReplication();
      zone.addFood(iceCream, 'Create Water + Delightful Transmutation');
      createdFoods.push(iceCream);
    },
  },

  // ── Detect Cravings synergies ─────────────────────────────────────────────
  {
    id: 'suggestion+detect_cravings',
    trigger: 'Suggestion',
    requires: { recentSpell: 'Detect Cravings' },
    symmetric: false,
    text: 'spell.interaction.detect_cravings.suggestion',
    description: 'Known cravings make the suggestion feel personal and welcome.',
    effect: ({ target }) => {
      if (target && target.willingness !== undefined) {
        target.willingness = Math.min(100, target.willingness + 15);
      }
    },
  },
  {
    id: 'conjure_food+detect_cravings',
    trigger: 'Conjure Food',
    requires: { recentSpell: 'Detect Cravings' },
    symmetric: false,
    text: 'spell.interaction.detect_cravings.conjure_food',
    description: 'The conjured food keys itself to the target\'s favorite tastes.',
    effect: ({ target, zone, createdFoods, createFood }) => {
      const preferredFood = target?.foodLoves?.[0] || target?.foodLikes?.[0];
      if (preferredFood && zone) {
        const food = createFood(preferredFood, {
          isMagical: true,
          description: `${preferredFood} shaped by divined craving.`,
        }).makeAppetizing(25);
        zone.addFood(food, 'Detect Cravings + Conjure Food');
        createdFoods.push(food);
      }
    },
  },

  // ── Feast / appetite chain ────────────────────────────────────────────────
  {
    id: 'ravenous_expansion+create_food_and_water',
    trigger: 'Ravenous Expansion',
    requires: { recentSpell: 'Create Food and Water' },
    symmetric: false,
    text: 'spell.interaction.create_food_and_water.ravenous_expansion',
    description: 'The prepared feast and expanded appetite form a self-reinforcing indulgence loop.',
    effect: ({ bonusCalories }) => bonusCalories(12, 'Create Food and Water + Ravenous Expansion'),
  },
  {
    id: 'haste+ravenous_expansion',
    trigger: 'Haste',
    requires: { recentSpell: 'Ravenous Expansion' },
    symmetric: false,
    text: 'spell.interaction.ravenous_expansion.haste',
    description: 'Expanded capacity and accelerated eating combine into rapid overindulgence.',
    effect: ({ bonusCalories }) => bonusCalories(18, 'Ravenous Expansion + Haste'),
  },
  {
    id: 'rapid_digestion+ravenous_expansion',
    trigger: 'Rapid Digestion',
    requires: { recentSpell: 'Ravenous Expansion' },
    symmetric: false,
    text: 'spell.interaction.ravenous_expansion.rapid_digestion',
    description: 'New hunger and accelerated digestion convert recent indulgence into permanent softness.',
    effect: ({ bonusCalories }) => bonusCalories(20, 'Ravenous Expansion + Rapid Digestion'),
  },
  {
    id: 'fireball+ravenous_expansion',
    trigger: 'Fireball',
    requires: { recentSpell: 'Ravenous Expansion' },
    symmetric: false,
    text: 'spell.interaction.ravenous_expansion.fireball',
    description: 'The blast-roasted feast lands on a target primed to crave every bite.',
    effect: ({ bonusCalories }) => bonusCalories(15, 'Ravenous Expansion + Fireball'),
  },
  {
    id: 'ravenous_expansion+summon_cattle',
    trigger: 'Ravenous Expansion',
    requires: { recentSpell: 'Summon Cattle' },
    symmetric: false,
    text: 'spell.interaction.summon_cattle.ravenous_expansion',
    description: 'Summoned cattle give the expanded appetite something large to focus on.',
  },
  {
    id: 'ravenous_expansion+plant_growth',
    trigger: 'Ravenous Expansion',
    requires: { recentSpell: 'Plant Growth' },
    symmetric: false,
    text: 'spell.interaction.plant_growth.ravenous_expansion',
    description: 'Fresh abundance meets an expanded appetite.',
  },

  // ── Enlarge Person combos ─────────────────────────────────────────────────
  {
    id: 'oozing_abundance+enlarge_person',
    trigger: 'Oozing Abundance',
    requires: { recentSpell: 'Enlarge Person' },
    symmetric: false,
    text: 'spell.interaction.enlarge_person.oozing_abundance',
    description: 'The enlarged body gives the nutritive ooze more surface to coat and feed.',
    effect: ({ target, bonusCalories }) => {
      bonusCalories(10, 'Enlarge Person + Oozing Abundance');
      target?.conditions?.add?.('ooze_coated', { source: 'oozing_abundance', intensity: 2 });
    },
  },
  {
    id: 'grease+enlarge_person',
    trigger: 'Grease',
    requires: { recentSpell: 'Enlarge Person' },
    symmetric: false,
    text: 'spell.interaction.enlarge_person.grease',
    description: 'Grease catches the light across the enlarged target, emphasizing every softened curve.',
  },
  {
    id: 'enlarge_person+suggestion',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Suggestion' },
    symmetric: false,
    text: 'spell.interaction.suggestion.enlarge_person',
    description: 'A willing indulgent mindset makes the growth feel luxuriant instead of shocking.',
    effect: ({ bonusWeight }) => bonusWeight(8, 'Suggestion + Enlarge Person'),
  },

  // ── Size magic rebounds ───────────────────────────────────────────────────
  {
    id: 'reduce_person+enlarge_person',
    trigger: 'Reduce Person',
    requires: { recentSpell: 'Enlarge Person' },
    symmetric: false,
    text: 'spell.interaction.enlarge_person.reduce_person',
    description: 'Opposed size magic rebounds, leaving the target flushed by the sudden contrast.',
  },
  {
    id: 'enlarge_person+reduce_person',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Reduce Person' },
    symmetric: false,
    text: 'spell.interaction.reduce_person.enlarge_person',
    description: 'The rebound from reduction makes the new growth arrive with extra softness.',
    effect: ({ bonusWeight }) => bonusWeight(6, 'Reduce Person + Enlarge Person'),
  },

  // ── Duplication combos ────────────────────────────────────────────────────
  {
    id: 'duplication+delightful_transmutation',
    trigger: 'Duplication',
    requires: { recentSpell: 'Delightful Transmutation' },
    symmetric: false,
    text: 'spell.interaction.delightful_transmutation.duplication',
    description: 'The magical dessert doubles into an escalating supply.',
    effect: ({ zone, createdFoods, createFood }) => {
      const existingIceCream = zone?.getFoods?.().find(f => f.name === 'Ice Cream');
      if (existingIceCream && zone) {
        const duplicate = createFood('Ice Cream', {
          servings: existingIceCream.servings,
          caloriesPerServing: existingIceCream.caloriesPerServing,
          isMagical: true,
          description: 'A doubled copy of the transmuted magical ice cream.',
        }).enableReplication();
        zone.addFood(duplicate, 'Delightful Transmutation + Duplication');
        createdFoods.push(duplicate);
      }
    },
  },
  {
    id: 'duplication+culinary_transmutation',
    trigger: 'Duplication',
    requires: { recentSpell: 'Culinary Transmutation' },
    symmetric: false,
    text: 'spell.interaction.culinary_transmutation.duplication',
    description: 'The transformed object-food becomes a duplicating supply.',
  },
  {
    id: 'create_food_and_water+duplication',
    trigger: 'Create Food and Water',
    requires: { recentSpell: 'Duplication' },
    symmetric: false,
    text: 'spell.interaction.duplication.create_food_and_water',
    description: 'The conjured banquet inherits duplication magic and arrives already multiplied.',
    effect: ({ zone, createdFoods, createFood }) => {
      const banquet = createFood('Food', {
        servings: 20,
        caloriesPerServing: 650,
        isMagical: true,
        description: 'A doubled banquet anchored by prior duplication magic.',
      });
      zone?.addFood?.(banquet, 'Duplication + Create Food and Water');
      createdFoods.push(banquet);
    },
  },

  // ── Illusion food ─────────────────────────────────────────────────────────
  {
    id: 'feast_of_shadows+prestidigitation',
    trigger: 'Feast of Shadows',
    requires: { recentSpell: 'Prestidigitation' },
    symmetric: false,
    text: 'spell.interaction.prestidigitation.feast_of_shadows',
    description: 'Minor sensory magic makes the illusion taste and smell dangerously convincing.',
    effect: ({ bonusCalories }) => bonusCalories(5, 'Prestidigitation + Feast of Shadows'),
  },
  {
    id: 'rapid_digestion+feast_of_shadows',
    trigger: 'Rapid Digestion',
    requires: { recentSpell: 'Feast of Shadows' },
    symmetric: false,
    text: 'spell.interaction.feast_of_shadows.rapid_digestion',
    description: 'Illusory indulgence becomes physically consequential as digestion magic makes the body believe.',
    effect: ({ bonusCalories }) => bonusCalories(10, 'Feast of Shadows + Rapid Digestion'),
  },

  // ── Restraint / coating combos ────────────────────────────────────────────
  {
    id: 'confection_snare+grease',
    trigger: 'Confection Snare',
    requires: { recentSpell: 'Grease' },
    symmetric: false,
    text: 'spell.interaction.grease.confection_snare',
    description: 'Sticky candy and glossy grease merge into a slick, sweet restraint.',
  },
  {
    id: 'confection_snare+culinary_transmutation',
    trigger: 'Confection Snare',
    requires: { recentSpell: 'Culinary Transmutation' },
    symmetric: false,
    text: 'spell.interaction.culinary_transmutation.confection_snare',
    description: 'Confection bindings can draw transformed object-food into their feeding routine.',
  },
  {
    id: 'confection_snare+slow',
    trigger: 'Confection Snare',
    requires: { recentSpell: 'Slow' },
    symmetric: false,
    text: 'spell.interaction.slow.confection_snare',
    description: 'Slowed movement helps the bindings control the target.',
  },
  {
    id: 'morph_mass+oozing_abundance',
    trigger: 'Morph Mass',
    requires: { recentSpell: 'Oozing Abundance' },
    symmetric: false,
    text: 'spell.interaction.oozing_abundance.morph_mass',
    description: 'Nutrient-rich ooze gives the mass transmutation more material to fold inward.',
    effect: ({ bonusWeight }) => bonusWeight(16, 'Oozing Abundance + Morph Mass'),
  },

  // ── Suggestion combos ─────────────────────────────────────────────────────
  {
    id: 'suggestion+ravenous_expansion',
    trigger: 'Suggestion',
    requires: { recentSpell: 'Ravenous Expansion' },
    symmetric: false,
    text: 'spell.interaction.ravenous_expansion.suggestion',
    description: 'The target is already hungry enough that the suggestion barely needs to push.',
    effect: ({ target }) => {
      if (target && target.willingness !== undefined) {
        target.willingness = Math.min(100, target.willingness + 20);
      }
    },
  },
  {
    id: 'suggestion+culinary_transmutation',
    trigger: 'Suggestion',
    requires: { recentSpell: 'Culinary Transmutation' },
    symmetric: false,
    text: 'spell.interaction.culinary_transmutation.suggestion',
    description: 'Suggestion lets the target choose from food made out of nearby objects.',
  },
  {
    id: 'suggestion+goodberry',
    trigger: 'Suggestion',
    requires: { recentSpell: 'Goodberry' },
    symmetric: false,
    text: 'spell.interaction.goodberry.suggestion',
    description: 'Goodberries offer a small, easy choice for a suggested target.',
  },
  {
    id: 'suggestion+slow',
    trigger: 'Suggestion',
    requires: { recentSpell: 'Slow' },
    symmetric: false,
    text: 'spell.interaction.slow.suggestion',
    description: 'Slowed metabolism makes the target\'s chosen food settle heavier.',
  },

  // ── Haste combos ──────────────────────────────────────────────────────────
  {
    id: 'haste+suggestion',
    trigger: 'Haste',
    requires: { recentSpell: 'Suggestion' },
    symmetric: false,
    text: 'spell.interaction.suggestion.haste',
    description: 'A persuaded appetite becomes eager, quick, and hard to slow down.',
  },
  {
    id: 'haste+slow',
    trigger: 'Haste',
    requires: { recentSpell: 'Slow' },
    symmetric: false,
    text: 'spell.interaction.slow.haste',
    description: 'Haste disrupts the slowing field and creates metabolic whiplash.',
    effect: ({ target }) => {
      target?.conditions?.remove?.('slowed');
      if (target) target.calorieRetentionMultiplier = 1;
    },
  },
  {
    id: 'slow+haste',
    trigger: 'Slow',
    requires: { recentSpell: 'Haste' },
    symmetric: false,
    text: 'spell.interaction.haste.slow',
    description: 'Slow counters haste and forces the pace back down.',
  },

  // ── Gravity / float interactions ──────────────────────────────────────────
  {
    id: 'telekinesis+float',
    trigger: 'Telekinesis',
    requires: { recentSpell: 'Float' },
    symmetric: false,
    text: 'spell.interaction.float.telekinesis',
    description: 'Reduced gravity makes telekinetic placement easier and gentler.',
  },
  {
    id: 'float+enhance_gravity',
    trigger: 'Float',
    requires: { recentSpell: 'Enhance Gravity' },
    symmetric: false,
    text: 'spell.interaction.enhance_gravity.float',
    description: 'Float pushes back against the previous gravity enhancement.',
  },
  {
    id: 'enhance_gravity+float',
    trigger: 'Enhance Gravity',
    requires: { recentSpell: 'Float' },
    symmetric: false,
    text: 'spell.interaction.float.enhance_gravity',
    description: 'Enhanced gravity cancels the float and drags the target back down.',
    effect: ({ target }) => {
      target?.conditions?.remove?.('floating');
      target?.conditions?.remove?.('floor_tethered');
      if (target) {
        target.floatOverride = false;
        target.isFloating = false;
        target.floorTethered = false;
      }
    },
  },

  // ── Summon Cattle combos ──────────────────────────────────────────────────
  {
    id: 'flesh_to_food+summon_cattle',
    trigger: 'Flesh to Food',
    requires: { recentSpell: 'Summon Cattle' },
    symmetric: false,
    text: 'spell.interaction.summon_cattle.flesh_to_food',
    description: 'Summoned cattle become an enormous food source.',
  },
  {
    id: 'enhance_gravity+summon_cattle',
    trigger: 'Enhance Gravity',
    requires: { recentSpell: 'Summon Cattle' },
    symmetric: false,
    text: 'spell.interaction.summon_cattle.enhance_gravity',
    description: 'Large summoned bodies become more hazardous under enhanced gravity.',
  },

  // ── Plant Growth ──────────────────────────────────────────────────────────
  {
    id: 'plant_growth+create_water',
    trigger: 'Plant Growth',
    requires: { recentSpell: 'Create Water' },
    symmetric: false,
    text: 'spell.interaction.create_water.plant_growth',
    description: 'Conjured water increases the edible growth yield.',
    effect: ({ zone, createdFoods, createFood }) => {
      const bonusFood = createFood('Produce', {
        servings: 6,
        caloriesPerServing: 280,
        isMagical: true,
        description: 'Extra produce grown from conjured water.',
      });
      zone?.addFood?.(bonusFood, 'Create Water + Plant Growth');
      createdFoods.push(bonusFood);
    },
  },

  // ── Grease transmutation ──────────────────────────────────────────────────
  {
    id: 'delightful_transmutation+grease',
    trigger: 'Delightful Transmutation',
    requires: { recentSpell: 'Grease' },
    symmetric: false,
    text: 'spell.interaction.grease.delightful_transmutation',
    description: 'The slick conjuration sweetens into a dessert-like glaze.',
  },

  // ── Helpless / restraint stacking (prose pre-authored, now wired) ─────────
  {
    id: 'erupting_earth+hold_person',
    trigger: 'Erupting Earth',
    requires: { recentSpell: 'Hold Person' },
    symmetric: false,
    text: 'spell.interaction.hold_person.erupting_earth',
    description: 'The paralyzed target cannot dodge the food eruption and consumes it helplessly.',
  },
  {
    id: 'hold_person+rapid_digestion',
    trigger: 'Hold Person',
    requires: { recentSpell: 'Rapid Digestion' },
    symmetric: false,
    text: 'spell.interaction.rapid_digestion.hold_person',
    description: 'Satiated and paralyzed — trapped in a fullness she cannot eat through.',
  },
  {
    id: 'hold_person+fireball',
    trigger: 'Hold Person',
    requires: { recentSpell: 'Fireball' },
    symmetric: false,
    text: 'spell.interaction.fireball.hold_person',
    description: 'Roasted food rains on the paralyzed target, who can only swallow.',
  },
  {
    id: 'erupting_earth+polymorph',
    trigger: 'Erupting Earth',
    requires: { recentSpell: 'Polymorph' },
    symmetric: false,
    text: 'spell.interaction.polymorph.erupting_earth',
    description: 'The transformed beast\'s enlarged form gives the eruption more surface to coat and feed.',
  },
  {
    id: 'confection_snare+hold_person',
    trigger: 'Confection Snare',
    requires: { recentSpell: 'Hold Person' },
    symmetric: false,
    text: 'spell.interaction.hold_person.confection_snare',
    description: 'Paralyzed and bound in candy — doubly secured by magic and licorice.',
  },
  {
    id: 'erupting_earth+confection_snare',
    trigger: 'Erupting Earth',
    requires: { recentSpell: 'Confection Snare' },
    symmetric: false,
    text: 'spell.interaction.confection_snare.erupting_earth',
    description: 'Bound by candy vines, she cannot escape the food eruption that buries her.',
  },

  // ── Sympathetic Bond family ───────────────────────────────────────────────
  {
    id: 'suggestion+sympathetic_bond',
    trigger: 'Suggestion',
    requires: { recentSpell: 'Sympathetic Bond' },
    symmetric: false,
    text: 'spell.interaction.sympathetic_bond.suggestion',
    description: 'The bond makes the suggestion resonate — both partners nearly choose in unison.',
  },
  {
    id: 'erupting_earth+sympathetic_bond',
    trigger: 'Erupting Earth',
    requires: { recentSpell: 'Sympathetic Bond' },
    symmetric: false,
    text: 'spell.interaction.sympathetic_bond.erupting_earth',
    description: 'Through the bond, the buried target\'s partner feels the weight and pressure too.',
  },
  {
    id: 'confection_snare+sympathetic_bond',
    trigger: 'Confection Snare',
    requires: { recentSpell: 'Sympathetic Bond' },
    symmetric: false,
    text: 'spell.interaction.sympathetic_bond.confection_snare',
    description: 'The bindings ensnare one; through the bond the partner feels the tightness as well.',
  },
  {
    id: 'ravenous_expansion+sympathetic_bond',
    trigger: 'Ravenous Expansion',
    requires: { recentSpell: 'Sympathetic Bond' },
    symmetric: false,
    text: 'spell.interaction.sympathetic_bond.ravenous_expansion',
    description: 'Hunger echoes across the bond — both partners ravenous now, and at rest.',
    effect: ({ bonusCalories }) => bonusCalories(10, 'Sympathetic Bond + Ravenous Expansion'),
  },

  // ── Covetous Siphon family ────────────────────────────────────────────────
  {
    id: 'reduce_person+covetous_siphon',
    trigger: 'Reduce Person',
    requires: { recentSpell: 'Covetous Siphon' },
    symmetric: false,
    text: 'spell.interaction.covetous_siphon.reduce_person',
    description: 'Reduction compounds the siphon\'s theft — she becomes smaller in every measurable way.',
  },
  {
    id: 'enlarge_person+covetous_siphon',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Covetous Siphon' },
    symmetric: false,
    text: 'spell.interaction.covetous_siphon.enlarge_person',
    description: 'Stolen weight finds the destination, who swells doubly with magic and newfound mass.',
    effect: ({ bonusWeight }) => bonusWeight(10, 'Covetous Siphon + Enlarge Person'),
  },
  {
    id: 'rapid_digestion+covetous_siphon',
    trigger: 'Rapid Digestion',
    requires: { recentSpell: 'Covetous Siphon' },
    symmetric: false,
    text: 'spell.interaction.covetous_siphon.rapid_digestion',
    description: 'Siphon and accelerated digestion compound — she loses mass with nowhere to put what she eats.',
  },
  {
    id: 'enhance_gravity+covetous_siphon',
    trigger: 'Enhance Gravity',
    requires: { recentSpell: 'Covetous Siphon' },
    symmetric: false,
    text: 'spell.interaction.covetous_siphon.enhance_gravity',
    description: 'Stolen weight plus enhanced gravity pushes the recipient down with terrible force.',
  },

  // ── Draconic Hunger family ────────────────────────────────────────────────
  {
    id: 'summon_cattle+draconic_hunger',
    trigger: 'Summon Cattle',
    requires: { recentSpell: 'Draconic Hunger' },
    symmetric: false,
    text: 'spell.interaction.draconic_hunger.summon_cattle',
    description: 'The cattle arrive as prey to an awakened draconic hunger — immediate and overwhelming.',
  },
  {
    id: 'ravenous_expansion+draconic_hunger',
    trigger: 'Ravenous Expansion',
    requires: { recentSpell: 'Draconic Hunger' },
    symmetric: false,
    text: 'spell.interaction.draconic_hunger.ravenous_expansion',
    description: 'Draconic hunger plus the ravenous state — dragons do not stop eating.',
    effect: ({ bonusCalories }) => bonusCalories(15, 'Draconic Hunger + Ravenous Expansion'),
  },
  {
    id: 'flesh_to_food+draconic_hunger',
    trigger: 'Flesh to Food',
    requires: { recentSpell: 'Draconic Hunger' },
    symmetric: false,
    text: 'spell.interaction.draconic_hunger.flesh_to_food',
    description: 'The devoured creature is transmuted into food the draconic spell makes consumable.',
  },
  {
    id: 'polymorph+draconic_hunger',
    trigger: 'Polymorph',
    requires: { recentSpell: 'Draconic Hunger' },
    symmetric: false,
    text: 'spell.interaction.draconic_hunger.polymorph',
    description: 'The beast-form inherits the draconic appetite — immediate and total.',
  },

  // ── Ambrosial Aura family ─────────────────────────────────────────────────
  {
    id: 'plant_growth+ambrosial_aura',
    trigger: 'Plant Growth',
    requires: { recentSpell: 'Ambrosial Aura' },
    symmetric: false,
    text: 'spell.interaction.ambrosial_aura.plant_growth',
    description: 'The aura enriches the growth — plants erupt more abundant and magically nourishing.',
  },
  {
    id: 'create_food_and_water+ambrosial_aura',
    trigger: 'Create Food and Water',
    requires: { recentSpell: 'Ambrosial Aura' },
    symmetric: false,
    text: 'spell.interaction.ambrosial_aura.create_food_and_water',
    description: 'Conjured food arrives into an aura-thick zone, stacking caloric abundance.',
  },

  // ── P3.2 coverage fill: structure & support (immobility/size theme) ────────
  {
    id: 'shape_wood+arcane_appraisal',
    trigger: 'Shape Wood',
    requires: { recentSpell: 'Arcane Appraisal' },
    symmetric: false,
    text: 'spell.interaction.arcane_appraisal.shape_wood',
    description: 'Knowing the breaking point, you shape the wood to exceed it — a seat rated far past her current size.',
  },
  {
    id: 'telekinesis+arcane_appraisal',
    trigger: 'Telekinesis',
    requires: { recentSpell: 'Arcane Appraisal' },
    symmetric: false,
    text: 'spell.interaction.arcane_appraisal.telekinesis',
    description: 'The appraisal confirmed the surface holds; you set her down onto it without hesitation.',
  },
  {
    id: 'shape_earth+arcane_appraisal',
    trigger: 'Shape Earth',
    requires: { recentSpell: 'Arcane Appraisal' },
    symmetric: false,
    text: 'spell.interaction.arcane_appraisal.shape_earth',
    description: 'You read the ground\'s tolerance, then shape stone to exceed it — a seat that will not crack as she grows.',
  },
  {
    id: 'shape_wood+shape_earth',
    trigger: 'Shape Wood',
    requires: { recentSpell: 'Shape Earth' },
    symmetric: false,
    text: 'spell.interaction.shape_earth.shape_wood',
    description: 'Stone foundation and shaped wood rise into one feeding station, built so she never stands to eat.',
  },
  {
    id: 'telekinesis+shape_wood',
    trigger: 'Telekinesis',
    requires: { recentSpell: 'Shape Wood' },
    symmetric: false,
    text: 'spell.interaction.shape_wood.telekinesis',
    description: 'The feeding chair waits already shaped; you guide her down into wood made to hold exactly her.',
  },

  // ── P3.2 coverage fill: mass & appetite (size/stuffing theme) ──────────────
  {
    id: 'morph_mass+conjure_food',
    trigger: 'Morph Mass',
    requires: { recentSpell: 'Conjure Food' },
    symmetric: false,
    text: 'spell.interaction.conjure_food.morph_mass',
    description: 'Conjured food folds into the absorption, packing onto her in rich, heavy layers.',
    effect: ({ bonusWeight }) => bonusWeight(8, 'Conjure Food + Morph Mass'),
  },
  {
    id: 'morph_mass+polymorph',
    trigger: 'Morph Mass',
    requires: { recentSpell: 'Polymorph' },
    symmetric: false,
    text: 'spell.interaction.polymorph.morph_mass',
    description: 'The beast-form\'s bulk gives the mass transmutation more to drag lower, broader, heavier.',
    effect: ({ bonusWeight }) => bonusWeight(12, 'Polymorph + Morph Mass'),
  },
  {
    id: 'conjure_food+goodberry',
    trigger: 'Conjure Food',
    requires: { recentSpell: 'Goodberry' },
    symmetric: false,
    text: 'spell.interaction.goodberry.conjure_food',
    description: 'The little berries sit beside the feast — and an afterthought is exactly what gets eaten absently.',
  },
  {
    id: 'goodberry+detect_cravings',
    trigger: 'Goodberry',
    requires: { recentSpell: 'Detect Cravings' },
    symmetric: false,
    text: 'spell.interaction.detect_cravings.goodberry',
    description: 'Each berry tuned to her craving vanishes three and four at a time, her hand returning unnoticed.',
    effect: ({ bonusCalories }) => bonusCalories(6, 'Detect Cravings + Goodberry'),
  },

  // ── P3.2 coverage fill: flavor & temptation (feeder theme) ─────────────────
  {
    id: 'prestidigitation+conjure_food',
    trigger: 'Prestidigitation',
    requires: { recentSpell: 'Conjure Food' },
    symmetric: false,
    text: 'spell.interaction.conjure_food.prestidigitation',
    description: 'A flick of magic warms the conjured food and releases butter and sugar into the air — impossible to walk past.',
  },
  {
    id: 'prestidigitation+goodberry',
    trigger: 'Prestidigitation',
    requires: { recentSpell: 'Goodberry' },
    symmetric: false,
    text: 'spell.interaction.goodberry.prestidigitation',
    description: 'The cantrip sweetens each berry into a small, moreish pleasure she keeps reaching for.',
  },
  {
    id: 'feast_of_shadows+detect_cravings',
    trigger: 'Feast of Shadows',
    requires: { recentSpell: 'Detect Cravings' },
    symmetric: false,
    text: 'spell.interaction.detect_cravings.feast_of_shadows',
    description: 'The illusion shapes itself from her cravings — every phantom dish exactly what she most wanted, and her body believes it.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Detect Cravings + Feast of Shadows'),
  },

  // ── P3.2 coverage fill: roast & transmute (stuffing theme) ─────────────────
  {
    id: 'fireball+polymorph',
    trigger: 'Fireball',
    requires: { recentSpell: 'Polymorph' },
    symmetric: false,
    text: 'spell.interaction.polymorph.fireball',
    description: 'Roasted abundance rains on the beast-form; its insatiable appetite devours without pause, swelling visibly.',
    effect: ({ bonusCalories }) => bonusCalories(12, 'Polymorph + Fireball'),
  },
  {
    id: 'flesh_to_food+fireball',
    trigger: 'Flesh to Food',
    requires: { recentSpell: 'Fireball' },
    symmetric: false,
    text: 'spell.interaction.fireball.flesh_to_food',
    description: 'What the flames roasted, the transmutation completes — flesh becomes warm, seasoned, edible abundance.',
  },
  {
    id: 'oozing_abundance+ambrosial_aura',
    trigger: 'Oozing Abundance',
    requires: { recentSpell: 'Ambrosial Aura' },
    symmetric: false,
    text: 'spell.interaction.ambrosial_aura.oozing_abundance',
    description: 'The ooze-arrow flies through air thick with nourishment, striking heavier and coating thicker.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Ambrosial Aura + Oozing Abundance'),
  },

  // ════════════════════════════════════════════════════════════════════════
  // P3.3 — CONDITION-KEYED COMBOS
  // Fire on lasting STATE (target.conditions), not recent casts. The emergent
  // layer. Only conditions actually set in play: restrained, buried, satiated,
  // enlarged, ravenous, ooze_coated.
  // ════════════════════════════════════════════════════════════════════════

  // ── Immobility: growth/feeding on a target that can't escape ──────────────
  {
    id: 'enlarge_person@restrained',
    trigger: 'Enlarge Person',
    requires: { condition: 'restrained' },
    symmetric: false,
    text: 'spell.interaction.condition.restrained.enlarge_person',
    description: 'Held fast, she can only grow — swelling against her bonds until she fills the space she cannot leave.',
    effect: ({ bonusWeight }) => bonusWeight(6, 'Enlarge Person on restrained target'),
  },
  {
    id: 'enlarge_person@buried',
    trigger: 'Enlarge Person',
    requires: { condition: 'buried' },
    symmetric: false,
    text: 'spell.interaction.condition.buried.enlarge_person',
    description: 'Buried and growing, she packs the earth tighter around herself, wedged ever more firmly into the ground.',
    effect: ({ bonusWeight }) => bonusWeight(6, 'Enlarge Person on buried target'),
  },
  {
    id: 'oozing_abundance@restrained',
    trigger: 'Oozing Abundance',
    requires: { condition: 'restrained' },
    symmetric: false,
    text: 'spell.interaction.condition.restrained.oozing_abundance',
    description: 'She cannot dodge; the nutritive ooze strikes and spreads across skin she cannot wipe clean.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Oozing Abundance on restrained target'),
  },
  {
    id: 'telekinesis@satiated',
    trigger: 'Telekinesis',
    requires: { condition: 'satiated' },
    symmetric: false,
    text: 'spell.interaction.condition.satiated.telekinesis',
    description: 'Stuffed and sluggish, she barely resists being lifted and set down onto the waiting seat.',
  },

  // ── Stuffing: feeding a target whose hunger or fullness is already extreme ─
  {
    id: 'feast_of_shadows@ravenous',
    trigger: 'Feast of Shadows',
    requires: { condition: 'ravenous' },
    symmetric: false,
    text: 'spell.interaction.condition.ravenous.feast_of_shadows',
    description: 'Phantom food before real hunger; she devours the illusion and her body settles every imagined calorie.',
    effect: ({ bonusCalories }) => bonusCalories(10, 'Feast of Shadows for ravenous target'),
  },
  {
    id: 'suggestion@satiated',
    trigger: 'Suggestion',
    requires: { condition: 'satiated' },
    symmetric: false,
    text: 'spell.interaction.condition.satiated.suggestion',
    description: 'Already full is exactly when a gentle suggestion works best — one more bite, and she finds the room.',
    effect: ({ target, bonusCalories }) => {
      if (target && target.willingness !== undefined) {
        target.willingness = Math.min(100, target.willingness + 10);
      }
      bonusCalories(6, 'Suggestion on satiated target');
    },
  },

  // ── Size & coating: spells that compound an already-altered body ──────────
  {
    id: 'morph_mass@enlarged',
    trigger: 'Morph Mass',
    requires: { condition: 'enlarged' },
    symmetric: false,
    text: 'spell.interaction.condition.enlarged.morph_mass',
    description: 'An already-enormous frame gives the mass transmutation more to load; matter folds on by the armful.',
    effect: ({ bonusWeight }) => bonusWeight(14, 'Morph Mass on enlarged target'),
  },
  {
    id: 'confection_snare@ooze_coated',
    trigger: 'Confection Snare',
    requires: { condition: 'ooze_coated' },
    symmetric: false,
    text: 'spell.interaction.condition.ooze_coated.confection_snare',
    description: 'Candy bindings find the ooze already slicking her and take hold instantly — sticky meeting sticky.',
  },

  // ════════════════════════════════════════════════════════════════════════
  // P3.4 — NEW THEMED SPELL COMBOS
  // ════════════════════════════════════════════════════════════════════════

  // ── Rooting Glut (immobility) ─────────────────────────────────────────────
  {
    id: 'enlarge_person+rooting_glut',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Rooting Glut' },
    symmetric: false,
    text: 'spell.interaction.rooting_glut.enlarge_person',
    description: 'Rooted in place, she can only grow where she stands, swelling against an anchor she cannot break.',
    effect: ({ bonusWeight }) => bonusWeight(8, 'Rooting Glut + Enlarge Person'),
  },
  {
    id: 'morph_mass+rooting_glut',
    trigger: 'Morph Mass',
    requires: { recentSpell: 'Rooting Glut' },
    symmetric: false,
    text: 'spell.interaction.rooting_glut.morph_mass',
    description: 'The anchored body is a perfect well for the mass transmutation; she cannot rise out from under it.',
    effect: ({ bonusWeight }) => bonusWeight(10, 'Rooting Glut + Morph Mass'),
  },
  {
    id: 'oozing_abundance+rooting_glut',
    trigger: 'Oozing Abundance',
    requires: { recentSpell: 'Rooting Glut' },
    symmetric: false,
    text: 'spell.interaction.rooting_glut.oozing_abundance',
    description: 'Rooted and unable to dodge, she can only sit and take the nutritive ooze where she is anchored.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Rooting Glut + Oozing Abundance'),
  },
  {
    id: 'rooting_glut@enlarged',
    trigger: 'Rooting Glut',
    requires: { condition: 'enlarged' },
    symmetric: false,
    text: 'spell.interaction.condition.enlarged.rooting_glut',
    description: 'Already enormous, she is rooted in place by her own mass — fixed completely.',
  },

  // ── Bottomless Gullet (stuffing) ──────────────────────────────────────────
  {
    id: 'feast_of_shadows+bottomless_gullet',
    trigger: 'Feast of Shadows',
    requires: { recentSpell: 'Bottomless Gullet' },
    symmetric: false,
    text: 'spell.interaction.bottomless_gullet.feast_of_shadows',
    description: 'With fullness pushed out of reach, the illusory feast never has to stop — a meal becomes a marathon.',
    effect: ({ bonusCalories }) => bonusCalories(12, 'Bottomless Gullet + Feast of Shadows'),
  },
  {
    id: 'oozing_abundance+bottomless_gullet',
    trigger: 'Oozing Abundance',
    requires: { recentSpell: 'Bottomless Gullet' },
    symmetric: false,
    text: 'spell.interaction.bottomless_gullet.oozing_abundance',
    description: 'The nutritive ooze pours into a gullet with no floor — no fullness to slow it, sinking endlessly.',
    effect: ({ bonusCalories }) => bonusCalories(12, 'Bottomless Gullet + Oozing Abundance'),
  },
  {
    id: 'suggestion+bottomless_gullet',
    trigger: 'Suggestion',
    requires: { recentSpell: 'Bottomless Gullet' },
    symmetric: false,
    text: 'spell.interaction.bottomless_gullet.suggestion',
    description: 'Eat your fill, you suggest — but with capacity made bottomless, she simply keeps going with no end.',
  },
  {
    id: 'bottomless_gullet@satiated',
    trigger: 'Bottomless Gullet',
    requires: { condition: 'satiated' },
    symmetric: false,
    text: 'spell.interaction.condition.satiated.bottomless_gullet',
    description: 'Stuffed to the brim is exactly the moment the spell opens her further — abruptly there is room again.',
  },

  // ── Feeder's Devotion (feeder) ────────────────────────────────────────────
  {
    id: "suggestion+feeders_devotion",
    trigger: 'Suggestion',
    requires: { recentSpell: "Feeder's Devotion" },
    symmetric: false,
    text: "spell.interaction.feeder's_devotion.suggestion",
    description: 'Devotion and suggestion fold together; she does not feel pushed, she feels adored, and opens willingly.',
  },
  {
    id: "detect_cravings+feeders_devotion",
    trigger: 'Detect Cravings',
    requires: { recentSpell: "Feeder's Devotion" },
    symmetric: false,
    text: "spell.interaction.feeder's_devotion.detect_cravings",
    description: 'Fed exactly what she loves by someone she now adores, she melts into the feeding completely.',
  },
  {
    id: "oozing_abundance+feeders_devotion",
    trigger: 'Oozing Abundance',
    requires: { recentSpell: "Feeder's Devotion" },
    symmetric: false,
    text: "spell.interaction.feeder's_devotion.oozing_abundance",
    description: 'Bathed in devotion, she welcomes the rush of nutritive ooze, leaning into the coating rather than away.',
  },
  {
    id: "feeders_devotion@restrained",
    trigger: "Feeder's Devotion",
    requires: { condition: 'restrained' },
    symmetric: false,
    text: "spell.interaction.condition.restrained.feeder's_devotion",
    description: 'Bound and unable to leave the feeding, she is wrapped in adoration and finds she no longer wants to.',
  },

  // ── Swelling Tide (growth) ────────────────────────────────────────────────
  {
    id: 'enlarge_person+swelling_tide',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Swelling Tide' },
    symmetric: false,
    text: 'spell.interaction.swelling_tide.enlarge_person',
    description: 'The enlargement crests on a rising tide, surging her outward far larger than either spell alone.',
    effect: ({ bonusWeight }) => bonusWeight(10, 'Swelling Tide + Enlarge Person'),
  },
  {
    id: 'morph_mass+swelling_tide',
    trigger: 'Morph Mass',
    requires: { recentSpell: 'Swelling Tide' },
    symmetric: false,
    text: 'spell.interaction.swelling_tide.morph_mass',
    description: 'Mass transmutation feeds the tide and the tide feeds it back — the growth compounding with no crest.',
    effect: ({ bonusWeight }) => bonusWeight(14, 'Swelling Tide + Morph Mass'),
  },
  {
    id: 'ravenous_expansion+swelling_tide',
    trigger: 'Ravenous Expansion',
    requires: { recentSpell: 'Swelling Tide' },
    symmetric: false,
    text: 'spell.interaction.swelling_tide.ravenous_expansion',
    description: 'A rising tide of growth meets bottomless hunger; she swells as she gorges and gorges as she swells.',
    effect: ({ bonusCalories }) => bonusCalories(12, 'Swelling Tide + Ravenous Expansion'),
  },
  {
    id: 'swelling_tide@ravenous',
    trigger: 'Swelling Tide',
    requires: { condition: 'ravenous' },
    symmetric: false,
    text: 'spell.interaction.condition.ravenous.swelling_tide',
    description: 'The tide rises through a body already wild with hunger, each cresting higher with the other.',
    effect: ({ bonusWeight }) => bonusWeight(8, 'Swelling Tide on ravenous target'),
  },

  // ── Imbue Life (animation) ────────────────────────────────────────────────
  {
    id: 'imbue_life@ooze_coated',
    trigger: 'Imbue Life',
    requires: { condition: 'ooze_coated' },
    symmetric: false,
    text: 'spell.interaction.condition.ooze_coated.imbue_life',
    description: 'The ooze sheeting her comes alive, climbs to her lips, and feeds every rich drop of itself into her.',
    // No bonus here: the spell's Animate Coating effect already feeds the coating in.
  },
  {
    id: 'imbue_life+oozing_abundance',
    trigger: 'Imbue Life',
    requires: { recentSpell: 'Oozing Abundance' },
    symmetric: false,
    text: 'spell.interaction.oozing_abundance.imbue_life',
    description: 'The fresh ooze coating rises as one purposeful mass and funnels itself into her, wasting nothing.',
  },
  {
    id: 'imbue_life+shape_earth',
    trigger: 'Imbue Life',
    requires: { recentSpell: 'Shape Earth' },
    symmetric: false,
    text: 'spell.interaction.shape_earth.imbue_life',
    description: 'The stone you just shaped grinds upright as a squat little feeder golem.',
  },
  {
    id: 'imbue_life+grease',
    trigger: 'Imbue Life',
    requires: { recentSpell: 'Grease' },
    symmetric: false,
    text: 'spell.interaction.grease.imbue_life',
    description: 'The grease slicking her draws together, animates, and feeds itself between her lips.',
  },

  // ── Feast Exile (banishment) ──────────────────────────────────────────────
  {
    id: 'feast_exile@ravenous',
    trigger: 'Feast Exile',
    requires: { condition: 'ravenous' },
    symmetric: false,
    text: 'spell.interaction.condition.ravenous.feast_exile',
    description: 'Banished mid-hunger, she falls on the endless banquet possessed — returning far heavier than a calm exile.',
  },
  {
    id: 'feast_exile@satiated',
    trigger: 'Feast Exile',
    requires: { condition: 'satiated' },
    symmetric: false,
    text: 'spell.interaction.condition.satiated.feast_exile',
    description: 'Already stuffed, she is sent to a realm where fullness does not count, and keeps going regardless.',
  },
  {
    id: 'feast_exile+suggestion',
    trigger: 'Feast Exile',
    requires: { recentSpell: 'Suggestion' },
    symmetric: false,
    text: 'spell.interaction.suggestion.feast_exile',
    description: 'The suggestion still warm, she steps into the exile willingly, wanting only to indulge.',
  },

  // ── engorged returnees: combos that key off the post-exile state ──────────
  {
    id: 'enlarge_person@engorged',
    trigger: 'Enlarge Person',
    requires: { condition: 'engorged' },
    symmetric: false,
    text: 'spell.interaction.condition.engorged.enlarge_person',
    description: 'Growth pours into a body still swollen from the feast realm, building on the temporary fullness.',
    effect: ({ bonusWeight }) => bonusWeight(8, 'Enlarge Person on engorged target'),
  },
  {
    id: 'suggestion@engorged',
    trigger: 'Suggestion',
    requires: { condition: 'engorged' },
    symmetric: false,
    text: 'spell.interaction.condition.engorged.suggestion',
    description: 'Flushed and engorged from exile, she is in no state to refuse, agreeing before you finish speaking.',
    effect: ({ target }) => {
      if (target && target.willingness !== undefined) {
        target.willingness = Math.min(100, target.willingness + 15);
      }
    },
  },
  {
    id: 'confection_snare@engorged',
    trigger: 'Confection Snare',
    requires: { condition: 'engorged' },
    symmetric: false,
    text: 'spell.interaction.condition.engorged.confection_snare',
    description: 'Candy bindings wrap a body still round and yielding — so much more of her to catch and hold now.',
  },

  // ── Sphere of Influence (area hunger; combos fire off zone spell memory) ──
  {
    id: 'sphere_of_influence+ambrosial_aura',
    trigger: 'Sphere of Influence',
    requires: { recentSpell: 'Ambrosial Aura' },
    symmetric: false,
    text: 'spell.interaction.ambrosial_aura.sphere_of_influence',
    description: 'A room thick with feast-essence and starving for it — aura and hunger sphere spiral into a frenzy.',
  },
  {
    id: 'sphere_of_influence+plant_growth',
    trigger: 'Sphere of Influence',
    requires: { recentSpell: 'Plant Growth' },
    symmetric: false,
    text: 'spell.interaction.plant_growth.sphere_of_influence',
    description: 'Fresh growth meets a swarm of famished occupants who strip it and still want more.',
  },
  {
    id: 'sphere_of_influence+create_food_and_water',
    trigger: 'Sphere of Influence',
    requires: { recentSpell: 'Create Food and Water' },
    symmetric: false,
    text: 'spell.interaction.create_food_and_water.sphere_of_influence',
    description: 'A conjured banquet and a roomful of ravenous mouths — the feast vanishes and they crave the next.',
  },

  // ── Gust of Wind (scatter food / coatings) ────────────────────────────────
  {
    id: 'gust_of_wind+oozing_abundance',
    trigger: 'Gust of Wind',
    requires: { recentSpell: 'Oozing Abundance' },
    symmetric: false,
    text: 'spell.interaction.oozing_abundance.gust_of_wind',
    description: 'The wind flings the airborne ooze wide, spattering calorie-rich sludge across everyone at once.',
  },
  {
    id: 'gust_of_wind+grease',
    trigger: 'Gust of Wind',
    requires: { recentSpell: 'Grease' },
    symmetric: false,
    text: 'spell.interaction.grease.gust_of_wind',
    description: 'The gale lifts the grease into a mist, coating the whole area and everyone in it in a slick film.',
  },
  {
    id: 'gust_of_wind+ambrosial_aura',
    trigger: 'Gust of Wind',
    requires: { recentSpell: 'Ambrosial Aura' },
    symmetric: false,
    text: 'spell.interaction.ambrosial_aura.gust_of_wind',
    description: 'The wind carries the feast-thick aura everywhere, leading every nose in the room toward food.',
  },

  // ── Wall of Force (pen them in; also sets restrained -> immobility combos) ─
  {
    id: 'wall_of_force+sphere_of_influence',
    trigger: 'Wall of Force',
    requires: { recentSpell: 'Sphere of Influence' },
    symmetric: false,
    text: 'spell.interaction.sphere_of_influence.wall_of_force',
    description: 'The ravenous crowd is penned in with the food and each other — nothing to do but eat.',
  },
  {
    id: 'wall_of_force+conjure_food',
    trigger: 'Wall of Force',
    requires: { recentSpell: 'Conjure Food' },
    symmetric: false,
    text: 'spell.interaction.conjure_food.wall_of_force',
    description: 'Just her and the conjured feast, walled in together, with no exit and no reason to stop.',
  },
  {
    id: 'wall_of_force+create_food_and_water',
    trigger: 'Wall of Force',
    requires: { recentSpell: 'Create Food and Water' },
    symmetric: false,
    text: 'spell.interaction.create_food_and_water.wall_of_force',
    description: 'A whole banquet walled in with her and no one else, and all the time in the world to finish it.',
  },

  // ── Web (immobility; also sets restrained -> @restrained combos fire) ──────
  {
    id: 'oozing_abundance+web',
    trigger: 'Oozing Abundance',
    requires: { recentSpell: 'Web' },
    symmetric: false,
    text: 'spell.interaction.web.oozing_abundance',
    description: 'Caught fast in the webbing, she cannot flinch as the nutritive ooze strikes and soaks in.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Web + Oozing Abundance'),
  },
  {
    id: 'confection_snare+web',
    trigger: 'Confection Snare',
    requires: { recentSpell: 'Web' },
    symmetric: false,
    text: 'spell.interaction.web.confection_snare',
    description: 'Candy bindings layer over the webbing — she is doubly bound, sweet and snug, no slack left.',
  },
  {
    id: 'enlarge_person+web',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Web' },
    symmetric: false,
    text: 'spell.interaction.web.enlarge_person',
    description: 'She swells outward into the webbing; the bigger she grows, the more thoroughly the web has her.',
  },

  // ── Mage Hand (remote feeding) ────────────────────────────────────────────
  {
    id: 'mage_hand+conjure_food',
    trigger: 'Mage Hand',
    requires: { recentSpell: 'Conjure Food' },
    symmetric: false,
    text: 'spell.interaction.conjure_food.mage_hand',
    description: 'The tireless hand ferries the conjured spread to her lips, morsel after morsel.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Conjure Food + Mage Hand'),
  },
  {
    id: 'mage_hand+goodberry',
    trigger: 'Mage Hand',
    requires: { recentSpell: 'Goodberry' },
    symmetric: false,
    text: 'spell.interaction.goodberry.mage_hand',
    description: 'The hand pops berry after berry between her lips until the bowl is empty.',
  },
  {
    id: 'mage_hand+create_food_and_water',
    trigger: 'Mage Hand',
    requires: { recentSpell: 'Create Food and Water' },
    symmetric: false,
    text: 'spell.interaction.create_food_and_water.mage_hand',
    description: 'A whole banquet and a tireless hand to serve it; she need do nothing but receive course after course.',
    effect: ({ bonusCalories }) => bonusCalories(10, 'Create Food and Water + Mage Hand'),
  },

  // ── Command (forced eating) ───────────────────────────────────────────────
  {
    id: 'command+conjure_food',
    trigger: 'Command',
    requires: { recentSpell: 'Conjure Food' },
    symmetric: false,
    text: 'spell.interaction.conjure_food.command',
    description: 'You conjure the food and command her to it; she eats it down without a flicker of choice.',
    effect: ({ bonusCalories }) => bonusCalories(10, 'Conjure Food + Command'),
  },
  {
    id: 'command+feast_of_shadows',
    trigger: 'Command',
    requires: { recentSpell: 'Feast of Shadows' },
    symmetric: false,
    text: 'spell.interaction.feast_of_shadows.command',
    description: 'Compelled to eat the illusion, her convinced body banks every phantom calorie as real.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Feast of Shadows + Command'),
  },
  {
    id: 'command+sphere_of_influence',
    trigger: 'Command',
    requires: { recentSpell: 'Sphere of Influence' },
    symmetric: false,
    text: 'spell.interaction.sphere_of_influence.command',
    description: 'A room already mad with hunger, driven by a single word — every ravenous occupant obeys as one.',
  },

  // ── Sleep (helpless feeding; also sets asleep -> @asleep combos) ───────────
  {
    id: 'mage_hand+sleep',
    trigger: 'Mage Hand',
    requires: { recentSpell: 'Sleep' },
    symmetric: false,
    text: 'spell.interaction.sleep.mage_hand',
    description: 'The spectral hand feeds the sleeper morsel by morsel; she swallows on reflex, never waking.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Sleep + Mage Hand'),
  },
  {
    id: 'feast_of_shadows+sleep',
    trigger: 'Feast of Shadows',
    requires: { recentSpell: 'Sleep' },
    symmetric: false,
    text: 'spell.interaction.sleep.feast_of_shadows',
    description: 'The illusory feast becomes her dream; she eats it asleep and banks every dreamed calorie as real.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Sleep + Feast of Shadows'),
  },
  {
    id: 'enlarge_person+sleep',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Sleep' },
    symmetric: false,
    text: 'spell.interaction.sleep.enlarge_person',
    description: 'She never stirs as the enlargement takes her, simply growing larger and softer in her sleep.',
  },
  {
    id: 'oozing_abundance@asleep',
    trigger: 'Oozing Abundance',
    requires: { condition: 'asleep' },
    symmetric: false,
    text: 'spell.interaction.condition.asleep.oozing_abundance',
    description: 'The ooze strikes a sleeper who cannot flinch, spreading over her slack body and soaking in.',
    effect: ({ bonusCalories }) => bonusCalories(8, 'Oozing Abundance on sleeping target'),
  },

  // ── Malleable Flesh (pliant; growth lands harder; sets pliable) ────────────
  {
    id: 'enlarge_person+malleable_flesh',
    trigger: 'Enlarge Person',
    requires: { recentSpell: 'Malleable Flesh' },
    symmetric: false,
    text: 'spell.interaction.malleable_flesh.enlarge_person',
    description: 'Growth pours into soft, receptive flesh and blooms all the more lavishly and permanently.',
    effect: ({ bonusWeight }) => bonusWeight(10, 'Malleable Flesh + Enlarge Person'),
  },
  {
    id: 'morph_mass+malleable_flesh',
    trigger: 'Morph Mass',
    requires: { recentSpell: 'Malleable Flesh' },
    symmetric: false,
    text: 'spell.interaction.malleable_flesh.morph_mass',
    description: 'Pliant flesh drinks in the absorbed matter greedily, keeping every ounce.',
    effect: ({ bonusWeight }) => bonusWeight(12, 'Malleable Flesh + Morph Mass'),
  },
  {
    id: 'swelling_tide+malleable_flesh',
    trigger: 'Swelling Tide',
    requires: { recentSpell: 'Malleable Flesh' },
    symmetric: false,
    text: 'spell.interaction.malleable_flesh.swelling_tide',
    description: 'The rising tide meets flesh primed to receive it; each wave settles fully into her pliant body.',
    effect: ({ bonusWeight }) => bonusWeight(10, 'Malleable Flesh + Swelling Tide'),
  },
  {
    id: 'confection_snare@pliable',
    trigger: 'Confection Snare',
    requires: { condition: 'pliable' },
    symmetric: false,
    text: 'spell.interaction.condition.pliable.confection_snare',
    description: 'Candy bindings sink into soft, yielding flesh, holding her all the more snugly for how she gives.',
  },

  // ── Sylvan Bounty (druidic renewing food source; zone-memory combos) ──────
  {
    id: 'sylvan_bounty+create_water',
    trigger: 'Sylvan Bounty',
    requires: { recentSpell: 'Create Water' },
    symmetric: false,
    text: 'spell.interaction.create_water.sylvan_bounty',
    description: 'Conjured water sinks into the new growth; fruit swells fatter, sweeter, and faster.',
  },
  {
    id: 'sylvan_bounty+plant_growth',
    trigger: 'Sylvan Bounty',
    requires: { recentSpell: 'Plant Growth' },
    symmetric: false,
    text: 'spell.interaction.plant_growth.sylvan_bounty',
    description: 'Plant Growth and the thicket feed each other into a riot of fruit, replenishing faster than it is picked.',
  },
  {
    id: 'sylvan_bounty+sphere_of_influence',
    trigger: 'Sylvan Bounty',
    requires: { recentSpell: 'Sphere of Influence' },
    symmetric: false,
    text: 'spell.interaction.sphere_of_influence.sylvan_bounty',
    description: 'A renewing thicket and a roomful of ravenous mouths — the bounty keeps growing back to feed the frenzy.',
  },

];

// ─── Match engine ─────────────────────────────────────────────────────────────

/**
 * Returns all table entries that fire for the given cast.
 * @param {string} triggerSpellName — spell being cast now
 * @param {string[]} previousSpellNames — spells in the recent ring (target + zone)
 * @param {object|null} target — entity being targeted (has .conditions)
 * @param {object|null} zone — current zone
 * @returns {{ entry, partnerName }[]}
 */
function matchCombos(triggerSpellName, previousSpellNames, target, zone) {
  const results = [];

  for (const entry of TABLE) {
    let matched = false;
    let partnerName = null;

    if (entry.trigger === triggerSpellName) {
      const req = entry.requires;
      if (req.recentSpell && previousSpellNames.includes(req.recentSpell)) {
        matched = true;
        partnerName = req.recentSpell;
      } else if (req.condition && (target?.conditions?.has(req.condition) ?? false)) {
        matched = true;
        partnerName = req.condition;
      } else if (req.zoneState && req.zoneState(zone)) {
        matched = true;
        partnerName = 'zone';
      }
    }

    // Symmetric auto-reverse: if B is being cast and A was recent, fire A+B defined entry
    if (!matched && entry.symmetric && entry.requires.recentSpell) {
      if (entry.requires.recentSpell === triggerSpellName && previousSpellNames.includes(entry.trigger)) {
        matched = true;
        partnerName = entry.trigger;
      }
    }

    if (matched) results.push({ entry, partnerName });
  }

  return results;
}

/**
 * Validate the table at startup in dev mode.
 * Returns array of error strings; empty = clean.
 */
function validateTable(knownSpells, knownConditions) {
  const errors = [];
  const ids = new Set();

  for (const entry of TABLE) {
    if (ids.has(entry.id)) errors.push(`DUPLICATE ID: ${entry.id}`);
    ids.add(entry.id);

    if (knownSpells && !knownSpells.includes(entry.trigger)) {
      errors.push(`UNKNOWN TRIGGER in '${entry.id}': '${entry.trigger}'`);
    }
    if (knownSpells && entry.requires.recentSpell && !knownSpells.includes(entry.requires.recentSpell)) {
      errors.push(`UNKNOWN PARTNER in '${entry.id}': '${entry.requires.recentSpell}'`);
    }
    if (knownConditions && entry.requires.condition && !knownConditions.includes(entry.requires.condition)) {
      errors.push(`UNKNOWN CONDITION in '${entry.id}': '${entry.requires.condition}'`);
    }
    if (!entry.text) errors.push(`MISSING TEXT KEY in '${entry.id}'`);
    if (!entry.description) errors.push(`MISSING DESCRIPTION in '${entry.id}'`);
  }

  return errors;
}

export { TABLE, matchCombos, validateTable };
