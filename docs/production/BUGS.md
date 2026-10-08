<!-- modforge-doc
authority: canonical
load: always
purpose: canonical confirmed bug and blocker ledger
-->
# Confirmed bugs and blockers

## BUG-002 — Container, loot and key layers abort map rendering
Status: fixed / browser and portable verified / v0.1.2 published

Local follow-up, 2026-10-07: owner reported continued failures. `companion/advanced-ui.js` had an uncommitted exact reversion to the pre-fix module, removing filters/persist/afterMount while current callers still required them. Preserved that file in ignored evidence before restoring the compatible committed module. A hidden native run using an isolated copy of the owner's state loaded all thirteen maps without page errors and exercised containers/loot/keys, reset, bulk visibility and restored counts. Original profiles were not modified. Source is again identical to the verified v0.1.2 module; no replacement binary was needed. This validates local source against copied configuration, not whichever older executable a user might still launch.
Priority: high
Owner: Codex
Type: bug

### Symptom and evidence
Owner reported no container/loot markers and an AdvancedUI filter error in v0.1.1. `Features.markers()` called `AdvancedUI.filters()`, which was not exported. The exception prevented all extra marker HTML from returning. The existing advanced UI regression had not been included in the v0.1.1 focused validation set.

### Resolution
Export the filter accessor, preserve map presets when saving, and scope item/container/search/owned-door filters per profile and map. Move legacy global filter choices to the current map once. Layer changes save the new value before rerendering. Match source variants through MapUI's shared group selection. Add distinct original crate/loot/lock/switch symbols, legend entries, marker counts, missing-source/filter guidance, bulk container visibility and a reset action. Keep navigation markers above loot markers.

### Validation
`test:advanced` now enables containers, loose loot and keys; asserts markers render, verifies zero-match/reset and bulk visibility, then tests map isolation and reload persistence. It passed, along with `test:map-ui`, 41 Node tests, syntax and hidden native quiet-sync. Source screenshot `companion/evidence/map-loot-filters.png` was inspected. Live game coordinates remain reference data; no actual loot availability claim. The exact extracted v0.1.2 ZIP passed hidden native startup, actual container/loot/key marker rendering, map/hideout/Sync/minimap and persistence/reopen with Node unavailable on PATH. Published asset size/digest and anonymous ZIP/checksum HTTP 200 were verified.

Only add a bug when there is a concrete symptom, reproduction/evidence, or source-confirmed failure.

<!--
## BUG-001 — Reproducible title
Status: todo
Priority: high
Owner: Unassigned
Type: bug

### Symptom
What fails.

### Reproduction
Exact setup/steps.

### Evidence
Logs/test/source boundary.

### Expected
What should happen.

### Validation
Regression/live check required.
-->

## BUG-001 — Auto-discovery can choose a stale install's log folder
Status: fixed / fixture-verified
Priority: medium
Owner: Codex
Type: bug

### Symptom
When more than one known BSG/Steam Logs folder exists, discovery could select a stale candidate solely because it appeared earlier in the search order.

### Reproduction
Create two candidate install roots with valid Logs subfolders and different application-log modification times, then run discovery.

### Evidence
`companion/tests/sync-inbox.test.cjs` verifies the newer candidate is selected and a mode from a 48-hour-old session cannot switch the profile. `companion/sync-engine.cjs` now sorts discovered logs by application-log activity and keeps a valid user-configured folder. The current machine has a single confirmed BSG Logs root; multiple installs are fixture-tested only.

### Expected
If multiple candidates exist, choose the freshest active log candidate; a valid configured path remains authoritative. Do not use a session mode older than 24 hours to switch profiles.

### Validation
Validated by `npm test` (35 tests reported by owner), including freshest-root and stale-mode fixtures. Real game-log schema and BSG policy verification remain separate and open.
