export class Input {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0, dx: 0, dy: 0, down: false, rightDown: false };
    this.pointerLocked = false;
    this.enabled = true;
    this.isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
    this.touchMove = { x: 0, z: 0 }; // analog joystick vector, same convention as WASD moveDir
    this._handlers = [];
    this._init();
    if (this.isTouch) this._initTouch();
  }

  _init() {
    const kd = e => { if (this.enabled) this.keys[e.code] = true; };
    const ku = e => { this.keys[e.code] = false; };
    const mm = e => {
      if (!this.enabled) return;
      if (this.pointerLocked) {
        this.mouse.dx += e.movementX;
        this.mouse.dy += e.movementY;
      } else {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }
    };
    const md = e => {
      if (!this.enabled) return;
      if (e.button === 0) this.mouse.down = true;
      if (e.button === 2) this.mouse.rightDown = true;
    };
    const mu = e => {
      if (e.button === 0) this.mouse.down = false;
      if (e.button === 2) this.mouse.rightDown = false;
    };
    const ctx = e => e.preventDefault();

    document.addEventListener('keydown', kd);
    document.addEventListener('keyup', ku);
    document.addEventListener('mousemove', mm);
    document.addEventListener('mousedown', md);
    document.addEventListener('mouseup', mu);
    document.addEventListener('contextmenu', ctx);

    this._handlers.push(() => {
      document.removeEventListener('keydown', kd);
      document.removeEventListener('keyup', ku);
      document.removeEventListener('mousemove', mm);
      document.removeEventListener('mousedown', md);
      document.removeEventListener('mouseup', mu);
      document.removeEventListener('contextmenu', ctx);
    });
  }

  // ---- touch control API (used by the on-screen joystick/buttons/look-drag) ----
  setKey(code, down) { this.keys[code] = down; }
  setRightDown(down) { this.mouse.rightDown = down; }
  setTouchMove(x, z) { this.touchMove.x = x; this.touchMove.z = z; }
  addLookDelta(dx, dy) { this.mouse.dx += dx; this.mouse.dy += dy; }

  _initTouch() {
    const joystick = document.getElementById('touch-joystick');
    const knob = document.getElementById('touch-joystick-knob');
    const lookLayer = document.getElementById('touch-look-layer');
    if (!joystick || !lookLayer) return; // markup not present — skip silently

    document.body.classList.add('is-touch');

    // ---- joystick: drag anywhere inside its base to set an analog move vector ----
    let stickTouchId = null;
    let stickCenter = { x: 0, y: 0 };
    const STICK_RADIUS = 46;

    const stickStart = e => {
      const t = e.changedTouches[0];
      stickTouchId = t.identifier;
      const r = joystick.getBoundingClientRect();
      stickCenter = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      stickMove(e);
      e.preventDefault();
    };
    const stickMove = e => {
      const t = [...e.changedTouches].find(t => t.identifier === stickTouchId);
      if (!t) return;
      let dx = t.clientX - stickCenter.x;
      let dy = t.clientY - stickCenter.y;
      const len = Math.hypot(dx, dy);
      if (len > STICK_RADIUS) { dx = dx / len * STICK_RADIUS; dy = dy / len * STICK_RADIUS; }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      const nx = dx / STICK_RADIUS, ny = dy / STICK_RADIUS;
      const DEADZONE = 0.12;
      const mag = Math.hypot(nx, ny);
      if (mag < DEADZONE) { this.setTouchMove(0, 0); return; }
      this.setTouchMove(nx, ny);
      e.preventDefault();
    };
    const stickEnd = e => {
      if (![...e.changedTouches].some(t => t.identifier === stickTouchId)) return;
      stickTouchId = null;
      knob.style.transform = 'translate(0px, 0px)';
      this.setTouchMove(0, 0);
    };
    joystick.addEventListener('touchstart', stickStart, { passive: false });
    joystick.addEventListener('touchmove', stickMove, { passive: false });
    joystick.addEventListener('touchend', stickEnd);
    joystick.addEventListener('touchcancel', stickEnd);

    // ---- look layer: drag anywhere on it to rotate the camera ----
    let lookTouchId = null;
    let lastLook = { x: 0, y: 0 };
    const lookStart = e => {
      const t = e.changedTouches[0];
      lookTouchId = t.identifier;
      lastLook = { x: t.clientX, y: t.clientY };
      e.preventDefault();
    };
    const lookMove = e => {
      const t = [...e.changedTouches].find(t => t.identifier === lookTouchId);
      if (!t) return;
      const dx = t.clientX - lastLook.x;
      const dy = t.clientY - lastLook.y;
      lastLook = { x: t.clientX, y: t.clientY };
      const LOOK_SENS = 2.2; // touch deltas are small compared to raw mouse movementX/Y
      this.addLookDelta(dx * LOOK_SENS, dy * LOOK_SENS);
      e.preventDefault();
    };
    const lookEnd = e => {
      if (![...e.changedTouches].some(t => t.identifier === lookTouchId)) return;
      lookTouchId = null;
    };
    lookLayer.addEventListener('touchstart', lookStart, { passive: false });
    lookLayer.addEventListener('touchmove', lookMove, { passive: false });
    lookLayer.addEventListener('touchend', lookEnd);
    lookLayer.addEventListener('touchcancel', lookEnd);

    // ---- action buttons: press sets the same key state a keyboard press would.
    // Physics.js already decides per-key whether that means edge-triggered
    // (isPressed, e.g. jump/zip/dive) or continuous (isDown, e.g. sprint) —
    // the button wiring itself doesn't need to know which.
    const wireButton = (id, code) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('touchstart', e => { this.setKey(code, true); e.preventDefault(); }, { passive: false });
      el.addEventListener('touchend', () => this.setKey(code, false));
      el.addEventListener('touchcancel', () => this.setKey(code, false));
    };

    wireButton('btn-jump', 'Space');
    wireButton('btn-sprint', 'ShiftLeft');
    wireButton('btn-zip', 'KeyE');
    wireButton('btn-dive', 'KeyQ');

    const swingBtn = document.getElementById('btn-swing');
    if (swingBtn) {
      swingBtn.addEventListener('touchstart', e => { this.setRightDown(true); e.preventDefault(); }, { passive: false });
      swingBtn.addEventListener('touchend', () => this.setRightDown(false));
      swingBtn.addEventListener('touchcancel', () => this.setRightDown(false));
    }
  }

  isDown(code) { return !!this.keys[code]; }
  isPressed(code) {
    if (this.keys[code] === true) {
      this.keys[code] = 'held';
      return true;
    }
    return false;
  }

  getMovement() {
    const dx = this.mouse.dx; const dy = this.mouse.dy;
    this.mouse.dx = 0; this.mouse.dy = 0;
    return { dx, dy };
  }

  reset() {
    this.keys = {};
    this.mouse.dx = 0; this.mouse.dy = 0;
    this.mouse.down = false; this.mouse.rightDown = false;
    this.touchMove.x = 0; this.touchMove.z = 0;
    const knob = document.getElementById('touch-joystick-knob');
    if (knob) knob.style.transform = 'translate(0px, 0px)';
  }

  lockPointer(element) {
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock;
    if (element.requestPointerLock) {
      element.requestPointerLock();
      this.pointerLocked = true;
    }
  }

  unlockPointer() {
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    if (document.exitPointerLock) document.exitPointerLock();
    this.pointerLocked = false;
  }

  dispose() {
    this._handlers.forEach(h => h());
    this._handlers = [];
  }
}
