<!-- modforge-doc
authority: canonical
load: on-demand
purpose: release packaging hotfix rollback and compatibility policy
-->
# Release operations

## Published v0.1.2 map-layer hotfix

Public prerelease: https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.2. Build `ced1f849cc2f0d6ddf4f79b4298b61a22b3de292`, Electron `41.10.6`; ZIP `TarkovCompanion-0.1.2-win-x64.zip` (198240059 bytes), SHA-256 `e3ce9b30b7c9713c645db3eb24f63d3fc91d10f925b168fcc6f8071a2dde1720`.

Exact extracted package passed hidden native startup, real container/loot/key marker rendering, maps/hideout/Sync/minimap, persistence and reopen with Node unavailable on PATH. 41 Node tests, syntax, map/advanced UI and quiet native checks passed. Anonymous downloads returned HTTP 200 and the GitHub asset digest/size matched. Release notes: companion/evidence/release-notes-v0.1.2.md. Profiles are preserved; the running old version needs an intentional restart after a raid. Clean-machine, real-game coordinates, BSG approval and exclusive-fullscreen acceptance remain unverified.

## Published v0.1.1 quiet sync preview

Public prerelease: https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.1. Build commit `53524c98c8500e504ee45517ef7bb1d6fa60a3b4`, Electron `41.10.6`; artifact `TarkovCompanion-0.1.1-win-x64.zip` (198,238,532 bytes), SHA-256 `4cb122146f8e190e505b447abd55bf6a5d81ae62b9bfee8fb6906a3b868c31db`.

The exact extracted archive passed hidden native executable startup, community data/map assets, hideout, Sync/minimap access, isolated profile persistence and close/reopen with PATH restricted to System32. Hidden tests register no global keys and show no windows. 41 Node tests, syntax and focused UI/native regressions passed. Anonymous public release metadata, ZIP/checksum HTTP 200 and GitHub asset digest/size were verified. Package privacy and shipped production dependency/license checks passed. Release notes: `companion/evidence/release-notes-v0.1.1.md`.

Scheduled public downloads wait for main-planner focus; local opt-in watchers retain updates quietly. Do not restart the user's running application automatically. Update intentionally after a raid and preserve `%APPDATA%/TarkovCompanion`. Quest-event tests use fixtures; inspected installed logs exposed mode metadata only. Missing quest progress, hideout and inventory require manual entry. Clean-machine, live-game, BSG approval, anti-cheat and exclusive-fullscreen acceptance remain unverified. The same packaging/provenance gates below apply.

## Published v0.1.0 portable Windows preview

Status: published prerelease. The public source repository is https://github.com/exe-create/TarkovCompanion. Release page: https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.0. Build commit `361ae5a`, Electron `41.10.6`; artifact `TarkovCompanion-0.1.0-win-x64.zip` (198,233,338 bytes), SHA-256 `a873f10f1265be76750b6c6d1bfb4e9ece2b6a3746fc363ac9f0e18a87d0e244`.

### Packaging and QA gates

- The owner has authorized publishing a binary preview; no additional owner-approval gate is pending. Do not describe the source code as open source or claim BSG approval.
- The portable package includes thirteen base map files and the upstream [map project](https://github.com/the-hideout/tarkov-dev-svg-maps) attribution/license/readme in `licenses/maps` (also under `resources/app/licenses/maps`). It excludes unused interactive map assets, raw art/references, and offline reference source files. The upstream project declares CC BY-NC-SA 4.0 and describes its additional restriction as targeting cheating/ESP/pixel bots; this companion does not use those features. This records provenance and included notices, not legal clearance.
- Include notices for all shipped third-party runtime components and ship only production dependencies. The owner will include upstream license/readme and runtime licenses with the release materials.
- The published ZIP and checksum return HTTP 200; GitHub's asset digest matches the recorded SHA-256 and size. The exact extracted ZIP passed an isolated smoke test with `PATH` restricted to System32: executable startup, app data/maps/hideout/Sync/minimap flows, isolated persistence, and close/reopen. 35 Node tests and syntax checks passed. This does not establish clean-machine or live-game behavior; preserve that limitation in release notes.
- Run the release smoke/privacy audit against the produced package and retain the resulting hash/build metadata; a test of the packaging script alone is not package validation.
- Preserve existing save/profile data. Keep BSG approval, anti-cheat compatibility, real-game behavior, and true exclusive-fullscreen support unclaimed/unverified.

Publication and asset digest verification are confirmed. If the artifact changes, rebuild, rerun package validation, and update these records.
