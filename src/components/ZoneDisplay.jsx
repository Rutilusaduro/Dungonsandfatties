const ZoneDisplay = ({ zone, onZoneAction, onNPCInteract }) => {
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
                <li key={npc.id} style={{ ...styles.entityItem, opacity: npc.isExiled ? 0.5 : 1 }}>
                  <div style={styles.entityHeader}>
                    <div>
                      <strong>{npc.name}</strong> ({npc.role}) - {npc.personality}
                      {npc.isExiled && <em> — away in the feast realm</em>}
                      <div style={styles.entityWeight}>
                        {npc.currentWeight} lbs
                        {npc.weightGainAccumulated > 0 && (
                          <span style={styles.gainedWeight}>
                            {' '}
                            +{npc.weightGainAccumulated}
                          </span>
                        )}
                      </div>
                      {(npc.caloriesEatenToday > 0 || npc.pendingWeightGain > 0 || (npc.calorieRetentionMultiplier || 1) !== 1) && (
                        <div style={styles.nutritionState}>
                          {npc.caloriesEatenToday || 0} cal today - rest gain +{npc.pendingWeightGain || 0} lbs
                          {(npc.calorieRetentionMultiplier || 1) !== 1 ? ` - retention x${(npc.calorieRetentionMultiplier || 1).toFixed(2)}` : ''}
                        </div>
                      )}
                      {npc.conditions?.size > 0 && (
                        <div style={styles.conditionState}>
                          {npc.conditions.keys().map(k => k.replace(/_/g, ' ')).join(' · ')}
                        </div>
                      )}
                      {(npc.gravityMultiplier !== 1 || npc.isFloating || npc.floorTethered || npc.positionedOn) && (
                        <div style={styles.gravityState}>
                          Gravity x{(npc.gravityMultiplier || 1).toFixed(2)}
                          {npc.isFloating ? ' - floating' : ''}
                          {npc.floorTethered ? ' - floor-tethered' : ''}
                          {npc.positionedOn ? ` - on ${npc.positionedOn}` : ''}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => onNPCInteract(npc)}
                      style={styles.interactBtn}
                    >
                      Talk
                    </button>
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
                <li key={creature.id} style={{ ...styles.entityItem, opacity: creature.isExiled ? 0.5 : 1 }}>
                  <strong>{creature.name}</strong> ({creature.type})
                  {creature.isExiled ? <em> — away in the feast realm</em> : <> - Hunger: {creature.hungerLevel}%</>}
                  <div style={styles.entityWeight}>
                    {creature.currentWeight} lbs
                    {creature.weightGainAccumulated > 0 && (
                      <span style={styles.gainedWeight}>
                        {' '}
                        +{creature.weightGainAccumulated}
                      </span>
                    )}
                  </div>
                  <div style={styles.nutritionState}>
                    Food value: {creature.getCalorieValue?.() || 0} cal
                    {(creature.caloriesEatenToday > 0 || creature.pendingWeightGain > 0 || (creature.calorieRetentionMultiplier || 1) !== 1) && (
                      <>
                        {' '}| {creature.caloriesEatenToday || 0} cal today - rest gain +{creature.pendingWeightGain || 0} lbs
                        {(creature.calorieRetentionMultiplier || 1) !== 1 ? ` - retention x${(creature.calorieRetentionMultiplier || 1).toFixed(2)}` : ''}
                      </>
                    )}
                  </div>
                  {(creature.gravityMultiplier !== 1 || creature.isFloating || creature.floorTethered || creature.positionedOn) && (
                    <div style={styles.gravityState}>
                      Gravity x{(creature.gravityMultiplier || 1).toFixed(2)}
                      {creature.isFloating ? ' - floating' : ''}
                      {creature.floorTethered ? ' - floor-tethered' : ''}
                      {creature.positionedOn ? ` - on ${creature.positionedOn}` : ''}
                    </div>
                  )}
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
                  <div style={styles.objectState}>
                    {obj.description}
                    {obj.state && obj.state !== 'intact' ? ` - ${obj.state}` : ''}
                    {obj.properties?.contains ? ` - contains ${obj.properties.contains}` : ''}
                    {obj.properties?.supportable_weight ? ` - supports ${obj.properties.supportable_weight} lbs` : ''}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {zone.getFoods?.().length > 0 && (
          <div style={styles.entityGroup}>
            <p style={styles.entityLabel}>Created Food:</p>
            <ul style={styles.entityList}>
              {zone.getFoods().map((food, idx) => (
                <li key={`${food.name}_${idx}`} style={styles.entityItem}>
                  <strong>{food.name}</strong>
                  <div style={styles.objectState}>
                    {food.totalCalories} calories
                    {food.isMagical ? ' - magical' : ''}
                    {food.isReplicating ? ' - replicating' : ''}
                  </div>
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
  entityHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
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
  conditionState: {
    marginTop: '3px',
    fontSize: '11px',
    color: '#f0c060',
    fontStyle: 'italic',
  },
  gravityState: {
    marginTop: '3px',
    fontSize: '11px',
    color: '#9fd6ff',
  },
  nutritionState: {
    marginTop: '3px',
    fontSize: '11px',
    color: '#d7b56d',
  },
  interactBtn: {
    padding: '4px 10px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '11px',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s',
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
