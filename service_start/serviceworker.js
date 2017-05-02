/*
self.addEventListener('fetch', function(event) {
  console.log('Fetch request for:', event.request.url);
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf('material.teal-red.min.css') !== -1) {
    event.respondWith(
      new Response('body { background: green; }',
      { headers: { 'Content-Type': 'text/css' } }
    ));
  }
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf('paddy.jpg') !== -1) {
    event.respondWith(
      fetch('gerbil.jpg')
    );
  }
})

var CACHE_NAME = 'gih-cache-v2';
var CACHED_URLS = [
  'offline.html',
  'mystyles.css',
  'dino.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('offline.html');
        }
      });
    })
  );
});

self.addEventListener('install', function(event) {
  console.log('install');
});

self.addEventListener('activate', function(event) {
  console.log('activate');
});

self.addEventListener('fetch', function(event) {
  if (event.request.url.indexOf('material.teal-red.min.css') !== -1) {
    console.log('Fetch request for:', event.request.url);
    event.respondWith(new Response('header {background: green url("")!important}', {
      headers: { 'Content-Type': 'text/css' }
    }));
  }
});*/
var CACHE_NAME = 'gih-cache';
var CACHED_URLS = [
  'offline.html',
  'mystyles.css’,
  'dino.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('offline.html');
        }
      });
    })
  );
});

