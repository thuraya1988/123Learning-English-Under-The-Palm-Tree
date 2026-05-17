"use client";
import { useRef, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import GlassCard from "../../components/GlassCard";
import PipperConnector from "../../components/PipperConnector";
import { MUSIC_CATEGORIES, TRACKS } from "../../data/music";

const MUSIC_ICONS = ["🎵", "🎶", "🎼", "🎹", "🥁", "🎷", "🎺", "🎻", "🎤", "🎧"];

// Sample audio sources for the play/pause demo on the music preview tracks.
// Real per-track audio will come from /public/Songs-section/.
const SAMPLE_AUDIO = [
  "/Website-music-soundeffect/main-background-website-music.mpeg",
  "/Website-music-soundeffect/second-background-website-music.mpeg",
  "/Website-music-soundeffect/music-background.mp3",
  "/Website-music-soundeffect/thinking-music.mp3",
];

export default function MusicPage() {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = (id: number, src: string) => {
    if (playingId === id) {
      audioRef.current?.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = src;
        audioRef.current.play().catch(() => {});
      }
      setPlayingId(id);
    }
  };

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <audio ref={audioRef} onEnded={() => setPlayingId(null)} hidden />

        <SectionTitle
          eyebrow="Sounds of the Palm"
          title={
            <>
              Palm Tree <em>Music</em>
            </>
          }
          subtitle="22 tracks composed by Thuraya Mohammed bin Ali Al Naabi — songs, soundtrack, and educational music linked to the chapters."
        />

        {/* Curved category cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {MUSIC_CATEGORIES.map((c, i) => (
            <div
              key={c.key}
              className="glass-deep overflow-hidden"
              style={{ borderRadius: "180px 180px 24px 24px" }}
            >
              <div
                className="h-52 flex items-center justify-center text-6xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(184,150,62,0.15) 0%, rgba(240,232,220,0.3) 60%, rgba(240,232,220,0.6) 100%)",
                }}
              >
                {["🎵", "🎼", "📚"][i]}
              </div>
              <div className="p-6 text-center">
                <h3 className="font-cinzel text-[13px] tracking-[0.15em] text-[var(--brown)] uppercase mb-2">
                  {c.title}
                </h3>
                <p className="text-sm italic text-[var(--brown-mid)] leading-relaxed">
                  {c.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tracks */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TRACKS.map((t, i) => {
            const playing = playingId === t.id;
            const src = SAMPLE_AUDIO[i % SAMPLE_AUDIO.length];
            return (
              <GlassCard key={t.id} className="p-7">
                <div className="flex items-start gap-5">
                  <button
                    onClick={() => toggle(t.id, src)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0 transition-transform hover:scale-105"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(184,150,62,0.2), rgba(212,176,106,0.3))",
                      border: "1px solid var(--gold)",
                      boxShadow: "0 0 20px rgba(184,150,62,0.15)",
                    }}
                  >
                    {playing ? "⏸" : MUSIC_ICONS[i % MUSIC_ICONS.length]}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)]">
                        Track {String(t.id).padStart(2, "0")}
                      </span>
                      <span className="font-cinzel text-[10px] tracking-[0.18em] uppercase text-[var(--gold)]">
                        {t.category}
                      </span>
                    </div>
                    <h4 className="font-cinzel text-[14px] tracking-[0.12em] text-[var(--brown)] uppercase mb-2">
                      {t.title}
                    </h4>
                    <p className="text-[13px] italic text-[var(--brown-mid)] leading-relaxed">
                      {t.lyricsPlaceholder}
                    </p>
                    <p className="text-[12px] italic text-[var(--brown-mid)]/70 mt-2">
                      Related chapter: {t.relatedChapter}
                    </p>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        <PipperConnector feature="Music Voice / TTS" />
      </div>
    </section>
  );
}
