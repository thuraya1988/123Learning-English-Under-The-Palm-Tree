import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Sparkles, Text } from '@react-three/drei';
import type { Group } from 'three';
import WordIcon, { iconFor } from '@/components/games/WordIcon';
import type { SfxName } from '@/lib/sfx';

/* ---------- palette ---------- */
const TEAL = '#1E8C82';
const TURQ = '#3ED6C5';
const FUCH = '#E5599C';
const VIOLET = '#8B6FE8';
const LIME = '#B8E34D';
const MANGO = '#FFB54D';
const CORAL = '#FF7A66';
const SUN = '#FFD93D';
const BRASS = '#D9A441';
const PAPER = '#FFF9EE';
const WOOD = '#8A5A33';
const CLAY = '#C97B4A';
const CLAY_D = '#A95F3B';
const INK = '#21323B';

export interface TileState {
  letter: string;
  used: boolean;
}

export interface SouqSceneProps {
  /** target word (drives the goods prop) */
  word: string;
  tiles: TileState[];
  /** increments when the vendor should cheer */
  cheerId: number;
  /** increments on wrong letter (tile shake is DOM-side) */
  onTileClick: (i: number) => void;
  /** clicking the goods item (plays speech) */
  onItemClick: () => void;
  play: (n: SfxName) => void;
}

/* ---------- camera: gentle dolly + pointer parallax ---------- */
function CameraRig() {
  useFrame(({ camera, pointer, clock }) => {
    const t = clock.getElapsedTime();
    const tz = 11 + Math.sin(t * 0.22) * 0.3;
    const tx = pointer.x * 0.9;
    const ty = 5 + pointer.y * 0.5;
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.position.z += (tz - camera.position.z) * 0.05;
    camera.lookAt(0, 1.6, -1.5);
  });
  return null;
}

/* ---------- striped awning ---------- */
function Awning({
  width,
  colors,
  position,
}: {
  width: number;
  colors: [string, string];
  position: [number, number, number];
}) {
  const stripes = 6;
  return (
    <group position={position} rotation={[-0.35, 0, 0]}>
      {Array.from({ length: stripes }).map((_, i) => (
        <mesh
          key={i}
          castShadow
          position={[(-width / 2) + (i + 0.5) * (width / stripes), 0, 0]}
        >
          <boxGeometry args={[width / stripes, 0.06, 1.4]} />
          <meshStandardMaterial
            color={i % 2 ? colors[0] : colors[1]}
            flatShading
          />
        </mesh>
      ))}
      {/* scalloped front edge */}
      {Array.from({ length: stripes }).map((_, i) => (
        <mesh
          key={`s${i}`}
          position={[(-width / 2) + (i + 0.5) * (width / stripes), -0.12, 0.68]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[width / stripes / 2, width / stripes / 2, 0.06, 8, 1, false, 0, Math.PI]} />
          <meshStandardMaterial
            color={i % 2 ? colors[0] : colors[1]}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- a side stall ---------- */
function Stall({
  position,
  rotationY = 0,
  colors,
  goods,
}: {
  position: [number, number, number];
  rotationY?: number;
  colors: [string, string];
  goods: 'pots' | 'baskets' | 'fabric' | 'spices';
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* counter */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[2.6, 1, 1.1]} />
        <meshStandardMaterial color={WOOD} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.03, 0]}>
        <boxGeometry args={[2.8, 0.1, 1.3]} />
        <meshStandardMaterial color={CLAY} flatShading />
      </mesh>
      {/* posts + awning */}
      {[-1.25, 1.25].map((x) => (
        <mesh key={x} castShadow position={[x, 1.7, 0.3]}>
          <cylinderGeometry args={[0.06, 0.06, 1.6, 6]} />
          <meshStandardMaterial color={WOOD} flatShading />
        </mesh>
      ))}
      <Awning width={3} colors={colors} position={[0, 2.55, 0.35]} />
      {/* goods */}
      {goods === 'pots' && (
        <group position={[-0.7, 1.35, 0]}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} castShadow position={[i * 0.55, (i % 2) * 0.42, 0]}>
              <cylinderGeometry args={[0.2, 0.26, 0.4, 7]} />
              <meshStandardMaterial color={i % 2 ? CLAY : CLAY_D} flatShading />
            </mesh>
          ))}
        </group>
      )}
      {goods === 'baskets' && (
        <group position={[-0.6, 1.3, 0]}>
          {[0, 1].map((i) => (
            <mesh key={i} castShadow position={[i * 0.8, 0, 0]}>
              <cylinderGeometry args={[0.32, 0.22, 0.36, 8]} />
              <meshStandardMaterial color={BRASS} flatShading />
            </mesh>
          ))}
          <mesh castShadow position={[0.4, 0.5, 0]}>
            <cylinderGeometry args={[0.26, 0.18, 0.3, 8]} />
            <meshStandardMaterial color={MANGO} flatShading />
          </mesh>
        </group>
      )}
      {goods === 'fabric' && (
        <group position={[-0.8, 1.3, 0]}>
          {[FUCH, VIOLET, LIME, TURQ].map((c, i) => (
            <mesh
              key={c}
              castShadow
              position={[i * 0.5, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.14, 0.14, 0.85, 7]} />
              <meshStandardMaterial color={c} flatShading />
            </mesh>
          ))}
        </group>
      )}
      {goods === 'spices' && (
        <group position={[-0.7, 1.18, 0]}>
          {[SUN, CORAL, LIME].map((c, i) => (
            <group key={c} position={[i * 0.7, 0, 0]}>
              <mesh castShadow>
                <coneGeometry args={[0.26, 0.34, 8]} />
                <meshStandardMaterial color={c} flatShading />
              </mesh>
              <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.3, 0.32, 0.08, 8]} />
                <meshStandardMaterial color={WOOD} flatShading />
              </mesh>
            </group>
          ))}
        </group>
      )}
    </group>
  );
}

