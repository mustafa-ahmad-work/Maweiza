"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faBookOpen,
    faBrain,
    faKey,
    faHistory,
    faSyncAlt,
    faClock,
    faCheckCircle,
    faLayerGroup,
    faStar,
    faVolumeUp,
    faSun,
    faMoon,
    faChevronLeft,
    faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { faGooglePlay, faApple } from "@fortawesome/free-brands-svg-icons";

export default function ApplicationClient() {
    const [activeKey, setActiveKey] = useState(0);

    const keysDetail = [
        {
            num: "١",
            title: "المفتاح الأول: الختمة (التلاوة والاستماع)",
            subtitle: "تهيئة العين والأذن للتلقي القرآني الصحيح",
            details: [
                "ختمة التلاوة اليومية: قراءة جزئين يومياً بنظام 'الحدر' السريع. الهدف منها تعويد العين على رسم المصحف وحروفه وتسهيل انسياب الآيات دون توقف.",
                "ختمة الاستماع اليومية: الاستماع لحزب واحد يومياً بصوت الشيخ محمود خليل الحصري (رحمه الله). الهدف منها ضبط مخارج الحروف، ترسيخ الأحكام التجويدية، والارتقاء بجودة التلاوة الشخصية.",
                "الأثر العلمي: تحفيز الذاكرة البصرية والسمعية معاً، مما يسهل استرجاع مواضع الآيات وتجنب الأخطاء اللغوية الشائعة."
            ],
            tips: "احرص على أداء ختمة التلاوة في وقت نشاطك الذهني، واستمع للورد اليومي بتركيز كامل بعيداً عن المشتتات.",
            color: "emerald",
            icon: faBookOpen
        },
        {
            num: "٢",
            title: "المفتاح الثاني: التحضير (ثلاثة مستويات)",
            subtitle: "البناء التراكمي وتثبيت الصورة الذهنية مسبقاً",
            details: [
                "التحضير الأسبوعي: قراءة صفحات ورد الأسبوع القادم بالكامل مرة واحدة في يوم الراحة لتكوين صورة ذهنية شاملة وربط السياق العام للسور.",
                "التحضير الليلي (سر التثبيت): قراءة الصفحة المقررة غداً 15 مرة من المصحف مباشرة قبل النوم. يقوم العقل الباطن بمعالجة الآيات وترسيخها طوال فترة النوم.",
                "التحضير القبلي: قراءة نفس الصفحة 15 مرة بتركيز عالي قبل بدء الحفظ الفعلي لتهيئة الذاكرة القريبة وتسهيل عملية الإيداع."
            ],
            tips: "التحضير الليلي هو الوقود الحقيقي للحفظ السهل؛ لا تنم قبل أن تقرأ صفحة الغد 15 مرة لتشهد سرعة حفظ غير مسبوقة في الصباح.",
            color: "blue",
            icon: faBrain
        },
        {
            num: "٣",
            title: "المفتاح الثالث: الحفظ الجديد (الإيداع الذكي)",
            subtitle: "التركيز المطلق وتكرار البناء الصحيح",
            details: [
                "تقسيم الصفحة إلى مقاطع موضوعية مترابطة حسب المعاني.",
                "تكرار كل آية منفردة 10 مرات غيباً بتركيز كامل، ثم ربطها بالآية السابقة وتكرار الربط 5 مرات.",
                "الوصول لمرحلة السرد الغيبي السريع للوجه كاملاً دون أي تردد أو أخطاء، كأنه يقرأ من مصحف مفتوح.",
                "الأثر العلمي: تحويل الآيات لكتل مترابطة في الذاكرة قصيرة المدى، بحيث يستدعي آخر الآية أول التي تليها تلقائياً."
            ],
            tips: "لا تنتقل من آية إلى أخرى حتى تتأكد من سردها ثلاث مرات متتالية بدون أدنى تردد.",
            color: "amber",
            icon: faKey
        },
        {
            num: "٤",
            title: "المفتاح الرابع: مراجعة القريب (التمكين والربط)",
            subtitle: "نقل المحفوظات للذاكرة بعيدة المدى",
            details: [
                "مراجعة آخر 20 صفحة (حوالي جزء كامل) تم حفظها حديثاً بشكل يومي.",
                "يعتبر هذا المفتاح هو 'صمام الأمان' الحقيقي للتطبيق، حيث يمنع النسيان السريع وتراكم التفلت.",
                "تتم المراجعة عن طريق التسميع الغيبي السريع مع مراجعة الأخطاء وتثبيتها فوراً.",
                "الأثر العلمي: تعزيز الوصلات العصبية الخاصة بالمحفوظات الجديدة ونقلها تدريجياً للذاكرة المستديمة."
            ],
            tips: "تأخير مراجعة القريب ليوم واحد يضاعف الجهد المطلوب لتثبيته؛ اجعله روتيناً مقدساً بعد حفظ الجديد.",
            color: "purple",
            icon: faHistory
        },
        {
            num: "٥",
            title: "المفتاح الخامس: مراجعة البعيد (التثبيت الأبدي)",
            subtitle: "الرسوخ والتمكين الذي لا يتأثر بطول العهد",
            details: [
                "مراجعة الأجزاء القديمة بمعدل جزئين يومياً بشكل مستمر كورد ثابت.",
                "الهدف هو تحقيق السرد الانسيابي المتصل للقرآن كاملاً دون الحاجة لفتح المصحف.",
                "عند ختم المراجعة، يتم البدء مجدداً لضمان بقاء القرآن راسخاً في الصدر مدى الحياة.",
                "الأثر العلمي: تحويل المحفوظات إلى معلومات بديهية راسخة في الذاكرة طويلة المدى، مثل سورة الفاتحة."
            ],
            tips: "السر في مراجعة البعيد هو الاستمرارية والانسياب؛ اقرأ وردك أثناء المشي أو القيادة لتمرين ذاكرتك غيباً.",
            color: "rose",
            icon: faSyncAlt
        }
    ];

    const techFeatures = [
        {
            title: "ميزان الرسوخ الذكي (IQ)",
            desc: "نظام لوني متطور يرسم خريطة حرارية لقوة حفظك؛ الألوان الدافئة تنبهك للسور التي تحتاج مراجعة عاجلة، بينما تضيء السور الراسخة بالألوان الباردة والمستقرة.",
            icon: faBrain,
            color: "text-primary"
        },
        {
            title: "مزامنة 5 طبعات مصحف عالمية",
            desc: "يدعم التطبيق طبعة المدينة المنورة (604 صفحة)، الطبعة المصرية (612 صفحة)، مصحف رواية ورش، المصحف الهندي، ومصحف التجويد الملون مع مزامنة كاملة لخطة التسميع.",
            icon: faLayerGroup,
            color: "text-blue-500"
        },
        {
            title: "خوارزمية المراجعة المتباعدة",
            desc: "يقوم التطبيق بحساب الفترات المثالية لمراجعة الصفحات تلقائياً بناءً على تاريخ حفظها ومعدل أخطائك السابقة، مما يوفر وقتك ويركز مجهودك الحقيقي.",
            icon: faClock,
            color: "text-amber-500"
        },
        {
            title: "رحلة الختم والـ Streaks",
            desc: "تتبع تقدمك البصري في أجزاء القرآن الثلاثين، مع تتبع أيام التزامك المتتالية (Streaks) ونظام الرتب (مبتدئ، حافظ، مجيد) لتحفيزك المستمر.",
            icon: faStar,
            color: "text-purple-500"
        },
        {
            title: "مشغل صوتي منهجي مدمج",
            desc: "مشغل صوتي مخصص يدعم ورد الاستماع اليومي، مع إمكانية تحديد القارئ، وتكرار الآيات والصفحات بعدد محدد يتناسب مع التحضير القبلي والاستماع.",
            icon: faVolumeUp,
            color: "text-rose-500"
        },
        {
            title: "دعم شريط الحالة والوضع الداكن",
            desc: "تصميم مريح للعين يدعم الوضع الداكن المتكامل، مع شريط حالة شفاف منساب مع الهواتف الذكية الحديثة لتجربة قراءة وتسميع خالية من التشتت.",
            icon: faMoon,
            color: "text-indigo-500"
        }
    ];

    const dailyRoutine = [
        {
            time: "وقت الفجر (البذر والتركيز)",
            desc: "مخصص للحفظ الجديد والتحضير القبلي لصفحة اليوم. يكون الذهن في أعلى درجات اليقظة والهدوء والتركيز التام بعد استراحة النوم.",
            icon: faSun
        },
        {
            time: "بعد العصر أو العشاء (التمكين والربط)",
            desc: "مخصص لمراجعة ورد القريب (آخر 20 صفحة) والبعيد (جزئين يومياً). وقت ممتاز للمراجعة الجماعية والتثبيت مع العائلة أو الأصدقاء.",
            icon: faClock
        },
        {
            time: "قبل النوم مباشرة (البرمجة العقلية)",
            desc: "مخصص للتحضير الليلي لصفحة الغد (قراءة 15 مرة). وهي فترة ذهبية ليعالجها العقل الباطن أثناء النوم لتسهيل الحفظ صباحاً.",
            icon: faMoon
        }
    ];

    const techStack = [
        { name: "React Native", role: "إطار العمل الأساسي للتطبيقات الهجينة ذات الأداء القوي", desc: "أداء نيتيف حقيقي وسريع ومناسب لكلا النظامين الأندرويد والآيفون." },
        { name: "Expo Managed", role: "تسريع التطوير والوصول السلس للميزات البرمجية", desc: "إدارة الحزم والتحديثات الهوائية (OTA) بكفاءة تامة دون الحاجة للمتاجر دائماً." },
        { name: "TypeScript", role: "لغة كتابة برمجية آمنة وخالية من أخطاء النوع", desc: "ضمان جودة الكود وسهولة صيانته وتطويره بشكل مستمر ومستدام." },
        { name: "Zustand", role: "إدارة حالة التطبيق بشكل خفيف وسريع للغاية", desc: "مزامنة الإعدادات، تقدم الحفظ، ومستويات الرسوخ فورياً وبدون تأخير." },
        { name: "Expo Router", role: "نظام ملاحة يعتمد على الملفات للتنقل السلس", desc: "تجربة تصفح سريعة ومنطقية تشبه تطبيقات الويب الحديثة والمنسابة." },
        { name: "AsyncStorage", role: "تخزين البيانات والتقدم محلياً في الهاتف", desc: "حفظ خطة التقدم، السلاسل الزمنية، والإعدادات أوفلاين بالكامل للخصوصية." }
    ];

    return (
        <div className="min-h-screen bg-dotted text-gray-900 dark:text-white pb-12" dir="rtl">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* 1. قسم الهيرو للمنتج */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 text-right">
                    {/* الجانب الأيمن: النص والعناوين والتحميل */}
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 text-primary dark:text-primary-400 text-xs font-black">
                            تطبيق الهاتف المحمول الرسمي
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 dark:text-white leading-[1.45] md:leading-[1.4]">
                            تطبيق <span className="text-primary dark:text-primary-400">مفاتيح حفظ القرآن</span>
                        </h1>

                        <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 leading-[1.8] md:leading-[1.85] max-w-2xl font-semibold">
                            رفيقك الذكي في رحلتك مع كتاب الله تعالى. تطبيق يجسد المنهجية العلمية التراكمية في 5 أركان أساسية تمنع تفلت المحفوظ وتأخذ بيدك خطوة بخطوة نحو التمكين والرسوخ الأبدي.
                        </p>

                        {/* أزرار التحميل السريعة تحت الهيرو */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a
                                href="https://drive.google.com/file/d/1ovt0-_yfEc9Zt2ZWPxljXBzqNk4k_zfF/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-alt text-white font-bold text-xs md:text-sm shadow-md shadow-primary/10 transition-all flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                <span>تحميل التطبيق (جوجل درايف)</span>
                            </a>
                            <a
                                href="#methodology"
                                className="px-6 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-150 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-200 font-bold text-xs md:text-sm border border-gray-200/50 dark:border-zinc-800 transition-all"
                            >
                                <span>استكشف المنهجية العلمية</span>
                            </a>
                        </div>
                    </div>

                    {/* الجانب الأيسر: عرض صورة الغلاف */}
                    <div className="lg:col-span-5 flex justify-center items-center">
                        <Image
                            src="/application/caver.png"
                            alt="غلاف شاشات تطبيق مفاتيح حفظ القرآن"
                            width={600}
                            height={375}
                            className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.015]"
                            priority
                            quality={95}
                        />
                    </div>
                </div>

                {/* 2. قسم المنهجية العلمية (الأركان الخمسة بالتفصيل التفاعلي) */}
                <section id="methodology" className="py-16 border-t border-gray-100 dark:border-zinc-900">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <span className="px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 text-primary dark:text-primary-400 text-xs font-black">
                            الدراسة التراكمية
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
                            الأركان الخمسة لمنهجية مفاتيح الحفظ
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 max-w-xl mx-auto font-semibold leading-[1.75]">
                            تعتمد المنهجية على تقسيم الجهد اليومي إلى خمسة مفاتيح متكاملة تضمن ترسيخ الآيات وحمايتها من التفلت والنسيان.
                        </p>
                    </div>

                    {/* التبديل التفاعلي بين المفاتيح */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* أزرار المفاتيح يميناً */}
                        <div className="lg:col-span-4 space-y-2.5">
                            {keysDetail.map((k, index) => {
                                const isActive = activeKey === index;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setActiveKey(index)}
                                        className={`w-full p-4 rounded-2xl border text-right transition-all duration-300 flex items-center justify-between ${isActive
                                            ? "bg-primary text-white border-transparent shadow-md -translate-y-0.5"
                                            : "bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-300 border-gray-200 dark:border-zinc-800"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black ${isActive ? "bg-white/20 text-white" : "bg-primary/10 dark:bg-primary/20 text-primary-alt dark:text-primary-400"
                                                }`}>
                                                {k.num}
                                            </span>
                                            <div>
                                                <h4 className="text-xs md:text-sm font-black leading-snug">{k.title.split(":")[0]}</h4>
                                                <p className={`text-[10px] ${isActive ? "text-lime-100" : "text-gray-400 dark:text-zinc-400"}`}>
                                                    {k.title.split(":")[1]}
                                                </p>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronLeft} className={`text-[10px] transition-transform ${isActive ? "rotate-90 text-white" : "text-gray-400 dark:text-zinc-400"}`} />
                                    </button>
                                );
                            })}
                        </div>

                        {/* تفاصيل المفتاح النشط يساراً */}
                        <div className="lg:col-span-8">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeKey}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-6 md:p-8 flex flex-col justify-between shadow-xs"
                                >
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 border-b border-gray-100 dark:border-zinc-800 pb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400 flex items-center justify-center text-xl shrink-0">
                                                <FontAwesomeIcon icon={keysDetail[activeKey].icon} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white">
                                                    {keysDetail[activeKey].title}
                                                </h3>
                                                <p className="text-xs font-bold text-primary dark:text-primary-400 mt-0.5">
                                                    {keysDetail[activeKey].subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        <ul className="space-y-3">
                                            {keysDetail[activeKey].details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-700 dark:text-zinc-300 leading-[1.8] font-semibold">
                                                    <FontAwesomeIcon icon={faCheckCircle} className="text-primary dark:text-primary-400 shrink-0 mt-1" />
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* نصائح ذهبية لكل مفتاح */}
                                    <div className="mt-8 p-4 rounded-2xl bg-lime-50/50 dark:bg-lime-950/20 border border-lime-100 dark:border-lime-900/30">
                                        <div className="flex gap-2.5 items-start">
                                            <FontAwesomeIcon icon={faInfoCircle} className="text-primary dark:text-primary-400 mt-0.5 text-sm shrink-0" />
                                            <div>
                                                <h5 className="text-xs font-black text-primary dark:text-primary-400">نصيحة المفتاح:</h5>
                                                <p className="text-[11px] md:text-xs text-primary/95 dark:text-lime-200/90 mt-1 font-semibold leading-[1.75]">
                                                    {keysDetail[activeKey].tips}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </section>

                {/* 3. قسم الروتين اليومي المقترح في المنهجية */}
                <section className="py-16 border-t border-gray-100 dark:border-zinc-900">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 text-primary dark:text-primary-400 text-xs font-black">
                            جدولة الأوراد
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
                            الروتين اليومي المقترح لتطبيق المنهجية
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 max-w-xl mx-auto font-semibold leading-[1.75]">
                            توزيع المهام على مدار اليوم يضمن أعلى نسبة من التركيز والاستفادة وتفادي التعب الذهني.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {dailyRoutine.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-xs hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-sm md:text-base font-black text-gray-900 dark:text-white">{item.time}</h4>
                                    <div className="w-9 h-9 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400 flex items-center justify-center">
                                        <FontAwesomeIcon icon={item.icon} className="text-sm" />
                                    </div>
                                </div>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-zinc-300 leading-[1.75] font-semibold">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 4. قسم المميزات التقنية والذكية للتطبيق */}
                <section className="py-16 border-t border-gray-100 dark:border-zinc-900">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 text-primary dark:text-primary-400 text-xs font-black">
                            ميزات ذكية
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
                            الأدوات والخصائص الذكية في تطبيق مفاتيح الحفظ
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 max-w-xl mx-auto font-semibold leading-[1.75]">
                            لقد تم دمج أفضل الأدوات التقنية المتكاملة لمساعدتك وتسهيل متابعتك بأسلوب مرن وتفاعلي.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {techFeatures.map((feat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-xs hover:border-primary/30 dark:hover:border-primary-400/30 transition-all"
                            >
                                <div className="flex items-center gap-3.5 mb-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0">
                                        <FontAwesomeIcon icon={feat.icon} className="text-primary dark:text-primary-400 text-lg" />
                                    </div>
                                    <h4 className="text-sm md:text-base font-black text-gray-900 dark:text-white">{feat.title}</h4>
                                </div>
                                <p className="text-xs md:text-sm text-gray-600 dark:text-zinc-300 leading-[1.75] font-semibold">
                                    {feat.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. قسم التقنيات المستخدمة (Tech Stack) */}
                <section className="py-16 border-t border-gray-100 dark:border-zinc-900">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 text-primary dark:text-primary-400 text-xs font-black">
                            الهيكل البرمجي
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-3 mb-4 leading-tight">
                            التقنيات المستخدمة في بناء التطبيق
                        </h2>
                        <p className="text-sm md:text-base text-gray-600 dark:text-zinc-400 max-w-xl mx-auto font-semibold leading-[1.75]">
                            تم بناء وتطوير التطبيق بأحدث بيئات ومكتبات تطوير تطبيقات الجوال لضمان سرعة الاستجابة وكفاءة استخدام الموارد.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {techStack.map((tech, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-slate-50/50 dark:bg-zinc-900/60 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-base font-black text-primary dark:text-primary-400">{tech.name}</h4>
                                        <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-lime-400"></span>
                                    </div>
                                    <h5 className="text-xs font-bold text-gray-800 dark:text-zinc-200 mb-1">{tech.role}</h5>
                                    <p className="text-xs text-gray-500 dark:text-zinc-400 leading-[1.7] font-semibold">
                                        {tech.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 6. قسم التحميل الشامل (Download Center) */}
                <section id="download" className="py-20 border-t border-gray-150 dark:border-zinc-900">
                    <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary to-primary-alt text-white rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-xl border border-primary/20">
                        {/* الخلفيات الزخرفية للـ CTA */}
                        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>
                        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>

                        <div className="relative z-10 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black">حمل تطبيق مفاتيح الحفظ الآن مجاناً</h2>
                            <p className="text-xs md:text-sm text-lime-100 max-w-xl mx-auto font-semibold leading-[1.8] md:leading-[1.85]">
                                ابدأ اليوم رحلتك المباركة لتمكين وتثبيت حفظ القرآن الكريم. التطبيق متوفر حالياً للتحميل المباشر عبر جوجل درايف وسيتم رفعه وتوفير نسخ المتاجر الرسمية قريباً.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
                                {/* تحميل مباشر عبر جوجل درايف */}
                                <a
                                    href="https://drive.google.com/file/d/1ovt0-_yfEc9Zt2ZWPxljXBzqNk4k_zfF/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 rounded-2xl bg-white hover:bg-lime-50 text-gray-900 font-bold text-sm shadow-md flex items-center gap-3 transition-transform hover:-translate-y-1"
                                >
                                    <FontAwesomeIcon icon={faDownload} className="text-xl text-primary" />
                                    <div className="text-right">
                                        <p className="text-[10px] text-primary font-bold leading-tight">تحميل مباشر (APK)</p>
                                        <p className="text-xs font-black leading-tight">Google Drive</p>
                                    </div>
                                </a>

                                {/* متجر جوجل بلاي */}
                                <div
                                    className="px-6 py-3.5 rounded-2xl bg-black/40 text-zinc-400 font-bold text-sm border border-zinc-800/80 flex items-center gap-3 relative cursor-not-allowed opacity-60"
                                >
                                    <span className="absolute -top-2.5 -right-2.5 bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs">قريباً</span>
                                    <FontAwesomeIcon icon={faGooglePlay} className="text-xl text-zinc-500" />
                                    <div className="text-right">
                                        <p className="text-[10px] text-zinc-500 leading-tight">تحميل للأندرويد</p>
                                        <p className="text-xs font-black leading-tight">Google Play</p>
                                    </div>
                                </div>

                                {/* متجر آبل */}
                                <div
                                    className="px-6 py-3.5 rounded-2xl bg-black/40 text-zinc-400 font-bold text-sm border border-zinc-800/80 flex items-center gap-3 relative cursor-not-allowed opacity-60"
                                >
                                    <span className="absolute -top-2.5 -right-2.5 bg-yellow-500 text-black text-[9px] font-black px-2 py-0.5 rounded-md shadow-xs">قريباً</span>
                                    <FontAwesomeIcon icon={faApple} className="text-xl text-zinc-500" />
                                    <div className="text-right">
                                        <p className="text-[10px] text-zinc-500 leading-tight">تحميل للآيفون</p>
                                        <p className="text-xs font-black leading-tight">App Store</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[10px] text-lime-200/80 font-bold pt-4">
                                * يدعم نظام الأندرويد 6.0+ وسيتم توفير نسخة iOS على المتجر قريباً
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
