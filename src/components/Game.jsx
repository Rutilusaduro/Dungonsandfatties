import { useState, useEffect, useRef } from 'react';
import TextDisplay from './TextDisplay';
import CharacterPanel from './CharacterPanel';
import SpellCaster from './SpellCaster';
import LocationView from './LocationView';
import { zoneToLocation, roomToLocation } from '../game/discovery/locationAdapter.js';
import NPCInteraction from './NPCInteraction';
import CharacterCreation from './CharacterCreation';
import GameState from '../game/GameState';
import Character from '../game/Character';
import TextEngine from '../engine/TextEngine';
import SpellLibrary from '../game/magic/SpellLibrary';
import SpellNarrator from '../game/magic/SpellNarrator';
import SpellResolver from '../game/magic/SpellResolver';
import { getTextEngine } from '../textEngine/index.js';
import { RESTRAINT_MATERIAL } from '../game/conditions/ActiveConditions.js';
import { applyPreRestSharing } from '../game/mechanics/NutritionSystem.js';
import { applyFeastExile } from '../game/mechanics/SwellSystem.js';
import World from '../game/world/World';
import CLASS_REGISTRY from '../game/classes/ClassRegistry.js';
import { optionSlotCost } from '../game/magic/slotUtils.js';
import EquipmentPanel from './EquipmentPanel';
import LevelUpPanel from './LevelUpPanel';
import { ITEMS } from '../game/items/Equipment.js';
import { awardXP, applyLevelBonus, levelUpChoices, xpToNextLevel } from '../game/mechanics/ProgressionSystem.js';
import { EPIC_FILL, FAT_THRESHOLD, FATTEN_PCT } from '../game/mechanics/Balance.js';
import CombatScreen from './CombatScreen';
import { DungeonState } from '../game/dungeon/DungeonState.js';
import { Combat, fillUp, fattenUp, checkFatPhase, isFatDefeated, checkWinState, actionsAvailable, canReach, lineOfSight, move as moveCombatant, distance } from '../game/combat/Combat.js';
import { controllerFor } from '../game/combat/EnemyController.js';
import { narrativeFor } from '../game/combat/SpellNarrative.js';
import { saveGame, loadGame, hasSave, clearSave } from '../game/SaveSystem.js';
import { Discovery, idOf } from '../game/discovery/Discovery.js';
import RightPanel from './RightPanel.jsx';
import EnemyDialoguePanel from './EnemyDialoguePanel.jsx';

// Persist lingering spell conditions onto a target so the text engine narrates
// them afterward (examine, dialogue, body.desc) and future spells can react.
function applySpellConditions(spell, target, selectedOption) {
  if (!target) return;
  const spellKey = spell.name.toLowerCase().replace(/ /g, '_');
  const optionName = selectedOption?.name || '';
  const tags = spell.tags || [];

  // Recent-spell memory (drives combo / on-conditioned narration).
  if (!Array.isArray(target.spellAffects)) target.spellAffects = [];
  target.spellAffects.push(spellKey);
  if (target.spellAffects.length > 6) target.spellAffects.shift();

  if (tags.includes('restraint') || tags.includes('paralysis')) {
    target.restrainedBy = spellKey;
    const suspension = optionName === 'Ceiling Suspension' ? 'ceiling' : null;
    if (suspension) target.suspensionState = suspension;
    const material = RESTRAINT_MATERIAL[spellKey] || 'magic';
    target.conditions?.add('restrained', { source: spellKey, material, suspension });
  }
  if (
    (spellKey === 'erupting_earth' && optionName === 'Bury') ||
    (spellKey === 'shape_earth' && optionName === 'Bury Target')
  ) {
    target.conditions?.add('buried', { depth: target.buriedDepth || 1 });
  }
  if (spellKey === 'rapid_digestion') {
    target.isFullness = true;
    target.conditions?.add('satiated', {});
  }
  if (spellKey === 'polymorph') {
    target.conditions?.add('enlarged', {});
  }
  if (spellKey === 'ravenous_expansion') {
    target.conditions?.add('ravenous', {});
  }
}

// Combat field dimensions (cells are 0-indexed). 5 wide x 3 tall.
const FIELD = { maxX: 4, maxY: 2 };

function applyCapstone(player) {
  // Grant mechanical bonus: +1 L3 slot above cap, +15% feedBonus
  player.maxSpellSlots[3] = (player.maxSpellSlots[3] || 0) + 1;
  player.spellSlots[3]    = (player.spellSlots[3]    || 0) + 1;
  player.feedBonusMultiplier = (player.feedBonusMultiplier || 1) + 0.15;
}

