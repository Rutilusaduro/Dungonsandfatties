# Spell Feedback System — Combat Flow Examples

This document provides concrete combat scenarios showing how the spell feedback system makes each family mechanically and narratively distinct. Use these as reference for implementation, playtesting, and design review.

---

## Example 1: Pure Feeding Strategy

### Setup
- **Player**: Wizard, Level 5, knows `Conjure Morsel` (L0) and `Erupting Earth` (L3)
- **Enemy**: Goblin Skirmisher, 150 lbs base, 2 actions/round at full mobility
- **Goal**: Show feeding spell cascade and its effect on enemy action economy

### Combat Flow

#### Round 1: Player's Turn
**Player casts: Conjure Morsel (feeding, L0)**

**Spell Effect** (existing mechanics):
- Fullness increase: +120 calories → `goblin.fullness = 120` (assume 300 cap = 40% full)
- Mobility: `full` (0-40% capacity)
- Actions available next round: 2

**Combat Log Entry (NEW)**:
```
[Round 1, Player] You cast Conjure Morsel at the goblin.

You conjure a rich morsel. It tumbles golden through the air—buttery, 
irresistible. The goblin's eyes widen. She catches it and swallows hard. 
The food settles heavy in her belly. She feels...full.
```

**Mechanical Outcome** (logged):
- Fullness: +120 cal (40% cap)
- Mobility: remains "full"
- Actions next round: still 2 (no shift yet)

#### Round 1: Enemy's Turn
**Enemy has 2 actions; uses both to force-feed player**

**Combat Log Entry (existing, no change)**:
```
[Round 1, Goblin] The goblin strikes at you twice with Force Feed.
You take 30 fullness damage each. You are now 60/100 full.
```

#### Round 2: Player's Turn
**Player casts: Conjure Morsel again**

**Spell Effect**:
- Fullness: +120 → goblin now 240/300 = 80% full → mobility drops to `"planning"`
- Actions available next round: drops from 2 → 1

**Combat Log Entry (NEW)**:
```
[Round 2, Player] You cast Conjure Morsel at the goblin.

Another buttery morsel flicks toward her. She swallows without thinking—
the food disappears down her gullet. Her breathing shallow now. Her movements 
grow sluggish. She's visibly weighed down.

Mechanical Outcome: Her mobility drops. She can manage only 1 action next round.
```

#### Round 2: Enemy's Turn
**Enemy now has only 1 action (reduced from 2 by fullness); uses it to force-feed**

**Combat Log Entry (existing, simplified by condition system)**:
```
[Round 2, Goblin] The goblin—sluggish, straining—manages one force-feed.
You take 30 fullness damage. You are now 90/100 full.
```

#### Round 3: Player's Turn
**Player casts: Erupting Earth (feeding, L3)**

**Spell Effect**:
- Fullness: +600 → goblin now 840/300 = 280% full = immobile
- Mobility drops to `"immobile"` → actions = 0
- Willingness/succumb check: Goblin is now immobilized, triggering win-state

**Combat Log Entry (NEW)**:
```
[Round 3, Player] You cast Erupting Earth at the goblin.

The earth erupts violently. Roasted meat, roots, and grain cascade upward 
in a blinding avalanche. The goblin is buried under the deluge—she can't 
escape. She chokes down mouthful after mouthful, gasping, her belly swelling 
to grotesque proportions.

Mechanical Outcome: She is completely immobilized by the weight of food.
```

#### Round 3: Enemy's Turn
**Enemy has 0 actions due to immobility; passes**

**Combat Log Entry (NEW)**:
```
[Round 3, Goblin] The goblin, pinned under the food and her own bulk, 
cannot move or act. She passes, helpless.

[WIN-STATE CHECK] Goblin is immobilized. Encounter won!
```

### Analysis: What the Player Learned

1. **Feeding spells have escalating impact**: First cast = minimal change. Second cast = visible slowdown. Third cast = victory.
2. **Action economy matters**: By the second round, the enemy had half the actions, making them less of a threat.
3. **Narrative makes mechanics transparent**: "Her mobility drops" is communicated as "she slows down" — the effect is immediate and visible in prose, not just a number drop.

