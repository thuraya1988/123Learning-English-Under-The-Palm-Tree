"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HomeIcon,
  MenuIcon,
  BackIcon,
  MusicIcon,
  SearchIcon,
  LogoutIcon,
} from "./Icons";
import { getProfile, type Profile } from "../lib/progress";

function PalmLogoSvg() {
  return (
    <svg viewBox="0 0 40 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" aria-hidden>
      <line x1="20" y1="10" x2="20" y2="44" stroke="#b8963e" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 14 C14 8 8 10 6 16 C10 14 16 16 20 20" fill="#b8963e" opacity="0.9" />
      <path d="M20 14 C26 8 32 10 34 16 C30 14 24 16 20 20" fill="#b8963e" opacity="0.9" />
      <path d="M20 10 C16 4 10 4 8 8 C12 7 16 10 20 14" fill="#b8963e" opacity="0.8" />
      <path d="M20 10 C24 4 30 4 32 8 C28 7 24 10 20 14" fill="#b8963e" opacity="0.8" />
      <path d="M20 8 C18 2 14 0 12 3 C15 3 18 6 20 10" fill="#b8963e" opacity="0.7" />
      <path d="M20 8 C22 2 26 0 28 3 C25 3 22 6 20 10" fill="#b8963e" opacity="0.7" />
      <ellipse cx="20" cy="44" rx="4" ry="1" fill="#b8963e" opacity="0.3" />
    </svg>
  );
}

function NavItem({
  label,
  onClick,
  href,
  children,
}: {
  label: string;
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}) {
  const inner = (
    <>
      <div className="nav-btn">{children}</div>
      <span className="hidden md:block font-cinzel text-[9px] tracking-[0.08em] uppercase text-[var(--brown-mid)] mt-1">
        {label}
      </span>
    </>
  );
  if (href) {
    return (
      <Link href={href} className="flex flex-col items-center" aria-label={label}>
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="flex flex-col items-center" aria-label={label}>
      {inner}
    </button>
  );
}

export default function Header() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setProfile(getProfile());
    const refresh = () => setProfile(getProfile());
    window.addEventListener("profile-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("profile-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const name = profile?.username || "Your Name";
  const desc = profile?.description || "Young Explorer";
  const avatar = profile?.avatar || "🌿";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[1000] px-5 md:px-10 py-3 flex items-center justify-between"
      style={{
        background: "rgba(240,232,220,0.2)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(184,150,62,0.25)",
        boxShadow:
          "0 4px 24px rgba(61,43,31,0.08), inset 0 1px 0 rgba(255,248,235,0.8)",
      }}
    >
      <div className="flex items-center gap-5">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Home"
          className="w-[54px] h-[54px] rounded-full flex items-center justify-center transition-transform hover:scale-105"
          style={{
            background: "rgba(255,248,235,0.4)",
            border: "2px solid var(--gold)",
            boxShadow:
              "0 4px 16px rgba(184,150,62,0.3), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(184,150,62,0.3)",
          }}
        >
          <PalmLogoSvg />
        </Link>

        {/* Brand text */}
        <div className="hidden sm:flex flex-col leading-none">
          <span className="font-cinzel text-[13px] font-medium tracking-[0.18em] text-[var(--brown)]">
            LEARN UNDER
          </span>
          <span className="font-cinzel text-[10px] tracking-[0.25em] text-[var(--gold)] flex items-center gap-1.5 mt-1">
            <span className="inline-block w-5 h-px bg-[var(--gold-light)]" />
            THE PALM TREE
            <span className="inline-block w-5 h-px bg-[var(--gold-light)]" />
          </span>
        </div>

        {/* Profile card */}
        <div
          className="hidden lg:flex items-center gap-2.5 px-4 py-1.5 rounded-full ml-4 glass"
          style={{
            background: "rgba(255,248,235,0.3)",
            border: "1px solid rgba(184,150,62,0.3)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-base"
            style={{
              background: "linear-gradient(135deg, var(--gold-pale), var(--gold-light))",
              border: "1px solid var(--gold)",
            }}
          >
            {avatar}
          </div>
          <div className="flex flex-col leading-tight max-w-[160px]">
            <span className="font-cinzel text-[11px] font-medium text-[var(--brown)] truncate">
              {name}
            </span>
            <span className="text-[10px] italic text-[var(--brown-mid)] truncate">
              {desc}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-2.5">
        <NavItem label="Home" href="/">
          <HomeIcon />
        </NavItem>
        <NavItem label="Menu" href="/about">
          <MenuIcon />
        </NavItem>
        <NavItem label="Go Back" onClick={() => router.back()}>
          <BackIcon />
        </NavItem>
        <NavItem label="Music" href="/music">
          <MusicIcon />
        </NavItem>
        <NavItem label="Search" href="/story">
          <SearchIcon />
        </NavItem>
        <NavItem label="Logout" href="/profile">
          <LogoutIcon />
        </NavItem>
      </nav>
    </header>
  );
}
