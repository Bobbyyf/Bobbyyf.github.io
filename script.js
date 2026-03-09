// Bobby's Portfolio — TempleOS Edition
// Background animation: flying symbols & dithered noise (black bg, high contrast)

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

const COLORS = ['#FFFF55', '#55FF55', '#55FFFF', '#FF55FF', '#FF5555', '#FF8800', '#55FF88', '#FFAAFF', '#88FFFF', '#FFFF00'];
const GLYPHS = '†‡✝☩♱◆◇■□▲△▼▽★☆═║╔╗╚╝╠╣╦╩✟₊×+~@#%&';

let w, h;
const symbols = [];
const noisePixels = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

function randColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function randGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

// Flying symbols
for (let i = 0; i < 60; i++) {
  symbols.push({
    x: Math.random() * 2000,
    y: Math.random() * 4000,
    speed: 0.2 + Math.random() * 1.2,
    glyph: randGlyph(),
    color: randColor(),
    size: 12 + Math.floor(Math.random() * 22),
    drift: (Math.random() - 0.5) * 0.5,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.01 + Math.random() * 0.04
  });
}

// Noise pixels
for (let i = 0; i < 250; i++) {
  noisePixels.push({
    x: Math.random() * 2000,
    y: Math.random() * 4000,
    timer: Math.random() * 100,
    rate: 20 + Math.random() * 80,
    size: 1 + Math.floor(Math.random() * 3)
  });
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // Noise
  for (const p of noisePixels) {
    p.timer++;
    if (p.timer > p.rate) {
      p.x = Math.random() * w;
      p.y = Math.random() * h;
      p.timer = 0;
    }
    ctx.fillStyle = randColor();
    ctx.globalAlpha = 0.4;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  }

  // Symbols with glow
  for (const s of symbols) {
    s.y -= s.speed;
    s.x += s.drift;
    s.pulse += s.pulseSpeed;

    if (s.y < -30) {
      s.y = h + 30;
      s.x = Math.random() * w;
      s.glyph = randGlyph();
      s.color = randColor();
    }
    if (s.x < -30) s.x = w + 30;
    if (s.x > w + 30) s.x = -30;

    const alpha = 0.4 + Math.sin(s.pulse) * 0.2;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = s.color;
    ctx.shadowColor = s.color;
    ctx.shadowBlur = 10;
    ctx.font = s.size + 'px "IBM Plex Mono", monospace';
    ctx.fillText(s.glyph, s.x, s.y);
  }

  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1.0;
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();