---

## Example 2: Restraint + Feeding Combo

### Setup
- **Player**: Cleric, Level 7, knows `Hold Person` (L3) and `Force Feed` (cantrip)
- **Enemy**: Ogre Brute, 250 lbs base, denies nothing, 2 actions/round
- **Goal**: Show how restraint + feeding synergize; restraint creates a vulnerability window

### Combat Flow

#### Round 1: Player's Turn
**Player casts: Hold Person at the ogre**

**Spell Effect**:
- Condition applied: `restrained` (via `applyCondition(ogre, 'restrained')`)
- Actions override: `actionsAvailable(ogre)` now returns 0 (checked in updated function)
- Duration: Concentration, up to 1 minute (not tracked here, assume lasts full combat)

**Combat Log Entry (NEW)**:
```
[Round 1, Player] You cast Hold Person at the ogre.

You speak a word of binding. The ogre's massive frame freezes mid-stride—
invisible chains of force lock him in place. He struggles, muscles straining 
against the magical restraint, but he cannot budge.

Mechanical Outcome: He cannot act this round.
```

#### Round 1: Enemy's Turn
**Enemy has 0 actions due to `restrained` condition; passes**

**Combat Log Entry (NEW)**:
```
[Round 1, Ogre] The ogre, locked in place by magical chains, cannot move 
or act. He passes, straining helplessly against the restraint.
```

#### Round 2: Player's Turn
**Player casts: Force Feed (familiar, cantrip, multiple times if actions allow)**

**Spell Effect**:
- Fullness increase: +80 (assume 400 cap = 20% full)
- Mobility: remains `full` (< 50% cap threshold)
- Enemy is still `restrained`, so actions still 0

**Combat Log Entry (NEW)**:
```
[Round 2, Player] You cast Force Feed at the ogre.

You thrust a conjured meal toward his face. Restrained, helpless, he cannot 
turn away. The food forces down his throat. He gags and swallows. His belly 
distends slightly.

Mechanical Outcome: His fullness increases. He remains restrained.
```

**Player has multiple cantrips, so casts Force Feed again (action 2)**:

**Combat Log Entry (NEW)**:
```
[Round 2, Player] You cast Force Feed again.

Another meal forces into the ogre's mouth. He chokes it down, struggling 
against the invisible chains. His belly swells further.

Mechanical Outcome: His fullness is now 160/400 (40% cap).
```

#### Round 2: Enemy's Turn
**Enemy still `restrained`; has 0 actions; passes**

**Combat Log Entry (NEW)**:
```
[Round 2, Ogre] The ogre, restrained and force-fed, cannot act. He gasps, 
his belly heavy, but the magical chains hold firm.
```

#### Round 3: Player's Turn
**Player casts: Force Feed twice more**

**Spell Effect**:
- Fullness now at 320/400 (80% full) → mobility drops to `"planning"`
- But ogre is still `restrained`, so actions = 0 (condition overrides)

**Combat Log Entry (NEW)**:
```
[Round 3, Player] You cast Force Feed at the ogre.

Another meal. The ogre's breathing comes in shallow gasps now. The weight 
of food in his belly is immense, and the chains still hold him fast.

Mechanical Outcome: He is becoming dangerously full.
```

**Second Force Feed**:

**Combat Log Entry (NEW)**:
```
[Round 3, Player] You cast Force Feed at the ogre.

The final meal forces down. The ogre is now grotesquely bloated—his belly 
swollen to distension. He cannot move, cannot breathe easily, pinned by 
both magical restraint and the weight of gluttony.

Mechanical Outcome: He is at 95% fullness. Immobility looms.
```

#### Round 3: Enemy's Turn
**Fullness now at 400/400 (100% = immobile); condition forces 0 actions anyway**

**Combat Log Entry (NEW)**:
```
[Round 3, Ogre] The ogre, completely restrained by magic and overwhelmed 
by fullness, cannot move or act. He passes.

[WIN-STATE CHECK] Ogre is immobilized by fullness. Encounter won!
```

