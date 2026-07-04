import { getCountryById } from '@/data/countries';

interface TooltipProps {
  countryId: string | null;
  x: number;
  y: number;
}

export default function Tooltip({ countryId, x, y }: TooltipProps) {
  if (!countryId) return null;

  const country = getCountryById(countryId);
  if (!country) return null;

  const liveCount = country.content.filter((c) => c.isLive).length;

  return (
    <div
      className="fixed pointer-events-none z-20"
      style={{
        left: x + 16,
        top: y + 16,
        animation: 'fadeInUp 0.15s ease-out',
      }}
    >
      <div className="glass-panel px-4 py-2.5 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-lg">{country.flag}</span>
          <span className="font-body text-sm text-[var(--text-primary)]">
            {country.name}
          </span>
          {liveCount > 0 && (
            <div className="flex items-center gap-1.5 ml-1">
              <span className="live-dot" />
              <span className="font-mono text-[10px] text-[var(--accent-secondary)]">
                {liveCount} LIVE
              </span>
            </div>
          )}
        </div>
        <div className="font-mono text-[11px] text-[var(--text-tertiary)] mt-0.5 ml-7">
          {country.content.length} {country.content.length === 1 ? 'activity' : 'activities'}
        </div>
      </div>
    </div>
  );
}
