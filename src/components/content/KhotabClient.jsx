"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import {
    FilterTabs,
    EnhancedPagination,
    EmptySavedState,
    ModernErrorState,
    UniversalPreviewModal
} from "@/components/shared/CategoryControls";
import UniversalCategoryCard from "@/components/shared/ExpressiveCards";
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

    if (hasError) {
        return <ModernErrorState message="حدث خطأ أثناء تحميل قسم الخطب" onRetry={() => window.location.reload()} />;
    }

    return (
        <section className="pt-5 pb-20 container px-3 m-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    <FontAwesomeIcon icon={faMicrophone} className="ml-3 text-[#449C40] text-2xl" />
                    <span>الخطب والمنبريات</span>
                </h2>

                <div className="text-xs text-gray-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl shadow-xs">
                    <span className="font-semibold text-[#449C40] dark:text-emerald-400">إجمالي الخطب المتاحة:</span> {links.total_items || '0'}
                </div>
            </div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayKhotab.map((item, key) => (
                        <UniversalCategoryCard
                            key={key}
                            item={item}
                            categoryType="khotab"
                            onOpenModal={() => openPreview(item)}
                            onUpdate={refreshCounts}
                            isSlider={false}
                        />
                    ))}
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
