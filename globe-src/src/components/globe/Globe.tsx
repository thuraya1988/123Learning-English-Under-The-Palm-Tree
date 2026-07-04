import { useEffect, useRef } from 'react';
import { GlobeScene } from './GlobeScene';

interface GlobeProps {
  onCountryHover: (countryId: string | null) => void;
  onCountryClick: (countryId: string) => void;
  onLoadComplete: () => void;
  searchQuery: string;
  activeFilters: Set<string>;
}

export default function Globe({
  onCountryHover,
  onCountryClick,
  onLoadComplete,
  searchQuery,
  activeFilters,
}: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<GlobeScene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new GlobeScene(containerRef.current, {
      onCountryHover,
      onCountryClick,
      onLoadComplete,
    });
    sceneRef.current = scene;

    return () => {
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.updateMarkers(searchQuery, activeFilters);
    }
  }, [searchQuery, activeFilters]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10,
        cursor: 'grab',
      }}
    />
  );
}
