import SectionTitle from "../../../components/SectionTitle";
import GameCard from "../../../components/GameCard";
import { MODERN_GAMES } from "../../../data/games";

export default function ModernGamesPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Gallery · 2026"
          title={
            <>
              Modern <em>Games</em>
            </>
          }
          subtitle="Ten cinematic, AI-aware games. Each one has 10 levels and links to the story file."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODERN_GAMES.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
