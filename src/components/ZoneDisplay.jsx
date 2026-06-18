const ZoneDisplay = ({ zone, onZoneAction }) => {
  if (!zone) return <div style={styles.empty}>No zone loaded</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.zoneName}>{zone.name}</h2>
      <p style={styles.description}>{zone.description}</p>

      {/* Zone Info */}
      <div style={styles.infoGrid}>
        <div style={styles.infoItem}>
          <span style={styles.label}>Theme:</span>
          <span>{zone.theme}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Difficulty:</span>
          <span>{zone.difficulty}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Light:</span>
          <span>{zone.lightLevel}</span>
        </div>
        <div style={styles.infoItem}>
          <span style={styles.label}>Weather:</span>
          <span>{zone.weather}</span>
        </div>
      </div>

      {/* Entities in Zone */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>📍 Inhabitants</h3>

        {zone.getNPCs().length > 0 && (
          <div style={styles.entityGroup}>
            <p style={styles.entityLabel}>NPCs:</p>
            <ul style={styles.entityList}>
              {zone.getNPCs().map(npc => (
                <li key={npc.id} style={styles.entityItem}>
                  <strong>{npc.name}</strong> ({npc.role}) - {npc.personality}
                  <div style={styles.entityWeight}>
                    {npc.currentWeight} lbs
                    {npc.weightGainAccumulated > 0 && (
                      <span style={styles.gainedWeight}>
                        {' '}
                        +{npc.weightGainAccumulated}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {zone.getCreatures().length > 0 && (
          <div style={styles.entityGroup}>
            <p style={styles.entityLabel}>Creatures:</p>
            <ul style={styles.entityList}>
              {zone.getCreatures().map(creature => (
                <li key={creature.id} style={styles.entityItem}>
                  <strong>{creature.name}</strong> ({creature.type}) - Hunger:{' '}
                  {creature.hungerLevel}%
                  <div style={styles.entityWeight}>
                    {creature.currentWeight} lbs
                    {creature.weightGainAccumulated > 0 && (
                      <span style={styles.gainedWeight}>
                        {' '}
                        +{creature.weightGainAccumulated}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {zone.getEnvironmentalObjects().length > 0 && (
          <div style={styles.entityGroup}>
            <p style={styles.entityLabel}>Objects:</p>
            <ul style={styles.entityList}>
              {zone.getEnvironmentalObjects().map(obj => (
                <li key={obj.id} style={styles.entityItem}>
                  <strong>{obj.name}</strong> ({obj.type})
                  <div style={styles.objectState}>{obj.description}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Exits */}
      {zone.getExits().length > 0 && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🚪 Exits</h3>
          <div style={styles.exitGrid}>
            {zone.getExits().map(direction => (
              <button
                key={direction}
                onClick={() => onZoneAction({ type: 'move', direction })}
                style={styles.exitButton}
              >
                {direction}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  empty: {
    color: '#666',
    fontStyle: 'italic',
    padding: '20px',
  },
  zoneName: {
    margin: '0 0 10px 0',
    fontSize: '28px',
    color: '#ffd700',
  },
  description: {
    margin: '0 0 20px 0',
    lineHeight: '1.6',
    color: '#ddd',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#2a2a2a',
    borderRadius: '4px',
  },
  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
  },
  label: {
    color: '#888',
    marginRight: '10px',
  },
  section: {
    marginBottom: '20px',
  },
  sectionTitle: {
    margin: '0 0 10px 0',
    fontSize: '16px',
    color: '#ffd700',
    borderBottom: '1px solid #444',
    paddingBottom: '8px',
  },
  entityGroup: {
    marginBottom: '15px',
  },
  entityLabel: {
    margin: '10px 0 5px 0',
    fontSize: '13px',
    color: '#aaa',
    fontWeight: 'bold',
  },
  entityList: {
    margin: '0',
    paddingLeft: '20px',
    listStyle: 'none',
  },
  entityItem: {
    padding: '8px',
    marginBottom: '8px',
    backgroundColor: '#2a2a2a',
    borderRadius: '3px',
    fontSize: '12px',
    borderLeft: '3px solid #8B4513',
  },
  entityWeight: {
    marginTop: '4px',
    fontSize: '11px',
    color: '#999',
  },
  gainedWeight: {
    color: '#ff9800',
    fontWeight: 'bold',
  },
  objectState: {
    marginTop: '4px',
    fontSize: '11px',
    color: '#888',
    fontStyle: 'italic',
  },
  exitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  exitButton: {
    padding: '10px',
    backgroundColor: '#4a6a2a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
};

export default ZoneDisplay;
