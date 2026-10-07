<!-- modforge-doc
authority: canonical
load: always
purpose: AI/tool routing workflow
-->
# AI development workflow

**capture → establish truth → scope → assign one owner → implement → review → validate → record evidence → sync**

- **Human owner:** final product/release/public authority.
- **Codex / strongest approved coding tool:** primary technical authority for heavy architecture, expansion, cross-system debugging, and release hardening.
- **OpenCode / budget coding tool:** technical authority for bounded fixes, support, compatibility and small/medium implementation.
- **ModForge:** production coordination, repository truth, routing, handoffs and evidence.
- **Cheap subagents:** planning, research, cleanup and independent review.

Once a coding tool owns an approved work item, ModForge/Boss/Planner do not compete with its implementation approach unless project vision, architecture ownership, scope, evidence, or release safety is violated. One implementation owner per task; adjacent discoveries are triaged instead of silently added to scope.

If a model/provider quota runs out mid-work, keep the task open, preserve Git diff/tests/evidence, never silently enable paid usage, and resume later or deliberately re-route to a capable approved model. A weak free fallback may support research/review without taking over unsafe heavy implementation.

Debug/console logs are on-demand evidence only. Do not preload or continuously ingest them; use the smallest relevant recent slice when the active runtime/test boundary makes logs useful.
