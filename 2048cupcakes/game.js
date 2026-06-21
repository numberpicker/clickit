/* ============================================================
   CUPCAKES 2048 — Game Logic
   ============================================================

   HOW TO USE YOUR CUPCAKE IMAGES:
   ─────────────────────────────────
   Place your image files in the same folder as this script,
   then fill in the CUPCAKE_IMAGES map below.

   Each key is a tile value (2, 4, 8 … 2048).
   Each value is the filename of your cupcake image for that tier.

   Example:
     2:    'cupcake_vanilla.png',
     4:    'cupcake_strawberry.png',
     …
     2048: 'cupcake_legendary.png',

   If an image is missing the tile shows a coloured square + number.
   ============================================================ */

const CUPCAKE_IMAGES = {
  2:    '/2048cupcakes/2.webp',   // e.g. 'cupcake_02.png'
  4:    '/2048cupcakes/4.jpg',
  8:    '/2048cupcakes/8.jpg',
  16:   '/2048cupcakes/16.jpg',
  32:   '/2048cupcakes/32.jpg',
  64:   '/2048cupcakes/64.jpg',
  128:  '/2048cupcakes/128.jpg',
  256:  '/2048cupcakes/256.jpg',
  512:  '/2048cupcakes/512.jpg',
  1024: '/2048cupcakes/1024.jpg',
  2048: '/2048cupcakes/2048.jpg',
};

/* ── Constants ──────────────────────────────────────────────── */
const SIZE  = 4;
const GAP   = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap'));
const CELL  = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--cell'));

/* ── State ───────────────────────────────────────────────────── */
let grid        = [];   // 4×4, each cell: null | { id, value }
let score       = 0;
let best        = parseInt(localStorage.getItem('cupcake2048_best') || '0');
let nextId      = 1;
let history     = [];   // for undo: array of { grid, score } snapshots
let won         = false;
let keepGoing   = false;

/* ── DOM refs ────────────────────────────────────────────────── */
const $gridCells  = document.getElementById('grid-cells');
const $tileLayer  = document.getElementById('tile-layer');
const $score      = document.getElementById('score');
const $best       = document.getElementById('best');
const $overlayWin = document.getElementById('overlay-win');
const $overlayLose= document.getElementById('overlay-lose');

document.getElementById('new-game-btn').addEventListener('click', newGame);
document.getElementById('undo-btn').addEventListener('click', undo);
document.getElementById('keep-going-btn').addEventListener('click', () => {
  keepGoing = true;
  $overlayWin.hidden = true;
});
document.getElementById('new-after-win-btn').addEventListener('click', newGame);
document.getElementById('new-after-lose-btn').addEventListener('click', newGame);

/* ── Init ────────────────────────────────────────────────────── */
buildGridCells();
newGame();
updateBestDisplay();

/* ── Build static background grid ───────────────────────────── */
function buildGridCells() {
  for (let i = 0; i < SIZE * SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    $gridCells.appendChild(cell);
  }
}

/* ── New game ────────────────────────────────────────────────── */
function newGame() {
  grid      = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  score     = 0;
  won       = false;
  keepGoing = false;
  history   = [];
  $overlayWin.hidden  = true;
  $overlayLose.hidden = true;
  $tileLayer.innerHTML = '';
  updateScoreDisplay();
  addRandom();
  addRandom();
  renderTiles();
}

/* ── Random tile ─────────────────────────────────────────────── */
function addRandom() {
  const empties = [];
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (!grid[r][c]) empties.push([r, c]);
  if (!empties.length) return;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  grid[r][c] = { id: nextId++, value: Math.random() < 0.9 ? 2 : 4, isNew: true };
}

/* ── Deep clone grid (for undo history) ─────────────────────── */
function cloneGrid() {
  return grid.map(row => row.map(cell => cell ? { ...cell } : null));
}

/* ── Push to undo history ────────────────────────────────────── */
function pushHistory() {
  history.push({ grid: cloneGrid(), score });
  if (history.length > 10) history.shift();
}

/* ── Undo ────────────────────────────────────────────────────── */
function undo() {
  if (!history.length) return;
  const prev = history.pop();
  grid  = prev.grid;
  score = prev.score;
  $overlayWin.hidden  = true;
  $overlayLose.hidden = true;
  updateScoreDisplay();
  renderTiles(false);
}

/* ── Score display ───────────────────────────────────────────── */
function updateScoreDisplay() {
  $score.textContent = score;
  updateBestDisplay();
}
function updateBestDisplay() {
  if (score > best) {
    best = score;
    localStorage.setItem('cupcake2048_best', best);
  }
  $best.textContent = best;
}

