class MinHeap {
  constructor() {
    this.items = [];
  }

  get size() {
    return this.items.length;
  }

  push(node) {
    this.items.push(node);
    this.bubbleUp(this.items.length - 1);
  }

  pop() {
    if (this.items.length === 0) return null;
    if (this.items.length === 1) return this.items.pop();
    const root = this.items[0];
    this.items[0] = this.items.pop();
    this.bubbleDown(0);
    return root;
  }

  bubbleUp(index) {
    let currentIndex = index;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.items[parentIndex].f <= this.items[currentIndex].f) break;
      [this.items[parentIndex], this.items[currentIndex]] = [
        this.items[currentIndex],
        this.items[parentIndex],
      ];
      currentIndex = parentIndex;
    }
  }

  bubbleDown(index) {
    let currentIndex = index;
    const length = this.items.length;
    while (true) {
      const left = currentIndex * 2 + 1;
      const right = currentIndex * 2 + 2;
      let smallest = currentIndex;

      if (left < length && this.items[left].f < this.items[smallest].f) {
        smallest = left;
      }
      if (right < length && this.items[right].f < this.items[smallest].f) {
        smallest = right;
      }
      if (smallest === currentIndex) break;
      [this.items[currentIndex], this.items[smallest]] = [
        this.items[smallest],
        this.items[currentIndex],
      ];
      currentIndex = smallest;
    }
  }
}

class AStar {
  constructor(grid, start, end) {
    this.grid = grid;
    this.rows = grid.length;
    this.cols = grid[0].length;
    this.start = start;
    this.end = end;
  }

  key(position) {
    return `${position.row}-${position.col}`;
  }

  parseKey(key) {
    const [row, col] = key.split("-").map(Number);
    return { row, col };
  }

  heuristic(a, b) {
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
  }

  neighbors(position) {
    const dirs = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
    ];
    const result = [];
    for (const dir of dirs) {
      const row = position.row + dir.row;
      const col = position.col + dir.col;
      if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) continue;
      if (this.grid[row][col] === 1) continue;
      result.push({ row, col });
    }
    return result;
  }

  reconstructPath(cameFrom, currentKey) {
    const path = [];
    let key = currentKey;
    while (cameFrom.has(key)) {
      path.push(key);
      key = cameFrom.get(key);
    }
    path.push(key);
    return path.reverse();
  }

  findPath() {
    const openHeap = new MinHeap();
    const openSet = new Set();
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map();
    const fScore = new Map();
    const steps = [];

    const startKey = this.key(this.start);
    const endKey = this.key(this.end);

    gScore.set(startKey, 0);
    fScore.set(startKey, this.heuristic(this.start, this.end));
    openHeap.push({ key: startKey, f: fScore.get(startKey) });
    openSet.add(startKey);
    steps.push({ open: new Set(openSet), closed: new Set(closedSet), current: startKey });

    while (openHeap.size > 0) {
      const current = openHeap.pop();
      if (!current || !openSet.has(current.key)) continue;

      openSet.delete(current.key);
      closedSet.add(current.key);
      steps.push({ open: new Set(openSet), closed: new Set(closedSet), current: current.key });

      if (current.key === endKey) {
        const path = this.reconstructPath(cameFrom, current.key);
        return { path, steps };
      }

      const currentPos = this.parseKey(current.key);
      for (const neighbor of this.neighbors(currentPos)) {
        const neighborKey = this.key(neighbor);
        if (closedSet.has(neighborKey)) continue;

        const tentative = (gScore.get(current.key) ?? Infinity) + 1;
        if (tentative < (gScore.get(neighborKey) ?? Infinity)) {
          cameFrom.set(neighborKey, current.key);
          gScore.set(neighborKey, tentative);
          const f = tentative + this.heuristic(neighbor, this.end);
          fScore.set(neighborKey, f);
          openHeap.push({ key: neighborKey, f });
          openSet.add(neighborKey);
        }
      }
    }

    return { path: null, steps };
  }
}

const canvas = document.getElementById("grid");
const ctx = canvas.getContext("2d");
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const runButton = document.getElementById("run");
const clearButton = document.getElementById("clear");
const resetButton = document.getElementById("reset");

const cellSize = 20;
const rows = Math.floor(canvas.height / cellSize);
const cols = Math.floor(canvas.width / cellSize);

let grid = Array.from({ length: rows }, () => Array(cols).fill(0));
let start = { row: Math.floor(rows / 2), col: Math.floor(cols / 4) };
let end = { row: Math.floor(rows / 2), col: Math.floor((cols * 3) / 4) };

