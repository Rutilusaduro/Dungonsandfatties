import { useState } from 'react';
import { combatMobilityFor, distance } from '../game/combat/Combat.js';

// Fullness bar: ratio 0-1
const FullnessBar = ({ entity, compact }) => {
  const cap = entity.stomachCapacity || 1;
  const ratio = Math.min(1, (entity.fullness || 0) / cap);
  const pct = Math.round(ratio * 100);
  const color = pct >= 85 ? '#c94a4a' : pct >= 60 ? '#c98a2a' : '#4a9c4a';
  return (
    <div style={{ ...fb.track, height: compact ? '6px' : '9px' }} aria-label={`fullness ${pct}%`}>
      <div style={{ ...fb.fill, width: `${pct}%`, background: color }} />
    </div>
  );
};
const fb = {
  track: { width: '100%', background: '#222', borderRadius: '4px', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: '4px', transition: 'width 220ms ease-out' },
};

const STATUS_LABEL = { active: 'In Combat', won: 'Victory!', lost: 'Defeated' };

const CombatScreen = ({
  player, combat, enemies, field, selectedEnemyId, round, status, combatLog,
  knownSpells, spellLibrary, playerStats,
  onSelectEnemy, onCastSpell, onForceFeed, onMove, onFlee, onContinue,
}) => {
  const [showSpells, setShowSpells] = useState(false);
  if (!player || !combat) return null;

  const playerC = combat.playerCombatant();
  const livingEnemyCs = combat.combatants.filter(c => c.entity.isEnemy && !c.entity._dead);
  const selC = combat.combatants.find(c => c.entity.id === selectedEnemyId && c.entity.isEnemy);
  const selDist = selC && playerC ? distance(playerC, selC) : null;
  const canFeed = selDist != null && selDist <= 1;

  const cols = field.maxX + 1, rows = field.maxY + 1;
  const tokens = combat.combatants.filter(c => c.entity === player || !c.entity._dead);

  const spells = spellLibrary
    ? spellLibrary.getAllSpells().filter(s => !knownSpells || knownSpells.size === 0 || knownSpells.has(s.name))
    : [];
  const spellCost = (sp) => { const l = sp.level ?? 1; return l <= 0 ? 0 : l <= 1 ? 1 : l <= 3 ? 2 : 3; };
  const spellReach = (sp) => sp.combatRange ?? ((sp.level ?? 1) <= 2 ? 4 : 6);

  return (
    <div style={s.overlay}>
      <style>{css}</style>
      <div style={s.panel}>
        <div style={s.header}>
          <span style={s.round}>Round {round}</span>
          <span style={s.status(status)}>{STATUS_LABEL[status]}</span>
        </div>

        {/* Enemy roster */}
        <div style={s.roster}>
          {livingEnemyCs.map(c => {
            const e = c.entity;
            const isSel = e.id === selectedEnemyId;
            const d = playerC ? distance(playerC, c) : 0;
            return (
              <button
                key={e.id}
                className="cs-enemy"
                style={{ ...s.enemyCard, ...(isSel ? s.enemyCardSel : {}) }}
                onClick={() => onSelectEnemy?.(e.id)}
                aria-pressed={isSel}
              >
                <div style={s.enemyTop}>
                  <span style={s.enemyName}>{e.name}</span>
                  <span style={s.enemyDist}>{d === 0 ? 'adjacent' : `${d} away`}</span>
                </div>
                <div style={s.enemySub}>{e.currentWeight} lbs · {combatMobilityFor(e)}</div>
                <FullnessBar entity={e} compact />
              </button>
            );
          })}
        </div>

        {/* Tactical grid */}
        <div style={{ ...s.grid, gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {Array.from({ length: cols * rows }).map((_, i) => (
            <div key={i} style={s.cell} />
          ))}
          {tokens.map(c => {
            const e = c.entity;
            const isPlayer = e === player;
            const isSel = e.id === selectedEnemyId;
            return (
              <button
                key={isPlayer ? 'player' : e.id}
                className="cs-token"
                disabled={isPlayer}
                onClick={() => !isPlayer && onSelectEnemy?.(e.id)}
                style={{
                  ...s.token,
                  gridColumn: c.x + 1, gridRow: c.y + 1,
                  ...(isPlayer ? s.tokenPlayer : s.tokenEnemy),
                  ...(isSel ? s.tokenSel : {}),
                }}
                title={e.name}
              >
                {isPlayer ? '☻' : (e.name[0] || '✦')}
              </button>
            );
          })}
        </div>

        {/* Player status */}
        <div style={s.playerRow}>
          <span style={s.playerName}>{player.name}</span>
          <span style={s.playerSub}>{player.currentWeight} lbs · {combatMobilityFor(player)}</span>
          <div style={{ flex: 1 }}><FullnessBar entity={player} /></div>
        </div>

        {/* Combat log */}
        {combatLog?.length > 0 && (
          <div style={s.log} aria-live="polite">
            {combatLog.slice(-6).map((line, i) => (
              <div key={i} style={s.logLine}>{line}</div>
            ))}
          </div>
        )}

        {/* Actions */}
        {status === 'active' && (
          <div style={s.actions}>
            {!showSpells ? (
              <>
                <div style={s.movePad}>
                  <span style={s.moveLabel}>Move</span>
                  <div style={s.moveGrid}>
                    <button className="cs-btn" style={{ ...s.moveBtn, gridArea: 'up' }} onClick={() => onMove?.('up')}>▲</button>
                    <button className="cs-btn" style={{ ...s.moveBtn, gridArea: 'left' }} onClick={() => onMove?.('closer')}>◀</button>
                    <button className="cs-btn" style={{ ...s.moveBtn, gridArea: 'right' }} onClick={() => onMove?.('further')}>▶</button>
                    <button className="cs-btn" style={{ ...s.moveBtn, gridArea: 'down' }} onClick={() => onMove?.('down')}>▼</button>
                  </div>
                </div>
                <div style={s.actionCol}>
                  <button className="cs-btn" style={s.actionBtn('#4a6a2a')} onClick={() => setShowSpells(true)}>Cast Spell</button>
                  <button
                    className="cs-btn"
                    style={{ ...s.actionBtn('#5a3a1a'), opacity: canFeed ? 1 : 0.5 }}
                    onClick={onForceFeed}
                    title={canFeed ? 'Force-feed the target' : 'Move adjacent to force-feed'}
                  >
                    Force Feed{!canFeed && selC ? ' (too far)' : ''}
                  </button>
                  <button className="cs-btn" style={s.actionBtn('#2a2a4a')} onClick={onFlee}>Flee</button>
                </div>
              </>
            ) : (
              <div style={s.spellList}>
                <div style={s.spellHead}>
                  <span style={{ fontSize: '0.75rem', color: '#888' }}>
                    Cast at {selC?.entity.name || '—'}{selDist != null ? ` (${selDist} away)` : ''}
                  </span>
                  <button className="cs-btn" style={s.cancel} onClick={() => setShowSpells(false)}>Cancel</button>
                </div>
                {spells.map(spell => {
                  const cost = spellCost(spell);
                  const isCantrip = cost === 0;
                  const reach = spellReach(spell);
                  const hasSlot = isCantrip || (playerStats?.spellSlots?.[cost] ?? 0) > 0;
                  const inRange = selDist != null && selDist <= reach;
                  const ok = hasSlot && inRange;
                  return (
                    <button
                      key={spell.name}
                      className="cs-btn"
                      style={{ ...s.spellBtn, opacity: ok ? 1 : 0.45 }}
                      disabled={!ok}
                      onClick={() => { setShowSpells(false); onCastSpell(spell); }}
                      title={!hasSlot ? 'No slots' : !inRange ? `Out of range (reach ${reach})` : `Range ${reach}`}
                    >
                      <span>{spell.name}</span>
                      <span style={s.spellMeta}>{isCantrip ? 'cantrip' : `L${cost}`} · rng {reach}{!inRange ? ' ✕' : ''}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {(status === 'won' || status === 'lost') && (
          <button style={s.continue(status)} onClick={onContinue}>
            {status === 'won' ? 'Continue' : 'Retreat'}
          </button>
        )}
      </div>
    </div>
  );
};

const css = `
  .cs-btn { transition: background 120ms, transform 80ms, border-color 120ms; }
  .cs-btn:active { transform: scale(0.96); }
  .cs-btn:focus-visible, .cs-token:focus-visible, .cs-enemy:focus-visible { outline: 2px solid #c9a227; outline-offset: 2px; }
  @media (hover:hover) and (pointer:fine) {
    .cs-token:not(:disabled):hover { filter: brightness(1.2); }
    .cs-enemy:hover { border-color: #777; }
  }
  @media (prefers-reduced-motion: reduce) { .cs-btn { transition: none; } }
`;

const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40, padding: '16px' },
  panel: {
    background: '#141414', border: '1px solid #333', borderRadius: '14px', padding: '22px',
    width: '560px', maxWidth: '96vw', maxHeight: '92vh', overflowY: 'auto',
    fontFamily: 'Georgia, serif', color: '#e0e0e0', boxShadow: '0 16px 56px rgba(0,0,0,0.8)',
    display: 'flex', flexDirection: 'column', gap: '14px',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  round: { fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', fontVariantNumeric: 'tabular-nums' },
  status: (st) => ({ fontSize: '0.78rem', fontWeight: 700, color: st === 'won' ? '#4fc66a' : st === 'lost' ? '#c94a4a' : '#c9a227', textTransform: 'uppercase', letterSpacing: '0.08em' }),
  roster: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  enemyCard: { flex: '1 1 150px', minWidth: '140px', textAlign: 'left', background: '#1a1212', border: '1px solid #2a2020', borderRadius: '9px', padding: '8px 10px', cursor: 'pointer', color: '#e0e0e0', fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column', gap: '4px' },
  enemyCardSel: { borderColor: '#c9a227', background: '#241c14', boxShadow: '0 0 0 1px #c9a22744' },
  enemyTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '6px' },
  enemyName: { fontWeight: 700, fontSize: '0.84rem' },
  enemyDist: { fontSize: '0.66rem', color: '#a98', fontVariantNumeric: 'tabular-nums' },
  enemySub: { fontSize: '0.68rem', color: '#888', textTransform: 'capitalize' },
  grid: { display: 'grid', gap: '4px', background: '#0d0d0d', borderRadius: '10px', padding: '8px', aspectRatio: '5 / 3', position: 'relative' },
  cell: { background: '#171717', borderRadius: '6px', border: '1px solid #1f1f1f' },
  token: { width: '100%', height: '100%', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', placeSelf: 'stretch' },
  tokenPlayer: { background: '#2f5a2f', color: '#cfe', cursor: 'default' },
  tokenEnemy: { background: '#5a2a2a', color: '#fdd' },
  tokenSel: { boxShadow: '0 0 0 3px #c9a227', outline: 'none' },
  playerRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  playerName: { fontWeight: 700, fontSize: '0.86rem' },
  playerSub: { fontSize: '0.7rem', color: '#888', textTransform: 'capitalize', whiteSpace: 'nowrap' },
  log: { background: '#0d0d0d', borderRadius: '8px', padding: '10px 12px', maxHeight: '110px', overflowY: 'auto' },
  logLine: { fontSize: '0.74rem', color: '#9a9a9a', lineHeight: 1.6 },
  actions: { display: 'flex', gap: '12px', alignItems: 'stretch' },
  movePad: { display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' },
  moveLabel: { fontSize: '0.62rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.08em' },
  moveGrid: { display: 'grid', gridTemplateAreas: '". up ." "left . right" ". down ."', gap: '4px' },
  moveBtn: { width: '38px', height: '34px', background: '#2a2a2a', color: '#ddd', border: '1px solid #3a3a3a', borderRadius: '7px', cursor: 'pointer', fontSize: '0.9rem' },
  actionCol: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  actionBtn: (bg) => ({ padding: '11px 10px', background: bg, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.86rem', fontWeight: 600 }),
  spellList: { width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' },
  spellHead: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' },
  cancel: { background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '0.72rem', textDecoration: 'underline', fontFamily: 'Georgia, serif' },
  spellBtn: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '9px 11px', cursor: 'pointer', color: '#e0e0e0', fontFamily: 'Georgia, serif', fontSize: '0.8rem' },
  spellMeta: { fontSize: '0.66rem', color: '#888', fontVariantNumeric: 'tabular-nums' },
  continue: (st) => ({ width: '100%', padding: '13px', background: st === 'won' ? '#4a6a2a' : '#4a1a1a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.95rem', fontWeight: 700 }),
};

export default CombatScreen;
