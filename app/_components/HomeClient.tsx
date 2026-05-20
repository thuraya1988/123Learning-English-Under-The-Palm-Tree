"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { TRACKS, WEBSITE_AUDIO } from "../../data/music";
import { CHAPTERS } from "../../data/chapters";
import { ALL_GAMES } from "../../data/games";
import RegistrationCard from "./RegistrationCard";

/** Roman numerals 1-36 */
const ROMANS = [
  "I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII",
  "XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI",
];

const SKILLS = [
  { slug: "reading", name: "Reading", img: "/My.website.background/reading.jpeg",
    desc: "Walk gently through the lines, as one walks through a palm grove." },
  { slug: "writing", name: "Writing", img: null,
    desc: "A pen, a thought, the steady patience of paper.", coming: true },
  { slug: "speaking", name: "Speaking", img: "/My.website.background/speaking.jpeg",
    desc: "Words shared in shade, between two cups of coffee." },
  { slug: "listening", name: "Listening", img: "/My.website.background/listening.jpeg",
    desc: "To hear is the first kindness." },
  { slug: "grammar", name: "Grammar", img: "/My.website.background/grammar.jpeg",
    desc: "The hidden architecture beneath every sentence." },
  { slug: "vocabulary", name: "Vocabulary", img: "/My.website.background/papaay.jpeg",
    desc: "A small chest of words, polished by use." },
  { slug: "pronunciation", name: "Pronunciation", img: null,
    desc: "The shape the mouth makes when meaning arrives.", coming: true },
  { slug: "spelling", name: "Spelling", img: "/My.website.background/jazoara.jpeg",
    desc: "Letter by letter, the way dates are picked from the bunch." },
];

const GAMES = ALL_GAMES.map((g) => ({
  slug: g.slug,
  name: g.title,
  era: g.category,
  desc: g.intro,
  available: g.available,
}));

const GALLERY = [
  { src: "/My.website.background/main.jpeg",          shape: "shape-arch",  caption: "The main view of the village" },
  { src: "/My.website.background/background-1.jpeg",  shape: "shape-round", caption: "Village morning" },
  { src: "/My.website.background/background-2.jpeg",  shape: "shape-round", caption: "Palm grove" },
  { src: "/My.website.background/background-3.jpeg",  shape: "shape-oval",  caption: "Golden hour" },
  { src: "/My.website.background/background-4.jpeg",  shape: "shape-wide",  caption: "Village afternoon" },
  { src: "/My.website.background/background-5.jpeg",  shape: "shape-round", caption: "Falaj" },
  { src: "/My.website.background/background-6.jpeg",  shape: "shape-arch",  caption: "Old door" },
  { src: "/My.website.background/background-7.jpeg",  shape: "shape-round", caption: "Hidden corner" },
  { src: "/My.website.background/background-8.jpeg",  shape: "shape-tall",  caption: "Twin palms" },
  { src: "/My.website.background/background-9.jpeg",  shape: "shape-round", caption: "Heritage motifs" },
  { src: "/My.website.background/2boys-oldphone.jpeg", shape: "shape-round", caption: "Two boys, one phone" },
  { src: "/My.website.background/background-10.jpeg", shape: "shape-wide",  caption: "Village portrait" },
];

