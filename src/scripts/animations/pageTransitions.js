/**
 * pageTransitions.js — Three.js neural-network particle background.
 * Runs on a fixed canvas behind all content (z-index: -1).
 * Particle count reduced automatically on mobile.
 */

import * as THREE from 'three';

export function initBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  // ── Renderer ──────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 400;

  // ── Particle count ─────────────────────────────────────
  const isMobile          = window.innerWidth < 768;
  const PARTICLE_COUNT    = isMobile ? 55  : 130;
  const CONNECTION_DIST   = isMobile ? 115 : 155;

  // ── Build particles ──────────────────────────────────────
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x:  (Math.random() - 0.5) * window.innerWidth,
    y:  (Math.random() - 0.5) * window.innerHeight,
    z:  (Math.random() - 0.5) * 200,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    color: Math.random() > 0.5 ? 0x00f5ff : 0xbf00ff
  }));

  // ── Points geometry ────────────────────────────────────
  const ptGeom  = new THREE.BufferGeometry();
  const ptPos   = new Float32Array(PARTICLE_COUNT * 3);
  const ptColor = new Float32Array(PARTICLE_COUNT * 3);

  particles.forEach((p, i) => {
    ptPos[i * 3]     = p.x;
    ptPos[i * 3 + 1] = p.y;
    ptPos[i * 3 + 2] = p.z;
    const c = new THREE.Color(p.color);
    ptColor[i * 3]     = c.r * 0.65;
    ptColor[i * 3 + 1] = c.g * 0.65;
    ptColor[i * 3 + 2] = c.b * 0.65;
  });

  ptGeom.setAttribute('position', new THREE.BufferAttribute(ptPos,   3));
  ptGeom.setAttribute('color',    new THREE.BufferAttribute(ptColor, 3));
  const pointMesh = new THREE.Points(
    ptGeom,
    new THREE.PointsMaterial({ size: 2.4, vertexColors: true, transparent: true, opacity: 0.62 })
  );
  scene.add(pointMesh);

  // ── Lines geometry ─────────────────────────────────────
  const maxPairs  = PARTICLE_COUNT * PARTICLE_COUNT;
  const lineGeom  = new THREE.BufferGeometry();
  const linePos   = new Float32Array(maxPairs * 6);
  const lineColor = new Float32Array(maxPairs * 6);
  lineGeom.setAttribute('position', new THREE.BufferAttribute(linePos,   3));
  lineGeom.setAttribute('color',    new THREE.BufferAttribute(lineColor, 3));
  const lineMesh = new THREE.LineSegments(
    lineGeom,
    new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.28 })
  );
  scene.add(lineMesh);

  // ── Scroll parallax ─────────────────────────────────────
  window.__bgScrollY = 0;
  window.addEventListener('scroll', () => { window.__bgScrollY = window.scrollY; }, { passive: true });

  // ── Animate ───────────────────────────────────────────-
  function animate() {
    requestAnimationFrame(animate);

    const hw = window.innerWidth  / 2;
    const hh = window.innerHeight / 2;

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x >  hw) p.x = -hw;
      if (p.x < -hw) p.x =  hw;
      if (p.y >  hh) p.y = -hh;
      if (p.y < -hh) p.y =  hh;
      ptPos[i * 3]     = p.x;
      ptPos[i * 3 + 1] = p.y;
    });
    ptGeom.attributes.position.needsUpdate = true;

    // Rebuild connections each frame
    let idx = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST && idx < maxPairs) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.38;
          const c     = new THREE.Color(particles[i].color);
          const b     = idx * 6;
          linePos[b]     = particles[i].x; linePos[b+1] = particles[i].y; linePos[b+2] = 0;
          linePos[b+3]   = particles[j].x; linePos[b+4] = particles[j].y; linePos[b+5] = 0;
          lineColor[b]   = c.r * alpha; lineColor[b+1] = c.g * alpha; lineColor[b+2] = c.b * alpha;
          lineColor[b+3] = c.r * alpha; lineColor[b+4] = c.g * alpha; lineColor[b+5] = c.b * alpha;
          idx++;
        }
      }
    }
    lineGeom.setDrawRange(0, idx * 2);
    lineGeom.attributes.position.needsUpdate = true;
    lineGeom.attributes.color.needsUpdate    = true;

    // Subtle parallax
    camera.position.y = -(window.__bgScrollY || 0) * 0.04;

    renderer.render(scene, camera);
  }
  animate();

  // ── Resize ────────────────────────────────────────────
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}
