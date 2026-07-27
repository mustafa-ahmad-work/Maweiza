"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faUser,
    faCalendarAlt,
    faDownload,
    faEye,
    faLayerGroup
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

export default function KhotabClient({ initialKhotab = [], links = {}, pageId = "1", hasError = false }) {
    const [activeTab, setActiveTab] = useState("all");
    const [savedCount, setSavedCount] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [selectedKhotab, setSelectedKhotab] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshCounts = () => {
        setSavedCount(getSavedItems("khotab").length);
        setLikedCount(getLikedItems("khotab").length);
    };

    useEffect(() => {
        refreshCounts();
    }, []);

    let displayKhotab = initialKhotab;
    if (activeTab === "saved") {
        displayKhotab = getSavedItems("khotab");
    } else if (activeTab === "liked") {
        displayKhotab = getLikedItems("khotab");
    }

    const openPreview = (khutba) => {
        setSelectedKhotab(khutba);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closePreview = () => {
        setIsModalOpen(false);
        setSelectedKhotab(null);
        document.body.style.overflow = "auto";
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return null;
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (hasError) {
        return <ModernErrorState message="حدث خطأ أثناء تحميل قسم الخطب" onRetry={() => window.location.reload()} />;
    }

    return (
        <section className="pt-5 pb-20 container px-3 m-auto">
            {/* Filter Tabs */}
            <FilterTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalCount={links.total_items || initialKhotab.length}
                savedCount={savedCount}
                likedCount={likedCount}
            />

            {displayKhotab.length === 0 ? (
                <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "المفضلة" : "الخطب"} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayKhotab.map((item, key) => {
                        const khatib = item.prepared_by?.[0]?.title || 'خطيب غير محدد';
                        const mainAttachment = item.attachments?.[0];
                        const dateFormatted = item.add_date ? formatDate(item.add_date) : null;
                        const attachmentsCount = item.num_attachments || item.attachments?.length || 1;

                        return (
                            <div
                                key={key}
                                className="group flex flex-col h-full bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden"
                            >
                                {/* Static Top Meta Row */}
                                <div className="flex items-center justify-between px-4 pt-4 pb-2 bg-emerald-50/20 dark:bg-zinc-800/40 border-b border-gray-100 dark:border-zinc-800">
                                    <CategoryBadge label="خطبة جمعة ومحاضرة" />
                                    <CardActions item={item} categoryType="khotab" onUpdate={refreshCounts} />
                                </div>

                                {/* Visual Header */}
                                <div className="relative h-48 bg-[#449C40]/10 dark:bg-zinc-800/60 overflow-hidden flex items-center justify-center border-b border-gray-100 dark:border-zinc-800">
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
                                                    <FontAwesomeIcon icon={faMicrophone} />
                                                    <span>منبر خطب موعظة</span>
                                                </span>
                                                <span className="font-mono text-[10px] text-gray-500">#{item.id}</span>
                                            </div>

                                            <div className="my-auto py-1 text-center">
                                                <div className="w-11 h-11 mx-auto mb-1.5 bg-[#449C40] text-white rounded-full flex items-center justify-center shadow-xs">
                                                    <FontAwesomeIcon icon={faMicrophone} className="text-lg" />
                                                </div>
                                                <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100 line-clamp-2 leading-snug">
                                                    {item.title}
                                                </h4>
                                            </div>

                                            <div className="flex justify-between items-center text-[10px] text-gray-500 dark:text-zinc-400 border-t border-emerald-100 dark:border-zinc-700 pt-1.5 font-medium">
                                                <span className="truncate max-w-[130px]">الخطيب: {khatib}</span>
                                                <span className="px-2 py-0.5 bg-emerald-50 dark:bg-zinc-700 text-[#449C40] dark:text-emerald-400 rounded font-bold">{attachmentsCount} صيغ</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col flex-grow p-5">
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-zinc-400 text-xs mb-3 line-clamp-2 leading-relaxed flex-grow">
                                        {item.description || "خطبة جمعة نافعة تتناول موضوعات إيمانية ومجتمعية هامة."}
                                    </p>

                                    {/* Info Grid */}
                                    <div className="space-y-2 border-t border-gray-100 dark:border-zinc-800 pt-3.5 text-xs mb-5 bg-emerald-50/20 dark:bg-zinc-800/30 p-3 rounded-2xl">
                                        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5 truncate">
                                                <FontAwesomeIcon icon={faUser} className="text-[#449C40] w-3" />
                                                <span className="font-medium text-gray-500 dark:text-zinc-400">الخطيب والمحاضر:</span>
                                                <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{khatib}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="text-[#449C40] w-3" />
                                                <span>التاريخ:</span>
                                            </div>
                                            <span className="font-bold text-gray-700 dark:text-zinc-300">{dateFormatted}</span>
                                        </div>

                                        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <FontAwesomeIcon icon={faLayerGroup} className="text-[#449C40] w-3" />
                                                <span>الصيغ المتاحة:</span>
                                            </div>
                                            <span className="font-bold text-gray-700 dark:text-zinc-300">{attachmentsCount} صيغ (PDF/DOC/MP3)</span>
                                        </div>
                                    </div>

                                    {/* Dual Actions */}
                                    <div className="flex gap-2 mt-auto">
                                        <button
                                            onClick={() => openPreview(item)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-gray-800 dark:text-zinc-200 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors active:scale-[0.99]"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                            <span>معاينة وقراءة الخطبة</span>
                                        </button>

                                        <a
                                            href={mainAttachment?.url || '#'}
                                            download
                                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-colors active:scale-[0.99] shadow-xs"
                                            title="تحميل الخطبة"
                                        >
                                            <FontAwesomeIcon icon={faDownload} />
                                            <span>تحميل</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination */}
            {activeTab === "all" && (
                <EnhancedPagination links={links} basePath="/khotab" />
            )}

            {/* Universal Preview Modal */}
            {isModalOpen && selectedKhotab && (
                <UniversalPreviewModal
                    item={selectedKhotab}
                    categoryType="khotab"
                    onClose={closePreview}
                />
            )}
        </section>
    );
}
