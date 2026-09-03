"""Piper TTS HTTP server for the Under-The-Palm-Tree games.

Exposes a tiny REST API that the games' piper-client.js can call directly
from the browser. CORS is wide open so any origin (Vercel, GitHub Pages,
Squarespace iframes) can use it.

POST /synthesize  {"text": "...", "voice": "en_GB-alan-low" | "ar_JO-kareem-medium"}
POST /tts         {"text": "...", "lang": "en" | "ar"}
GET  /healthz     -> "ok"
GET  /            -> {"status": "ready", "voices": [...]}

Each POST returns audio/wav (16-bit PCM).
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
DEFAULT_VOICE = "en_GB-alan-medium"

LANG_VOICE_MAP = {
    "ar": "ar_JO-kareem-medium",
    "en": "en_GB-alan-medium",
}

app = FastAPI(title="Palm Tree TTS — Piper")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

_voice_cache: dict = {}


def load_voice(name: str):
    if name in _voice_cache:
        return _voice_cache[name]
    onnx = VOICES_DIR / f"{name}.onnx"
    cfg = VOICES_DIR / f"{name}.onnx.json"
    if not onnx.exists() or not cfg.exists():
        raise HTTPException(status_code=404, detail=f"voice '{name}' not found")
    _voice_cache[name] = PiperVoice.load(str(onnx), config_path=str(cfg))
    return _voice_cache[name]


def available_voices():
    return sorted(p.stem for p in VOICES_DIR.glob("*.onnx"))


def synth_wav(text: str, voice_name: str) -> bytes:
    voice = load_voice(voice_name)
    buf = io.BytesIO()
    with wave.open(buf, "wb") as wf:
        # Newer piper-tts uses synthesize_wav; fall back to synthesize for older builds.
        synth = getattr(voice, "synthesize_wav", None) or voice.synthesize
        synth(text, wf)
    return buf.getvalue()


class SynthRequest(BaseModel):
    text: str
    voice: str | None = None
    lang: str | None = None


@app.get("/")
def root():
    return JSONResponse({"status": "ready", "voices": available_voices()})


@app.get("/healthz")
def healthz():
    return Response("ok", media_type="text/plain")


def installed(name: str) -> bool:
    return (VOICES_DIR / f"{name}.onnx").exists() and (VOICES_DIR / f"{name}.onnx.json").exists()


def resolve_voice(req: SynthRequest) -> str:
    """Pick a voice that actually exists on disk.

    A page may ask for a specific voice (Miss Thuraya asks for a female one).
    If this Space has not been rebuilt since that voice was added, fall back
    to the language default and then to anything installed, so a page gets
    audio instead of a 404 and a silent button.
    """
    wanted = req.voice or (
        LANG_VOICE_MAP.get(req.lang.lower(), DEFAULT_VOICE) if req.lang else DEFAULT_VOICE
    )
    if installed(wanted):
        return wanted
    lang = "ar" if wanted.startswith("ar") else "en"
    fallback = LANG_VOICE_MAP.get(lang, DEFAULT_VOICE)
    if installed(fallback):
        return fallback
    for name in available_voices():
        if name.startswith(lang):
            return name
    if not available_voices():
        raise HTTPException(status_code=503, detail="no voices installed")
    return available_voices()[0]


@app.post("/synthesize")
def synthesize(req: SynthRequest):
    text = (req.text or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="text is required")
    audio = synth_wav(text, resolve_voice(req))
    return Response(audio, media_type="audio/wav")


@app.post("/tts")
def tts(req: SynthRequest):
    return synthesize(req)
