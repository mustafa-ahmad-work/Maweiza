"use client";

import { useState } from "react";
import Link from "next/link";
import sur from "@/data/sur.json";
import Search from "../Layout/Search";
import { optimizeString } from "@/helpers/optimizeString";

export default function Tafsir() {
    const [dataTafsir, setDataTafsir] = useState(sur.data.surahs.references);
    const [massage, setMassage] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const showData = dataTafsir.map((item, key) => (
        <Link
            key={key}
            href={`/tafsir/${item.number}`}
            className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all duration-300 hover:shadow-lg hover:border-transparent hover:scale-[1.02] active:scale-[0.98]"
        >
            {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-lime-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div> */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-gray-800 dark:text-gray-200 dark:group-hover:text-white transition-colors duration-300">
                    {optimizeString(item.name)}
                </span>
                <span className="mt-1 text-sm text-gray-500 dark:text-gray-400 dark:group-hover:text-white/80 transition-colors duration-300">
                    سورة {item.number}
                </span>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-lime-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </Link>
    ));

    function handleChange(e) {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim() === "") {
            setDataTafsir(sur.data.surahs.references);
            setMassage(false);
            return;
        }

        const dataFilter = sur.data.surahs.references.filter((item) =>
            optimizeString(item.name).includes(optimizeString(query))
        );
        setDataTafsir(dataFilter);
        setMassage(dataFilter.length === 0);
    }

    function clearSearch() {
        setSearchQuery("");
        setDataTafsir(sur.data.surahs.references);
        setMassage(false);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 pt-28 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        تفسير القرآن الكريم
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        اختر السورة التي تود قراءة تفسيرها من قائمة السور القرآنية أدناه
                    </p>
                </div>

                <div className="mb-10 max-w-2xl mx-auto">
                    <div className="relative">
                        <Search
                            handleChange={handleChange}
                            value={searchQuery}
                            placeholder="ابحث عن سورة..."
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute left-20 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                                aria-label="مسح البحث"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {massage ? (
                    <div className="container m-auto py-10">
                        <div className="text-center py-12">
                            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">لا توجد نتائج</h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                                لم نتمكن من العثور على سورة تطابق بحثك. يرجى التحقق من الإملاء أو محاولة استخدام كلمات مختلفة.
                            </p>
                            <button
                                onClick={clearSearch}
                                className="mt-6 px-6 py-2 bg-gradient-to-r from-emerald-500 to-lime-400 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300"
                            >
                                عرض جميع السور
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {showData}
                    </div>
                )}

                {dataTafsir.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            تم العثور على {dataTafsir.length} سورة
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
