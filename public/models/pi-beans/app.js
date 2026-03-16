const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const beanInput = document.getElementById("beanCount");
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const toggleBtn = document.getElementById("toggle");
const resetBtn = document.getElementById("reset");

const statTotal = document.getElementById("statTotal");
const statInside = document.getElementById("statInside");
const statPi = document.getElementById("statPi");
const statRatio = document.getElementById("statRatio");

const size = canvas.width;
const center = size / 2;
const radius = size / 2;
const radiusSq = radius * radius;

let targetTotal = 0;
let total = 0;
let inside = 0;
let running = false;
let drawEvery = 1;
let rafId = null;

const COLORS = {
  inside: "#2f5bff",
  outside: "#ff7a59",
};

function drawBoard() {
  ctx.clearRect(0, 0, size, size);
  ctx.save();
  ctx.strokeStyle = "rgba(14, 15, 26, 0.5)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, size - 2, size - 2);

  ctx.beginPath();
  ctx.arc(center, center, radius - 1, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value);
}

function updateStats() {
  statTotal.textContent = formatNumber(total);
  statInside.textContent = formatNumber(inside);

  if (total === 0) {
    statPi.textContent = "-";
    statRatio.textContent = "-";
    return;
  }

  const ratio = inside / total;
  const piEstimate = ratio * 4;
  statPi.textContent = piEstimate.toFixed(6);
  statRatio.textContent = (ratio * 100).toFixed(3) + "%";
}

function dropBean() {
  const x = Math.random() * size;
  const y = Math.random() * size;
  const dx = x - center;
  const dy = y - center;
  const inCircle = dx * dx + dy * dy <= radiusSq;

  total += 1;
  if (inCircle) inside += 1;

  if (total % drawEvery === 0) {
    ctx.fillStyle = inCircle ? COLORS.inside : COLORS.outside;
    ctx.beginPath();
    ctx.arc(x, y, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function step() {
  if (!running) return;

  const batchSize = Number(speedInput.value);
  const remaining = targetTotal - total;
  const count = Math.min(batchSize, remaining);

  for (let i = 0; i < count; i += 1) {
    dropBean();
  }

  updateStats();

  if (total >= targetTotal) {
    running = false;
    toggleBtn.textContent = "重新开始";
    return;
  }

  rafId = requestAnimationFrame(step);
}

function resetSimulation() {
  total = 0;
  inside = 0;
  running = false;
  cancelAnimationFrame(rafId);
  drawBoard();
  updateStats();
  toggleBtn.textContent = "开始撒豆";
}

function startSimulation() {
  const desired = Number(beanInput.value);
  if (!Number.isFinite(desired) || desired <= 0) return;

  targetTotal = desired;
  drawEvery = Math.max(1, Math.ceil(targetTotal / 2000000));

  if (total === 0 || total >= targetTotal) {
    total = 0;
    inside = 0;
    drawBoard();
  }

  running = true;
  toggleBtn.textContent = "暂停";
  step();
}

speedInput.addEventListener("input", () => {
  speedValue.textContent = speedInput.value;
});

beanInput.addEventListener("change", () => {
  const value = Number(beanInput.value);
  if (Number.isNaN(value)) return;
  if (value > 100000000) beanInput.value = 100000000;
  if (value < 100) beanInput.value = 100;
});

toggleBtn.addEventListener("click", () => {
  if (!running && total > 0 && total < targetTotal) {
    running = true;
    toggleBtn.textContent = "暂停";
    step();
    return;
  }

  if (running) {
    running = false;
    toggleBtn.textContent = "继续";
    return;
  }

  startSimulation();
});

resetBtn.addEventListener("click", resetSimulation);

drawBoard();
updateStats();

