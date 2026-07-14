/* ===================================================
   NAV — scroll hide/show + mobile menu + star parallax
   =================================================== */
(function () {
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

  // ---- STAR FIELD PARALLAX ----
  // Gentle 3-layer scroll drift; skipped entirely for reduced-motion.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const layers = document.querySelectorAll('.starlayer');
  if (!reduceMotion && layers.length) {
    let starTicking = false;
    const updateStars = () => {
      const y = window.scrollY;
      layers.forEach(l => {
        const depth = parseFloat(l.getAttribute('data-depth')) || 0;
        l.style.transform = 'translateY(' + (y * depth * -1) + 'px)';
      });
      starTicking = false;
    };
    window.addEventListener('scroll', () => {
      if (!starTicking) { requestAnimationFrame(updateStars); starTicking = true; }
    }, { passive: true });
    updateStars();
  }
})();