/* ---------- hanging lantern ---------- */
function Lantern({
  position,
  phase,
}: {
  position: [number, number, number];
  phase: number;
}) {
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (g.current) g.current.rotation.z = Math.sin(t * 0.9 + phase) * 0.09;
  });
  return (
    <group ref={g} position={position}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.7, 4]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      <mesh castShadow>
        <cylinderGeometry args={[0.14, 0.2, 0.36, 6]} />
        <meshStandardMaterial
          color={BRASS}
          emissive={SUN}
          emissiveIntensity={0.75}
          flatShading
        />
      </mesh>
      <mesh position={[0, -0.24, 0]}>
        <coneGeometry args={[0.08, 0.14, 6]} />
        <meshStandardMaterial color={BRASS} flatShading />
      </mesh>
    </group>
  );
}

/* ---------- backdrop wall with teal Omani doors ---------- */
function Backdrop() {
  return (
    <group position={[0, 0, -7]}>
      <mesh receiveShadow position={[0, 2.2, 0]}>
        <boxGeometry args={[18, 4.4, 0.5]} />
        <meshStandardMaterial color={PAPER} flatShading />
      </mesh>
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[18.4, 0.35, 0.7]} />
        <meshStandardMaterial color={TEAL} flatShading />
      </mesh>
      {[-5.5, 0, 5.5].map((x) => (
        <group key={x} position={[x, 0, 0.3]}>
          <mesh castShadow position={[0, 1.3, 0]}>
            <boxGeometry args={[1.6, 2.6, 0.15]} />
            <meshStandardMaterial color={TEAL} flatShading />
          </mesh>
          <mesh position={[0, 2.75, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.15, 12, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color={TEAL} flatShading />
          </mesh>
          {/* brass studs */}
          {[-0.5, 0, 0.5].map((sx) =>
            [0.7, 1.3, 1.9].map((sy) => (
              <mesh key={`${sx}${sy}`} position={[sx, sy, 0.09]}>
                <sphereGeometry args={[0.055, 6, 5]} />
                <meshStandardMaterial
                  color={BRASS}
                  emissive={BRASS}
                  emissiveIntensity={0.25}
                  flatShading
                />
              </mesh>
            )),
          )}
        </group>
      ))}
    </group>
  );
}

/* ---------- bougainvillea overhead ---------- */
function Bougainvillea() {
  const clusters: [number, number, number, string][] = [
    [-3.5, 4.6, -3, FUCH],
    [-1.2, 4.9, -2.2, VIOLET],
    [1.4, 4.7, -2.6, FUCH],
    [3.8, 4.8, -3.2, CORAL],
    [0.2, 5.1, -3.6, FUCH],
  ];
  return (
    <group>
      {/* wire */}
      <mesh position={[0, 4.55, -2.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 10, 4]} />
        <meshStandardMaterial color={INK} />
      </mesh>
      {clusters.map(([x, y, z, c], i) => (
        <mesh key={i} castShadow position={[x, y, z]} scale={[1.2, 0.7, 1]}>
          <sphereGeometry args={[0.55, 7, 5]} />
          <meshStandardMaterial color={c} flatShading />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- the vendor ---------- */
function Vendor({ cheerId }: { cheerId: number }) {
  const body = useRef<Group>(null);
  const armL = useRef<Group>(null);
  const armR = useRef<Group>(null);
  const cheerT = useRef(-10);
  const prevCheer = useRef(cheerId);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (cheerId !== prevCheer.current) {
      prevCheer.current = cheerId;
      cheerT.current = t;
    }
    const dt = t - cheerT.current;
    const cheering = dt < 1.1;
    if (body.current) {
      const bounce = 1 + Math.sin(t * 2.2) * 0.03;
      const jump = cheering ? Math.abs(Math.sin(dt * Math.PI * 2.2)) * 0.55 * (1 - dt / 1.1) : 0;
      body.current.scale.set(1, bounce, 1);
      body.current.position.y = jump;
    }
    if (armL.current)
      armL.current.rotation.z = cheering
        ? 2.4
        : 0.5 + Math.sin(t * 2.2) * 0.25;
    if (armR.current)
      armR.current.rotation.z = cheering
        ? -2.4
        : -0.5 - Math.sin(t * 2.2 + 1) * 0.25;
  });
  return (
    <group position={[0, 0.55, -2.9]}>
      <group ref={body}>
        {/* dishdasha body */}
        <mesh castShadow position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.42, 0.55, 1.5, 8]} />
          <meshStandardMaterial color={PAPER} flatShading />
        </mesh>
        {/* head */}
        <mesh castShadow position={[0, 1.75, 0]}>
          <sphereGeometry args={[0.34, 8, 6]} />
          <meshStandardMaterial color={MANGO} flatShading />
        </mesh>
        {/* mussar cap */}
        <mesh castShadow position={[0, 2.02, 0]}>
          <cylinderGeometry args={[0.3, 0.34, 0.22, 8]} />
          <meshStandardMaterial color={FUCH} flatShading />
        </mesh>
        <mesh position={[0, 2.14, 0]}>
          <sphereGeometry args={[0.12, 6, 5]} />
          <meshStandardMaterial color={VIOLET} flatShading />
        </mesh>
        {/* eyes + smile */}
        {[-0.12, 0.12].map((x) => (
          <mesh key={x} position={[x, 1.82, 0.3]}>
            <sphereGeometry args={[0.045, 6, 5]} />
            <meshStandardMaterial color={INK} />
          </mesh>
        ))}
        <mesh position={[0, 1.66, 0.31]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.09, 0.02, 5, 10, Math.PI]} />
          <meshStandardMaterial color={INK} />
        </mesh>
        {/* arms */}
        <group ref={armL} position={[0.45, 1.35, 0]}>
          <mesh castShadow position={[0.1, -0.35, 0]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.09, 0.11, 0.8, 6]} />
            <meshStandardMaterial color={PAPER} flatShading />
          </mesh>
        </group>
        <group ref={armR} position={[-0.45, 1.35, 0]}>
          <mesh castShadow position={[-0.1, -0.35, 0]} rotation={[0, 0, -0.2]}>
            <cylinderGeometry args={[0.09, 0.11, 0.8, 6]} />
            <meshStandardMaterial color={PAPER} flatShading />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ---------- oversized goods on the center counter ---------- */
function GoodsDisplay({
  word,
  onClick,
  play,
}: {
  word: string;
  onClick: () => void;
  play: (n: SfxName) => void;
}) {
  const [hover, setHover] = useState(false);
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    g.current.rotation.y = t * 0.7;
    const s = hover ? 1.12 : 1;
    g.current.scale.setScalar(g.current.scale.x + (s - g.current.scale.x) * 0.12);
  });
  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hover]);
  return (
    <group position={[0, 0, -1.2]}>
      {/* counter */}
      <mesh castShadow receiveShadow position={[0, 0.55, 0]}>
        <boxGeometry args={[3.2, 1.1, 1.2]} />
        <meshStandardMaterial color={WOOD} flatShading />
      </mesh>
      <mesh castShadow position={[0, 1.14, 0]}>
        <boxGeometry args={[3.4, 0.12, 1.4]} />
        <meshStandardMaterial color={TEAL} flatShading />
      </mesh>
      <Awning width={3.6} colors={[TEAL, PAPER]} position={[0, 3.2, 0.2]} />
      {[-1.55, 1.55].map((x) => (
        <mesh key={x} castShadow position={[x, 2.1, 0.4]}>
          <cylinderGeometry args={[0.06, 0.06, 2, 6]} />
          <meshStandardMaterial color={WOOD} flatShading />
        </mesh>
      ))}
      {/* glow ring */}
      <mesh position={[0, 1.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 16]} />
        <meshStandardMaterial
          color={SUN}
          emissive={SUN}
          emissiveIntensity={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
      <spotLight
        position={[0, 4, 1.5]}
        angle={0.5}
        penumbra={0.8}
        intensity={2.2}
        color="#FFE3B3"
      />
      {/* rotating item */}
      <group
        ref={g}
        position={[0, 1.75, 0]}
        scale={1.5}
        onClick={(e) => {
          e.stopPropagation();
          play('click');
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          play('hover');
        }}
        onPointerOut={() => setHover(false)}
      >
        <WordIcon kind={iconFor(word)} />
      </group>
      <Sparkles position={[0, 1.9, 0]} count={14} scale={2} size={4} speed={0.6} color={SUN} />
    </group>
  );
}

