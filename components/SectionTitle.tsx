type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
};

export default function SectionTitle({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="text-center mb-12">
      {eyebrow && (
        <p className="font-cinzel text-[11px] tracking-[0.4em] uppercase text-[var(--gold)] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="title-cormorant text-[clamp(34px,4.5vw,56px)] mb-3">
        {title}
      </h2>
      <div className="section-divider">
        <span></span>
        <div className="divider-diamond"></div>
        <span></span>
      </div>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-base md:text-lg italic text-[var(--brown-mid)] leading-[1.8] -mt-6 mb-6">
          {subtitle}
        </p>
      )}
    </div>
  );
}
