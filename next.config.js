// next.config.js

const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    runtimeCaching,
});

module.exports = {
    ...withPWA,
    reactStrictMode: false,
    // webpack: (config) => {
    //   config.module.rules.push({ '@next/next/no-async-client-component': 'off' })
    //   return config
    // },
    images: {
        // هنا بتحط كل الدومينات اللي بتسمح بتحميل الصور منها
        domains: [
            'd1.islamhouse.com',
            'via.placeholder.com',
        ],
    },
    experimental: {
        browsersListForSwc: true,
    },
    formats: ["image/avif", "image/webp"],
};
