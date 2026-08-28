/* =====================================================================
   JOURNEY BEGIN — SCRIPT.JS
   All data lives in one place (DATA below) so new manga, chapters,
   characters, lore, gallery items and news can be added later just by
   editing these arrays/objects — no HTML changes required.
   ===================================================================== */

(() => {
  'use strict';

  /* =====================================================================
     0. DATA — add new manga / content here
  ===================================================================== */
  const DATA = {

    manga: [
      {
        id: 'eternity-of-crystal',
        title: 'Eternity of Crystal',
        author: 'Vishva & Mathavan',
        genre: 'Fantasy · Adventure · Mystery',
        status: 'Ongoing',
        chapters: 2,
        featured: true,
        cover: 'assets/manga/eternity-of-crystal/cover.jpg',
        description: 'An extraordinary journey begins in a world of crystals, kingdoms, mysteries and destiny.'
      },
      {
        id: 'ashen-vow',
        title: 'Ashen Vow',
        author: 'Journey Begin Studio',
        genre: 'Dark Fantasy · Drama',
        status: 'Coming Soon',
        chapters: 0,
        featured: false,
        cover: 'assets/manga/ashen-vow/cover.jpg',
        description: 'A fallen knight seeks redemption in a kingdom built on ash and broken oaths.'
      },
      {
        id: 'silver-static',
        title: 'Silver Static',
        author: 'Journey Begin Studio',
        genre: 'Sci-Fi · Mystery',
        status: 'Coming Soon',
        chapters: 0,
        featured: false,
        cover: 'assets/manga/silver-static/cover.jpg',
        description: 'In a city powered by memory, one signal refuses to be erased.'
      }
    ],

    chapters: [
      { manga: 'eternity-of-crystal', number: 1, title: 'Tale of Crystals', status: 'Available', pages: 6 },
      { manga: 'eternity-of-crystal', number: 2, title: 'The Silver Kingdom', status: 'Available', pages: 5 },
      { manga: 'eternity-of-crystal', number: 3, title: 'Echoes of Albia', status: 'Coming Soon', pages: 0 }
    ],

    characters: [
      {
        id: 'felix', name: 'Felix', age: '17',
        image: 'assets/characters/felix.jpg',
        short: 'A determined wanderer bound to the crystal\u2019s first awakening.',
        full: 'Felix carries a fragment of the Eternity Crystal without knowing why he was chosen. Quick-tempered but fiercely loyal, he is the story\u2019s reluctant compass — pulled toward a destiny far larger than the quiet life he once wanted.',
        traits: ['Crystal-bound', 'Impulsive', 'Loyal']
      },
      {
        id: 'richard', name: 'Richard', age: '17',
        image: 'assets/characters/richard.jpg',
        short: 'Felix\u2019s closest ally, sharp-minded and quietly protective.',
        full: 'Richard balances the group with calculation where Felix acts on instinct. Raised among scholars, he reads the world in patterns and prophecy — and is often the first to sense when something ancient has stirred.',
        traits: ['Strategist', 'Guarded', 'Scholar']
      },
      {
        id: 'albia', name: 'Albia', age: '15–16',
        image: 'assets/characters/albia.jpg',
        short: 'A quiet presence with a fractured connection to the old kingdoms.',
        full: 'Albia speaks little, but the crystals seem to answer when she is near. Her past is tangled with the fall of a kingdom no one else remembers, and every chapter peels back another layer of what she was made to carry.',
        traits: ['Mysterious', 'Empathic', 'Kingdom-born']
      },
      {
        id: 'cyrus', name: 'Cyrus', age: '17',
        image: 'assets/characters/cyrus.jpg',
        short: 'Charismatic, restless, and always first into danger.',
        full: 'Cyrus fights first and asks questions later — a habit that has saved the group as often as it\u2019s endangered them. Beneath the bravado is someone still learning what it costs to protect people he loves.',
        traits: ['Reckless', 'Charismatic', 'Protector']
      },
      {
        id: 'ivo', name: 'Ivo', age: '24–27',
        image: 'assets/characters/ivo.jpg',
        short: 'An enigmatic elder who knows more than he admits.',
        full: 'Ivo appears exactly when the group needs guidance — and vanishes just as easily. His knowledge of the crystals runs deeper than any living record should allow, and his motives remain the story\u2019s quietest mystery.',
        traits: ['Enigmatic', 'Elder', 'Untrusted']
      }
    ],

    locations: [
      { id: 'crystal-spire', name: 'The Crystal Spire', x: 28, y: 30,
        desc: 'A tower of raw crystal said to be the source of the Eternity Crystal itself. Few who enter return unchanged.',
        figures: ['Felix\u2019s awakening', 'First appearance of Ivo'] },
      { id: 'silver-kingdom', name: 'The Silver Kingdom', x: 62, y: 22,
        desc: 'A fortified realm of silver-veined stone, ruled by a crown that has feared the crystals for generations.',
        figures: ['Richard\u2019s homeland', 'Setting of Chapter 2'] },
      { id: 'ashfall-woods', name: 'Ashfall Woods', x: 45, y: 62,
        desc: 'A forest blackened by an event lost to history — locals refuse to speak its name after dark.',
        figures: ['Albia\u2019s origin', 'Hidden ruins'] },
      { id: 'hollow-coast', name: 'The Hollow Coast', x: 78, y: 68,
        desc: 'A shifting coastline where the tide reveals fragments of a kingdom that supposedly never existed.',
        figures: ['Cyrus\u2019s hometown', 'Smugglers\u2019 routes'] }
    ],

    lore: [
      { id: 'crystals', title: 'Crystals', body: 'The crystals are shards of a single, ancient formation shattered at the dawn of the current age. Each fragment resonates with a different aspect of will, memory, or fate — and each one chooses its bearer, not the other way around.' },
      { id: 'crystal-powers', title: 'Crystal Powers', body: 'No two crystal-bonds manifest the same power twice. Recorded effects range from accelerated instinct and clairvoyant flashes to the ability to fracture solid stone with a touch — but every power exacts a cost proportional to its strength.' },
      { id: 'kingdoms', title: 'Kingdoms', body: 'Three kingdoms once shared an uneasy peace over the crystal fields: the Silver Kingdom, the lost realm beneath Ashfall, and a third whose name has been deliberately erased from every surviving record.' },
      { id: 'weapons', title: 'Weapons', body: 'Crystal-forged weapons are rare and dangerous, drawing power directly from their wielder\u2019s bond. Most were destroyed after the Sundering; the few that remain are hunted by kingdoms and scavengers alike.' },
      { id: 'ancient-history', title: 'Ancient History', body: 'Long before the current kingdoms, a single empire is said to have controlled the whole of the crystal fields. Its fall — the Sundering — scattered both the crystals and the truth of what caused it.' },
      { id: 'mysteries', title: 'Mysteries', body: 'Why crystals choose their bearers, what Ivo truly is, and what waits at the center of the Crystal Spire remain unanswered. Journey Begin will unravel these slowly, one chapter at a time.' }
    ],

    gallery: [
      { id: 'g1', category: 'pages', src: 'assets/gallery/page-01.jpg', caption: 'Chapter 1 — Page 3' },
      { id: 'g2', category: 'pages', src: 'assets/gallery/page-02.jpg', caption: 'Chapter 1 — Page 5' },
      { id: 'g3', category: 'characters', src: 'assets/gallery/felix-art.jpg', caption: 'Felix — Character Art' },
      { id: 'g4', category: 'characters', src: 'assets/gallery/albia-art.jpg', caption: 'Albia — Character Art' },
      { id: 'g5', category: 'concept', src: 'assets/gallery/concept-spire.jpg', caption: 'Concept — The Crystal Spire' },
      { id: 'g6', category: 'concept', src: 'assets/gallery/concept-kingdom.jpg', caption: 'Concept — Silver Kingdom Gate' },
      { id: 'g7', category: 'maps', src: 'assets/gallery/world-map.jpg', caption: 'Full World Map' },
      { id: 'g8', category: 'pages', src: 'assets/gallery/page-03.jpg', caption: 'Chapter 2 — Page 2' }
    ],

    news: [
      { tag: 'Chapter Release', date: 'Aug 20, 2026', title: 'Chapter 2 — The Silver Kingdom is live', desc: 'Felix and Richard cross into the Silver Kingdom, and nothing about it is what the old stories promised.' },
      { tag: 'Character Reveal', date: 'Aug 12, 2026', title: 'Meet Ivo, the wanderer with no past', desc: 'Our fifth character profile is up — an elder whose knowledge of the crystals runs deeper than anyone expects.' },
      { tag: 'Artwork', date: 'Aug 3, 2026', title: 'New concept art: the Crystal Spire', desc: 'Early environment concept work for the tower at the center of it all, now in the Gallery.' },
      { tag: 'Development', date: 'Jul 22, 2026', title: 'Journey Begin platform enters open beta', desc: 'Search, bookmarks and the vertical reader are live across desktop and mobile.' }
    ],

    worldMapImage: null // set via admin (World Locations → World Map Background); null = use the default generated art
  };

  /* =====================================================================
     0b. LIVE DATA — pulls content from Firestore (fed by the /admin panel)
     Falls back silently to the hard-coded DATA above if Firebase isn't
     configured, the collections are still empty, or the network request
     fails for any reason — so the site always renders something.
  ===================================================================== */
  const DATA_CACHE_KEY = 'journeybegin_data_cache_v1';
  const DATA_CACHE_KEYS = ['manga', 'chapters', 'characters', 'locations', 'lore', 'gallery', 'news'];
  const DATA_CACHE_SCALAR_KEYS = ['worldMapImage'];

  // Loads the last successfully-fetched live content (saved to this browser's
  // session storage) so a page reload shows real content immediately instead
  // of flashing the built-in placeholder content first, while the network
  // fetch runs quietly in the background to catch anything that changed.
  function loadCachedData() {
    try {
      const raw = sessionStorage.getItem(DATA_CACHE_KEY);
      if (!raw) return;
      const cached = JSON.parse(raw);
      DATA_CACHE_KEYS.forEach(k => {
        if (Array.isArray(cached[k]) && cached[k].length) DATA[k] = cached[k];
      });
      DATA_CACHE_SCALAR_KEYS.forEach(k => {
        if (cached[k]) DATA[k] = cached[k];
      });
    } catch (e) { /* corrupt/unavailable cache — ignore, fallback DATA is used */ }
  }

  function saveCachedData() {
    try {
      const snapshot = {};
      DATA_CACHE_KEYS.forEach(k => { snapshot[k] = DATA[k]; });
      DATA_CACHE_SCALAR_KEYS.forEach(k => { snapshot[k] = DATA[k]; });
      sessionStorage.setItem(DATA_CACHE_KEY, JSON.stringify(snapshot));
    } catch (e) { /* storage full/unavailable — not critical, just skip caching */ }
  }

  // Fast path — text-only or already-lazy collections, fetched immediately
  // so the top of the page (manga grid) is live as fast as possible.
  async function loadRemoteData() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;

    try {
      const db = fb.db;
      const [mangaSnap, chaptersSnap, loreSnap, newsSnap] = await Promise.all([
        db.collection('manga').get(),
        db.collection('chapters').get(),
        db.collection('lore').get(),
        db.collection('news').get()
      ]);

      if (!mangaSnap.empty) {
        DATA.manga = mangaSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      if (!chaptersSnap.empty) {
        // Only lightweight chapter metadata is fetched here — the actual
        // page images are fetched on demand when a reader opens a chapter
        // (see openReader), so page load isn't slowed down by downloading
        // every chapter's pages up front.
        DATA.chapters = chaptersSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.manga || '').localeCompare(b.manga || '') || (a.number || 0) - (b.number || 0));
      }
      if (!loreSnap.empty) {
        DATA.lore = loreSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      if (!newsSnap.empty) {
        DATA.news = newsSnap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      saveCachedData();
    } catch (err) {
      console.warn('Journey Begin: could not load live content from Firebase, showing built-in defaults.', err);
    }
  }

  // Slow path — collections that carry compressed images (portraits, gallery
  // photos, the world map background). These are only fetched once their
  // section actually scrolls near the viewport (see initLazySections), so a
  // visit that never scrolls to Characters/World/Gallery never downloads
  // their images at all, and the manga grid up top is never held up by them.
  async function loadCharactersSection() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;
    try {
      const snap = await fb.db.collection('characters').get();
      if (!snap.empty) {
        DATA.characters = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderCharacters();
        saveCachedData();
        SEARCH_INDEX = buildSearchIndex();
      }
    } catch (err) {
      console.warn('Journey Begin: could not load characters.', err);
    }
  }

  async function loadWorldSection() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;
    try {
      const [locSnap, worldMapSnap] = await Promise.all([
        fb.db.collection('locations').get(),
        fb.db.collection('settings').doc('worldMap').get()
      ]);
      if (!locSnap.empty) {
        DATA.locations = locSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      }
      if (worldMapSnap.exists && worldMapSnap.data().image) {
        DATA.worldMapImage = worldMapSnap.data().image;
      }
      renderMap();
      saveCachedData();
      SEARCH_INDEX = buildSearchIndex();
    } catch (err) {
      console.warn('Journey Begin: could not load world map/locations.', err);
    }
  }

  async function loadGallerySection() {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return;
    try {
      const snap = await fb.db.collection('gallery').get();
      if (!snap.empty) {
        DATA.gallery = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        renderGallery();
        saveCachedData();
        SEARCH_INDEX = buildSearchIndex();
      }
    } catch (err) {
      console.warn('Journey Begin: could not load gallery.', err);
    }
  }

  // Kicks off each lazy section's fetch the moment it scrolls near the
  // viewport (600px early, so it's ready by the time it's actually visible)
  // rather than on first paint — this is what keeps the initial page load
  // light regardless of how many character portraits/gallery images exist.
  function initLazySections() {
    const targets = [
      { id: 'characters', loader: loadCharactersSection },
      { id: 'world', loader: loadWorldSection },
      { id: 'gallery', loader: loadGallerySection }
    ];
    targets.forEach(({ id, loader }) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!('IntersectionObserver' in window)) { loader(); return; }
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(el);
            loader();
          }
        });
      }, { rootMargin: '600px 0px' });
      observer.observe(el);
    });
  }

  /* =====================================================================
     1. PLACEHOLDER ART GENERATOR
     Generates a tasteful faceted-gradient placeholder as a data URI so the
     site looks complete before real art files are dropped into /assets.
     Any <img data-fallback-title="..."> will use this automatically.
  ===================================================================== */
  function placeholderSVG(title = '', subtitle = '', w = 600, h = 800) {
    const palettes = [
      ['#1b1b24', '#2a2438'], ['#151b22', '#233846'], ['#1a1622', '#33284a']
    ];
    const p = palettes[Math.abs(hashCode(title)) % palettes.length];
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${p[0]}"/>
            <stop offset="100%" stop-color="${p[1]}"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="${p[0]}"/>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <polygon points="${w*0.1},${h*0.15} ${w*0.5},${h*0.02} ${w*0.9},${h*0.2} ${w*0.75},${h*0.55} ${w*0.3},${h*0.6}"
          fill="none" stroke="rgba(143,211,236,0.18)" stroke-width="1.5"/>
        <polygon points="${w*0.15},${h*0.55} ${w*0.55},${h*0.5} ${w*0.85},${h*0.85} ${w*0.4},${h*0.95} ${w*0.05},${h*0.8}"
          fill="none" stroke="rgba(138,120,201,0.16)" stroke-width="1.5"/>
        <text x="50%" y="${h*0.92}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(14, w*0.045)}"
          fill="rgba(238,241,246,0.55)" letter-spacing="1">${escapeXML(title)}</text>
        <text x="50%" y="${h*0.96}" text-anchor="middle" font-family="monospace" font-size="${Math.max(9, w*0.026)}"
          fill="rgba(143,211,236,0.5)" letter-spacing="2">${escapeXML(subtitle.toUpperCase())}</text>
      </svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }
  function hashCode(str){ let h=0; for(let i=0;i<str.length;i++){ h = (h<<5)-h+str.charCodeAt(i); h|=0; } return h; }
  function escapeXML(s=''){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  /** Attach an onerror fallback to any image so broken asset paths still look intentional. */
  function withFallback(imgEl, title, subtitle, w, h) {
    imgEl.addEventListener('error', () => {
      imgEl.onerror = null;
      imgEl.src = placeholderSVG(title, subtitle, w, h);
    }, { once: true });
    return imgEl;
  }

  /* =====================================================================
     2. UTILITIES
  ===================================================================== */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function toast(msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove('show'), 2200);
  }

  /* =====================================================================
     3. BOOKMARKS (localStorage)
  ===================================================================== */
  const BookmarkStore = {
    KEY: 'journeybegin_bookmarks',
    all() {
      try { return JSON.parse(localStorage.getItem(this.KEY)) || []; }
      catch { return []; }
    },
    has(id) { return this.all().some(b => b.id === id); },
    toggle(item) {
      if (!requireLogin('Sign in to save bookmarks.')) return this.all();
      let list = this.all();
      if (list.some(b => b.id === item.id)) {
        list = list.filter(b => b.id !== item.id);
        toast('Removed from bookmarks');
      } else {
        list.push(item);
        toast('Bookmarked');
      }
      localStorage.setItem(this.KEY, JSON.stringify(list));
      renderBookmarkPanel();
      updateBookmarkCount();
      return list;
    },
    remove(id) {
      const list = this.all().filter(b => b.id !== id);
      localStorage.setItem(this.KEY, JSON.stringify(list));
      renderBookmarkPanel();
      updateBookmarkCount();
    }
  };

  function updateBookmarkCount() {
    const count = BookmarkStore.all().length;
    const badge = $('#bookmarkCount');
    badge.textContent = count;
    badge.dataset.zero = count === 0 ? 'true' : 'false';
  }

  function renderBookmarkPanel() {
    const list = BookmarkStore.all();
    const container = $('#bookmarkList');
    if (!list.length) {
      container.innerHTML = `<p class="empty-note">No bookmarks yet. Tap the crystal icon on any manga or chapter to save it here.</p>`;
      return;
    }
    container.innerHTML = list.map(item => `
      <div class="bookmark-row" data-id="${item.id}">
        <img src="${item.cover || ''}" alt="">
        <div>
          <div class="brtitle">${item.title}</div>
          <div class="brtype">${item.type}</div>
        </div>
        <button class="brremove" data-remove="${item.id}" aria-label="Remove bookmark">&times;</button>
      </div>
    `).join('');

    $$('img', container).forEach(img => withFallback(img, list.find(l=>l.cover===img.getAttribute('src'))?.title || '', '', 200, 260));
    $$('[data-remove]', container).forEach(btn => {
      btn.addEventListener('click', () => BookmarkStore.remove(btn.dataset.remove));
    });
  }

  /* =====================================================================
     4. RENDER: MANGA GRID
  ===================================================================== */
  function renderMangaGrid() {
    const grid = $('#mangaGrid');
    grid.innerHTML = DATA.manga.map(m => {
      const bookmarked = BookmarkStore.has('manga-' + m.id);
      const statusClass = m.status === 'Ongoing' ? 'status-ok' : 'status-soon';
      return `
      <article class="manga-card facet ${m.featured ? 'featured' : ''}" data-manga-id="${m.id}">
        <div class="cover">
          <span class="card-tag ${statusClass}">${m.status}</span>
          <button class="card-bookmark ${bookmarked ? 'active' : ''}" data-bookmark-manga="${m.id}" aria-label="Bookmark ${m.title}">
            <svg viewBox="0 0 24 24"><path d="M6 2h12a1 1 0 011 1v18l-7-4.2L5 21V3a1 1 0 011-1z"/></svg>
          </button>
          <img src="${m.cover}" alt="${m.title} cover">
        </div>
        <div class="body">
          <h3 class="title">${m.title}</h3>
          <div class="meta"><span>${m.genre}</span></div>
          <p class="desc">${m.description}</p>
          <div class="card-foot">
            <span class="read-link" data-open-reader data-manga="${m.id}" data-chapter="1">
              ${m.chapters > 0 ? 'Read Manga →' : 'Coming Soon'}
            </span>
            <span class="read-link" style="cursor:default;color:var(--text-low);border:none;">${m.chapters} ${m.chapters===1?'chapter':'chapters'}</span>
          </div>
        </div>
      </article>`;
    }).join('');

    $$('.manga-card img', grid).forEach(img => {
      const title = img.closest('.manga-card').querySelector('.title').textContent;
      withFallback(img, title, 'Journey Begin', 600, 800);
    });

    $$('[data-bookmark-manga]', grid).forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        const id = btn.dataset.bookmarkManga;
        const m = DATA.manga.find(x => x.id === id);
        BookmarkStore.toggle({ id: 'manga-' + id, type: 'Manga', title: m.title, cover: m.cover });
        btn.classList.toggle('active');
      });
    });

    $$('[data-open-reader]', grid).forEach(el => {
      el.addEventListener('click', (e) => {
        if (el.textContent.includes('Coming Soon')) { e.preventDefault(); return; }
        e.preventDefault();
        openReader(el.dataset.manga, parseInt(el.dataset.chapter, 10));
      });
    });
  }

  /* =====================================================================
     5. RENDER: CHAPTER LIST
  ===================================================================== */
  function renderChapterList() {
    const list = $('#chapterList');
    list.innerHTML = DATA.chapters.map(ch => {
      const manga = DATA.manga.find(m => m.id === ch.manga);
      const available = ch.status === 'Available';
      return `
      <div class="chapter-card" data-chapter-manga="${ch.manga}" data-chapter-number="${ch.number}">
        <div class="chapter-num">${String(ch.number).padStart(2,'0')}</div>
        <div class="chapter-info">
          <div class="cname">${ch.title}</div>
          <div class="cmanga">${manga ? manga.title : ch.manga}</div>
        </div>
        <div class="chapter-status ${available ? 'ok' : 'soon'}">${ch.status}</div>
        <button class="chapter-read-btn" ${available ? '' : 'disabled'} data-open-reader data-manga="${ch.manga}" data-chapter="${ch.number}">
          ${available ? 'Read Chapter' : 'Locked'}
        </button>
      </div>`;
    }).join('');

    $$('[data-open-reader]', list).forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.disabled) return;
        openReader(btn.dataset.manga, parseInt(btn.dataset.chapter, 10));
      });
    });
  }

  /* =====================================================================
     6. RENDER: WORLD MAP
  ===================================================================== */
  function renderMap() {
    const stage = $('#mapStage');
    const art = $('.map-art', stage);
    if (art) {
      if (DATA.worldMapImage) {
        art.style.backgroundImage = `url('${DATA.worldMapImage}')`;
        art.style.backgroundSize = 'cover';
        art.style.backgroundPosition = 'center';
      } else {
        art.style.backgroundImage = '';
      }
    }
    $$('.map-marker', stage).forEach(el => el.remove());
    const markersHTML = DATA.locations.map(loc => `
      <button class="map-marker" style="left:${loc.x}%; top:${loc.y}%;" data-loc="${loc.id}" aria-label="${loc.name}">
        <span class="map-marker-label">${loc.name}</span>
      </button>
    `).join('');
    stage.insertAdjacentHTML('beforeend', markersHTML);

    $$('.map-marker', stage).forEach(marker => {
      marker.addEventListener('click', () => {
        $$('.map-marker', stage).forEach(m => m.classList.remove('active'));
        marker.classList.add('active');
        const loc = DATA.locations.find(l => l.id === marker.dataset.loc);
        renderMapPanel(loc);
      });
    });
  }

  function renderMapPanel(loc) {
    const panel = $('#mapPanel');
    panel.innerHTML = `
      <div class="loc-name">${loc.name}</div>
      <p class="loc-desc">${loc.desc}</p>
      <div class="loc-figures">${loc.figures.map(f => `<div><b>›</b> ${f}</div>`).join('')}</div>
    `;
  }

  /* =====================================================================
     7. RENDER: CHARACTERS
  ===================================================================== */
  function renderCharacters() {
    const grid = $('#characterGrid');
    grid.innerHTML = DATA.characters.map(c => `
      <article class="char-card facet-sm" data-char="${c.id}" tabindex="0">
        <div class="portrait">
          <img src="${c.image}" alt="${c.name}">
          <div class="cinfo">
            <div class="cname">${c.name}</div>
            <div class="cage">Age ${c.age}</div>
          </div>
        </div>
        <p class="cshort">${c.short}</p>
      </article>
    `).join('');

    $$('.char-card img', grid).forEach(img => {
      const name = img.closest('.char-card').querySelector('.cname').textContent;
      withFallback(img, name, 'Character', 450, 600);
    });

    $$('.char-card', grid).forEach(card => {
      const open = () => openCharacterModal(card.dataset.char);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
  }

  function openCharacterModal(id) {
    const c = DATA.characters.find(x => x.id === id);
    if (!c) return;
    const body = $('#charModalBody');
    body.innerHTML = `
      <div class="char-modal-hero">
        <img src="${c.image}" alt="${c.name}">
        <div class="char-modal-info">
          <h2>${c.name}</h2>
          <span class="cmage">Age ${c.age}</span>
          <p>${c.full}</p>
          <div class="ctraits">${c.traits.map(t => `<span class="ctrait">${t}</span>`).join('')}</div>
        </div>
      </div>
    `;
    withFallback($('img', body), c.name, 'Character', 450, 600);
    $('#charModalOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCharacterModal() {
    $('#charModalOverlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  /* =====================================================================
     8. RENDER: LORE ACCORDION
  ===================================================================== */
  function renderLore() {
    const wrap = $('#loreAccordion');
    wrap.innerHTML = DATA.lore.map((l, i) => `
      <div class="lore-item" data-lore="${l.id}">
        <button class="lore-head" aria-expanded="false">
          <span class="lname"><span class="lidx">${String(i+1).padStart(2,'0')}</span> ${l.title}</span>
          <span class="lplus">+</span>
        </button>
        <div class="lore-body"><div class="lore-body-inner">${l.body}</div></div>
      </div>
    `).join('');

    $$('.lore-item', wrap).forEach(item => {
      const head = $('.lore-head', item);
      const body = $('.lore-body', item);
      head.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // collapse all others (accordion behaviour) — comment out these two lines for independent toggles
        $$('.lore-item.open', wrap).forEach(o => { if (o !== item) collapseLore(o); });
        isOpen ? collapseLore(item) : expandLore(item);
      });
    });

    function expandLore(item) {
      item.classList.add('open');
      $('.lore-head', item).setAttribute('aria-expanded', 'true');
      const body = $('.lore-body', item);
      body.style.maxHeight = body.scrollHeight + 'px';
    }
    function collapseLore(item) {
      item.classList.remove('open');
      $('.lore-head', item).setAttribute('aria-expanded', 'false');
      $('.lore-body', item).style.maxHeight = null;
    }
  }

  /* =====================================================================
     9. RENDER: GALLERY + LIGHTBOX
  ===================================================================== */
  let currentGalleryFiltered = [];
  let currentLightboxIndex = 0;

  function renderGallery() {
    const grid = $('#galleryGrid');
    grid.innerHTML = DATA.gallery.map((g, i) => `
      <div class="gallery-item" data-index="${i}" data-category="${g.category}">
        <img src="${g.src}" alt="${g.caption}">
        <div class="gcap">${g.caption}</div>
      </div>
    `).join('');

    $$('.gallery-item img', grid).forEach((img, i) => withFallback(img, DATA.gallery[i].caption, DATA.gallery[i].category, 600, 800));

    $$('.gallery-item', grid).forEach(item => {
      item.addEventListener('click', () => {
        currentGalleryFiltered = getVisibleGalleryIndices();
        currentLightboxIndex = currentGalleryFiltered.indexOf(parseInt(item.dataset.index, 10));
        openLightbox();
      });
    });

    $$('.gallery-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.gallery-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.dataset.filter;
        $$('.gallery-item', grid).forEach(item => {
          item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter);
        });
      });
    });
  }

  function getVisibleGalleryIndices() {
    return $$('.gallery-item').filter(i => !i.classList.contains('hidden')).map(i => parseInt(i.dataset.index, 10));
  }

  function openLightbox() {
    const lb = $('#lightbox');
    updateLightbox();
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    $('#lightbox').classList.remove('open');
    $('#lightbox').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function updateLightbox() {
    const idx = currentGalleryFiltered[currentLightboxIndex];
    const item = DATA.gallery[idx];
    const img = $('#lightboxImg');
    img.src = item.src;
    img.alt = item.caption;
    withFallback(img, item.caption, item.category, 900, 1200);
    $('#lightboxCaption').textContent = item.caption;
  }
  function lightboxStep(dir) {
    if (!currentGalleryFiltered.length) return;
    currentLightboxIndex = (currentLightboxIndex + dir + currentGalleryFiltered.length) % currentGalleryFiltered.length;
    updateLightbox();
  }

  /* =====================================================================
     10. RENDER: NEWS
  ===================================================================== */
  function renderNews() {
    const grid = $('#newsGrid');
    grid.innerHTML = DATA.news.map(n => `
      <article class="news-card">
        <span class="news-date">${n.date}</span>
        <span class="news-tag">${n.tag}</span>
        <h3 class="news-title">${n.title}</h3>
        <p class="news-desc">${n.desc}</p>
      </article>
    `).join('');
  }

  /* =====================================================================
     11. MANGA READER
  ===================================================================== */
  const ReaderState = { manga: null, chapter: null, zoom: 100 };

  function getMangaChapters(mangaId) {
    return DATA.chapters.filter(c => c.manga === mangaId).sort((a,b) => a.number - b.number);
  }

  async function openReader(mangaId, chapterNumber) {
    const manga = DATA.manga.find(m => m.id === mangaId);
    const chapters = getMangaChapters(mangaId);
    const chapter = chapters.find(c => c.number === chapterNumber);
    if (!manga || !chapter) return;

    ReaderState.manga = mangaId;
    ReaderState.chapter = chapterNumber;
    ReaderState.zoom = 100;
    updateZoomUI();

    $('#readerMangaTitle').textContent = manga.title;
    $('#readerChapterTitle').textContent = `Chapter ${chapter.number} — ${chapter.title}`;

    const pagesWrap = $('#readerPages');

    // Fetch this chapter's actual page images only when it's opened, not
    // ahead of time — keeps the rest of the site fast regardless of how
    // many chapters/pages exist. Once fetched, cached on the chapter object
    // so flipping back to it later in the same session is instant.
    if (chapter.pageImages === undefined && window.jbFirebase && window.jbFirebase.db) {
      pagesWrap.innerHTML = `<div class="reader-loading-page">Loading pages…</div>`;
      try {
        const snap = await window.jbFirebase.db
          .collection('chapters').doc(chapter.id)
          .collection('pageImages').orderBy('order').get();
        chapter.pageImages = snap.empty ? null : snap.docs.map(p => p.data().data);
      } catch (e) {
        chapter.pageImages = null;
      }
      // Bail out if the reader was closed or navigated elsewhere while this
      // chapter's pages were loading.
      if (ReaderState.manga !== mangaId || ReaderState.chapter !== chapterNumber) return;
    }

    pagesWrap.innerHTML = '';

    // Prefer explicit page images (from admin, fetched above). Fall back to
    // the assets/ folder naming convention for chapters managed by hand.
    const pageImages = Array.isArray(chapter.pageImages) && chapter.pageImages.length
      ? chapter.pageImages
      : null;
    const pageCount = pageImages ? pageImages.length : (chapter.pages || 5);

    for (let p = 1; p <= pageCount; p++) {
      const num = String(p).padStart(2, '0');
      const src = pageImages ? pageImages[p - 1] : `assets/manga/${mangaId}/chapter-${chapter.number}/page-${num}.jpg`;
      const div = document.createElement('div');
      div.className = 'reader-page-wrap';
      div.innerHTML = `<img data-page="${p}" src="${src}" alt="Page ${p}" loading="lazy">`;
      pagesWrap.appendChild(div);
      const img = $('img', div);
      img.addEventListener('error', () => {
        img.onerror = null;
        div.innerHTML = `<div class="reader-loading-page">Page ${num} — drop your art at<br>${src}</div>`;
      }, { once: true });
    }

    // Comments live at the bottom of the scrollable page area, after the
    // last page — same section reused/rebuilt each time a chapter opens.
    const commentsDiv = document.createElement('div');
    commentsDiv.className = 'reader-comments';
    commentsDiv.id = 'readerComments';
    pagesWrap.appendChild(commentsDiv);
    renderChapterComments(chapter.id);

    updateReaderNavButtons(chapters, chapter);
    const reader = $('#reader');
    reader.classList.add('open');
    reader.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    pagesWrap.scrollTop = 0;
    updateReaderProgress();
  }

  function closeReader() {
    const reader = $('#reader');
    reader.classList.remove('open');
    reader.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (document.fullscreenElement) document.exitFullscreen?.();
  }

  function updateReaderNavButtons(chapters, current) {
    const idx = chapters.findIndex(c => c.number === current.number);
    const prevBtn = $('#prevChapter');
    const nextBtn = $('#nextChapter');
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= chapters.length - 1 || chapters[idx+1]?.status !== 'Available';
    prevBtn.onclick = () => { if (idx > 0) openReader(ReaderState.manga, chapters[idx-1].number); };
    nextBtn.onclick = () => { if (idx < chapters.length - 1 && chapters[idx+1].status === 'Available') openReader(ReaderState.manga, chapters[idx+1].number); };
  }

  function updateZoomUI() {
    $('#zoomLevel').textContent = ReaderState.zoom + '%';
    document.documentElement.style.setProperty('--reader-zoom', ReaderState.zoom + '%');
  }

  function updateReaderProgress() {
    const pagesWrap = $('#readerPages');
    const wraps = $$('.reader-page-wrap', pagesWrap);
    if (!wraps.length) return;
    const scrollMid = pagesWrap.scrollTop + pagesWrap.clientHeight / 2;
    let current = 1;
    wraps.forEach((w, i) => { if (w.offsetTop <= scrollMid) current = i + 1; });
    $('#readerProgress').textContent = `Page ${current} / ${wraps.length}`;
  }

  /* =====================================================================
     12. SEARCH
  ===================================================================== */
  function buildSearchIndex() {
    const index = [];
    DATA.manga.forEach(m => index.push({ type: 'Manga', title: m.title, sub: m.genre, action: () => { closeSearch(); scrollToId('manga'); } }));
    DATA.characters.forEach(c => index.push({ type: 'Character', title: c.name, sub: `Age ${c.age}`, action: () => { closeSearch(); openCharacterModal(c.id); } }));
    DATA.chapters.forEach(c => index.push({ type: 'Chapter', title: `Ch. ${c.number} — ${c.title}`, sub: c.status, action: () => { closeSearch(); if (c.status === 'Available') openReader(c.manga, c.number); else scrollToId('discover'); } }));
    DATA.locations.forEach(l => index.push({ type: 'Location', title: l.name, sub: 'World Map', action: () => { closeSearch(); scrollToId('world'); } }));
    DATA.lore.forEach(l => index.push({ type: 'Lore', title: l.title, sub: 'Lore & Mysteries', action: () => { closeSearch(); scrollToId('lore'); } }));
    DATA.news.forEach(n => index.push({ type: 'News', title: n.title, sub: n.tag, action: () => { closeSearch(); scrollToId('news'); } }));
    return index;
  }
  let SEARCH_INDEX = [];

  function runSearch(query) {
    const results = $('#searchResults');
    if (!query.trim()) {
      results.innerHTML = `<p class="search-hint">Try “Felix”, “Chapter 2”, “Kingdom”, or “Crystal”.</p>`;
      return;
    }
    const q = query.toLowerCase();
    const matches = SEARCH_INDEX.filter(item => item.title.toLowerCase().includes(q) || item.sub.toLowerCase().includes(q));

    if (!matches.length) {
      results.innerHTML = `<p class="search-hint">No results for “${query}”. Try another term.</p>`;
      return;
    }

    const groups = {};
    matches.forEach(m => { (groups[m.type] = groups[m.type] || []).push(m); });

    results.innerHTML = Object.entries(groups).map(([type, items]) => `
      <div class="search-result-group">
        <h4>${type}</h4>
        ${items.map((it, i) => `<div class="search-result-item" data-group="${type}" data-i="${i}">
          <span>${it.title}</span><span class="srtype">${it.sub}</span>
        </div>`).join('')}
      </div>
    `).join('');

    $$('.search-result-item', results).forEach(el => {
      const item = groups[el.dataset.group][parseInt(el.dataset.i, 10)];
      el.addEventListener('click', item.action);
    });
  }

  function openSearch() {
    $('#searchOverlay').classList.add('open');
    setTimeout(() => $('#searchInput').focus(), 250);
  }
  function closeSearch() {
    $('#searchOverlay').classList.remove('open');
    $('#searchInput').value = '';
    runSearch('');
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  /* =====================================================================
     13. NAV / SCROLL BEHAVIOUR / REVEALS / PARALLAX
  ===================================================================== */
  function initNav() {
    const nav = $('#siteNav');
    const navLinks = $$('.nav-link');
    const sections = ['home','manga','discover','world','characters','news'].map(id => document.getElementById(id)).filter(Boolean);

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);

      // scroll progress bar
      const total = document.documentElement.scrollHeight - window.innerHeight;
      $('#scrollProgress').style.width = (window.scrollY / total * 100) + '%';

      // active link tracking
      let currentId = sections[0]?.id;
      sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 140) currentId = sec.id; });
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + currentId));

      // hero parallax
      const heroBg = $('#heroBg');
      if (heroBg && window.scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.05)`;
      }
    }, { passive: true });

    $$('[data-nav-link]').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          closeMobileMenu();
          scrollToId(href.slice(1));
        }
      });
    });
  }

  function initHamburger() {
    const btn = $('#hamburgerBtn');
    const links = $('#navLinks');
    btn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  function closeMobileMenu() {
    $('#navLinks').classList.remove('open');
    $('#hamburgerBtn').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initReveals() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    $$('.reveal, .reveal-up').forEach(el => io.observe(el));
  }

  /* =====================================================================
     13b. READER ACCOUNTS (Firebase Auth) & CHAPTER COMMENTS
  ===================================================================== */
  const Auth = {
    user: null,       // Firebase Auth user object, or null when logged out
    ready: false,     // becomes true once the first auth state is known
    listeners: []
  };

  function onAuthChange(cb) {
    Auth.listeners.push(cb);
    if (Auth.ready) cb(Auth.user);
  }

  function initAuth() {
    const fb = window.jbFirebase;
    if (!fb || !fb.auth) return;
    fb.auth.onAuthStateChanged((user) => {
      Auth.user = user;
      Auth.ready = true;
      updateAccountUI(user);
      Auth.listeners.forEach(cb => cb(user));
    });
  }

  function updateAccountUI(user) {
    const authView = $('#accountAuthView');
    const profileView = $('#accountProfileView');
    if (user) {
      authView.classList.add('hidden');
      profileView.classList.remove('hidden');
      const name = user.displayName || user.email || 'Reader';
      $('#accountName').textContent = name;
      $('#accountEmail').textContent = user.email || '';
      $('#accountAvatar').textContent = name.trim().charAt(0).toUpperCase() || '?';
    } else {
      authView.classList.remove('hidden');
      profileView.classList.add('hidden');
    }

    // If a chapter is currently open in the reader, refresh its comments so
    // the comment form / like buttons reflect the new login state right away.
    if ($('#reader').classList.contains('open') && ReaderState.manga && ReaderState.chapter) {
      const chapters = getMangaChapters(ReaderState.manga);
      const chapter = chapters.find(c => c.number === ReaderState.chapter);
      if (chapter) renderChapterComments(chapter.id);
    }
  }

  function friendlyAuthError(err) {
    const code = (err && err.code) || '';
    if (code.includes('email-already-in-use')) return 'That email is already registered — try signing in instead.';
    if (code.includes('weak-password')) return 'Password should be at least 6 characters.';
    if (code.includes('user-not-found') || code.includes('wrong-password') || code.includes('invalid-credential')) return 'Incorrect email or password.';
    if (code.includes('invalid-email')) return 'That email address looks invalid.';
    if (code.includes('too-many-requests')) return 'Too many attempts. Please wait and try again.';
    return 'Something went wrong. Please try again.';
  }

  function initAccountForms() {
    const fb = window.jbFirebase;
    initAuth();

    $$('.account-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.account-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const which = tab.dataset.accountTab;
        $('#accountLoginForm').classList.toggle('hidden', which !== 'login');
        $('#accountRegisterForm').classList.toggle('hidden', which !== 'register');
        $('#accountError').classList.add('hidden');
      });
    });

    $('#accountLoginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = $('#accountError');
      errEl.classList.add('hidden');
      if (!fb || !fb.auth) return;
      try {
        await fb.auth.signInWithEmailAndPassword($('#acctLoginEmail').value.trim(), $('#acctLoginPassword').value);
        $('#accountOverlay').classList.remove('open');
        toast('Signed in.');
      } catch (err) {
        errEl.textContent = friendlyAuthError(err);
        errEl.classList.remove('hidden');
      }
    });

    $('#accountRegisterForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = $('#accountError');
      errEl.classList.add('hidden');
      if (!fb || !fb.auth) return;
      const name = $('#acctRegName').value.trim();
      const email = $('#acctRegEmail').value.trim();
      const password = $('#acctRegPassword').value;
      try {
        const cred = await fb.auth.createUserWithEmailAndPassword(email, password);
        await cred.user.updateProfile({ displayName: name });
        await fb.db.collection('users').doc(cred.user.uid).set({ displayName: name, email }, { merge: true });
        updateAccountUI(fb.auth.currentUser);
        $('#accountOverlay').classList.remove('open');
        toast('Account created — welcome!');
      } catch (err) {
        errEl.textContent = friendlyAuthError(err);
        errEl.classList.remove('hidden');
      }
    });

    $('#accountLogoutBtn').addEventListener('click', async () => {
      if (!fb || !fb.auth) return;
      await fb.auth.signOut();
      toast('Signed out.');
    });
  }

  function requireLogin(promptMessage) {
    if (Auth.user) return true;
    toast(promptMessage || 'Please sign in first.', true);
    $('#accountOverlay').classList.add('open');
    return false;
  }

  /* ---- Chapter comments (Instagram-style: single like, threaded replies,
     collapsed-by-default extra replies, quick-emoji compose bar) ----
     Comments for the open chapter are fetched once into CommentsState, then
     every action (post/like/reply) patches just the affected DOM node
     instead of re-rendering the whole list — this is what removes the
     "whole section refreshes" flash on every click. ---- */
  const QUICK_EMOJIS = ['❤️', '🙌', '🔥', '👏', '😢', '😍', '😮', '😂'];
  const CommentsState = { chapterId: null, comments: [] };

  function tsMillis(ts) { return ts && ts.toMillis ? ts.toMillis() : 0; }

  function timeAgo(date) {
    if (!date) return '';
    const secs = Math.floor((Date.now() - date.getTime()) / 1000);
    if (secs < 60) return 'now';
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d`;
    return date.toLocaleDateString();
  }

  function escapeHTMLComment(s = '') {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  async function fetchChapterComments(chapterId) {
    const fb = window.jbFirebase;
    if (!fb || !fb.db) return [];
    try {
      const snap = await fb.db.collection('comments').where('chapterId', '==', chapterId).get();
      const comments = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      await Promise.all(comments.map(async c => {
        try {
          const rSnap = await fb.db.collection('comments').doc(c.id).collection('replies').get();
          c.replies = rSnap.docs.map(rd => ({ id: rd.id, ...rd.data() }));
          c.replies.sort((a, b) => tsMillis(a.createdAt) - tsMillis(b.createdAt));
        } catch (e) { c.replies = []; }
      }));
      comments.sort((a, b) => tsMillis(b.createdAt) - tsMillis(a.createdAt));
      return comments;
    } catch (err) {
      console.warn('Could not load comments', err);
      return [];
    }
  }

  function likeButtonHTML(item, user) {
    const likedBy = Array.isArray(item.likedBy) ? item.likedBy : [];
    const liked = user && likedBy.includes(user.uid);
    return `<button type="button" class="ig-like-btn ${liked ? 'liked' : ''}" data-like="${item.id}">
      <svg viewBox="0 0 24 24"><path d="M12 21s-7.2-4.5-9.6-9C.7 8.8 2 5 5.6 4.2c2-.4 3.9.5 5 2.1 1.1-1.6 3-2.5 5-2.1C19.2 5 20.5 8.8 18.8 12c-2.4 4.5-9.6 9-9.6 9z"/></svg>
      <span class="ig-like-count">${likedBy.length || ''}</span>
    </button>`;
  }

  function commentRowHTML(c, user, isReply) {
    const when = c.createdAt && c.createdAt.toDate ? timeAgo(c.createdAt.toDate()) : 'now';
    const initial = (c.authorName || '?').trim().charAt(0).toUpperCase();
    return `
      <div class="comment-row ${isReply ? 'is-reply' : ''}" data-comment="${c.id}">
        <div class="comment-avatar">${initial}</div>
        <div class="comment-body">
          <div class="comment-line"><span class="comment-author">${escapeHTMLComment(c.authorName || 'Reader')}</span> <span class="comment-time">${when}</span></div>
          <div class="comment-text">${escapeHTMLComment(c.text || '')}</div>
          ${!isReply ? `<button type="button" class="comment-reply-toggle" data-reply-toggle="${c.id}">Reply</button>` : ''}
        </div>
        ${likeButtonHTML(c, user)}
      </div>`;
  }

  function repliesBlockHTML(c, user) {
    const replies = c.replies || [];
    if (!replies.length) return `<div class="comment-replies" id="replies-${c.id}"></div>`;
    const [first, ...rest] = replies;
    const restHTML = rest.map(r => commentRowHTML(r, user, true)).join('');
    return `
      <div class="comment-replies" id="replies-${c.id}">
        ${commentRowHTML(first, user, true)}
        ${rest.length ? `
          <button type="button" class="view-more-replies" data-view-more="${c.id}">
            <span class="line"></span> View ${rest.length} more ${rest.length === 1 ? 'reply' : 'replies'}
          </button>
          <div class="more-replies hidden" id="more-replies-${c.id}">${restHTML}</div>
        ` : ''}
      </div>`;
  }

  function quickEmojiBarHTML(targetTextareaId) {
    return `<div class="quick-emoji-bar" data-for="${targetTextareaId}">
      ${QUICK_EMOJIS.map(e => `<button type="button" class="quick-emoji-btn" data-emoji="${e}">${e}</button>`).join('')}
    </div>`;
  }

  function wireQuickEmojiBar(barEl) {
    if (!barEl) return;
    const targetId = barEl.dataset.for;
    const textarea = document.getElementById(targetId);
    if (!textarea) return;
    $$('.quick-emoji-btn', barEl).forEach(btn => {
      btn.addEventListener('click', () => {
        textarea.value += btn.dataset.emoji;
        textarea.focus();
      });
    });
  }

  function wireCommentRowInteractions(rowOrForm) {
    // Like button
    $$('[data-like]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => toggleLike(btn.dataset.like, btn));
    });
    // Reply toggle
    $$('[data-reply-toggle]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => {
        if (!requireLogin('Sign in to reply to comments.')) return;
        showReplyForm(btn.dataset.replyToggle);
      });
    });
    // View more replies
    $$('[data-view-more]', rowOrForm).forEach(btn => {
      btn.addEventListener('click', () => {
        const commentId = btn.dataset.viewMore;
        $('#more-replies-' + commentId).classList.remove('hidden');
        btn.classList.add('hidden');
      });
    });
  }

  function findCommentAndRef(itemId) {
    const fb = window.jbFirebase;
    for (const c of CommentsState.comments) {
      if (c.id === itemId) return { item: c, ref: fb.db.collection('comments').doc(c.id), parent: null };
      const reply = (c.replies || []).find(r => r.id === itemId);
      if (reply) return { item: reply, ref: fb.db.collection('comments').doc(c.id).collection('replies').doc(reply.id), parent: c };
    }
    return {};
  }

  async function toggleLike(itemId, btnEl) {
    if (!requireLogin('Sign in to like comments.')) return;
    const fb = window.jbFirebase;
    const user = Auth.user;
    const { item, ref } = findCommentAndRef(itemId);
    if (!item || !ref) return;

    const likedBy = Array.isArray(item.likedBy) ? item.likedBy : (item.likedBy = []);
    const alreadyLiked = likedBy.includes(user.uid);

    // Optimistic local update + instant DOM patch — no re-fetch, no flash.
    if (alreadyLiked) {
      item.likedBy = likedBy.filter(id => id !== user.uid);
    } else {
      item.likedBy = [...likedBy, user.uid];
    }
    btnEl.classList.toggle('liked', !alreadyLiked);
    btnEl.querySelector('.ig-like-count').textContent = item.likedBy.length || '';

    try {
      await ref.update({
        likedBy: alreadyLiked
          ? fb.firebase.firestore.FieldValue.arrayRemove(user.uid)
          : fb.firebase.firestore.FieldValue.arrayUnion(user.uid)
      });
    } catch (err) {
      // Roll back on failure.
      item.likedBy = likedBy;
      btnEl.classList.toggle('liked', alreadyLiked);
      btnEl.querySelector('.ig-like-count').textContent = likedBy.length || '';
      toast('Could not update like: ' + (err.message || err), true);
    }
  }

  function showReplyForm(commentId) {
    const container = $('#replies-' + commentId);
    if (!container || $('#replyForm-' + commentId)) return;
    const user = Auth.user;
    const formHTML = `
      <form class="reply-form" id="replyForm-${commentId}" data-reply-form="${commentId}">
        <textarea id="replyInput-${commentId}" maxlength="1000" placeholder="Write a reply..." required></textarea>
        ${quickEmojiBarHTML('replyInput-' + commentId)}
        <button type="submit">Reply</button>
      </form>`;
    container.insertAdjacentHTML('beforeend', formHTML);
    const form = $('#replyForm-' + commentId);
    wireQuickEmojiBar($('.quick-emoji-bar', form));
    $('#replyInput-' + commentId).focus();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const textarea = $('#replyInput-' + commentId);
      const text = textarea.value.trim();
      if (!text) return;
      const fb = window.jbFirebase;
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      try {
        const docRef = await fb.db.collection('comments').doc(commentId).collection('replies').add({
          text,
          uid: user.uid,
          authorName: user.displayName || user.email || 'Reader',
          createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
          likedBy: []
        });
        const comment = CommentsState.comments.find(c => c.id === commentId);
        const newReply = { id: docRef.id, text, uid: user.uid, authorName: user.displayName || user.email || 'Reader', createdAt: { toDate: () => new Date() }, likedBy: [] };
        if (comment) {
          comment.replies = comment.replies || [];
          comment.replies.push(newReply);
        }
        form.remove();
        // Patch just this comment's replies block rather than the whole list.
        const container2 = $('#replies-' + commentId);
        if (container2 && comment) {
          container2.outerHTML = repliesBlockHTML(comment, Auth.user);
          wireCommentRowInteractions($('#replies-' + commentId));
        }
      } catch (err) {
        toast('Could not post reply: ' + (err.message || err), true);
      } finally {
        btn.disabled = false;
      }
    });
  }

  async function renderChapterComments(chapterId) {
    const wrap = $('#readerComments');
    if (!wrap) return;

    const user = Auth.user;
    const loginNoteHTML = user ? '' : `
      <div class="comment-login-note">
        <span>Sign in to join the conversation and like comments.</span>
        <button type="button" id="commentLoginBtn">Sign In</button>
      </div>`;
    const formHTML = user ? `
      <form class="comment-form" id="chapterCommentForm">
        <textarea id="chapterCommentInput" maxlength="2000" placeholder="Share your thoughts on this chapter..." required></textarea>
        ${quickEmojiBarHTML('chapterCommentInput')}
        <button type="submit">Post Comment</button>
      </form>` : '';

    wrap.innerHTML = `
      <h3>Comments</h3>
      ${loginNoteHTML}
      ${formHTML}
      <div class="comment-list" id="chapterCommentList"><p class="comment-empty">Loading comments…</p></div>
    `;

    if (!user) {
      $('#commentLoginBtn').addEventListener('click', () => $('#accountOverlay').classList.add('open'));
    } else {
      wireQuickEmojiBar($('.quick-emoji-bar', wrap));
      $('#chapterCommentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const input = $('#chapterCommentInput');
        const text = input.value.trim();
        if (!text) return;
        const fb = window.jbFirebase;
        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        try {
          const docRef = await fb.db.collection('comments').add({
            chapterId,
            text,
            uid: user.uid,
            authorName: user.displayName || user.email || 'Reader',
            createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
            likedBy: []
          });
          const newComment = { id: docRef.id, chapterId, text, uid: user.uid, authorName: user.displayName || user.email || 'Reader', createdAt: { toDate: () => new Date() }, likedBy: [], replies: [] };
          CommentsState.comments.unshift(newComment);
          input.value = '';

          const listEl = $('#chapterCommentList');
          if (listEl.querySelector('.comment-empty')) listEl.innerHTML = '';
          const threadHTML = `<div class="comment-thread" data-thread="${newComment.id}">${commentRowHTML(newComment, user, false)}${repliesBlockHTML(newComment, user)}</div>`;
          listEl.insertAdjacentHTML('afterbegin', threadHTML);
          wireCommentRowInteractions(listEl.querySelector(`[data-thread="${newComment.id}"]`));
        } catch (err) {
          toast('Could not post comment: ' + (err.message || err), true);
        } finally {
          btn.disabled = false;
        }
      });
    }

    const comments = await fetchChapterComments(chapterId);
    CommentsState.chapterId = chapterId;
    CommentsState.comments = comments;

    const listEl = $('#chapterCommentList');
    if (!listEl) return; // reader may have been closed while this was loading
    if (!comments.length) {
      listEl.innerHTML = `<p class="comment-empty">No comments yet — be the first to share your thoughts.</p>`;
      return;
    }

    listEl.innerHTML = comments.map(c => `
      <div class="comment-thread" data-thread="${c.id}">
        ${commentRowHTML(c, user, false)}
        ${repliesBlockHTML(c, user)}
      </div>
    `).join('');

    wireCommentRowInteractions(listEl);
  }

  /* =====================================================================
     14. EVENT WIRING (search, bookmarks, reader controls, lightbox, modal)
  ===================================================================== */
  function initOverlaysAndControls() {
    // search
    $('#searchToggle').addEventListener('click', openSearch);
    $('#searchClose').addEventListener('click', closeSearch);
    $('#searchOverlay').addEventListener('click', (e) => { if (e.target.id === 'searchOverlay') closeSearch(); });
    $('#searchInput').addEventListener('input', (e) => runSearch(e.target.value));

    // bookmarks panel
    $('#bookmarkToggle').addEventListener('click', () => $('#bookmarkOverlay').classList.add('open'));
    $('#bookmarkClose').addEventListener('click', () => $('#bookmarkOverlay').classList.remove('open'));
    $('#bookmarkOverlay').addEventListener('click', (e) => { if (e.target.id === 'bookmarkOverlay') $('#bookmarkOverlay').classList.remove('open'); });

    // account panel (reader sign in / register / profile)
    $('#accountToggle').addEventListener('click', () => $('#accountOverlay').classList.add('open'));
    $('#accountClose').addEventListener('click', () => $('#accountOverlay').classList.remove('open'));
    $('#accountOverlay').addEventListener('click', (e) => { if (e.target.id === 'accountOverlay') $('#accountOverlay').classList.remove('open'); });
    initAccountForms();

    // reader
    $('#readerClose').addEventListener('click', closeReader);
    $('#zoomIn').addEventListener('click', () => { ReaderState.zoom = Math.min(200, ReaderState.zoom + 10); updateZoomUI(); });
    $('#zoomOut').addEventListener('click', () => { ReaderState.zoom = Math.max(50, ReaderState.zoom - 10); updateZoomUI(); });
    $('#fullscreenBtn').addEventListener('click', () => {
      const reader = $('#reader');
      if (!document.fullscreenElement) reader.requestFullscreen?.();
      else document.exitFullscreen?.();
    });
    $('#readerPages').addEventListener('scroll', updateReaderProgress, { passive: true });

    // lightbox
    $('#lightboxClose').addEventListener('click', closeLightbox);
    $('#lightboxPrev').addEventListener('click', () => lightboxStep(-1));
    $('#lightboxNext').addEventListener('click', () => lightboxStep(1));
    $('#lightbox').addEventListener('click', (e) => { if (e.target.id === 'lightbox') closeLightbox(); });

    // character modal
    $('#charModalClose').addEventListener('click', closeCharacterModal);
    $('#charModalOverlay').addEventListener('click', (e) => { if (e.target.id === 'charModalOverlay') closeCharacterModal(); });

    // global escape key
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') {
        if (e.key === 'ArrowRight' && $('#lightbox').classList.contains('open')) lightboxStep(1);
        if (e.key === 'ArrowLeft' && $('#lightbox').classList.contains('open')) lightboxStep(-1);
        return;
      }
      if ($('#lightbox').classList.contains('open')) return closeLightbox();
      if ($('#charModalOverlay').classList.contains('open')) return closeCharacterModal();
      if ($('#searchOverlay').classList.contains('open')) return closeSearch();
      if ($('#bookmarkOverlay').classList.contains('open')) return $('#bookmarkOverlay').classList.remove('open');
      if ($('#accountOverlay').classList.contains('open')) return $('#accountOverlay').classList.remove('open');
      if ($('#reader').classList.contains('open')) return closeReader();
      closeMobileMenu();
    });
  }

  /* =====================================================================
     15. INIT
  ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    // Upgrade the built-in placeholder content with whatever was last
    // successfully fetched from Firestore this session, if anything —
    // avoids the "old content flashes then swaps to live" effect on reload.
    loadCachedData();

    // Render immediately (with cached-live or fallback content) so the page
    // is never blank while waiting on the network — then swap in the latest
    // content from Firestore the moment it arrives.
    renderMangaGrid();
    renderChapterList();
    renderMap();
    renderCharacters();
    renderLore();
    renderGallery();
    renderNews();

    SEARCH_INDEX = buildSearchIndex();

    initNav();
    initHamburger();
    initReveals();
    initOverlaysAndControls();
    updateBookmarkCount();
    renderBookmarkPanel();
    initLazySections();

    loadRemoteData().then(() => {
      renderMangaGrid();
      renderChapterList();
      renderLore();
      renderNews();
      SEARCH_INDEX = buildSearchIndex();
    });
  });

})();
