"use client";
import { useEffect, useState } from "react";
import { getProfile, type Profile } from "../lib/progress";

export default function ProfileCard() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setProfile(getProfile());
    const onStorage = () => setProfile(getProfile());
    window.addEventListener("storage", onStorage);
    window.addEventListener("profile-updated", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("profile-updated", onStorage);
    };
  }, []);

  const name = profile?.username || "Guest Learner";
  const desc = profile?.description || "Begin your cinematic English journey";
  const avatar = profile?.avatar || "A1";

  return (
    <div className="hidden md:flex items-center gap-3 pl-2 pr-5 py-1.5 rounded-full glass min-w-[260px] max-w-[340px]">
      <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[rgba(138,101,41,0.55)] bevel bg-gradient-to-br from-[#f5dfa3] to-[#a87f3a] flex items-center justify-center text-cocoa font-display text-sm">
        {avatar}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-[0.95rem] gold-text tracking-wide">
          {name}
        </span>
        <span className="text-[0.72rem] text-cocoa/70 truncate max-w-[200px]">
          {desc}
        </span>
      </div>
    </div>
  );
}
