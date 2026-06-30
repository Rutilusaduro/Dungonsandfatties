import { useState } from 'react';
import { ALTAR_UPGRADES, TOWN_STAGES, getTownStage, getNextStage, getRank, canBuy, buyUpgrade, saveMeta } from '../game/MetaState.js';

const STAGE_COLORS = ['#6b5a3a', '#8a7040', '#a08848', '#b09030', '#c9a227'];

const AltarScreen = ({ meta, onMetaChange, earned, onContinue }) => {
  const [localMeta, setLocalMeta] = useState(meta);
  const stage = getTownStage(localMeta);
  const nextStage = getNextStage(localMeta);

  const handleBuy = (upgrade) => {
    const next = buyUpgrade(localMeta, upgrade);
    if (next === localMeta) return;
    saveMeta(next);
    setLocalMeta(next);
    onMetaChange(next);
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      <div style={s.header}>
        <h1 style={s.title}>The Offering Altar</h1>
        <p style={s.subtitle}>What you carry back feeds what endures.</p>
      </div>

      <div style={s.townBar}>
        <div style={s.stageRow}>
          {TOWN_STAGES.map((ts, i) => (
            <div key={ts.id} style={{
              ...s.stageDot,
              backgroundColor: localMeta.devotion >= ts.devotionRequired ? STAGE_COLORS[i] : '#2a2218',
              border: `1px solid ${localMeta.devotion >= ts.devotionRequired ? STAGE_COLORS[i] : '#3a3020'}`,
            }} title={ts.name} />
          ))}
          <span style={{ ...s.stageLabel, color: STAGE_COLORS[stage.id] }}>
            {stage.name}
          </span>
        </div>
        {nextStage && (
          <p style={s.nextStage}>
            {nextStage.devotionRequired - localMeta.devotion} more until {nextStage.name}
          </p>
        )}
      </div>

      <div style={s.devotionCard}>
        <span style={s.devotionTotal}>◆ {localMeta.devotion}</span>
        <span style={s.devotionLabel}>devotion</span>
        {earned > 0 && (
          <span style={s.earnedBadge}>+{earned} this descent</span>
        )}
      </div>

      <div style={s.divider} />

      <p style={s.sectionLabel}>Altar Offerings</p>
      <div style={s.upgradeGrid}>
        {ALTAR_UPGRADES.map(upg => {
          const rank = getRank(localMeta, upg.key);
          const locked = getTownStage(localMeta).id < upg.minStage;
          const maxed = rank >= upg.maxRanks;
          const affordable = canBuy(localMeta, upg);
          const reqStage = TOWN_STAGES[upg.minStage];
          return (
            <div key={upg.key} style={{
              ...s.upgradeCard,
              opacity: locked ? 0.45 : 1,
              borderColor: affordable ? '#5a4820' : '#2e2820',
            }}>
              <div style={s.upgradeTop}>
                <span style={s.upgradeName}>{upg.label}</span>
                <div style={s.rankDots}>
                  {Array.from({ length: upg.maxRanks }).map((_, i) => (
                    <span key={i} style={{
                      ...s.rankDot,
                      backgroundColor: i < rank ? '#c9a227' : '#2a2218',
                      border: `1px solid ${i < rank ? '#c9a227' : '#3a3020'}`,
                    }} />
                  ))}
                </div>
              </div>
              <p style={s.upgradeDesc}>{upg.desc}</p>
              {locked ? (
                <p style={s.lockedNote}>Requires {reqStage.name} town</p>
              ) : maxed ? (
                <p style={s.maxedNote}>Fully inscribed</p>
              ) : (
                <button
                  className="altar-btn"
                  style={{ ...s.buyBtn, opacity: affordable ? 1 : 0.4 }}
                  disabled={!affordable}
                  onClick={() => handleBuy(upg)}
                >
                  ◆ {upg.cost}
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div style={s.divider} />

      <button className="altar-btn altar-descend" style={s.descendBtn} onClick={onContinue}>
        Begin the descent
      </button>
    </div>
  );
};

const css = `
  .altar-btn {
    cursor: pointer;
    font-family: Georgia, serif;
    transition: background 120ms, transform 80ms, opacity 120ms;
  }
  .altar-btn:hover:not(:disabled) { background: #2a2010 !important; }
  .altar-btn:active:not(:disabled) { transform: scale(0.97); }
  .altar-btn:focus-visible { outline: 2px solid #c9a227; outline-offset: 2px; }
  .altar-descend:hover { background: #1a3010 !important; }
`;

const s = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#0d0c09',
    color: '#d4c8a0',
    fontFamily: 'Georgia, serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 24px 72px',
    gap: '0',
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#c9a227',
    margin: '0 0 6px',
    letterSpacing: '0.06em',
    textShadow: '0 0 32px rgba(201,162,39,0.35)',
  },
  subtitle: { color: '#8a7a50', fontSize: '0.85rem', fontStyle: 'italic', margin: 0 },
  townBar: { textAlign: 'center', marginBottom: '24px' },
  stageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'center',
    marginBottom: '6px',
  },
  stageDot: { width: '12px', height: '12px', borderRadius: '50%' },
  stageLabel: { fontSize: '1rem', fontWeight: 600, letterSpacing: '0.08em', marginLeft: '4px' },
  nextStage: { fontSize: '0.75rem', color: '#6a5c3c', margin: 0, fontStyle: 'italic' },
  devotionCard: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '10px',
    background: '#131008',
    border: '1px solid #2e2410',
    borderRadius: '8px',
    padding: '14px 28px',
    marginBottom: '32px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  devotionTotal: { fontSize: '2.2rem', color: '#c9a227', fontWeight: 700 },
  devotionLabel: { fontSize: '0.9rem', color: '#7a6840', letterSpacing: '0.1em' },
  earnedBadge: {
    fontSize: '0.8rem',
    color: '#8ab870',
    background: '#0d1a08',
    border: '1px solid #2a4018',
    borderRadius: '4px',
    padding: '2px 10px',
    marginLeft: '4px',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #3a2e1080, transparent)',
    width: '100%',
    maxWidth: '600px',
    margin: '0 0 28px',
  },
  sectionLabel: {
    color: '#6a5c3c',
    fontSize: '0.72rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  upgradeGrid: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '32px',
    maxWidth: '700px',
  },
  upgradeCard: {
    width: '200px',
    background: '#131008',
    border: '1px solid #2e2820',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  upgradeTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
  },
  upgradeName: { fontSize: '0.9rem', fontWeight: 600, color: '#c8b880', lineHeight: 1.2 },
  rankDots: { display: 'flex', gap: '4px', flexShrink: 0, paddingTop: '2px' },
  rankDot: { width: '8px', height: '8px', borderRadius: '50%' },
  upgradeDesc: { fontSize: '0.75rem', color: '#7a6840', margin: 0, lineHeight: 1.5 },
  lockedNote: { fontSize: '0.7rem', color: '#4a3c28', fontStyle: 'italic', margin: 0 },
  maxedNote: { fontSize: '0.7rem', color: '#5a8040', fontStyle: 'italic', margin: 0 },
  buyBtn: {
    background: '#1a140a',
    border: '1px solid #5a4820',
    borderRadius: '5px',
    color: '#c9a227',
    fontSize: '0.8rem',
    padding: '6px 14px',
    marginTop: 'auto',
    letterSpacing: '0.04em',
  },
  descendBtn: {
    background: '#0d1a08',
    border: '1px solid #3a5820',
    borderRadius: '8px',
    color: '#8ab870',
    fontSize: '1rem',
    padding: '14px 48px',
    letterSpacing: '0.08em',
  },
};

export default AltarScreen;
