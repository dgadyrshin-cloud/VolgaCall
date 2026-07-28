// Простой Service Worker для кеширования интерфейса
const CACHE_NAME = 'volgabrick-v1';
const urlsToCache = [
  '/VolgaCall/',
  '/VolgaCall/index.html',
  '/VolgaCall/manager.html',
  '/VolgaCall/dashboard.html',
  '/VolgaCall/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Кеш не удался, но приложение работает онлайн', err))
  );
});

self.addEventListener('fetch', event => {
  // Для Firebase-запросов не используем кеш, пропускаем напрямую
  if (event.request.url.includes('firebaseio.com') || event.request.url.includes('googleapis.com')) {
    return;
  }
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});