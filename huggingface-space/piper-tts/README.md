---
title: Piper TTS - Under The Palm Tree
emoji: 🌴
colorFrom: yellow
colorTo: red
sdk: docker
app_port: 7860
pinned: true
---

# 🌴 Piper TTS — Under The Palm Tree

Professional bilingual text-to-speech for Thuraya's English-learning games.

Two voices:
- **`en_GB-alan-low`** — British English (Alan)
- **`ar_JO-kareem-medium`** — Jordanian Arabic (Kareem)

## API

```
POST /synthesize
Content-Type: application/json
{ "text": "Welcome to Samail.", "voice": "en_GB-alan-low" }
```

Returns `audio/wav` (16-bit PCM).

```
GET /healthz   →  "ok"
GET /          →  {"voices": [...], "status": "ready"}
```

CORS is wide open so the games can call this Space directly from any origin
(Vercel, GitHub Pages, Squarespace iframes).

## How the voice files get loaded

At container start, `start.sh` downloads the two `.onnx` voice models and
their `.onnx.json` configs from the GitHub raw URLs at
`thuraya1988/123Learning-English-Under-The-Palm-Tree/main/public/tts-voices/`.
That keeps the Space in sync with whatever Thuraya last uploaded to the repo.

## Deploying to Hugging Face Spaces

1. Create a new Space named `piper-tts` under owner `Thursday88`
   with **SDK = Docker**.
2. Upload all the files in this folder to the Space (or push via `git`).
3. The Space will build the Docker image, run `start.sh`, and become
   available at `https://thursday88-piper-tts.hf.space`.

That URL is the default `PIPER_BASE` in `public/js/piper-client.js`,
so the games will automatically use this Space once it is live.
