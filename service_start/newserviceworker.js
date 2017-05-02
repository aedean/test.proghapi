var CACHE_NAME = 'gih-cache-v6';
var CACHED_URLS = [
    // Our HTML
    'index.html',
    'styles.css'

];

var googleMapsAPIJS = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBN5zI49rINBx5ofv8JjJKXcToGqj5Ad84&callback=initMap';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});


self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
 if (requestURL.href === googleMapsAPIJS) {
    event.respondWith(
      fetch(
        googleMapsAPIJS+'&'+Date.now(),
        { mode: 'no-cors', cache: 'no-store' }
      ).catch(function() {
        return caches.match('offline-map.js');
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname)
  ) {
    event.respondWith(
        //Cache falling back to the network
        //If you're making your app offline-first, this is how you'll handle the majority of requests. 
        //Other patterns will be exceptions based on the incoming request.
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
    //This gives you the "Cache only" behavior for things in the cache and the "Network only" 
    //behaviour for anything not cached   
  }
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
