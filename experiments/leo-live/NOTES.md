# Missing pieces

Filled in: `vite.config.ts`, `components.json`, `src/main.tsx`,
`src/App.tsx`, `src/pages/Home.tsx`, both earth textures, and 6 of the 7
HUD components: `IdentityBlock`, `ClockCard`, `TimeController`,
`LayerPanel`, `SearchBox`, `DetailPanel`. Every one matches the props/types
`Home.tsx` actually expects.

Still missing — the only real gap left:

- **`src/components/FallbackTable.tsx`** — note the path: unlike the other
  six, this one is NOT under `components/hud/`. `Home.tsx` imports it as
  `@/components/FallbackTable` (a sibling of the `hud/` folder, not inside
  it). Shown instead of the globe when WebGL is unavailable.

Optional, still not uploaded: `public/data/tle-cosmos-2251-debris.txt`,
`tle-iridium-33-debris.txt` (app just skips those two debris layers until
the first live CelesTrak fetch succeeds).
