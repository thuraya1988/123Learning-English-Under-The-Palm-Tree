import Link from "next/link";

const COL_1 = [
  { href: "/about", label: "About" },
  { href: "/story", label: "Story chapters" },
  { href: "/skills", label: "Skills practice" },
];

const COL_2 = [
  { href: "/games", label: "Games" },
  { href: "/characters", label: "Characters and gallery" },
  { href: "/ar", label: "AR trip" },
];

const COL_3 = [
  { href: "/music", label: "Website songs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/certificate", label: "Certificate" },
];

const SOCIAL = [
  { label: "Instagram", icon: "📸" },
  { label: "YouTube", icon: "▶️" },
  { label: "X", icon: "𝕏" },
  { label: "TikTok", icon: "🎵" },
];

function PalmMonogram() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden>
      <g fill="none" stroke="#e8d5a3" strokeWidth="1.6" strokeLinecap="round">
        <path d="M24 8 V42" />
        <path d="M24 10 C 16 8, 8 14, 6 22" />
        <path d="M24 10 C 32 8, 40 14, 42 22" />
        <path d="M24 16 C 14 16, 8 22, 6 30" />
        <path d="M24 16 C 34 16, 40 22, 42 30" />
      </g>
      <circle cx="24" cy="8" r="2" fill="#e8d5a3" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-forest mt-20 px-6 md:px-12 pt-14 pb-10">
      <div className="max-w-[1400px] mx-auto grid md:grid-cols-12 gap-10">
        <div className="md:col-span-3 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <PalmMonogram />
            <span className="font-cormorant text-3xl text-[var(--cream)]">
              Palm
            </span>
          </div>
          <p className="text-[var(--cream)]/80 italic text-sm leading-relaxed">
            Where art, nature, and language come together — under one palm tree.
          </p>
        </div>

        <FooterCol title="Learn" items={COL_1} />
        <FooterCol title="Explore" items={COL_2} />
        <FooterCol title="Listen & Earn" items={COL_3} />

        <div className="md:col-span-2 flex flex-col gap-3">
          <p className="font-cinzel text-[11px] tracking-[0.22em] uppercase text-[var(--gold-pale)]">
            Follow
          </p>
          <div className="flex gap-2.5">
            {SOCIAL.map((s) => (
              <button
                key={s.label}
                aria-label={s.label}
                className="w-10 h-10 rounded-full flex items-center justify-center text-base bg-[rgba(255,255,255,0.06)] border border-[rgba(216,196,144,0.25)] hover:bg-[rgba(255,255,255,0.12)] transition"
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-12 pt-6 border-t border-[rgba(216,196,144,0.18)] text-[var(--cream)]/70 text-xs italic flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <span>
          © {year} Learn Under The Palm Tree. All rights reserved.
        </span>
        <span>
          Created by{" "}
          <strong className="text-[var(--gold-pale)] not-italic">
            Thuraya Mohammed bin Ali Al Naabi
          </strong>{" "}
          — Sumail Al Qurooshiyah.
        </span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { href: string; label: string }[];
}) {
  return (
    <div className="md:col-span-2 flex flex-col gap-3">
      <p className="font-cinzel text-[11px] tracking-[0.22em] uppercase text-[var(--gold-pale)]">
        {title}
      </p>
      <nav className="flex flex-col gap-2">
        {items.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="text-[var(--cream)]/85 hover:text-[var(--cream)] text-sm transition"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
