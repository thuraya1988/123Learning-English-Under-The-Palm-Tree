"use client";
import { PIPPER_CONFIG } from "../lib/pipper";

export default function PipperConnector({
  feature = "Voice Playback",
}: {
  feature?: string;
}) {
  return (
    <div className="skill-card !text-left !p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="font-cinzel text-[11px] tracking-[0.18em] text-[var(--gold)] uppercase">
          Pipper Integration
        </p>
        <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-[var(--brown-mid)]">
          {feature}
        </span>
      </div>
      <ul className="text-[var(--brown-mid)] text-[11px] italic space-y-1">
        <li>Endpoint: {PIPPER_CONFIG.endpoint}</li>
        <li>Voice: {PIPPER_CONFIG.voiceId}</li>
        <li>API Key: {PIPPER_CONFIG.apiKey}</li>
        <li>[Pipper Integration Placeholder]</li>
      </ul>
    </div>
  );
}
