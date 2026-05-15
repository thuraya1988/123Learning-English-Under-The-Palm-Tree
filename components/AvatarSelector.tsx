"use client";
import { useState } from "react";

const PALETTE = [
  { id: "A1", colors: "from-[#f5dfa3] to-[#a87f3a]" },
  { id: "A2", colors: "from-[#e9c97c] to-[#6b4e1f]" },
  { id: "A3", colors: "from-[#d6ad58] to-[#4c3815]" },
  { id: "A4", colors: "from-[#f4e6c4] to-[#8a6529]" },
  { id: "A5", colors: "from-[#ead4a5] to-[#3a2a17]" },
  { id: "A6", colors: "from-[#dbb978] to-[#2d220d]" },
];

type Props = {
  value?: string;
  onChange?: (id: string) => void;
};

export default function AvatarSelector({ value, onChange }: Props) {
  const [internal, setInternal] = useState(value || "A1");
  const select = (id: string) => {
    setInternal(id);
    onChange?.(id);
  };
  return (
    <div className="flex flex-wrap gap-3">
      {PALETTE.map((a) => {
        const active = (value ?? internal) === a.id;
        return (
          <button
            key={a.id}
            type="button"
            aria-label={`Select avatar ${a.id}`}
            onClick={() => select(a.id)}
            className={`relative w-14 h-14 rounded-full bevel border transition-all ${
              active
                ? "border-[rgba(138,101,41,0.8)] shadow-gold scale-110"
                : "border-[rgba(138,101,41,0.4)] hover:scale-105"
            } bg-gradient-to-br ${a.colors}`}
          >
            <span className="absolute inset-0 flex items-center justify-center font-display text-sm text-cocoa">
              {a.id}
            </span>
            {active && (
              <span className="absolute -inset-1 rounded-full ring-2 ring-[rgba(233,201,124,0.65)] animate-pulse pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
}
