import { Globe } from 'lucide-react';

interface EmptyStateProps {
  visible: boolean;
}

export default function EmptyState({ visible }: EmptyStateProps) {
  if (!visible) return null;

  return (
    <div
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      style={{ animation: 'fadeInUp 0.6s ease-out' }}
    >
      <div className="flex flex-col items-center gap-3">
        <Globe className="w-6 h-6 text-[var(--text-tertiary)] opacity-50" />
        <p className="font-body text-base text-[var(--text-tertiary)] opacity-70">
          Spin the globe — follow the story from London to Samail 🌴
        </p>
        <div
          className="text-[var(--text-tertiary)] opacity-40"
          style={{ animation: 'handSwipe 2s ease-in-out infinite' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 11l5-5 5 5M7 17l5-5 5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
