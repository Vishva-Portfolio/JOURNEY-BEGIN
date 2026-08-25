/* =====================================================================
   JOURNEY BEGIN — ADMIN PANEL
   Firebase Auth guards this page; every collection below is edited
   straight in Firestore and is what data-loader.js reads back on the
   public site.
   ===================================================================== */

import { auth, db } from "../firebase-config.js";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import {
  collection, getDocs, doc, setDoc, addDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* =====================================================================
   1. COLLECTION SCHEMAS
   Drives the sidebar tabs, table columns, and the add/edit form.
   idField: 'id' means the document ID *is* that field's value (a slug
   the admin types in). idField: null means Firestore auto-generates
   the document ID (used for chapters/news, which don't need a slug).
   ===================================================================== */
const SCHEMAS = {
  manga: {
    label: 'Manga', idField: 'id',
    columns: ['title', 'status', 'chapters', 'featured'],
    fields: [
      { key: 'id', label: 'ID (slug, e.g. ashen-vow)', type: 'text', required: true, lockOnEdit: true },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'author', label: 'Author', type: 'text' },
      { key: 'genre', label: 'Genre', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['Ongoing', 'Coming Soon', 'Completed'] },
      { key: 'chapters', label: 'Chapter Count', type: 'number' },
      { key: 'featured', label: 'Featured on homepage', type: 'checkbox' },
      { key: 'cover', label: 'Cover Image Path/URL', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea' }
    ]
  },
  chapters: {
    label: 'Chapters', idField: null,
    columns: ['manga', 'number', 'title', 'status', 'pages'],
    fields: [
      { key: 'manga', label: 'Manga ID (matches Manga slug)', type: 'text', required: true },
      { key: 'number', label: 'Chapter Number', type: 'number', required: true },
      { key: 'title', label: 'Chapter Title', type: 'text' },
      { key: 'status', label: 'Status', type: 'select', options: ['Available', 'Coming Soon'] },
      { key: 'pages', label: 'Page Count', type: 'number', hint: 'Reader looks for assets/manga/{manga}/chapter-{number}/page-01.jpg …' }
    ]
  },
  characters: {
    label: 'Characters', idField: 'id',
    columns: ['name', 'age'],
    fields: [
      { key: 'id', label: 'ID (slug)', type: 'text', required: true, lockOnEdit: true },
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'age', label: 'Age', type: 'text' },
      { key: 'image', label: 'Image Path/URL', type: 'text' },
      { key: 'short', label: 'Short Bio (card)', type: 'textarea' },
      { key: 'full', label: 'Full Bio (modal)', type: 'textarea' },
      { key: 'traits', label: 'Traits (comma separated)', type: 'list' }
    ]
  },
  locations: {
    label: 'Locations', idField: 'id',
    columns: ['name', 'x', 'y'],
    fields: [
      { key: 'id', label: 'ID (slug)', type: 'text', required: true, lockOnEdit: true },
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'x', label: 'Map X (0–100 %)', type: 'number' },
      { key: 'y', label: 'Map Y (0–100 %)', type: 'number' },
      { key: 'desc', label: 'Description', type: 'textarea' },
      { key: 'figures', label: 'Key Figures/Events (comma separated)', type: 'list' }
    ]
  },
  lore: {
    label: 'Lore', idField: 'id',
    columns: ['title'],
    fields: [
      { key: 'id', label: 'ID (slug)', type: 'text', required: true, lockOnEdit: true },
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'body', label: 'Body', type: 'textarea' }
    ]
  },
  gallery: {
    label: 'Gallery', idField: 'id',
    columns: ['caption', 'category'],
    fields: [
      { key: 'id', label: 'ID (slug, e.g. g9)', type: 'text', required: true, lockOnEdit: true },
      { key: 'category', label: 'Category', type: 'select', options: ['pages', 'characters', 'concept', 'maps'] },
      { key: 'src', label: 'Image Path/URL', type: 'text', required: true },
      { key: 'caption', label: 'Caption', type: 'text' }
    ]
  },
  news: {
    label: 'News', idField: null,
    columns: ['date', 'tag', 'title'],
    fields: [
      { key: 'tag', label: 'Tag', type: 'text' },
      { key: 'date', label: 'Date (e.g. Aug 20, 2026)', type: 'text' },
      { key: 'title', label: 'Headline', type: 'text', required: true },
      { key: 'desc', label: 'Description', type: 'textarea' }
    ]
  }
};

/* Default content to write on first-time "Seed Default Content" — mirrors
   the DATA object baked into ../script.js so a fresh Firestore project
   starts out matching the demo site. */
