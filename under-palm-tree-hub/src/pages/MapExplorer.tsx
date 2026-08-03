import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as maplibregl from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// ─── Free tile sources (runtime internet required) ───
const DEM_TILES = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';

type StyleName = 'satellite' | 'terrain' | 'dark';

const STYLES: Record<StyleName, StyleSpecification> = {
  satellite: {
    version: 8,
    sources: {
      sat: {
        type: 'raster',
        tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
        tileSize: 256,
        attribution: 'Esri',
      },
      terrain: { type: 'raster-dem', tiles: [DEM_TILES], tileSize: 256, encoding: 'terrarium', maxzoom: 15 },
    },
    layers: [
      { id: 'sat', type: 'raster', source: 'sat', paint: { 'raster-contrast': 0.05, 'raster-brightness-max': 0.85 } },
    ],
  },
  terrain: {
    version: 8,
    sources: {
      osm: { type: 'raster', tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'], tileSize: 256, attribution: '© OSM' },
      terrain: { type: 'raster-dem', tiles: [DEM_TILES], tileSize: 256, encoding: 'terrarium', maxzoom: 15 },
    },
    layers: [
      { id: 'osm', type: 'raster', source: 'osm', paint: { 'raster-saturation': -0.2, 'raster-brightness-max': 0.75 } },
      { id: 'hillshade', type: 'hillshade', source: 'terrain', paint: { 'hillshade-shadow-color': 'rgba(0,0,0,0.35)', 'hillshade-highlight-color': 'rgba(255,255,240,0.12)' } },
    ],
  },
  dark: {
    version: 8,
    sources: {
      dark: { type: 'raster', tiles: ['https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'], tileSize: 256, attribution: 'CartoDB' },
      terrain: { type: 'raster-dem', tiles: [DEM_TILES], tileSize: 256, encoding: 'terrarium', maxzoom: 15 },
    },
    layers: [
      { id: 'dark', type: 'raster', source: 'dark' },
      { id: 'hillshade', type: 'hillshade', source: 'terrain', paint: { 'hillshade-shadow-color': 'rgba(0,0,0,0.5)', 'hillshade-highlight-color': 'rgba(200,200,255,0.08)' } },
    ],
  },
};

interface SearchResult {
  lat: string | number;
  lon: string | number;
  display_name?: string;
}

interface InfoState {
  lat: string;
  lng: string;
  zoom: string;
  pitch: string;
  bearing: string;
  elev: string;
}

const QUICK_PLACES: [string, number, number, number, number][] = [
  ['Samail', 23.308, 57.932, 14, 50],
  ['Muscat', 23.588, 58.382, 14, 45],
  ['Muttrah', 23.585, 58.405, 16, 60],
  ['Nizwa', 22.943, 57.534, 13, 55],
  ['Sohar', 23.6, 57.5, 12, 50],
  ['Dubai', 25.285, 55.27, 13, 50],
  ['Abu Dhabi', 24.467, 54.367, 12, 40],
  ['Makkah', 21.389, 39.826, 14, 50],
  ['Paris', 48.858, 2.347, 14, 55],
  ['Tokyo', 35.689, 139.692, 13, 50],
  ['New York', 40.748, -73.986, 14, 45],
  ['Taj Mahal', 27.175, 78.042, 16, 60],
];

export default function MapExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [styleName, setStyleName] = useState<StyleName>('satellite');
  const [exaggeration, setExaggeration] = useState(1.5);
  const [pitch, setPitchVal] = useState(45);
  const [bearing, setBearingVal] = useState(0);
  const [speed, setSpeed] = useState(3);
  const [buildingsOn, setBuildingsOn] = useState(false);
  const [bordersOn, setBordersOn] = useState(false);
  const [labelsOn, setLabelsOn] = useState(true);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[] | null>(null);
  const [searchMsg, setSearchMsg] = useState<string | null>(null);
  const [info, setInfo] = useState<InfoState>({
    lat: '—', lng: '—', zoom: '—', pitch: '—', bearing: '—', elev: '—',
  });
  const [mapError, setMapError] = useState(false);

  // Keep mutable refs for values used inside map callbacks
  const exaggerationRef = useRef(exaggeration);
  exaggerationRef.current = exaggeration;
  const buildingsRef = useRef(buildingsOn);
  buildingsRef.current = buildingsOn;
  const labelsRef = useRef(labelsOn);
  labelsRef.current = labelsOn;
  const bearingRef = useRef(bearing);
  bearingRef.current = bearing;
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const addBuildings = useCallback(() => {
    const map = mapRef.current;
    if (!map || map.getLayer('buildings')) return;
    try {
      if (!map.getSource('osm-buildings')) {
        map.addSource('osm-buildings', {
          type: 'vector',
          tiles: ['https://tiles.osmbuildings.org/{z}/{x}/{y}.pbf'],
          maxzoom: 16,
        });
      }
      map.addLayer({
        id: 'buildings',
        type: 'fill-extrusion',
        source: 'osm-buildings',
        'source-layer': 'building',
        minzoom: 14,
        paint: {
          'fill-extrusion-color': [
            'interpolate', ['linear'], ['get', 'height'],
            0, '#c8a87c',
            30, '#b8956a',
            80, '#a07850',
            150, '#8a6540',
          ],
          'fill-extrusion-height': ['coalesce', ['get', 'height'], 10],
          'fill-extrusion-base': ['coalesce', ['get', 'min_height'], 0],
          'fill-extrusion-opacity': 0.8,
        },
      });
    } catch {
      console.log('Buildings source not available for this area');
    }
  }, []);

  const setLabelsVisibility = useCallback((visible: boolean) => {
    const map = mapRef.current;
    if (!map) return;
    map.getStyle().layers?.forEach((layer: maplibregl.LayerSpecification) => {
      if (layer.type === 'symbol') {
        map.setLayoutProperty(layer.id, 'visibility', visible ? 'visible' : 'none');
      }
    });
  }, []);

  const flyToLocation = useCallback((lat: number, lng: number, zoom?: number, p?: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: [lng, lat],
      zoom: zoom || 14,
      pitch: p ?? 50,
      bearing: bearingRef.current,
      duration: speedRef.current * 1000,
      essential: true,
      curve: 1.5,
    });
  }, []);

  // ─── Map init (once) ───
  useEffect(() => {
    if (!containerRef.current) return;

    let errorCount = 0;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLES.satellite,
      center: [57.932, 23.308],
      zoom: 12,
      pitch: 45,
      bearing: -10,
      canvasContextAttributes: { antialias: true },
      maxPitch: 85,
    });
    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    const updateInfo = () => {
      const c = map.getCenter();
      const b = ((map.getBearing() % 360) + 360) % 360;
      const zoom = map.getZoom();
      const elevApprox = Math.round(Math.pow(2, 15 - zoom) * 10);
      setInfo({
        lat: c.lat.toFixed(4) + '°',
        lng: c.lng.toFixed(4) + '°',
        zoom: zoom.toFixed(1),
        pitch: Math.round(map.getPitch()) + '°',
        bearing: Math.round(b) + '°',
        elev: elevApprox > 0 ? '~' + elevApprox + ' m' : '—',
      });
      setPitchVal(map.getPitch());
    };

    map.on('load', () => {
      map.setTerrain({ source: 'terrain', exaggeration: exaggerationRef.current });
      map.on('move', updateInfo);
      map.on('pitch', updateInfo);
      map.on('rotate', updateInfo);
      map.on('zoom', updateInfo);
      updateInfo();
      map.on('click', (e: maplibregl.MapMouseEvent) => {
        const { lat, lng } = e.lngLat;
        flyToLocation(lat, lng, map.getZoom(), map.getPitch());
      });
    });

    map.on('error', () => {
      errorCount += 1;
      // Only surface the friendly overlay if tile loading keeps failing (offline)
      if (errorCount >= 3) setMapError(true);
    });
    map.on('data', (e: maplibregl.MapSourceDataEvent) => {
      if (e.dataType === 'source') setMapError(false);
    });

    return () => {
      mapRef.current = null;
      map.remove();
    };
  }, [flyToLocation]);

  // ─── Style switching ───
  const applyStyle = useCallback(
    (name: StyleName) => {
      const map = mapRef.current;
      if (!map) return;
      setStyleName(name);
      const center = map.getCenter();
      const zoom = map.getZoom();
      const p = map.getPitch();
      const b = map.getBearing();

      map.setStyle(STYLES[name], { diff: false });
      map.once('style.load', () => {
        map.jumpTo({ center, zoom, pitch: p, bearing: b });
        map.setTerrain({ source: 'terrain', exaggeration: exaggerationRef.current });
        if (buildingsRef.current) addBuildings();
        if (!labelsRef.current) setLabelsVisibility(false);
      });
    },
    [addBuildings, setLabelsVisibility],
  );

  // ─── Toggles ───
  const toggleBuildings = () => {
    const map = mapRef.current;
    const next = !buildingsOn;
    setBuildingsOn(next);
    if (!map) return;
    if (next) addBuildings();
    else if (map.getLayer('buildings')) map.removeLayer('buildings');
  };

  const toggleBorders = () => setBordersOn((v) => !v);

  const toggleLabels = () => {
    const next = !labelsOn;
    setLabelsOn(next);
    setLabelsVisibility(next);
  };

  // ─── Sliders ───
  const onExaggeration = (v: number) => {
    setExaggeration(v);
    mapRef.current?.setTerrain({ source: 'terrain', exaggeration: v });
  };
  const onPitch = (v: number) => {
    setPitchVal(v);
    mapRef.current?.easeTo({ pitch: v, duration: 500 });
  };
  const onBearing = (v: number) => {
    setBearingVal(v);
    mapRef.current?.easeTo({ bearing: v, duration: 500 });
  };

  // ─── Geocoding search (Nominatim → Photon fallback) ───
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string) => {
    const query = q.trim();
    if (!query || query.length < 2) {
      setResults(null);
      setSearchMsg(null);
      return;
    }
    setSearchMsg('⏳ Searching...');
    setResults(null);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=6&accept-language=ar,en&addressdetails=1`,
        { headers: { Accept: 'application/json' } },
      );
      if (!res.ok) throw new Error('Nominatim failed: ' + res.status);
      let data = (await res.json()) as SearchResult[];
      if (data.length === 0) {
        const res2 = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=6&accept-language=en&addressdetails=1`,
        );
        data = (await res2.json()) as SearchResult[];
      }
      if (data.length === 0) {
        setSearchMsg('❌ No results — try English or the nearest city name');
        return;
      }
      setSearchMsg(null);
      setResults(data);
    } catch (e) {
      console.error('Search error:', e);
      try {
        const res3 = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lang=en`);
        const data3 = (await res3.json()) as {
          features?: { geometry: { coordinates: number[] }; properties: { name?: string; city?: string; country?: string } }[];
        };
        if (data3.features && data3.features.length > 0) {
          setSearchMsg(null);
          setResults(
            data3.features.map((f) => ({
              lat: f.geometry.coordinates[1],
              lon: f.geometry.coordinates[0],
              display_name:
                (f.properties.name ?? '') +
                (f.properties.city ? ', ' + f.properties.city : '') +
                (f.properties.country ? ', ' + f.properties.country : ''),
            })),
          );
        } else {
          setSearchMsg('❌ No results — try English');
        }
      } catch {
        setSearchMsg('⚠️ Connection error — check your internet');
      }
    }
  }, []);

  const debounceSearch = (value: string) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => void doSearch(value), 600);
  };

  const selectResult = (r: SearchResult) => {
    setResults(null);
    setSearchMsg(null);
    setQuery((r.display_name ?? '').split(',')[0]);
    flyToLocation(parseFloat(String(r.lat)), parseFloat(String(r.lon)), 14, 50);
  };

  const styleButtons: [StyleName, string][] = [
    ['satellite', '🛰️ Satellite'],
    ['terrain', '🗺️ Terrain'],
    ['dark', '🌙 Dark'],
  ];

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-black font-sans" dir="ltr">
      {/* Map container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Top bar */}
      <header className="absolute top-0 left-0 right-0 z-30 flex h-[52px] items-center justify-between border-b border-[#d4a853]/15 bg-[#0a0c14]/95 px-5 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🌍</span>
          <h1 className="text-base font-semibold text-[#d4a853]">3D Explorer — anywhere in the world</h1>
        </div>
        <div className="flex items-center gap-1.5">
          {styleButtons.map(([name, label]) => (
            <button
              key={name}
              onClick={() => applyStyle(name)}
              className={`rounded-lg border px-3 py-1.5 text-[11px] transition ${
                styleName === name
                  ? 'border-[#d4a853]/25 bg-[#d4a853]/12 text-[#d4a853]'
                  : 'border-white/10 bg-white/5 text-[#c8d0e0] hover:border-[#d4a853]/25 hover:bg-[#d4a853]/12 hover:text-[#d4a853]'
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => flyToLocation(23.308, 57.932, 13, 45)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-[#c8d0e0] transition hover:border-[#d4a853]/25 hover:bg-[#d4a853]/12 hover:text-[#d4a853]"
          >
            🏔️ Samail
          </button>
          <Link
            to="/arcade"
            className="ml-2 rounded-lg border border-[#d4a853]/30 bg-[#d4a853]/10 px-3 py-1.5 text-[11px] text-[#d4a853] transition hover:bg-[#d4a853]/25"
          >
            ← Back to Arcade
          </Link>
        </div>
      </header>

      {/* Search box */}
      <div className="absolute top-16 left-1/2 z-30 flex w-[420px] max-w-[90vw] -translate-x-1/2 gap-1.5">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            debounceSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') void doSearch(query);
          }}
          placeholder="Search anywhere in the world... (e.g. Dubai, Paris, Tokyo)"
          className="flex-1 rounded-[10px] border border-white/10 bg-[#0a0c14]/95 px-4 py-3 text-[13px] text-[#c8d0e0] outline-none backdrop-blur-xl placeholder:text-[#6a7590] focus:border-[#d4a853]/30"
        />
        <button
          onClick={() => void doSearch(query)}
          className="rounded-[10px] border border-[#d4a853]/30 bg-[#d4a853]/15 px-4 py-3 text-[13px] text-[#d4a853] transition hover:bg-[#d4a853]/25"
        >
          🔍 Search
        </button>
      </div>

      {/* Search results */}
      {(results || searchMsg) && (
        <div className="absolute top-[112px] left-1/2 z-30 max-h-[250px] w-[420px] max-w-[90vw] -translate-x-1/2 overflow-y-auto rounded-[10px] border border-white/5 bg-[#0a0c14]/95 backdrop-blur-xl">
          {searchMsg && (
            <div className="border-b border-white/5 px-4 py-3">
              <div className="text-[13px] font-semibold text-[#e0d8c8]">{searchMsg}</div>
            </div>
          )}
          {results?.map((r, i) => {
            const name = r.display_name || 'Unknown';
            return (
              <button
                key={i}
                onClick={() => selectResult(r)}
                className="block w-full border-b border-white/5 px-4 py-3 text-left transition hover:bg-[#d4a853]/10"
              >
                <div className="mb-0.5 text-[13px] font-semibold text-[#e0d8c8]">
                  📍 {name.split(',')[0]}
                </div>
                <div className="text-[11px] text-[#6a7590]">{name}</div>
              </button>
            );
          })}
        </div>
      )}

      {/* Control panel */}
      <div className="absolute top-16 right-4 z-30 w-[260px] rounded-[14px] border border-white/5 bg-[#0a0c14]/95 p-[18px] backdrop-blur-xl">
        <h3 className="mb-3.5 text-[13px] text-[#d4a853]">⚙️ View settings</h3>

        {(
          [
            ['Terrain', exaggeration, 0, 5, 0.1, (v: number) => onExaggeration(v), exaggeration.toFixed(1) + 'x'],
            ['Pitch', pitch, 0, 85, 1, (v: number) => onPitch(v), Math.round(pitch) + '°'],
            ['Bearing', bearing, 0, 360, 1, (v: number) => onBearing(v), Math.round(bearing) + '°'],
            ['Flight speed', speed, 1, 10, 0.5, (v: number) => setSpeed(v), speed + 's'],
          ] as [string, number, number, number, number, (v: number) => void, string][]
        ).map(([label, value, min, max, step, onChange, display]) => (
          <div key={label} className="mb-3.5">
            <label className="mb-1.5 flex justify-between text-[11px] text-[#6a7590]">
              {label}
              <span className="font-semibold text-[#d4a853]">{display}</span>
            </label>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={value}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="h-1 w-full cursor-pointer appearance-none rounded-sm bg-white/10 accent-[#d4a853]"
            />
          </div>
        ))}

        {(
          [
            ['3D buildings', buildingsOn, toggleBuildings],
            ['Borders', bordersOn, toggleBorders],
            ['Labels', labelsOn, toggleLabels],
          ] as [string, boolean, () => void][]
        ).map(([label, active, onToggle]) => (
          <div key={label} className="mb-2.5 flex items-center justify-between text-xs text-[#6a7590]">
            <span>{label}</span>
            <button
              onClick={onToggle}
              aria-label={label}
              className={`relative h-[22px] w-10 rounded-[11px] transition ${active ? 'bg-[#d4a853]/40' : 'bg-white/10'}`}
            >
              <span
                className="absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white transition-transform"
                style={{ transform: active ? 'translateX(18px)' : 'translateX(0)' }}
              />
            </button>
          </div>
        ))}

        <div className="mt-3.5 border-t border-white/5 pt-3.5">
          <h3 className="mb-2.5 text-[13px] text-[#d4a853]">📍 Quick places</h3>
          <div className="flex flex-wrap gap-1">
            {QUICK_PLACES.map(([name, lat, lng, z, p]) => (
              <button
                key={name}
                onClick={() => flyToLocation(lat, lng, z, p)}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[11px] text-[#c8d0e0] transition hover:border-[#d4a853]/25 hover:bg-[#d4a853]/12 hover:text-[#d4a853]"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-6 rounded-xl border border-[#d4a853]/12 bg-[#0a0c14]/95 px-6 py-3 backdrop-blur-xl">
        {(
          [
            ['LAT', info.lat],
            ['LNG', info.lng],
            ['ZOOM', info.zoom],
            ['PITCH', info.pitch],
            ['BEARING', info.bearing],
            ['ELEVATION', info.elev],
          ] as [string, string][]
        ).map(([label, value]) => (
          <div key={label} className="text-center">
            <div className="mb-0.5 text-[9px] uppercase tracking-wider text-[#6a7590]">{label}</div>
            <div className="font-mono text-[13px] font-semibold text-[#d4a853]">{value}</div>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="absolute bottom-[70px] left-5 z-30 rounded-[10px] bg-[#0a0c14]/80 px-3.5 py-2.5 text-[10px] leading-5 text-[#6a7590]">
        🖱️ Drag = rotate &nbsp;|&nbsp; Wheel = zoom &nbsp;|&nbsp; <kbd className="rounded border border-white/10 bg-white/5 px-1 text-[9px] text-[#8a95ad]">Shift</kbd>+drag = tilt
        <br />
        Click map = pick location &nbsp;|&nbsp; Search any place by name
      </div>

      {/* Offline / tile failure overlay */}
      {mapError && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="max-w-sm rounded-2xl border border-[#d4a853]/25 bg-[#0a0c14]/95 p-8 text-center">
            <div className="mb-3 text-4xl">📡</div>
            <h2 className="mb-2 text-lg font-semibold text-[#d4a853]">Map tiles unavailable</h2>
            <p className="text-[13px] leading-6 text-[#8a95ad]">
              This explorer needs an internet connection to load map tiles and terrain data.
              Please check your connection — the map will resume automatically once reachable.
            </p>
            <button
              onClick={() => setMapError(false)}
              className="mt-5 rounded-lg border border-[#d4a853]/30 bg-[#d4a853]/15 px-5 py-2 text-[13px] text-[#d4a853] transition hover:bg-[#d4a853]/25"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
