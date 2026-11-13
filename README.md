# a-stack

My collection of GitHub Copilot agent skills and plugins.

## Install

Add this repository as a Copilot plugin marketplace:

```bash
copilot plugin marketplace add heyitsaamir/a-stack
```

Then install a skill:

```bash
copilot plugin install guided-pr-review@a-stack
```

Start a fresh Copilot session after installing or updating a skill.

## Skills

| Skill | Description |
|---|---|
| [`guided-pr-review`](skills/guided-pr-review/) | Turn a pull request into an interactive Overview, chaptered Guide, and Diff. |
| [`in-your-own-words`](skills/in-your-own-words/) | Have the agent restate your goals and problem so you can check it understood you. Run with `/in-your-own-words`. |

## Credits

`guided-pr-review` was originally created by
[@chasemc67](https://github.com/chasemc67) in
[`chasemc67/guided-pr-review`](https://github.com/chasemc67/guided-pr-review).
The skill retains its original MIT license and attribution.

`in-your-own-words` comes from [pstack](https://github.com/cursor/plugins/tree/main/pstack)
by Lauren Tan. It retains its original MIT license.
