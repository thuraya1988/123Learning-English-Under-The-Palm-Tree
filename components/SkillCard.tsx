import Link from "next/link";
import { Skill } from "../data/skills";

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group block glass-inset p-6 md:p-7 hover:shadow-gold transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/70">
          Skill
        </span>
        <div className="w-12 h-12 rounded-2xl bevel bg-gradient-to-br from-[#f5dfa3] to-[#8a6529] flex items-center justify-center text-cocoa font-display text-lg">
          {skill.title[0]}
        </div>
      </div>
      <h3 className="font-display text-xl gold-text tracking-wide">
        {skill.title}
      </h3>
      <p className="mt-2 text-cocoa/75 text-sm leading-relaxed line-clamp-3">
        {skill.description}
      </p>
      <div className="mt-5 hairline" />
      <p className="mt-3 text-[0.7rem] tracking-[0.18em] uppercase text-cocoa/60">
        [3D Image Placeholder]
      </p>
    </Link>
  );
}
