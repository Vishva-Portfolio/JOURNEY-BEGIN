/* =====================================================================
   JOURNEY BEGIN — DATA LOADER
   Runs before script.js. Pulls manga/chapters/characters/locations/lore/
   gallery/news from Firestore (the same collections the /admin panel
   edits) and hands them to script.js. If Firestore is unreachable, empty,
   or slow, script.js just falls back to the hardcoded DATA already in
   the file — the site never breaks because of this.
   ===================================================================== */

import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const COLLECTIONS = ["manga", "chapters", "characters", "locations", "lore", "gallery", "news"];

window.__REMOTE_DATA__ = null;
window.__DATA_READY__ = false;

function markReady(data) {
  window.__REMOTE_DATA__ = data;
  window.__DATA_READY__ = true;
  window.dispatchEvent(new CustomEvent("jb:data-ready"));
}

async function loadAll() {
  try {
    const results = await Promise.all(
      COLLECTIONS.map((name) => getDocs(collection(db, name)))
    );

    const data = {};
    COLLECTIONS.forEach((name, i) => {
      data[name] = results[i].docs.map((d) => ({ ...d.data() }));
    });

    markReady(data);
  } catch (err) {
    // Offline, no network, rules not set up yet, etc. — fail quietly and
    // let the page fall back to its built-in defaults.
    console.warn("Journey Begin: could not load remote data, using built-in defaults.", err);
    markReady(null);
  }
}

loadAll();
