/**
 * about.js — Renders About section content from data
 *              and wires up scroll-triggered animations.
 */

import { gsap }          from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ORBIT_ICONS = [
  { icon: 'devicon-javascript-plain colored', duration: '14s', angle: '0deg',   r: '125px' },
  { icon: 'devicon-python-plain colored',     duration: '16s', angle: '72deg',  r: '125px' },
  { icon: 'devicon-react-original colored',   duration: '18s', angle: '144deg', r: '125px' },
  { icon: 'devicon-nodejs-plain colored',     duration: '15s', angle: '216deg', r: '125px' },
  { icon: 'devicon-git-plain colored',        duration: '17s', angle: '288deg', r: '125px' },
];

/** Inject all About section content from data. */
export function renderAbout(aboutData) {
  if (!aboutData) return;
  _renderAvatar(aboutData.avatar);
  _renderBio(aboutData.bio);
  _renderSkills(aboutData.skills);
  _renderTerminal(aboutData.terminal);
  _renderOrbitIcons();
}

/** Wire up GSAP ScrollTrigger reveals. Called after loader. */
export function initAbout() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    document.querySelectorAll('#about .gsap-hidden').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    _triggerProgressBars();
    return;
  }

  _animateAbout();
}

// ── Render helpers ───────────────────────────────────────────────────────────

function _renderAvatar(src) {
  const hex = document.getElementById('avatar-hex');
  if (!hex) return;

  if (src) {
    const img = document.createElement('img');
    img.src     = src;
    img.alt     = 'Profile photo';
    img.loading = 'lazy';
    img.onerror = () => {
      img.replaceWith(_fallbackEmoji());
    };
    hex.appendChild(img);
  } else {
    hex.appendChild(_fallbackEmoji());
  }
}

function _fallbackEmoji() {
  const span = document.createElement('span');
  span.className   = 'avatar-fallback';
  span.textContent = '👨‍💻';
  return span;
}

function _renderBio(bio) {
  const container = document.getElementById('about-bio');
  if (!container || !bio) return;
  bio.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    p.classList.add('gsap-hidden');
    container.appendChild(p);
  });
}

function _renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container || !skills) return;
  skills.forEach(skill => {
    const badge = document.createElement('span');
    badge.className = 'skill-badge gsap-hidden';
    badge.innerHTML = `<i class="${skill.icon}" aria-hidden="true"></i>${skill.name}`;
    container.appendChild(badge);
  });
}

function _renderTerminal(lines) {
  const body = document.getElementById('terminal-body');
  if (!body || !lines) return;

  lines.forEach(line => {
    const div = document.createElement('div');
    div.className = 'terminal-line';

    if (line.type === 'bar') {
      div.innerHTML = `
        <span class="t-prompt">&gt;</span>
        <span class="t-label">${line.label}</span>
        <span class="t-sep">:</span>
        <span class="progress-track">
          <span class="progress-fill" data-value="${line.value}"></span>
        </span>
        <span class="t-pct">${line.value}%</span>`;
    } else {
      div.innerHTML = `
        <span class="t-prompt">&gt;</span>
        <span class="t-label">${line.label}</span>
        <span class="t-sep">:</span>
        <span class="t-value">${line.value}</span>`;
    }
    body.appendChild(div);
  });
}

function _renderOrbitIcons() {
  const container = document.getElementById('orbit-icons');
  if (!container) return;
  ORBIT_ICONS.forEach(({ icon, duration, angle, r }) => {
    const el = document.createElement('i');
    el.className = `orbit-icon ${icon}`;
    el.style.setProperty('--orbit-duration', duration);
    el.style.setProperty('--start-angle', angle);
    el.style.setProperty('--orbit-r', r);
    container.appendChild(el);
  });
}

function _triggerProgressBars() {
  document.querySelectorAll('.progress-fill').forEach(bar => {
    bar.style.width = bar.dataset.value + '%';
  });
}

// ── Animations ───────────────────────────────────────────────────────────────

function _animateAbout() {
  const st = { start: 'top 86%', once: true };

  // Section tag + heading (no gsap-hidden class — from() is safe)
  gsap.from('.about-tag',     { scrollTrigger: { trigger: '.about-tag',     ...st }, opacity: 0, y: 18, duration: 0.55, ease: 'power2.out' });
  gsap.from('.about-heading', { scrollTrigger: { trigger: '.about-heading', ...st }, opacity: 0, y: 28, duration: 0.65, delay: 0.08, ease: 'power2.out' });
  gsap.to('.about-line',      { scrollTrigger: { trigger: '.about-line',    ...st }, width: '100%', duration: 0.9, ease: 'power2.out', delay: 0.15 });

  // Bio paragraphs — these have .gsap-hidden (opacity:0 in CSS).
  // Must use fromTo with explicit opacity:1 target so GSAP doesn't
  // animate 0→0 and leave them invisible.
  gsap.utils.toArray('#about-bio p').forEach((p, i) => {
    gsap.fromTo(p,
      { opacity: 0, y: 22 },
      {
        opacity: 1, y: 0, duration: 0.55, delay: i * 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: p, start: 'top 90%', once: true },
        clearProps: 'transform'
      }
    );
  });

  // Skills tag + badges — same fix for gsap-hidden badges
  gsap.from('.skills-tag', {
    scrollTrigger: { trigger: '.skills-tag', ...st },
    opacity: 0, duration: 0.5, ease: 'power2.out'
  });
  gsap.utils.toArray('.skill-badge').forEach((badge, i) => {
    gsap.fromTo(badge,
      { opacity: 0, scale: 0.82, y: 10 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.45, delay: (i % 8) * 0.055, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: badge, start: 'top 93%', once: true },
        clearProps: 'transform'
      }
    );
  });

  // Terminal box + progress bars
  gsap.fromTo('#terminal-box',
    { opacity: 0, y: 28 },
    {
      opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
      // Fire progress bars AFTER box fades in so CSS width transition is visible
      onComplete: _triggerProgressBars,
      scrollTrigger: {
        trigger: '#terminal-box',
        start: 'top 86%',
        once: true
      },
      clearProps: 'transform'
    }
  );

  // Avatar visual
  gsap.from('#about-visual', {
    scrollTrigger: { trigger: '#about-visual', start: 'top 82%', once: true },
    opacity: 0, x: 36, duration: 0.8, ease: 'power3.out'
  });
}
