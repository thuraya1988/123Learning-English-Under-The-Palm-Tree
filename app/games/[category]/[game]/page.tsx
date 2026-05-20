import { notFound } from "next/navigation";
import GlassButton from "../../../../components/GlassButton";
import GlassCard from "../../../../components/GlassCard";
import SectionTitle from "../../../../components/SectionTitle";
import ThreeDCharacter from "../../../../components/ThreeDCharacter";
import ARViewer from "../../../../components/ARViewer";
import H5PEmbed from "../../../../components/H5PEmbed";
import PipperConnector from "../../../../components/PipperConnector";
import SchoromConnector from "../../../../components/SchoromConnector";
import {
  ALL_GAMES,
  GameCategory,
  MODERN_GAMES,
  TRADITIONAL_GAMES,
  getGame,
} from "../../../../data/games";

export function generateStaticParams() {
  return ALL_GAMES.map((g) => ({ category: g.category, game: g.slug }));
}

export default function GamePage({
  params,
}: {
  params: { category: string; game: string };
}) {
  const category = params.category as GameCategory;
  if (category !== "1973" && category !== "2026") return notFound();
  const game = getGame(category, params.game);
  if (!game) return notFound();

  const eraLabel = category === "1973" ? "Traditional · 1973" : "Modern · 2026";
  const sibling = (category === "1973" ? TRADITIONAL_GAMES : MODERN_GAMES).find(
    (g) => g.slug !== game.slug
  );

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto w-full">
        <SectionTitle
          eyebrow={eraLabel}
          title={<em>{game.title}</em>}
          subtitle={game.intro}
        />

        <GlassCard className="p-5 mb-8">
          <p className="font-cinzel text-[11px] tracking-[0.2em] uppercase text-[var(--burgundy)] mb-1">
            Story File Reference
          </p>
          <p className="text-[var(--brown-mid)] italic text-sm">
            [Story File Game Content Placeholder]
          </p>
          <p className="text-[var(--brown-mid)] italic text-sm mt-1">
            Learning Objective: {game.objective}
          </p>
        </GlassCard>

        <GlassCard className="p-6 md:p-8 mb-8">
          {game.available ? (
            <H5PEmbed slug={game.h5p} title={`${game.title} — H5P activity`} height={620} />
          ) : (
            <div className="text-center p-10">
              <p className="font-cinzel text-[11px] tracking-[0.22em] uppercase text-[var(--burgundy)] mb-3">
                Game Coming Soon
              </p>
              <p className="text-[var(--brown-mid)] italic">
                The activity file for <strong>{game.title}</strong> has not been
                uploaded yet. It will appear here automatically once the author
                publishes it.
              </p>
            </div>
          )}
        </GlassCard>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <GlassCard className="lg:col-span-7 p-8">
            <div className="flex items-center justify-between mb-5">
              <p className="font-cinzel text-[12px] tracking-[0.18em] uppercase text-[var(--burgundy)]">
                Level Map · 1 – 10
              </p>
              <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)]">
                Progress Placeholder
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {game.levels.map((lv) => {
                const unlocked = lv.level <= 2;
                return (
                  <div
                    key={lv.level}
                    className={`skill-card !text-left !p-5 flex items-center gap-4 ${
                      unlocked ? "" : "opacity-60"
                    }`}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center font-cormorant text-2xl flex-shrink-0"
                      style={{
                        background: "var(--burgundy)",
                        color: "var(--cream)",
                      }}
                    >
                      {lv.level}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-cinzel text-[11px] tracking-[0.15em] uppercase text-[var(--brown)]">
                        {lv.title}
                      </p>
                      <p className="text-xs italic text-[var(--brown-mid)] mt-1">
                        {lv.contentPlaceholder}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="gold-line my-6" />
            <div className="flex flex-wrap gap-3">
              <GlassButton variant="gold">Start Game</GlassButton>
              <GlassButton variant="outline" href="/ar">
                AR Mode
              </GlassButton>
              {sibling && (
                <GlassButton
                  variant="dark"
                  href={`/games/${category}/${sibling.slug}`}
                >
                  Next Game
                </GlassButton>
              )}
            </div>
          </GlassCard>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <ThreeDCharacter name="3D Guide Character" context="character" />
            <ARViewer
              title="AR Mode"
              description="Optional AR mode placeholder"
              modelPlaceholder="[AR Game Object Placeholder]"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <GlassCard className="p-5">
                <p className="font-cinzel text-[11px] tracking-[0.15em] uppercase text-[var(--burgundy)] mb-2">
                  Score
                </p>
                <p className="text-[var(--brown-mid)] italic text-sm">
                  [Score Placeholder]
                </p>
              </GlassCard>
              <GlassCard className="p-5">
                <p className="font-cinzel text-[11px] tracking-[0.15em] uppercase text-[var(--burgundy)] mb-2">
                  Badge
                </p>
                <p className="text-[var(--brown-mid)] italic text-sm">
                  [Certificate Badge Placeholder]
                </p>
              </GlassCard>
              <PipperConnector feature="Game Voice" />
              <SchoromConnector feature="Game Score Sync" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
