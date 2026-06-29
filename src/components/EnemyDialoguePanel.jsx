// Minimal gothic dialogue panel for enemy pre/post combat lines.
// Does NOT use NPCInteraction — enemies aren't full NPC objects.
const EnemyDialoguePanel = ({ enemyName, lines, onClose }) => {
  const [idx, setIdx] = useState(0);

  const advance = () => {
    if (idx < lines.length - 1) setIdx(i => i + 1);
    else onClose();
  };

  return (
    <div style={s.overlay} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={s.panel}>
        <div style={s.nameBar}>{enemyName}</div>
        <div style={s.body}>{lines[idx]}</div>
        <div style={s.footer}>
          <button style={s.btn} onClick={advance}>
            {idx < lines.length - 1 ? '...' : 'Leave'}
          </button>
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';

const s = {
  overlay: {
    position: 'fixed', inset: 0,
    background: 'rgba(0,0,0,0.75)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 200,
  },
  panel: {
    background: '#0d0d0d',
    border: '1px solid #4a3020',
    borderRadius: '6px',
    maxWidth: '520px',
    width: '90vw',
    fontFamily: 'Georgia, serif',
    overflow: 'hidden',
  },
  nameBar: {
    background: '#1a0d00',
    padding: '10px 16px',
    fontSize: '0.75rem',
    color: '#c9a227',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    borderBottom: '1px solid #4a3020',
  },
  body: {
    padding: '20px 20px 16px',
    fontSize: '0.9rem',
    lineHeight: 1.65,
    color: '#d8cbb8',
    minHeight: '80px',
  },
  footer: {
    padding: '8px 16px 12px',
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: '1px solid #1a1a1a',
  },
  btn: {
    background: 'none',
    border: '1px solid #4a3020',
    color: '#c9a227',
    padding: '6px 20px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    letterSpacing: '0.06em',
    borderRadius: '3px',
  },
};

export default EnemyDialoguePanel;
