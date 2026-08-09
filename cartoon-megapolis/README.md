# CARTOON MEGAPOLIS — Web-Swing Edition

A genuine browser-playable third-person traversal game built with Three.js r169.

## Features

- **Dense Procedural City**: Streets, slums, skyscrapers, elevated highways, metro, rooftops
- **Two Playable Characters**: Thuraya (agile wall-runner) and Alex (zip-line specialist)
- **Full Traversal Physics**: Ground, air, web-swing, wall-run, zip-line, dive, landing, recovery
- **Cinematic Camera**: Spring-damped follow with obstacle avoidance and dynamic FOV
- **Day/Night/Dusk Cycle**: Procedural skies, ACES tone mapping, controlled bloom
- **Quality Presets**: High / Medium / Low with automatic fallback
- **Complete UI**: Character menu, HUD, pause flow, notifications

## Controls

| Key | Action |
|-----|--------|
| W A S D | Move |
| SPACE | Jump / WallRun (while airborne near wall) |
| SHIFT | Sprint |
| RMB Hold | Web Swing (when anchor available) |
| E | Zip to distant rooftop |
| Q | Dive |
| ESC | Pause / Resume |
| Mouse | Camera look |

## Running the Game

1. Extract the ZIP file
2. Open `index.html` in a modern desktop browser (Chrome, Edge, Firefox)
3. Select a character and quality preset
4. Click "ENTER THE CITY"

**Note**: The game uses ES modules and imports Three.js from CDN (unpkg). For offline use, download Three.js r169 and update the import map in `index.html`.

## Architecture

- `js/Engine.js` — Renderer, scene, lights, post-processing, quality presets
- `js/City.js` — Procedural city generation with instanced meshes
- `js/Character.js` — Procedural rigged characters with animation blending
- `js/Physics.js` — Character controller with all traversal states
- `js/Camera.js` — Cinematic spring-damped camera with raycast obstacle avoidance
- `js/Input.js` — Keyboard/mouse input with pointer lock
- `js/Sky.js` — Procedural day/night/dusk sky system
- `js/UI.js` — HUD, menus, notifications
- `js/Game.js` — Main game loop and state machine

## Performance Targets

- High: 60+ FPS on dedicated GPUs
- Medium: 45+ FPS on integrated graphics
- Low: 30+ FPS on older hardware

## License

Game code is original. Three.js is MIT licensed. All art is procedural.