const DEFAULTS = {
  manga: [
    { id: 'eternity-of-crystal', title: 'Eternity of Crystal', author: 'Vishva & Mathavan', genre: 'Fantasy · Adventure · Mystery', status: 'Ongoing', chapters: 2, featured: true, cover: 'assets/manga/eternity-of-crystal/cover.jpg', description: 'An extraordinary journey begins in a world of crystals, kingdoms, mysteries and destiny.' },
    { id: 'ashen-vow', title: 'Ashen Vow', author: 'Journey Begin Studio', genre: 'Dark Fantasy · Drama', status: 'Coming Soon', chapters: 0, featured: false, cover: 'assets/manga/ashen-vow/cover.jpg', description: 'A fallen knight seeks redemption in a kingdom built on ash and broken oaths.' },
    { id: 'silver-static', title: 'Silver Static', author: 'Journey Begin Studio', genre: 'Sci-Fi · Mystery', status: 'Coming Soon', chapters: 0, featured: false, cover: 'assets/manga/silver-static/cover.jpg', description: 'In a city powered by memory, one signal refuses to be erased.' }
  ],
  chapters: [
    { manga: 'eternity-of-crystal', number: 1, title: 'Tale of Crystals', status: 'Available', pages: 6 },
    { manga: 'eternity-of-crystal', number: 2, title: 'The Silver Kingdom', status: 'Available', pages: 5 },
    { manga: 'eternity-of-crystal', number: 3, title: 'Echoes of Albia', status: 'Coming Soon', pages: 0 }
  ],
  characters: [
    { id: 'felix', name: 'Felix', age: '17', image: 'assets/characters/felix.jpg', short: 'A determined wanderer bound to the crystal\u2019s first awakening.', full: 'Felix carries a fragment of the Eternity Crystal without knowing why he was chosen. Quick-tempered but fiercely loyal, he is the story\u2019s reluctant compass — pulled toward a destiny far larger than the quiet life he once wanted.', traits: ['Crystal-bound', 'Impulsive', 'Loyal'] },
    { id: 'richard', name: 'Richard', age: '17', image: 'assets/characters/richard.jpg', short: 'Felix\u2019s closest ally, sharp-minded and quietly protective.', full: 'Richard balances the group with calculation where Felix acts on instinct. Raised among scholars, he reads the world in patterns and prophecy — and is often the first to sense when something ancient has stirred.', traits: ['Strategist', 'Guarded', 'Scholar'] },
    { id: 'albia', name: 'Albia', age: '15–16', image: 'assets/characters/albia.jpg', short: 'A quiet presence with a fractured connection to the old kingdoms.', full: 'Albia speaks little, but the crystals seem to answer when she is near. Her past is tangled with the fall of a kingdom no one else remembers, and every chapter peels back another layer of what she was made to carry.', traits: ['Mysterious', 'Empathic', 'Kingdom-born'] },
    { id: 'cyrus', name: 'Cyrus', age: '17', image: 'assets/characters/cyrus.jpg', short: 'Charismatic, restless, and always first into danger.', full: 'Cyrus fights first and asks questions later — a habit that has saved the group as often as it\u2019s endangered them. Beneath the bravado is someone still learning what it costs to protect people he loves.', traits: ['Reckless', 'Charismatic', 'Protector'] },
    { id: 'ivo', name: 'Ivo', age: '24–27', image: 'assets/characters/ivo.jpg', short: 'An enigmatic elder who knows more than he admits.', full: 'Ivo appears exactly when the group needs guidance — and vanishes just as easily. His knowledge of the crystals runs deeper than any living record should allow, and his motives remain the story\u2019s quietest mystery.', traits: ['Enigmatic', 'Elder', 'Untrusted'] }
  ],
  locations: [
    { id: 'crystal-spire', name: 'The Crystal Spire', x: 28, y: 30, desc: 'A tower of raw crystal said to be the source of the Eternity Crystal itself. Few who enter return unchanged.', figures: ['Felix\u2019s awakening', 'First appearance of Ivo'] },
    { id: 'silver-kingdom', name: 'The Silver Kingdom', x: 62, y: 22, desc: 'A fortified realm of silver-veined stone, ruled by a crown that has feared the crystals for generations.', figures: ['Richard\u2019s homeland', 'Setting of Chapter 2'] },
    { id: 'ashfall-woods', name: 'Ashfall Woods', x: 45, y: 62, desc: 'A forest blackened by an event lost to history — locals refuse to speak its name after dark.', figures: ['Albia\u2019s origin', 'Hidden ruins'] },
    { id: 'hollow-coast', name: 'The Hollow Coast', x: 78, y: 68, desc: 'A shifting coastline where the tide reveals fragments of a kingdom that supposedly never existed.', figures: ['Cyrus\u2019s hometown', 'Smugglers\u2019 routes'] }
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
   2. STATE
   ===================================================================== */
let currentTab = 'manga';
let rows = [];         // rows for the active tab, each with _docId attached
let editingDocId = null;

/* =====================================================================
   3. AUTH
   ===================================================================== */
const loginScreen = $('#loginScreen');
const dashScreen = $('#dashScreen');

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginScreen.hidden = true;
    dashScreen.hidden = false;
    $('#adminUserEmail').textContent = user.email || '';
    initSidebar();
    loadTab(currentTab);
  } else {
    dashScreen.hidden = true;
    loginScreen.hidden = false;
  }
});

