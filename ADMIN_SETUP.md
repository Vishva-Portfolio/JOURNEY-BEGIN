# Journey Begin — Admin Panel Setup

Visiting `/admin` now opens a login screen, and once signed in, a full
dashboard for editing every list on the site (Manga, Chapters,
Characters, Locations, Lore, Gallery, News) — no more hand-editing
`script.js`. Changes save to Firestore and the public site picks them up
automatically on next load.

New/changed files:
- `firebase-config.js` — shared Firebase init (uses the config you gave me)
- `data-loader.js` — pulls live content into the public site, added to `index.html`
- `script.js` — now waits briefly for that data, then falls back to its
  original built-in content if Firestore is empty or unreachable (so the
  site never breaks)
- `admin/` — the whole admin panel (`index.html`, `admin.css`, `admin.js`)
- `firebase.json`, `.firebaserc`, `firestore.rules` — hosting + security config

## 1. Turn on Firestore and Auth (one-time, in the Firebase Console)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **explore-tales** project.
2. **Build → Firestore Database → Create database** (any region, start in production mode).
3. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable.**
4. **Authentication → Users → Add user** — create the login you'll use for `/admin` (this is the only account that can sign in; there's no public sign-up screen by design).
5. **Firestore → Rules** — paste in the contents of `firestore.rules` from this project and click **Publish**. This makes content publicly readable (so the site works) but only writable by a signed-in admin.

## 2. Deploy

If you haven't already:
```bash
npm install -g firebase-tools
firebase login
```
From this project folder:
```bash
firebase deploy
```
That publishes both the Hosting files and the Firestore rules (`firebase.json` is already wired for both). If you're hosting elsewhere (Netlify, Vercel, GitHub Pages, etc.) instead of Firebase Hosting, just upload all the files as-is — `/admin/` will work as a normal folder with an `index.html` in it.

## 3. Load your content in

Open `your-site.com/admin`, sign in, and click **Seed Default Content** once — this copies the existing demo manga/characters/lore/etc. into Firestore so you have a starting point to edit instead of an empty dashboard. After that, use **+ Add New**, click any row to edit it, or use the **Delete** button inside a row's edit modal.

A few notes on fields:
- **Manga / Characters / Locations / Lore / Gallery** use an **ID (slug)** you choose (e.g. `ashen-vow`, `felix`) — this must stay stable once other content references it (e.g. a Chapter's "Manga ID" field must match a Manga's ID exactly).
- **Chapters** don't have a slug — the reader finds page images by pattern: `assets/manga/{manga-id}/chapter-{number}/page-01.jpg`, `page-02.jpg`, … up to the Page Count you set. Drop the real image files at that path (as described in the original `README.txt`).
- **Traits** / **Key Figures** fields accept comma-separated text and are stored as lists.

## What's still static

The hero section on the homepage (title, tagline, "Featured Manga" text) is hand-written in `index.html` rather than pulled from Firestore — happy to wire that up too if you'd like it editable from `/admin` as well.
