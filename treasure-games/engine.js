"use strict";
const $ = (id) => document.getElementById(id),
  MODE = $("app").dataset.game,
  cv = $("game"),
  ctx = cv.getContext("2d");
const TOTAL = 120,
  clamp = (v, a, b) => Math.max(a, Math.min(b, v)),
  rnd = (r, a, b) => a + r() * (b - a);
function rng(a) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const WORLDS = [
  {
    n: "غابة الزمرد",
    i: "🌳",
    sky: ["#66c9ef", "#b8efa2"],
    top: "#58d36b",
    body: "#6e4426",
    enemy: "🐗",
  },
  {
    n: "صحراء الأسرار",
    i: "🏜️",
    sky: ["#ffd89b", "#ff9957"],
    top: "#efc16f",
    body: "#9e6631",
    enemy: "🦂",
  },
  {
    n: "قمم الثلج",
    i: "❄️",
    sky: ["#b4e3fa", "#eefaff"],
    top: "#e8f8ff",
    body: "#85afc8",
    enemy: "🐻‍❄️",
  },
  {
    n: "أعماق المحيط",
    i: "🌊",
    sky: ["#0f568f", "#42b8ed"],
    top: "#4ad5c0",
    body: "#176b91",
    enemy: "🐙",
  },
  {
    n: "قلعة الحمم",
    i: "🌋",
    sky: ["#330b13", "#bc3913"],
    top: "#9693a0",
    body: "#4c4954",
    enemy: "👹",
  },
  {
    n: "مجرة النجوم",
    i: "🌌",
    sky: ["#090825", "#482079"],
    top: "#a178ef",
    body: "#503595",
    enemy: "👾",
  },
];
const SKINS = [
    "🐰",
    "🦊",
    "🐼",
    "🐸",
    "🐯",
    "🐧",
    "🦁",
    "🐙",
    "🦄",
    "🤖",
    "🐉",
  ],
  PRIZE_ICONS = [
    "📿",
    "🪶",
    "🐚",
    "🍀",
    "🕯️",
    "🗺️",
    "🔔",
    "🪆",
    "🔮",
    "🎖️",
    "🏺",
    "🥁",
    "🌟",
    "🍁",
    "🎈",
    "🪁",
    "🥈",
    "⌚",
    "🪞",
    "🛡️",
    "⚔️",
    "🧤",
    "👢",
    "🪄",
    "🎺",
    "🌙",
    "🎻",
    "📯",
    "🧿",
    "🎯",
    "🪙",
    "🏵️",
    "🏆",
    "👑",
    "💎",
    "🐉",
    "💰",
    "🦁",
    "💍",
    "🏹",
    "🥚",
    "🐎",
    "⛵",
    "🏰",
    "🎸",
    "☀️",
    "🪔",
    "🐲",
    "🔥",
    "🌊",
    "💠",
    "🗡️",
    "📖",
    "🏙️",
    "🌌",
    "👁️",
    "🧭",
    "🔑",
    "🪙",
    "🏆",
  ];
const DEF = {
  unlocked: 1,
  stars: {},
  coins: 150,
  gems: 3,
  prizes: [],
  skins: [0],
  skin: 0,
  boosts: { shield: 1, magnet: 1, freeze: 1, wings: 1 },
  spins: 1,
};
let D = load(),
  G = null,
  state = "menu",
  paused = false,
  last = performance.now(),
  keys = { left: false, right: false, up: false, down: false, jump: false };
function load() {
  try {
    return Object.assign(
      structuredClone(DEF),
      JSON.parse(localStorage.getItem("treasure_" + MODE) || "{}"),
    );
  } catch {
    return structuredClone(DEF);
  }
}
function save() {
  localStorage.setItem("treasure_" + MODE, JSON.stringify(D));
}
function stars() {
  return Object.values(D.stars).reduce((a, b) => a + b, 0);
}
function fit() {
  const d = Math.min(devicePixelRatio || 1, 2);
  cv.width = innerWidth * d;
  cv.height = innerHeight * d;
  ctx.setTransform(d, 0, 0, d, 0, 0);
  if (G) {
    G.W = innerWidth;
    G.H = innerHeight;
  }
}
addEventListener("resize", fit);
fit();

/* صوت خفيف لا يراكم النغمات بعد إعادة التشغيل */
let ac = null;
function tone(f = 500, d = 0.08) {
  try {
    ac ||= new (window.AudioContext || webkitAudioContext)();
    if (ac.state === "suspended") ac.resume();
    const o = ac.createOscillator(),
      g = ac.createGain(),
      t = ac.currentTime;
    o.type = "triangle";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.08, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + d);
    o.connect(g).connect(ac.destination);
    o.start();
    o.stop(t + d);
  } catch {}
}
function toast(s) {
  const t = $("toast");
  t.textContent = s;
  t.classList.add("on");
  clearTimeout(t._x);
  t._x = setTimeout(() => t.classList.remove("on"), 1800);
}
function screen(id) {
  ["menu", "map", "shop", "gallery"].forEach((x) =>
    $(x)?.classList.add("hidden"),
  );
  $("hud").classList.add("hidden");
  if (id === "play") $("hud").classList.remove("hidden");
  else $(id)?.classList.remove("hidden");
  state = id;
  paused = false;
}
function modal(title, body, buttons) {
  $("modalTitle").textContent = title;
  $("modalBody").innerHTML = body;
  $("modalBtns").innerHTML = buttons
    .map((b) => `<button data-modal="${b.a}">${b.t}</button>`)
    .join("");
  $("modal").classList.remove("hidden");
}
function closeModal() {
  $("modal").classList.add("hidden");
}

