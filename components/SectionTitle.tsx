type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: Props) {
  const a = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col ${a} gap-3 mb-10`}>
      {eyebrow && (
        <span className="text-[0.7rem] tracking-[0.32em] uppercase text-cocoa/60">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display gold-text text-3xl md:text-5xl leading-tight tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-cocoa/75 text-base md:text-lg leading-relaxed font-serif">
          {subtitle}
        </p>
      )}
      <div className="hairline w-40 mt-2" />
    </div>
  );
}
