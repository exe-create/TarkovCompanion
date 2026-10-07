<!-- modforge-doc
authority: canonical
load: on-demand
purpose: release packaging hotfix rollback and compatibility policy
-->
# Release operations

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
