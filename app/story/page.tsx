import GlassButton from "../../components/GlassButton";
import SectionTitle from "../../components/SectionTitle";
import ChapterCard from "../../components/ChapterCard";
import { CHAPTERS } from "../../data/chapters";
import { STORY_REFERENCE } from "../../data/storyReference";

export default function StoryPage() {
  return (
    <div className="flex flex-col gap-16">
      <SectionTitle
        eyebrow="Section 3"
        title={STORY_REFERENCE.title}
        subtitle={STORY_REFERENCE.intro}
      />

      <div className="flex flex-wrap gap-3">
        <GlassButton variant="gold" href="/story/chapter/1">Enter</GlassButton>
        <GlassButton variant="ghost" href="/ar">Open AR Scenes</GlassButton>
      </div>

      {/* Flowing chain layout with floating chapter cards */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[rgba(138,101,41,0.55)] to-transparent pointer-events-none hidden md:block" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {CHAPTERS.map((c, i) => (
            <ChapterCard key={c.id} chapter={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
