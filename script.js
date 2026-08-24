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
    ]
  };

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

  function openReader(mangaId, chapterNumber) {
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
    pagesWrap.innerHTML = '';
    const pageCount = chapter.pages || 5;
    for (let p = 1; p <= pageCount; p++) {
      const num = String(p).padStart(2, '0');
      const src = `assets/manga/${mangaId}/chapter-${chapter.number}/page-${num}.jpg`;
      const div = document.createElement('div');
      div.className = 'reader-page-wrap';
      div.innerHTML = `<img data-page="${p}" src="${src}" alt="Page ${p}">`;
      pagesWrap.appendChild(div);
      const img = $('img', div);
      img.addEventListener('error', () => {
        img.onerror = null;
        div.innerHTML = `<div class="reader-loading-page">Page ${num} — drop your art at<br>${src}</div>`;
      }, { once: true });
    }

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
      if ($('#reader').classList.contains('open')) return closeReader();
      closeMobileMenu();
    });
  }

  /* =====================================================================
     15. INIT
  ===================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
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
  });

})();
