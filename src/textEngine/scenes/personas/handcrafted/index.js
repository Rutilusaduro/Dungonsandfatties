/**
 * Handcrafted persona bundle — core twenty plus district expansions.
 * Later files append variants to the same persona keys (never replace pools).
 */
import coreTwenty from './core-twenty.js';
import coreTwentyExpansions from './core-twenty-expansions.js';
import coreTwentyArcTwo from './arc-two/core-twenty-arc-two.js';
import temple from './temple.js';
import noble from './noble.js';
import harbor from './harbor.js';
import town from './town.js';
import market from './market.js';
import { ANNEX_TAVERN_PERSONAS } from './annex-tavern.js';
import { GARDEN_PERSONAS } from './garden.js';
import { KITCHEN_PERSONAS } from './kitchen.js';
import { UNDERGROUND_PERSONAS } from './underground.js';
import annexTavernArcTwo from './arc-two/annex-tavern-arc-two.js';
import gardenArcTwo from './arc-two/garden-arc-two.js';
import kitchenArcTwo from './arc-two/kitchen-arc-two.js';
import undergroundArcTwo from './arc-two/underground-arc-two.js';
import townArcTwo from './arc-two/town-arc-two.js';
import marketArcTwo from './arc-two/market-arc-two.js';
import templeArcTwo from './arc-two/temple-arc-two.js';
import nobleArcTwo from './arc-two/noble-arc-two.js';
import harborArcTwo from './arc-two/harbor-arc-two.js';

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
  coreTwentyArcTwo,
  temple,
  noble,
  harbor,
  town,
  market,
  ANNEX_TAVERN_PERSONAS,
  GARDEN_PERSONAS,
  KITCHEN_PERSONAS,
  UNDERGROUND_PERSONAS,
  annexTavernArcTwo,
  gardenArcTwo,
  kitchenArcTwo,
  undergroundArcTwo,
  townArcTwo,
  marketArcTwo,
  templeArcTwo,
  nobleArcTwo,
  harborArcTwo,
);
