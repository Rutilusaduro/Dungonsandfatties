import { useEffect, useRef } from 'react';

const TextDisplay = ({ textBuffer }) => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [textBuffer]);

  const renderText = (entry) => {
    const { text, type, color } = entry;

    const getStyle = () => {
      const baseStyle = {
        margin: '10px 0',
        lineHeight: '1.6',
      };

      switch (type) {
        case 'bold':
          return { ...baseStyle, fontWeight: 'bold' };
        case 'italic':
          return { ...baseStyle, fontStyle: 'italic' };
        case 'color':
          return { ...baseStyle, color };
        case 'success':
          return { ...baseStyle, color: '#4CAF50' };
        case 'error':
          return { ...baseStyle, color: '#f44336' };
        case 'warning':
          return { ...baseStyle, color: '#ff9800' };
        case 'info':
          return { ...baseStyle, color: '#2196F3' };
        default:
          return baseStyle;
      }
    };

    return (
      <p key={entry.timestamp} style={getStyle()}>
        {text}
      </p>
    );
  };

  return (
    <div style={styles.textDisplay}>
      <div style={styles.content}>
        {textBuffer.map(entry => renderText(entry))}
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
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.8',
  },
};

export default TextDisplay;
