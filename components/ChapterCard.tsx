"use client";
import Link from "next/link";
import { Chapter } from "../data/chapters";
import { ARCubeIcon } from "./Icons";

export default function ChapterCard({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const offset = index % 2 === 0 ? "md:translate-y-0" : "md:translate-y-10";
  return (
    <div className={`relative ${offset} transition-transform`}>
      <Link href={`/story/chapter/${chapter.id}`} className="group block">
        <div className="glass-dark p-6 md:p-7 rounded-[28px] hover:-translate-y-1 transition-transform">
          <div className="flex items-start justify-between gap-4 mb-3">
            <span className="font-display gold-text text-3xl leading-none">
              {String(chapter.id).padStart(2, "0")}
            </span>
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#e9c97c]/80">
              Chapter
            </span>
          </div>
          <h3 className="font-display text-[1.05rem] text-[#f4e6c4] leading-snug">
            {chapter.title}
          </h3>
          <p className="mt-3 text-[#f4e6c4]/65 text-[0.85rem] leading-relaxed line-clamp-3">
            {chapter.summary}
          </p>
          <div className="mt-5 flex items-center justify-between text-[0.7rem] tracking-[0.18em] uppercase text-[#e9c97c]/80">
            <span className="opacity-80">Read · Practice</span>
            <span className="flex items-center gap-1 opacity-80">
              <ARCubeIcon className="w-4 h-4" /> AR
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
