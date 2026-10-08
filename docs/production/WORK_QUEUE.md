<!-- modforge-doc
authority: canonical
load: always
purpose: canonical active work queue
-->
# Active production work queue

## TASK-008 — Repair loot/container layers and simplify filters
Status: implemented / browser and portable verified / v0.1.2 published
Owner: Codex
Scope: Owner-reported BUG-002 and directly related map filter usability. Fix missing AdvancedUI API, per-map persistence and source variant selection; add clear layer symbols/counts and reset/bulk visibility controls. Preserve profiles, quests, pins and quiet background behavior. Tests: 41 Node, syntax, advanced UI, map UI and hidden native quiet-sync passed; exact extracted portable checks passed, including actual container/loot/key markers. Public release: https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.2; anonymous downloads and asset digest/size verified. Do not automatically restart the running tracker without the owner's restart choice.

## TASK-007 — Quiet background work and automatic quest organization
Status: implemented / locally verified / v0.1.1 public prerelease published
Priority: high
Owner: Codex
Type: work

### Goal
Prevent random sync/load interruptions during play and organize automatically recognized quest progress using our own interface.

### Scope and acceptance
Background sync/watchers/failures are silent and never activate windows or open dialogs. Defer page rebuilds while focused or in a dialog; keep diagnostics in Preferences. Public community requirements remain separate from personal source records. Catch recent new log sessions after downtime, retain mode/inbox protections, reject older source updates and preserve manual corrections. Distinguish ready-to-hand-in from completion and only accept known completed objective identities. Group remaining map objectives, rank active/hand-in/unlock goals and auto-track six current-map tasks without modifying manual pins. No game-process access, capture on timers, borrowed third-party UI or automatic updater.

### Validation
41 Node tests and syntax checks passed, plus browser UI, original quest board, audio controls, native Sync and screenshot watcher/restart regressions. New hidden native quiet-sync coverage validates typed input preservation, accepted hand-in/completion updates, failed refresh/unknown screenshots, no toasts/dialogs/window creation/activation and no global key registrations in the test. Quest records are synthetic fixtures; installed game logs previously exposed session mode only. No live-game or zero-resource-impact claim. Source/UI evidence: companion/tests/quiet-sync-desktop.cjs, quest-core.test.cjs, quest-catchup.test.cjs, quest-ui.cjs and ignored evidence/quest-board-v0.1.1.png.

### Delivery
v0.1.1 Windows preview is published at https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.1. The exact extracted ZIP passed hidden native startup, maps/hideout/Sync/minimap, persistence and reopen checks with Node unavailable on PATH. Anonymous public ZIP/checksum HTTP 200 and GitHub digest/size were verified. See RELEASE_OPERATIONS.md for the build and hash. Do not restart the user's running app during a raid; load this version at the next intentional restart. Real-game quest payload availability and game compatibility remain live-pending.

## TASK-003 — Configurable hotkeys, compact minimap and main background
Status: implemented / locally verified / real-game acceptance pending
Priority: high
Owner: Codex
Type: work

### Goal
Improve expected desktop controls, draggable/resizable minimap overlay and professional app styling with a generated main background.

### Scope
Companion desktop overlay controller, IPC, renderer tools/map view, CSS, original background, tests and canonical records. Preserve original tracker and player progress. Remain external; no game hooks or paid fallback.

### Acceptance
Eight configurable global actions with registration feedback; local navigation/search/map/help shortcuts that respect typing; compact screenshot-position map with follow/free-pan, center, floor/variant/faction, position age and nearest eligible exit; click-through indicator/recovery; drag bar and resize corner; saved geometry and zoom; topmost window without focus stealing; legible original background. Exclusive fullscreen limitation is explicit.

### Validation
Fourteen Node tests, expanded syntax checks, existing browser/desktop/map flows, and new native test:minimap passed. Native test exercises actual resize-corner dragging, bounds/zoom/follow persistence, restart, always-on-top flag, lock recovery, duplicate/invalid shortcut feedback, typing guards and help. Background and native minimap screenshots visually inspected. Fixtures use isolated evidence state and synthetic positions.

### Definition of Done
Implementation and local verification complete. Windowed/borderless topmost behavior, global bindings and screenshot accuracy in actual Tarkov remain live-pending. True exclusive fullscreen is not guaranteed by a desktop overlay. Close/reopen Companion to load the new main-process code; test in borderless play.

