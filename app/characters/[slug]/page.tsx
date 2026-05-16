import { notFound } from "next/navigation";
import Image from "next/image";
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
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow={character.group}
          title={<em>{character.name}</em>}
          subtitle={character.role}
        />

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5">
            <div
              className="glass-deep overflow-hidden"
              style={{ borderRadius: "240px 240px 24px 24px" }}
            >
              <div
                className="relative h-96 flex items-end justify-center"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(184,150,62,0.15) 0%, rgba(240,232,220,0.3) 60%, rgba(240,232,220,0.6) 100%)",
                  borderRadius: "180px 180px 0 0",
                }}
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  width={320}
                  height={400}
                  className="object-contain w-auto h-full p-6"
                  priority
                />
              </div>
              <div className="p-7 text-center">
                <h4 className="font-cinzel text-[16px] tracking-[0.18em] text-[var(--brown)] uppercase mb-2">
                  {character.name}
                </h4>
                <p className="text-[11px] italic text-[var(--gold)] tracking-[0.12em] uppercase mb-4">
                  {character.role}
                </p>
                <p className="text-[var(--brown-mid)] italic">
                  {character.description}
                </p>
                <div className="hr-line my-5 gold-line" />
                <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)]">
                  Related chapter: {character.relatedChapter}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <ThreeDCharacter name={character.name} context="character" />
            <div className="grid md:grid-cols-2 gap-5">
              <GlassCard className="p-6">
                <p className="font-cinzel text-[12px] tracking-[0.18em] text-[var(--gold)] uppercase mb-2">
                  Voice / TTS
                </p>
                <p className="text-[var(--brown-mid)] text-sm italic mb-4">
                  {character.voicePlaceholder}
                </p>
                <div className="flex gap-2 flex-wrap">
                  <GlassButton variant="gold">Play Voice</GlassButton>
                  <GlassButton variant="outline">Practice</GlassButton>
                </div>
              </GlassCard>
              <GlassCard className="p-6">
                <p className="font-cinzel text-[12px] tracking-[0.18em] text-[var(--gold)] uppercase mb-2">
                  3D Model
                </p>
                <p className="text-[var(--brown-mid)] text-sm italic mb-4">
                  {character.modelPlaceholder}
                </p>
                <GlassButton variant="outline" href="/ar">
                  View In AR
                </GlassButton>
              </GlassCard>
              <PipperConnector feature="Character Voice" />
              <SchoromConnector feature="Character Progress" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
