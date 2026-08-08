import * as THREE from 'three';

export class GameCamera {
  constructor(camera, renderer) {
    this.camera = camera;
    this.renderer = renderer;

    // Settings
    this.distance = 8;
    this.height = 3;
    this.lookAtHeight = 1.5;
    this.minDistance = 3;
    this.maxDistance = 15;
    this.fovBase = 60;
    this.fovMax = 85;

    // State
    this.yaw = 0;
    this.pitch = 0.3;
    this.targetYaw = 0;
    this.targetPitch = 0.3;
    this.currentPos = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.smoothTime = 0.15;

    // Collision
    this.obstacleMask = [];
  }

  update(dt, targetPos, targetVel, mouseDx, mouseDy, input) {
    // Mouse look
    const sensitivity = 0.002;
    this.targetYaw -= mouseDx * sensitivity;
    this.targetPitch -= mouseDy * sensitivity;
    this.targetPitch = THREE.MathUtils.clamp(this.targetPitch, -0.8, 1.2);

    // Smooth rotation
    this.yaw = THREE.MathUtils.lerp(this.yaw, this.targetYaw, dt * 8);
    this.pitch = THREE.MathUtils.lerp(this.pitch, this.targetPitch, dt * 8);

    // Calculate ideal position
    const speed = targetVel ? Math.sqrt(targetVel.x**2 + targetVel.z**2) : 0;
    const targetDist = THREE.MathUtils.lerp(this.distance, this.maxDistance, Math.min(speed / 30, 1));

    const cosP = Math.cos(this.pitch);
    const sinP = Math.sin(this.pitch);
    const cosY = Math.cos(this.yaw);
    const sinY = Math.sin(this.yaw);

    const offset = new THREE.Vector3(
      sinY * cosP * targetDist,
      sinP * targetDist + this.height,
      cosY * cosP * targetDist
    );

    const idealPos = targetPos.clone().add(offset);

    // Obstacle avoidance (raycast from target to camera)
    const toCamera = new THREE.Vector3().subVectors(idealPos, targetPos);
    const dist = toCamera.length();
    toCamera.normalize();

    // Simple ray-box intersection against city
    let nearestHit = dist;
    for (const col of this.obstacleMask) {
      const hit = this._rayBoxIntersect(targetPos, toCamera, col, dist);
      if (hit > 0 && hit < nearestHit) {
        nearestHit = hit;
      }
    }

    // Apply distance limit
    const finalDist = Math.max(this.minDistance, nearestHit - 0.5);
    const finalOffset = toCamera.multiplyScalar(finalDist);
    const finalPos = targetPos.clone().add(finalOffset);
    finalPos.y = Math.max(targetPos.y + 0.5, finalPos.y);

    // Smooth damping
    this.currentPos.lerp(finalPos, dt * (1 / this.smoothTime));

    this.camera.position.copy(this.currentPos);

    // Look at target
    const lookTarget = targetPos.clone().add(new THREE.Vector3(0, this.lookAtHeight, 0));
    this.camera.lookAt(lookTarget);

    // Dynamic FOV based on speed
    const targetFOV = THREE.MathUtils.lerp(this.fovBase, this.fovMax, Math.min(speed / 40, 1));
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFOV, dt * 3);
    this.camera.updateProjectionMatrix();
  }

  _rayBoxIntersect(origin, dir, box, maxDist) {
    let tmin = 0, tmax = maxDist;

    for (let i = 0; i < 3; i++) {
      const o = i === 0 ? origin.x : i === 1 ? origin.y : origin.z;
      const d = i === 0 ? dir.x : i === 1 ? dir.y : dir.z;
      const bmin = i === 0 ? box.min.x : i === 1 ? box.min.y : box.min.z;
      const bmax = i === 0 ? box.max.x : i === 1 ? box.max.y : box.max.z;

      if (Math.abs(d) < 0.0001) {
        if (o < bmin || o > bmax) return -1;
      } else {
        const t1 = (bmin - o) / d;
        const t2 = (bmax - o) / d;
        const tnear = Math.min(t1, t2);
        const tfar = Math.max(t1, t2);
        tmin = Math.max(tmin, tnear);
        tmax = Math.min(tmax, tfar);
        if (tmin > tmax) return -1;
      }
    }
    return tmin > 0 ? tmin : tmax;
  }

  setObstacles(colliders) {
    this.obstacleMask = colliders;
  }

  getQuaternion() {
    return this.camera.quaternion.clone();
  }
}
