# Tarkov Companion

A personal Electron desktop companion. The owner superseded the earlier preserve-the-compiled-app direction: obsolete .NET binaries/runtimes and old Assets/Brand/tools were removed. Existing settings and tracker-state were moved untouched into ignored `local-backups/legacy-state/`. Maps and offline source inputs now live under `companion/maps/` and `companion/reference/{Config,Data}/`. Original generated artwork is implemented across the Companion UI.

## Start

Double-click `Launch New Tarkov Companion.cmd` in the project root, or `Launch Companion.cmd` in this folder. Node.js is required for development commands; the installed Electron runtime launches the desktop app directly.

Browser alternative: `Launch Browser.cmd`, or `npm run dev` and open `http://127.0.0.1:4317`. Native overlay, local OCR and screenshot folder tools require the desktop app.

## Included

- Operations dashboard, pinned raid objectives, player level/faction and personal notes.
- Thirteen reference maps, zoom/pan, floor selection, current community extracts, active/pinned quest markers, manual position and saved personal pins.
- Screenshot position imports using EFT filenames. Opt-in folder monitoring updates your selected map when Tarkov creates a new screenshot. World-coordinate calibration follows the reference tracker. Coordinates outside the selected map are rejected; select the map yourself before a raid.
- Quest search, trader/status filters, prerequisite suggestions, manual task states, objective checkboxes, FIR labels and walkthrough links.
- Hideout built levels and next-upgrade requirements, including FIR item distinctions and construction times.
- Craft input estimates, gross margins, durations and station levels; trader barter requirements and estimated costs.
- Item lookup, 24h flea estimates, latest low offers, price changes, value per slot, watchlists, keep/needed flags and sacrifice planning.
- Screenshot-assisted OCR item lookup, requiring you to confirm the candidate. This is text recognition of visible item names, **not RatScanner-style icon recognition**. Crop an item inspection/name panel for better results.
- Five-slot cultist base-value calculator, adjustable target and persistent manual-duration timer. No reward guarantees or fixed probabilities.
- Combined shopping list for active/pinned quests and next hideout upgrades, separate FIR/non-FIR inventory counts, text export.
- Ammo damage/penetration comparison; manual raid journal.
- Separate persistent PvP, seasonal PvP and PvE data caches and profiles. Export/import local JSON backups.
- Floating desktop overlay with map, market, quests and shopping views, opacity and click-through controls.
- Advanced map layers with per-map container visibility, multi-item chips and owned-key door filtering; screenshot quaternion last-facing estimate (fixture-supported; live accuracy unverified).
- Clickable hideout station layout, manual Bitcoin net/payback interval, favorites-only craft view, manual trader restock countdown, and weekly recorded-raid stats.
- Watched/selected-item community observation history with up to 120 cached points and cache deduplication; optional local QR pairing for the private LAN phone map.
- Quick setup guide for first launch and overlay use.

## Map artwork and exfil board

The custom style is distressed tactical screenprint with tattoo-flash accents: bone, olive, charcoal, brass and rust. Five atlases contain 72 sprites (including 32 character portraits), plus a painted industrial/operator header. Images appear in navigation, page headings, dashboard cards, action buttons, map legend, map markers and threat dossiers. The generated PNGs remain unmodified; CSS samples their cells. Exact built-in imagegen prompts and source references are recorded in `art/manifest.json`.

Extracts have large exit-door emblems and EX badges. Transits have separate blue arrow emblems, TR badges and destination names. The exit board sorts by horizontal distance from your **last recorded position**. Click an entry to center it on the map. Marker sizes stay readable when zooming. Non-usable exit names are hidden until hover/focus to reduce clutter. Use Hide names for denser maps.

Green dashed rings mean **nearby and not manually blocked**; solid green nearby markers mean **you manually confirmed availability**. Default radius is 25m and can be changed to 10/25/50/100m. Extract/transit geometry uses XZ distance to the source polygon (or point when no polygon exists). Known Y coordinates must match the source's vertical region with a small tolerance. Manual map placement estimates XZ; floor height remains unverified and is labeled accordingly. Proximity never proves game eligibility or starts an extraction timer.

Select PMC/scav role and source map variant (night, Ground Zero 21+, Labs Dark, etc.) where provided. Availability checks persist per profile, game mode, exact source variant and exit identity. **New raid / clear checks** clears checks and the old location without changing quests, inventory, pins or progress. Confirm exits again each raid. Source restrictions and transfer items remain visible.

