// sw.js (FINAL - Santiks Coffee)
const CACHE_VERSION = "v8";
const STATIC_CACHE = `santiks-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `santiks-runtime-${CACHE_VERSION}`;

const OFFLINE_HTML = "/index.html";
const OFFLINE_IMAGE = "/assets/img/bg1.webp";

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
  "/assets/img/bg1.webp",
];

const canCache = (response) => Boolean(response && response.ok);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => ![STATIC_CACHE, RUNTIME_CACHE].includes(key))
            .map((key) => caches.delete(key)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (!["http:", "https:"].includes(url.protocol)) return;

  // Cache runtime hanya untuk asset origin sendiri.
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, OFFLINE_HTML));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(cacheFirst(request, OFFLINE_IMAGE));
    return;
  }

  event.respondWith(staleWhileRevalidate(request));
});

async function cacheFirst(request, fallbackPath) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const fresh = await fetch(request);
    if (canCache(fresh)) {
      await cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (error) {
    if (fallbackPath) {
      const fallback = await caches.match(fallbackPath);
      if (fallback) return fallback;
    }
    throw error;
  }
}

async function networkFirst(request, fallbackPath) {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const fresh = await fetch(request);
    if (canCache(fresh)) {
      await cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;

    if (fallbackPath) {
      const fallback = await caches.match(fallbackPath);
      if (fallback) return fallback;
    }

    throw error;
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);

  const fresh = fetch(request)
    .then((response) => {
      if (canCache(response)) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fresh;
}
