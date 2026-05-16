import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "deep" | "dark";
};

export default function GlassCard({
  children,
  className = "",
  variant = "deep",
}: Props) {
  const v =
    variant === "dark"
      ? "glass-dark"
      : variant === "light"
      ? "glass"
      : "glass-deep";
  return <div className={`${v} rounded-[20px] ${className}`}>{children}</div>;
}
