import * as THREE from 'three';

export class SkySystem {
  constructor(scene, quality) {
    this.scene = scene;
    this.quality = quality;
    this.time = 0.5; // 0-1
    this.stars = null;
    this.clouds = null;
    this.dome = null;
    this._init();
  }

  _init() {
    // Sky dome
    const domeGeo = new THREE.SphereGeometry(600, 32, 32);
    const domeMat = new THREE.MeshBasicMaterial({
      color: 0x2B1D3B,
      side: THREE.BackSide,
      fog: false
    });
    this.dome = new THREE.Mesh(domeGeo, domeMat);
    this.scene.add(this.dome);

    // Stars (night only)
    if (this.quality !== 'low') {
      const starGeo = new THREE.BufferGeometry();
      const starCount = this.quality === 'high' ? 3000 : 1000;
      const positions = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 550;
        positions[i*3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i*3+2] = r * Math.cos(phi);
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xFFFFFF, size: 1.5, sizeAttenuation: false, transparent: true, opacity: 0
      });
      this.stars = new THREE.Points(starGeo, starMat);
      this.scene.add(this.stars);
    }

    // Clouds (simple billboard clouds)
    if (this.quality !== 'low') {
      const cloudCount = this.quality === 'high' ? 20 : 8;
      this.clouds = new THREE.Group();
      const cloudGeo = new THREE.SphereGeometry(1, 8, 8);
      const cloudMat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF, transparent: true, opacity: 0.4, fog: false });
      for (let i = 0; i < cloudCount; i++) {
        const cloud = new THREE.Group();
        const puffs = 3 + Math.floor(Math.random() * 4);
        for (let j = 0; j < puffs; j++) {
          const puff = new THREE.Mesh(cloudGeo, cloudMat);
          puff.position.set(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 5
          );
          puff.scale.setScalar(3 + Math.random() * 5);
          cloud.add(puff);
        }
        cloud.position.set(
          (Math.random() - 0.5) * 800,
          80 + Math.random() * 60,
          (Math.random() - 0.5) * 800
        );
        this.clouds.add(cloud);
      }
      this.scene.add(this.clouds);
    }

    // Sun/Moon mesh
    const sunGeo = new THREE.SphereGeometry(8, 16, 16);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xFFD4A3, fog: false });
    this.sunMesh = new THREE.Mesh(sunGeo, sunMat);
    this.scene.add(this.sunMesh);
  }

  update(dt, timeOfDay) {
    this.time = timeOfDay;

    // Sun position
    const angle = (timeOfDay - 0.25) * Math.PI * 2; // noon at 0.25
    const sunX = Math.cos(angle) * 400;
    const sunY = Math.sin(angle) * 400;
    this.sunMesh.position.set(sunX, sunY, -100);

    // Sun color/intensity based on time
    if (timeOfDay > 0.6 || timeOfDay < 0.15) {
      this.sunMesh.material.color.setHex(0x8899CC);
      this.sunMesh.scale.setScalar(0.8);
    } else if (timeOfDay > 0.4 && timeOfDay < 0.6) {
      this.sunMesh.material.color.setHex(0xFF6B4A);
      this.sunMesh.scale.setScalar(1.2);
    } else {
      this.sunMesh.material.color.setHex(0xFFD4A3);
      this.sunMesh.scale.setScalar(1.0);
    }

    // Stars opacity
    if (this.stars) {
      const nightness = Math.max(0, Math.min(1, (Math.abs(timeOfDay - 0.75) < 0.25) ? 1 - Math.abs(timeOfDay - 0.75) * 4 : 0));
      this.stars.material.opacity = nightness;
    }

    // Cloud drift
    if (this.clouds) {
      this.clouds.children.forEach((cloud, i) => {
        cloud.position.x += dt * (2 + i * 0.1);
        if (cloud.position.x > 500) cloud.position.x = -500;
      });
    }
  }
}
