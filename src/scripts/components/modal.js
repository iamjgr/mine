/**
 * modal.js — Activity detail modal (slides up from bottom).
 * Content is injected from the data object — nothing is fetched.
 */

import { buildGallery } from './gallery.js';

const overlay   = () => document.getElementById('modal-overlay');
const container = () => document.getElementById('modal-container');

export function openModal(activity, course) {
  const ol = overlay();
  const ct = container();
  if (!ol || !ct) return;

  // Populate content
  document.getElementById('modal-breadcrumb').textContent =
    `Projects → ${course.courseCode} → ${activity.title}`;

  const titleEl = document.getElementById('modal-title');
  titleEl.textContent   = activity.title;
  titleEl.style.color   = course.accentColor;
  titleEl.style.textShadow = `0 0 20px ${course.accentColor}50`;

  document.getElementById('modal-description').textContent =
    activity.description || 'No description provided.';

  // Gallery
  const galleryEl = document.getElementById('modal-gallery');
  galleryEl.innerHTML = '';
  galleryEl.appendChild(buildGallery(activity.images));

  // Scroll modal container to top
  ct.scrollTop = 0;

  // Open
  ol.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeModal() {
  const ol = overlay();
  const ct = container();
  if (!ol) return;

  ct.style.transform = 'translateY(100%)';
  setTimeout(() => {
    ol.classList.remove('open');
    ct.style.transform = '';
    document.body.style.overflow = '';
  }, 460);
}

export function initModal() {
  document.getElementById('modal-close')?.addEventListener('click', closeModal);

  overlay()?.addEventListener('click', e => {
    if (e.target === overlay()) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay()?.classList.contains('open')) closeModal();
  });
}
