/**
 * projects.js — Renders the courses grid, accordion expand/collapse,
 *               activity cards, and wires them to the modal.
 */

import { gsap }          from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { openModal }     from '../components/modal.js';

gsap.registerPlugin(ScrollTrigger);

/** Render all course cards from data. */
export function renderProjects(projects) {
  const grid = document.getElementById('courses-grid');
  if (!grid || !projects) return;

  grid.innerHTML = '';
  projects.forEach(course => grid.appendChild(_buildCourseCard(course, projects)));
}

/** Wire up GSAP scroll reveals for the section. Called after loader. */
export function initProjects() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    document.querySelectorAll('.projects-tag, #projects-heading, .course-card').forEach(el => {
      el.style.opacity   = '1';
      el.style.transform = 'none';
    });
    gsap.to('.projects-line', { width: '200px', duration: 0.01 });
    return;
  }

  gsap.from('.projects-tag',     { scrollTrigger: { trigger: '.projects-tag',     start: 'top 86%' }, opacity: 0, y: 18, duration: 0.55 });
  gsap.from('#projects-heading', { scrollTrigger: { trigger: '#projects-heading', start: 'top 86%' }, opacity: 0, y: 28, duration: 0.65, delay: 0.08 });
  gsap.to('.projects-line',      { scrollTrigger: { trigger: '.projects-line',    start: 'top 86%' }, width: '200px', duration: 0.9, ease: 'power2.out', delay: 0.15 });

  // Stagger course cards (run once, then clear inline styles)
  ScrollTrigger.create({
    trigger: '#courses-grid',
    start: 'top 82%',
    once: true,
    onEnter: () => {
      gsap.utils.toArray('.course-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          delay: (i % 3) * 0.1,
            ease: 'power2.out',
            clearProps: 'opacity,transform'
          }
        );
      });
    }
  });
}

// ── Currently expanded course ────────────────────────────────────────────────

let _activeCourseId = null;

// ── Build course card DOM ────────────────────────────────────────────────────

function _buildCourseCard(course, allCourses) {
  const card = document.createElement('div');
  card.className = 'glass-card course-card';
  card.dataset.courseId = course.id;
  card.style.setProperty('--accent-color', course.accentColor);

  card.innerHTML = `
    <div class="course-card-header">
      <span class="course-code" style="color:${course.accentColor};">${course.courseCode}</span>
      <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24"
           fill="none" stroke="${course.accentColor}" stroke-width="2" stroke-linecap="round">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </div>
    <p class="course-name">${course.courseName}</p>
    <p class="course-desc">${course.description}</p>
    <div class="course-activities" id="activities-${course.id}"></div>
  `;

  card.addEventListener('click', e => {
    // Don't re-toggle if clicking inside an activity card
    if (e.target.closest('.activity-card')) return;
    _toggleCourse(course.id, allCourses);
  });

  return card;
}

// ── Accordion toggle ─────────────────────────────────────────────────────────

function _toggleCourse(courseId, allCourses) {
  const allCards = document.querySelectorAll('.course-card');
  const isOpen   = _activeCourseId === courseId;

  // Close currently open course
  if (_activeCourseId) {
    _collapseActivities(_activeCourseId);
    allCards.forEach(c => {
      c.classList.remove('dimmed');
      c.classList.remove('active');
      c.style.borderColor = '';
      const ch = c.querySelector('.chevron-icon');
      if (ch) ch.classList.remove('open');
    });
    _activeCourseId = null;
  }

  if (isOpen) return;  // was already open → just closed it

  // Open the clicked course
  _activeCourseId = courseId;
  const course     = allCourses.find(c => c.id === courseId);
  if (!course) return;

  const clickedCard = document.querySelector(`[data-course-id="${courseId}"]`);
  const chevron     = clickedCard?.querySelector('.chevron-icon');

  // Active card only (others remain fully visible)
  clickedCard?.classList.add('active');
  if (clickedCard) clickedCard.style.borderColor = course.accentColor;
  chevron?.classList.add('open');

  _expandActivities(course);
}

function _collapseActivities(courseId) {
  const el = document.getElementById('activities-' + courseId);
  if (!el) return;
  gsap.to(el, {
    height: 0, duration: 0.38, ease: 'power2.inOut',
    onComplete: () => { el.innerHTML = ''; }
  });
}

function _expandActivities(course) {
  const el = document.getElementById('activities-' + course.id);
  if (!el) return;

  el.innerHTML = '';
  const row = document.createElement('div');
  row.className = 'activities-row';
  row.id = 'act-row-' + course.id;

  course.activities.forEach(activity => {
    row.appendChild(_buildActivityCard(activity, course));
  });
  el.appendChild(row);

  // Animate open
  gsap.fromTo(el,
    { height: 0 },
    {
      height: 'auto', duration: 0.42, ease: 'power2.out',
      onComplete: () => {
        // Stagger activity cards in
        gsap.fromTo(
          row.children,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, stagger: 0.07, duration: 0.32, ease: 'power2.out' }
        );
        ScrollTrigger.refresh();
      }
    }
  );
}

// ── Activity card ────────────────────────────────────────────────────────────

function _buildActivityCard(activity, course) {
  const card = document.createElement('div');
  card.className = 'glass-card activity-card';

  const BASE      = import.meta.env.BASE_URL.replace(/\/$/, '');
  const hasImages = activity.images && activity.images.length > 0;
  const thumbSrc  = hasImages ? BASE + activity.images[0].src : null;

  card.innerHTML = `
    <div class="activity-thumb">
      ${thumbSrc
        ? `<img src="${thumbSrc}" alt="${activity.title}" loading="lazy"
               onerror="this.src='${BASE}/images/placeholder.svg';" />`
        : `<div class="activity-thumb-placeholder">💻</div>`}
      <div class="activity-thumb-overlay" aria-hidden="true"></div>
    </div>
    <p class="activity-title">${activity.title}</p>
    <p class="activity-teaser">${activity.teaser || ''}</p>
    <span class="activity-cta" style="color:${course.accentColor};">View Details →</span>
  `;

  card.addEventListener('click', e => {
    e.stopPropagation();
    openModal(activity, course);
  });

  return card;
}
