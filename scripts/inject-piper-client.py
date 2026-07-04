"""Inject the Piper TTS client shim + SFX into every game HTML that speaks.

The shims live at public/js/piper-client.js and public/js/palm-sfx.js.
The site deploys on GitHub Pages under a SUBPATH
(/123Learning-English-Under-The-Palm-Tree/), so script src must be
RELATIVE to each file's location — never absolute (/js/...) which 404s.

  - repo-root file            -> public/js/<name>
  - public/new-version/*.html -> ../js/<name>
  - public/h5p/*.html         -> ../js/<name>

Idempotent: if the marker is already present, the file is skipped.
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = [
    ("piper-client.js", '<script src="{p}piper-client.js"></script>'),
    ("palm-sfx.js",     '<script src="{p}palm-sfx.js" defer></script>'),
]


def js_prefix(rel: str) -> str:
    """Relative path from an HTML file's directory to public/js/."""
    if rel.startswith("public/"):
        # public/<subdir>/file.html -> ../js/
        depth = rel.count("/") - 1  # dirs below public/
        return "../" * depth + "js/"
    return "public/js/"


# Find every HTML file that speaks — either by calling /api/tts or by using
# the browser's speechSynthesis. The shim hooks both, so any of them benefits.
out = subprocess.check_output(
    [
        "git", "-C", str(ROOT), "grep", "-l", "-E",
        r"/api/tts|speechSynthesis|SpeechSynthesisUtterance",
    ],
    text=True,
).strip().splitlines()

targets = [p for p in out if p.endswith(".html")]

changed = 0
already = 0
for rel in targets:
    f = ROOT / rel
    text = f.read_text(encoding="utf-8", errors="ignore")
    m = re.search(r"</head>", text, re.IGNORECASE)
    if not m:
        print(f"  SKIP no </head>: {rel}")
        continue
    prefix = js_prefix(rel)
    missing = [tpl.format(p=prefix) for marker, tpl in SCRIPTS if marker not in text]
    if not missing:
        already += 1
        continue
    insert_at = m.start()
    new_text = text[:insert_at] + "\n".join(missing) + "\n" + text[insert_at:]
    f.write_text(new_text, encoding="utf-8")
    changed += 1
    print(f"  inject -> {rel}  (+{len(missing)})")

print(f"\nDONE  files updated: {changed}  already-complete: {already}")
