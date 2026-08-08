import * as THREE from 'three';

// Procedural rigged cartoon character with animation states
export class Character {
  constructor(type = 'thuraya') {
    this.type = type;
    this.mesh = new THREE.Group();
    this.bones = {};
    this.animations = {};
    this.currentAnim = 'idle';
    this.animTime = 0;
    this.animBlend = 0;
    this.targetAnim = 'idle';

    this._buildRig();
    this._setupAnimations();
  }

  _buildRig() {
    const isThuraya = this.type === 'thuraya';
    const skinColor = isThuraya ? 0xD4A574 : 0xC4916C;
    const shirtColor = isThuraya ? 0x6B1A2F : 0x2E5A7C; // Burgundy vs Teal
    const pantsColor = isThuraya ? 0x3D2817 : 0x1E3A50;
    const hairColor = isThuraya ? 0x2A1A10 : 0x1A1A2E;

    // Materials
    const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.6 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: shirtColor, roughness: 0.7 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.8 });
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.9 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.5 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });

    // Root
    this.root = new THREE.Group();
    this.mesh.add(this.root);

    // Hips
    this.bones.hips = new THREE.Group();
    this.bones.hips.position.y = 3.2;
    this.root.add(this.bones.hips);

    // Torso
    const torsoGeo = new THREE.BoxGeometry(0.9, 1.4, 0.5);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.y = 0.7;
    torso.castShadow = true;
    this.bones.hips.add(torso);

    // Head
    this.bones.head = new THREE.Group();
    this.bones.head.position.y = 1.5;
    this.bones.hips.add(this.bones.head);

    const headGeo = new THREE.BoxGeometry(0.7, 0.75, 0.7);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.y = 0.375;
    head.castShadow = true;
    this.bones.head.add(head);

    // Hair
    const hairGeo = new THREE.BoxGeometry(0.8, 0.3, 0.8);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 0.8;
    this.bones.head.add(hair);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.08);
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.18, 0.45, 0.36);
    this.bones.head.add(leftEye);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.18, 0.45, 0.36);
    this.bones.head.add(rightEye);

    // Arms
    this.bones.armL = new THREE.Group();
    this.bones.armL.position.set(-0.6, 1.3, 0);
    this.bones.hips.add(this.bones.armL);

    const armGeo = new THREE.BoxGeometry(0.25, 1.2, 0.25);
    const armL = new THREE.Mesh(armGeo, skinMat);
    armL.position.y = -0.5;
    armL.castShadow = true;
    this.bones.armL.add(armL);

    this.bones.armR = new THREE.Group();
    this.bones.armR.position.set(0.6, 1.3, 0);
    this.bones.hips.add(this.bones.armR);

    const armR = new THREE.Mesh(armGeo, skinMat);
    armR.position.y = -0.5;
    armR.castShadow = true;
    this.bones.armR.add(armR);

    // Hands
    const handGeo = new THREE.SphereGeometry(0.15);
    const handL = new THREE.Mesh(handGeo, skinMat);
    handL.position.y = -1.2;
    this.bones.armL.add(handL);
    const handR = new THREE.Mesh(handGeo, skinMat);
    handR.position.y = -1.2;
    this.bones.armR.add(handR);

    // Legs
    this.bones.legL = new THREE.Group();
    this.bones.legL.position.set(-0.25, 0, 0);
    this.bones.hips.add(this.bones.legL);

    const legGeo = new THREE.BoxGeometry(0.3, 1.6, 0.3);
    const legL = new THREE.Mesh(legGeo, pantsMat);
    legL.position.y = -0.8;
    legL.castShadow = true;
    this.bones.legL.add(legL);

    this.bones.legR = new THREE.Group();
    this.bones.legR.position.set(0.25, 0, 0);
    this.bones.hips.add(this.bones.legR);

    const legR = new THREE.Mesh(legGeo, pantsMat);
    legR.position.y = -0.8;
    legR.castShadow = true;
    this.bones.legR.add(legR);

    // Shoes
    const shoeGeo = new THREE.BoxGeometry(0.35, 0.2, 0.5);
    const shoeL = new THREE.Mesh(shoeGeo, shoeMat);
    shoeL.position.set(0, -1.7, 0.1);
    this.bones.legL.add(shoeL);
    const shoeR = new THREE.Mesh(shoeGeo, shoeMat);
    shoeR.position.set(0, -1.7, 0.1);
    this.bones.legR.add(shoeR);

    // Scale entire character
    this.mesh.scale.setScalar(0.6);
  }

  _setupAnimations() {
    // Define key poses for each animation state
    this.animations = {
      idle: { 
        head: { rx: 0, ry: 0 },
        armL: { rx: 0, rz: 0.1 },
        armR: { rx: 0, rz: -0.1 },
        legL: { rx: 0 },
        legR: { rx: 0 },
        hips: { y: 3.2 }
      },
      walk: {
        head: { rx: 0, ry: 0 },
        armL: { rx: 0, rz: 0.2 },
        armR: { rx: 0, rz: -0.2 },
        legL: { rx: 0.6 },
        legR: { rx: -0.6 },
        hips: { y: 3.2 }
      },
      run: {
        head: { rx: 0.2, ry: 0 },
        armL: { rx: -0.8, rz: 0.3 },
        armR: { rx: 0.8, rz: -0.3 },
        legL: { rx: -0.8 },
        legR: { rx: 0.8 },
        hips: { y: 3.3 }
      },
      jump: {
        head: { rx: -0.3, ry: 0 },
        armL: { rx: -2.5, rz: 0.5 },
        armR: { rx: -2.5, rz: -0.5 },
        legL: { rx: -0.4 },
        legR: { rx: -0.2 },
        hips: { y: 3.4 }
      },
      fall: {
        head: { rx: 0.3, ry: 0 },
        armL: { rx: -0.5, rz: 0.8 },
        armR: { rx: -0.5, rz: -0.8 },
        legL: { rx: 0.3 },
        legR: { rx: 0.1 },
        hips: { y: 3.2 }
      },
      swing: {
        head: { rx: 0.5, ry: 0 },
        armL: { rx: -2.8, rz: 0.2 },
        armR: { rx: -2.8, rz: -0.2 },
        legL: { rx: 0.6 },
        legR: { rx: 0.4 },
        hips: { y: 3.0 }
      },
      wallrun: {
        head: { rx: 0.4, ry: 0 },
        armL: { rx: -1.0, rz: 0.5 },
        armR: { rx: -1.5, rz: -0.3 },
        legL: { rx: -1.2 },
        legR: { rx: 0.8 },
        hips: { y: 3.3 }
      },
      zip: {
        head: { rx: 0.2, ry: 0 },
        armL: { rx: -0.3, rz: 0.1 },
        armR: { rx: -0.3, rz: -0.1 },
        legL: { rx: 0.1 },
        legR: { rx: 0.1 },
        hips: { y: 3.1 }
      },
      dive: {
        head: { rx: 1.0, ry: 0 },
        armL: { rx: -0.2, rz: 0.1 },
        armR: { rx: -0.2, rz: -0.1 },
        legL: { rx: 0.1 },
        legR: { rx: 0.1 },
        hips: { y: 3.0 }
      },
      land: {
        head: { rx: -0.2, ry: 0 },
        armL: { rx: 0.5, rz: 0.3 },
        armR: { rx: 0.5, rz: -0.3 },
        legL: { rx: -0.5 },
        legR: { rx: -0.5 },
        hips: { y: 2.8 }
      }
    };
  }

  setAnimation(name, blendTime = 0.2) {
    if (this.targetAnim === name) return;
    this.targetAnim = name;
    this.animBlend = 0;
  }

  update(dt, speed, state) {
    this.animTime += dt * (state === 'run' ? 12 : state === 'walk' ? 8 : state === 'swing' ? 6 : 3);

    // Blend factor
    if (this.animBlend < 1) {
      this.animBlend = Math.min(1, this.animBlend + dt * 5);
    }

    const current = this.animations[this.currentAnim] || this.animations.idle;
    const target = this.animations[this.targetAnim] || this.animations.idle;

    // If blend complete, switch current
    if (this.animBlend >= 1) {
      this.currentAnim = this.targetAnim;
    }

    const t = this.animBlend;
    const walkCycle = Math.sin(this.animTime);
    const runCycle = Math.sin(this.animTime * 1.5);

    // Apply poses with cycle modulation
    const mod = (state === 'walk' || state === 'run') ? (state === 'run' ? runCycle : walkCycle) : 0;

    // Head
    const hrx = THREE.MathUtils.lerp(current.head.rx, target.head.rx, t);
    this.bones.head.rotation.x = hrx + Math.sin(this.animTime * 0.5) * 0.05;

    // Arms
    const alrx = THREE.MathUtils.lerp(current.armL.rx, target.armL.rx, t);
    const alrz = THREE.MathUtils.lerp(current.armL.rz, target.armL.rz, t);
    this.bones.armL.rotation.x = alrx + (state === 'walk' ? mod * 0.8 : state === 'run' ? mod * 1.2 : 0);
    this.bones.armL.rotation.z = alrz;

    const arrx = THREE.MathUtils.lerp(current.armR.rx, target.armR.rx, t);
    const arrz = THREE.MathUtils.lerp(current.armR.rz, target.armR.rz, t);
    this.bones.armR.rotation.x = arrx + (state === 'walk' ? -mod * 0.8 : state === 'run' ? -mod * 1.2 : 0);
    this.bones.armR.rotation.z = arrz;

    // Legs
    const llrx = THREE.MathUtils.lerp(current.legL.rx, target.legL.rx, t);
    const lrrx = THREE.MathUtils.lerp(current.legR.rx, target.legR.rx, t);
    this.bones.legL.rotation.x = llrx + (state === 'walk' ? -mod * 0.8 : state === 'run' ? -mod * 1.0 : 0);
    this.bones.legR.rotation.x = lrrx + (state === 'walk' ? mod * 0.8 : state === 'run' ? mod * 1.0 : 0);

    // Hips bob
    const hy = THREE.MathUtils.lerp(current.hips.y, target.hips.y, t);
    this.bones.hips.position.y = hy + (state === 'walk' || state === 'run' ? Math.abs(Math.sin(this.animTime * 2)) * 0.1 : 0);

    // Body tilt based on velocity
    if (state === 'run') {
      this.root.rotation.x = 0.15;
    } else if (state === 'swing') {
      this.root.rotation.x = 0.3;
    } else if (state === 'wallrun') {
      this.root.rotation.x = 0.2;
      this.root.rotation.z = 0.1;
    } else {
      this.root.rotation.x = THREE.MathUtils.lerp(this.root.rotation.x, 0, dt * 5);
      this.root.rotation.z = THREE.MathUtils.lerp(this.root.rotation.z, 0, dt * 5);
    }
  }

  getHandPosition(isLeft) {
    const arm = isLeft ? this.bones.armL : this.bones.armR;
    const worldPos = new THREE.Vector3();
    arm.children[arm.children.length - 1].getWorldPosition(worldPos);
    return worldPos;
  }

  setRotationY(angle) {
    this.mesh.rotation.y = angle;
  }

  setPosition(x, y, z) {
    this.mesh.position.set(x, y, z);
  }

  getPosition() {
    return this.mesh.position;
  }
}
