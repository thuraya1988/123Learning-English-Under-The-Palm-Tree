"use client";
import { ARCubeIcon } from "./Icons";

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
    <div className="glass p-5 md:p-7">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display gold-text text-xl tracking-wide">
            {title}
          </h3>
          {description && (
            <p className="text-cocoa/70 text-xs tracking-[0.2em] uppercase">
              {description}
            </p>
          )}
        </div>
        <span className="icon-btn" aria-hidden>
          <ARCubeIcon />
        </span>
      </div>
      <div className="relative h-[320px] rounded-3xl overflow-hidden glass-inset flex items-center justify-center">
        {/* Real swap target:
            <model-viewer
              src="/models/palm-tree.glb"
              ios-src="/models/palm-tree.usdz"
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              autoplay
            /> */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,244,220,0.5),transparent_70%)]" />
        <div className="relative flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-3xl bevel border border-[rgba(138,101,41,0.55)] bg-gradient-to-br from-[#f5dfa3] to-[#8a6529] flex items-center justify-center">
            <ARCubeIcon className="w-10 h-10 text-cocoa" />
          </div>
          <p className="font-display text-cocoa/80 tracking-[0.2em] uppercase text-[0.7rem]">
            {modelPlaceholder}
          </p>
        </div>
        <span className="absolute top-3 left-3 text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/70 glass px-3 py-1 rounded-full">
          WebXR ready · placeholder
        </span>
        <span className="absolute bottom-3 right-3 text-[0.65rem] tracking-[0.22em] uppercase text-cocoa/70 glass px-3 py-1 rounded-full">
          [Story File AR Content Placeholder]
        </span>
      </div>
    </div>
  );
}
