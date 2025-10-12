"use client";

import Link from 'next/link';
import React from 'react';
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faDownload,
    faCalendar,
    faUser,
    faFileAlt,
    faImage,
    faInfoCircle,
    faGlobe
} from "@fortawesome/free-solid-svg-icons";

export default function Articles({ id }) {
    const { data, error, isLoading } = useSWR(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/articles/ar/ar/${id}/25/json`);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-6 text-xl text-gray-700 dark:text-gray-300 font-medium">جارٍ تحميل بيانات المقالات...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center py-12">
                <div className="text-center bg-red-50 dark:bg-red-900/20 p-8 rounded-xl max-w-md">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">حدث خطأ أثناء تحميل البيانات</h3>
                    <p className="text-red-600 dark:text-red-300">يرجى المحاولة مرة أخرى لاحقًا</p>
                </div>
            </div>
        );
    }

    // Format date function
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getImportanceArabic = (level) => {
        if (!level) return "غير محدد";

        switch (level.toLowerCase()) {
            case "critical":
            case "high":
                return "مهم جدًا";
            case "normal":
                return "عادي";
            case "low":
                return "منخفض الأهمية";
            default:
                return "غير محدد";
        }
    };

    return (
        <section className="py-12 min-h-screen">
            <div className="container px-4 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.data.map((item, key) => (
                        <div
                            key={key}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 dark:border-gray-700">

                            {/* Article Image */}
                            <div className="h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center p-4">
                                        <FontAwesomeIcon icon={faImage} className="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                                        <p className="text-gray-500 dark:text-gray-400">لا توجد صورة متاحة</p>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                {/* Article Meta */}
                                <div className="flex flex-wrap gap-2 mb-4 text-sm">
                                    <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                                        <FontAwesomeIcon icon={faCalendar} className="ml-3" />
                                        <span>{formatDate(item.add_date)}</span>
                                    </div>

                                    {item.prepared_by && item.prepared_by.length > 0 && (
                                        <div className="flex items-center bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full">
                                            <FontAwesomeIcon icon={faUser} className="ml-3" />
                                            <span>{item.prepared_by[0].title}</span>
                                        </div>
                                    )}

                                    {/* <div className="flex items-center bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full">
                                        <FontAwesomeIcon icon={faFileAlt} className="ml-3" />
                                        <span>{item.type}</span>
                                    </div> */}

                                    {/* <div className="flex items-center bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full">
                                        <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                                        <span>{item.source_language}</span>
                                    </div> */}
                                </div>

                                {/* Article Title */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {item.title}
                                </h3>

                                {/* Article Description */}
                                <div className="mb-5">
                                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-3">
                                        {item.description || "لا يوجد وصف متاح لهذا المقال"}
                                    </p>

                                    {item.full_description && (
                                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <div className="flex items-start">
                                                <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500 mt-1 ml-2" />
                                                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: item.full_description }}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Article Details */}
                                <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                                    {/* <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                        <p className="text-gray-500 dark:text-gray-400">المعرف</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">#{item.id}</p>
                                    </div> */}
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                        <p className="text-gray-500 dark:text-gray-400">الأهمية</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{getImportanceArabic(item.importance_level)}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                        <p className="text-gray-500 dark:text-gray-400">التحديث</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{formatDate(item.update_date)}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                        <p className="text-gray-500 dark:text-gray-400">المرفقات</p>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{item.num_attachments}</p>
                                    </div>
                                </div>

                                {/* Attachments */}
                                <div className="mt-auto">
                                    {item.attachments && item.attachments.length > 0 ? (
                                        <div className="space-y-3">
                                            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">تحميل المقال:</h4>
                                            {item.attachments.map((attachment, key2) => (
                                                <a
                                                    key={key2}
                                                    href={attachment.url}
                                                    download
                                                    className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 hover:shadow-md">
                                                    <div className="flex items-center">
                                                        <FontAwesomeIcon icon={faDownload} className="ml-2" />
                                                        <span>تحميل المقال</span>
                                                    </div>
                                                    <span className="text-sm bg-white/20 px-2 py-1 rounded">
                                                        {attachment.extension_type}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-3 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-gray-500 dark:text-gray-400">
                                            لا توجد مرفقات متاحة
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                    {data.links.prev === "" ? (
                        <div></div>
                    ) : (
                        <Link
                            href={`/articles/${Number(id) - 1}`}
                            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300">
                            <FontAwesomeIcon className="ml-2" icon={faAngleDoubleRight} />
                            السابق
                        </Link>
                    )}

                    <div className="flex items-center justify-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300">
                        <span className="font-medium">صفحة {data.links.current_page} من {data.links.pages_number}</span>
                    </div>

                    {data.links.next === "" ? (
                        <div></div>
                    ) : (
                        <Link
                            href={`/articles/${Number(id) + 1}`}
                            className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300">
                            التالي
                            <FontAwesomeIcon className="mr-2" icon={faAngleDoubleLeft} />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}
