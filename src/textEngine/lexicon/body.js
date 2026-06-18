// ═══════════════════════════════════════════════════════════════
// BODY LEXICON — condition × size-class descriptions
// The heart of the system: {body.desc} renders a radically different
// sentence for a restrained thin target than for a restrained SSBBW, a
// buried Blob than a buried slip of a girl, etc. Selected best-match by
// sizeClass (thin / plump / fat / ssbbw / immobile / leviathan) crossed
// with the active spell condition (candy bonds, magical paralysis,
// suspension, burial, mind-control, ravenous hunger).
//
// Sub-part pools ({body.belly}, {body.rear}, {body.thighs}, {body.jiggle},
// {body.move}) give per-size flavor fragments for composing scenes.
// ═══════════════════════════════════════════════════════════════
import { registerModule, registerPool } from '../engine.js';

export function registerBodyLexicon() {

  // ── {body.desc} — full-body, condition-aware (best match) ─────────────────
  registerModule('body.desc', [

    // ───── FREE (no active restraint) ─────
    { when: { sizeClass: 'thin' },
      text: 'her slender, angular frame, all sharp lines and barely-there softness' },
    { when: { sizeClass: 'plump' },
      text: 'her pleasantly rounded body, soft new curves filling out her figure' },
    { when: { sizeClass: 'fat' },
      text: 'her heavy, well-padded body, a thick belly and full, jiggling limbs' },
    { when: { sizeClass: 'ssbbw' },
      text: 'her vast, billowing body, rolls of soft flesh shifting with the slightest movement' },
    { when: { sizeClass: 'immobile' },
      text: 'her colossal, near-immobile bulk, a spreading landscape of warm soft flesh' },
    { when: { sizeClass: 'leviathan' },
      text: 'her impossibly enormous form, a mountain of flesh the room itself seems to bend around' },

    // ───── CANDY BONDS (confection snare, not suspended) ─────
    { when: { sizeClass: 'thin', restraintMaterial: 'candy' },
      text: 'her thin frame trussed tight in glossy licorice, the candy ropes biting into bony wrists and slender arms with nothing to cushion them' },
    { when: { sizeClass: 'plump', restraintMaterial: 'candy' },
      text: 'her soft, rounded body wrapped in licorice cords that press sweet furrows into her new plumpness' },
    { when: { sizeClass: 'fat', restraintMaterial: 'candy' },
      text: 'her thick body bound in candy rope, the licorice sinking deep into doughy rolls, all but swallowed by her softness' },
    { when: { sizeClass: 'ssbbw', restraintMaterial: 'candy' },
      text: 'her enormous body all but eating the candy bonds alive — the licorice vanishes into deep folds, leaving sweet sticky furrows across acres of yielding flesh' },
    { when: { sizeClass: 'immobile', restraintMaterial: 'candy' },
      text: 'her colossal bulk reducing the candy ropes to decoration; the licorice disappears entirely between mountainous rolls, holding nothing that wasn\'t already going nowhere' },
    { when: { sizeClass: 'leviathan', restraintMaterial: 'candy' },
      text: 'her leviathan mass making a mockery of the bonds — the licorice is simply absorbed into the soft horizon of her, sugar lost in a sea of flesh' },

    // ───── MAGICAL PARALYSIS (hold person) ─────
    { when: { sizeClass: 'thin', restrainedBy: 'hold_person' },
      text: 'her slight frame locked rigid mid-motion, every thin tendon frozen, only her eyes darting in panic' },
    { when: { sizeClass: 'plump', restrainedBy: 'hold_person' },
      text: 'her soft figure frozen stiff, the gentle curves held unnaturally still by the paralysis' },
    { when: { sizeClass: 'fat', restrainedBy: 'hold_person' },
      text: 'her heavy body locked in place, thick limbs frozen mid-sway, jiggle stilled to an eerie statue calm' },
    { when: { sizeClass: 'ssbbw', restrainedBy: 'hold_person' },
      text: 'her vast body held utterly motionless — a strange, unsettling stillness over so much flesh that normally never stops shifting' },
    { when: { sizeClass: 'immobile', restrainedBy: 'hold_person' },
      text: 'her colossal bulk frozen by magic, though in truth she could scarcely move anyway; now even her breath-driven wobble is stilled' },
    { when: { sizeClass: 'leviathan', restrainedBy: 'hold_person' },
      text: 'her leviathan form held in absolute magical stasis, an entire landscape of flesh rendered still as carved stone' },

    // ───── SUSPENDED FROM THE CEILING (horizontal, facing down) ─────
    // priority:1 so suspension narration wins ties against the plain candy-bond
    // variant (ceiling suspension is also restraintMaterial 'candy').
    { when: { sizeClass: 'thin', suspended: 1 }, priority: 1,
      text: 'her slender body strung up horizontal and face-down, light enough that the candy ropes barely strain, thin limbs dangling helplessly toward the floor' },
    { when: { sizeClass: 'plump', suspended: 1 }, priority: 1,
      text: 'her soft rounded body suspended belly-down in the air, her new curves drooping toward the ground as the licorice creaks gently' },
    { when: { sizeClass: 'fat', suspended: 1 }, priority: 1,
      text: 'her heavy body hauled up horizontal, thick belly and limbs sagging earthward, the candy ropes groaning under real weight' },
    { when: { sizeClass: 'ssbbw', suspended: 1 }, priority: 1,
      text: 'her enormous body slung face-down in the air, vast belly and flanks pouring downward between the straining licorice, the bonds shrieking under the load' },
    { when: { sizeClass: 'immobile', suspended: 1 }, priority: 1,
      text: 'her colossal mass barely held aloft, flesh cascading downward in heavy sheets, the candy ropes stretched to snapping by sheer tonnage' },
    { when: { sizeClass: 'leviathan', suspended: 1 }, priority: 1,
      text: 'her leviathan bulk impossibly suspended for a heartbeat before physics objects — flesh avalanching toward the floor, the bonds disintegrating under a weight no candy could ever hold' },

    // ───── BURIED IN ERUPTED FOOD/EARTH ─────
    { when: { sizeClass: 'thin', buried: 1 },
      text: 'her slim frame all but lost beneath the pile, thin arms thrashing up out of the mound as she fights to surface' },
    { when: { sizeClass: 'plump', buried: 1 },
      text: 'her soft body half-sunk in the heap, rounded curves wallowing as she squirms against the mounded abundance' },
    { when: { sizeClass: 'fat', buried: 1 },
      text: 'her thick body settling deep into the pile, heavy flesh spreading into the mound, barely able to lever herself up' },
    { when: { sizeClass: 'ssbbw', buried: 1 },
      text: 'her vast body sinking into the heap under its own weight, the mound parting around acres of flesh as she sinks rather than surfaces' },
    { when: { sizeClass: 'immobile', buried: 1 },
      text: 'her colossal bulk pressing the pile flat beneath her, the heap heaving and cracking around a mass it could never hope to cover' },
    { when: { sizeClass: 'leviathan', buried: 1 },
      text: 'her leviathan form swallowing the entire mound, the eruption merely a dusting across a body too vast to bury' },

    // ───── OOZE-COATED (oozing abundance) ─────
    { when: { sizeClass: 'thin', oozeCoated: 1 },
      text: 'her slender frame coated head to toe in sweet nutritive ooze, the dense slick filling every hollow and angle with warm, caloric weight' },
    { when: { sizeClass: 'plump', oozeCoated: 1 },
      text: 'her softening body glazed in thick, sweet ooze, the slick pooling in her new curves and creases and making everything glisten' },
    { when: { sizeClass: 'fat', oozeCoated: 1 },
      text: 'her heavy body drenched in nutritive ooze, the slick filling every fold and roll with a warm, caloric embrace she can feel seeping in' },
    { when: { sizeClass: 'ssbbw', oozeCoated: 1 },
      text: 'her vast body shellacked in a continuous gleaming coat, rivers of sweet ooze carving slow channels between enormous rolls' },
    { when: { sizeClass: 'immobile', oozeCoated: 1 },
      text: 'her colossal form all but lacquered in ooze so thick it takes on its own geography, pooling in valleys of flesh too wide to map' },
    { when: { sizeClass: 'leviathan', oozeCoated: 1 },
      text: 'her leviathan body swathed in a continuous sweet slick, ooze pooling and dripping across acres of flesh like caloric rainfall' },
    { when: { oozeCoated: 1 },
      text: 'her body coated in thick, sweet nutritive ooze, the dense slick warm against her skin' },

    // ───── ENLARGED / POLYMORPH FORM ─────
    { when: { sizeClass: 'thin', enlarged: 1 },
      text: 'her formerly-slight body surged to beast proportions, the transformation doubling her in every dimension — a creature now where a girl stood, driven by simple, enormous hunger' },
    { when: { sizeClass: 'plump', enlarged: 1 },
      text: 'her softening human form swollen dramatically by the polymorph, beast-mass added to human curves, a much larger creature now with appetite scaled to match' },
    { when: { sizeClass: 'fat', enlarged: 1 },
      text: 'her already-heavy body expanded into beast proportions, the transformation compounding what was already substantial — enormous, and hungry' },
    { when: { sizeClass: 'ssbbw', enlarged: 1 },
      text: 'her already-vast form pushed further by the polymorph, beast-bulk stacked on human bulk, a staggering combined mass governed by one simple animal thought' },
    { when: { sizeClass: 'immobile', enlarged: 1 },
      text: 'her near-immobile mass inflated to beast scale, an almost unthinkable accumulation of transformed flesh, a creature barely possible' },
    { when: { sizeClass: 'leviathan', enlarged: 1 },
      text: 'her leviathan body grown to beast scale beyond all comprehension, the polymorph straining against its own limits to contain her' },
    { when: { enlarged: 1 },
      text: 'her body swollen to beast proportions by the transformation, larger in every dimension and ravenous with it' },

    // ─────────────────────────────────────────────────────────────────────────
    // COMBO CONDITIONS — priority:1 beats any single-condition size-class variant.
    // Suspension combos use priority:2 to beat the priority:1 suspended variants.
    // ─────────────────────────────────────────────────────────────────────────

    // ───── OOZE-COATED + RAVENOUS ─────
    { when: { sizeClass: 'thin', oozeCoated: 1, ravenous: 1 }, priority: 1,
      text: 'her ooze-slicked, shaking frame — the cruel irony of being coated head to toe in sweet caloric abundance while hunger gnaws at her; her tongue works at the slick on her lips and cheeks, consuming what little she can reach and desperate for more' },
    { when: { sizeClass: 'fat', oozeCoated: 1, ravenous: 1 }, priority: 1,
      text: 'her ooze-drenched heavy body driven by ravenous need, thick fingers scooping the slick from her own rolls and stuffing it past her lips, consuming herself in a frantic, blissful loop' },
    { when: { sizeClass: 'ssbbw', oozeCoated: 1, ravenous: 1 }, priority: 1,
      text: 'her enormous ooze-coated body wracked with insatiable hunger — every vast roll of her sheathed in sweet calories she can barely reach and desperately needs' },
    { when: { oozeCoated: 1, ravenous: 1 }, priority: 1,
      text: 'her ooze-covered body frantic with hunger, lips and hands working at the sweet caloric coating as fast as she can manage, consuming her own coating rather than wait' },

    // ───── OOZE-COATED + CANDY BONDS ─────
    { when: { sizeClass: 'thin', oozeCoated: 1, restraintMaterial: 'candy' }, priority: 1,
      text: 'her ooze-slicked thin frame fighting the candy ropes — the bonds gleam with it, the licorice soaked in sweetness wherever it bites into her glistening skin, everything sticky, everything edible' },
    { when: { sizeClass: 'fat', oozeCoated: 1, restraintMaterial: 'candy' }, priority: 1,
      text: 'her ooze-drenched heavy body bound in candy ropes that have soaked up the slick, the licorice turning soft and slick where it presses into doughy, glistening rolls — everything sweet, everything yielding' },
    { when: { oozeCoated: 1, restraintMaterial: 'candy' }, priority: 1,
      text: 'her ooze-coated body bound in candy ropes that have absorbed the slick — bonds and flesh and coating all melting together into one sweet, sticky, inescapable mass' },

    // ───── OOZE-COATED + MAGICAL PARALYSIS ─────
    { when: { sizeClass: 'thin', oozeCoated: 1, restrainedBy: 'hold_person' }, priority: 1,
      text: 'her ooze-glazed slight body locked in magical stillness, the slick dripping from frozen limbs in slow, warm falls — she cannot wipe it off, cannot move toward anything, can only feel it soaking in' },
    { when: { oozeCoated: 1, restrainedBy: 'hold_person' }, priority: 1,
      text: 'her ooze-soaked body held in perfect paralytic stillness, the nutritive slick seeping into every inch of her while she cannot move, cannot wipe it away, can only absorb it' },

    // ───── ENLARGED + RAVENOUS ─────
    { when: { sizeClass: 'thin', enlarged: 1, ravenous: 1 }, priority: 1,
      text: 'her enlarged beast-body — vast where she was once slight — convulsing with enormous animal hunger; the transformation has given her the size and the ravenous spell has given her the need, and the combination is overwhelming' },
    { when: { sizeClass: 'fat', enlarged: 1, ravenous: 1 }, priority: 1,
      text: 'her beast-expanded heavy form driven by a hunger scaled to her new size, thick beast-muscles straining as she strains toward anything edible, the animal mind brooking no delay' },
    { when: { enlarged: 1, ravenous: 1 }, priority: 1,
      text: 'her beast-enlarged form convulsing with ravenous animal hunger — a body several times its natural size screaming to be fed at the same scale, simple and absolute' },

    // ───── MAGICAL PARALYSIS + RAVENOUS ─────
    { when: { sizeClass: 'thin', restrainedBy: 'hold_person', ravenous: 1 }, priority: 1,
      text: 'her paralyzed slight frame screaming with hunger she cannot answer — completely frozen, completely starving, only her eyes able to move toward the food she cannot reach' },
    { when: { sizeClass: 'fat', restrainedBy: 'hold_person', ravenous: 1 }, priority: 1,
      text: 'her heavy paralyzed body aching with ravenous hunger, every frozen muscle straining against the spell\'s grip toward food she cannot reach on her own' },
    { when: { restrainedBy: 'hold_person', ravenous: 1 }, priority: 1,
      text: 'her frozen, desperately hungry body — the paralysis having removed the last barrier between her ravenous need and your will; she cannot resist, and she cannot wait' },

    // ───── CANDY BONDS + RAVENOUS ─────
    { when: { restraintMaterial: 'candy', ravenous: 1 }, priority: 1,
      text: 'her candy-bound body gnawing at the licorice itself in desperation — the bonds are sweet, at least, and she is hungry enough to find even that some comfort' },

    // ───── SUSPENDED + RAVENOUS (priority:2 beats suspended-alone at priority:1) ─────
    { when: { sizeClass: 'thin', suspended: 1, ravenous: 1 }, priority: 2,
      text: 'her slender body strung up face-down and desperately hungry, dangling above the food she can see and smell below her while the bonds hold her perfectly, cruelly out of reach' },
    { when: { sizeClass: 'fat', suspended: 1, ravenous: 1 }, priority: 2,
      text: 'her heavy suspended body convulsing with ravenous hunger, thick limbs swinging against the straining bonds trying to reach anything edible below her outstretched hands' },
    { when: { sizeClass: 'ssbbw', suspended: 1, ravenous: 1 }, priority: 2,
      text: 'her enormous suspended bulk wracked with ravenous hunger — vast and helpless and desperate, every roll of her trembling with need she cannot answer' },
    { when: { suspended: 1, ravenous: 1 }, priority: 2,
      text: 'her suspended body wracked with ravenous hunger — face-down, helpless, every nerve screaming for food that hangs just beyond the reach of her bound hands' },

    // ───── SUSPENDED + OOZE-COATED (priority:2) ─────
    { when: { sizeClass: 'thin', suspended: 1, oozeCoated: 1 }, priority: 2,
      text: 'her slender body strung face-down and glazed in ooze, the slick dripping from her in a slow continuous fall toward the floor below — suspended and glistening and feeding herself drop by drop against her will' },
    { when: { sizeClass: 'fat', suspended: 1, oozeCoated: 1 }, priority: 2,
      text: 'her heavy suspended body shellacked in ooze, the slick dripping from her bulk in thick caloric falls to splash uselessly on the floor below her dangling form' },
    { when: { suspended: 1, oozeCoated: 1 }, priority: 2,
      text: 'her suspended body coated in ooze that drips steadily toward the floor below, the sweet slick running off her hanging form in a slow, caloric rain she cannot catch' },

    // ───── MIND-CONTROLLED (blissful, eager) ─────
    { when: { sizeClass: 'thin', mindControlled: 1 },
      text: 'her slight body swaying with glassy-eyed eagerness, thin hands already reaching for more, will gone soft as wax' },
    { when: { sizeClass: 'fat', mindControlled: 1 },
      text: 'her heavy body rolling with blissful, mindless want, thick hands stuffing without a flicker of resistance' },
    { when: { sizeClass: 'ssbbw', mindControlled: 1 },
      text: 'her enormous body trembling with euphoric surrender, vast and pliant and utterly, happily obedient' },
    { when: { mindControlled: 1 },
      text: 'her body moving with dreamy, vacant eagerness, every ounce of resistance dissolved into pleasant fog' },

    // ───── RAVENOUS (excessive hunger) ─────
    { when: { sizeClass: 'thin', ravenous: 1 },
      text: 'her thin frame shaking with desperate hunger, hollow stomach growling loud enough to hear, bony hands grasping' },
    { when: { sizeClass: 'fat', ravenous: 1 },
      text: 'her heavy body driven by a gnawing, bottomless hunger, thick fingers cramming food past her lips without pause' },
    { when: { sizeClass: 'ssbbw', ravenous: 1 },
      text: 'her vast body wracked with an enormous, insatiable craving, every roll of her seeming to demand to be fed' },
    { when: { ravenous: 1 },
      text: 'her whole body taut with ravenous, almost painful hunger, unable to think of anything but the next bite' },

    // ───── fallback ─────
    { when: {}, text: 'her body' },
  ]);

  // ── Sub-part flavor pools (compose into scenes) ───────────────────────────

  registerPool('body.belly', [
    { when: { sizeClass: 'thin' }, text: ['her flat stomach', 'her trim middle', 'her slender waist'] },
    { when: { sizeClass: 'plump' }, text: ['her soft little belly', 'her gently rounded tummy', 'her pooching middle'] },
    { when: { sizeClass: 'fat' }, text: ['her heavy hanging belly', 'her thick, doughy gut', 'her deep soft paunch'] },
    { when: { sizeClass: 'ssbbw' }, text: ['her enormous apron of a belly', 'her vast, low-slung gut', 'her cascading belly'] },
    { when: { sizeClass: 'immobile' }, text: ['her colossal mountain of a belly', 'her room-filling gut', 'her landscape of a belly'] },
    { when: { sizeClass: 'leviathan' }, text: ['her impossibly vast belly', 'her belly like a swelling tide', 'her endless horizon of gut'] },
    { when: {}, text: ['her belly'] },
  ]);

  registerPool('body.rear', [
    { when: { sizeClass: 'thin' }, text: ['her narrow hips', 'her slight backside'] },
    { when: { sizeClass: 'plump' }, text: ['her softening hips', 'her rounding rear'] },
    { when: { sizeClass: 'fat' }, text: ['her thick, spreading rear', 'her heavy hips'] },
    { when: { sizeClass: 'ssbbw' }, text: ['her enormous shelf of a rear', 'her vast, wobbling hips'] },
    { when: { sizeClass: 'immobile' }, text: ['her colossal spreading backside', 'her couch-wide hips'] },
    { when: { sizeClass: 'leviathan' }, text: ['her monumental rear', 'her hips like rolling hills'] },
    { when: {}, text: ['her hips'] },
  ]);

  registerPool('body.thighs', [
    { when: { sizeClass: 'thin' }, text: ['her thin thighs', 'her slender legs'] },
    { when: { sizeClass: 'plump' }, text: ['her softening thighs', 'her rounding legs'] },
    { when: { sizeClass: 'fat' }, text: ['her thick, rubbing thighs', 'her heavy legs'] },
    { when: { sizeClass: 'ssbbw' }, text: ['her vast tree-trunk thighs', 'her enormous legs'] },
    { when: { sizeClass: 'immobile' }, text: ['her colossal thighs merged into one soft mass', 'her immovable legs'] },
    { when: { sizeClass: 'leviathan' }, text: ['her thighs like fallen pillars', 'her legs lost beneath her bulk'] },
    { when: {}, text: ['her thighs'] },
  ]);

  registerPool('body.jiggle', [
    { when: { sizeClass: 'thin' }, text: ['a faint quiver runs through her', 'barely a tremor crosses her slight frame'] },
    { when: { sizeClass: 'plump' }, text: ['a soft jiggle ripples across her', 'her new softness wobbles'] },
    { when: { sizeClass: 'fat' }, text: ['a heavy wobble rolls through her', 'thick waves of jiggle shudder across her'] },
    { when: { sizeClass: 'ssbbw' }, text: ['vast undulations roll across her flesh', 'enormous waves of jiggle travel the length of her'] },
    { when: { sizeClass: 'immobile' }, text: ['slow seismic ripples cross her colossal bulk', 'her flesh heaves like a tide and slowly settles'] },
    { when: { sizeClass: 'leviathan' }, text: ['the whole landscape of her flesh quakes and resettles', 'tremors roll across her like weather'] },
    { when: {}, text: ['she jiggles'] },
  ]);
}

export default registerBodyLexicon;
