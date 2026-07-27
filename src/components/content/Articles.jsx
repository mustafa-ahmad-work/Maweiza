"use client";

import React, { useState, useEffect } from 'react';
import useSWR from "swr";
import { API } from "@/config/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDownload,
    faCalendar,
    faUser,
    faFileAlt,
    faEye,
    faClock,
    faPenNib
} from "@fortawesome/free-solid-svg-icons";
import {
    FilterTabs,
    CardActions,
    CategoryBadge,
    EnhancedPagination,
    EmptySavedState,
    ModernErrorState,
    UniversalPreviewModal
} from "@/components/shared/CategoryControls";
import { getSavedItems, getLikedItems } from "@/helpers/savedItems";

export default function Articles({ id = "1" }) {
    const { data, error, isLoading, mutate } = useSWR(API.islamhouse("articles", id));
    const [activeTab, setActiveTab] = useState("all");
    const [savedCount, setSavedCount] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshCounts = () => {
        setSavedCount(getSavedItems("articles").length);
        setLikedCount(getLikedItems("articles").length);
    };

    useEffect(() => {
        refreshCounts();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#449C40] mx-auto"></div>
                    <p className="mt-4 text-sm font-medium text-gray-700 dark:text-zinc-300">جارٍ تحميل بيانات المقالات...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return <ModernErrorState message="حدث خطأ أثناء تحميل المقالات" onRetry={() => mutate()} />;
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return null;
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const initialArticles = data?.data || [];
    const links = data?.links || {};

    let displayArticles = initialArticles;
    if (activeTab === "saved") {
        displayArticles = getSavedItems("articles");
    } else if (activeTab === "liked") {
        displayArticles = getLikedItems("articles");
    }

    const openPreview = (article) => {
        setSelectedArticle(article);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closePreview = () => {
        setIsModalOpen(false);
        setSelectedArticle(null);
        document.body.style.overflow = "auto";
    };

    return (
        <section className="py-10 min-h-screen">
            <div className="container px-4 mx-auto">
                {/* Filter Tabs */}
                <FilterTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    totalCount={links.total_items || initialArticles.length}
                    savedCount={savedCount}
                    likedCount={likedCount}
                />

                {displayArticles.length === 0 ? (
                    <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "المفضلة" : "المقالات"} />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayArticles.map((item, key) => {
                            const author = item.prepared_by?.[0]?.title || 'كاتب غير محدد';
                            const authorKind = item.prepared_by?.[0]?.kind === 'author' ? 'الكاتب' : 'إعداد';
                            const dateFormatted = item.add_date ? formatDate(item.add_date) : null;
                            const updateDateFormatted = item.update_date ? formatDate(item.update_date) : null;
                            const mainAttachment = item.attachments?.[0];

                            return (
                                <div
                                    key={key}
                                    className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden"
                                >
                                    {/* Header Meta Row */}
                                    <div className="flex items-center justify-between px-4 pt-4 pb-2 bg-emerald-50/20 dark:bg-zinc-800/40 border-b border-gray-100 dark:border-zinc-800">
                                        <CategoryBadge label="مقال تحريري" />
                                        <CardActions item={item} categoryType="articles" onUpdate={refreshCounts} />
                                    </div>

                                    {/* Cover / Editorial Box */}
                                    <div className="relative h-48 bg-slate-100 dark:bg-zinc-800/60 overflow-hidden flex items-center justify-center border-b border-gray-100 dark:border-zinc-800">
                                        {item.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-emerald-50/50 dark:bg-zinc-800/90 p-4 flex flex-col justify-between relative">
                                                <div className="flex justify-between items-center text-xs text-[#449C40] dark:text-emerald-400 font-bold border-b border-emerald-100 dark:border-zinc-700 pb-1.5">
                                                    <span className="flex items-center gap-1.5">
                                                        <FontAwesomeIcon icon={faPenNib} />
                                                        <span>منصة المقالات والدروس</span>
                                                    </span>
                                                    <span className="font-mono text-[10px] text-gray-500">#{item.id}</span>
                                                </div>

                                                <div className="my-auto py-1">
                                                    <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100 line-clamp-2 leading-snug mb-1">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 line-clamp-1 font-medium">
                                                        بقلم: {author}
                                                    </p>
                                                </div>

                                                <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-zinc-400 border-t border-emerald-100 dark:border-zinc-700 pt-1.5 font-medium">
                                                    <span>نشر: {dateFormatted || 'غير محدد'}</span>
                                                    <span>{item.num_attachments || 0} مرفقات</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-grow p-5">
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-zinc-400 text-xs leading-relaxed line-clamp-3 mb-4 flex-grow font-sans">
                                            {item.description || "مقال إسلامي تربوي نافع يحتوي على فوائد وتوجيهات شرعية متميزة."}
                                        </p>

                                        {/* Info Box */}
                                        <div className="space-y-2 border-t border-gray-100 dark:border-zinc-800 pt-3.5 text-xs mb-5 bg-emerald-50/20 dark:bg-zinc-800/30 p-3 rounded-2xl">
                                            <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                                <div className="flex items-center gap-1.5 truncate">
                                                    <FontAwesomeIcon icon={faUser} className="text-[#449C40] w-3" />
                                                    <span className="font-medium text-gray-500 dark:text-zinc-400">{authorKind}:</span>
                                                    <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                                <div className="flex items-center gap-1.5">
                                                    <FontAwesomeIcon icon={faCalendar} className="text-[#449C40] w-3" />
                                                    <span>تاريخ النشر:</span>
                                                </div>
                                                <span className="font-bold text-gray-700 dark:text-zinc-300">{dateFormatted}</span>
                                            </div>

                                            {updateDateFormatted && updateDateFormatted !== dateFormatted && (
                                                <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <FontAwesomeIcon icon={faClock} className="text-[#449C40] w-3" />
                                                        <span>آخر تحديث:</span>
                                                    </div>
                                                    <span className="font-bold text-gray-700 dark:text-zinc-300">{updateDateFormatted}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 mt-auto">
                                            <button
                                                onClick={() => openPreview(item)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-gray-800 dark:text-zinc-200 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors active:scale-[0.99]"
                                            >
                                                <FontAwesomeIcon icon={faEye} />
                                                <span>قراءة المقال</span>
                                            </button>

                                            {mainAttachment ? (
                                                <a
                                                    href={mainAttachment.url}
                                                    download
                                                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-colors active:scale-[0.99] shadow-xs"
                                                    title="تحميل المقال"
                                                >
                                                    <FontAwesomeIcon icon={faDownload} />
                                                    <span>تحميل</span>
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => openPreview(item)}
                                                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-colors"
                                                >
                                                    قراءة
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Enhanced Pagination */}
                {activeTab === "all" && (
                    <EnhancedPagination links={links} basePath="/articles" />
                )}
            </div>

            {/* Universal Preview Modal */}
            {isModalOpen && selectedArticle && (
                <UniversalPreviewModal
                    item={selectedArticle}
                    categoryType="articles"
                    onClose={closePreview}
                />
            )}
        </section>
    );
}