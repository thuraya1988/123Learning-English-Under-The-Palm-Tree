import Link from "next/link";
import RegistrationCard from "./_components/RegistrationCard";
import { CHARACTER_GROUPS } from "../data/characters";
import { CHAPTERS } from "../data/chapters";
import { SKILLS } from "../data/skills";
import { TRACKS } from "../data/music";

const ABOUT_CARDS = [
  {
    title: "Our Vision",
    body: "To create a living, breathing English learning experience rooted in the cultural richness of Oman — where every lesson feels like a story worth remembering.",
  },
  {
    title: "What Makes This Special",
    body: "A seamless fusion of cinematic storytelling, traditional Omani heritage, and modern language pedagogy — designed to inspire students of all ages.",
  },
  {
    title: "The OLEC System",
    body: "Our proprietary learning framework — Observe, Listen, Engage, Create — guides each student through a structured yet imaginative path to English fluency.",
  },
  {
    title: "Dedication & Author Statement",
    body: "Dedicated to every student who dared to learn. Created by Thuraya Mohammed bin Ali Al Naabi, with love, patience, and a deep belief in the power of language.",
  },
];

const GROUP_IMAGES: Record<string, string> = {
  teachers: "/images/scenes/teachers.png",
  students: "/images/scenes/students.png",
  villagers: "/images/scenes/villagers.png",
};

const MUSIC_ICONS = ["🎵", "🎶", "🎼", "🎹", "🥁", "🎷", "🎺", "🎻", "🎤", "🎧"];

const SKILL_EMOJI: Record<string, string> = {
  grammar: "📖",
  listening: "👂",
  reading: "📚",
  writing: "✍️",
  speaking: "🎤",
  vocabulary: "💡",
  spelling: "🔤",
  pronunciation: "🗣️",
  "progress-tracker": "📊",
  "improvement-plan": "🗺️",
};

