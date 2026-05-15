"use client";
import { SCHOROM_CONFIG } from "../lib/schorom";

export default function SchoromConnector({
  feature = "Classroom Sync",
}: {
  feature?: string;
}) {
  return (
    <div className="glass-inset p-5">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-display gold-text tracking-wide">
          Schorom Integration
        </h4>
        <span className="text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/60">
          {feature}
        </span>
      </div>
      <ul className="text-cocoa/75 text-xs space-y-1">
        <li>Endpoint: {SCHOROM_CONFIG.endpoint}</li>
        <li>Classroom: {SCHOROM_CONFIG.classroomId}</li>
        <li>API Key: {SCHOROM_CONFIG.apiKey}</li>
        <li>[Schorom Integration Placeholder]</li>
      </ul>
    </div>
  );
}
