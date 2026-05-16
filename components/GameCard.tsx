import Link from "next/link";
import { Game } from "../data/games";

const GAME_EMOJI: Record<string, string> = {
  dominah: "🎯",
  "palm-stone-path": "🪨",
  "village-word-race": "🏁",
  "date-basket-challenge": "🌴",
  "desert-listening-trail": "👂",
  "traditional-market-match": "🛍️",
  "palm-shadow-guess": "🌑",
  "heritage-sentence-builder": "🧩",
  "old-village-treasure-hunt": "🗝️",
  "pearl-and-palm-quest": "🐚",
  "ai-speaking-coach": "🎤",
  "grammar-galaxy-mission": "🚀",
  "listening-light-tunnel": "💡",
  "vocabulary-builder-lab": "🧪",
  "story-timeline-architect": "📜",
  "pronunciation-mirror": "🪞",
  "sentence-repair-studio": "🛠️",
  "chapter-detective": "🔎",
  "dialogue-roleplay-arena": "🎭",
  "progress-quest": "🗺️",
};

export default function GameCard({ game }: { game: Game }) {
  const eraLabel = game.category === "1973" ? "Heritage · 1973" : "Modern · 2026";
  return (
    <Link
      href={`/games/${game.category}/${game.slug}`}
      className="glass-deep rounded-[20px] p-7 hover:-translate-y-1 transition-transform block"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="font-cinzel text-[10px] tracking-[0.22em] uppercase text-[var(--gold)]">
          {eraLabel}
        </span>
        <span
          className="text-3xl"
          style={{ filter: "drop-shadow(0 2px 6px rgba(184,150,62,0.3))" }}
        >
          {GAME_EMOJI[game.slug] || "🎮"}
        </span>
      </div>
      <h3 className="font-cinzel text-[15px] tracking-[0.12em] text-[var(--brown)] uppercase mb-2">
        {game.title}
      </h3>
      <p className="text-[13px] italic text-[var(--brown-mid)] leading-relaxed mb-4">
        {game.intro}
      </p>
      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)]">
        <span>10 Levels</span>
        <span className="text-[var(--gold)]">Enter →</span>
      </div>
    </Link>
  );
}
