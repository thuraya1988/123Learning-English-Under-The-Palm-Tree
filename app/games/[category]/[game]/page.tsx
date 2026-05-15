import { notFound } from "next/navigation";
import GlassButton from "../../../../components/GlassButton";
import GlassCard from "../../../../components/GlassCard";
import SectionTitle from "../../../../components/SectionTitle";
import ThreeDCharacter from "../../../../components/ThreeDCharacter";
import ARViewer from "../../../../components/ARViewer";
import PipperConnector from "../../../../components/PipperConnector";
import SchoromConnector from "../../../../components/SchoromConnector";
import {
  ALL_GAMES,
  GameCategory,
  MODERN_GAMES,
  TRADITIONAL_GAMES,
  getGame,
} from "../../../../data/games";
import { LockIcon, StarIcon } from "../../../../components/Icons";

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

  const eraLabel =
    category === "1973" ? "Traditional · 1973" : "Modern · 2026";
  const sibling = (category === "1973" ? TRADITIONAL_GAMES : MODERN_GAMES).find(
    (g) => g.slug !== game.slug
  );

  return (
    <div className="flex flex-col gap-12">
      <SectionTitle eyebrow={eraLabel} title={game.title} subtitle={game.intro} />

      <GlassCard variant="inset" className="p-5">
        <p className="text-cocoa/75 text-sm">
          Story File Reference: [Story File Game Content Placeholder]
        </p>
        <p className="text-cocoa/75 text-sm mt-1">
          Learning Objective: {game.objective}
        </p>
      </GlassCard>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Level map */}
        <GlassCard className="lg:col-span-7 p-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display gold-text text-xl tracking-wide">
              Level Map · 1 – 10
            </h3>
            <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/65">
              Progress Placeholder
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {game.levels.map((lv) => {
              const unlocked = lv.level <= 2;
              return (
                <div
                  key={lv.level}
                  className={`glass-inset p-5 flex items-center gap-4 ${
                    unlocked ? "" : "opacity-70"
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] to-[#8a6529] flex items-center justify-center font-display text-cocoa text-lg">
                    {lv.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-display gold-text text-base tracking-wide truncate">
                        {lv.title}
                      </h4>
                      {unlocked ? (
                        <StarIcon className="w-3.5 h-3.5 text-[#8a6529]" />
                      ) : (
                        <LockIcon className="w-3.5 h-3.5 text-cocoa/55" />
                      )}
                    </div>
                    <p className="text-cocoa/70 text-xs">{lv.contentPlaceholder}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hairline my-6" />
          <div className="flex flex-wrap gap-3">
            <GlassButton variant="gold">Start Game</GlassButton>
            <GlassButton variant="ghost" href="/ar">AR Mode</GlassButton>
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
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Score</h4>
              <p className="text-cocoa/75 text-sm mt-2">[Score Placeholder]</p>
            </GlassCard>
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Badge</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                [Certificate Badge Placeholder]
              </p>
            </GlassCard>
            <PipperConnector feature="Game Voice" />
            <SchoromConnector feature="Game Score Sync" />
          </div>
        </div>
      </div>
    </div>
  );
}
