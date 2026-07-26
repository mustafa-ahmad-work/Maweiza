"use client";

import { useState, useEffect } from "react";
import Landing from "@/components/Layout/Landing";
import { getQuotesForAuthor } from "@/lib/services/quotesService";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faShareNodes,
    faVolumeHigh,
    faBookmark,
    faCheck,
    faArrowRight,
    faQuoteRight,
    faFeather,
    faSliders
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function AuthorQuotes({ params }) {
    const rawId = params.id;
    const [quotesList, setQuotesList] = useState([]);
    const [authorName, setAuthorName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showTashkeel, setShowTashkeel] = useState(true);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [savedQuotes, setSavedQuotes] = useState([]);

    useEffect(() => {
        const loadAuthorQuotes = async () => {
            setIsLoading(true);
            const res = await getQuotesForAuthor(rawId);
            setAuthorName(res.authorName);
            setQuotesList(res.quotes || []);
            setIsLoading(false);
        };

        loadAuthorQuotes();

        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("saved_islamic_quotes");
            if (saved) {
                try { setSavedQuotes(JSON.parse(saved)); } catch (e) { }
            }
        }
    }, [rawId]);

    const copyText = (text, idx) => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(text);
            setCopiedIndex(idx);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    const shareText = (text) => {
        if (typeof window !== "undefined") {
            const shareData = {
                title: `حكمة من ${authorName}`,
                text: `"${text}" - ${authorName}\nمن موقع موعظة`,
                url: window.location.href
            };
            if (navigator.share) {
                navigator.share(shareData).catch(() => { });
            } else {
                copyText(shareData.text, "share");
            }
        }
    };

    const speakText = (text) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "ar-SA";
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    };

    const toggleSave = (quoteObj) => {
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

    return (
        <div className="min-h-screen pb-16 rtl bg-dotted text-gray-900 dark:text-zinc-100">
            <Landing
                title={authorName ? `أقوال وحكم ${authorName}` : "أقوال وحكم العلماء"}
                text={authorName ? `مجموعة من درر وحكم ${authorName} المأثورة` : "تصفح الحكم والأقوال المأثورة"}
            />

            <section className="py-8 relative px-4">
                <div className="container mx-auto max-w-4xl">

                    {/* شريط التحكم ورابط العودة */}
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/quotes"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-200/80 dark:border-zinc-800/80 text-xs font-black text-gray-700 dark:text-zinc-300 hover:border-primary hover:text-primary transition-all shadow-xs"
                        >
                            <FontAwesomeIcon icon={faArrowRight} />
                            <span>العودة لمكتبة الاقتباسات</span>
                        </Link>

                        <button
                            onClick={() => setShowTashkeel(!showTashkeel)}
                            className="px-3.5 py-2 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/20 dark:border-primary/30 text-xs font-black flex items-center gap-1.5 hover:bg-primary/20 transition-all"
                        >
                            <FontAwesomeIcon icon={faSliders} className="text-[11px]" />
                            <span>{showTashkeel ? "التشكيل" : "بدون تشكيل"}</span>
                        </button>
                    </div>

                    {/* المحتوى أو التحميل النظيف */}
                    {isLoading ? (
                        <div className="py-20 text-center">
                            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-xs font-bold text-gray-500 dark:text-zinc-400">جاري تجميع الاقتباسات...</p>
                        </div>
                    ) : quotesList.length > 0 ? (
                        <div className="space-y-5">
                            <div className="text-xs font-black text-gray-500 dark:text-zinc-400 mb-2 px-1">
                                إجمالي اقتباسات {authorName}: ({quotesList.length} حكمة)
                            </div>

                            {quotesList.map((item, idx) => {
                                const textToShow = showTashkeel && item.tashkeel_text ? item.tashkeel_text : item.text;
                                const isSaved = savedQuotes.some(q => q.text === item.text);

                                return (
                                    <motion.div
                                        key={item.number || idx}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.04 }}
                                        className="bg-white dark:bg-zinc-950 rounded-3xl p-6 md:p-8 border border-gray-200/80 dark:border-zinc-800/80 hover:border-primary/50 dark:hover:border-primary/50 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                    >
                                        <FontAwesomeIcon icon={faQuoteRight} className="absolute top-4 left-4 text-primary/10 text-6xl pointer-events-none" />

                                        <p className="text-xl md:text-2xl font-bold leading-relaxed text-gray-900 dark:text-zinc-100 my-3 text-center">
                                            {"\"" + textToShow + "\""}
                                        </p>

                                        <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-zinc-900 mt-5">
                                            <div className="flex items-center gap-2 text-xs font-black text-primary dark:text-primary">
                                                <FontAwesomeIcon icon={faFeather} />
                                                <span>{authorName}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => speakText(textToShow)}
                                                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white flex items-center justify-center text-xs transition-all"
                                                    title="استماع"
                                                >
                                                    <FontAwesomeIcon icon={faVolumeHigh} />
                                                </button>

                                                <button
                                                    onClick={() => copyText(textToShow, idx)}
                                                    className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-700 dark:text-zinc-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-xs font-black transition-all flex items-center gap-1.5"
                                                >
                                                    <FontAwesomeIcon icon={copiedIndex === idx ? faCheck : faCopy} />
                                                    <span>{copiedIndex === idx ? "تم النسخ" : "نسخ"}</span>
                                                </button>

                                                <button
                                                    onClick={() => shareText(textToShow)}
                                                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white flex items-center justify-center text-xs transition-all"
                                                    title="مشاركة"
                                                >
                                                    <FontAwesomeIcon icon={faShareNodes} />
                                                </button>

                                                <button
                                                    onClick={() => toggleSave(item)}
                                                    className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs transition-all ${isSaved
                                                        ? "bg-amber-400 text-amber-950"
                                                        : "bg-gray-100 dark:bg-zinc-900 text-gray-600 dark:text-zinc-400 hover:bg-amber-100"
                                                        }`}
                                                    title="حفظ"
                                                >
                                                    <FontAwesomeIcon icon={faBookmark} />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white dark:bg-zinc-950 rounded-3xl border border-gray-200 dark:border-zinc-800">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white">لا توجد اقتباسات حالياً</h3>
                            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">لم نتمكن من العثور على اقتباسات له في الوقت الحالي.</p>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}
