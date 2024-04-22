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
  '/src/assets/images/img-1.png',
  '/src/assets/images/img-2.png',
  '/src/assets/images/img-3.png',
  '/src/assets/images/img-4.png',
  '/src/assets/images/img-5.png',
  '/src/assets/images/img-6.png',
  '/src/assets/images/img-7.png',
  '/src/assets/images/img-8.png',
  '/src/assets/images/img-9.png',
  '/src/assets/images/img-10.png',
  '/src/assets/images/img-11.png',
  '/src/assets/images/img-12.png',
  '/src/assets/images/img-13.png',
  '/src/assets/images/img-14.png',
  '/src/assets/images/img-15.png',
  '/src/assets/images/img-16.png',
  '/src/assets/images/img-17.png',
  '/src/assets/images/img-18.png',
  '/src/assets/images/img-19.png',
  '/src/assets/images/img-20.png',
  '/src/assets/images/img-21.png',
  '/src/assets/images/img-22.png',
  '/src/assets/images/img-30.png',
  '/src/assets/images/img-31.png',
  '/src/assets/images/img-32.png',
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
