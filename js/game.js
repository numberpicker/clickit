// game.js - Click Cookies Main Game Engine
const CookieGame = (function () {

  // ─── Cookie Types (20+) ───────────────────────────────────────────────────
  const COOKIE_TYPES = [
    { id: 'classic',      name: 'Classic Cookie',        image: 'images/classic-cookie.png', points: 1,    rarity: 'common',    color: '#D2691E', speed: 2.5, size: 52, requiredLevel: 1  },
    { id: 'choco',        name: 'Chocolate Chip',        image: 'images/chocolate-chip.png', points: 2,    rarity: 'common',    color: '#5C3317', speed: 2.8, size: 50, requiredLevel: 1  },
    { id: 'sugar',        name: 'Sugar Cookie',          image: 'images/sugar-cookie.png', points: 3,    rarity: 'common',    color: '#FFD700', speed: 3.0, size: 48, requiredLevel: 1  },
    { id: 'peanut',       name: 'Peanut Butter',         image: 'images/peanut-butter.png', points: 4,    rarity: 'common',    color: '#C8A96E', speed: 3.2, size: 50, requiredLevel: 2  },
    { id: 'oatmeal',      name: 'Oatmeal Raisin',        image: 'images/oatmeal-raisin.png', points: 5,    rarity: 'common',    color: '#A0785A', speed: 3.0, size: 52, requiredLevel: 2  },
    { id: 'snickerdoodle',name: 'Snickerdoodle',         image: 'images/snickerdoodle.png', points: 6,    rarity: 'uncommon',  color: '#F4A460', speed: 3.5, size: 50, requiredLevel: 3  },
    { id: 'macaroon',     name: 'Coconut Macaroon',      image: 'images/coconut-macaroon.png', points: 8,    rarity: 'uncommon',  color: '#FFF8DC', speed: 3.3, size: 48, requiredLevel: 3  },
    { id: 'ginger',       name: 'Gingerbread',           image: 'images/gingerbread.png', points: 10,   rarity: 'uncommon',  color: '#8B4513', speed: 3.8, size: 54, requiredLevel: 4  },
    { id: 'macaron',      name: 'French Macaron',        image: 'images/french-macaron.png', points: 12,   rarity: 'uncommon',  color: '#FFB6C1', speed: 4.0, size: 50, requiredLevel: 4  },
    { id: 'lemon',        name: 'Lemon Drizzle',         image: 'images/lemon-drizzle.png', points: 15,   rarity: 'uncommon',  color: '#FFF44F', speed: 4.2, size: 48, requiredLevel: 5  },
    { id: 'rainbow',      name: 'Rainbow Cookie',        image: 'images/rainbow-cookie.png', points: 20,   rarity: 'rare',      color: '#FF6B9D', speed: 4.5, size: 52, requiredLevel: 5  },
    { id: 'sprinkle',     name: 'Sprinkle Explosion',    image: 'images/sprinkle-explosion.png', points: 25,   rarity: 'rare',      color: '#FF69B4', speed: 4.8, size: 50, requiredLevel: 6  },
    { id: 'choco_lava',   name: 'Chocolate Lava',        image: 'images/chocolate-lava.png', points: 30,   rarity: 'rare',      color: '#3D0C02', speed: 5.0, size: 56, requiredLevel: 6  },
    { id: 'galaxy',       name: 'Galaxy Cookie',         image: 'images/galaxy-cookie.png', points: 40,   rarity: 'epic',      color: '#1a0533', speed: 5.5, size: 58, requiredLevel: 7  },
    { id: 'unicorn',      name: 'Unicorn Cookie',        image: 'images/unicorn-cookie.png', points: 50,   rarity: 'epic',      color: '#E0B0FF', speed: 5.8, size: 54, requiredLevel: 7  },
    { id: 'dragon',       name: 'Dragon Cookie',         image: 'images/dragon-cookie.png', points: 75,   rarity: 'epic',      color: '#FF4500', speed: 6.2, size: 60, requiredLevel: 8  },
    { id: 'diamond',      name: 'Diamond Cookie',        image: 'images/diamond-cookie.png', points: 100,  rarity: 'legendary', color: '#B9F2FF', speed: 6.8, size: 62, requiredLevel: 9  },
    { id: 'golden',       name: 'Golden Cookie',         image: 'images/golden-cookie.png', points: 150,  rarity: 'legendary', color: '#FFD700', speed: 7.2, size: 64, requiredLevel: 9  },
    { id: 'cosmic',       name: 'Cosmic Cookie',         image: 'images/cosmic-cookie.png', points: 200,  rarity: 'legendary', color: '#9B59B6', speed: 7.5, size: 66, requiredLevel: 10 },
    { id: 'void',         name: 'Void Cookie',           image: 'images/void-cookie.png', points: 500,  rarity: 'mythic',    color: '#0a0a0a', speed: 8.5, size: 70, requiredLevel: 10 },
    { id: 'infinity',     name: 'Infinity Cookie',       image: 'images/infinity-cookie.png', points: 1000, rarity: 'mythic',    color: '#FF00FF', speed: 9.0, size: 72, requiredLevel: 10 },
  ];

  // ─── Levels ───────────────────────────────────────────────────────────────
  const LEVELS = [
    { level: 1,  name: 'Cookie Rookie',      required: 0,       spawnRate: 1800, maxFalling: 4  },
    { level: 2,  name: 'Cookie Apprentice',  required: 200,     spawnRate: 1600, maxFalling: 5  },
    { level: 3,  name: 'Cookie Baker',       required: 600,     spawnRate: 1400, maxFalling: 5  },
    { level: 4,  name: 'Cookie Chef',        required: 1500,    spawnRate: 1200, maxFalling: 6  },
    { level: 5,  name: 'Cookie Master',      required: 4000,    spawnRate: 1000, maxFalling: 7  },
    { level: 6,  name: 'Cookie Wizard',      required: 10000,   spawnRate: 850,  maxFalling: 8  },
    { level: 7,  name: 'Cookie Sorcerer',    required: 25000,   spawnRate: 700,  maxFalling: 9  },
    { level: 8,  name: 'Cookie Overlord',    required: 60000,   spawnRate: 550,  maxFalling: 10 },
    { level: 9,  name: 'Cookie Legend',      required: 150000,  spawnRate: 400,  maxFalling: 12 },
    { level: 10, name: 'Cookie God',         required: 500000,  spawnRate: 250,  maxFalling: 15 },
  ];

  // ─── Upgrades ─────────────────────────────────────────────────────────────
  const UPGRADES_DATA = [
    { id: 'bigger_clicks',    name: 'Bigger Clicks',       desc: '+50% points per click',       cost: 100,    effect: 'clickMultiplier', value: 1.5,  icon: '👆', maxLevel: 5  },
    { id: 'faster_fall',      name: 'Cookie Rain',         desc: 'Cookies spawn 20% faster',    cost: 200,    effect: 'spawnBoost',      value: 0.8,  icon: '🌧️', maxLevel: 3  },
    { id: 'magnet',           name: 'Cookie Magnet',       desc: 'Auto-collect missed cookies', cost: 500,    effect: 'magnet',          value: true, icon: '🧲', maxLevel: 1  },
    { id: 'double_points',    name: 'Double Dough',        desc: '2x points for 30 seconds',    cost: 750,    effect: 'doublePoints',    value: 2,    icon: '✌️', maxLevel: 1  },
    { id: 'slow_fall',        name: 'Slow Drizzle',        desc: 'Cookies fall 25% slower',     cost: 400,    effect: 'slowFall',        value: 0.75, icon: '🐢', maxLevel: 3  },
    { id: 'bonus_cookies',    name: 'Bonus Batch',         desc: '+1 extra cookie per spawn',   cost: 600,    effect: 'extraSpawn',      value: 1,    icon: '🎁', maxLevel: 4  },
    { id: 'golden_touch',     name: 'Golden Touch',        desc: 'Chance for golden cookies',   cost: 1000,   effect: 'goldenChance',    value: 0.1,  icon: '✨', maxLevel: 3  },
    { id: 'time_freeze',      name: 'Time Freeze',         desc: 'Freeze all cookies 5s',       cost: 1500,   effect: 'timeFreeze',      value: 5000, icon: '❄️', maxLevel: 1  },
    { id: 'multiplier_x3',   name: 'Triple Threat',       desc: '3x click multiplier',         cost: 3000,   effect: 'clickMultiplier', value: 3,    icon: '3️⃣', maxLevel: 1  },
    { id: 'auto_click',       name: 'Auto Baker',          desc: 'Auto-clicks 1 cookie/sec',    cost: 5000,   effect: 'autoClick',       value: 1,    icon: '🤖', maxLevel: 5  },
  ];

  // ─── Achievements ─────────────────────────────────────────────────────────
  const ACHIEVEMENTS_DATA = [
    { id: 'first_click',      name: 'First Bite',          desc: 'Click your first cookie',               icon: '🍪', condition: s => s.totalClicks >= 1      },
    { id: 'clicks_10',        name: 'Getting Warmed Up',   desc: 'Click 10 cookies',                      icon: '🔥', condition: s => s.totalClicks >= 10     },
    { id: 'clicks_100',       name: 'Cookie Addict',       desc: 'Click 100 cookies',                     icon: '😋', condition: s => s.totalClicks >= 100    },
    { id: 'clicks_1000',      name: 'Click Machine',       desc: 'Click 1,000 cookies',                   icon: '⚡', condition: s => s.totalClicks >= 1000   },
    { id: 'clicks_10000',     name: 'Click Legend',        desc: 'Click 10,000 cookies',                  icon: '🏆', condition: s => s.totalClicks >= 10000  },
    { id: 'score_500',        name: 'Sweet Start',         desc: 'Earn 500 points',                       icon: '⭐', condition: s => s.totalScore >= 500     },
    { id: 'score_5000',       name: 'Sugar Rush',          desc: 'Earn 5,000 points',                     icon: '💫', condition: s => s.totalScore >= 5000    },
    { id: 'score_50000',      name: 'Cookie Millionaire',  desc: 'Earn 50,000 points',                    icon: '💰', condition: s => s.totalScore >= 50000   },
    { id: 'score_1m',         name: 'Cookie Billionaire',  desc: 'Earn 1,000,000 points',                 icon: '🌟', condition: s => s.totalScore >= 1000000 },
    { id: 'level_5',          name: 'Halfway There',       desc: 'Reach Level 5',                         icon: '🎯', condition: s => s.level >= 5            },
    { id: 'level_10',         name: 'Cookie God',          desc: 'Reach Level 10',                        icon: '👑', condition: s => s.level >= 10           },
    { id: 'golden_cookie',    name: 'Golden Moment',       desc: 'Click a Golden Cookie',                 icon: '🏅', condition: s => s.goldenClicks >= 1     },
    { id: 'golden_10',        name: 'Gold Rush',           desc: 'Click 10 Golden Cookies',               icon: '🥇', condition: s => s.goldenClicks >= 10    },
    { id: 'void_cookie',      name: 'Into the Void',       desc: 'Click a Void Cookie',                   icon: '🌑', condition: s => s.voidClicks >= 1       },
    { id: 'no_miss_50',       name: 'Perfect Catcher',     desc: 'Catch 50 cookies without missing',      icon: '🎪', condition: s => s.perfectStreak >= 50   },
    { id: 'upgrade_1',        name: 'Upgrade Initiate',    desc: 'Buy your first upgrade',                icon: '🔧', condition: s => s.upgradesBought >= 1   },
    { id: 'upgrade_5',        name: 'Upgrade Enthusiast',  desc: 'Buy 5 upgrades',                        icon: '⚙️', condition: s => s.upgradesBought >= 5   },
    { id: 'all_types',        name: 'Cookie Collector',    desc: 'Click every type of cookie',            icon: '📋', condition: s => s.cookieTypesClicked.size >= 21 },
    { id: 'combo_x10',        name: 'Combo King',          desc: 'Reach a 10x combo',                     icon: '🔥', condition: s => s.maxCombo >= 10        },
    { id: 'combo_x50',        name: 'Combo God',           desc: 'Reach a 50x combo',                     icon: '💥', condition: s => s.maxCombo >= 50        },
    { id: 'survive_5min',     name: 'Dedicated Baker',     desc: 'Play for 5 minutes straight',           icon: '⏱️', condition: s => s.sessionTime >= 300    },
  ];

  // ─── State ────────────────────────────────────────────────────────────────
  let state = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    level: 1,
    goldenClicks: 0,
    voidClicks: 0,
    perfectStreak: 0,
    maxCombo: 0,
    currentCombo: 0,
    comboTimer: null,
    upgradesBought: 0,
    cookieTypesClicked: new Set(),
    sessionTime: 0,
    sessionStart: Date.now(),
    fallingCookies: [],
    achievements: new Set(),
    upgrades: {},
    clickMultiplier: 1,
    isDoublePoints: false,
    isFrozen: false,
    isMagnet: false,
    isAutoClick: false,
    autoClickInterval: null,
    spawnInterval: null,
    gameLoop: null,
    gameRunning: false,
    missedCookies: 0,
    totalMissed: 0,
    totalCaught: 0,
    leaderboard: [],
  };

  let canvas, ctx, gameArea, scoreDisplay, levelDisplay, comboDisplay;

  // ─── Audio Engine ─────────────────────────────────────────────────────────
  const Audio = (function () {
    const ac = new (window.AudioContext || window.webkitAudioContext)();
    function playTone(freq, type, dur, vol = 0.3) {
      try {
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.connect(g); g.connect(ac.destination);
        o.type = type; o.frequency.value = freq;
        g.gain.setValueAtTime(vol, ac.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
        o.start(); o.stop(ac.currentTime + dur);
      } catch (e) {}
    }
    return {
      click:   () => playTone(600, 'sine', 0.12, 0.25),
      combo:   (n) => playTone(400 + n * 40, 'square', 0.08, 0.2),
      upgrade: () => { playTone(523, 'sine', 0.15); setTimeout(() => playTone(659, 'sine', 0.15), 120); setTimeout(() => playTone(784, 'sine', 0.25), 240); },
      achieve: () => { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 'sine', 0.2, 0.3), i * 100)); },
      golden:  () => { [784, 1047, 1319].forEach((f, i) => setTimeout(() => playTone(f, 'sine', 0.18, 0.35), i * 80)); },
      miss:    () => playTone(200, 'sawtooth', 0.08, 0.1),
      level:   () => { [523, 659, 784, 880, 1047].forEach((f, i) => setTimeout(() => playTone(f, 'triangle', 0.3, 0.4), i * 100)); },
    };
  })();

  // ─── Utilities ────────────────────────────────────────────────────────────
  function formatScore(n) {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
    return n.toString();
  }

  function getRarityColor(rarity) {
    return { common: '#78c879', uncommon: '#5b9cf6', rare: '#a855f7', epic: '#f59e0b', legendary: '#ef4444', mythic: '#ff00ff' }[rarity] || '#78c879';
  }

  function getCurrentLevel() {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (state.totalScore >= LEVELS[i].required) return LEVELS[i];
    }
    return LEVELS[0];
  }

  // ─── Spawn Cookies ────────────────────────────────────────────────────────
  function getAvailableCookies() {
    return COOKIE_TYPES.filter(c => c.requiredLevel <= state.level);
  }

  function spawnCookie() {
    if (!state.gameRunning) return;
    const lvl = getCurrentLevel();
    if (state.fallingCookies.length >= lvl.maxFalling) return;

    const available = getAvailableCookies();
    // Weighted selection by rarity
    const weights = available.map(c => {
      switch (c.rarity) {
        case 'common': return 40;
        case 'uncommon': return 25;
        case 'rare': return 15;
        case 'epic': return 10;
        case 'legendary': return 7;
        case 'mythic': return 3;
        default: return 30;
      }
    });
    const totalW = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * totalW;
    let chosen = available[0];
    for (let i = 0; i < available.length; i++) {
      r -= weights[i];
      if (r <= 0) { chosen = available[i]; break; }
    }

    // Apply upgrades
    let speed = chosen.speed;
    if (state.upgrades['slow_fall']) speed *= 0.75;
    if (state.isFrozen) speed = 0;

    const areaRect = gameArea.getBoundingClientRect();
    const w = areaRect.width || 600;
    const cookie = {
      id: Date.now() + Math.random(),
      type: chosen,
      x: Math.random() * (w - chosen.size - 20) + 10,
      y: -chosen.size - 10,
      speed: speed + Math.random() * 0.5,
      size: chosen.size + (state.level * 0.5),
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.02,
      rotation: 0,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      opacity: 1,
      dying: false,
      el: null,
    };

    // Create DOM element
    const el = document.createElement('div');
    el.className = `falling-cookie rarity-${chosen.rarity}`;
    el.innerHTML = `<img src="${chosen.image}" alt="${chosen.name}" style="width:100%;height:100%;object-fit:contain;pointer-events:none;border-radius:50%;">`;
    el.style.cssText = `
      position:absolute; left:${cookie.x}px; top:${cookie.y}px;
      width:${cookie.size}px; height:${cookie.size}px;
      cursor:pointer; user-select:none; z-index:10;
      transition:transform 0.05s;
      filter: drop-shadow(0 2px 6px ${chosen.color}88);
    `;
    el.addEventListener('click', (e) => { e.stopPropagation(); clickCookie(cookie, el); });
    el.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); clickCookie(cookie, el); }, { passive: false });

    gameArea.appendChild(el);
    cookie.el = el;
    state.fallingCookies.push(cookie);

    // Extra spawn from upgrade
    if (state.upgrades['bonus_cookies'] && Math.random() < 0.3) {
      setTimeout(spawnCookie, 200);
    }
  }

  // ─── Game Loop ────────────────────────────────────────────────────────────
  function gameLoop() {
    if (!state.gameRunning) return;
    const areaRect = gameArea.getBoundingClientRect();
    const h = areaRect.height || 500;

    state.fallingCookies = state.fallingCookies.filter(cookie => {
      if (!cookie.el) return false;

      cookie.wobble += cookie.wobbleSpeed;
      cookie.rotation += cookie.rotSpeed;
      cookie.y += state.isFrozen ? 0 : cookie.speed;
      const wobbleX = Math.sin(cookie.wobble) * 8;

      cookie.el.style.left = (cookie.x + wobbleX) + 'px';
      cookie.el.style.top = cookie.y + 'px';
      cookie.el.style.transform = `rotate(${cookie.rotation}rad)`;

      // Off screen — missed
      if (cookie.y > h + 10) {
        // Magnet upgrade auto-collects
        if (state.upgrades['magnet']) {
          clickCookie(cookie, cookie.el, true);
          return false;
        }
        cookie.el.remove();
        state.missedCookies++;
        state.totalMissed++;
        state.perfectStreak = 0;
        state.currentCombo = 0;
        updateComboDisplay();
        Audio.miss();
        showMissEffect(cookie.x, h - 30);
        return false;
      }
      return true;
    });

    updateSessionTime();
    requestAnimationFrame(gameLoop);
  }

  // ─── Click Handler ────────────────────────────────────────────────────────
  function clickCookie(cookie, el, auto = false) {
    if (!cookie || !el || cookie.dying) return;
    cookie.dying = true;

    const idx = state.fallingCookies.indexOf(cookie);
    if (idx > -1) state.fallingCookies.splice(idx, 1);

    // Points calculation
    let pts = cookie.type.points;
    pts *= state.clickMultiplier;
    if (state.isDoublePoints) pts *= 2;
    if (state.upgrades['bigger_clicks']) pts = Math.floor(pts * 1.5 * (state.upgrades['bigger_clicks'] || 1));
    pts = Math.floor(pts);

    // Combo
    state.currentCombo++;
    if (state.currentCombo > state.maxCombo) state.maxCombo = state.currentCombo;
    if (state.comboTimer) clearTimeout(state.comboTimer);
    state.comboTimer = setTimeout(() => { state.currentCombo = 0; updateComboDisplay(); }, 2500);

    const comboBonus = Math.floor(pts * (state.currentCombo - 1) * 0.05);
    pts += comboBonus;

    state.score += pts;
    state.totalScore += pts;
    state.totalClicks++;
    state.totalCaught++;
    state.perfectStreak++;
    state.cookieTypesClicked.add(cookie.type.id);

    if (cookie.type.id === 'golden') state.goldenClicks++;
    if (cookie.type.id === 'void') state.voidClicks++;

    // Show points popup
    showPointsPopup(el, pts, cookie.type.rarity, state.currentCombo);

    // Pop animation
    el.style.transform = 'scale(1.5)';
    el.style.opacity = '0';
    el.style.transition = 'all 0.2s ease';
    setTimeout(() => el.remove(), 200);

    if (!auto) {
      if (cookie.type.rarity === 'legendary' || cookie.type.rarity === 'mythic') Audio.golden();
      else Audio.click();
      if (state.currentCombo >= 3) Audio.combo(Math.min(state.currentCombo, 10));
    }

    updateUI();
    checkLevelUp();
    checkAchievements();
    saveGame();
  }

  // ─── UI Updates ───────────────────────────────────────────────────────────
  function showPointsPopup(el, pts, rarity, combo) {
    const rect = el.getBoundingClientRect();
    const areaRect = gameArea.getBoundingClientRect();
    const popup = document.createElement('div');
    popup.className = 'points-popup';
    popup.textContent = (combo >= 3 ? `${combo}x ` : '') + '+' + formatScore(pts);
    popup.style.cssText = `
      position:absolute;
      left:${rect.left - areaRect.left + rect.width / 2}px;
      top:${rect.top - areaRect.top}px;
      color:${getRarityColor(rarity)};
      font-size:${Math.min(14 + combo * 1.5, 28)}px;
      font-weight:800;
      pointer-events:none;
      z-index:100;
      text-shadow: 0 2px 8px rgba(0,0,0,0.3);
      white-space:nowrap;
      transform:translateX(-50%);
    `;
    gameArea.appendChild(popup);
    requestAnimationFrame(() => {
      popup.style.transition = 'all 0.7s ease-out';
      popup.style.top = (rect.top - areaRect.top - 60) + 'px';
      popup.style.opacity = '0';
    });
    setTimeout(() => popup.remove(), 750);
  }

  function showMissEffect(x, y) {
    const miss = document.createElement('div');
    miss.textContent = '💨 missed';
    miss.style.cssText = `position:absolute;left:${x}px;top:${y}px;color:#ff6b6b;font-size:12px;font-weight:700;pointer-events:none;z-index:100;opacity:0.8;`;
    gameArea.appendChild(miss);
    setTimeout(() => { miss.style.opacity = '0'; miss.style.transition = 'opacity 0.5s'; setTimeout(() => miss.remove(), 500); }, 100);
  }

  function updateUI() {
    const scoreEl = document.getElementById('current-score');
    const totalEl = document.getElementById('total-score');
    const levelNameEl = document.getElementById('level-name');
    const levelNumEl = document.getElementById('level-num');
    const progressEl = document.getElementById('level-progress');
    const nextEl = document.getElementById('next-level-score');
    const missEl = document.getElementById('missed-count');
    const caughtEl = document.getElementById('caught-count');
    const clicksEl = document.getElementById('total-clicks');

    if (scoreEl) scoreEl.textContent = formatScore(state.score);
    if (totalEl) totalEl.textContent = formatScore(state.totalScore);

    const lvl = getCurrentLevel();
    const nextLvl = LEVELS[lvl.level] || null;
    if (levelNameEl) levelNameEl.textContent = lvl.name;
    if (levelNumEl) levelNumEl.textContent = lvl.level;
    if (nextEl) nextEl.textContent = nextLvl ? formatScore(nextLvl.required) : 'MAX';
    if (progressEl && nextLvl) {
      const pct = Math.min(100, ((state.totalScore - lvl.required) / (nextLvl.required - lvl.required)) * 100);
      progressEl.style.width = pct + '%';
    }
    if (missEl) missEl.textContent = state.totalMissed;
    if (caughtEl) caughtEl.textContent = state.totalCaught;
    if (clicksEl) clicksEl.textContent = formatScore(state.totalClicks);

    updateComboDisplay();
  }

  function updateComboDisplay() {
    const comboEl = document.getElementById('combo-display');
    if (!comboEl) return;
    if (state.currentCombo >= 3) {
      comboEl.textContent = `🔥 ${state.currentCombo}x COMBO`;
      comboEl.style.opacity = '1';
      comboEl.className = 'combo-display combo-active';
    } else {
      comboEl.style.opacity = '0';
    }
  }

  // ─── Level Up ─────────────────────────────────────────────────────────────
  function checkLevelUp() {
    const newLvl = getCurrentLevel();
    if (newLvl.level > state.level) {
      state.level = newLvl.level;
      Audio.level();
      showLevelUpBanner(newLvl);
      restartSpawnInterval();
      updateUpgradesPanel();
    }
  }

  function showLevelUpBanner(lvl) {
    const banner = document.getElementById('levelup-banner');
    if (!banner) return;
    banner.innerHTML = `<span>🎉 Level Up!</span><br><strong>${lvl.name}</strong><br><small>Level ${lvl.level}</small>`;
    banner.classList.add('show');
    setTimeout(() => banner.classList.remove('show'), 3000);
  }

  // ─── Achievements ─────────────────────────────────────────────────────────
  function checkAchievements() {
    ACHIEVEMENTS_DATA.forEach(a => {
      if (!state.achievements.has(a.id) && a.condition(state)) {
        state.achievements.add(a.id);
        Audio.achieve();
        showAchievementToast(a);
        updateAchievementsPanel();
        saveGame();
      }
    });
  }

  function showAchievementToast(a) {
    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `<span class="toast-icon">${a.icon}</span><div><strong>${a.name}</strong><br><small>${a.desc}</small></div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 500); }, 3500);
  }

  // ─── Upgrades Panel ───────────────────────────────────────────────────────
  function updateUpgradesPanel() {
    const panel = document.getElementById('upgrades-panel');
    if (!panel) return;
    panel.innerHTML = UPGRADES_DATA.map(u => {
      const owned = state.upgrades[u.id] || 0;
      const maxed = owned >= u.maxLevel;
      const cost = Math.floor(u.cost * Math.pow(1.8, owned));
      const canBuy = state.score >= cost && !maxed;
      return `<div class="upgrade-card ${maxed ? 'maxed' : ''} ${canBuy ? 'buyable' : ''}" onclick="CookieGame.buyUpgrade('${u.id}')">
        <span class="upgrade-icon">${u.icon}</span>
        <div class="upgrade-info">
          <div class="upgrade-name">${u.name}</div>
          <div class="upgrade-desc">${u.desc}</div>
          <div class="upgrade-level">Lv ${owned}/${u.maxLevel}</div>
        </div>
        <div class="upgrade-cost">${maxed ? '✅ MAX' : '🍪 ' + formatScore(cost)}</div>
      </div>`;
    }).join('');
  }

  function buyUpgrade(id) {
    const u = UPGRADES_DATA.find(x => x.id === id);
    if (!u) return;
    const owned = state.upgrades[id] || 0;
    if (owned >= u.maxLevel) return;
    const cost = Math.floor(u.cost * Math.pow(1.8, owned));
    if (state.score < cost) { shakeScoreDisplay(); return; }

    state.score -= cost;
    state.upgrades[id] = owned + 1;
    state.upgradesBought++;
    Audio.upgrade();

    // Apply effects
    if (u.effect === 'clickMultiplier') state.clickMultiplier = u.value * (owned + 1);
    if (u.effect === 'doublePoints') { state.isDoublePoints = true; setTimeout(() => state.isDoublePoints = false, 30000); }
    if (u.effect === 'magnet') state.isMagnet = true;
    if (u.effect === 'timeFreeze') { state.isFrozen = true; setTimeout(() => state.isFrozen = false, u.value); }
    if (u.effect === 'autoClick') startAutoClick();
    if (u.effect === 'spawnBoost') restartSpawnInterval();

    updateUI();
    updateUpgradesPanel();
    checkAchievements();
    saveGame();
  }

  function shakeScoreDisplay() {
    const el = document.getElementById('current-score');
    if (!el) return;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 400);
  }

  // ─── Achievements Panel ───────────────────────────────────────────────────
  function updateAchievementsPanel() {
    const panel = document.getElementById('achievements-panel');
    if (!panel) return;
    panel.innerHTML = ACHIEVEMENTS_DATA.map(a => {
      const earned = state.achievements.has(a.id);
      return `<div class="achievement-card ${earned ? 'earned' : 'locked'}">
        <span class="ach-icon">${earned ? a.icon : '🔒'}</span>
        <div class="ach-info">
          <div class="ach-name">${a.name}</div>
          <div class="ach-desc">${earned ? a.desc : '???'}</div>
        </div>
      </div>`;
    }).join('');
  }

  // ─── Cookie Catalogue ─────────────────────────────────────────────────────
  function renderCookieCatalogue() {
    const panel = document.getElementById('cookie-catalogue');
    if (!panel) return;
    panel.innerHTML = COOKIE_TYPES.map(c => {
      const discovered = state.cookieTypesClicked.has(c.id);
      return `<div class="catalogue-card rarity-border-${c.rarity}" style="--cookie-color:${c.color}">
        <div class="cat-emoji">${discovered ? `<img src="${c.image}" alt="${c.name}" style="width:40px;height:40px;object-fit:contain;border-radius:50%;">` : '❓'}</div>
        <div class="cat-name">${discovered ? c.name : '???'}</div>
        <div class="cat-rarity" style="color:${getRarityColor(c.rarity)}">${c.rarity}</div>
        <div class="cat-pts">${discovered ? '+' + c.points + ' pts' : 'Click to discover'}</div>
        <div class="cat-level">Lv.${c.requiredLevel}+</div>
      </div>`;
    }).join('');
  }

  // ─── Leaderboard ─────────────────────────────────────────────────────────
  function updateLeaderboard() {
    const board = JSON.parse(localStorage.getItem('cc_leaderboard') || '[]');
    const existing = board.findIndex(e => e.name === 'You');
    const entry = { name: 'You', score: state.totalScore, level: state.level, date: new Date().toLocaleDateString() };
    if (existing > -1) board[existing] = entry; else board.push(entry);
    board.sort((a, b) => b.score - a.score);
    const top10 = board.slice(0, 10);
    localStorage.setItem('cc_leaderboard', JSON.stringify(top10));

    const panel = document.getElementById('leaderboard-body');
    if (!panel) return;
    const legends = [
      { name: 'CookieMaster99', score: 9820450, level: 10 },
      { name: 'SweetClicker', score: 4512000, level: 10 },
      { name: 'BiscuitLord', score: 2340000, level: 9 },
    ];
    const allEntries = [...legends, ...top10].sort((a, b) => b.score - a.score).slice(0, 10);
    panel.innerHTML = allEntries.map((e, i) => `
      <tr class="${e.name === 'You' ? 'my-row' : ''}">
        <td>${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</td>
        <td>${e.name}</td>
        <td>${formatScore(e.score)}</td>
        <td>${e.level}</td>
      </tr>`).join('');
  }

  // ─── Session Timer ─────────────────────────────────────────────────────────
  function updateSessionTime() {
    state.sessionTime = Math.floor((Date.now() - state.sessionStart) / 1000);
  }

  // ─── Auto-click ─────────────────────────────────────────────────────────
  function startAutoClick() {
    if (state.autoClickInterval) clearInterval(state.autoClickInterval);
    state.autoClickInterval = setInterval(() => {
      if (state.fallingCookies.length > 0) {
        const c = state.fallingCookies[0];
        if (c && c.el) clickCookie(c, c.el, true);
      }
    }, 1000 / (state.upgrades['auto_click'] || 1));
  }

  // ─── Spawn Interval ───────────────────────────────────────────────────────
  function restartSpawnInterval() {
    if (state.spawnInterval) clearInterval(state.spawnInterval);
    const lvl = getCurrentLevel();
    let rate = lvl.spawnRate;
    if (state.upgrades['faster_fall']) rate *= 0.8;

    // Initial burst
    spawnCookie();
    state.spawnInterval = setInterval(() => {
      if (state.gameRunning) spawnCookie();
    }, rate);
  }

  // ─── Start / Pause / Reset ────────────────────────────────────────────────
  function startGame() {
    if (state.gameRunning) return;
    state.gameRunning = true;
    state.sessionStart = Date.now();
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    if (startBtn) startBtn.style.display = 'none';
    if (pauseBtn) pauseBtn.style.display = 'inline-flex';
    restartSpawnInterval();
    requestAnimationFrame(gameLoop);
    updateUpgradesPanel();
    updateAchievementsPanel();
    renderCookieCatalogue();
    updateLeaderboard();
  }

  function pauseGame() {
    state.gameRunning = !state.gameRunning;
    const pauseBtn = document.getElementById('pause-btn');
    if (pauseBtn) pauseBtn.textContent = state.gameRunning ? '⏸ Pause' : '▶ Resume';
    if (state.gameRunning) {
      restartSpawnInterval();
      requestAnimationFrame(gameLoop);
    } else {
      if (state.spawnInterval) clearInterval(state.spawnInterval);
    }
  }

  function resetGame() {
    if (!confirm('Reset your game? This cannot be undone!')) return;
    state.gameRunning = false;
    if (state.spawnInterval) clearInterval(state.spawnInterval);
    if (state.autoClickInterval) clearInterval(state.autoClickInterval);
    state.fallingCookies.forEach(c => c.el && c.el.remove());
    state.fallingCookies = [];
    state.score = 0; state.totalScore = 0; state.totalClicks = 0;
    state.level = 1; state.goldenClicks = 0; state.voidClicks = 0;
    state.perfectStreak = 0; state.maxCombo = 0; state.currentCombo = 0;
    state.upgradesBought = 0; state.cookieTypesClicked = new Set();
    state.achievements = new Set(); state.upgrades = {};
    state.clickMultiplier = 1; state.totalMissed = 0; state.totalCaught = 0;
    localStorage.removeItem('cc_save');
    updateUI();
    updateUpgradesPanel();
    updateAchievementsPanel();
    renderCookieCatalogue();
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    if (startBtn) startBtn.style.display = 'inline-flex';
    if (pauseBtn) pauseBtn.style.display = 'none';
  }

  // ─── Save / Load ──────────────────────────────────────────────────────────
  function saveGame() {
    const save = {
      score: state.score, totalScore: state.totalScore, totalClicks: state.totalClicks,
      level: state.level, goldenClicks: state.goldenClicks, voidClicks: state.voidClicks,
      perfectStreak: state.perfectStreak, maxCombo: state.maxCombo,
      upgradesBought: state.upgradesBought, cookieTypesClicked: [...state.cookieTypesClicked],
      achievements: [...state.achievements], upgrades: state.upgrades,
      clickMultiplier: state.clickMultiplier, totalMissed: state.totalMissed, totalCaught: state.totalCaught,
    };
    localStorage.setItem('cc_save', JSON.stringify(save));
  }

  function loadGame() {
    try {
      const save = JSON.parse(localStorage.getItem('cc_save') || 'null');
      if (!save) return;
      Object.assign(state, {
        ...save,
        cookieTypesClicked: new Set(save.cookieTypesClicked),
        achievements: new Set(save.achievements),
        fallingCookies: [],
        gameRunning: false,
      });
    } catch (e) {}
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    gameArea = document.getElementById('game-area');
    if (!gameArea) return;
    loadGame();
    updateUI();
    updateUpgradesPanel();
    updateAchievementsPanel();
    renderCookieCatalogue();
    updateLeaderboard();

    // Tab switching — handled by ui.js; game.js just refreshes content when needed
    document.querySelectorAll('.game-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const t = tab.dataset.tab;
        if (t === 'catalogue-panel-wrap') renderCookieCatalogue();
        if (t === 'leaderboard-panel-wrap') updateLeaderboard();
      });
    });

    // Auto-save
    setInterval(saveGame, 15000);
    setInterval(updateLeaderboard, 30000);
  }

  return { init, startGame, pauseGame, resetGame, buyUpgrade, formatScore };
})();

document.addEventListener('DOMContentLoaded', CookieGame.init);
