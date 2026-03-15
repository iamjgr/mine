/**
 * scrollAnimations.js — GSAP ScrollTrigger setup for global reveals.
 * Section-specific animations are handled in their own section files.
 * This file handles shared patterns (reveal lines, title parallax, etc.)
 */

import { gsap }          from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Call once, after the loader finishes. */
export function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Animate all .reveal-line elements to full width on scroll
  // (individual sections may override via their own ScrollTrigger calls)
  gsap.utils.toArray('.reveal-line').forEach(line => {
    // Only set up a trigger if the element doesn't already have one
    if (!line.dataset.stSet) {
      line.dataset.stSet = '1';
      gsap.to(line, {
        scrollTrigger: { trigger: line, start: 'top 88%', once: true },
        width: '100%',
        duration: 0.9,
        ease: 'power2.out'
      });
    }
  });

  // Parallax nudge on the bg canvas as user scrolls
  window.addEventListener('scroll', _handleBgParallax, { passive: true });
}

function _handleBgParallax() {
  // Exposed via a custom data attribute set by pageTransitions.js
  if (typeof window.__bgParallaxY !== 'undefined') {
    window.__bgScrollY = window.scrollY;
  }
}
