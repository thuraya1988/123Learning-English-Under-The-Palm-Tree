"use client";
import { useEffect, useState } from "react";
import GlassButton from "../../components/GlassButton";
import SectionTitle from "../../components/SectionTitle";
import PalmIcon from "../../components/PalmIcon";
import { getProfile, type Profile } from "../../lib/progress";
import { buildCertificatePayload } from "../../lib/certificate";

export default function CertificatePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => setProfile(getProfile()), []);
  const cert = buildCertificatePayload(profile);

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Completion"
          title={
            <>
              Your <em>Certificate</em>
            </>
          }
          subtitle="A luxury glass-gold certificate carrying your avatar, your name, and your journey."
        />

        <div className="glass-deep p-3 rounded-[28px]">
          <div
            className="relative overflow-hidden p-10 md:p-16 rounded-[20px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,248,235,0.55), rgba(247,242,235,0.65))",
              border: "1px solid rgba(184,150,62,0.45)",
              boxShadow:
                "inset 0 4px 12px rgba(61,43,31,0.08), inset 0 -2px 6px rgba(255,248,235,0.8)",
            }}
          >
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(184,150,62,0.35),transparent_70%)] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(184,150,62,0.3),transparent_70%)] blur-3xl pointer-events-none" />

            <div className="relative flex flex-col items-center gap-6 text-center">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "rgba(255,248,235,0.6)",
                  border: "2px solid var(--gold)",
                  boxShadow:
                    "0 4px 16px rgba(184,150,62,0.35), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <PalmIcon className="w-11 h-11" />
              </div>
              <p className="eyebrow">Certificate of Completion</p>
              <h1 className="title-cormorant text-4xl md:text-6xl">
                {cert.course}
              </h1>
              <div className="gold-line" />
              <p className="font-eb text-lg italic text-[var(--brown-mid)] max-w-xl">
                This is to certify that
              </p>
              <p className="font-cormorant text-3xl md:text-4xl text-[var(--brown)] tracking-wide">
                {cert.username}
              </p>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--gold-pale), var(--gold-light))",
                  border: "1px solid var(--gold)",
                }}
              >
                {cert.avatar}
              </div>
              <p className="text-[var(--brown-mid)] italic max-w-xl">
                {cert.statement}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 w-full max-w-xl mt-4">
                <div className="skill-card !text-center !p-5">
                  <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)] mb-1">
                    Completion Date
                  </p>
                  <p className="font-cormorant text-2xl text-[var(--gold)]">
                    {cert.completionDate}
                  </p>
                </div>
                <div className="skill-card !text-center !p-5">
                  <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)] mb-1">
                    Signature
                  </p>
                  <p className="font-cormorant text-2xl text-[var(--gold)] italic">
                    {cert.signature}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3 flex-wrap justify-center">
                <GlassButton variant="gold">Download Certificate</GlassButton>
                <GlassButton variant="outline" href="/">
                  Back Home
                </GlassButton>
              </div>

              <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)]/60 mt-2">
                [Certificate Download Placeholder]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
