// Service worker · Campo Ambiental
// Cuando publiques una nueva versión de la app, sube el número de CACHE_NAME
// (p. ej. 'campo-ambiental-v2') para que los teléfonos renueven la caché.
const CACHE_NAME = 'campo-ambiental-v2';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Estrategia: responder desde la caché al instante (funciona sin internet) y,
// si hay conexión, actualizar la caché en segundo plano para la próxima apertura.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request, { ignoreSearch: true }).then(cached => {
        const fetched = fetch(e.request)
          .then(resp => {
            if (resp && resp.ok) cache.put(e.request, resp.clone());
            return resp;
          })
          .catch(() =>
            cached || (e.request.mode === 'navigate' ? cache.match('./index.html') : undefined)
          );
        return cached || fetched;
      })
    )
  );
});
