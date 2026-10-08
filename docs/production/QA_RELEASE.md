<!-- modforge-doc
authority: canonical
load: always
purpose: verification and release contract
-->
# QA and release contract

## TASK-007 / v0.1.1 evidence
41 Node checks and syntax passed. Browser UI, original quest-board groups/toggle/card selection, audio preferences, native Sync and screenshot watcher/restart passed. Hidden native quiet-sync verifies focused input stays connected/value/caret focus survives a background refresh; recognized ready/completed records update the plan; refresh errors/ambiguous screenshots produce no toast calls, open dialogs, extra native windows, window visibility or focus. Hidden test registers no global keys. New source-state tests protect manual quest/objective corrections, reject stale/mismatched modes, retain readiness as active and handle recent new sessions/truncated files after downtime. A headless screenshot of the original task board was inspected. Tests use fixtures, not Tarkov. No clean-machine, live-game, anti-cheat approval or zero-FPS-impact claim. Portable v0.1.1 was published after the exact extracted ZIP passed hidden native launch, map assets, hideout, Sync, minimap and isolated persistence/reopen with Node unavailable on PATH. Anonymous ZIP/checksum HTTP 200 and GitHub digest/size verification passed. Build/hash are in RELEASE_OPERATIONS.md.

Use explicit evidence levels: Planned → Implemented → Offline verified → Live/Integration verified (when applicable) → Release ready.
Never treat implementation alone as release evidence.

## TASK-001 evidence, 2026-10-07
Implemented and locally verified. Run from `companion/`: `npm test` (seven tests), `npm run check`, `npm run test:ui`, `npm run test:desktop`, `npm run test:ocr`, `node tests/screenshot-watch.cjs`, `node tests/quest-items-ui.cjs`. All passed at this checkpoint. UI evidence PNGs: overview, maps and overlay in `companion/evidence/`.

Tests isolate native state under evidence directories. Browser workflow tests persist task/pin state, modify hideout/inventory, inspect flea/cultist/journal/ammo and switch to PvE. Native tests verify disk state and floating window. Screenshot filename fixtures validate file notifications and restart continuity; OCR uses a generated image, not Tarkov runtime.

Live gate: real EFT screenshot filename/location, map floor/calibration, real item-name OCR accuracy, shortcut conflicts, fullscreen behavior. BSG rules/approval remain unresolved. No anti-cheat safety claim, installer certification, or live-game release-ready claim. The public source repository is not described as open source. The v0.1.0 portable binary prerelease has since been published; its verification is below.

## TASK-002 evidence, 2026-10-07
`npm test`: fourteen focused tests passed. `npm run check`: renderer, art, map UI/logic, desktop, server, preload and sync syntax passed. `npm run test:map-ui`, `npm run test:ui`, `npm run test:desktop`: passed. Art PNGs inspected visually and alpha inspected without modifying generated images. Dedicated map test verifies transit coordinates, proximity vs availability, blocked exits, saved checks, portraits, marker size across zoom, exit centering, variant isolation, new-raid reset and overlay layout. Independent review fixed the all-faction spawn label.

Green remains a local planning indication from the last recorded position. Source geometry, actual raid availability, floor alignment and in-game/anti-cheat compatibility remain live-pending. Source map variants can legitimately have empty extract/transit arrays.

## TASK-003 evidence, 2026-10-07
Passed npm test (14), npm run check, test:ui, test:desktop, test:map-ui and test:minimap. Native minimap test uses actual pointer resize, validates topmost flag, saves/restores 500x510 geometry, zoom/follow state, verifies lock/unlock, invalid/duplicate bindings, typing guards and help dismissal. Background and minimap previews inspected. No real Tarkov/game-display-mode test performed; Windows topmost flag is not proof of display over exclusive fullscreen.
Official references: https://www.electronjs.org/docs/latest/api/browser-window and https://learn.microsoft.com/en-us/windows/win32/direct3d9/windowed-vs-full-screen-mode .
Independent TASK-003 review corrected free-pan reopen centering and flushes final bounds before immediate exit. Native test:minimap now asserts both behaviors, including final 510×520 restore after close without debounce delay.

## Published portable preview, 2026-10-07
The source repository is public at https://github.com/exe-create/TarkovCompanion. The v0.1.0 portable Windows preview is published as a prerelease: https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.0. Existing feature evidence is recorded in `companion/evidence/task-005-validation.md` and `docs/production/WORK_QUEUE.md`.

2026-10-07 portable build: commit `361ae5a`; Electron `41.10.6`; `TarkovCompanion-0.1.0-win-x64.zip`, 198,233,338 bytes, SHA-256 `a873f10f1265be76750b6c6d1bfb4e9ece2b6a3746fc363ac9f0e18a87d0e244`. The public ZIP and checksum returned HTTP 200; the GitHub asset digest matches this SHA-256 and the published size. The exact extracted ZIP passed smoke testing with `PATH` restricted to System32: executable launch, data/maps/hideout/Sync/minimap access, isolated persistence, and close/reopen. 35 Node tests and syntax checks passed. This is an extracted-package smoke test, not clean-machine or live-game verification.

The portable runtime includes thirteen base map files with the upstream attribution/license/readme under `licenses/maps` and `resources/app/licenses/maps`; unused interactive map assets, raw art/references, and offline reference source files are excluded. Keep BSG permission, game-runtime acceptance, and exclusive-fullscreen support explicitly unresolved.

TASK-007 refinement: periodic public-data downloads wait for main-planner focus. Local log/screenshot watchers continue quietly while playing, so automatic quest updates do not trigger the public-data download cycle during gameplay.

## v0.1.2 map-layer hotfix evidence

Local follow-up: restored an uncommitted reversion of advanced-ui.js after preserving it under ignored evidence. Hidden native validation with copied saved state loaded factory/customs/woods/shoreline/interchange/lab/reserve/lighthouse/streets/groundzero/terminal/labyrinth/icebreaker. No page errors; enabled layer rendering, reset and bulk visibility passed. Original state remained untouched. Terminal's selected source had zero matching in-bounds markers; Icebreaker had no container records but rendered 78 loot and 11 key markers. These are cached reference data counts, not current raid availability. Source matches the published fixed module; the user's launcher choice is still unconfirmed.

BUG-002 / TASK-008: 41 Node tests, syntax, advanced UI, map UI and hidden native quiet-sync passed. Expanded advanced UI checks enable all three affected layers, assert real markers, validate bulk container visibility, zero-match/reset, map isolation, saved preset/reload persistence and minimap layers. Screenshot inspected: companion/evidence/map-loot-filters.png. The exact extracted ZIP passed hidden native executable launch, actual container/loot/key markers, map/hideout/Sync/minimap and isolated persistence/reopen with PATH restricted to System32. No live-game or clean-machine claim. Anonymous ZIP/checksum HTTP 200 and asset digest/size verified.
