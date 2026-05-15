import SectionTitle from "../../components/SectionTitle";
import SkillCard from "../../components/SkillCard";
import GlassCard from "../../components/GlassCard";
import { SKILLS } from "../../data/skills";

export default function SkillsPage() {
  return (
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow="Section 5"
        title="Practice Your English Skills Under the Palm Tree"
        subtitle="Users must first read chapters before practicing skills. Each card is carved into the surface — premium depth and warm gold glow."
      />

      <GlassCard variant="inset" className="p-5">
        <p className="text-cocoa/75 text-sm tracking-wide">
          Prerequisite: open the story section and read the linked chapters
          before practicing.
        </p>
      </GlassCard>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {SKILLS.map((s) => (
          <SkillCard key={s.slug} skill={s} />
        ))}
      </div>
    </div>
  );
}
