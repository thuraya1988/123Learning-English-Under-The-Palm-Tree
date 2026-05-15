import { notFound } from "next/navigation";
import GlassButton from "../../../components/GlassButton";
import GlassCard from "../../../components/GlassCard";
import SectionTitle from "../../../components/SectionTitle";
import ThreeDCharacter from "../../../components/ThreeDCharacter";
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
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow="Skill"
        title={skill.title}
        subtitle={skill.description}
      />

      <GlassCard variant="inset" className="p-5">
        <p className="text-cocoa/75 text-sm">
          Prerequisite check: {skill.prerequisite}
        </p>
      </GlassCard>

      <div className="grid lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-7 p-8">
          <h3 className="font-display gold-text text-xl tracking-wide">
            Story-File-Based Activity
          </h3>
          <p className="mt-2 text-cocoa/75">
            [Chapter-Based Activity Placeholder]
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">TTS Interface</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                [Pipper Integration Placeholder]
              </p>
            </GlassCard>
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Score</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                [Score System Placeholder]
              </p>
            </GlassCard>
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Progress</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                [Progress Tracking Placeholder]
              </p>
            </GlassCard>
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Classroom Sync</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                [Schorom Integration Placeholder]
              </p>
            </GlassCard>
          </div>

          <div className="hairline my-6" />
          <div className="flex flex-wrap gap-3">
            <GlassButton variant="gold">Start Activity</GlassButton>
            <GlassButton variant="dark" href="/story">Open Chapters</GlassButton>
          </div>
        </GlassCard>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <ThreeDCharacter name={`${skill.title} Coach`} context="skill" />
          <PipperConnector feature={`${skill.title} Voice`} />
          <SchoromConnector feature={`${skill.title} Progress`} />
        </div>
      </div>
    </div>
  );
}
