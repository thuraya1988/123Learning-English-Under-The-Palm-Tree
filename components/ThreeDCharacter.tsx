"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, ContactShadows } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import GlassButton from "./GlassButton";

function PlaceholderFigure({ speaking }: { speaking: boolean }) {
  const head = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!head.current) return;
    const t = state.clock.getElapsedTime();
    head.current.position.y = 1.05 + Math.sin(t * 1.6) * 0.04;
    if (speaking) {
      head.current.scale.y = 1 + Math.sin(t * 9) * 0.04;
    } else {
      head.current.scale.y = 1;
    }
  });
  return (
    <group>
      <mesh position={[0, 0.1, 0]} castShadow>
        <capsuleGeometry args={[0.42, 0.9, 6, 16]} />
        <meshStandardMaterial color="#8a6529" roughness={0.55} metalness={0.2} />
      </mesh>
      <mesh ref={head} position={[0, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color="#e9c97c"
          roughness={0.35}
          metalness={0.3}
          emissive="#3a2a17"
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh position={[0, -0.62, 0]} receiveShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.05, 32]} />
        <meshStandardMaterial color="#3a2a17" />
      </mesh>
    </group>
  );
}

type Props = {
  name?: string;
  context?: "character" | "skill" | "chapter" | "ar";
};

export default function ThreeDCharacter({
  name = "Palm Tree Character",
  context = "character",
}: Props) {
  const [speaking, setSpeaking] = useState(false);
  return (
    <div className="glass-deep p-6 md:p-7 rounded-[20px] flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-cinzel text-[12px] tracking-[0.18em] text-[var(--gold)] uppercase mb-1">
            3D Interactive · {context}
          </p>
          <h3 className="font-cormorant text-2xl text-[var(--brown)]">{name}</h3>
        </div>
        <span className="text-2xl" aria-hidden>
          ✨
        </span>
      </div>

      <div
        className="relative h-[320px] rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(240,232,220,0.6), rgba(232,221,208,0.8))",
          border: "1px solid rgba(184,150,62,0.3)",
          boxShadow: "inset 0 8px 24px rgba(61,43,31,0.18)",
        }}
      >
        <Canvas shadows camera={{ position: [1.5, 1.4, 2.6], fov: 38 }} dpr={[1, 2]}>
          <color attach="background" args={["#efdfb6"]} />
          <ambientLight intensity={0.55} />
          <directionalLight
            position={[3, 4, 2]}
            intensity={1.1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
            <PlaceholderFigure speaking={speaking} />
          </Float>
          <ContactShadows
            position={[0, -0.65, 0]}
            opacity={0.45}
            scale={6}
            blur={2.4}
            far={2}
          />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
        <span
          className="absolute top-3 left-3 font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)] px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,248,235,0.7)",
            border: "1px solid rgba(184,150,62,0.3)",
          }}
        >
          [3D Model Placeholder]
        </span>
        <span
          className="absolute bottom-3 right-3 font-cinzel text-[10px] tracking-[0.2em] uppercase text-[var(--brown-mid)] px-3 py-1 rounded-full"
          style={{
            background: "rgba(255,248,235,0.7)",
            border: "1px solid rgba(184,150,62,0.3)",
          }}
        >
          {speaking ? "Speaking" : "Idle"} animation
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassButton variant="outline" onClick={() => setSpeaking((s) => !s)}>
          ▶ Voice
        </GlassButton>
        <GlassButton variant="outline">🎤 Ask</GlassButton>
        <GlassButton variant="dark">Practice</GlassButton>
        <GlassButton variant="gold">Dialogue</GlassButton>
      </div>

      <p className="text-[var(--brown-mid)] text-xs italic">
        Emotion state · idle · neutral · curious · [Emotion State Placeholder]
      </p>
      <p className="text-[var(--brown-mid)] text-xs italic">
        Dialogue: [Story File Dialogue Placeholder]
      </p>
    </div>
  );
}
