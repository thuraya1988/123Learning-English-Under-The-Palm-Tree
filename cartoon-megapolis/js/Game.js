import * as THREE from 'three';
import { Engine } from './Engine.js';
import { Input } from './Input.js';
import { City } from './City.js';
import { Character } from './Character.js';
import { PhysicsController, STATES } from './Physics.js';
import { GameCamera } from './Camera.js';
import { UI } from './UI.js';
import { SkySystem } from './Sky.js';

export class Game {
  constructor() {
    this.state = 'BOOT';
    this.engine = null;
    this.input = null;
    this.city = null;
    this.character = null;
    this.physics = null;
    this.camera = null;
    this.ui = null;
    this.sky = null;

    this.timeOfDay = 0.3; // Start at day — dusk was reading as plain darkness
    this.timeScale = 0.02; // Day/night cycle speed
    this.zone = 'Downtown Core';

    this.lastTime = 0;
    this.accumulator = 0;
    this.fixedDt = 1 / 60;

    this.quality = 'medium';
  }

  async init() {
    this.ui = new UI();
    this.ui.onPlay = (quality) => this.startGame(quality);
    this.ui.onQualityChange = (q) => this.setQuality(q);
    this.ui.onRestart = () => this.restart();
    this.ui.onPause = () => { if (this.state === 'PLAY') this.togglePause(); };

    // Boot phase
    this.ui.setLoadingProgress(10, 'Initializing renderer...');

    const container = document.getElementById('canvas-container');
    this.engine = new Engine(container, this.quality);
    this.engine.init();

    this.ui.setLoadingProgress(30, 'Connecting input systems...');
    this.input = new Input();

    this.ui.setLoadingProgress(50, 'Generating city geometry...');
    this.city = new City(this.engine.scene, this.engine.preset);
    this.city.generate();

    this.ui.setLoadingProgress(80, 'Building Malexa...');
    this.character = new Character();
    this.engine.scene.add(this.character.mesh);
    this.character.mesh.visible = false;

    this.ui.setLoadingProgress(100, 'Ready');

    setTimeout(() => {
      this.ui.hideLoading();
      this.ui.showCharMenu();
      this.state = 'MENU';
      this._menuLoop();
    }, 800);
  }

