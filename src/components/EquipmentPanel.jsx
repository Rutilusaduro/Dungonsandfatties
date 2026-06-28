import { useState } from 'react';
import { SLOTS, canEquip } from '../game/items/Equipment.js';

const RARITY_COLOR = {
  common:    '#aaa',
  uncommon:  '#4fc66a',
  rare:      '#4a7fc1',
  legendary: '#c9a227',
};

const SLOT_LABEL = {
  weapon:    'Weapon',
  offhand:   'Off-hand',
  armor:     'Armor',
  accessory: 'Accessory',
};

const EquipmentPanel = ({ character, onEquip, onUnequip }) => {
  const [open, setOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  if (!character) return null;

  const inventory = character.inventory || [];
  const equipped  = character.equippedItems || {};

  return (
    <div style={s.root}>
      <button style={s.header} onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span style={s.headerTitle}>Equipment</span>
        <span style={s.caret}>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div style={s.body}>
          {/* Slots */}
          <div style={s.slotsGrid}>
            {SLOTS.map(slot => {
              const item = equipped[slot];
              return (
                <div key={slot} style={s.slotRow}>
                  <span style={s.slotLabel}>{SLOT_LABEL[slot]}</span>
                  {item ? (
                    <button
                      style={{ ...s.itemBtn, color: RARITY_COLOR[item.rarity] }}
                      onMouseEnter={() => setTooltip(item)}
                      onMouseLeave={() => setTooltip(null)}
                      onFocus={() => setTooltip(item)}
                      onBlur={() => setTooltip(null)}
                      onClick={() => onUnequip?.(slot)}
                      title={`${item.name} — click to unequip`}
                    >
                      {item.name} ×
                    </button>
                  ) : (
                    <span style={s.emptySlot}>— empty —</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div style={s.tooltip} role="tooltip" aria-live="polite">
              <div style={{ ...s.tooltipName, color: RARITY_COLOR[tooltip.rarity] }}>
                {tooltip.name}
              </div>
              <div style={s.tooltipDesc}>{tooltip.description}</div>
              {tooltip.passiveText && (
                <div style={s.tooltipPassive}>{tooltip.passiveText}</div>
              )}
            </div>
          )}

          {/* Inventory */}
          {inventory.length > 0 && (
            <>
              <div style={s.invLabel}>Inventory</div>
              <div style={s.invList}>
                {inventory.map((item, i) => {
                  const eligible = canEquip(item, character);
                  return (
                    <button
                      key={item.name}
                      style={{
                        ...s.invBtn,
                        color: eligible ? RARITY_COLOR[item.rarity] : '#555',
                        cursor: eligible ? 'pointer' : 'not-allowed',
                        opacity: eligible ? 1 : 0.5,
                      }}
                      disabled={!eligible}
                      onClick={() => eligible && onEquip?.(item, i)}
                      onMouseEnter={() => setTooltip(item)}
                      onMouseLeave={() => setTooltip(null)}
                      onFocus={() => setTooltip(item)}
                      onBlur={() => setTooltip(null)}
                      title={eligible ? `Equip ${item.name}` : `${character.class_} cannot equip this`}
                    >
                      [{SLOT_LABEL[item.slot][0]}] {item.name}
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {inventory.length === 0 && (
            <div style={s.emptyInv}>No items in inventory.</div>
          )}
        </div>
      )}
    </div>
  );
};

const s = {
  root: {
    fontFamily: 'Georgia, serif',
    color: '#e0e0e0',
    borderBottom: '1px solid #333',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 14px',
    background: 'none',
    border: 'none',
    color: '#e0e0e0',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.05em',
  },
  headerTitle: { textTransform: 'uppercase' },
  caret: { fontSize: '0.7rem', color: '#666' },
  body: { padding: '8px 14px 14px' },
  slotsGrid: { display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '10px' },
  slotRow: { display: 'flex', alignItems: 'center', gap: '8px', minHeight: '28px' },
  slotLabel: {
    width: '64px',
    fontSize: '0.75rem',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    flexShrink: 0,
  },
  itemBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Georgia, serif',
    fontSize: '0.85rem',
    padding: '2px 6px',
    borderRadius: '3px',
    transition: 'background 100ms',
  },
  emptySlot: { fontSize: '0.8rem', color: '#555', fontStyle: 'italic' },
  tooltip: {
    background: '#1c1c1c',
    border: '1px solid #333',
    borderRadius: '6px',
    padding: '10px 12px',
    marginBottom: '10px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
  },
  tooltipName: { fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' },
  tooltipDesc: { fontSize: '0.82rem', color: '#bbb', lineHeight: 1.5, marginBottom: '4px' },
  tooltipPassive: { fontSize: '0.78rem', color: '#999', fontStyle: 'italic' },
  invLabel: {
    fontSize: '0.75rem', color: '#888', textTransform: 'uppercase',
    letterSpacing: '0.06em', marginBottom: '6px', borderTop: '1px solid #222', paddingTop: '10px',
  },
  invList: { display: 'flex', flexDirection: 'column', gap: '2px' },
  invBtn: {
    background: 'none', border: 'none', fontFamily: 'Georgia, serif',
    fontSize: '0.85rem', padding: '3px 6px', textAlign: 'left', borderRadius: '3px',
    transition: 'background 100ms',
  },
  emptyInv: { fontSize: '0.82rem', color: '#555', fontStyle: 'italic', paddingTop: '6px' },
};

export default EquipmentPanel;
