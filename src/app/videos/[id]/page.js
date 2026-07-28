"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import Landing from "@/components/Layout/Landing";
import { API } from "@/config/constants";
import {
    FilterTabs,
    EnhancedPagination,
    EmptySavedState,
    ModernErrorState,
    UniversalPreviewModal
} from "@/components/shared/CategoryControls";
import UniversalCategoryCard from "@/components/shared/ExpressiveCards";
import { getSavedItems, getLikedItems } from "@/helpers/savedItems";

export default function VideosPage({ params }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videos, setVideos] = useState([]);
    const [links, setLinks] = useState({});
    const [activeTab, setActiveTab] = useState("all");
    const [savedCount, setSavedCount] = useState(0);
    const [likedCount, setLikedCount] = useState(0);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const refreshCounts = () => {
        setSavedCount(getSavedItems("videos").length);
        setLikedCount(getLikedItems("videos").length);
    };

    useEffect(() => {
        refreshCounts();
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await fetch(API.islamhouse("videos", params.id));
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setVideos(data.data || []);
                setLinks(data.links || {});
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('حدث خطأ أثناء تحميل الفيديوهات.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [params.id]);

    let displayVideos = videos;
    if (activeTab === "saved") {
        displayVideos = getSavedItems("videos");
    } else if (activeTab === "liked") {
        displayVideos = getLikedItems("videos");
    }

    const openVideoModal = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeVideoModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
        document.body.style.overflow = "auto";
    };

    return (
        <>
            <Landing
                title="قسم المرئيات والدروس المصورة"
                text={`شاهد وحمل أكثر من ${links?.total_items ? links.total_items.toLocaleString('ar-EG') : '840'} مادة وسلسلة مرئية تشتمل على آلاف المقاطع المصورة النافعة`}
            />

            <section className="pt-5 pb-20 container px-3 m-auto">
                {/* Header Info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center">
                        <FontAwesomeIcon icon={faVideo} className="ml-3 text-[#449C40] text-2xl" />
                        <span>المرئيات والدروس المصورة</span>
                    </h2>

                    <div className="text-xs text-gray-600 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 px-4 py-2.5 rounded-xl shadow-xs">
                        <span className="font-semibold text-[#449C40] dark:text-emerald-400">إجمالي المواد المرئية:</span> {links.total_items || '0'}
                    </div>
                </div>

                {/* Filter Tabs */}
                <FilterTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    totalCount={links.total_items || videos.length}
                    savedCount={savedCount}
                    likedCount={likedCount}
                />

                {loading ? (
                    <div className="min-h-[350px] flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#449C40] mx-auto"></div>
                            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-zinc-300">جارٍ تحميل الدروس المرئية...</p>
                        </div>
                    </div>
                ) : error ? (
                    <ModernErrorState message={error} onRetry={() => window.location.reload()} />
                ) : displayVideos.length === 0 ? (
                    <EmptySavedState typeName={activeTab === "saved" ? "المحفوظات" : activeTab === "liked" ? "المفضلة" : "المرئيات"} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayVideos.map((item, key) => (
                            <UniversalCategoryCard
                                key={key}
                                item={item}
                                categoryType="videos"
                                onOpenModal={() => openVideoModal(item)}
                                onUpdate={refreshCounts}
                                isSlider={false}
                            />
                        ))}
                    </div>
                )}

                {/* Enhanced Pagination */}
                {activeTab === "all" && (
                    <EnhancedPagination links={links} basePath="/videos" />
                )}

                {/* Universal Interactive Preview Modal */}
                {isModalOpen && selectedVideo && (
                    <UniversalPreviewModal
                        item={selectedVideo}
                        categoryType="videos"
                        onClose={closeVideoModal}
                    />
                )}
            </section>
        </>
    );
}
