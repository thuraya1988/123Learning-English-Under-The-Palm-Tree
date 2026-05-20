import Link from "next/link";
import { CHAPTERS } from "../../data/chapters";

const ROMANS = [
  "I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII","XIII","XIV","XV","XVI","XVII","XVIII",
  "XIX","XX","XXI","XXII","XXIII","XXIV","XXV","XXVI","XXVII","XXVIII","XXIX","XXX","XXXI","XXXII","XXXIII","XXXIV","XXXV","XXXVI",
];

export default function StoryPage() {
  const released = CHAPTERS.filter((c) => c.available).length;
  return (
    <section className="section-pad bg-cream-light" style={{ paddingTop: 140 }}>
      <div className="section-head">
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
            RELEASED
          </span>
          <span
            style={{
              fontFamily: "var(--serif)",
              fontSize: 18,
              color: "var(--burgundy)",
              fontStyle: "italic",
            }}
          >
            {released} / 36
          </span>
        </div>
        <div style={{ marginTop: 26 }}>
          <a
            href="/story/novel.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-burgundy"
          >
            Open the complete book <span className="arrow">→</span>
          </a>
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
  );
}
