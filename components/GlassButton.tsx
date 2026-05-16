"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "gold" | "dark" | "ghost" | "outline";

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
  const cls =
    variant === "dark"
      ? "btn-dark"
      : variant === "outline" || variant === "ghost"
      ? "btn-outline"
      : "btn-gold";

  if (href) {
    return (
      <Link href={href} className={`${cls} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={`${cls} ${className}`}>
      {children}
    </button>
  );
}
