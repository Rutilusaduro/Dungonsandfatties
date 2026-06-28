import { useState } from 'react';
import { optionSlotCost } from '../game/magic/slotUtils.js';
import { idOf } from '../game/discovery/Discovery.js';

const SCHOOL_COLORS = {
  Transmutation: '#5fa45f',
  Conjuration:   '#9a6abf',
  Enchantment:   '#c264a0',
  Divination:    '#4a9abf',
  Abjuration:    '#c9a227',
  Evocation:     '#c94a4a',
  Necromancy:    '#6a8a3a',
  Illusion:      '#bf9a4a',
};

const LEVEL_COLORS = { 1: '#9a9a9a', 2: '#5fa45f', 3: '#c9a227' };
const levelColor = (lvl) => LEVEL_COLORS[lvl] || '#c94a4a';

const SpellCaster = ({ spellLibrary, knownSpells, onCastSpell, currentZone, playerStats, discovery }) => {
  // Fog-of-war: only things you've "looked around" and seen are targetable.
  const seen = (entity) => !discovery || !currentZone || discovery.has(currentZone.id, idOf(entity));
  const [activeTab, setActiveTab] = useState('cast'); // 'cast', 'you'
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedSecondaryTarget, setSelectedSecondaryTarget] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [castResult, setCastResult] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchool, setSelectedSchool] = useState(null);

  const spells = (spellLibrary ? spellLibrary.getAllSpells() : [])
    .filter(s => !knownSpells || knownSpells.has(s.name));

  // School filtering
  const schools = [...new Set(spells.map(s => s.school))];
  const filteredSpells = spells.filter(spell => {
    const matchesSearch = spell.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSchool = !selectedSchool || spell.school === selectedSchool;
    return matchesSearch && matchesSchool;
  });

  // Get favorite spells (recently cast)
  const recentSpells = [];

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

    // Check objects (only ones you've seen)
    zone.getEnvironmentalObjects?.().forEach(obj => {
      if (seen(obj) && selectedSpell.canTargetEntity(obj)) {
        validTargets.push(obj);
      }
    });

    // Check creatures (exiled ones are away in the feast realm — not targetable)
    zone.getCreatures?.().forEach(creature => {
      if (!creature.isExiled && seen(creature) && selectedSpell.canTargetEntity(creature)) {
        validTargets.push(creature);
      }
    });

    // Check NPCs
    zone.getNPCs?.().forEach(npc => {
      if (!npc.isExiled && seen(npc) && selectedSpell.canTargetEntity(npc)) {
        validTargets.push(npc);
      }
    });

    return validTargets;
  };

  // Get valid secondary targets based on spell type and primary target
  const getValidSecondaryTargets = () => {
    if (!selectedSpell) return [];

    const secondaryType = selectedSpell?.secondaryTargetType;
    if (!secondaryType || secondaryType === 'none') {
      return [];
    }

    const zone = currentZone;
    if (!zone) return [];

    if (selectedSpell.requiresSecondaryTarget && !selectedTarget) {
      return [];
    }

    const validSecondaryTargets = [];

    if (secondaryType === 'creature' || secondaryType === 'entity') {
      const creatures = zone.getCreatures?.() || [];
      creatures.forEach(creature => {
        if (creature.isExiled || !seen(creature)) return;
        if (selectedTarget && creature === selectedTarget) return;
        validSecondaryTargets.push(creature);
      });
    }

    if (secondaryType === 'npc' || secondaryType === 'entity') {
      const npcs = zone.getNPCs?.() || [];
      npcs.forEach(npc => {
        if (npc.isExiled || !seen(npc)) return;
        if (selectedTarget && npc === selectedTarget) return;
        validSecondaryTargets.push(npc);
      });
    }

    if (secondaryType === 'entity') {
      const objects = zone.getEnvironmentalObjects?.() || [];
      objects.forEach(obj => {
        if (!seen(obj)) return;
        if (selectedTarget && obj === selectedTarget) return;
        validSecondaryTargets.push(obj);
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

    // Flash "Cast!" then clear it — keep spell selection so player can cast again.
    setCastResult({ success: true });
    setTimeout(() => setCastResult(null), 1200);
  };

  const validTargets = getValidTargets();
  const validSecondaryTargets = getValidSecondaryTargets();
  const availableOptions = selectedSpell && selectedTarget
    ? selectedSpell.getAvailableOptions(null, selectedTarget, { zone: currentZone })
    : selectedSpell?.options || [];
  const hasZoneAffinity = selectedSpell && currentZone?.spellAffinity?.includes(selectedSpell.name);

  return (
    <div style={styles.container}>
      <style>{`
        .sc-search:focus {
          border-color: #c9a22780 !important;
          box-shadow: 0 0 0 2px rgba(201,162,39,0.12);
          outline: none;
        }
      `}</style>
      <h3 style={styles.title}>⚡ Magic</h3>

      {/* Tab Navigation */}
      <div style={styles.tabNav}>
        <button
          onClick={() => setActiveTab('cast')}
          style={{
            ...styles.tabButton,
            backgroundColor: activeTab === 'cast' ? '#6B4423' : '#3a2a1a',
            color: activeTab === 'cast' ? '#ffd700' : '#999',
            borderBottom: activeTab === 'cast' ? '3px solid #ffd700' : 'none',
          }}
        >
          Cast
        </button>
        <button
          onClick={() => setActiveTab('you')}
          style={{
            ...styles.tabButton,
            backgroundColor: activeTab === 'you' ? '#3a1a2a' : '#3a2a1a',
            color: activeTab === 'you' ? '#b19cd9' : '#999',
            borderBottom: activeTab === 'you' ? '3px solid #b19cd9' : 'none',
          }}
        >
          You
        </button>
      </div>

      {/* Spell Slot Bar */}
      {playerStats?.spellSlots && (
        <div style={styles.slotBar}>
          {[1, 2, 3].map(lvl => {
            const cur = playerStats.spellSlots[lvl] ?? 0;
            const max = playerStats.maxSpellSlots?.[lvl] ?? 0;
            if (max === 0) return null;
            const dots = Array.from({ length: max }, (_, i) => i < cur
              ? <span key={i} style={{ color: '#c9a227' }}>●</span>
              : <span key={i} style={{ color: '#444' }}>○</span>
            );
            return (
              <div key={lvl} style={styles.slotGroup}>
                <span style={{ ...styles.slotLabel, color: levelColor(lvl) }}>L{lvl}</span>
                <span style={{ ...styles.slotCount, letterSpacing: '2px' }}>{dots}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Cast Tab */}
      {activeTab === 'cast' && (
        <div style={styles.tabContent}>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search spells..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
            className="sc-search"
          />

          {/* School Tabs */}
          <div style={styles.schoolTabs}>
            <button
              onClick={() => setSelectedSchool(null)}
              style={{
                ...styles.schoolTab,
                backgroundColor: !selectedSchool ? '#6B4423' : '#4a3728',
                borderColor: !selectedSchool ? '#c9a227' : 'transparent',
                color: !selectedSchool ? '#ffd700' : '#ccc',
              }}
            >
              All
            </button>
            {schools.map(school => {
              const schoolCol = SCHOOL_COLORS[school] || '#c9a227';
              const isActive = selectedSchool === school;
              return (
                <button
                  key={school}
                  onClick={() => setSelectedSchool(school)}
                  style={{
                    ...styles.schoolTab,
                    backgroundColor: isActive ? '#6B4423' : '#4a3728',
                    borderColor: isActive ? schoolCol : 'transparent',
                    color: isActive ? schoolCol : '#ccc',
                  }}
                >
                  {school.slice(0, 4)}
                </button>
              );
            })}
          </div>

          {/* Spell List */}
          <div style={styles.section}>
            <p style={styles.label}>Spells:</p>
            <div style={styles.spellList}>
              {filteredSpells.length > 0 ? (
                filteredSpells.map(spell => {
                  const isSelected = selectedSpell?.name === spell.name;
                  const schoolAccent = SCHOOL_COLORS[spell.school] || '#555';
                  return (
                    <button
                      key={spell.name}
                      onClick={() => handleSpellSelect(spell)}
                      style={{
                        ...styles.spellButton,
                        backgroundColor: isSelected ? '#6B4423' : '#4a3728',
                        borderLeft: isSelected
                          ? '3px solid ' + schoolAccent
                          : '3px solid #2a2a2a',
                      }}
                    >
                      <div style={styles.spellName}>{spell.name}</div>
                      <div style={{ ...styles.spellLevel, color: levelColor(spell.level) }}>
                        L{spell.level}
                      </div>
                    </button>
                  );
                })
              ) : (
                <p style={styles.noSpells}>No spells found</p>
              )}
            </div>
          </div>

          {/* Spell Details */}
          {selectedSpell && (
            <div style={styles.section}>
              <div style={{
                ...styles.spellDetails,
                background: (SCHOOL_COLORS[selectedSpell.school] || '#9a9a9a') + '18',
              }}>
                <h4 style={styles.detailTitle}>{selectedSpell.name}</h4>
                <p style={styles.detailText}>
                  <strong>School:</strong> {selectedSpell.school}
                </p>
                <p style={styles.detailText}>
                  <strong>Level:</strong> {selectedSpell.level}
                </p>
                <p style={styles.detailText}>{selectedSpell.description}</p>

                {selectedSpell.weightGainTheme && (
                  <p style={styles.themeText}>
                    <em>✨ {selectedSpell.weightGainTheme}</em>
                  </p>
                )}

                {hasZoneAffinity && (
                  <p style={styles.affinityText}>
                    Zone resonates with this spell.
                  </p>
                )}
              </div>

              {/* Target Selection */}
              {validTargets.length > 0 && (
                <div style={styles.targetSection}>
                  <p style={styles.label}>Primary Target:</p>
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
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Secondary Target Selection */}
              {(selectedSpell.requiresSecondaryTarget || validSecondaryTargets.length > 0) && (
                <div style={styles.secondaryTargetSection}>
                  <p style={styles.secondaryTargetLabel}>
                    Secondary Target
                    {selectedSpell.requiresSecondaryTarget && ' (Required)'}
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
                          None
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
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p style={styles.noValidTargets}>No valid targets</p>
                  )}
                </div>
              )}

              {/* Spell Options */}
              {availableOptions.length > 0 && (
                <div style={styles.optionSection}>
                  <p style={styles.label}>How to Cast:</p>
                  <div style={styles.optionList}>
                    {availableOptions.map((option, idx) => {
                      const cost = optionSlotCost(selectedSpell, option);
                      const hasSlot = (playerStats?.spellSlots?.[cost] ?? 0) > 0;
                      return (
                        <button
                          key={idx}
                          onClick={() => hasSlot && setSelectedOption(option)}
                          style={{
                            ...styles.optionButton,
                            backgroundColor: !hasSlot ? '#2a2a2a'
                              : selectedOption === option ? '#5a8a3a' : '#3a5a2a',
                            opacity: hasSlot ? 1 : 0.45,
                            cursor: hasSlot ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <div style={styles.optionHeader}>
                            <div style={styles.optionName}>{option.name}</div>
                            <div style={styles.slotBadge}>L{cost}</div>
                          </div>
                          <div style={styles.optionDesc}>{option.description}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Cast Button */}
              <button
                onClick={handleCast}
                style={{
                  ...styles.castButton,
                  opacity: validTargets.length === 0 && selectedSpell.validTargets.length > 0 ? 0.5 : 1,
                  background: 'linear-gradient(135deg, #7a3a10 0%, #a85520 50%, #7a3a10 100%)',
                  border: '1px solid #c9a227',
                  letterSpacing: '0.06em',
                  boxShadow: '0 0 8px ' + (SCHOOL_COLORS[selectedSpell.school] || '#c9a227') + '40, inset 0 1px 0 rgba(255,215,0,0.1)',
                }}
                disabled={validTargets.length === 0 && selectedSpell.validTargets.length > 0}
              >
                Cast Spell
              </button>

              {castResult?.success && (
                <div style={{ ...styles.resultMessage, color: '#4CAF50' }}>
                  ✓
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* You Tab */}
      {activeTab === 'you' && (
        <div style={styles.tabContent}>
          {playerStats ? (
            <div style={styles.statsPanel}>
              <div style={styles.statGroup}>
                <p style={styles.statLabel}>Weight</p>
                <p style={styles.statValue}>
                  {playerStats.currentWeight} / {playerStats.baseWeight} lbs
                </p>
                <div style={styles.statBar}>
                  <div
                    style={{
                      ...styles.statBarFill,
                      width: `${Math.min(100, (playerStats.currentWeight / (playerStats.baseWeight * 1.5)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div style={styles.statGroup}>
                <p style={styles.statLabel}>Gravity</p>
                <p style={styles.statValue}>{playerStats.gravity?.toFixed(1) || '0.0'}</p>
              </div>

              <div style={styles.statGroup}>
                <p style={styles.statLabel}>Nutrition</p>
                <p style={styles.statValue}>
                  {playerStats.caloriesEatenToday || 0} cal today
                </p>
              </div>

              {playerStats.conditions?.length > 0 && (
                <div style={styles.statGroup}>
                  <p style={styles.statLabel}>Conditions</p>
                  <ul style={styles.conditionList}>
                    {playerStats.conditions.map(key => (
                      <li key={key} style={styles.conditionItem}>{key}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p style={styles.sceneNote}>No player stats available</p>
          )}
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
    fontSize: '13px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%',
  },
  title: {
    margin: '0 0 15px 0',
    fontSize: '16px',
    color: '#ffd700',
    borderBottom: '2px solid #8B4513',
    paddingBottom: '10px',
  },
  tabNav: {
    display: 'flex',
    gap: '0',
    marginBottom: '15px',
    borderBottom: '2px solid #333',
  },
  tabButton: {
    flex: 1,
    padding: '10px 8px',
    backgroundColor: '#3a2a1a',
    color: '#999',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'all 0.2s',
  },
  tabContent: {
    flex: 1,
    overflowY: 'auto',
    paddingRight: '8px',
  },
  searchInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '3px',
    fontSize: '13px',
  },
  schoolTabs: {
    display: 'flex',
    gap: '4px',
    marginBottom: '10px',
    overflowX: 'auto',
  },
  schoolTab: {
    padding: '6px 10px',
    backgroundColor: '#4a3728',
    color: '#ccc',
    border: '1px solid transparent',
    borderRadius: '3px',
    cursor: 'pointer',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    transition: 'background-color 0.2s',
  },
  section: {
    marginBottom: '15px',
  },
  label: {
    margin: '0 0 8px 0',
    fontSize: '13px',
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
    fontSize: '13px',
  },
  spellName: {
    fontWeight: 'bold',
    marginBottom: '2px',
  },
  spellLevel: {
    fontSize: '11px',
    color: '#ccc',
  },
  noSpells: {
    color: '#666',
    fontStyle: 'italic',
    fontSize: '13px',
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
    fontSize: '13px',
    color: '#ddd',
  },
  themeText: {
    margin: '8px 0 0 0',
    padding: '8px',
    backgroundColor: '#3a2a1a',
    borderLeft: '3px solid #ffd700',
    fontSize: '13px',
    color: '#ffeb99',
    fontStyle: 'italic',
  },
  affinityText: {
    margin: '8px 0 0 0',
    padding: '7px',
    backgroundColor: '#1f3322',
    borderLeft: '3px solid #5a8a3a',
    fontSize: '13px',
    color: '#bfe6b8',
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
    margin: '0 0 8px 0',
    fontSize: '12px',
    color: '#ff9800',
    textTransform: 'uppercase',
    fontWeight: 'bold',
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
    fontSize: '13px',
  },
  optionSection: {
    marginBottom: '10px',
  },
  optionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  slotBar: {
    display: 'flex',
    gap: '12px',
    padding: '6px 10px',
    backgroundColor: '#111',
    borderBottom: '1px solid #333',
    marginBottom: '8px',
  },
  slotGroup: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
    fontSize: '12px',
  },
  slotLabel: {
    color: '#aaa',
  },
  slotCount: {
    fontWeight: 'bold',
    fontVariantNumeric: 'tabular-nums',
  },
  optionButton: {
    padding: '8px 10px',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all 0.2s',
    fontSize: '13px',
  },
  optionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2px',
  },
  optionName: {
    fontWeight: 'bold',
    fontSize: '13px',
  },
  slotBadge: {
    fontSize: '11px',
    color: '#ccc',
    backgroundColor: '#1a1a1a',
    padding: '1px 5px',
    borderRadius: '3px',
    border: '1px solid #444',
  },
  optionDesc: {
    fontSize: '12px',
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
    backgroundColor: '#2a2218',
    color: '#7a6a50',
    fontSize: '13px',
    borderRadius: '3px',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  resultMessage: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#2a2a2a',
    borderRadius: '3px',
    textAlign: 'center',
    fontSize: '13px',
  },
  sceneNote: {
    color: '#888',
    fontStyle: 'italic',
    fontSize: '13px',
  },
  statsPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  statGroup: {
    backgroundColor: '#2a2a2a',
    padding: '10px',
    borderRadius: '3px',
  },
  statLabel: {
    margin: '0 0 5px 0',
    fontSize: '12px',
    color: '#aaa',
    textTransform: 'uppercase',
  },
  statValue: {
    margin: '0 0 8px 0',
    fontSize: '14px',
    color: '#ffd700',
    fontWeight: 'bold',
  },
  statBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#1a1a1a',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    backgroundColor: '#8B4513',
    transition: 'width 0.3s',
  },
  conditionList: {
    margin: '0',
    paddingLeft: '15px',
    fontSize: '13px',
  },
  conditionItem: {
    margin: '4px 0',
    color: '#ccc',
  },
};

export default SpellCaster;
