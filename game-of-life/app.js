class GameOfLife {
  constructor(rowCount, colCount) {
    this.rowCount = rowCount;
    this.colCount = colCount;
    this.cell_matrix = this.init_grid(rowCount, colCount);
  }

  init_grid(rowCount, colCount) {
    const grid = [];
    for (let row = 0; row < rowCount; row += 1) {
      const rowCells = [];
      for (let col = 0; col < colCount; col += 1) {
        rowCells.push(0);
      }
      grid.push(rowCells);
    }
    return grid;
  }

  compute_next_generation() {
    const next_matrix = this.init_grid(this.rowCount, this.colCount);

    for (let row = 0; row < this.rowCount; row += 1) {
      for (let col = 0; col < this.colCount; col += 1) {
        const alive = this.cell_matrix[row][col] === 1;
        const neighbors = this.count_neighbors(row, col);

        if (alive && (neighbors === 2 || neighbors === 3)) {
          next_matrix[row][col] = 1;
        } else if (!alive && neighbors === 3) {
          next_matrix[row][col] = 1;
        } else {
          next_matrix[row][col] = 0;
        }
      }
    }

    this.cell_matrix = next_matrix;
    return next_matrix;
  }

  count_neighbors(rowIndex, colIndex) {
    let count = 0;
    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
        if (rowOffset === 0 && colOffset === 0) continue;
        const row = rowIndex + rowOffset;
        const col = colIndex + colOffset;
        if (row < 0 || col < 0 || row >= this.rowCount || col >= this.colCount) {
          continue;
        }
        if (this.cell_matrix[row][col] === 1) count += 1;
      }
    }
    return count;
  }

  toggle_cell(rowIndex, colIndex) {
    if (rowIndex < 0 || colIndex < 0 || rowIndex >= this.rowCount || colIndex >= this.colCount) {
      return;
    }
    this.cell_matrix[rowIndex][colIndex] = this.cell_matrix[rowIndex][colIndex] === 1 ? 0 : 1;
  }

  clear() {
    this.cell_matrix = this.init_grid(this.rowCount, this.colCount);
  }
}

const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const toggleButton = document.getElementById("toggle");
const clearButton = document.getElementById("clear");
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");

const cellSize = 16;
const pixelRatio = window.devicePixelRatio || 1;
const logicalWidth = canvas.width;
const logicalHeight = canvas.height;
const rowCount = Math.floor(logicalHeight / cellSize);
const colCount = Math.floor(logicalWidth / cellSize);

canvas.width = Math.floor(logicalWidth * pixelRatio);
canvas.height = Math.floor(logicalHeight * pixelRatio);
ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

const game = new GameOfLife(rowCount, colCount);

let running = false;
let lastTick = 0;

function drawGrid() {
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, logicalWidth, logicalHeight);

  ctx.fillStyle = "#0f172a";
  for (let row = 0; row < game.rowCount; row += 1) {
    for (let col = 0; col < game.colCount; col += 1) {
      if (game.cell_matrix[row][col] === 1) {
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

  ctx.strokeStyle = "rgba(15, 23, 42, 0.18)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= game.colCount; x += 1) {
    ctx.beginPath();
    ctx.moveTo(x * cellSize, 0);
    ctx.lineTo(x * cellSize, game.rowCount * cellSize);
    ctx.stroke();
  }
  for (let y = 0; y <= game.rowCount; y += 1) {
    ctx.beginPath();
    ctx.moveTo(0, y * cellSize);
    ctx.lineTo(game.colCount * cellSize, y * cellSize);
    ctx.stroke();
  }

  ctx.strokeStyle = "rgba(15, 23, 42, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(0.75, 0.75, logicalWidth - 1.5, logicalHeight - 1.5);
}

function tick(timestamp) {
  if (!running) return;

  const speed = Number(speedInput.value);
  const interval = 1000 / speed;

  if (timestamp - lastTick >= interval) {
    game.compute_next_generation();
    drawGrid();
    lastTick = timestamp;
  }

  requestAnimationFrame(tick);
}

function toggleRunning() {
  running = !running;
  toggleButton.textContent = running ? "暂停" : "开始";

  if (running) {
    lastTick = performance.now();
    requestAnimationFrame(tick);
  }
}

function clearBoard() {
  running = false;
  toggleButton.textContent = "开始";
  game.clear();
  drawGrid();
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = logicalWidth / rect.width;
  const scaleY = logicalHeight / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;
  const colIndex = Math.floor(x / cellSize);
  const rowIndex = Math.floor(y / cellSize);
  game.toggle_cell(rowIndex, colIndex);
  drawGrid();
});

speedInput.addEventListener("input", () => {
  speedValue.textContent = speedInput.value;
});

toggleButton.addEventListener("click", toggleRunning);
clearButton.addEventListener("click", clearBoard);

drawGrid();
