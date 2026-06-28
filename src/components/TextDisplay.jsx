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
      const baseStyle = { margin: '8px 0', lineHeight: '1.8', color: '#e2ddd6' };
      switch (type) {
        case 'synergy': return {
          ...baseStyle,
          color: '#c8b8e8',
          fontStyle: 'italic',
          borderLeft: '2px solid #9a6abf',
          backgroundColor: '#1e1630',
          paddingLeft: '10px',
          paddingTop: '4px',
          paddingBottom: '4px',
          marginLeft: '4px',
        };
        case 'info':    return { ...baseStyle, fontSize: '14px', color: '#9a9a9a' };
        case 'bold':    return { ...baseStyle, fontWeight: 'bold' };
        case 'italic':  return { ...baseStyle, fontStyle: 'italic' };
        case 'color':   return { ...baseStyle, color };
        case 'success': return { ...baseStyle, color: '#4CAF50' };
        case 'error':   return {
          ...baseStyle,
          color: '#f44336',
          borderLeft: '2px solid #c94a4a',
          backgroundColor: '#1e1010',
          paddingLeft: '10px',
          paddingTop: '4px',
          paddingBottom: '4px',
          marginLeft: '4px',
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
    fontSize: '15px',
    lineHeight: '1.8',
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
