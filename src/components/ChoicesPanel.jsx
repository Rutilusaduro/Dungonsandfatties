const ChoicesPanel = ({ choices, onChoice }) => {
  if (!choices || choices.length === 0) {
    return (
      <div style={styles.emptyChoices}>
        <p>End of story... for now.</p>
      </div>
    );
  }

  return (
    <div style={styles.choicesContainer}>
      <p style={styles.label}>What do you do?</p>
      <div style={styles.choicesList}>
        {choices.map((choice, index) => (
          <button
            key={choice.id}
            onClick={() => onChoice(choice.id)}
            style={styles.choiceButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#A0522D';
              e.target.style.transform = 'translateX(5px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#8B4513';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <span style={styles.choiceNumber}>{index + 1}.</span>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  choicesContainer: {
    paddingTop: '20px',
    borderTop: '1px solid #444',
  },
  label: {
    margin: '0 0 15px 0',
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#aaa',
  },
  choicesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  choiceButton: {
    padding: '12px 16px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '15px',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontFamily: 'Georgia, serif',
  },
  choiceNumber: {
    marginRight: '10px',
    color: '#ddd',
  },
  emptyChoices: {
    padding: '20px',
    color: '#666',
    fontStyle: 'italic',
  },
};

export default ChoicesPanel;
