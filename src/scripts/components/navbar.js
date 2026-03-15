/**
 * navbar.js — Frosted-glass scroll effect, mobile drawer,
 *              and active section highlighting via IntersectionObserver.
 */

export function initNavbar(data) {
  const nav         = document.getElementById('navbar');
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');
  const logoEl      = document.getElementById('nav-logo');

  // Set logo text — use explicit logoText if provided, otherwise generate initials
  if (logoEl && data?.hero) {
    if (data.hero.logoText) {
      logoEl.textContent = data.hero.logoText;
    } else if (data.hero.name) {
      const initials = data.hero.name
        .split(' ')
        .map(w => w[0] || '')
        .join('');
      logoEl.textContent = `<${initials} />`;
    }
  }

  // Scroll → frosted glass
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile drawer
  function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () =>
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu()
  );
  mobileClose.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(a =>
    a.addEventListener('click', closeMenu)
  );

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  // Active section highlighting
  const sectionIds = ['hero', 'about', 'projects'];

  const setActive = id => {
    document.querySelectorAll('.nav-link').forEach(l =>
      l.classList.toggle('active', l.dataset.section === id)
    );
  };

  let suppressObserverUntil = 0;

  // Immediate feedback when clicking any nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const id = link.dataset.section;
      if (id) {
        setActive(id);
        suppressObserverUntil = Date.now() + 800;
      }
    });
  });

  // Keep active state in sync with URL hash changes
  window.addEventListener('hashchange', () => {
    const id = window.location.hash.replace('#', '');
    if (sectionIds.includes(id)) setActive(id);
  });

  const io = new IntersectionObserver(
    entries => {
      if (Date.now() < suppressObserverUntil) return;
      entries.forEach(entry => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-20% 0px -45% 0px', threshold: 0.1 }
  );
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}
