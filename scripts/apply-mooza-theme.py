"""Strong-override palm-palette theme injector.
Targets all game/skill HTML files and overrides their CSS variables
(--bg, --red, --blue, --green, --gold, --ink, --white, --purple, etc.)
to enforce the 4-color palm palette.
Palette:
  --brown-dark : #473624  (main text / borders)
  --cream      : #f3ecda  (main background)
  --tan        : #ab997e  (soft accents / hover)
  --brown-deep : #38170f  (buttons / deep emphasis)
Cards/buttons get beveled (cut-corner) edges via clip-path.
"""
import re
from pathlib import Path

ROOT = Path(".")
THEME_MARK = "/* PALM-PALETTE-THEME */"

TARGETS = sorted(ROOT.glob("public/h5p/*.html"))
TARGETS += sorted(ROOT.glob("public/new-version/*.html"))
for name in ["2castel-of-the-palms.html", "saloan-marhoona-new.html",
             "ar-two-games.html", "under-the-palm-complex-level.html",
             "mooza-kitchen.html"]:
    p = ROOT / name
    if p.exists():
        TARGETS.append(p)

THEME_BLOCK = """
<!-- Palm Palette Theme (strong override) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@400;600;700&family=Aref+Ruqaa:wght@400;700&display=swap" rel="stylesheet">
<style id="palm-palette-theme">
/* PALM-PALETTE-THEME */
:root{
  --brown-dark:#473624;
  --cream:#f3ecda;
  --tan:#ab997e;
  --brown-deep:#38170f;
  --font-title:'Cormorant Garamond',serif;
  --font-body:'Lora',Georgia,serif;
  --font-label:'Cinzel',serif;
  --font-arabic:'Aref Ruqaa',serif;
  --bevel:14px;
  /* Override common game variables -> palm palette */
  --bg:#f3ecda; --bg2:#e8e0d0; --bg-deep:#f3ecda; --bg-light:#faf6ef;
  --red:#38170f; --redb:#5a2515; --redl:#f3ecda;
  --blue:#473624; --blueb:#ab997e; --bluel:#f3ecda;
  --green:#ab997e; --greenb:#c4b59a; --greenl:#f3ecda;
  --gold:#473624; --goldb:#ab997e; --goldl:#f3ecda;
  --purple:#38170f; --purpleb:#5a2515;
  --ink:#473624; --white:#f3ecda; --black:#1a1208;
  --primary:#38170f; --secondary:#ab997e;
  --accent:#38170f; --accent-gold:#473624;
  --burgundy:#38170f; --deep-green:#473624;
  --text:#473624; --text-light:#5e4d35; --text-muted:#7a6850;
}
html,body{
  background:var(--cream)!important;
  color:var(--brown-dark)!important;
  font-family:var(--font-body)!important;
}
h1,h2,h3,h4,h5,h6{
  font-family:var(--font-title)!important;
  color:var(--brown-dark)!important;
  letter-spacing:.04em;
}
h3{font-family:var(--font-label)!important;text-transform:uppercase;letter-spacing:.18em;font-size:.85rem!important;color:var(--brown-deep)!important;opacity:.85}
p,li,span:not(.emoji):not(.icon),div,label{font-family:var(--font-body),Georgia,serif}
[dir="rtl"],.arabic,.ar{font-family:var(--font-arabic),serif!important}
a{color:var(--brown-deep)!important;text-decoration:none;border-bottom:1px solid var(--tan)}
a:hover{color:var(--brown-dark)!important;border-bottom-color:var(--brown-dark)}
hr{border-color:var(--tan)!important;opacity:.6}
.card,.box,.panel,.container,.tile,.option,.choice,.cell,.pad,.tray,
button,.btn,.button,input[type="button"],input[type="submit"]{
  clip-path:polygon(var(--bevel) 0,100% 0,100% calc(100% - var(--bevel)),calc(100% - var(--bevel)) 100%,0 100%,0 var(--bevel));
  border-radius:0!important;
}
.card,.box,.panel,.container,.tile,.tray{
  background:rgba(171,153,126,.12)!important;
  border:1px solid var(--tan)!important;
  color:var(--brown-dark)!important;
}
button,.btn,.button,input[type="button"],input[type="submit"]{
  background:var(--brown-deep)!important;
  color:var(--cream)!important;
  border:1px solid var(--brown-dark)!important;
  font-family:var(--font-label)!important;
  letter-spacing:.1em;
  text-transform:uppercase;
  padding:.8em 1.4em;
  cursor:pointer;
  transition:background .25s ease,color .25s ease;
}
button:hover,.btn:hover,.button:hover{background:var(--tan)!important;color:var(--brown-dark)!important}
input[type="text"],input[type="number"],input[type="email"],textarea,select{
  background:rgba(243,236,218,.6)!important;
  border:1px solid var(--tan)!important;
  color:var(--brown-dark)!important;
  font-family:var(--font-body)!important;
  padding:.5em .8em;
  clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px);
  border-radius:0!important;
}
[class*="bg-red"],[class*="bg-blue"],[class*="bg-green"],[class*="bg-purple"],
[class*="bg-yellow"],[class*="bg-orange"]{
  background:var(--brown-deep)!important;color:var(--cream)!important;
}
[class*="bg-white"],[class*="bg-gray"],[class*="bg-cream"]{
  background:var(--cream)!important;color:var(--brown-dark)!important;
}
[class*="text-red"],[class*="text-blue"],[class*="text-green"],[class*="text-purple"]{
  color:var(--brown-deep)!important;
}
</style>
"""

old_block_pat = re.compile(
    r"<!-- Palm Palette Theme.*?</style>\s*",
    re.DOTALL | re.IGNORECASE,
)

changed = 0
for f in TARGETS:
    text = f.read_text(encoding="utf-8", errors="ignore")
    new_text, n = old_block_pat.subn("", text)
    m = re.search(r"</head>", new_text, re.IGNORECASE)
    if not m:
        print(f"SKIP no </head>: {f}")
        continue
    new_text = new_text[:m.start()] + THEME_BLOCK + "\n" + new_text[m.start():]
    if new_text != text:
        f.write_text(new_text, encoding="utf-8")
        changed += 1
        action = "re-inject" if n else "inject"
        print(f"  {action} -> {f}")

print(f"\nDONE  files updated: {changed}")
