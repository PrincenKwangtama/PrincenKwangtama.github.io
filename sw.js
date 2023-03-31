// CACHE_NAME merupakan nama cache yang akan digunakan
const CACHE_NAME = 'portfolio-cache-v1';

// Daftar file yang akan di-cache
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/blog.html',
  '/portfolio-example01.html',
  '/styles.css',
  '/js/main.js',
  '/images/*.jpg'
];

// Install service worker dan menambahkan file yang akan di-cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  return self.clients.claim();
});

// Aktifkan service worker dan hapus cache yang sudah kadaluarsa
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Menangani permintaan dari cache terlebih dahulu sebelum mengambil dari jaringan
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
