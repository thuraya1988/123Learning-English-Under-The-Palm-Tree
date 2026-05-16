"use client";

/**
 * H5PEmbed
 *
 * Embeds an H5P interactive activity via iframe. Works with:
 *   - H5P packages exported as standalone HTML  (file under /public/h5p/*.html)
 *   - H5P.com / Lumi-hosted activities          (full https:// URL)
 *   - Locally rendered H5P player               (point src at your player URL)
 *
 * Drop your .h5p package's exported HTML in /public/h5p/ and pass the
 * filename (without folder) as `slug`, OR pass a full URL via `src`.
 */
type Props = {
  slug?: string;
  src?: string;
  title?: string;
  height?: number;
};

export default function H5PEmbed({
  slug,
  src,
  title = "Interactive Activity",
  height = 540,
}: Props) {
  const url = src || (slug ? `/h5p/${slug}` : null);

  if (!url) {
    return (
      <div className="glass-deep p-8 rounded-2xl text-center">
        <p className="font-cinzel text-[12px] tracking-[0.2em] uppercase text-[var(--burgundy)] mb-2">
          H5P Activity Slot
        </p>
        <p className="text-[var(--brown-mid)] italic">
          [H5P Activity Placeholder] — drop an exported H5P HTML file in{" "}
          <code className="px-2 py-0.5 rounded bg-[rgba(184,150,62,0.15)]">
            /public/h5p/
          </code>{" "}
          and pass <code>slug=&quot;filename.html&quot;</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-cinzel text-[11px] tracking-[0.2em] uppercase text-[var(--burgundy)]">
          H5P · Interactive
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[var(--burgundy)] hover:underline italic"
        >
          Open fullscreen ↗
        </a>
      </div>
      <iframe
        title={title}
        src={url}
        className="h5p-frame"
        style={{ minHeight: height }}
        allow="autoplay; fullscreen; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-presentation"
      />
    </div>
  );
}
