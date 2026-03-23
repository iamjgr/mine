/**
 * gallery.js — Image gallery with swipe support, prev/next nav,
 *               dot indicators, and graceful broken-image handling.
 *
 * All images are LOCAL static files — never fetched, never requested.
 * Broken images fall back to /images/placeholder.svg automatically.
 */

import { gsap } from 'gsap';

const BASE         = import.meta.env.BASE_URL.replace(/\/$/, '');
const PLACEHOLDER  = BASE + '/images/placeholder.svg';
const resolveImg   = src => BASE + src;

/**
 * Creates a single <img> element with lazy loading and fallback.
 */
function createImageEl(src, caption) {
  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-slide';

  const img = document.createElement('img');
  img.src     = resolveImg(src);
  img.alt     = caption || '';
  img.loading = 'lazy';
  img.style.cursor = 'zoom-in';
  img.onerror = () => {
    img.src = PLACEHOLDER;
    img.alt = 'Image not available';
  };
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(img.src, img.alt);
  });

  wrapper.appendChild(img);
  return wrapper;
}

/**
 * Builds a full gallery component and returns a DOM node to append.
 * @param {Array<{src:string, caption:string}>} images
 */
export function buildGallery(images) {
  const container = document.createElement('div');

  if (!images || images.length === 0) {
    container.innerHTML = `
      <div class="modal-no-images">
        // no preview available for this activity
      </div>`;
    return container;
  }

  if (images.length === 1) {
    // Single image — no nav needed
    const slide  = createImageEl(images[0].src, images[0].caption);
    slide.style.cssText = 'border-radius:12px;overflow:hidden;';
    container.appendChild(slide);
    if (images[0].caption) {
      const cap = document.createElement('p');
      cap.className   = 'gallery-caption';
      cap.textContent = images[0].caption;
      container.appendChild(cap);
    }
    return container;
  }

  // Multi-image gallery
  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-wrapper';

  const track = document.createElement('div');
  track.className = 'gallery-track';
  images.forEach(img => track.appendChild(createImageEl(img.src, img.caption)));
  wrapper.appendChild(track);
  container.appendChild(wrapper);

  // Caption area
  const captionArea = document.createElement('div');
  captionArea.className = 'gallery-caption-area';
  const captionEl = document.createElement('p');
  captionEl.className   = 'gallery-caption';
  captionEl.textContent = images[0].caption || '';
  captionArea.appendChild(captionEl);
  container.appendChild(captionArea);

  // Nav row: prev | dots | next
  const navWrap = document.createElement('div');
  navWrap.className = 'gallery-nav-wrap';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'gallery-nav';
  prevBtn.setAttribute('aria-label', 'Previous image');
  prevBtn.textContent = '‹';

  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'gallery-dots';
  const dotEls = images.map((_, i) => {
    const dot = document.createElement('button');
    dot.className   = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to image ${i + 1}`);
    dotsWrap.appendChild(dot);
    return dot;
  });

  const nextBtn = document.createElement('button');
  nextBtn.className = 'gallery-nav';
  nextBtn.setAttribute('aria-label', 'Next image');
  nextBtn.textContent = '›';

  navWrap.append(prevBtn, dotsWrap, nextBtn);
  container.appendChild(navWrap);

  // State & navigation
  let current = 0;

  function goTo(idx) {
    current = (idx + images.length) % images.length;
    gsap.to(track, { x: `-${current * 100}%`, duration: 0.45, ease: 'power2.inOut' });
    dotEls.forEach((d, i) => d.classList.toggle('active', i === current));
    captionEl.textContent = images[current].caption || '';
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  dotEls.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let touchStartX = 0;
  wrapper.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  wrapper.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  });

  return container;
}

// ── Lightbox ─────────────────────────────────────────────

function openLightbox(src, caption) {
  const lb    = document.getElementById('lightbox-overlay');
  const lbImg = document.getElementById('lightbox-img');
  const lbCap = document.getElementById('lightbox-caption');
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lbImg.alt = caption || '';
  lbCap.textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox-overlay');
  if (!lb) return;
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

export function initLightbox() {
  document.getElementById('lightbox-close')
    ?.addEventListener('click', closeLightbox);

  document.getElementById('lightbox-overlay')
    ?.addEventListener('click', e => {
      if (e.target !== document.getElementById('lightbox-close')) {
        closeLightbox();
      }
    });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}
