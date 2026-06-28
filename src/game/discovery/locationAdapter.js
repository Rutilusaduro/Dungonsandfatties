// locationAdapter — maps an engine Zone (and later a dungeon Room) to a single
// normalized descriptor the LocationView renders. Pure functions; the view never
// touches engine internals.

import { idOf } from './Discovery.js';

// Build the {id, kind, name, canTalk, canExamine, meta} row for one entity.
function row(entity, kind) {
  return {
    id: idOf(entity),
    kind,
    name: entity.name,
    canTalk: kind === 'npc' && !entity.isExiled,
    canExamine: true,
    exiled: !!entity.isExiled,
  };
}

// zoneToLocation(zone, discovery) -> normalized location descriptor.
// `discovered` holds only what the player has "seen"; `hiddenCount` is how many
// present things remain unseen (drives the "something stirs unseen" hint).
export function zoneToLocation(zone, discovery) {
  if (!zone) return null;
  const present = [
    ...(zone.getNPCs?.() || []).map(e => row(e, 'npc')),
    ...(zone.getCreatures?.() || []).map(e => row(e, 'creature')),
    ...(zone.getEnvironmentalObjects?.() || []).map(e => row(e, 'object')),
    ...(zone.getFoods?.() || []).map(e => row(e, 'food')),
  ];
  const isSeen = (r) => !discovery || discovery.has(zone.id, r.id);
  const discovered = present.filter(isSeen);

  return {
    id: zone.id,
    name: zone.name,
    description: zone.description,
    discovered,
    hiddenCount: present.length - discovered.length,
    exits: (zone.getExits?.() || []).map(dir => ({ dir, label: dir })),
  };
}
