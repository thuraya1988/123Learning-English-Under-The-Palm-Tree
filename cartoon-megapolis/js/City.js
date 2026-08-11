import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// City generation with instancing for performance
export class City {
  constructor(scene, preset) {
    this.scene = scene;
    this.preset = preset;
    this.colliders = []; // Array of AABBs {min, max}
    this.groundColliders = []; // Ground planes
    this.rooftops = []; // Potential swing anchors
    this.chunks = new Map();
    this.chunkSize = 100;
    this.citySize = 1200;

    // Districts. Heights were originally up to 220 units against a ~2.4-unit-
    // tall character and a close (~6.5-unit) third-person camera — buildings
    // loomed and filled the whole view. Scaled down ~3x so the tallest
    // Skyline towers still read as skyscrapers but don't blot out the sky.
    this.districts = [
      { name: 'Slums', x: -400, z: -400, w: 300, d: 300,
        bldgH: [6, 16], bldgW: [6, 12], colors: [0x8B7355, 0xA08060, 0x6B5B45, 0x9B8B6B] },
      { name: 'Downtown', x: -100, z: -100, w: 400, d: 400,
        bldgH: [12, 42], bldgW: [15, 40], colors: [0x5B7FA3, 0x7A9BBF, 0x4A6B8A, 0x8BAAC9] },
      { name: 'Skyline', x: 150, z: 150, w: 300, d: 300,
        bldgH: [24, 62], bldgW: [20, 50], colors: [0x3D5A80, 0x5C7A9E, 0x2E4A66, 0x6B8FA8] },
      { name: 'Old Town', x: -500, z: 100, w: 250, d: 250,
        bldgH: [10, 24], bldgW: [10, 20], colors: [0xA07850, 0x8B6F47, 0xB08860, 0x9B7D55] },
      { name: 'Port', x: 200, z: -400, w: 300, d: 250,
        bldgH: [8, 20], bldgW: [12, 30], colors: [0x6B8E7B, 0x8BA89B, 0x5A7A6A, 0x7A9A8A] }
    ];
  }

  generate() {
    this._generateGround();
    this._generateRoads();
    this._generateBuildings();
    this._generateElevatedHighways();
    this._generateMetro();
    this._generateProps();
    this._generateRooftopDetails();
    return this;
  }

