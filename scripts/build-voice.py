#!/usr/bin/env python3
"""Pre-render Miss Thuraya's English audio with Piper, once, into the repo.

The site used to call a Piper server on every tap. That server slept, errored,
and answered 503/405, so students heard the phone's robotic fallback instead.
Nothing about a lesson's vocabulary changes between page loads, so the audio
does not need a server at all — it needs to exist as files.

This renders every word and every example sentence in audio/lines.json to a
small MP3 and writes a manifest the page can look words up in. Run it whenever
the dictionary changes; the workflow in .github/workflows/build-voice.yml does
it on demand with a voice fetched straight from Hugging Face.

    python3 scripts/build-voice.py --voice-en .../en_GB-cori-medium \
                                   --voice-ar .../ar_JO-kareem-medium

Existing clips are skipped, so a re-run after adding ten words costs ten clips.
"""

import argparse
import io
import json
import os
import shutil
import subprocess
import sys
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LINES = ROOT / "audio" / "lines.json"
OUT = ROOT / "public" / "tts-audio"


def die(msg):
    print("ERROR: " + msg, file=sys.stderr)
    sys.exit(1)


def encode(wav_bytes, dest, semitones, rate):
    """WAV -> MP3, optionally shifting pitch without changing the tempo."""
    args = ["ffmpeg", "-loglevel", "error", "-y", "-f", "wav", "-i", "pipe:0"]
    if semitones:
        r = 2 ** (semitones / 12)
        args += ["-af", f"asetrate={rate}*{r},aresample={rate},atempo={1/r}"]
    args += ["-c:a", "libmp3lame", "-b:a", "48k", "-ar", "22050", "-ac", "1", str(dest)]
    p = subprocess.run(args, input=wav_bytes, stdout=subprocess.DEVNULL,
                       stderr=subprocess.PIPE)
    if p.returncode != 0:
        die("ffmpeg failed for %s: %s" % (dest.name, p.stderr.decode()[:300]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--voice-en", help="path to the English .onnx voice")
    ap.add_argument("--voice-ar", help="path to the Arabic .onnx voice")
    ap.add_argument("--pitch-en", type=float, default=0.0,
                    help="semitones to raise the English voice")
    ap.add_argument("--pitch-ar", type=float, default=0.0,
                    help="semitones to raise the Arabic voice (Piper has no female Arabic)")
    ap.add_argument("--force", action="store_true", help="re-render existing clips")
    args = ap.parse_args()
    if not args.voice_en and not args.voice_ar:
        die("give --voice-en and/or --voice-ar")

    if shutil.which("ffmpeg") is None:
        die("ffmpeg is not installed")
    if not LINES.exists():
        die("missing %s" % LINES)

    from piper import PiperVoice

    def load(path):
        base = str(path)
        if base.endswith(".onnx"):
            base = base[:-5]
        onnx, cfg = Path(base + ".onnx"), Path(base + ".onnx.json")
        for f in (onnx, cfg):
            if not f.exists():
                die("missing voice file %s" % f)
        v = PiperVoice.load(str(onnx), config_path=str(cfg))
        with open(cfg, encoding="utf-8") as f:
            rate = json.load(f).get("audio", {}).get("sample_rate", 22050)
        return {"name": onnx.stem,
                "synth": getattr(v, "synthesize_wav", None) or v.synthesize,
                "rate": rate}

    # Two voices, because a card shows the English word and its Arabic meaning
    # side by side and a student needs to hear both. Piper ships no female
    # Arabic voice, so --pitch-ar exists to lighten the male one if wanted.
    voices = {}
    if args.voice_en: voices["en"] = load(args.voice_en)
    if args.voice_ar: voices["ar"] = load(args.voice_ar)
    pitches = {"en": args.pitch_en, "ar": args.pitch_ar}

    lines = json.loads(LINES.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)

    # The page matches the text it is about to show against this map, so the
    # manifest is keyed by the exact string rather than by an internal id.
    old = {}
    mf = OUT / "manifest.json"
    if mf.exists():
        try: old = json.loads(mf.read_text(encoding="utf-8"))
        except Exception: old = {}

    manifest = {"en": dict(old.get("en", {})), "ar": dict(old.get("ar", {}))}
    # A manifest written before Arabic existed keyed everything under "byText".
    # Rendering only one language must not drop the other's mapping, so fold
    # the old shape in rather than starting from an empty map.
    if old.get("byText"):
        manifest["en"].update(old["byText"])
    made, skipped = 0, 0
    plan = (("en", "w", "word"), ("en", "s", "sentence"),
            ("ar", "m", "ar"),   ("ar", "t", "arSentence"))
    for i, row in enumerate(lines, 1):
        for lang, kind, field in plan:
            text = (row.get(field) or "").strip()
            if not text or lang not in voices:
                continue
            name = "%s-%s.mp3" % (kind, row["id"])
            dest = OUT / name
            manifest[lang][text] = name
            if dest.exists() and not args.force:
                skipped += 1
                continue
            buf = io.BytesIO()
            with wave.open(buf, "wb") as wf:
                voices[lang]["synth"](text, wf)
            encode(buf.getvalue(), dest, pitches[lang], voices[lang]["rate"])
            made += 1
        if i % 20 == 0:
            print("  %d/%d entries…" % (i, len(lines)), flush=True)

    meta = dict(old)
    if old.get("voice") and not old.get("voice_en"):
        meta["voice_en"] = old["voice"]
        meta["pitch_en"] = old.get("pitch", 0)
    meta.update(manifest)
    for lang in voices:
        meta["voice_" + lang] = voices[lang]["name"]
        meta["pitch_" + lang] = pitches[lang]
    meta.pop("byText", None); meta.pop("voice", None); meta.pop("pitch", None)
    mf.write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")

    total = sum(f.stat().st_size for f in OUT.glob("*.mp3"))
    for lang in voices:
        print("%s: %s (pitch %+g)" % (lang, voices[lang]["name"], pitches[lang]))
    print("rendered: %d   skipped: %d" % (made, skipped))
    print("clips   : %d   total: %.1f MB" % (len(list(OUT.glob('*.mp3'))), total / 1e6))


if __name__ == "__main__":
    main()
