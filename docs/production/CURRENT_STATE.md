<!-- modforge-doc
authority: canonical
load: always
purpose: current production position and immediate objective
-->
# Current production state

## Current position
2026-10-07: The Electron companion lives in `companion/`; root `Launch New Tarkov Companion.cmd` launches it. The owner superseded the earlier decision to preserve the compiled .NET tracker: its executable, assemblies, WebView2/.NET runtimes, old Assets/Brand and obsolete tools were removed. Original `settings.json` and `tracker-state.json` were moved, without inspection, to ignored `local-backups/legacy-state/`. Maps and offline preparation inputs moved to `companion/maps/` and `companion/reference/{Config,Data}/`. Git is initialized on `main`; private remote `https://github.com/exe-create/TarkovCompanion` exists. Initial source commit f91c690 was pushed to private origin/main; remote head verified.

Implemented: dashboard, thirteen reference maps, manual/imported positions, opt-in screenshot filename monitoring, quest/objective/pin tracking, hideout upgrades and station bonuses, crafts/barters, flea/trader references, optional local item-name OCR, separate map/item/quest overlays, cultist planning/timer, combined shopping list, ammo reference, local profiles/backups, and private LAN phone/squad sharing with locally generated QR codes. TASK-005 adds screenshot quaternion-based last-facing estimates, item/container map filters, owned-key door filters, clickable hideout station focus, a user-entered Bitcoin interval/fuel/investment estimate, craft favorites, manual trader restock countdowns, weekly statistics from recorded raids, observed-price history, and a setup guide.

Live community JSON data fetched for regular, pve and pvp-season. Persistent PvP cache contains 504 tasks, 5,476 items and 26 hideout stations. BSG's official feed confirms patch 1.2.0.0 installed October 6. Geometry/calibration remains the older reference, with live extract/quest positions layered over it. This is not evidence of complete post-patch map accuracy.

TASK-002 adds five generated atlases (72 sprites, including 32 portraits) and one header painting; art appears throughout navigation, buttons, headings, cards, legend, markers and dossiers. Exact prompts/source references are in `companion/art/manifest.json`. Exits/transits use large distinct emblems, destination labels, a distance-sorted exit board and manual availability checks. Green proximity rings use reference XZ/Y geometry and are distinct from confirmed availability. Optional boss/spawn/hazard layers and exact source variants now refresh from live community map data. Generated artwork does not replace source map geometry.

Passed: final reported 28 Node tests and syntax checks; feature browser flow, map UI/minimap, native map/item/quest overlays with QR/phone sharing, OCR, screenshot watcher/restart, quest-inventory/crafting, audio and map/art regression flows. Exact TASK-005 evidence is in `companion/evidence/task-005-validation.md`; earlier evidence remains in `companion/evidence/`. Browser/native fixtures do not establish live Tarkov behavior.

## Immediate goal
TASK-001 through TASK-005 are implemented and locally verified. Keep full Questie parity and live acceptance open. Validate real-game screenshot positioning/facing/OCR, log event schemas, exit accuracy, normal/borderless overlay behavior, and resolve BSG permission uncertainty before treating optional in-game tools as approved. Maintain the private source repository and keep personal progress outside Git.

## Active risks
- BSG screenshot/overlay approval is unverified; capture and folder monitoring default off.
- Community data may lag patch 1.2.0.0; map geometry is reference data.
- OCR matches visible text, not item icons; live recognition is pending.
- Recent client logs exposed no usable quest/raid payload; automatic game synchronization is unverified.
- True exclusive-fullscreen overlays, live map/floor detection, BSG approval, and real-game behavior remain unverified. No installer/signing/public release has been produced.

## TASK-003 desktop/UI update
Compact minimap now replaces the full map page in the overlay. Saved geometry, resize grip, drag header, click-through status, follow/free-pan, local zoom persistence, floor/variant/faction controls, stale-position readout and nearest eligible exit are implemented. Eight global bindings are configurable with Active/Disabled/Unavailable/Duplicate/Invalid feedback. Main background is original operations-room art; controls/cards/navigation polished.
Native test:minimap and existing browser/desktop/map tests passed alongside fourteen Node tests and syntax checks. Evidence: companion/evidence/minimap-desktop.png and overview-background.png. Native fixture tests are not Tarkov runtime evidence. Windowed/borderless uses the highest practical topmost desktop layer and showInactive; exclusive fullscreen may hide it. No rendering hooks or game input added.
# TASK-004 update — 2026-10-07

Added separate map/item/quest overlays, saved-control-aware F6–F11 preset, cursor-name OCR, trader price cards, quiet configurable sounds, quest tree/counters, map loot/key layers/presets, gear/key/trader/stat tools, craft workbench and private LAN phone/squad sharing. Source buy/sell offers fixed and all three caches refreshed. Optional recognized-schema log importer is implemented, but recent real client logs contained no usable quest/raid events; automatic sync is unverified. Manual story/special stations are labeled planning tools.

24 Node checks and final feature/map/native overlay-phone/audio/screenshot-watcher checks passed. Evidence: companion/evidence/task-004-validation.md. Full reference parity, real Tarkov behavior and BSG approval remain pending; comparison/gaps are in RESEARCH_AND_COMPATIBILITY.md. No game controls changed. Original application preserved.

## TASK-005 advanced feature update
The old compiled tracker is retired and its private state is preserved under ignored `local-backups/legacy-state/`. The companion now owns its map and offline reference inputs. Advanced planning adds recorded-price observations, weekly raid summaries, manual Bitcoin economics, craft favorites, trader restock countdowns, container/item/owned-key filters, clickable hideout station focus, facing estimates from screenshot quaternions, and QR-backed private LAN sharing.

Validation: 28 Node tests plus syntax checks, browser feature flow, map UI/minimap, and native three-overlay/QR/phone coverage passed. See `companion/evidence/task-005-validation.md`. Fixtures use synthetic data and do not prove game integration. Automatic log quest/raid sync, full Questie parity, BSG approval, and live/fullscreen acceptance remain open.
