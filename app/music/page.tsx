"use client";
import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import GlassCard from "../../components/GlassCard";
import GlassButton from "../../components/GlassButton";
import PipperConnector from "../../components/PipperConnector";
import { MUSIC_CATEGORIES, TRACKS } from "../../data/music";
import { PauseIcon, PlayIcon, MusicIcon } from "../../components/Icons";

export default function MusicPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-16">
      <SectionTitle
        eyebrow="Section 4"
        title="Palm Tree Music"
        subtitle="Songs, soundtrack, and educational music linked to chapters of the story file."
      />

      {/* Three curved category cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {MUSIC_CATEGORIES.map((c) => (
          <div
            key={c.key}
            className="glass overflow-hidden"
            style={{ borderRadius: "180px 180px 28px 28px" }}
          >
            <div className="relative h-56 bg-[radial-gradient(circle_at_50%_40%,rgba(255,244,220,0.6),transparent_70%)] flex items-center justify-center">
              <MusicIcon className="w-16 h-16 text-cocoa/70" />
              <span className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-[0.6rem] tracking-[0.2em] uppercase text-cocoa/70">
                [Cover Art Placeholder]
              </span>
            </div>
            <div className="p-6">
              <h3 className="font-display gold-text text-xl tracking-wide">
                {c.title}
              </h3>
              <p className="text-cocoa/75 text-sm mt-2">{c.blurb}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 10 tracks */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRACKS.map((t) => {
          const playing = playingId === t.id;
          return (
            <GlassCard key={t.id} className="p-6">
              <div className="flex items-center justify-between">
                <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/70">
                  Track {t.id.toString().padStart(2, "0")}
                </span>
                <span className="text-[0.7rem] tracking-[0.18em] uppercase text-cocoa/60">
                  {t.category}
                </span>
              </div>
              <h4 className="font-display gold-text text-xl tracking-wide mt-2">
                {t.title}
              </h4>
              <p className="text-cocoa/70 text-xs mt-2">{t.lyricsPlaceholder}</p>
              <p className="text-cocoa/65 text-xs">{t.audioPlaceholder}</p>
              <p className="text-cocoa/65 text-xs">
                Related chapter: {t.relatedChapter}
              </p>
              <div className="hairline my-4" />
              <div className="flex gap-2">
                <button
                  onClick={() => setPlayingId(playing ? null : t.id)}
                  className="icon-btn"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <PauseIcon /> : <PlayIcon />}
                </button>
                <GlassButton variant="ghost">Lyrics</GlassButton>
                <GlassButton variant="ghost">TTS</GlassButton>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <PipperConnector feature="Music Voice / TTS" />
    </div>
  );
}
