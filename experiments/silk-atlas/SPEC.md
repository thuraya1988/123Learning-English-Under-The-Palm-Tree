# SPEC.md — SILK ATLAS: "Building Eaves + Text Curtain"

Single-file interactive webpage. Deliverable: `/mnt/agents/output/silk-atlas/index.html` — ONE self-contained file (HTML+CSS+inline JS). No frameworks, no build step, no external assets except OPTIONAL Google Fonts with mandatory local fallbacks (page must render fully offline). Native Canvas 2D, Pointer Events. Web Audio NOT needed.

Reference benchmark: X post by marina_uiux (video): aged-paper editorial page; photoreal-ish golden double-eave China roof top-center; dense curtain of tiny Chinese characters hanging under the eaves; cursor drags a wide soft swirl opening through the curtain which swings back gently; long soft cast shadow from roof+curtain toward lower-right; Didone serif multi-line title lower-left; tiny kicker above title; 3-line description lower-right; thin side thumbnail cards; small brand+nav top-left; dark pill "Configure" top-right.

Reference crop available at `/mnt/agents/output/research/crops/china_full_3x.png` (study it).

---

## 1. Stage & Coordinate System

- Design baseline: `W=1848, H=1080`. All layout/physics/art coordinates are in design px.
- On resize: `scale = min(vw/W, vh/H)`; stage centered with offsets `ox=(vw-W*scale)/2`, `oy=(vh-H*scale)/2`. Letterbox area outside stage = darker paper `#cfc2a8` (or a plain warm tone) — actually simplest: make the page background a flat warm paper tone `#d9ccb2` and the stage canvas covers the full window; paper gradient drawn in design coords.
- One full-window `<canvas id="stage">` (absolute, inset 0). DPR = `min(devicePixelRatio||1, 2)`. Canvas backing = `vw*dpr × vh*dpr`. Each frame: `ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,vw,vh);` then draw a full-window paper fill, then `ctx.setTransform(dpr*scale,0,0,dpr*scale, ox*dpr, oy*dpr)` and draw the whole scene in design coordinates.
- Pointer conversion: `dx=(clientX-ox)/scale`, `dy=(clientY-oy)/scale`.
- DOM overlay (header, titles, cards, description) is a `<div id="ui">` absolutely positioned at `ox,oy` with `width:W;height:H;transform:scale(s);transform-origin:0 0` so text/cards use the same design coordinates. Canvas draws paper + shadows + roofs + curtain. DOM draws typography & interactive chrome (title, kicker, description, cards, header, hint). This split gives crisp text + easy hit-testing for cards.
- Mobile (`vw<760` or portrait phone): hide side cards, description; title scaled 0.8 anchored lower-left; curtain/roof fully interactive. Same canvas pipeline.

## 2. Paper Background (canvas, design coords)

- Vertical+radial hybrid gradient: center `#eee6d3`, edges `#d9ccb2` (radial gradient centered ~ (W*0.5, H*0.42), radius ~ H*0.95; plus a subtle linear darkening toward bottom).
- Grain: pre-render once a 256×256 noise tile (per-pixel alpha 0–14 black + occasional lighter fiber specks, a few short 1px fiber strokes). Create `ctx.createPattern`, fill the stage rect once per resize into an offscreen `paperCanvas` (design size × dpr). Every frame: `drawImage(paperCanvas)`. Grain must be static — never regenerate per frame.
- Vignette: radial gradient transparent center → `rgba(90,70,45,0.16)` at corners, baked into paperCanvas.
- A few faint irregular stains/fibers baked in (2–3 large very-low-alpha warm blotches).

## 3. Palette

