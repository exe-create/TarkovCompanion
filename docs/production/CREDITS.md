<!-- modforge-doc
authority: canonical
load: on-demand
purpose: confirmed public attribution source
-->
# Credits

## Confirmed source references and release notice status

- Tarkov map source project: [the-hideout/tarkov-dev-svg-maps](https://github.com/the-hideout/tarkov-dev-svg-maps). Its repository declares CC BY-NC-SA 4.0 and describes the additional restriction as targeting cheating/ESP/pixel bots. The companion does not use those features. Thirteen base maps ship in the portable runtime with upstream attribution, README, and license under `licenses/maps` and `resources/app/licenses/maps`; unused interactive map assets are excluded. This records provenance and notices, not legal clearance.
- Reference tracker/data lineage: [sayser/TarkovTracker](https://github.com/sayser/TarkovTracker). Its README describes personal use. The portable package excludes offline reference source files; this attribution records lineage and does not assert legal clearance for unrelated source-repository contents.
- Community data: tarkov.dev is identified in the data snapshot/cache provenance. The portable runtime excludes offline reference source files; do not claim broader license or legal clearance for the public source tree.
- Runtime dependencies: `companion/package-lock.json` identifies Electron (MIT), qrcode (MIT), Tesseract.js and Tesseract.js-core (Apache-2.0), among other packages. Include applicable runtime notices with the published package.
- App identity: Escape from Tarkov is a Battlestate Games product. The app is an independent companion and is not affiliated with or endorsed by Battlestate Games; keep the existing disclaimer in `companion/README.md`. No BSG redistribution approval is confirmed.

This is a provenance record, not a legal opinion or claim of BSG approval. The owner-authorized v0.1.0 portable Windows preview is published as a prerelease; BSG approval is not claimed.
