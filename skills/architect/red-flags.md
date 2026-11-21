# Design red flags

Each one is a reason to revise or reject a shape.

- **Shallow module.** The interface is large but hides little. Callers must call several methods to finish one operation, or learning the interface doesn't spare them from learning the implementation.
- **Leaked decision.** Two or more modules depend on the same internal detail, so changing it means editing all of them. Wire, storage, and framework types on a public interface count.
- **Organized by time, not knowledge.** Separate load, validate, transform, and save modules that each repeat the same representation and rules. Group code by what it knows instead.
- **Pass-through method.** It forwards the same arguments to another method of the same shape and adds nothing. Remove it.
- **Split ownership.** More than one module writes the same state or keeps its own copy. Give each piece of state one owner.
- **Two ways to do one task.** Agents copy whichever they find first, so both keep growing. Keep one. Move callers and delete the other in the same change.
- **Reachable internals.** Callers can import internals, so they will. Make that import fail the build.
- **Hand-synced lists.** Adding an item means editing several lists. Keep one and derive the rest, or make the build fail when they disagree.
