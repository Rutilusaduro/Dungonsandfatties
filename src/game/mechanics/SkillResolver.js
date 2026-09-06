// SkillResolver — applies skill effects in combat and exploration contexts.
// Returns { ok, message, effects } for the UI log.

import { getSkill, startingSkillsForClass, unlockSkillsAtLevel } from './SkillRegistry.js';
import { Food } from '../items/Food.js';

export function canUseSkill(character, skillId) {
  const skill = getSkill(skillId);
  if (!skill) return { ok: false, reason: 'Unknown skill.' };
  if (!character.knownSkills?.includes(skillId)) return { ok: false, reason: 'Skill not learned.' };
  const cd = character.skillCooldowns?.[skillId] || 0;
  if (cd > 0) return { ok: false, reason: 'Not ready yet.' };
  return { ok: true, skill };
}

export function tickSkillCooldowns(character) {
  if (!character.skillCooldowns) return;
  for (const id of Object.keys(character.skillCooldowns)) {
    if (character.skillCooldowns[id] > 0) character.skillCooldowns[id] -= 1;
  }
}

export function putSkillOnCooldown(character, skillId) {
  const skill = getSkill(skillId);
  if (!skill || !character.skillCooldowns) return;
  character.skillCooldowns[skillId] = skill.cooldown;
}

export function initializeSkills(character, className) {
  character.knownSkills = startingSkillsForClass(className).map(s => s.id);
  character.skillCooldowns = {};
  for (const id of character.knownSkills) character.skillCooldowns[id] = 0;
  for (let lvl = 3; lvl <= (character.level || 1); lvl++) {
    for (const s of unlockSkillsAtLevel(className, lvl)) {
      if (!character.knownSkills.includes(s.id)) {
        character.knownSkills.push(s.id);
        character.skillCooldowns[s.id] = 0;
      }
    }
  }
}

export function grantLevelSkills(character, className, newLevel) {
  if (!character.knownSkills) initializeSkills(character, className);
  for (const s of unlockSkillsAtLevel(className, newLevel)) {
    if (!character.knownSkills.includes(s.id)) {
      character.knownSkills.push(s.id);
      character.skillCooldowns[s.id] = 0;
    }
  }
}

/**
 * Use a skill. Context: { target?, zone?, player }
 */
export function useSkill(skillId, ctx) {
  const { player, target, zone } = ctx;
  const check = canUseSkill(player, skillId);
  if (!check.ok) return { ok: false, message: check.reason };

  const skill = check.skill;
  const effects = [];
  let message = '';

  switch (skill.effect) {
    case 'willingness_spike':
      if (!target || target.willingness === undefined) {
        return { ok: false, message: 'No one here to sway.' };
      }
      target.willingness = Math.min(100, target.willingness + skill.magnitude);
      target.cravinessRevealed = true;
      message = `${target.name} softens — appetite rising, guard lowering.`;
      effects.push({ type: 'willingness', amount: skill.magnitude });
      break;

    case 'feed_boost':
      player._nextFeedBoost = (player._nextFeedBoost || 0) + skill.magnitude;
      message = 'Your next feeding will land with extra weight and linger.';
      effects.push({ type: 'feed_boost', amount: skill.magnitude });
      break;

    case 'crit_feed_next':
      player._nextCritFeed = true;
      message = 'You read the rhythm of their fullness — the next spell will strike deep.';
      effects.push({ type: 'crit_feed_next' });
      break;

    case 'siphon_fill':
      if (!target || target.fullness === undefined) {
        return { ok: false, message: 'Nothing to siphon from.' };
      }
      const drained = Math.floor((target.fullness || 0) * skill.magnitude);
      target.fullness = Math.max(0, (target.fullness || 0) - drained);
      player._nextFeedBoost = (player._nextFeedBoost || 0) + 0.1;
      message = `Essence trickles from ${target.name} into you — hunger redirected.`;
      effects.push({ type: 'siphon', amount: drained });
      break;

    case 'weight_burst':
      if (!target || !target.gainWeight) {
        return { ok: false, message: 'No living target for growth.' };
      }
      target.gainWeight(skill.magnitude);
      message = `${target.name} swells suddenly — life rushing into flesh.`;
      effects.push({ type: 'weight_gain', amount: skill.magnitude });
      break;

    case 'conjure_snack':
      if (!zone?.addFood) {
        return { ok: false, message: 'Nowhere to place food here.' };
      }
      const snack = new Food('Foraged Offering', {
        servings: 2,
        caloriesPerServing: skill.magnitude,
        tasteType: 'sweet',
        texture: 'ripe',
        description: 'Food called forth by skill — warm, fragrant, impossible to ignore.',
        appetizingness: 75,
      });
      zone.addFood(snack, skill.name);
      message = 'Rich food appears as if it had always been waiting.';
      effects.push({ type: 'conjure_food', calories: skill.magnitude });
      break;

    case 'reveal_cravings':
      const npcs = zone?.getNPCs?.() || [];
      const revealed = [];
      for (const npc of npcs) {
        npc.cravinessRevealed = true;
        revealed.push(npc.name);
      }
      if (target?.cravinessRevealed !== undefined) target.cravinessRevealed = true;
      message = revealed.length
        ? `Appetites surface: ${revealed.join(', ')}.`
        : (target ? `${target.name}'s cravings become clear.` : 'The air tastes of unspoken hunger.');
      effects.push({ type: 'reveal_cravings', names: revealed });
      break;

    case 'reputation_boost':
      const folk = zone?.getNPCs?.() || (target ? [target] : []);
      for (const npc of folk) npc.modifyReputation?.(skill.magnitude);
      message = folk.length
        ? 'Shared bread warms the room — goodwill spreads.'
        : `${target?.name || 'They'} remember your generosity.`;
      effects.push({ type: 'reputation', amount: skill.magnitude });
      break;

    case 'zone_food_aura':
    case 'zone_willingness_aura':
      if (!zone) return { ok: false, message: 'No area to bless.' };
      zone._skillAura = { effect: skill.effect, magnitude: skill.magnitude, rounds: 3 };
      message = skill.effect === 'zone_food_aura'
        ? 'The air grows thick with the promise of a perfect meal.'
        : 'A subtle pull stirs in every belly nearby.';
      effects.push({ type: 'zone_aura', effect: skill.effect });
      break;

    default:
      return { ok: false, message: 'That skill fizzles — effect not wired.' };
  }

  putSkillOnCooldown(player, skillId);
  return { ok: true, message, effects, skill };
}