Bosses, potential spawns and hazards are optional map layers. All-faction spawns use a combined symbol. The threat dossier has individual boss/guard portraits, including the Goons, Wedge variants, event variants, PMCs/scavs, rogues, cultists and named guards. These are source spawn areas and original artistic interpretations—not live enemies. Boss source group probabilities can have event/trigger conditions and are not guaranteed encounter odds. Variant maps can have no exit data; the app does not fabricate exits for them.

## Desktop controls

| Control | Action |
| --- | --- |
| Tarkov's own screenshot key | Creates a normal game screenshot; opt-in folder monitoring reads only its filename |
| F6 (legacy Ctrl+Shift+M) | Imports the newest image filename in the selected screenshot folder |
| F8 (legacy Ctrl+Shift+O) | Shows/hides the floating overlay |
| F7 (legacy Ctrl+Shift+F) | One screen OCR scan, only when enabled in Preferences |
| F11 (legacy Ctrl+Shift+X) | Toggles overlay click-through; use again to restore interaction |
| Ctrl+Shift+T | Brings the main Companion forward |
| Ctrl+Shift+C | Centers the minimap on your last position |
| Ctrl+Shift+Up / Down | Minimap zoom in / out |
| Double-click map | Sets manual position |
| Shift-click map | Adds a labeled personal pin |

The app never sends input to the game. Hotkeys may conflict with other apps. The overlay is an ordinary topmost desktop window; exclusive fullscreen may hide it.

## Data and progress

Live refresh uses public `https://json.tarkov.dev/{mode}/...` endpoints and English translation dictionaries. The old GraphQL endpoint returned HTTP 422 during development. Caches are written only after all required data validates. Prices are community estimates and include individual item timestamps; they are not executable market offers. Refresh explicitly from Preferences or Flea intelligence.

The checked game patch is **1.2.0.0**, installed October 6, 2026 according to BSG's official feed. Community data fetched October 7 does not prove every post-patch rule is represented. Map geometry/calibration remains the original reference; extract/quest positions refresh separately. Special extract conditions must be checked in game.

Desktop progress: `%APPDATA%\TarkovCompanion\state.json`. Browser progress: local storage for the browser origin. Desktop restores its disk state across its local server's port changes. The renderer and overlay synchronize local profile edits. Backups contain all Companion profiles; imports require confirmation and export the previous state first. Existing `tracker-state.json` is never modified or automatically migrated.

OCR operates locally; its English language model is downloaded on first use. Imported images and captured pixels are not sent to a recognition service. Capture uses the display nearest your cursor and temporarily hides the Companion windows. Prefer cropped image imports for accuracy.

## Game rules

The app does not read game memory, inject code, hook rendering/input, intercept traffic, control the player or automate market transactions. Screen capture, screenshot filename monitoring and bounded read-only client-log import are **disabled by default**.

BSG approval for screenshot automation and third-party overlays has **not been verified**. External design alone cannot establish compliance with the game's license. Use the detached planner or a second display as the conservative default; assess the current rules before opting into scanning or in-game overlay use. The project makes no guarantee against anti-cheat action. No BSG credentials are required.

