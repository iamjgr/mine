/**
 * hero.js — Renders hero content from data and manages typewriter animation.
 */

import { gsap } from 'gsap';

/**
 * Render static content from data into the hero DOM nodes.
 * (Called before loader finishes so content is ready when revealed.)
 */
export function renderHero(heroData) {
  const nameEl      = document.getElementById('hero-name');
  const titleEl     = document.getElementById('hero-title');
  const ctaPrimary  = document.getElementById('cta-primary');
  const ctaSecondary = document.getElementById('cta-secondary');

  if (!heroData) return;

  if (nameEl) nameEl.textContent = heroData.name;
  if (titleEl) titleEl.textContent = heroData.title;

  if (ctaPrimary) {
    ctaPrimary.href = heroData.ctaTarget || '#projects';
    const label = ctaPrimary.querySelector('.btn-label');
    if (label) label.textContent = heroData.ctaLabel || 'View My Work';
  }
  if (ctaSecondary) {
    ctaSecondary.href = heroData.secondaryTarget || '#about';
    const label = ctaSecondary.querySelector('.btn-label');
    if (label) label.textContent = heroData.secondaryLabel || 'About Me';
  }
}

/**
 * Kick off the typewriter greeting + GSAP reveal animations.
 * Called AFTER the page loader fades out.
 */
export function initHero(heroData) {
  if (!heroData) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    _showHeroInstant(heroData.greeting);
    return;
  }

  _typewriter(heroData.greeting, () => {
    // After typing completes, cascade reveals
    gsap.fromTo('#hero-name',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15 }
    );
    gsap.fromTo('#hero-title',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out', delay: 0.65 }
    );
    gsap.fromTo('#hero-cta',
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', delay: 1.05 }
    );
  });

  // Ripple on primary CTA
  document.getElementById('cta-primary')?.addEventListener('click', function (e) {
    _createRipple(e, this);
  });
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function _typewriter(text, onComplete) {
  const el = document.getElementById('hero-greeting');
  if (!el || !text) { onComplete?.(); return; }

  el.textContent = '';
  let i = 0;

  function tick() {
    if (i < text.length) {
      el.textContent = text.slice(0, i + 1) + '█';
      i++;
      setTimeout(tick, 55 + Math.random() * 35);
    } else {
      el.innerHTML = text + '<span class="blink">█</span>';
      onComplete?.();
    }
  }
  setTimeout(tick, 500);
}

function _showHeroInstant(greeting) {
  const el = document.getElementById('hero-greeting');
  if (el) el.textContent = greeting;
  ['#hero-name', '#hero-title', '#hero-cta'].forEach(sel => {
    const node = document.querySelector(sel);
    if (node) { node.style.opacity = '1'; node.style.transform = 'none'; }
  });
}

function _createRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const r    = document.createElement('span');
  r.className = 'ripple';
  r.style.cssText = `
    width: ${size}px; height: ${size}px;
    left: ${e.clientX - rect.left - size / 2}px;
    top:  ${e.clientY - rect.top  - size / 2}px;
  `;
  btn.appendChild(r);
  setTimeout(() => r.remove(), 700);
}
