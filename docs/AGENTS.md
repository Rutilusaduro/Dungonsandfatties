# Project Subagents (the team)

Project agents live in `.claude/agents/*.md`. They load **natively at session start** — open a new session in this repo and these are available by name (type the name, or just describe the task and the matching one is picked).

| Agent | Invoke as | Owns | Tools |
|-------|-----------|------|-------|
| 🎮 Game Designer | `game-designer` | Systems, mechanics, economy, progression, gameplay loop, balance, GDDs. Designs; defers code to the gamedev flow. | Read, Glob, Grep, Write, Edit, WebSearch, WebFetch |
| 🗺️ Level Designer | `level-designer` | Dungeon floor/room layout, encounter pacing, critical-path readability, environmental storytelling, room-graph tuning. | Read, Glob, Grep, Write, Edit |
| 📖 Narrative Designer | `narrative-designer` | NPC voice/dialogue, lore architecture, world bible, boss/encounter narrative, text-engine prose. Diegetic only. | Read, Glob, Grep, Write, Edit |
| ✨ Whimsy Injector | `whimsy-injector` | Delight & personality — micro-interactions, easter eggs, reactive flavor, empty/transition states. On-voice + accessible. | Read, Glob, Grep, Write, Edit |
| 🎨 Technical Artist | `technical-artist` | Front-end render perf — CSS/animation cost, bundle size, re-render cost, build/perf budgets. (No 3D pipeline in a text game.) | Read, Glob, Grep, Write, Edit, Bash |

## Shared house rules (all agents)
- **Diegetic prose only** — player-facing text never names UI/controls/mechanics. Describe what a character perceives.
- Player-facing copy routes through `weightgain-prose` (voice) + `fuck-slop` (de-slop).
- Designers design and write docs/content; gameplay-code changes land through the `gamedev` implementation + `content:lint` + tests flow.
- Send plans/designs to `junior-to-senior` for adversarial review, ideas to `grill-me`.

## How to use
- New session in this repo → call by name, e.g. *"have `game-designer` assess the combat economy"* or *"`level-designer`, redesign floor 4."*
- Mid-session after adding/editing an agent file, it is **not** hot-loaded — start a fresh session (or it can be run via a general-purpose agent wearing the persona as a stopgap).

## Skills (for reference — separate from agents)
Routing skills already wired in this repo: `gamedev`, `interface-kit`, `weightgain-prose`, `gamedev-text-engine`, `fuck-slop`, `grill-me`, `junior-to-senior`, `caveman`, `context-canary`.
