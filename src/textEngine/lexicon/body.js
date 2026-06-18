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
