const barsContainer = document.getElementById("bars");
const algorithmSelect = document.getElementById("algorithm");
const distributionSelect = document.getElementById("distribution");
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const generateButton = document.getElementById("generate");
const startButton = document.getElementById("start");

const BAR_COUNT = 60;
const MIN_VALUE = 10;
const MAX_VALUE = 100;

let currentArray = [];
let isSorting = false;
let isPaused = false;
let pausePromise = null;
let pauseResolver = null;

function createRandomArray() {
  const result = [];
  for (let i = 0; i < BAR_COUNT; i += 1) {
    const value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE;
    result.push(value);
  }
  return result;
}

function createWorstArray() {
  const result = [];
  for (let i = 0; i < BAR_COUNT; i += 1) {
    const ratio = BAR_COUNT === 1 ? 0 : i / (BAR_COUNT - 1);
    const value = Math.round(MAX_VALUE - ratio * (MAX_VALUE - MIN_VALUE));
    result.push(value);
  }
  return result;
}

function renderBars(values) {
  barsContainer.innerHTML = "";
  values.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = value + "%";
    barsContainer.appendChild(bar);
  });
}

function updateBar(index, value) {
  const bar = barsContainer.children[index];
  if (!bar) return;
  bar.style.height = value + "%";
}

function clearHighlights() {
  Array.from(barsContainer.children).forEach((bar) => {
    bar.classList.remove("compare", "swap");
  });
}

function markCompare(indexA, indexB) {
  clearHighlights();
  const barA = barsContainer.children[indexA];
  const barB = barsContainer.children[indexB];
  if (barA) barA.classList.add("compare");
  if (barB) barB.classList.add("compare");
}

function markSwap(indexA, indexB) {
  clearHighlights();
  const barA = barsContainer.children[indexA];
  const barB = barsContainer.children[indexB];
  if (barA) barA.classList.add("swap");
  if (barB) barB.classList.add("swap");
}

function markSorted() {
  Array.from(barsContainer.children).forEach((bar) => {
    bar.classList.remove("compare");
    bar.classList.add("swap");
  });
}

