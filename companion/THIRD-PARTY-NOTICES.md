# Third-party sources and notices

Tarkov Companion is an unofficial, noncommercial community planning app. Escape from Tarkov and its game content belong to Battlestate Games. No affiliation or endorsement is implied.

## Map artwork

The SVG map lineage is [the-hideout/tarkov-dev-svg-maps](https://github.com/the-hideout/tarkov-dev-svg-maps), by that project's contributors. That work is offered under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), without warranty, with a project restriction against cheating, ESP and automated gameplay software. Retain those terms when sharing the map artwork. The portable package includes the upstream license and README under `licenses/maps/`. The app applies presentation/floor layers separately and keeps reference map geometry. Map artwork is not evidence of current patch accuracy.

Reference calibration, offline factual data and additional map lineage came from [sayser/TarkovTracker](https://github.com/sayser/TarkovTracker). That repository describes personal use; this notice does not grant rights in its implementation or other third-party artwork. This app has its own Electron implementation. No legacy tracker executable, assemblies or game runtime files are shipped.

## Community data

Items, quests, trader offers, recipes, map markers and hideout requirements are community data supplied by [tarkov.dev](https://tarkov.dev/), with source/mode/timestamps retained in the bundled cache. Game descriptions and linked images remain their respective owners' content. Community estimates can lag game changes. Credits do not grant rights beyond the applicable source terms.

## Software runtime

Electron's own LICENSE and LICENSES.chromium.html are at the portable folder root. Production Node dependencies keep their distributed license/notice files under `resources/app/node_modules/`; a package/version/license inventory is written to `licenses/production-dependencies.json`. Electron is MIT-licensed; QRCode is MIT-licensed; Tesseract.js/core are Apache-2.0-licensed. Refer to the complete notices, including transitive packages.

The generated app atlas/banner/background artwork is recorded in `art/manifest.json`. Raw third-party portrait reference downloads are excluded from the portable app. This project does not relicense third-party content or claim BSG approval.
