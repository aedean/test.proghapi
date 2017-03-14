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

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return new Response(
        'Welcome to the our service worker test \n'+        
'There seems to be a problem with your connection.\n'+        
'We look forward to telling you about Paddy as soon as you are online'
      );
    })
  );
});
