// —— CONFETI Y CORAZONES ——
const canvas = document.getElementById('magic-canvas');
const ctx = canvas.getContext('2d');
let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
  constructor(x, y, vx, vy, size, color, shape) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.size = size;
    this.color = color;
    this.shape = shape; // 'circle' | 'heart'
    this.alpha = 1;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (this.shape === 'heart') {
      const s = this.size / 2;
      ctx.moveTo(this.x, this.y);
      ctx.bezierCurveTo(this.x, this.y - s, this.x - s, this.y - s, this.x - s, this.y);
      ctx.bezierCurveTo(this.x - s, this.y + s, this.x, this.y + s*1.5, this.x, this.y + s*2);
      ctx.bezierCurveTo(this.x, this.y + s*1.5, this.x + s, this.y + s, this.x + s, this.y);
      ctx.bezierCurveTo(this.x + s, this.y - s, this.x, this.y - s, this.x, this.y);
      ctx.fill();
    } else {
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;
  }
}

const particles = [];
const colors = ['#ff6ec4','#7873f5','#4ade80','#facc15','#ff4081'];

function emit() {
  const count = 3;
  for (let i = 0; i < count; i++) {
    const x = Math.random() * W;
    const y = H + 10;
    const angle = Math.random() * Math.PI - Math.PI/2;
    const speed = Math.random() * 2 + 1;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed * -1.2;
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random()*colors.length)];
    const shape = Math.random() < 0.3 ? 'heart' : 'circle';
    particles.push(new Particle(x, y, vx, vy, size, color, shape));
  }
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  if (particles.length < 400 && Math.random() < 0.3) emit();
  particles.forEach((p, i) => {
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(loop);
}
loop();

// —— FRASES ROMÁNTICAS ——
const frases = [
  "Eres mi niña hermosa y la adoro.",
  "Cada día a tu lado es pura magia.",
  "Te amo más que a nada en el mundo.",
  "Mi corazón late por ti, mi niña linda.",
  "Juntos siempre saldremos adelante.",
  "Eres lo mejor que me ha pasado."
];
const btn = document.getElementById('showPhrase');
const box = document.getElementById('phraseBox');

btn.addEventListener('click', () => {
  const f = frases[Math.floor(Math.random() * frases.length)];
  box.textContent = f;
  box.style.opacity = 1;
});