- Paper center `#eee6d3`, edge `#d9ccb2`; ink `#33261b` (titles), body text `#4a3a2c`; muted `#7a6a55`.
- China roof gold: highlights `#e8b84b`, mid `#c98d2b`, shadow `#8a5a1a`; under-eave deep red `#6e2317`; dougong zone `#7c2f1c` w/ blue-green accent `#3d5a55`; ridge beasts darker gold `#9a6a20`; eave edge board `#5a1f14`.
- Japan roof: vermilion `#c33a24` light, `#a02a18` mid, `#7c1f10` shadow; ridge near-black `#241a14`; under-eave band `#33150d`.
- Kazakhstan: felt white `#f2ede2` light, `#d8d2c2` shadow; band reddish-brown `#8a3b22` with cream pattern `#e8dcc4`; shanyrak wood `#6b4426`.
- Cast shadow color: warm `#5a4632`.
- Curtain text: `#3a2e24`, per-char alpha 0.72–0.95.

## 4. Layout (design px, hero scenes)

- Scene center-x `CX = W/2 = 924`.
- Roof anchor: hero roof total width `RW ≈ 680` (36.8% of W). Roof top ≈ `y=118`, lower-eave underside ≈ `y=395` (China; Japan ~y=360, Kazakhstan dome bottom ~y=400). Scene sits slightly above center.
- Curtain: hangs from under the eaves; top row y ≈ 385 tucked just behind lower eave edge (roof drawn OVER curtain top). Curtain width `CW = 0.58×RW ≈ 395`. Columns: 26 (range 24–30); column gap ≈ CW/(cols-1) ≈ 15.8. Rows: 40 (38–44); row pitch ≈ 19. Char font ≈ 12.5px serif. Bottom of longest column ≈ y=385+40×19 ≈ 1145 → but must end within frame: use row pitch 17.5 → bottom ≈ 1085 with fade. Actually target visible fade zone ending ≈ y=1000: rows=40, pitch=17, longest ends ~1065; fade last 30% with alpha→0 and per-column length jitter ±12% (some columns end ~y=950). Fine-tune visually.
- Title block (DOM): left `x=100`, width `≈406` (22% of W), baseline start `y≈560`. Font: Didone stack `"Didot","Bodoni MT","Playfair Display",Georgia,"Times New Roman",serif`, size 58px, line-height 1.04, weight 500, color `#33261b`, letter-spacing 0. The em-dash after the country name: render `China —` then break; use manual `<br>` lines to mirror original breaks (see §8). Tight, elegant, never touching the curtain (curtain left edge ≈ 924-197=727 > 100+406=506 ✓).
- Kicker (DOM): above title at `y≈512`, size 12.5px, letter-spacing 0.18em, uppercase-ish mixed (keep the given strings verbatim), color `#7a6a55`; may include a small CJK glyph prefix (e.g. `缘分 · Fated Connection (Yuánfèn) · A destined meeting` — keep verbatim from §8).
- Description (DOM): right-aligned block, `right: W-100`, i.e. x from ~1440 to 1748, `y≈905`, width ≈ 300, size 12px, line-height 1.55, color `#6a5a47`, 2–3 lines.
- Side destination cards (DOM): width 96, height 86; left card center `x≈150`, right card center `x≈1698`; y center ≈ 330. Thin 1px border `rgba(90,70,50,0.35)`, paper fill `rgba(238,230,211,0.55)`, inner `<canvas>` 84×56 showing the mini roof (same drawing code as hero roofs, just scaled), caption below in 10.5px letter-spaced muted text (`KAZAKHSTAN` / `JAPAN` etc). Hover: border darkens, slight lift (translateY -2px, 200ms). Cursor pointer. Left card = previous destination (cyclic), right card = next (cyclic).
- Header (DOM): top-left at `x=100,y=44`: brand `SILK ATLAS` in 15px serif italic + small square seal mark (8×8 rotated square outline, `#8a3b22`) to its left; nav right of brand: `Home / Destinations / Community` 11.5px, letter-spacing 0.14em, color `#6a5a47`, gaps 26px. Top-right at `x=W-100` (right-aligned), `y=40`: `Configure` pill — bg `#3a2c20`, text `#e8dcc4`, 11.5px letter-spacing 0.1em, padding 9px 20px, radius 999. Non-functional (hover slight opacity). These must be small and quiet.
- Bottom-center hint (DOM): `x=924` centered, `y≈1028`: tiny 10px letter-spaced muted text `DRAG THROUGH THE CURTAIN` + a 24px hairline above it. Also acts as the custom-cursor companion text. In gallery: text becomes `CLICK A DOORWAY TO ENTER`.
- Custom cursor: over the stage canvas, `cursor:none`; draw a small cursor in canvas each frame at pointer position: 3px filled dot `#3a2c20` + 14px ring `rgba(58,44,32,0.4)`; when pointer is over the curtain area (within curtain bbox + 40px), ring expands to 22px and a faint ` brush ` tint appears; over DOM chrome (cards/buttons/nav) restore native cursor (those elements have `cursor:pointer` and sit above canvas, so canvas pointermove still fires via events on window — keep DOM cursor native there, hide the canvas-drawn cursor while over interactive DOM: track via elementFromPoint or pointerover listeners).

