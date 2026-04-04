self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // We do not intercept any fetch requests. This service worker acts as a minimal 
  // requirement to enable the "Add to Home Screen" feature (PWA installability).
});