let isRunning = false;
let isMouseDown = false;
let dragStart = false;
let dragEnd = false;
let paintValue = 1;
let openSet = new Set();
let closedSet = new Set();
let pathSet = new Set();

function keyOf(position) {
  return `${position.row}-${position.col}`;
}

function clearOverlays() {
  openSet = new Set();
  closedSet = new Set();
  pathSet = new Set();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const cellKey = `${row}-${col}`;
      let fill = "#f8fafc";
      if (openSet.has(cellKey)) fill = "#2563eb";
      if (closedSet.has(cellKey)) fill = "#93c5fd";
      if (grid[row][col] === 1) fill = "#111827";
      if (pathSet.has(cellKey)) fill = "#facc15";

      ctx.fillStyle = fill;
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    }
  }

  ctx.strokeStyle = "rgba(15, 23, 42, 0.12)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= cols; x += 1) {
    ctx.beginPath();
    ctx.moveTo(x * cellSize, 0);
    ctx.lineTo(x * cellSize, rows * cellSize);
    ctx.stroke();
  }
  for (let y = 0; y <= rows; y += 1) {
    ctx.beginPath();
    ctx.moveTo(0, y * cellSize);
    ctx.lineTo(cols * cellSize, y * cellSize);
    ctx.stroke();
  }

  ctx.fillStyle = "#22c55e";
  ctx.fillRect(start.col * cellSize, start.row * cellSize, cellSize, cellSize);
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(end.col * cellSize, end.row * cellSize, cellSize, cellSize);
}

function getDelay() {
  const speed = Number(speedInput.value);
  const normalized = Math.min(1, Math.max(0, speed / 100));
  return Math.max(0, Math.round(250 * Math.pow(1 - normalized, 2)));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animateSteps(steps, path) {
  isRunning = true;
  for (const step of steps) {
    openSet = step.open;
    closedSet = step.closed;
    draw();
    await sleep(getDelay());
  }

  if (path) {
    pathSet = new Set(path);
    draw();
  }
  isRunning = false;
}

function cellFromEvent(event) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const col = Math.floor(((event.clientX - rect.left) * scaleX) / cellSize);
  const row = Math.floor(((event.clientY - rect.top) * scaleY) / cellSize);
  return { row, col };
}

function isValidCell(position) {
  return position.row >= 0 && position.col >= 0 && position.row < rows && position.col < cols;
}

function handlePaint(position) {
  if (!isValidCell(position)) return;
  if (position.row === start.row && position.col === start.col) return;
  if (position.row === end.row && position.col === end.col) return;
  grid[position.row][position.col] = paintValue;
}

canvas.addEventListener("mousedown", (event) => {
  if (isRunning) return;
  isMouseDown = true;
  const cell = cellFromEvent(event);
  if (!isValidCell(cell)) return;
  if (cell.row === start.row && cell.col === start.col) {
    dragStart = true;
    return;
  }
  if (cell.row === end.row && cell.col === end.col) {
    dragEnd = true;
    return;
  }
  paintValue = grid[cell.row][cell.col] === 1 ? 0 : 1;
  handlePaint(cell);
  clearOverlays();
  draw();
});

canvas.addEventListener("mousemove", (event) => {
  if (!isMouseDown || isRunning) return;
  const cell = cellFromEvent(event);
  if (!isValidCell(cell)) return;

  if (dragStart) {
    start = cell;
    grid[cell.row][cell.col] = 0;
  } else if (dragEnd) {
    end = cell;
    grid[cell.row][cell.col] = 0;
  } else {
    handlePaint(cell);
  }
  clearOverlays();
  draw();
});

canvas.addEventListener("mouseup", () => {
  isMouseDown = false;
  dragStart = false;
  dragEnd = false;
});

canvas.addEventListener("mouseleave", () => {
  isMouseDown = false;
  dragStart = false;
  dragEnd = false;
});

runButton.addEventListener("click", async () => {
  if (isRunning) return;
  clearOverlays();
  const astar = new AStar(grid, start, end);
  const result = astar.findPath();
  await animateSteps(result.steps, result.path);
});

clearButton.addEventListener("click", () => {
  if (isRunning) return;
  grid = grid.map((row) => row.map(() => 0));
  clearOverlays();
  draw();
});

resetButton.addEventListener("click", () => {
  if (isRunning) return;
  grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  start = { row: Math.floor(rows / 2), col: Math.floor(cols / 4) };
  end = { row: Math.floor(rows / 2), col: Math.floor((cols * 3) / 4) };
  clearOverlays();
  draw();
});

speedInput.addEventListener("input", () => {
  speedValue.textContent = speedInput.value;
});

draw();