### Analysis: What the Player Learned

1. **Restraint spells create a forcing window**: With the enemy unable to act, the player can execute a feeding strategy without interruption.
2. **Restraint makes weak spells powerful**: Force Feed is a cantrip (normally low-impact), but with the enemy restrained, multiple casts stack freely.
3. **Combo potential is real**: Restraint → Feed → Feed → Win is a viable, satisfying strategy.
4. **Narrative makes the combo feel earned**: Each cast adds to the sense of inevitability. By round 3, the player feels they've outplayed the enemy, not that RNG favored them.

---

## Example 3: Movement Spell Trap

### Setup
- **Player**: Sorcerer, Level 6, knows `Telekinesis` (L3), `Enhance Gravity` (L2), `Float` (L2)
- **Enemy**: Sprite Flyer, 50 lbs base, kites away (flyer archetype), denies `buried`
- **Goal**: Show how movement spells can lock down a mobile enemy and enable feeding

### Combat Flow

#### Round 1: Player's Turn
**Player casts: Enhance Gravity at the sprite**

**Spell Effect**:
- Condition applied: `gravity_locked` (new condition, optional)
- OR: Stat modification: `sprite.gravityMultiplier = 3` (sprite now feels 150 lbs instead of 50 lbs)
- Movement penalty: Mobility reduced one step (full → present)
- Actions available: 2 → 2 (no action penalty, just slower movement)

**Combat Log Entry (NEW)**:
```
[Round 1, Player] You cast Enhance Gravity at the sprite.

The air around the sprite thickens and crushes downward. The little creature 
staggers as if carrying an immense weight. She struggles to stay aloft—the 
magical gravity presses her toward the ground.

Mechanical Outcome: She can barely fly. Movement becomes difficult.
```

#### Round 1: Enemy's Turn
**Enemy tries to kite (fly away) using `move(sprite, 'further')`**

**Code check**: The sprite's `move()` function is called, but if we want to add a `confined` condition, the move fails silently.

**Combat Log Entry** (if movement is blocked):
```
[Round 1, Sprite] The sprite attempts to dart away, but the crushing gravity 
pins her in place. She cannot flee. She is forced to attack (using action).

The sprite force-feeds you with its drippings. You take 15 fullness damage.
```

OR, if `Enhance Gravity` doesn't block movement, just penalizes:

```
[Round 1, Sprite] The sprite, weighed down by magic, struggles to fly away. 
She darts back slightly but cannot gain much distance.

She manages one force-feed action. You take 15 fullness damage.
```

#### Round 2: Player's Turn
**Player casts: Float at the sprite**

**Spell Effect**:
- Condition applied: `floating` (or `gravity_reduced`)
- Gravity multiplier: 0.2 (opposite of Enhance Gravity)
- Sprite becomes weightless and drifts upward (if not grounded)
- BUT, this is on the *same target* as Enhance Gravity, so effects *conflict* OR *layer* depending on design

**Assumption**: Float wins; Enhance Gravity expires or is overridden.

**Combat Log Entry (NEW)**:
```
[Round 2, Player] You cast Float at the sprite, reversing the gravity spell.

The crushing weight lifts. The sprite becomes light, drifting upward into 
the air, weightless. She thrashes, trying to push herself down, but buoyancy 
holds her suspended. She cannot touch the ground.

Mechanical Outcome: She is now floating, helpless.
```

#### Round 2: Enemy's Turn
**Enemy is floating, cannot move in the traditional sense (or can, but slowly)**

**Combat Log Entry**:
```
[Round 2, Sprite] The sprite, drifting weightless in the air, cannot reach 
the ground or move far. She attempts a force-feed but her aim is off.
```

#### Round 3: Player's Turn
**Player casts: Telekinesis to reposition the sprite onto a table**

**Spell Effect**:
- Move command: `move(sprite, 'further')` but to a table position instead
- Sprite position: changed from floating (x=2, y=1) to table (x=2, y=2, special marker)
- Condition applied: `confined_to_table` (or just note position)

