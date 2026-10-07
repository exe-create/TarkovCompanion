<!-- modforge-doc
authority: canonical
load: on-demand
purpose: release packaging hotfix rollback and compatibility policy
-->
# Release operations

## Planned v0.1.0 portable Windows preview

Status: planned, not published. The public source repository is https://github.com/exe-create/TarkovCompanion; GitHub currently has no release. The current `companion/package.json` version is 0.1.0. `companion/scripts/package-windows.cjs` now defines committed-source staging, production dependency install, portable ZIP creation, privacy audit, SHA-256, and build metadata; its presence is not evidence that a release artifact has been built or validated. No clean-machine validation is recorded yet.

### Packaging and QA gates

- The owner has authorized publishing a binary preview; no additional owner-approval gate is pending. Do not describe the source code as open source or claim BSG approval.
- The portable package excludes unused maps/interactive map assets, raw art/references, and offline reference source files. The public source repository retains the map attribution and upstream license/readme. The upstream [map project](https://github.com/the-hideout/tarkov-dev-svg-maps) declares CC BY-NC-SA 4.0 and describes the relevant restriction as targeting cheating/ESP/pixel bots; this companion does not use those features. Preserve its attribution and license text. This is a provenance record, not legal clearance.
- Include notices for all shipped third-party runtime components and ship only production dependencies. The owner will include upstream license/readme and runtime licenses with the release materials.
- Build the portable folder/zip and test that exact artifact on a clean Windows profile without Node.js. Confirm startup, persistence, close/reopen, and that no user settings, legacy backups, credentials, or development-only files are included.
- Run the release smoke/privacy audit against the produced package and retain the resulting hash/build metadata; a test of the packaging script alone is not package validation.
- Preserve existing save/profile data. Keep BSG approval, anti-cheat compatibility, real-game behavior, and true exclusive-fullscreen support unclaimed/unverified.

After those gates, record the artifact filename, hash, build commit, test environment/results, and publication URL here. Until then, report the binary release as pending.
