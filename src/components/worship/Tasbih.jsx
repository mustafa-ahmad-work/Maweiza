"use client";

import { useState, useEffect, useCallback } from "react";
import Landing from "../Layout/Landing";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/config/constants";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRotateLeft,
    faVolumeHigh,
    faVolumeXmark,
    faCheckCircle,
    faKeyboard,
    faStar,
    faHandPointer,
    faChartPie,
    faBullseye,
    faPalette
} from "@fortawesome/free-solid-svg-icons";

// الأذكار المأثورة
const AZKAR_LIST = [
    { id: 1, text: "سُبْحَانَ اللهِ", target: 33 },
    { id: 2, text: "الْحَمْدُ لِلَّهِ", target: 33 },
    { id: 3, text: "اللهُ أَكْبَرُ", target: 33 },
    { id: 4, text: "لا إِلَهَ إِلاَّ اللهُ وَحْدَهُ لا شَرِيكَ لَهُ", target: 100 },
    { id: 5, text: "أَسْتَغْفِرُ اللهَ وَأَتُوبُ إِلَيْهِ", target: 100 },
    { id: 6, text: "اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ", target: 100 },
    { id: 7, text: "لا حَوْلَ وَلا قُوَّةَ إِلاَّ بِاللهِ الْعَلِيِّ الْعَظِيمِ", target: 100 },
    { id: 8, text: "سُبْحَانَ اللهِ وَبِحَمْدِهِ ، سُبْحَانَ اللهِ الْعَظِيمِ", target: 100 }
];

// خامات خرز السبحة الواقعية الفاخرة
const BEAD_THEMES = [
    {
        id: "amber",
        name: "عنبر ملكي 🟡",
        border: "border-amber-300",
        tasselBg: "from-amber-400 via-amber-600 to-amber-900",
        normalGradient: "radial-gradient(circle at 30% 25%, #fef9c3 0%, #f59e0b 35%, #b45309 70%, #451a03 100%)",
        activeGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #fef08a 25%, #f59e0b 60%, #78350f 100%)",
        separatorGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #fef08a 35%, #d97706 70%, #78350f 100%)",
        glow: "0 12px 24px rgba(245, 158, 11, 0.55)"
    },
    {
        id: "emerald",
        name: "زمرد ملكي 🟢",
        border: "border-primary-300",
        tasselBg: "from-primary-400 via-primary to-primary-950",
        normalGradient: "radial-gradient(circle at 30% 25%, #ecfdf5 0%, #449C40 35%, #15803d 70%, #022c22 100%)",
        activeGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #a7f3d0 25%, #449C40 60%, #064e3b 100%)",
        separatorGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #a7f3d0 35%, #10b981 70%, #064e3b 100%)",
        glow: "0 12px 24px rgba(68, 156, 64, 0.55)"
    },
    {
        id: "ebony",
        name: "أبنوس أسود 🌑",
        border: "border-zinc-400",
        tasselBg: "from-zinc-400 via-zinc-700 to-black",
        normalGradient: "radial-gradient(circle at 30% 25%, #f4f4f5 0%, #52525b 35%, #27272a 70%, #09090b 100%)",
        activeGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #e4e4e7 25%, #71717a 60%, #18181b 100%)",
        separatorGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #e4e4e7 35%, #71717a 70%, #18181b 100%)",
        glow: "0 12px 24px rgba(0, 0, 0, 0.75)"
    },
    {
        id: "pearl",
        name: "عاج لؤلؤي ⚪",
        border: "border-amber-400",
        tasselBg: "from-amber-300 via-amber-500 to-amber-800",
        normalGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #f8fafc 40%, #cbd5e1 75%, #475569 100%)",
        activeGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #fef08a 30%, #fbbf24 65%, #92400e 100%)",
        separatorGradient: "radial-gradient(circle at 30% 25%, #ffffff 0%, #fef08a 40%, #f59e0b 75%, #78350f 100%)",
        glow: "0 12px 24px rgba(251, 191, 36, 0.55)"
    }
];

