/**
 * Handcrafted persona bundle — core twenty plus district expansions.
 */
import { mergePersonas } from '../authorPersona.js';
import coreTwenty from './core-twenty.js';
import temple from './temple.js';
import noble from './noble.js';
import harbor from './harbor.js';

export default mergePersonas(coreTwenty, temple, noble, harbor);
