<!-- modforge-doc
authority: canonical
load: on-demand
purpose: versioned research and compatibility findings
-->
# Research and compatibility

Record exact versions, evidence/source, confirmed findings, uncertainty, and follow-up work. Do not turn inference into a support claim.

## 2026-10-07 rebuild
- BSG official feed confirms 1.2.0.0 installation complete October 6: https://t.me/s/escapefromtarkovEN . Current license page https://www.escapefromtarkov.com/legals/license_agreement could not be fetched reliably in this session. No primary evidence establishes blanket permission for scanning or overlays.
- Community API https://api.tarkov.dev/graphql returned 422 with GraphQL server unavailable. https://json.tarkov.dev/endpoints and all tested regular/pve/pvp-season items/tasks/maps/hideout/traders/crafts/barters endpoints returned usable data. Sibling `_en` endpoints provide translation dictionaries, verified by live requests.
- Reference screenshot/world-map conversion verified against https://github.com/sayser/TarkovTracker and existing Config/maps.json. Filename position precedes quaternion/time; test handles duplicate screenshot suffix. Geometry and native calibration remain live-pending on 1.2.0.0.
- Cultist community recipe estimates: https://cultistcircle.com/ . Exact reward thresholds/probabilities not confirmed by BSG; keep configurable and avoid guarantees.
- Electron 41.10.6 installed; local OCR uses tesseract.js 6.0.1. Windows Edge used for browser checks. Desktop app, overlay and disk persistence verified without running Tarkov.
# TASK-004/005 feature comparison — 2026-10-07

Reviewed [Questie features](https://tarkovquestie.com/tarkovquestie-features) and [release notes](https://tarkovquestie.com/tarkovquestie-download). These describe the reference product, not permission for this application. The owner's sharing preference is the most convenient/simple option: private LAN first.

| Reference feature | Companion implementation / remaining boundary |
| --- | --- |
| Screenshot live position | Opt-in filename watcher, latest-position hotkey, reference map calibration; no continuous feed/heading. |
| Shift-click item identification | F7 visible-name cursor OCR plus confirmed clickable item gallery and price overlay; global Shift-click/icon identification absent. |
| Phone map | Opt-in private LAN pairing with locally generated QR, follow/pan/zoom and member positions; no internet service or relay. |
| Minimap | Independent draggable/resizable topmost map, saved settings, click-through, nearby exits/objectives. Exclusive fullscreen unverified. |
| Automatic quest sync | Opt-in known-schema client-log importer; real logs did not show usable events. Manual tracking remains authoritative. |
| Quest dependency tree | Searchable prerequisite/unlock tree, rewards, active/done controls and recommendations. |
| Objective checklist | Counters, map pins, active objective overlay, hide/unhide tasks. |
| Hideout profit planner | Source crafts, user fee/fuel inputs, net/hour estimates, shopping requirements. Unknown prices remain unknown. |
| Craft management/special stations | Timers, collection ledger, favorites-only mode and manual special-station timers. Bitcoin net/payback uses a manually entered game interval; no automatic formula or verified skill math. |
| Hideout setup/bonuses | Station levels, upgrade requirements, source bonus listings and clickable station layout. |
| Next quest/stats | Level/trader/prerequisite recommendations, completion/XP summaries, PNG export and weekly recorded-raid stats. |
| Wipe economy | Cached mode-specific quotes, craft margins and watched/selected-item community observation history (120 points with cache dedupe); no longitudinal wipe-economy model. |
| Automatic raid history | Manual journal; recognized log schemas fixture-tested only, real automatic import unverified. |
| Squad positions | LAN peers, screenshot/manual positions with age; no continuous game state. |
| Squad needs | Shared tracked item needs and KEEP callouts. |
| Squad planner | Same-map quest overlap recommendations, mode filtering. |
| Containers/spawns | Community map containers, ground loot, bosses/starts/hazards; per-map container toggles and multi-item chips. Accuracy depends on source and calibration. |
| Ground-loot filter | Item filter with source item quantities/locations. |
| Extract details | Conditions, faction/floor/variant, manual availability, proximity and transits. |
| Keys | Owned-key checklist, needed keys by map/task, source door positions and owned-key door filter. |
| Marker visibility | Layer toggles, marker scale and per-map presets. Screenshot quaternion produces a last-facing estimate; only fixtures support this so far, and live direction accuracy is unverified. |
| Custom pins | Saved manual map pins and notes. |
| Trader inventory | Source buy/sell offers, currencies, loyalty/unlock info and source reset timestamps; not live stock monitoring. |
| Global bindings | Existing preference editor extended; read-only current Control.ini conflict detection and free-F-key preset. |
| Per-map configuration | Saved layer/floor/zoom presets and selected source variants. |

Additional recent reference features: own gear planner warns about known source conflicts/ammo; story chapters are user-authored manual planning, not canonical story/endings. Log inspection found no usable quest/raid event schema, so log-based automation and parity remain unproven. No account/provider fee, game hooks, packet access, input synthesis or market automation. Bounded implementation and fixture/native UI checks passed; no full Questie parity, BSG permission, exclusive-fullscreen or live-game claim is made. Remaining gaps include internet relay, global-game Shift-click/icon recognition, canonical story/endings, exact skill math and automatic Bitcoin formulas.
