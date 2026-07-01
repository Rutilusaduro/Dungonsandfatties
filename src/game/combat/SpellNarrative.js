// ═══════════════════════════════════════════════════════════════
// SpellNarrative — Diegetic combat log text for spell families.
// Spell-specific lines take priority; family templates are the fallback.
// ═══════════════════════════════════════════════════════════════

// Spell-specific narratives. Key = spell name, value = fn(target) => string
const SPELL_LINES = {
  'Conjure Morsel': (t) => `A golden morsel materialises and tumbles toward ${t.name}. She swallows before she can stop herself.`,
  'Sating Spark': (t) => `A tiny arc of warm light strikes ${t.name}'s belly. She feels it spread — a fullness that wasn't there a moment ago.`,
  'Greasy Flick': (t) => `A slick burst of grease hits ${t.name} across the mouth. She licks it away before she can think.`,
  'Oozing Abundance': (t) => `A shaft of golden slime splatters across ${t.name}. Warm, sweet, impossible to ignore — she's already tasting it.`,
  'Erupting Earth': (t) => `The floor splits open beneath ${t.name} and food explodes upward, burying her. She swallows mouthfuls before she can even struggle.`,
  'Fireball': (t) => `The inferno clears. The smell hits immediately — roasted meat, caramelized sugar, perfectly charred crust. ${t.name} inhales and swallows hard.`,
  'Feast of Shadows': (t) => `Phantom dishes shimmer before ${t.name}. They smell real. They taste real. She leans into the illusion and eats.`,
  'Create Food and Water': (t) => `A spread of warm food materialises beside ${t.name}. Fragrant, abundant, impossible to refuse.`,
  'Conjure Food': (t) => `Food shimmers into being at ${t.name}'s feet — warm and waiting. She can't quite look away from it.`,
  'Goodberry': (t) => `A handful of glowing berries roll toward ${t.name}. She eats the first one before she even decides to.`,
  'Sylvan Bounty': (t) => `Vines laden with ripe fruit erupt around ${t.name}. Each piece she picks becomes two. She keeps picking.`,
  'Enlarge Person': (t) => `${t.name} swells outward, her frame expanding, growing heavier and more imposing with every breath.`,
  'Morph Mass': (t) => `The earth clings to ${t.name}, pulling her down as she sinks deeper, weight multiplying.`,
  'Ravenous Expansion': (t) => `${t.name}'s belly swells outward — capacity blooming open, hunger arriving behind it like a tide.`,
  'Bottomless Gullet': (t) => `Fullness retreats impossibly far inside ${t.name}. She opens her mouth and eats with a new, bottomless desperation.`,
  'Malleable Flesh': (t) => `${t.name}'s flesh softens, becoming deeply receptive. Everything that enters her will stay.`,
  'Adipose Touch': (t) => `Your hand rests against ${t.name} for just a moment. What was soft crystallises into permanent, solid mass.`,
  'Metabolic Hex': (t) => `A hex settles over ${t.name} like a second skin. Her body rewrites itself — now everything she eats becomes permanent.`,
  'Corpulence Surge': (t) => `Transmutation energy slams into ${t.name}. Mass blooms from within, reshaping her at every level until she's dramatically heavier.`,
  'Swelling Tide': (t) => `Growth comes for ${t.name} like a tide — gentle, then mounting, each moment swelling her further.`,
  'Draconic Hunger': (t) => `${t.name}'s jaw drops wide, throat expanding into something ancient and terrible. She can devour almost anything now.`,
  'Rapid Digestion': (t) => `${t.name}'s belly churns violently — everything she's consumed processes in moments.`,
  'Haste': (t) => `${t.name} blurs with impossible speed. Her jaw works twice as fast — food vanishes before she can close her mouth.`,
  'Hold Person': (t) => `Invisible chains lock ${t.name} in place. Her feet won't move. Her arms won't raise. She can only wait.`,
  'Sleep': (t) => `${t.name}'s eyelids grow heavy and she sags forward, sliding into deep, arcane sleep. She'll swallow whatever is placed in her mouth.`,
  'Command': (t) => `One word cracks across ${t.name}'s will. Her body obeys before her mind can resist.`,
  'Suggestion': (t) => `A whisper settles into ${t.name}'s mind. The urge to eat arrives and she rationalises it immediately, helplessly.`,
  'Confection Snare': (t) => `Candy vines coil around ${t.name} with a rush of sweet smell. She's bound — and the vines keep feeding her.`,
  'Web': (t) => `Sticky strands fill the air around ${t.name}, clinging fast. She's caught, wrapped, held immobile.`,
  'Wall of Force': (t) => `An invisible wall snaps into being around ${t.name} — seamless, immovable, inescapable.`,
  'Telekinesis': (t) => `${t.name} is lifted by invisible force and carried to where you will her. She can't resist.`,
  'Float': (t) => `${t.name} drifts upward, untethered, hovering just out of reach of solid ground. She looks confused, then afraid.`,
  'Enhance Gravity': (t) => `${t.name}'s weight multiplies. She staggers, pins down, crushed by her own magnified mass.`,
  'Slow': (t) => `${t.name} moves as if through honey — every gesture taking twice as long, twice as laboured.`,
  'Rooting Glut': (t) => `${t.name} sinks downward, feet pressing into the earth. Her own mass holds her fast.`,
  'Grease': (t) => `Golden slick pools beneath ${t.name}. Her footing vanishes.`,
  'Gust of Wind': (t) => `A howling gale tears through. ${t.name} staggers, but the heavy ones hold their ground.`,
  'Mage Hand': (t) => `A ghostly hand materialises and begins ferrying food to ${t.name}'s mouth, one piece at a time.`,
  'Polymorph': (t) => `${t.name}'s form warps and reforms — fur sprouting, mass shifting, hunger awakening in a new and primal shape.`,
  "Feeder's Devotion": (t) => `Every offered bite feels like care to ${t.name}. Her resistance melts and she leans in, wanting more.`,
  'Sympathetic Bond': (t) => `A silver thread winds between you and ${t.name}. Your appetites entangle — what she eats settles into both of you.`,
  'Ambrosial Aura': (t) => `The air thickens with golden haze. ${t.name} breathes it in and the sense of plenty settles deep into her belly.`,
  'Sphere of Influence': (t) => `An invisible hunger grips the room. ${t.name} is seized by a single-minded need — she eats and cannot stop.`,
  'Feast Exile': (t) => `${t.name} vanishes into somewhere else. Time moves strangely there. When she returns she's swollen, soft, and a little dazed.`,
  'Imbue Life': (t) => `The ooze stirs, animated by your will, and begins feeding itself into ${t.name} with mechanical patience.`,
  'Covetous Siphon': (t) => `Weight tears free from somewhere and settles into ${t.name}, leaving whoever gave it diminished and her swollen.`,
  'Flesh to Food': (t) => `${t.name}'s form ripples and restructures — the grim alchemy is fast, leaving behind only abundance.`,
  'Duplication': (t) => `A shimmer passes over the food near ${t.name} and it splits, doubling, tripling. More than she could possibly eat alone.`,
  'Arcane Appraisal': (_t) => `Your eyes glow briefly. You see the stress points in stone and wood, the exact moment each surface breaks.`,
  'Prestidigitation': (_t) => `A flutter of arcane mischief — warmth where there was cold, flavour conjured from empty air.`,
};

