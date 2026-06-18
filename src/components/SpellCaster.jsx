import { useState } from 'react';

const SpellCaster = ({ spellLibrary, availableTargets, onCastSpell, currentZone }) => {
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [castResult, setCastResult] = useState(null);

  const spells = spellLibrary ? spellLibrary.getAllSpells() : [];

  const handleSpellSelect = (spell) => {
    setSelectedSpell(spell);
    setSelectedTarget(null);
    setCastResult(null);
  };

  const handleCast = () => {
    if (!selectedSpell) {
      setCastResult({ success: false, message: 'No spell selected' });
      return;
    }

    onCastSpell({
      spell: selectedSpell,
      target: selectedTarget,
      zone: currentZone,
    });

    // Show temporary success message
    setCastResult({
      success: true,
      message: `Cast ${selectedSpell.name}!`,
    });

    setTimeout(() => {
      setSelectedSpell(null);
      setSelectedTarget(null);
      setCastResult(null);
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>⚡ Magic</h3>

      {/* Spell Selection */}
      <div style={styles.section}>
        <p style={styles.label}>Select Spell:</p>
        <div style={styles.spellList}>
          {spells.length > 0 ? (
            spells.map(spell => (
              <button
                key={spell.name}
                onClick={() => handleSpellSelect(spell)}
                style={{
                  ...styles.spellButton,
                  backgroundColor:
                    selectedSpell?.name === spell.name ? '#6B4423' : '#4a3728',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6B4423';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor =
                    selectedSpell?.name === spell.name ? '#6B4423' : '#4a3728';
                }}
              >
                <div style={styles.spellName}>{spell.name}</div>
                <div style={styles.spellLevel}>Lvl {spell.level}</div>
              </button>
            ))
          ) : (
            <p style={styles.noSpells}>No spells available</p>
          )}
        </div>
      </div>

      {/* Spell Details */}
      {selectedSpell && (
        <div style={styles.section}>
          <div style={styles.spellDetails}>
            <h4 style={styles.detailTitle}>{selectedSpell.name}</h4>
            <p style={styles.detailText}>
              <strong>School:</strong> {selectedSpell.school}
            </p>
            <p style={styles.detailText}>
              <strong>Level:</strong> {selectedSpell.level}
            </p>
            <p style={styles.detailText}>
              <strong>Range:</strong> {selectedSpell.range}
            </p>
            <p style={styles.detailText}>{selectedSpell.description}</p>

            {selectedSpell.weightGainTheme && (
              <p style={styles.themeText}>
                <em>✨ {selectedSpell.weightGainTheme}</em>
              </p>
            )}

            {selectedSpell.interactsWith.length > 0 && (
              <div style={styles.interactions}>
                <p style={styles.interactionLabel}>Synergizes with:</p>
                <ul style={styles.interactionList}>
                  {selectedSpell.interactsWith.map(inter => (
                    <li key={inter.spellName} style={styles.interactionItem}>
                      {inter.spellName}: {inter.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Target Selection */}
          {availableTargets && availableTargets.length > 0 && (
            <div style={styles.targetSection}>
              <p style={styles.label}>Select Target:</p>
              <div style={styles.targetList}>
                <button
                  onClick={() => setSelectedTarget(null)}
                  style={{
                    ...styles.targetButton,
                    backgroundColor:
                      selectedTarget === null ? '#5a8a3a' : '#4a6a2a',
                  }}
                >
                  Self/Area
                </button>
                {availableTargets.map((target, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTarget(target)}
                    style={{
                      ...styles.targetButton,
                      backgroundColor:
                        selectedTarget === target ? '#5a8a3a' : '#4a6a2a',
                    }}
                  >
                    {target.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cast Button */}
          <button onClick={handleCast} style={styles.castButton}>
            Cast Spell
          </button>
        </div>
      )}

      {/* Cast Result */}
      {castResult && (
        <div
          style={{
            ...styles.resultMessage,
            color: castResult.success ? '#4CAF50' : '#f44336',
          }}
        >
          {castResult.message}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1a1a1a',
    padding: '15px',
    borderRadius: '4px',
    fontSize: '12px',
  },
  title: {
    margin: '0 0 15px 0',
    fontSize: '16px',
    color: '#ffd700',
    borderBottom: '2px solid #8B4513',
    paddingBottom: '10px',
  },
  section: {
    marginBottom: '15px',
  },
  label: {
    margin: '0 0 8px 0',
    fontSize: '12px',
    color: '#aaa',
    textTransform: 'uppercase',
  },
  spellList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  spellButton: {
    padding: '8px 10px',
    backgroundColor: '#4a3728',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.2s',
    fontSize: '12px',
  },
  spellName: {
    fontWeight: 'bold',
    marginBottom: '2px',
  },
  spellLevel: {
    fontSize: '10px',
    color: '#ccc',
  },
  noSpells: {
    color: '#666',
    fontStyle: 'italic',
  },
  spellDetails: {
    backgroundColor: '#2a2a2a',
    padding: '10px',
    borderRadius: '3px',
    marginBottom: '10px',
  },
  detailTitle: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#ffd700',
  },
  detailText: {
    margin: '4px 0',
    fontSize: '12px',
    color: '#ddd',
  },
  themeText: {
    margin: '8px 0 0 0',
    padding: '8px',
    backgroundColor: '#3a2a1a',
    borderLeft: '3px solid #ffd700',
    fontSize: '11px',
    color: '#ffeb99',
    fontStyle: 'italic',
  },
  interactions: {
    marginTop: '10px',
    paddingTop: '10px',
    borderTop: '1px solid #444',
  },
  interactionLabel: {
    margin: '0 0 5px 0',
    fontSize: '11px',
    color: '#888',
  },
  interactionList: {
    margin: '0',
    paddingLeft: '15px',
    fontSize: '10px',
    color: '#999',
  },
  interactionItem: {
    margin: '2px 0',
  },
  targetSection: {
    marginBottom: '10px',
  },
  targetList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  targetButton: {
    padding: '8px 10px',
    backgroundColor: '#4a6a2a',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.2s',
    fontSize: '12px',
  },
  castButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
  resultMessage: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#2a2a2a',
    borderRadius: '3px',
    textAlign: 'center',
    fontSize: '12px',
  },
};

export default SpellCaster;
