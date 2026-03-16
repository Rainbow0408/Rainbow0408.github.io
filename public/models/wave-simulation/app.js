const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;
const gridW = 120;
const gridH = 72;
const spacing = canvas.width / gridW;
let damping = 0.996;
let impact = 150;
const dampingInput = document.getElementById('damping');
const dampingLabel = document.getElementById('dampingLabel');
const impactInput = document.getElementById('impact');
const impactLabel = document.getElementById('impactLabel');
let current = [];
let previous = [];
for (let j = 0; j < gridH; j++) { current[j] = []; previous[j] = []; for (let i = 0; i < gridW; i++) { current[j][i] = 0; previous[j][i] = 0; }}

function disturb(){ const cx=Math.floor(gridW/2); const cy=Math.floor(gridH/2); current[cy][cx] = impact; current[cy][cx-1] = impact * 0.6; current[cy][cx+1] = impact * 0.6; }

document.getElementById('reset').addEventListener('click', ()=>{ for(let j=0;j<gridH;j++){ for(let i=0;i<gridW;i++){ current[j][i]=0; previous[j][i]=0; }} });

document.getElementById('disturb').addEventListener('click', disturb);

dampingInput.addEventListener('input', (e)=>{ damping = parseFloat(e.value); dampingLabel.textContent = damping.toFixed(3); });
impactInput.addEventListener('input', (e)=>{ impact = parseInt(e.value,10); impactLabel.textContent = impact; });

function update(){ const next=[]; for(let j=0;j<gridH;j++){ next[j]=[]; for(let i=0;i<gridW;i++){ if(i===0||j===0||i===gridW-1||j===gridH-1){ next[j][i]=0; continue; } next[j][i] = ((current[j-1][i] + current[j+1][i] + current[j][i-1] + current[j][i+1]) / 2) - previous[j][i]; next[j][i] *= damping; }} previous=current; current=next; }

function render(){ ctx.fillStyle='rgba(4,8,20,0.25)'; ctx.fillRect(0,0,canvas.width,canvas.height); for(let j=0;j<gridH;j++){ for(let i=0;i<gridW;i++){ const h=current[j][i]; if(Math.abs(h)>0.5){ const intensity=Math.max(0, Math.min(1, (h+100)/200)); ctx.fillStyle=`rgba(${50+200*intensity},${80+120*intensity},${220},${Math.min(0.5,intensity))}`; ctx.fillRect(i*spacing, j*spacing, spacing, spacing); } }} }

function loop(){ update(); render(); requestAnimationFrame(loop);} loop();