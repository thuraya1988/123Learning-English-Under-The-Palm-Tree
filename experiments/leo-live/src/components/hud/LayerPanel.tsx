import { UI_GROUPS } from '@/lib/satellites'

interface LayerPanelProps {
  counts: number[]
  visible: boolean[]
  onToggle: (index: number) => void
}

export default function LayerPanel({ counts, visible, onToggle }: LayerPanelProps) {
  return (
    <div className="pointer-events-auto w-[248px] rounded-xl border border-white/10 bg-[#0a0e14]/70 px-4 py-3.5 backdrop-blur-xl max-md:w-full">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
        Layers
      </div>
      <div className="space-y-0.5">
        {UI_GROUPS.map((g, i) => (
          <button
            key={g.key}
            onClick={() => onToggle(i)}
            className={`flex min-h-[32px] w-full items-center gap-2.5 rounded-md px-2 py-1 text-left transition-opacity hover:bg-white/[0.05] ${
              visible[i] ? '' : 'opacity-35'
            }`}
          >
            <span
              className="h-[7px] w-[7px] shrink-0 rounded-full"
              style={{ background: g.color, boxShadow: `0 0 5px ${g.color}66` }}
            />
            <span className="flex-1 truncate text-xs text-slate-300">{g.label}</span>
            <span className="font-mono text-[11px] tabular-nums text-slate-500">
              {(counts[i] ?? 0).toLocaleString()}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
