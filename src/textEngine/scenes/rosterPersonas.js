/**
 * Roster-driven persona profiles — enriched overlays for all NPCs in NPC_ROSTER.
 * Handcrafted personas in personas.js register first; enriched voice generation
 * supplies unique dialogue, body descriptions, and weight-stage examine for the rest.
 */

import { NPC_ROSTER } from '../../game/world/data/npcRoster.js';
import { registerProfilePersonas } from './personaFactory.js';
import { buildEnrichedProfile } from './rosterVoice.js';

// Personas fully authored in personas.js — skip to avoid dilution.
const HANDCRAFTED = new Set([
  'bella', 'silvia', 'gregg', 'cassandra', 'gertrude',
  'mira', 'tansy', 'lenna',
  'gwen_market', 'margaret_priestess', 'mirabel_countess', 'morgan_captain',
  'bess_butcher', 'nell_fish', 'coral_dancer', 'agnes_confessor',
  'brigit_smoke', 'rosa_baker', 'portia_gate', 'patrice_hostel',
  // Town square
  'lottie_crier', 'june_ribbon', 'sophie_clerk', 'delia_fountain',
  'roxy_fence', 'kitt_alley', 'jade_guard', 'fable_bard', 'ode_poet',
  // Market row
  'rhea_cleaver', 'lydia_pastry', 'iris_apothecary', 'wren_herb',
  'nia_basket', 'saffron_grinder',
  // Temple district
  'hope_pilgrim', 'serene_pilgrim', 'wick_candle', 'hymn_choir', 'myrrh_incense',
  // Noble district
  'dottie_maid', 'pixie_scullery', 'camille_wine', 'wendy_lady', 'tipsy_cellar',
  'vale_herald', 'keys_pianist',
  // Harbor district
  'sal_dock', 'tina_rope', 'pearl_oyster', 'tess_warehouse', 'faye_tally', 'stella_nav',
  // Tavern annex
  'marta_cellar', 'hilda_cask', 'elsie_loft', 'nora_attic',
  // Garden expansion
  'petra_orchard', 'tilde_cider', 'violet_greenhouse', 'sage_fern',
  'yara_bee', 'luna_wax', 'ivy_herbal',
  // Kitchen annex
  'ruth_pantry', 'greta_larder', 'clara_dairy', 'helena_cheese', 'amelie_sous', 'gina_slicer',
  // Underground
  'uma_depth', 'eve_tomb', 'pix_rat', 'thalia_fungi', 'marlowe_tunnel', 'venus_ritual',
  'ren_scout', 'spore_apprentice', 'reef_boat', 'lyra_guardian',
]);

export function registerRosterPersonas(engine) {
  const profiles = {};
  for (const [key, def] of Object.entries(NPC_ROSTER)) {
    if (HANDCRAFTED.has(def.persona)) continue;
    profiles[key] = buildEnrichedProfile(key, def);
  }
  registerProfilePersonas(engine, profiles);
}

export default registerRosterPersonas;
