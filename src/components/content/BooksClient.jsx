"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBook,
    faUser,
    faFileAlt,
    faDownload,
    faEye,
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
import SafeImage from "@/components/shared/SafeImage";
import { getSavedItems, getLikedItems } from "@/helpers/savedItems";

export default function BooksClient({ initialBooks = [], links = {}, pageId = "1", hasError = false }) {
    const [activeTab, setActiveTab] = useState("all");
    const [savedCount, setSavedCount] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshCounts = () => {
        setSavedCount(getSavedItems("books").length);
        setLikedCount(getLikedItems("books").length);
    };

    useEffect(() => {
        refreshCounts();
    }, []);

    let displayBooks = initialBooks;
    if (activeTab === "saved") {
        displayBooks = getSavedItems("books");
    } else if (activeTab === "liked") {
        displayBooks = getLikedItems("books");
    }

    const openPreview = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closePreview = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
        document.body.style.overflow = "auto";
    };

    if (hasError) {
        return <ModernErrorState message="حدث خطأ أثناء تحميل مكتبة الكتب" onRetry={() => window.location.reload()} />;
    }

    return (
        <section className="pt-5 pb-20 container px-3 m-auto">
            {/* Header Title & Count */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    <FontAwesomeIcon icon={faBook} className="ml-3 text-[#449C40] text-2xl" />
                    <span>المكتبة الإسلامية والكتب</span>
                </h2>

                <div className="text-xs text-gray-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl shadow-xs">
                    <span className="font-semibold text-[#449C40] dark:text-emerald-400">إجمالي الكتب المتاحة:</span> {links.total_items || '0'}
                </div>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalCount={links.total_items || initialBooks.length}
                savedCount={savedCount}
                likedCount={likedCount}
            />

            {/* Grid with Uniform Height */}
            {displayBooks.length === 0 ? (
                <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "المفضلة" : "الكتب"} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayBooks.map((item, key) => {
                        const mainAttachment = item.attachments?.[0];
                        const author = item.prepared_by?.[0]?.title || 'مؤلف غير محدد';
                        const authorKind = item.prepared_by?.[0]?.kind === 'author' ? 'المؤلف' : 'إعداد';

                        const fallbackBookCover = (
                            <div className="w-full h-full bg-white dark:bg-zinc-800 rounded-2xl border border-emerald-100 dark:border-zinc-700 p-3 flex flex-col justify-between shadow-xs">
                                <div className="flex items-center justify-between text-xs text-[#449C40] dark:text-emerald-400 font-bold border-b border-emerald-100 dark:border-zinc-700 pb-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <FontAwesomeIcon icon={faBookOpen} />
                                        <span>مكتبة موعظة</span>
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-mono">#{item.id}</span>
                                </div>

                                <div className="my-auto py-1 text-center">
                                    <div className="w-10 h-10 mx-auto mb-1.5 bg-[#449C40] text-white rounded-full flex items-center justify-center shadow-xs">
                                        <FontAwesomeIcon icon={faBook} className="text-base" />
                                    </div>
                                    <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100 line-clamp-2 leading-snug">
                                        {item.title}
                                    </h4>
                                </div>

                                <div className="text-[10px] text-gray-500 dark:text-zinc-400 border-t border-emerald-100 dark:border-zinc-700 pt-1 flex justify-between items-center font-medium">
                                    <span className="truncate max-w-[120px]">{author}</span>
                                    <span className="px-2 py-0.5 bg-emerald-50 dark:bg-zinc-700 text-[#449C40] dark:text-emerald-400 rounded font-bold">{mainAttachment?.extension_type || 'PDF'}</span>
                                </div>
                            </div>
                        );

                        return (
                            <div
                                key={key}
                                className="group flex flex-col justify-between h-[520px] bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 hover:border-[#449C40] transition-colors duration-300 overflow-hidden"
                            >
                                <div>
                                    {/* Top Row Meta */}
                                    <div className="flex items-center justify-between px-4 pt-4 pb-2 bg-emerald-50/20 dark:bg-zinc-800/40 border-b border-gray-100 dark:border-zinc-800">
                                        <CategoryBadge label="كتاب إسلامي" />
                                        <CardActions item={item} categoryType="books" onUpdate={refreshCounts} />
                                    </div>

                                    {/* Book Cover Container with SafeImage */}
                                    <div className="relative h-48 bg-emerald-50/20 dark:bg-zinc-800/40 flex items-center justify-center p-3 overflow-hidden border-b border-gray-100 dark:border-zinc-800">
                                        <div className="relative w-full h-full cursor-pointer" onClick={() => openPreview(item)}>
                                            <SafeImage
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                fallbackComponent={fallbackBookCover}
                                            />
                                        </div>
                                    </div>

                                    {/* Body Description */}
                                    <div className="p-5 pb-0">
                                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed font-sans">
                                            {item.description || "كتاب قيم ومفيد في علوم العقيدة، التفسير، الفقه والحديث الشريف."}
                                        </p>
                                    </div>
                                </div>

                                {/* Locked Bottom Section */}
                                <div className="p-5 pt-0">
                                    <div className="space-y-1.5 text-xs border-t border-gray-100 dark:border-zinc-800 pt-3 mb-4 bg-emerald-50/20 dark:bg-zinc-800/30 p-2.5 rounded-xl">
                                        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5 truncate">
                                                <FontAwesomeIcon icon={faUser} className="text-[#449C40] w-3 shrink-0" />
                                                <span className="font-medium text-gray-500 dark:text-zinc-400">{authorKind}:</span>
                                                <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                            <div className="flex items-center gap-1.5">
                                                <FontAwesomeIcon icon={faFileAlt} className="text-[#449C40] w-3 shrink-0" />
                                                <span>الملف:</span>
                                            </div>
                                            <span className="font-bold text-gray-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 px-2 py-0.5 rounded border border-gray-200 dark:border-zinc-700 text-[10px]">
                                                {mainAttachment?.size || 'غير محدد'} • {mainAttachment?.extension_type || 'PDF'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openPreview(item)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-gray-800 dark:text-zinc-200 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors active:scale-[0.99]"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                            <span>معاينة وقراءة</span>
                                        </button>

                                        <a
                                            href={mainAttachment?.url || '#'}
                                            download
                                            className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-colors active:scale-[0.99] shadow-xs"
                                            title="تحميل الكتاب"
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
                <EnhancedPagination links={links} basePath="/books" />
            )}

            {/* Universal Interactive Preview Modal */}
            {isModalOpen && selectedBook && (
                <UniversalPreviewModal
                    item={selectedBook}
                    categoryType="books"
                    onClose={closePreview}
                />
            )}
        </section>
    );
}
