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
  'first.html',
  'paddy.png'
  //'mystyles.css',
  //'dino.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

// this is old now

self.addEventListener('fetch', function(event) { 
  event.respondWith(
    fetch(event.request).catch(function() {
        //when the user is online we are responding to it with a response from the fetch call
      //if it fails the catch comes into action
      return caches.match(event.request).then(function(response) { 
        //try to match the request with requests in the cache
        //cache.match is never rejected
        if (response) {
          //this will make sure the that response was found
          return response;
        } else if (event.request.headers.get('accept').includes('text/html')) {
          //if it wasnt found we will return the offline page. the browser will never ask for 
          //the offline page on its own.It might ask for the index
          return caches.match('offline.html');
        }
      });
    })
  );
});
/*
self.addEventListener('fetch', function(event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.pathname === 'first.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('first.html').then(function(cachedResponse) {
          var fetchPromise = fetch('first.html').then(function(networkResponse) {
            cache.put('first.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (
    CACHED_URLS.includes(requestURL.href) ||
    CACHED_URLS.includes(requestURL.pathname) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      })
    );
  }
});*/


//this event is called when installed/ waiting for the service worker to become ready 
//and replace the old active one
self.addEventListener('activate', function(event) {
  //at this stages urls that are needed are cached
  //but we need to delete the old caches used by the old service worker
  event.waitUntil(
    //we extend the active event by using waitUntil
    //ENGLISH: wait until we have cleaned out the old caches before completing activation
    caches.keys().then(function(cacheNames) {
      //caches.keys returns a promise which resolves to an array containing the names of the caches
      //we want to take the array and create a promise that goes over all the caches in the array
      return Promise.all(
        //promise all wraps all the promises into one single promise
        cacheNames.map(function(cacheName) { 
          //using Array.map() to create a promise from each cache name 
          if (CACHE_NAME !== cacheName && cacheName.startsWith('gih-cache')) {
            return caches.delete(cacheName);
            //a promise to delete that cache, and then resolve that promise.
            /*This statement makes sure we only delete caches which match both of these conditions:
Their name is different then the active cache’s name.
Their name begin with gih-cache.
*/
          }
          /*Once we have an array of promises to delete caches, 
          it is passed into Promise.all(), which in turn returns a single 
          promise to event.waitUntil().*/

        })
      );
    })
  );
});


