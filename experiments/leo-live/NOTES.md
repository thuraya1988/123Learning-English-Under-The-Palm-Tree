# Missing pieces

Filled in: `vite.config.ts`, `components.json`, `src/main.tsx`,
`src/App.tsx`, `src/pages/Home.tsx`, both earth textures.

`Home.tsx` is the real deal — it wires up every hook (`useTleData`,
`useSimClock`, `usePropagator`), the globe engine, deep-linking
(`?sat=25544&speed=60`), keyboard shortcuts, WebGL-fallback detection, etc.
Reading it revealed the actual HUD is built from smaller components that
haven't been uploaded yet:

- `src/components/hud/IdentityBlock.tsx`
- `src/components/hud/ClockCard.tsx`
- `src/components/hud/TimeController.tsx`
- `src/components/hud/LayerPanel.tsx`
- `src/components/hud/SearchBox.tsx`
- `src/components/hud/DetailPanel.tsx` (also exports a `Telemetry` type)
- `src/components/FallbackTable.tsx` (shown instead of the globe when WebGL
  is unavailable)

Everything else (data layer, worker, engine, config, textures, entry
points) is in place. No rush on the components above — send them anytime,
or leave the project as a documented-but-incomplete archive.

Optional, still not uploaded: `public/data/tle-cosmos-2251-debris.txt`,
`tle-iridium-33-debris.txt` (app just skips those two debris layers until
the first live CelesTrak fetch succeeds).
