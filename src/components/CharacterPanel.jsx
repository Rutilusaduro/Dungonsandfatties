const CharacterPanel = ({ character }) => {
  if (!character) {
    return <div style={styles.panel}>No character loaded</div>;
  }

  const stats = character.getStats();
  const weightDiff = stats.weight.current - stats.weight.base;
  const healthPercent = (stats.health.current / stats.health.max) * 100;

  return (
    <div style={styles.panel}>
      <h2 style={styles.title}>{stats.name}</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Character</h3>
        <div style={styles.stat}>
          <span style={styles.label}>Race:</span>
          <span>{stats.race}</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.label}>Class:</span>
          <span>{stats.class}</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.label}>Level:</span>
          <span>{stats.level}</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Health</h3>
        <div style={styles.healthBar}>
          <div
            style={{
              ...styles.healthBarFill,
              width: `${healthPercent}%`,
              backgroundColor:
                healthPercent > 50 ? '#4CAF50' : healthPercent > 25 ? '#ff9800' : '#f44336',
            }}
          />
        </div>
        <div style={styles.stat}>
          {stats.health.current} / {stats.health.max}
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Attributes</h3>
        {Object.entries(stats.stats).map(([name, value]) => (
          <div key={name} style={styles.stat}>
            <span style={styles.label}>{capitalize(name)}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Weight</h3>
        <div style={styles.stat}>
          <span style={styles.label}>Current:</span>
          <span>{stats.weight.current} lbs</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.label}>Base:</span>
          <span>{stats.weight.base} lbs</span>
        </div>
        {weightDiff > 0 && (
          <div style={{ ...styles.stat, color: '#ff9800' }}>
            <span style={styles.label}>Gained:</span>
            <span>+{weightDiff} lbs</span>
          </div>
        )}
        <div style={styles.stat}>
          <span style={styles.label}>Accumulated:</span>
          <span>{stats.weight.accumulated}</span>
        </div>
      </div>
    </div>
  );
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = {
  panel: {
    backgroundColor: '#1a1a1a',
    padding: '15px',
    borderRadius: '4px',
    fontSize: '13px',
  },
  title: {
    margin: '0 0 15px 0',
    fontSize: '18px',
    color: '#ffd700',
    borderBottom: '2px solid #8B4513',
    paddingBottom: '10px',
  },
  section: {
    marginBottom: '15px',
  },
  sectionTitle: {
    margin: '10px 0 8px 0',
    fontSize: '13px',
    color: '#aaa',
    textTransform: 'uppercase',
    borderBottom: '1px solid #333',
    paddingBottom: '5px',
  },
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    borderBottom: '1px solid #2a2a2a',
  },
  label: {
    color: '#888',
  },
  healthBar: {
    width: '100%',
    height: '20px',
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  healthBarFill: {
    height: '100%',
    transition: 'width 0.3s',
  },
};

export default CharacterPanel;
