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
          <span style={styles.dividerText}>{text}</span>
        </div>
      );
    }

    const getStyle = () => {
      const baseStyle = { margin: '8px 0', lineHeight: '1.7', color: '#ddd' };
      switch (type) {
        case 'synergy': return { ...baseStyle, color: '#c8b8e8', fontStyle: 'italic' };
        case 'info':    return { ...baseStyle, fontSize: '13px', color: '#888' };
        case 'bold':    return { ...baseStyle, fontWeight: 'bold' };
        case 'italic':  return { ...baseStyle, fontStyle: 'italic' };
        case 'color':   return { ...baseStyle, color };
        case 'success': return { ...baseStyle, color: '#4CAF50' };
        case 'error':   return { ...baseStyle, color: '#f44336' };
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
    color: '#555',
    fontSize: '11px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  dividerText: {
    color: '#666',
    whiteSpace: 'nowrap',
  },
};

export default TextDisplay;
