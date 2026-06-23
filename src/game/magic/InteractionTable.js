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
