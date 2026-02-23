// sw.js - Service Worker untuk Santiks Coffee
const CACHE_NAME = "santiks-cache-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./app.js",
  "./site.webmanifest",
  "./assets/favicon/logo-32.png",
  "./assets/favicon/logo-180.png",
  "./assets/favicon/logo-192.png",
];

// Tahap Install: Menyimpan aset ke dalam cache browser
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
});

// Tahap Activate: Membersihkan cache lama jika ada pembaruan
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key)),
      );
    }),
  );
});

// Tahap Fetch: Mengambil aset dari cache saat offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