const Game = () => {
  const [gameState] = useState(() => new GameState());
  const [textEngine] = useState(() => new TextEngine());
  const [spellLibrary] = useState(() => new SpellLibrary());
  const [world] = useState(() => World.createSampleWorld());

  const [gameStarted, setGameStarted] = useState(false);
  const [currentZone, setCurrentZone] = useState(null);
  const [textBuffer, setTextBuffer] = useState([]);
  const [selectedNPC, setSelectedNPC] = useState(null);
  const [knownSpells, setKnownSpells] = useState(null);
  const [levelUpState, setLevelUpState] = useState(null); // { level, choices }
  const [dungeon, setDungeon] = useState(null);        // DungeonState instance
  const [dungeonTick, setDungeonTick] = useState(0);   // bump to re-render after in-place room mutation
  const [combatState, setCombatState] = useState(null); // { combat, enemies, round, status, log }
  const [floorWeights, setFloorWeights] = useState(new Map()); // enemyName → currentWeight, cleared on floor change
  const bossPhaseRef = useRef({}); // enemyId → highestPhaseReached (ref so it's accessible inside functional updaters)
  const [savedRunExists] = useState(() => hasSave());
  const [debugInfiniteSlots, setDebugInfiniteSlots] = useState(false);
  const [debugUnlockAllSpells, setDebugUnlockAllSpells] = useState(false);
  const [discovery, setDiscovery] = useState(() => new Discovery()); // fog-of-war: what you've seen
  const [discoveryTick, setDiscoveryTick] = useState(0); // bump to force re-render after reveal
  const [postCombatEnemy, setPostCombatEnemy] = useState(null); // defeated enemy stashed for post-combat talk
  const [selectedEnemy, setSelectedEnemy] = useState(null);     // { name, lines, isPostCombat }

  // All discoverable things present in a zone, with their entity refs.
  const zonePresent = (zone) => [
    ...(zone.getNPCs?.() || []),
    ...(zone.getCreatures?.() || []),
    ...(zone.getEnvironmentalObjects?.() || []),
    ...(zone.getFoods?.() || []),
  ];

  const findEntity = (zone, id) => zonePresent(zone).find(e => idOf(e) === id) || null;

  // "Look around": reveal everything present and narrate what you notice.
  const handleLookAround = () => {
    if (!currentZone) return;
    const present = zonePresent(currentZone);
    const before = discovery.forLocation(currentZone.id).size;
    discovery.revealAll(currentZone.id, present);
    const after = discovery.forLocation(currentZone.id).size;
    addEntry('— You look around —', 'divider');
    if (present.length === 0) {
      addEntry('Nothing here but you and the quiet.');
    } else if (after === before) {
      addEntry('You\'ve already taken in everything here.', 'info');
    } else {
      const names = present.map(e => e.name).join(', ');
      addEntry(`You take in your surroundings. You notice: ${names}.`);
    }
    setDiscoveryTick(t => t + 1);
    setTextBuffer(textEngine.getBuffer());
  };

  // "Examine X": render the entity's detailed description into the log.
  const handleExamine = (row) => {
    const entity = currentZone && findEntity(currentZone, row.id);
    if (!entity) return;
    addEntry(`— You examine ${entity.name} —`, 'divider');
    const detail = entity.examine?.() || entity.description || `${entity.name}. Nothing more to note.`;
    addEntry(detail);
    setTextBuffer(textEngine.getBuffer());
  };

  // "Talk to X" from the location list → existing NPC flow (still fog-gated).
  const handleTalkRow = (row) => {
    const npc = currentZone && findEntity(currentZone, row.id);
    if (npc) handleNPCInteract(npc);
  };

  // Arrive blind: entering a zone reveals nothing until you "Look around".

  // Autosave: persist the run whenever progress-bearing state changes.
  // Combat isn't restored (enemies respawn on resume) so we don't save combatState itself.
  useEffect(() => {
    if (!gameStarted) return;
    const player = gameState.getPlayer();
    if (player) saveGame({ player, dungeon, knownSpells, discovery: discovery.serialize() });
  }, [gameStarted, dungeon, knownSpells, combatState, levelUpState, discoveryTick, dungeonTick]);

  // Resume a saved run.
  const resumeGame = () => {
    const run = loadGame();
    if (!run) return;
    gameState.setPlayer(run.player);
    setKnownSpells(run.knownSpells);
    setDungeon(run.dungeon);
    setDiscovery(Discovery.hydrate(run.discovery));
    textEngine.clearBuffer();
    textEngine.addText(`Welcome back, ${run.player.name}.`);
    textEngine.addText('Your run resumes where you left it.');
    setTextBuffer(textEngine.getBuffer());
    setCurrentZone(world.getCurrentZone());
    setGameStarted(true);
  };

  // Initialize game
  const startGame = (playerName, classKey) => {
    const classDef = CLASS_REGISTRY[classKey];
    if (!classDef) throw new Error(`Unknown class: ${classKey}`);
    clearSave(); // fresh run abandons any prior save
    const character = new Character(playerName, {
      race: 'Human',
      class: classKey,
      baseWeight: classDef.baseWeight,
      spellSlots: { ...classDef.spellSlots },
    });
    // Every class knows the basic fattening cantrips — at-will, no slot cost.
    const CANTRIPS = ['Conjure Morsel', 'Sating Spark', 'Greasy Flick'];
    setKnownSpells(new Set([...classDef.startingSpells, ...CANTRIPS]));

    // Starting gear by class offhand type
    const startingGear = {
      shield: ITEMS.divine_platter,
      tome:   ITEMS.gluttons_tome,
      focus:  ITEMS.hunger_focus,
    };
    const startWeapon = ITEMS.feeding_fork;
    character.equip(startWeapon);
    const offhand = startingGear[classDef.offHand];
    if (offhand) character.equip(offhand);

    gameState.setPlayer(character);
    textEngine.clearBuffer();

    // Add initial message
    textEngine.addText(`Welcome, ${playerName}!`);
    textEngine.addText('You find yourself in The Bloated Boar Tavern...');
    textEngine.addText('Barkeep Boris leans across the bar, voice dropping low. "You\'ve got the look of someone who goes hunting for trouble. There\'s plenty of it under our feet. A stair behind the cellar door drops into the old dungeon — kitchens that still cook, halls still laid for a feast no one living was invited to. They say something waits at the bottom that never once stopped eating. Mind the cold down there. It does strange things to a person\'s appetite."')
    setTextBuffer(textEngine.getBuffer());

    // Set starting zone
    const startingZone = world.getCurrentZone();
    setCurrentZone(startingZone);

    setGameStarted(true);
  };

  const addEntry = (text, type) => textEngine.addText(text, type ? { type } : {});

  const handleCastSpell = (args) => {
    try {
      castSpellImpl(args);
    } catch (err) {
      // A single spell must never white-screen the game — log it and surface it.
      console.error('Spell cast failed:', err);
      addEntry(`The spell sputters and fails — something went wrong (${err.message}).`, 'error');
      setTextBuffer(textEngine.getBuffer());
    }
  };

  const castSpellImpl = ({ spell, target, secondaryTarget, zone, selectedOption }) => {
    if (!spell || !zone) return;

    const caster = gameState.getPlayer();
    if (!caster) return;

    const slotLevel = optionSlotCost(spell, selectedOption);
    if (slotLevel > 0) { // cantrips (slot 0) are at-will and cost nothing
      const available = caster.spellSlots[slotLevel] ?? 0;
      if (available <= 0) {
        addEntry(`— ${spell.name} —`, 'divider');
        addEntry(`The incantation dies half-formed — too much spent and the well runs dry.`, 'error');
        setTextBuffer(textEngine.getBuffer());
        return;
      }
      caster.spellSlots[slotLevel] -= 1;
    }

    const { result } = SpellResolver.cast({ spell, caster, target, secondaryTarget, zone, selectedOption });

    // Append to history (no clearBuffer) — add a divider to separate actions.
    addEntry(`— ${spell.name}${selectedOption ? ` (${selectedOption.name})` : ''} —`, 'divider');

    if (result.success) {
      // Single cohesive scene narrative
      const scene = SpellNarrator.narrateSpellScene(spell, caster, target, selectedOption);
      addEntry(scene);

      if (result.interactions?.length > 0) {
        result.interactions.forEach(interaction => {
          let interactionText = '';
          if (interaction.moduleKey && target?._createContext) {
            const engine = getTextEngine();
            interactionText = engine.render(
              interaction.moduleKey,
              target._createContext({
                ref: caster,
                globals: {
                  spell: spell.name.toLowerCase().replace(/ /g, '_'),
                  recentSpells: target.spellAffects || [],
                },
              }),
            );
          }
          const text = interactionText || interaction.description;
          if (text) addEntry(text, 'synergy');
        });
      }

      if (result.environmentalChanges?.length > 0) {
        result.environmentalChanges.forEach(change => {
          if (change.description) addEntry(change.description, 'info');
        });
      }

      if (result.createdFoods?.length > 0) {
        const foodNames = result.createdFoods.map(food => food.name).join(', ');
        addEntry(`${foodNames} ${result.createdFoods.length === 1 ? 'appears' : 'appear'} here.`, 'info');
      }

      if (result.summonedCreatures?.length > 0) {
        const creatureNames = result.summonedCreatures.map(c => c.name).join(', ');
        addEntry(`${creatureNames} ${result.summonedCreatures.length === 1 ? 'arrives' : 'arrive'}.`, 'info');
      }

      const totalImmediateWeightGain = SpellResolver.totalImmediateWeightGain(result);
      const totalCaloriesLogged = SpellResolver.totalCaloriesLogged(result);

      // Knowledge spells (Detect Cravings) surface revealed preferences as text.
      const knowledgeEffect = result.effects.find(e => e.type === 'knowledge_gained');
      if (knowledgeEffect && target) {
        const parts = [];
        if (knowledgeEffect.loves?.length) parts.push(`Loves: ${knowledgeEffect.loves.join(', ')}`);
        if (knowledgeEffect.likes?.length) parts.push(`Likes: ${knowledgeEffect.likes.join(', ')}`);
        if (knowledgeEffect.dislikes?.length) parts.push(`Dislikes: ${knowledgeEffect.dislikes.join(', ')}`);
        if (parts.length) addEntry(parts.join(' • '), 'info');
      }

      // NPC reactions (weight gain + restraint status)
      if (target && target._createContext) {
        if (totalImmediateWeightGain > 0) {
          if (target.suspensionState === 'ceiling') {
            const engine = getTextEngine();
            const suspendedScene = engine.render('spell.weight_gain.suspended', target._createContext());
            if (suspendedScene) addEntry(suspendedScene);
          } else {
            const weightReaction = SpellNarrator.triggerNPCReactions(target, 'weight_gain', totalImmediateWeightGain);
            if (weightReaction) addEntry(weightReaction);
          }
        }

        // Show pending rest gain only if the spell fed the target (not for restraints etc.)
        if (totalCaloriesLogged > 0 && totalImmediateWeightGain === 0) {
          const pendingGain = target.pendingWeightGain || 0;
          if (pendingGain > 0) addEntry(`${target.name} looks heavier already — it will settle by morning.`, 'info');
        }

        applySpellConditions(spell, target, selectedOption);

        const isRestraintSpell = spell.tags && (
          spell.tags.includes('restraint') || spell.tags.includes('paralysis')
        );
        if (isRestraintSpell) {
          const restraintReaction = SpellNarrator.triggerNPCReactions(target, 'restrained');
          if (restraintReaction) addEntry(restraintReaction);
        }
      }
    } else {
      addEntry(result.message, 'error');
    }

    setTextBuffer(textEngine.getBuffer());
  };

  const handleLongRest = () => {
    if (!currentZone) return;

    const player = gameState.getPlayer();
    const restTargets = [
      player,
      ...currentZone.getNPCs(),
      ...currentZone.getCreatures(),
    ].filter(Boolean);

    addEntry('— Long Rest —', 'divider');
    addEntry('The day\'s meals and magic settle into lasting changes.');

    // Restore spell slots
    if (player) player.spellSlots = { ...player.maxSpellSlots };

    const sharingNotes = applyPreRestSharing(restTargets, currentZone);
    sharingNotes.forEach(note => addEntry(note, 'info'));

    const exileNotes = applyFeastExile(restTargets);
    exileNotes.forEach(note => addEntry(note, 'info'));

    const summaries = restTargets
      .filter(entity => !entity.isExiled)
      .map(entity => ({ entity, result: entity.processLongRestNutrition?.() }))
      .filter(({ result }) => result && (result.rawCalories > 0 || result.weightGain > 0));

    if (summaries.length === 0) {
      addEntry('No one has eaten enough today for the rest to change their weight.', 'info');
    }

    summaries.forEach(({ entity, result }) => {
      if (result.weightGain > 0 && entity._createContext) {
        const reaction = SpellNarrator.triggerNPCReactions(entity, 'weight_gain', result.weightGain);
        if (reaction) addEntry(reaction);
        else addEntry(`${entity.name} gains +${result.weightGain} lbs.`);
      } else if (result.rawCalories > 0) {
        addEntry(`${entity.name} ate today but doesn't gain weight yet.`, 'info');
      }
    });

    setTextBuffer(textEngine.getBuffer());
  };

  const handleZoneAction = ({ type, direction }) => {
    if (type === 'move') {
      const nextZone = world.moveToZone(direction);
      if (nextZone) {
        setCurrentZone(nextZone);
        addEntry(`— You move ${direction} —`, 'divider');
        addEntry(nextZone.description);
        setTextBuffer(textEngine.getBuffer());
      }
    }
  };

  const handleNPCInteract = (npc) => {
    // Fog-of-war: can't talk to someone you haven't seen.
    if (currentZone && !discovery.has(currentZone.id, npc.id)) {
      addEntry('You haven\'t noticed anyone like that here. Try looking around first.', 'info');
      setTextBuffer(textEngine.getBuffer());
      return;
    }
    setSelectedNPC(npc);
  };

  const handleNPCAction = ({ type, npc, dialogue, description }) => {
    textEngine.clearBuffer();

    if (type === 'talk') {
      textEngine.addText(`${npc}:`);
      textEngine.addText(dialogue);
    } else if (type === 'examine') {
      textEngine.addText(description);
    }

    setTextBuffer(textEngine.getBuffer());
  };

  const handleCloseNPC = () => {
    setSelectedNPC(null);
  };

  const handleEquip = (item, invIndex) => {
    const player = gameState.getPlayer();
    if (!player) return;
    const result = player.equip(item);
    if (!result.ok) return;
    player.inventory.splice(invIndex, 1);
    if (result.replaced) player.inventory.push(result.replaced);
    setTextBuffer(textEngine.getBuffer()); // force re-render
  };

  const handleUnequip = (slot) => {
    const player = gameState.getPlayer();
    if (!player) return;
    const item = player.unequip(slot);
    if (item) player.inventory.push(item);
    setTextBuffer(textEngine.getBuffer());
  };

  const gainXP = (amount) => {
    const player = gameState.getPlayer();
    if (!player) return;
    const { leveledUp, newLevel } = awardXP(player, amount);
    if (leveledUp) {
      const choices = levelUpChoices(player, knownSpells);
      setLevelUpState({ level: newLevel, choices });
    }
    setTextBuffer(textEngine.getBuffer());
  };

  const handleLevelUpChoice = (spellName) => {
    const player = gameState.getPlayer();
    applyLevelBonus(player);
    if (spellName?.startsWith('[CAPSTONE]')) {
      applyCapstone(player);
      addEntry('— Level 20 Capstone —', 'divider');
      addEntry(spellName.replace('[CAPSTONE] ', ''));
      setLevelUpState(null);
      setTextBuffer(textEngine.getBuffer());
      return;
    }
    if (spellName) {
      setKnownSpells(prev => new Set([...(prev || []), spellName]));
      addEntry(`— Level ${player.level} —`, 'divider');
      addEntry(`You learned ${spellName}!`);
    }
    setLevelUpState(null);
    setTextBuffer(textEngine.getBuffer());
  };

  // ── Dungeon / Combat ─────────────────────────────────────────

  // Enter the dungeon → drop into the first room (traversal, not instant combat).
  const handleEnterDungeon = () => {
    const player = gameState.getPlayer();
    if (!player) return;
    const ds = new DungeonState();
    setDungeon(ds);
    setDungeonTick(t => t + 1);
    addEntry(`— ${ds.currentFloor?.name} —`, 'divider');
    addEntry(ds.currentFloor?.description || 'You descend into the dark.');
    setTextBuffer(textEngine.getBuffer());
  };

  // Build a combat from the current room's enemies.
  const startRoomCombat = (ds) => {
    const player = gameState.getPlayer();
    const enemies = ds.roomEnemies();
    if (!enemies.length) return;
    enemies.forEach(e => {
      e._dead = false;
      // Restore weight gained earlier on this floor.
      const stored = floorWeights.get(e.name);
      if (stored != null) e.currentWeight = stored;
    });
    // Player anchors left-center; enemies spread along the right edge.
    const combat = new Combat([
      { entity: player, initiative: 10, x: 0, y: 1 },
      ...enemies.map((e, i) => ({ entity: e, initiative: 5, x: FIELD.maxX, y: Math.min(i, FIELD.maxY) })),
    ]);
    const floor = ds.currentFloor;
    const openingLine = enemies.length === 1 ? enemies[0]?.dialogue?.precombat?.[0] : null;
    setCombatState({
      combat, enemies, round: 1, status: 'active', modifier: floor?.modifier || null,
      selectedEnemyId: enemies[0].id, field: FIELD,
      log: [
        enemies.length > 1 ? `${enemies.length} foes block your way!` : `${enemies[0]?.name} blocks your way!`,
        ...(openingLine ? [`"${openingLine}"`] : []),
      ],
    });
  };

  // ── Dungeon traversal ────────────────────────────────────────

  const handleDungeonLook = () => {
    if (!dungeon) return;
    const room = dungeon.look();
    setDungeonTick(t => t + 1);
    addEntry('— You look around —', 'divider');
    const k = room?.contents?.kind;
    if (room?.cleared) addEntry('This room is quiet now. Nothing left here.');
    else if (k === 'combat') addEntry(`${room.contents.enemyDefs[0]?.name} ${room.contents.isGate ? 'looms between you and the way down' : 'lurks here'}.`);
    else if (k === 'loot') addEntry('A cache of supplies sits within reach.');
    else if (k === 'stairs') addEntry('A stairwell spirals down into deeper dark.');
    else addEntry('An empty room. Only exits and dust.');
    setTextBuffer(textEngine.getBuffer());
  };

  const handleDungeonMove = (dir) => {
    if (!dungeon) return;
    const room = dungeon.move(dir);
    if (!room) return;
    setPostCombatEnemy(null);
    setDungeonTick(t => t + 1);
    addEntry(`— You go ${dir} —`, 'divider');
    addEntry(dungeon.currentFloor?.name + '. The passage opens into another room.');
    setTextBuffer(textEngine.getBuffer());
  };

  const handleDungeonExamine = (row) => {
    if (!dungeon) return;
    const room = dungeon.currentRoom;
    if (row.id.endsWith('_foe')) {
      const foe = room.contents.enemyDefs[0];
      addEntry(`— You size up ${foe.name} —`, 'divider');
      addEntry(foe.description || `${foe.name}.`);
    } else if (row.id.endsWith('_loot')) {
      addEntry('— You inspect the cache —', 'divider');
      addEntry('Glints of gear amid the supplies — gather it to find out what.');
    }
    setTextBuffer(textEngine.getBuffer());
  };

  // Build the dungeon location descriptor, enabling talk for enemies that have dialogue.
  const buildDungeonLocation = (ds) => {
    const loc = roomToLocation(ds);
    if (!loc) return null;
    const prompts = [...loc.prompts, { id: 'leave', label: 'Retreat to the surface', tone: 'neutral' }];
    let discovered = [...loc.discovered];

    // Pre-combat: mark foe as talkable if it has precombat dialogue.
    const room = ds.currentRoom;
    if (room?.contents?.kind === 'combat' && !room.cleared) {
      const foe = room.contents.enemyDefs?.[0];
      if (foe?.dialogue?.precombat) {
        discovered = discovered.map(r => r.id.endsWith('_foe') ? { ...r, canTalk: true } : r);
      }
    }

    // Post-combat: inject a row for the defeated enemy if she has something to say.
    if (postCombatEnemy && !postCombatEnemy._postcombatTalked) {
      const line = postCombatEnemy.dialogue?.postcombat?.[postCombatEnemy._defeatCondition];
      if (line) {
        discovered = [...discovered, {
          id: 'postcombat_enemy',
          kind: 'creature',
          name: postCombatEnemy.name,
          canExamine: false,
          canTalk: true,
        }];
      }
    }

    const totalRooms = Object.keys(ds.rooms).length;
    const clearedRooms = Object.values(ds.rooms).filter(r => r.cleared).length;
    return { ...loc, prompts, discovered, floorProgress: { cleared: clearedRooms, total: totalRooms } };
  };

  const handleDungeonTalkRow = (row) => {
    if (!dungeon) return;
    if (row.id === 'postcombat_enemy' && postCombatEnemy) {
      const line = postCombatEnemy.dialogue?.postcombat?.[postCombatEnemy._defeatCondition];
      if (line) setSelectedEnemy({ name: postCombatEnemy.name, lines: [line], isPostCombat: true });
    } else if (row.id.endsWith('_foe')) {
      const foe = dungeon.currentRoom?.contents?.enemyDefs?.[0];
      if (foe?.dialogue?.precombat) {
        setSelectedEnemy({ name: foe.name, lines: foe.dialogue.precombat, isPostCombat: false });
      }
    }
  };

  const handleEnemyDialogueClose = () => {
    if (selectedEnemy?.isPostCombat && postCombatEnemy) {
      postCombatEnemy._postcombatTalked = true;
      setPostCombatEnemy(null);
    }
    setSelectedEnemy(null);
  };

  const handleRoomPrompt = (id) => {
    if (!dungeon) return;
    if (id === 'engage') {
      startRoomCombat(dungeon);
    } else if (id === 'take') {
      const items = dungeon.clearRoom();
      const player = gameState.getPlayer();
      items.forEach(it => player.inventory.push(it));
      addEntry('— You gather the loot —', 'divider');
      addEntry(items.length ? `You pocket: ${items.map(i => i.name).join(', ')}.` : 'The cache was bare.');
      setDungeonTick(t => t + 1);
      setTextBuffer(textEngine.getBuffer());
    } else if (id === 'descend') {
      setPostCombatEnemy(null);
      const { dungeonComplete } = dungeon.descend();
      if (dungeonComplete) {
        addEntry('— Dungeon Cleared! —', 'divider');
        addEntry('You have conquered the dungeon. A legend is born.');
        setDungeon(null);
        clearSave();
        setFloorWeights(new Map());
      } else {
        addEntry(`— ${dungeon.currentFloor?.name} —`, 'divider');
        addEntry(dungeon.currentFloor?.description || 'You descend deeper.');
        setFloorWeights(new Map()); // new floor — weight persistence resets
        bossPhaseRef.current = {};
        setDungeonTick(t => t + 1);
      }
      setTextBuffer(textEngine.getBuffer());
    } else if (id === 'leave') {
      addEntry('— You retreat to the surface —', 'divider');
      addEntry('The dungeon will be waiting when you return.');
      setDungeon(null);
      setTextBuffer(textEngine.getBuffer());
    }
  };

  const handleSelectEnemy = (enemyId) => {
    setCombatState(prev => prev ? { ...prev, selectedEnemyId: enemyId } : prev);
  };

  // Run one combat turn: the player's chosen action, then every living enemy
  // acts (you-then-all-enemies), then drain + win checks. `mutate(ctx)` returns
  // { ok, msg }: if ok is false the turn is aborted (no enemy turn, no round
  // spent) so a misjudged reach just costs a message, not the round.
  // Split into two state updates for visual bar animation: player action first,
  // then enemy turn (so bar fills visibly, then drains visibly).
  const runPlayerTurn = (mutate) => {
    setCombatState(prev => {
      if (!prev || prev.status !== 'active') return prev;
      try {
        return runPlayerActionPhase(prev, mutate);
      } catch (err) {
        console.error('Combat action failed:', err);
        return { ...prev, log: [...prev.log, `That action misfired (${err.message}).`].slice(-10) };
      }
    });
    // Schedule enemy phase for next update (after this one renders).
    setTimeout(() => {
      setCombatState(prev => {
        if (!prev || prev.status !== 'active') return prev;
        return runEnemyPhase(prev);
      });
    }, 0);
  };

  const runPlayerActionPhase = (prev, mutate) => {
    const player = gameState.getPlayer();
    if (!player) return prev;
    const { combat } = prev;
    const mod = prev.modifier || {};
    const log = [...prev.log];
    const playerPos = combat.playerCombatant();
    const selEnemyC = combat.combatants.find(c => c.entity.id === prev.selectedEnemyId && c.entity.isEnemy);

    const res = mutate({ player, combat, mod, log, playerPos, selEnemy: selEnemyC?.entity, selEnemyPos: selEnemyC });
    if (res?.msg) log.push(res.msg);
    if (res && res.ok === false) {
      return { ...prev, log: log.slice(-10) };
    }

    // Legendary resistance: boss shakes off near-defeat once.
    if (selEnemyC && (selEnemyC.entity.legendaryResists ?? 0) > 0) {
      const ws = checkWinState(selEnemyC.entity);
      if (ws) {
        selEnemyC.entity.legendaryResists -= 1;
        selEnemyC.entity.fullness = (selEnemyC.entity.stomachCapacity || 0) * 0.40;
        log.push(`${selEnemyC.entity.name} resists — legendary endurance flares. Not yet.`);
        let sel = prev.selectedEnemyId;
        if (!combat.livingEnemies().some(c => c.entity.id === sel)) sel = combat.livingEnemies()[0]?.entity.id ?? null;
        return { ...prev, round: prev.round + 1, selectedEnemyId: sel, log: log.slice(-10) };
      }
    }

    // Mark any enemies defeated by the player's action.
    const living = combat.livingEnemies().map(c => c.entity);
    for (const e of prev.enemies) {
      if (!e._dead && !living.includes(e)) {
        e._dead = true;
        e._defeatCondition = e.conditions?.has('buried') ? 'buried'
          : e.conditions?.has('satiated') ? 'asleep'
          : checkWinState(e)?.state ?? 'immobilized';
        log.push(`${e.name} is defeated!`);
      }
    }

    // Boss phase check.
    for (const e of prev.enemies) {
      if (e._dead) continue;
      const phase = checkFatPhase(e);
      if (phase > 0) {
        const prevPhase = bossPhaseRef.current[e.id] ?? 0;
        if (phase > prevPhase) {
          bossPhaseRef.current[e.id] = phase;
          const phaseEntry = e.phases?.[phase - 1];
          if (phaseEntry?.text) log.push(phaseEntry.text);
          if (phaseEntry?.aiShift) e._trait = phaseEntry.aiShift;
        }
      }
    }

    if (combat.encounterWon()) {
      const unmetGate = combat.livingEnemies().find(ec => {
        const req = ec.entity.requiresFatPhase ?? 0;
        if (!req) return false;
        return (bossPhaseRef.current[ec.entity.id] ?? 0) < req;
      });
      if (unmetGate) {
        log.push(`${unmetGate.entity.name} shrugs off the finisher — she must be fattened further first.`);
        unmetGate.entity._dead = false;
        unmetGate.entity._defeatState = undefined;
      } else {
        return { ...prev, status: 'won', log: log.slice(-10) };
      }
    }

    return { ...prev, log: log.slice(-10) };
  };

  const runEnemyPhase = (prev) => {
    const player = gameState.getPlayer();
    if (!player) return prev;
    const { combat } = prev;
    const mod = prev.modifier || {};
    const log = [...prev.log];
    const playerPos = combat.playerCombatant();

    // Enemy turns: each living foe acts on the player.
    for (const ec of combat.livingEnemies()) {
      const self = ec.entity;
      const playerBefore = player.fullness || 0;
      const selfBefore = self.fullness || 0;
      const ctrl = controllerFor(self._trait);
      ctrl({ self, opponent: player, selfPos: ec, oppPos: playerPos, actions: actionsAvailable(self), combat, field: prev.field || FIELD });
      const mod2 = prev.modifier || {};
      if (mod2.willDrift) self.willingness = Math.min(100, (self.willingness ?? 50) + mod2.willDrift);
      const playerFed = Math.round((player.fullness || 0) - playerBefore);
      const selfFull = self.fullness || 0;
      if (selfFull < selfBefore) log.push(`${self.name} sheds the filling — the weight slides off her.`);
      else if (selfFull > selfBefore) log.push(`${self.name} gorges hungrily.`);
      if (playerFed > 0) {
        log.push(`${self.name} forces a mouthful on you.`);
        const playerCap = player.stomachCapacity || 0;
        if (playerCap) {
          const pBefore = playerBefore / playerCap, pAfter = (player.fullness || 0) / playerCap;
          if (FATTEN_BANDS.some(bnd => pBefore < bnd && pAfter >= bnd)) {
            log.push(pAfter >= 1.0 ? 'You strain at the seams, gorged past reason.'
              : pAfter >= 0.85 ? 'Your belly presses tight — breathing comes harder.'
              : pAfter >= 0.70 ? 'A heaviness settles through your middle.'
              : 'Your stomach starts to push back.');
          }
        }
      }
      else if (selfFull === selfBefore && playerFed === 0) log.push(`${self.name} repositions.`);
    }

    // Per-round fullness drain.
    const drainScale = mod.drainScale ?? 1;
    for (const c of combat.combatants) {
      const resist = (c.entity === player) ? (1 - (player.drainResistFactor || 0) / 100) : 1;
      const rate = (c.entity === player)
        ? 0.1 * drainScale * resist
        : 0.1 * (1 - player.feedClingFactor) * drainScale;
      const cap = c.entity.stomachCapacity || 0;
      if (cap) c.entity.fullness = Math.max(0, (c.entity.fullness || 0) - cap * rate);
    }

    if (checkWinState(player)) {
      log.push('You collapse, too stuffed to fight on!');
      return { ...prev, round: prev.round + 1, status: 'lost', log: log.slice(-10) };
    }

    let sel = prev.selectedEnemyId;
    if (!combat.livingEnemies().some(c => c.entity.id === sel)) sel = combat.livingEnemies()[0]?.entity.id ?? null;
    return { ...prev, round: prev.round + 1, selectedEnemyId: sel, log: log.slice(-10) };
  };

  // Spell reach: ranged with a per-spell range (cells) + line of sight. Generous
  // by default — a spell should reach across the field; force-feed is the melee option.
  const spellRange = (spell) => spell.combatRange ?? ((spell.level ?? 1) <= 2 ? 4 : 6);

  // When a fill pushes a foe across a fullness band, narrate her swelling.
  const FATTEN_BANDS = [0.5, 0.7, 0.85, 1.0];
  const narrateFatten = (enemy, beforeFull, log) => {
    const cap = enemy.stomachCapacity || 0;
    if (!cap) return;
    const before = beforeFull / cap, after = (enemy.fullness || 0) / cap;
    if (FATTEN_BANDS.some(bnd => before < bnd && after >= bnd)) {
      const line = getTextEngine().render('combat.fattening', enemy._createContext());
      if (line) log.push(line);
    }
  };

  const handleCombatCastSpell = (spell) => {
    runPlayerTurn(({ player, mod, log, selEnemy, selEnemyPos, playerPos }) => {
      if (!selEnemy || !selEnemyPos) return { ok: false, msg: 'No target — pick a foe first.' };
      const range = spellRange(spell);
      if (distance(playerPos, selEnemyPos) > range || !lineOfSight(playerPos, selEnemyPos)) {
        return { ok: false, msg: `${selEnemy.name} is out of range for ${spell.name}. Move closer or pick a nearer foe.` };
      }
      const lvl = spell.level ?? 1;
      const isCantrip = lvl <= 0;
      const cost = isCantrip ? 0 : lvl <= 1 ? 1 : lvl <= 3 ? 2 : 3;
      if (!isCantrip && !debugInfiniteSlots) {
        if ((player.spellSlots[cost] ?? 0) <= 0) return { ok: false, msg: `${spell.name} falls apart — you've spent the well dry.` };
        player.spellSlots[cost] -= 1;
      }
      const l3Pct = player.level >= 19 ? EPIC_FILL.tier2 : player.level >= 16 ? EPIC_FILL.tier1 : EPIC_FILL.base;
      const pct = isCantrip ? 0.10 : cost === 1 ? 0.20 : cost === 2 ? 0.35 : l3Pct;
      const before = selEnemy.fullness || 0;
      const narrative = narrativeFor(spell, player, selEnemy);
      if (spell.isFatten || spell.options?.[0]?.isFatten) {
        const lbs = Math.round((FATTEN_PCT[cost] ?? FATTEN_PCT[1]) * (selEnemy.baseWeight ?? 100));
        fattenUp(selEnemy, lbs);
        log.push(narrative);
        if (isFatDefeated(selEnemy)) {
          selEnemy._dead = true;
          selEnemy._defeatCondition = 'fattened';
          log.push(`${selEnemy.name} has grown too heavy to continue — she's defeated!`);
        }
      } else {
        const fillAmt = pct * (selEnemy.stomachCapacity || 100) * (player.feedBonusMultiplier || 1) * (mod.feedScale ?? 1);
        const isCritSpell = Math.random() * 100 < (player.critFeedChance || 0);
        fillUp(selEnemy, isCritSpell ? fillAmt * 2 : fillAmt);
        log.push(narrative);
        if (isCritSpell) log.push(`The spell catches beyond your intent — it surges.`);
        if (cost === 3 && player.level >= 16) log.push(`Something vast answers the casting.`);
        narrateFatten(selEnemy, before, log);
      }
      // Feeding wears down resistance — willingness rises a little no matter which path.
      selEnemy.willingness = Math.min(100, (selEnemy.willingness ?? 50) + 2);
      return { ok: true };
    });
  };

  const handleForceFeed = () => {
    runPlayerTurn(({ player, mod, log, selEnemy, selEnemyPos, playerPos }) => {
      if (!selEnemy || !selEnemyPos) return { ok: false, msg: 'No target — pick a foe first.' };
      if (!canReach(playerPos, selEnemyPos, 1)) {
        return { ok: false, msg: `${selEnemy.name} is too far to force-feed. Move adjacent first.` };
      }
      const before = selEnemy.fullness || 0;
      const critRoll = Math.random() * 100;
      const fillAmt = 0.15 * (selEnemy.stomachCapacity || 100) * (player.feedBonusMultiplier || 1) * (mod.feedScale ?? 1);
      const isCrit = critRoll < (player.critFeedChance || 0);
      fillUp(selEnemy, isCrit ? fillAmt * 2 : fillAmt);
      log.push(`You force-feed ${selEnemy.name}.`);
      if (isCrit) log.push(`${selEnemy.name} reels — you pushed that past her limit.`);
      narrateFatten(selEnemy, before, log);
      // Sustained force-feeding wears down resistance faster than spells.
      selEnemy.willingness = Math.min(100, (selEnemy.willingness ?? 50) + 4);
      return { ok: true };
    });
  };

  const handleCombatMove = (dir) => {
    runPlayerTurn(({ combat, playerPos }) => {
      const before = `${playerPos.x},${playerPos.y}`;
      moveCombatant(playerPos, dir, { maxX: FIELD.maxX, maxY: FIELD.maxY });
      if (`${playerPos.x},${playerPos.y}` === before) return { ok: false, msg: 'You can\'t move that way — the field edge stops you.' };
      return { ok: true, msg: `You reposition ${dir}.` };
    });
  };

  const handleFlee = () => {
    setCombatState(null);
    setDungeon(null);
    addEntry('— Fled —', 'divider');
    addEntry('You escape into the shadows, heart pounding.');
    setTextBuffer(textEngine.getBuffer());
  };

  const handleCombatContinue = () => {
    if (!combatState || !dungeon) return;
    const { enemies, status } = combatState;

    if (status === 'won') {
      const enemy = enemies[0];
      if (enemy.bossEvent) addEntry(enemy.bossEvent);

      // Persist per-floor weight gains for enemies that weren't fattened to death.
      setFloorWeights(prev => {
        const next = new Map(prev);
        for (const e of enemies) {
          if (e._defeatCondition !== 'fattened' && e.currentWeight != null) {
            next.set(e.name, e.currentWeight);
          }
        }
        return next;
      });

      // Stash a defeated enemy with post-combat dialogue before clearing combat.
      const talkable = enemies.find(e => e.dialogue?.postcombat?.[e._defeatCondition]);
      if (talkable) setPostCombatEnemy(talkable);

      // Clear the room (banks loot), drop combat → back to traversal. Award XP last
      // so a level-up modal doesn't race the room transition.
      const items = dungeon.clearRoom();
      const player = gameState.getPlayer();
      items.forEach(item => player.inventory.push(item));
      addEntry(`— ${enemy.name} defeated —`, 'divider');
      if (items.length) addEntry(`Loot: ${items.map(i => i.name).join(', ')}.`, 'loot');
      addEntry(dungeon.canDescend || dungeon.currentRoom?.contents?.isGate
        ? 'The way deeper is clear.'
        : 'The room falls quiet. You may move on.');
      setCombatState(null);
      setDungeonTick(t => t + 1);
      gainXP(enemy.xpValue || 100);
    } else {
      // lost — flee the dungeon, keep the character
      setCombatState(null);
      setDungeon(null);
      addEntry('— Defeated —', 'divider');
      addEntry('You retreat to the surface, licking your wounds.');
    }
    setTextBuffer(textEngine.getBuffer());
  };

  if (!gameStarted) {
    return <CharacterCreation onStart={startGame} onResume={savedRunExists ? resumeGame : null} />;
  }

  const player = gameState.getPlayer();
  const availableTargets = currentZone
    ? [...currentZone.getCreatures(), ...currentZone.getNPCs()]
    : [];

  return (
    <div style={styles.container}>
      <style>{`
        .game-rest-btn:active { transform: scale(0.97); }
        .game-rest-btn:focus-visible { outline: 2px solid #c9a227; outline-offset: 2px; }
      `}</style>
      <div style={styles.mainContent}>
        <div style={styles.primaryPanel}>
          <TextDisplay textBuffer={textBuffer} />
          <div style={styles.actionBar}>
            {!dungeon && (
              <button onClick={handleLongRest} style={styles.restButton} className="game-rest-btn">
                Long Rest
              </button>
            )}
          </div>
          {dungeon && !combatState ? (
            <div style={styles.zoneSection}>
              <LocationView
                location={buildDungeonLocation(dungeon)}
                onLookAround={handleDungeonLook}
                onExamine={handleDungeonExamine}
                onTalk={handleDungeonTalkRow}
                onMove={handleDungeonMove}
                onPrompt={handleRoomPrompt}
              />
            </div>
          ) : currentZone && !combatState && (
            <div style={styles.zoneSection}>
              <LocationView
                location={(() => {
                  const loc = zoneToLocation(currentZone, discovery);
                  if (loc && currentZone.id === 'dungeon') {
                    return { ...loc, prompts: [...loc.prompts, { id: 'enter_dungeon', label: 'Descend into the depths', tone: 'danger' }] };
                  }
                  return loc;
                })()}
                onLookAround={handleLookAround}
                onExamine={handleExamine}
                onTalk={handleTalkRow}
                onMove={(dir) => handleZoneAction({ type: 'move', direction: dir })}
                onPrompt={(id) => { if (id === 'enter_dungeon') handleEnterDungeon(); }}
              />
            </div>
          )}
        </div>

        <RightPanel
          dungeon={dungeon}
          player={player}
          knownSpells={knownSpells}
          spellLibrary={spellLibrary}
          onCastSpell={handleCastSpell}
          currentZone={currentZone}
          playerStats={{ spellSlots: player.spellSlots, maxSpellSlots: player.maxSpellSlots }}
          discovery={discovery}
          debugUnlockAll={debugUnlockAllSpells}
          onToggleDebugSpells={() => setDebugUnlockAllSpells(v => !v)}
        />
      </div>

      {selectedNPC && (
        <NPCInteraction
          npc={selectedNPC}
          onClose={handleCloseNPC}
          onAction={handleNPCAction}
        />
      )}

      {selectedEnemy && (
        <EnemyDialoguePanel
          enemyName={selectedEnemy.name}
          lines={selectedEnemy.lines}
          mode={selectedEnemy.isPostCombat ? 'narration' : 'speech'}
          onClose={handleEnemyDialogueClose}
        />
      )}

      {levelUpState && (
        <LevelUpPanel
          level={levelUpState.level}
          choices={levelUpState.choices}
          onChoose={handleLevelUpChoice}
        />
      )}

      {combatState && (
        <CombatScreen
          player={player}
          combat={combatState.combat}
          enemies={combatState.enemies}
          field={combatState.field || FIELD}
          selectedEnemyId={combatState.selectedEnemyId}
          round={combatState.round}
          status={combatState.status}
          combatLog={combatState.log}
          knownSpells={knownSpells}
          spellLibrary={spellLibrary}
          playerStats={{ spellSlots: player.spellSlots, maxSpellSlots: player.maxSpellSlots }}
          onSelectEnemy={handleSelectEnemy}
          onCastSpell={handleCombatCastSpell}
          onForceFeed={handleForceFeed}
          onMove={handleCombatMove}
          onFlee={handleFlee}
          onContinue={handleCombatContinue}
          debugMode={debugInfiniteSlots}
          onToggleDebug={() => setDebugInfiniteSlots(v => !v)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#111214',
    color: '#e8e6e1',
    fontFamily: 'Georgia, serif',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  primaryPanel: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #2c2c30',
    overflowY: 'auto',
  },
  zoneSection: {
    maxHeight: '50%',
    borderTop: '1px solid #2c2c30',
    overflowY: 'auto',
  },
  sidebar: {
    width: '320px',
    overflowY: 'auto',
    backgroundColor: '#0e0f11',
    borderLeft: '1px solid #2c2c30',
    display: 'flex',
    flexDirection: 'column',
  },
  panelSection: {
    borderBottom: '1px solid #2c2c30',
  },
  actionBar: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
    padding: '10px 14px',
    borderTop: '1px solid #2c2c30',
    borderBottom: '1px solid #2c2c30',
    backgroundColor: '#0e0f11',
  },
  restButton: {
    padding: '8px 14px',
    backgroundColor: '#4a6a2a',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    transition: 'opacity 120ms, transform 80ms',
  },
  dungeonButton: {
    padding: '8px 14px',
    backgroundColor: '#6a2a2a',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default Game;
