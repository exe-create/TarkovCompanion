# Tarkov Companion

Personal external Escape from Tarkov planning app: maps, separate minimap/item/quest overlays, quests, hideout, crafts, cultist planner, flea/trader references and private LAN phone/squad tools.

The source repository is public at [exe-create/TarkovCompanion](https://github.com/exe-create/TarkovCompanion). The v0.1.2 portable Windows preview with repaired loot/container layers, quiet sync and the original raid task board is published as a prerelease on [GitHub](https://github.com/exe-create/TarkovCompanion/releases/tag/v0.1.2). Update after your raid; profiles remain in `%APPDATA%/TarkovCompanion`. The source code is not described as open source, and no BSG approval is claimed. See [release verification](docs/production/RELEASE_OPERATIONS.md) for the archive checksum and test scope.

On Windows, open **Launch New Tarkov Companion.cmd**. Source, dependencies and reference assets live in `companion/`. See [usage and setup](companion/README.md).

Fresh checkout:

```powershell
cd companion
npm ci
node node_modules/electron/install.js
npm start
```

Progress stays at `%APPDATA%/TarkovCompanion`; it is not committed. Obsolete tracker progress/settings are preserved under ignored `local-backups/legacy-state/`. The old compiled .NET tracker is retired. No paid service, game hooks or market automation.

Checks: `npm test`, `npm run check`, `npm run test:features`, `npm run test:overlays`, `npm run test:minimap`. Live game acceptance and complete Questie parity remain open; consult [comparison](docs/production/RESEARCH_AND_COMPATIBILITY.md) and [current state](docs/production/CURRENT_STATE.md).
