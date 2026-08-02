import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';

const FalajGame = lazy(() => import('@/pages/FalajGame'));
const SouqGame = lazy(() => import('@/pages/SouqGame'));
const DhowGame = lazy(() => import('@/pages/DhowGame'));
const BahlaGame = lazy(() => import('@/pages/BahlaGame'));
const CaveGame = lazy(() => import('@/pages/CaveGame'));
const KhareefGame = lazy(() => import('@/pages/KhareefGame'));
const OasisExplorer = lazy(() => import('@/pages/OasisExplorer'));
const MapExplorer = lazy(() => import('@/pages/MapExplorer'));
const Progress = lazy(() => import('@/pages/Progress'));
const About = lazy(() => import('@/pages/About'));
const QarwashiyaGame = lazy(() => import('@/pages/QarwashiyaGame'));
const CyberCityScene = lazy(() => import('@/pages/CyberCityScene'));
const TenGamesGallery = lazy(() => import('@/pages/TenGamesGallery'));
const Arcade = lazy(() => import('@/pages/Arcade'));
const SuperKhanjar = lazy(() => import('@/pages/SuperKhanjar'));
const OmanMap = lazy(() => import('@/pages/OmanMap'));
const VrVillage = lazy(() => import('@/pages/VrVillage'));
const ArCharacters = lazy(() => import('@/pages/ArCharacters'));

function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
      <img src="/logo-hub.png" alt="Under the Palm Tree" className="w-20 h-20 animate-bounce" />
      <p className="font-display text-ink/70">Loading adventure…</p>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game/falaj" element={<FalajGame />} />
          <Route path="game/souq" element={<SouqGame />} />
          <Route path="game/dhow" element={<DhowGame />} />
          <Route path="game/bahla" element={<BahlaGame />} />
          <Route path="game/cave" element={<CaveGame />} />
          <Route path="game/khareef" element={<KhareefGame />} />
          <Route path="progress" element={<Progress />} />
          <Route path="about" element={<About />} />
          {/* Arcade Wing */}
          <Route path="arcade" element={<Arcade />} />
          <Route path="game/super-khanjar" element={<SuperKhanjar />} />
          <Route path="game/qarwashiya" element={<QarwashiyaGame />} />
          <Route path="scene/cyber-city" element={<CyberCityScene />} />
          <Route path="explore/oasis-3d" element={<OasisExplorer />} />
          <Route path="explore/oasis" element={<OasisExplorer />} />
          <Route path="explore/map-3d" element={<MapExplorer />} />
          <Route path="explore/map" element={<MapExplorer />} />
          <Route path="explore/oman-map" element={<OmanMap />} />
          <Route path="vr" element={<VrVillage />} />
          <Route path="ar" element={<ArCharacters />} />
        </Route>
        <Route path="gallery/ten-games" element={<TenGamesGallery />} />
        <Route path="tengames" element={<TenGamesGallery />} />
      </Routes>
    </Suspense>
  );
}
