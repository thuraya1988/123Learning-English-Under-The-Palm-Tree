import { notFound } from "next/navigation";
import GlassButton from "../../../../components/GlassButton";
import GlassCard from "../../../../components/GlassCard";
import SectionTitle from "../../../../components/SectionTitle";
import ThreeDCharacter from "../../../../components/ThreeDCharacter";
import ARViewer from "../../../../components/ARViewer";
import PipperConnector from "../../../../components/PipperConnector";
import SchoromConnector from "../../../../components/SchoromConnector";
import { CHAPTERS } from "../../../../data/chapters";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ id: String(c.id) }));
}

export default function ChapterPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const chapter = CHAPTERS.find((c) => c.id === id);
  if (!chapter) return notFound();

  const prev = id > 1 ? id - 1 : null;
  const next = id < 36 ? id + 1 : null;

  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow={`Chapter ${String(chapter.id).padStart(2, "0")}`}
          title={<em>{chapter.title}</em>}
          subtitle={chapter.summary}
        />

        <div className="grid lg:grid-cols-12 gap-8 mb-12">
          <GlassCard className="lg:col-span-7 p-8">
            <p className="font-cinzel text-[12px] tracking-[0.18em] text-[var(--gold)] uppercase mb-3">
              Chapter Text
            </p>
            <p className="text-[var(--brown-mid)] font-eb italic leading-[1.8] text-lg">
              [Story File Reference Required] — chapter text will be rendered
              from the story file here. Until the story file is linked, the
              text area displays only this placeholder.
            </p>
            <div className="gold-line my-6" />
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Vocabulary", chapter.vocabularyPlaceholder],
                ["Listening", chapter.listeningPlaceholder],
                ["Comprehension", chapter.comprehensionPlaceholder],
                ["Character Dialogue", chapter.dialoguePlaceholder],
              ].map(([title, body]) => (
                <div
                  key={title}
                  className="skill-card !text-left !p-5"
                >
                  <p className="font-cinzel text-[11px] tracking-[0.15em] text-[var(--gold)] uppercase mb-2">
                    {title}
                  </p>
                  <p className="text-[var(--brown-mid)] text-sm italic">
                    {body}
                  </p>
                </div>
              ))}
            </div>
            <div className="gold-line my-6" />
            <div className="flex flex-wrap gap-3">
              <GlassButton variant="gold">Mark As Read</GlassButton>
              <GlassButton variant="dark" href="/skills">
                Practice Skills
              </GlassButton>
              <GlassButton variant="outline" href="/ar">
                Open AR Scene
              </GlassButton>
            </div>
            <p className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)] mt-4">
              Skill unlock: {chapter.skillUnlock}
            </p>
          </GlassCard>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <ThreeDCharacter
              name={`Chapter ${chapter.id} Guide`}
              context="chapter"
            />
            <ARViewer
              title={`Chapter ${chapter.id} AR Scene`}
              description="Story file scene placeholder"
              modelPlaceholder={chapter.arScenePlaceholder}
            />
            <PipperConnector feature="Chapter Narration" />
            <SchoromConnector feature="Chapter Completion" />
          </div>
        </div>

        <div className="flex justify-between gap-4">
          {prev ? (
            <GlassButton variant="outline" href={`/story/chapter/${prev}`}>
              ← Previous
            </GlassButton>
          ) : (
            <div />
          )}
          {next ? (
            <GlassButton variant="gold" href={`/story/chapter/${next}`}>
              Next Chapter →
            </GlassButton>
          ) : (
            <GlassButton variant="gold" href="/certificate">
              View Certificate
            </GlassButton>
          )}
        </div>
      </div>
    </section>
  );
}
