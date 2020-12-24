const CACHE_TAG = 'static-v0.0.1-dev5';

const CACHE_URLS = [
  '/',
  '/index.html',
  '/legal_de.html',
  '/legal_en.html',
  '/style.css',
  '/script.js',
  '/icon.svg',
  '/icon_512.png',
  '/icon_apple.png',
  '/icon_maskable.png',
  '/manifest.json'
];

self.addEventListener('install', install);
self.addEventListener('fetch', fetch);
self.addEventListener('activate', activate);

function install(event) {
 event.waitUntil(
    caches.open(CACHE_TAG)
      .then(cache => {
      	cache.addAll(CACHE_URLS);
      })
  );
}


function fetch(event) {
	  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
}

function activate(event) { 

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_TAG) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}
