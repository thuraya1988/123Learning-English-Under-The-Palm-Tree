"use client";
import { SCHOROM_CONFIG } from "../lib/schorom";

export default function SchoromConnector({
  feature = "Classroom Sync",
}: {
  feature?: string;
}) {
  return (
    <div className="skill-card !text-left !p-5">
      <div className="flex items-center justify-between mb-2">
        <p className="font-cinzel text-[11px] tracking-[0.18em] text-[var(--gold)] uppercase">
          Schorom Integration
        </p>
        <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-[var(--brown-mid)]">
          {feature}
        </span>
      </div>
      <ul className="text-[var(--brown-mid)] text-[11px] italic space-y-1">
        <li>Endpoint: {SCHOROM_CONFIG.endpoint}</li>
        <li>Classroom: {SCHOROM_CONFIG.classroomId}</li>
        <li>API Key: {SCHOROM_CONFIG.apiKey}</li>
        <li>[Schorom Integration Placeholder]</li>
      </ul>
    </div>
  );
}
