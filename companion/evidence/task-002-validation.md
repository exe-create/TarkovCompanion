# TASK-002 — local evidence, October 7, 2026

- 14 focused tests passed: existing screenshot/data/core/server checks, map inverse projection, polygon/point proximity, floor gating, availability distinction, blocked/faction checks, mode/variant keys, shared spawn classification and custom boss identity selection.
- Expanded syntax checks passed for renderer, art, map UI/logic, main/preload/server and sync.
- `test:map-ui` passed: legend/action images, real source transit coordinates, green nearby vs confirmed status, unavailable exits, persistence, boss portraits, marker zoom size, exit centering, exact source variants, new-raid reset and overlay layout.
- Existing browser and native Electron/overlay/disk smoke checks passed after integration.
- All modes refreshed from working public JSON map endpoints; extracts/transits/bosses/spawns/hazards retain source variant names. Empty source variant arrays are not fabricated.
- Six generated PNG files copied into the app: five atlases and one backdrop. Visually inspected original outputs and rendered UI; alpha channel inspected. CSS uses original images, without cropped/edited derivatives.
- Independent review corrected shared `all` spawn labels and reduced unusable-exit label clutter. Player portrait has a coordinate stem so the exit icon stays visible at the same point.

Screenshots: `customs-art-proximity.png`, `overview.png`, `maps.png`, `overlay-art.png`. These contain isolated synthetic test progress, not the user's game state.

Still pending: real EFT exit availability, exact map alignment and floor accuracy, actual screenshot positioning, fullscreen and anti-cheat/BSG permission assessment. Nearby does not mean automatically available. The original tracker and its saved progress were preserved. No Git verification available (workspace is not a repository).
