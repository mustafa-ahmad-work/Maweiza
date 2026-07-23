"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight,
    faChevronRight,
    faChevronLeft,
    faSearch,
    faPlay,
    faPause,
    faCopy,
    faCheck,
    faBookOpen,
    faInfoCircle,
    faQuran,
    faList,
    faTimes,
    faVolumeUp,
    faLayerGroup,
    faShareAlt,
    faSparkles
} from "@fortawesome/free-solid-svg-icons";

export default function TafsirAyahs({ id }) {
    const surahId = parseInt(id, 10) || 1;

    // جلب البيانات من المراجع المعتمدة
    const { data: surahRes, error: surahError } = useSWR(`https://api.alquran.cloud/v1/surah/${surahId}`);
    const { data: tafsirRes, error: tafsirError } = useSWR(`https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${surahId}`);
    const { data: albitaqatData, error: albitaqatError } = useSWR(
        `https://raw.githubusercontent.com/Alsarmad/albitaqat_quran/main/albitaqat.json`
    );

    // الحالات المحلية
    const [selectedAyahIndex, setSelectedAyahIndex] = useState(null);
    const [viewMode, setViewMode] = useState("mushaf"); // "mushaf" | "cards" | "info"
    const [searchQuery, setSearchQuery] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudioUrl, setCurrentAudioUrl] = useState(null);
    const [copiedType, setCopiedType] = useState(null); // "ayah" | "tafsir"
    const audioRef = useRef(null);

    const surahData = surahRes?.data;
    const tafsirList = tafsirRes?.result || [];
    const albitaqat = albitaqatData?.[surahId - 1] || {};

    // السورة السابقة والتالية
    const prevSurahId = surahId > 1 ? surahId - 1 : null;
    const nextSurahId = surahId < 114 ? surahId + 1 : null;

    // تصفية الآيات حسب البحث
    const filteredAyahs = tafsirList.filter((aya) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.trim().toLowerCase();
        return (
            aya.aya.toString().includes(q) ||
            aya.arabic_text.includes(q) ||
            aya.translation.includes(q)
        );
    });

    // التحكم في الصوت عند اختيار آية
    const playAudio = (globalAyahId) => {
        const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalAyahId}.mp3`;
        if (currentAudioUrl === audioUrl && isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            setCurrentAudioUrl(audioUrl);
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.play().catch(() => setIsPlaying(false));
            }
        }
    };

    const handleAudioEnded = () => {
        setIsPlaying(false);
    };

    // نسخ النص للحافظة
    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopiedType(type);
        setTimeout(() => setCopiedType(null), 2000);
    };

    // التحكم بالمودال عن طريق مفاتيح الكيبورد
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedAyahIndex === null) return;
            if (e.key === "Escape") {
                setSelectedAyahIndex(null);
                setIsPlaying(false);
            } else if (e.key === "ArrowLeft") {
                if (selectedAyahIndex < tafsirList.length - 1) {
                    setSelectedAyahIndex(selectedAyahIndex + 1);
                    setIsPlaying(false);
                }
            } else if (e.key === "ArrowRight") {
                if (selectedAyahIndex > 0) {
                    setSelectedAyahIndex(selectedAyahIndex - 1);
                    setIsPlaying(false);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedAyahIndex, tafsirList.length]);

    // الإيقاف التلقائي للصوت عند إغلاق المودال
    const handleCloseModal = () => {
        setSelectedAyahIndex(null);
        if (audioRef.current) {
            audioRef.current.pause();
        }
        setIsPlaying(false);
    };

    if (surahError || tafsirError || albitaqatError) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6" dir="rtl">
                <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 text-2xl">
                    <FontAwesomeIcon icon={faInfoCircle} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">تعذر تحميل التفسير</h3>
                <p className="text-sm text-gray-500 dark:text-zinc-400 max-w-md mb-6">
                    يرجى التحقق من اتصالك بالإنترنت ثم إعادة المحاولة.
                </p>
                <Link
                    href="/tafsir"
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-alt transition-all flex items-center gap-2"
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                    <span>العودة لقائمة السور</span>
                </Link>
            </div>
        );
    }

    if (!surahRes || !tafsirRes || !albitaqatData) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-24" dir="rtl">
                <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
                <p className="text-base font-bold text-gray-700 dark:text-zinc-300">جارٍ تحميل التفسير الميسر والمعلومات...</p>
                <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">سورة رقم {surahId}</p>
            </div>
        );
    }

    const activeAyah = selectedAyahIndex !== null ? tafsirList[selectedAyahIndex] : null;

    return (
        <main className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 text-gray-900 dark:text-white pb-20 pt-6" dir="rtl">
            {/* مشغل الصوت الخفي */}
            <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />

            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* 1. الشريط العلوي للتنقل بين السور */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200/80 dark:border-zinc-800 shadow-xs">
                    <Link
                        href="/tafsir"
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-gray-700 dark:text-zinc-300 hover:text-primary dark:hover:text-lime-400 transition-colors"
                    >
                        <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                        <span>فهرس سور التفسير</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        {prevSurahId ? (
                            <Link
                                href={`/tafsir/${prevSurahId}`}
                                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-700 dark:text-zinc-200 hover:text-primary dark:hover:text-lime-400 text-xs font-bold transition-all flex items-center gap-1.5"
                            >
                                <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
                                <span>السورة السابقة</span>
                            </Link>
                        ) : (
                            <span className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900 text-gray-300 dark:text-zinc-700 text-xs font-bold cursor-not-allowed">
                                السورة السابقة
                            </span>
                        )}

                        {nextSurahId ? (
                            <Link
                                href={`/tafsir/${nextSurahId}`}
                                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-700 dark:text-zinc-200 hover:text-primary dark:hover:text-lime-400 text-xs font-bold transition-all flex items-center gap-1.5"
                            >
                                <span>السورة التالية</span>
                                <FontAwesomeIcon icon={faChevronLeft} className="text-[10px]" />
                            </Link>
                        ) : (
                            <span className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-zinc-900 text-gray-300 dark:text-zinc-700 text-xs font-bold cursor-not-allowed">
                                السورة التالية
                            </span>
                        )}
                    </div>
                </div>

                {/* 2. هيرو السورة والمعلومات الأساسية */}
                <div className="relative rounded-3xl bg-gradient-to-br from-primary via-primary-alt to-emerald-900 text-white p-6 md:p-10 mb-10 overflow-hidden shadow-lg border border-primary/20">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10 text-center space-y-4">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-lime-200 text-xs font-black border border-white/20">
                            سورة رقم {surahData?.number || surahId} في المصحف الشريف
                        </span>

                        <h1 className="text-4xl md:text-6xl font-black font-quran tracking-wide text-white drop-shadow-sm">
                            {surahData?.name || `سورة ${surahId}`}
                        </h1>

                        <p className="text-xs md:text-sm text-lime-100/90 font-semibold max-w-lg mx-auto">
                            التفسير الميسر مع بطاقة معلومات شاملة وفهم تدبر الألفاظ والمعاني
                        </p>

                        {/* الشارات السريعة */}
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <span className="px-3.5 py-1.5 rounded-xl bg-black/20 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                                عدد الآيات: {surahData?.numberOfAyahs || tafsirList.length}
                            </span>
                            <span className="px-3.5 py-1.5 rounded-xl bg-black/20 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                                نوع السورة: {surahData?.revelationType === "Meccan" ? "مكّية" : "مدنيّة"}
                            </span>
                            {albitaqat.maqsiduha_aleamu && (
                                <span className="px-3.5 py-1.5 rounded-xl bg-lime-400/20 text-lime-200 text-xs font-bold border border-lime-400/30">
                                    مقصدها: {albitaqat.maqsiduha_aleamu}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. شريط التحكم بأوضاع العرض والبحث */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    {/* أزرار التبديل بين الأوضاع */}
                    <div className="flex items-center p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-xs w-full md:w-auto">
                        <button
                            onClick={() => setViewMode("mushaf")}
                            className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "mushaf"
                                ? "bg-primary text-white shadow-sm"
                                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            <FontAwesomeIcon icon={faQuran} />
                            <span>قراءة المصحف وتفسيره</span>
                        </button>

                        <button
                            onClick={() => setViewMode("cards")}
                            className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "cards"
                                ? "bg-primary text-white shadow-sm"
                                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            <FontAwesomeIcon icon={faList} />
                            <span>عرض الآية مع التفسير</span>
                        </button>

                        <button
                            onClick={() => setViewMode("info")}
                            className={`flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === "info"
                                ? "bg-primary text-white shadow-sm"
                                : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            <FontAwesomeIcon icon={faBookOpen} />
                            <span>بطاقة السورة (المعلومات)</span>
                        </button>
                    </div>

                    {/* حقل البحث السريع في الآيات */}
                    {viewMode !== "info" && (
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="بحث برقم الآية أو الكلمة..."
                                className="w-full pl-4 pr-10 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 text-xs md:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-primary dark:focus:border-lime-400 transition-all shadow-xs"
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500 text-sm pointer-events-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* 4. محتوى وضع 1: بطاقة السورة الشاملة */}
                {viewMode === "info" && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { label: "عدد آياتها", val: albitaqat.ayaatiha || `${surahData?.numberOfAyahs} آية`, icon: faLayerGroup, color: "emerald" },
                                { label: "معنى اسم السورة", val: albitaqat.maeni_asamuha, icon: faInfoCircle, color: "blue" },
                                { label: "سبب تسميتها", val: albitaqat.sabab_tasmiatiha, icon: faBookOpen, color: "amber" },
                                { label: "أسماؤها المشهورة", val: albitaqat.asmawuha, icon: faQuran, color: "purple" },
                                { label: "مقصدها العام", val: albitaqat.maqsiduha_aleamu, icon: faSparkles, color: "rose" },
                                { label: "سبب نزولها", val: albitaqat.sabab_nuzuliha, icon: faInfoCircle, color: "teal" },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 shadow-xs space-y-3 relative overflow-hidden group hover:border-primary/30 dark:hover:border-lime-400/30 transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-lime-400 flex items-center justify-center shrink-0">
                                            <FontAwesomeIcon icon={item.icon} className="text-lg" />
                                        </div>
                                        <h3 className="text-base font-black text-gray-900 dark:text-white">
                                            {item.label}
                                        </h3>
                                    </div>
                                    <p className="text-xs md:text-sm text-gray-700 dark:text-zinc-300 leading-[1.85] font-semibold pr-2 border-r-2 border-primary/20 dark:border-lime-400/20">
                                        {item.val || "لم تذكر رواية مخصصة أو معلومة محددة."}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* 5. محتوى وضع 2: المصحف المتصل التفاعلي */}
                {viewMode === "mushaf" && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-12 shadow-sm relative overflow-hidden"
                    >
                        {/* ترويسة البسملة */}
                        {surahId !== 9 && (
                            <div className="text-center mb-10 pb-6 border-b border-gray-100 dark:border-zinc-800">
                                <h3 className="font-quran text-2xl md:text-3xl text-primary dark:text-lime-400 leading-normal">
                                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                </h3>
                            </div>
                        )}

                        <div className="mb-6 text-center">
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40 text-xs font-bold">
                                <FontAwesomeIcon icon={faInfoCircle} />
                                <span>اضغط على أي آية لعرض تفسيرها والاستماع لتلاوتها</span>
                            </span>
                        </div>

                        {/* نص الآيات المتصل */}
                        <div className="text-right font-quran text-2xl md:text-3xl text-gray-900 dark:text-white select-none">
                            {filteredAyahs.length === 0 ? (
                                <p className="text-center text-sm font-sans text-gray-500 py-10">لا توجد نتائج مطابقة للبحث.</p>
                            ) : (
                                <p className="whitespace-normal break-words leading-[4rem] md:leading-[5rem] tracking-wide font-quran text-3xl md:text-4xl text-gray-900 dark:text-white">
                                    {filteredAyahs.map((aya, idx) => {
                                        const actualIndex = tafsirList.findIndex((item) => item.aya === aya.aya);
                                        return (
                                            <motion.span
                                                key={idx}
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.96 }}
                                                onClick={() => setSelectedAyahIndex(actualIndex)}
                                                className="cursor-pointer select-none transition-all font-quran !text-gray-900 dark:!text-gray-100 hover:!text-emerald-600 dark:hover:!text-emerald-400"
                                            >
                                                {aya.arabic_text}
                                                <span
                                                    className="inline-flex items-center font-cairo justify-center mx-2 text-base md:text-lg font-quran font-bold
                                                !text-emerald-800 dark:!text-emerald-400
                                                !border-2 !border-emerald-600 dark:!border-emerald-500
                                                !rounded-full min-w-[2.7rem] min-h-[2.7rem] px-2 py-1
                                                !bg-emerald-50 dark:!bg-emerald-900/40
                                                !shadow-md dark:!shadow-emerald-950/30
                                                relative
                                                after:content-['۝'] after:absolute after:inset-0 after:flex after:items-center after:justify-center
                                                after:!text-emerald-700 dark:after:!text-emerald-600 after:!opacity-15"
                                                >
                                                    <span className="relative z-10">{aya.aya}</span>
                                                </span>{" "}
                                            </motion.span>
                                        );
                                    })}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* 6. محتوى وضع 3: قائمة الآيات والتفسير المباشر (Cards View) */}
                {viewMode === "cards" && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {filteredAyahs.length === 0 ? (
                            <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800">
                                <p className="text-sm font-semibold text-gray-500">لا توجد آية مطابقة للبحث.</p>
                            </div>
                        ) : (
                            filteredAyahs.map((aya, idx) => {
                                const actualIndex = tafsirList.findIndex((item) => item.aya === aya.aya);
                                return (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-5 hover:border-primary/30 dark:hover:border-lime-400/30 transition-all"
                                    >
                                        {/* رأس الآية والخيارات */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="w-9 h-9 rounded-xl bg-primary text-white font-black text-xs md:text-sm flex items-center justify-center shadow-xs">
                                                    {aya.aya}
                                                </span>
                                                <span className="text-xs font-bold text-gray-500 dark:text-zinc-400">
                                                    الآية {aya.aya} من {surahData?.name}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => playAudio(aya.id)}
                                                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-700 dark:text-zinc-200 hover:text-primary dark:hover:text-lime-400 text-xs font-bold transition-all flex items-center gap-1.5"
                                                    title="استماع للآية"
                                                >
                                                    <FontAwesomeIcon icon={isPlaying && currentAudioUrl?.endsWith(`${aya.id}.mp3`) ? faPause : faVolumeUp} />
                                                    <span>استماع</span>
                                                </button>

                                                <button
                                                    onClick={() => handleCopy(aya.arabic_text, `ayah-${aya.aya}`)}
                                                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-primary/10 dark:hover:bg-primary/20 text-gray-700 dark:text-zinc-200 hover:text-primary dark:hover:text-lime-400 text-xs font-bold transition-all flex items-center gap-1.5"
                                                    title="نسخ نص الآية"
                                                >
                                                    <FontAwesomeIcon icon={copiedType === `ayah-${aya.aya}` ? faCheck : faCopy} className={copiedType === `ayah-${aya.aya}` ? "text-emerald-500" : ""} />
                                                    <span>{copiedType === `ayah-${aya.aya}` ? "تم النسخ" : "نسخ الآية"}</span>
                                                </button>

                                                <button
                                                    onClick={() => setSelectedAyahIndex(actualIndex)}
                                                    className="px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary dark:text-lime-400 text-xs font-bold hover:bg-primary hover:text-white dark:hover:bg-lime-400 dark:hover:text-zinc-950 transition-all"
                                                >
                                                    تكبير التفسير
                                                </button>
                                            </div>
                                        </div>

                                        {/* نص الآية القرآني */}
                                        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-950/60 border border-gray-100 dark:border-zinc-800/80">
                                            <p className="font-quran text-2xl md:text-3xl text-gray-900 dark:text-white leading-[3rem] text-right">
                                                {aya.arabic_text}
                                                <span
                                                    className="inline-flex items-center font-cairo justify-center mx-2 text-base md:text-lg font-quran font-bold
                                                !text-emerald-800 dark:!text-emerald-400
                                                !border-2 !border-emerald-600 dark:!border-emerald-500
                                                !rounded-full min-w-[2.7rem] min-h-[2.7rem] px-2 py-1
                                                !bg-emerald-50 dark:!bg-emerald-900/40
                                                !shadow-md dark:!shadow-emerald-950/30
                                                relative
                                                after:content-['۝'] after:absolute after:inset-0 after:flex after:items-center after:justify-center
                                                after:!text-emerald-700 dark:after:!text-emerald-600 after:!opacity-15"
                                                >
                                                    <span className="relative z-10">{aya.aya}</span>
                                                </span>
                                            </p>
                                        </div>

                                        {/* التفسير الميسر */}
                                        <div className="space-y-1.5">
                                            <h5 className="text-xs font-black text-primary dark:text-lime-400 flex items-center gap-1.5">
                                                <FontAwesomeIcon icon={faBookOpen} />
                                                <span>التفسير الميسر:</span>
                                            </h5>
                                            <p className="text-xs md:text-sm text-gray-700 dark:text-zinc-300 leading-[1.85] font-semibold">
                                                {aya.translation}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </motion.div>
                )}

                {/* 7. مودال التفسير التفصيلي والمشغل الصوتي المتقدم */}
                <AnimatePresence>
                    {activeAyah && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
                            {/* الخلفية المعتمة */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={handleCloseModal}
                                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                            />

                            {/* نافذة المودال الرئيسية */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", duration: 0.3 }}
                                className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
                            >
                                {/* ترويسة المودال */}
                                <div className="p-5 md:p-6 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between bg-slate-50/80 dark:bg-zinc-900/80 shrink-0">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-2xl bg-primary text-white font-black text-sm flex items-center justify-center shadow-xs">
                                            {activeAyah.aya}
                                        </span>
                                        <div>
                                            <h3 className="text-base md:text-lg font-black text-gray-900 dark:text-white">
                                                التفسير الميسر - {surahData?.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-zinc-400 font-semibold">
                                                الآية {activeAyah.aya} من إجمالي {tafsirList.length} آية
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCloseModal}
                                        className="w-9 h-9 rounded-xl bg-gray-200/60 dark:bg-zinc-800 hover:bg-red-500 hover:text-white text-gray-600 dark:text-zinc-300 transition-all flex items-center justify-center"
                                        aria-label="إغلاق"
                                    >
                                        <FontAwesomeIcon icon={faTimes} className="text-sm" />
                                    </button>
                                </div>

                                {/* جسم المودال القابل للتمرير */}
                                <div className="p-6 md:p-8 space-y-6 overflow-y-auto custom-scrollbar">

                                    {/* نص الآية القرآني في المودال */}
                                    <div className="p-6 rounded-2xl bg-lime-50/60 dark:bg-lime-950/20 border border-lime-200/60 dark:border-lime-900/30 text-center space-y-4">
                                        <p className="font-quran text-2xl md:text-4xl text-gray-900 dark:text-white leading-[3rem] md:leading-[4.2rem]">
                                            {activeAyah.arabic_text}
                                            <span
                                                className="inline-flex items-center font-cairo justify-center mx-2 text-base md:text-lg font-quran font-bold
                                            !text-emerald-800 dark:!text-emerald-400
                                            !border-2 !border-emerald-600 dark:!border-emerald-500
                                            !rounded-full min-w-[2.7rem] min-h-[2.7rem] px-2 py-1
                                            !bg-emerald-50 dark:!bg-emerald-900/40
                                            !shadow-md dark:!shadow-emerald-950/30
                                            relative
                                            after:content-['۝'] after:absolute after:inset-0 after:flex after:items-center after:justify-center
                                            after:!text-emerald-700 dark:after:!text-emerald-600 after:!opacity-15"
                                            >
                                                <span className="relative z-10">{activeAyah.aya}</span>
                                            </span>
                                        </p>

                                        {/* أدوات السماع والنسخ */}
                                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                                            <button
                                                onClick={() => playAudio(activeAyah.id)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${isPlaying && currentAudioUrl?.endsWith(`${activeAyah.id}.mp3`)
                                                    ? "bg-amber-500 text-white shadow-md animate-pulse"
                                                    : "bg-primary hover:bg-primary-alt text-white shadow-xs"
                                                    }`}
                                            >
                                                <FontAwesomeIcon icon={isPlaying && currentAudioUrl?.endsWith(`${activeAyah.id}.mp3`) ? faPause : faPlay} />
                                                <span>{isPlaying && currentAudioUrl?.endsWith(`${activeAyah.id}.mp3`) ? "إيقاف التلاوة" : "استماع بصوت الحصري"}</span>
                                            </button>

                                            <button
                                                onClick={() => handleCopy(activeAyah.arabic_text, "modal-ayah")}
                                                className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-lime-400 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs"
                                            >
                                                <FontAwesomeIcon icon={copiedType === "modal-ayah" ? faCheck : faCopy} className={copiedType === "modal-ayah" ? "text-emerald-500" : ""} />
                                                <span>{copiedType === "modal-ayah" ? "تم نسخ الآية" : "نسخ الآية"}</span>
                                            </button>

                                            <button
                                                onClick={() => handleCopy(`${activeAyah.arabic_text}\n\nالتفسير الميسر:\n${activeAyah.translation}`, "modal-full")}
                                                className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-zinc-200 hover:text-primary dark:hover:text-lime-400 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs"
                                            >
                                                <FontAwesomeIcon icon={copiedType === "modal-full" ? faCheck : faShareAlt} className={copiedType === "modal-full" ? "text-emerald-500" : ""} />
                                                <span>{copiedType === "modal-full" ? "تم نسخ الآية والتفسير" : "مشاركة الآية والتفسير"}</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* نص التفسير الميسر */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-black text-primary dark:text-lime-400 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBookOpen} />
                                            <span>التفسير الميسر للآية:</span>
                                        </h4>
                                        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950/70 border border-gray-200/70 dark:border-zinc-800">
                                            <p className="text-sm md:text-base text-gray-800 dark:text-zinc-200 leading-[1.9] font-semibold">
                                                {activeAyah.translation}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* أسفل المودال: زر التنقل بين الآيات */}
                                <div className="p-4 border-t border-gray-100 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-900/80 flex items-center justify-between shrink-0">
                                    <button
                                        disabled={selectedAyahIndex === 0}
                                        onClick={() => {
                                            setSelectedAyahIndex(selectedAyahIndex - 1);
                                            setIsPlaying(false);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-bold text-gray-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-lime-400 transition-all flex items-center gap-1.5"
                                    >
                                        <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                                        <span>الآية السابقة</span>
                                    </button>

                                    <span className="text-xs font-bold text-gray-500 dark:text-zinc-400">
                                        {selectedAyahIndex + 1} / {tafsirList.length}
                                    </span>

                                    <button
                                        disabled={selectedAyahIndex === tafsirList.length - 1}
                                        onClick={() => {
                                            setSelectedAyahIndex(selectedAyahIndex + 1);
                                            setIsPlaying(false);
                                        }}
                                        className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-xs font-bold text-gray-700 dark:text-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary dark:hover:text-lime-400 transition-all flex items-center gap-1.5"
                                    >
                                        <span>الآية التالية</span>
                                        <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

