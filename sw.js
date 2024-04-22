const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/src/assets/images/engProgram.svg',
  '/src/assets/images/flag_Uk.png',
  '/src/assets/images/i-app.png',
  '/src/assets/images/i-app1.png',
  '/src/assets/images/images_white.png',
  '/src/assets/images/images.png',
  '/src/assets/images/img-1.jpg',
  '/src/assets/images/img-2.jpg',
  '/src/assets/images/img-3.jpg',
  '/src/assets/images/img-4.jpg',
  '/src/assets/images/img-5.jpg',
  '/src/assets/images/img-6.jpg',
  '/src/assets/images/img-7.jpg',
  '/src/assets/images/img-8.jpg',
  '/src/assets/images/img-9.jpg',
  '/src/assets/images/img-10.jpg',
  '/src/assets/images/img-11.jpg',
  '/src/assets/images/img-12.jpg',
  '/src/assets/images/img-13.jpg',
  '/src/assets/images/img-14.jpg',
  '/src/assets/images/img-15.jpg',
  '/src/assets/images/img-16.jpg',
  '/src/assets/images/img-17.jpg',
  '/src/assets/images/img-18.jpg',
  '/src/assets/images/img-19.jpg',
  '/src/assets/images/img-20.jpg',
  '/src/assets/images/img-21.jpg',
  '/src/assets/images/img-22.jpg',
  '/src/assets/images/img-30.jpg',
  '/src/assets/images/img-31.jpg',
  '/src/assets/images/img-32.jpg',
  '/src/assets/images/insta.webp',
  '/src/assets/images/love.png',
  '/src/assets/images/newEnPlanning.svg',
  '/src/assets/images/newPtPlanning1.svg',
  '/src/assets/images/portug_flag.png',
  '/src/assets/svg/ENG-compressed.svg',
  '/src/assets/svg/pt-compressed.svg',


];

self.addEventListener('install', event => {
  // Perform installation steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        // Try to fetch the asset from the network
        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the fetched response
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
