import * as THREE from 'three';

export interface TextTextureOptions {
  width?: number;
  height?: number;
  bgColor1?: string;
  bgColor2?: string;
  border?: boolean;
  borderColor?: string;
  borderWidth?: number;
  textColor?: string;
  font?: string;
  lineHeight?: number;
}

export function createTextTexture(text: string, options: TextTextureOptions = {}): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = options.width || 512;
  canvas.height = options.height || 256;
  const ctx = canvas.getContext('2d')!;

  const transparent = options.bgColor1 === 'transparent';
  if (!transparent) {
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, options.bgColor1 || '#1a0a2e');
    bgGradient.addColorStop(1, options.bgColor2 || '#2a1a4e');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  if (options.border) {
    ctx.strokeStyle = options.borderColor || '#c9a96e';
    ctx.lineWidth = options.borderWidth || 3;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  }

  ctx.fillStyle = options.textColor || '#f5f0e8';
  ctx.font = options.font || 'bold 32px "Noto Naskh Arabic", serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const lines = text.split('\n');
  const lineHeight = options.lineHeight || 40;
  const startY = (canvas.height - (lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export interface ParticleOptions {
  color?: string;
  range?: number;
  pointSize?: number;
  opacity?: number;
}

export function createParticleSystem(scene: THREE.Scene, count: number, options: ParticleOptions = {}): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * (options.range || 20);
    positions[i * 3 + 1] = (Math.random() - 0.5) * (options.range || 20);
    positions[i * 3 + 2] = (Math.random() - 0.5) * (options.range || 20);
    const color = new THREE.Color(options.color || '#c9a96e');
    color.offsetHSL((Math.random() - 0.5) * 0.1, 0, (Math.random() - 0.5) * 0.2);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: options.pointSize || 0.05,
    vertexColors: true,
    transparent: true,
    opacity: options.opacity || 0.6,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  return particles;
}

/** Full teardown: dispose every geometry/material/texture in the scene + renderer. */
export function disposeScene(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
    if (material) {
      const mats = Array.isArray(material) ? material : [material];
      mats.forEach((m) => {
        const mat = m as THREE.MeshStandardMaterial;
        if (mat.map) mat.map.dispose();
        m.dispose();
      });
    }
  });
  renderer.dispose();
  renderer.domElement.remove();
}

export function wrapArabicText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  centerX: number,
  startY: number,
): number {
  const chars = text.split('');
  let line = '';
  let y = startY;
  const lineHeight = 45;
  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line !== '') {
      ctx.fillText(line, centerX, y);
      line = chars[i];
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, centerX, y);
  return y;
}

/** Raycast helper: compute NDC mouse from a DOM event on a renderer canvas. */
export function eventToNdc(event: { clientX: number; clientY: number }, dom: HTMLElement): THREE.Vector2 {
  const rect = dom.getBoundingClientRect();
  return new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1,
  );
}

/** Walk up parents until userData[key] exists. */
export function findUserData(obj: THREE.Object3D, key: string): THREE.Object3D | null {
  let current: THREE.Object3D | null = obj;
  while (current && current.userData[key] === undefined) {
    current = current.parent;
  }
  return current && current.userData[key] !== undefined ? current : null;
}