// Family templates — fallback when spell has no specific entry
const FEEDING_TEMPLATES = [
  (t) => `A wave of food descends on ${t.name}. She eats before she can decide not to.`,
  (t) => `${t.name}'s mouth fills with something warm and sweet. Her belly answers.`,
  (t) => `The scent hits ${t.name} first, then the food itself. She's already swallowing.`,
  (t) => `${t.name} is buried in conjured food. There's too much to resist.`,
];

const RESTRAINT_TEMPLATES = [
  (t) => `${t.name} freezes in place, bound by something she cannot see or break.`,
  (t) => `${t.name} is caught — limbs locked, movement gone, completely held.`,
  (t) => `Arcane force wraps around ${t.name}. She struggles once, then stops.`,
  (t) => `${t.name}'s eyes go wide. She can't move at all.`,
];

const MOVEMENT_TEMPLATES = [
  (t) => `${t.name} is displaced — carried or pressed or lifted to somewhere she didn't choose.`,
  (t) => `The ground betrays ${t.name}. She can't find her footing.`,
  (t) => `${t.name} finds herself repositioned by force she can't explain.`,
];

const TRANSFORMATION_TEMPLATES = [
  (t) => `${t.name}'s body changes — hunger deepens, capacity shifts, something permanent rewrites itself.`,
  (t) => `Magic settles into ${t.name}'s flesh. Whatever it did will last.`,
  (t) => `${t.name} feels it move through her. She's different now, though she couldn't say how.`,
];

// Safe fallback — never produces "undefined"
const safeFallback = (t, spellName) =>
  spellName
    ? `The spell washes over ${t.name}, and she feels something shift.`
    : `Something arcane ripples through ${t.name}.`;

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export function narrativeFor(spell, _caster, target) {
  const t = target || { name: 'her' };

  if (!spell) return safeFallback(t, null);

  // Spell-specific line first
  const specific = SPELL_LINES[spell.name];
  if (specific) return specific(t);

  // Family-based fallback
  const tags = spell.tags || [];
  if (tags.includes('feeding'))         return pick(FEEDING_TEMPLATES)(t);
  if (tags.includes('restraint'))       return pick(RESTRAINT_TEMPLATES)(t);
  if (tags.includes('movement'))        return pick(MOVEMENT_TEMPLATES)(t);
  if (tags.includes('transformation'))  return pick(TRANSFORMATION_TEMPLATES)(t);

  return safeFallback(t, spell.name);
}
