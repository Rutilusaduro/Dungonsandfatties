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
    prompts: [],
  };
}

// roomToLocation(dungeon) -> the same descriptor shape for a dungeon room.
// Contents are hidden until the room is "looked" at; cleared rooms go quiet.
// `prompts` are the room's primary actions (Engage / Gather / Descend).
export function roomToLocation(dungeon) {
  const room = dungeon?.currentRoom;
  const floor = dungeon?.currentFloor;
  if (!room || !floor) return null;

  const k = room.contents.kind;
  const discovered = [];
  const prompts = [];
  let hiddenCount = 0;
  let description = floor.description;

  const hasContent = k === 'combat' || k === 'loot' || k === 'stairs';
  if (hasContent && !room.looked) {
    hiddenCount = 1; // something here you haven't looked at
  } else if (!room.cleared) {
    if (k === 'combat') {
      const foe = room.contents.enemyDefs[0];
      if (foe) {
        discovered.push({ id: `${room.id}_foe`, kind: 'creature', name: foe.name, canExamine: true, canTalk: false });
        prompts.push({ id: 'engage', label: `Engage ${foe.name}`, tone: 'danger' });
        description += room.contents.isGate
          ? ' A formidable presence blocks the way deeper.'
          : ' A foe stirs here.';
      }
    } else if (k === 'loot') {
      discovered.push({ id: `${room.id}_loot`, kind: 'object', name: 'A cache of supplies', canExamine: true, canTalk: false });
      prompts.push({ id: 'take', label: 'Gather the loot', tone: 'good' });
    } else if (k === 'stairs') {
      prompts.push({ id: 'descend', label: 'Descend the stairs', tone: 'good' });
      description += ' A stairwell spirals down into deeper dark.';
    }
  } else {
    description += ' (cleared)';
  }

  return {
    id: room.id,
    name: floor.name,
    description,
    discovered,
    hiddenCount,
    exits: Object.keys(room.exits).map(dir => ({ dir, label: dir })),
    prompts,
  };
}
