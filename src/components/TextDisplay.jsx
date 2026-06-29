import { useEffect, useRef } from 'react';

const TextDisplay = ({ textBuffer }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [textBuffer]);

  const renderText = (entry, idx) => {
    const { text, type, color } = entry;

    if (type === 'divider') {
      return (
        <div key={`${entry.timestamp}-${idx}`} style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>✦ {text} ✦</span>
          <div style={styles.dividerLine} />
        </div>
      );
    }

    const getStyle = () => {
      const baseStyle = { margin: '14px 0', lineHeight: '1.85', color: '#e2ddd6' };
      const accent = { paddingLeft: '12px', paddingTop: '5px', paddingBottom: '5px', marginLeft: '4px' };
      switch (type) {
        case 'synergy': return {
          ...baseStyle, ...accent,
          color: '#c8b8e8', fontStyle: 'italic',
          borderLeft: '2px solid #9a6abf', backgroundColor: '#1e1630',
        };
        case 'italic': return {
          ...baseStyle,
          color: '#c8a46a', fontStyle: 'italic',
        };
        case 'loot': return {
          ...baseStyle, ...accent,
          color: '#c9a227', fontSize: '14px',
          borderLeft: '2px solid #c9a22766', backgroundColor: '#141008',
        };
        case 'info':    return { ...baseStyle, fontSize: '14px', color: '#8a8a8a' };
        case 'bold':    return { ...baseStyle, fontWeight: 'bold' };
        case 'color':   return { ...baseStyle, color };
        case 'success': return { ...baseStyle, color: '#4CAF50' };
        case 'error':   return {
          ...baseStyle, ...accent,
          color: '#f44336', borderLeft: '2px solid #c94a4a', backgroundColor: '#1e1010',
        };
        case 'warning': return { ...baseStyle, color: '#ff9800' };
        default:        return baseStyle;
      }
    };

    return (
      <p key={`${entry.timestamp}-${idx}`} style={getStyle()}>
        {text}
      </p>
    );
  };

  return (
    <div style={styles.textDisplay}>
      <div style={styles.content}>
        {textBuffer.map((entry, idx) => renderText(entry, idx))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

const styles = {
  textDisplay: {
    flex: 1,
    overflowY: 'auto',
    borderBottom: '1px solid #333',
    padding: '0 20px 20px',
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.85',
    paddingTop: '16px',
  },
  divider: {
    margin: '18px 0 10px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#c9a227',
    whiteSpace: 'nowrap',
    fontWeight: 600,
  },
};

export default TextDisplay;