/* ---------- wooden letter tile ---------- */
function LetterTile({
  index,
  total,
  tile,
  onClick,
  play,
}: {
  index: number;
  total: number;
  tile: TileState;
  onClick: () => void;
  play: (n: SfxName) => void;
}) {
  const [hover, setHover] = useState(false);
  const g = useRef<Group>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!g.current) return;
    const spacing = 0.78;
    const x = (index - (total - 1) / 2) * spacing;
    const bob = tile.used ? 0 : Math.sin(t * 2 + index * 1.3) * 0.04;
    const targetY = tile.used ? 2.6 : 1.05 + bob;
    g.current.position.x = x;
    g.current.position.y += (targetY - g.current.position.y) * 0.12;
    g.current.rotation.y = tile.used ? 0 : Math.sin(t * 0.8 + index) * 0.15;
    const ts = tile.used ? 0.001 : hover ? 1.15 : 1;
    g.current.scale.setScalar(g.current.scale.x + (ts - g.current.scale.x) * 0.15);
    g.current.visible = g.current.scale.x > 0.03;
  });
  useEffect(() => {
    document.body.style.cursor = hover ? 'pointer' : 'auto';
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hover]);
  return (
    <group
      ref={g}
      position={[0, 1.05, 0.2]}
      onClick={(e) => {
        e.stopPropagation();
        if (!tile.used) onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        if (!tile.used) {
          setHover(true);
          play('hover');
        }
      }}
      onPointerOut={() => setHover(false)}
    >
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.62, 0.3]} />
        <meshStandardMaterial
          color={hover ? MANGO : CLAY}
          emissive={hover ? MANGO : CLAY}
          emissiveIntensity={hover ? 0.4 : 0.08}
          flatShading
        />
      </mesh>
      <Billboard>
        <Text
          fontSize={0.42}
          color={PAPER}
          fontWeight={800}
          outlineWidth={0.02}
          outlineColor={INK}
          anchorX="center"
          anchorY="middle"
        >
          {tile.letter.toUpperCase()}
        </Text>
      </Billboard>
    </group>
  );
}