function buildMap() {
  const out = $("mapGrid");
  out.innerHTML = "";
  WORLDS.forEach((w, wi) => {
    const sec = document.createElement("div");
    sec.className = "world";
    sec.innerHTML = `<div class="world-title"><span>${w.i} ${w.n}</span><span>${wi * 20 + 1}–${wi * 20 + 20}</span></div>`;
    const grid = document.createElement("div");
    grid.className = "levels";
    for (let i = 1; i <= 20; i++) {
      const n = wi * 20 + i,
        b = document.createElement("button"),
        done = D.stars[n] || 0,
        open = n <= D.unlocked;
      b.className = "level " + (done ? "done " : "") + (!open ? "lock" : "");
      b.innerHTML = open
        ? `${n}<small>${"★".repeat(done)}${"☆".repeat(3 - done)}</small>`
        : `🔒<small>${n}</small>`;
      b.disabled = !open;
      b.onclick = () => start(n);
      grid.appendChild(b);
    }
    sec.appendChild(grid);
    out.appendChild(sec);
  });
  $("mapStats").textContent = `⭐ ${stars()}/360 · 🪙 ${D.coins}`;
  screen("map");
}
function buildShop() {
  const out = $("shopGrid");
  out.innerHTML = "";
  if (MODE !== "jump") {
    Object.entries({
      shield: ["🛡️", "درع الحماية", 120],
      magnet: ["🧲", "مغناطيس", 150],
      freeze: ["❄️", "تجميد", 170],
      wings: ["🪽", "أجنحة", 200],
    }).forEach(([k, v]) => {
      const c = document.createElement("div");
      c.className = "card";
      c.innerHTML = `<div class="emoji">${v[0]}</div><h3>${v[1]}</h3><p>تملكين: ${D.boosts[k] || 0}</p><button>شراء 🪙 ${v[2]}</button>`;
      c.querySelector("button").onclick = () => {
        if (D.coins < v[2]) return toast("العملات لا تكفي");
        D.coins -= v[2];
        D.boosts[k] = (D.boosts[k] || 0) + 1;
        save();
        buildShop();
        tone(850);
      };
      out.appendChild(c);
    });
  }
  SKINS.forEach((e, i) => {
    const owned = D.skins.includes(i),
      c = document.createElement("div");
    c.className = "card " + (D.skin === i ? "selected" : "");
    c.innerHTML = `<div class="emoji">${e}</div><h3>الشخصية ${i + 1}</h3><p>${owned ? "مملوكة" : "💎 " + (i + 1)}</p><button>${D.skin === i ? "مختارة" : owned ? "اختيار" : "فتح"}</button>`;
    c.querySelector("button").disabled = D.skin === i;
    c.querySelector("button").onclick = () => {
      if (!owned) {
        if (D.gems < i + 1) return toast("الجواهر لا تكفي");
        D.gems -= i + 1;
        D.skins.push(i);
      }
      D.skin = i;
      save();
      buildShop();
      tone(900);
    };
    out.appendChild(c);
  });
  $("shopStats").textContent = `🪙 ${D.coins} · 💎 ${D.gems}`;
  screen("shop");
}
function buildGallery() {
  const out = $("galleryGrid");
  out.innerHTML = "";
  PRIZE_ICONS.forEach((e, i) => {
    const c = document.createElement("div"),
      owned = D.prizes.includes(i);
    c.className = "card " + (!owned ? "locked" : "");
    c.innerHTML = `<div class="emoji">${owned ? e : "❓"}</div><h3>${owned ? "الجائزة " + (i + 1) : "جائزة مخفية"}</h3>`;
    out.appendChild(c);
  });
  $("galleryStats").textContent = `🏆 ${D.prizes.length}/60`;
  screen("gallery");
}
function buildPowers() {
  const p = $("powers");
  if (!p) return;
  p.innerHTML = "";
  if (MODE === "jump") return;
  for (const [k, e] of Object.entries({
    shield: "🛡️",
    magnet: "🧲",
    freeze: "❄️",
    wings: "🪽",
  })) {
    const b = document.createElement("button");
    b.className = "power";
    b.innerHTML = `${e}<b>${D.boosts[k] || 0}</b>`;
    b.onclick = () => usePower(k);
    p.appendChild(b);
  }
}
function usePower(k) {
  if (!G || state !== "play" || !D.boosts[k])
    return toast("لا تملكين هذه القدرة");
  if (k === "shield") G.shield = true;
  else G[k] = k === "freeze" ? 7 : 12;
  D.boosts[k]--;
  save();
  buildPowers();
  tone(700);
  toast("تم تفعيل القدرة");
}

