"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import Search from "../Layout/Search";
import { optimizeString } from "@/helpers/optimizeString";
import { getQuoteOfToday, getKalimatQuotes, fetchDynamicAuthors } from "@/lib/services/quotesService";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faShareNodes,
    faVolumeHigh,
    faBookmark,
    faRotateRight,
    faQuoteRight,
    faCheck,
    faBookOpen,
    faFeather,
    faStar,
    faSliders,
    faArrowLeft
} from "@fortawesome/free-solid-svg-icons";

export default function Quotes() {
    const [quoteToday, setQuoteToday] = useState(null);
    const [apiQuotes, setApiQuotes] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [showTashkeel, setShowTashkeel] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);
    const [copiedId, setCopiedId] = useState(null);
    const [savedQuotes, setSavedQuotes] = useState([]);

    const loadData = useCallback(async () => {
        setIsLoading(true);

        // 1. اقتباس اليوم من API
        const todayData = await getQuoteOfToday();
        setQuoteToday(todayData);

        // 2. قائمة الاقتباسات الحية من API
        const liveApiData = await getKalimatQuotes();
        if (liveApiData) {
            setApiQuotes(liveApiData);
        }

        // 3. استخراج جميع العلماء والأدباء ديناميكياً من الـ API والبيانات المحلية
        const dynamicAuthors = await fetchDynamicAuthors();
        setAuthorsList(dynamicAuthors);

        setIsLoading(false);
    }, []);

    useEffect(() => {
        loadData();

        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("saved_islamic_quotes");
            if (saved) {
                try { setSavedQuotes(JSON.parse(saved)); } catch (e) { }
            }
        }
    }, [loadData]);

    const handleGenerateRandom = async () => {
        setIsGenerating(true);
        const freshQuote = await getQuoteOfToday();
        setQuoteToday(freshQuote);
        setIsGenerating(false);
    };

    const copyQuoteText = (text, id) => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const shareQuote = (text, author) => {
        if (typeof window !== "undefined") {
            const shareData = {
                title: "حكمة واقتباس إسلامي",
                text: `"${text}" - ${author}\nمن موقع موعظة`,
                url: window.location.href
            };
            if (navigator.share) {
                navigator.share(shareData).catch(() => { });
            } else {
                copyQuoteText(shareData.text, "share");
            }
        }
    };

    const speakQuote = (text) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ar-SA";
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleSaveQuote = (quoteObj) => {
        let updated;
        const exists = savedQuotes.some(q => q.text === quoteObj.text);
        if (exists) {
            updated = savedQuotes.filter(q => q.text !== quoteObj.text);
        } else {
            updated = [...savedQuotes, quoteObj];
        }
        setSavedQuotes(updated);
        if (typeof window !== "undefined") {
            localStorage.setItem("saved_islamic_quotes", JSON.stringify(updated));
        }
    };

    const filteredAuthors = authorsList.filter(a => {
        if (!searchTerm.trim()) return true;
        const query = optimizeString(searchTerm);
        return optimizeString(a.name).includes(query);
    });

    const filteredApiQuotes = apiQuotes.filter(q => {
        if (!searchTerm.trim()) return true;
        const query = optimizeString(searchTerm);
        const matchText = optimizeString(q.text).includes(query);
        const matchTashkeel = q.tashkeel_text ? optimizeString(q.tashkeel_text).includes(query) : false;
        const matchAuthor = q.author?.name ? optimizeString(q.author.name).includes(query) : false;
        return matchText || matchTashkeel || matchAuthor;
    });

    if (isLoading) {
        return (
            <div className="container mx-auto py-24 text-center rtl">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-xs font-bold text-gray-500 dark:text-zinc-400">جاري جلب الاقتباسات والعلماء...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-16 rtl bg-dotted text-gray-900 dark:text-zinc-100">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* 1. الترويسة الرئيسية الحديثة والعصرية */}
                <div className="text-center pt-8 pb-6">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                        مكتبة الأقوال والحكم الإسلامية
                    </h1>
                    <p className="text-sm md:text-base font-bold text-gray-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        تصفح الأقوال والحِكم المأثورة الموحدة للأئمة والعلماء والأدباء بتصميم عصري وبسيط
                    </p>
                </div>

                {/* 2. بطاقة حكمة واقتباس اليوم الفاخرة */}
                {quoteToday && (
                    <div className="my-6 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-950 p-6 md:p-8 shadow-md border border-gray-200/80 dark:border-zinc-800/80 hover:border-primary/50 transition-all duration-300"
                        >
                            <FontAwesomeIcon icon={faQuoteRight} className="absolute top-6 left-6 text-primary/10 text-7xl pointer-events-none" />

                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon icon={faStar} className="text-amber-500 text-sm" />
                                    <h2 className="text-xs font-black text-primary dark:text-primary tracking-wider">حكمة واقتباس اليوم</h2>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowTashkeel(!showTashkeel)}
                                        className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 text-xs font-bold transition-all hover:bg-primary hover:text-white flex items-center gap-1.5"
                                    >
                                        <FontAwesomeIcon icon={faSliders} className="text-[11px]" />
                                        <span>{showTashkeel ? "التشكيل" : "بدون تشكيل"}</span>
                                    </button>

                                    <button
                                        onClick={handleGenerateRandom}
                                        disabled={isGenerating}
                                        className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-alt text-white font-black text-xs transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                                    >
                                        <FontAwesomeIcon icon={faRotateRight} className={isGenerating ? "animate-spin" : ""} />
                                        <span>اقتباس آخر</span>
                                    </button>
                                </div>
                            </div>

                            <div className="my-6 min-h-[90px] flex items-center justify-center text-center">
                                <p className="text-xl md:text-3xl font-black leading-relaxed text-gray-900 dark:text-white font-serif">
                                    {"\"" + (showTashkeel && quoteToday.tashkeel_text ? quoteToday.tashkeel_text : quoteToday.text) + "\""}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 dark:border-zinc-900 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary flex items-center justify-center font-black text-base border border-primary/20 dark:border-primary/30">
                                        <FontAwesomeIcon icon={faFeather} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-base font-black text-gray-900 dark:text-white">{quoteToday.author?.name || "عالم مأثور"}</div>
                                        {quoteToday.categories && quoteToday.categories.length > 0 && (
                                            <div className="text-xs text-gray-500 dark:text-zinc-400 font-bold">
                                                الفئة: {quoteToday.categories.map(c => c.name).join(" • ")}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => speakQuote(quoteToday.tashkeel_text || quoteToday.text)}
                                        className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-primary hover:text-white flex items-center justify-center text-xs transition-all"
                                        title="استماع صوتي"
                                    >
                                        <FontAwesomeIcon icon={faVolumeHigh} />
                                    </button>

                                    <button
                                        onClick={() => copyQuoteText(quoteToday.tashkeel_text || quoteToday.text, "today")}
                                        className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-primary hover:text-white flex items-center justify-center text-xs transition-all"
                                        title="نسخ النص"
                                    >
                                        <FontAwesomeIcon icon={copiedId === "today" ? faCheck : faCopy} className={copiedId === "today" ? "text-primary" : ""} />
                                    </button>

                                    <button
                                        onClick={() => shareQuote(quoteToday.text, quoteToday.author?.name)}
                                        className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-primary hover:text-white flex items-center justify-center text-xs transition-all"
                                        title="مشاركة"
                                    >
                                        <FontAwesomeIcon icon={faShareNodes} />
                                    </button>

                                    <button
                                        onClick={() => toggleSaveQuote(quoteToday)}
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs transition-all ${savedQuotes.some(q => q.text === quoteToday.text)
                                            ? "bg-amber-400 text-amber-950"
                                            : "bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-amber-100"
                                            }`}
                                        title="حفظ الاقتباس"
                                    >
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* 3. البحث المباشر */}
                <div className="max-w-xl mx-auto my-8">
                    <Search
                        handleChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="ابحث باسم العالم، الأديب، أو في نص الاقتباس..."
                    />
                </div>

                {/* 4. تبويبات العرض */}
                <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border flex items-center gap-2 ${activeTab === "all"
                            ? "bg-primary text-white border-transparent shadow-md"
                            : "bg-white dark:bg-zinc-950 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-800 hover:border-primary"
                            }`}
                    >
                        <FontAwesomeIcon icon={faBookOpen} />
                        <span>جميع الأقوال والمؤلفين</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("authors")}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border flex items-center gap-2 ${activeTab === "authors"
                            ? "bg-primary text-white border-transparent shadow-md"
                            : "bg-white dark:bg-zinc-950 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-800 hover:border-primary"
                            }`}
                    >
                        <FontAwesomeIcon icon={faFeather} />
                        <span>كروت العلماء والأدباء الموحدة</span>
                    </button>

                    <button
                        onClick={() => setActiveTab("quotes")}
                        className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all border flex items-center gap-2 ${activeTab === "quotes"
                            ? "bg-primary text-white border-transparent shadow-md"
                            : "bg-white dark:bg-zinc-950 text-gray-700 dark:text-zinc-300 border-gray-200 dark:border-zinc-800 hover:border-primary"
                            }`}
                    >
                        <FontAwesomeIcon icon={faStar} />
                        <span>مختارات الحِكم والأقوال</span>
                    </button>
                </div>

                {/* 5. شبكة كروت جميع العلماء والأدباء */}
                {(activeTab === "all" || activeTab === "authors") && filteredAuthors.length > 0 && (
                    <section className="mb-16">
                        <div className="flex items-center gap-3 mb-6 px-1">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary dark:text-primary flex items-center justify-center text-sm font-black">
                                <FontAwesomeIcon icon={faBookOpen} />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white">
                                كروت العلماء والأدباء الموحدة
                            </h2>
                            <span className="text-xs font-bold text-gray-400">({filteredAuthors.length} عالم وأديب)</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filteredAuthors.map((author) => (
                                <Link
                                    key={author.id}
                                    href={`/quotes/${author.id}`}
                                    className="group bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-gray-200/80 dark:border-zinc-800/80 hover:border-primary dark:hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-300 shadow-xs hover:shadow-lg flex items-center justify-between transform hover:-translate-y-0.5"
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-900 text-primary dark:text-primary font-black flex items-center justify-center text-lg group-hover:bg-primary group-hover:text-white transition-colors shadow-inner">
                                            <FontAwesomeIcon icon={faFeather} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-black text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                                                {author.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-zinc-400 font-bold mt-0.5">
                                                حكم مأثورة ومقالات
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-xs font-bold text-primary dark:text-primary bg-primary/10 dark:bg-primary/20 px-3.5 py-1.5 rounded-xl border border-primary/20 dark:border-primary/30 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all flex items-center gap-1.5">
                                        <span>تصفح</span>
                                        <FontAwesomeIcon icon={faArrowLeft} className="text-[10px]" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* 6. قسم مقتبسات وحِكم مأثورة */}
                {(activeTab === "all" || activeTab === "quotes") && filteredApiQuotes.length > 0 && (
                    <section className="mb-14">
                        <div className="flex items-center gap-3 mb-6 px-1">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary dark:text-primary flex items-center justify-center text-sm font-black">
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <h2 className="text-xl font-black text-gray-900 dark:text-white">
                                حِكم ومقتبسات مأثورة
                            </h2>
                            <span className="text-xs font-bold text-gray-400">({filteredApiQuotes.length} اقتباس)</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filteredApiQuotes.map((item, idx) => (
                                <div
                                    key={item.number || idx}
                                    className="bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-gray-200/80 dark:border-zinc-800/80 hover:border-primary/50 dark:hover:border-primary/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/20 dark:border-primary/30">
                                                {item.categories?.[0]?.name || "حكمة مأثورة"}
                                            </span>
                                            <button
                                                onClick={() => speakQuote(item.tashkeel_text || item.text)}
                                                className="text-gray-400 hover:text-primary transition-colors p-1"
                                                title="استماع"
                                            >
                                                <FontAwesomeIcon icon={faVolumeHigh} className="text-xs" />
                                            </button>
                                        </div>

                                        <p className="text-base md:text-lg font-bold leading-relaxed text-gray-800 dark:text-zinc-100 mb-6 font-serif">
                                            {"\"" + (showTashkeel && item.tashkeel_text ? item.tashkeel_text : item.text) + "\""}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-900">
                                        <div className="text-xs font-black text-primary dark:text-primary">
                                            — {item.author?.name || "عالم مأثور"}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => copyQuoteText(item.tashkeel_text || item.text, item.number || idx)}
                                                className="px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-xs font-black transition-all flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={copiedId === (item.number || idx) ? faCheck : faCopy} />
                                                <span>{copiedId === (item.number || idx) ? "تم النسخ" : "نسخ"}</span>
                                            </button>
                                            <button
                                                onClick={() => shareQuote(item.text, item.author?.name)}
                                                className="w-8 h-8 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white flex items-center justify-center text-xs transition-all"
                                            >
                                                <FontAwesomeIcon icon={faShareNodes} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </div>
    );
}
