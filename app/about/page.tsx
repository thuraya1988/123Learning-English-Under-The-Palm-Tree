import GlassButton from "../../components/GlassButton";
import GlassCard from "../../components/GlassCard";
import SectionTitle from "../../components/SectionTitle";
import PalmIcon from "../../components/PalmIcon";

const SUBSECTIONS = [
  {
    key: "about",
    title: "About",
    body: "Learn Under The Palm Tree is a cinematic English-learning journey grounded in a story file titled \"123 Let's Learn English Under the Palm Tree\". All chapters, characters, vocabulary, and activities flow from that single source.",
  },
  {
    key: "vision",
    title: "Our Vision",
    body: "A premium, story-anchored learning environment where stories, skills, music, games, AR, and 3D characters move together as one continuous experience.",
  },
  {
    key: "special",
    title: "What Makes This Project Special",
    body: "Every game, every skill page, every music card, and every AR scene is tied back to the chapters of the story file. Nothing is invented outside it.",
  },
  {
    key: "olec",
    title: "The OLEC System",
    body: "OLEC is the pedagogical framework that organizes how chapters unlock skills, games, and certificates. Detailed definitions are sourced from the story file.",
  },
  {
    key: "dedication",
    title: "Dedication",
    body: "[Dedication Text Placeholder — Story File Reference Required]",
  },
  {
    key: "statement",
    title: "Author Statement",
    body: "[Author Statement Placeholder — Story File Reference Required]",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16">
      <SectionTitle
        eyebrow="Section 1"
        title="About The Project"
        subtitle="A luxury cinematic English-learning platform inspired by the village of Sumail Al Qurooshiyah and the story file at the heart of every page."
      />

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 glass p-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="absolute -top-16 -right-12 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(233,201,124,0.5),transparent_70%)] blur-2xl" />
          <span className="text-[0.7rem] tracking-[0.3em] uppercase text-cocoa/70">
            Cinematic Image
          </span>
          <div className="relative h-72 rounded-3xl glass-inset flex items-center justify-center">
            <PalmIcon className="w-28 h-28 opacity-90" />
            <span className="absolute bottom-3 left-3 glass px-3 py-1 rounded-full text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/70">
              [Cinematic Image Placeholder]
            </span>
          </div>
          <p className="text-cocoa/75 font-serif text-lg leading-relaxed">
            "There was once a village that taught children how to dream in two
            languages…"
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          {SUBSECTIONS.map((s) => (
            <GlassCard key={s.key} className="p-6">
              <h3 className="font-display gold-text text-xl tracking-wide">
                {s.title}
              </h3>
              <p className="text-cocoa/75 text-sm mt-2 leading-relaxed">
                {s.body}
              </p>
              <div className="hairline my-4" />
              <GlassButton variant="ghost" href={`/about#${s.key}`}>
                Open Page
              </GlassButton>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {SUBSECTIONS.slice(0, 3).map((s) => (
          <GlassCard key={s.key} variant="dark" className="p-7">
            <h3 className="font-display text-xl tracking-wide text-[#e9c97c]">
              {s.title}
            </h3>
            <p className="text-[#f4e6c4]/80 text-sm mt-2 leading-relaxed">
              {s.body}
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
