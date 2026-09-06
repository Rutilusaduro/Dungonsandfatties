import { getSkill } from '../game/mechanics/SkillRegistry.js';

const SkillsPanel = ({ character, onUseSkill, selectedTarget }) => {
  if (!character?.knownSkills?.length) return null;

  const skills = character.knownSkills.map(getSkill).filter(Boolean);

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>Abilities</h3>
      {skills.map(skill => {
        const cd = character.skillCooldowns?.[skill.id] || 0;
        const ready = cd <= 0;
        return (
          <button
            key={skill.id}
            onClick={() => onUseSkill(skill.id)}
            disabled={!ready}
            style={{
              ...styles.skillBtn,
              opacity: ready ? 1 : 0.5,
              borderColor: ready ? '#8B6914' : '#444',
            }}
            title={skill.description}
          >
            <span style={styles.skillName}>{skill.name}</span>
            <span style={styles.skillMeta}>
              {ready ? skill.category : `Recharging (${cd})`}
            </span>
          </button>
        );
      })}
      {selectedTarget && (
        <p style={styles.hint}>Target: {selectedTarget.name}</p>
      )}
    </div>
  );
};

const styles = {
  panel: {
    marginTop: '12px',
    padding: '10px',
    backgroundColor: '#1a1b20',
    borderRadius: '8px',
    border: '1px solid #3a2a1a',
  },
  title: {
    margin: '0 0 8px 0',
    fontSize: '13px',
    color: '#9a8a6a',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  skillBtn: {
    display: 'block',
    width: '100%',
    marginBottom: '6px',
    padding: '8px 10px',
    background: 'linear-gradient(135deg, #2a2218 0%, #1a1510 100%)',
    border: '1px solid #8B6914',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    color: '#e2ddd6',
  },
  skillName: {
    display: 'block',
    fontWeight: 'bold',
    fontSize: '13px',
    color: '#ffd700',
  },
  skillMeta: {
    display: 'block',
    fontSize: '11px',
    color: '#9a9a9a',
    marginTop: '2px',
  },
  hint: {
    fontSize: '11px',
    color: '#7a7a7a',
    margin: '6px 0 0',
    fontStyle: 'italic',
  },
};

export default SkillsPanel;
