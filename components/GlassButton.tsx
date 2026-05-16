"use client";
import Link from "next/link";
import { ReactNode } from "react";

type Variant = "burgundy" | "dark" | "outline" | "gold" | "ghost";

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
  variant = "burgundy",
  className = "",
  type = "button",
}: Props) {
  const cls =
    variant === "dark"
      ? "btn-dark"
      : variant === "outline" || variant === "ghost"
      ? "btn-outline"
      : variant === "gold"
      ? "btn-gold"
      : "btn-burgundy";

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