export default function HomePage() {
  return (
    <>
      {/* ─── HERO / REGISTRATION ─── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6 md:px-12"
      >
        <div className="pulse-ring w-[600px] h-[600px]" />
        <div className="pulse-ring pulse-ring-2 w-[800px] h-[800px]" />

        <div className="relative z-[2] grid lg:grid-cols-12 gap-12 items-center max-w-[1200px] w-full">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 mb-5">
              <span className="inline-block w-10 h-px bg-gradient-to-r from-transparent to-[var(--gold-light)]" />
              Begin Your Journey
              <span className="inline-block w-10 h-px bg-gradient-to-l from-transparent to-[var(--gold-light)]" />
            </p>
            <h1 className="title-cormorant text-[clamp(48px,6vw,80px)] mb-4">
              Learn Under
              <br />
              <em>The Palm Tree</em>
            </h1>
            <p className="font-eb italic text-lg text-[var(--brown-mid)] leading-relaxed mb-8 max-w-[420px]">
              Where language blooms beneath golden fronds,
              <br />
              and every story opens a new world.
            </p>
            <div className="gold-line !mx-0 mb-7" />
            <p className="text-[15px] italic text-[var(--brown-mid)] leading-relaxed max-w-[380px]">
              An immersive English learning experience woven through story,
              music, and the timeless wisdom of the palm.
            </p>
          </div>

          <div className="lg:col-span-5 max-w-[480px] w-full mx-auto">
            <RegistrationCard />
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── CINEMATIC QUOTE ─── */}
      <div className="cinematic-band">
        <p className="cinematic-quote">
          &quot;There was once a village that taught children how to{" "}
          <em>dream in two languages</em> — beneath the shade of a single,
          ancient palm.&quot;
        </p>
      </div>

      {/* ─── ABOUT ─── */}
      <section className="section-lighter min-h-screen flex flex-col justify-center py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="eyebrow text-center mb-3">Discover</p>
          <h2 className="title-cormorant text-center text-[clamp(36px,5vw,64px)] mb-4">
            About This <em>Project</em>
          </h2>
          <div className="section-divider">
            <span></span>
            <div className="divider-diamond"></div>
            <span></span>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {ABOUT_CARDS.map((c) => (
              <div
                key={c.title}
                className="glass-deep p-9 rounded-[20px] hover:-translate-y-1 transition-transform"
              >
                <p className="label-cinzel text-[13px] tracking-[0.18em] text-[var(--gold)] mb-3 flex items-center gap-2.5">
                  <span className="inline-block w-6 h-px bg-[var(--gold-light)]" />
                  {c.title}
                </p>
                <p className="text-base leading-[1.8] text-[var(--brown-mid)]">
                  {c.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/about" className="btn-outline">
              Open About Section
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── CHARACTERS ─── */}
      <section className="section-beige min-h-screen flex flex-col justify-center py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="eyebrow text-center mb-3">The People of the Village</p>
          <h2 className="title-cormorant text-center text-[clamp(36px,5vw,64px)] mb-4">
            Meet the <em>Palmers</em>
          </h2>
          <div className="section-divider">
            <span></span>
            <div className="divider-diamond"></div>
            <span></span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {CHARACTER_GROUPS.map((g) => (
              <Link
                key={g.key}
                href={`/characters#${g.key}`}
                className="arch-card glass-deep"
              >
                <div
                  className="arch-img"
                  style={{
                    backgroundImage: `url(${GROUP_IMAGES[g.key]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="p-6 text-center">
                  <h3 className="font-cinzel text-[14px] tracking-[0.15em] text-[var(--brown)] mb-2 uppercase">
                    The {g.title}
                  </h3>
                  <p className="text-sm italic text-[var(--brown-mid)] mb-4 leading-relaxed">
                    {g.blurb}
                  </p>
                  <span className="btn-outline">Meet The Palmers</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── STORY ─── */}
      <section className="section-lighter min-h-screen flex flex-col justify-center py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="eyebrow text-center mb-3">The Novel</p>
          <h2 className="title-cormorant text-center text-[clamp(36px,5vw,64px)] mb-4">
            <em>123</em> Let&apos;s Learn English
            <br />
            Under the Palm Tree
          </h2>
          <div className="section-divider">
            <span></span>
            <div className="divider-diamond"></div>
            <span></span>
          </div>

          <p className="text-center max-w-[680px] mx-auto mb-12 text-xl italic leading-[1.8] text-[var(--brown-mid)]">
            &quot;There was once a village that taught children how to dream in
            two languages. Beneath the shade of an ancient palm, every word
            became a key — and every story, a door.&quot;
          </p>

          <div className="text-center mb-12">
            <Link href="/story" className="btn-gold">
              Enter The Story
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {CHAPTERS.map((c) => (
              <Link key={c.id} href={`/story/chapter/${c.id}`} className="chapter-card">
                <span className="font-cormorant text-[11px] tracking-[0.2em] text-[var(--gold-light)] opacity-70 mb-1 relative z-[1] uppercase">
                  Chapter
                </span>
                <span
                  className="font-cinzel text-[22px] text-[var(--gold)] relative z-[1]"
                  style={{ textShadow: "0 0 20px rgba(184,150,62,0.5)" }}
                >
                  {c.id}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── MUSIC ─── */}
      <section className="section-beige min-h-screen flex flex-col justify-center py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="eyebrow text-center mb-3">Sounds of the Palm</p>
          <h2 className="title-cormorant text-center text-[clamp(36px,5vw,64px)] mb-4">
            Palm Tree <em>Music</em>
          </h2>
          <div className="section-divider">
            <span></span>
            <div className="divider-diamond"></div>
            <span></span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TRACKS.slice(0, 6).map((t, i) => (
              <Link key={t.id} href="/music" className="music-card glass-deep">
                <div className="music-icon">{MUSIC_ICONS[i % MUSIC_ICONS.length]}</div>
                <div>
                  <h4 className="font-cinzel text-[13px] tracking-[0.12em] text-[var(--brown)] mb-1.5 uppercase">
                    {t.title}
                  </h4>
                  <p className="text-sm italic text-[var(--brown-mid)] leading-relaxed">
                    Related chapter: {t.relatedChapter}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/music" className="btn-outline">
              View All 22 Tracks
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── SKILLS ─── */}
      <section className="section-lighter min-h-screen flex flex-col justify-center py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="eyebrow text-center mb-3">Practice &amp; Grow</p>
          <h2 className="title-cormorant text-center text-[clamp(36px,5vw,64px)] mb-4">
            Your English <em>Skills</em>
          </h2>
          <div className="section-divider">
            <span></span>
            <div className="divider-diamond"></div>
            <span></span>
          </div>

          <p className="text-center italic text-[var(--brown-mid)] mb-12 text-base">
            Complete your story chapters first — then unlock the full suite of
            skill activities below.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {SKILLS.map((s) => (
              <Link key={s.slug} href={`/skills/${s.slug}`} className="skill-card">
                <span
                  className="text-[36px] mb-3 block"
                  style={{ filter: "drop-shadow(0 2px 6px rgba(184,150,62,0.3))" }}
                >
                  {SKILL_EMOJI[s.slug] || "✨"}
                </span>
                <p className="font-cinzel text-[11px] tracking-[0.12em] text-[var(--brown)] mb-2 uppercase">
                  {s.title}
                </p>
                <p className="text-xs italic text-[var(--brown-mid)] leading-relaxed mb-3.5">
                  {s.description}
                </p>
                <span
                  className="inline-block px-4 py-2 rounded-full font-cinzel text-[9px] tracking-[0.15em] uppercase"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(184,150,62,0.15), rgba(212,176,106,0.2))",
                    border: "1px solid rgba(184,150,62,0.4)",
                    color: "var(--gold)",
                  }}
                >
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── GAMES ─── */}
      <section className="section-beige min-h-screen flex flex-col justify-center py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="eyebrow text-center mb-3">Play &amp; Learn</p>
          <h2 className="title-cormorant text-center text-[clamp(36px,5vw,64px)] mb-4">
            The <em>Games</em> Garden
          </h2>
          <div className="section-divider">
            <span></span>
            <div className="divider-diamond"></div>
            <span></span>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center mb-16">
            <Link href="/games/2026" className="game-era-btn modern glass-deep">
              <p className="game-era-year">2026</p>
              <p className="font-cinzel text-xs tracking-[0.2em] text-[var(--brown)] uppercase">
                Modern Games
              </p>
              <p className="text-[13px] italic text-[var(--brown-mid)] mt-2 leading-relaxed">
                Ten interactive digital games for today&apos;s learners — fast,
                fun, deeply educational.
              </p>
            </Link>
            <Link
              href="/games/1973"
              className="game-era-btn traditional glass-deep"
            >
              <p className="game-era-year">1973</p>
              <p className="font-cinzel text-xs tracking-[0.2em] text-[var(--brown)] uppercase">
                Traditional Games
              </p>
              <p className="text-[13px] italic text-[var(--brown-mid)] mt-2 leading-relaxed">
                Ten Omani-inspired games reimagined as language-learning
                experiences rooted in heritage.
              </p>
            </Link>
          </div>

          <div className="text-center">
            <Link href="/games" className="btn-outline">
              Open Games Garden
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── GALLERY preview ─── */}
      <section className="section-lighter py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full">
          <p className="eyebrow text-center mb-3">Visual Archive</p>
          <h2 className="title-cormorant text-center text-[clamp(36px,5vw,64px)] mb-4">
            The <em>Gallery</em>
          </h2>
          <div className="section-divider">
            <span></span>
            <div className="divider-diamond"></div>
            <span></span>
          </div>
          <p className="text-center max-w-[680px] mx-auto mb-12 text-base italic leading-[1.8] text-[var(--brown-mid)]">
            A growing archive of the village, the classroom, the students, the
            ceremonies, the heritage, and the museums.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-10">
            {[
              { label: "Village", emoji: "🏡" },
              { label: "Classroom", emoji: "📚" },
              { label: "Students", emoji: "🧒" },
              { label: "Ceremonies", emoji: "🏆" },
              { label: "Heritage", emoji: "🌾" },
              { label: "Museums", emoji: "🏛️" },
              { label: "Behind The Scenes", emoji: "🎬" },
            ].map((g) => (
              <Link
                key={g.label}
                href={`/gallery#${g.label.toLowerCase().replace(/ /g, "-")}`}
                className="glass-deep rounded-2xl aspect-[4/5] flex flex-col items-center justify-center gap-2 p-4 hover:-translate-y-1 transition-transform"
              >
                <span className="text-3xl">{g.emoji}</span>
                <p className="font-cinzel text-[9px] tracking-[0.18em] uppercase text-[var(--brown)] text-center">
                  {g.label}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/gallery" className="btn-outline">
              Open The Gallery
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-hr" />

      {/* ─── AR + CERTIFICATE strip ─── */}
      <section className="section-beige py-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto w-full grid md:grid-cols-2 gap-8">
          <Link
            href="/ar"
            className="glass-deep p-10 rounded-[20px] hover:-translate-y-1 transition-transform text-center"
          >
            <p className="eyebrow mb-3">Immersive</p>
            <h3 className="title-cormorant text-4xl mb-3">
              The <em>AR</em> Experience
            </h3>
            <p className="text-base italic text-[var(--brown-mid)] mb-6 leading-relaxed">
              Step into the village. Hold the palm tree in your hands. Practice
              vocabulary in three dimensions.
            </p>
            <span className="btn-outline">Open AR</span>
          </Link>
          <Link
            href="/certificate"
            className="glass-deep p-10 rounded-[20px] hover:-translate-y-1 transition-transform text-center"
          >
            <p className="eyebrow mb-3">Completion</p>
            <h3 className="title-cormorant text-4xl mb-3">
              Your <em>Certificate</em>
            </h3>
            <p className="text-base italic text-[var(--brown-mid)] mb-6 leading-relaxed">
              A luxury glass-gold certificate carrying your name, your avatar,
              and your journey under the palm tree.
            </p>
            <span className="btn-outline">View Certificate</span>
          </Link>
        </div>
      </section>
    </>
  );
}
