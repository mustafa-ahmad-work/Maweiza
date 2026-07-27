"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestionCircle,
    faUser,
    faCalendarAlt,
    faDownload,
    faBookOpen
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

export default function FatwaClient({ initialFatwa = [], links = {}, pageId = "1", hasError = false }) {
    const [activeTab, setActiveTab] = useState("all");
    const [savedCount, setSavedCount] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [selectedFatwa, setSelectedFatwa] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshCounts = () => {
        setSavedCount(getSavedItems("fatwa").length);
        setLikedCount(getLikedItems("fatwa").length);
    };

    useEffect(() => {
        refreshCounts();
    }, []);

    let displayFatwa = initialFatwa;
    if (activeTab === "saved") {
        displayFatwa = getSavedItems("fatwa");
    } else if (activeTab === "liked") {
        displayFatwa = getLikedItems("fatwa");
    }

    const openPreview = (item) => {
        setSelectedFatwa(item);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closePreview = () => {
        setIsModalOpen(false);
        setSelectedFatwa(null);
        document.body.style.overflow = "auto";
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return null;
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (hasError) {
        return <ModernErrorState message="حدث خطأ أثناء تحميل قسم الفتاوى" onRetry={() => window.location.reload()} />;
    }

    return (
        <section className="pt-5 pb-20 container px-3 m-auto">
            {/* Filter Tabs */}
            <FilterTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalCount={links.total_items || initialFatwa.length}
                savedCount={savedCount}
                likedCount={likedCount}
            />

            {displayFatwa.length === 0 ? (
                <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "المفضلة" : "الفتاوى"} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayFatwa.map((item, key) => {
                        const mufti = item.prepared_by?.[0]?.title || 'الشيخ المفتي';
                        const mainAttachment = item.attachments?.[0];
                        const dateFormatted = item.add_date ? formatDate(item.add_date) : null;

                        return (
                            <div
                                key={key}
                                className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden"
                            >
                                {/* Header Meta Row */}
                                <div className="flex items-center justify-between px-4 pt-4 pb-2 bg-emerald-50/20 dark:bg-zinc-800/40 border-b border-gray-100 dark:border-zinc-800">
                                    <CategoryBadge label="فتوى شرعية" />
                                    <CardActions item={item} categoryType="fatwa" onUpdate={refreshCounts} />
                                </div>

                                {/* Header Preview */}
                                <div className="relative h-44 bg-[#449C40]/10 dark:bg-zinc-800/60 overflow-hidden flex items-center justify-center border-b border-gray-100 dark:border-zinc-800">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-emerald-50/60 dark:bg-zinc-800/90 p-4 flex flex-col justify-between relative">
                                            <div className="flex justify-between items-center text-xs text-[#449C40] dark:text-emerald-400 font-bold border-b border-emerald-100 dark:border-zinc-700 pb-1.5">
                                                <span className="flex items-center gap-1.5">
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                    <span>سؤال وجواب شرعي</span>
                                                </span>
                                                <span className="font-mono text-[10px] text-gray-500">#{item.id}</span>
                                            </div>

                                            <div className="my-auto py-1">
                                                <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100 line-clamp-2 leading-snug mb-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-[11px] text-gray-500 dark:text-zinc-400 line-clamp-1 font-medium">
                                                    المفتي: {mufti}
                                                </p>
                                            </div>

                                            <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-zinc-400 border-t border-emerald-100 dark:border-zinc-700 pt-1.5 font-medium">
                                                <span>تاريخ الفتوى: {dateFormatted || 'غير محدد'}</span>
                                                <span>{item.num_attachments || 0} مرفق</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow p-5">
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                                        {item.title}
                                    </h3>

                                    <div className="mb-3 flex-grow">
                                        <div className="p-3 bg-emerald-50/50 dark:bg-zinc-800/60 rounded-2xl border border-emerald-100/60 dark:border-zinc-700/60 text-xs text-gray-700 dark:text-zinc-300 leading-relaxed line-clamp-3 font-medium">
                                            {item.description || "فتوى وبيان لحكم شرعي مع التوضيح والأدلة المستند إليها من الكتاب والسنة."}
                                        </div>
                                    </div>

                                    {/* Info Grid */}
                                    <div className="space-y-2 border-t border-gray-100 dark:border-zinc-800 pt-3.5 text-xs mb-5 bg-emerald-50/20 dark:bg-zinc-800/30 p-3 rounded-2xl">
                                        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5 truncate">
                                                <FontAwesomeIcon icon={faUser} className="text-[#449C40] w-3" />
                                                <span className="font-medium text-gray-500 dark:text-zinc-400">فضيلة الشيخ المفتي:</span>
                                                <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{mufti}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="text-[#449C40] w-3" />
                                                <span>تاريخ النشر:</span>
                                            </div>
                                            <span className="font-bold text-gray-700 dark:text-zinc-300">{dateFormatted}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 mt-auto">
                                        <button
                                            onClick={() => openPreview(item)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-colors active:scale-[0.99] shadow-xs"
                                        >
                                            <FontAwesomeIcon icon={faBookOpen} />
                                            <span>قراءة الفتوى كاملة</span>
                                        </button>

                                        {mainAttachment ? (
                                            <a
                                                href={mainAttachment.url}
                                                download
                                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-800 dark:text-zinc-200 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors active:scale-[0.99]"
                                                title="تحميل مستند الفتوى"
                                            >
                                                <FontAwesomeIcon icon={faDownload} />
                                                <span>تحميل</span>
                                            </a>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {activeTab === "all" && (
                <EnhancedPagination links={links} basePath="/fatwa" />
            )}

            {/* Universal Preview Modal */}
            {isModalOpen && selectedFatwa && (
                <UniversalPreviewModal
                    item={selectedFatwa}
                    categoryType="fatwa"
                    onClose={closePreview}
                />
            )}
        </section>
    );
}
