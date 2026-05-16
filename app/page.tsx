import Link from "next/link";
import Image from "next/image";
import RegistrationCard from "./_components/RegistrationCard";

const SERVICES = [
  {
    title: "Story chapters",
    blurb:
      "36 cinematic chapters set in the village of Sumail Al Qurooshiyah — read, listen, and unlock skill activities.",
    price: "36 chapters",
    href: "/story",
    image: "/images/scenes/cover.jpeg",
  },
  {
    title: "Skills with H5P",
    blurb:
      "Ten English skills wrapped in interactive H5P activities — grammar, listening, reading, writing, speaking, and more.",
    price: "10 skills",
    href: "/skills",
    image: "/images/scenes/teachers.png",
  },
  {
    title: "Games garden",
    blurb:
      "20 H5P-powered games — 10 modern, 10 Omani-inspired traditional — every game has 10 levels.",
    price: "20 games · 10 levels",
    href: "/games",
    image: "/images/scenes/villagers.png",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ─── HERO (LAHN-style: title left, photo right) ─── */}
      <section className="relative pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="botanical-left hidden md:block" />
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-5">
            <h1 className="title-cormorant text-[clamp(56px,7vw,96px)] mb-6">
              Under
              <br />
              <em>the palm tree</em>
            </h1>
            <div className="hairline-burgundy mb-6" />
            <p className="font-eb text-lg text-[var(--brown-mid)] leading-relaxed mb-8 max-w-md">
              A complete artistic English-learning experience inspired by stories,
              skills, music, games — and the timeless wisdom of the palm.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Link href="#register" className="btn-burgundy">
                Discover services
                <span className="arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <Link
                href="#philosophy"
                className="flex items-center gap-2 text-[var(--brown)] text-sm hover:text-[var(--burgundy)] transition"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
                Scroll to explore
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/scenes/cover.jpeg"
                alt="Under the palm tree"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
            </div>
            <p className="text-[11px] italic text-[var(--brown-mid)]/70 mt-3 text-right">
              Hero photograph placeholder — drop your door image at
              /public/images/scenes/hero-door.jpg
            </p>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY (text left, photo right inside oval) ─── */}
      <section id="philosophy" className="section-cream-light py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-4">Our Story Philosophy</p>
            <h2 className="title-cormorant text-[clamp(36px,5vw,56px)] mb-6">
              Stories that
              <br />
              <em>carry our voice</em>
            </h2>
            <p className="font-eb text-lg text-[var(--brown-mid)] leading-[1.8] mb-6 max-w-md">
              We believe every chapter tells a story, and every lesson carries
              an emotion that touches the heart. From a single ancient palm,
              two languages learn to dream together.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-[var(--burgundy)] font-medium hover:translate-x-1 transition-transform"
            >
              More about us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div
              className="relative w-[420px] max-w-full aspect-[3/4] overflow-hidden"
              style={{ borderRadius: "200px 200px 200px 200px / 240px 240px 240px 240px" }}
            >
              <Image
                src="/images/scenes/old-village.jpeg"
                alt="A scene from Sumail Al Qurooshiyah"
                fill
                className="object-cover"
                sizes="420px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── MUSIC BAND (LAHN dark green strip) ─── */}
      <section className="px-6 md:px-12 py-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="music-band p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-1/2 opacity-25 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.18),transparent_60%)]" />
            </div>
            <div className="flex items-center gap-5 relative z-10">
              <Link href="/music" className="play-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 5v14l12-7z" />
                </svg>
              </Link>
              <div>
                <p className="font-cormorant text-2xl md:text-3xl text-[var(--cream)] leading-tight">
                  Listen to our
                  <br />
                  <em className="italic">latest melodies</em>
                </p>
                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-[2px] rounded-full bg-[var(--gold-pale)]/85"
                      style={{
                        height: `${6 + Math.abs(Math.sin(i / 1.4)) * 22}px`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/music"
              className="font-cinzel text-xs tracking-[0.22em] uppercase text-[var(--gold-pale)] hover:text-[var(--cream)] transition relative z-10"
            >
              22 tracks · enter →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE OFFER (3 arch service cards) ─── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="font-cinzel text-[11px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">
              What We Offer
            </p>
            <h2 className="title-cormorant text-[clamp(32px,4vw,48px)] mb-3">
              Three pillars of the
              <em> Palm Tree </em>
              journey
            </h2>
            <div className="section-divider">
              <span></span>
              <div className="divider-diamond"></div>
              <span></span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICES.map((s) => (
              <Link key={s.title} href={s.href} className="arch-card">
                <div
                  className="arch-img"
                  style={{ backgroundImage: `url(${s.image})` }}
                />
                <div className="px-6 pt-6 pb-7 text-center">
                  <h3 className="font-cormorant text-2xl text-[var(--brown)] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm italic text-[var(--brown-mid)] leading-relaxed mb-4 min-h-[60px]">
                    {s.blurb}
                  </p>
                  <p className="price-tag mb-5">{s.price}</p>
                  <span className="btn-outline">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REGISTRATION ─── */}
      <section id="register" className="section-cream-light py-20 px-6 md:px-12 relative overflow-hidden scroll-mt-24">
        <div className="botanical-right hidden md:block" />
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Begin Your Journey</p>
            <h2 className="title-cormorant text-[clamp(36px,5vw,56px)] mb-5">
              Create your
              <br />
              <em>palm profile</em>
            </h2>
            <p className="font-eb text-lg text-[var(--brown-mid)] leading-[1.8] mb-6 max-w-md">
              Your avatar and username will appear throughout the website and on
              the final course completion certificate. Read the chapters, unlock
              the skills, play the games, and earn your seat under the palm.
            </p>
            <ul className="flex flex-col gap-2 text-[var(--brown-mid)] text-sm">
              <li>📖 36 cinematic chapters</li>
              <li>🎯 10 skills with H5P interactivity</li>
              <li>🎮 20 games (10 traditional + 10 modern), 10 levels each</li>
              <li>🎵 22 original songs and soundtracks</li>
              <li>🌴 AR scene placeholders ready for WebXR</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <RegistrationCard />
          </div>
        </div>
      </section>

      {/* ─── QUICK GRID (Characters, Gallery, AR, Certificate) ─── */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow">Explore More</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Characters", icon: "👥", href: "/characters", desc: "Meet The Palmers" },
              { label: "Gallery", icon: "🖼️", href: "/gallery", desc: "Visual archive" },
              { label: "AR Trip", icon: "📦", href: "/ar", desc: "WebXR ready" },
              { label: "Certificate", icon: "🏆", href: "/certificate", desc: "Your completion" },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="skill-card !text-left"
              >
                <span className="text-3xl mb-3 block">{c.icon}</span>
                <h4 className="font-cormorant text-2xl text-[var(--brown)] mb-1">
                  {c.label}
                </h4>
                <p className="text-sm italic text-[var(--brown-mid)]">
                  {c.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
