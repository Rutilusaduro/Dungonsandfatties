import { useState } from 'react';
import { combatMobilityFor } from '../game/combat/Combat.js';

// Fullness bar: ratio 0-1
const FullnessBar = ({ entity, label }) => {
  const cap = entity.stomachCapacity || 1;
  const ratio = Math.min(1, (entity.fullness || 0) / cap);
  const pct = Math.round(ratio * 100);
  const color = pct >= 85 ? '#c94a4a' : pct >= 60 ? '#c98a2a' : '#4a9c4a';

  return (
    <div style={fb.root}>
      <div style={fb.label}>{label}</div>
      <div style={fb.track} aria-label={`${label} fullness ${pct}%`}>
        <div style={{ ...fb.fill, width: `${pct}%`, background: color }} />
      </div>
      <div style={{ ...fb.pct, fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
    </div>
  );
};

const fb = {
  root: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' },
  label: { width: '72px', fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', flexShrink: 0 },
  track: { flex: 1, height: '8px', background: '#222', borderRadius: '4px', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: '4px', transition: 'width 200ms ease-out' },
  pct: { width: '36px', fontSize: '0.7rem', color: '#888', textAlign: 'right' },
};

// CombatScreen — overlays the main game during an encounter.
// Props:
//   player: Character  |  enemies: [entity]  |  round: number  |  status: 'active'|'won'|'lost'
//   combatLog: string[]
//   knownSpells: Set<string>  |  spellLibrary  |  playerStats
//   onCastSpell(spellName)  — player casts a spell on the primary enemy
//   onForceFeed()           — basic feed action (no spell slot)
//   onFlee()                — attempt to flee (always succeeds for now)
//   onContinue()            — post-combat: advance to next encounter
const CombatScreen = ({
  player, enemies, round, status,
  combatLog,
  knownSpells, spellLibrary, playerStats,
  onCastSpell, onForceFeed, onFlee, onContinue,
}) => {
  const [showSpellList, setShowSpellList] = useState(false);

  const enemy = enemies?.[0];
  if (!player || !enemy) return null;

  const mobility = combatMobilityFor(player);
  const enemyMobility = combatMobilityFor(enemy);
  const playerActionsLeft = playerStats?.actionsLeft ?? '?';

  const spells = spellLibrary
    ? spellLibrary.getAllSpells().filter(s => !knownSpells || knownSpells.has(s.name))
    : [];

  return (
    <div style={s.overlay}>
      <div style={s.panel}>
        {/* Header */}
        <div style={s.header}>
          <span style={s.roundBadge}>Round {round}</span>
          <span style={s.statusBadge(status)}>{STATUS_LABEL[status]}</span>
        </div>

        {/* Enemy */}
        <div style={s.entityCard}>
          <div style={s.entityName}>{enemy.name}</div>
          <div style={s.entityDesc}>{enemy.description}</div>
          <div style={s.statRow}>
            <span>{enemy.currentWeight} lbs</span>
            <span style={s.mobility(enemyMobility)}>{enemyMobility}</span>
          </div>
          <FullnessBar entity={enemy} label="Fullness" />
        </div>

        {/* VS divider */}
        <div style={s.vs}>VS</div>

        {/* Player */}
        <div style={{ ...s.entityCard, background: '#0e1e0e' }}>
          <div style={s.entityName}>{player.name}</div>
          <div style={s.statRow}>
            <span>{player.currentWeight} lbs</span>
            <span style={s.mobility(mobility)}>{mobility}</span>
          </div>
          <FullnessBar entity={player} label="Fullness" />
        </div>

        {/* Combat log */}
        {combatLog?.length > 0 && (
          <div style={s.log} aria-live="polite">
            {combatLog.slice(-4).map((line, i) => (
              <div key={i} style={s.logLine}>{line}</div>
            ))}
          </div>
        )}

        {/* Actions */}
        {status === 'active' && (
          <div style={s.actions}>
            {!showSpellList ? (
              <>
                <button style={s.actionBtn('#4a6a2a')} onClick={() => setShowSpellList(true)}>
                  Cast Spell
                </button>
                <button style={s.actionBtn('#5a3a1a')} onClick={onForceFeed}>
                  Force Feed
                </button>
                <button style={s.actionBtn('#2a2a4a')} onClick={onFlee}>
                  Flee
                </button>
              </>
            ) : (
              <div style={s.spellList}>
                <div style={s.spellListHeader}>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>Choose a spell</span>
                  <button style={s.cancelBtn} onClick={() => setShowSpellList(false)}>Cancel</button>
                </div>
                {spells.map(spell => {
                  const slots = playerStats?.spellSlots;
                  const cost = spell.level <= 1 ? 1 : spell.level <= 3 ? 2 : 3;
                  const avail = slots ? (slots[cost] ?? 0) > 0 : true;
                  return (
                    <button
                      key={spell.name}
                      style={{
                        ...s.spellBtn,
                        opacity: avail ? 1 : 0.4,
                        cursor: avail ? 'pointer' : 'not-allowed',
                      }}
                      disabled={!avail}
                      onClick={() => { setShowSpellList(false); onCastSpell(spell); }}
                    >
                      <span>{spell.name}</span>
                      <span style={s.spellCost}>L{cost}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Post-combat */}
        {(status === 'won' || status === 'lost') && (
          <button style={s.continueBtn(status)} onClick={onContinue}>
            {status === 'won' ? 'Continue' : 'Give Up'}
          </button>
        )}
      </div>
    </div>
  );
};

const STATUS_LABEL = { active: 'In Combat', won: 'Victory!', lost: 'Defeated' };

const s = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.82)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 40,
  },
  panel: {
    background: '#141414',
    border: '1px solid #333',
    borderRadius: '12px',
    padding: '20px',
    width: '420px',
    maxWidth: '92vw',
    maxHeight: '88vh',
    overflowY: 'auto',
    fontFamily: 'Georgia, serif',
    color: '#e0e0e0',
    boxShadow: '0 12px 48px rgba(0,0,0,0.8)',
  },
  header: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '14px',
  },
  roundBadge: {
    fontSize: '0.7rem', color: '#555',
    textTransform: 'uppercase', letterSpacing: '0.1em',
    fontVariantNumeric: 'tabular-nums',
  },
  statusBadge: (status) => ({
    fontSize: '0.72rem', fontWeight: 700,
    color: status === 'won' ? '#4fc66a' : status === 'lost' ? '#c94a4a' : '#c9a227',
    textTransform: 'uppercase', letterSpacing: '0.08em',
  }),
  entityCard: {
    background: '#1a1212',
    borderRadius: '8px',
    padding: '12px 14px',
    marginBottom: '10px',
  },
  entityName: { fontWeight: 700, fontSize: '1rem', marginBottom: '4px' },
  entityDesc: { fontSize: '0.75rem', color: '#888', lineHeight: 1.4, marginBottom: '8px', textWrap: 'pretty' },
  statRow: {
    display: 'flex', justifyContent: 'space-between',
    fontSize: '0.75rem', color: '#888', marginBottom: '8px',
    fontVariantNumeric: 'tabular-nums',
  },
  mobility: (lvl) => ({
    color: lvl === 'immobile' ? '#c94a4a' : lvl === 'minimal' ? '#c98a2a' : '#4fc66a',
    fontWeight: 600, textTransform: 'capitalize',
  }),
  vs: {
    textAlign: 'center', fontSize: '0.7rem', color: '#444',
    letterSpacing: '0.2em', fontWeight: 700,
    margin: '4px 0',
  },
  log: {
    background: '#0d0d0d', borderRadius: '6px', padding: '8px 10px',
    marginBottom: '12px', maxHeight: '80px', overflowY: 'auto',
  },
  logLine: { fontSize: '0.72rem', color: '#888', lineHeight: 1.6 },
  actions: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  actionBtn: (bg) => ({
    flex: 1, minWidth: '80px',
    padding: '10px 8px',
    background: bg, color: '#fff',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontFamily: 'Georgia, serif',
    fontSize: '0.82rem', fontWeight: 600,
  }),
  spellList: { width: '100%', display: 'flex', flexDirection: 'column', gap: '4px' },
  spellListHeader: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '6px',
  },
  cancelBtn: {
    background: 'none', border: 'none', color: '#555',
    cursor: 'pointer', fontSize: '0.72rem', fontFamily: 'Georgia, serif',
    textDecoration: 'underline',
  },
  spellBtn: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#1e1e1e', border: '1px solid #2a2a2a',
    borderRadius: '5px', padding: '8px 10px',
    cursor: 'pointer', color: '#e0e0e0',
    fontFamily: 'Georgia, serif', fontSize: '0.78rem',
  },
  spellCost: { fontSize: '0.68rem', color: '#555' },
  continueBtn: (status) => ({
    width: '100%', marginTop: '12px',
    padding: '12px',
    background: status === 'won' ? '#4a6a2a' : '#4a1a1a',
    color: '#fff', border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontFamily: 'Georgia, serif',
    fontSize: '0.9rem', fontWeight: 700,
  }),
};

export default CombatScreen;
