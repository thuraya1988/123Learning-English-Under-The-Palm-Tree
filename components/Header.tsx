"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PalmIcon from "./PalmIcon";
import ProfileCard from "./ProfileCard";
import {
  HomeIcon,
  MenuIcon,
  BackIcon,
  MusicIcon,
  SearchIcon,
  LogoutIcon,
} from "./Icons";

function IconBtn({
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
  if (href) {
    return (
      <Link href={href} aria-label={label} className="icon-btn">
        {children}
      </Link>
    );
  }
  return (
    <button aria-label={label} onClick={onClick} className="icon-btn">
      {children}
    </button>
  );
}

export default function Header() {
  const router = useRouter();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div
        className="glass mx-auto max-w-[1480px] flex items-center justify-between gap-3 px-4 md:px-6 py-3"
        style={{ background: "linear-gradient(135deg,rgba(255,248,230,0.32),rgba(255,248,230,0.14))" }}
      >
        {/* Left: Logo + Title */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-12 h-12 rounded-full bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] via-[#d6ad58] to-[#8a6529] flex items-center justify-center">
            <PalmIcon className="w-7 h-7" />
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display tracking-[0.22em] text-[0.65rem] text-cocoa/70 uppercase">
              The Palm Series
            </span>
            <span className="font-display gold-text text-lg tracking-wide">
              Learn Under The Palm Tree
            </span>
          </div>
        </Link>

        {/* Profile card */}
        <ProfileCard />

        {/* Right: Icon Buttons */}
        <nav className="flex items-center gap-2">
          <IconBtn label="Home" href="/">
            <HomeIcon />
          </IconBtn>
          <IconBtn label="Menu" href="/about">
            <MenuIcon />
          </IconBtn>
          <IconBtn label="Go Back" onClick={() => router.back()}>
            <BackIcon />
          </IconBtn>
          <IconBtn label="Music" href="/music">
            <MusicIcon />
          </IconBtn>
          <IconBtn label="Search" href="/story">
            <SearchIcon />
          </IconBtn>
          <IconBtn label="Logout" href="/profile">
            <LogoutIcon />
          </IconBtn>
        </nav>
      </div>
    </header>
  );
}
