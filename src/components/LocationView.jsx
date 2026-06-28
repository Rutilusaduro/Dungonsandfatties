// LocationView — the shared exploration surface for zones (and dungeon rooms in
// phase 3). Replaces the old "list everything" ZoneDisplay: you arrive blind,
// "Look around" reveals what's present, "Examine" gives detail, "Talk" opens a
// conversation, "Go" moves. Only discovered things are shown.

const KIND = {
  npc:      { label: 'Person',   accent: '#c264a0' },
  creature: { label: 'Creature', accent: '#5fa45f' },
  object:   { label: 'Object',   accent: '#9a8055' },
  food:     { label: 'Food',     accent: '#d7a23a' },
};

const LocationView = ({ location, onLookAround, onExamine, onTalk, onMove, onPrompt }) => {
  if (!location) return <div style={s.empty}>Nowhere to be found.</div>;

  const { name, description, discovered = [], hiddenCount = 0, exits = [], prompts = [] } = location;
  const nothingSeen = discovered.length === 0;

  return (
    <section style={s.root} aria-label={`Location: ${name}`}>
      <style>{css}</style>

      <header>
        <h2 style={s.title}>{name}</h2>
        <p style={s.desc}>{description}</p>
      </header>

      <div style={s.lookRow}>
        <button className="lv-btn lv-look" style={s.lookBtn} onClick={onLookAround}>
          🔍 Look around
        </button>
        {hiddenCount > 0 && nothingSeen && (
          <span style={s.hint} className="lv-hint">Something stirs here, just out of notice.</span>
        )}
      </div>

      {discovered.length > 0 && (
        <ul style={s.list} aria-label="Things you've noticed">
          {discovered.map(row => {
            const kind = KIND[row.kind] || KIND.object;
            return (
              <li key={row.id} style={{ ...s.item, borderLeftColor: kind.accent, opacity: row.exiled ? 0.55 : 1 }}>
                <div style={s.itemMain}>
                  <span style={s.itemName}>{row.name}</span>
                  <span style={{ ...s.kindTag, color: kind.accent }}>{kind.label}</span>
                  {row.exiled && <span style={s.away}> — away in the feast realm</span>}
                </div>
                <div style={s.itemActions}>
                  {row.canExamine && (
                    <button className="lv-btn" style={s.miniBtn} onClick={() => onExamine?.(row)}>
                      Examine
                    </button>
                  )}
                  {row.canTalk && (
                    <button className="lv-btn lv-talk" style={{ ...s.miniBtn, ...s.talkBtn }} onClick={() => onTalk?.(row)}>
                      Talk
                    </button>
                  )}
                </div>
              </li>
            );
          })}
          {hiddenCount > 0 && (
            <li style={s.moreHint}>…and {hiddenCount} more you haven't looked at closely.</li>
          )}
        </ul>
      )}

      {prompts.length > 0 && (
        <div style={s.prompts}>
          {prompts.map(pr => (
            <button
              key={pr.id}
              className={`lv-btn ${pr.tone === 'danger' ? 'lv-danger' : 'lv-good'}`}
              style={{ ...s.promptBtn, ...(pr.tone === 'danger' ? s.promptDanger : s.promptGood) }}
              onClick={() => onPrompt?.(pr.id)}
            >
              {pr.label}
            </button>
          ))}
        </div>
      )}

      {exits.length > 0 && (
        <nav style={s.exits} aria-label="Exits">
          <span style={s.exitsLabel}>Exits</span>
          <div style={s.exitGrid}>
            {exits.map(({ dir, label }) => (
              <button key={dir} className="lv-btn lv-exit" style={s.exitBtn} onClick={() => onMove?.(dir)}>
                {label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </section>
  );
};

const css = `
  .lv-btn { transition: background 120ms ease-out, border-color 120ms ease-out, transform 80ms ease-out; }
  .lv-btn:active { transform: scale(0.97); }
  .lv-btn:focus-visible { outline: 2px solid #c9a227; outline-offset: 2px; }
  @media (hover: hover) and (pointer: fine) {
    .lv-look:hover { background: #5a7a38; }
    .lv-exit:hover { background: #5a8a3a; }
    .lv-talk:hover { background: #a8538a; }
    .lv-danger:hover { background: #8f3232; }
    .lv-good:hover { background: #4a6a2f; }
    .lv-btn:hover { border-color: #555; }
  }
  @keyframes stirPulse { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
  .lv-hint { animation: stirPulse 2.4s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .lv-btn { transition: none; } .lv-hint { animation: none; } }
`;

const s = {
  root: {
    padding: '20px 22px',
    fontFamily: 'Georgia, serif',
    color: '#e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  empty: { color: '#666', fontStyle: 'italic', padding: '20px' },
  title: { margin: 0, fontSize: '1.6rem', color: '#c9a227', textWrap: 'balance' },
  desc: { margin: '8px 0 0', lineHeight: 1.65, color: '#cfcfcf', textWrap: 'pretty', maxWidth: '60ch' },
  lookRow: { display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  lookBtn: {
    padding: '11px 18px', background: '#4a6a2a', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'Georgia, serif', fontSize: '0.92rem', fontWeight: 700,
    letterSpacing: '0.04em',
    boxShadow: '0 2px 8px rgba(74,106,42,0.4), 0 4px 2px rgba(0,0,0,0.3)',
  },
  hint: { fontSize: '0.82rem', color: '#8a7a55', fontStyle: 'italic' },
  list: { listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' },
  item: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px',
    padding: '10px 14px', background: '#181614', borderRadius: '8px',
    borderLeft: '3px solid #555',
    boxShadow: '0 1px 2px rgba(0,0,0,0.3), 0 2px 6px rgba(0,0,0,0.25)',
  },
  itemMain: { display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', minWidth: 0 },
  itemName: { fontWeight: 600, fontSize: '0.95rem' },
  kindTag: { fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.07em' },
  away: { fontSize: '0.72rem', color: '#777', fontStyle: 'italic' },
  itemActions: { display: 'flex', gap: '6px', flexShrink: 0 },
  miniBtn: {
    padding: '5px 12px', background: '#222', color: '#ddd',
    border: '1px solid #333', borderRadius: '6px', cursor: 'pointer',
    fontFamily: 'Georgia, serif', fontSize: '0.76rem',
  },
  talkBtn: { background: '#3a1f33', borderColor: '#5a3050', color: '#f0d6e8' },
  moreHint: { fontSize: '0.78rem', color: '#666', fontStyle: 'italic', paddingLeft: '4px' },
  prompts: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
  promptBtn: {
    padding: '12px 20px', color: '#fff', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontFamily: 'Georgia, serif', fontSize: '0.95rem', fontWeight: 700,
    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
  },
  promptDanger: { background: '#7a2a2a', boxShadow: '0 2px 12px rgba(122,42,42,0.5)' },
  promptGood: { background: '#3f5a28', boxShadow: '0 2px 12px rgba(63,90,40,0.4)' },
  exits: { borderTop: '1px solid #2a2a2a', paddingTop: '14px' },
  exitsLabel: {
    fontSize: '0.68rem', color: '#7a6a50', textTransform: 'uppercase',
    letterSpacing: '0.1em', display: 'block', marginBottom: '8px',
  },
  exitGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  exitBtn: {
    padding: '9px 16px', background: '#3f5a28', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer',
    fontFamily: 'Georgia, serif', fontSize: '0.85rem', fontWeight: 600,
    textTransform: 'capitalize',
    boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
  },
};

export default LocationView;
