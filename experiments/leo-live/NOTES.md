# Missing pieces

Filled in so far: `vite.config.ts`, `components.json`, `src/main.tsx`,
`src/App.tsx`.

Still missing, so `npm install && npm run dev` will not run as-is:

- **`src/pages/Home.tsx`** — new finding: `App.tsx` imports `./pages/Home`
  and renders it at `/`. This is almost certainly where the actual UI
  lives (the "LEO LIVE" panel with satellite counts, speed controls,
  search box, and the canvas host — seen in the screenshots) since it's
  the only route and nothing else in the uploaded files renders that
  panel or instantiates `GlobeEngine`/the hooks together. Without it the
  build fails on the missing import.
- `public/textures/earth-day.jpg` — `globe-engine.ts` loads both
  `earth-day.jpg` and `earth-night.jpg`; only the night texture was
  uploaded.
- `public/data/tle-cosmos-2251-debris.txt`, `tle-iridium-33-debris.txt` —
  optional (marked `required: false` in `useTleData.ts`), app will just
  skip those two debris layers until the first live CelesTrak fetch
  succeeds.
