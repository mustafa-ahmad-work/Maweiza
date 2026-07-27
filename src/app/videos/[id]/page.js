"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faUser,
    faCalendar,
    faDownload,
    faPlayCircle,
    faLayerGroup,
    faFileVideo
} from "@fortawesome/free-solid-svg-icons";
import Landing from "@/components/Layout/Landing";
import { API } from "@/config/constants";
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

    const formatDate = (timestamp) => {
        if (!timestamp) return null;
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' });
    };

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayVideos.map((item, key) => {
                            const presenter = item.prepared_by?.[0]?.title || 'محاضر غير محدد';
                            const dateFormatted = item.add_date ? formatDate(item.add_date) : null;
                            const isSeries = item.num_attachments > 1 || item.attachments?.length > 1;
                            const mainAttachment = item.attachments?.[0];

                            const fallbackVideoMedia = (
                                <div
                                    onClick={() => openVideoModal(item)}
                                    className="w-full h-full bg-zinc-950 p-4 flex flex-col justify-between relative cursor-pointer group hover:bg-zinc-900 transition-colors"
                                >
                                    <div className="flex justify-between items-center text-xs text-[#449C40] font-bold border-b border-zinc-800 pb-1.5">
                                        <span className="flex items-center gap-1.5">
                                            <FontAwesomeIcon icon={isSeries ? faLayerGroup : faFileVideo} />
                                            <span>{isSeries ? 'سلسلة دروس مرئية' : 'موعظة مرئية'}</span>
                                        </span>
                                        <span className="font-mono text-[10px] text-gray-400">#{item.id}</span>
                                    </div>

                                    <div className="my-auto py-1 text-center">
                                        <div className="w-12 h-12 mx-auto mb-2 bg-[#449C40] text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FontAwesomeIcon icon={faPlayCircle} className="text-xl" />
                                        </div>
                                        <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                                            {item.title}
                                        </h4>
                                    </div>

                                    <div className="flex justify-between items-center text-[10px] text-gray-400 border-t border-zinc-800 pt-1.5 font-medium">
                                        <span className="truncate max-w-[130px]">{presenter}</span>
                                        <span className="px-2 py-0.5 bg-[#449C40]/20 text-[#449C40] rounded font-bold">{isSeries ? `${item.num_attachments} مقاطع` : 'فيديو كامل'}</span>
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
                                            <CategoryBadge label={isSeries ? `سلسلة مرئية (${item.num_attachments || item.attachments?.length || 1} فيديو)` : "فيديو مرئي"} />
                                            <CardActions item={item} categoryType="videos" onUpdate={refreshCounts} />
                                        </div>

                                        {/* Cinema Video Header */}
                                        <div className="relative h-48 bg-zinc-950 overflow-hidden flex items-center justify-center border-b border-gray-100 dark:border-zinc-800">
                                            <div className="relative w-full h-full cursor-pointer group" onClick={() => openVideoModal(item)}>
                                                <SafeImage
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                                                    fallbackComponent={fallbackVideoMedia}
                                                />
                                                {item.image && (
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                                        <div className="w-13 h-13 bg-[#449C40] text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <FontAwesomeIcon icon={faPlayCircle} className="text-2xl" />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-5 pb-0">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed font-sans">
                                                {item.description || "درس مرئي ومحاضرة مصورة نافعة بإذن الله."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Locked Bottom Section */}
                                    <div className="p-5 pt-0">
                                        <div className="space-y-1.5 border-t border-gray-100 dark:border-zinc-800 pt-3 text-xs mb-4 bg-emerald-50/20 dark:bg-zinc-800/30 p-2.5 rounded-xl">
                                            <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                                <div className="flex items-center gap-1.5 truncate">
                                                    <FontAwesomeIcon icon={faUser} className="text-[#449C40] w-3 shrink-0" />
                                                    <span className="font-medium text-gray-500 dark:text-zinc-400">المحاضر:</span>
                                                    <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{presenter}</span>
                                                </div>
                                            </div>

                                            {dateFormatted && (
                                                <div className="flex items-center justify-between text-gray-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <FontAwesomeIcon icon={faCalendar} className="text-[#449C40] w-3 shrink-0" />
                                                        <span>الإضافة:</span>
                                                    </div>
                                                    <span className="font-bold text-gray-700 dark:text-zinc-300">{dateFormatted}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openVideoModal(item)}
                                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-colors active:scale-[0.99]"
                                            >
                                                <FontAwesomeIcon icon={faPlayCircle} />
                                                <span>مشاهدة الفيديو وسلسلة الدروس</span>
                                            </button>

                                            {mainAttachment ? (
                                                <a
                                                    href={mainAttachment.url}
                                                    download
                                                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-800 dark:text-zinc-200 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors active:scale-[0.99]"
                                                    title="تحميل الدرس المرئي"
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
