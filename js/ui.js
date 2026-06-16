// ui.js — Click Cookies UI Interactions & Extras

document.addEventListener('DOMContentLoaded', function () {

  // Ensure first tab panel is active on load
  const firstPanel = document.querySelector('.tab-panel');
  if (firstPanel && !firstPanel.classList.contains('active')) firstPanel.classList.add('active');

  // ── FAQ Accordion ──────────────────────────────────────────────────────────
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Scroll Reveal ──────────────────────────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = Array.from(entry.target.parentElement?.children || [entry.target]);
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));

  // ── Active nav link on scroll ──────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => sectionObserver.observe(s));

  // ── Game start overlay hide on game start ─────────────────────────────────
  const overlay = document.getElementById('game-start-overlay');
  const _origStart = CookieGame.startGame;
  CookieGame.startGame = function () {
    _origStart();
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.4s';
      setTimeout(() => { overlay.style.display = 'none'; }, 400);
    }
  };

  // ── Confetti burst helper ─────────────────────────────────────────────────
  window.burstConfetti = function (x, y, count = 12) {
    const emojis = ['🍪', '⭐', '🎉', '✨', '🍫', '🌈', '💫'];
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = (x + (Math.random() - 0.5) * 60) + 'px';
      el.style.top  = (y + (Math.random() - 0.5) * 30) + 'px';
      el.style.animationDuration = (0.7 + Math.random() * 0.8) + 's';
      el.style.animationDelay   = (Math.random() * 0.2) + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1600);
    }
  };

  // ── Hero big cookie easter egg ─────────────────────────────────────────────
  window.heroCookieClick = function (el) {
    el.style.transform = 'scale(0.85) rotate(-10deg)';
    setTimeout(() => { el.style.transform = ''; }, 150);

    // Spawn mini cookies from hero
    const rect = el.getBoundingClientRect();
    burstConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 8);

    // Counter
    el._clicks = (el._clicks || 0) + 1;
    if (el._clicks === 10) {
      const msg = document.createElement('div');
      msg.textContent = '🎉 You found the secret! Scroll down to play the real game!';
      msg.style.cssText = 'position:fixed;top:80px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#FF6B9D,#A855F7);color:#fff;padding:12px 28px;border-radius:24px;font-weight:800;font-size:0.95rem;z-index:2000;box-shadow:0 6px 24px rgba(168,85,247,0.4);';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
      el._clicks = 0;
    }
  };

  function renderCatalogueIfNeeded() { if (typeof CookieGame !== 'undefined') { /* game.js handles via its own init */ } }
  function updateLeaderboardIfNeeded() { if (typeof CookieGame !== 'undefined') { /* game.js handles */ } }

  // ── Cookie showcase card hover jiggle ─────────────────────────────────────
  document.querySelectorAll('.cookie-showcase-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const em = card.querySelector('.cookie-big');
      if (em) { em.style.transform = 'scale(1.2) rotate(10deg)'; em.style.transition = 'transform 0.2s'; }
    });
    card.addEventListener('mouseleave', () => {
      const em = card.querySelector('.cookie-big');
      if (em) { em.style.transform = ''; }
    });
  });

  // ── Smooth anchor from external link (#hash in URL) ───────────────────────
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }

  // ── Keyboard shortcut: Space = start/pause ────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      const startBtn = document.getElementById('start-btn');
      const pauseBtn = document.getElementById('pause-btn');
      if (startBtn && startBtn.style.display !== 'none') {
        CookieGame.startGame();
      } else if (pauseBtn && pauseBtn.style.display !== 'none') {
        CookieGame.pauseGame();
      }
    }
  });

  // ── Tab panel switching for game sidebar ──────────────────────────────────
  document.querySelectorAll('.game-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;
      document.querySelectorAll('.game-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
      // Refresh dynamic panels
      if (targetId === 'catalogue-panel-wrap') CookieGame.init && renderCatalogueIfNeeded();
      if (targetId === 'leaderboard-panel-wrap') updateLeaderboardIfNeeded();
    });
  });

  // ── "Back to top" on logo click ───────────────────────────────────────────
  document.addEventListener('click', e => {
    const logo = e.target.closest('.logo-link, .footer-logo');
    if (logo && logo.getAttribute('href') === 'index.html') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ── Performance: pause game loop when tab not visible ──────────────────────
  document.addEventListener('visibilitychange', () => {
    // Just let the game engine handle its own state; this is a safety call
    // If the game is running and user hides tab, requestAnimationFrame auto-pauses
  });

  // ── Touch swipe on game sidebar tabs (mobile) ─────────────────────────────
  (function () {
    const tabs = document.querySelector('.game-tabs');
    if (!tabs) return;
    let startX = 0;
    tabs.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    tabs.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      const allTabs = Array.from(tabs.querySelectorAll('.game-tab'));
      const activeIdx = allTabs.findIndex(t => t.classList.contains('active'));
      if (Math.abs(dx) > 50) {
        const nextIdx = dx < 0
          ? Math.min(activeIdx + 1, allTabs.length - 1)
          : Math.max(activeIdx - 1, 0);
        allTabs[nextIdx]?.click();
      }
    }, { passive: true });
  })();

  console.log('%c🍪 Click Cookies loaded! Press SPACE to start.', 'color:#FF6B9D;font-size:16px;font-weight:bold;');
});