function start(n) {
  closeModal();
  screen("play");
  buildPowers();
  G =
    MODE === "kingdom"
      ? makeKingdom(n)
      : MODE === "jump"
        ? makeJump(n)
        : MODE === "gates"
          ? makeMaze(n)
          : makeLastLight();
  refresh();
}
function base(n) {
  return {
    n,
    wi: Math.min(5, Math.floor((n - 1) / 20)),
    W: innerWidth,
    H: innerHeight,
    t: 0,
    hearts: 3,
    coins: 0,
    got: 0,
    shield: false,
    magnet: 0,
    freeze: 0,
    wings: 0,
    done: false,
  };
}
function makeKingdom(n) {
  const g = base(n),
    r = rng(n * 9013),
    floor = Math.max(330, g.H - 105);
  g.kind = "kingdom";
  g.time = 75 + n * 0.35;
  g.width = 1800 + n * 24;
  g.plats = [{ x: -50, y: floor, w: 350, h: 200 }];
  let x = 280,
    y = floor;
  while (x < g.width - 400) {
    const gap = rnd(r, 65, 115 + Math.min(45, n * 0.25)),
      w = rnd(r, 110, 205);
    y = clamp(y + rnd(r, -80, 65), 170, floor);
    g.plats.push({ x: x + gap, y, w, h: 20, m: r() < 0.12, ph: r() * 6.28 });
    x += gap + w;
  }
  g.plats.push({ x: g.width - 330, y: floor, w: 380, h: 200 });
  g.items = [0.24, 0.52, 0.82].map((q, i) => ({
    x: g.width * q,
    y: 120 + r() * 180,
    e: ["⭐", "💎", "👑"][i],
    got: false,
  }));
  g.coinsA = Array.from({ length: 25 }, (_, i) => ({
    x: 250 + (i * (g.width - 500)) / 24,
    y: floor - 90 - r() * 120,
    got: false,
  }));
  g.enemies = Array.from({ length: Math.min(8, (2 + n / 15) | 0) }, (_, i) => ({
    x: 500 + (i * (g.width - 800)) / Math.min(8, (2 + n / 15) | 0),
    y: floor - 34,
    v: (r() < 0.5 ? -1 : 1) * (45 + n * 0.4),
    alive: true,
  }));
  g.p = { x: 70, y: floor - 44, vx: 0, vy: 0, w: 34, h: 44, on: false, air: 1 };
  g.goal = { x: g.width - 150, y: floor - 58, w: 60, h: 58 };
  g.cam = 0;
  return g;
}
function makeJump(n) {
  const g = base(n),
    r = rng(n * 9301),
    floor = g.H - 90;
  g.kind = "jump";
  g.height = 2100 + n * 22;
  g.plats = [{ x: g.W / 2, y: floor, w: 190, type: 0 }];
  let y = floor,
    x = g.W / 2;
  while (y > floor - g.height) {
    y -= rnd(r, 75, 120 + Math.min(35, n * 0.2));
    x = clamp(x + rnd(r, -145, 145), 60, g.W - 60);
    g.plats.push({
      x,
      y,
      w: rnd(r, 65, 110),
      type: r() < 0.1 ? 1 : r() < 0.18 ? 2 : 0,
      ph: r() * 6.28,
    });
  }
  g.key = { ...g.plats[(g.plats.length * 0.42) | 0], got: false };
  g.chest = { ...g.plats[(g.plats.length * 0.72) | 0], got: false };
  g.portal = { x: g.plats.at(-1).x, y: g.plats.at(-1).y - 65 };
  g.coinsA = g.plats
    .filter((_, i) => i % 2)
    .map((p) => ({ x: p.x, y: p.y - 35, got: false }));
  g.p = { x: g.W / 2, y: floor - 40, vx: 0, vy: -580, w: 34, h: 40 };
  g.cam = 0;
  return g;
}
function mazeGrid(s, r) {
  const a = Array(s * s).fill(1),
    st = [[1, 1]],
    ds = [
      [2, 0],
      [-2, 0],
      [0, 2],
      [0, -2],
    ];
  a[s + 1] = 0;
  while (st.length) {
    const [x, y] = st.at(-1),
      op = ds.filter(
        (d) =>
          x + d[0] > 0 &&
          y + d[1] > 0 &&
          x + d[0] < s - 1 &&
          y + d[1] < s - 1 &&
          a[(y + d[1]) * s + x + d[0]],
      );
    if (!op.length) {
      st.pop();
      continue;
    }
    const d = op[(r() * op.length) | 0];
    a[(y + d[1] / 2) * s + x + d[0] / 2] = a[(y + d[1]) * s + x + d[0]] = 0;
    st.push([x + d[0], y + d[1]]);
  }
  return a;
}
function makeMaze(n) {
  const g = base(n),
    r = rng(n * 7919),
    s = Math.min(19, 9 + 2 * ((n / 18) | 0));
  g.kind = "gates";
  g.s = s;
  g.grid = mazeGrid(s, r);
  g.p = { x: 1, y: 1 };
  g.goal = { x: s - 2, y: s - 2 };
  const cells = [];
  for (let y = 1; y < s - 1; y++)
    for (let x = 1; x < s - 1; x++)
      if (!g.grid[y * s + x] && (x !== 1 || y !== 1)) cells.push({ x, y });
  cells.sort(() => r() - 0.5);
  g.items = cells
    .splice(0, Math.min(8, (3 + n / 20) | 0))
    .map((x) => ({ ...x, got: false, e: "💎" }));
  g.coinsA = cells.splice(0, 6).map((x) => ({ ...x, got: false }));
  g.enemies = cells
    .splice(0, Math.min(5, (1 + n / 25) | 0))
    .map((x) => ({ ...x, t: 0 }));
  g.move = 0;
  g.time = 0;
  return g;
}
function makeLastLight() {
  const g = base(1);
  g.kind = "lastlight";
  g.sun = {
    x: innerWidth / 2,
    y: innerHeight * 0.55,
    tx: innerWidth / 2,
    ty: innerHeight * 0.55,
  };
  g.moons = [
    { a: 0, d: 75, x: 0, y: 0, c: "#ffd98a" },
    { a: Math.PI, d: 125, x: 0, y: 0, c: "#8be9ff" },
  ];
  g.drops = [];
  g.thorns = [];
  g.score = 0;
  g.combo = 0;
  g.comboT = 0;
  g.meter = 0;
  g.spawnD = 0.1;
  g.spawnT = 2.5;
  g.best = D.best || 0;
  g.time = 0;
  return g;
}

