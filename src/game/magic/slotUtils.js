/** Maps a spell level (0–9) to the slot tier (1, 2, or 3) used in this game's compressed slot system. */
export function spellLevelToSlot(spellLevel) {
  return spellLevel <= 1 ? 1 : spellLevel <= 3 ? 2 : 3;
}

/** Returns the slot cost for a specific option, or derives it from the spell level. */
export function optionSlotCost(spell, option) {
  return option?.slotLevel ?? spellLevelToSlot(spell.level);
}
