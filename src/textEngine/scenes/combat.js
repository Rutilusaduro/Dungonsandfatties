// ═══════════════════════════════════════════════════════════════
// COMBAT VICTORY SCENES — C4: the vic.* skeleton.
// One composed readout per won encounter, built from four independent slots:
//   {vic.lead} {vic.finisher} {vic.size_payoff} {vic.aftermath}
// Each slot is keyed on a different axis, so ~20 authored fragments multiply
// out into hundreds of distinct readouts:
//   lead     — keyed on win-path state    (floor / immobilized / succumbed / consumed)
//   finisher — keyed on the `via` global  (bury / gravity / vore / flesh_to_food / throttle / willingness)
//   payoff   — keyed on the loser's stage (6 weight bands, like spell.weight_gain)
//   aftermath— keyed on willingness/persona
// state + via arrive as globals; stage/willingness/persona derive off the
// subject. Prose passed through the fuck-slop pass before landing here.
// ═══════════════════════════════════════════════════════════════

export function registerCombatModules(engine) {
  // The composer. Callers render 'vic.scene' with subject = defeated entity and
  // globals = { state, via } from checkWinState.
  engine.registerModule('vic.scene', [
    { when: {}, text: '{vic.lead} {vic.finisher} {vic.size_payoff} {vic.aftermath}' },
  ]);

  // ── lead — keyed on win-path state (floor = the when:{} fallback) ──
  engine.registerPool('vic.lead', [
    { when: {}, text: "It's done. {subject.name} is finished, and there's no question left about who won." },
    { when: { state: 'immobilized' }, text: "{subject.name} isn't going anywhere. She's pinned by the only thing big enough to hold her — herself." },
    { when: { state: 'succumbed' }, text: 'Somewhere in the feeding {subject.name} stopped fighting you and started leaning into it. She is done resisting.' },
    { when: { state: 'consumed' }, text: "There's no {subject.name} left to fight. There's only what she became." },
  ]);

  // ── finisher — keyed on the `via` the win was scored through ──
  engine.registerPool('vic.finisher', [
    { when: {}, text: 'However you got here, you got here.' },
    { when: { via: 'buried' }, text: 'You closed the earth over her and it held. {subject.name} sits sealed in shaped stone, far too vast to dig free.' },
    { when: { via: 'gravity' }, text: 'You poured weight onto weight until the ground took her. {subject.name} sank past rescue and stayed there.' },
    { when: { via: 'vore' }, text: 'She went down in a single swallow — small, warm, and far too deep asleep to stir.' },
    { when: { via: 'flesh_to_food' }, text: 'Stuffed past bursting, she was already more feast than foe. The spell only finished what the feeding started.' },
    { when: { via: 'throttle' }, text: 'No spell ended it. {subject.name} simply outgrew her own ability to move, and the fight ended itself.' },
    { when: { via: 'willingness' }, text: 'She had been begging you to finish it long before you did.' },
  ]);

  // ── size payoff — 6 weight bands, mirrors spell.weight_gain coverage ──
  engine.registerPool('vic.size_payoff', [
    { when: { stageMax: 1 }, text: 'There is little spoil to her — she barely softened before she folded.' },
    { when: { stageMin: 2, stageMax: 3 }, text: 'She carries a new roundness now, a soft belly’s worth of proof.' },
    { when: { stageMin: 4, stageMax: 5 }, text: 'There is a real heaviness to her, thighs and middle thick with everything you put into her.' },
    { when: { stageMin: 6, stageMax: 7 }, text: 'She has gone genuinely vast, a rolling overfed weight that strains anything she leans on.' },
    { when: { stageMin: 8, stageMax: 9 }, text: 'She is enormous now, a spreading mass of overfed flesh that swallows the ground she went down on.' },
    { when: { stageMin: 10 }, text: 'She is past scale entirely — an immense, drowning mass where an enemy used to stand.' },
  ]);

  // ── in-fight fattening — keyed on fullnessRatio bands (combat moves fullness,
  // not weight), fired when a foe crosses a fullness threshold mid-battle.
  // Reuses the body.* slots so the flavor scales with how big she already is.
  engine.registerPool('combat.fattening', [
    { when: {}, text: '{subject.name} swells a little fuller, packing down what you forced on her.' },
    { when: { fullnessMin: 0.5, fullnessMax: 0.69 }, text: '{subject.name} sloshes audibly, {body.belly} pushing out as she fills past comfortable.' },
    { when: { fullnessMin: 0.5, fullnessMax: 0.69 }, text: 'A soft groan escapes {subject.name}; {body.jiggle}, and her stuffed middle rounds further.' },
    { when: { fullnessMin: 0.7, fullnessMax: 0.84 }, text: '{subject.name} is slowing now, heavy and overfull, {body.belly} taut and straining.' },
    { when: { fullnessMin: 0.7, fullnessMax: 0.84 }, text: 'Each movement costs {subject.name} more — {body.jiggle} as her gorged bulk fights her.' },
    { when: { fullnessMin: 0.85, fullnessMax: 0.99 }, text: '{subject.name} sways, packed to bursting, barely able to keep her feet under all of herself.' },
    { when: { fullnessMin: 1.0 }, text: '{subject.name} can no longer move — wedged in place under {body.belly}, too stuffed to fight on.' },
  ]);

  // ── aftermath — keyed on willingness, plus a bespoke boss override ──
  engine.registerPool('vic.aftermath', [
    { when: {}, text: 'She lies where she settled, spent.' },
    { when: { willingnessMin: 80 }, text: "And she is smiling. Whatever you did, she would let you do it again." },
    { when: { willingnessMin: 55, willingnessMax: 79 }, text: 'She is flushed and breathing hard, in no hurry to be anywhere else.' },
    { when: { willingnessMax: 30 }, text: 'She glares at you, furious and helpless and far too heavy to do a thing about either.' },
    // Bespoke boss override — wins on priority whenever the loser is Gertrude,
    // regardless of her willingness band.
    { when: { persona: 'gertrude' }, priority: 10,
      text: '"Acceptable technique," Gertrude wheezes from somewhere beneath all of herself. "I’d have used more butter. But yes — well done."' },
  ]);
}

export default registerCombatModules;