$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = $('#loginEmail').value.trim();
  const password = $('#loginPassword').value;
  const errEl = $('#loginError');
  const btn = $('#loginBtn');
  errEl.textContent = '';
  btn.disabled = true;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    errEl.textContent = friendlyAuthError(err);
  } finally {
    btn.disabled = false;
  }
});

$('#logoutBtn').addEventListener('click', () => signOut(auth));

function friendlyAuthError(err) {
  const code = err?.code || '';
  if (code.includes('invalid-credential') || code.includes('wrong-password') || code.includes('user-not-found')) {
    return 'Incorrect email or password.';
  }
  if (code.includes('too-many-requests')) return 'Too many attempts — try again shortly.';
  return 'Sign-in failed. ' + (err?.message || '');
}

/* =====================================================================
   4. SIDEBAR / TABS
   ===================================================================== */
function initSidebar() {
  const nav = $('#adminSidebar');
  nav.innerHTML = '';
  Object.keys(SCHEMAS).forEach((key) => {
    const btn = document.createElement('button');
    btn.className = 'admin-tab' + (key === currentTab ? ' active' : '');
    btn.textContent = SCHEMAS[key].label;
    btn.dataset.tab = key;
    btn.addEventListener('click', () => {
      currentTab = key;
      $$('.admin-tab', nav).forEach((b) => b.classList.toggle('active', b.dataset.tab === key));
      loadTab(key);
    });
    nav.appendChild(btn);
  });
}

/* =====================================================================
   5. TABLE
   ===================================================================== */
async function loadTab(tab) {
  const schema = SCHEMAS[tab];
  $('#panelTitle').textContent = schema.label;
  setStatus('Loading…');
  $('#tableBody').innerHTML = '';
  $('#tableEmpty').hidden = true;

  try {
    const snap = await getDocs(collection(db, tab));
    rows = snap.docs.map((d) => ({ _docId: d.id, ...d.data() }));
    renderTable(tab);
    setStatus(`${rows.length} item${rows.length === 1 ? '' : 's'}`, 'ok');
  } catch (err) {
    setStatus('Could not load this collection — check Firestore rules / connection.', 'error');
    console.error(err);
  }
}

function renderTable(tab) {
  const schema = SCHEMAS[tab];
  const head = $('#tableHead');
  const body = $('#tableBody');

  head.innerHTML = '<tr>' + schema.columns.map((c) => `<th>${labelFor(schema, c)}</th>`).join('') + '<th></th></tr>';

  if (!rows.length) {
    $('#tableEmpty').hidden = false;
    body.innerHTML = '';
    return;
  }
  $('#tableEmpty').hidden = true;

  body.innerHTML = rows.map((row) => {
    const cells = schema.columns.map((c) => {
      let v = row[c];
      if (Array.isArray(v)) v = v.join(', ');
      if (typeof v === 'boolean') v = v ? 'Yes' : 'No';
      return `<td class="truncate">${escapeHTML(v ?? '')}</td>`;
    }).join('');
    return `<tr data-doc="${row._docId}">${cells}<td class="col-actions">Edit</td></tr>`;
  }).join('');

  $$('tr', body).forEach((tr) => {
    tr.addEventListener('click', () => openModal(tab, tr.dataset.doc));
  });
}

function labelFor(schema, colKey) {
  const f = schema.fields.find((f) => f.key === colKey);
  return f ? f.label.replace(/\s*\(.*?\)\s*/g, '') : colKey;
}

function setStatus(msg, kind) {
  const el = $('#adminStatus');
  el.textContent = msg;
  el.className = 'admin-status' + (kind ? ' ' + kind : '');
}

/* =====================================================================
   6. ADD / EDIT MODAL
   ===================================================================== */
const overlay = $('#modalOverlay');

$('#addBtn').addEventListener('click', () => openModal(currentTab, null));
$('#modalClose').addEventListener('click', closeModal);
$('#modalCancel').addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

function openModal(tab, docId) {
  const schema = SCHEMAS[tab];
  editingDocId = docId;
  const row = docId ? rows.find((r) => r._docId === docId) : null;

  $('#modalTitle').textContent = docId ? `Edit ${schema.label.replace(/s$/, '')}` : `Add ${schema.label.replace(/s$/, '')}`;
  $('#modalError').textContent = '';
  $('#modalDelete').hidden = !docId;

  const fieldsEl = $('#modalFields');
  fieldsEl.innerHTML = '';
  schema.fields.forEach((f) => {
    const value = row ? row[f.key] : undefined;
    fieldsEl.appendChild(buildField(f, value, !!(docId && f.lockOnEdit)));
  });

  overlay.hidden = false;
}

