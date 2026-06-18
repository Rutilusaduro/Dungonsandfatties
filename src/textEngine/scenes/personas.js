/**
 * NPC Personas
 * Personality overlays for named NPCs using weighted variant registration
 */

export function registerNPCPersonas(engine) {
  // Barkeep Bella - Innkeeper
  // Friendly, enjoys food, loves her patrons
  const bellaGreeting = [
    {
      when: { reputation: { min: 50 } },
      text: 'Well hello there, dear! Come on in! I was just thinking about you. What can I get you today?',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Oh, hello there! Welcome to the Bloated Boar! What can I serve you?',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 }, willingness: { min: 50 } },
      text: 'Come in, come in! Don\'t be shy. We have plenty of food today.',
      weight: 1,
    },
    {
      when: {},
      text: 'Welcome to my tavern.',
      weight: 1,
    },
  ];

  const bellaExamine = [
    {
      when: { stage: { min: 10 } },
      text: 'Bella is absolutely massive, a true monument to her love of good food and good company. Her enormous frame radiates warmth as she moves about the tavern with surprising grace for someone so immense. She beams when she sees you, her whole body jiggling with excitement.',
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'Bella has become truly enormous, her massive body filling the tavern with presence and life. She grins broadly at you, clearly delighted by the work of preparing hearty meals.',
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'Bella is wonderfully large, with a soft, generous figure that speaks of years enjoying the finest foods. She smiles warmly, looking genuinely happy to see you.',
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'Bella is noticeably plump, with curves that suggest she samples her own cooking regularly. She greets you with genuine warmth.',
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'Bella is a pleasingly curvy woman with a friendly demeanor. She smiles at you with genuine hospitality.',
    },
    {
      when: { stage: { max: 1 } },
      text: 'Barkeep Bella is a slender woman with sparkling eyes and an infectious smile. She greets you warmly.',
    },
  ];

  engine.registerModuleVariants('npc.greeting', bellaGreeting, { weight: 4 });
  engine.registerModuleVariants('npc.examine', bellaExamine, { weight: 4 });

  // Silvia the Merchant - Shrewd trader
  // Smart, business-minded, willing to negotiate
  const silviaGreeting = [
    {
      when: { reputation: { min: 50 } },
      text: 'Ah, my most valuable customer! I was hoping you\'d visit. I have something special I think you\'ll appreciate.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Welcome! I have some excellent goods available today. Interested in a transaction?',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 } },
      text: 'Business, or just browsing?',
      weight: 1,
    },
  ];

  const silviaExamine = [
    {
      when: { stage: { min: 10 } },
      text: 'Silvia is absolutely massive, her immense frame somehow elegant despite its enormous size. Her sharp eyes take in everything as she moves, still calculating and assessing even at such proportions.',
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'Silvia has become quite large, her prodigious curves accentuating her shrewd business sense. She eyes you with a merchant\'s calculating gaze.',
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'Silvia is substantially heavier now, her generous curves testament to accepting payment in fine foods and delicacies. She regards you with a keen, assessing look.',
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'Silvia is noticeably curvier than before, her figure more rounded from her tasteful lifestyle. Her eyes remain sharp and calculating.',
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'Silvia is a cleverly-dressed woman with elegant curves. She appraises you with sharp, calculating eyes.',
    },
    {
      when: { stage: { max: 1 } },
      text: 'Silvia is a sharp-featured woman with keen eyes. Everything about her speaks of shrewd business sense.',
    },
  ];

  engine.registerModuleVariants('npc.greeting', silviaGreeting, { weight: 4 });
  engine.registerModuleVariants('npc.examine', silviaExamine, { weight: 4 });

  // Gardener Gregg - Wait, the file says "Gardener Gregg" but NPCs are all female
  // Let me check the NPC.js file... yes, it says "All NPCs are female"
  // This is "Gardener Gregg" but should be a female name. Let me use the actual name from NPC.js
  // Actually, looking at the NPC.js code, the class is called "Gardener" and constructor default name is 'Gardener Gregg'
  // But the comment says "All NPCs are female". Let me check the instance...
  // The Innkeeper is "Barkeep Bella", Merchant is "Silvia", etc. So "Gardener Gregg" might need to be reconsidered.
  // For now, I'll use the names as they are in the code and just keep them as-is.

  // Gardener Gregg - Peaceful gardener
  // Serene, grows things, appreciates growth and abundance
  const gardenGreeting = [
    {
      when: { reputation: { min: 50 } },
      text: 'Welcome, friend. The gardens have been especially abundant this season. Would you like to enjoy them with me?',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Welcome to my garden. Please, enjoy the sights and sounds.',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 } },
      text: 'Hello. The gardens are peaceful today.',
      weight: 1,
    },
  ];

  const gardenExamine = [
    {
      when: { stage: { min: 10 } },
      text: 'The Gardener has become absolutely immense, their massive form almost like one of the great trees they tend. Their serene expression suggests complete contentment with their growth.',
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'The Gardener is now enormously large, their prodigious size matching the generous abundance they cultivate. They move with serene peace.',
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'The Gardener has become quite large, their rounded figure testament to enjoying the bounty of their own garden. They seem perfectly at peace.',
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'The Gardener is noticeably plumper, their soft curves suggesting they\'ve been sampling their harvest regularly. Their expression is serene and content.',
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'The Gardener has gentle curves, their figure suggesting they enjoy the fruits of their labor. They seem peaceful and content.',
    },
    {
      when: { stage: { max: 1 } },
      text: 'The Gardener is a gentle-looking person, tending the plants with serene care.',
    },
  ];

  engine.registerModuleVariants('npc.greeting', gardenGreeting, { weight: 4 });
  engine.registerModuleVariants('npc.examine', gardenExamine, { weight: 4 });

  // Captain Cassandra - Guard Captain
  // Stern, disciplined, but professional
  const cassandraGreeting = [
    {
      when: { reputation: { min: 50 } },
      text: 'At ease, friend. Good to see you. The town is secure with capable allies like you around.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'You. State your business.',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 } },
      text: 'Watch yourself. I\'m observing.',
      weight: 1,
    },
  ];

  const cassandraExamine = [
    {
      when: { stage: { min: 10 } },
      text: 'Captain Cassandra has become absolutely immense, her enormous form still radiating martial authority despite her immense proportions. She carries her weight with military precision.',
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'Captain Cassandra is now very large, her prodigious frame still bearing the marks of her discipline and strength. She watches you with sharp, assessing eyes.',
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'Captain Cassandra has gained considerable weight, her form more generous than before but still bearing signs of physical strength. She regards you with stern watchfulness.',
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'Captain Cassandra is noticeably heavier, her curves more pronounced, but her bearing remains disciplined and authoritative.',
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'Captain Cassandra is a fit woman with strong shoulders and a stern expression. She watches you carefully.',
    },
    {
      when: { stage: { max: 1 } },
      text: 'Captain Cassandra is a lean, muscular woman who watches you with vigilant intensity.',
    },
  ];

  engine.registerModuleVariants('npc.greeting', cassandraGreeting, { weight: 4 });
  engine.registerModuleVariants('npc.examine', cassandraExamine, { weight: 4 });

  // Chef Gertrude - Chef
  // Commanding, passionate about food, proud of her cooking
  const gertrudeGreeting = [
    {
      when: { reputation: { min: 50 } },
      text: 'Ah, my favorite customer! Welcome! I\'ve prepared something absolutely magnificent. You MUST try it.',
      weight: 3,
    },
    {
      when: { reputation: { min: 25, max: 49 } },
      text: 'Well, come in! The kitchen is prepared. Are you ready for the finest meal of your life?',
      weight: 2,
    },
    {
      when: { reputation: { max: 24 } },
      text: 'You\'re in my kitchen now. Try not to get in the way.',
      weight: 1,
    },
  ];

  const gertrudeExamine = [
    {
      when: { stage: { min: 10 } },
      text: 'Chef Gertrude has become absolutely enormous, her immense frame a living testament to her love of fine cuisine. Her commanding presence fills the kitchen, and she moves with the authority of someone who has enjoyed the best her own cooking has to offer.',
    },
    {
      when: { stage: { min: 8, max: 9 } },
      text: 'Chef Gertrude is now very large, her prodigious curves a proud badge of culinary excellence. She surveys her kitchen with commanding intensity.',
    },
    {
      when: { stage: { min: 6, max: 7 } },
      text: 'Chef Gertrude has become quite heavy, her generous form visibly enjoying the benefits of her own masterful cooking. She commands the kitchen with authority.',
    },
    {
      when: { stage: { min: 4, max: 5 } },
      text: 'Chef Gertrude is noticeably plumper, her curves filling out from sampling her own creations. She exudes culinary pride.',
    },
    {
      when: { stage: { min: 2, max: 3 } },
      text: 'Chef Gertrude is a confident woman with pleasant curves, clearly comfortable with her appearance. She commands her kitchen with passion.',
    },
    {
      when: { stage: { max: 1 } },
      text: 'Chef Gertrude is a strong-looking woman with piercing eyes and commanding presence. She rules her kitchen absolutely.',
    },
  ];

  engine.registerModuleVariants('npc.greeting', gertrudeGreeting, { weight: 4 });
  engine.registerModuleVariants('npc.examine', gertrudeExamine, { weight: 4 });
}

export default registerNPCPersonas;