function refresh() {
  if (!G) return;
  if (G.kind === "lastlight") {
    $("levelChip").textContent = [
      "الظلام الأعظم",
      "ولادة النجوم",
      "استيقاظ السدم",
      "دوران المجرات",
      "تكوّن الكواكب",
      "اخضرار الأفق",
      "الكون الحي",
    ][Math.min(6, (G.score / 35) | 0)];
    $("coinChip").textContent = `✦ ${G.score}`;
    $("starChip").textContent =
      `توليفة ×${Math.min(5, 1 + ((G.combo / 5) | 0))}`;
    $("heartChip").textContent =
      "❤️".repeat(G.hearts) + "🖤".repeat(3 - G.hearts);
    $("nova")?.classList.toggle("ready", G.meter >= 1);
    return;
  }
  $("levelChip").textContent = `مستوى ${G.n}`;
  if ($("worldChip"))
    $("worldChip").textContent = `${WORLDS[G.wi].i} ${WORLDS[G.wi].n}`;
  $("coinChip").textContent = `🪙 ${D.coins}`;
  $("heartChip").textContent =
    "❤️".repeat(G.hearts) + "🖤".repeat(3 - G.hearts);
  if ($("timeChip"))
    $("timeChip").textContent =
      G.kind === "gates" ? `⏱ ${G.time | 0}` : `⏱ ${Math.max(0, G.time | 0)}`;
  $("starChip").textContent =
    G.kind === "jump"
      ? `${G.key.got ? "🔑" : "🔒"} ${G.chest.got ? "🎁" : ""}`
      : `⭐ ${G.got}/3`;
  if ($("progress") && G.kind === "jump")
    $("progress").style.width = clamp((-G.p.y / G.height) * 100, 0, 100) + "%";
}
function hit() {
  if (G.shield) {
    G.shield = false;
    return toast("الدرع حماك");
  }
  if (G.inv > 0) return;
  G.hearts--;
  G.inv = 1.5;
  tone(170, 0.2);
  if (!G.hearts) return lose();
  if (G.kind === "kingdom") {
    G.p.x = Math.max(60, G.p.x - 180);
    G.p.y = G.H - 180;
  } else if (G.kind === "jump") {
    G.p.y -= 120;
    G.p.vy = -450;
  } else {
    G.p = { x: 1, y: 1 };
  }
  refresh();
}
function lose() {
  if (G.kind === "lastlight") {
    state = "lost";
    D.best = Math.max(D.best || 0, G.score);
    save();
    modal(
      "انطفأ الضوء الأخير",
      `<p>جمعتِ ✦ ${G.score} من الضوء<br>أفضل نتيجة: ${D.best}</p>`,
      [
        { a: "retry", t: "أشعليها من جديد" },
        { a: "home", t: "القائمة" },
      ],
    );
    return;
  }
  state = "lost";
  modal("انتهت القلوب", "<p>حاولي مرة أخرى، فكل محاولة تقرّبك من الكنز.</p>", [
    { a: "retry", t: "إعادة المستوى" },
    { a: "map", t: "الخريطة" },
  ]);
}
function win() {
  if (G.done) return;
  G.done = true;
  state = "won";
  const s =
    G.kind === "gates"
      ? G.time < 40
        ? 3
        : G.time < 75
          ? 2
          : 1
      : Math.max(1, Math.min(3, G.got));
  D.stars[G.n] = Math.max(D.stars[G.n] || 0, s);
  D.unlocked = Math.max(D.unlocked, Math.min(TOTAL, G.n + 1));
  const reward = 50 + s * 40 + G.coins;
  D.coins += reward;
  if (MODE === "gates" && G.n % 5 === 0) D.spins++;
  save();
  tone(1000, 0.35);
  modal(
    "مستوى مكتمل!",
    `<div class="big-stars">${"⭐".repeat(s)}${"☆".repeat(3 - s)}</div><p>مكافأتك: 🪙 ${reward}</p>`,
    [
      { a: "next", t: G.n < TOTAL ? "المستوى التالي" : "العودة للخريطة" },
      { a: "map", t: "الخريطة" },
    ],
  );
}

