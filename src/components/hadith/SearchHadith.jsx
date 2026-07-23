"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const QUICK_TAGS = ["الصلاة", "الوالدين", "الأخلاق", "الجنة", "الصبر", "التوبة"];

export default function SearchHadith(props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [id, setId] = useState(props.id !== "-" ? (props.id || "") : "");
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!props.id || props.id === "-") {
            try {
                const saved = localStorage.getItem("search_id");
                if (saved) setId(saved);
            } catch (e) {
                // ignore
            }
        }
    }, [props.id]);

    function handleChange(e) {
        const val = e.target.value;
        setId(val);
        try {
            localStorage.setItem("search_id", val);
        } catch (e) {
            // ignore
        }
    }

    function clearSearch() {
        setId("");
        try {
            localStorage.removeItem("search_id");
        } catch (e) {
            // ignore
        }
    }

    function executeSearch(queryStr) {
        const trimmedQuery = queryStr.trim();
        if (!trimmedQuery) return;

        startTransition(() => {
            router.push(`/search/${encodeURIComponent(trimmedQuery)}`);
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        executeSearch(id);
    }

    function handleTagClick(tag) {
        setId(tag);
        try {
            localStorage.setItem("search_id", tag);
        } catch (e) {}
        executeSearch(tag);
    }

    return (
        <div className="font-sans px-2 text-gray-900 dark:text-white flex flex-col items-center justify-center my-6" dir="rtl">
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl space-y-4"
            >
                {/* نموذج البحث الإنسيابي */}
                <form onSubmit={handleSubmit} className="relative w-full">
                    <div
                        className={`relative flex items-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full border shadow-sm transition-all duration-300 ${isFocused
                                ? "border-emerald-500 ring-4 ring-emerald-500/15 shadow-md"
                                : "border-gray-200 dark:border-zinc-800 hover:border-gray-300 dark:hover:border-zinc-700"
                            }`}
                    >
                        {/* أيقونة البحث اليمنى */}
                        <div className="absolute right-5 text-gray-400 dark:text-zinc-500 pointer-events-none flex items-center justify-center">
                            <FontAwesomeIcon icon={faSearch} className="text-lg" />
                        </div>

                        {/* حقل الإدخال */}
                        <input
                            type="text"
                            value={id}
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            disabled={isPending}
                            placeholder="ابحث بحرية في الحديث النبوي الشريف..."
                            className="w-full py-4 pr-16 pl-28 text-base md:text-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none font-medium"
                        />

                        {/* الأزرار اليسرى */}
                        <div className="absolute left-2.5 flex items-center gap-2">
                            {id && !isPending && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-500 dark:text-zinc-400 transition-colors flex items-center justify-center text-xs"
                                    aria-label="مسح البحث"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            )}

                            <button
                                type="submit"
                                disabled={!id.trim() || isPending}
                                className={`px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all flex items-center gap-2 shadow-sm ${id.trim() && !isPending
                                        ? "bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600 text-white shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
                                        : "bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed"
                                    }`}
                                aria-label="بحث"
                            >
                                {isPending ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin text-sm" />
                                        <span>جاري البحث</span>
                                    </>
                                ) : (
                                    <span>بحث</span>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* الوسوم والشواهد السريعة */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="text-xs font-bold text-gray-400 dark:text-zinc-500 ml-1">كلمات شائعة:</span>
                    {QUICK_TAGS.map((tag, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => handleTagClick(tag)}
                            disabled={isPending}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 dark:bg-zinc-900/70 border border-gray-200/80 dark:border-zinc-800 text-gray-600 dark:text-zinc-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all shadow-2xs"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
