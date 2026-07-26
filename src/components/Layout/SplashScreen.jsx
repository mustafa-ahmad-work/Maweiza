"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 250);
                    return 100;
                }
                return prev + 10;
            });
        }, 40);

        return () => clearInterval(interval);
    }, []);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl transition-opacity duration-500 selection:bg-lime-600 selection:text-white">

            {/* الشعار مع حلقة هندسية تدور بنعومة ناصعة وبسيطة بدون ظلال ثقيلة */}
            <div className="relative flex items-center justify-center mb-8">
                {/* حلقة دائرية أنيقة تدور ببطء */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                    className="absolute w-36 h-36 border border-dashed border-primary/30 dark:border-primary-400/30 rounded-full pointer-events-none"
                />

                {/* حلقة داخلية معاكسة خفيفة */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
                    className="absolute w-28 h-28 border border-primary/10 dark:border-primary-400/10 rounded-full pointer-events-none"
                />

                {/* الشعار العائم */}
                <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 p-2"
                >
                    <Image
                        priority
                        src="/logo.png"
                        width={90}
                        height={90}
                        alt="موقع موعظة"
                        style={{ width: "auto", height: "auto" }}
                        className="rounded-2xl w-22 h-22 object-contain"
                    />
                </motion.div>
            </div>

            {/* النص والعنوان بأسلوب عصري وأنيق */}
            <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center space-y-1.5 mb-10"
            >
                <h1 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
                    موقع <span className="text-primary dark:text-primary-400">موعظة</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400 font-bold tracking-wide">
                    المنصة الإسلامية الشاملة للقرآن والسنة
                </p>
            </motion.div>

            {/* مؤشر التحميل الحديث النحيف (2px) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-44 flex flex-col items-center space-y-2.5"
            >
                <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800/80 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-primary dark:bg-lime-400 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut" }}
                    />
                </div>
                <div className="text-[11px] font-black text-primary dark:text-primary-400 tracking-widest">
                    {progress}%
                </div>
            </motion.div>
        </div>
    );
}