export default function HomeClient() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [bgPlaying, setBgPlaying] = useState(false);
  const [gameTab, setGameTab] = useState<"all" | "2026" | "1973">("all");

  const togglePlay = (id: number, src: string) => {
    if (!audioRef.current) return;
    if (playingId === id) {
      audioRef.current.pause();
      setPlayingId(null);
      return;
    }
    audioRef.current.src = src;
    audioRef.current.play().catch(() => {});
    setPlayingId(id);
  };

  const toggleBg = () => {
    if (!bgRef.current) return;
    if (bgPlaying) {
      bgRef.current.pause();
      setBgPlaying(false);
    } else {
      bgRef.current.src = WEBSITE_AUDIO.bgMain;
      bgRef.current.play().catch(() => {});
      setBgPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} hidden />
      <audio ref={bgRef} loop hidden />

      {/* ═══ HERO ═══ */}
      <header className="teaser bg-cream" id="home">
        <div className="botanical-corner left-top" aria-hidden />
        <div className="teaser-inner">
          <div className="teaser-text fade-up visible">
            <span className="eyebrow">Begin your journey</span>
            <h1 className="teaser-title">
              Under
              <br />
              <em>the palm tree</em>
            </h1>
            <div className="teaser-rule"></div>
            <p>
              A cinematic English learning experience — woven from forty quiet
              moments of an Omani village in 1973, set to music, art, and gentle
              craft.
            </p>
            <Link href="#register" className="btn-burgundy">
              Begin the journey<span className="arrow">→</span>
            </Link>
            <div>
              <Link href="#about" className="scroll-cue">
                <span className="arrow-down">↓</span> Scroll to explore
              </Link>
            </div>
          </div>
          <div className="teaser-image-wrap fade-up visible">
            <div className="teaser-image">
              <img
                src="/My.website.background/main.jpeg"
                alt="The village of Al-Qurawashiyah"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ═══ REGISTRATION ═══ */}
      <section
        className="teaser bg-cream-light"
        id="register"
        style={{ minHeight: "auto", padding: "100px 60px" }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto", width: "100%" }}>
          <div className="section-head" style={{ marginBottom: 32 }}>
            <div className="section-eyebrow">Create your profile</div>
            <h2 className="section-title">
              Welcome, <em>young explorer</em>.
            </h2>
          </div>
          <RegistrationCard />
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="teaser bg-cream" id="about">
        <div className="botanical-corner left-top" aria-hidden />
        <div className="botanical-corner right-top" aria-hidden />
        <div className="teaser-inner">
          <div className="teaser-text fade-up visible">
            <span className="eyebrow">About the project</span>
            <h2 className="teaser-title">
              Stories that carry our <em>heart</em>.
            </h2>
            <div className="teaser-rule"></div>
            <p>
              An immersive English-learning platform rooted in the cinematic
              heritage of Al-Qurawashiyah village, Samail — Oman, 1973.
            </p>
            <p style={{ fontStyle: "italic", fontSize: 15 }}>
              &quot;From ancient times to today, what has truly made the earth
              evolve is the continuation of human learning.&quot;
            </p>
            <Link href="/characters" className="btn-outline">
              Meet the villagers →
            </Link>
          </div>
          <div className="teaser-image-wrap fade-up visible">
            <div className="oval-frame">
              <img
                src="/My.website.background/background-1.jpeg"
                alt="Twin palms at golden hour"
              />
              <span className="oval-deco">— Al-Qurawashiyah, 1973</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CHAPTERS ═══ */}
      <section className="section-pad bg-cream-light" id="stories">
        <div className="section-head fade-up visible">
          <div className="section-eyebrow">The Novel</div>
          <h2 className="section-title">
            Thirty-six <em>chapters</em>, one village.
          </h2>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              color: "var(--brown-mid)",
              marginTop: 18,
              fontSize: 17,
            }}
          >
            &quot;There was once a village that taught children how to dream in
            two languages.&quot;
          </p>
          <div
            style={{
              marginTop: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 28px",
              borderRadius: 60,
              background: "var(--cream)",
              border: "1px solid rgba(184,150,62,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--caps)",
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "var(--brown-mid)",
              }}
            >
              YOUR PROGRESS
            </span>
            <span
              style={{
                fontFamily: "var(--serif)",
                fontSize: 18,
                color: "var(--burgundy)",
                fontStyle: "italic",
              }}
            >
              0 / 36
            </span>
          </div>
        </div>
        <div className="chapters-grid">
          {CHAPTERS.map((c, i) => (
            <Link
              key={c.id}
              href={`/story/chapter/${c.id}`}
              className={`chapter-card ${c.available ? "" : "locked"}`}
              title={c.available ? `${c.title} — ${c.subtitle}` : `Chapter ${c.id}`}
            >
              <div className="chapter-roman">{ROMANS[i]}</div>
              <div className="chapter-label">
                {c.available ? c.title : `Chapter ${c.id}`}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ MUSIC BAND ═══ */}
      <div className="music-band-wrap">
      <section className="music-band">
        <button
          type="button"
          aria-label={bgPlaying ? "Pause background music" : "Play background music"}
          className="music-play"
          onClick={toggleBg}
        >
          {bgPlaying ? (
            <span style={{ width: 18, height: 18, background: "var(--cream-light)" }} />
          ) : (
            <span
              style={{
                width: 0,
                height: 0,
                borderLeft: "18px solid var(--cream-light)",
                borderTop: "11px solid transparent",
                borderBottom: "11px solid transparent",
                marginLeft: 5,
              }}
            />
          )}
        </button>
        <div className="music-text">
          <h3>
            Listen to our
            <br />
            latest melodies
          </h3>
          <div className="music-wave">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                style={{
                  height: `${30 + Math.abs(Math.sin(i * 1.3)) * 60}%`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* ═══ SONGS ═══ */}
      <section className="section-pad bg-cream-light" id="songs">
        <div className="section-head fade-up visible">
          <div className="section-eyebrow">The Melodies</div>
          <h2 className="section-title">
            Twenty-two <em>songs</em> for the palms.
          </h2>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              color: "var(--brown-mid)",
              marginTop: 18,
              fontSize: 15,
            }}
          >
            {TRACKS.length} live tracks · 3 more on the way.
          </p>
        </div>
        <div className="songs-grid">
          {TRACKS.map((t, i) => (
            <div key={t.id} className="song-card">
              <div className="song-num">{ROMANS[i]}</div>
              <div className="song-info">
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
              <button
                type="button"
                aria-label={playingId === t.id ? "Pause" : "Play"}
                className={`song-play ${playingId === t.id ? "playing" : ""}`}
                onClick={() => togglePlay(t.id, t.audio)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CHARACTERS preview ═══ */}
      <section
        className="section-pad bg-cream"
        id="characters"
        style={{ textAlign: "center" }}
      >
        <div className="section-head fade-up visible">
          <div className="section-eyebrow">The Villagers</div>
          <h2 className="section-title">
            Meet the <em>twenty-two</em> souls.
          </h2>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              color: "var(--brown-mid)",
              marginTop: 18,
              fontSize: 17,
            }}
          >
            Twenty-two souls who give the village its breath.
          </p>
        </div>
        <Link href="/characters" className="btn-burgundy">
          Open the characters gallery<span className="arrow">→</span>
        </Link>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section className="section-pad bg-cream-light" id="skills">
        <div className="section-head fade-up visible">
          <div className="section-eyebrow">Skills Practice</div>
          <h2 className="section-title">
            Eight <em>doorways</em> into English.
          </h2>
        </div>

        <div className="arched-grid">
          {SKILLS.map((s) => (
            <Link
              key={s.slug}
              href={`/skills/${s.slug}`}
              className="arched-card"
            >
              <div className="skill-arched-frame">
                {s.img ? (
                  <img src={s.img} alt={s.name} />
                ) : (
                  <div className="ph-text">
                    Coming
                    <br />
                    soon
                  </div>
                )}
              </div>
              <div className="arched-body">
                <h3>{s.name}</h3>
                <p>&quot;{s.desc}&quot;</p>
                {s.coming ? (
                  <span className="skill-coming">Coming soon</span>
                ) : (
                  <span className="skill-practice-btn">Practice →</span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* PRACTICE CARDS */}
        <div className="practice-cards">
          <Link href="/skills" className="practice-card fade-up visible">
            <div className="pc-num">I</div>
            <h3>
              Practice <em>One</em>
            </h3>
            <p>
              Your first round of exercises — gentle warm-ups across reading,
              listening, and vocabulary. Step in at your own pace.
            </p>
            <span className="pc-btn">Begin practice one →</span>
          </Link>
          <Link href="/skills" className="practice-card fade-up visible">
            <div className="pc-num">II</div>
            <h3>
              Practice <em>Two</em>
            </h3>
            <p>
              The second round — deeper exercises that weave story, grammar, and
              writing together. For learners ready to climb higher.
            </p>
            <span className="pc-btn">Begin practice two →</span>
          </Link>
        </div>

        {/* OLEC */}
        <div style={{ marginTop: 80 }}>
          <div className="section-head fade-up visible">
            <div className="section-eyebrow">The Framework</div>
            <h2 className="section-title">
              The <em>OLEC</em> System
            </h2>
          </div>
          <div className="olec-grid">
            {[
              ["O", "OBSERVE", "Read the story — let it settle."],
              ["L", "LISTEN", "Hear it read aloud — to the voice."],
              ["E", "ENGAGE", "Practice — gently, repeatedly."],
              ["C", "CREATE", "Make something of your own."],
            ].map(([letter, title, body]) => (
              <div key={letter} className="olec-card">
                <div className="olec-letter">{letter}</div>
                <h4>{title}</h4>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section className="section-pad bg-cream" id="gallery">
        <div className="section-head fade-up visible">
          <div className="section-eyebrow">The Gallery</div>
          <h2 className="section-title">
            Pictures of a <em>village</em>.
          </h2>
        </div>
        <div className="gallery-grid">
          {GALLERY.map((g, i) => (
            <div key={i} className={`gallery-item ${g.shape}`}>
              <img src={g.src} alt={g.caption} />
              <div className="gallery-caption">{g.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ AR ═══ */}
      <section className="section-pad bg-green" id="ar">
        <div className="section-head fade-up visible">
          <div
            className="section-eyebrow"
            style={{ color: "var(--gold-light)" }}
          >
            Augmented Reality
          </div>
          <h2 className="section-title" style={{ color: "var(--gold-light)" }}>
            Step <em style={{ color: "#e8d5a3" }}>inside</em> the village.
          </h2>
        </div>

        <div className="ar-experience fade-up visible">
          <div className="ar-image-wrap">
            <div className="ar-image">
              <img
                src="/My.website.background/background-4.jpeg"
                alt="Mooza's Kitchen"
              />
            </div>
            <span className="ar-badge">AR · INTERACTIVE</span>
          </div>
          <div className="ar-info" style={{ color: "var(--cream-light)" }}>
            <span
              style={{
                fontFamily: "var(--caps)",
                fontSize: 11,
                letterSpacing: "0.3em",
                color: "var(--gold-light)",
              }}
            >
              EXPERIENCE I
            </span>
            <h2 style={{ color: "var(--gold-light)" }}>
              Mooza&apos;s <em style={{ color: "#e8d5a3" }}>Kitchen</em>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(244,237,224,0.78)",
                lineHeight: 1.85,
                maxWidth: 480,
              }}
            >
              Step into Mooza&apos;s traditional Omani kitchen — chop, stir,
              simmer. Every utensil is a vocabulary word; every step is a
              sentence in English.
            </p>
            <ul className="ar-features">
              <li style={{ color: "rgba(244,237,224,0.78)" }}>
                Cook three traditional Omani dishes
              </li>
              <li style={{ color: "rgba(244,237,224,0.78)" }}>
                Learn 60+ kitchen vocabulary words
              </li>
              <li style={{ color: "rgba(244,237,224,0.78)" }}>
                Practice imperative verbs in context
              </li>
            </ul>
            <Link href="/ar" className="btn-burgundy">
              Launch experience <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="ar-experience reverse fade-up visible">
          <div className="ar-info" style={{ color: "var(--cream-light)" }}>
            <span
              style={{
                fontFamily: "var(--caps)",
                fontSize: 11,
                letterSpacing: "0.3em",
                color: "var(--gold-light)",
              }}
            >
              EXPERIENCE II
            </span>
            <h2 style={{ color: "var(--gold-light)" }}>
              The Qurawashiya{" "}
              <em style={{ color: "#e8d5a3" }}>Riddle</em>
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(244,237,224,0.78)",
                lineHeight: 1.85,
                maxWidth: 480,
              }}
            >
              A heritage riddle game — solve clues hidden in the village&apos;s
              doorways, palms, and corners. Each riddle unlocks a story chapter.
            </p>
            <ul className="ar-features">
              <li style={{ color: "rgba(244,237,224,0.78)" }}>
                Solve 12 cinematic riddles set in the village
              </li>
              <li style={{ color: "rgba(244,237,224,0.78)" }}>
                Discover hidden lore about each villager
              </li>
              <li style={{ color: "rgba(244,237,224,0.78)" }}>
                Unlock special story chapters as rewards
              </li>
            </ul>
            <Link href="/ar" className="btn-burgundy">
              Launch experience <span className="arrow">→</span>
            </Link>
          </div>
          <div className="ar-image-wrap">
            <div className="ar-image">
              <img
                src="/My.website.background/main.jpeg"
                alt="The Riddle"
              />
            </div>
            <span className="ar-badge">AR · NARRATIVE</span>
          </div>
        </div>
      </section>

      {/* ═══ GAMES ═══ */}
      <section className="section-pad bg-cream" id="games">
        <div className="section-head fade-up visible">
          <div className="section-eyebrow">Play &amp; Learn</div>
          <h2 className="section-title">
            The <em>Games</em> Garden.
          </h2>
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              color: "var(--brown-mid)",
              marginTop: 18,
              fontSize: 17,
            }}
          >
            Two gardens for two eras — modern, and traditional.
          </p>
        </div>

        <div className="games-tabs fade-up visible">
          {(["all", "2026", "1973"] as const).map((era) => (
            <button
              key={era}
              type="button"
              className={`games-tab ${gameTab === era ? "active" : ""}`}
              onClick={() => setGameTab(era)}
            >
              {era === "all" ? "All games" : era === "2026" ? "Modern · 2026" : "Traditional · 1973"}
            </button>
          ))}
        </div>

        <div className="games-grid">
          {GAMES.filter(
            (g) => gameTab === "all" || g.era === gameTab
          ).map((g) => (
            <Link
              key={g.slug}
              href={`/games/${g.era}/${g.slug}`}
              className="game-card"
            >
              <span className="game-tag">
                {g.era === "2026" ? "MODERN · 2026" : "TRADITIONAL · 1973"}
              </span>
              <h3>{g.name}</h3>
              <p>{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
