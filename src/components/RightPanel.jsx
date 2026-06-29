import { useState } from 'react';
import DungeonMap from './DungeonMap';

const RightPanel = ({ dungeon, player, knownSpells }) => {
  const [tab, setTab] = useState('stats'); // stats, weight, spells, equipment

  return (
    <div style={s.panel}>
      {/* Map — dungeon only */}
      {dungeon && (
        <>
          <DungeonMap dungeon={dungeon} playerRoomId={dungeon.currentRoomId} />
          <div style={s.divider} />
        </>
      )}

      {/* Menu tabs */}
      <div style={s.tabs}>
        {['stats', 'weight', 'spells', 'equipment'].map(t => (
          <button
            key={t}
            style={{ ...s.tab, ...(tab === t ? s.tabActive : {}) }}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={s.content}>
        {tab === 'stats' && player && (
          <CharacterStats player={player} />
        )}
        {tab === 'weight' && player && (
          <WeightPanel player={player} />
        )}
        {tab === 'spells' && (
          <SpellsPanel knownSpells={knownSpells} />
        )}
        {tab === 'equipment' && player && (
          <EquipmentPanel player={player} />
        )}
      </div>
    </div>
  );
};

const CharacterStats = ({ player }) => {
  const attrs = ['str', 'dex', 'con', 'int', 'wis', 'cha'].map(attr => ({
    name: attr.toUpperCase(),
    value: player[`${attr}Mod`] ?? 0,
  }));

  return (
    <div style={s.panel2}>
      <div style={s.row}>
        <span style={s.label}>Level</span>
        <span style={s.value}>{player.level ?? 1}</span>
      </div>
      <div style={s.row}>
        <span style={s.label}>Class</span>
        <span style={s.value}>{player.class_ || '—'}</span>
      </div>
      {attrs.map(attr => (
        <div key={attr.name} style={s.row}>
          <span style={s.label}>{attr.name}</span>
          <span style={s.value}>{attr.value > 0 ? '+' : ''}{attr.value}</span>
        </div>
      ))}
    </div>
  );
};

const WeightPanel = ({ player }) => {
  const base = player.baseWeight || 150;
  const current = player.currentWeight || base;
  const stage = Math.round((current - base) / base * 100);
  const mobility = player._mobility || 'agile';

  return (
    <div style={s.panel2}>
      <div style={s.row}>
        <span style={s.label}>Current</span>
        <span style={s.value}>{current} lbs</span>
      </div>
      <div style={s.row}>
        <span style={s.label}>Base</span>
        <span style={s.value}>{base} lbs</span>
      </div>
      <div style={s.row}>
        <span style={s.label}>Gain</span>
        <span style={s.value}>{stage > 0 ? '+' : ''}{stage}%</span>
      </div>
      <div style={s.row}>
        <span style={s.label}>State</span>
        <span style={s.value}>{mobility}</span>
      </div>
    </div>
  );
};

const SpellsPanel = ({ knownSpells }) => {
  const spellList = Array.from(knownSpells || []).sort();

  return (
    <div style={s.panel2}>
      {spellList.length === 0 ? (
        <div style={s.empty}>No spells yet</div>
      ) : (
        spellList.map(spell => (
          <div key={spell} style={s.spellItem}>{spell}</div>
        ))
      )}
    </div>
  );
};

const EquipmentPanel = ({ player }) => {
  const slots = ['weapon', 'offhand', 'armor', 'accessory'];
  const equipped = player.equipped || {};

  return (
    <div style={s.panel2}>
      {slots.map(slot => {
        const item = equipped[slot];
        const itemName = item?.name || '—';
        return (
          <div key={slot} style={s.row}>
            <span style={s.label}>{slot}</span>
            <span style={s.value} title={item?.description}>{itemName}</span>
          </div>
        );
      })}
    </div>
  );
};

const s = {
  panel: { display: 'flex', flexDirection: 'column', gap: '0', flex: '0 0 240px', background: '#0d0d0d', borderLeft: '1px solid #2a2a2a', overflowY: 'auto', maxHeight: '100vh' },
  divider: { height: '1px', background: '#2a2a2a', margin: '0' },
  tabs: { display: 'flex', gap: '0', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a', flexWrap: 'wrap' },
  tab: { flex: '1 1 50%', padding: '8px 6px', background: 'none', border: 'none', color: '#8a8a8a', fontSize: '0.7rem', textTransform: 'uppercase', cursor: 'pointer', letterSpacing: '0.06em', borderRight: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' },
  tabActive: { color: '#c9a227', background: '#1a1410', borderBottomColor: '#c9a227' },
  content: { flex: 1, overflowY: 'auto', minHeight: '200px' },
  panel2: { display: 'flex', flexDirection: 'column', gap: '0', padding: '8px' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '6px 8px', borderBottom: '1px solid #1a1a1a', fontSize: '0.75rem' },
  label: { color: '#8a8a8a' },
  value: { color: '#d0b894', fontFamily: 'monospace' },
  spellItem: { padding: '6px 8px', borderBottom: '1px solid #1a1a1a', fontSize: '0.75rem', color: '#d0b894' },
  empty: { padding: '12px 8px', color: '#6a6a6a', fontSize: '0.75rem', textAlign: 'center' },
};

export default RightPanel;
