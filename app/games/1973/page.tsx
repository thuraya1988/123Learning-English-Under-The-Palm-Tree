import SectionTitle from "../../../components/SectionTitle";
import GameCard from "../../../components/GameCard";
import { TRADITIONAL_GAMES } from "../../../data/games";

export default function TraditionalGamesPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Gallery · 1973"
          title={
            <>
              Traditional <em>Games</em>
            </>
          }
          subtitle="Ten heritage games reimagined as language-learning experiences. Each one has 10 levels."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRADITIONAL_GAMES.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </div>
    </section>
  );
}
