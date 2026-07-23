# Missing pieces

Filled in so far: `vite.config.ts`, `components.json`, `src/main.tsx`,
`src/App.tsx`, `public/textures/earth-day.jpg`,
`public/textures/earth-night.jpg` (replaced with the matched day/night
pair uploaded together — both 2048×1024).

Still missing, so `npm install && npm run dev` will not run as-is:

- **`src/pages/Home.tsx`** — the only real blocker left. `App.tsx` imports
  `./pages/Home` and renders it at `/`. This is almost certainly where the
  actual UI lives (the "LEO LIVE" panel with satellite counts, speed
  controls, search box, and the canvas host — seen in the screenshots)
  since it's the only route and nothing else uploaded instantiates
  `GlobeEngine`/the hooks together. Without it the build fails on the
  missing import.
- `public/data/tle-cosmos-2251-debris.txt`, `tle-iridium-33-debris.txt` —
  optional (marked `required: false` in `useTleData.ts`), app will just
  skip those two debris layers until the first live CelesTrak fetch
  succeeds.
