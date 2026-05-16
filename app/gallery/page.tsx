import Image from "next/image";
import SectionTitle from "../../components/SectionTitle";
import { GALLERY_SECTIONS } from "../../data/gallery";

export default function GalleryPage() {
  return (
    <section className="min-h-screen pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto w-full">
        <SectionTitle
          eyebrow="Photo Gallery"
          title={
            <>
              The <em>Gallery</em>
            </>
          }
          subtitle="A curated visual archive of the village, the classroom, the students, the heritage, and the people behind the palm tree."
        />

        {GALLERY_SECTIONS.map((section) => (
          <section key={section.key} className="mb-20 scroll-mt-32" id={section.key}>
            <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
              <div>
                <p className="font-cinzel text-[11px] tracking-[0.22em] uppercase text-[var(--gold)] mb-1">
                  Section
                </p>
                <h3 className="font-cormorant text-3xl text-[var(--brown)]">
                  {section.title}
                </h3>
                <p className="text-[var(--brown-mid)] italic text-sm mt-1 max-w-xl">
                  {section.blurb}
                </p>
              </div>
              <span className="font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)]/70">
                {section.images.length} {section.images.length === 1 ? "photo" : "photos"}
              </span>
            </div>

            <div className="gold-line !mx-0 mb-6" />

            {section.images.length === 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="glass-deep aspect-[4/5] rounded-2xl flex flex-col items-center justify-center gap-2 p-4"
                  >
                    <span className="text-3xl opacity-50">📷</span>
                    <p className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-[var(--brown-mid)] text-center">
                      [{section.title} Photo Placeholder]
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {section.images.map((img) => (
                  <div
                    key={img}
                    className="glass-deep aspect-[4/5] rounded-2xl overflow-hidden relative"
                  >
                    <Image
                      src={`${section.folder}/${img}`}
                      alt={`${section.title} — ${img}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
