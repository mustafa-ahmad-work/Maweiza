/* eslint-disable no-undef */

const CACHE_VERSION = 'maweiza-v1';
const BROADCAST_CHANNEL_NAME = 'maweiza-sw-updates';

let updateChannel = null;
if (typeof BroadcastChannel !== 'undefined') {
    updateChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
}

// 1. التثبيت والتحميل المسبق للأقسام والصفحات الأساسية (Install & Pre-cache Core Shell)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(`${CACHE_VERSION}-prewarmed`).then(async (cache) => {
            try {
                await cache.addAll([
                    '/',
                    '/offline',
                    '/azekar',
                    '/qaran',
                    '/salah',
                    '/tasbih',
                    '/calendar'
                ]);
            } catch (err) {
                console.log('[SW] Pre-cache initial warning:', err);
            }
        }).then(() => self.skipWaiting())
    );
});

// 2. التفعيل وحذف الإصدارات القديمة (Activate & Clean Stale Caches)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
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

// 3. الاستجابة لرسائل العميل (postMessage)
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
                        // ignore
                    }
                }
            })
        );
    }
});

// 4. معالجة الطلبات والملاحة والـ Range Requests
self.addEventListener('fetch', (event) => {
    const request = event.request;

    // أ) معالجة طلبات الأجزاء (Range Requests) للصوتيات
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

    // ب) معالجة التنقل والملاحة الأساسية (Document Navigation)
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request).then(async (response) => {
                if (response && response.status === 200) {
                    const cache = await caches.open(`${CACHE_VERSION}-pages`);
                    cache.put(request, response.clone());
                }
                return response;
            }).catch(async () => {
                // 1. البحث في كل الكاشات عن الصفحة المطلوبة
                const cachedPage = await caches.match(request, { ignoreSearch: true });
                if (cachedPage) return cachedPage;

                // 2. البحث عن صفحة الأوفلاين المحفوظة /offline
                const fallbackPage = await caches.match('/offline') || await caches.match('/offline/');
                if (fallbackPage) return fallbackPage;

                // 3. البحث عن الصفحة الرئيسية /
                const homePage = await caches.match('/');
                if (homePage) return homePage;

                // 4. صفحة HTML تفاعلية في حال عدم وجود أي نسخة كاش
                return new Response(`
                    <!DOCTYPE html>
                    <html lang="ar" dir="rtl">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>أنت غير متصل بالإنترنت | موعظة</title>
                        <style>
                            body { font-family: system-ui, -apple-system, sans-serif; background: #09090b; color: white; text-align: center; padding: 40px 20px; direction: rtl; }
                            .card { max-width: 480px; margin: 40px auto; background: #18181b; padding: 32px; border-radius: 20px; border: 1px solid #27272a; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
                            h1 { color: #16a34a; margin-bottom: 12px; font-size: 22px; font-weight: 800; }
                            p { color: #a1a1aa; font-size: 14px; line-height: 1.7; margin-bottom: 24px; }
                            .btn { display: inline-block; background: #16a34a; color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; transition: background 0.2s; }
                            .btn:hover { background: #15803d; }
                        </style>
                    </head>
                    <body>
                        <div class="card">
                            <h1>أنت تتصفح في الوضع الأوفلاين</h1>
                            <p>يبدو أنك غير متصل بالإنترنت حالياً. يمكنك التنقل في الأقسام والصفحات المحفوظة مسبقاً.</p>
                            <a href="/" class="btn">العودة للرئيسية المحفوظة</a>
                        </div>
                    </body>
                    </html>
                `, {
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                });
            })
        );
    }
});
