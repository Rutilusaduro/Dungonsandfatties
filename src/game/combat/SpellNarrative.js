// ═══════════════════════════════════════════════════════════════
// SpellNarrative — Diegetic combat log text for spell families
// Maps spell categories to narrative templates (player perspective)
// ═══════════════════════════════════════════════════════════════

const FEEDING_NARRATIVES = [
  (target) => `A morsel of food streaks toward ${target.name}. She swallows hard.`,
  (target) => `${target.name} is buried under a cascade of food — she can't help but consume.`,
  (target) => `The scent of roasted meat floods the air. ${target.name} gasps as her belly swells.`,
  (target) => `${target.name}'s mouth fills with warm, savory food. Her hunger deepens.`,
  (target) => `A wave of golden ooze splashes across ${target.name}. She can't resist tasting it.`,
];

const RESTRAINT_NARRATIVES = [
  (target) => `Invisible chains lock ${target.name} in place. She cannot move.`,
  (target) => `Vines of pure magic coil around ${target.name}, trapping her mid-step.`,
  (target) => `${target.name} freezes, bound by forces she can't break.`,
  (target) => `Silken strands wrap ${target.name} tight. She's completely immobilized.`,
  (target) => `${target.name}'s eyes widen as she's held fast — unable to act, unable to flee.`,
];

const MOVEMENT_NARRATIVES = [
  (target) => `${target.name} is lifted by invisible force, suspended and helpless.`,
  (target) => `${target.name} suddenly weighs far more — she stumbles and sinks.`,
  (target) => `${target.name} drifts upward, hovering just out of reach of solid ground.`,
  (target) => `The ground beneath ${target.name} shifts, trapping her in place.`,
  (target) => `${target.name} finds herself unable to move — pinned by some arcane force.`,
];

const TRANSFORMATION_NARRATIVES = [
  (target) => `${target.name}'s belly distends obscenely — her capacity deepens, and with it, desperate hunger.`,
  (target) => `${target.name}'s body softens and becomes deeply receptive — her flesh takes on weight like it's magnets to metal.`,
  (target) => `${target.name} moves in a blur, but her jaw works twice as fast — food vanishes down her throat.`,
  (target) => `${target.name}'s form ripples. Her hunger becomes primal, almost uncontrollable.`,
  (target) => `Magic rewrites ${target.name}'s metabolism. Everything she eats will stick.`,
];

const FALLBACK_NARRATIVE = (target, spellName) =>
  `The magic of ${spellName} washes over ${target.name}.`;

// Get diegetic narrative for a spell cast
export function narrativeFor(spell, caster, target) {
  if (!spell || !target) return FALLBACK_NARRATIVE(target || { name: 'a target' }, spell?.name || 'a spell');

  // Find family tag in any position
  const familyTag = (spell.tags || []).find(t =>
    ['feeding', 'restraint', 'movement', 'transformation'].includes(t)
  );

  let narratives;
  if (familyTag === 'feeding') narratives = FEEDING_NARRATIVES;
  else if (familyTag === 'restraint') narratives = RESTRAINT_NARRATIVES;
  else if (familyTag === 'movement') narratives = MOVEMENT_NARRATIVES;
  else if (familyTag === 'transformation') narratives = TRANSFORMATION_NARRATIVES;
  else narratives = [FALLBACK_NARRATIVE];

  // Pick a random narrative from the family
  const narrative = narratives[Math.floor(Math.random() * narratives.length)];
  return typeof narrative === 'function' ? narrative(target) : FALLBACK_NARRATIVE(target, spell.name);
}
