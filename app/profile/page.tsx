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
  const [avatar, setAvatar] = useState("🌴");

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
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Profile"
          title={<em>{profile?.username || "Guest Learner"}</em>}
          subtitle={profile?.description || "No description on file."}
        />

        <div className="grid lg:grid-cols-12 gap-6">
          <GlassCard className="lg:col-span-7 p-7">
            <p className="font-cinzel text-[12px] tracking-[0.18em] uppercase text-[var(--gold)] mb-3">
              Account
            </p>
            <ul className="text-[var(--brown-mid)] text-sm space-y-2">
              <li>
                <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[var(--brown-mid)]/70">
                  Username:
                </span>{" "}
                {profile?.username || "—"}
              </li>
              <li>
                <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[var(--brown-mid)]/70">
                  Description:
                </span>{" "}
                {profile?.description || "—"}
              </li>
              <li>
                <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[var(--brown-mid)]/70">
                  Email:
                </span>{" "}
                {profile?.email || "—"}
              </li>
              <li>
                <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[var(--brown-mid)]/70">
                  Joined:
                </span>{" "}
                {profile?.createdAt?.slice(0, 10) || "—"}
              </li>
            </ul>
            <div className="gold-line my-6" />
            <p className="font-cinzel text-[12px] tracking-[0.18em] uppercase text-[var(--gold)] mb-3">
              Change Avatar
            </p>
            <AvatarSelector value={avatar} onChange={setAvatar} />
            <div className="mt-6 flex gap-3">
              <GlassButton variant="gold" onClick={save}>
                Save
              </GlassButton>
              <GlassButton variant="dark" onClick={logout}>
                Logout
              </GlassButton>
            </div>
          </GlassCard>

          <GlassCard className="lg:col-span-5 p-7">
            <p className="font-cinzel text-[12px] tracking-[0.18em] uppercase text-[var(--gold)] mb-3">
              Progress
            </p>
            <ul className="text-[var(--brown-mid)] text-sm space-y-2 italic">
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
    </section>
  );
}
