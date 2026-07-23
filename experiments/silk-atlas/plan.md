# Plan — SILK ATLAS: "Building Eaves + Text Curtain" Interactive Webpage

## Goal
Single-file `index.html` recreating the X post (marina_uiux) visual experiment: paper-textured editorial page, detailed architectural roofs (China palace eave / Japan temple / Kazakhstan yurt), hanging text-curtain with Verlet cloth physics, long soft shadows, scene switching with directional slides + empty beat, gallery state, hash routing.

## Stage 0 — Research (Orchestrator)
- Fetch https://x.com/marina_uiux/status/2076410277109645741 (browser + fallbacks: nitter, web archive, image search) to extract visual benchmark: layout, roof detail, shadow direction, typography proportions, curtain behavior.
- Output: research notes + screenshots saved under /mnt/agents/output/research/.

## Stage 1 — Coding workflow
- Load `vibecoding-general-swarm` skill and follow its orchestration for the build.
- Build `/mnt/agents/output/silk-atlas/index.html` (single file: HTML+CSS+Canvas2D/SVG+Pointer Events; no heavy frameworks; font fallbacks Georgia/Times/Noto Serif).
- Key systems:
  1. Stage scaling: 1848×1080 baseline, scale = min(vw/1848, vh/1080), centered, unified coordinate conversion for pointer.
  2. Paper background: warm aged paper gradient + fixed grain (pre-rendered noise tile), vignette.
  3. Roofs: layered offscreen-canvas/SVG detailed drawing — China double-tier golden glazed eave w/ dougong, ridge beasts, flying eaves; Japan vermilion thin roof w/ black ridge; Kazakhstan white yurt dome w/ shanyrak ring + patterned band. Same source for thumbnails.
  4. Text curtain: 24–30 cols × 38–44 rows; per-scene character pools (classical Chinese poetry / Japanese kana+kanji / Cyrillic); Verlet points (curr+prev), gravity, damping, strong vertical/weak horizontal constraints, 3–5 iterations; pointer force only while moving, radius 140–180px, push by speed+direction; max velocity clamp; glyph rotation from tangent of vertical neighbors; Retina sprite prerender + drawImage batching; bottom fade + varied column lengths.
  5. Shadows: long soft shadow toward lower-right from roof+curtain silhouette (offscreen silhouette → blur → multiply), contact shadow under roof; shadow shifts slightly when curtain lifted.
  6. Copy per scene (China/Japan/Kazakhstan kickers, titles, descriptions); left serif title ~22% width, tight leading; lower-right small 2–3 line description; thin side destination cards.
  7. Scene switching: fade text/cards → slide building off toward target direction → 300–500ms paper-only beat → new scene enters from opposite side, settles; new curtain starts near-still (no carried velocities).
  8. Gallery state: 3 destinations side-by-side, smaller scale, roofs+curtains+shadows preserved; click returns to hero.
  9. Hash routing #china/#japan/#kazakhstan/#gallery; optional auto-demo paused on first interaction.
  10. Perf: rAF + deltaTime, DPR cap 2, pause on hidden, simulate only visible curtain, resize handling, touch support, mobile single-scene layout.
  11. Custom restrained cursor / interaction hint.

## Stage 2 — Validation (Verifier)
- Headless browser (playwright/chromium if available; else install) — load page, capture console errors, screenshot each scene + gallery, simulate swipe to verify curtain response and swing-back.
- Iterate on failures until: no console errors; China roof detail; swipe produces wide soft opening + natural swing-back; directional transitions with empty beat; gallery/hash/touch/resize all work.

## Stage 3 — Delivery
- Call mshtools-website_version_manager build_version (type: html) on the project folder.
- Final response references index.html + preview URL + KIMI_REF for the file.
