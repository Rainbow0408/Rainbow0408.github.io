const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
const generateBtn=document.getElementById('generate');
const solveBtn=document.getElementById('solve');
const gridWInput=document.getElementById('gridW');
const gridHInput=document.getElementById('gridH');
const speedInput=document.getElementById('speed');
const gridWLabel=document.getElementById('gridWLabel');
const gridHLabel=document.getElementById('gridHLabel');
const speedLabel=document.getElementById('speedLabel');
canvas.width=1000; canvas.height=600;
let cols=parseInt(gridWInput.value,10);
let rows=parseInt(gridHInput.value,10);
let cellSize=Math.min(canvas.width/cols,canvas.height/rows);
let grid=[]; let stack=[]; let current; let path=[];
let stepInterval = null;

class Cell{ constructor(i,j){ this.i=i;this.j=j;this.walls=[true,true,true,true];this.visited=false;}
  show(){ const x=this.i*cellSize,y=this.j*cellSize;ctx.strokeStyle='#5f6c8b';ctx.lineWidth=2;if(this.walls[0]){ ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+cellSize,y);ctx.stroke();} if(this.walls[1]){ctx.beginPath();ctx.moveTo(x+cellSize,y);ctx.lineTo(x+cellSize,y+cellSize);ctx.stroke();} if(this.walls[2]){ctx.beginPath();ctx.moveTo(x+cellSize,y+cellSize);ctx.lineTo(x,y+cellSize);ctx.stroke();} if(this.walls[3]){ctx.beginPath();ctx.moveTo(x,y+cellSize);ctx.lineTo(x,y);ctx.stroke();}
    if(this.visited){ctx.fillStyle='rgba(100,140,255,0.2)';ctx.fillRect(x,y,cellSize,cellSize);} }
  highlight(){const x=this.i*cellSize,y=this.j*cellSize;ctx.fillStyle='rgba(250,200,50,0.35)';ctx.fillRect(x,y,cellSize,cellSize);}
  checkNeighbors(){ const neighbors=[]; const top=index(this.i,this.j-1);const right=index(this.i+1,this.j);const bottom=index(this.i,this.j+1);const left=index(this.i-1,this.j); if(top && !top.visited)neighbors.push(top); if(right&&!right.visited) neighbors.push(right); if(bottom&&!bottom.visited) neighbors.push(bottom); if(left&&!left.visited) neighbors.push(left); if(neighbors.length>0)return neighbors[Math.floor(Math.random()*neighbors.length)]; else return undefined;}}
function index(i,j){ if(i<0||j<0||i>=cols||j>=rows)return undefined; return grid[i+j*cols];}
function removeWalls(a,b){ const x=a.i-b.i; if(x===1){a.walls[3]=false;b.walls[1]=false;} else if(x===-1){a.walls[1]=false;b.walls[3]=false;} const y=a.j-b.j; if(y===1){a.walls[0]=false;b.walls[2]=false;} else if(y===-1){a.walls[2]=false;b.walls[0]=false;}}

function setup(){ cols = parseInt(gridWInput.value,10); rows = parseInt(gridHInput.value,10); cellSize = Math.min(canvas.width/cols,canvas.height/rows);
  grid.length = 0; stack = []; path = [];
  for(let j=0;j<rows;j++){ for(let i=0;i<cols;i++){ grid.push(new Cell(i,j)); }}
  current = grid[0]; current.visited = true;
}

function generatorStep(){ ctx.clearRect(0,0,canvas.width,canvas.height); grid.forEach(c=>c.show()); current.visited=true; current.highlight(); const next=current.checkNeighbors(); if(next){ next.visited=true; stack.push(current); removeWalls(current,next); current=next; } else if(stack.length>0){ current=stack.pop(); } else{ clearInterval(genInterval); }
}

function drawMaze(){ generatorStep();}

function solveMaze(){ const start=grid[0]; const end=grid[grid.length-1]; const open=[start]; const cameFrom=new Map(); const visited=new Set([start]); while(open.length>0){ const node=open.shift(); if(node===end) break; const neighbors=getUnblockedNeighbors(node); for(const n of neighbors){ if(!visited.has(n)){ visited.add(n); cameFrom.set(n,node); open.push(n); }} }
 path=[]; let curr=end; while(curr!==start){ path.push(curr); curr=cameFrom.get(curr); if(!curr) break; } path.push(start); path.reverse(); renderSolution(); }

function getUnblockedNeighbors(cell){ const neighbors=[]; const top=index(cell.i,cell.j-1); const right=index(cell.i+1,cell.j); const bottom=index(cell.i,cell.j+1); const left=index(cell.i-1,cell.j); if(top && !cell.walls[0]) neighbors.push(top); if(right && !cell.walls[1]) neighbors.push(right); if(bottom && !cell.walls[2]) neighbors.push(bottom); if(left && !cell.walls[3]) neighbors.push(left); return neighbors; }

function renderSolution(){ grid.forEach(c=>c.show()); ctx.fillStyle='rgba(255,70,70,0.5)'; path.forEach(c=>ctx.fillRect(c.i*cellSize+cellSize*0.25,c.j*cellSize+cellSize*0.25,cellSize*0.5,cellSize*0.5)); }

let genInterval;
setup();

gridWInput.addEventListener('input', (e) => { gridWLabel.textContent = e.value; });
gridHInput.addEventListener('input', (e) => { gridHLabel.textContent = e.value; });
speedInput.addEventListener('input', (e) => { speedLabel.textContent = e.value; });

generateBtn.addEventListener('click', () => {
  setup();
  clearInterval(genInterval);
  genInterval = setInterval(drawMaze, Math.max(1, 52 - parseInt(speedInput.value,10)));
});

solveBtn.addEventListener('click', () => { clearInterval(genInterval); solveMaze(); });

generateBtn.click();