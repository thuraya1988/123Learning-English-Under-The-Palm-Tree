import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "light" | "dark" | "inset";
};

export default function GlassCard({
  children,
  className = "",
  variant = "light",
}: Props) {
  const v =
    variant === "dark"
      ? "glass-dark"
      : variant === "inset"
      ? "glass-inset"
      : "glass";
  return (
    <div className={`${v} ${className}`}>
      <div className="relative">{children}</div>
    </div>
  );
}
