import { useEffect, useRef } from 'react';

// Modal shown when the player levels up.
// Props: level (new level), choices (array of spell names), onChoose(spellName)
const LevelUpPanel = ({ level, choices, onChoose }) => {
  const firstBtn = useRef(null);

  useEffect(() => {
    firstBtn.current?.focus();
  }, []);

  const handleKey = (e) => {
    if (e.key === 'Escape') onChoose(null); // skip choice (no spell gained)
  };

  return (
    <div style={s.overlay} role="dialog" aria-modal="true" aria-labelledby="levelup-title" onKeyDown={handleKey}>
      <style>{css}</style>
      <div style={s.panel} className="levelup-panel">
        <div style={s.badge}>Level {level}</div>
        <h2 id="levelup-title" style={s.title}>Level Up!</h2>
        <p style={s.sub}>Your power grows. Choose a new spell to add to your repertoire.</p>

        <div style={s.choices}>
          {choices.map((name, i) => (
            <button
              key={name}
              ref={i === 0 ? firstBtn : null}
              style={s.choice}
              className="levelup-choice"
              onClick={() => onChoose(name)}
            >
              <span style={s.choiceName}>{name}</span>
              <span style={s.choiceHint}>Add to spellbook</span>
            </button>
          ))}
          {choices.length === 0 && (
            <p style={s.noChoices}>No new spells available — all class spells learned.</p>
          )}
        </div>

        <button style={s.skip} onClick={() => onChoose(null)}>
          Skip (no new spell)
        </button>
      </div>
    </div>
  );
};

const css = `
  @keyframes levelIn {
    from { opacity: 0; transform: scale(0.92) translateY(12px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .levelup-panel {
    animation: levelIn 280ms cubic-bezier(0.23,1,0.32,1) both;
  }
  @media (hover: hover) and (pointer: fine) {
    .levelup-choice:hover {
      border-color: #c9a227;
      background: rgba(201,162,39,0.08);
      box-shadow: 0 0 12px rgba(201,162,39,0.2);
    }
  }
  .levelup-choice { transition: border-color 150ms, background 150ms, box-shadow 150ms; }
  .levelup-choice:active { transform: scale(0.98); }
  @media (prefers-reduced-motion: reduce) {
    .levelup-panel { animation: none; }
    .levelup-choice { transition: none; }
  }
`;

const s = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 100,
  },
  panel: {
    background: 'radial-gradient(ellipse at 50% 0%, #2a2010 0%, #141414 60%)',
    border: '1px solid #3a2f1a',
    borderRadius: '12px',
    padding: '32px 28px',
    width: '360px',
    maxWidth: '90vw',
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
    color: '#e0e0e0',
    boxShadow: '0 8px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(201,162,39,0.08)',
  },
  badge: {
    display: 'inline-block',
    background: '#c9a227',
    color: '#111',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '20px',
    marginBottom: '12px',
    fontVariantNumeric: 'tabular-nums',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: '0 0 8px',
    color: '#c9a227',
    letterSpacing: '0.06em',
    textShadow: '0 0 24px rgba(201,162,39,0.5), 0 2px 8px rgba(201,162,39,0.3)',
    textWrap: 'balance',
  },
  sub: {
    fontSize: '0.82rem',
    color: '#888',
    margin: '0 0 24px',
    lineHeight: 1.5,
    textWrap: 'pretty',
  },
  choices: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' },
  choice: {
    background: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '12px 16px',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    color: '#e0e0e0',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'border-color 150ms, background 150ms',
  },
  choiceName: { fontWeight: 600, fontSize: '0.9rem' },
  choiceHint: { fontSize: '0.7rem', color: '#555' },
  noChoices: { color: '#666', fontSize: '0.82rem', fontStyle: 'italic' },
  skip: {
    background: 'none', border: 'none', color: '#555',
    fontSize: '0.75rem', cursor: 'pointer', fontFamily: 'Georgia, serif',
    textDecoration: 'underline',
  },
};

export default LevelUpPanel;
