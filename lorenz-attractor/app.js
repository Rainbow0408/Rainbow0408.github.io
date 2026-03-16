const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width=1000;
canvas.height=600;
let sigma=10,rho=28,beta=8/3;
let x=0.1,y=0,z=0;
let paused=false;
const sigmaInput=document.getElementById('sigma');
const rhoInput=document.getElementById('rho');
const betaInput=document.getElementById('beta');
const sigmaLabel=document.getElementById('sigmaLabel');
const rhoLabel=document.getElementById('rhoLabel');
const betaLabel=document.getElementById('betaLabel');
const preset=[{label:'经典',sigma:10,rho:28,beta:8/3},{label:'轻混沌',sigma:10,rho:15,beta:2.666},{label:'强混沌',sigma:14,rho:44.92,beta:4}];

function draw(){ ctx.fillStyle='rgba(0,0,0,0.08)'; ctx.fillRect(0,0,canvas.width,canvas.height);
  const px = canvas.width/2 + x*8;
  const py = canvas.height/2 + z*8;
  ctx.beginPath();ctx.fillStyle='hsl(' + (time%360) + ',100%,70%)';ctx.arc(px,py,1,0,Math.PI*2);ctx.fill();
}
let time=0;
function step(dt){ const dx=sigma*(y-x); const dy=x*(rho-z)-y; const dz=x*y-beta*z; x+=dx*dt; y+=dy*dt; z+=dz*dt; }

document.getElementById('reset').addEventListener('click', ()=>{ x=0.1;y=0;z=0; ctx.clearRect(0,0,canvas.width,canvas.height); });
sigmaInput.addEventListener('input', (e)=>{ sigma=parseFloat(e.value); sigmaLabel.textContent=sigma.toFixed(1); });
rhoInput.addEventListener('input', (e)=>{ rho=parseFloat(e.value); rhoLabel.textContent=rho.toFixed(1); });
betaInput.addEventListener('input', (e)=>{ beta=parseFloat(e.value); betaLabel.textContent=beta.toFixed(3); });
document.getElementById('toggle').addEventListener('click', ()=>{ paused=!paused; document.getElementById('toggle').textContent= paused?'继续':'暂停'; });

function loop(){ if(!paused){ step(0.008); draw(); time+=0.3; } requestAnimationFrame(loop); }
loop();