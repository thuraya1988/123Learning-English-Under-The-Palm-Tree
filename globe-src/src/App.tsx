import { useState, useCallback } from 'react';
import Globe from '@/components/globe/Globe';
import TopBar from '@/components/TopBar';
import CountryPanel from '@/components/CountryPanel';
import ContinueLearningModal from '@/components/ContinueLearningModal';
import Tooltip from '@/components/Tooltip';
import EmptyState from '@/components/EmptyState';
import { getCountryById } from '@/data/countries';
import type { Country } from '@/types';
import gsap from 'gsap';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['all']));
  const [showEmptyState, setShowEmptyState] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [continueLearningOpen, setContinueLearningOpen] = useState(false);
  const [completedLessonTitle, setCompletedLessonTitle] = useState<string>('');

  const handleCountryHover = useCallback((countryId: string | null) => {
    setHoveredCountryId(countryId);
  }, []);

  const handleCountryClick = useCallback((countryId: string) => {
    const country = getCountryById(countryId);
    if (!country) return;

    setShowEmptyState(false);
    setHoveredCountryId(null);

    // Fly camera to country via the globe component
    // The globe will handle camera animation through its internal methods
    // We trigger this via a window event that GlobeScene listens for
    window.dispatchEvent(new CustomEvent('flyToCountry', {
      detail: { lat: country.lat, lon: country.lon }
    }));

    // Open panel after camera animation
    gsap.delayedCall(0.8, () => {
      setSelectedCountry(country);
      setIsPanelOpen(true);
    });
  }, []);

  const handleClosePanel = useCallback(() => {
    setIsPanelOpen(false);
    setSelectedCountry(null);
    window.dispatchEvent(new CustomEvent('resetCamera'));
  }, []);

  const handleCountrySelect = useCallback((countryId: string) => {
    handleCountryClick(countryId);
  }, [handleCountryClick]);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleContinueLearning = useCallback((lessonTitle: string) => {
    setCompletedLessonTitle(lessonTitle);
    setContinueLearningOpen(true);
  }, []);

  // Track mouse for tooltip positioning
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltipPos({ x: e.clientX, y: e.clientY });
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(155, 77, 94, 0.12) 0%, rgba(107, 45, 62, 0.06) 40%, transparent 70%), #0D0A0F',
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center" style={{ background: '#0D0A0F' }}>
          <div className="relative w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)]/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--accent)] animate-spin" />
          </div>
          <p className="font-display text-lg text-[var(--accent)]">Loading Globe...</p>
          <p className="font-body text-sm text-[var(--text-tertiary)] mt-2">
            Preparing your educational journey
          </p>
        </div>
      )}

      {/* Three.js Globe */}
      <Globe
        onCountryHover={handleCountryHover}
        onCountryClick={handleCountryClick}
        onLoadComplete={handleLoadComplete}
        searchQuery={searchQuery}
        activeFilters={activeFilters}
      />

      {/* Top Bar */}
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        onCountrySelect={handleCountrySelect}
      />

      {/* Country Detail Panel */}
      <CountryPanel
        country={selectedCountry}
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
        onContinueLearning={handleContinueLearning}
      />

      {/* Continue Learning Modal */}
      <ContinueLearningModal
        isOpen={continueLearningOpen}
        onClose={() => setContinueLearningOpen(false)}
        lessonTitle={completedLessonTitle}
      />

      {/* Hover Tooltip */}
      <Tooltip
        countryId={hoveredCountryId}
        x={tooltipPos.x}
        y={tooltipPos.y}
      />

      {/* Empty State */}
      <EmptyState visible={showEmptyState && isLoaded} />

      {/* Background click to close panel */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 z-[35]"
          onClick={handleClosePanel}
        />
      )}

      {/* Bottom Warning Label */}
      <div className="fixed bottom-4 right-4 z-50">
        <div
          className="px-4 py-2 rounded-xl"
          style={{
            background: 'rgba(155, 77, 94, 0.15)',
            border: '1px solid rgba(155, 77, 94, 0.25)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span className="font-mono text-[11px] font-medium text-[#9B4D5E] tracking-wider uppercase">
            warning
          </span>
        </div>
      </div>
    </div>
  );
}
