---
title: Palm Tree TTS
emoji: 🌴
colorFrom: yellow
colorTo: red
sdk: docker
app_port: 7860
pinned: true
---

# 🌴 Palm Tree TTS

Bilingual Piper text-to-speech for the **Under The Palm Tree** games.

- 🇬🇧 English voice: `en_GB-alan-low` (Alan, British)
- 🇯🇴 Arabic voice: `ar_JO-kareem-medium` (Kareem, Jordanian)

## API

```
POST /synthesize
Content-Type: application/json
{ "text": "Welcome to Samail.", "lang": "en" }
```

Returns `audio/wav` (16-bit PCM).

You can also pass `"voice": "en_GB-alan-low"` instead of `lang`.

```
GET /        -> {"status": "ready", "voices": [...]}
GET /healthz -> "ok"
POST /tts    -> alias for /synthesize
```

CORS is open so the games can call this Space from any origin.

## How the voices load

At container start, `start.sh` downloads the two `.onnx` voice models and
their `.onnx.json` configs from the GitHub raw URLs at
`thuraya1988/123Learning-English-Under-The-Palm-Tree/main/public/tts-voices/`.

That keeps the Space in sync with whatever Thuraya last uploaded to the repo.

## Deploying

1. Create a Hugging Face Space named `palm-tree-tts` under owner `Thursday88`.
2. **SDK: Docker** — required.
3. Upload `Dockerfile`, `app.py`, `start.sh`, and this `README.md`.
4. Wait 3–5 minutes for the build.
5. The Space serves on `https://thursday88-palm-tree-tts.hf.space`.
