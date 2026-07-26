"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faHeadphones,
    faBrain,
    faPlay,
    faPause,
    faStepForward,
    faStepBackward,
    faRedo,
    faEye,
    faEyeSlash,
    faCopy,
    faCheck,
    faSearch,
    faVolumeUp,
    faInfoCircle,
    faTimes,
    faLayerGroup,
    faStar,
    faSpinner
} from "@fortawesome/free-solid-svg-icons";
import ReciterSelect, { DEFAULT_RECITERS } from "@/components/quran/ReciterSelect";
import SurahSelect from "@/components/quran/SurahSelect";

export default function QuranUnifiedHub({
    initialMode = "tafsir", // "tafsir" | "listen" | "memorizing"
    surahId = 1,
    reciterId = "ar.alafasy"
}) {
    const [currentSurahId, setCurrentSurahId] = useState(
        typeof surahId === "number" ? surahId : parseInt(String(surahId), 10) || 1
    );
    const [selectedReciter, setSelectedReciter] = useState(
        DEFAULT_RECITERS.find(r => r.id === reciterId) || DEFAULT_RECITERS[0]
    );
    const [mode, setMode] = useState(initialMode); // "tafsir" | "listen" | "memorizing"
    const [viewMode, setViewMode] = useState("mushaf"); // "mushaf" | "cards" | "info"

    // حالات التحكم في الاستماع والحفظ
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
    const [repeatCount, setRepeatCount] = useState(1);
    const [playedTimes, setPlayedTimes] = useState(0);
    const [hideText, setHideText] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [activeModalAyah, setActiveModalAyah] = useState(null);

    const audioRef = useRef(null);

    // جلب بيانات السورة والتفسير والبطاقات
    const { data: surahDetailRes, isLoading: isSurahLoading } = useSWR(
        `https://api.alquran.cloud/v1/surah/${currentSurahId}`
    );
    const { data: tafsirRes } = useSWR(
        `https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${currentSurahId}`
    );
    const { data: albitaqatRes } = useSWR(
        `https://raw.githubusercontent.com/Alsarmad/albitaqat_quran/main/albitaqat.json`
    );

    const surahData = surahDetailRes?.data;
    const ayahsList = surahData?.ayahs || [];
    const tafsirList = tafsirRes?.result || [];
    const albitaqatData = Array.isArray(albitaqatRes)
        ? albitaqatRes.find((item) => parseInt(item.id, 10) === currentSurahId)
        : null;

    // دمج بيانات الآيات مع التفسير
    const combinedAyahs = ayahsList.map((aya, idx) => {
        const tafsirItem = tafsirList[idx] || {};
        return {
            ...aya,
            arabic_text: aya.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "").trim(),
            translation: tafsirItem.translation || "",
            footnote: tafsirItem.footnote || ""
        };
    });

    const filteredAyahs = combinedAyahs.filter(aya =>
        aya.arabic_text.includes(searchQuery.trim()) ||
        aya.translation.includes(searchQuery.trim()) ||
        String(aya.numberInSurah) === searchQuery.trim()
    );

    const currentSurahAudioUrl = `${selectedReciter.server || "https://server8.mp3quran.net/afs"}/${String(currentSurahId).padStart(3, "0")}.mp3`;
    const currentAyahAudioUrl = `https://cdn.islamic.network/quran/audio/128/${selectedReciter.id}/${combinedAyahs[currentAyahIndex]?.number}.mp3`;

    useEffect(() => {
        setIsPlaying(false);
        setCurrentAyahIndex(0);
        setPlayedTimes(0);
    }, [currentSurahId, selectedReciter, mode]);

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
    };

    const handleAudioEnded = () => {
        if (mode === "memorizing") {
            if (playedTimes + 1 < repeatCount) {
                setPlayedTimes(prev => prev + 1);
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                }
            } else {
                setPlayedTimes(0);
                if (currentAyahIndex + 1 < combinedAyahs.length) {
                    setCurrentAyahIndex(prev => prev + 1);
                    setTimeout(() => {
                        if (audioRef.current) audioRef.current.play();
                    }, 300);
                } else {
                    setIsPlaying(false);
                }
            }
        } else {
            setIsPlaying(false);
        }
    };

    const handleCopy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen bg-slate-50/60 dark:bg-zinc-950 text-gray-900 dark:text-white pb-24 font-sans" dir="rtl">
            <audio
                ref={audioRef}
                src={mode === "listen" ? currentSurahAudioUrl : currentAyahAudioUrl}
                onEnded={handleAudioEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <div className="container mx-auto px-4 md:px-6 max-w-5xl py-6 space-y-6">

                {/* 1. الترويسة الرئيسية والتحكم بين الأوضاع الـ 3 الموحدة */}
                <div className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-4 md:p-6 shadow-xs space-y-5">
                    
                    {/* اختيار الأوضاع الـ 3 */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-zinc-950 p-1.5 rounded-2xl border border-gray-200/60 dark:border-zinc-800/80">
                        {[
                            { id: "tafsir", label: "التفسير والقراءة", icon: faBookOpen },
                            { id: "listen", label: "الاستماع والتلاوة", icon: faHeadphones },
                            { id: "memorizing", label: "الحفظ والمراجعة", icon: faBrain }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setMode(tab.id)}
                                className={`py-3 px-2 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-bold text-xs md:text-sm ${
                                    mode === tab.id
                                        ? "bg-white dark:bg-zinc-900 text-primary dark:text-primary-400 shadow-md scale-[1.02]"
                                        : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                            >
                                <FontAwesomeIcon icon={tab.icon} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* المكونات المستقلة المجمعة (SurahSelect & ReciterSelect) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
                        {/* مكون اختيار السورة */}
                        <SurahSelect
                            selectedSurahId={currentSurahId}
                            onSelectSurah={(surah) => setCurrentSurahId(parseInt(surah.number, 10))}
                        />

                        {/* مكون اختيار القارئ */}
                        <ReciterSelect
                            selectedReciterId={selectedReciter.id}
                            onSelectReciter={(reciter) => setSelectedReciter(reciter)}
                        />

                        {/* البحث عن آية في وضع التفسير */}
                        {mode === "tafsir" && (
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="ابحث برقم الآية أو كلماتها..."
                                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl py-2.5 pr-9 pl-3 text-xs font-semibold focus:outline-none focus:border-primary h-[46px]"
                                />
                                <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
                            </div>
                        )}
                    </div>
                </div>

                {/* تحميل البيانات */}
                {isSurahLoading && (
                    <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl text-primary mb-3" />
                        <p className="text-sm font-bold text-gray-500">جاري تحميل آيات السورة...</p>
                    </div>
                )}

                {/* 2. محتوى وضع 1: التفسير والقراءة */}
                {!isSurahLoading && mode === "tafsir" && (
                    <div className="space-y-6">

                        {/* شريط اختيار طريقة العرض */}
                        <div className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-2xl p-2.5 shadow-2xs">
                            <div className="flex items-center gap-2">
                                {[
                                    { id: "mushaf", label: "وضع المصحف", icon: faBookOpen },
                                    { id: "cards", label: "وضع البطاقات والتفسير", icon: faLayerGroup },
                                    { id: "info", label: "بطاقة السورة والمقاصد", icon: faInfoCircle }
                                ].map(v => (
                                    <button
                                        key={v.id}
                                        onClick={() => setViewMode(v.id)}
                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                                            viewMode === v.id
                                                ? "bg-primary text-white shadow-xs"
                                                : "bg-slate-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-gray-200"
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={v.icon} />
                                        <span>{v.label}</span>
                                    </button>
                                ))}
                            </div>

                            <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 hidden sm:inline">
                                {surahData?.name} - {surahData?.numberOfAyahs} آية
                            </span>
                        </div>

                        {/* المصحف المتصل */}
                        {viewMode === "mushaf" && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-12 shadow-xs text-right"
                            >
                                {currentSurahId !== 9 && (
                                    <div className="text-center mb-10 pb-6 border-b border-gray-100 dark:border-zinc-800">
                                        <h3 className="font-quran text-2xl md:text-3xl text-primary dark:text-primary-400">
                                            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                        </h3>
                                    </div>
                                )}

                                <div className="leading-[3.8rem] md:leading-[4.8rem] tracking-wide font-quran text-2xl md:text-3xl text-gray-900 dark:text-white">
                                    {filteredAyahs.map((aya, idx) => (
                                        <span
                                            key={idx}
                                            onClick={() => setActiveModalAyah(aya)}
                                            className="cursor-pointer hover:text-primary dark:hover:text-primary-400 transition-colors"
                                        >
                                            {aya.arabic_text}
                                            <span
                                                className="inline-flex items-center font-cairo justify-center mx-2 text-base md:text-lg font-quran font-bold
                                                !text-primary dark:!text-primary-400
                                                !border-2 !border-primary dark:!border-primary
                                                !rounded-full min-w-[2.7rem] min-h-[2.7rem] px-2 py-1
                                                !bg-primary/10 dark:!bg-primary/20
                                                !shadow-md
                                                relative
                                                after:content-['۝'] after:absolute after:inset-0 after:flex after:items-center after:justify-center
                                                after:!text-primary dark:after:!text-primary after:!opacity-15"
                                            >
                                                <span className="relative z-10">{aya.numberInSurah}</span>
                                            </span>{" "}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* بطاقات الآيات والتفسير */}
                        {viewMode === "cards" && (
                            <div className="space-y-4">
                                {filteredAyahs.map((aya, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 shadow-xs space-y-4 hover:border-primary/30 transition-all"
                                    >
                                        <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
                                            <span className="w-8 h-8 rounded-xl bg-primary-600 text-white font-black text-xs flex items-center justify-center">
                                                {aya.numberInSurah}
                                            </span>
                                            <button
                                                onClick={() => handleCopy(aya.arabic_text, idx)}
                                                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs font-bold text-gray-700 dark:text-zinc-300 hover:text-primary-600 transition-all flex items-center gap-1.5"
                                            >
                                                <FontAwesomeIcon icon={copiedIndex === idx ? faCheck : faCopy} className={copiedIndex === idx ? "text-primary" : ""} />
                                                <span>{copiedIndex === idx ? "تم النسخ" : "نسخ الآية"}</span>
                                            </button>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-950/60">
                                            <p className="font-quran text-2xl md:text-3xl text-gray-900 dark:text-white leading-[3rem] text-right">
                                                {aya.arabic_text}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <h5 className="text-xs font-black text-primary-600 dark:text-primary-400 flex items-center gap-1.5">
                                                <FontAwesomeIcon icon={faBookOpen} />
                                                <span>التفسير الميسر:</span>
                                            </h5>
                                            <p className="text-xs md:text-sm text-gray-700 dark:text-zinc-300 leading-relaxed font-semibold">
                                                {aya.translation}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* بطاقة مقاصد السورة */}
                        {viewMode === "info" && albitaqatData && (
                            <div className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
                                <div className="text-center pb-6 border-b border-gray-100 dark:border-zinc-800">
                                    <h3 className="text-2xl font-black text-primary-600 dark:text-primary-400">
                                        بطاقة التعريف بسورة {surahData?.name}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { label: "عدد آياتها", val: albitaqatData.ayaatiha || `${surahData?.numberOfAyahs} آية`, icon: faLayerGroup },
                                        { label: "معنى اسم السورة", val: albitaqatData.maeni_asamuha, icon: faInfoCircle },
                                        { label: "سبب تسميتها", val: albitaqatData.sabab_tasmiatiha, icon: faBookOpen },
                                        { label: "أسماؤها المشهورة", val: albitaqatData.asmawuha, icon: faStar },
                                        { label: "مقصدها العام", val: albitaqatData.maqsiduha_aleamu, icon: faStar },
                                        { label: "سبب نزولها", val: albitaqatData.sabab_nuzuliha, icon: faInfoCircle }
                                    ].map((item, i) => (
                                        <div key={i} className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800/80 space-y-1.5">
                                            <h4 className="text-xs font-bold text-gray-500 dark:text-zinc-400 flex items-center gap-2">
                                                <FontAwesomeIcon icon={item.icon} className="text-primary" />
                                                <span>{item.label}:</span>
                                            </h4>
                                            <p className="text-sm font-black text-gray-900 dark:text-white leading-relaxed">
                                                {item.val || "غير مذكور"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                )}

                {/* 3. محتوى وضع 2: الاستماع والتلاوة الكاملة */}
                {!isSurahLoading && mode === "listen" && (
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xs space-y-8 text-center">

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-lime-50 dark:from-zinc-950 dark:to-zinc-900 border border-primary-200/60 dark:border-zinc-800 space-y-4">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white font-quran">
                                تلاوة سورة {surahData?.name}
                            </h2>
                            <p className="text-sm font-bold text-primary-700 dark:text-primary-400">
                                بصوت الشيخ {selectedReciter.name}
                            </p>

                            <div className="flex items-center justify-center gap-4 pt-2">
                                <button
                                    onClick={handlePlayPause}
                                    className="px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-3"
                                >
                                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                                    <span>{isPlaying ? "إيقاف مؤقت" : "تشغيل التلاوة الكاملة"}</span>
                                </button>
                            </div>
                        </div>

                        <div className="text-right space-y-6 pt-4">
                            {currentSurahId !== 9 && (
                                <h4 className="text-center font-quran text-2xl text-primary-700 dark:text-primary-400">
                                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                                </h4>
                            )}
                            <p className="font-quran text-2xl md:text-3xl text-gray-900 dark:text-white leading-[3.8rem] md:leading-[4.8rem]">
                                {combinedAyahs.map((aya, idx) => (
                                    <span key={idx}>
                                        {aya.arabic_text}
                                        <span
                                            className="inline-flex items-center font-cairo justify-center mx-2 text-base md:text-lg font-quran font-bold
                                            !text-primary-800 dark:!text-primary-400
                                            !border-2 !border-primary-600 dark:!border-primary
                                            !rounded-full min-w-[2.7rem] min-h-[2.7rem] px-2 py-1
                                            !bg-primary-50 dark:!bg-primary-900/40
                                            !shadow-md dark:!shadow-primary-950/30
                                            relative
                                            after:content-['۝'] after:absolute after:inset-0 after:flex after:items-center after:justify-center
                                            after:!text-primary-700 dark:after:!text-primary-600 after:!opacity-15"
                                        >
                                            <span className="relative z-10">{aya.numberInSurah}</span>
                                        </span>{" "}
                                    </span>
                                ))}
                            </p>
                            <h4 className="text-center font-quran text-xl text-gray-500 pt-4">
                                صَدَقَ اللَّهُ الْعَظِيمُ
                            </h4>
                        </div>
                    </div>
                )}

                {/* 4. محتوى وضع 3: المعلم والحفظ والتكرار */}
                {!isSurahLoading && mode === "memorizing" && (
                    <div className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xs space-y-8">

                        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-gray-200/60 dark:border-zinc-800">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-gray-500 dark:text-zinc-400 flex items-center gap-1.5">
                                    <FontAwesomeIcon icon={faRedo} className="text-primary" />
                                    <span>تكرار الآية:</span>
                                </span>
                                <div className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1 rounded-xl border border-gray-200 dark:border-zinc-800">
                                    {[1, 3, 5, 10].map(cnt => (
                                        <button
                                            key={cnt}
                                            onClick={() => setRepeatCount(cnt)}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                                repeatCount === cnt
                                                    ? "bg-primary-600 text-white"
                                                    : "text-gray-600 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                            }`}
                                        >
                                            {cnt} مرات
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={() => setHideText(!hideText)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                                    hideText
                                        ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                                        : "bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-800"
                                }`}
                            >
                                <FontAwesomeIcon icon={hideText ? faEyeSlash : faEye} />
                                <span>{hideText ? "إظهار النص القرآني" : "اختبار الحفظ (إخفاء النص)"}</span>
                            </button>
                        </div>

                        {combinedAyahs.length > 0 && (
                            <div className="p-8 rounded-3xl bg-primary-50/40 dark:bg-primary-950/20 border border-primary-200/60 dark:border-primary-900/30 text-center space-y-6">
                                <div className="flex items-center justify-between text-xs font-bold text-primary-700 dark:text-primary-400 border-b border-primary-200/40 pb-3">
                                    <span>الآية الحالية: {currentAyahIndex + 1} من {combinedAyahs.length}</span>
                                    <span>التكرار الحالي: {playedTimes + 1} من {repeatCount}</span>
                                </div>

                                <p className={`font-quran text-3xl md:text-4xl leading-[3.8rem] transition-all duration-500 ${
                                    hideText ? "blur-md select-none hover:blur-none cursor-pointer" : "text-gray-900 dark:text-white"
                                }`}>
                                    {combinedAyahs[currentAyahIndex]?.arabic_text}
                                </p>

                                <div className="flex items-center justify-center gap-3 pt-4">
                                    <button
                                        onClick={() => {
                                            if (currentAyahIndex > 0) setCurrentAyahIndex(prev => prev - 1);
                                        }}
                                        disabled={currentAyahIndex === 0}
                                        className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 disabled:opacity-40 flex items-center justify-center"
                                    >
                                        <FontAwesomeIcon icon={faStepForward} />
                                    </button>

                                    <button
                                        onClick={handlePlayPause}
                                        className="px-6 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-xs"
                                    >
                                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                                        <span>{isPlaying ? "إيقاف" : "استماع وترديد"}</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (currentAyahIndex + 1 < combinedAyahs.length) setCurrentAyahIndex(prev => prev + 1);
                                        }}
                                        disabled={currentAyahIndex + 1 >= combinedAyahs.length}
                                        className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 disabled:opacity-40 flex items-center justify-center"
                                    >
                                        <FontAwesomeIcon icon={faStepBackward} />
                                    </button>
                                </div>
                            </div>
                        )}

                    </div>
                )}

            </div>

            {/* مودال تفاصيل الآية */}
            <AnimatePresence>
                {activeModalAyah && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModalAyah(null)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-2xl p-6 space-y-5 z-10"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3">
                                <h3 className="font-bold text-sm text-primary-600 dark:text-primary-400">
                                    الآية {activeModalAyah.numberInSurah} من سورة {surahData?.name}
                                </h3>
                                <button
                                    onClick={() => setActiveModalAyah(null)}
                                    className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-500 flex items-center justify-center"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 text-center">
                                <p className="font-quran text-2xl md:text-3xl text-gray-900 dark:text-white leading-relaxed">
                                    {activeModalAyah.arabic_text}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-primary-600 dark:text-primary-400">التفسير الميسر:</h4>
                                <p className="text-xs md:text-sm text-gray-700 dark:text-zinc-300 font-semibold leading-relaxed">
                                    {activeModalAyah.translation}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
