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


def encode(wav_bytes, dest, semitones, rate, dur=0.0):
    """WAV -> MP3, optionally shifting pitch without changing the tempo.

    Clips play back to back, and a clip that starts on a non-zero sample
    clicks at the join — which is what a listener hears as crackle. Measured
    on a real clip: the old encode began at amplitude 11 and ended at 24.
    So fade a few milliseconds in and out and pad both ends with silence.
    """
    chain = []
    if semitones:
        r = 2 ** (semitones / 12)
        chain.append(f"asetrate={rate}*{r},aresample={rate},atempo={1/r}")
    chain.append("afade=t=in:st=0:d=0.02")
    if dur > 0.12:
        chain.append("afade=t=out:st=%.3f:d=0.04" % max(0.0, dur - 0.04))
    chain.append("adelay=35|35")
    chain.append("apad=pad_dur=0.07")
    args = ["ffmpeg", "-loglevel", "error", "-y", "-f", "wav", "-i", "pipe:0",
            "-af", ",".join(chain),
            "-c:a", "libmp3lame", "-b:a", "64k", "-ar", "22050", "-ac", "1", str(dest)]
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
    manifest = {"en": {}, "ar": {}}
    words = {}
    made, skipped, missing = 0, 0, 0
    for i, row in enumerate(lines, 1):
        lang, text, name = row["lang"], row["text"], row["id"] + ".mp3"
        if row.get("kind") == "word":
            words[text] = 1
        if lang not in voices:
            # This language was not rendered in this run; keep whatever the
            # previous run produced so building one language never silently
            # drops the other.
            if (OUT / name).exists():
                manifest[lang][text] = name
            else:
                missing += 1
            continue
        dest = OUT / name
        manifest[lang][text] = name
        if dest.exists() and not args.force:
            skipped += 1
            continue
        buf = io.BytesIO()
        with wave.open(buf, "wb") as wf:
            voices[lang]["synth"](text, wf)
        raw = buf.getvalue()
        with wave.open(io.BytesIO(raw)) as r:
            dur = r.getnframes() / float(r.getframerate() or 1)
        encode(raw, dest, pitches[lang], voices[lang]["rate"], dur)
        made += 1
        if made % 50 == 0:
            print("  %d/%d lines…" % (i, len(lines)), flush=True)

    meta = {}
    mf = OUT / "manifest.json"
    if mf.exists():
        try: meta = json.loads(mf.read_text(encoding="utf-8"))
        except Exception: meta = {}
    meta.update(manifest)
    meta["words"] = words
    for lang in voices:
        meta["voice_" + lang] = voices[lang]["name"]
        meta["pitch_" + lang] = pitches[lang]
    meta.pop("byText", None); meta.pop("voice", None); meta.pop("pitch", None)
    mf.write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")
    if missing:
        print("note: %d %s lines have no clip yet" % (missing, "other-language"))

    # A line that changes its wording gets a new fingerprint, so its old clip
    # is left behind with nothing pointing at it. Sweep those away, or the
    # folder grows with every edit — 101 had piled up by the seventh build.
    keep = {f for L in ("en", "ar") for f in manifest[L].values()}
    dead = [f for f in OUT.glob("*.mp3") if f.name not in keep]
    for f in dead:
        f.unlink()
    if dead:
        print("swept %d orphaned clip(s)" % len(dead))

    total = sum(f.stat().st_size for f in OUT.glob("*.mp3"))
    for lang in voices:
        print("%s: %s (pitch %+g)" % (lang, voices[lang]["name"], pitches[lang]))
    print("rendered: %d   skipped: %d" % (made, skipped))
    print("clips   : %d   total: %.1f MB" % (len(list(OUT.glob('*.mp3'))), total / 1e6))


if __name__ == "__main__":
    main()
