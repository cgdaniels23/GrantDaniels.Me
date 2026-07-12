/* ===================================================
   NAV — scroll hide/show + theme toggle + mobile menu
   =================================================== */
(function () {
  // ---- THEME ----
  const html = document.documentElement;
  const btn  = document.querySelector('[data-theme-toggle]');
  const sys  = window.matchMedia('(prefers-color-scheme: dark)');
  let theme  = sys.matches ? 'dark' : 'light';
  html.setAttribute('data-theme', theme);
  updateIcon();

  if (btn) {
    btn.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', theme);
      updateIcon();
    });
  }

  function updateIcon() {
    if (!btn) return;
    btn.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    btn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  // ---- SCROLL HIDE/SHOW ----
  const nav = document.querySelector('.nav');
  let lastY = 0, ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY && y > 80) {
          nav.classList.add('nav--hidden');
        } else {
          nav.classList.remove('nav--hidden');
        }
        nav.classList.toggle('nav--scrolled', y > 20);
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ---- MOBILE MENU ----
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '').replace('.html', '');
    const current = currentPath.replace('.html', '');
    if (current.endsWith(href) || (href === '/index' && (current === '' || current === '/'))) {
      link.classList.add('active');
    }
  });
})();
