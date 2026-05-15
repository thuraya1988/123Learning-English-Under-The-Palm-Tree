import Link from "next/link";
import { Game } from "../data/games";

export default function GameCard({ game }: { game: Game }) {
  const eraLabel = game.category === "1973" ? "Heritage · 1973" : "Modern · 2026";
  return (
    <Link
      href={`/games/${game.category}/${game.slug}`}
      className="block glass p-6 md:p-7 hover:-translate-y-1 transition-transform"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/70">
          {eraLabel}
        </span>
        <span className="text-[0.7rem] tracking-[0.18em] uppercase text-cocoa/60">
          10 Levels
        </span>
      </div>
      <h3 className="font-display text-xl gold-text tracking-wide">{game.title}</h3>
      <p className="mt-2 text-cocoa/75 text-sm leading-relaxed">{game.intro}</p>
      <div className="mt-5 hairline" />
      <p className="mt-3 text-[0.7rem] tracking-[0.18em] uppercase text-cocoa/60">
        [Story File Game Content Placeholder]
      </p>
    </Link>
  );
}