  startGame(quality) {
    this.quality = quality;
    this.engine.setQuality(quality);

    this.ui.hideCharMenu();
    this.ui.showHUD();
    this.ui.notify('Welcome to Cartoon Megapolis!');

    this.character.mesh.visible = true;
    this.character.setPosition(0, 5, 0);

    // Setup physics
    this.physics = new PhysicsController(this.character, this.city);
    this.physics.position.set(0, 5, 0);

    // Setup camera
    this.camera = new GameCamera(this.engine.camera, this.engine.renderer);
    this.camera.setObstacles(this.city.colliders);

    // Setup sky
    this.sky = new SkySystem(this.engine.scene, quality);

    // Lock pointer
    this.input.lockPointer(this.engine.renderer.domElement);

    this.state = 'PLAY';
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this._gameLoop(t));
  }

  setQuality(q) {
    this.quality = q;
    if (this.engine) this.engine.setQuality(q);
  }

  restart() {
    if (this.physics) {
      this.physics.position.set(0, 20, 0);
      this.physics.velocity.set(0, 0, 0);
      this.physics.state = STATES.AIR;
    }
    this.ui.notify('Restarted at checkpoint');
  }

  _menuLoop() {
    if (this.state !== 'MENU') return;

    // Rotate the preview character slowly, centered
    const time = performance.now() * 0.001;
    if (this.character) {
      this.character.mesh.visible = true;
      this.character.mesh.position.set(0, 2, 0);
      this.character.mesh.rotation.y = time * 0.5;
      this.character.update(0.016, 0, 'idle');
    }

    // Camera orbit
    const camX = Math.sin(time * 0.3) * 6;
    const camZ = Math.cos(time * 0.3) * 6;
    this.engine.camera.position.set(camX, 3.5, camZ);
    this.engine.camera.lookAt(0, 1.6, 0);

    this.engine.render();
    requestAnimationFrame(() => this._menuLoop());
  }

  _gameLoop(time) {
    if (this.state === 'PAUSE') {
      requestAnimationFrame((t) => this._gameLoop(t));
      return;
    }
    if (this.state !== 'PLAY') return;

    requestAnimationFrame((t) => this._gameLoop(t));

    const rawDt = Math.min((time - this.lastTime) / 1000, 0.1);
    this.lastTime = time;

    // Fixed timestep physics
    this.accumulator += rawDt;
    let steps = 0;
    while (this.accumulator >= this.fixedDt && steps < 4) {
      this._update(this.fixedDt);
      this.accumulator -= this.fixedDt;
      steps++;
    }

    // Render
    this.engine.render();
  }

  _update(dt) {
    // Pause check
    if (this.input.isPressed('Escape')) {
      this.togglePause();
      return;
    }

    // Time of day
    this.timeOfDay += dt * this.timeScale * 0.01;
    if (this.timeOfDay > 1) this.timeOfDay -= 1;
    this.engine.setTimeOfDay(this.timeOfDay);
    if (this.sky) this.sky.update(dt, this.timeOfDay);

    // Update city (cars, metro)
    this.city.update(dt, this.timeOfDay);

    // Camera quat for physics
    this.physics.setCameraQuaternion(this.engine.camera.quaternion);

    // Physics
    this.physics.update(dt, this.input);

    // Camera
    const mouse = this.input.getMovement();
    this.camera.update(dt, this.physics.position, this.physics.velocity, mouse.dx, mouse.dy, this.input);

    // Character animation
    const speed = this.physics.getSpeed();
    let animState = this.physics.state;
    if (animState === STATES.GROUND && speed > 1) {
      animState = (this.input.isDown('ShiftLeft') || this.input.isDown('ShiftRight')) ? 'run' : 'walk';
    }
    this.character.update(dt, speed, animState);

    // Determine zone
    this._updateZone();

    // HUD
    const anchor = this.city.findAnchor(this.physics.position, 80);
    this.ui.updateHUD(
      this.physics.getSpeed(),
      this.physics.getAltitude(),
      anchor,
      this.zone,
      this.timeOfDay
    );

    // Crosshair modes
    if (this.physics.state === STATES.SWING) {
      this.ui.setCrosshairMode('dot');
      this.ui.setWebIndicator(true);
    } else if (anchor && this.physics.state === STATES.AIR) {
      this.ui.setCrosshairMode('dot');
      this.ui.setWebIndicator(false);
    } else {
      this.ui.setCrosshairMode('cross');
      this.ui.setWebIndicator(false);
    }

    // Notifications for state changes
    if (this.physics.state === STATES.SWING && !this._wasSwinging) {
      this.ui.notify('Web anchored! Release RMB to detach');
    }
    this._wasSwinging = this.physics.state === STATES.SWING;
  }

  _updateZone() {
    const x = this.physics.position.x;
    const z = this.physics.position.z;

    if (x < -300 && z < -200) this.zone = 'The Slums';
    else if (x > 150 && z > 150) this.zone = 'Skyline District';
    else if (x < -400 && z > 50) this.zone = 'Old Town';
    else if (x > 200 && z < -300) this.zone = 'Port Authority';
    else if (Math.abs(x) < 100 && Math.abs(z) < 100) this.zone = 'Downtown Core';
    else if (Math.abs(Math.sqrt(x*x + z*z) - 300) < 40) this.zone = 'Elevated Highway';
    else this.zone = 'City Outskirts';
  }

  togglePause() {
    if (this.state === 'PLAY') {
      this.state = 'PAUSE';
      this.ui.showPause();
      this.input.unlockPointer();
      this.input.enabled = false;
    } else if (this.state === 'PAUSE') {
      this.state = 'PLAY';
      this.ui.hidePause();
      this.input.lockPointer(this.engine.renderer.domElement);
      this.input.enabled = true;
      this.input.reset();
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this._gameLoop(t));
    }
  }
}
