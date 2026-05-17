import Link from "next/link";

function PalmLogoSvg({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <line x1="20" y1="10" x2="20" y2="44" stroke="#b8963e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 14 C14 8 8 10 6 16 C10 14 16 16 20 20" fill="#b8963e" opacity="0.9" />
      <path d="M20 14 C26 8 32 10 34 16 C30 14 24 16 20 20" fill="#b8963e" opacity="0.9" />
      <path d="M20 10 C16 4 10 4 8 8 C12 7 16 10 20 14" fill="#b8963e" opacity="0.8" />
      <path d="M20 10 C24 4 30 4 32 8 C28 7 24 10 20 14" fill="#b8963e" opacity="0.8" />
    </svg>
  );
}

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/characters", label: "Characters" },
  { href: "/story", label: "Story" },
  { href: "/music", label: "Music" },
  { href: "/skills", label: "Skills" },
  { href: "/games", label: "Games" },
  { href: "/gallery", label: "Gallery" },
  { href: "/ar", label: "AR" },
  { href: "/certificate", label: "Certificate" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="text-center px-6 md:px-16 py-16"
      style={{
        background: "rgba(30,18,12,0.06)",
        borderTop: "1px solid rgba(184,150,62,0.2)",
      }}
    >
      <div className="flex flex-col items-center gap-3 mb-8">
        <div
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,248,235,0.4)",
            border: "2px solid var(--gold)",
            boxShadow:
              "0 4px 16px rgba(184,150,62,0.3), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(184,150,62,0.3)",
          }}
        >
          <PalmLogoSvg />
        </div>
        <p className="font-cinzel text-[13px] tracking-[0.3em] text-[var(--brown)]">
          LEARN UNDER THE PALM TREE
        </p>
        <div className="gold-line" />
      </div>

      <nav className="flex flex-wrap gap-6 md:gap-8 justify-center mb-8">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="font-cinzel text-[10px] tracking-[0.2em] text-[var(--brown-mid)] hover:text-[var(--gold)] transition uppercase"
          >
            {n.label}
          </Link>
        ))}
      </nav>

      <div className="flex gap-4 justify-center mb-8">
        {["📘", "📸", "🐦", "▶️"].map((s, i) => (
          <button
            key={i}
            aria-label={`Social ${i + 1}`}
            className="w-10 h-10 rounded-full flex items-center justify-center text-base transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,248,235,0.3)",
              border: "1px solid rgba(184,150,62,0.3)",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="text-[12px] italic text-[rgba(107,76,56,0.7)] leading-relaxed">
        All educational content, stories, games, characters, and systems are the
        intellectual property of
        <br />
        <strong className="text-[var(--gold)] not-italic">
          Thuraya Mohammed bin Ali Al Naabi
        </strong>{" "}
        — English Teacher, Sumail Al Qurooshiyah.
        <br />
        © {year} Learn Under The Palm Tree. All rights reserved. Unauthorised
        reproduction is strictly prohibited.
      </p>
    </footer>
  );
}
