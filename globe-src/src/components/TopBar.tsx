import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { countries, filterContentTypes, getLiveContentCount, getTotalViewerCount } from '@/data/countries';
import type { Country } from '@/types';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilters: Set<string>;
  onFilterChange: (filters: Set<string>) => void;
  onCountrySelect: (countryId: string) => void;
}

export default function TopBar({
  searchQuery,
  onSearchChange,
  activeFilters,
  onFilterChange,
  onCountrySelect,
}: TopBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const liveCount = getLiveContentCount();
  const totalViewers = getTotalViewerCount();

  const filteredCountries = searchQuery.trim()
    ? countries.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchChange = useCallback(
    (value: string) => {
      onSearchChange(value);
      setShowDropdown(value.trim().length > 0);
      setHighlightedIndex(-1);
    },
    [onSearchChange]
  );

  const handleSelectCountry = useCallback(
    (countryId: string) => {
      onCountrySelect(countryId);
      setShowDropdown(false);
      onSearchChange('');
      inputRef.current?.blur();
    },
    [onCountrySelect, onSearchChange]
  );

  const toggleFilter = useCallback(
    (filterId: string) => {
      const newFilters = new Set(activeFilters);
      if (filterId === 'all') {
        onFilterChange(new Set(['all']));
      } else {
        newFilters.delete('all');
        if (newFilters.has(filterId)) {
          newFilters.delete(filterId);
          if (newFilters.size === 0) newFilters.add('all');
        } else {
          newFilters.add(filterId);
        }
        onFilterChange(newFilters);
      }
    },
    [activeFilters, onFilterChange]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showDropdown) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredCountries.length - 1)
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, -1));
      } else if (e.key === 'Enter' && highlightedIndex >= 0) {
        e.preventDefault();
        handleSelectCountry(filteredCountries[highlightedIndex].id);
      } else if (e.key === 'Escape') {
        setShowDropdown(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showDropdown, filteredCountries, highlightedIndex, handleSelectCountry]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-32px)] max-w-[720px]">
      <div className="glass-panel px-4 py-3 flex items-center gap-3">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-display font-semibold text-sm text-[var(--accent)] whitespace-nowrap">
            Under the Palm Tree
          </span>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 shrink-0" />

        {/* Search */}
        <div className="flex-1 relative min-w-0">
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
            <Search className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowDropdown(true)}
              className="bg-transparent outline-none text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] w-full font-body"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="shrink-0"
              >
                <X className="w-3.5 h-3.5 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]" />
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          {showDropdown && filteredCountries.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-xl overflow-hidden max-h-[320px] overflow-y-auto"
            >
              {filteredCountries.map((country: Country, index: number) => (
                <button
                  key={country.id}
                  onClick={() => handleSelectCountry(country.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    index === highlightedIndex
                      ? 'bg-[var(--accent)]/10'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="font-body text-sm text-[var(--text-primary)] flex-1">
                    {country.name}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-tertiary)]">
                    {country.content.length} items
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Filter Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`shrink-0 p-2 rounded-xl transition-colors ${
            showFilters ? 'bg-[var(--accent)]/20' : 'hover:bg-white/5'
          }`}
        >
          <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>

        {/* Live Indicator */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <span className="live-dot" />
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[var(--accent-secondary)] leading-tight">
              {liveCount} LIVE
            </span>
            <span className="font-mono text-[9px] text-[var(--text-tertiary)] leading-tight">
              {totalViewers.toLocaleString()} viewers
            </span>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      {showFilters && (
        <div
          className="mt-2 glass-panel px-4 py-3 flex flex-wrap gap-2"
          style={{ animation: 'fadeInUp 0.2s ease-out' }}
        >
          {filterContentTypes.map((filter) => {
            const isActive =
              filter.id === 'all'
                ? activeFilters.has('all')
                : activeFilters.has(filter.id);
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--bg-primary)]'
                    : 'bg-[var(--accent-secondary)]/15 text-[var(--accent-secondary)] hover:bg-[var(--accent-secondary)]/25'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
