"use client";

import React, { useState, useEffect } from 'react';
import useSWR from "swr";
import { API } from "@/config/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";
import {
    FilterTabs,
    EnhancedPagination,
    EmptySavedState,
    ModernErrorState,
    UniversalPreviewModal
} from "@/components/shared/CategoryControls";
import UniversalCategoryCard from "@/components/shared/ExpressiveCards";
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
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                        <FontAwesomeIcon icon={faFeather} className="ml-3 text-[#449C40] text-2xl" />
                        <span>المقالات والدروس التحريرية</span>
                    </h2>

                    <div className="text-xs text-gray-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl shadow-xs">
                        <span className="font-semibold text-[#449C40] dark:text-emerald-400">إجمالي المقالات المتاحة:</span> {links.total_items || '0'}
                    </div>
                </div>

                {/* Filter Tabs */}
                <FilterTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    totalCount={links.total_items || initialArticles.length}
                    savedCount={savedCount}
                    likedCount={likedCount}
                />

                {displayArticles.length === 0 ? (
                    <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "تم الاطلاع" : "المقالات"} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayArticles.map((item, key) => (
                            <UniversalCategoryCard
                                key={key}
                                item={item}
                                categoryType="articles"
                                onOpenModal={() => openPreview(item)}
                                onUpdate={refreshCounts}
                                isSlider={false}
                            />
                        ))}
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