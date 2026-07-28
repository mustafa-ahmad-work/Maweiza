"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import {
    FilterTabs,
    EnhancedPagination,
    EmptySavedState,
    ModernErrorState,
    UniversalPreviewModal
} from "@/components/shared/CategoryControls";
import UniversalCategoryCard from "@/components/shared/ExpressiveCards";
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

    if (hasError) {
        return <ModernErrorState message="حدث خطأ أثناء تحميل قسم الفتاوى" onRetry={() => window.location.reload()} />;
    }

    return (
        <section className="pt-5 pb-20 container px-3 m-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    <FontAwesomeIcon icon={faQuestionCircle} className="ml-3 text-[#449C40] text-2xl" />
                    <span>الفتاوى والأحكام الشرعية</span>
                </h2>

                <div className="text-xs text-gray-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl shadow-xs">
                    <span className="font-semibold text-[#449C40] dark:text-emerald-400">إجمالي الفتاوى المتاحة:</span> {links.total_items || '0'}
                </div>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalCount={links.total_items || initialFatwa.length}
                savedCount={savedCount}
                likedCount={likedCount}
            />

            {displayFatwa.length === 0 ? (
                <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "تم الاطلاع" : "الفتاوى"} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayFatwa.map((item, key) => (
                        <UniversalCategoryCard
                            key={key}
                            item={item}
                            categoryType="fatwa"
                            onOpenModal={() => openPreview(item)}
                            onUpdate={refreshCounts}
                            isSlider={false}
                        />
                    ))}
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
