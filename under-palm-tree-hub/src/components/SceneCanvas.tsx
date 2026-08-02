import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';

interface SceneCanvasProps {
  children: ReactNode;
  camera?: { position?: [number, number, number]; fov?: number };
  fog?: { color: string; near: number; far: number };
  className?: string;
  style?: React.CSSProperties;
}

function PalmLoader() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-foam">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full border-4 border-turquoise/30 border-t-turquoise animate-spin" />
        <p className="font-display font-bold text-door">Growing palm trees…</p>
      </div>
    </div>
  );
}

/** Shared R3F canvas: golden-hour lights, soft shadows, palette fog. */
export default function SceneCanvas({
  children,
  camera,
  fog = { color: '#BDEFF2', near: 25, far: 60 },
  className,
  style,
}: SceneCanvasProps) {
  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', height: '100%', ...style }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: camera?.position ?? [14, 9, 14], fov: camera?.fov ?? 45 }}
        gl={{ antialias: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <fog attach="fog" args={[fog.color, fog.near, fog.far]} />
        <ambientLight intensity={0.45} />
        <hemisphereLight args={['#BDEFF2', '#7CB98A', 0.65]} />
        {/* golden-hour key light */}
        <directionalLight
          position={[10, 14, 6]}
          intensity={1.25}
          color="#FFE3B3"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
          shadow-bias={-0.0004}
          shadow-normalBias={0.02}
        />
        {/* cool turquoise rim light from behind for soft edge separation */}
        <directionalLight position={[-12, 8, -10]} intensity={0.5} color="#7DF9E8" />
        {/* warm mango fill from the front-left to soften shadows */}
        <directionalLight position={[-8, 5, 12]} intensity={0.35} color="#FFD9A0" />
        {/* subtle top bounce for rounded, Pixar-like volume */}
        <pointLight position={[0, 12, 0]} intensity={0.4} color="#FFF4DC" distance={40} decay={2} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
      <Suspense fallback={<PalmLoader />}>{null}</Suspense>
    </div>
  );
}
