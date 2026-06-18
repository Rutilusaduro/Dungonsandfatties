# Dungeons & Fatties - Features Guide

## 🎮 Game Features

### Magic System (Fully Integrated UI)
Cast spells directly in-game with the spell interface:

**Spell Categories:**
- **Transmutation**: Change forms and properties
- **Conjuration**: Create objects and substances
- **Evocation**: Offensive and environmental effects

**Available Spells:**
1. **Prestidigitation** (Cantrip) - Minor magical effects
2. **Enlarge Person** (Level 1) - Grow targets, increase weight and strength
3. **Reduce Person** (Level 1) - Shrink targets
4. **Shape Earth** (Level 1) - Reshape earth into basins, seats, structures
5. **Shape Wood** (Level 1) - Reshape wood into furniture, restraints
6. **Create Water** (Level 1) - Conjure water, milk, honey, liquids
7. **Grease** (Level 1) - Create slippery substance, fill basins
8. **Oozing Abundance** (Level 2) - Fire arrows of nutritious ooze (damage + feeding)
9. **Feast of Shadows** (Level 2) - Create illusory food that sustains
10. **Morph Mass** (Level 2) - Absorb matter, increase weight
11. **Delightful Transmutation** (Level 2) - Convert water to magical ice cream

### Spell Interactions
Spells work together for powerful effects:
- Shape Earth + Create Water = Fill basins with water
- Shape Earth + Shape Wood = Create complex structures
- Enlarge Person + Reduce Person = Size transformation chains
- Create Water + Delightful Transmutation = Infinite magical ice cream
- Grease + Create Water = Slippery puddles

### Food System
Every food has detailed properties:

**Food Properties:**
- **Taste Type**: sweet, savory, spicy, sour, bitter, umami, neutral
- **Appetizingness**: 0-100 scale (how appealing it looks/smells)
- **Caloric Content**: Varies from 100-1000+ calories per serving
- **Texture**: smooth, creamy, crunchy, chewy, flaky, etc.
- **Shape & Color**: Customizable appearance

**Magical Food Properties:**
- **Self-Replicating**: Food creates more servings over time
- **Healing**: Restores health when consumed
- **Magical Enhancement**: Spells can boost calories dramatically

**Food Examples:**
- Pastry: 250 cal, golden, flaky, sweet
- Bread: 150 cal, brown, crusty, savory
- Meat: 300 cal, red, tender, savory
- Cream: 200 cal, white, creamy, sweet
- Pudding: 180 cal, smooth, brown, sweet
- Ice Cream: 220 cal, pale, creamy, sweet (magical)

**Food Modification:**
All foods can be modified by spells:
- Enhance calories (percentage or fixed amount)
- Change taste profile
- Change appearance (shape, color, texture)
- Increase appetizingness
- Enable self-replication
- Enable healing effects

### Zone Exploration System
4 fully-realized zones to explore:

**1. The Bloated Boar Tavern** (Starting Zone)
- NPCs: Barkeep Boris (Innkeeper), Silvia (Merchant)
- Objects: Wooden table, chair, water barrel
- Difficulty: Low
- Theme: Social hub, abundant food

**2. The Abundant Garden**
- NPCs: Gardener Gregg
- Creatures: Fatling (Pig), Waddles (Duck)
- Objects: Rich earth, fountain, stone bench
- Difficulty: Low
- Theme: Nature, fertility, peaceful
- Spell Affinities: Shape Earth, Create Water, Enlarge Person

**3. The Grand Kitchen**
- NPCs: Chef Gertrude
- Objects: Cast iron stove, prep table, water basin
- Difficulty: Low
- Theme: Cooking, dangerous equipment
- Spell Affinities: Create Water, Enlarge Person, Feast of Shadows

**4. The Depths Below** (Dungeon)
- Creatures: Chained Cow (magically enlarged)
- Objects: Stone pillar, damp earth
- Difficulty: High
- Theme: Dark, mysterious, magical
- Spell Affinities: Shape Earth, Morph Mass, Dark magic

**Zone Navigation:**
- Click direction buttons (north, south, east, west, down, up)
- Each zone displays inhabitants and available exits
- Real-time descriptions and atmospheric text

### Entity Systems

**NPCs:**
- Named NPCs with personality (friendly, stern, greedy, peaceful)
- Dialogue trees and greetings
- Reputation tracking (-100 to +100 with player)
- Can be fed to build relationships
- Weight gain tracking

**Creatures:**
- Animal types with specific traits
- Hunger/feeding mechanics
- Weight gain from feeding
- Health and combat stats
- Behavioral states

