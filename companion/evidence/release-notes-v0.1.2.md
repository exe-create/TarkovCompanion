# v0.1.2 — Working Loot & Container Layers

Fixes the AdvancedUI filter error that stopped containers, loose loot and locked-door markers from rendering in v0.1.1. Extra layers now work in the main map and minimap.

Filters save independently per profile and map: container types, item chips, text search and owned-key doors. Existing global filter choices move once to the current map. Saving layer presets preserves filters. Searching for an item enables loose loot automatically.

New original crate, loot, lock and switch symbols distinguish layers; extracts/transits remain above loot. The legend includes containers, loose loot and doors. Counts explain which layers are off or show no matches. Use Show all / Hide all container types or Reset filters to recover hidden markers. Source records describe possible spawns, not actual raid loot. Missing coordinates are skipped; variants without source records say so.

Extract the complete ZIP and run TarkovCompanion.exe after your raid. Close the previous tracker first. Profiles remain in %APPDATA%/TarkovCompanion. Quiet sync behavior is retained; no automatic restart or screen capture.

Validation: 41 Node tests, syntax, map UI, expanded advanced UI and hidden native quiet-sync passed. The exact extracted package passed hidden executable launch, actual container/loot/key marker rendering, map/hideout/Sync/minimap and persistence/reopen with Node unavailable on PATH. Tests do not prove live-game coordinate accuracy, clean-machine behavior, BSG approval or exclusive fullscreen support.

Build: ced1f849cc2f0d6ddf4f79b4298b61a22b3de292. Archive: TarkovCompanion-0.1.2-win-x64.zip (198240059 bytes). SHA-256: e3ce9b30b7c9713c645db3eb24f63d3fc91d10f925b168fcc6f8071a2dde1720.
