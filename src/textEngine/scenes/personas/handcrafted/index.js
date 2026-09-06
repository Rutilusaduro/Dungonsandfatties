/**
 * Handcrafted persona bundle — core twenty plus district expansions.
 */
import { mergePersonas } from '../authorPersona.js';
import coreTwenty from './core-twenty.js';
import temple from './temple.js';
import noble from './noble.js';
import harbor from './harbor.js';
import town from './town.js';
import market from './market.js';
import { ANNEX_TAVERN_PERSONAS } from './annex-tavern.js';
import { GARDEN_PERSONAS } from './garden.js';
import { KITCHEN_PERSONAS } from './kitchen.js';
import { UNDERGROUND_PERSONAS } from './underground.js';

export default mergePersonas(
  coreTwenty,
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
