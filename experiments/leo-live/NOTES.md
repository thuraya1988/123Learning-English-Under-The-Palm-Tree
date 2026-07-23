# Missing pieces

Filled in so far: `vite.config.ts`, `components.json` (shadcn config).

Still missing, so `npm install && npm run dev` will not run as-is:

- `src/main.tsx` — React entry point
- `src/App.tsx` (or equivalent) — the actual UI: the "LEO LIVE" panel with
  satellite counts, speed controls, search box, and the canvas host — seen
  in the screenshots but not present as source
- `public/textures/earth-day.jpg` — `globe-engine.ts` loads both
  `earth-day.jpg` and `earth-night.jpg`; only the night texture was
  uploaded
- `public/data/tle-cosmos-2251-debris.txt`, `tle-iridium-33-debris.txt` —
  optional (marked `required: false` in `useTleData.ts`), app will just
  skip those two debris layers until the first live CelesTrak fetch
  succeeds
