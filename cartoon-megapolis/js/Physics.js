import * as THREE from 'three';

export const STATES = {
  GROUND: 'ground',
  AIR: 'air',
  SWING: 'swing',
  WALLRUN: 'wallrun',
  ZIP: 'zip',
  DIVE: 'dive',
  LAND: 'land',
  RECOVER: 'recover'
};

export class PhysicsController {
  constructor(character, city) {
    this.character = character;
    this.city = city;

    // Physics state
    this.state = STATES.GROUND;
    this.position = new THREE.Vector3(0, 5, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.groundNormal = new THREE.Vector3(0, 1, 0);
    this.facing = new THREE.Vector3(0, 0, 1);

    // Config
    this.gravity = -28;
    this.jumpForce = 12;
    this.moveSpeed = 8;
    this.runSpeed = 16;
    this.airControl = 0.3;
    this.groundFriction = 10;
    this.airFriction = 0.5;
    this.wallRunGravity = -5;
    this.wallRunSpeed = 12;
    this.diveGravity = -45;
    this.diveSpeed = 35;
    this.zipSpeed = 50;
    this.swingDamping = 0.995;

    // State timers
    this.coyoteTime = 0.15;
    this.coyoteTimer = 0;
    this.landTimer = 0;
    this.recoverTimer = 0;
    this.wallRunTimer = 0;
    this.wallNormal = new THREE.Vector3();

    // Swing state
    this.swingAnchor = null;
    this.swingLength = 0;
    this.swingAngle = 0;
    this.webLine = null;
    this.webCurve = null;

    // Zip state
    this.zipTarget = null;
    this.zipProgress = 0;

    // Collision
    this.radius = 0.5;
    this.height = 3.2;
    this.groundProbe = new THREE.Raycaster();
    this.groundProbe.near = 0; this.groundProbe.far = 2;

    // Five-probe grounding
    this.probeOffsets = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.3, 0, 0.3),
      new THREE.Vector3(-0.3, 0, 0.3),
      new THREE.Vector3(0.3, 0, -0.3),
      new THREE.Vector3(-0.3, 0, -0.3)
    ];
  }

  update(dt, input) {
    if (this.state === STATES.LAND) {
      this.landTimer -= dt;
      if (this.landTimer <= 0) {
        this.state = STATES.GROUND;
        this.character.setAnimation('idle');
      }
      this._applyGroundFriction(dt);
      this._updatePosition(dt);
      this._resolveCollisions();
      return;
    }

    if (this.state === STATES.RECOVER) {
      this.recoverTimer -= dt;
      if (this.recoverTimer <= 0) {
        this.state = STATES.GROUND;
        this.character.setAnimation('idle');
      }
      this.velocity.y = 0;
      this._applyGroundFriction(dt);
      this._updatePosition(dt);
      this._resolveCollisions();
      return;
    }

    // Input vectors
    const moveDir = new THREE.Vector3(0, 0, 0);
    if (input.isDown('KeyW')) moveDir.z -= 1;
    if (input.isDown('KeyS')) moveDir.z += 1;
    if (input.isDown('KeyA')) moveDir.x -= 1;
    if (input.isDown('KeyD')) moveDir.x += 1;

    const isSprint = input.isDown('ShiftLeft') || input.isDown('ShiftRight');
    const wantsJump = input.isPressed('Space');
    const wantsSwing = input.mouse.rightDown;
    const wantsZip = input.isPressed('KeyE');
    const wantsDive = input.isPressed('KeyQ');

    // Camera-relative movement
    const camFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.cameraQuat || new THREE.Quaternion());
    camFwd.y = 0; camFwd.normalize();
    const camRight = new THREE.Vector3(1, 0, 0).applyQuaternion(this.cameraQuat || new THREE.Quaternion());
    camRight.y = 0; camRight.normalize();

    const worldMove = new THREE.Vector3()
      .addScaledVector(camRight, moveDir.x)
      .addScaledVector(camFwd, -moveDir.z);
    if (worldMove.lengthSq() > 0.01) worldMove.normalize();

    // Update facing
    if (worldMove.lengthSq() > 0.01) {
      this.facing.lerp(worldMove, dt * 8);
      this.facing.normalize();
      this.character.setRotationY(Math.atan2(this.facing.x, this.facing.z));
    }

    // State machine
    switch (this.state) {
      case STATES.GROUND:
        this._updateGround(dt, worldMove, isSprint, wantsJump, wantsDive);
        break;
      case STATES.AIR:
        this._updateAir(dt, worldMove, wantsJump, wantsSwing, wantsZip, wantsDive);
        break;
      case STATES.SWING:
        this._updateSwing(dt, worldMove, wantsSwing);
        break;
      case STATES.WALLRUN:
        this._updateWallRun(dt, worldMove, wantsJump);
        break;
      case STATES.ZIP:
        this._updateZip(dt);
        break;
      case STATES.DIVE:
        this._updateDive(dt, worldMove);
        break;
    }

    // Apply velocity
    this._updatePosition(dt);

    // Collision resolution
    this._resolveCollisions();

    // Ground check
    const groundInfo = this._checkGround();

    // State transitions from movement
    if (this.state === STATES.AIR || this.state === STATES.DIVE) {
      if (groundInfo.grounded) {
        const impactSpeed = -this.velocity.y;
        if (impactSpeed > 15) {
          this.state = STATES.LAND;
          this.landTimer = 0.4;
          this.velocity.set(0, 0, 0);
          this.character.setAnimation('land');
        } else if (impactSpeed > 8) {
          this.state = STATES.RECOVER;
          this.recoverTimer = 0.2;
          this.velocity.y = 0;
          this.character.setAnimation('land');
        } else {
          this.state = STATES.GROUND;
          this.velocity.y = 0;
          this.character.setAnimation(worldMove.lengthSq() > 0.1 ? (isSprint ? 'run' : 'walk') : 'idle');
        }
        this.position.y = groundInfo.height + this.height * 0.5;
      } else {
        this.coyoteTimer -= dt;
      }
    } else if (this.state === STATES.GROUND && !groundInfo.grounded) {
      if (this.coyoteTimer <= 0) {
        this.state = STATES.AIR;
        this.character.setAnimation('fall');
      }
    }

    if (groundInfo.grounded) {
      this.coyoteTimer = this.coyoteTime;
    }

    // Update character visual
    this.character.setPosition(this.position.x, this.position.y - this.height * 0.5, this.position.z);

    // Update web visual
    this._updateWebVisual();
  }

  _updateGround(dt, moveDir, isSprint, wantsJump, wantsDive) {
    const speed = isSprint ? this.runSpeed : this.moveSpeed;

    // Accelerate
    const targetVel = moveDir.clone().multiplyScalar(speed);
    this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, targetVel.x, dt * this.groundFriction);
    this.velocity.z = THREE.MathUtils.lerp(this.velocity.z, targetVel.z, dt * this.groundFriction);
    this.velocity.y = 0;

    // Animation
    const speed2d = Math.sqrt(this.velocity.x**2 + this.velocity.z**2);
    if (speed2d > 1) {
      this.character.setAnimation(isSprint ? 'run' : 'walk');
    } else {
      this.character.setAnimation('idle');
    }

    // Jump
    if (wantsJump) {
      this.velocity.y = this.jumpForce;
      this.state = STATES.AIR;
      this.coyoteTimer = 0;
      this.character.setAnimation('jump');
    }

    // Dive from ground (small hop then dive)
    if (wantsDive && speed2d > 5) {
      this.velocity.y = 5;
      this.state = STATES.DIVE;
      this.character.setAnimation('dive');
    }
  }

  _updateAir(dt, moveDir, wantsJump, wantsSwing, wantsZip, wantsDive) {
    // Gravity
    this.velocity.y += this.gravity * dt;

    // Air control
    const targetVel = moveDir.clone().multiplyScalar(this.moveSpeed);
    this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, targetVel.x, dt * this.airControl * 3);
    this.velocity.z = THREE.MathUtils.lerp(this.velocity.z, targetVel.z, dt * this.airControl * 3);

    // Air friction
    this.velocity.x *= (1 - this.airFriction * dt);
    this.velocity.z *= (1 - this.airFriction * dt);

    // Double jump / air jump (limited)
    if (wantsJump && this.coyoteTimer > 0) {
      this.velocity.y = this.jumpForce;
      this.coyoteTimer = 0;
      this.character.setAnimation('jump');
    }

    // Wall run detection
    if (wantsJump && moveDir.lengthSq() > 0.1) {
      const wall = this._checkWall();
      if (wall) {
        this.state = STATES.WALLRUN;
        this.wallNormal.copy(wall.normal);
        this.wallRunTimer = 2.0;
        this.character.setAnimation('wallrun');
        return;
      }
    }

    // Web swing
    if (wantsSwing) {
      const anchor = this.city.findAnchor(this.position, 80);
      if (anchor) {
        this._startSwing(anchor);
        return;
      }
    }

    // Zip line
    if (wantsZip) {
      const target = this.city.findZipTarget(this.position, this.facing, 150);
      if (target) {
        this._startZip(target);
        return;
      }
    }

    // Dive
    if (wantsDive) {
      this.state = STATES.DIVE;
      this.character.setAnimation('dive');
    }

    // Animation
    if (this.velocity.y > 2) {
      this.character.setAnimation('jump');
    } else if (this.velocity.y < -2) {
      this.character.setAnimation('fall');
    }
  }

  _startSwing(anchor) {
    this.state = STATES.SWING;
    this.swingAnchor = anchor.clone();
    this.swingLength = this.position.distanceTo(anchor);
    this.swingLength = Math.max(this.swingLength, 10);
    this.character.setAnimation('swing');

    // Create web line
    if (!this.webLine) {
      const geo = new THREE.BufferGeometry();
      const mat = new THREE.LineBasicMaterial({ color: 0xEEEEEE, linewidth: 2 });
      this.webLine = new THREE.Line(geo, mat);
      this.character.mesh.parent.add(this.webLine);
    }
  }

  _updateSwing(dt, moveDir, wantsSwing) {
    if (!wantsSwing || !this.swingAnchor) {
      this._endSwing();
      return;
    }

    // Pendulum physics
    const toAnchor = new THREE.Vector3().subVectors(this.swingAnchor, this.position);
    const dist = toAnchor.length();

    // Constrain length
    if (dist > this.swingLength) {
      const correction = toAnchor.normalize().multiplyScalar(dist - this.swingLength);
      this.position.add(correction);
      // Remove velocity component along rope
      const radial = toAnchor.normalize();
      const vDotR = this.velocity.dot(radial);
      this.velocity.addScaledVector(radial, -vDotR);
    }

    // Gravity along swing arc
    const gravityForce = new THREE.Vector3(0, this.gravity * 0.6, 0);
    this.velocity.addScaledVector(gravityForce, dt);

    // Air control (swing pumping)
    if (moveDir.lengthSq() > 0.01) {
      const pump = moveDir.clone().multiplyScalar(15 * dt);
      this.velocity.add(pump);
    }

    // Damping
    this.velocity.multiplyScalar(this.swingDamping);

    // Minimum speed to maintain fun
    if (this.velocity.length() < 5 && this.position.y < this.swingAnchor.y - 2) {
      const swingDir = new THREE.Vector3().crossVectors(toAnchor, new THREE.Vector3(0,0,1)).normalize();
      this.velocity.addScaledVector(swingDir, 8 * dt);
    }
  }

  _endSwing() {
    this.state = STATES.AIR;
    this.swingAnchor = null;
    if (this.webLine) {
      this.webLine.visible = false;
    }
    this.character.setAnimation('fall');
  }

  _updateWebVisual() {
    if (this.state === STATES.SWING && this.swingAnchor && this.webLine) {
      this.webLine.visible = true;
      const handPos = this.character.getHandPosition(false); // Right hand

      // Curved web using CatmullRom
      const mid = new THREE.Vector3().lerpVectors(handPos, this.swingAnchor, 0.5);
      mid.y -= this.swingLength * 0.15; // Sag

      const curve = new THREE.CatmullRomCurve3([handPos, mid, this.swingAnchor]);
      const points = curve.getPoints(20);
      this.webLine.geometry.setFromPoints(points);
    } else if (this.webLine) {
      this.webLine.visible = false;
    }
  }

  _startZip(target) {
    this.state = STATES.ZIP;
    this.zipTarget = target.clone();
    this.zipStart = this.position.clone();
    this.zipProgress = 0;
    this.character.setAnimation('zip');

    // Create zip line visual
    if (!this.webLine) {
      const geo = new THREE.BufferGeometry();
      const mat = new THREE.LineBasicMaterial({ color: 0x00FFFF, linewidth: 3 });
      this.webLine = new THREE.Line(geo, mat);
      this.character.mesh.parent.add(this.webLine);
    }
  }

  _updateZip(dt) {
    if (!this.zipTarget) {
      this.state = STATES.AIR;
      return;
    }

    this.zipProgress += dt * 1.5;
    if (this.zipProgress >= 1) {
      this.position.copy(this.zipTarget);
      this.velocity.set(0, 0, 0);
      this.state = STATES.AIR;
      this.character.setAnimation('fall');
      return;
    }

    const t = this.zipProgress;
    // Ease out
    const ease = 1 - Math.pow(1 - t, 3);
    this.position.lerpVectors(this.zipStart, this.zipTarget, ease);

    // Update zip line visual
    if (this.webLine) {
      this.webLine.visible = true;
      const handPos = this.character.getHandPosition(false);
      this.webLine.geometry.setFromPoints([handPos, this.zipTarget]);
    }
  }

  _updateWallRun(dt, moveDir, wantsJump) {
    this.wallRunTimer -= dt;

    // Gravity reduced
    this.velocity.y += this.wallRunGravity * dt;

    // Move along wall
    const alongWall = new THREE.Vector3().crossVectors(this.wallNormal, new THREE.Vector3(0, 1, 0)).normalize();
    if (moveDir.lengthSq() > 0.01) {
      const dot = alongWall.dot(moveDir);
      alongWall.multiplyScalar(Math.sign(dot) * this.wallRunSpeed);
    }
    this.velocity.x = alongWall.x;
    this.velocity.z = alongWall.z;

    // Push away from wall slightly
    this.velocity.addScaledVector(this.wallNormal, 2);

    // Jump off wall
    if (wantsJump) {
      this.velocity.addScaledVector(this.wallNormal, 12);
      this.velocity.y = this.jumpForce * 0.8;
      this.state = STATES.AIR;
      this.character.setAnimation('jump');
      return;
    }

    // Fall off wall
    if (this.wallRunTimer <= 0 || this.velocity.y < -5) {
      this.state = STATES.AIR;
      this.character.setAnimation('fall');
    }
  }

  _updateDive(dt, moveDir) {
    this.velocity.y += this.diveGravity * dt;

    // Forward boost
    const diveDir = this.facing.clone().multiplyScalar(this.diveSpeed);
    this.velocity.x = THREE.MathUtils.lerp(this.velocity.x, diveDir.x, dt * 2);
    this.velocity.z = THREE.MathUtils.lerp(this.velocity.z, diveDir.z, dt * 2);

    // Air control minimal
    if (moveDir.lengthSq() > 0.01) {
      this.velocity.addScaledVector(moveDir, 5 * dt);
    }

    // Cancel dive with jump
    if (this.velocity.y < -10) {
      // Can't cancel, must land
    }
  }

  _checkGround() {
    let highest = -Infinity;
    let grounded = false;

    for (const offset of this.probeOffsets) {
      const origin = this.position.clone().add(offset);
      origin.y += 0.5;

      // Check city colliders
      for (const col of this.city.colliders) {
        if (origin.x >= col.min.x && origin.x <= col.max.x &&
            origin.z >= col.min.z && origin.z <= col.max.z) {
          const top = col.max.y;
          if (top > highest && top < origin.y + 2) {
            highest = top;
          }
        }
      }

      // Ground plane
      if (0 > highest && 0 < origin.y + 2) {
        highest = 0;
      }
    }

    const charBottom = this.position.y - this.height * 0.5;
    grounded = charBottom <= highest + 0.3 && charBottom >= highest - 0.5;

    return { grounded, height: highest };
  }

  _checkWall() {
    const checkDirs = [
      new THREE.Vector3(1, 0, 0), new THREE.Vector3(-1, 0, 0),
      new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, -1)
    ];

    for (const dir of checkDirs) {
      const origin = this.position.clone();
      const ray = new THREE.Raycaster(origin, dir, 0, 1.5);

      for (const col of this.city.colliders) {
        const box = new THREE.Box3(
          new THREE.Vector3(col.min.x, col.min.y, col.min.z),
          new THREE.Vector3(col.max.x, col.max.y, col.max.z)
        );
        if (ray.intersectBox(box, new THREE.Vector3())) {
          return { normal: dir.clone().negate() };
        }
      }
    }
    return null;
  }

  _resolveCollisions() {
    const charAABB = {
      min: new THREE.Vector3(this.position.x - this.radius, this.position.y - this.height * 0.5, this.position.z - this.radius),
      max: new THREE.Vector3(this.position.x + this.radius, this.position.y + this.height * 0.5, this.position.z + this.radius)
    };

    for (const col of this.city.colliders) {
      if (charAABB.min.x < col.max.x && charAABB.max.x > col.min.x &&
          charAABB.min.y < col.max.y && charAABB.max.y > col.min.y &&
          charAABB.min.z < col.max.z && charAABB.max.z > col.min.z) {

        // Calculate overlap
        const overlapX = Math.min(charAABB.max.x - col.min.x, col.max.x - charAABB.min.x);
        const overlapY = Math.min(charAABB.max.y - col.min.y, col.max.y - charAABB.min.y);
        const overlapZ = Math.min(charAABB.max.z - col.min.z, col.max.z - charAABB.min.z);

        // Push out of smallest overlap
        if (overlapY < overlapX && overlapY < overlapZ) {
          if (this.position.y > (col.min.y + col.max.y) / 2) {
            this.position.y = col.max.y + this.height * 0.5;
            this.velocity.y = Math.max(0, this.velocity.y);
          } else {
            this.position.y = col.min.y - this.height * 0.5;
            this.velocity.y = Math.min(0, this.velocity.y);
          }
        } else if (overlapX < overlapZ) {
          if (this.position.x > (col.min.x + col.max.x) / 2) {
            this.position.x = col.max.x + this.radius;
            this.velocity.x = Math.max(0, this.velocity.x);
          } else {
            this.position.x = col.min.x - this.radius;
            this.velocity.x = Math.min(0, this.velocity.x);
          }
        } else {
          if (this.position.z > (col.min.z + col.max.z) / 2) {
            this.position.z = col.max.z + this.radius;
            this.velocity.z = Math.max(0, this.velocity.z);
          } else {
            this.position.z = col.min.z - this.radius;
            this.velocity.z = Math.min(0, this.velocity.z);
          }
        }
      }
    }

    // World bounds
    this.position.x = THREE.MathUtils.clamp(this.position.x, -this.city.citySize, this.city.citySize);
    this.position.z = THREE.MathUtils.clamp(this.position.z, -this.city.citySize, this.city.citySize);
  }

  _applyGroundFriction(dt) {
    this.velocity.x *= (1 - this.groundFriction * dt);
    this.velocity.z *= (1 - this.groundFriction * dt);
  }

  _updatePosition(dt) {
    // Anti-tunneling: step through large movements
    const move = this.velocity.clone().multiplyScalar(dt);
    const steps = Math.ceil(move.length() / 0.5);
    const stepMove = move.divideScalar(steps);

    for (let i = 0; i < steps; i++) {
      this.position.add(stepMove);
      this._resolveCollisions();
    }
  }

  getSpeed() {
    return Math.sqrt(this.velocity.x**2 + this.velocity.z**2);
  }

  getAltitude() {
    return Math.max(0, this.position.y - this.height * 0.5);
  }

  setCameraQuaternion(q) {
    this.cameraQuat = q;
  }
}