## 5. Roofs — procedural Canvas 2D (drawn to offscreen canvases, hero + thumb)

Draw each roof into an offscreen canvas at 2× design resolution (crisp at DPR 2), transparent background, then `drawImage` into scene. Thumb cards reuse the same offscreen (scaled down) — same source guaranteed. Apply slight edge feathering: after drawing, apply a 1–1.5px alpha fade along silhouette via `ctx.filter='blur(1px)'` on a duplicate or shadow technique so roofs sit INTO the paper rather than looking pasted. Also add a very subtle warm ambient occlusion gradient under the eaves onto the curtain top area.

Common lighting: light from upper-left. Left/top planes lighter, right/lower planes shaded. Slight hand-drawn imperfection: wobble lines ±0.6px via small deterministic pseudo-random offsets.

### 5a. China — double-eave golden palace roof (重檐庑殿/歇山 feel, like Forbidden City hall)
Silhouette: two stacked hip roofs, lower one much wider with strongly upturned flying corners. Total width 680, height ≈ 280 (y 118→398).
Construction (draw back→front):
1. **Lower tier**: roof plane = wide shallow trapezoid with CONCAVE curved slope profile (Chinese roofs curve). Eave edge line sags slightly mid-span then sweeps UP at corners (flying eaves, tips rise ~26px above the corner baseline). Top ridge of lower tier partially hidden behind upper tier body.
2. Tile field: fill with vertical gradient (top `#e8b84b` → bottom `#b57a22`); overlay dense vertical tile-ridge lines every ~5.5px following the slope normal (darker `#a06a1c`, alpha 0.5, tapering toward eave), plus horizontal tile-course lines every ~9px (alpha 0.25). Near the eave edge a darker band (shadowed eave-end tiles) + row of semicircular tile-end caps (small arcs, `#8a5a1a`) along the eave lip.
3. Eave board & rafters: under the eave lip a dark red-brown fascia band `#5a1f14` height ~8px; below it two rows of tiny rafter-end dots (lighter `#caa46a` on dark) — reads as 椽子.
4. Under-eave / dougong zone (between lower eave and upper tier base): deep red wall band `#7c2f1c` height ~34px, with a row of dougong bracket clusters: repeating small block pattern (each cluster ~14px wide: stacked rectangles with 2-step corbels, slightly lighter `#a04a28` tops, dark gaps), plus a thin blue-green `#3d5a55` horizontal accent stripe at its top. Side zones slightly darker (shading).
5. **Upper tier**: narrower roof plane same construction; its body sits on the dougong zone. Top main ridge: horizontal ridge bar `#8a5a1a` with slight camber; at both ends a **chiwen** (ridge beast): small upright dragon-tail ornament silhouette (draw as a curled S-shaped path, darker gold with lit edge). Four sloping corner ridges descend to the four eave corners; along each, a row of 4–6 tiny ridge-beast dots decreasing in size toward the corner + a slightly larger immortal/figure at the front. Ridge lines drawn as rounded strokes `#9a6a20` with a lit top edge `#e8b84b`.
6. Shading: overall multiply gradient darker toward right side and under all eave undersides (deep warm shadow `#3a1408` alpha 0.55). Upturned corner tips catch light (small highlight strokes).
7. The topmost silhouette detail: small central finial? Original has none on main ridge center — skip. Keep ridge beasts on all four upper-tier hip ridges and four lower-tier corners.

