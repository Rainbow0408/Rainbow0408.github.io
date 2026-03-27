const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear');
const countInput = document.getElementById('count');
const countLabel = document.getElementById('countLabel');
const gravityInput = document.getElementById('gravity');
const gravityLabel = document.getElementById('gravityLabel');
const autoInput = document.getElementById('auto');
canvas.width=1000;
canvas.height=600;

let gravity = parseFloat(gravityInput.value);
let particleCount = parseInt(countInput.value, 10);

class Particle {
  constructor(x, y, vx, vy, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.alpha = 1;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += gravity;
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.alpha -= 0.015;
  }

  draw() {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

let particles = [];
function explode(x, y) {
  const hue = Math.floor(Math.random() * 360);
  for (let i = 0; i < particleCount; i++) {
    const speed = Math.random() * 5 + 1;
    const angle = Math.random() * Math.PI * 2;
    const p = new Particle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, `hsl(${hue},100%,60%)`);
    particles.push(p);
  }
}

function render(){ ctx.fillStyle='rgba(3,5,23,0.22)'; ctx.fillRect(0,0,canvas.width,canvas.height); particles.forEach(p=>p.draw()); }

function update(){ particles.forEach(p=>p.update()); particles=particles.filter(p=>p.alpha>0); }

canvas.addEventListener('click',(e)=>{ const rect=canvas.getBoundingClientRect(); explode(e.clientX-rect.left,e.clientY-rect.top); });
countInput.addEventListener('input', (e) => { particleCount = parseInt(e.target.value, 10); countLabel.textContent=particleCount; });
gravityInput.addEventListener('input', (e) => { gravity = parseFloat(e.target.value); gravityLabel.textContent=gravity.toFixed(2); });
clearBtn.addEventListener('click',()=>{ particles=[]; ctx.clearRect(0,0,canvas.width,canvas.height); });

let autoInterval = null;
autoInput.addEventListener('change', () => {
  if (autoInput.checked) {
    autoInterval = setInterval(() => { explode(Math.random() * canvas.width, Math.random() * canvas.height); }, 600);
  } else {
    clearInterval(autoInterval);
    autoInterval = null;
  }
});

function loop(){ update(); render(); requestAnimationFrame(loop); }
loop();