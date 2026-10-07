<!-- modforge-doc
authority: canonical
load: on-demand
purpose: retained document authority and routing registry
-->
# Source registry

Use this file to classify retained project documents as canonical, technical authority, generated, reference, or historical. A retained historical/reference document may provide evidence but must not override current canonical production state unless reconciled here.

## Authority classes
- **Entry point:** root `AGENTS.md`.
- **Canonical:** current operational truth in `docs/production/`.
- **Technical authority:** stable subsystem/specification/testing rules.
- **Generated:** derived state such as `.modforge/PROJECT_STATE.md`; never hand-edit.
- **Reference/Historical:** useful evidence loaded only when relevant.

## Rebuild source routing
- `companion/README.md`: technical usage, feature scope, persistence/data boundaries and validation commands for the new app.
- `companion/` application source and `companion/tests/`: technical implementation/test authority.
- Existing ExesQuestMapTracker binaries, Assets/, Config/, Maps/, Data/: preserved reference app and reference assets/data. Original tracker-state.json/settings.json are user state, not new-app output.
- `companion/data/live-*.json`: generated community caches with provenance; refresh via the app or sync script.
- `companion/evidence/`: local/browser/native test artifacts, not live Tarkov acceptance.
- `.modforge/PROJECT_STATE.md`: generated coordination snapshot, unchanged and still awaiting ModForge regeneration; canonical production docs reflect the new work.
- `companion/art/manifest.json`: generated-art inventory, exact built-in prompts, portrait reference URLs and usage. Final PNGs live under `companion/art/`; reference portraits are retained separately under `art/references/`.
- `companion/map-logic.cjs`, `map-ui.js`, `art.js`, `art.css`: technical authority for local proximity/availability, map presentation and atlas sampling. `mapIntel` in generated live caches preserves exact source variants, transits, bosses, spawns and hazards.

TASK-003: companion/overlay-desktop.cjs owns native bounds/topmost/click-through/global registration; tools-ui.js owns renderer controls; upgrade.css owns main background/compact layout. Original background prompt/method: companion/art/manifest.json. Fullscreen boundary: official Electron BrowserWindow and Microsoft Direct3D Windowed vs Full-Screen Mode documentation.
