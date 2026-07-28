/* eslint-disable no-undef */

const CACHE_VERSION = 'maweiza-v1';
const BROADCAST_CHANNEL_NAME = 'maweiza-sw-updates';

// قنوات البث التفاعلي مع التطبيق
let updateChannel = null;
if (typeof BroadcastChannel !== 'undefined') {
    updateChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
}

// 1. التفعيل وتغيير الإصدارات المسجلة (Activate & Clean Stale Caches)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // حذف كاشات الإصدارات القديمة التي لا تبدأ بالبادئة الحالية
                    if (cacheName.startsWith('maweiza-') && !cacheName.startsWith(CACHE_VERSION)) {
                        console.log('[SW] Deleting legacy cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                    return null;
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 2. الاستجابة لرسائل الصفحة (postMessage)
self.addEventListener('message', (event) => {
    if (!event.data) return;

    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data.type === 'PREFETCH_URLS' && Array.isArray(event.data.urls)) {
        const cacheName = `${CACHE_VERSION}-prewarmed`;
        event.waitUntil(
            caches.open(cacheName).then(async (cache) => {
                for (const url of event.data.urls) {
                    try {
                        const response = await fetch(url, { credentials: 'same-origin' });
                        if (response.ok) {
                            await cache.put(url, response);
                        }
                    } catch (err) {
                        // تجاهل الأخطاء أثناء التحميل المسبق أوفلاين
                    }
                }
            })
        );
    }
});

// 3. معالجة طلبات النطاق (Range Requests) للصوتيات في الأوفلاين
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // معالجة طلبات الأجزاء (Range Requests) لمقاطع الصوت والفيديو أوفلاين
    if (request.headers.has('range') && (request.destination === 'audio' || request.url.match(/\.(?:mp3|wav|ogg)$/i))) {
        event.respondWith(
            caches.match(request, { ignoreSearch: true }).then(async (cachedResponse) => {
                if (cachedResponse) {
                    const arrayBuffer = await cachedResponse.arrayBuffer();
                    const rangeHeader = request.headers.get('range');
                    const parts = rangeHeader.replace(/bytes=/, "").split("-");
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : arrayBuffer.byteLength - 1;

                    const chunk = arrayBuffer.slice(start, end + 1);
                    return new Response(chunk, {
                        status: 206,
                        statusText: 'Partial Content',
                        headers: new Headers({
                            'Content-Type': cachedResponse.headers.get('Content-Type') || 'audio/mpeg',
                            'Content-Range': `bytes ${start}-${end}/${arrayBuffer.byteLength}`,
                            'Content-Length': chunk.byteLength,
                            'Accept-Ranges': 'bytes',
                        })
                    });
                }
                return fetch(request);
            })
        );
        return;
    }

    // معالجة الملاحة والتنقل الأساسي (Document Navigation) للعودة لصفحة الأوفلاين عند الانقطاع التام
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).catch(async () => {
                const cache = await caches.open(`${CACHE_VERSION}-pages`);
                const cachedPage = await cache.match(request);
                if (cachedPage) return cachedPage;

                const fallbackPage = await caches.match('/offline');
                return fallbackPage || new Response('أنت غير متصل بالإنترنت', {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            })
        );
    }
});
