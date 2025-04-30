// —— CANVAS DE PARTICULAS ——
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
    this.shape = shape; // 'circle' | 'heart' | 'flower'
    this.alpha = 1;
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    if (this.shape === 'flower') {
      ctx.font = `${this.size * 1.8}px serif`;
      ctx.fillStyle = this.color;
      ctx.fillText('🌸', this.x, this.y);
    } else if (this.shape === 'heart') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      const x = this.x, y = this.y, s = this.size;
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - s, x - s, y - s, x - s, y);
      ctx.bezierCurveTo(x - s, y + s, x, y + s*1.5, x, y + s*1.8);
      ctx.bezierCurveTo(x, y + s*1.5, x + s, y + s, x + s, y);
      ctx.bezierCurveTo(x + s, y - s, x, y - s, x, y);
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.02;
  }
}

const particles = [];
const colors = ['#ff6ec4','#7873f5','#4ade80','#facc15','#ff4081'];

function emitAt(x, y, count = 8) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    const size = Math.random() * 6 + 4;
    const color = colors[Math.floor(Math.random()*colors.length)];
    const r = Math.random();
    const shape = r < 0.4 ? 'flower'
                  : r < 0.7 ? 'heart' : 'circle';
    particles.push(new Particle(x, y, vx, vy, size, color, shape));
  }
}

function loop() {
  ctx.clearRect(0, 0, W, H);
  // partículas de fondo aleatorias
  if (particles.length < 600 && Math.random() < 0.2) {
    emitAt(Math.random() * W, H + 20, 3);
  }
  particles.forEach((p,i) => {
    p.draw();
    if (p.alpha <= 0) particles.splice(i,1);
  });
  requestAnimationFrame(loop);
}
loop();

// —— JUEGO DE FRASES ——
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

// Explosión también al tocar cualquier parte
document.addEventListener('click', e => emitAt(e.clientX, e.clientY, 10));
document.addEventListener('touchstart', e => {
  const t = e.touches[0];
  emitAt(t.clientX, t.clientY, 10);
}, {passive:true});

// Solo mostrar frase al flor
btn.addEventListener('click', e => {
  emitAt(
    e.clientX, e.clientY, 
    20
  );
  const f = frases[Math.floor(Math.random() * frases.length)];
  box.textContent = f;
  box.style.opacity = 1;
});
