import { useState } from 'react';

const SpellCaster = ({ spellLibrary, onCastSpell, currentZone }) => {
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedSecondaryTarget, setSelectedSecondaryTarget] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [castResult, setCastResult] = useState(null);

  const spells = spellLibrary ? spellLibrary.getAllSpells() : [];

  const handleSpellSelect = (spell) => {
    setSelectedSpell(spell);
    setSelectedTarget(null);
    setSelectedSecondaryTarget(null);
    setSelectedOption(null);
    setCastResult(null);
  };

  // Get valid targets for the selected spell
  const getValidTargets = () => {
    if (!selectedSpell) return [];

    const zone = currentZone;
    if (!zone) return [];

    const validTargets = [];

    // Check objects
    zone.getEnvironmentalObjects().forEach(obj => {
      if (selectedSpell.canTargetEntity(obj)) {
        validTargets.push(obj);
      }
    });

    // Check creatures
    zone.getCreatures().forEach(creature => {
      if (selectedSpell.canTargetEntity(creature)) {
        validTargets.push(creature);
      }
    });

    // Check NPCs
    zone.getNPCs().forEach(npc => {
      if (selectedSpell.canTargetEntity(npc)) {
        validTargets.push(npc);
      }
    });

    return validTargets;
  };

  // Get valid secondary targets based on spell type and primary target
  const getValidSecondaryTargets = () => {
    if (!selectedSpell || !selectedSpell.secondaryTargetType || selectedSpell.secondaryTargetType === 'none') {
      return [];
    }

    if (!selectedTarget && !selectedSpell.requiresSecondaryTarget) {
      return [];
    }

    const zone = currentZone;
    if (!zone) return [];

    const validSecondaryTargets = [];
    const secondaryType = selectedSpell.secondaryTargetType;

    // Determine which entities to check based on secondaryTargetType
    if (secondaryType === 'creature' || secondaryType === 'entity') {
      zone.getCreatures().forEach(creature => {
        if (creature !== selectedTarget) {
          validSecondaryTargets.push(creature);
        }
      });
    }

    if (secondaryType === 'npc' || secondaryType === 'entity') {
      zone.getNPCs().forEach(npc => {
        if (npc !== selectedTarget) {
          validSecondaryTargets.push(npc);
        }
      });
    }

    if (secondaryType === 'entity') {
      zone.getEnvironmentalObjects().forEach(obj => {
        if (obj !== selectedTarget) {
          validSecondaryTargets.push(obj);
        }
      });
    }

    return validSecondaryTargets;
  };

  const handleCast = () => {
    if (!selectedSpell) {
      setCastResult({ success: false, message: 'No spell selected' });
      return;
    }

    onCastSpell({
      spell: selectedSpell,
      target: selectedTarget,
      secondaryTarget: selectedSecondaryTarget,
      zone: currentZone,
      selectedOption: selectedOption,
    });

    // Show temporary success message
    setCastResult({
      success: true,
      message: `Cast ${selectedSpell.name}!`,
    });

    setTimeout(() => {
      setSelectedSpell(null);
      setSelectedTarget(null);
      setSelectedSecondaryTarget(null);
      setSelectedOption(null);
      setCastResult(null);
    }, 2000);
  };

  const validTargets = getValidTargets();
  const validSecondaryTargets = getValidSecondaryTargets();
  const availableOptions = selectedSpell && selectedTarget
    ? selectedSpell.getAvailableOptions(null, selectedTarget, { zone: currentZone })
    : selectedSpell?.options || [];
  const hasZoneAffinity = selectedSpell && currentZone?.spellAffinity?.includes(selectedSpell.name);

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

            {hasZoneAffinity && (
              <p style={styles.affinityText}>
                This zone resonates with {selectedSpell.name}.
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

          {/* Target Selection - only show valid targets */}
          {validTargets.length > 0 && (
            <div style={styles.targetSection}>
              <p style={styles.label}>Valid Targets:</p>
              <div style={styles.targetList}>
                <button
                  onClick={() => {
                    setSelectedTarget(null);
                    setSelectedSecondaryTarget(null);
                    setSelectedOption(null);
                  }}
                  style={{
                    ...styles.targetButton,
                    backgroundColor:
                      selectedTarget === null ? '#5a8a3a' : '#4a6a2a',
                  }}
                >
                  Area/Self
                </button>
                {validTargets.map((target, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedTarget(target);
                      setSelectedSecondaryTarget(null);
                      setSelectedOption(null);
                    }}
                    style={{
                      ...styles.targetButton,
                      backgroundColor:
                        selectedTarget === target ? '#5a8a3a' : '#4a6a2a',
                    }}
                  >
                    {target.name}
                    {target.type === 'wood' || target.type === 'earth' ? ' (object)' : ''}
                    {target.isAffectedBy?.(selectedSpell.name) ? ' - receptive' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Target Selection */}
          {(selectedSpell.requiresSecondaryTarget || validSecondaryTargets.length > 0) && (
            <div style={styles.secondaryTargetSection}>
              <p style={styles.secondaryTargetLabel}>
                ⚠️ Secondary Target
                {selectedSpell.requiresSecondaryTarget && ' (Required)'}
              </p>
              <p style={styles.secondaryTargetDesc}>
                {selectedSpell.secondaryTargetType === 'creature' && 'This spell will affect a creature'}
                {selectedSpell.secondaryTargetType === 'npc' && 'This spell will affect an NPC'}
                {selectedSpell.secondaryTargetType === 'entity' && 'This spell will affect another entity'}
              </p>
              {validSecondaryTargets.length > 0 ? (
                <div style={styles.targetList}>
                  {!selectedSpell.requiresSecondaryTarget && (
                    <button
                      onClick={() => setSelectedSecondaryTarget(null)}
                      style={{
                        ...styles.targetButton,
                        backgroundColor:
                          selectedSecondaryTarget === null ? '#5a8a3a' : '#4a6a2a',
                      }}
                    >
                      None / Self
                    </button>
                  )}
                  {validSecondaryTargets.map((target, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSecondaryTarget(target)}
                      style={{
                        ...styles.targetButton,
                        backgroundColor:
                          selectedSecondaryTarget === target ? '#5a8a3a' : '#4a6a2a',
                      }}
                    >
                      {target.name}
                      {target.currentWeight && ` (${target.currentWeight} lbs)`}
                    </button>
                  ))}
                </div>
              ) : (
                <p style={styles.noValidTargets}>
                  ⚠️ No valid secondary targets in this zone
                </p>
              )}
            </div>
          )}

          {/* Spell Options */}
          {availableOptions.length > 0 && (
            <div style={styles.optionSection}>
              <p style={styles.label}>How to Cast:</p>
              <div style={styles.optionList}>
                {availableOptions.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(option)}
                    style={{
                      ...styles.optionButton,
                      backgroundColor:
                        selectedOption === option ? '#5a8a3a' : '#3a5a2a',
                      borderLeft:
                        selectedOption === option
                          ? '4px solid #4CAF50'
                          : '4px solid #3a5a2a',
                    }}
                  >
                    <div style={styles.optionName}>{option.name}</div>
                    <div style={styles.optionDesc}>{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cast Button */}
          <button
            onClick={handleCast}
            style={{
              ...styles.castButton,
              opacity: validTargets.length === 0 && selectedSpell.validTargets.length > 0 ? 0.5 : 1,
              cursor: validTargets.length === 0 && selectedSpell.validTargets.length > 0 ? 'not-allowed' : 'pointer',
            }}
            disabled={validTargets.length === 0 && selectedSpell.validTargets.length > 0}
          >
            Cast Spell
          </button>

          {validTargets.length === 0 && selectedSpell.validTargets.length > 0 && (
            <p style={styles.noValidTargets}>
              ⚠️ No valid targets in this zone
            </p>
          )}
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
  affinityText: {
    margin: '8px 0 0 0',
    padding: '7px',
    backgroundColor: '#1f3322',
    borderLeft: '3px solid #5a8a3a',
    fontSize: '11px',
    color: '#bfe6b8',
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
  secondaryTargetSection: {
    marginBottom: '10px',
    padding: '8px',
    backgroundColor: '#252525',
    borderRadius: '3px',
    borderLeft: '3px solid #ff9800',
  },
  secondaryTargetLabel: {
    margin: '0 0 5px 0',
    fontSize: '11px',
    color: '#ff9800',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  secondaryTargetDesc: {
    margin: '0 0 8px 0',
    fontSize: '10px',
    color: '#999',
    fontStyle: 'italic',
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
  optionSection: {
    marginBottom: '10px',
  },
  optionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  optionButton: {
    padding: '8px 10px',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontSize: '11px',
  },
  optionName: {
    fontWeight: 'bold',
    marginBottom: '2px',
    fontSize: '12px',
  },
  optionDesc: {
    fontSize: '10px',
    color: '#bbb',
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
  noValidTargets: {
    marginTop: '10px',
    padding: '8px',
    backgroundColor: '#3a2a2a',
    color: '#ff9800',
    fontSize: '11px',
    borderRadius: '3px',
    textAlign: 'center',
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
