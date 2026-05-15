"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "gold" | "dark" | "ghost";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function GlassButton({
  children,
  href,
  onClick,
  variant = "gold",
  className = "",
  type = "button",
}: Props) {
  const base =
    variant === "dark"
      ? "btn-dark"
      : variant === "ghost"
      ? "btn-gold !bg-none !text-cocoa border border-[rgba(138,101,41,0.55)] !shadow-none hover:!shadow-glass bg-[rgba(255,248,230,0.35)] backdrop-blur-md"
      : "btn-gold";

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
