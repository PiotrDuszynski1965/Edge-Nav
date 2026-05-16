// Service Worker — Garmin Edge PWA
// Wersja cache – zmień przy każdej aktualizacji aplikacji
const CACHE_NAME = 'edge-nav-v3';

// Pliki do cache offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/apple-touch-icon.png',
  '/icon-120.png',
  '/icon-152.png',
  '/icon-192.png',
  '/icon-512.png',
];

// ── INSTALL: cachuj pliki statyczne ─────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: usuń stare cache ───────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: cache-first dla statyki, network-first dla kafelków OSM ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Kafelki OSM – network first, potem cache (działają offline z cache)
  if (url.hostname.includes('openstreetmap.org') || url.hostname.includes('tile.')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Zapisz kafelek w cache jeśli OK
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open('osm-tiles-v1').then(cache => {
              cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline – próbuj z cache
          return caches.match(event.request);
        })
    );
    return;
  }

  // Wszystko inne – cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        return response;
      }).catch(() => {
        // Fallback dla HTML
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
