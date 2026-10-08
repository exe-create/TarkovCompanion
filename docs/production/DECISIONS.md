<!-- modforge-doc
authority: canonical
load: always
purpose: settled decision ledger
-->
# Active decisions

## DEC-012 — Background work cannot interrupt play
2026-10-07: Background checks/watchers only update local state and retain status for later inspection. Never call modal/window focus/show or screen capture from automatic sync. No toast/audio on automatic updates/failures; no global shortcut re-registration during periodic refresh. Defer DOM replacement while focused or in a dialog. Manual controls still open explicitly requested UI. Keep personal quest status separate from community definitions; do not infer completion from counters, hand-in readiness or prerequisites. Source timestamps/manual corrections govern updates; auto priorities are computed rather than inserted into manual pins. Test native background behavior in hidden isolated windows without registering shortcuts. No blanket claim about live-game performance or BSG approval.

Record durable product/architecture/operating decisions here so agents do not repeatedly reopen them.

## DEC-001 — Electron companion and owner-directed legacy retirement
2026-10-07: Build Electron with a plain HTML/CSS/JavaScript renderer and loopback Node server in `companion/`. The owner later superseded the earlier instruction to preserve the compiled tracker: retired .NET executable/assemblies, bundled runtimes, old Assets/Brand and obsolete tools were removed. User settings and tracker-state were moved untouched to ignored `local-backups/legacy-state/`; maps and offline inputs moved to `companion/maps/` and `companion/reference/{Config,Data}/`. Desktop disk backups restore renderer state across local server port changes.

## DEC-002 — External and manual by default
No memory inspection, injection, game hooks, traffic capture, input synthesis or market actions. Overlay is a topmost desktop window. Screen OCR, screenshot filename monitoring and read-only application/push client-log import are explicit opt-ins. Log import recognizes known event schemas only; current real logs have not provided usable quest/raid events. No BSG compliance guarantee; detached planning is the default.

## DEC-003 — Community cache with provenance
Use tarkov.dev's working JSON endpoints and sibling English translation dictionaries for regular, pve and pvp-season. GraphQL returned 422 unavailable. Refresh only replaces caches after complete successful normalization. Keep legacy reference geometry under `companion/reference/` and do not mislabel it as current patch geometry.

## DEC-004 — Cultist estimates are configurable
Use up to five item base values, an adjustable community-estimated target and the duration entered from the game. No guaranteed reward or fixed success-probability claim. The owner supplied the cosmetic brief in TASK-002; original artwork is now implemented.

## DEC-005 — Proximity and availability are separate
2026-10-07: Use a green dashed nearby ring based on the last recorded XZ position and Y when known. Solid green nearby markers require manual availability confirmation. Do not infer open exits from proximity, source probabilities, switches or missing faction fields. Checks key by profile/mode/source variant/exit/faction/coordinates; a new-raid action clears checks and position only.

## DEC-006 — Original sprite atlases with accessible controls
2026-10-07: Generate original distressed tactical/tattoo-flash atlases via the built-in imagegen tool, preserve PNG alpha and sample cells with CSS. Keep text labels and accessible names; images supplement controls. Use original boss/guard interpretations, based on source portraits for new Wedge/named-guard identities. Preserve migrated map geometry as reference data, not as a claim of current-patch accuracy. Record exact prompts and source URLs in the art manifest.

## DEC-007 — External minimap and explicit fullscreen boundary
2026-10-07: Compact map uses screenshot/manual position, no live heading or continuous game feed. Show reference-view and position age; follow centers the last recorded position and drag switches to free pan. Use topmost screen-saver layer, showInactive and skipTaskbar, but do not promise true exclusive fullscreen. Use borderless or a second display when desktop composition hides the window. No game injection/hooks.

## DEC-008 — Desktop preferences separate from progress
2026-10-07: Bounds, opacity and global binding registration live in desktop-preferences.json alongside state.json, avoiding frequent native window changes rewriting profile snapshots. Clamp restored bounds to available displays; click-through resets unlocked after window recreation. Shortcut failures are visible; bindings are user-configurable and may be disabled. Minimap follow/zoom remain in existing settings/backups.
## DEC-009 — Saved controls and simple private sharing

2026-10-07: Read Control.ini without writes and use the existing Companion keybind editor. Free-F-key defaults migrate only legacy/empty bindings; retain custom preferences. Current saved game controls leave F1–F12 free and use V screenshots. Reject observed game key conflicts and expose registration failures. Provide independent external map/items/tasks windows.

Owner chose whichever sharing is most convenient/simple: opt-in token-protected private LAN, no account, internet relay or paid provider. Stop invalidates the pairing link. Optional log import is bounded application/push reads only; never infer completion from unknown traces. Real automatic events remain unverified.

## DEC-010 — Preserve state while retiring the compiled tracker
2026-10-07: Follow the owner's superseding direction to remove the obsolete compiled application and bundled runtimes. Preserve user settings/progress byte-for-byte in ignored `local-backups/legacy-state/`; keep migrated maps and offline input data in the companion tree. The source repository is public at https://github.com/exe-create/TarkovCompanion. The owner-authorized v0.1.0 portable Windows prerelease is published at https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.0. Build and extracted-ZIP smoke evidence is recorded in `QA_RELEASE.md`; BSG approval and live-game behavior remain unverified.

## DEC-011 — Sync only source-confirmed state
2026-10-07: One-button Sync may discover known local Logs/screenshots paths, use a session mode recorded within 24 hours, refresh public community caches, and import recognized quest/raid records. Keep unmatched records in a durable inbox partitioned by mode until a matching profile is selected. When several profiles share a detected mode, require the user to choose; logs do not identify an account. Screenshot positions require a unique filename map label. Do not infer player level, hideout levels, inventory or station timers from the current verified sources; preserve their manual values. Cache refresh failure retains the previous cache. Real client logs currently confirm session-mode metadata only, so fixture parser tests are not proof of live quest/raid sync.

TASK-007 refinement: periodic public-data downloads wait for main-planner focus. Local log/screenshot watchers continue quietly while playing, so automatic quest updates do not trigger the public-data download cycle during gameplay.