function update(dt) {
  if (!G || paused || state !== "play") return;
  G.t += dt;
  if (G.inv > 0) G.inv -= dt;
  if (G.magnet > 0) G.magnet -= dt;
  if (G.freeze > 0) G.freeze -= dt;
  if (G.wings > 0) G.wings -= dt;
  if (G.kind === "kingdom") updateKingdom(dt);
  else if (G.kind === "jump") updateJump(dt);
  else if (G.kind === "gates") updateMaze(dt);
  else updateLastLight(dt);
  refresh();
}
function updateLastLight(dt) {
  const s = G.sun;
  s.x += (s.tx - s.x) * Math.min(1, dt * 7);
  s.y += (s.ty - s.y) * Math.min(1, dt * 7);
  G.time += dt;
  if (G.comboT > 0) {
    G.comboT -= dt;
    if (G.comboT <= 0) G.combo = 0;
  }
  for (const m of G.moons) {
    m.a += (m.d < 100 ? 1.8 : -1.2) * dt;
    m.x = s.x + Math.cos(m.a) * m.d;
    m.y = s.y + Math.sin(m.a) * m.d;
  }
  G.spawnD -= dt;
  if (G.spawnD <= 0 && G.drops.length < 16) {
    G.drops.push({
      x: 40 + Math.random() * (innerWidth - 80),
      y: 70 + Math.random() * (innerHeight - 130),
      v: Math.random() < 0.15 ? 3 : 1,
      p: Math.random() * 6.28,
    });
    G.spawnD = 0.65 + Math.random() * 0.7;
  }
  for (let i = G.drops.length - 1; i >= 0; i--) {
    const d = G.drops[i];
    for (const m of G.moons)
      if (Math.hypot(d.x - m.x, d.y - m.y) < 20) {
        G.drops.splice(i, 1);
        G.combo++;
        G.comboT = 2.6;
        const mul = Math.min(5, 1 + ((G.combo / 5) | 0));
        G.score += d.v * mul;
        G.meter = Math.min(1, G.meter + 0.09 * d.v);
        tone(850 + d.v * 100);
        break;
      }
  }
  G.spawnT -= dt;
  if (G.spawnT <= 0) {
    const side = (Math.random() * 4) | 0,
      x =
        side === 0
          ? -25
          : side === 1
            ? innerWidth + 25
            : Math.random() * innerWidth,
      y =
        side === 2
          ? -25
          : side === 3
            ? innerHeight + 25
            : Math.random() * innerHeight;
    G.thorns.push({ x, y, v: 55 + Math.min(100, G.time), r: 12 });
    G.spawnT = Math.max(0.65, 2.2 - G.time / 70);
  }
  for (let i = G.thorns.length - 1; i >= 0; i--) {
    const t = G.thorns[i],
      a = Math.atan2(s.y - t.y, s.x - t.x);
    t.x += Math.cos(a) * t.v * dt;
    t.y += Math.sin(a) * t.v * dt;
    if (
      Math.hypot(t.x - s.x, t.y - s.y) < 28 ||
      G.moons.some((m) => Math.hypot(t.x - m.x, t.y - m.y) < 20)
    ) {
      G.thorns.splice(i, 1);
      G.combo = 0;
      hit();
    }
  }
}
function updateKingdom(dt) {
  const p = G.p,
    floor = G.H - 105;
  G.time -= dt;
  if (G.time <= 0) return lose();
  const d = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  p.vx += d * 900 * dt;
  p.vx *= d ? 0.96 : 0.82;
  p.vx = clamp(p.vx, -310, 310);
  if (keys.jump && !keys._j && (p.on || p.air)) {
    p.vy = -600;
    p.air = p.on ? 1 : 0;
    p.on = false;
    tone(420);
  }
  keys._j = keys.jump;
  p.vy += 1450 * dt;
  p.x += p.vx * dt;
  const old = p.y;
  p.y += p.vy * dt;
  p.on = false;
  for (const q of G.plats) {
    if (q.m) q.y += Math.sin(G.t * 2 + q.ph) * 0.25;
    if (
      p.vy >= 0 &&
      old + p.h <= q.y + 8 &&
      p.y + p.h >= q.y &&
      p.x + p.w > q.x &&
      p.x < q.x + q.w
    ) {
      p.y = q.y - p.h;
      p.vy = 0;
      p.on = true;
    }
  }
  if (p.y > G.H + 80) {
    p.x = Math.max(60, p.x - 220);
    p.y = floor - 120;
    hit();
  }
  for (const c of G.coinsA)
    if (!c.got && Math.hypot(p.x - c.x, p.y - c.y) < 35) {
      c.got = true;
      G.coins += 2;
      tone(850);
    }
  for (const a of G.items)
    if (!a.got && Math.hypot(p.x - a.x, p.y - a.y) < 45) {
      a.got = true;
      G.got++;
      tone(950);
    }
  for (const e of G.enemies)
    if (e.alive) {
      if (!G.freeze) e.x += e.v * dt;
      if (Math.abs(p.x - e.x) < 35 && Math.abs(p.y - e.y) < 45) {
        if (p.vy > 100) {
          e.alive = false;
          p.vy = -380;
          G.coins += 10;
        } else hit();
      }
    }
  if (p.x > G.goal.x) {
    if (G.got < 3) {
      toast("اجمعي الكنوز الثلاثة أولًا");
      p.x -= 70;
    } else win();
  }
  G.cam = clamp(p.x - innerWidth * 0.35, 0, G.width - innerWidth);
}
function updateJump(dt) {
  const p = G.p;
  const d = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  p.vx += d * 1200 * dt;
  p.vx *= d ? 0.96 : 0.88;
  p.vx = clamp(p.vx, -260, 260);
  p.vy += 1250 * dt;
  const old = p.y;
  p.x += p.vx * dt;
  p.y += p.vy * dt;
  if (p.x < -25) p.x = innerWidth + 10;
  if (p.x > innerWidth + 25) p.x = -10;
  for (const q of G.plats)
    if (
      p.vy > 0 &&
      old + p.h <= q.y + 7 &&
      p.y + p.h >= q.y &&
      Math.abs(p.x - q.x) < q.w / 2 + 17
    ) {
      p.y = q.y - p.h;
      p.vy = q.type === 1 ? -850 : -650;
      if (q.type === 2) q.dead = true;
      tone(380);
    }
  G.plats = G.plats.filter((q) => !q.dead);
  for (const c of G.coinsA)
    if (!c.got && Math.hypot(p.x - c.x, p.y - c.y) < 30) {
      c.got = true;
      G.coins += 2;
      tone(850);
    }
  if (!G.key.got && Math.hypot(p.x - G.key.x, p.y - (G.key.y - 45)) < 40) {
    G.key.got = true;
    toast("حصلتِ على المفتاح");
    tone(980);
  }
  if (
    !G.chest.got &&
    Math.hypot(p.x - G.chest.x, p.y - (G.chest.y - 35)) < 45
  ) {
    if (!G.key.got) toast("الصندوق يحتاج مفتاحًا");
    else {
      G.chest.got = true;
      awardPrize();
    }
  }
  if (Math.hypot(p.x - G.portal.x, p.y - G.portal.y) < 55) {
    if (!G.chest.got) toast("افتحي صندوق الكنز أولًا");
    else win();
  }
  const target = p.y - innerHeight * 0.55;
  if (target < G.cam) G.cam += (target - G.cam) * Math.min(1, dt * 6);
  if (p.y - G.cam > innerHeight + 80) {
    p.y = G.cam + innerHeight * 0.35;
    p.vy = -550;
    hit();
  }
  G.got = (G.key.got ? 1 : 0) + (G.chest.got ? 2 : 0);
}
function updateMaze(dt) {
  G.time += dt;
  G.move -= dt;
  if (G.move <= 0) {
    const dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0),
      dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
    if (dx || dy) {
      const nx = G.p.x + (dx || 0),
        ny = G.p.y + (dx ? 0 : dy);
      if (!G.grid[ny * G.s + nx]) {
        G.p.x = nx;
        G.p.y = ny;
        G.move = 0.12;
        tone(320, 0.03);
      }
    }
  }
  for (const a of G.items)
    if (!a.got && a.x === G.p.x && a.y === G.p.y) {
      a.got = true;
      G.got++;
      tone(900);
    }
  for (const c of G.coinsA)
    if (!c.got && c.x === G.p.x && c.y === G.p.y) {
      c.got = true;
      G.coins += 5;
      tone(800);
    }
  if (!G.freeze && Math.floor(G.t * 2) !== Math.floor((G.t - dt) * 2))
    for (const e of G.enemies) {
      const op = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ].filter((d) => !G.grid[(e.y + d[1]) * G.s + e.x + d[0]]),
        d = op[(Math.random() * op.length) | 0];
      if (d) {
        e.x += d[0];
        e.y += d[1];
      }
    }
  for (const e of G.enemies) if (e.x === G.p.x && e.y === G.p.y) hit();
  if (G.p.x === G.goal.x && G.p.y === G.goal.y) {
    if (G.got < G.items.length) toast("اجمعي كل الجواهر لفتح البوابة");
    else win();
  }
}
function awardPrize() {
  G.chest.got = true;
  const id = (Math.random() * 60) | 0,
    isNew = !D.prizes.includes(id);
  if (isNew) D.prizes.push(id);
  else D.coins += 35;
  save();
  toast(isNew ? `جائزة جديدة ${PRIZE_ICONS[id]}` : "جائزة مكررة: +٣٥ عملة");
  tone(1100, 0.25);
}

