type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
};

export default function SectionTitle({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="text-center mb-12">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="title-cormorant text-[clamp(36px,5vw,64px)] mb-4">
        {title}
      </h2>
      <div className="section-divider">
        <span></span>
        <div className="divider-diamond"></div>
        <span></span>
      </div>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-base md:text-lg italic text-[var(--brown-mid)] leading-relaxed -mt-6 mb-6">
          {subtitle}
        </p>
      )}
    </div>
  );
}