### 5b. Japan — vermilion temple roof (single broad tier, thin & spreading)
Width ≈ 640, height ≈ 150 (y ~210→360). Flatter and wider than China.
1. Roof plane: long shallow concave curve, ends sweep up crisply (~30px). Vermilion fill gradient `#c33a24`→`#8a2412` (top→bottom) with horizontal tile-course lines every ~7px (darker `#7c1f10`, alpha 0.35, following the curve, slight undulation ±1px) and faint vertical seam lines every ~22px.
2. Main ridge: thick near-black ridge bar `#241a14` with rounded tile segmentation (small vertical tick marks every ~18px) and slight upward curl at both ends (onigawara stubs — small dark curls with gold edge accent `#c9982a`).
3. Under-eave: thin dark shadow band `#33150d` height ~14px with tiny rafter dots; below that a hint of white plaster wall line? Original shows the curtain directly — end with the dark band.
4. Eave-end caps: small circular gold-ish crests at the two upturned corners (`#c9982a`, 4px).
5. Shading: left half lighter, right half + underside darker; edge feather into paper.

### 5c. Kazakhstan — white yurt dome (top portion of a yurt, like a roof)
Width ≈ 560, height ≈ 240 (y ~160→400). Rounded and light.
1. Dome: half-dome silhouette, slightly pointed apex curve (khan'yurt profile: from base y=400 curving up to apex ~y=185). Fill: radial-ish vertical gradient `#f2ede2` → `#d8d2c2` (right side shaded more). Subtle felt texture: low-alpha noise speckle + 2 large soft darker patches near base.
2. Shanyrak (skylight ring) at apex: circle ring r≈34 at apex: outer wood ring `#6b4426` stroke 7px, inner cross-spokes (4 curved spokes dividing the ring, same color, 4px), center hub. Slight perspective ellipse (ry≈0.82r).
3. Radiating uyk (poles): ~13 curved lines from shanyrak rim down to the dome base, evenly spread, `#a89880` alpha 0.8, 2.5px, gently curved following dome profile; alternating very subtle lighter felt bands between poles (alpha 0.06 white).
4. Waist band (baskur): at dome base (y≈368→400), reddish-brown `#8a3b22` band height ~30px with cream `#e8dcc4` geometric pattern: repeating koshkar-muiz (ram-horn) zigzag/triangle motif (draw a row of small triangles + stepped diamonds), plus thin cream border lines top & bottom of band.
5. Small hanging tassels or rope hints from band lower edge every ~40px (2px strokes, `#6b4426`, length 10px) — subtle.
6. Shading: soft shadow on right side (multiply `#8a8272` alpha 0.25), slight AO under band; edge feather.

## 6. Text Curtain — physics & rendering

### Structure
- `cols` (China 26, Japan 27, Kazakhstan 25) × `rows` 40 chains of point masses. Column anchors evenly spaced across CW centered at CX, pinned at `yTop` (per-scene, just under eave underside: China 392, Japan 358, Kazakhstan 396).
- Point: `{x,y,px,py}` (Verlet). Rest spacing `rest≈17`. Pinned top point per column (index 0 fixed; point 1 has a strong spring to anchor too).
- Char per grid position: chosen from the scene's character pool (seeded per scene so it's stable across frames).

