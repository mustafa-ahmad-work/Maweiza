const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development' && process.env.ENABLE_PWA_DEV !== 'true',
    register: true,
    skipWaiting: true,
    customWorkerDir: 'src/worker',
    buildExcludes: [/app-build-manifest\.json$/],
    fallbacks: false,
    maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
    runtimeCaching: [
        // 1. الخطوط والأصول الثابتة
        {
            urlPattern: /^https:\/\/fonts\.(?:gstatic|googleapis)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'maweiza-fonts-v1',
                expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
        },
        {
            urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'maweiza-static-fonts-v1',
                expiration: { maxEntries: 30, maxAgeSeconds: 365 * 24 * 60 * 60 },
            },
        },

        // 2. الصوتيات والتلاوات مع دعم Range Requests
        {
            urlPattern: /\.(?:mp3|wav|ogg)$/i,
            handler: 'CacheFirst',
            options: {
                rangeRequests: true,
                cacheName: 'maweiza-audio-v1',
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },

        // 3. الصور والرسوميات
        {
            urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'maweiza-images-v1',
                expiration: {
                    maxEntries: 300,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },

        // 4. APIs الثابتة (القرآن والتفسير والأحاديث والأذكار والقصص)
        {
            urlPattern: /^https:\/\/(?:api\.alquran\.cloud|api3\.islamhouse\.com|dorar\.net|abdoahmed26\.github\.io)\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'maweiza-static-api-v1',
                expiration: {
                    maxEntries: 500,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },

        // 5. API المتغيرة يومياً (مواقيت الصلاة)
        {
            urlPattern: /^https:\/\/api\.aladhan\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'maweiza-prayer-api-v1',
                networkTimeoutSeconds: 2,
                expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },

        // 6. بيانات صفحات Next.js وقراءات Navigation
        {
            urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'maweiza-next-data-v1',
                networkTimeoutSeconds: 2,
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },

        // 7. باقي الصفحات والملاحة الرئيسية
        {
            urlPattern: ({ url }) => {
                const isSameOrigin = self.origin === url.origin;
                if (!isSameOrigin) return false;
                const pathname = url.pathname;
                if (pathname.startsWith('/api/')) return false;
                return true;
            },
            handler: 'NetworkFirst',
            options: {
                cacheName: 'maweiza-pages-v1',
                networkTimeoutSeconds: 2,
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                    purgeOnQuotaError: true,
                },
            },
        },
    ],
});

module.exports = withPWA({
    reactStrictMode: false,
    images: {
        domains: [
            'd1.islamhouse.com',
            'via.placeholder.com',
        ],
        formats: ['image/avif', 'image/webp'],
    },
});
