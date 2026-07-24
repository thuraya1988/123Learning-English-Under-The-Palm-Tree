/* ============================================
   Card Room 3D backdrop — "The Mansion Interiors"
   Model: "The Mansion interiors" (sketchfab.com/3d-models/the-mansion-interiors-a6a788778bb047929c69a09621099e29)
   by Veterock (sketchfab.com/windofglass), licensed CC-BY-4.0.
   Purely decorative — sits behind the card-room UI, no interaction.
   ============================================ */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';

const canvas = document.getElementById('mansion-bg');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1f140a);
scene.fog = new THREE.Fog(0x1f140a, 40, 140);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.5, 300);
camera.position.set(5, -4, 60);
camera.lookAt(5, -4, -66);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

scene.add(new THREE.AmbientLight(0xd4c5a9, 1.4));
const keyLight = new THREE.DirectionalLight(0xffe0b0, 1.2);
keyLight.position.set(10, 20, 20);
scene.add(keyLight);
const rimLight = new THREE.PointLight(0x8b1a3a, 2, 60);
rimLight.position.set(-10, 5, -40);
scene.add(rimLight);

const loader = new GLTFLoader();
loader.setMeshoptDecoder(MeshoptDecoder);
loader.load('assets/mansion-interiors.glb', (gltf) => {
  scene.add(gltf.scene);
}, undefined, () => { /* the card room still reads fine without the 3D backdrop if this fails to load */ });

let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.002;
  camera.position.x = 5 + Math.sin(t) * 3;
  camera.lookAt(5, -4, -66);
  renderer.render(scene, camera);
}
animate();