export default function Tasbih() {
    const [savedTasbih, setSavedTasbih] = useLocalStorage(STORAGE_KEYS.TASBIH, 0);
    const [count, setCount] = useState(0);
    const [selectedZikr, setSelectedZikr] = useState(AZKAR_LIST[0]);
    const [theme, setTheme] = useState(BEAD_THEMES[0]);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [showCongrats, setShowCongrats] = useState(false);
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        if (typeof savedTasbih === "number") {
            setCount(savedTasbih);
        }
    }, [savedTasbih]);

    // صوت اصطدام وتصادم خرزتين حقيقيتين
    const playBeadImpactSound = useCallback(() => {
        if (!soundEnabled || typeof window === "undefined") return;
        try {
            const AudioContext = window.AudioContext || /** @type {any} */ (window).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            // صوت نقرة السطح المصقول
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = "sine";
            osc1.frequency.setValueAtTime(780, ctx.currentTime);
            osc1.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.038);
            gain1.gain.setValueAtTime(0.4, ctx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.038);
            osc1.connect(gain1);
            gain1.connect(ctx.destination);
            osc1.start();
            osc1.stop(ctx.currentTime + 0.038);

            // صوت صدى الرنين الخشبي/العقيقي
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = "triangle";
            osc2.frequency.setValueAtTime(350, ctx.currentTime);
            osc2.frequency.exponentialRampToValueAtTime(115, ctx.currentTime + 0.045);
            gain2.gain.setValueAtTime(0.24, ctx.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start();
            osc2.stop(ctx.currentTime + 0.045);
        } catch (e) { }
    }, [soundEnabled]);

    // اهتزاز لمسي واقعي بالجوال
    const triggerHaptic = useCallback(() => {
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate([24, 14, 20]);
        }
    }, []);

    // حلب وسحب الخرزة الحالية مع ارتداد فيزيائي وتمرير التالية
    const handlePullBead = useCallback(() => {
        const nextCount = count + 1;
        setCount(nextCount);
        setSavedTasbih(nextCount);
        setIsPressed(true);

        playBeadImpactSound();
        triggerHaptic();

        setTimeout(() => setIsPressed(false), 260);

        if (selectedZikr.target > 0 && nextCount % selectedZikr.target === 0) {
            setShowCongrats(true);
            setTimeout(() => setShowCongrats(false), 3000);
        }
    }, [count, selectedZikr.target, setSavedTasbih, playBeadImpactSound, triggerHaptic]);

    // دعم زر المسافة على الكيبورد
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === "Space" || e.key === " ") {
                e.preventDefault();
                handlePullBead();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePullBead]);

    const handleReset = () => {
        setCount(0);
        setSavedTasbih(0);
        setShowResetConfirm(false);
    };

    const currentZikrCount = selectedZikr.target > 0 ? (count % selectedZikr.target) : count;
    const rounds = selectedZikr.target > 0 ? Math.floor(count / selectedZikr.target) : 0;
    const progressPercent = selectedZikr.target > 0
        ? Math.min(100, Math.round((currentZikrCount / selectedZikr.target) * 100))
        : 0;

    // زاوية التدوير الفيزيائي لخرز عقد السبحة (33 خرزة)
    const angleStep = 360 / 33;
    const rotationAngle = count * angleStep;

    return (
        <>
            <Landing
                title="السبحة اليدوية الحقيقية"
                text="استشعر روعة الذكر مع سبحة يد ذات خرز معزول وواضح، وحركة انزلاق فيزيائية واقعية عند كل تسبيحة"
            />

            <section className="py-8 md:py-12 relative bg-transparent overflow-hidden rtl select-none">
                {/* إضاءة خلفية ناعمة */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 dark:bg-lime-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

                <div className="container mx-auto px-4 max-w-5xl">

                    {/* 1. اختيار الذكر وخامة الخرز */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                        {/* الأذكار */}
                        <div className="lg:col-span-8">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <span className="text-xs font-black text-primary dark:text-primary-400 flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faStar} />
                                    <span>اختر الذكر المبارك:</span>
                                </span>
                                <span className="text-xs font-bold text-gray-500 dark:text-zinc-400">
                                    الهدف: <strong className="text-primary dark:text-primary-400">{selectedZikr.target} مرة</strong>
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {AZKAR_LIST.map((z) => {
                                    const isSelected = selectedZikr.id === z.id;
                                    return (
                                        <button
                                            key={z.id}
                                            onClick={() => setSelectedZikr(z)}
                                            className={`p-3 rounded-2xl text-right transition-all border text-xs font-bold flex flex-col justify-between h-20 ${isSelected
                                                ? "bg-primary text-white border-transparent shadow-md"
                                                : "bg-white dark:bg-zinc-950 text-gray-800 dark:text-zinc-200 border-gray-200/80 dark:border-zinc-800 hover:border-primary/40"
                                                }`}
                                        >
                                            <span className="leading-tight line-clamp-2">{z.text}</span>
                                            <span className={`text-[10px] self-start px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-primary/10 dark:bg-lime-950/40 text-primary dark:text-primary-400"
                                                }`}>
                                                {z.target} مرة
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* خامات الخرز الفاخرة */}
                        <div className="lg:col-span-4 flex flex-col justify-between">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <span className="text-xs font-black text-primary dark:text-primary-400 flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faPalette} />
                                    <span>خامة ونوع الخرز:</span>
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 h-full">
                                {BEAD_THEMES.map((t) => {
                                    const isSelected = theme.id === t.id;
                                    return (
                                        <button
                                            key={t.id}
                                            onClick={() => setTheme(t)}
                                            className={`p-3 rounded-2xl border text-xs font-black flex items-center gap-2.5 transition-all ${isSelected
                                                ? "bg-white dark:bg-zinc-950 border-primary dark:border-primary-400 shadow-md"
                                                : "bg-white/60 dark:bg-zinc-950/60 border-gray-200 dark:border-zinc-800 opacity-70 hover:opacity-100"
                                                }`}
                                        >
                                            <div
                                                className="w-7 h-7 rounded-full shadow-inner border shrink-0"
                                                style={{ background: t.normalGradient }}
                                            />
                                            <span className="text-gray-900 dark:text-white">{t.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* 2. شريط الخيارات السريعة */}
                    <div className="flex items-center justify-between max-w-xl mx-auto mb-6 px-2">
                        <button
                            onClick={() => setSoundEnabled(!soundEnabled)}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm border transition-all ${soundEnabled
                                ? "bg-primary/10 dark:bg-lime-950/40 text-primary dark:text-primary-400 border-primary/20"
                                : "bg-gray-100 dark:bg-zinc-900 text-gray-400 border-gray-200 dark:border-zinc-800"
                                }`}
                            title={soundEnabled ? "كتم الصوت" : "تشغيل الصوت"}
                        >
                            <FontAwesomeIcon icon={soundEnabled ? faVolumeHigh : faVolumeXmark} />
                        </button>

                        <div className="text-center">
                            <h3 className="text-sm font-black text-gray-900 dark:text-white">{selectedZikr.text}</h3>
                        </div>

                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="px-3.5 py-2 rounded-xl text-xs font-black bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/30 hover:bg-rose-100 transition-all flex items-center gap-1.5"
                        >
                            <FontAwesomeIcon icon={faRotateLeft} />
                            <span>تصفير</span>
                        </button>
                    </div>

                    {/* 3. مسرح السبحة اليدوية الحقيقية بخرزة معزولة ومسافات واضحة Real Handheld Misbaha Stage */}
                    <div className="relative flex flex-col items-center justify-center py-4">

                        <div
                            onClick={handlePullBead}
                            className="relative w-full max-w-md h-[510px] rounded-3xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md border border-gray-200/80 dark:border-zinc-800/80 shadow-2xl flex flex-col items-center justify-between p-6 overflow-hidden cursor-pointer group"
                        >
                            {/* شارة إرشادية علوية */}
                            <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 dark:bg-lime-950/40 text-primary dark:text-primary-400 border border-primary/20 text-[11px] font-black">
                                <FontAwesomeIcon icon={faHandPointer} className="animate-bounce" />
                                <span>اضغط لسحب وتمرير الخرزة</span>
                            </div>

                            {/* شارة العداد في الزاوية العلوية اليسرى */}
                            <div className="absolute top-4 left-4 z-30 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-md text-right">
                                <div className="text-[10px] font-bold text-gray-400">العدد الحالى</div>
                                <div className="text-xl font-black text-primary dark:text-primary-400 font-mono leading-none">{count}</div>
                                <div className="text-[9px] font-bold text-gray-500 mt-1">دورة {rounds} ({currentZikrCount}/{selectedZikr.target})</div>
                            </div>

                            {/* 1. المئذنة والشرابة الحريرية المتأرجحة Golden Minaret & Silk Tassel */}
                            <motion.div
                                animate={{
                                    rotate: isPressed ? [0, -12, 10, -6, 0] : 0,
                                    y: isPressed ? [0, 6, 0] : 0
                                }}
                                transition={{ type: "spring", stiffness: 350, damping: 16 }}
                                className="absolute top-4 z-30 flex flex-col items-center pointer-events-none origin-top"
                            >
                                <div className="w-8.5 h-12 rounded-t-full bg-gradient-to-b from-amber-200 via-amber-400 to-amber-700 shadow-xl border border-amber-200/90 flex flex-col items-center justify-center relative">
                                    <div className="w-3 h-6 bg-amber-950/70 rounded-full"></div>
                                    <div className="absolute -bottom-1 w-10 h-2 bg-amber-300 rounded-full border border-amber-500 shadow-xs"></div>
                                </div>
                                <div className="w-10 h-3 bg-amber-950 rounded-full my-1 border border-amber-400 shadow-md"></div>
                                <div className={`w-9 h-18 bg-gradient-to-b ${theme.tasselBg} rounded-b-2xl shadow-2xl border-t-2 border-amber-300 opacity-95 relative overflow-hidden`}>
                                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_2px,rgba(255,255,255,0.25)_2px)] [background-size:4px_100%]"></div>
                                </div>
                            </motion.div>

                            {/* 2. منطقة الخرزة الحالية المعزولة تماماً (Isolated Focal Active Bead Slot) */}
                            <div className="relative mt-28 z-20 flex flex-col items-center justify-center pointer-events-none">
                                {/* مؤشر العزل والتسبيح الضوئي */}
                                <div className="text-[10px] font-black text-amber-600 dark:text-amber-400 mb-1.5 px-3 py-0.5 rounded-full bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300/60 shadow-xs">
                                    الخرزة الحالية (اضغط لسحبها)
                                </div>

                                {/* الخرزة النشطة المعزولة Extra Large Isolated Active Bead */}
                                <motion.div
                                    animate={{
                                        y: isPressed ? [0, 40, 0] : 0,
                                        scale: isPressed ? [1.25, 0.9, 1.25] : 1.25,
                                        rotate: isPressed ? [0, 15, -10, 0] : 0
                                    }}
                                    transition={{ type: "spring", stiffness: 450, damping: 18 }}
                                    className="relative w-14 h-14 rounded-full border-2 border-amber-300 shadow-2xl flex items-center justify-center ring-4 ring-amber-400/40"
                                    style={{
                                        background: theme.activeGradient,
                                        boxShadow: theme.glow
                                    }}
                                >
                                    {/* لمعة كروية ساطعة 3D Highlight */}
                                    <div className="w-4 h-2.5 bg-white/95 rounded-full absolute top-1.5 left-2.5 blur-[0.3px]"></div>
                                    <div className="w-2 h-1.5 bg-white/60 rounded-full absolute bottom-2 right-3 blur-[0.2px]"></div>
                                </motion.div>
                            </div>

                            {/* 3. باقي عقد السبحة مع مسافات واضحة بين الخرز (Spaced Bead Loop Strand) */}
                            <div className="relative w-full h-[230px] flex items-center justify-center pointer-events-none mt-2">
                                <motion.div
                                    animate={{
                                        rotate: -rotationAngle,
                                        scale: isPressed ? [1, 1.02, 0.98, 1] : 1
                                    }}
                                    transition={{
                                        rotate: { type: "spring", stiffness: 280, damping: 22 },
                                        scale: { duration: 0.2 }
                                    }}
                                    className="relative w-[340px] h-[220px] rounded-[50%] flex items-center justify-center"
                                >
                                    {/* خيط السبحة الحريري الرأسي والمنحني */}
                                    <div className="absolute inset-1 rounded-[50%] border-4 border-amber-800/40 shadow-inner"></div>

                                    {/* الخرزات الـ 33 الموزعة بمسافات واضحة وعزل هندسي متناسق */}
                                    {[...Array(33)].map((_, i) => {
                                        const angle = (i * 360) / 33;
                                        const radiusX = 145; // Polar X radius
                                        const radiusY = 95;  // Polar Y radius
                                        const rad = (angle * Math.PI) / 180;
                                        const x = radiusX * Math.cos(rad);
                                        const y = radiusY * Math.sin(rad);

                                        // الشواهد بين كل 11 خرزة (الخرزة 0، 11، 22)
                                        const isSeparator = i === 0 || i === 11 || i === 22;

                                        return (
                                            <div
                                                key={i}
                                                className={`absolute rounded-full flex items-center justify-center transition-transform ${isSeparator
                                                    ? "w-9 h-9 border-2 border-amber-200 z-20 scale-110 shadow-2xl"
                                                    : "w-7 h-7 border border-white/70 z-10 shadow-lg"
                                                    }`}
                                                style={{
                                                    transform: `translate(${x}px, ${y}px)`,
                                                    background: isSeparator
                                                        ? theme.separatorGradient
                                                        : theme.normalGradient,
                                                    boxShadow: theme.glow
                                                }}
                                            >
                                                {/* لمعة كروية ساطعة فوق كل خرزة */}
                                                <div className="w-2.5 h-1.5 bg-white/90 rounded-full absolute top-1 left-1.5 blur-[0.3px]"></div>
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            </div>

                        </div>

                        {/* إرشادات الكيبورد */}
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-zinc-400 bg-white/60 dark:bg-zinc-900/60 px-4 py-2 rounded-full border border-gray-200/60 dark:border-zinc-800">
                            <FontAwesomeIcon icon={faKeyboard} className="text-primary dark:text-primary-400" />
                            <span>يمكنك سحب الخرز بالضغط على زر <strong>المسافة (Space)</strong> على الكيبورد!</span>
                        </div>
                    </div>

                    {/* 4. كروت الإحصائيات للإنجاز */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-gray-200/80 dark:border-zinc-800 text-center shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-950/40 text-primary dark:text-primary-400 flex items-center justify-center mx-auto mb-2 text-lg">
                                <FontAwesomeIcon icon={faBullseye} />
                            </div>
                            <div className="text-2xl font-black text-gray-900 dark:text-white font-mono">{count}</div>
                            <div className="text-xs font-bold text-gray-500 dark:text-zinc-400 mt-0.5">إجمالي التسبيحات</div>
                        </div>

                        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-gray-200/80 dark:border-zinc-800 text-center shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary flex items-center justify-center mx-auto mb-2 text-lg">
                                <FontAwesomeIcon icon={faChartPie} />
                            </div>
                            <div className="text-2xl font-black text-gray-900 dark:text-white font-mono">{rounds}</div>
                            <div className="text-xs font-bold text-gray-500 dark:text-zinc-400 mt-0.5">الدورات المكتملة ({selectedZikr.target})</div>
                        </div>

                        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-gray-200/80 dark:border-zinc-800 text-center shadow-xs">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-2 text-lg">
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className="text-2xl font-black text-gray-900 dark:text-white font-mono">{progressPercent}%</div>
                            <div className="text-xs font-bold text-gray-500 dark:text-zinc-400 mt-0.5">نسبة الإنجاز للهدف</div>
                        </div>
                    </div>

                </div>
            </section>

            {/* 5. نافذة التهنئة التلقائية عند اكتمال الهدف */}
            <AnimatePresence>
                {showCongrats && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-primary-700 to-lime-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-lime-300/40 rtl"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl shrink-0">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                        <div>
                            <h4 className="text-sm font-black">تقبل الله طاعتك! 🎉</h4>
                            <p className="text-xs text-lime-100 font-bold">أتممت {selectedZikr.target} تسبيحة بنجاح من {selectedZikr.text}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 6. نافذة تأكيد تصفير العداد */}
            <AnimatePresence>
                {showResetConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm rtl" onClick={() => setShowResetConfirm(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white dark:bg-zinc-950 rounded-3xl p-6 max-w-sm w-full text-center border border-gray-200 dark:border-zinc-800 shadow-2xl space-y-4"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto text-xl">
                                <FontAwesomeIcon icon={faRotateLeft} />
                            </div>

                            <div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white">تصفير العداد</h3>
                                <p className="text-xs font-bold text-gray-500 dark:text-zinc-400 mt-1">هل أنت تأكد من رغبتك في إعادة العداد إلى 0؟</p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-md transition-all"
                                >
                                    نعم، اصفر العداد
                                </button>
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 font-bold text-xs hover:bg-gray-200 transition-all"
                                >
                                    إلغاء
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
