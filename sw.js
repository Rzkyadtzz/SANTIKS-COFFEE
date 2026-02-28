// sw.js (FINAL - Santiks Coffee)
const CACHE_VERSION = "v4";
const STATIC_CACHE = `santiks-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `santiks-runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/app.js",
  "/site.webmanifest",
  "/assets/favicon/logo-32.png",
  "/assets/favicon/logo-180.png",
  "/assets/favicon/logo-192.png",
  "/assets/favicon/logo-512.png",
  "/assets/img/bg.webp",
  "/assets/img/bg1.webp",
];

// Install: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => ![STATIC_CACHE, RUNTIME_CACHE].includes(k))
            .map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

// Fetch strategies:
// - Only handle GET
// - Skip cross-origin
// - HTML: Network First
// - Images: Cache First (biar offline aman)
// - Others (css/js): Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // ❌ HAPUS filter origin
  // if (url.origin !== self.location.origin) return;

  // ✅ IMAGE: Cache First
  if (req.destination === "image") {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;

        return fetch(req)
          .then((res) => {
            return caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(req, res.clone());
              return res;
            });
          })
          .catch(() => {
            // kalau offline dan tidak ada di cache
            return caches.match("/assets/img/bg1.webp");
          });
      }),
    );
    return;
  }

  // ✅ HTML
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match("/index.html")));
    return;
  }

  // ✅ CSS / JS
  event.respondWith(
    caches.match(req).then((cached) => {
      return (
        cached ||
        fetch(req).then((res) => {
          return caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(req, res.clone());
            return res;
          });
        })
      );
    }),
  );
});

async function cacheFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const fresh = await fetch(request);
  cache.put(request, fresh.clone());
  return fresh;
}

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const fresh = await fetch(request);
    cache.put(request, fresh.clone());
    return fresh;
  } catch (err) {
    const cached = await cache.match(request);
    return cached || caches.match("/index.html");
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((fresh) => {
      cache.put(request, fresh.clone());
      return fresh;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}
