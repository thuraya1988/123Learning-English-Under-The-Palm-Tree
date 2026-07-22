// ═══════════════════════════════════════════════════════════
// Under Palm Tree — Shared Game Utilities
// Used by every standalone game page (2-window .. 10-cacao)
// ═══════════════════════════════════════════════════════════

function createTextTexture(text, options = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = options.width || 512;
  canvas.height = options.height || 256;
  const ctx = canvas.getContext('2d');

  if (options.border !== false && (options.bgColor1 || options.bgColor2)) {
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

  // Word-aware wrap (fixes the old character-by-character wrap that could
  // break mid-word for Arabic text)
  const words = text.split('\n').flatMap((line, i, arr) => i < arr.length - 1 ? [...line.split(' '), '\n'] : line.split(' '));
  const maxWidth = (options.width || 512) - 40;
  const lineHeight = options.lineHeight || 40;
  let lines = [''];
  words.forEach(word => {
    if (word === '\n') { lines.push(''); return; }
    const test = lines[lines.length - 1] ? lines[lines.length - 1] + ' ' + word : word;
    if (ctx.measureText(test).width > maxWidth && lines[lines.length - 1]) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = test;
    }
  });
  const startY = (canvas.height - (lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => ctx.fillText(line.trim(), canvas.width / 2, startY + i * lineHeight));

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createParticleSystem(scene, count, options = {}) {
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
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);
  return particles;
}

// FIX: replaces every alert() call from the original build with the site's
// own styled toast so the immersive UI is never interrupted by a native
// browser popup.
function showToast(message, duration = 2600) {
  let toast = document.getElementById('upt-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'upt-toast';
    toast.style.cssText = `
      position:fixed; bottom:2rem; left:50%; transform:translateX(-50%) translateY(20px);
      background:linear-gradient(135deg,#1a0a2e,#2a1a4e); border:1px solid var(--gold,#c9a96e);
      color:#f5f0e8; padding:0.9rem 1.6rem; border-radius:50px; font-family:'Noto Naskh Arabic',serif;
      font-size:0.95rem; z-index:4000; opacity:0; transition:opacity .3s, transform .3s;
      box-shadow:0 10px 30px rgba(0,0,0,0.4); text-align:center; max-width:90vw;`;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  clearTimeout(toast._hideTimer);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  toast._hideTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, duration);
}

// FIX: performance guard — pauses the render loop while the tab/page is
// hidden (each game now lives on its own page, so this alone removes the
// old "10 renderers running at once" problem; this adds per-tab savings too).
function withVisibilityPause(renderFn) {
  let active = true;
  document.addEventListener('visibilitychange', () => { active = !document.hidden; });
  function loop() {
    requestAnimationFrame(loop);
    if (active) renderFn();
  }
  loop();
}

// Small helper used by raycasting click handlers: walk up from the
// intersected mesh to the group that owns userData.key, tolerant of
// falsy-but-valid values like 0 (fixes the old `!obj.userData.treeIndex`
// bug where index 0 was treated as "not found").
function findAncestorWithKey(object, key) {
  let node = object;
  while (node) {
    if (node.userData && Object.prototype.hasOwnProperty.call(node.userData, key)) return node;
    node = node.parent;
  }
  return null;
}
