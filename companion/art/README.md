# Original tactical art set — TASK-002

Built-in imagegen produced these project assets; no paid API fallback was configured. All generated PNGs remain unmodified. Transparent alpha was inspected; CSS samples atlas cells at runtime. Exact final prompts and source reference URLs are in [manifest.json](manifest.json).

| File | Layout | Contents / implementation |
| --- | --- | --- |
| markers-v1.png | 4 × 4 | 16 map emblems: faction extracts, transit, player, bosses, spawns, quest, pin, hazard, cultist and vehicle exit |
| ui-v1.png | 6 × 4 | 24 navigation/action icons, used on UI headings and buttons |
| characters-v1.png | 4 × 4 | 16 PMC/scav/raider/boss/cultist/rogue portraits |
| characters-extra-v1.png | 4 × 2 | 8 Goons/Partisan/Black Division/AF/guard/sniper portraits |
| characters-latest-v1.png | 4 × 2 | 8 Wedge/named-guard/event-variant portraits |
| field-banner-v1.png | Landscape | Industrial/operator header and subdued sidebar backdrop |

Total: 72 sprite cells, including 32 character portraits, plus one background illustration. Shared spawn emblems combine the generated PMC and scav sprites in CSS. Layout is implemented in `art.js` and `art.css`; boss identities are resolved in `map-logic.cjs`.

Original character interpretations are inspired by Tarkov. Wedge/Labs/Basmach/Gus used community-provider portrait assets as visual references (retained in `references/`, URLs in the manifest). No official logo was generated; original tracker/map artwork was not replaced. New future source identities can fall back to their community portrait rather than inventing a character identity.

TASK-003 adds operations-background-v1.png, an original opaque operations-room illustration generated with built-in image_gen. Exact prompt is in manifest.json/background-prompt.txt. CSS uses it behind main app cards; original PNG is preserved.