function render() {
  ctx.setTransform(
    devicePixelRatio > 2 ? 2 : devicePixelRatio || 1,
    0,
    0,
    devicePixelRatio > 2 ? 2 : devicePixelRatio || 1,
    0,
    0,
  );
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  if (!G) return;
  if (G.kind === "lastlight") {
    drawLastLight();
    return;
  }
  const w = WORLDS[G.wi],
    gr = ctx.createLinearGradient(0, 0, 0, innerHeight);
  gr.addColorStop(0, w.sky[0]);
  gr.addColorStop(1, w.sky[1]);
  ctx.fillStyle = gr;
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  if (G.kind === "kingdom") drawKingdom(w);
  else if (G.kind === "jump") drawJump(w);
  else drawMaze(w);
}
function drawLastLight() {
  const grad = ctx.createRadialGradient(
    G.sun.x,
    G.sun.y,
    10,
    G.sun.x,
    G.sun.y,
    Math.max(innerWidth, innerHeight),
  );
  grad.addColorStop(0, "#251547");
  grad.addColorStop(1, "#050310");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, innerWidth, innerHeight);
  ctx.fillStyle = "#fff";
  for (let i = 0; i < 120; i++) {
    ctx.globalAlpha = 0.15 + 0.35 * Math.abs(Math.sin(G.t + i));
    ctx.fillRect((i * 137) % innerWidth, (i * 83) % innerHeight, 1.5, 1.5);
  }
  ctx.globalAlpha = 1;
  for (const d of G.drops) emo(d.v > 1 ? "✦" : "·", d.x, d.y, 18 + d.v * 3);
  for (const t of G.thorns) {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate(G.t * 2);
    ctx.fillStyle = "#13081e";
    ctx.strokeStyle = "#ff527d";
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8,
        r = i % 2 ? t.r * 0.55 : t.r;
      ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  for (const m of G.moons) {
    ctx.fillStyle = m.c;
    ctx.shadowColor = m.c;
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(m.x, m.y, m.d < 100 ? 9 : 7, 0, 7);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  const s = G.sun,
    g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 75);
  g.addColorStop(0, "#fffce5");
  g.addColorStop(0.25, "#ffd27d");
  g.addColorStop(1, "#ff9d4d00");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(s.x, s.y, 75, 0, 7);
  ctx.fill();
  ctx.fillStyle = "#fffbe8";
  ctx.beginPath();
  ctx.arc(s.x, s.y, 16, 0, 7);
  ctx.fill();
  if (G.meter >= 1) {
    ctx.strokeStyle = "#ffd98a";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 28 + Math.sin(G.t * 6) * 4, 0, 7);
    ctx.stroke();
  }
}
function emo(e, x, y, s) {
  ctx.font = `${s}px Apple Color Emoji,Segoe UI Emoji,sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(e, x, y);
}
function drawKingdom(w) {
  ctx.save();
  ctx.translate(-G.cam, 0);
  for (const p of G.plats) {
    ctx.fillStyle = w.body;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = w.top;
    ctx.fillRect(p.x, p.y - 6, p.w, 14);
  }
  for (const c of G.coinsA) if (!c.got) emo("🪙", c.x, c.y, 24);
  for (const a of G.items) if (!a.got) emo(a.e, a.x, a.y, 34);
  for (const e of G.enemies) if (e.alive) emo(w.enemy, e.x, e.y, 34);
  emo("🎁", G.goal.x, G.goal.y, 52);
  emo(SKINS[D.skin], G.p.x + 17, G.p.y + 20, 44);
  ctx.restore();
}
function drawJump(w) {
  ctx.save();
  ctx.translate(0, -G.cam);
  for (const p of G.plats) {
    ctx.fillStyle = p.type === 1 ? "#ff6fa5" : w.top;
    ctx.fillRect(p.x - p.w / 2, p.y, p.w, 13);
  }
  for (const c of G.coinsA) if (!c.got) emo("🪙", c.x, c.y, 22);
  if (!G.key.got) emo("🔑", G.key.x, G.key.y - 45, 30);
  if (!G.chest.got) emo("🎁", G.chest.x, G.chest.y - 35, 38);
  emo("🌀", G.portal.x, G.portal.y, 54);
  emo(SKINS[D.skin], G.p.x, G.p.y + 20, 42);
  ctx.restore();
}
function drawMaze(w) {
  const size = Math.min(innerWidth - 20, innerHeight - 110),
    c = size / G.s,
    ox = (innerWidth - size) / 2,
    oy = 80 + (innerHeight - 90 - size) / 2;
  for (let y = 0; y < G.s; y++)
    for (let x = 0; x < G.s; x++) {
      ctx.fillStyle = G.grid[y * G.s + x] ? w.body : "#100b25";
      ctx.fillRect(ox + x * c, oy + y * c, c + 1, c + 1);
    }
  for (const a of G.items)
    if (!a.got) emo("💎", ox + (a.x + 0.5) * c, oy + (a.y + 0.5) * c, c * 0.65);
  for (const a of G.coinsA)
    if (!a.got) emo("🪙", ox + (a.x + 0.5) * c, oy + (a.y + 0.5) * c, c * 0.55);
  for (const e of G.enemies)
    emo(
      G.freeze ? "🧊" : w.enemy,
      ox + (e.x + 0.5) * c,
      oy + (e.y + 0.5) * c,
      c * 0.7,
    );
  emo(
    G.got === G.items.length ? "🌀" : "🔒",
    ox + (G.goal.x + 0.5) * c,
    oy + (G.goal.y + 0.5) * c,
    c * 0.75,
  );
  emo(SKINS[D.skin], ox + (G.p.x + 0.5) * c, oy + (G.p.y + 0.5) * c, c * 0.8);
}

function showWheel() {
  modal(
    "عجلة الجوائز",
    `<div class="wheel">🎁</div><p>لديك ${D.spins} دورة.</p>`,
    [
      { a: "spin", t: "أدر العجلة" },
      { a: "close", t: "إغلاق" },
    ],
  );
}
function spin() {
  if (!D.spins) return toast("لا توجد دورات متاحة");
  D.spins--;
  const el = document.querySelector(".wheel");
  el.classList.add("spin");
  setTimeout(() => {
    const r = Math.random();
    if (r < 0.4) D.coins += 100;
    else if (r < 0.7) D.gems += 2;
    else D.boosts.shield++;
    save();
    tone(1100, 0.3);
    showWheel();
    toast("وصلت الجائزة إلى رصيدك");
  }, 2400);
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-act]")?.dataset.act;
  if (a === "continue") start(Math.min(D.unlocked, TOTAL));
  if (a === "map") buildMap();
  if (a === "menu") {
    closeModal();
    screen("menu");
  }
  if (a === "shop") buildShop();
  if (a === "gallery") buildGallery();
  if (a === "pause" && state === "play") {
    paused = true;
    modal("استراحة", "<p>التقدّم الحالي متوقف مؤقتًا.</p>", [
      { a: "resume", t: "متابعة" },
      { a: "retry", t: "إعادة" },
      { a: "map", t: "الخريطة" },
    ]);
  }
  if (a === "wheel") showWheel();
});
$("modalBtns").addEventListener("click", (e) => {
  const a = e.target.dataset.modal;
  if (!a) return;
  if (a === "resume") {
    paused = false;
    closeModal();
  }
  if (a === "retry") start(G.n);
  if (a === "map") buildMap();
  if (a === "next") G.n < TOTAL ? start(G.n + 1) : buildMap();
  if (a === "close") closeModal();
  if (a === "spin") spin();
  if (a === "home") {
    closeModal();
    screen("menu");
  }
});
const keyMap = {
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  ArrowUp: "up",
  KeyW: "up",
  ArrowDown: "down",
  KeyS: "down",
  Space: "jump",
};
addEventListener("keydown", (e) => {
  if (keyMap[e.code]) {
    keys[keyMap[e.code]] = true;
    e.preventDefault();
  }
});
addEventListener("keyup", (e) => {
  if (keyMap[e.code]) keys[keyMap[e.code]] = false;
});
document.querySelectorAll("[data-key]").forEach((b) => {
  const k = b.dataset.key;
  b.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    keys[k] = true;
    b.setPointerCapture?.(e.pointerId);
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((x) =>
    b.addEventListener(x, () => (keys[k] = false)),
  );
});
if (MODE === "lastlight") {
  cv.addEventListener("pointerdown", (e) => {
    if (G && state === "play") {
      G.sun.tx = e.clientX;
      G.sun.ty = e.clientY;
    }
  });
  cv.addEventListener("pointermove", (e) => {
    if (G && state === "play" && (e.pointerType === "mouse" || e.buttons)) {
      G.sun.tx = e.clientX;
      G.sun.ty = e.clientY;
    }
  });
  $("nova").onclick = () => {
    if (!G || state !== "play" || G.meter < 1) return toast("اجمعي ضوءًا أكثر");
    G.meter = 0;
    G.thorns = [];
    tone(1100, 0.3);
    toast("نبضة النور ✦");
  };
}
function loop(t) {
  const dt = Math.min(0.033, (t - last) / 1000);
  last = t;
  update(dt);
  render();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
