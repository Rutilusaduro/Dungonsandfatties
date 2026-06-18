/**
 * Spell Scene Modules
 * Narration for spell casting, effects, and environmental changes
 */

export function registerSpellModules(engine) {
  // Generic spell casting flavor text
  engine.registerPool('spell.cast', [
    {
      when: {},
      text: [
        'You weave the magical energies together, ready to cast the spell.',
        'Magical power flows from your fingertips.',
        'You chant the incantation, feeling the spell take hold.',
      ],
    },
  ]);

  // Erupting Earth spell effect
  engine.registerModule('spell.effect.erupting_earth', [
    {
      when: {},
      text: 'The earth erupts with a tremendous force, sending up massive plumes of magically-enhanced food! Fruits, breads, pastries, and meats explode from the ground in a spectacular display of edible abundance. The area becomes covered in delicious sustenance.',
    },
  ]);

  // Hold Person spell effect
  engine.registerModule('spell.effect.hold_person', [
    {
      when: {},
      text: 'A shimmering magical field envelops the target, freezing them in place. They cannot move, but they can still breathe... and still swallow.',
    },
  ]);

  // Fireball spell effect
  engine.registerModule('spell.effect.fireball', [
    {
      when: {},
      text: 'A brilliant explosion erupts in a burst of flame! But instead of fire and destruction, the blast manifests as perfectly roasted food—succulent meats, golden pastries, and aromatic delicacies shower the area. The smell is absolutely intoxicating.',
    },
  ]);

  // Create Food and Water spell effect
  engine.registerModule('spell.effect.create_food_and_water', [
    {
      when: {},
      text: 'Magical energy coalesces, and food simply appears! Plates laden with delicious fare manifest before you—perfectly prepared meals that shimmer with magical enhancement.',
    },
  ]);

  // Polymorph spell effect
  engine.registerModule('spell.effect.polymorph', [
    {
      when: {},
      text: 'The target\'s body begins to shift and transform. Their form ripples and reshapes as they morph into a larger beast. As they grow, their appetite seems to grow with them.',
    },
  ]);

  // Rapid Digestion spell effect
  engine.registerModule('spell.effect.rapid_digestion', [
    {
      when: {},
      text: 'A strange tingling sensation floods the target\'s digestive system. Their stomach gurgles and churns as the magical acceleration takes hold. Any food within them is rapidly processed and converted to weight gain. Afterward, a deep satisfaction settles over them—they feel thoroughly satiated.',
    },
  ]);

  // Flesh to Food spell effect
  engine.registerModule('spell.effect.flesh_to_food', [
    {
      when: {},
      text: 'The target creature shimmers as their form begins to transmute. Their body ripples and transforms into delicious, perfectly preserved food portions! What was once a living creature is now a feast waiting to happen.',
    },
  ]);

  // Haste spell effect (metabolic variant)
  engine.registerModule('spell.effect.haste', [
    {
      when: {},
      text: 'A surge of magical energy floods through the target\'s body, accelerating their metabolism in a peculiar way. They find themselves eating much faster than normal, yet burning far fewer calories in the process.',
    },
  ]);

  // Duplication spell effect
  engine.registerModule('spell.effect.duplication', [
    {
      when: {},
      text: 'A shimmering magical aura surrounds the target object. With a brilliant flash, perfect duplicates materialize! The original and its copies are completely identical and permanent.',
    },
  ]);

  // Ravenous Expansion spell effect
  engine.registerModule('spell.effect.ravenous_expansion', [
    {
      when: {},
      text: 'The target\'s stomach visibly distends and expands as magical energy suffuses their digestive system. They feel their appetite intensify dramatically—their body aches with hunger. Despite feeling impossibly full moments ago, they\'re suddenly desperate to eat more.',
    },
  ]);

  // Confection Snare spell effect
  engine.registerModule('spell.effect.confection_snare', [
    {
      when: {},
      text: 'Magical vines made of licorice and candy erupt from the ground! They move with purpose, ready to restrain, suspend, or force-feed whatever they catch.',
    },
  ]);

  // Weight gain narration
  engine.registerPool('spell.weight_gain', [
    {
      when: { stage: { min: 10 } },
      text: 'The target\'s already immense form somehow expands even further, defying all reasonable comprehension.',
      weight: 2,
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'The target becomes even more enormous, their prodigious size swelling to even greater proportions.',
      weight: 2,
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'The target\'s form balloons outward, becoming noticeably larger and rounder.',
      weight: 2,
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'The target gains a visible amount of weight, their body softening and filling out.',
      weight: 2,
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'The target gains some weight, becoming a bit rounder.',
      weight: 2,
    },
    {
      when: { stage: { max: 1 } },
      text: 'The target gains a small amount of weight.',
      weight: 2,
    },
  ]);

  // Environmental effect - food eruption
  engine.registerModule('spell.environmental.eruption', [
    {
      when: {},
      text: 'The area is now covered in food—delicious, tempting, perfectly placed for consumption. The ground is slippery with sauces and oils.',
    },
  ]);

  // Environmental effect - frozen in place
  engine.registerModule('spell.environmental.paralysis', [
    {
      when: {},
      text: 'The area around the paralyzed target shimmers with magical force, holding them completely still.',
    },
  ]);

  // Spell interaction - Hold Person + Erupting Earth
  engine.registerModule('spell.interaction.hold_person.erupting_earth', [
    {
      when: {},
      text: 'The paralyzed target cannot escape as the food eruption buries them. They\'re completely helpless as the magical sustenance surrounds them—and their body automatically consumes what it can reach.',
    },
  ]);

  // Spell interaction - Rapid Digestion + Hold Person
  engine.registerModule('spell.interaction.rapid_digestion.hold_person', [
    {
      when: {},
      text: 'As the target\'s stomach rapidly processes their food, they\'re left completely satiated. The paralysis continues to hold them in place, utterly helpless.',
    },
  ]);

  // Spell interaction - Fireball + Hold Person
  engine.registerModule('spell.interaction.fireball.hold_person', [
    {
      when: {},
      text: 'The roasted food from the fireball surrounds the paralyzed target, and their body eagerly consumes it. They have no choice but to feed, held in place by magic.',
    },
  ]);

  // Spell interaction - Polymorph + Erupting Earth
  engine.registerModule('spell.interaction.polymorph.erupting_earth', [
    {
      when: {},
      text: 'The transformed beast finds itself instantly buried in the food eruption. Its enlarged form provides even more surface area for the magical sustenance to coat, and its new appetite drives it to consume greedily.',
    },
  ]);

  // Spell interaction - Hold Person + Confection Snare
  engine.registerModule('spell.interaction.hold_person.confection_snare', [
    {
      when: {},
      text: 'The candy vines wrap around the already-paralyzed target, adding another layer of restraint. The licorice bonds are sweet, tempting, and inescapable.',
    },
  ]);
}

export default registerSpellModules;
