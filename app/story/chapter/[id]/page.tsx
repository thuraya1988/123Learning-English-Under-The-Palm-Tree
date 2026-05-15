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

  return (
    <div className="flex flex-col gap-12">
      <SectionTitle
        eyebrow={`Chapter ${String(chapter.id).padStart(2, "0")}`}
        title={chapter.title}
        subtitle={chapter.summary}
      />

      <div className="grid lg:grid-cols-12 gap-8">
        <GlassCard className="lg:col-span-7 p-8">
          <h3 className="font-display gold-text text-xl tracking-wide">
            Chapter Text
          </h3>
          <p className="mt-3 text-cocoa/75 leading-relaxed font-serif">
            [Story File Reference Required] — chapter text will be rendered from
            the story file here. Until the story file is linked, the text area
            displays only this placeholder.
          </p>
          <div className="hairline my-6" />
          <div className="grid sm:grid-cols-2 gap-4">
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Vocabulary</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                {chapter.vocabularyPlaceholder}
              </p>
            </GlassCard>
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Listening</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                {chapter.listeningPlaceholder}
              </p>
            </GlassCard>
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Comprehension</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                {chapter.comprehensionPlaceholder}
              </p>
            </GlassCard>
            <GlassCard variant="inset" className="p-5">
              <h4 className="font-display gold-text">Character Dialogue</h4>
              <p className="text-cocoa/75 text-sm mt-2">
                {chapter.dialoguePlaceholder}
              </p>
            </GlassCard>
          </div>

          <div className="hairline my-6" />
          <div className="flex flex-wrap gap-3">
            <GlassButton variant="gold">Mark As Read</GlassButton>
            <GlassButton variant="dark" href="/skills">Practice Skills</GlassButton>
            <GlassButton variant="ghost" href="/ar">Open AR Scene</GlassButton>
          </div>
          <p className="text-[0.7rem] tracking-[0.2em] uppercase text-cocoa/65 mt-4">
            Skill unlock: {chapter.skillUnlock}
          </p>
        </GlassCard>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <ThreeDCharacter name={`Chapter ${chapter.id} Character`} context="chapter" />
          <ARViewer
            title={`Chapter ${chapter.id} AR Scene`}
            description="Story file scene placeholder"
            modelPlaceholder={chapter.arScenePlaceholder}
          />
          <PipperConnector feature="Chapter Narration" />
          <SchoromConnector feature="Chapter Completion" />
        </div>
      </div>
    </div>
  );
}
