import SectionTitle from "../../components/SectionTitle";
import GlassButton from "../../components/GlassButton";
import PalmIcon from "../../components/PalmIcon";

export default function GamesPage() {
  return (
    <div className="flex flex-col gap-16">
      <SectionTitle
        eyebrow="Section 6"
        title="Games"
        subtitle="Two cinematic galleries — 2026 modern, and 1973 traditional. Story-file-aware. 10 levels per game."
      />

      <div className="grid md:grid-cols-2 gap-10">
        <CategoryCard
          title="2026 Games"
          subtitle="Modern Educational Games"
          description="10 cinematic, AI-aware games tied to the chapters of the story file."
          href="/games/2026"
          variant="light"
        />
        <CategoryCard
          title="1973 Games"
          subtitle="Traditional Omani-Inspired"
          description="10 heritage games inspired by village life and tied to the chapters."
          href="/games/1973"
          variant="dark"
        />
      </div>
    </div>
  );
}

function CategoryCard({
  title,
  subtitle,
  description,
  href,
  variant,
}: {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  variant: "light" | "dark";
}) {
  const cls = variant === "dark" ? "glass-dark" : "glass";
  const text = variant === "dark" ? "text-[#f4e6c4]/80" : "text-cocoa/75";
  return (
    <div className={`${cls} p-10 flex flex-col gap-6 relative overflow-hidden`}>
      <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(233,201,124,0.5),transparent_70%)] blur-2xl" />
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-2xl bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] to-[#8a6529] flex items-center justify-center">
          <PalmIcon className="w-8 h-8" />
        </div>
        <span className="text-[0.7rem] tracking-[0.32em] uppercase opacity-80">
          {subtitle}
        </span>
      </div>
      <h3 className="font-display gold-text text-4xl tracking-wide">{title}</h3>
      <p className={`${text} leading-relaxed`}>{description}</p>
      <div className="flex flex-wrap gap-3 mt-2">
        <GlassButton variant="gold" href={href}>Enter Gallery</GlassButton>
      </div>
    </div>
  );
}
