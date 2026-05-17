import Link from "next/link";
import Image from "next/image";
import SectionTitle from "../../components/SectionTitle";
import { CHARACTERS, CHARACTER_GROUPS } from "../../data/characters";

const GROUP_IMAGES: Record<string, string> = {
  teachers: "/My.website.background/background-1.jpeg",
  students: "/My.website.background/background-2.jpeg",
  villagers: "/My.website.background/background-3.jpeg",
};

export default function CharactersPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="The People Of The Village"
          title={
            <>
              Meet the <em>Palmers</em>
            </>
          }
          subtitle="Teachers, students, and villagers — every face carries a story rooted in the chapters of the book."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {CHARACTER_GROUPS.map((g) => (
            <Link key={g.key} href={`#${g.key}`} className="arch-card glass-deep">
              <div
                className="arch-img"
                style={{
                  backgroundImage: `url(${GROUP_IMAGES[g.key]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="p-6 text-center">
                <h3 className="font-cinzel text-[14px] tracking-[0.15em] text-[var(--brown)] mb-2 uppercase">
                  The {g.title}
                </h3>
                <p className="text-sm italic text-[var(--brown-mid)] mb-4 leading-relaxed">
                  {g.blurb}
                </p>
                <span className="btn-outline">Meet The Palmers</span>
              </div>
            </Link>
          ))}
        </div>

        {CHARACTER_GROUPS.map((g) => {
          const list = CHARACTERS.filter((c) => c.group === g.key);
          return (
            <section key={g.key} id={g.key} className="mb-20 scroll-mt-32">
              <SectionTitle
                eyebrow={g.key}
                title={<>The <em>{g.title}</em></>}
                subtitle={g.blurb}
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {list.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/characters/${c.slug}`}
                    className="glass-deep overflow-hidden hover:-translate-y-1 transition-transform block"
                    style={{ borderRadius: "180px 180px 24px 24px" }}
                  >
                    <div
                      className="relative h-64 flex items-end justify-center"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(184,150,62,0.15) 0%, rgba(240,232,220,0.3) 60%, rgba(240,232,220,0.6) 100%)",
                        borderRadius: "120px 120px 0 0",
                      }}
                    >
                      <Image
                        src={c.image}
                        alt={c.name}
                        width={220}
                        height={260}
                        className="object-contain w-auto h-full p-4"
                      />
                    </div>
                    <div className="p-5 text-center">
                      <h4 className="font-cinzel text-[13px] tracking-[0.18em] text-[var(--brown)] uppercase mb-1">
                        {c.name}
                      </h4>
                      <p className="text-[11px] italic text-[var(--gold)] tracking-[0.1em] uppercase mb-2">
                        {c.role}
                      </p>
                      <p className="text-[13px] italic text-[var(--brown-mid)] line-clamp-2">
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
    </section>
  );
}
