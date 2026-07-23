# PLAN — GARGANTUA: Schwarzschild Black Hole Raytracer

Source of truth: `/mnt/agents/upload/user_pasted_clipboard_long_content_as_file_You are a senior Thr.txt`
(the full 17-section engineering spec). Deliverable = complete runnable static website, vanilla HTML/CSS/ES-module JS + vendored Three.js, real-time GLSL Schwarzschild raytracer. Final deliverable folder: `/mnt/agents/output/gargantua/`.

## Skill routing
- `vibecoding-webapp-swarm` → SKIP (spec explicitly forbids React/Vue/npm build; demands vanilla ES modules + importmap).
- `vibecoding-general-swarm` → READ at Stage 1; apply its orchestration discipline (atomic stages, validation gates) adapted to a single tightly-coupled WebGL codebase. Delegation only where it helps (verification passes); core shader/app code authored by orchestrator to keep uniform/DOM contracts coherent.
- No user skills apply. No finance/data plugins needed.

## Stage 1 — Environment & vendoring (shell)
- Check tooling: curl, python3+numpy, ffmpeg (opus/mp3/ogg encoders), headless browser (chromium/playwright/puppeteer).
- Create directory tree per spec §1: index.html, css/, js/, vendor/jsm/{controls,postprocessing,shaders}, audio/.
- Download pinned Three.js release files (three.module.js, OrbitControls, EffectComposer, RenderPass, ShaderPass, UnrealBloomPass, Pass, MaskPass, CopyShader, LuminosityHighPassShader) from unpkg/jsdelivr; verify sizes/non-HTML content; patch nothing (importmap handles `three` specifier).
- GATE: all vendor files present, valid JS, correct import specifiers.

## Stage 2 — Core implementation (orchestrator-authored files)
- `js/shaders.js` — RAY_VERT, RAY_FRAG (spec §4–§8: null-geodesic integrator, disk crossing/temperature/Doppler, FBM turbulence, lensed starfield, photon ring, debug modes 0–9), COMPOSITE_FRAG (§9: CA, ACES, vignette, grain).
- `js/main.js` — renderer/composer setup (§3), resize/DPR (§3.6), cinematic camera + OrbitControls + presets (§10), HUD (§11), 21-control parameter console with persistence (§12), quality profiles + URL automation + shot mode (§13), audio engine (§14), main loop + hotkeys (§15), responsive/recovery/a11y (§16).
- `index.html` + `css/style.css` — DOM order/z-index (§2), intro card animation, #fx scanlines+vignette, spacecraft-terminal styling, responsive breakpoints.
- GATE: static review — every spec constant present (RS=1, ISCO=3, default coords 4.49/2.72/25.46, 8-key cinema path, 21 params with exact ranges, hotkeys, etc.).

## Stage 3 — Audio synthesis (python + ffmpeg)
- Generate ~7.03 s intro sting (sub-bass swell resolving into drone) and 176.0 s seamless main loop (layered sub-bass drone, slow LFO, no beats) as WAV via numpy; encode `gargantua-main.opus` (primary), `.mp3`, `.ogg`, and `gargantua-intro.mp3`; verify durations/seamlessness (start≈end sample continuity).
- GATE: ffprobe durations ≈7.03/176, three main formats exist.

## Stage 4 — Automated verification (headless browser)
- Serve statically; drive headless Chromium with `?shot&cam=poster|edge|polar|close&q=cinematic&debug=0..9`.
- Collect document.title==SHOT_OK, pageerror/console.error, HTTP 200s; capture screenshots for visual acceptance (§17.1: black horizon, lensed upper/lower disk, photon ring, blue-white beaming side, red-dark receding side, Milky Way).
- Iterate fixes until clean.
- GATE: SHOT_OK on all cams, zero console/page errors, screenshots visually pass.

## Stage 5 — Delivery
- `mshtools-website_version_manager` action=build_version, type=html, project_dir=/mnt/agents/output/gargantua.
- Final report: startup command, tree, URL, verified results. KIMI_REF not used for website delivery.
