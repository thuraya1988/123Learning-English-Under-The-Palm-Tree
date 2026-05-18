"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/#about", label: "About" },
  { href: "/characters", label: "Characters" },
  { href: "/#stories", label: "Stories" },
  { href: "/#songs", label: "Songs" },
  { href: "/#skills", label: "Skills" },
  { href: "/#games", label: "Games" },
  { href: "/#ar", label: "AR" },
];

export default function Header() {
  const [shrunk, setShrunk] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-nav ${shrunk ? "shrunk" : ""}`}>
      <Link href="/" className="nav-brand">
        <img
          src="/Website-icons-logo/realistic-palm-icon.png"
          alt="Palm Tree"
          style={{ width: 50, height: 50, objectFit: "contain" }}
        />
        <span className="brand-name">
          LEARN UNDER
          <br />
          THE PALM TREE
        </span>
      </Link>

      <ul className="nav-links">
        {NAV.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className="nav-link-item">
              {n.label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/#register" className="nav-cta">
          Registration
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 30,
            background: "var(--cream-light)",
            border: "1px solid rgba(184,150,62,0.25)",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 20px 40px rgba(61,43,31,0.15)",
            marginTop: 8,
            minWidth: 240,
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="nav-link-item"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/gallery"
              className="nav-link-item"
              onClick={() => setOpen(false)}
            >
              Gallery
            </Link>
            <Link
              href="/certificate"
              className="nav-link-item"
              onClick={() => setOpen(false)}
            >
              Certificate
            </Link>
            <Link
              href="/profile"
              className="nav-link-item"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
          </nav>
        </div>
      )}
    </nav>
  );
}
