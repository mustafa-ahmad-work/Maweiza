"use client";

import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faClock, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function CategoryAdith({ category }) {
    const { data, error, isLoading } = useSWR(
        `https://hadeethenc.com/api/v1/hadeeths/list/?language=ar&category_id=${category}&per_page=1000`
    );

    if (isLoading) {
        return (
            <div className="text-center py-12 pt-28">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-200">جارٍ تحميل بيانات الأحاديث...</p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="text-center py-12 pt-28">
                <p className="text-red-600 dark:text-red-400">حدث خطأ أثناء تحميل البيانات.</p>
            </div>
        );
    }

    return (
        <section className="py-10 relative px-6 pt-28 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center mb-10 text-emerald-700 dark:text-emerald-400">
                    الأحاديث النبوية
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                href={`/adiths/${category}/${item.id}`}
                                className="block group overflow-hidden relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg hover:border-emerald-400 transition-all duration-300 p-5"
                            >
                                <div className="flex flex-col justify-between h-full">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 leading-relaxed group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200">
                                            {item.title}
                                        </h3>
                                        {item.explanation && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                                {item.explanation}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <FontAwesomeIcon icon={faBookOpen} className="text-emerald-500" />
                                            <span>حديث نبوي</span>
                                        </div>
                                        <div className="flex items-center gap-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                            <span>اقرأ</span>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </div>
                                    </div>
                                </div>

                                {/* شريط تفاعلي في أسفل البطاقة */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-lime-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
