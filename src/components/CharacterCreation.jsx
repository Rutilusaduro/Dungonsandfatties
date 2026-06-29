import { useState } from 'react';
import CLASS_REGISTRY from '../game/classes/ClassRegistry.js';

const classes = Object.values(CLASS_REGISTRY);

const CharacterCreation = ({ onStart, onResume }) => {
  const [playerName, setPlayerName] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  const canStart = playerName.trim().length > 0 && selectedClass !== null;

  const handleStart = () => {
    if (canStart) onStart(playerName.trim(), selectedClass);
  };

  return (
    <div style={s.root}>
      <style>{css}</style>

      <h1 style={s.title}>Dungeons &amp; Fatties</h1>
      <p style={s.subtitle}>A Text-Based Fattening Adventure</p>
      <div style={s.divider} />

      {onResume && (
        <button style={s.resumeBtn} className="class-card" onClick={onResume}>
          ▸ Continue saved run
        </button>
      )}

      <div style={s.nameRow}>
        <input
          style={s.nameInput}
          className="cc-name"
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && canStart && handleStart()}
          maxLength={32}
          autoFocus
        />
      </div>

      <p style={s.chooseLabel}>Choose your class</p>

      <div style={s.cards}>
        {classes.map((cls, i) => {
          const selected = selectedClass === cls.name;
          return (
            <button
              key={cls.name}
              style={{
                ...s.card,
                animationDelay: `${i * 80}ms`,
                borderColor: selected ? cls.accentColor : '#2a2a2a',
                boxShadow: selected
                  ? `0 0 0 1px ${cls.accentColor}40, 0 4px 20px ${cls.accentColor}22`
                  : '0 2px 8px rgba(0,0,0,0.4)',
              }}
              className="class-card"
              onClick={() => setSelectedClass(cls.name)}
            >
              <div style={{ ...s.classInitial, color: cls.accentColor, ...(selected ? { textShadow: `0 0 16px ${cls.accentColor}` } : {}) }}>{cls.name[0]}</div>
              <div style={{ ...s.className, color: cls.accentColor }}>{cls.name}</div>
              <div style={s.offHand}>Off-hand: {cls.offHand}</div>
              <p style={s.desc}>{cls.description}</p>
              <div style={s.passive}>{cls.passive}</div>
              <div style={s.spellsLabel}>Starting spells</div>
              <ul style={s.spells}>
                {cls.startingSpells.map(name => (
                  <li key={name} style={s.spellItem}>{name}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <button
        style={{ ...s.startBtn, opacity: canStart ? 1 : 0.4, cursor: canStart ? 'pointer' : 'not-allowed' }}
        disabled={!canStart}
        onClick={handleStart}
      >
        Begin Adventure
      </button>
    </div>
  );
};

const css = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .class-card {
    animation: fadeUp 300ms cubic-bezier(0.23,1,0.32,1) both;
  }
  .class-card:hover {
    transform: translateY(-2px);
    transition: transform 150ms ease-out, box-shadow 150ms ease-out;
  }
  .class-card:active {
    transform: scale(0.98);
  }
  .cc-name:focus {
    border-color: #c9a22780 !important;
    box-shadow: 0 0 0 2px rgba(201,162,39,0.15);
  }
`;

const s = {
  root: {
    minHeight: '100vh',
    backgroundColor: '#111',
    color: '#e0e0e0',
    fontFamily: 'Georgia, serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '48px 24px 64px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#c9a227',
    margin: '0 0 8px',
    letterSpacing: '0.08em',
    textShadow: '0 0 40px rgba(201,162,39,0.4), 0 2px 12px rgba(201,162,39,0.3), 0 4px 2px rgba(0,0,0,0.8)',
    textWrap: 'balance',
  },
  subtitle: {
    color: '#b09a60',
    margin: '0 0 16px',
    fontSize: '0.95rem',
    letterSpacing: '0.12em',
    fontStyle: 'italic',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, #c9a22760, transparent)',
    margin: '0 0 32px',
    width: '320px',
  },
  nameRow: {
    marginBottom: '32px',
    width: '100%',
    maxWidth: '360px',
  },
  nameInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 16px',
    fontSize: '1rem',
    backgroundColor: '#1a1a1a',
    color: '#e0e0e0',
    border: '1px solid #333',
    borderRadius: '6px',
    outline: 'none',
    fontFamily: 'Georgia, serif',
  },
  chooseLabel: {
    color: '#888',
    fontSize: '0.8rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  cards: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  card: {
    width: '220px',
    backgroundColor: '#161616',
    border: '2px solid #2a2a2a',
    borderRadius: '10px',
    padding: '20px 16px',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#e0e0e0',
    fontFamily: 'Georgia, serif',
    transition: 'border-color 150ms, box-shadow 150ms',
  },
  classInitial: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1,
    marginBottom: '6px',
  },
  className: {
    fontSize: '1.1rem',
    fontWeight: 700,
    marginBottom: '2px',
  },
  offHand: {
    fontSize: '0.72rem',
    color: '#666',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  desc: {
    fontSize: '0.82rem',
    color: '#bbb',
    lineHeight: 1.5,
    margin: '0 0 10px',
  },
  passive: {
    fontSize: '0.75rem',
    color: '#999',
    fontStyle: 'italic',
    lineHeight: 1.45,
    marginBottom: '12px',
    borderLeft: '2px solid #333',
    paddingLeft: '8px',
  },
  spellsLabel: {
    fontSize: '0.68rem',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '4px',
  },
  spells: {
    margin: 0,
    paddingLeft: '14px',
  },
  spellItem: {
    fontSize: '0.75rem',
    color: '#888',
    lineHeight: 1.6,
  },
  resumeBtn: {
    padding: '10px 24px',
    marginBottom: '28px',
    fontSize: '0.9rem',
    backgroundColor: '#1d2a1d',
    color: '#9fd99f',
    border: '1px solid #2f4a2f',
    borderRadius: '6px',
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },
  startBtn: {
    padding: '14px 40px',
    fontSize: '1rem',
    background: 'linear-gradient(135deg, #a85520 0%, #6a3010 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontFamily: 'Georgia, serif',
    fontWeight: 700,
    letterSpacing: '0.1em',
    transition: 'opacity 150ms',
    boxShadow: '0 4px 16px rgba(139,69,19,0.5), 0 2px 4px rgba(0,0,0,0.4)',
  },
};

export default CharacterCreation;