## TASK-002 — Tactical artwork and clear extract/transit markers
Status: implemented / locally verified / live acceptance pending
Priority: high
Owner: Codex
Type: work

### Goal
Improve map legend sprites, make extracts/transits unmistakable, add green proximity highlights and implement original gritty Tarkov-themed art throughout the UI.

### Scope
Companion art, renderer/map modules, live map-data normalization, focused tests and existing canonical records. Preserve the original tracker, player progress and source map artwork.

### Acceptance
Distinct extract/transit labels and images; green proximity remains separate from manually confirmed availability; faction/floor/blocked exits handled; mode/variant availability isolated; boss/PMC/scav/cultist/guard portraits and art on UI controls; map and overlay remain usable.

### Validation
Five built-in-generated atlases plus a header image copied to `companion/art/`; alpha inspected and consumed by CSS. Fourteen Node tests, expanded syntax checks, dedicated map/UI flow, existing browser flow and native desktop/overlay checks passed. Dedicated flow tests nearby/confirmed/blocked markers, persistence, source variants, fixed marker size, exit centering and new-raid reset. Independent review corrected shared spawn classification and reduced blocked-label clutter. Screenshots: `companion/evidence/customs-art-proximity.png`, `overlay-art.png`, `overview.png`.

### Definition of Done
Requested art and behavior are implemented and locally verified. Real-game location/extract accuracy, permissions and runtime compatibility remain live-pending. Actual availability is manual; the app does not inspect the game. Next safe step: close/reopen the Companion and check a known exit using a normal game screenshot, confirming its actual conditions yourself.

## TASK-001 — New personal Tarkov Companion
Status: implemented / locally verified / live acceptance pending
Priority: high
Owner: Codex
Type: work

### Goal
Create a professional companion from fresh source using the old tracker as a reference, with maps, screenshot position tools, flea/overlay tools, cultist calculation, quest and hideout organizers and expected planning utilities.

### Scope
New `companion/` app and root launcher; update canonical project records. Preserve original binaries, settings, progress and assets. No generated cosmetic art, paid providers, game-process access or automatic game actions.

### Acceptance
Usable desktop UI; local persistence and separate game-mode profiles; real source-backed community data; working planning/overlay workflows; visible uncertainty for prices, cultist rules and game permissions.

### Validation
Seven focused Node tests, syntax checks, browser functional flow, native Electron persistence/overlay checks, generated-image OCR, screenshot filename watcher/restart and quest-inventory/crafting UI tests passed. Independent review fixes retained quest-item identities, avoided duplicate find/hand-in needs and selected the latest coordinate-bearing screenshot. Evidence: `companion/tests/`, `companion/evidence/`, `companion/README.md`.

### Definition of Done
Implementation/local checks are complete. Real in-raid screenshot accuracy, OCR, fullscreen/shortcut compatibility and permission assessment remain pending. Do not label release-ready or ToS-approved. Next safe step: launch detached app, set a profile, verify a known map position using a normal screenshot and compare the marker without altering game state.

Use stable IDs and this shape so ModForge can sync/write through safely:

<!--
## TASK-001 — Short title
Status: todo
Priority: high
Owner: Unassigned
Type: work

### Goal
Observable outcome.

### Scope
Allowed scope.

### Acceptance
What must be true.

### Validation
How to prove it.

### Definition of Done
Evidence/status required to close.
-->
## TASK-006 — One-button local Sync and source discovery

Status: implemented / locally verified / live log support pending
Priority: high
Owner: Codex
Type: work

### Goal
Let one foreground action discover supported local sources, refresh community data and import only known progress events without overwriting manual state.

### Scope
Read-only discovery of known BSG/Steam logs, screenshot folders and saved controls; mode-aware bounded log parsing; screenshot filename position import where map identity is explicit; persistent per-mode pending event inbox; optional log/screenshot watching and periodic public-data refresh. No account login, memory access, game input or invented hideout data.

### Acceptance
Foreground Sync may use a session mode recorded within 24 hours. A unique same-mode profile can be selected; multiple matching profiles require the user to select one and leave events pending. Unknown/unmatched events remain pending; refresh failures keep existing caches. Hideout levels, inventory and station timers stay unchanged because no verified local source exposes them.