### Simulation (per frame, dt = min(real dt, 1/30 s))
1. Verlet integrate: `vx=(x-px)*damping(0.982)`, gravity `g=1500 px/s²` (design), `next = x + vx + g*dt²` (gravity only y).
2. Pointer force — ONLY while pointer is moving (speed > 30 px/s): compute pointer velocity `pv` (smoothed, design px/s, clamp magnitude to 2400). Influence radius `R=165`. For each point within R: `d = dist(point, pointer)`, `falloff = (1 - d/R)^2`; push direction = mix of (a) normalized vector from pointer to point (parting) and (b) pointer velocity direction (carrying): `dir = normalize( (point-pointer)/max(d,1)*0.9 + pv/|pv|*0.55 )`; `impulse = falloff * min(|pv|,2400) * 0.030` applied as positional offset (add to x,y directly — Verlet turns it into velocity). Perpendicular bias: add small sideways component `perp(pv)*sign(cross(pv, point-pointer))*falloff*|pv|*0.008` so strands part to BOTH sides of the stroke.
3. Constraint iterations ×4: (a) each adjacent vertical pair projected to `rest` (strong, stiffness 1.0); (b) weak horizontal shear springs between same-row points of adjacent columns: stiffness 0.045 toward `restColGap` — this makes the sheet open/close as fabric rather than independent strings; (c) pin anchors.
4. Optional very light breeze when idle: `x += sin(t*0.7 + row*0.15 + col*0.3)*0.05` — barely perceptible sway; NOT in the first 2s after scene enter.
5. Clamp per-point speed to 1100 px/s (if `|x-px|/dt > vmax`, scale back).

### Rendering
- Sprite atlas: for each unique char in the pool, render once to an offscreen at 3× (e.g. char cell 12.5px→38px canvas), font `"Songti SC","Noto Serif CJK SC","SimSun",Georgia,"Noto Serif",serif` for CJK, `"Georgia","Times New Roman","Noto Serif",serif` for Cyrillic; fill `#3a2e24`. Store `{canvas, w, h}`.
- Per frame per char: position = its point; rotation `θ = atan2(pDown.y-pUp.y, pDown.x-pUp.x) - π/2` (from vertically adjacent points; ends use the single neighbor); alpha = base(0.72–0.95 per char, seeded) × bottomFade(row) × sceneOpacity. `bottomFade`: 1 for rows < 60% of that column's length, smoothstep → 0 across the last 40%; each column has a length factor 0.86–1.0 (seeded) → irregular bottom.
- Draw with `ctx.save/translate/rotate/drawImage/restore` — or faster: `ctx.setTransform` per glyph (scale factor from DPR already in root transform — sprite drawn at 1/3 size). Avoid `fillText` per frame.
- Also draw a faint 1px vertical strand line per column? Original shows only characters — skip lines, chars alone read as strands.

## 7. Shadows (canvas, between paper and roof/curtain)

