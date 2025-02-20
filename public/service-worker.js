const CACHE_NAME = 'v1-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon/Moamoa-128x128.png',
  '/icon/Moamoa-152x152.png',
  '/icon/Moamoa-192x192.png',
  '/icon/Moamoa-256x256.png',
  '/icon/Moamoa-512x512.png',
  '/icon/Favicon.png',
  '/icon/apple-touch-icon-180x180.png',
];

// 캐시 저장 함수
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

// 서비스 워커 최초 등록 시 실행되는 이벤트
self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(urlsToCache));
});

// 오래된 캐시 삭제
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache != CACHE_NAME) {
            console.log(`Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

// 리소스 요청 시 실행
self.addEventListener("fetch", (event) => {
  event.respondWith(
    // 캐시에 요청한 리소스가 존재하면 바로 응답하고, 그렇지 않으면 네트워크로 요청을 보냄
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});