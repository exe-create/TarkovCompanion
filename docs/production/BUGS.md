<!-- modforge-doc
authority: canonical
load: always
purpose: canonical confirmed bug and blocker ledger
-->
# Confirmed bugs and blockers

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
