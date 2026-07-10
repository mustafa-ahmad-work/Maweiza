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
    faChartLine,
    faMicrophoneAlt,
    faHandsPraying,
    faScroll,
    faPodcast,
    faUserPlus,
    faEye,
    faGlobe
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [statsVisible, setStatsVisible] = useState(false);
    const [quotesVisible, setQuotesVisible] = useState(false);
    const quotesRef = useRef(null);

    useEffect(() => {
        setIsVisible(true);

        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
        }

        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        });

        window.addEventListener("appinstalled", () => {
            setIsInstalled(true);
        });

        const handleScroll = () => {
            if (window.scrollY > 300 && !statsVisible) {
                setStatsVisible(true);
            }

            if (quotesRef.current && !quotesVisible) {
                const rect = quotesRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    setQuotesVisible(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [statsVisible, quotesVisible]);

    const installPWA = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice) => {
                if (choice.outcome === "accepted") {
                    setIsInstalled(true);
                }
                setDeferredPrompt(null);
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

    // إحصائيات الموقع الـ 12 الأصلية
    const stats = [
        { icon: faChartLine, value: "50,000+", label: "زيارة صفحات" },
        { icon: faGlobe, value: "45+", label: "دولة حول العالم" },
        { icon: faEye, value: "20,000+", label: "مشاهدة سنويًا" },
        { icon: faBook, value: "4900+", label: "كتاب إسلامي" },
        { icon: faPodcast, value: "3900+", label: "محاضرة صوتية" },
        { icon: faMicrophoneAlt, value: "3500+", label: "حديث شريف" },
        { icon: faNewspaper, value: "1690+", label: "مقال إسلامي" },
        { icon: faVideo, value: "1000+", label: "محاضرة فيديو" },
        { icon: faHandsPraying, value: "140+", label: "قسم أدعية وأذكار" },
        { icon: faQuoteRight, value: "100+", label: "اقتباس إسلامي" },
        { icon: faScroll, value: "280+", label: "خطبة إسلامية" },
        { icon: faQuestionCircle, value: "520+", label: "فتوى شرعية" },
    ];

    // اقتباسات إسلامية
    const islamicQuotes = [
        {
            text: "اقرأ باسم ربك الذي خلق",
            source: "القرآن الكريم - سورة العلق",
            delay: 0
        },
        {
            text: "الحكمة ضالة المؤمن فحيث وجدها فهو أحق بها",
            source: "حديث شريف",
            delay: 200
        },
        {
            text: "وَقُل رَّبِّ زِدْنِي عِلْمًا",
            source: "القرآن الكريم - سورة طه",
            delay: 400
        },
        {
            text: "طلب العلم فريضة على كل مسلم",
            source: "حديث شريف",
            delay: 600
        }
    ];

    return (
        <>
            {/* قسم الهيرو الرئيسي - خلفية بيضاء نقية ونمط مينيمال حديث بنقاط شبكية */}
            <section className="relative overflow-hidden min-h-screen pt-28 pb-12 flex items-center justify-center bg-white dark:bg-gray-950 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:32px_32px] dark:bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)]">
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

                        <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                            منصة إسلامية متكاملة تهدف لنشر العلم الشرعي وتقريب الدين إلى القلوب بأسلوب سهل وميسر.
                        </p>

                        {/* المميزات - التقسيمة الثنائية الكلاسيكية كما كانت في الشكل القديم ولكن بلمسة عصرية */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 max-w-2xl">
                            {features.map((f, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                                    className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center justify-center w-11 h-11 bg-lime-50 dark:bg-lime-950/20 text-primary dark:text-lime-400 rounded-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                                        <FontAwesomeIcon icon={f.icon} className="text-base" />
                                    </div>
                                    <div className="text-right">
                                        <h3 className="text-sm font-black text-gray-900 dark:text-white mb-1 leading-tight group-hover:text-primary dark:group-hover:text-lime-400 transition-colors duration-200">{f.title}</h3>
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-bold">{f.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* الأزرار التفاعلية */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold shadow-sm transition-all text-sm ${isInstalled
                                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200/50 dark:border-gray-800"
                                    : "bg-primary hover:bg-primary-alt text-white hover:shadow-md"
                                    }`}
                                onClick={installPWA}
                                disabled={isInstalled}
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                {isInstalled ? "مثبت بالفعل" : "تحميل كتطبيق للجوال"}
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

                    {/* الصورة - مسجد شفاف بحجم أكبر ودوائر خلفية هندسية */}
                    <motion.div
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5 relative flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-[560px] flex items-center justify-center mb-12 lg:mb-0">
                            {/* هالات إضاءة ليمونية وتفاحية فاخرة خلف المسجد */}
                            {/* <div className="absolute w-[460px] h-[460px] rounded-full bg-lime-500/10 dark:bg-lime-500/5 blur-3xl -z-10 animate-pulse"></div> */}
                            {/* <div className="absolute w-[320px] h-[320px] rounded-full bg-primary/10 dark:bg-primary/5 blur-2xl -z-10" style={{ animationDelay: "2s" }}></div> */}

                            {/* خطوط هندسية إسلامية تدور ببطء لتعطي انطباعاً بالفخامة والتميز */}
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

            {/* قسم الإحصائيات الـ 12 - بخلفية بيضاء ونمط مينيمال ناصع */}
            <div className="py-20 bg-white dark:bg-gray-950 border-t border-gray-50 dark:border-gray-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-950 dark:text-white mb-3">موقع موعظة بالأرقام</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">نحن فخورون بتقديم محتوى إسلامي عالي الجودة يصل لملايين المستخدمين حول العالم</p>
                        <div className="flex justify-center items-center mt-6">
                            <div className="h-px bg-gray-200 dark:bg-gray-800 w-16"></div>
                            <div className="mx-3 w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <div className="h-px bg-gray-200 dark:bg-gray-800 w-16"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center transform transition-all duration-500 hover:shadow-md hover:border-primary/20 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    }`}
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                <div className="p-8 flex flex-col items-center">
                                    <div className="w-14 h-14 rounded-2xl bg-lime-50 dark:bg-lime-950/20 text-primary dark:text-lime-400 flex items-center justify-center shadow-sm mb-5 transform transition-transform duration-500 group-hover:scale-110">
                                        <FontAwesomeIcon icon={stat.icon} className="text-lg" />
                                    </div>

                                    <div className="text-3xl font-black text-gray-900 dark:text-white mb-1.5 tracking-tight">
                                        {stat.value}
                                    </div>

                                    <div className="text-xs font-bold text-gray-450 dark:text-gray-500">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* قسم الاقتباسات الإسلامية - بخلفية بيضاء ونمط مينيمال أنيق */}
            <div ref={quotesRef} className="py-20 bg-white dark:bg-gray-950 border-t border-gray-50 dark:border-gray-900 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-gray-950 dark:text-white mb-3">حكم واقتباسات إسلامية</h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">كلمات من نور تهدئ القلب وتنير العقل</p>
                        <div className="flex justify-center items-center mt-6">
                            <div className="h-px bg-gray-200 dark:bg-gray-800 w-16"></div>
                            <div className="mx-3 w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <div className="h-px bg-gray-200 dark:bg-gray-800 w-16"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                        {islamicQuotes.map((quote, index) => (
                            <div
                                key={index}
                                className={`bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800/80 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 ${quotesVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${quote.delay}ms`, transitionDuration: '0.8s' }}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 text-2xl text-primary dark:text-lime-400">
                                        <FontAwesomeIcon icon={faQuoteRight} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-850 dark:text-gray-200 mb-3 leading-relaxed">{quote.text}</p>
                                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500">{quote.source}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* زخارف إسلامية هادئة جداً */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
                        <div className="absolute top-10 left-10 text-primary float-animation">
                            <FontAwesomeIcon icon={faStar} size="3x" />
                        </div>
                        <div className="absolute bottom-20 right-20 text-primary float-animation" style={{ animationDelay: '1.5s' }}>
                            <FontAwesomeIcon icon={faStar} size="2x" />
                        </div>
                    </div>
                </div>
            </div>

            <Categories />
        </>
    );
}
