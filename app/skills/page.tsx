import SectionTitle from "../../components/SectionTitle";
import SkillCard from "../../components/SkillCard";
import { SKILLS } from "../../data/skills";

export default function SkillsPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Practice & Grow"
          title={
            <>
              Your English <em>Skills</em>
            </>
          }
          subtitle="Complete your story chapters first — then unlock the full suite of skill activities below."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {SKILLS.map((s) => (
            <SkillCard key={s.slug} skill={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
