"""Piper TTS HTTP server for the Under-The-Palm-Tree games.

POST /synthesize  {"text": "...", "voice": "en_GB-alan-low" | "ar_JO-kareem-medium"}
                  -> audio/wav (16-bit PCM)
GET  /healthz     -> "ok"
GET  /            -> {"status": "ready", "voices": [...]}
"""
import io
import os
import wave
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse
from pydantic import BaseModel
from piper import PiperVoice

VOICES_DIR = Path(os.environ.get("VOICES_DIR", "/voices"))
DEFAULT_VOICE = "en_GB-alan-low"

app = FastAPI(title="Piper TTS — Under The Palm Tree")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

_voice_cache: dict[str, PiperVoice] = {}


def load_voice(name: str) -> PiperVoice:
    if name in _voice_cache:
        return _voice_cache[name]
    onnx = VOICES_DIR / f"{name}.onnx"
    cfg = VOICES_DIR / f"{name}.onnx.json"
    if not onnx.exists() or not cfg.exists():
        raise HTTPException(status_code=404, detail=f"voice '{name}' not found")
    _voice_cache[name] = PiperVoice.load(str(onnx), config_path=str(cfg))
    return _voice_cache[name]


def available_voices() -> list[str]:
    return sorted(p.stem for p in VOICES_DIR.glob("*.onnx"))


class SynthRequest(BaseModel):
    text: str
    voice: str | None = None


@app.get("/")
def root():
    return JSONResponse({"status": "ready", "voices": available_voices()})


@app.get("/healthz")
def healthz():
    return Response("ok", media_type="text/plain")


@app.post("/synthesize")
def synthesize(req: SynthRequest):
    text = (req.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="text is required")
    voice_name = req.voice or DEFAULT_VOICE
    voice = load_voice(voice_name)

    buf = io.BytesIO()
    with wave.open(buf, "wb") as wav:
        voice.synthesize(text, wav)
    return Response(buf.getvalue(), media_type="audio/wav")
