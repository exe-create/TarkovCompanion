# TASK-003 — Desktop minimap and style evidence

2026-10-07. Owner request: expected hotkeys, minimap overlay with drag/resize and display-mode support, main app image/style improvements.

Changed implementation: `desktop.cjs`, `preload.cjs`, `app.js`, `map-ui.js`, `index.html`, `package.json`; added `overlay-desktop.cjs`, `tools-ui.js`, `upgrade.css`, `tests/minimap-desktop.cjs`, `art/operations-background-v1.png`, `art/background-prompt.txt`; updated art manifest/README and companion README. Existing canonical PROJECT/CURRENT_STATE/WORK_QUEUE/DECISIONS/QA_RELEASE/ROADMAP/SOURCE_REGISTRY updated. Original compiled tracker, assets, maps, settings/progress untouched. No Git repository; no Git diff evidence available.

Checks passed: npm test (14 tests), npm run check, npm run test:ui, npm run test:desktop, npm run test:map-ui, npm run test:minimap.

Native minimap coverage: actual resize-corner pointer drag; native topmost flag; 500×510 preview and final 510×520 bounds restored even after immediate close; follow/zoom restored across restart; saved position centered when reopening in free-pan mode; click-through indicator/unlock/restart recovery; duplicate and invalid global bindings; map keys, protected text fields, help/Escape; no renderer errors. Native tests use isolated evidence state and synthetic offline position. Preview PNGs: minimap-desktop.png and overview-background.png, visually inspected. Generated background inspected before consumption, unmodified. Independent review identified and verified fixes for lost final bounds and off-screen position after free-pan restart.

Remaining: real Tarkov screenshot positioning, global shortcut conflicts and overlay visibility in windowed/borderless display modes. True exclusive fullscreen is explicitly unsupported as a guarantee; ordinary desktop overlay may be hidden. No hooks/injection/game automation added. No BSG approval claim. Existing screenshot/OCR opt-ins retained.
