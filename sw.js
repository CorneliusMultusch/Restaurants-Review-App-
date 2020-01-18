var cacheID = "my-restaurant-cache-v1";

var urlToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/main.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheID)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('activate', function (event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promises.all(
        cacheNames.filter(function (cacheName) {
          return cacheName.startsWith('restaurant-') &&
          cacheName != chacheID;
        }).map(function (cacheName){
          return caches.delete(cacheName);
        })
      );
    })
  );
});



// source https://developers.google.com/web/fundamentals/primers/service-workers/

