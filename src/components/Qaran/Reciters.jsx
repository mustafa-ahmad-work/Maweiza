"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import recitersJson from "@/data/reciters.json";
import memorizingJson from "@/data/memorizingAll.json";
import Search from "../Layout/Search";
import { optimizeString } from "@/helpers/optimizeString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesSimple, faBookQuran, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Reciters(props) {
    let AlReciter = [];

    if (props.type === "listen") {
        AlReciter = recitersJson.reciters;
    } else {
        AlReciter = memorizingJson.data;
    }

    const [dataReciters, setDataReciters] = useState(AlReciter);
    const [massage, setMassage] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        setIsLoading(true);

        // محاكاة تأخير البحث لتحسين تجربة المستخدم
        setTimeout(() => {
            if (term.trim() === "") {
                setDataReciters(AlReciter);
                setMassage(false);
            } else {
                let dataFilter = AlReciter.filter((item) =>
                    optimizeString(props.type === "listen" ? item.name : item.name_ar).includes(optimizeString(term))
                );
                setDataReciters(dataFilter);
                setMassage(dataFilter.length === 0);
            }
            setIsLoading(false);
        }, 300);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setDataReciters(AlReciter);
        setMassage(false);
    };

    return (
        <div className="min-h-screen py-8 px-4 pt-28 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto">
                {/* عنوان القسم */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        القُرَّاء
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        اختر القارئ المفضل لديك للاستماع لتلاوة القرآن الكريم
                    </p>
                </div>

                {/* شريط البحث المحسن */}
                <div className="mb-10 max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder='ابحث عن قارئ...'
                            className="w-full py-4 pr-10 pl-4 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </button>
                        )}
                    </div>
                </div>

                {/* رسالة عدم وجود نتائج */}
                {massage ? (
                    <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-2xl mx-auto">
                        <div className="mb-4">
                            <FontAwesomeIcon icon={faSearch} className="text-4xl text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">لا توجد نتائج</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            لم نتمكن من العثور على ما تبحث عنه. حاول استخدام كلمات بحث مختلفة.
                        </p>
                        <button
                            onClick={clearSearch}
                            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
                        >
                            عرض الكل
                        </button>
                    </div>
                ) : (
                    <>
                        {/* عداد النتائج */}
                        <div className="mb-6 flex justify-between items-center">
                            <p className="text-gray-600 dark:text-gray-300">
                                {isLoading ? "جاري البحث..." : `عدد النتائج: ${dataReciters.length}`}
                            </p>
                        </div>

                        {/* شبكة البطاقات */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {dataReciters.map((item, key) => (
                                <Link
                                    key={key}
                                    href={`/qaran/${props.type}/${item.id}`}
                                    className="group bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                                >
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center ml-4">
                                                <FontAwesomeIcon
                                                    icon={props.type === "listen" ? faHeadphonesSimple : faBookQuran}
                                                    className="text-emerald-600 dark:text-emerald-400 text-xl"
                                                />
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                                {props.type === "listen" ? item.name : item.name_ar}
                                            </h3>
                                        </div>

                                        {props.type === "listen" && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="font-medium">الرواية:</span> {item.rewaya}
                                                </p>
                                            </div>
                                        )}

                                        <div className="mt-6 flex items-center justify-between">
                                            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
                                                قارئ
                                            </span>
                                            <span className="text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
