import { notFound } from "next/navigation";
import GlassButton from "../../../components/GlassButton";
import GlassCard from "../../../components/GlassCard";
import SectionTitle from "../../../components/SectionTitle";
import ThreeDCharacter from "../../../components/ThreeDCharacter";
import H5PEmbed from "../../../components/H5PEmbed";
import PipperConnector from "../../../components/PipperConnector";
import SchoromConnector from "../../../components/SchoromConnector";
import { SKILLS } from "../../../data/skills";

export function generateStaticParams() {
  return SKILLS.map((s) => ({ skill: s.slug }));
}

export default function SkillPage({ params }: { params: { skill: string } }) {
  const skill = SKILLS.find((s) => s.slug === params.skill);
  if (!skill) return notFound();

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto w-full">
        <SectionTitle
          eyebrow="Skill Practice"
          title={<em>{skill.title}</em>}
          subtitle={skill.description}
        />

        <div className="mb-8">
          <GlassCard className="p-5">
            <p className="font-cinzel text-[11px] tracking-[0.2em] text-[var(--burgundy)] uppercase mb-1">
              Prerequisite Check
            </p>
            <p className="text-[var(--brown-mid)] italic text-sm">
              {skill.prerequisite}
            </p>
          </GlassCard>
        </div>

        <GlassCard className="p-6 md:p-8 mb-8">
          <H5PEmbed
            slug={skill.h5p}
            title={`${skill.title} — H5P activity`}
            height={620}
          />
        </GlassCard>

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <GlassCard className="lg:col-span-7 p-8">
            <p className="font-cinzel text-[12px] tracking-[0.18em] text-[var(--burgundy)] uppercase mb-3">
              Story-File-Based Activity
            </p>
            <p className="text-[var(--brown-mid)] italic text-lg leading-relaxed">
              [Chapter-Based Activity Placeholder]
            </p>
            <div className="gold-line my-6" />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["TTS Interface", "[Pipper Integration Placeholder]"],
                ["Score", "[Score System Placeholder]"],
                ["Progress", "[Progress Tracking Placeholder]"],
                ["Classroom Sync", "[Schorom Integration Placeholder]"],
              ].map(([t, b]) => (
                <div key={t} className="skill-card !text-left !p-5">
                  <p className="font-cinzel text-[11px] tracking-[0.15em] text-[var(--burgundy)] uppercase mb-2">
                    {t}
                  </p>
                  <p className="text-[var(--brown-mid)] text-sm italic">{b}</p>
                </div>
              ))}
            </div>
            <div className="gold-line my-6" />
            <div className="flex flex-wrap gap-3">
              <GlassButton variant="gold">Start Activity</GlassButton>
              <GlassButton variant="dark" href="/story">
                Open Chapters
              </GlassButton>
            </div>
          </GlassCard>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <ThreeDCharacter
              name={`${skill.title} Coach`}
              context="skill"
            />
            <PipperConnector feature={`${skill.title} Voice`} />
            <SchoromConnector feature={`${skill.title} Progress`} />
          </div>
        </div>
      </div>
    </section>
  );
}
