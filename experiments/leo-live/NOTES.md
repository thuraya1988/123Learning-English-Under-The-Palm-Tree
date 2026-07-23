# Missing pieces

Filled in: `vite.config.ts`, `components.json`, `src/main.tsx`,
`src/App.tsx`, `src/pages/Home.tsx`, both earth textures, and 5 of the 7
HUD components: `IdentityBlock`, `ClockCard`, `TimeController`,
`LayerPanel`, `SearchBox`. Every one of them matches the props `Home.tsx`
actually passes in, so this is confirmed to be the real source, not a
lookalike.

Still missing:

- `src/components/hud/DetailPanel.tsx` (also exports a `Telemetry` type
  used by `Home.tsx`)
- `src/components/FallbackTable.tsx` (shown instead of the globe when
  WebGL is unavailable)

Optional, still not uploaded: `public/data/tle-cosmos-2251-debris.txt`,
`tle-iridium-33-debris.txt` (app just skips those two debris layers until
the first live CelesTrak fetch succeeds).
