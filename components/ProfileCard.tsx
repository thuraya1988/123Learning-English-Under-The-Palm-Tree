"use client";
import { useEffect, useState } from "react";
import { getProfile, type Profile } from "../lib/progress";

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setProfile(getProfile());
    const refresh = () => setProfile(getProfile());
    window.addEventListener("storage", refresh);
    window.addEventListener("profile-updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("profile-updated", refresh);
    };
  }, []);

  const name = profile?.username || "Young Explorer";
  const desc = profile?.description || "Begin your journey";
  const avatar = profile?.avatar || "🌴";

  return (
    <div
      className="hidden md:flex items-center gap-2.5 px-4 py-1.5 rounded-full"
      style={{
        background: "rgba(255,248,235,0.3)",
        border: "1px solid rgba(184,150,62,0.3)",
        backdropFilter: "blur(12px)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-base"
        style={{
          background: "linear-gradient(135deg, var(--gold-pale), var(--gold-light))",
          border: "1px solid var(--gold)",
        }}
      >
        {avatar}
      </div>
      <div className="flex flex-col leading-tight max-w-[160px]">
        <span className="font-cinzel text-[11px] font-medium text-[var(--brown)] truncate">
          {name}
        </span>
        <span className="text-[10px] italic text-[var(--brown-mid)] truncate">
          {desc}
        </span>
      </div>
    </div>
  );
}
