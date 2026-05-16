"use client";

type Props = {
  title: string;
  description?: string;
  modelPlaceholder?: string;
};

/**
 * WebXR / <model-viewer> ready placeholder.
 * Real .glb/.usdz assets are not generated here. The DOM is structured so a
 * real <model-viewer ar ar-modes="webxr scene-viewer quick-look"> element can
 * later be dropped in directly.
 */
export default function ARViewer({
  title,
  description,
  modelPlaceholder = "[AR Model Placeholder]",
}: Props) {
  return (
    <div className="glass-deep p-6 md:p-7 rounded-[20px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-cinzel text-[12px] tracking-[0.18em] text-[var(--gold)] uppercase mb-1">
            {description || "Augmented Reality"}
          </p>
          <h3 className="font-cormorant text-2xl text-[var(--brown)]">
            {title}
          </h3>
        </div>
        <span className="text-2xl" aria-hidden>
          📦
        </span>
      </div>
      <div
        className="relative h-[320px] rounded-3xl overflow-hidden flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,232,220,0.6), rgba(232,221,208,0.8))",
          border: "1px solid rgba(184,150,62,0.3)",
          boxShadow: "inset 0 8px 24px rgba(61,43,31,0.18)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,244,220,0.5),transparent_70%)]" />
        <div className="relative flex flex-col items-center gap-3">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl"
            style={{
              background: "linear-gradient(135deg, var(--gold-light), var(--gold))",
              border: "1px solid var(--gold)",
              boxShadow:
                "0 8px 24px rgba(184,150,62,0.35), inset 0 1px 0 rgba(255,255,255,0.5)",
            }}
          >
            🧊
          </div>
          <p className="font-cinzel text-[11px] tracking-[0.2em] uppercase text-[var(--brown-mid)]">
            {modelPlaceholder}
          </p>
        </div>
        <span
          className="absolute top-3 left-3 font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)] px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,248,235,0.7)",
            border: "1px solid rgba(184,150,62,0.3)",
          }}
        >
          WebXR ready · placeholder
        </span>
        <span
          className="absolute bottom-3 right-3 font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)] px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,248,235,0.7)",
            border: "1px solid rgba(184,150,62,0.3)",
          }}
        >
          [Story File AR Content Placeholder]
        </span>
      </div>
    </div>
  );
}
