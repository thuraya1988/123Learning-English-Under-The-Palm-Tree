"use client";
import { useState } from "react";

export const AVATAR_OPTIONS = [
  "🌴", "🦋", "🌸", "⭐", "🦅", "🌙",
  "🌺", "🦁", "🌿", "🐚", "🦚", "✨",
];

type Props = {
  value?: string;
  onChange?: (id: string) => void;
};

export default function AvatarSelector({ value, onChange }: Props) {
  const [internal, setInternal] = useState(value || "🌴");
  const select = (id: string) => {
    setInternal(id);
    onChange?.(id);
  };
  const active = value ?? internal;
  return (
    <div className="grid grid-cols-6 gap-2.5">
      {AVATAR_OPTIONS.map((a) => {
        const selected = active === a;
        return (
          <button
            key={a}
            type="button"
            aria-label={`Avatar ${a}`}
            onClick={() => select(a)}
            className={`w-full aspect-square rounded-full flex items-center justify-center text-xl cursor-pointer transition-all bg-[var(--cream-light)] ${
              selected ? "scale-110" : "hover:scale-105"
            }`}
            style={{
              border: `2px solid ${selected ? "var(--burgundy)" : "rgba(184,150,62,0.25)"}`,
              boxShadow: selected
                ? "0 0 0 3px rgba(91,26,26,0.15), 0 4px 12px rgba(91,26,26,0.18)"
                : "0 2px 8px rgba(61,43,31,0.08)",
            }}
          >
            {a}
          </button>
        );
      })}
    </div>
  );
}
