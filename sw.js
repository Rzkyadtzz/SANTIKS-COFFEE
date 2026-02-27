// sw.js (Improved - Santiks Coffee)
const CACHE_VERSION = "v2";
const STATIC_CACHE = `santiks-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `santiks-runtime-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/", // home
  "/index.html",
  "/style.css",
  "/script.js",
  "/app.js",
  "/site.webmanifest",
  "/assets/favicon/logo-32.png",
  "/assets/favicon/logo-180.png",
  "/assets/favicon/logo-192.png",
  // optional: cache hero bg untuk first load cepat offline
  "/assets/img/bg.webp",
  "/assets/img/bg1.webp",
];

// Install: cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting(); // update SW lebih cepat
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
  self.clients.claim(); // SW langsung kontrol tab aktif
});

// Fetch strategies:
// - Only handle GET
// - HTML: Network First
// - Local assets (same-origin): Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Skip cross-origin (Bootstrap, AOS CDN, etc.)
  if (url.origin !== self.location.origin) return;

  // HTML (pages)
  const isHTML =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Static assets (css/js/img/font) - SWR
  event.respondWith(staleWhileRevalidate(req));
});

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
