import { distance } from '../game/combat/Combat.js';

const DungeonMap = ({ dungeon, playerRoomId }) => {
  if (!dungeon || !dungeon.rooms) return null;

  // Generate 2D layout for rooms (simple grid-based)
  const rooms = dungeon.rooms;
  const layout = generateRoomLayout(rooms);

  // Canvas dimensions
  const cellSize = 28;
  const padding = 10;
  const width = 160;
  const height = 200;

  return (
    <div style={s.container}>
      <div style={s.label}>Floor {dungeon.floorIndex + 1}</div>
      <svg width={width} height={height} style={s.svg}>
        {/* Edges */}
        {Object.entries(rooms).map(([roomId, room]) => {
          const from = layout[roomId];
          if (!from) return null;
          return Object.entries(room.exits).map(([dir, toId]) => {
            const to = layout[toId];
            if (!to) return null;
            const discovered = room.discovered && rooms[toId]?.discovered;
            return (
              <line
                key={`edge_${roomId}_${toId}`}
                x1={from.x * cellSize + cellSize / 2}
                y1={from.y * cellSize + cellSize / 2}
                x2={to.x * cellSize + cellSize / 2}
                y2={to.y * cellSize + cellSize / 2}
                stroke={discovered ? '#4a7a4a' : '#2a3a2a'}
                strokeWidth={1}
              />
            );
          });
        })}

        {/* Rooms */}
        {Object.entries(layout).map(([roomId, pos]) => {
          const room = rooms[roomId];
          if (!room) return null;

          const isPlayer = roomId === playerRoomId;
          const discovered = room.discovered;
          const isEntry = roomId === dungeon.entryId;
          const isStairs = room.contents?.kind === 'stairs';

          const fill = !discovered ? '#1a1a1a' : isStairs ? '#8b5cf6' : isEntry ? '#6b4a9a' : isPlayer ? '#c9a227' : '#2a3a2a';
          const stroke = isPlayer ? '#e8d4a0' : discovered ? '#4a7a4a' : '#1a2a1a';

          return (
            <g key={`room_${roomId}`}>
              <rect
                x={pos.x * cellSize}
                y={pos.y * cellSize}
                width={cellSize - 2}
                height={cellSize - 2}
                fill={fill}
                stroke={stroke}
                strokeWidth={isPlayer ? 2 : 1}
              />
              {isEntry && (
                <text x={pos.x * cellSize + cellSize / 2} y={pos.y * cellSize + cellSize / 2} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="bold">
                  ↑
                </text>
              )}
              {isStairs && (
                <text x={pos.x * cellSize + cellSize / 2} y={pos.y * cellSize + cellSize / 2} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#fff" fontWeight="bold">
                  ↓
                </text>
              )}
              {isPlayer && (
                <text x={pos.x * cellSize + cellSize / 2} y={pos.y * cellSize + cellSize / 2} textAnchor="middle" dominantBaseline="middle" fontSize="8" fill="#000" fontWeight="bold">
                  ◆
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div style={s.legend}>
        <div style={s.legendItem}><div style={{ ...s.legendBox, background: '#6b4a9a' }} />Entry</div>
        <div style={s.legendItem}><div style={{ ...s.legendBox, background: '#2a3a2a' }} />Combat</div>
        <div style={s.legendItem}><div style={{ ...s.legendBox, background: '#8b5cf6' }} />Descent</div>
      </div>
    </div>
  );
};

// Simple grid layout: BFS from entry, assign coordinates
function generateRoomLayout(rooms) {
  const layout = {};
  const visited = new Set();
  const queue = [];

  // Find entry room
  let entryId = null;
  for (const [id, room] of Object.entries(rooms)) {
    if (room.contents?.kind === 'empty' && !entryId) {
      entryId = id;
      break;
    }
  }

  if (!entryId) return layout;

  // BFS with grid assignment
  layout[entryId] = { x: 0, y: 0 };
  visited.add(entryId);
  queue.push(entryId);

  let yPos = 0;
  let xOffset = 0;

  while (queue.length > 0) {
    const roomId = queue.shift();
    const room = rooms[roomId];
    const pos = layout[roomId];

    let childX = pos.x;
    for (const [dir, childId] of Object.entries(room.exits || {})) {
      if (!visited.has(childId)) {
        visited.add(childId);
        const childPos = dir === 'down' ? { x: pos.x, y: pos.y + 1 } : { x: childX, y: pos.y + 1 };
        layout[childId] = childPos;
        queue.push(childId);
        childX = childPos.x + 1;
      }
    }
  }

  return layout;
}

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px' },
  label: { fontSize: '0.75rem', color: '#8a8a8a', textTransform: 'uppercase', letterSpacing: '0.08em' },
  svg: { background: '#0d0d0d', border: '1px solid #2a2a2a', borderRadius: '4px' },
  legend: { display: 'flex', gap: '6px', fontSize: '0.65rem', flexWrap: 'wrap' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '4px', color: '#8a8a8a' },
  legendBox: { width: '10px', height: '10px', borderRadius: '2px' },
};

export default DungeonMap;