Two shadow systems, both warm `#5a4632`:
1. **Long cast shadow** of roof+curtain toward lower-right: maintain an offscreen `silCanvas` (design size, DPR 1 is fine): each frame (or every 2nd frame / when max point displacement > 2px) draw black silhouette: roof image (alpha 0.9) + curtain as small rects/dots at each point (alpha 0.5×charAlpha). Then draw onto scene with a shear transform mapping the scene down-right: light direction ≈ 33° below horizontal → offset the TOP of the silhouette by `(+0.52×h, +0.30×h)` where h≈distance from roof top; implement as `ctx.setTransform(1,0.42, 0.18,0.98, tx,ty)` shearing + a vertical fade gradient mask (alpha 0.34 near roof → 0 at shadow end, end ≈ 1.15×curtain length). Soften with `ctx.filter='blur(14px)'` (Chromium OK; guard with try/catch fallback: draw silhouette 5× with 3px offsets at 0.07 alpha each). Composite with `globalCompositeOperation='multiply'` over the paper, then restore.
   - When the curtain is dragged, its silhouette dots move with the points → shadow responds naturally. The shadow direction/length stays constant (sun fixed).
   - Keep the long shadow BEHIND the curtain (draw order: paper → long shadow → curtain → roof → contact shadow? No: contact shadow under roof belongs above curtain top? Draw order: paper → cast shadow → curtain → roof → roof contact shadow (short, under eaves, drawn over curtain top region at low alpha).
2. **Roof contact shadow**: short soft ellipse/blurred shape directly beneath the roof eaves (blur ~10px, alpha 0.28, offset (+14,+10)) — anchors the roof.
3. Forbidden: single gray ellipse as the only shadow.

## 8. Scenes & Copy (verbatim where specified)

Brand `SILK ATLAS`. Nav `Home` (→#china), `Destinations` (→#gallery), `Community` (non-link placeholder).

**China** (`#china`) — default.
- Kicker: `缘分 · Fated Connection (Yuánfèn) · A destined meeting`
- Title lines (manual breaks): `China —` / `golden` / `courtyards,` / `silk-road` / `myths, roofs` / `that refuse` / `gravity`
- Description: `Golden roofs above courtyards where caravans once rested — silk, tea and stories carried west along the same road.`
- Curtain pool (classical poetry chars): `明月出天山苍茫云海间长风几万里吹度玉门关大漠孤烟直长河落日圆黄河远上白云间一片孤城万仞山羌笛何须怨杨柳春风不度玉门关劝君更尽一杯酒西出阳关无故人青海长云暗雪山孤城遥望玉门关黄沙百战穿金甲不破楼兰终不还驼铃古道丝绸路胡马犹闻唐汉风长安古道马迟迟高柳乱蝉嘶`
- Roof 5a. Curtain top y=392.

**Japan** (`#japan`).
- Kicker: `一期一会 · One Meeting, Once in a Lifetime (Ichigo ichie) · One time, one meeting`
- Title lines: `Japan —` / `red eaves` / `in the mist,` / `stone paths,` / `and the` / `patience` / `of rain`
- Description: `Vermilion eaves and mossy stone — a thousand torii gates of rain, each visit unrepeatable.`
- Curtain pool: `いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせすんあめつちほしそらやまかはみなつきかぜ旅路空寺山川雲霞石道雨雪桜松鳥音京奈良禅庭`
- Roof 5b. Curtain top y=358. Char font 12px (kana slightly smaller), col gap ~15.

**Kazakhstan** (`#kazakhstan`).
- Kicker: `Жол (Jol) · The open road`
- Title lines: `Kazakhstan —` / `steppe wind,` / `shanyrak` / `light, a home` / `that moves` / `with you`
- Description: `A dome of felt under an enormous sky — the shanyrak ring carries the hearth wherever the herd goes.`
- Curtain pool: `ШАҢЫРАҚДАЛАЖЕЛЖОЛБОЗҮЙКҮНАЙЖЫЛҚЫДОМБЫРААЛТЫНСАҚАТҰРАНАТАБАБАЕЛОРДАКIЛЕТБЕЙНЕ` (Cyrillic; font Georgia/Times/Noto Serif)
- Roof 5c. Curtain top y=396. Char 13px, col gap ~16.

## 9. Scene Switching Timeline (directional, with empty beat)

State machine per scene: `entering / active / exiting / off`. Only ONE active scene simulated; exiting scene keeps rendering (opacity) but physics frozen.
- Click right card (next): `dir = +1`. Click left card (prev): `dir = -1`. Click gallery item: `dir` = sign(targetIndex - currentIndex) or default +1.
- Phase A (t=0→0.38s, easeInCubic): DOM texts + cards fade out (opacity→0, 250ms); building group (roof+curtain+its shadows as one rendered layer) translates X by `dir * -(W*0.55)` with slight easeIn and opacity 1→0.2 (slides off toward the OPPOSITE side of the target's travel, i.e. if entering from right, current exits left — "slides off-screen as a whole toward the target direction": exit direction = -dir*W*0.6... Define: when going to next (dir=+1), current building slides LEFT off-screen (x→ -0.6W), new enters FROM the right (x: +0.6W→0). This matches "new scene enters from the opposite direction".)
- Phase B (0.38→0.78s): empty paper-only beat (400ms). Nothing but paper.
- Phase C (0.78→1.5s, easeOutCubic + tiny overshoot on x): new building slides in from `+dir*0.6W`→0, opacity→1; new curtain points initialized perfectly vertical with ZERO prev-frame velocity (still). Then texts fade in staggered (kicker 100ms, title 250ms, description 400ms after building starts).
- DOM title/description/kicker swap happens at start of Phase C (instant content swap while invisible).
- Update `location.hash` at switch start. On load: read hash → jump directly to that scene with a short fade-in (no slide).
- During any transition, pointer interaction with curtain disabled (input locked until `active`).

## 10. Gallery (`#gallery`)

- Entered via `Destinations` nav or hash. Layout: three doorways side by side, each a mini hero scene at scale ~0.42: mini scene width ~500, centers at x = 480, 924, 1368; roof top y≈300, curtain scaled likewise (mini curtains: cols 14, rows 22, same pools, physics SIMULATED at low cost — total ~1000 points, fine; or static if perf concerns — prefer simulated).
- Each doorway: mini roof + mini curtain + its long shadow (same direction, scaled) + caption below (country name 15px serif + tiny kicker 9.5px muted).
- Hero texts/cards fade out when entering gallery (400ms); gallery doorways fade/slide in staggered (each 90ms apart, from y+30).
- Click a doorway → hero transition (Phase A-C) into that scene, dir = sign(index-currentHeroIndex)||+1.
- In gallery, top-right Configure stays; bottom hint text changes. ESC or `Home` returns to last hero scene.

## 11. Performance & Robustness

- rAF loop with real dt (clamp 0.05s). `document.visibilitychange` → pause loop & timers; resume cleanly.
- DPR cap 2. Sprite atlas prerendered once per scene (build lazily on first scene entry).
- Only simulate: active hero curtain, or (in gallery) the 3 mini curtains. Exiting scene physics frozen; disposed (listeners/refs dropped) when opacity hits 0.
- Shadow silhouette redraw: only when scene dirty (pointer moved recently, or maxDisplacement>2px, or transition animating); else reuse last frame's shadow composite.
- Resize: recompute scale/offsets; resize canvases; rebuild paperCanvas; keep physics points (re-anchor columns horizontally to new anchors? anchors are design-space constants — unchanged; only backing store changes). Debounce 120ms.
- Pointer Events with `touch-action:none` on the stage; support mouse+touch simultaneously-tracked single pointer (first active pointerId). On touch end, curtain swings back naturally (no snap).
- No console errors/warnings; guard all `ctx.filter` usage; `prefers-reduced-motion`: disable idle breeze & auto-demo.
- Optional auto-demo: if no pointer interaction for 9s AND scene is a hero, run a gentle scripted swipe ghost (a soft invisible hand sweeps the curtain once every ~7s). ANY real pointermove/click permanently disables auto-demo.

## 12. Acceptance checklist (verify before delivery)
1. `file://` load: zero console errors; paper grain static; vignette present.
2. China default: golden double-eave roof clearly detailed (tile ridges, flying corners, ridge beasts, dougong band, chiwen) ≈ original silhouette; curtain 26×40 dense chars, top tucked under eave; long shadow lower-right soft & directional; contact shadow under roof.
3. Fast swipe (simulated pointer sweep 300px in 150ms through curtain center): wide soft opening, chars carried & parted both sides; after release, gradual swing-back ≥1.2s, no snap, no explosion.
4. Click Japan card: texts fade → building slides left off → ~400ms paper-only beat → Japan enters from right, settles; curtain starts still; hash updates. Same for Kazakhstan from left card (mirrored direction).
5. `#gallery`: three doorways with roofs+curtains+shadows; click → hero.
6. `#japan` / `#kazakhstan` direct load works.
7. Mobile viewport 390×844: single centered scene, roof+curtain interactive via touch simulation, no overflow.
8. Titles/kickers/descriptions verbatim per §8; side cards thin & light; Configure present; custom cursor subtle; no glassmorphism/gradients/neon anywhere.
9. Fonts: offline OK (fallback stacks used; page correct with no network).
10. FPS: active scene ≥50fps at DPR1 1848×1080 in headless Chromium (measure via rAF counter over 3s while swiping).
