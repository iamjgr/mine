/**
 * main.js — Application entry point.
 *
 * Initialization order:
 *  1. Render static DOM content from portfolio.js immediately
 *  2. Start Three.js background (doesn't need the loader)
 *  3. Init cursor & navbar immediately
 *  4. Show loader
 *  5. After loader fades → kick off all GSAP animations
 */

import data                from '../data/portfolio.js';

// Components
import { initLoader }         from './components/loader.js';
import { initCursor }         from './components/cursor.js';
import { initNavbar }         from './components/navbar.js';
import { initModal }          from './components/modal.js';
import { initLightbox }       from './components/gallery.js';

// Sections
import { renderHero,     initHero     } from './sections/hero.js';
import { renderAbout,    initAbout    } from './sections/about.js';
import { renderProjects, initProjects } from './sections/projects.js';

// Animations
import { initBackground }       from './animations/pageTransitions.js';
import { initScrollAnimations } from './animations/scrollAnimations.js';

// ── Apply meta ───────────────────────────────────────────

document.title = data.meta?.siteTitle || 'Portfolio';
const descMeta = document.querySelector('meta[name="description"]');
if (descMeta && data.meta?.siteDescription) {
  descMeta.setAttribute('content', data.meta.siteDescription);
}

// ── Render content immediately (before loader exits) ─────
// Content is in the DOM but hidden; loader sits on top.

renderHero(data.hero);
renderAbout(data.about);
renderProjects(data.projects);

// ── Init systems that don't need the loader ───────────────

initBackground();   // Three.js — starts rendering immediately
initCursor();       // Custom cursor
initNavbar(data);   // Navbar scroll + mobile drawer
initModal();        // Modal close-button + backdrop-click listeners
initLightbox();     // Lightbox close + keyboard listeners

// ── Loader → then kick off animations ────────────────────

initLoader(() => {
  // Called once the loader has faded out

  initScrollAnimations();   // Global GSAP ScrollTrigger reveals
  initHero(data.hero);      // Hero typewriter + cascade
  initAbout();              // About scroll animations
  initProjects();           // Projects scroll animations
});
