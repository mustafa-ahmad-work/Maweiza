"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones } from "@fortawesome/free-solid-svg-icons";
import {
    FilterTabs,
    EnhancedPagination,
    EmptySavedState,
    ModernErrorState,
    UniversalPreviewModal
} from "@/components/shared/CategoryControls";
import UniversalCategoryCard from "@/components/shared/ExpressiveCards";
import { getSavedItems, getLikedItems } from "@/helpers/savedItems";

export default function AudiosClient({ initialAudios = [], links = {}, pageId = "1", hasError = false }) {
    const [activeTab, setActiveTab] = useState("all");
    const [savedCount, setSavedCount] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [selectedAudio, setSelectedAudio] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshCounts = () => {
        setSavedCount(getSavedItems("audios").length);
        setLikedCount(getLikedItems("audios").length);
    };

    useEffect(() => {
        refreshCounts();
    }, []);

    let displayAudios = initialAudios;
    if (activeTab === "saved") {
        displayAudios = getSavedItems("audios");
    } else if (activeTab === "liked") {
        displayAudios = getLikedItems("audios");
    }

    const openPreview = (audio) => {
        setSelectedAudio(audio);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closePreview = () => {
        setIsModalOpen(false);
        setSelectedAudio(null);
        document.body.style.overflow = "auto";
    };

    if (hasError) {
        return <ModernErrorState message="حدث خطأ أثناء تحميل قسم الصوتيات" onRetry={() => window.location.reload()} />;
    }

    return (
        <section className="pt-5 pb-20 container px-3 m-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                    <FontAwesomeIcon icon={faHeadphones} className="ml-3 text-[#449C40] text-2xl" />
                    <span>التسجيلات والصوتيات الإسلامية</span>
                </h2>

                <div className="text-xs text-gray-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl shadow-xs">
                    <span className="font-semibold text-[#449C40] dark:text-emerald-400">إجمالي الصوتيات المتاحة:</span> {links.total_items || '0'}
                </div>
            </div>

            {/* Filter Tabs */}
            <FilterTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                totalCount={links.total_items || initialAudios.length}
                savedCount={savedCount}
                likedCount={likedCount}
            />

            {displayAudios.length === 0 ? (
                <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "المفضلة" : "الصوتيات"} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayAudios.map((item, key) => (
                        <UniversalCategoryCard
                            key={key}
                            item={item}
                            categoryType="audios"
                            onOpenModal={() => openPreview(item)}
                            onUpdate={refreshCounts}
                            isSlider={false}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {activeTab === "all" && (
                <EnhancedPagination links={links} basePath="/audios" />
            )}

            {/* Universal Preview Modal */}
            {isModalOpen && selectedAudio && (
                <UniversalPreviewModal
                    item={selectedAudio}
                    categoryType="audios"
                    onClose={closePreview}
                />
            )}
        </section>
    );
}