**Environmental Objects:**
- Stone, wood, water, earth, furniture
- Can be affected by spells
- Durability and state tracking
- Reshaped by magic (Shape Earth, Shape Wood)

### Character System
- D&D 5e compatible stats (STR, DEX, CON, INT, WIS, CHA)
- Health tracking with visual bar
- Weight tracking with gain accumulation
- Character level and experience
- Equipment slots (expandable)

### UI/UX Features
**Character Panel:**
- Name, race, class, level
- Health bar with percentage
- Base weight vs current weight
- Stat breakdown
- Detailed weight tracking

**Spell Caster:**
- Browse all available spells
- View spell details (level, school, range, duration, description)
- See weight-gain theming for each spell
- View synergies and interactions
- Select targets from zone inhabitants
- Real-time cast feedback

**Zone Display:**
- Full zone description
- Weather, light level, time
- List all NPCs with roles and weight
- List all creatures with hunger levels
- List all environmental objects
- Navigation buttons to adjacent zones

**Text Engine:**
- Rich narrative feedback
- Color-coded messages
- Spell effect descriptions
- Environmental change descriptions
- Interaction notifications

## 🎯 Gameplay Loop

1. **Explore**: Navigate between zones, discover NPCs and creatures
2. **Prepare**: Study available spells and their interactions
3. **Cast**: Select spells and targets to manipulate the world
4. **Observe**: Watch effects unfold with detailed descriptions
5. **Interact**: Feed NPCs to build relationships and track weight gain
6. **Adapt**: Use spell combinations for greater effects

## 📊 Game Mechanics

### Weight Gain System
- All creatures and NPCs track current weight vs base weight
- Feeding increases weight (varies by food and creature)
- Spells like Enlarge Person increase weight
- Food calories convert to weight (3500 cal = ~1 lb)
- Weight gain is cumulative and visual

### Calorie System
- All food has calorie content per serving
- Servings can be increased (replication)
- Spells can enhance calories dramatically
- Calories → weight conversion on consumption

### Reputation System
- Feeding NPCs builds positive reputation
- Dialogue options vary based on reputation
- High reputation unlocks special interactions
- Ranges from -100 (hostile) to +100 (devoted)

## 🔮 Spell Casting Mechanics

**Targeting:**
- Self: Target yourself with self-buff spells
- Area: Affect the current zone and its objects
- Entities: Target specific NPCs or creatures

**Effects:**
- Direct damage/healing
- Weight gain/loss
- Environmental changes
- Food creation
- Property modifications

**Interactions:**
- Spells remember previous casts
- Combinations trigger bonus effects
- Environmental context matters (spells work better in certain zones)

## 🌟 Weight Gain Features

**Theming Throughout:**
- Every spell has weight-gain narrative
- Enlarge makes targets "heavier, stronger, more imposing"
- Food system centered on indulgence
- NPCs and creatures visually tracked for weight
- Feeding is central gameplay mechanic

**Environmental Impact:**
- Spell combinations create feeding stations
- Ice cream generation for unlimited supply
- Water transmutation into calorie-rich foods
- Basins for pooling resources

## 🚀 How to Play

1. **Start Game**: Enter character name on start screen
2. **Read Zone**: Check current location, NPCs, creatures, objects
3. **Choose Spell**: Browse available spells from sidebar
4. **Read Details**: Understand spell effects and interactions
5. **Select Target**: Click a creature, NPC, or "Self/Area"
6. **Cast**: Click "Cast Spell" button
7. **Observe**: Read effects in text display
8. **Navigate**: Move between zones via direction buttons
9. **Repeat**: Explore, cast, observe, interact

## 📝 Example Scenarios

### Creating a Feeding Station
1. Cast Shape Earth in garden
2. Cast Create Water to fill the basin
3. Cast Delightful Transmutation to convert water to ice cream
4. NPCs and creatures now have food available
5. Feed them repeatedly to increase weight

### Enlargement Chain
1. Cast Enlarge Person on creature
2. Cast it again for cascading size increase
3. Each casting adds weight and health
4. Creature grows massive and powerful

### Flavor Customization
1. Create food via Feast of Shadows
2. Modify taste with spells
3. Enhance calories dramatically
4. Make it self-replicating
5. Feed to NPCs who prefer that flavor

## 🎨 Visual Feedback
- Color-coded messages (success, errors, flavor)
- Real-time weight displays
- Entity state tracking visible
- Zone atmosphere descriptions
- Spell effect animations in text
