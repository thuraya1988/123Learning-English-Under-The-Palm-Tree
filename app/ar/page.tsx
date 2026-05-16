import SectionTitle from "../../components/SectionTitle";
import ARViewer from "../../components/ARViewer";
import GlassButton from "../../components/GlassButton";
import ThreeDCharacter from "../../components/ThreeDCharacter";

const AR_SCENES = [
  { title: "Palm Tree", description: "AR palm tree scene", placeholder: "[AR Model Placeholder]" },
  { title: "Village Scene", description: "AR village scene", placeholder: "[AR Scene Placeholder]" },
  { title: "Character Interaction", description: "AR character interaction", placeholder: "[AR Character Placeholder]" },
  { title: "Vocabulary Object", description: "AR vocabulary object", placeholder: "[AR Vocabulary Placeholder]" },
  { title: "Chapter Scene", description: "AR chapter scene", placeholder: "[Story File AR Content Placeholder]" },
  { title: "Game Object", description: "AR game object", placeholder: "[AR Game Object Placeholder]" },
];

export default function ARPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Augmented Reality"
          title={
            <>
              Palm Tree <em>AR</em> Experience
            </>
          }
          subtitle="WebXR-ready placeholders prepared for palm trees, village scenes, characters, vocabulary objects, chapter scenes, and game objects."
        />

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <GlassButton variant="gold">View Palm Tree in AR</GlassButton>
          <GlassButton variant="dark">View Character in AR</GlassButton>
          <GlassButton variant="outline">View Chapter Scene in AR</GlassButton>
          <GlassButton variant="outline">Practice Vocabulary in AR</GlassButton>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {AR_SCENES.map((s) => (
            <ARViewer
              key={s.title}
              title={s.title}
              description={s.description}
              modelPlaceholder={s.placeholder}
            />
          ))}
        </div>

        <ThreeDCharacter name="AR Companion" context="ar" />
      </div>
    </section>
  );
}