function closeModal() {
  overlay.hidden = true;
  editingDocId = null;
}

function buildField(f, value, locked) {
  const wrap = document.createElement('label');
  wrap.className = 'admin-field' + (f.type === 'checkbox' ? ' admin-field-check' : '');

  if (f.type === 'checkbox') {
    wrap.innerHTML = `<span>${f.label}</span>`;
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = f.key;
    input.checked = !!value;
    wrap.appendChild(input);
    return wrap;
  }

  const label = document.createElement('span');
  label.textContent = f.label + (f.required ? ' *' : '');
  wrap.appendChild(label);

  let input;
  if (f.type === 'textarea') {
    input = document.createElement('textarea');
    input.value = value ?? '';
  } else if (f.type === 'select') {
    input = document.createElement('select');
    f.options.forEach((opt) => {
      const o = document.createElement('option');
      o.value = opt; o.textContent = opt;
      if (value === opt) o.selected = true;
      input.appendChild(o);
    });
  } else {
    input = document.createElement('input');
    input.type = f.type === 'number' ? 'number' : 'text';
    if (f.type === 'list') {
      input.type = 'text';
      input.value = Array.isArray(value) ? value.join(', ') : (value ?? '');
      input.placeholder = 'comma, separated, values';
    } else {
      input.value = value ?? '';
    }
  }
  input.name = f.key;
  if (f.required) input.required = true;
  if (locked) { input.disabled = true; input.title = 'The ID can\u2019t be changed after creation.'; }
  wrap.appendChild(input);

  if (f.hint) {
    const hint = document.createElement('small');
    hint.style.cssText = 'color:var(--text-low);font-size:.72rem;';
    hint.textContent = f.hint;
    wrap.appendChild(hint);
  }
  return wrap;
}

$('#modalForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const schema = SCHEMAS[currentTab];
  const data = {};
  const errEl = $('#modalError');
  errEl.textContent = '';

  schema.fields.forEach((f) => {
    const input = $(`[name="${f.key}"]`, $('#modalFields'));
    if (!input) return;
    if (f.type === 'checkbox') { data[f.key] = input.checked; return; }
    if (f.type === 'number') { data[f.key] = input.value === '' ? 0 : Number(input.value); return; }
    if (f.type === 'list') { data[f.key] = input.value.split(',').map((s) => s.trim()).filter(Boolean); return; }
    data[f.key] = input.value;
  });

  try {
    if (schema.idField) {
      // slug-keyed collection: doc ID == data[idField]
      const docId = editingDocId || data[schema.idField];
      if (!docId) { errEl.textContent = 'ID is required.'; return; }
      await setDoc(doc(db, currentTab, docId), data);
    } else if (editingDocId) {
      await setDoc(doc(db, currentTab, editingDocId), data);
    } else {
      await addDoc(collection(db, currentTab), data);
    }
    closeModal();
    loadTab(currentTab);
    toast('Saved');
  } catch (err) {
    errEl.textContent = 'Save failed: ' + (err?.message || err);
  }
});

$('#modalDelete').addEventListener('click', async () => {
  if (!editingDocId) return;
  if (!confirm('Delete this item? This can\u2019t be undone.')) return;
  try {
    await deleteDoc(doc(db, currentTab, editingDocId));
    closeModal();
    loadTab(currentTab);
    toast('Deleted');
  } catch (err) {
    $('#modalError').textContent = 'Delete failed: ' + (err?.message || err);
  }
});

/* =====================================================================
   7. SEED DEFAULT CONTENT
   ===================================================================== */
$('#seedBtn').addEventListener('click', async () => {
  if (!confirm('This adds the built-in demo content to every empty collection (existing items are left untouched). Continue?')) return;
  setStatus('Seeding…');
  try {
    for (const [name, items] of Object.entries(DEFAULTS)) {
      const schema = SCHEMAS[name];
      const existing = await getDocs(collection(db, name));
      if (!existing.empty) continue; // don't clobber real content
      for (const item of items) {
        if (schema.idField) {
          await setDoc(doc(db, name, item[schema.idField]), item);
        } else {
          await addDoc(collection(db, name), item);
        }
      }
    }
    toast('Default content seeded');
    loadTab(currentTab);
  } catch (err) {
    setStatus('Seeding failed: ' + (err?.message || err), 'error');
  }
});

/* =====================================================================
   8. TOAST + UTIL
   ===================================================================== */
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove('show'), 2200);
}

function escapeHTML(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
