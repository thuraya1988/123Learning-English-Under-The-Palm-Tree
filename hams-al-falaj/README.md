# همس الفلج — HAMS AL-FALAJ (v4)

**Whispers of the Falaj** — a Lost-in-Play-style 2D painted adventure set in a
living Omani village. You are Said, ten years old: walk the six districts,
solve the puzzles of the forgotten relics (الآثار المنسية), and free the six
district spirits so the falaj sings again.

Vanilla ES modules. No framework, no build step. Open `index.html` over any
static server and play.

```
python3 -m http.server 8765   # then open http://localhost:8765
```

## How to play
- **Walk**: click/tap anywhere, or Arrow keys / A–D. The camera follows Said
  across the wide painted scene with parallax (soft far backdrop, foreground
  palm fronds passing in front).
- **Sparkles**: faint glowing spots hide relics. Tap one (or walk close and
  press **Enter**) to open its puzzle.
- **Puzzles**: hidden-spot examination, symbol-sequence riddles, listen-to-the-
  whisper choices (breathing audio swell), and restore-the-broken-relic drag
  puzzles. Every district mixes all four types.
- **Seven discoveries per district**: 6 relics + the **Great Relic**, granted
  when the district spirit is freed. Spirits and relics arrive through a smoky
  swirl reveal (simple fade under reduced motion).
- **Journal** (السجلّ): parchment collection of painted relic thumbnails with
  bilingual lore and per-district progress (x/7).
- **Map** (الخريطة): painted overhead village map. Districts unlock in order —
  free a spirit to open the next district. Tap a pin to travel.
- Arabic is the default language; toggle English in the HUD. Progress is saved
  in `localStorage`.

## Sound
All audio is procedural WebAudio (no files): wind, falaj water, distant birds,
and a breathing swell during listen puzzles. The AudioContext is created on the
first pointer/key gesture (capture-phase) and resumed on every gesture until
running; the splash **Begin** button starts the loops. The HUD sound toggle
shows the real state and plays a confirmation chime when unmuted.

## Structure
```
index.html
css/style.css
js/
  audio.js            procedural ambience + robust gesture unlock
  main.js             orchestrator: state, input, loop, district flow
  data/worlds.js      ALL content: 6 districts, relics, puzzles, spirits (AR/EN)
  data/ui-text.js     bilingual UI strings + tutorial text
  engine/scene.js     painted backdrop, parallax camera, fallbacks, bloom
  engine/boy.js       Said — character drawn entirely in code (walk/idle/reach)
  engine/ambient.js   per-district alive overlays (fronds, smoke, gulls, mist…)
  engine/smoke.js     smoky gradual reveals (+ feathered oval spirit vignettes)
  engine/hotspots.js  focusable sparkle buttons positioned over the canvas
  engine/puzzles.js   hidden / sequence / listen / restore puzzle framework
  ui/hud.js           HUD incl. real-state sound toggle (inline SVG)
  ui/journal.js       relic journal (7 slots per district incl. Great Relic)
  ui/map.js           painted village map, progressive unlock, travel
  ui/tutorial.js      4-step bilingual onboarding
  ui/dialogue.js      narrative beat panel
```

## Assets
Painted scenes live in `assets/v4/` (districts, relics, spirits, map). If a
file is missing the engine renders a graceful painted fallback — the game
always runs. `assets/boy-reference.png` is reference-only and never shipped in
the UI.

## Accessibility & comfort
Keyboard: arrows/A–D walk, Enter interact/advance, Esc closes panels; sparkles
and puzzle pieces are focusable. `prefers-reduced-motion` is honored (fades
instead of smoke swirls, calmer ambient motion). The game pauses (and suspends
audio) when the tab is hidden.

## Validation
- `node --check` passes on all modules.
- Manually played through the Falaj Quarter end to end (headless Chromium):
  splash → tutorial → walking (click and keyboard) → all four puzzle types
  (hidden-spot, symbol sequence, listen, restore) → journal → map → spirit
  reveal → Great Relic → next district unlocked — zero console errors.
  Found and fixed one real bug along the way: the on-screen control-pad
  toggle button's label stayed in Arabic after switching to English.
