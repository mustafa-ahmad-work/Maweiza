"use client";

import Link from "next/link";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBook, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/config/constants";

export default function SearchHadith(props) {
    const [savedId, setSavedId] = useLocalStorage(STORAGE_KEYS.SEARCH_ID, "");
    const [id, setId] = useState(props.id !== "-" ? (savedId || "") : "");
    const [isFocused, setIsFocused] = useState(false);

    function handleChange(e) {
        setId(e.target.value);
        setSavedId(e.target.value);
    }

    function clearSearch() {
        setId("");
        setSavedId("");
    }

    return (
        <div className="font-sans px-5 text-black dark:text-white flex items-center justify-center my-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <div className={`relative flex items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border-2 transition-all duration-300 ${isFocused ? 'border-emerald-500 shadow-emerald-200 dark:shadow-emerald-900/30' : 'border-gray-200 dark:border-zinc-700'}`}>
                    <input
                        type="text"
                        value={id}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={(e) => e.key === 'Enter' && (window.location.href = `/search/${id}`)}
                        placeholder="ابحث في الحديث النبوي..."
                        className="w-full p-4 pr-4 pl-12 text-lg bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none rounded-2xl"
                    />
                    {id && (
                        <button
                            onClick={clearSearch}
                            className="absolute left-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            aria-label="مسح البحث"
                        >
                            <FontAwesomeIcon icon={faTimes} className="text-lg" />
                        </button>
                    )}
                    <Link
                        href={id ? `/search/${id}` : '#'}
                        className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all duration-300 ${id ? 'bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed'}`}
                        aria-label="بحث"
                    >
                        <FontAwesomeIcon icon={faSearch} className="text-lg" />
                    </Link>
                </div>
                <div className="text-center mt-3">
                    <p className="text-xs text-gray-500 dark:text-zinc-400">
                        اكتب كلمة أو جملة للبحث في الحديث النبوي الشريف
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
