"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "../../components/SectionTitle";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import AvatarSelector from "../../components/AvatarSelector";
import { clearProfile, getProfile, setProfile, type Profile } from "../../lib/progress";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setLocal] = useState<Profile | null>(null);
  const [avatar, setAvatar] = useState("A1");

  useEffect(() => {
    const p = getProfile();
    setLocal(p);
    if (p) setAvatar(p.avatar);
  }, []);

  const save = () => {
    if (!profile) return;
    const next = { ...profile, avatar };
    setProfile(next);
    setLocal(next);
  };

  const logout = () => {
    clearProfile();
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow="Profile"
        title={profile?.username || "Guest Learner"}
        subtitle={profile?.description || "No description on file."}
      />

      <div className="grid lg:grid-cols-12 gap-6">
        <GlassCard className="lg:col-span-7 p-7">
          <h3 className="font-display gold-text text-xl tracking-wide">
            Account
          </h3>
          <div className="hairline my-4" />
          <ul className="text-cocoa/80 text-sm space-y-2">
            <li>
              <span className="opacity-70 tracking-wide uppercase text-xs">
                Username:
              </span>{" "}
              {profile?.username || "—"}
            </li>
            <li>
              <span className="opacity-70 tracking-wide uppercase text-xs">
                Description:
              </span>{" "}
              {profile?.description || "—"}
            </li>
            <li>
              <span className="opacity-70 tracking-wide uppercase text-xs">
                Email:
              </span>{" "}
              {profile?.email || "—"}
            </li>
            <li>
              <span className="opacity-70 tracking-wide uppercase text-xs">
                Joined:
              </span>{" "}
              {profile?.createdAt?.slice(0, 10) || "—"}
            </li>
          </ul>

          <div className="hairline my-6" />
          <h4 className="font-display gold-text">Change Avatar</h4>
          <div className="mt-3">
            <AvatarSelector value={avatar} onChange={setAvatar} />
          </div>
          <div className="mt-6 flex gap-3">
            <GlassButton variant="gold" onClick={save}>Save</GlassButton>
            <GlassButton variant="dark" onClick={logout}>Logout</GlassButton>
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-5 p-7">
          <h3 className="font-display gold-text text-xl tracking-wide">
            Progress
          </h3>
          <div className="hairline my-4" />
          <ul className="text-cocoa/80 text-sm space-y-2">
            <li>Chapters completed: [Progress Placeholder]</li>
            <li>Skills unlocked: [Progress Placeholder]</li>
            <li>Game levels: [Progress Placeholder]</li>
            <li>Certificate ready: [Progress Placeholder]</li>
          </ul>
          <div className="mt-6">
            <GlassButton variant="gold" href="/certificate">
              View Certificate
            </GlassButton>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
