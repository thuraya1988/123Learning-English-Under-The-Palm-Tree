export class Input {
  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0, dx: 0, dy: 0, down: false, rightDown: false };
    this.pointerLocked = false;
    this.enabled = true;
    this._handlers = [];
    this._init();
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
