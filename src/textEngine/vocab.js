// ═══════════════════════════════════════════════════════════════
// CORE VOCAB MODULES — word.* and subject.* slots
// Wires this game's weight-gain lexicon (lexicon.js, keyed by the 12
// numeric weight stages) into the ported engine's slot system, so any
// template can compose prose like:
//   "{subject.name}'s {word.body} {word.movement}, {word.size} and soft."
// All NPCs are female, so pronoun slots resolve to she/her.
// ═══════════════════════════════════════════════════════════════
import { registerModule } from './engine.js';
import { lexicon } from './lexicon.js';

function byStage(category) {
  return (ctx) => lexicon.pickWord(category, ctx.d?.stage ?? 0, ctx.d?.bodyType);
}

export function registerVocab() {
  // Weight-gain descriptor slots (stage-scaled).
  registerModule('word.size', [{ when: {}, text: byStage('size') }]);
  registerModule('word.movement', [{ when: {}, text: byStage('movement') }]);
  registerModule('word.body', [{ when: {}, text: byStage('body') }]);
  registerModule('word.clothing', [{ when: {}, text: byStage('clothing') }]);
  registerModule('word.fullness', [{ when: {}, text: byStage('fullness') }]);
  registerModule('word.eating', [{ when: {}, text: byStage('eating') }]);

  // Identity slots.
  registerModule('subject.name', [{ when: {}, text: (ctx) => ctx.subject?.name || 'she' }]);
  registerModule('subject.first', [{ when: {}, text: (ctx) => (ctx.subject?.name || 'she').split(' ')[0] }]);
  registerModule('subject.lbs', [{ when: {}, text: (ctx) => String(Math.round(ctx.subject?.currentWeight || 0)) }]);

  // Pronoun slots (all NPCs female).
  registerModule('subject.pronoun', [{ when: {}, text: 'she' }]);
  registerModule('subject.object', [{ when: {}, text: 'her' }]);
  registerModule('subject.possessive', [{ when: {}, text: 'her' }]);

  // Reference (caster) identity.
  registerModule('ref.name', [{ when: {}, text: (ctx) => ctx.ref?.name || 'the caster' }]);
}

export default registerVocab;