/* ── Render all tiles ────────────────────────────────────────── */
function renderTiles(animate = true) {
  /* Remove tiles that are no longer in grid */
  const activeIds = new Set();
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (grid[r][c]) activeIds.add(grid[r][c].id);

  [...$tileLayer.children].forEach(el => {
    if (!activeIds.has(parseInt(el.dataset.id))) el.remove();
  });

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = grid[r][c];
      if (!cell) continue;

      let el = $tileLayer.querySelector(`[data-id="${cell.id}"]`);

      if (!el) {
        el = createTileEl(cell);
        $tileLayer.appendChild(el);
      }

      /* Position */
      const gap  = GAP();
      const size = CELL();
      el.style.top  = `${r * (size + gap)}px`;
      el.style.left = `${c * (size + gap)}px`;

      /* Update value class */
      el.className = `tile tile-${cell.value}`;
      el.dataset.id = cell.id;
      el.innerHTML  = tileInner(cell.value);

      if (animate && cell.isNew) {
        el.classList.add('tile-spawn');
        el.addEventListener('animationend', () => el.classList.remove('tile-spawn'), { once: true });
      }
      if (animate && cell.merged) {
        el.classList.add('tile-merge');
        el.addEventListener('animationend', () => el.classList.remove('tile-merge'), { once: true });
      }
      delete cell.isNew;
      delete cell.merged;
    }
  }
}

/* ── Build tile DOM element ──────────────────────────────────── */
function createTileEl(cell) {
  const el = document.createElement('div');
  el.className  = `tile tile-${cell.value}`;
  el.dataset.id = cell.id;
  el.innerHTML  = tileInner(cell.value);
  return el;
}

function tileInner(value) {
  const imgSrc = CUPCAKE_IMAGES[value];
  if (imgSrc) {
    return `<img class="tile-img" src="${imgSrc}" alt="cupcake tier ${value}" draggable="false">
            <span class="tile-label">${value}</span>`;
  }
  /* Fallback: emoji + number */
  const emojis = { 2:'🍬',4:'🍭',8:'🍩',16:'🍰',32:'🎂',64:'🧁',
                   128:'🍡',256:'🍮',512:'🍪',1024:'🎁',2048:'🏆' };
  return `<span style="font-size:2.2rem;line-height:1">${emojis[value] || '✨'}</span>
          <span class="tile-label">${value}</span>`;
}

/* ── Slide logic ─────────────────────────────────────────────── */

function slide(row) {
  /* Remove nulls */
  let tiles = row.filter(Boolean);
  let gained = 0;
  /* Merge left */
  for (let i = 0; i < tiles.length - 1; i++) {
    if (tiles[i].value === tiles[i + 1].value) {
      tiles[i] = { id: tiles[i].id, value: tiles[i].value * 2, merged: true };
      gained += tiles[i].value;
      tiles.splice(i + 1, 1);
    }
  }
  /* Pad with nulls */
  while (tiles.length < SIZE) tiles.push(null);
  return { tiles, gained };
}

function getRow(r) { return grid[r].slice(); }
function getCol(c) { return grid.map(row => row[c]); }

function move(direction) {
  pushHistory();
  let moved = false;

  const processLine = (line) => {
    let forward = line;
    if (direction === 'right' || direction === 'down') forward = [...line].reverse();
    const { tiles, gained } = slide(forward);
    score += gained;
    if (direction === 'right' || direction === 'down') tiles.reverse();
    return { tiles, changed: JSON.stringify(tiles.map(t => t && t.value)) !== JSON.stringify(line.map(t => t && t.value)), gained };
  };

  if (direction === 'left' || direction === 'right') {
    for (let r = 0; r < SIZE; r++) {
      const { tiles, changed } = processLine(getRow(r));
      if (changed) moved = true;
      grid[r] = tiles;
    }
  } else {
    for (let c = 0; c < SIZE; c++) {
      const { tiles, changed } = processLine(getCol(c));
      if (changed) moved = true;
      for (let r = 0; r < SIZE; r++) grid[r][c] = tiles[r];
    }
  }

  if (!moved) { history.pop(); return; }

  updateScoreDisplay();
  addRandom();
  renderTiles();
  checkEnd();
}

/* ── Win / lose check ────────────────────────────────────────── */
function checkEnd() {
  /* Win */
  if (!keepGoing && !won) {
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (grid[r][c] && grid[r][c].value === 2048) {
          won = true;
          $overlayWin.hidden = false;
          return;
        }
  }

  /* Lose */
  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (!grid[r][c]) return;

  /* No empty — check merges possible */
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = grid[r][c].value;
      if (c + 1 < SIZE && grid[r][c + 1] && grid[r][c + 1].value === v) return;
      if (r + 1 < SIZE && grid[r + 1][c] && grid[r + 1][c].value === v) return;
    }
  }
  $overlayLose.hidden = false;
}

/* ── Keyboard ────────────────────────────────────────────────── */
const keyMap = {
  ArrowLeft: 'left', ArrowRight: 'right',
  ArrowUp:   'up',   ArrowDown:  'down',
  h: 'left', l: 'right', k: 'up', j: 'down',   /* vim bindings bonus */
};

document.addEventListener('keydown', e => {
  const dir = keyMap[e.key];
  if (!dir) return;
  e.preventDefault();
  move(dir);
});

/* ── Touch / swipe ───────────────────────────────────────────── */
let touchX = null, touchY = null;

document.addEventListener('touchstart', e => {
  touchX = e.touches[0].clientX;
  touchY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  touchX = touchY = null;

  if (Math.abs(dx) < 20 && Math.abs(dy) < 20) return;
  if (Math.abs(dx) > Math.abs(dy)) {
    move(dx > 0 ? 'right' : 'left');
  } else {
    move(dy > 0 ? 'down' : 'up');
  }
}, { passive: true });
