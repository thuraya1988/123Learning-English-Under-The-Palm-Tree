import GlassButton from "../../components/GlassButton";
import GlassCard from "../../components/GlassCard";
import SectionTitle from "../../components/SectionTitle";
import Image from "next/image";

const SUBSECTIONS = [
  {
    key: "vision",
    title: "Our Vision",
    body: "To create a living, breathing English learning experience rooted in the cultural richness of Oman — where every lesson feels like a story worth remembering.",
  },
  {
    key: "special",
    title: "What Makes This Special",
    body: "A seamless fusion of cinematic storytelling, traditional Omani heritage, and modern language pedagogy — designed to inspire students of all ages.",
  },
  {
    key: "olec",
    title: "The OLEC System",
    body: "Our proprietary learning framework — Observe, Listen, Engage, Create — guides each student through a structured yet imaginative path to English fluency.",
  },
  {
    key: "dedication",
    title: "Dedication",
    body: "Dedicated to every student who dared to learn — and to the village that planted the first seed beneath the palm.",
  },
  {
    key: "statement",
    title: "Author Statement",
    body: "Created by Thuraya Mohammed bin Ali Al Naabi, with love, patience, and a deep belief in the power of language.",
  },
];

export default function AboutPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Discover"
          title={
            <>
              About <em>This Project</em>
            </>
          }
          subtitle="A luxury cinematic English-learning platform inspired by the village of Sumail Al Qurooshiyah and the story file at the heart of every page."
        />

        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-7 glass-deep rounded-[24px] p-8 relative overflow-hidden">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
              <Image
                src="/images/scenes/cover.jpeg"
                alt="The Palm Tree village"
                fill
                className="object-cover"
                priority
              />
            </div>
            <p className="text-[var(--brown-mid)] font-eb text-lg italic leading-relaxed">
              &quot;There was once a village that taught children how to dream
              in two languages…&quot;
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            {SUBSECTIONS.map((s) => (
              <GlassCard key={s.key} className="p-6">
                <p className="label-cinzel text-[12px] tracking-[0.18em] text-[var(--gold)] mb-2 flex items-center gap-2.5 uppercase">
                  <span className="inline-block w-6 h-px bg-[var(--gold-light)]" />
                  {s.title}
                </p>
                <p className="text-[15px] leading-[1.7] text-[var(--brown-mid)]">
                  {s.body}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <GlassCard variant="dark" className="p-8">
            <p className="font-cinzel text-[12px] tracking-[0.2em] text-[var(--gold)] mb-3 uppercase">
              Author Statement · Audio
            </p>
            <audio
              controls
              src="/audio/author-statement.mpeg"
              className="w-full mt-2"
            />
            <p className="text-[var(--gold-pale)]/70 text-xs italic mt-3">
              Voice recording by Thuraya Mohammed bin Ali Al Naabi.
            </p>
          </GlassCard>
          <GlassCard variant="dark" className="p-8">
            <p className="font-cinzel text-[12px] tracking-[0.2em] text-[var(--gold)] mb-3 uppercase">
              Dedication · Audio
            </p>
            <audio controls src="/audio/dedication.mpeg" className="w-full mt-2" />
            <p className="text-[var(--gold-pale)]/70 text-xs italic mt-3">
              A dedication to every student who sat beneath the palm.
            </p>
          </GlassCard>
        </div>

        <div className="text-center">
          <GlassButton variant="gold" href="/characters">
            Meet The Palmers
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
