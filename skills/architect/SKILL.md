---
name: architect
description: "Sketch the types, signatures, and module boundaries before writing code. Two parallel runners each design a different shape, then you merge them into one sketch and implement against it. Use for /architect, 'architect this', 'design this', or non-trivial work where jumping to code would lock in the wrong shape."
disable-model-invocation: true
---

# Architect

Design the shape of the code before writing it. The shape is types, function signatures, and module boundaries, with bodies left as `not implemented` or pseudocode. Two runners design in parallel. You merge their designs, get the user's sign-off, then implement against the result.

Open a todo list with one item per phase: Ground, Sketch, Merge, Agree, Implement.

## 1. Ground

Learn every part of the system the new code touches. Do this yourself, once, in this conversation. Read the code. Naming a file is not understanding it.

Write a grounding brief to `<tmp>/architect-<slug>/brief.md`, where `<tmp>` is your scratchpad directory if you have one, otherwise a temp directory. Keep it under a page.

- The goal, in your own words.
- The constraints: existing types to work with, callers that can't break, invariants that cross the boundary.
- The relevant files, with one line each on what they own.
- Anything about the current shape that looks deliberate. Check `git log` on it if the design would change who owns what.

Skip grounding only for greenfield code with nothing around it.

## 2. Sketch

Pick two directions that are structurally different. They differ in the core data structure, where ownership sits, or where the module boundaries fall. Two flavors of one shape do not count. Name each direction in one sentence.

Spawn two runners in one message, in parallel. Give each one:

- the path to the brief,
- its assigned direction,
- its own output path, `<tmp>/architect-<slug>/runner-<a|b>/`,
- the absolute path to this skill's `red-flags.md`,
- the runner instructions below, verbatim.

The brief is their grounding. Tell them to open only the files they need to check a detail, not to re-explore the codebase. If the user names models, use them. A mix of two models gives more varied designs than one model twice.

### Runner instructions

> Design one candidate shape for this task in your assigned direction. Commit to it fully. Do not hedge toward a middle ground. The difference between the two candidates is the point.
>
> Write the caller's code first: a short README-style usage and two or three realistic call sites. Then derive the types and signatures from it. If the two disagree, change the types, not the usage.
>
> - Get the data structures right first. Trace each main access pattern through them. If the answer is "add a cache or index later", the structure is wrong.
> - Hide complexity behind a small public interface. Keep wire and storage types off it. Parse them into domain types at the boundary.
> - Give each piece of state one owner. If two things might write it, split the state per writer and merge where it is read.
> - Prefer types that make wrong use impossible, then runtime checks, then comments.
> - Leave bodies as `not implemented`. Use pseudocode for tricky logic.
> - Check your design against the red-flags file you were given.
>
> Write `sketch` (the types and signatures, in the project's language) and `rationale.md` (the problem, the caller's usage, the shape and its key decisions, the tradeoffs as "we accept X in exchange for Y", and the open questions). Keep the rationale to one page.

## 3. Merge

Read both candidates in full. Judge them on four things:

- how simple the caller's usage is,
- how much complexity the public interface hides for its size,
- the red flags in [red-flags.md](red-flags.md),
- whether a change that looks right from one file is right for the whole repo. Assume the next contributor is an agent that copies the nearest example and takes the shortest path that compiles.

Pick one as the base. Port the one or two best ideas from the other into it by hand, so the result reads as one design. If both converged on the same shape, say so and keep it. If they diverged wildly, the brief was too vague. Fix the brief and rerun.

## 4. Agree

Show the user the merged design:

- the caller's usage,
- the sketch,
- which candidate won and what was taken from the other,
- the tradeoffs accepted,
- the open questions.

Wait for sign-off. Skip this step only when the user said "no checkpoint". If the user pushes back on the shape, treat it as new grounding: update the brief and rerun the sketch.

## 5. Implement

Fill in the bodies. The sketch is the contract. If the code needs something the sketch didn't plan for, say so. Either the sketch was wrong, a requirement was missed, or the code is overreaching. Do not quietly absorb it.

Scrap the sketch when friction forms a pattern, not on one edge case:

- the same workaround shows up in unrelated places,
- several unrelated edge cases each need a special branch,
- types need casts, `any`, or always-set optional fields to compile,
- a lock seems needed where the sketch said state wasn't shared,
- callers must know the internals to use it.

When you scrap, redesign as if the new constraints were known from day one. The new sketch must be smaller than the old one before it grows. Then go back to step 2.

Credit: adapted from the `architect` and `arena` skills in pstack by Lauren Tan (MIT).
