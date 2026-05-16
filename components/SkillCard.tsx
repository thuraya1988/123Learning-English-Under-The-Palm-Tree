import Link from "next/link";
import { Skill } from "../data/skills";

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

export default function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link href={`/skills/${skill.slug}`} className="skill-card">
      <span
        className="text-[36px] mb-3 block"
        style={{ filter: "drop-shadow(0 2px 6px rgba(184,150,62,0.3))" }}
      >
        {SKILL_EMOJI[skill.slug] || "✨"}
      </span>
      <p className="font-cinzel text-[11px] tracking-[0.12em] text-[var(--brown)] mb-2 uppercase">
        {skill.title}
      </p>
      <p className="text-xs italic text-[var(--brown-mid)] leading-relaxed mb-3.5">
        {skill.description}
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
  );
}
