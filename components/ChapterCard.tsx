import Link from "next/link";
import { Chapter } from "../data/chapters";

export default function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <Link href={`/story/chapter/${chapter.id}`} className="chapter-card">
      <span className="font-cormorant text-[11px] tracking-[0.2em] text-[var(--gold-light)] opacity-70 mb-1 relative z-[1] uppercase">
        Chapter
      </span>
      <span
        className="font-cinzel text-[22px] text-[var(--gold)] relative z-[1]"
        style={{ textShadow: "0 0 20px rgba(184,150,62,0.5)" }}
      >
        {chapter.id}
      </span>
    </Link>
  );
}
