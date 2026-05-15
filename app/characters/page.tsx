import Link from "next/link";
import GlassButton from "../../components/GlassButton";
import SectionTitle from "../../components/SectionTitle";
import PalmIcon from "../../components/PalmIcon";
import { CHARACTERS, CHARACTER_GROUPS } from "../../data/characters";

export default function CharactersPage() {
  return (
    <div className="flex flex-col gap-16">
      <SectionTitle
        eyebrow="Section 2"
        title="Characters"
        subtitle="Teachers, students, and villagers — each grounded in the story file. Names appear in English only."
      />

      {/* Three arch cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {CHARACTER_GROUPS.map((g) => (
          <div key={g.key} className="glass arch-card overflow-hidden">
            <div className="relative h-80 bg-[radial-gradient(circle_at_50%_40%,rgba(255,244,220,0.6),transparent_70%)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <PalmIcon className="w-24 h-24 opacity-80" />
              </div>
              <span className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/70">
                [Cinematic Image Placeholder]
              </span>
            </div>
            <div className="p-7">
              <h3 className="font-display gold-text text-2xl tracking-wide">
                {g.title}
              </h3>
              <p className="text-cocoa/75 text-sm mt-2 leading-relaxed">
                {g.blurb}
              </p>
              <div className="mt-5">
                <GlassButton variant="gold" href={`/characters#${g.key}`}>
                  Meet The Palmers
                </GlassButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Group portrait cards */}
      {CHARACTER_GROUPS.map((g) => {
        const list = CHARACTERS.filter((c) => c.group === g.key);
        return (
          <section key={g.key} id={g.key} className="flex flex-col gap-8">
            <SectionTitle eyebrow="Group" title={g.title} subtitle={g.blurb} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {list.map((c) => (
                <Link
                  key={c.slug}
                  href={`/characters/${c.slug}`}
                  className="block glass overflow-hidden hover:-translate-y-1 transition-transform"
                  style={{ borderRadius: "180px 180px 28px 28px" }}
                >
                  <div className="relative h-64 bg-[radial-gradient(circle_at_50%_35%,rgba(255,244,220,0.7),transparent_70%)] flex items-center justify-center">
                    <div className="w-28 h-28 rounded-full bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] via-[#d6ad58] to-[#8a6529] flex items-center justify-center text-cocoa font-display text-3xl">
                      {c.name[0]}
                    </div>
                    <span className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-[0.6rem] tracking-[0.2em] uppercase text-cocoa/70">
                      [Character Image Placeholder]
                    </span>
                  </div>
                  <div className="p-5">
                    <h4 className="font-display gold-text text-xl tracking-wide">
                      {c.name}
                    </h4>
                    <p className="text-[0.7rem] tracking-[0.22em] uppercase text-cocoa/65 mt-1">
                      {c.role}
                    </p>
                    <p className="text-cocoa/75 text-sm mt-3 line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
