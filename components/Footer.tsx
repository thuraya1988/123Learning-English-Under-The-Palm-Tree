import Link from "next/link";
import PalmIcon from "./PalmIcon";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/characters", label: "Characters" },
  { href: "/story", label: "Story" },
  { href: "/music", label: "Music" },
  { href: "/skills", label: "Skills" },
  { href: "/games", label: "Games" },
  { href: "/ar", label: "AR" },
  { href: "/certificate", label: "Certificate" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 px-4 md:px-12 pb-10">
      <div className="glass mx-auto max-w-[1480px] px-6 md:px-12 py-10 flex flex-col gap-8 overflow-hidden">
        <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(233,201,124,0.45),transparent_70%)] blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] via-[#d6ad58] to-[#8a6529] flex items-center justify-center">
              <PalmIcon className="w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-display gold-text text-xl tracking-wide">
                Learn Under The Palm Tree
              </span>
              <span className="text-[0.7rem] text-cocoa/70 tracking-[0.2em] uppercase">
                Cinematic English Journey
              </span>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navItems.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-cocoa/80 hover:text-cocoa hover:gold-text text-sm tracking-[0.18em] uppercase transition"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hairline" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-cocoa/70 text-xs tracking-[0.18em] uppercase">
          <span>
            © {year} Learn Under The Palm Tree. All rights reserved.
          </span>
          <div className="flex gap-3 opacity-70">
            <span>[Social Placeholder]</span>
            <span>[Social Placeholder]</span>
            <span>[Social Placeholder]</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
