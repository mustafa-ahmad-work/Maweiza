"use client";

import Categories from "@/components/Home/Categories";
import SplashScreen from "@/components/Layout/SplashScreen";
import { motion } from "framer-motion";
import {
    faAngleDoubleDown,
    faDownload,
    faBook,
    faPray,
    faMosque,
    faQuran,
    faStar,
    faCalendarAlt,
    faList,
    faQuestionCircle,
    faSearch,
    faBookOpen,
    faClock,
    faHands,
    faPrayingHands,
    faQuoteRight,
    faNewspaper,
    faComments,
    faMicrophone,
    faVideo,
    faChild,
    faHandHoldingUsd,
    faUsers,
    faHeart,
    faBookmark,
    faMicrophoneAlt,
    faVolumeUp,
    faFont,
    faMobileAlt,
    faLayerGroup,
    faCheckCircle,
    faArrowLeft,
    faLaptopCode
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomeClient() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [statCount, setStatCount] = useState({
        quran: 0,
        audio: 0,
        hadith: 0,
        books: 0,
        azkar: 0,
        articles: 0,
        videos: 0,
        fatwa: 0,
        khotab: 0,
        stories: 0,
        names: 0,
        tafsir: 0
    });

    useEffect(() => {
        // العدادات المتحركة للإحصائيات
        const duration = 2000;
        const steps = 50;
        const stepTime = duration / steps;

        const targets = {
            quran: 114,
            audio: 3900,
            hadith: 3500,
            books: 4900,
            azkar: 140,
            articles: 1690,
            videos: 1000,
            fatwa: 520,
            khotab: 280,
            stories: 150,
            names: 99,
            tafsir: 114
        };

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;

            setStatCount({
                quran: Math.floor(targets.quran * progress),
                audio: Math.floor(targets.audio * progress),
                hadith: Math.floor(targets.hadith * progress),
                books: Math.floor(targets.books * progress),
                azkar: Math.floor(targets.azkar * progress),
                articles: Math.floor(targets.articles * progress),
                videos: Math.floor(targets.videos * progress),
                fatwa: Math.floor(targets.fatwa * progress),
                khotab: Math.floor(targets.khotab * progress),
                stories: Math.floor(targets.stories * progress),
                names: Math.floor(targets.names * progress),
                tafsir: Math.floor(targets.tafsir * progress)
            });

            if (currentStep >= steps) {
                setStatCount(targets);
                clearInterval(timer);
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the install prompt");
                }
                setDeferredPrompt(null);
                setIsInstallable(false);
            });
        }
    };

    const features = [
        {
            icon: faQuran,
            title: "القرآن الكريم وعلومه",
            description: "سور القرآن بتلاوات متعددة، مع تفسير شامل لكل آية ومعلومات السور مقاصدها وفضائلها."
        },
        {
            icon: faMicrophoneAlt,
            title: "الحديث والأذكار",
            description: "أكثر من 3500 حديث شريف مشروح، و140 قسماً للأدعية والأذكار اليومية الصحيحة."
        },
        {
            icon: faBook,
            title: "المكتبة والمعارف",
            description: "ما يزيد عن 4900 كتاب و1690 مقالاً و520 فتوى شرعية و280 خطبة قيمة."
        },
        {
            icon: faVideo,
            title: "الوسائط التفاعلية",
            description: "أكثر من 1000 محاضرة مرئية و3900 محاضرة صوتية واقتباسات إسلامية متجددة."
        }
    ];

    const statsGrid = [
        { label: "سورة قرآنية", count: statCount.quran, icon: faQuran, path: "/qaran", color: "from-emerald-500 to-teal-600" },
        { label: "محاضرة صوتية", count: statCount.audio, icon: faVolumeUp, path: "/audios", color: "from-blue-500 to-cyan-600" },
        { label: "حديث شريف", count: statCount.hadith, icon: faBookOpen, path: "/adiths", color: "from-amber-500 to-orange-600" },
        { label: "كتاب إسلامي", count: statCount.books, icon: faBook, path: "/books", color: "from-purple-500 to-indigo-600" },
        { label: "قسم أذكار", count: statCount.azekar, icon: faHands, path: "/azekar", color: "from-rose-500 to-pink-600" },
        { label: "مقال شرعي", count: statCount.articles, icon: faNewspaper, path: "/articles", color: "from-lime-500 to-emerald-600" },
        { label: "مقطع مرئي", count: statCount.videos, icon: faVideo, path: "/videos", color: "from-red-500 to-rose-600" },
        { label: "فتوى شرعية", count: statCount.fatwa, icon: faComments, path: "/fatwa", color: "from-sky-500 to-blue-600" },
        { label: "خطبة منبرية", count: statCount.khotab, icon: faMicrophone, path: "/khotab", color: "from-teal-500 to-emerald-700" },
        { label: "قصة وعبرة", count: statCount.stories, icon: faStar, path: "/stories", color: "from-violet-500 to-purple-700" },
        { label: "اسم الله الحسنى", count: statCount.names, icon: faHeart, path: "/names", color: "from-emerald-600 to-green-700" },
        { label: "تفسير سورة", count: statCount.tafsir, icon: faFont, path: "/tafsir", color: "from-cyan-600 to-blue-700" }
    ];

    return (
        <>
            {/* قسم الهيرو الرئيسي */}
            <section className="relative overflow-hidden min-h-screen -mt-26 lg:-mt-52 pt-14 lg:pt-0 pb-12 flex items-center justify-center bg-white dark:bg-zinc-950 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)]">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.08 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0 pointer-events-none"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
                        className="absolute top-1/4 left-1/4 w-72 h-72 border border-lime-500/10 rounded-full"
                    ></motion.div>
                </motion.div>

                <div className="container relative z-10 mx-auto px-4 md:px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-50 dark:bg-zinc-900 border border-lime-200 dark:border-zinc-800 text-lime-800 dark:text-lime-400 text-xs md:text-sm font-bold mb-8 shadow-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
                            <span>موقع موعظة — المنصة الإسلامية الشاملة</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6"
                        >
                            مرجعك الإسلامي الشامل للقرآن الكريم، الأحاديث، والأذكار
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-zinc-300 font-medium leading-relaxed max-w-2xl mx-auto mb-10"
                        >
                            تصفح أكثر من 18,000 مادة إسلامية موثوقة من التلاوات، الأحاديث، الأذكار، والمحاضرات لتجربة روحية ومعرفية متكاملة.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap items-center justify-center gap-4"
                        >
                            <Link
                                href="/qaran"
                                className="px-8 py-4 rounded-xl bg-lime-600 hover:bg-lime-700 text-white font-bold text-base shadow-lg shadow-lime-600/20 hover:shadow-lime-600/30 transition-all duration-300 flex items-center gap-3 group"
                            >
                                <FontAwesomeIcon icon={faQuran} className="text-xl group-hover:scale-110 transition-transform" />
                                <span>القرآن الكريم</span>
                            </Link>

                            <Link
                                href="/azekar"
                                className="px-8 py-4 rounded-xl bg-gray-900 hover:bg-black dark:bg-zinc-900 dark:hover:bg-zinc-800 text-white font-bold text-base border border-gray-800 dark:border-zinc-700 shadow-md transition-all duration-300 flex items-center gap-3"
                            >
                                <FontAwesomeIcon icon={faHands} className="text-xl text-lime-400" />
                                <span>الأذكار والأدعية</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* الأقسام والمكونات التفاعلية */}
            <Categories />
        </>
    );
}
