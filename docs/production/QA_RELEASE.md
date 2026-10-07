<!-- modforge-doc
authority: canonical
load: always
purpose: verification and release contract
-->
# QA and release contract

Use explicit evidence levels: Planned → Implemented → Offline verified → Live/Integration verified (when applicable) → Release ready.
Never treat implementation alone as release evidence.

## TASK-001 evidence, 2026-10-07
Implemented and locally verified. Run from `companion/`: `npm test` (seven tests), `npm run check`, `npm run test:ui`, `npm run test:desktop`, `npm run test:ocr`, `node tests/screenshot-watch.cjs`, `node tests/quest-items-ui.cjs`. All passed at this checkpoint. UI evidence PNGs: overview, maps and overlay in `companion/evidence/`.

Tests isolate native state under evidence directories. Browser workflow tests persist task/pin state, modify hideout/inventory, inspect flea/cultist/journal/ammo and switch to PvE. Native tests verify disk state and floating window. Screenshot filename fixtures validate file notifications and restart continuity; OCR uses a generated image, not Tarkov runtime.

Live gate: real EFT screenshot filename/location, map floor/calibration, real item-name OCR accuracy, shortcut conflicts, fullscreen behavior. BSG rules/approval remain unresolved. No anti-cheat safety claim, installer certification, publication or release-ready status. The public source repository is not described as open source. The owner authorized a planned portable binary preview, which has not been published.

## TASK-002 evidence, 2026-10-07
`npm test`: fourteen focused tests passed. `npm run check`: renderer, art, map UI/logic, desktop, server, preload and sync syntax passed. `npm run test:map-ui`, `npm run test:ui`, `npm run test:desktop`: passed. Art PNGs inspected visually and alpha inspected without modifying generated images. Dedicated map test verifies transit coordinates, proximity vs availability, blocked exits, saved checks, portraits, marker size across zoom, exit centering, variant isolation, new-raid reset and overlay layout. Independent review fixed the all-faction spawn label.

Green remains a local planning indication from the last recorded position. Source geometry, actual raid availability, floor alignment and in-game/anti-cheat compatibility remain live-pending. Source map variants can legitimately have empty extract/transit arrays.

## TASK-003 evidence, 2026-10-07
Passed npm test (14), npm run check, test:ui, test:desktop, test:map-ui and test:minimap. Native minimap test uses actual pointer resize, validates topmost flag, saves/restores 500x510 geometry, zoom/follow state, verifies lock/unlock, invalid/duplicate bindings, typing guards and help dismissal. Background and minimap previews inspected. No real Tarkov/game-display-mode test performed; Windows topmost flag is not proof of display over exclusive fullscreen.
Official references: https://www.electronjs.org/docs/latest/api/browser-window and https://learn.microsoft.com/en-us/windows/win32/direct3d9/windowed-vs-full-screen-mode .
Independent TASK-003 review corrected free-pan reopen centering and flushes final bounds before immediate exit. Native test:minimap now asserts both behaviors, including final 510×520 restore after close without debounce delay.

## Public preview gate, 2026-10-07
The source repository is public at https://github.com/exe-create/TarkovCompanion. A v0.1.0 portable Windows preview is planned and has not been published. Recent local evidence is recorded in `companion/evidence/task-005-validation.md` and `docs/production/WORK_QUEUE.md`; it is not a portable-package or clean-machine release test.

Before publishing a binary, produce the portable package without user-state/backups or unrelated development tooling, include notices for shipped runtime dependencies, and launch/test that exact package on a clean Windows profile without a development Node installation. The portable runtime excludes unused maps/interactive map assets, raw art/references, and offline reference source files; upstream map attribution and license files remain in the public source repository. Keep BSG permission, game-runtime acceptance, and exclusive-fullscreen support explicitly unresolved. Do not call the preview published until a release asset is uploaded and its contents are verified.