/* ---------- scene root ---------- */
export default function SouqScene({
  word,
  tiles,
  cheerId,
  onTileClick,
  onItemClick,
  play,
}: SouqSceneProps) {
  return (
    <group>
      <CameraRig />
      {/* ground lane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[24, 20]} />
        <meshStandardMaterial color="#E8DCC4" flatShading />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[6, 20]} />
        <meshStandardMaterial color={PAPER} flatShading />
      </mesh>

      <Backdrop />
      <Bougainvillea />

      {/* side stalls */}
      <Stall position={[-4.2, 0, -2]} rotationY={0.35} colors={[FUCH, MANGO]} goods="pots" />
      <Stall position={[4.2, 0, -2]} rotationY={-0.35} colors={[LIME, TEAL]} goods="fabric" />
      <Stall position={[-4.6, 0, 1.6]} rotationY={0.6} colors={[TEAL, PAPER]} goods="baskets" />
      <Stall position={[4.6, 0, 1.6]} rotationY={-0.6} colors={[VIOLET, MANGO]} goods="spices" />

      {/* lanterns + warm points */}
      <Lantern position={[-2.4, 3.6, -2]} phase={0} />
      <Lantern position={[0, 3.8, -1.4]} phase={1.6} />
      <Lantern position={[2.4, 3.6, -2]} phase={3.1} />
      <pointLight position={[-2.4, 3.4, -2]} intensity={1.6} distance={7} color={SUN} />
      <pointLight position={[0, 3.6, -1.4]} intensity={1.8} distance={8} color={MANGO} />
      <pointLight position={[2.4, 3.4, -2]} intensity={1.6} distance={7} color={SUN} />

      <Vendor cheerId={cheerId} />
      <GoodsDisplay word={word} onClick={onItemClick} play={play} />

      {/* letter tiles on the counter front edge */}
      {tiles.map((t, i) => (
        <LetterTile
          key={`${t.letter}-${i}`}
          index={i}
          total={tiles.length}
          tile={t}
          onClick={() => onTileClick(i)}
          play={play}
        />
      ))}

      <Sparkles position={[0, 2.5, -3]} count={20} scale={[12, 4, 8]} size={2.5} speed={0.3} color={PAPER} />
    </group>
  );
}