**Combat Log Entry (NEW)**:
```
[Round 3, Player] You cast Telekinesis at the sprite.

Invisible force seizes the drifting sprite and carries her toward a nearby table. 
She is lowered onto the wooden surface—unable to escape the flat, enclosed space. 
She scrambles, but the force holds her there.

Mechanical Outcome: She is now trapped on the table. She cannot leave that spot.
```

#### Round 3: Enemy's Turn
**Enemy tries to move but `confined` condition (or table geometry) prevents escape**

**Combat Log Entry**:
```
[Round 3, Sprite] The sprite, trapped on the table, attempts to dart away but 
the invisible force holds her in place. She cannot escape.

She uses her action to force-feed you. You take 15 fullness damage.
```

#### Round 4: Player's Turn
**Player casts: Conjure Morsel (feeding)**

**Spell Effect**:
- Fullness increase: +120 → sprite now 120/150 (80% full) → mobility to `planning`
- Sprite is *already confined*, so this just stacks

**Combat Log Entry (NEW)**:
```
[Round 4, Player] You cast Conjure Morsel at the trapped sprite.

A buttery morsel appears directly in front of her. Trapped on the table, 
she cannot dodge it. She tries to turn away but hunger—or magical compulsion—
forces her to swallow it. The food settles heavy in her tiny belly.

Mechanical Outcome: She is now significantly full and confined. She is helpless.
```

#### Round 4: Enemy's Turn
**Enemy mobility is `planning` (2 or 3 actions from fullness) but confined, so effective actions very limited**

**Combat Log Entry**:
```
[Round 4, Sprite] The sprite, trapped and full, can barely move or act. 
She attempts one weak force-feed but the effort is clearly exhausting her.

[WIN-STATE CHECK] Sprite mobility drops below threshold. Encounter won!
```

### Analysis: What the Player Learned

1. **Movement spells create tactical control**: By repositioning the enemy to a surface (or floating state), the player can neutralize their mobility advantage without restraining them outright.
2. **Movement combos enable other strategies**: Once the sprite is confined, feeding spells become much more effective (no dodging, no repositioning).
3. **Narrative makes the trap feel deliberate**: The player isn't winning by RNG; they're winning by layering effects. The narrative shows each spell building on the last.
4. **Differentiation**: This combat felt *different* from the pure restraint fight (Example 2) or pure feeding fight (Example 1), even though the victory condition is the same. The *path* is unique.

---

## Example 4: Transformation Spell Setup

### Setup
- **Player**: Warlock, Level 8, knows `Ravenous Expansion` (L3) and `Oozing Abundance` (L2)
- **Enemy**: Glutton Demon, 200 lbs base, glutton archetype (self-feeds, gorgeous rate high)
- **Goal**: Show how transformation spells enable finishers by rewriting enemy mechanics

### Combat Flow

#### Round 1: Player's Turn
**Player casts: Ravenous Expansion at the demon**

**Spell Effect**:
- Stomach capacity: 400 → 800 (doubled)
- Willingness: 50 → 20 (desperate hunger applied as negative modifier)
- Duration: Concentration, 1 hour

**Combat Log Entry (NEW)**:
```
[Round 1, Player] You cast Ravenous Expansion at the demon.

The demon's belly swells grotesquely—her stomach capacity blooming outward. 
Her hunger becomes *desperate*, an overwhelming urge. She clutches her distended 
gut, groaning, *starving* despite her bulk. The magic has rewritten her appetite.

Mechanical Outcome: Her stomach can now hold double the food. Her willingness 
drops—she is desperately, overwhelmingly hungry.
```

**Why this matters**: The demon's stomach capacity just doubled, but she's still not full. In subsequent rounds, feeding spells will fill her more slowly (takes more food to reach immobility). However, her *willingness to consume* has been rewritten—she now self-feeds more aggressively (gorge action becomes more tempting).

#### Round 1: Enemy's Turn
**Enemy (glutton) gorges itself using the gorge action (existing AI for glutton archetype)**

