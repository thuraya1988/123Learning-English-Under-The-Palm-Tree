"""Inject the Piper TTS client shim into every game HTML that calls /api/tts.

The shim itself lives at public/js/piper-client.js and intercepts
fetch('/api/tts', ...) calls, routing them to the Piper HF Space instead.
Idempotent: if the marker is already present, the file is skipped.
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MARKER = "piper-client.js"
SCRIPT_TAG = '<script src="/js/piper-client.js"></script>'

# Find every HTML file that calls /api/tts. Use git grep so we stay within the repo.
out = subprocess.check_output(
    ["git", "-C", str(ROOT), "grep", "-l", "/api/tts"], text=True
).strip().splitlines()

targets = [ROOT / p for p in out if p.endswith(".html")]

changed = 0
skipped = 0
for f in targets:
    text = f.read_text(encoding="utf-8", errors="ignore")
    if MARKER in text:
        skipped += 1
        continue
    # Insert just before </head>, preserving indentation.
    m = re.search(r"</head>", text, re.IGNORECASE)
    if not m:
        print(f"  SKIP no </head>: {f.relative_to(ROOT)}")
        continue
    insert_at = m.start()
    new_text = text[:insert_at] + SCRIPT_TAG + "\n" + text[insert_at:]
    f.write_text(new_text, encoding="utf-8")
    changed += 1
    print(f"  inject -> {f.relative_to(ROOT)}")

print(f"\nDONE  injected: {changed}  already-present: {skipped}")
