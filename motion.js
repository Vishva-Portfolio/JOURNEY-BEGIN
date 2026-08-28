/* =====================================================================
   JOURNEY BEGIN — MOTION LAYER
   Adds: cinematic loader, a Three.js 3D motion background (particles,
   drifting crystal shards, light streaks, parallax), GSAP scroll-entrance
   animations for cards/headings, subtle per-section depth parallax, and
   a lightweight 3D tilt effect on cards.

   This file is entirely additive — it does not modify script.js, does
   not touch any existing DOM structure/content, and degrades gracefully
   if Three.js/GSAP fail to load or the user prefers reduced motion.
   ===================================================================== */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const isSmallScreen = window.innerWidth < 768;

  /* =====================================================================
     1. CINEMATIC LOADER
  ===================================================================== */
  function initLoader() {
    const loader = document.getElementById('cinematicLoader');
    if (!loader) return;

    const mark = loader.querySelector('.loader-mark');
    const title = loader.querySelector('.loader-title');
    const content = loader.querySelector('.loader-content');
    const barFill = loader.querySelector('#loaderBarFill');
    const pct = loader.querySelector('#loaderPct');

    let seenBefore = false;
    try { seenBefore = sessionStorage.getItem('jb_loaded') === '1'; } catch (e) {}

    const finish = () => {
      loader.classList.add('loader-hidden');
      loader.setAttribute('aria-hidden', 'true');
      window.setTimeout(() => { loader.style.display = 'none'; }, 850);
      try { sessionStorage.setItem('jb_loaded', '1'); } catch (e) {}
    };

    // Reduced motion: skip the cinematic entirely, fade out quickly.
    if (reduceMotion) {
      loader.style.transition = 'opacity .25s linear';
      requestAnimationFrame(finish);
      return;
    }

    // GSAP missing (network blocked, etc.) — fail safe, don't trap the user.
    if (typeof gsap === 'undefined') {
      window.setTimeout(finish, seenBefore ? 250 : 1100);
      return;
    }

    const tl = gsap.timeline({ onComplete: finish });

    if (seenBefore) {
      // Quicker replay for a second page-open within the same session.
      tl.to(mark, { opacity: 1, scale: 1, rotate: 0, duration: .45, ease: 'power2.out' })
        .to([title, pct], { opacity: 1, duration: .3 }, '-=.2')
        .to(barFill, {
          width: '100%', duration: .5, ease: 'power1.inOut',
          onUpdate() { pct.textContent = Math.round(this.progress() * 100) + '%'; }
        }, '-=.25');
    } else {
      tl.to(mark, { opacity: 1, scale: 1, rotate: 0, duration: .9, ease: 'back.out(1.6)' })
        .to(title, { opacity: 1, duration: .6, ease: 'power2.out' }, '-=.5')
        .to(pct, { opacity: 1, duration: .4 }, '-=.35')
        .to(barFill, {
          width: '100%', duration: 1.3, ease: 'power1.inOut',
          onUpdate() { pct.textContent = Math.round(this.progress() * 100) + '%'; }
        }, '-=.2')
        .to({}, { duration: .2 });
    }

    tl.to(content, { scale: 1.06, duration: .7, ease: 'power2.in' }, '-=.05')
      .to(loader, { opacity: 0, duration: .7, ease: 'power2.inOut' }, '-=.6');
  }

  /* =====================================================================
     2. THREE.JS 3D MOTION BACKGROUND
  ===================================================================== */
  function initBackground3D() {
    const canvas = document.getElementById('bgCanvas3D');
    if (!canvas) return;

    if (reduceMotion || typeof THREE === 'undefined') {
      canvas.remove();
      return;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch (e) {
      canvas.remove();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmallScreen ? 1.5 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 60;

    const ice = new THREE.Color(0x8fd3ec);
    const violet = new THREE.Color(0x8a78c9);

    /* --- glow sprite texture, shared by all particles --- */
    function makeGlowTexture() {
      const size = 64;
      const c = document.createElement('canvas'); c.width = c.height = size;
      const ctx = c.getContext('2d');
      const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      g.addColorStop(0, 'rgba(255,255,255,1)');
      g.addColorStop(.3, 'rgba(255,255,255,.6)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(c);
    }
    /* --- soft horizontal light-streak texture --- */
    function makeStreakTexture() {
      const w = 256, h = 32;
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      const g = ctx.createLinearGradient(0, 0, w, 0);
      g.addColorStop(0, 'rgba(255,255,255,0)');
      g.addColorStop(.5, 'rgba(255,255,255,.9)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g; ctx.fillRect(0, h * .3, w, h * .4);
      return new THREE.CanvasTexture(c);
    }

    /* --- floating crystal dust (particles) --- */
    const particleCount = isSmallScreen ? 220 : 650;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 260;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 260;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 260;
      const col = Math.random() > 0.5 ? ice : violet;
      colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: isSmallScreen ? 1.7 : 2.2,
      map: makeGlowTexture(),
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: 0.75
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* --- slowly drifting translucent crystal shards --- */
    const shards = [];
    const shardCount = isSmallScreen ? 3 : 6;
    for (let i = 0; i < shardCount; i++) {
      const size = 6 + Math.random() * 6;
      const geo = Math.random() > 0.5
        ? new THREE.IcosahedronGeometry(size, 0)
        : new THREE.OctahedronGeometry(size, 0);
      const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? ice : violet,
        wireframe: true, transparent: true, opacity: 0.16
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 120 - 30
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData.spin = { x: (Math.random() - 0.5) * 0.0006, y: (Math.random() - 0.5) * 0.0008 };
      mesh.userData.driftPhase = Math.random() * Math.PI * 2;
      scene.add(mesh);
      shards.push(mesh);
    }

    /* --- soft diagonal light streaks --- */
    const streaks = [];
    const streakCount = isSmallScreen ? 2 : 4;
    for (let i = 0; i < streakCount; i++) {
      const mat = new THREE.SpriteMaterial({
        map: makeStreakTexture(), transparent: true,
        opacity: 0.14 + Math.random() * 0.08,
        blending: THREE.AdditiveBlending, depthWrite: false
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(140 + Math.random() * 90, 10 + Math.random() * 6, 1);
      sprite.position.set((Math.random() - 0.5) * 160, (Math.random() - 0.5) * 160, (Math.random() - 0.5) * 80 - 40);
      sprite.material.rotation = Math.random() * Math.PI;
      scene.add(sprite);
      streaks.push(sprite);
    }

    /* --- parallax input: pointer + scroll --- */
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    if (!isCoarsePointer) {
      window.addEventListener('pointermove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
      }, { passive: true });
    }

    let scrollFrac = 0;
    function updateScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollFrac = max > 0 ? window.scrollY / max : 0;
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    let running = true;
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      if (!running) return;
      const t = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      particles.rotation.y = t * 0.015 + targetX * 0.3;
      particles.rotation.x = t * 0.008 + targetY * 0.2;

      shards.forEach((m) => {
        m.rotation.x += m.userData.spin.x;
        m.rotation.y += m.userData.spin.y;
        m.position.y += Math.sin(t * 0.2 + m.userData.driftPhase) * 0.01;
      });

      streaks.forEach((s, i) => { s.material.rotation += 0.0006 * (i % 2 === 0 ? 1 : -1); });

      camera.position.x = targetX * 8;
      camera.position.y = -targetY * 6 - scrollFrac * 10;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      const w = window.innerWidth, h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
  }

  /* =====================================================================
     3. SCROLL-ENTRANCE ANIMATIONS FOR CARDS + SUBTLE SECTION PARALLAX
  ===================================================================== */
  function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;
    const hasST = typeof ScrollTrigger !== 'undefined';
    if (hasST) gsap.registerPlugin(ScrollTrigger);

    const grids = [
      { sel: '#mangaGrid', item: '.manga-card' },
      { sel: '#chapterList', item: '.chapter-card' },
      { sel: '#characterGrid', item: '.char-card' },
      { sel: '#galleryGrid', item: '.gallery-item' },
      { sel: '#newsGrid', item: '.news-card' },
      { sel: '#loreAccordion', item: '.lore-item' }
    ];

    grids.forEach(({ sel, item }) => {
      const container = document.querySelector(sel);
      if (!container) return;
      animateGridChildren(container, item, hasST);
      const mo = new MutationObserver(() => animateGridChildren(container, item, hasST));
      mo.observe(container, { childList: true });
    });

    // Subtle whole-section depth parallax as the page scrolls (skip on
    // small screens / reduced motion to keep mobile scrolling light).
    if (hasST && !isSmallScreen) {
      document.querySelectorAll('.section-inner').forEach((el) => {
        gsap.fromTo(el, { y: 22 }, {
          y: -22, ease: 'none',
          scrollTrigger: { trigger: el.closest('.section'), start: 'top bottom', end: 'bottom top', scrub: 0.6 }
        });
      });
    }
  }

  function animateGridChildren(container, itemSelector, hasST) {
    const items = container.querySelectorAll(itemSelector);
    if (!items.length) return;
    const fresh = [...items].filter((el) => !el.dataset.motionInit);
    if (!fresh.length) return;
    fresh.forEach((el) => { el.dataset.motionInit = '1'; });

    if (hasST) {
      gsap.set(fresh, { opacity: 0, y: 34, rotateX: -6, transformPerspective: 800 });
      ScrollTrigger.batch(fresh, {
        start: 'top 90%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, rotateX: 0, duration: .8, ease: 'power3.out', stagger: .08 })
      });
    } else {
      fresh.forEach((el) => { el.style.opacity = '1'; });
    }

    if (!isCoarsePointer) fresh.forEach(attachTilt);
  }

  /* =====================================================================
     4. LIGHTWEIGHT 3D CARD TILT (pointer-driven, desktop/trackpad only)
  ===================================================================== */
  function attachTilt(el) {
    el.classList.add('tilt-3d');
    const strength = 7; // max degrees of rotation
    let bounds = null;

    function onEnter() { bounds = el.getBoundingClientRect(); el.style.transition = 'none'; }
    function onMove(e) {
      if (!bounds) bounds = el.getBoundingClientRect();
      const px = (e.clientX - bounds.left) / bounds.width - 0.5;
      const py = (e.clientY - bounds.top) / bounds.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-py * strength).toFixed(2)}deg) rotateY(${(px * strength).toFixed(2)}deg) translateZ(6px)`;
    }
    function onLeave() {
      el.style.transition = 'transform .5s cubic-bezier(.22,.68,0,1)';
      el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
      bounds = null;
    }
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  }

  /* =====================================================================
     INIT
  ===================================================================== */
  function start() {
    initLoader();
    initBackground3D();
    initScrollAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