### Validation
Latest `npm test` reported 35 passing Node tests; `npm run check`, Sync UI smoke and native `npm run test:sync` passed. Fixtures covered mode/source discovery, freshest-root selection with a stale candidate, stale mode rejection, multiple quest records on one line, pending progress and queue replay after explicit profile selection, appended-log watching, manual progress preservation, unlabeled/ambiguous screenshot maps, pause persistence, inbox write retry and unavailable hideout data. Installed client logs exposed session-mode metadata only; fixture results do not establish real automatic quest/raid or hideout sync.

### Definition of Done
The best-effort local Sync flow is implemented. Real quest/raid log payload availability, hideout/inventory sync, BSG approval and live-game behavior remain unverified. Auto-discovery compares application-log activity across known roots and preserves a valid configured path; a multi-root fixture covers this selection rule. The actual installed logs still confirm mode metadata only.

## TASK-005 — Advanced Questie-style planning and companion features

Status: implemented locally / parity and live acceptance pending
Priority: high
Owner: Codex
Type: work

### Goal
Extend the external companion with bounded advanced map, hideout, economy, stats and private LAN features while keeping manual controls and honest evidence boundaries.

### Scope
Advanced companion modules, tests, data/reference migration and canonical documentation. No game hooks, injection, automatic game actions, internet relay or paid services.

### Acceptance
Add screenshot quaternion last-facing estimate, per-map container visibility and multi-item map chips, owned-key door filtering, clickable hideout layout, manual Bitcoin interval net/payback, craft favorites, manual trader restock timer, weekly recorded-raid stats, cached community observation history, LAN QR pairing and a quick setup guide. Preserve legacy local state and remove retired compiled application artifacts as directed by the owner.

### Validation
`prepare-data` migration passed; npm audit reported 0 vulnerabilities. 28 Node tests and syntax checks passed, as did feature UI, map UI, minimap, screenshot watcher, advanced filter regression, Electron native overlay/QR/phone checks on Electron 41.10.6. These use fixtures and generated data, not a live Tarkov session. Details: `companion/evidence/task-005-validation.md`.

### Definition of Done
The bounded package is implemented locally. Full Questie parity, real automatic quest/raid log payloads, live map/facing accuracy, BSG permission, exclusive fullscreen, and live in-game acceptance remain open. Internet relay, global-game Shift-click/icon recognition, canonical story/endings, exact skill and automatic Bitcoin formulas remain absent. The source repository is public; the v0.1.0 portable Windows preview is published as a prerelease. Package build and extracted-ZIP smoke passed; clean-machine and live-game verification remain unclaimed. See `RELEASE_OPERATIONS.md` for artifact hash and test boundaries.

## TASK-004 — Feature expansion, price/quest overlays and saved-control hotkeys

Status: implemented bounded package / locally verified / full parity and live acceptance pending
Priority: high
Owner: Codex
Type: work

### Goal
Owner-requested visual/audio polish, independent overlays, item intelligence and Questie-style planning workflows. Use existing keybind settings and preserve original app/game controls.

### Scope
Companion source/data/tests and canonical records. Optional private LAN sharing chosen from owner response. No game hooks or global Shift-click interception.

### Acceptance
Map/items/quests independently usable; prices include real trader offers; saved controls inspected read-only before F-key preset; quest/hideout/map/gear/trader/squad tools persist; optional sound, OCR, logs and sharing are explicit. Expose unsupported/live-pending behavior honestly.

### Validation
24 Node tests, syntax checks, feature UI, map UI, independent native overlays/phone, audio rendering/preferences and screenshot watcher/restart passed. Earlier browser/desktop/minimap regressions passed during implementation. Exact evidence/files: companion/evidence/task-004-validation.md. Comparison: RESEARCH_AND_COMPATIBILITY.md.

### Definition of Done
This bounded package is implemented and locally verified. Full Questie parity remains open: global Shift-click/icon recognition, internet relay, verified automatic quest/raid/map log payloads, longitudinal wipe economy, canonical story/endings and precise Bitcoin/craft-skill calculations. In-game acceptance/permissions remain pending. Next step: reopen app, use free-key preset, validate known screenshot point and borderless overlay without changing game controls.

TASK-007 refinement: periodic public-data downloads wait for main-planner focus. Local log/screenshot watchers continue quietly while playing, so automatic quest updates do not trigger the public-data download cycle during gameplay.
