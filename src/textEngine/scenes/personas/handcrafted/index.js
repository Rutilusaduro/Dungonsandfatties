/**
 * Handcrafted persona bundle — core twenty plus district expansions.
 * Later files append variants to the same persona keys (never replace pools).
 */
import coreTwenty from './core-twenty.js';
import coreTwentyExpansions from './core-twenty-expansions.js';
import temple from './temple.js';
import noble from './noble.js';
import harbor from './harbor.js';
import town from './town.js';
import market from './market.js';
import { ANNEX_TAVERN_PERSONAS } from './annex-tavern.js';
import { GARDEN_PERSONAS } from './garden.js';
import { KITCHEN_PERSONAS } from './kitchen.js';
import { UNDERGROUND_PERSONAS } from './underground.js';

/** Concatenate variant arrays when multiple modules target the same persona key. */
export function mergePersonaBundles(...parts) {
  const out = {};
  for (const part of parts) {
    for (const [persona, modules] of Object.entries(part)) {
      if (!out[persona]) out[persona] = {};
      for (const [modKey, variants] of Object.entries(modules)) {
        if (!out[persona][modKey]) out[persona][modKey] = [];
        out[persona][modKey].push(...variants);
      }
    }
  }
  return out;
}

export default mergePersonaBundles(
  coreTwenty,
  coreTwentyExpansions,
  temple,
  noble,
  harbor,
  town,
  market,
  ANNEX_TAVERN_PERSONAS,
  GARDEN_PERSONAS,
  KITCHEN_PERSONAS,
  UNDERGROUND_PERSONAS,
);
