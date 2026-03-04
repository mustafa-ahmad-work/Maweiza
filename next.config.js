const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    runtimeCaching,
});

module.exports = withPWA({
    reactStrictMode: false,
    images: {
        domains: [
            'd1.islamhouse.com',
            'via.placeholder.com',
        ],
        formats: ['image/avif', 'image/webp'], // هنا بس
    },
    // لو عندك إعدادات Webpack خاصة، فك التعليق على الجزء ده
    // webpack: (config) => {
    //   config.module.rules.push({ '@next/next/no-async-client-component': 'off' })
    //   return config
    // },
});
