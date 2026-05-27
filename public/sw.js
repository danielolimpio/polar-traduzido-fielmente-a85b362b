// Minimal service worker required by Chrome/Android for PWA install eligibility.
// No caching: always passes through to network so content is never stale.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // no-op: let the browser handle every request normally
});
