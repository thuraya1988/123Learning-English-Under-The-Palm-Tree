"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/story", label: "Story chapters" },
  { href: "/skills", label: "Skills practice" },
  { href: "/games", label: "Games" },
  { href: "/characters", label: "Characters and gallery" },
  { href: "/ar", label: "AR trip" },
  { href: "/music", label: "Website songs" },
];

function PalmMonogram() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden>
      <defs>
        <linearGradient id="m-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d4b06a" />
          <stop offset="1" stopColor="#7a5a1f" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#m-grad)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M24 8 V42" />
        <path d="M24 10 C 16 8, 8 14, 6 22" />
        <path d="M24 10 C 32 8, 40 14, 42 22" />
        <path d="M24 16 C 14 16, 8 22, 6 30" />
        <path d="M24 16 C 34 16, 40 22, 42 30" />
      </g>
      <circle cx="24" cy="8" r="2" fill="#b8963e" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] px-5 md:px-10 py-4 bg-[var(--cream)]/85 backdrop-blur-md border-b border-[rgba(184,150,62,0.2)]">
      <div className="max-w-[1480px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <PalmMonogram />
          <span className="font-cormorant text-3xl font-medium tracking-wide text-[var(--burgundy)] hidden sm:inline">
            Palm
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {NAV.map((n) => {
            const active =
              pathname === n.href ||
              (n.href !== "/" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`nav-link ${active ? "active" : ""}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link href="/#register" className="btn-burgundy !py-2.5 !px-5 !text-sm">
            Registration
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="menu-pill"
            aria-label="Open menu"
          >
            {open ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M6 6l12 12M6 18 18 6" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden mt-4 p-5 rounded-2xl bg-[var(--cream-light)] border border-[rgba(184,150,62,0.25)] shadow-lg">
          <nav className="flex flex-col gap-3">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/gallery"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/certificate"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              Certificate
            </Link>
            <Link
              href="/profile"
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
