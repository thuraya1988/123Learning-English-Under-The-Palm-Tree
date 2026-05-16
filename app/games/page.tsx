import Link from "next/link";
import SectionTitle from "../../components/SectionTitle";

export default function GamesPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Play & Learn"
          title={
            <>
              The <em>Games</em> Garden
            </>
          }
          subtitle="Two cinematic galleries — 2026 modern, and 1973 traditional. Each game has 10 levels and ties back to the chapters of the story file."
        />

        <div className="flex flex-col md:flex-row gap-8 justify-center">
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
      </div>
    </section>
  );
}
