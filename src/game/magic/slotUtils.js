/** Maps a spell level to the slot tier. Level 0 = cantrip = 0 (free, at-will). */
export function spellLevelToSlot(spellLevel) {
  if (spellLevel <= 0) return 0; // cantrip — costs no slot
  return spellLevel <= 1 ? 1 : spellLevel <= 3 ? 2 : 3;
}

/** Returns the slot cost for a specific option, or derives it from the spell level. */
export function optionSlotCost(spell, option) {
  return option?.slotLevel ?? spellLevelToSlot(spell.level);
}
