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

    python3 scripts/build-voice.py --voice public/tts-voices/en_GB-cori-medium

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
    ap.add_argument("--voice", required=True,
                    help="path to the .onnx voice, with or without the extension")
    ap.add_argument("--pitch", type=float, default=0.0,
                    help="semitones to raise the voice (only for a male model)")
    ap.add_argument("--force", action="store_true", help="re-render existing clips")
    args = ap.parse_args()

    if shutil.which("ffmpeg") is None:
        die("ffmpeg is not installed")
    if not LINES.exists():
        die("missing %s" % LINES)

    base = str(args.voice)
    if base.endswith(".onnx"):
        base = base[:-5]
    onnx, cfg = Path(base + ".onnx"), Path(base + ".onnx.json")
    for f in (onnx, cfg):
        if not f.exists():
            die("missing voice file %s" % f)

    from piper import PiperVoice
    voice = PiperVoice.load(str(onnx), config_path=str(cfg))
    synth = getattr(voice, "synthesize_wav", None) or voice.synthesize

    with open(cfg, encoding="utf-8") as f:
        rate = json.load(f).get("audio", {}).get("sample_rate", 22050)

    lines = json.loads(LINES.read_text(encoding="utf-8"))
    OUT.mkdir(parents=True, exist_ok=True)

    # The page matches the English it is about to show against this map, so
    # the manifest is keyed by the exact text rather than by an internal id.
    manifest, made, skipped = {}, 0, 0
    for i, row in enumerate(lines, 1):
        for kind, text in (("w", row["word"]), ("s", row["sentence"])):
            name = "%s-%s.mp3" % (kind, row["id"])
            dest = OUT / name
            manifest[text] = name
            if dest.exists() and not args.force:
                skipped += 1
                continue
            buf = io.BytesIO()
            with wave.open(buf, "wb") as wf:
                synth(text, wf)
            encode(buf.getvalue(), dest, args.pitch, rate)
            made += 1
        if i % 20 == 0:
            print("  %d/%d entries…" % (i, len(lines)), flush=True)

    (OUT / "manifest.json").write_text(
        json.dumps({"voice": onnx.stem, "pitch": args.pitch, "byText": manifest},
                   ensure_ascii=False, indent=1), encoding="utf-8")

    total = sum(f.stat().st_size for f in OUT.glob("*.mp3"))
    print("voice   : %s (pitch %+g)" % (onnx.stem, args.pitch))
    print("rendered: %d   skipped: %d" % (made, skipped))
    print("clips   : %d   total: %.1f MB" % (len(list(OUT.glob('*.mp3'))), total / 1e6))


if __name__ == "__main__":
    main()
