---
name: add-principle
description: "Add or refine a principle in the aamir-mode skill. Use for /add-principle, \"make that a principle\", \"add this to aamir-mode\", or \"mine my history for principles\"."
disable-model-invocation: true
---

# Add principle

Grow `aamir-mode` one principle at a time. The user supplies the thought. You do the drafting, deduping, and filing.

Edit the a-stack repo, never an installed copy. Find it by resolving this skill's real path (it is usually reached through a symlink in `~/.claude/skills/`). If that does not land inside a git repo, use `~/Documents/ws/a-stack`. Below, `aamir-mode/` means `<a-stack>/skills/aamir-mode/`.

Principles live as bullets in `aamir-mode/SKILL.md`, grouped under `##` sections such as `## Working on a task` and `## Writing replies`.

## Pick the source

- **A sentence was given** (`/add-principle comments explain why, never what`). Draft from that sentence. Use the current conversation only for context.
- **"Make that a principle" or no text.** Draft from the current conversation. Find the correction, preference, or rule the user just stated. If there are several candidates, list them and ask which to keep.
- **"Mine my history."** Run the mining pass below, then treat each surviving candidate as its own draft.

## Draft

A principle is one bullet: `- **<Short name>.** <The rule.>` Add ` Why: <reason>.` only when the user gives a reason. Do not invent one, and do not ask for one.

- Keep the user's wording. Tighten it only when asked.
- Put it under the section it fits. Propose a new section when none fits, and name it in the draft.
- If the user pastes a rule from another skill pack, file it as given. It is their call to adopt it.
- One bullet, one rule. If the text holds two separate rules, propose splitting it.

A principle gets its own file only when it outgrows one bullet: it needs an example, an enforcement check, or more than a few sentences. Then write `aamir-mode/principles/<kebab-name>.md` with the detail, and end the bullet with `See [principles/<kebab-name>.md](principles/<kebab-name>.md).`

## Dedupe

Read `aamir-mode/SKILL.md`. Then pick one.

- **New.** No overlap. Add it.
- **Refine.** It sharpens or extends an existing bullet. Propose an edit to that bullet instead.
- **Conflict.** It contradicts an existing bullet. Show both and ask which wins. Never keep two principles that disagree.
- **Already covered.** Say which bullet covers it and stop.

## Confirm

Show the bullet (or the edit for a refine) and the section it goes under. Wait for a yes or edits. Do not write before approval. When the user states the exact text and section, that is the approval.

## File it

1. Add or edit the bullet in `aamir-mode/SKILL.md`, plus its file if it has one.
2. Commit in the a-stack repo with the message `aamir-mode: add <short name>` (or `refine <short name>`). Do not push unless the user asks.

## Mining pass

Use this only when asked to mine history. It finds principles the user has stated but never filed.

1. **Scope.** Default to the last 14 days of transcripts for the current project, at `~/.claude/projects/<slug>/*.jsonl`, where `<slug>` is the working directory with every non-alphanumeric character turned into `-`. Read other projects only when the user asks. State the scope back before reading.
2. **Read for signals.** Look at the user's own messages: corrections ("no, do X"), repeated preferences, stated rules ("always", "never", "I like it when"), and approvals of a non-obvious approach. Skip one-off task instructions. For more than a handful of transcripts, split them across parallel subagents that each return candidates with the transcript id and a short quote.
3. **Keep only repeats.** A preference seen in two or more conversations is a candidate. A single instance is dropped unless the user stated it as a general rule. A preference that was contradicted elsewhere is noise.
4. **Skip what exists.** Drop anything an existing bullet already covers.
5. **Present.** List the candidates, each with its evidence quotes, and let the user pick. Then draft bullets for the picks and confirm them as one batch.

## Guardrails

- Fewer, sharper principles beat many vague ones. "Write good code" is not a principle.
- Write in imperatives about "the user", not the user's name, so the rules read cleanly to any agent.
