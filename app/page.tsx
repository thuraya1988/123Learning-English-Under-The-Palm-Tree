import Link from "next/link";
import GlassButton from "../components/GlassButton";
import GlassCard from "../components/GlassCard";
import SectionTitle from "../components/SectionTitle";
import PalmIcon from "../components/PalmIcon";
import RegistrationCard from "./_components/RegistrationCard";
import { ARCubeIcon, MicIcon, MusicIcon, SparkleIcon } from "../components/Icons";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-28">
      {/* HERO */}
      <section className="relative min-h-[640px] grid lg:grid-cols-12 gap-8 items-center">
        <div className="absolute inset-0 -z-10 rounded-[40px] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(255,244,220,0.55),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(201,161,74,0.45),transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#f4e6c4]/40 via-transparent to-[#8a6529]/20" />
        </div>

        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] to-[#8a6529] flex items-center justify-center">
              <PalmIcon className="w-6 h-6" />
            </div>
            <span className="text-[0.7rem] tracking-[0.3em] uppercase text-cocoa/70">
              A Cinematic English Journey
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] tracking-tight gold-text">
            Learn Under <br /> The Palm Tree
          </h1>

          <p className="max-w-xl text-cocoa/75 text-lg md:text-xl leading-relaxed font-serif">
            A cinematic English-learning journey inspired by stories, skills,
            music, games, and imagination.
          </p>

          <div className="flex flex-wrap gap-3 mt-2">
            <GlassButton variant="gold" href="#register">
              Start Journey
            </GlassButton>
            <GlassButton variant="dark" href="/story">
              Enter The Story
            </GlassButton>
            <GlassButton variant="ghost" href="/ar">
              <ARCubeIcon className="w-4 h-4 mr-2" /> Open AR
            </GlassButton>
          </div>

          <div className="flex items-center gap-4 mt-6 text-cocoa/65 text-xs tracking-[0.18em] uppercase">
            <SparkleIcon className="w-4 h-4" />
            36 Chapters · 10 Skills · 20 Games · AR · 3D
          </div>
        </div>

        <div id="register" className="lg:col-span-5">
          <RegistrationCard />
        </div>
      </section>

      {/* ABOUT preview */}
      <section>
        <SectionTitle
          eyebrow="Section 1"
          title="About"
          subtitle="Discover the vision, the OLEC system, and the author behind a learning journey rooted in the village of Sumail Al Qurooshiyah."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Our Vision", body: "A cinematic, story-grounded path for learning English." },
            { title: "What Makes This Project Special", body: "Story-anchored skills, games, AR, and 3D characters." },
            { title: "The OLEC System", body: "A pedagogical system designed for the palm tree journey." },
          ].map((c) => (
            <GlassCard key={c.title} className="p-7">
              <h3 className="font-display gold-text text-xl tracking-wide mb-2">
                {c.title}
              </h3>
              <p className="text-cocoa/75 text-sm leading-relaxed">{c.body}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-6">
          <GlassButton variant="gold" href="/about">
            Open About
          </GlassButton>
        </div>
      </section>

      {/* CHARACTERS preview */}
      <section>
        <SectionTitle
          eyebrow="Section 2"
          title="Characters"
          subtitle="Teachers, students, and villagers — all grounded in the story file."
        />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Teachers", body: "Guiding voices of the palm tree classroom." },
            { title: "Students", body: "Young learners of Sumail Al Qurooshiyah." },
            { title: "Villagers", body: "The community surrounding the palm tree." },
          ].map((c) => (
            <div key={c.title} className="glass arch-card p-0 overflow-hidden">
              <div className="relative h-72 bg-[radial-gradient(circle_at_50%_40%,rgba(255,244,220,0.6),transparent_70%)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PalmIcon className="w-24 h-24 opacity-80" />
                </div>
                <span className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/70">
                  [Cinematic Image Placeholder]
                </span>
              </div>
              <div className="p-7">
                <h3 className="font-display gold-text text-2xl tracking-wide">
                  {c.title}
                </h3>
                <p className="mt-2 text-cocoa/75 text-sm">{c.body}</p>
                <div className="mt-5">
                  <GlassButton variant="gold" href="/characters">
                    Meet The Palmers
                  </GlassButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY preview */}
      <section>
        <SectionTitle
          eyebrow="Section 3"
          title="123 Let's Learn English Under the Palm Tree"
          subtitle={'"There was once a village that taught children how to dream in two languages…"'}
        />
        <div className="flex flex-wrap gap-3">
          <GlassButton variant="gold" href="/story">
            Enter
          </GlassButton>
          <GlassButton variant="ghost" href="/story">
            Browse 36 Chapters
          </GlassButton>
        </div>
      </section>

      {/* MUSIC + SKILLS + GAMES + AR strip */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Palm Tree Music", href: "/music", icon: <MusicIcon className="w-6 h-6" /> },
          { label: "Practice Skills", href: "/skills", icon: <SparkleIcon className="w-6 h-6" /> },
          { label: "Open The Games", href: "/games", icon: <MicIcon className="w-6 h-6" /> },
          { label: "AR Experience", href: "/ar", icon: <ARCubeIcon className="w-6 h-6" /> },
        ].map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="glass p-7 flex flex-col gap-4 hover:-translate-y-1 transition-transform"
          >
            <div className="w-12 h-12 rounded-2xl bevel bg-gradient-to-br from-[#f5dfa3] to-[#8a6529] flex items-center justify-center text-cocoa">
              {c.icon}
            </div>
            <h3 className="font-display gold-text text-lg tracking-wide">
              {c.label}
            </h3>
            <span className="text-[0.7rem] tracking-[0.18em] uppercase text-cocoa/60">
              Open Section
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}
