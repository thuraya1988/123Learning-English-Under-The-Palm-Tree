# HAMS AL-FALAJ v4 — Art Asset Manifest

Style: hand-painted storybook cartoon (Lost in Play / Ghibli inspired), warm earthy palette.

## District backgrounds (2K 16:9, q82 progressive JPEG)

| File | Dimensions | Size |
|---|---|---|
| `district-falaj.jpg` | 2048×1082 | 497 KB |
| `district-fort.jpg` | 2048×1082 | 382 KB |
| `district-harbor.jpg` | 2048×1082 | 401 KB |
| `district-school.jpg` | 2048×1082 | 371 KB |
| `district-souq.jpg` | 2048×1082 | 473 KB |
| `district-wadi.jpg` | 2048×1082 | 548 KB |

## Village overhead map (2K 16:9)

| File | Dimensions | Size |
|---|---|---|
| `map-village.jpg` | 2048×1082 | 570 KB |

## Relic grids (2K 16:9, sliced 3×2)

| File | Dimensions | Size |
|---|---|---|
| `relics-falaj.jpg` | 2048×1082 | 388 KB |
| `relics-fort.jpg` | 2048×1082 | 360 KB |
| `relics-harbor.jpg` | 2048×1082 | 386 KB |
| `relics-school.jpg` | 2048×1082 | 320 KB |
| `relics-souq.jpg` | 2048×1082 | 344 KB |
| `relics-wadi.jpg` | 2048×1082 | 377 KB |

## Sliced relics (588×~500, q82 progressive JPEG)

| File | Dimensions | Size |
|---|---|---|
| `relics/falaj-1.jpg` | 656×541 | 71 KB |
| `relics/falaj-2.jpg` | 656×541 | 46 KB |
| `relics/falaj-3.jpg` | 656×541 | 65 KB |
| `relics/falaj-4.jpg` | 656×491 | 53 KB |
| `relics/falaj-5.jpg` | 656×491 | 65 KB |
| `relics/falaj-6.jpg` | 656×491 | 66 KB |
| `relics/fort-1.jpg` | 656×541 | 57 KB |
| `relics/fort-2.jpg` | 656×541 | 47 KB |
| `relics/fort-3.jpg` | 656×541 | 69 KB |
| `relics/fort-4.jpg` | 656×491 | 63 KB |
| `relics/fort-5.jpg` | 656×491 | 58 KB |
| `relics/fort-6.jpg` | 656×491 | 49 KB |
| `relics/harbor-1.jpg` | 656×541 | 62 KB |
| `relics/harbor-2.jpg` | 656×541 | 65 KB |
| `relics/harbor-3.jpg` | 656×541 | 62 KB |
| `relics/harbor-4.jpg` | 656×491 | 58 KB |
| `relics/harbor-5.jpg` | 656×491 | 68 KB |
| `relics/harbor-6.jpg` | 656×491 | 55 KB |
| `relics/school-1.jpg` | 656×541 | 50 KB |
| `relics/school-2.jpg` | 656×541 | 53 KB |
| `relics/school-3.jpg` | 656×541 | 57 KB |
| `relics/school-4.jpg` | 656×491 | 41 KB |
| `relics/school-5.jpg` | 656×491 | 58 KB |
| `relics/school-6.jpg` | 656×491 | 44 KB |
| `relics/souq-1.jpg` | 656×541 | 50 KB |
| `relics/souq-2.jpg` | 656×541 | 50 KB |
| `relics/souq-3.jpg` | 656×541 | 47 KB |
| `relics/souq-4.jpg` | 656×491 | 64 KB |
| `relics/souq-5.jpg` | 656×491 | 50 KB |
| `relics/souq-6.jpg` | 656×491 | 64 KB |
| `relics/wadi-1.jpg` | 656×541 | 62 KB |
| `relics/wadi-2.jpg` | 656×541 | 63 KB |
| `relics/wadi-3.jpg` | 656×541 | 59 KB |
| `relics/wadi-4.jpg` | 656×491 | 60 KB |
| `relics/wadi-5.jpg` | 656×491 | 50 KB |
| `relics/wadi-6.jpg` | 656×491 | 58 KB |

## Spirits (1K 2:3 transparent PNG, radial feathered alpha)

| File | Dimensions | Size |
|---|---|---|
| `spirit-falaj.png` | 1024×1443 | 3159 KB |
| `spirit-fort.png` | 1024×1443 | 2739 KB |
| `spirit-harbor.png` | 1024×1443 | 3050 KB |
| `spirit-school.png` | 1024×1443 | 3202 KB |
| `spirit-souq.png` | 1024×1443 | 2961 KB |
| `spirit-wadi.png` | 1024×1443 | 3046 KB |

## Character reference

| File | Dimensions | Size |
|---|---|---|
| `boy-reference.png` | 1024×1443 | 2635 KB |

## Relic index (cell order left→right, top→bottom)

- **falaj**: 1. water clock bowl, 2. bronze falaj key, 3. carved stone channel marker, 4. clay irrigation pot, 5. old measuring rope, 6. palm-fiber basket
- **fort**: 1. rusted khanjar dagger, 2. brass cannon ball, 3. fort door knocker, 4. old battle drum, 5. silver coin pouch, 6. stone seal stamp
- **souq**: 1. brass scale weights, 2. antique spice grinder, 3. pearl-diving nose clip, 4. woven textile fragment, 5. copper lamp, 6. old coin
- **school**: 1. ink pot with reed pen, 2. worn slate board, 3. abacus, 4. brass bell, 5. tattered storybook, 6. marble inkwell
- **harbor**: 1. ship astrolabe, 2. carved dhow model, 3. pearl oyster shell, 4. rope knot board, 5. brass compass, 6. fisherman's net hook
- **wadi**: 1. etched river stone, 2. shell fossil, 3. bronze water jug, 4. carved wooden fish, 5. stone arrowhead, 6. wild honey pot

## v4.4 extension (longer worlds + jump/climb)

- `layer-<id>-mid.jpg` / `layer-<id>-far.jpg` are now 4036×1082 stitched panoramas
  (original painting on the LEFT, newly generated continuation on the RIGHT with
  a mosque, a dukan shop and climbable palms; 60px seam crossfade; far = blurred
  + lightened variant). Relic `spot.x` fractions in `js/data/worlds.js` are halved
  to stay on the same painted spots in the left half.
- New boy sprites (generated from `boy-reference.png`): `boy/jump.png`,
  `boy/climb-1.png`, `boy/climb-2.png` (transparent, watermark-cropped, ≤560px).
