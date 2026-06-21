// header.js - Click Cookies Header Component
(function () {
  const headerHTML = `
  <header class="site-header" id="site-header">
    <div class="header-inner">
      <div class="header-logo">
        <a href="/" class="logo-link">
          <span class="logo-icon">🍪</span>
          <span class="logo-text">Click<span class="logo-accent">Cookies</span></span>
        </a>
      </div>
      <nav class="header-nav" id="header-nav">
        <ul class="nav-list">
          <li><a href="/#game" class="nav-link">Play Now</a></li>
          <li><a href="/#how-to-play" class="nav-link">How to Play</a></li>
          <li><a href="/#cookie-types" class="nav-link">Cookie Types</a></li>
          <li><a href="/#upgrades" class="nav-link">Upgrades</a></li>
          <li><a href="/2048-cupcakes" class="nav-link">CupCakes</a></li>
          <li><a href="/2048-cookies" class="nav-link">2048</a></li>
          <li><a href="/#faq" class="nav-link">FAQ</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <button class="btn-play-header" onclick="document.getElementById('game').scrollIntoView({behavior:'smooth'})">🎮 Play Free</button>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;

  document.addEventListener('DOMContentLoaded', function () {
    const placeholder = document.getElementById('header-placeholder');
    if (placeholder) placeholder.outerHTML = headerHTML;
    else document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('header-nav');
    hamburger?.addEventListener('click', () => {
      nav.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    // Sticky header shadow on scroll
    window.addEventListener('scroll', () => {
      const header = document.getElementById('site-header');
      if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Smooth scroll for all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          nav.classList.remove('open');
          hamburger.classList.remove('active');
        }
      });
    });
  });
})();
