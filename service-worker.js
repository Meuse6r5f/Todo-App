importScripts('cache-polyfill.js');
let CACHE_VERSION = 'task-wise-v1';
let CACHE_FILES = [
  './',
  'index.html',
  'style.css',
  'script.js',
  'service-worker.js',
  'manifest.json',
  'fav.png',
  'cache-polyfill.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      console.log(`Cache opened`);
      return cache.addAll(CACHE_FILES);
    })
  );
});

self.addEventListener('fetch', function(event) {
  let online = navigator.onLine;
  if (!online) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
      })
    );
  }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_VERSION) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
