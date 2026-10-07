# TASK-004 — Questie comparison, item intelligence and separate overlays

2026-10-07. Owner request: improve appearance/audio, finish workflows, add saved-control-aware hotkeys, inspect Questie and provide corresponding personal tools. Original packaged app, maps and game controls preserved. No Git repository exists.

## Changed implementation

- `desktop.cjs`, `preload.cjs`, `overlay-manager.cjs`, `keybinds.cjs`: independent map/items/tasks windows, persisted geometry/lock isolation, cursor-region OCR, scan publishing, saved Tarkov key conflict checks, optional log/share IPC. Superseded overlay-desktop.cjs removed.
- `features-ui.js`, `features.css`, `planner-core.cjs`: quest dependency tree and counters, map objectives/loot/locks/switches/presets, key ownership, gear conflicts/ammo compatibility, trader inventory, recommended quests/stat exports, craft margins/timers/favorites, manual special stations/story chapters, item price cards and manual overrides, LAN squad workflow.
- `sharing.cjs`, `phone.html`, `phone.js`, `phone.css`: opt-in token-protected private LAN map, positions, squad needs and matching-map planning. Stop expires pairing links.
- `log-sync.cjs`: opt-in bounded read-only application/push log tails, known-schema parsing, deduplication/cursors, explicit manual import.
- `ui-audio.js`, `ui-audio.css`: quiet local synthesized navigation/click/confirm/error sounds; saved volume/mute.
- `app.js`, `index.html`, `art.js`, `server.cjs`, `scripts/sync.cjs`, `package.json`: integration and visual improvements; retain actual trader buy/sell offers, objective IDs, keys/loot geometry and station bonuses. Refreshed regular/PvE/PvP-season caches at 13:47 UTC.
- Tests: planner/log-sync/sharing, features-ui, overlays-desktop, audio-ui; desktop smoke window-event race corrected. Temporary integration scripts removed.

## Evidence

Passed 24 focused Node tests; syntax checks; existing browser/desktop/minimap checks during implementation; final map-ui, features-ui, separate native overlays/phone, screenshot-watcher restart and audio checks. Audio tested using offline waveform rendering, not speakers. Native overlays test verified four independent windows, clickable Salewa quotes including Therapist, lock/hide isolation, published scan results, LAN phone connection, forbidden unpaired requests and explicit start/stop. Screenshot watcher used filename fixtures only.

Screenshots: `features-tree.png`, `features-workbench.png`, `item-overlay-native.png`, `phone-map.png`. Visually inspected tree, native item card and phone map. Tests use isolated user data under evidence, not real Companion progress.

Read-only Control.ini inspection: schema v4, 80 bindings; MakeScreenshot V; F1–F12 unbound in current file. Preset F6 last position, F7 cursor-name OCR, F8 minimap, F9 item prices, F10 quests, F11 click-through. Preserve custom Companion bindings; reject observed game key conflicts and report unavailable registrations. No game settings written.

Bounded real client-log inspection found PvE session mode and Ping/ExpansionsAccountBonusesAdded notifications, but no usable quest/raid payload. Automatic quest completion, raid tracking and map detection remain fixture-supported/unverified; unknown traces do not alter state.

## Remaining acceptance

Actual in-raid coordinate calibration, OCR, prices/loot freshness, global key response, borderless/real fullscreen and anti-cheat compatibility are untested. Exclusive fullscreen cannot be guaranteed by external desktop windows. No BSG permission guarantee. Global Shift-click/icon recognition, internet relay, verified story/endings, exact Bitcoin/skill calculations and complete Questie parity are not implemented. See canonical RESEARCH_AND_COMPATIBILITY.md comparison.

Final follow-up: generated-image OCR and syntax passed; craft workbench moved above reference lists and lists bounded to scroll panels. Feature UI rerun passed and the updated workbench screenshot was visually inspected.
