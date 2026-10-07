# TASK-005 validation record

Date: 2026-10-07

The advanced feature package is implemented locally. It adds screenshot quaternion last-facing estimates, per-map container visibility and multi-item chips, an owned-key door filter, clickable hideout station layout, manual Bitcoin net/payback calculations from a game-entered interval, craft favorites, manual trader restock countdowns, weekly recorded-raid statistics, cached selected/watched-item observation history (up to 120 points with cache deduplication), local QR pairing for the private LAN map, and a quick setup guide. The advanced map filter regression was fixed: delayed `toggle` events from detached detail nodes are ignored, and filter changes retain the user's expanded state. The advanced UI test passed after that fix.

## Files and migration

- `companion/advanced-core.cjs` and `companion/advanced-ui.js`, integrated with the companion core, app, feature UI, server, and desktop sharing flow.
- `companion/tests/advanced-ui.cjs` covers the advanced UI flow. Other focused coverage is under `companion/tests/` for features, map UI, minimap, screenshot watching, overlays, phone pairing and core behavior.
- Maps were migrated to `companion/maps/`; offline preparation inputs are in `companion/reference/Config/` and `companion/reference/Data/`. `npm run prepare-data` passed after migration.
- The retired .NET executable/assemblies, WebView2/.NET runtime bundles, old `Assets/`, `Brand/` and obsolete tools were removed under the owner's superseding direction. User settings and `tracker-state.json` were moved untouched to ignored `local-backups/legacy-state/`.

## Checks reported

- `npm test`: 28 Node tests passed.
- `npm run check`: syntax checks passed.
- `npm run test:advanced`: passed after the detached-toggle/filter-state fix.
- Feature UI, map UI, minimap and screenshot-watcher checks passed.
- Native Electron 41.10.6 map/item/quest overlays, QR generation and phone pairing checks passed.
- `npm audit`: 0 vulnerabilities reported.

Browser and native tests use fixtures, generated inputs or isolated test state; they do not establish behavior in a live Tarkov session. Screenshot-facing direction is fixture-supported only. Source-reviewed client logs exposed no usable quest/raid event payload, so automatic log synchronization is not demonstrated. Live map/facing accuracy, OCR quality, exit accuracy, overlay behavior in exclusive fullscreen, BSG permission and in-game acceptance remain unverified. Full Questie parity is not claimed. Internet relay, global-game Shift-click/icon recognition, canonical story/endings, exact skill calculations and automatic Bitcoin formulas remain absent.

The private GitHub remote exists, but these local changes have not yet been committed or pushed.
