interface IdentityBlockProps {
  total: number
}

export default function IdentityBlock({ total }: IdentityBlockProps) {
  return (
    <div className="pointer-events-none select-none">
      <h1 className="font-mono text-sm font-semibold tracking-[0.3em] text-slate-100 md:text-xl md:tracking-[0.34em]">
        <span className="logo-o">O</span>RBIT VEIL
      </h1>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-slate-400 md:text-[11px] md:tracking-[0.18em]">
        <span className="md:hidden">{total.toLocaleString()} objects tracked</span>
        <span className="max-md:hidden">
          {total.toLocaleString()} objects tracked · TLE @ CelesTrak
        </span>
      </p>
    </div>
  )
}
