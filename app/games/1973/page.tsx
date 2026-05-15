import SectionTitle from "../../../components/SectionTitle";
import GameCard from "../../../components/GameCard";
import { TRADITIONAL_GAMES } from "../../../data/games";

export default function TraditionalGamesPage() {
  return (
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow="Gallery · 1973"
        title="Traditional Omani-Inspired Games"
        subtitle="Ten heritage games. Each has 10 levels and connects to the chapters of the story file."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TRADITIONAL_GAMES.map((g) => (
          <GameCard key={g.slug} game={g} />
        ))}
      </div>
    </div>
  );
}
