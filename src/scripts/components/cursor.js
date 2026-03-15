/**
 * cursor.js — Custom neon dot + trailing ring cursor.
 * Uses lerp for smooth ring lag. Auto-hides on touch devices.
 */

export function initCursor() {
  // Touch devices get the default cursor
  if (!window.matchMedia('(hover: hover)').matches) return;

  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX  = -100, ringY  = -100;
  let rafId;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function animateRing() {
    ringX = lerp(ringX, mouseX, 0.13);
    ringY = lerp(ringY, mouseY, 0.13);
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover state on interactive elements
  const selector =
    'a, button, [role="button"], .course-card, .activity-card, .gallery-nav, .gallery-dot, .skill-badge';

  function addHover(el) {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  }

  document.querySelectorAll(selector).forEach(addHover);

  // Watch for dynamically added elements
  const observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches?.(selector)) addHover(node);
        node.querySelectorAll?.(selector).forEach(addHover);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return () => { cancelAnimationFrame(rafId); observer.disconnect(); };
}