**Combat Log Entry**:
```
[Round 1, Demon] The demon, driven by desperate hunger, gorges itself on 
the ambient food (or conjured food from nearby). She shoves food into her mouth, 
chewing rapidly, her eyes glazed over with hunger-lust.

Fullness: +80 (demon now 80/800 = 10% full, still has huge capacity)
Willingness: now 14 (desperate hunger effect + gorging)
```

#### Round 2: Player's Turn
**Player casts: Oozing Abundance at the demon**

**Spell Effect**:
- Fullness: +180 (demon now 260/800 = 32.5% full)
- Mobility: remains `full` (still under 50% threshold)

**Combat Log Entry (NEW)**:
```
[Round 2, Player] You cast Oozing Abundance at the demon.

An arrow of thick, nutritious ooze strikes the demon and splatters across her, 
clinging and soaking in. She gasps as the sludge coats her throat and settles 
down her gullet. But compared to the vast cavern of her belly, it barely makes 
a dent.

Mechanical Outcome: Despite the ooze, her stomach is still mostly empty. 
Her hunger persists, acute and desperate.
```

**Key narrative moment**: The transformation spell made the enemy *harder* to defeat via fullness alone (capacity doubled), but also changed the matchup—the enemy is now fighting *herself*. Her gorging behavior accelerates her own journey toward gluttony.

#### Round 2: Enemy's Turn
**Enemy gorges again (glutton AI is single-minded)**

**Combat Log Entry**:
```
[Round 2, Demon] The demon, overwhelmed by magical hunger, gorges herself again. 
She swallows enormous mouthfuls, not caring about strategy—only hunger.

Fullness: +120 (demon now 380/800 = 47.5% full)
Willingness: now 22 (self-feeding accelerates willingness toward succumb at 75)
```

#### Round 3: Player's Turn
**Player casts: Oozing Abundance again**

**Spell Effect**:
- Fullness: +180 (demon now 560/800 = 70% full)
- Mobility: drops to `planning` (at 70% capacity)
- Actions available: 2 → 1

**Combat Log Entry (NEW)**:
```
[Round 3, Player] You cast Oozing Abundance at the demon.

Another arrow of ooze. The demon's belly, already heavy with her own gorging, 
now visibly swells. Her movements become sluggish. She is getting dangerously full.

Mechanical Outcome: Her mobility worsens. Her actions next round will be limited.
```

#### Round 3: Enemy's Turn
**Enemy has 1 action due to fullness; uses gorge (self-feeding wins over feeding player)**

**Combat Log Entry**:
```
[Round 3, Demon] The demon, now slower, still gorges. She shoves more food 
into her mouth, her jaw working despite the weight in her belly.

Fullness: +90 (demon now 650/800 = 81% full)
Willingness: now 32 (continuing to self-feed)
```

#### Round 4: Player's Turn
**Player casts: Oozing Abundance one more time**

**Spell Effect**:
- Fullness: +180 (demon now 830/800 = > 100% full → immobile)

**Combat Log Entry (NEW)**:
```
[Round 4, Player] You cast Oozing Abundance at the demon.

Another ooze arrow. The demon's eyes widen. She is now grotesquely bloated—
her belly has swollen far beyond capacity. The magic that drove her appetite 
has now turned against her. She is pinned by her own gluttony.

Mechanical Outcome: She is completely immobilized. The transformation spell's 
effect has come full circle—it created the condition for her own defeat.
```

#### Round 4: Enemy's Turn
**Immobilized; has 0 actions; passes**

**Combat Log Entry**:
```
[Round 4, Demon] The demon, grotesquely full and immobilized, cannot move 
or act. She sways, helpless.

[WIN-STATE CHECK] Demon is immobilized by fullness. Encounter won!
```

### Analysis: What the Player Learned

