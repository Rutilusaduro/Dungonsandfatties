import { useState } from 'react';

const NPCInteraction = ({ npc, onClose, onAction }) => {
  const [tab, setTab] = useState('talk'); // 'talk' or 'examine'
  const [talkedOnce, setTalkedOnce] = useState(false);

  if (!npc) return null;

  const handleTalk = () => {
    const dialogue = talkedOnce
      ? npc.nextDialogue('default')
      : npc.startConversation();

    onAction({
      type: 'talk',
      npc: npc.name,
      dialogue: dialogue,
    });

    setTalkedOnce(true);
  };

  const handleExamine = () => {
    const description = npc.examine();
    onAction({
      type: 'examine',
      npc: npc.name,
      description: description,
    });
  };

  const reputationColor =
    npc.playerReputation > 50
      ? '#4CAF50'
      : npc.playerReputation > 25
      ? '#8BC34A'
      : npc.playerReputation < -50
      ? '#f44336'
      : npc.playerReputation < -25
      ? '#ff9800'
      : '#aaa';

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>{npc.name}</h2>
          <span style={styles.role}>{npc.role}</span>
          <button onClick={onClose} style={styles.closeBtn}>×</button>
        </div>

        <div style={styles.tabs}>
          <button
            onClick={() => setTab('talk')}
            style={{
              ...styles.tab,
              borderBottom: tab === 'talk' ? '2px solid #ffd700' : 'none',
              color: tab === 'talk' ? '#ffd700' : '#aaa',
            }}
          >
            Talk
          </button>
          <button
            onClick={() => setTab('examine')}
            style={{
              ...styles.tab,
              borderBottom: tab === 'examine' ? '2px solid #ffd700' : 'none',
              color: tab === 'examine' ? '#ffd700' : '#aaa',
            }}
          >
            Examine
          </button>
        </div>

        <div style={styles.content}>
          {tab === 'talk' && (
            <div>
              <p style={styles.label}>Reputation:</p>
              <div style={styles.reputationBar}>
                <div
                  style={{
                    ...styles.reputationFill,
                    width: `${((npc.playerReputation + 100) / 200) * 100}%`,
                    backgroundColor: reputationColor,
                  }}
                />
              </div>
              <p style={styles.reputationText}>
                {npc.playerReputation > 50
                  ? '💜 She adores you'
                  : npc.playerReputation > 25
                  ? '💚 She likes you'
                  : npc.playerReputation > 0
                  ? '🤍 She is friendly'
                  : npc.playerReputation < -50
                  ? '💔 She dislikes you'
                  : npc.playerReputation < -25
                  ? '⚠️ She is wary'
                  : '😐 She is neutral'}
              </p>

              <p style={styles.label}>Personality:</p>
              <p style={styles.detailText}>{npc.personality}</p>

              {npc.willingness !== undefined && (
                <>
                  <p style={styles.label}>Willingness to Eat:</p>
                  <div style={styles.willingnessBar}>
                    <div
                      style={{
                        ...styles.willingnessFill,
                        width: `${npc.willingness}%`,
                        backgroundColor:
                          npc.willingness > 70
                            ? '#4CAF50'
                            : npc.willingness > 40
                            ? '#ff9800'
                            : '#f44336',
                      }}
                    />
                  </div>
                  <p style={styles.willingnessText}>
                    {npc.willingness > 70
                      ? 'Very willing'
                      : npc.willingness > 40
                      ? 'Moderately willing'
                      : 'Reluctant'}
                  </p>
                </>
              )}

              {npc.cravinessRevealed && (
                <>
                  <p style={styles.label}>Food Preferences (Detected):</p>
                  {npc.foodLoves && npc.foodLoves.length > 0 && (
                    <p style={styles.preference}>
                      💜 <strong>Loves:</strong> {npc.foodLoves.join(', ')}
                    </p>
                  )}
                  {npc.foodLikes && npc.foodLikes.length > 0 && (
                    <p style={styles.preference}>
                      💚 <strong>Likes:</strong> {npc.foodLikes.join(', ')}
                    </p>
                  )}
                  {npc.foodDislikes && npc.foodDislikes.length > 0 && (
                    <p style={styles.preference}>
                      ❌ <strong>Dislikes:</strong> {npc.foodDislikes.join(', ')}
                    </p>
                  )}
                </>
              )}

              <button onClick={handleTalk} style={styles.actionButton}>
                {talkedOnce ? 'Continue Talking' : 'Start Conversation'}
              </button>
            </div>
          )}

          {tab === 'examine' && (
            <div>
              <p style={styles.description}>{npc.examine()}</p>

              <p style={styles.label}>Weight Details:</p>
              <p style={styles.detailText}>
                Base Weight: {npc.baseWeight} lbs
              </p>
              <p style={styles.detailText}>
                Current Weight: {npc.currentWeight} lbs
              </p>
              {npc.weightGainAccumulated > 0 && (
                <p style={styles.gained}>
                  Total Gained: +{npc.weightGainAccumulated} lbs
                </p>
              )}
              <p style={styles.label}>Nutrition:</p>
              <p style={styles.detailText}>
                Today: {npc.caloriesEatenToday || 0} calories
              </p>
              <p style={styles.detailText}>
                Pending Rest Gain: +{npc.pendingWeightGain || 0} lbs
              </p>
              <p style={styles.detailText}>
                Retention: x{(npc.calorieRetentionMultiplier || 1).toFixed(2)}
              </p>
              <p style={styles.detailText}>
                Calorie Value: {npc.getCalorieValue?.() || 0} calories
              </p>

              <button onClick={handleExamine} style={styles.actionButton}>
                Examine Closely
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '400px',
    maxHeight: '80vh',
    overflowY: 'auto',
    border: '2px solid #8B4513',
  },
  header: {
    position: 'relative',
    marginBottom: '15px',
    borderBottom: '2px solid #8B4513',
    paddingBottom: '10px',
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '20px',
    color: '#ffd700',
  },
  role: {
    color: '#aaa',
    fontSize: '13px',
    fontStyle: 'italic',
  },
  closeBtn: {
    position: 'absolute',
    top: '0',
    right: '0',
    backgroundColor: 'transparent',
    color: '#aaa',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0',
    width: '30px',
    height: '30px',
  },
  tabs: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
    borderBottom: '1px solid #333',
  },
  tab: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#aaa',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '8px 0',
    transition: 'color 0.2s',
  },
  content: {
    minHeight: '200px',
  },
  label: {
    margin: '12px 0 6px 0',
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  detailText: {
    margin: '0 0 8px 0',
    fontSize: '13px',
    color: '#ddd',
  },
  description: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: '#ddd',
    marginBottom: '15px',
  },
  reputationBar: {
    width: '100%',
    height: '16px',
    backgroundColor: '#2a2a2a',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: '6px',
  },
  reputationFill: {
    height: '100%',
    transition: 'width 0.3s',
  },
  reputationText: {
    margin: '4px 0 12px 0',
    fontSize: '12px',
    color: '#aaa',
  },
  willingnessBar: {
    width: '100%',
    height: '14px',
    backgroundColor: '#2a2a2a',
    borderRadius: '7px',
    overflow: 'hidden',
    marginBottom: '6px',
  },
  willingnessFill: {
    height: '100%',
    transition: 'width 0.3s',
  },
  willingnessText: {
    margin: '4px 0 12px 0',
    fontSize: '12px',
    color: '#aaa',
  },
  preference: {
    fontSize: '12px',
    color: '#ddd',
    margin: '6px 0',
    paddingLeft: '10px',
  },
  gained: {
    fontSize: '12px',
    color: '#ff9800',
    margin: '6px 0',
    fontWeight: 'bold',
  },
  actionButton: {
    width: '100%',
    padding: '10px',
    marginTop: '15px',
    backgroundColor: '#8B4513',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  },
};

export default NPCInteraction;
