"use client";
import { useEffect, useState } from "react";
import GlassButton from "../../components/GlassButton";
import GlassCard from "../../components/GlassCard";
import SectionTitle from "../../components/SectionTitle";
import PalmIcon from "../../components/PalmIcon";
import { getProfile, type Profile } from "../../lib/progress";
import { buildCertificatePayload } from "../../lib/certificate";

export default function CertificatePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => setProfile(getProfile()), []);
  const cert = buildCertificatePayload(profile);

  return (
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow="Completion"
        title="Course Completion Certificate"
        subtitle="A luxury glass-gold certificate. Your selected avatar and username will be embedded."
      />

      <div className="glass p-2 rounded-[36px]">
        <div className="relative rounded-[28px] overflow-hidden glass-inset p-10 md:p-16">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(233,201,124,0.55),transparent_70%)] blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(138,101,41,0.45),transparent_70%)] blur-3xl pointer-events-none" />

          <div className="relative flex flex-col items-center gap-6 text-center">
            <div className="w-20 h-20 rounded-full bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] via-[#d6ad58] to-[#8a6529] flex items-center justify-center">
              <PalmIcon className="w-12 h-12" />
            </div>
            <span className="text-[0.7rem] tracking-[0.3em] uppercase text-cocoa/70">
              Certificate Of Completion
            </span>
            <h1 className="font-display gold-text text-4xl md:text-6xl tracking-wide">
              {cert.course}
            </h1>
            <div className="hairline w-60" />
            <p className="text-cocoa/80 max-w-xl text-lg font-serif">
              This is to certify that
            </p>
            <p className="font-display text-3xl md:text-4xl tracking-wide text-cocoa">
              {cert.username}
            </p>
            <div className="w-16 h-16 rounded-full bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] to-[#8a6529] flex items-center justify-center font-display text-cocoa text-lg">
              {cert.avatar}
            </div>
            <p className="text-cocoa/75 max-w-xl font-serif">{cert.statement}</p>

            <div className="grid sm:grid-cols-2 gap-6 w-full max-w-xl mt-4">
              <GlassCard variant="inset" className="p-4">
                <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/60">
                  Completion Date
                </span>
                <p className="font-display gold-text text-lg">
                  {cert.completionDate}
                </p>
              </GlassCard>
              <GlassCard variant="inset" className="p-4">
                <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/60">
                  Signature
                </span>
                <p className="font-display gold-text text-lg">
                  {cert.signature}
                </p>
              </GlassCard>
            </div>

            <div className="mt-6 flex gap-3">
              <GlassButton variant="gold">Download Certificate</GlassButton>
              <GlassButton variant="ghost" href="/">Back Home</GlassButton>
            </div>

            <p className="text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/55 mt-2">
              [Certificate Download Placeholder]
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
