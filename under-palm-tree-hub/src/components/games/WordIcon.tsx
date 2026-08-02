/** Low-poly flat-shaded picture tokens shared by the falaj & souq games. */

export type IconKind =
  | 'fish'
  | 'boat'
  | 'palm'
  | 'flower'
  | 'bird'
  | 'cat'
  | 'drop'
  | 'shell'
  | 'pot'
  | 'star';

/** Map an English vocabulary word to a picture-token kind. */
export function iconFor(word: string): IconKind {
  const w = word.toLowerCase();
  if (/fish|shark|whale|dolphin|crab/.test(w)) return 'fish';
  if (/boat|sail|dhow|ship|harbour/.test(w)) return 'boat';
  if (/palm|tree|leaf|grass|plant/.test(w)) return 'palm';
  if (/flower|rose|jasmine|bee|blossom/.test(w)) return 'flower';
  if (/bird|eagle|owl|parrot|seagull|duck|hen|crow/.test(w)) return 'bird';
  if (/cat|goat|rabbit|fox|horse|donkey|camel|tahr|dog/.test(w)) return 'cat';
  if (/water|wave|rain|milk|sea|drop|soup/.test(w)) return 'drop';
  if (/pearl|shell|turtle|silver/.test(w)) return 'shell';
  if (/pot|lamp|lantern|basket|key|door|honey|sugar|date|bread|rice|lemon|meat|spice|incense|market|candle/.test(w))
    return 'pot';
  return 'star';
}

const C = {
  fish: '#159AAD',
  fin: '#3ED6C5',
  wood: '#8A5A33',
  sail: '#FFF9EE',
  trunk: '#8A5A33',
  leaf: '#4FBF67',
  leafD: '#2F9E4F',
  petal: '#E5599C',
  sun: '#FFD93D',
  bird: '#8B6FE8',
  beak: '#FFB54D',
  cat: '#FF7A66',
  drop: '#3ED6C5',
  pearl: '#EAFDF9',
  clay: '#C97B4A',
  clayD: '#A95F3B',
};

