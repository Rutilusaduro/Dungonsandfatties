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

const MOBILITY_LABEL = {
  full: 'agile', present: 'winded', planning: 'sluggish',
  economy: 'struggling', minimal: 'straining', immobile: 'immobilized',
};

// Diegetic "you've met her before, and she's bigger" tell for recurring foes.
const RETURN_TELL = {
  1: 'heavier than before',
  2: 'heavier still',
  3: 'vast now',
  4: 'at her heaviest',
};

const CombatScreen = ({
  player, combat, enemies, field, selectedEnemyId, round, status, combatLog,
  knownSpells, spellLibrary, playerStats,
  onSelectEnemy, onCastSpell, onForceFeed, onMove, onFlee, onContinue,
  debugMode, onToggleDebug,
}) => {
  const [showSpells, setShowSpells] = useState(false);
  const [flashId, setFlashId] = useState(null);
  if (!player || !combat) return null;

  const flash = (id) => { setFlashId(id); setTimeout(() => setFlashId(null), 500); };

  const playerC = combat.playerCombatant();
  const livingEnemyCs = combat.combatants.filter(c => c.entity.isEnemy && !c.entity._dead);
  const selC = combat.combatants.find(c => c.entity.id === selectedEnemyId && c.entity.isEnemy);
  const selDist = selC && playerC ? distance(playerC, selC) : null;
  const canFeed = selDist != null && selDist <= 1;

  const cols = field.maxX + 1, rows = field.maxY + 1;
  const tokens = combat.combatants.filter(c => c.entity === player || !c.entity._dead);

  const spells = spellLibrary
    ? spellLibrary.getAllSpells().filter(s => debugMode || !knownSpells || knownSpells.size === 0 || knownSpells.has(s.name))
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
                style={{ ...s.enemyCard, ...(isSel ? s.enemyCardSel : {}), ...(flashId === e.id ? s.enemyCardFlash : {}) }}
                onClick={() => onSelectEnemy?.(e.id)}
                aria-pressed={isSel}
              >
                <div style={s.enemyTop}>
                  <span style={s.enemyName}>{e.name}</span>
                  <span style={s.enemyDist}>{d === 0 ? 'adjacent' : `${d} away`}</span>
                </div>
                {e._returnStage > 0 && RETURN_TELL[e._returnStage] && (
                  <span style={s.returnTell} aria-label={`You've faced her before — ${RETURN_TELL[e._returnStage]}`}>
                    ↩ {RETURN_TELL[e._returnStage]}
                  </span>
                )}
                <div style={s.enemySub}>{e.currentWeight} lbs · {MOBILITY_LABEL[combatMobilityFor(e)] ?? combatMobilityFor(e)}</div>
                <FullnessBar entity={e} compact />
              </button>
            );
          })}
        </div>

        {/* Tactical grid */}
        <div style={{ ...s.grid, gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
          {Array.from({ length: cols * rows }).map((_, i) => (
            <div key={i} style={{ ...s.cell, background: i % 2 === 0 ? '#151515' : '#1a1a1a' }} />
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
                {isPlayer ? '☻' : (() => { const nearFull = (e.fullness || 0) >= (e.stomachCapacity || 1) * 0.9; return nearFull ? '💀' : (e.name[0] || '✦'); })()}
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

        {/* Combat log — prominent, shows last 10 lines */}
        {combatLog?.length > 0 && (
          <div style={s.log} aria-live="polite">
            {combatLog.slice(-10).map((line, i, arr) => (
              <div key={i} style={{ ...s.logLine, color: i === arr.length - 1 ? '#e8d4a0' : i === arr.length - 2 ? '#d0b894' : '#8a8a8a', fontSize: i === arr.length - 1 ? '0.82rem' : '0.75rem' }}>{line}</div>
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
                    onClick={() => { if (selC) flash(selC.entity.id); onForceFeed?.(); }}
                    title={canFeed ? 'Force-feed the target' : 'Move adjacent to force-feed'}
                  >
                    Force Feed{!canFeed && selC ? ' (too far)' : ''}
                  </button>
                  <button className="cs-btn" style={s.actionBtn('#2a2a4a')} onClick={onFlee}>Flee</button>
                  <button className="cs-btn" style={{ ...s.actionBtn('#1a1a2a'), fontSize: '0.65rem', opacity: 0.6 }} onClick={onToggleDebug}>
                    {debugMode ? '∞ slots ON' : '∞ slots OFF'}
                  </button>
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
                  const hasSlot = debugMode || isCantrip || (playerStats?.spellSlots?.[cost] ?? 0) > 0;
                  const inRange = selDist != null && selDist <= reach;
                  const ok = hasSlot && inRange;
                  return (
                    <button
                      key={spell.name}
                      className="cs-btn"
                      style={{ ...s.spellBtn, opacity: ok ? 1 : 0.45 }}
                      disabled={!ok}
                      onClick={() => { setShowSpells(false); if (selC) flash(selC.entity.id); onCastSpell(spell); }}
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

        {status === 'won' && enemies.some(e => e._dead && e.defeatText?.[e._defeatCondition]) && (
          <div style={s.victoryCard}>
            {enemies.filter(e => e._dead && e.defeatText?.[e._defeatCondition]).map(e => (
              <div key={e.id} style={s.victoryText}>{e.defeatText[e._defeatCondition]}</div>
            ))}
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
    background: '#141414', border: '1px solid #3a2a1a', borderRadius: '14px', padding: '22px',
    width: '560px', maxWidth: '96vw', maxHeight: '92vh', overflowY: 'auto',
    fontFamily: 'Georgia, serif', color: '#e0e0e0',
    boxShadow: '0 16px 56px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)',
    display: 'flex', flexDirection: 'column', gap: '14px',
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  round: { fontSize: '0.72rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', fontVariantNumeric: 'tabular-nums' },
  status: (st) => ({ fontSize: '0.78rem', fontWeight: 700, color: st === 'won' ? '#4fc66a' : st === 'lost' ? '#c94a4a' : '#c9a227', textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: st === 'won' ? '0 0 12px rgba(79,198,106,0.5)' : st === 'lost' ? '0 0 10px rgba(201,74,74,0.4)' : 'none' }),
  roster: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  enemyCard: { flex: '1 1 150px', minWidth: '140px', textAlign: 'left', background: '#1a1212', border: '1px solid #2a2020', borderRadius: '9px', padding: '8px 10px', cursor: 'pointer', color: '#e0e0e0', fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column', gap: '4px' },
  enemyCardSel: { borderColor: '#c9a227', background: '#241c14', boxShadow: '0 0 0 1px #c9a22744' },
  enemyCardFlash: { borderColor: '#e8c060', background: '#2a2010', boxShadow: '0 0 0 2px #c9a22799, 0 0 18px #c9a22755', transition: 'none' },
  enemyTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '6px' },
  enemyName: { fontWeight: 700, fontSize: '0.84rem' },
  enemyDist: { fontSize: '0.66rem', color: '#a98', fontVariantNumeric: 'tabular-nums' },
  enemySub: { fontSize: '0.68rem', color: '#888', textTransform: 'capitalize' },
  returnTell: { alignSelf: 'flex-start', fontSize: '0.62rem', fontStyle: 'italic', color: '#e0bd63', background: '#241c0e', border: '1px solid #4a3a1a', borderRadius: '5px', padding: '1px 7px', letterSpacing: '0.03em' },
  grid: { display: 'grid', gap: '4px', background: '#0d0d0d', borderRadius: '10px', padding: '8px', aspectRatio: '5 / 3', position: 'relative' },
  cell: { background: '#171717', borderRadius: '6px', border: '1px solid #1f1f1f' },
  token: { width: '100%', height: '100%', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', placeSelf: 'stretch' },
  tokenPlayer: { background: '#2f5a2f', color: '#cfe', cursor: 'default' },
  tokenEnemy: { background: '#5a2a2a', color: '#fdd' },
  tokenSel: { boxShadow: '0 0 0 3px #c9a227', outline: 'none' },
  playerRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  playerName: { fontWeight: 700, fontSize: '0.86rem' },
  playerSub: { fontSize: '0.7rem', color: '#888', textTransform: 'capitalize', whiteSpace: 'nowrap' },
  log: { background: '#1a1410', border: '1px solid #3a2a1a', borderRadius: '8px', padding: '12px 14px', maxHeight: '180px', overflowY: 'auto', lineHeight: '1.5' },
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
  continue: (st) => ({ width: '100%', padding: '13px', background: st === 'won' ? 'linear-gradient(135deg, #5a7a32 0%, #3a5020 100%)' : 'linear-gradient(135deg, #5a2020 0%, #3a1010 100%)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.95rem', fontWeight: 700, transition: 'transform 80ms' }),
  victoryCard: { background: '#0d0a06', border: '1px solid #4a3020', borderRadius: '8px', padding: '14px 16px' },
  victoryText: { fontSize: '0.88rem', lineHeight: 1.75, color: '#c4b490', fontStyle: 'italic' },
};

export default CombatScreen;
