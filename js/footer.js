// footer.js - Click Cookies Footer Component
(function () {
  const year = new Date().getFullYear();
  const footerHTML = `
  <footer class="site-footer" id="site-footer">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo">
          <span class="logo-icon">🍪</span>
          <span class="logo-text">Click<span class="logo-accent">Cookies</span></span>
        </a>
        <p class="footer-tagline">The sweetest clicking game on the internet. Bake, click, and collect every cookie in the jar!</p>
        <div class="footer-social">
          <a href="#" aria-label="Twitter" class="social-icon">𝕏</a>
          <a href="#" aria-label="Discord" class="social-icon">💬</a>
          <a href="#" aria-label="YouTube" class="social-icon">▶</a>
          <a href="#" aria-label="Reddit" class="social-icon">🔴</a>
        </div>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Game</h4>
          <ul>
            <li><a href="#game">Play Now</a></li>
            <li><a href="#how-to-play">How to Play</a></li>
            <li><a href="#upgrades">Upgrades</a></li>
            <li><a href="#achievements">Achievements</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Info</h4>
          <ul>
            <li><a href="#cookie-types">Cookie Types</a></li>
            <li><a href="#leaderboard">Leaderboard</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#features">Features</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${year} ClickCookies.com — All rights reserved.</p>
      <p class="footer-credit">Made with 🍪 and lots of sugar</p>
    </div>
  </footer>`;

  document.addEventListener('DOMContentLoaded', function () {
    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) placeholder.outerHTML = footerHTML;
    else document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Smooth scroll for footer links
    document.querySelectorAll('.site-footer a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });
})();