Sources: [BSG official update feed](https://t.me/s/escapefromtarkovEN), [license agreement](https://www.escapefromtarkov.com/legals/license_agreement), [tarkov.dev](https://tarkov.dev/api/), [community cultist calculator](https://cultistcircle.com/), [reference tracker](https://github.com/sayser/TarkovTracker). Existing map assets retain their original attribution. This is an unofficial personal-use companion, not affiliated with BSG.

## Verification

From this folder:

```powershell
npm test
npm run check
npm run test:ui
npm run test:desktop
npm run test:ocr
node tests/screenshot-watch.cjs
node tests/quest-items-ui.cjs
npm run test:map-ui
npm run test:minimap
```

UI/OCR tests use installed Microsoft Edge. Native tests use an isolated progress directory under `evidence/` and never touch real game files. OCR and screenshot tests use generated images/filenames. In-raid map accuracy, real screenshot OCR, anti-cheat compatibility, shortcut conflicts and exclusive-fullscreen behavior remain live-pending. Test screenshots are in `evidence/`.

Rebuild caches with `npm run prepare-data`; refresh current modes with `npm run sync -- regular`, `npm run sync -- pve`, and `npm run sync -- pvp-season`. Map assets are in `maps/`; offline reference inputs are in `reference/`. The app uses Electron 41.10.6. `npm install` restores dependencies; if your npm blocks dependency install scripts, explicitly run `node node_modules/electron/install.js` to install Electron's runtime. No paid provider, subscription or fallback is configured.

## Compact minimap and refreshed desktop style
Close and reopen Companion after this upgrade. The overlay opens as a compact reference minimap. Drag its top bar to move; drag the lower-right corner or native edge to resize. Size and position survive restart and are clamped to connected displays. Preferences offers Reset minimap size / position. Lock lets mouse clicks pass through; its banner shows your unlock hotkey. Recreating/restarting opens unlocked.

Follow centers your last screenshot/manual position; dragging the map changes to Free pan. Center returns to your point without changing follow preference. Zoom/follow persist in settings. Reopening or switching maps centers the saved position while retaining your follow choice. Map, floor, source variant and PMC/scav role can be selected. The readout shows position age and the nearest candidate exit; availability stays manual. No live movement or heading is inferred.

Preferences lists configurable global bindings, their current registration status and Restore defaults. Click a binding then press your combo, or Backspace to disable, then Save. Global bindings may be unavailable when another app owns them. Local controls: Ctrl+1–9 sections, Ctrl+, Preferences, Ctrl+K search, ? help; on maps +/− zoom, Home fit, C center. Typing controls are protected. Escape hides an interactive overlay or dismisses help.

The native window uses topmost screen-saver level, skipTaskbar and showInactive. Windowed/borderless is the target; **exclusive fullscreen can hide desktop overlays** and is not guaranteed. Use borderless or a second display. No game rendering/input hooks were added.

Original full-app background: art/operations-background-v1.png, generated using built-in image_gen. Exact prompt in art/manifest.json and art/background-prompt.txt. Cards/navigation/buttons use readable dark panels over it. Native preferences are stored separately at %APPDATA%/TarkovCompanion/desktop-preferences.json; progress remains state.json.

Evidence and exact changes: evidence/task-003-validation.md. Native behavior is locally checked; real Tarkov display/shortcut testing remains pending.
# New item/quest overlays and Field tools

Close and reopen the app to load this upgrade. Preferences keeps the existing keybind editor and shows conflicts against your saved Tarkov controls. With the currently free keys, the preset is **F8 map, F9 item prices, F10 quests, F6 latest screenshot position, F7 cursor-name OCR, F11 click-through**. Custom Companion bindings are preserved. Tarkov's saved screenshot key is V and is not changed. Use Preferences → Use free F-keys if needed. An unavailable shortcut can be changed or disabled.

Each overlay has its own drag/resize position and lock. Hover an item's visible name in the game and use F7 after enabling screen OCR; confirm the detected variant in the item overlay. Or search and click an item directly. Cards show cached flea low/average, trader buy/sell offers, price age, per-slot value, quest/hideout/squad needs and craft/barter uses. Refresh fetches community quotes; it does not inspect the game or execute market trades. Name OCR does not recognize icons or intercept Shift-click.

Field tools contains the quest tree, owned keys, gear planner, trader inventories, progress/recommendations, squad and manual story planner. Crafts now includes margin estimates, fee/fuel inputs, favorites and timers; Hideout displays source station bonuses. Map tools include loot/containers, key doors, switches, marker scale, per-map presets and objective overlay. Right-click the map for quick tools. Preferences controls quiet UI sound volume/mute. Special-station timers and story chapters use your manual game information.

For phone/squad: Field tools → Squad → Start private LAN room, then open the displayed pairing link on a phone using the same network. Another Companion can join via that link. Positions are screenshot/manual updates, with age shown. Stop closes the room and expires its link. Treat the link as a password. No account or cloud setup; Windows/network policy may require allowing local network access. Internet friends are not supported by this version.

Optional log import: select the client Logs folder and correct profile in Preferences, then explicitly import or enable watching. Only recognized quest/raid event schemas are accepted. Current real log inspection found no usable quest/raid payload, so automatic game synchronization is **unverified**. Manual tracking remains available. Full Questie parity is not claimed; exact comparison is in docs/production/RESEARCH_AND_COMPATIBILITY.md.

Added checks: `npm run test:features`, `npm run test:overlays`, `npm run test:audio`, `npm run test:advanced`. Task 005 focused checks and limits: `evidence/task-005-validation.md`.
