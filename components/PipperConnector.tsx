"use client";
import { PIPPER_CONFIG } from "../lib/pipper";

export default function PipperConnector({
  feature = "Voice Playback",
}: {
  feature?: string;
}) {
  return (
    <div className="glass-inset p-5">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display gold-text tracking-wide">
          Pipper Integration
        </h4>
        <span className="text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/60">
          {feature}
        </span>
      </div>
      <ul className="text-cocoa/75 text-xs space-y-1">
        <li>Endpoint: {PIPPER_CONFIG.endpoint}</li>
        <li>Voice: {PIPPER_CONFIG.voiceId}</li>
        <li>API Key: {PIPPER_CONFIG.apiKey}</li>
        <li>[Pipper Integration Placeholder]</li>
      </ul>
    </div>
  );
}
