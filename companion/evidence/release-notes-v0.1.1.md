# v0.1.1 — Quiet Sync & Quest Organizer

Background sync now keeps status and errors inside the app without opening dialogs, stealing focus, playing notifications, or rebuilding focused controls. Scheduled community-data downloads wait until the main planner is focused. Opt-in local log and screenshot-filename watchers continue quietly; automatic sync does not start screen capture or OCR.

Recognized local quest records update progress and the original raid task board groups remaining objectives by map, prioritizes hand-ins, and automatically tracks useful tasks while preserving manual pins. Ready to hand in remains distinct from completed. Newer manual corrections are protected from older log records, and recent sessions can be caught up after the app was closed.

Community data supplies definitions and price references, not private account progress. Installed client logs inspected so far exposed mode metadata only; quest-event coverage is based on fixtures. Quest auto-sync therefore depends on usable local records. Hideout levels, inventory and unavailable progress still require manual entry.

Download the Windows x64 ZIP, extract it, and run TarkovCompanion.exe. Close the old tracker and update **after your raid**. Profiles remain in `%APPDATA%/TarkovCompanion`; keep that folder. No installer, automatic restart, paid service, account login or game hooks.

Validation: 41 Node tests, syntax checks, UI/quest board/audio, native Sync, screenshot watcher and hidden native quiet-sync checks passed. The exact extracted archive passed startup, map/hideout/Sync/minimap, persistence and reopen checks with Node unavailable on PATH. Package privacy and dependency/license checks passed. This prerelease has not been verified on a clean machine or in a live Tarkov session. BSG approval, anti-cheat compatibility and exclusive-fullscreen overlays remain unverified; no zero-performance-impact guarantee is made.

Build commit: `53524c98c8500e504ee45517ef7bb1d6fa60a3b4`.
Archive: `TarkovCompanion-0.1.1-win-x64.zip` (198,238,532 bytes).
SHA-256: `4cb122146f8e190e505b447abd55bf6a5d81ae62b9bfee8fb6906a3b868c31db`.
