"use client";

import { useState, useEffect } from "react";
import SearchHadith from "@/components/hadith/SearchHadith";
import { optimizeString } from "@/helpers/optimizeString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faStar,
    faSearch,
    faExclamationTriangle,
    faCheckCircle,
    faQuoteRight,
    faSpinner,
    faCopy,
    faCheck
} from "@fortawesome/free-solid-svg-icons";

let clientHadithCache = null;

async function loadHadithData() {
    if (clientHadithCache) return clientHadithCache;

    const urlsBukhari = [
        "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.min.json",
        "https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/ara-bukhari.min.json"
    ];

    const urlsMuslim = [
        "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-muslim.min.json",
        "https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/ara-muslim.min.json"
    ];

    const fetchFirstWorking = async (urls) => {
        for (const url of urls) {
            try {
                const res = await fetch(url);
                if (res.ok) {
                    return await res.json();
                }
            } catch (e) {
                // try next
            }
        }
        return null;
    };

    const [bukhariData, muslimData] = await Promise.all([
        fetchFirstWorking(urlsBukhari),
        fetchFirstWorking(urlsMuslim)
    ]);

    clientHadithCache = [
        ...(bukhariData?.hadiths || []).map(h => ({ ...h, source: "صحيح البخاري" })),
        ...(muslimData?.hadiths || []).map(h => ({ ...h, source: "صحيح مسلم" }))
    ];

    return clientHadithCache;
}

export default function SearchHadithClient({ rawQuery }) {
    const searchQuery = rawQuery && rawQuery !== "-" ? decodeURIComponent(rawQuery) : "";
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchQuery) {
            setResults([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        let isMounted = true;
        setIsLoading(true);
        setError(null);

        const performSearch = async () => {
            try {
                const allHadiths = await loadHadithData();
                if (!isMounted) return;

                if (!allHadiths || allHadiths.length === 0) {
                    setError("تعذر تحميل قاعدة بيانات الأحاديث النبوية. يرجى التحقق من الاتصال بالإنترنت.");
                    setIsLoading(false);
                    return;
                }

                const normalizedQuery = optimizeString(searchQuery).trim();
                const matched = allHadiths.filter(h => {
                    if (!h.text) return false;
                    const normalizedText = optimizeString(h.text);
                    return normalizedText.includes(normalizedQuery);
                });

                const formatted = matched.slice(0, 50).map((h, idx) => ({
                    id: h.hadithnumber || idx + 1,
                    text: h.text,
                    source: h.source,
                    grade: h.source === "صحيح البخاري" || h.source === "صحيح مسلم" ? `صحيح (${h.source})` : "صحيح"
                }));

                setResults(formatted);
            } catch (err) {
                if (isMounted) {
                    console.error("Search failed:", err);
                    setError("حدث خطأ غير متوقع أثناء البحث.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        performSearch();

        return () => {
            isMounted = false;
        };
    }, [searchQuery]);

    const handleCopy = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-4xl">
            {/* شريط البحث */}
            <div className="mb-8">
                <SearchHadith id={searchQuery} />
            </div>

            {/* محتوى نتائج البحث */}
            <div className="mt-8">
                {searchQuery && (
                    <div className="mb-6 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-4">
                        <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                            <FontAwesomeIcon icon={faBook} className="text-primary dark:text-primary-400" />
                            <span>نتائج البحث عن &quot;{searchQuery}&quot;</span>
                            {!isLoading && (
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-400">
                                    {results.length} حديث
                                </span>
                            )}
                        </h2>
                        <span className="text-xs text-gray-500 dark:text-zinc-400 font-semibold hidden sm:inline">
                            من صحيح البخاري وصحيح مسلم
                        </span>
                    </div>
                )}

                {/* حالة التحميل */}
                {isLoading && (
                    <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 shadow-xs">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary flex items-center justify-center mx-auto mb-4 text-2xl">
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">جاري البحث في مصادر السنة النبوية...</h3>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
                            يرجى الانتظار لحظات بينما يتم جلب الأحاديث وتدقيق الشواهد.
                        </p>
                    </div>
                )}

                {/* حالة الخطأ */}
                {!isLoading && error && (
                    <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-red-200 dark:border-red-900/30 p-8 shadow-xs">
                        <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-4 text-2xl">
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">تعذر جلب نتائج البحث</h3>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
                            {error}
                        </p>
                    </div>
                )}

                {/* عدم وجود نتائج */}
                {!isLoading && !error && searchQuery && results.length === 0 && (
                    <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 shadow-xs">
                        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4 text-2xl">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">لم نجد نتائج مطابقة</h3>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
                            لم يتم العثور على أي حديث يحتوي على &quot;{searchQuery}&quot;. جرب البحث بكلمة مختلفة أو بدون تشكيل.
                        </p>
                    </div>
                )}

                {/* قائمة نتائج الأحاديث */}
                {!isLoading && !error && results.length > 0 && (
                    <div className="space-y-6">
                        {results.map((item, idx) => (
                            <article
                                key={idx}
                                className="bg-white dark:bg-zinc-900 border border-gray-200/80 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4 hover:border-primary/30 dark:hover:border-primary-400/30 transition-all relative overflow-hidden group"
                            >
                                {/* ترويسة الحديث */}
                                <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-3.5">
                                    <div className="flex items-center gap-2.5">
                                        <span className="w-8 h-8 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400 font-black text-xs flex items-center justify-center">
                                            {idx + 1}
                                        </span>
                                        <span className="text-xs font-bold text-gray-800 dark:text-zinc-200">
                                            الحديث رقم {item.id}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleCopy(item.text, idx)}
                                            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-primary/10 text-gray-700 dark:text-zinc-300 hover:text-primary text-xs font-bold transition-all flex items-center gap-1.5"
                                        >
                                            <FontAwesomeIcon icon={copiedIndex === idx ? faCheck : faCopy} className={copiedIndex === idx ? "text-primary" : ""} />
                                            <span>{copiedIndex === idx ? "تم النسخ" : "نسخ الحديث"}</span>
                                        </button>

                                        <span className="px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary text-[11px] font-bold border border-primary/20 dark:border-primary/40 flex items-center gap-1.5">
                                            <FontAwesomeIcon icon={faCheckCircle} className="text-primary" />
                                            <span>{item.source}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* نص الحديث النبوي */}
                                <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-zinc-950/60 border border-gray-100 dark:border-zinc-800/80">
                                    <div className="flex gap-3">
                                        <FontAwesomeIcon icon={faQuoteRight} className="text-primary/40 dark:text-primary-400/40 text-xl shrink-0 mt-1" />
                                        <div
                                            className="font-quran text-lg md:text-xl text-gray-900 dark:text-white !leading-[2.8rem] md:!leading-[3.4rem] text-right font-semibold [&_p]:mb-3 [&_span]:py-1"
                                            dangerouslySetInnerHTML={{ __html: item.text }}
                                        />
                                    </div>
                                </div>

                                {/* أسفل الكرت */}
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                                        <FontAwesomeIcon icon={faStar} className="text-xs" />
                                        <span>درجة الحديث: {item.grade}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