/** A small low-poly prop (~1 unit tall), centered at origin. */
export default function WordIcon({ kind }: { kind: IconKind }) {
  switch (kind) {
    case 'fish':
      return (
        <group>
          <mesh castShadow scale={[1, 0.62, 0.4]}>
            <sphereGeometry args={[0.42, 7, 5]} />
            <meshStandardMaterial color={C.fish} flatShading />
          </mesh>
          <mesh castShadow position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <coneGeometry args={[0.22, 0.35, 4]} />
            <meshStandardMaterial color={C.fin} flatShading />
          </mesh>
          <mesh position={[0.28, 0.1, 0.16]}>
            <sphereGeometry args={[0.055, 6, 5]} />
            <meshStandardMaterial color="#21323B" />
          </mesh>
        </group>
      );
    case 'boat':
      return (
        <group>
          <mesh castShadow position={[0, -0.15, 0]}>
            <boxGeometry args={[0.9, 0.28, 0.4]} />
            <meshStandardMaterial color={C.wood} flatShading />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.9, 5]} />
            <meshStandardMaterial color={C.wood} flatShading />
          </mesh>
          <mesh castShadow position={[0.16, 0.42, 0]} rotation={[0, 0, -0.25]}>
            <coneGeometry args={[0.3, 0.7, 3]} />
            <meshStandardMaterial color={C.sail} flatShading />
          </mesh>
        </group>
      );
    case 'palm':
      return (
        <group>
          <mesh castShadow position={[0, 0.1, 0]} rotation={[0, 0, 0.15]}>
            <cylinderGeometry args={[0.07, 0.11, 0.8, 5]} />
            <meshStandardMaterial color={C.trunk} flatShading />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => {
            const a = (i / 5) * Math.PI * 2;
            return (
              <mesh
                key={i}
                castShadow
                position={[Math.cos(a) * 0.28 + 0.1, 0.55, Math.sin(a) * 0.28]}
                scale={[1, 0.45, 0.6]}
              >
                <sphereGeometry args={[0.24, 6, 4]} />
                <meshStandardMaterial
                  color={i % 2 ? C.leaf : C.leafD}
                  flatShading
                />
              </mesh>
            );
          })}
        </group>
      );
    case 'flower':
      return (
        <group>
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.55, 5]} />
            <meshStandardMaterial color={C.leafD} flatShading />
          </mesh>
          <mesh castShadow position={[0, 0.25, 0]}>
            <sphereGeometry args={[0.14, 6, 5]} />
            <meshStandardMaterial color={C.sun} flatShading />
          </mesh>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <mesh
                key={i}
                castShadow
                position={[Math.cos(a) * 0.24, 0.25, Math.sin(a) * 0.24]}
              >
                <sphereGeometry args={[0.13, 6, 4]} />
                <meshStandardMaterial color={C.petal} flatShading />
              </mesh>
            );
          })}
        </group>
      );
    case 'bird':
      return (
        <group>
          <mesh castShadow scale={[1, 0.85, 0.7]}>
            <sphereGeometry args={[0.32, 7, 5]} />
            <meshStandardMaterial color={C.bird} flatShading />
          </mesh>
          <mesh position={[0.34, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.08, 0.2, 4]} />
            <meshStandardMaterial color={C.beak} flatShading />
          </mesh>
          <mesh castShadow position={[-0.05, 0.1, 0.28]} rotation={[0.5, 0, 0]}>
            <boxGeometry args={[0.3, 0.06, 0.22]} />
            <meshStandardMaterial color="#6D54D8" flatShading />
          </mesh>
          <mesh position={[0.14, 0.12, 0.2]}>
            <sphereGeometry args={[0.05, 6, 5]} />
            <meshStandardMaterial color="#21323B" />
          </mesh>
        </group>
      );
    case 'cat':
      return (
        <group>
          <mesh castShadow position={[0, -0.05, 0]} scale={[1, 0.8, 0.7]}>
            <sphereGeometry args={[0.32, 7, 5]} />
            <meshStandardMaterial color={C.cat} flatShading />
          </mesh>
          <mesh castShadow position={[0, 0.32, 0]}>
            <sphereGeometry args={[0.22, 7, 5]} />
            <meshStandardMaterial color={C.cat} flatShading />
          </mesh>
          {[-0.13, 0.13].map((x) => (
            <mesh key={x} position={[x, 0.52, 0]}>
              <coneGeometry args={[0.08, 0.16, 4]} />
              <meshStandardMaterial color={C.cat} flatShading />
            </mesh>
          ))}
          <mesh position={[-0.08, 0.36, 0.19]}>
            <sphereGeometry args={[0.04, 6, 5]} />
            <meshStandardMaterial color="#21323B" />
          </mesh>
          <mesh position={[0.08, 0.36, 0.19]}>
            <sphereGeometry args={[0.04, 6, 5]} />
            <meshStandardMaterial color="#21323B" />
          </mesh>
        </group>
      );
    case 'drop':
      return (
        <group>
          <mesh castShadow position={[0, -0.12, 0]}>
            <sphereGeometry args={[0.3, 7, 5]} />
            <meshStandardMaterial color={C.drop} flatShading />
          </mesh>
          <mesh castShadow position={[0, 0.22, 0]}>
            <coneGeometry args={[0.26, 0.5, 7]} />
            <meshStandardMaterial color={C.drop} flatShading />
          </mesh>
        </group>
      );
    case 'shell':
      return (
        <group>
          <mesh castShadow scale={[1, 0.55, 0.8]}>
            <sphereGeometry args={[0.38, 7, 5]} />
            <meshStandardMaterial color={C.clay} flatShading />
          </mesh>
          <mesh castShadow position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.16, 7, 6]} />
            <meshStandardMaterial color={C.pearl} flatShading />
          </mesh>
        </group>
      );
    case 'pot':
      return (
        <group>
          <mesh castShadow>
            <cylinderGeometry args={[0.24, 0.3, 0.5, 7]} />
            <meshStandardMaterial color={C.clay} flatShading />
          </mesh>
          <mesh castShadow position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.3, 0.24, 0.14, 7]} />
            <meshStandardMaterial color={C.clayD} flatShading />
          </mesh>
        </group>
      );
    case 'star':
    default:
      return (
        <mesh castShadow rotation={[0.4, 0.3, 0]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={C.sun}
            emissive={C.sun}
            emissiveIntensity={0.25}
            flatShading
          />
        </mesh>
      );
  }
}