1. **Transformation spells change matchups, not immediately win**: `Ravenous Expansion` didn't defeat the demon; it rewrote the rules. The demon can now hold more food, but she's also now driven by hunger.
2. **Transformation spells can create synergies**: By making the demon desperately hungry, the transformation spell actually accelerated the enemy's self-defeat. The demon's own AI (gorge) worked against her.
3. **Narrative makes this strategic, not lucky**: The player didn't get lucky; they set a trap. The demon fell into it by following her own nature. The narrative shows this arc clearly.
4. **Different problem-solving**: This fight didn't require restraint or movement control. It required understanding enemy AI and exploiting it via stat manipulation.

---

## Example 5: All Four Families in One Encounter (Advanced)

### Setup
- **Player**: High-level Spellblade, knows diverse spells
- **Enemy**: Warden (archetype), denies `satiated`; tough opponent
- **Goal**: Show how a sophisticated player might layer all four spell families

### Abbreviated Combat Flow

| Round | Player Action | Enemy Action | Log Highlight |
|-------|---------------|--------------|---|
| 1 | Cast `Slow` (movement tag) | Purges fullness, moves closer | Demon slows; movement reduced |
| 1E | — | Uses 1 action; force-feeds player | Enemy still has actions |
| 2 | Cast `Confection Snare` (restraint tag) | Tries to escape but can't; has 0 actions | Enemy restrained; passes |
| 3 | Cast `Conjure Morsel` + `Erupting Earth` (feeding tags) | Restrained; still can't act | Fullness rises; mobility drops |
| 4 | Cast `Polymorph` (transformation tag) to pig form | Now in pig form; mobility worsens from form change | Enemy becomes heavier/slower |
| 5 | Cast `Confection Snare` again (if first expired) or `Force Feed` spam | Restrained + transformed = helpless | Fullness reaches 100%+ → Immobilized |
| 6 | — | Immobilized; passes; Win | Encounter concluded |

### Key Narrative Points

**Round 1**: "The demon slows, unable to keep pace."
**Round 2**: "Candy vines wrap her in place. She cannot act."
**Round 3**: "Food fills her mouth and throat. She swells despite her restraints."
**Round 4**: "Her form ripples and transforms. She is now a pig—heavier, more sluggish."
**Round 5**: "She is grotesquely swollen. She cannot move."

**Payoff**: The player didn't brute-force the solution. They systematized it: slowed → restrained → fed → transformed → finished. Each phase felt distinct because the narrative made the mechanics transparent.

---

## Playtesting Guidance

When testing the spell feedback system, look for:

1. **Clarity**: Does the player understand what each spell *does* from the narrative alone?
2. **Distinction**: Does a feeding spell feel different from a restraint spell in practice (not just in description)?
3. **Satisfying progression**: Does a multi-round combat flow feel like the player is solving a puzzle, not just watching numbers change?
4. **Fair but challenging**: Do enemies feel like they're playing by the same rules as the player? (They should be.)
5. **Narrative fit**: Does the prose feel diegetic, or does it break the immersion by mentioning mechanics?

### Red Flags

- Player says "I didn't know what that spell did until I read the code."
- Player tries the same spell twice expecting different results; feels confused when nothing changes.
- Log is hard to parse; too much text, or too mechanical.
- Enemy defeats feel random instead of "I set up a chain reaction."

### Green Flags

- Player says "Oh, so restraint spells lock down actions and feeding spells reduce mobility—I can chain them!"
- Player experiments with different spell combinations intentionally.
- Player re-reads the log to understand what happened; log is engaging.
- Enemy defeats feel *earned*; player describes their strategy.

---

## Summary: The Four Families in Action

| Family | Feel | Example Round | Outcome |
|--------|------|---|---|
| **Feeding** | Gradual pressure | "Food cascades; enemy slows progressively" | Immobility after 3+ rounds |
| **Restraint** | Instant control | "Chains lock; enemy passes this round" | Immediate vulnerability window |
| **Movement** | Tactical lock | "Enemy confined to table; can't flee" | Position-based advantage |
| **Transformation** | Fate rewrite | "Enemy's hunger doubles; self-defeats" | Long-term stat changes enable combos |

Each family solves a different problem. A smart player learns to mix them.
