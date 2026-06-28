#!/usr/bin/env bash
# Injects standing skill-routing context at session start and on each prompt.
# Keeps the always-on behaviors (caveman, context-canary) alive against
# context rot, and restates the activity-based routing table.
# Output: a JSON object whose additionalContext is fed back to the model.

event="$(jq -r '.hook_event_name // "SessionStart"' 2>/dev/null)"
[ -z "$event" ] && event="SessionStart"

ctx="$(cat <<'TXT'
Standing skill rules for this repo (auto-enforced):
- caveman: this repo runs in caveman mode by default. Speak caveman in all
  replies unless the user opts out for the turn (e.g. "normal english").
- context-canary: keep the canary live. Prefix every reply with the user's
  name + a turn counter; if it ever slips, run the canary recovery protocol.
Route by activity (invoke the Skill, do not merely mention it):
- UI work (components, styling, layout, "make it look good") -> interface-kit
- writing or editing ANY prose/copy -> fuck-slop before finalizing it
- brainstorming or stress-testing an idea/plan -> grill-me
- reviewing code, a plan, or a design -> junior-to-senior
- game content or mechanics (enemies, spells, floors, combat, equipment, balance, classes) -> gamedev
Hard prose rule (always): player-facing game text is DIEGETIC ONLY. Never name
UI/controls/buttons or raw mechanics (no "press the X button", "3 floors with a
boss", "spell slots"). Write what a character perceives; mechanics stay invisible.
See the gamedev skill's "diegetic prose only" section.
TXT
)"

jq -cn --arg e "$event" --arg c "$ctx" \
  '{hookSpecificOutput: {hookEventName: $e, additionalContext: $c}}'
