import { notFound } from "next/navigation";
import GlassButton from "../../../components/GlassButton";
import GlassCard from "../../../components/GlassCard";
import SectionTitle from "../../../components/SectionTitle";
import ThreeDCharacter from "../../../components/ThreeDCharacter";
import PipperConnector from "../../../components/PipperConnector";
import SchoromConnector from "../../../components/SchoromConnector";
import { CHARACTERS } from "../../../data/characters";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export default function CharacterPage({ params }: { params: { slug: string } }) {
  const character = CHARACTERS.find((c) => c.slug === params.slug);
  if (!character) return notFound();

  return (
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow={character.group}
        title={character.name}
        subtitle={character.role}
      />

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <div
            className="glass overflow-hidden"
            style={{ borderRadius: "240px 240px 28px 28px" }}
          >
            <div className="relative h-96 bg-[radial-gradient(circle_at_50%_35%,rgba(255,244,220,0.7),transparent_70%)] flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] via-[#d6ad58] to-[#8a6529] flex items-center justify-center text-cocoa font-display text-5xl">
                {character.name[0]}
              </div>
              <span className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-[0.6rem] tracking-[0.2em] uppercase text-cocoa/70">
                [Character Image Placeholder]
              </span>
            </div>
            <div className="p-7">
              <h4 className="font-display gold-text text-2xl tracking-wide">
                {character.name}
              </h4>
              <p className="text-cocoa/75 mt-3 leading-relaxed">
                {character.description}
              </p>
              <div className="hairline my-5" />
              <p className="text-[0.7rem] tracking-[0.2em] uppercase text-cocoa/65">
                Related chapter: {character.relatedChapter}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-6">
          <ThreeDCharacter name={character.name} context="character" />
          <div className="grid md:grid-cols-2 gap-5">
            <GlassCard className="p-6">
              <h4 className="font-display gold-text text-lg">Voice / TTS</h4>
              <p className="text-cocoa/70 text-sm mt-2">
                {character.voicePlaceholder}
              </p>
              <div className="mt-4 flex gap-2">
                <GlassButton variant="gold">Play Voice</GlassButton>
                <GlassButton variant="ghost">Practice With Character</GlassButton>
              </div>
            </GlassCard>
            <GlassCard className="p-6">
              <h4 className="font-display gold-text text-lg">3D Model</h4>
              <p className="text-cocoa/70 text-sm mt-2">
                {character.modelPlaceholder}
              </p>
              <div className="mt-4 flex gap-2">
                <GlassButton variant="ghost" href="/ar">View In AR</GlassButton>
              </div>
            </GlassCard>
            <PipperConnector feature="Character Voice" />
            <SchoromConnector feature="Character Progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
