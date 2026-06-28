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
        <h3 style={styles.sectionTitle}><span style={styles.sectionIcon}>⚔</span> <span style={styles.sectionLabel}>Character</span></h3>
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
        <h3 style={styles.sectionTitle}><span style={styles.sectionIcon}>❤</span> <span style={styles.sectionLabel}>Health</span></h3>
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
        <h3 style={styles.sectionTitle}><span style={styles.sectionIcon}>✦</span> <span style={styles.sectionLabel}>Attributes</span></h3>
        {Object.entries(stats.stats).map(([name, value]) => (
          <div key={name} style={styles.stat}>
            <span style={styles.label}>{capitalize(name)}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><span style={styles.sectionIcon}>⚖</span> <span style={styles.sectionLabel}>Weight</span></h3>
        <div style={styles.stat}>
          <span style={styles.label}>Current:</span>
          <span>{stats.weight.current} lbs</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.label}>Base:</span>
          <span>{stats.weight.base} lbs</span>
        </div>
        {weightDiff > 0 && (
          <>
            <div style={styles.weightBar}>
              <div
                style={{
                  ...styles.weightBarFill,
                  width: `${Math.min(100, (weightDiff / 100) * 100)}%`,
                }}
              />
            </div>
            <div style={{ ...styles.stat, color: '#e0a030', fontWeight: 600 }}>
              <span style={styles.label}>Gained:</span>
              <span>+{weightDiff} lbs</span>
            </div>
          </>
        )}
        <div style={styles.stat}>
          <span style={styles.label}>Accumulated:</span>
          <span>{stats.weight.accumulated}</span>
        </div>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}><span style={styles.sectionIcon}>🍗</span> <span style={styles.sectionLabel}>Nutrition</span></h3>
        <div style={styles.stat}>
          <span style={styles.label}>Today:</span>
          <span>{stats.nutrition?.caloriesEatenToday || 0} cal</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.label}>Rest Gain:</span>
          <span>+{stats.nutrition?.pendingWeightGain || 0} lbs</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.label}>Retention:</span>
          <span>x{(stats.nutrition?.retentionMultiplier || 1).toFixed(2)}</span>
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
    fontSize: '14px',
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
    color: '#aaa',
    textTransform: 'uppercase',
    borderBottom: '1px solid #2a2a2a',
    paddingBottom: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  sectionIcon: {
    fontSize: '14px',
  },
  sectionLabel: {
    fontSize: '12px',
  },
  stat: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    borderBottom: '1px solid #2a2a2a',
  },
  label: {
    color: '#a09a90',
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
  weightBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
    overflow: 'hidden',
    margin: '6px 0 4px',
  },
  weightBarFill: {
    height: '100%',
    backgroundColor: '#c98a2a',
    transition: 'width 0.3s',
  },
};

export default CharacterPanel;
