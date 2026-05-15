import SectionTitle from "../../../components/SectionTitle";
import GameCard from "../../../components/GameCard";
import { MODERN_GAMES } from "../../../data/games";

export default function ModernGamesPage() {
  return (
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow="Gallery · 2026"
        title="Modern Educational Games"
        subtitle="Ten cinematic, AI-aware games. Each has 10 levels and connects to the story file."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MODERN_GAMES.map((g) => (
          <GameCard key={g.slug} game={g} />
        ))}
      </div>
    </div>
  );
}
