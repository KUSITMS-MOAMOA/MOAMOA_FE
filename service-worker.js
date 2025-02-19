const CACHE_NAME = 'moamoa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/images/Moamoa-128x128.png',
  '/images/Moamoa-152x152.png',
  '/images/Moamoa-192x192.png',
  '/images/Moamoa-256x256.png',
  '/images/Moamoa-512x512.png',
];

// 서비스 워커 설치 이벤트 (캐싱 설정)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 요청을 가로채서 캐시된 파일 제공
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 새로운 서비스 워커가 활성화될 때 오래된 캐시 삭제
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
