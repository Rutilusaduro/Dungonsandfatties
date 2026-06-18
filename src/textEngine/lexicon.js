/**
 * Lexicon Module
 * Word-level vocabulary organized by weight stage and body type
 */

export const lexicon = {
  // Weight stages: 0=slight, 1=soft, 2=round, 3=full, 4=plump, 5=heavy,
  // 6=corpulent, 7=bloated, 8=immense, 9=colossal, 10=mountainous, 11=leviathan

  word: {
    size: {
      0: ['slight', 'delicate', 'lean', 'svelte'],
      1: ['soft', 'gentle', 'padded', 'cushioned'],
      2: ['round', 'curvy', 'cuddly', 'plush'],
      3: ['full', 'generous', 'voluptuous', 'ample'],
      4: ['plump', 'thick', 'bountiful', 'well-fed'],
      5: ['heavy', 'hefty', 'substantial', 'powerful'],
      6: ['corpulent', 'massive', 'bulbous', 'imposing'],
      7: ['bloated', 'swollen', 'distended', 'enormous'],
      8: ['immense', 'vast', 'prodigious', 'colossal'],
      9: ['colossal', 'gigantic', 'mountainous', 'titanic'],
      10: ['mountainous', 'gargantuan', 'leviathan', 'cosmic'],
      11: ['leviathan', 'apocalyptic', 'universe-spanning', 'infinite'],
      default: ['large'],
    },

    movement: {
      0: ['glides', 'steps', 'walks', 'moves gracefully'],
      1: ['sways', 'shifts', 'steps lightly', 'meanders'],
      2: ['waddles', 'sways', 'rocks gently', 'trundles'],
      3: ['waddles', 'shuffles', 'heaves', 'sways heavily'],
      4: ['waddles heavily', 'shuffles', 'strains', 'struggles'],
      5: ['strains to move', 'shuffles with effort', 'groans', 'lumbers'],
      6: ['lumbers', 'heaves herself', 'struggles forward', 'groans with effort'],
      7: ['struggles immensely', 'heaves laboriously', 'quakes', 'barely moves'],
      8: ['quakes with each step', 'lumbers impossibly', 'shakes', 'trembles'],
      9: ['trembles with movement', 'shakes the ground', 'barely budges', 'quakes'],
      10: ['causes earthquakes', 'shakes the world', 'barely moves', 'shifts impossibly'],
      11: ['warps reality', 'bends space', 'pulls gravity', 'defies physics'],
      default: ['moves'],
    },

    body: {
      // (stage, bodyType) -> descriptors
      pear: {
        0: ['hips', 'curves', 'lower body'],
        1: ['soft hips', 'generous curves', 'padded lower half'],
        2: ['round hips', 'pronounced curves', 'plush backside'],
        3: ['full hips', 'impressive curves', 'ample rear'],
        4: ['thick hips', 'voluptuous curves', 'massive backside'],
        5: ['massive hips', 'powerful curves', 'enormous rear'],
        6: ['colossal hips', 'mountainous rear', 'prodigious curves'],
        7: ['bloated lower body', 'swollen hips', 'distended rear'],
        8: ['immense lower body', 'vast hips', 'enormous rear'],
        9: ['colossal rear', 'gigantic hips', 'titanic curves'],
        10: ['mountainous hips', 'gargantuan rear', 'cosmic curves'],
        11: ['leviathan lower body', 'infinite curves', 'reality-bending rear'],
      },
      apple: {
        0: ['belly', 'core', 'midsection'],
        1: ['soft belly', 'padded midsection', 'gentle core'],
        2: ['round belly', 'pronounced middle', 'soft center'],
        3: ['full belly', 'generous midsection', 'ample core'],
        4: ['thick belly', 'pronounced gut', 'substantial middle'],
        5: ['massive belly', 'powerful core', 'heavy midsection'],
        6: ['colossal belly', 'mountainous gut', 'prodigious core'],
        7: ['bloated belly', 'swollen middle', 'distended gut'],
        8: ['immense belly', 'vast core', 'enormous midsection'],
        9: ['colossal belly', 'gigantic gut', 'titanic midsection'],
        10: ['mountainous belly', 'gargantuan core', 'cosmic midsection'],
        11: ['leviathan belly', 'infinite gut', 'reality-warping core'],
      },
      default: {
        0: ['frame', 'form', 'figure'],
        1: ['soft form', 'padded figure', 'gentle frame'],
        2: ['round form', 'curved figure', 'plush frame'],
        3: ['full form', 'generous figure', 'voluptuous frame'],
        4: ['thick form', 'substantial figure', 'impressive frame'],
        5: ['powerful form', 'heavy figure', 'imposing frame'],
        6: ['massive form', 'mountainous figure', 'colossal frame'],
        7: ['bloated form', 'swollen figure', 'distended frame'],
        8: ['immense form', 'vast figure', 'enormous frame'],
        9: ['colossal form', 'gigantic figure', 'titanic frame'],
        10: ['mountainous form', 'gargantuan figure', 'cosmic frame'],
        11: ['leviathan form', 'infinite figure', 'reality-spanning frame'],
      },
    },

    clothing: {
      0: ['fits perfectly', 'suits her well', 'flatters her'],
      1: ['fits snugly', 'hugs her curves', 'complements her softness'],
      2: ['strains slightly', 'stretches across', 'bulges at'],
      3: ['strains noticeably', 'stretches across', 'bulges with'],
      4: ['stretches across', 'barely contains', 'strains to hold'],
      5: ['barely contains', 'threatens to tear', 'stretches dangerously'],
      6: ['threatens to tear', 'looks painted on', 'barely holds together'],
      7: ['bursts at the seams', 'tears visibly', 'nearly splits'],
      8: ['tears in multiple places', 'shreds', 'fragments'],
      9: ['hangs in tatters', 'falls away', 'disintegrates'],
      10: ['crumbles', 'vanishes', 'can no longer contain'],
      11: ['ceases to exist', 'bends to her will', 'becomes obsolete'],
      default: ['hangs on her'],
    },

    fullness: {
      0: ['satisfied', 'content', 'comfortable'],
      1: ['pleasantly full', 'satisfied', 'content'],
      2: ['quite full', 'genuinely satisfied', 'very comfortable'],
      3: ['very full', 'stuffed', 'uncomfortably satisfied'],
      4: ['stuffed', 'gorged', 'distended'],
      5: ['painfully full', 'excessively gorged', 'distended to limit'],
      6: ['impossibly full', 'stretched beyond measure', 'bulging'],
      7: ['ready to burst', 'straining at seams', 'threatening overflow'],
      8: ['about to burst', 'critically full', 'overflowing'],
      9: ['bursting', 'overstuffed', 'beyond capacity'],
      10: ['apocalyptically full', 'universe-full', 'infinite capacity reached'],
      11: ['leviathan full', 'boundlessly satisfied', 'eternally gorged'],
      default: ['full'],
    },

    eating: {
      0: ['nibbles', 'tastes', 'samples'],
      1: ['eats lightly', 'enjoys', 'savors'],
      2: ['eats steadily', 'indulges', 'partakes heartily'],
      3: ['eats eagerly', 'devours', 'indulges fully'],
      4: ['gorges herself', 'devours ravenously', 'consumes greedily'],
      5: ['gorges herself furiously', 'devours with abandon', 'feeds endlessly'],
      6: ['devours voraciously', 'feeds desperately', 'consumes in bulk'],
      7: ['shoves food in', 'feeds frantically', 'consumes madly'],
      8: ['devours mechanically', 'feeds without pause', 'consumes everything'],
      9: ['feeds ceaselessly', 'consumes with singular focus', 'devours all'],
      10: ['feeds eternally', 'consumes reality', 'devours worlds'],
      11: ['feeds on existence', 'consumes infinitely', 'devours everything'],
      default: ['eats'],
    },
  },

  /**
   * Get word variant for given stage and optional body type
   */
  getWord(category, stage, bodyType = null) {
    const words = this.word[category];
    if (!words) return null;

    // For body words, check body type first
    if (category === 'body' && bodyType && words[bodyType]) {
      const bodyWords = words[bodyType];
      return bodyWords[stage] || bodyWords[0] || bodyWords.default || ['body'];
    }

    // Standard word lookup with fallback chain
    // (stage, default) -> (0, default) -> default fallback
    const stageWords =
      words[stage] ||
      words[0] ||
      words.default ||
      ['[unknown]'];

    return stageWords;
  },

  /**
   * Pick random word from category at given stage
   */
  pickWord(category, stage, bodyType = null) {
    const words = this.getWord(category, stage, bodyType);
    if (!words) return '[unknown]';
    if (!Array.isArray(words)) return words;
    return words[Math.floor(Math.random() * words.length)];
  },
};

export default lexicon;
