"""Inject the Piper TTS client shim into every game HTML that calls /api/tts.

The shim itself lives at public/js/piper-client.js and intercepts
fetch('/api/tts', ...) calls, routing them to the Piper HF Space instead.
Idempotent: if the marker is already present, the file is skipped.
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPT_TAGS = [
    ('piper-client.js', '<script src="/js/piper-client.js"></script>'),
    ('palm-sfx.js',     '<script src="/js/palm-sfx.js" defer></script>'),
]
MARKER = SCRIPT_TAGS[0][0]  # back-compat for the report line below
SCRIPT_TAG = "\n".join(tag for _, tag in SCRIPT_TAGS)

# Find every HTML file that speaks — either by calling /api/tts or by using
# the browser's speechSynthesis. The shim hooks both, so any of them benefits.
out = subprocess.check_output(
    [
        "git", "-C", str(ROOT), "grep", "-l", "-E",
        r"/api/tts|speechSynthesis|SpeechSynthesisUtterance",
    ],
    text=True,
).strip().splitlines()

targets = [ROOT / p for p in out if p.endswith(".html")]

changed = 0
already = 0
for f in targets:
    text = f.read_text(encoding="utf-8", errors="ignore")
    m = re.search(r"</head>", text, re.IGNORECASE)
    if not m:
        print(f"  SKIP no </head>: {f.relative_to(ROOT)}")
        continue
    missing = [tag for marker, tag in SCRIPT_TAGS if marker not in text]
    if not missing:
        already += 1
        continue
    insert_at = m.start()
    new_text = text[:insert_at] + "\n".join(missing) + "\n" + text[insert_at:]
    f.write_text(new_text, encoding="utf-8")
    changed += 1
    print(f"  inject -> {f.relative_to(ROOT)}  (+{len(missing)})")

print(f"\nDONE  files updated: {changed}  already-complete: {already}")
