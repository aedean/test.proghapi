var CACHE_NAME = 'gih-cache-2';
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