  _generateGround() {
    const geo = new THREE.PlaneGeometry(this.citySize * 2, this.citySize * 2);
    const mat = new THREE.MeshStandardMaterial({ 
      color: 0x3D3D3D, roughness: 0.9, metalness: 0.1 
    });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);
    this.groundColliders.push({
      min: new THREE.Vector3(-this.citySize, -1, -this.citySize),
      max: new THREE.Vector3(this.citySize, 0, this.citySize)
    });
  }

  _generateRoads() {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x2A2A2A, roughness: 0.95 });
    const sidewalkMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.9 });
    const roadGeo = new THREE.PlaneGeometry(1, 1);
    const roadCount = 40;

    // Main grid roads
    for (let i = -10; i <= 10; i++) {
      // X-axis roads
      const road = new THREE.Mesh(roadGeo, roadMat);
      road.rotation.x = -Math.PI / 2;
      road.position.set(0, 0.05, i * 60);
      road.scale.set(this.citySize, 12, 1);
      road.receiveShadow = true;
      this.scene.add(road);

      // Sidewalks
      const sw1 = new THREE.Mesh(roadGeo, sidewalkMat);
      sw1.rotation.x = -Math.PI / 2;
      sw1.position.set(0, 0.1, i * 60 + 7);
      sw1.scale.set(this.citySize, 3, 1);
      sw1.receiveShadow = true;
      this.scene.add(sw1);

      const sw2 = new THREE.Mesh(roadGeo, sidewalkMat);
      sw2.rotation.x = -Math.PI / 2;
      sw2.position.set(0, 0.1, i * 60 - 7);
      sw2.scale.set(this.citySize, 3, 1);
      sw2.receiveShadow = true;
      this.scene.add(sw2);

      // Z-axis roads
      const road2 = new THREE.Mesh(roadGeo, roadMat);
      road2.rotation.x = -Math.PI / 2;
      road2.position.set(i * 60, 0.05, 0);
      road2.scale.set(12, this.citySize, 1);
      road2.receiveShadow = true;
      this.scene.add(road2);

      const sw3 = new THREE.Mesh(roadGeo, sidewalkMat);
      sw3.rotation.x = -Math.PI / 2;
      sw3.position.set(i * 60 + 7, 0.1, 0);
      sw3.scale.set(3, this.citySize, 1);
      sw3.receiveShadow = true;
      this.scene.add(sw3);

      const sw4 = new THREE.Mesh(roadGeo, sidewalkMat);
      sw4.rotation.x = -Math.PI / 2;
      sw4.position.set(i * 60 - 7, 0.1, 0);
      sw4.scale.set(3, this.citySize, 1);
      sw4.receiveShadow = true;
      this.scene.add(sw4);
    }
  }

  // A tileable window-grid facade, baked per district color instead of a
  // flat fill — the old flat-colored boxes read as placeholder blocks.
  // RepeatWrapping means every building in the instanced mesh shows the
  // same tile count regardless of its actual size (windows scale with the
  // building rather than staying a fixed size), which isn't perfectly
  // realistic but is a big step up from a solid color for near-zero cost.
  _buildFacadeTexture(baseHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const base = new THREE.Color(baseHex);
    ctx.fillStyle = `#${base.getHexString()}`;
    ctx.fillRect(0, 0, 256, 512);

    const shade = ctx.createLinearGradient(0, 0, 0, 512);
    shade.addColorStop(0, 'rgba(0,0,0,0.16)');
    shade.addColorStop(0.5, 'rgba(0,0,0,0)');
    shade.addColorStop(1, 'rgba(0,0,0,0.28)');
    ctx.fillStyle = shade; ctx.fillRect(0, 0, 256, 512);

    const cols = 5, rows = 12;
    const cw = 256 / cols, ch = 512 / rows, padX = cw * 0.24, padY = ch * 0.28;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const lit = Math.random() < 0.32;
        ctx.fillStyle = lit ? 'rgba(255,222,150,0.95)' : 'rgba(0,0,0,0.5)';
        ctx.fillRect(c * cw + padX, r * ch + padY, cw - padX * 2, ch - padY * 2);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  _generateBuildings() {
    const maxBuildings = this.preset.instanceCount.buildings;
    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    // We use instanced meshes per district color for performance
    const instances = [];

    for (const district of this.districts) {
      const count = Math.floor(maxBuildings / this.districts.length);
      const colors = district.colors;
      const avgW = (district.bldgW[0] + district.bldgW[1]) / 2;
      const avgH = (district.bldgH[0] + district.bldgH[1]) / 2;
      const repeatX = Math.min(6, Math.max(2, Math.round(avgW / 6)));
      const repeatY = Math.min(10, Math.max(3, Math.round(avgH / 8)));

      for (let c = 0; c < colors.length; c++) {
        const tex = this._buildFacadeTexture(colors[c]);
        tex.repeat.set(repeatX, repeatY);
        const mat = new THREE.MeshStandardMaterial({
          map: tex, roughness: 0.78, metalness: 0.12
        });
        const mesh = new THREE.InstancedMesh(boxGeo, mat, Math.ceil(count / colors.length));
        mesh.castShadow = true; mesh.receiveShadow = true;
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.scene.add(mesh);

        let idx = 0;
        const perColor = Math.ceil(count / colors.length);
        for (let i = 0; i < perColor && idx < mesh.count; i++) {
          const x = district.x + (Math.random() - 0.5) * district.w;
          const z = district.z + (Math.random() - 0.5) * district.d;

          // Avoid roads
          if (Math.abs(x % 60) < 10 || Math.abs(z % 60) < 10) continue;

          const w = district.bldgW[0] + Math.random() * (district.bldgW[1] - district.bldgW[0]);
          const h = district.bldgH[0] + Math.random() * (district.bldgH[1] - district.bldgH[0]);
          const d = district.bldgW[0] + Math.random() * (district.bldgW[1] - district.bldgW[0]);

          const dummy = new THREE.Object3D();
          dummy.position.set(x, h / 2, z);
          dummy.scale.set(w, h, d);
          dummy.updateMatrix();
          mesh.setMatrixAt(idx, dummy.matrix);

          // Collider
          this.colliders.push({
            min: new THREE.Vector3(x - w/2 - 0.5, 0, z - d/2 - 0.5),
            max: new THREE.Vector3(x + w/2 + 0.5, h, z + d/2 + 0.5)
          });

          // Rooftop anchor
          this.rooftops.push(new THREE.Vector3(x, h, z));

          idx++;
        }
        mesh.count = idx;
        mesh.instanceMatrix.needsUpdate = true;
      }
    }

    // Windows (emissive planes on buildings for night glow)
    if (this.preset.quality !== 'low') {
      this._generateWindows();
    }
  }

  _generateWindows() {
    const winGeo = new THREE.PlaneGeometry(0.8, 1.2);
    const winMat = new THREE.MeshBasicMaterial({ 
      color: 0xFFE4A0, side: THREE.DoubleSide, transparent: true, opacity: 0.8 
    });
    const winCount = Math.min(this.rooftops.length * 4, 2000);
    const winMesh = new THREE.InstancedMesh(winGeo, winMat, winCount);
    winMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

    const dummy = new THREE.Object3D();
    let idx = 0;
    for (let i = 0; i < this.rooftops.length && idx < winCount; i++) {
      const roof = this.rooftops[i];
      const floors = Math.floor(roof.y / 3);
      for (let f = 2; f < floors && idx < winCount; f += 2) {
        for (let side = 0; side < 4 && idx < winCount; side++) {
          if (Math.random() > 0.6) continue; // Not all windows lit
          dummy.position.set(
            roof.x + (side === 0 ? 2 : side === 1 ? -2 : 0),
            f * 3,
            roof.z + (side === 2 ? 2 : side === 3 ? -2 : 0)
          );
          dummy.rotation.y = side * Math.PI / 2;
          dummy.scale.setScalar(1 + Math.random() * 0.5);
          dummy.updateMatrix();
          winMesh.setMatrixAt(idx++, dummy.matrix);
        }
      }
    }
    winMesh.count = idx;
    winMesh.instanceMatrix.needsUpdate = true;
    this.scene.add(winMesh);
    this.windowMesh = winMesh;
  }

  _generateElevatedHighways() {
    const supportGeo = new THREE.BoxGeometry(2, 20, 2);
    const supportMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.8 });
    const roadGeo = new THREE.BoxGeometry(1, 1, 1);
    const roadMat = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.9 });

    // Elevated ring road
    const radius = 300;
    const segments = 64;
    const supports = [];

    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = 25;

      // Road segment
      const seg = new THREE.Mesh(roadGeo, roadMat);
      seg.position.set(x, y, z);
      seg.scale.set(18, 1.5, 30);
      seg.rotation.y = -angle;
      seg.castShadow = true; seg.receiveShadow = true;
      this.scene.add(seg);

      this.colliders.push({
        min: new THREE.Vector3(x - 9, y - 0.75, z - 15),
        max: new THREE.Vector3(x + 9, y + 0.75, z + 15)
      });

      // Support every 4 segments
      if (i % 4 === 0) {
        const sup = new THREE.Mesh(supportGeo, supportMat);
        sup.position.set(x, y / 2, z);
        sup.scale.y = y / 10;
        sup.castShadow = true;
        this.scene.add(sup);

        this.colliders.push({
          min: new THREE.Vector3(x - 1, 0, z - 1),
          max: new THREE.Vector3(x + 1, y, z + 1)
        });
      }
    }
  }

  _generateMetro() {
    // Elevated metro tracks crossing the city
    const trackGeo = new THREE.BoxGeometry(1, 1, 1);
    const trackMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.9 });

    for (let x = -400; x <= 400; x += 8) {
      const track = new THREE.Mesh(trackGeo, trackMat);
      track.position.set(x, 35, 0);
      track.scale.set(6, 1, 800);
      track.receiveShadow = true;
      this.scene.add(track);

      if (x % 40 === 0) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(2, 35, 2), trackMat);
        pillar.position.set(x, 17.5, 0);
        pillar.castShadow = true;
        this.scene.add(pillar);
      }
    }

    // Metro train (simplified)
    const trainGeo = new THREE.BoxGeometry(1, 1, 1);
    const trainMat = new THREE.MeshStandardMaterial({ color: 0xE85D4E, roughness: 0.4, metalness: 0.3 });
    this.train = new THREE.Mesh(trainGeo, trainMat);
    this.train.scale.set(5, 4, 20);
    this.train.position.set(-400, 38, 0);
    this.train.castShadow = true;
    this.scene.add(this.train);
    this.trainDir = 1;
  }

  _generateProps() {
    // Streetlights
    const poleGeo = new THREE.CylinderGeometry(0.15, 0.2, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.5 });
    const lightGeo = new THREE.SphereGeometry(0.5);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xFFE4B5 });

    const maxProps = this.preset.instanceCount.props;
    const poleCount = Math.min(200, maxProps / 2);

    for (let i = 0; i < poleCount; i++) {
      const x = (Math.random() - 0.5) * 800;
      const z = (Math.random() - 0.5) * 800;
      if (Math.abs(x % 60) > 8 && Math.abs(z % 60) > 8) continue; // Only on roadsides

      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(x, 4, z);
      pole.castShadow = true;
      this.scene.add(pole);

      const bulb = new THREE.Mesh(lightGeo, lightMat);
      bulb.position.set(x, 8.2, z);
      this.scene.add(bulb);

      // Point light for night
      if (this.preset.quality !== 'low') {
        const pl = new THREE.PointLight(0xFFE4B5, 0.5, 20);
        pl.position.set(x, 8, z);
        this.scene.add(pl);
      }
    }

    // Trees (cartoon style - low poly spheres on sticks)
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 3);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5C3A1E, roughness: 0.9 });
    const leavesGeo = new THREE.IcosahedronGeometry(2, 0);
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x4A7C3F, roughness: 0.8 });

    const treeCount = Math.min(100, maxProps / 4);
    for (let i = 0; i < treeCount; i++) {
      const x = (Math.random() - 0.5) * 700;
      const z = (Math.random() - 0.5) * 700;
      if (Math.abs(x % 60) < 15 || Math.abs(z % 60) < 15) continue;

      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.set(x, 1.5, z);
      trunk.castShadow = true;
      this.scene.add(trunk);

      const leaves = new THREE.Mesh(leavesGeo, leavesMat);
      leaves.position.set(x, 4, z);
      leaves.scale.setScalar(0.8 + Math.random() * 0.6);
      leaves.castShadow = true;
      this.scene.add(leaves);
    }

    // Cars
    if (this.preset.instanceCount.cars > 0) {
      this._generateCars();
    }
  }

  // Shared shapes for every car: a body+cabin shell (2 material groups, so
  // paint color and glass tint are separate) plus a wheel cluster. Built
  // once and reused — only the paint material differs per car. Canonical
  // orientation faces +Z; placement rotates 90° for X-axis roads instead of
  // scaling a plain box, since a compound shape can't be axis-swapped by
  // scale alone the way the old flat box could.
  _buildCarGeometries() {
    const bodyGeo = new THREE.BoxGeometry(2.0, 0.7, 4.2);
    bodyGeo.translate(0, 0.7, 0);
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.55, 2.1);
    cabinGeo.translate(0, 1.325, -0.2);
    this._carShellGeo = mergeGeometries([bodyGeo, cabinGeo], true);

    const wheelGeo = new THREE.CylinderGeometry(0.34, 0.34, 0.26, 10);
    wheelGeo.rotateZ(Math.PI / 2);
    const wx = 1.05, wz = 1.5;
    const wheelGeos = [[wx, wz], [-wx, wz], [wx, -wz], [-wx, -wz]].map(([x, z]) => {
      const g = wheelGeo.clone(); g.translate(x, 0.34, z); return g;
    });
    this._carWheelGeo = mergeGeometries(wheelGeos);
    this._carWheelMat = new THREE.MeshStandardMaterial({ color: 0x14141a, roughness: 0.6, metalness: 0.2 });
    this._carGlassMat = new THREE.MeshStandardMaterial({ color: 0x1c2530, roughness: 0.25, metalness: 0.6 });
  }

  _generateCars() {
    if (!this._carShellGeo) this._buildCarGeometries();
    const carColors = [0xCC4444, 0x44AA44, 0x4444CC, 0xCCCC44, 0xF2F2F2, 0x333333, 0xE8A23A];
    this.cars = [];

    for (let i = 0; i < this.preset.instanceCount.cars; i++) {
      const paintMat = new THREE.MeshStandardMaterial({
        color: carColors[Math.floor(Math.random() * carColors.length)], roughness: 0.35, metalness: 0.5
      });
      const body = new THREE.Mesh(this._carShellGeo, [paintMat, this._carGlassMat]);
      body.castShadow = true; body.receiveShadow = true;
      const wheels = new THREE.Mesh(this._carWheelGeo, this._carWheelMat);
      wheels.castShadow = true;

      const group = new THREE.Group();
      group.add(body); group.add(wheels);

      const roadIdx = Math.floor(Math.random() * 20) - 10;
      const isX = Math.random() > 0.5;
      const lane = (Math.random() - 0.5) * 8;
      const dir = Math.random() > 0.5 ? 1 : -1;

      group.position.set(
        isX ? (Math.random() - 0.5) * 800 : roadIdx * 60 + lane,
        0,
        isX ? roadIdx * 60 + lane : (Math.random() - 0.5) * 800
      );
      group.rotation.y = (isX ? Math.PI / 2 : 0) + (dir === -1 ? Math.PI : 0);
      group.userData = { speed: 10 + Math.random() * 15, axis: isX ? 'x' : 'z', dir };
      this.scene.add(group);
      this.cars.push(group);
    }
  }

  _generateRooftopDetails() {
    // AC units, antennas, water towers on rooftops
    const acGeo = new THREE.BoxGeometry(1, 1, 1);
    const acMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
    const antGeo = new THREE.CylinderGeometry(0.05, 0.1, 8);
    const antMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.6 });

    for (let i = 0; i < Math.min(this.rooftops.length, 500); i++) {
      const roof = this.rooftops[i];
      if (roof.y < 30) continue; // Only taller buildings

      // AC unit
      if (Math.random() > 0.5) {
        const ac = new THREE.Mesh(acGeo, acMat);
        ac.position.set(roof.x + (Math.random()-0.5)*4, roof.y + 1, roof.z + (Math.random()-0.5)*4);
        ac.scale.set(2, 1.5, 1.5);
        ac.castShadow = true;
        this.scene.add(ac);

        this.colliders.push({
          min: new THREE.Vector3(ac.position.x - 1, roof.y, ac.position.z - 0.75),
          max: new THREE.Vector3(ac.position.x + 1, roof.y + 1.5, ac.position.z + 0.75)
        });
      }

      // Antenna
      if (Math.random() > 0.7) {
        const ant = new THREE.Mesh(antGeo, antMat);
        ant.position.set(roof.x, roof.y + 4, roof.z);
        ant.castShadow = true;
        this.scene.add(ant);
      }
    }
  }

  update(dt, time) {
    // Animate cars
    if (this.cars) {
      for (const car of this.cars) {
        const axis = car.userData.axis;
        car.position[axis] += car.userData.speed * car.userData.dir * dt;
        if (Math.abs(car.position[axis]) > 500) {
          car.position[axis] = -car.position[axis];
        }
      }
    }

    // Animate metro train
    if (this.train) {
      this.train.position.x += 40 * this.trainDir * dt;
      if (this.train.position.x > 400) this.trainDir = -1;
      if (this.train.position.x < -400) this.trainDir = 1;
    }
  }

  // Collision query
  checkCollision(aabb) {
    for (const col of this.colliders) {
      if (aabb.min.x < col.max.x && aabb.max.x > col.min.x &&
          aabb.min.y < col.max.y && aabb.max.y > col.min.y &&
          aabb.min.z < col.max.z && aabb.max.z > col.min.z) {
        return col;
      }
    }
    return null;
  }

  // Ground height at position
  getGroundHeight(x, z) {
    // Check building tops first
    let highest = 0;
    for (const col of this.colliders) {
      if (x >= col.min.x && x <= col.max.x && z >= col.min.z && z <= col.max.z) {
        highest = Math.max(highest, col.max.y);
      }
    }
    return highest;
  }

  // Find nearest rooftop anchor for swinging
  findAnchor(pos, maxDist = 80) {
    let best = null; let bestDist = maxDist;
    for (const roof of this.rooftops) {
      const d = pos.distanceTo(roof);
      if (d < bestDist && roof.y > pos.y + 5) {
        bestDist = d;
        best = roof;
      }
    }
    return best;
  }

  // Find zip target
  findZipTarget(pos, dir, maxDist = 150) {
    let best = null; let bestDot = 0.5;
    for (const roof of this.rooftops) {
      const to = new THREE.Vector3().subVectors(roof, pos);
      const d = to.length();
      if (d < 20 || d > maxDist) continue;
      to.normalize();
      const dot = to.dot(dir);
      if (dot > bestDot) {
        bestDot = dot;
        best = roof;
      }
    }
    return best;
  }
}
