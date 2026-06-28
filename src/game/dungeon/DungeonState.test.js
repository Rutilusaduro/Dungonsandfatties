import { describe, it, expect } from 'vitest';
import { DungeonState } from './DungeonState.js';

describe('DungeonState room graph', () => {
  it('starts in the entry room with exits', () => {
    const ds = new DungeonState(123);
    expect(ds.currentRoom.contents.kind).toBe('empty');
    expect(ds.exits().length).toBeGreaterThan(0);
  });

  it('move/look/clear mutate the right room', () => {
    const ds = new DungeonState(123);
    const dir = ds.exits()[0];
    const room = ds.move(dir);
    expect(room).toBeTruthy();
    expect(ds.currentRoom.discovered).toBe(true);
    ds.look();
    expect(ds.currentRoom.looked).toBe(true);
  });

  it('descend only works from the stairs room', () => {
    const ds = new DungeonState(123);
    expect(ds.canDescend).toBe(false);
    ds.currentRoomId = ds.stairsId;
    expect(ds.canDescend).toBe(true);
    const r = ds.descend();
    expect(r.floorComplete).toBe(true);
    expect(ds.floorIndex).toBe(1);
  });

  it('serialize -> hydrate restores floor, position, and room flags', () => {
    const ds = new DungeonState(777);
    // advance a bit: clear a combat room, look at another, descend a floor
    ds.currentRoomId = ds.stairsId; ds.descend();
    const someRoom = Object.keys(ds.rooms)[1];
    ds.currentRoomId = someRoom;
    ds.look();
    ds.clearRoom(someRoom);

    const round = DungeonState.hydrate(JSON.parse(JSON.stringify(ds.serialize())));
    expect(round.floorIndex).toBe(1);
    expect(round.currentRoomId).toBe(someRoom);
    expect(round.rooms[someRoom].cleared).toBe(true);
    expect(round.rooms[someRoom].looked).toBe(true);
    expect(round.seed).toBe(777);
  });
});
