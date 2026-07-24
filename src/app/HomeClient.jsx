"use client";

import Categories from "@/components/Home/Categories";
import AppSection from "@/components/Home/AppSection";
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
    faLaptopCode,
    faChartLine,
    faGlobe,
    faEye,
    faPodcast,
    faHandsPraying,
    faScroll
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import Image from "next/image";
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
    ];

    const stats = [
        { icon: faChartLine, value: "50,000+", label: "زيارة صفحات", desc: "آلاف الزيارات اليومية من مستفيدين يبحثون عن العلم الشرعي والقرآن الكريم بأسلوب ميسر." },
        { icon: faGlobe, value: "45+", label: "دولة حول العالم", desc: "تغطية دولية واسعة تصل للمسلمين في مختلف القارات لربط القلوب بالسنة والقرآن." },
        { icon: faEye, value: "20,000+", label: "مشاهدة سنوياً", desc: "ملايين التفاعلات والمشاهدات السنوية للمحاضرات والدروس والمقالات الدينية الموثوقة." },
        { icon: faBook, value: "4900+", label: "كتاب إسلامي", desc: "مكتبة إسلامية شاملة ومجانية تضم أمهات الكتب في العقيدة والفقه والسيرة والتربية." },
        { icon: faPodcast, value: "3900+", label: "محاضرة صوتية", desc: "تسجيلات خاشعة ومحاضرات صوتية لكبار العلماء والدعاة متاحة للاستماع والتحميل المباشر." },
        { icon: faMicrophoneAlt, value: "3500+", label: "حديث شريف", desc: "أحاديث نبوية شريفة مشروحة ومخرجة مع بيان درجة صحتها وتخريجها المعتمد." },
        { icon: faNewspaper, value: "1690+", label: "مقال إسلامي", desc: "مقالات ودراسات شرعية تناقش القضايا المعاصرة وتوجه المسلم في حياته اليومية." },
        { icon: faVideo, value: "1000+", label: "محاضرة فيديو", desc: "سلاسل ودروس مرئية عالية الجودة تتناول تفسير القرآن والسيرة النبوية العطرة." },
        { icon: faHandsPraying, value: "140+", label: "قسم أدعية وأذكار", desc: "مجموعة متكاملة من أذكار الصباح والمساء والأدعية المأثورة الموثقة بالدليل." },
        { icon: faQuoteRight, value: "100+", label: "اقتباس إسلامي", desc: "حكم ومأثورات ودرر إسلامية متجددة مصممة للمشاركة ونشر الخير بين المسلمين." },
        { icon: faScroll, value: "280+", label: "خطبة إسلامية", desc: "خطب منبرية مكتوبة ومصنفة حسب الموضوعات والمناسبات الجاهزة للإلقاء والاستفادة." },
        { icon: faQuestionCircle, value: "520+", label: "فتوى شرعية", desc: "إجابات ميسرة وموثوقة على الفتاوى الشرعية التي تهم المسلم في عباداته ومعاملاته." },
    ];

    return (
        <>
            {/* قسم الهيرو الرئيسي - خلفية عادية بنقاط خفيفة جداً (يدوبك باينة) */}
            <section className="relative overflow-hidden min-h-screen -mt-26 lg:-mt-52 pt-14 lg:pt-12 pb-12 flex items-center justify-center bg-white dark:bg-zinc-950 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)]">
                {/* خلفية زخرفية متحركة بسيطة */}
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
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 70, ease: "linear" }}
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-lime-650/10 rounded-full"
                    ></motion.div>
                </motion.div>

                {/* المحتوى */}
                <div className="relative z-10 w-full container mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 rtl">
                    {/* النص - يشغل 7 أعمدة من أصل 12 لتوازن بصري رائع */}
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 space-y-6 text-right"
                    >
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-lime-50 dark:bg-lime-950/20 text-primary dark:text-lime-450 rounded-full text-xs font-black tracking-wide border border-lime-100/40 dark:border-lime-900/20">
                            مرحباً بك في منصة موعظة
                        </div>

                        <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                            موقع <span className="text-primary dark:text-lime-400">موعظة</span>
                        </h1>

                        <p className="text-base text-gray-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                            منصة إسلامية متكاملة تهدف لنشر العلم الشرعي وتقريب الدين إلى القلوب بأسلوب سهل وميسر.
                        </p>

                        {/* المميزات - التقسيمة السداسية الكلاسيكية كما كانت في الشكل القديم ولكن بلمسة عصرية */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                                    className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center justify-center w-11 h-11 bg-lime-50 dark:bg-lime-950/20 text-primary dark:text-lime-400 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                        <FontAwesomeIcon icon={f.icon} className="text-base" />
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-sm font-black text-gray-900 dark:text-white mb-1 leading-tight group-hover:text-primary dark:group-hover:text-lime-400 transition-colors duration-200">{f.title}</h3>
                                        <p className="text-[11px] text-gray-500 dark:text-zinc-400 leading-relaxed font-bold">{f.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* الأزرار التفاعلية */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-sm transition-all text-sm ${!isInstallable
                                    ? "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200/50 dark:border-zinc-700/80"
                                    : "bg-primary hover:bg-primary-alt text-white hover:shadow-md"
                                    }`}
                                onClick={handleInstallClick}
                                disabled={!isInstallable}
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                {!isInstallable ? "مثبت بالفعل" : "تحميل كتطبيق للجوال"}
                            </motion.button>

                            <motion.a
                                href="#categories"
                                whileHover={{ y: -2 }}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border border-lime-100 dark:border-lime-900/30 text-primary dark:text-lime-400 bg-primary/5 dark:bg-lime-950/10 hover:bg-lime-50 dark:hover:bg-lime-950/20 shadow-sm text-sm"
                            >
                                استكشف المحتوى
                                <FontAwesomeIcon icon={faAngleDoubleDown} />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* الصورة - مسجد شفاف بخصم أكبر ودواير خلفية هندسية */}
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[560px] flex items-center justify-center mb-12 lg:mb-0">
                            {/* خطوط هندسية إسلامية تدور بربطة لتعطي انطباعاً بالفخامة والتميز */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
                                className="absolute w-[420px] h-[420px] border border-dashed border-primary/15 dark:border-primary/5 rounded-full -z-10 pointer-events-none"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ repeat: Infinity, duration: 65, ease: "linear" }}
                                className="absolute w-[350px] h-[350px] border border-double border-lime-500/10 dark:border-lime-500/5 rounded-full -z-10 pointer-events-none"
                            />

                            {/* صورة المسجد الشفافة العائمة */}
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10 w-full"
                            >
                                <Image
                                    src="/images/muslim.png"
                                    alt="موقع موعظة"
                                    width={640}
                                    height={640}
                                    priority
                                    className="object-contain w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* السهم السفلي */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-6 text-primary dark:text-lime-400"
                >
                    <a
                        href="#categories"
                        className="flex flex-col items-center text-xs font-bold hover:text-primary-alt dark:hover:text-lime-300 transition-colors tracking-wide"
                    >
                        <span className="mb-1.5">استكشف المزيد</span>
                        <FontAwesomeIcon icon={faAngleDoubleDown} />
                    </a>
                </motion.div>
            </section>

            {/* الأقسام والمكونات التفاعلية */}
            <Categories />
            <AppSection />

            {/* قسم الإحصائيات الـ 12 - موقع موعظة بالأرقام (قسم بدون نقاط لتناوب الأقسام) */}
            <section className="py-20 md:py-24 bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 relative">
                {/* إضاءات ضوئية خلفية لتعزيز التباين الفخم */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 dark:bg-primary/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-primary/10 dark:bg-lime-950/40 text-primary dark:text-lime-400 rounded-full text-xs font-black tracking-wide border border-primary/20 dark:border-lime-900/30 mb-3 shadow-xs">
                            أرقام وإنجازات
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white mb-3 tracking-tight">موقع موعظة بالأرقام</h2>
                        <p className="text-gray-600 dark:text-zinc-400 max-w-xl mx-auto text-sm font-bold leading-relaxed">نحن فخورون بتقديم محتوى إسلامي عالي الجودة يصل لملايين المستخدمين حول العالم</p>
                        
                        <div className="flex justify-center items-center mt-6">
                            <div className="h-px bg-primary/30 dark:bg-primary/40 w-16"></div>
                            <div className="mx-3 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <div className="h-px bg-primary/30 dark:bg-primary/40 w-16"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 4) * 0.05, duration: 0.5 }}
                                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200/90 dark:border-zinc-800 text-center transform transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 dark:hover:border-primary/50 shadow-sm hover:shadow-md"
                            >
                                {/* شريط لمعان شفاف عند التمرير */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>

                                <div className="p-6 md:p-8 flex flex-col items-center relative z-10">
                                    {/* أيقونة ثابتة التباين وتكبر بسلاسة عند الهوفر بدون اختفاء */}
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/25 dark:group-hover:bg-primary/35 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 shadow-xs">
                                        <FontAwesomeIcon icon={stat.icon} className="text-xl text-primary dark:text-lime-400" />
                                    </div>

                                    {/* الرقم بتصميم فخم جداً وواضح بتدرج جذاب */}
                                    <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-gray-900 via-primary to-emerald-600 dark:from-white dark:via-lime-300 dark:to-emerald-400 bg-clip-text text-transparent mb-1.5 tracking-tight group-hover:scale-105 transition-transform duration-300">
                                        {stat.value}
                                    </div>

                                    {/* التسمية الرئيسية */}
                                    <div className="text-sm font-black text-gray-900 dark:text-white mb-2">
                                        {stat.label}
                                    </div>

                                    {/* تفاصيل ومعلومات غنية وإضافية لكل رقم */}
                                    {stat.desc && (
                                        <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 leading-relaxed max-w-xs">
                                            {stat.desc}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
