First public Windows preview of Tarkov Companion.

## Download and run

Download **TarkovCompanion-0.1.0-win-x64.zip**, extract the entire folder to a writable location, and open **TarkovCompanion.exe**. No Node.js or installer is needed. Keep the files together. This is an unsigned Windows x64 portable build.

Existing Companion profiles remain in `%APPDATA%\TarkovCompanion`; replacing the portable folder preserves them. Export a backup in Preferences when moving computers.

## Included

- Tactical dashboard and original app artwork.
- Reference maps, clear extract/transit markers, quest/loot/key layers and screenshot/manual position tools.
- Separate draggable/resizable minimap, item-price and quest overlays with configurable hotkeys and saved-control conflict checks.
- Quest/task organizer, hideout planner, shopping list, crafts/barters, cultist calculator/timer, ammo and gear tools.
- Community flea/trader references, watchlists and optional local item-name OCR.
- Separate persistent PvP, seasonal PvP and PvE profiles; local backups, raid journal and recorded statistics.
- Private LAN phone/squad sharing and QR pairing.
- One-button Sync: source discovery, public-data refresh and recognized log-event import, with persistent pending records and optional automatic watching.

## Preview limits

Hideout levels, inventory and timers remain manual. Real installed logs exposed session mode only; quest/raid log importing is fixture-tested and live automatic progress is unverified. Screenshot filenames without a map label require manual map selection/import. OCR reads visible names, not item icons, and downloads its English model on first use.

Map geometry is reference data; extract conditions are confirmed manually. Prices are cached community estimates. Full Questie parity, real-game behavior, BSG approval and exclusive-fullscreen overlays are not claimed. Borderless or a second display is the target. The app does not access game memory, inject code, change game controls or automate gameplay/transactions.

This is a free, noncommercial, unofficial companion. Third-party runtime/map notices are included. Optional screen capture remains off unless enabled by the user.

## Validation

35 Node tests and syntax checks passed. The extracted portable executable was checked with an isolated profile and a PATH containing only Windows System32: startup, bundled community data/maps, hideout UI, Sync button, minimap window and close/reopen persistence. These checks do not prove live Tarkov compatibility.

Build source: `361ae5a`. Electron: `41.10.6`. Download `SHA256SUMS.txt` to verify the ZIP checksum.

Report issues at https://github.com/exe-create/TarkovCompanion/issues with the app section, steps and expected result. Do not upload personal game logs, backups or account credentials publicly.
