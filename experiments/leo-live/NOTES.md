# Status: complete ✅

All files `Home.tsx` and its component tree depend on are present:
config (vite/tsconfig×3/eslint/tailwind/postcss/components.json), entry
points (`main.tsx`, `App.tsx`), `pages/Home.tsx`, all 3 hooks, all 3 lib
files, the propagation worker, all 6 `hud/` components, and
`FallbackTable.tsx`. Both earth textures are in `public/textures/`.

`npm install && npm run dev` (or `npm run build`) should work as-is.

Optional, not uploaded: `public/data/tle-cosmos-2251-debris.txt`,
`tle-iridium-33-debris.txt` — both marked `required: false` in
`useTleData.ts`, so their absence just means those two debris layers stay
empty until the first live CelesTrak fetch succeeds in the browser.
