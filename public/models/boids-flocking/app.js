const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resetBtn = document.getElementById('reset');
const toggleBtn = document.getElementById('toggle');
const countInput = document.getElementById('count');
const countLabel = document.getElementById('countLabel');
const separationInput = document.getElementById('separation');
const alignmentInput = document.getElementById('alignment');
const cohesionInput = document.getElementById('cohesion');
const sepLabel = document.getElementById('sepLabel');
const aliLabel = document.getElementById('aliLabel');
const cohLabel = document.getElementById('cohLabel');

const settings = { width: 1000, height: 600, boidsCount: 120, maxSpeed: 3.2, maxForce: 0.05, perception: 45 };
canvas.width = settings.width;
canvas.height = settings.height;
let paused = false;

class Boid { constructor(x, y) { this.x = x; this.y = y; this.vx = (Math.random() -0.5)*4; this.vy = (Math.random()-0.5)*4; this.ax = 0; this.ay = 0; }
  update() { this.vx += this.ax; this.vy += this.ay; const speed = Math.hypot(this.vx, this.vy); if(speed>settings.maxSpeed){ this.vx/=speed; this.vy/=speed; this.vx*=settings.maxSpeed; this.vy*=settings.maxSpeed; }
    this.x += this.vx; this.y += this.vy; this.ax = 0; this.ay = 0;
    if(this.x<0) this.x = settings.width; if(this.x>settings.width) this.x=0;
    if(this.y<0) this.y=settings.height; if(this.y>settings.height) this.y=0;
  }
  applyForce(fx, fy){ this.ax += fx; this.ay += fy; }
  draw(){ ctx.save(); ctx.translate(this.x,this.y); const angle = Math.atan2(this.vy,this.vx); ctx.rotate(angle); ctx.beginPath(); ctx.moveTo(8,0); ctx.lineTo(-4,3); ctx.lineTo(-4,-3); ctx.closePath(); ctx.fillStyle='#fff'; ctx.fill(); ctx.restore(); }
}

let boids = [];
function initBoids(count){ boids=[]; for(let i=0;i<count;i++){ boids.push(new Boid(Math.random()*settings.width,Math.random()*settings.height)); } countLabel.textContent=count; }

function flock(){ for(let i=0;i<boids.length;i++){ const b=boids[i]; let align={x:0,y:0}, coh={x:0,y:0}, sep={x:0,y:0}; let total=0;
    for(let j=0;j<boids.length;j++){ if(i===j) continue; const o=boids[j]; const dx=o.x-b.x; const dy=o.y-b.y; let d=Math.hypot(dx,dy); if(d<settings.perception){ align.x+=o.vx; align.y+=o.vy; coh.x+=o.x; coh.y+=o.y; sep.x += (b.x-o.x)/Math.max(d,1); sep.y += (b.y-o.y)/Math.max(d,1); total++; } }
    if(total>0){ align.x/=total; align.y/=total; let mag=Math.hypot(align.x,align.y); if(mag>0){ align.x/=mag; align.y/=mag; align.x*=settings.maxSpeed; align.y*=settings.maxSpeed; align.x-=b.vx; align.y-=b.vy; }
      coh.x/=total; coh.y/=total; coh.x-=b.x; coh.y-=b.y; mag=Math.hypot(coh.x,coh.y); if(mag>0){ coh.x/=mag; coh.y/=mag; coh.x*=settings.maxSpeed; coh.y*=settings.maxSpeed; coh.x-=b.vx; coh.y-=b.vy; }
      sep.x/=total; sep.y/=total; mag=Math.hypot(sep.x,sep.y); if(mag>0){ sep.x/=mag; sep.y/=mag; sep.x*=settings.maxSpeed; sep.y*=settings.maxSpeed; sep.x-=b.vx; sep.y-=b.vy; }
      const sepWeight = parseFloat(separationInput.value);
      const aliWeight = parseFloat(alignmentInput.value);
      const cohWeight = parseFloat(cohesionInput.value);
      b.applyForce(align.x*aliWeight, align.y*aliWeight);
      b.applyForce(coh.x*cohWeight, coh.y*cohWeight);
      b.applyForce(sep.x*sepWeight, sep.y*sepWeight);
    }
  }
}

function render(){ ctx.fillStyle='rgba(4,10,30,0.2)'; ctx.fillRect(0,0,settings.width,settings.height); boids.forEach(b=>b.draw()); }

function loop(){ if(!paused){ flock(); boids.forEach(b=>b.update()); render(); } requestAnimationFrame(loop); }

countInput.addEventListener('input', (e)=>{ const v=parseInt(e.value,10); countLabel.textContent=v; });
separationInput.addEventListener('input', (e)=>{ sepLabel.textContent=parseFloat(e.value).toFixed(2); });
alignmentInput.addEventListener('input', (e)=>{ aliLabel.textContent=parseFloat(e.value).toFixed(2); });
cohesionInput.addEventListener('input', (e)=>{ cohLabel.textContent=parseFloat(e.value).toFixed(3); });
resetBtn.addEventListener('click', ()=>initBoids(parseInt(countInput.value,10)));
toggleBtn.addEventListener('click', ()=>{ paused=!paused; toggleBtn.textContent=paused?'继续':'暂停'; });

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const boid = new Boid(x, y);
  boids.push(boid);
  countInput.value = boids.length;
  countLabel.textContent = boids.length;
});

initBoids(settings.boidsCount); loop();