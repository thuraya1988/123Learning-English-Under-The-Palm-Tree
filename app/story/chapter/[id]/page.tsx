import Link from "next/link";
import { notFound } from "next/navigation";
import { CHAPTERS } from "../../../../data/chapters";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ id: String(c.id) }));
}

export default function ChapterPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const chapter = CHAPTERS.find((c) => c.id === id);
  if (!chapter) return notFound();

  const prev = id > 1 ? id - 1 : null;
  const next = id < 36 ? id + 1 : null;

  return (
    <section style={{ paddingTop: 100, paddingBottom: 60 }}>
      {/* Chapter header */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "30px 40px 20px",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--caps)",
            fontSize: 11,
            letterSpacing: "0.3em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          Chapter {chapter.id} of 36
        </span>
        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(40px, 5vw, 64px)",
            fontWeight: 300,
            color: "var(--burgundy)",
            marginTop: 6,
            marginBottom: 8,
          }}
        >
          {chapter.title}
        </h1>
        <p
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 20,
            color: "var(--brown-mid)",
          }}
        >
          {chapter.subtitle}
        </p>
        {chapter.summary && (
          <p
            style={{
              maxWidth: 720,
              margin: "20px auto 0",
              color: "var(--brown-mid)",
              lineHeight: 1.8,
              fontSize: 16,
            }}
          >
            {chapter.summary}
          </p>
        )}
      </div>

      {/* Embed of the official story file */}
      {chapter.available ? (
        <div
          style={{
            maxWidth: 1100,
            margin: "30px auto 50px",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              borderRadius: 24,
              overflow: "hidden",
              border: "1px solid rgba(184,150,62,0.35)",
              boxShadow: "0 20px 50px -20px rgba(61,43,31,0.25)",
              background: "#f5f0e8",
            }}
          >
            <iframe
              src={`/story/novel.html#chapter-${chapter.id}`}
              title={`${chapter.title} — ${chapter.subtitle}`}
              style={{
                display: "block",
                width: "100%",
                height: "80vh",
                border: "none",
              }}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: 12,
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 13,
              color: "var(--brown-mid)",
            }}
          >
            From{" "}
            <a
              href="/story/novel.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--burgundy)" }}
            >
              the complete story file
            </a>{" "}
            · Scroll inside the frame to read.
          </p>
        </div>
      ) : (
        <div
          style={{
            maxWidth: 720,
            margin: "30px auto 60px",
            padding: 40,
            textAlign: "center",
            borderRadius: 24,
            background: "var(--cream-light)",
            border: "1px solid rgba(184,150,62,0.3)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: 18,
              color: "var(--brown-mid)",
              marginBottom: 14,
            }}
          >
            [Chapter {chapter.id} is not yet released]
          </p>
          <p style={{ color: "var(--brown-mid)", fontSize: 14 }}>
            The author is preparing this chapter. Chapters 1–9 of{" "}
            <em>Under The Palm Tree</em> are available now.
          </p>
        </div>
      )}

      {/* Nav */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {prev ? (
          <Link href={`/story/chapter/${prev}`} className="btn-outline">
            ← Previous
          </Link>
        ) : (
          <span />
        )}
        <Link href="/#stories" className="btn-outline">
          All Chapters
        </Link>
        {next ? (
          <Link href={`/story/chapter/${next}`} className="btn-burgundy">
            Next Chapter →
          </Link>
        ) : (
          <Link href="/certificate" className="btn-burgundy">
            View Certificate →
          </Link>
        )}
      </div>
    </section>
  );
}
