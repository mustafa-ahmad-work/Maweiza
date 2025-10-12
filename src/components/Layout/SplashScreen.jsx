"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 500);
                    return 100;
                }
                return prev + 4;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-500">

            {/* Logo */}
            <div className="relative mb-8">
                <div className="relative p-3 rounded-full animate-bounce">
                    <Image
                        src="/logo.png"
                        width={140}
                        height={140}
                        alt="موقع موعظة"
                        className="rounded-full w-36 h-36"
                    />
                </div>
            </div>

            {/* App Name */}
            <h1 className="text-4xl font-bold mb-4 animate-fade-in text-gray-900 dark:text-white">
                موقع موعظة
            </h1>

            {/* Quranic Verse */}
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-6 text-center animate-fade-in-up">
                الموعظة نور، يحيي القلوب ويضيء الحياة
            </p>

            {/* Progress Bar */}
            <div className="w-64 h-3 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden mb-3 shadow-inner">
                <div
                    className="h-full bg-gray-800 dark:bg-white rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm font-medium animate-pulse">
                جاري التحميل... {progress}%
            </p>

            {/* Footer */}
            <div className="absolute bottom-6 text-gray-500 dark:text-gray-400 text-sm animate-fade-in text-center">
                تطبيق موثوق
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fadeIn 1s ease-out; }
                .animate-fade-in-up { animation: fadeInUp 1s ease-out; }
            `}</style>
        </div>
    );
}
