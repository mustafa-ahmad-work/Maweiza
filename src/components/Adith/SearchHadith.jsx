"use client";

import Link from "next/link";
import { useState } from "react";
import localStorage from 'local-storage';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBook, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function SearchHadith(props) {
    const [id, setId] = useState((props.id != "-") ? (localStorage.get('id')) ?? "" : "");
    const [isFocused, setIsFocused] = useState(false);

    function handleChange(e) {
        setId(e.target.value);
        localStorage.set('id', e.target.value);
    }

    function clearSearch() {
        setId("");
        localStorage.set('id', "");
    }

    return (
        <div className="font-sans px-5 text-black dark:text-white flex items-center justify-center my-8">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl"
            >
                <div className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${isFocused ? 'ring-2 ring-amber-500 shadow-amber-200 dark:shadow-amber-900/30' : ''}`}>
                    {/* خلفية زخرفية إسلامية */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500 rounded-full mix-blend-soft-light filter blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500 rounded-full mix-blend-soft-light filter blur-xl" />
                    </div>

                    <div className="relative flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        {/* أيقونة الكتاب الإسلامية */}
                        <div className="pr-4 text-amber-600 dark:text-amber-400">
                            <FontAwesomeIcon icon={faBook} className="text-lg" />
                        </div>

                        <input
                            type="text"
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="px-4 py-4 bg-transparent block w-full focus:outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="ابحث في كنوز السنة النبوية..."
                            value={id ?? ""}
                        />

                        {/* زر مسح البحث */}
                        {id && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={clearSearch}
                                className="px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </motion.button>
                        )}

                        {/* زر البحث */}
                        <Link
                            href={"/search/" + id}
                            className="flex items-center justify-center px-6 py-5 transition-colors bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                        >
                            <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* نص توضيحي تحت حقل البحث */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400"
                >
                    ابحث عن أي حديث نبوي باستخدام كلمة مفتاحية
                </motion.p>
            </motion.div>
        </div>
    );
}
