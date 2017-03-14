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
