import GlassButton from "../../components/GlassButton";
import SectionTitle from "../../components/SectionTitle";
import ChapterCard from "../../components/ChapterCard";
import { CHAPTERS } from "../../data/chapters";

export default function StoryPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="The Novel"
          title={
            <>
              <em>123</em> Let&apos;s Learn English
              <br />
              Under the Palm Tree
            </>
          }
        />

        <p className="text-center max-w-[680px] mx-auto mb-10 text-xl italic leading-[1.8] text-[var(--brown-mid)]">
          &quot;There was once a village that taught children how to dream in
          two languages. Beneath the shade of an ancient palm, every word became
          a key — and every story, a door.&quot;
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <GlassButton variant="gold" href="/story/chapter/1">
            Enter The Story
          </GlassButton>
          <GlassButton variant="outline" href="/ar">
            Open AR Scenes
          </GlassButton>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {CHAPTERS.map((c) => (
            <ChapterCard key={c.id} chapter={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
