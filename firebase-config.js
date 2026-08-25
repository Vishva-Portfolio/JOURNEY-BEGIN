/* =====================================================================
   JOURNEY BEGIN — FIREBASE CONFIG
   Single shared init used by the public site (data-loader.js) and the
   admin panel (admin/admin.js). Loaded as an ES module, no build step
   required — the browser fetches the Firebase SDK straight from Google's
   CDN.
   ===================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics, isSupported as analyticsSupported } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASYIdYTGDReWGyblztBKI3uliL5ax-RQs",
  authDomain: "explore-tales.firebaseapp.com",
  projectId: "explore-tales",
  storageBucket: "explore-tales.firebasestorage.app",
  messagingSenderId: "699722213744",
  appId: "1:699722213744:web:03e24eb05e81780da847b5",
  measurementId: "G-DWLQS3TQ3L"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Analytics only works over https (not file://) and isn't supported in
// every environment, so guard it instead of letting it throw.
analyticsSupported().then((ok) => { if (ok) getAnalytics(app); }).catch(() => {});
