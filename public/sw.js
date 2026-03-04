const CACHE_NAME = 'taxaltus-offline-v2';
const ASSETS_TO_CACHE = [
    '/',
    '/form16',
    '/estimator',
    '/regime',
    '/deductions',
    '/manifest.json',
    '/icon.png',
    '/favicon.png',
    '/logo-full.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    // Next.js specific bypasses for development and internal APIs
    const url = new URL(event.request.url);
    if (url.pathname.startsWith('/_next/') || url.pathname.includes('/api/')) {
        return; // Let Next.js handle its own asset fetching naturally
    }

    event.respondWith(
        fetch(event.request)
            .then((networkResponse) => {
                // If the fetch was successful, we optionally clone and update cache here,
                // but just returning it for "Network First" works best for Next.js hydration.
                return networkResponse;
            })
            .catch(() => caches.match(event.request))
    );
});
