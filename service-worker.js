const CACHE_NAME = 'celestialqueen-v1';
const ASSETS = [
  './',
  './index.html',
  './scripts/main.js',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/Theme-of-The-Celestial-Queen-I.mp3',
  './assets/Theme-of-The-Celestial-Queen-II.mp3',
  './assets/Theme-of-The-Celestial-Queen-III.mp3',
  './assets/Final-Celestial-Symphony.mp3',
  'https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap' // optional
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(networkResponse => {
        // Optionally cache new requests (careful with big files)
        return caches.open(CACHE_NAME).then(cache => {
          try {
            cache.put(event.request, networkResponse.clone());
          } catch (e) {
            // ignore CORS/opaque responses that can't be cached
          }
          return networkResponse;
        });
      });
    }).catch(() => {
      // fallback: return the cached index.html (useful if offline and resource missing)
      return caches.match('./index.html');
    })
  );
});