function getDelay() {
  const speed = Number(speedInput.value);
  const normalized = Math.min(1, Math.max(0, speed / 200));
  const delay = Math.round(400 * Math.pow(1 - normalized, 3));
  return Math.max(0, delay);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitIfPaused() {
  if (!isPaused) return Promise.resolve();
  if (!pausePromise) {
    pausePromise = new Promise((resolve) => {
      pauseResolver = resolve;
    });
  }
  return pausePromise;
}

function resumeFromPause() {
  if (!isPaused) return;
  isPaused = false;
  if (pauseResolver) pauseResolver();
  pauseResolver = null;
  pausePromise = null;
}

function swapInArray(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function createSortHooks(array) {
  return {
    async compare(i, j) {
      await waitIfPaused();
      markCompare(i, j);
      await sleep(getDelay());
    },
    async swap(i, j) {
      await waitIfPaused();
      swapInArray(array, i, j);
      markSwap(i, j);
      updateBar(i, array[i]);
      updateBar(j, array[j]);
      await sleep(getDelay());
    },
    async overwrite(i, value) {
      await waitIfPaused();
      array[i] = value;
      markSwap(i, i);
      updateBar(i, value);
      await sleep(getDelay());
    },
    async notify() {
      await waitIfPaused();
      await sleep(getDelay());
    },
  };
}

async function bubbleSort(array, hooks) {
  const length = array.length;
  for (let i = 0; i < length - 1; i += 1) {
    for (let j = 0; j < length - 1 - i; j += 1) {
      await hooks.compare(j, j + 1);
      if (array[j] > array[j + 1]) {
        await hooks.swap(j, j + 1);
      }
    }
  }
}

async function selectionSort(array, hooks) {
  const length = array.length;
  for (let i = 0; i < length - 1; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < length; j += 1) {
      await hooks.compare(j, minIndex);
      if (array[j] < array[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      await hooks.swap(i, minIndex);
    }
  }
}

async function insertionSort(array, hooks) {
  for (let i = 1; i < array.length; i += 1) {
    const current = array[i];
    let j = i - 1;
    while (j >= 0) {
      await hooks.compare(j, j + 1);
      if (array[j] > current) {
        await hooks.overwrite(j + 1, array[j]);
        j -= 1;
      } else {
        break;
      }
    }
    await hooks.overwrite(j + 1, current);
  }
}

async function heapify(array, heapSize, rootIndex, hooks) {
  let largest = rootIndex;
  const left = rootIndex * 2 + 1;
  const right = rootIndex * 2 + 2;

  if (left < heapSize) {
    await hooks.compare(left, largest);
    if (array[left] > array[largest]) largest = left;
  }

  if (right < heapSize) {
    await hooks.compare(right, largest);
    if (array[right] > array[largest]) largest = right;
  }

  if (largest !== rootIndex) {
    await hooks.swap(rootIndex, largest);
    await heapify(array, heapSize, largest, hooks);
  }
}

async function heapSort(array, hooks) {
  const length = array.length;
  for (let i = Math.floor(length / 2) - 1; i >= 0; i -= 1) {
    await heapify(array, length, i, hooks);
  }

  for (let i = length - 1; i > 0; i -= 1) {
    await hooks.swap(0, i);
    await heapify(array, i, 0, hooks);
  }
}

async function partition(array, low, high, hooks) {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j += 1) {
    await hooks.compare(j, high);
    if (array[j] < pivot) {
      i += 1;
      await hooks.swap(i, j);
    }
  }
  await hooks.swap(i + 1, high);
  return i + 1;
}

async function quickSort(array, low, high, hooks) {
  if (low < high) {
    const pivotIndex = await partition(array, low, high, hooks);
    await quickSort(array, low, pivotIndex - 1, hooks);
    await quickSort(array, pivotIndex + 1, high, hooks);
  }
}

async function merge(array, left, mid, right, hooks) {
  const leftArray = array.slice(left, mid + 1);
  const rightArray = array.slice(mid + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArray.length && j < rightArray.length) {
    await hooks.compare(left + i, mid + 1 + j);
    if (leftArray[i] <= rightArray[j]) {
      await hooks.overwrite(k, leftArray[i]);
      i += 1;
    } else {
      await hooks.overwrite(k, rightArray[j]);
      j += 1;
    }
    k += 1;
  }

  while (i < leftArray.length) {
    await hooks.overwrite(k, leftArray[i]);
    i += 1;
    k += 1;
  }

  while (j < rightArray.length) {
    await hooks.overwrite(k, rightArray[j]);
    j += 1;
    k += 1;
  }
}

async function mergeSort(array, left, right, hooks) {
  if (left >= right) return;
  const mid = Math.floor((left + right) / 2);
  await mergeSort(array, left, mid, hooks);
  await mergeSort(array, mid + 1, right, hooks);
  await merge(array, left, mid, right, hooks);
}

async function shellSort(array, hooks) {
  const length = array.length;
  let gap = Math.floor(length / 2);
  while (gap > 0) {
    for (let i = gap; i < length; i += 1) {
      const temp = array[i];
      let j = i;
      while (j >= gap) {
        await hooks.compare(j - gap, j);
        if (array[j - gap] > temp) {
          await hooks.overwrite(j, array[j - gap]);
          j -= gap;
        } else {
          break;
        }
      }
      await hooks.overwrite(j, temp);
    }
    gap = Math.floor(gap / 2);
  }
}

async function countingSort(array, hooks) {
  const max = Math.max(...array);
  const min = Math.min(...array);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(array.length);

  for (let i = 0; i < array.length; i += 1) {
    count[array[i] - min] += 1;
    await hooks.compare(i, i);
  }
  for (let i = 1; i < range; i += 1) {
    count[i] += count[i - 1];
  }
  for (let i = array.length - 1; i >= 0; i -= 1) {
    output[count[array[i] - min] - 1] = array[i];
    count[array[i] - min] -= 1;
  }
  for (let i = 0; i < array.length; i += 1) {
    await hooks.overwrite(i, output[i]);
  }
}

async function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

async function radixSort(array, hooks) {
  const max = Math.max(...array);
  const maxDigits = Math.floor(Math.log10(max)) + 1;

  for (let d = 0; d < maxDigits; d += 1) {
    const buckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < array.length; i += 1) {
      const digit = await getDigit(array[i], d);
      buckets[digit].push(array[i]);
      await hooks.compare(i, i);
    }
    let idx = 0;
    for (const bucket of buckets) {
      for (const val of bucket) {
        await hooks.overwrite(idx, val);
        idx += 1;
      }
    }
  }
}

async function cocktailShakerSort(array, hooks) {
  let start = 0;
  let end = array.length - 1;
  let swapped = true;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; i += 1) {
      await hooks.compare(i, i + 1);
      if (array[i] > array[i + 1]) {
        await hooks.swap(i, i + 1);
        swapped = true;
      }
    }
    end -= 1;
    if (!swapped) break;
    swapped = false;
    for (let i = end; i > start; i -= 1) {
      await hooks.compare(i, i - 1);
      if (array[i] < array[i - 1]) {
        await hooks.swap(i, i - 1);
        swapped = true;
      }
    }
    start += 1;
  }
}

const sorters = {
  quick: (array, hooks) => quickSort(array, 0, array.length - 1, hooks),
  merge: (array, hooks) => mergeSort(array, 0, array.length - 1, hooks),
  heap: (array, hooks) => heapSort(array, hooks),
  bubble: (array, hooks) => bubbleSort(array, hooks),
  selection: (array, hooks) => selectionSort(array, hooks),
  insertion: (array, hooks) => insertionSort(array, hooks),
  shell: (array, hooks) => shellSort(array, hooks),
  counting: (array, hooks) => countingSort(array, hooks),
  radix: (array, hooks) => radixSort(array, hooks),
  cocktail: (array, hooks) => cocktailShakerSort(array, hooks),
};

function setControlsEnabled(enabled) {
  algorithmSelect.disabled = !enabled;
  distributionSelect.disabled = !enabled;
  generateButton.disabled = !enabled;
}

async function startSort() {
  if (isSorting) {
    if (isPaused) {
      resumeFromPause();
      startButton.textContent = "暂停";
    } else {
      isPaused = true;
      startButton.textContent = "继续";
    }
    return;
  }

  isSorting = true;
  isPaused = false;
  setControlsEnabled(false);
  clearHighlights();
  startButton.textContent = "暂停";

  const sorter = sorters[algorithmSelect.value];
  const hooks = createSortHooks(currentArray);

  await sorter(currentArray, hooks);

  markSorted();
  setControlsEnabled(true);
  isSorting = false;
  isPaused = false;
  startButton.textContent = "开始排序";
}

function generateArray() {
  if (isSorting) return;
  if (distributionSelect.value === "worst") {
    currentArray = createWorstArray();
  } else {
    currentArray = createRandomArray();
  }
  renderBars(currentArray);
}

speedInput.addEventListener("input", () => {
  speedValue.textContent = speedInput.value;
});

generateButton.addEventListener("click", generateArray);
startButton.addEventListener("click", startSort);
distributionSelect.addEventListener("change", generateArray);

generateArray();
