"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark as faBookmarkSolid,
    faRotateRight,
    faAngleDoubleRight,
    faAngleDoubleLeft,
    faExclamationTriangle,
    faFolderOpen,
    faDownload,
    faSpinner,
    faTimes,
    faFilePdf,
    faFileAlt,
    faHeadphones,
    faVideo,
    faBook,
    faListUl,
    faCopy,
    faCheck,
    faCheckCircle,
    faPlayCircle,
    faVolumeUp
} from "@fortawesome/free-solid-svg-icons";
import {
    faBookmark as faBookmarkRegular
} from "@fortawesome/free-regular-svg-icons";
import { isSaved, toggleSave, isLiked, toggleLike } from "@/helpers/savedItems";

const ISLAMHOUSE_API_KEY = "paV29H2gm56kvLPy";

const getSingleFileUrl = (att) => {
    if (!att) return "";
    if (typeof att === "string") return att;
    return att.url || att.link || att.file_url || att.path || "";
};

const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
        const videoId = url.split("youtu.be/")[1]?.split("?")[0];
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
};

// دالة إظهار إشعار أخضر فريد ومؤكد
const showSingleGreenToast = (msg, isSuccess = true) => {
    toast.dismiss(); // مسح وإلغاء أي إشعارات سابقة فوراً
    toast(msg, {
        position: "bottom-left",
        backgroundColor: isSuccess ? "#449C40" : "#2d692a",
    });
};

// ===================================
// 1. شريط تبويب الفلترة لدعم اللايت والدارك بدون شادو
// ===================================
export function FilterTabs({ activeTab, setActiveTab, totalCount = 0, savedCount = 0, likedCount = 0 }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white dark:bg-zinc-900 p-2.5 rounded-2xl border border-gray-200 dark:border-zinc-800 relative z-30">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setActiveTab("all")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === "all"
                        ? "bg-[#449C40] text-white"
                        : "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        }`}
                >
                    <FontAwesomeIcon icon={faFolderOpen} className="text-xs" />
                    <span>الكل ({totalCount})</span>
                </button>

                <button
                    onClick={() => setActiveTab("saved")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === "saved"
                        ? "bg-[#449C40] text-white"
                        : "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        }`}
                >
                    <FontAwesomeIcon icon={faBookmarkSolid} className="text-xs" />
                    <span>المحفوظات ({savedCount})</span>
                </button>

                <button
                    onClick={() => setActiveTab("liked")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === "liked"
                        ? "bg-[#449C40] text-white"
                        : "text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
                        }`}
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="text-xs text-[#449C40]" />
                    <span>تم الاطلاع ({likedCount})</span>
                </button>
            </div>

            <div className="text-xs text-gray-600 dark:text-zinc-400 font-semibold px-3 hidden sm:block">
                تصفح ومتابعة المواد التي تم الاطلاع عليها
            </div>
        </div>
    );
}

// ===================================
// 2. أزرار وضع علامة "تم الاطلاع" والحفظ مع الإشعار المباشر
// ===================================
export function CardActions({ item, categoryType, onUpdate }) {
    const [saved, setSaved] = useState(false);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (item && item.id) {
            setSaved(isSaved(categoryType, item.id));
            setLiked(isLiked(categoryType, item.id));
        }
    }, [item, categoryType]);

    const handleSave = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newState = toggleSave(item, categoryType);
        setSaved(newState);
        if (onUpdate) onUpdate();

        if (newState) {
            showSingleGreenToast("تم حفظ المادة بنجاح في مكتبة المحفوظات", true);
        } else {
            showSingleGreenToast("تم إزالة المادة من قائمة المحفوظات", false);
        }
    };

    const handleLike = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newState = toggleLike(item, categoryType);
        setLiked(newState);
        if (onUpdate) onUpdate();

        if (newState) {
            showSingleGreenToast("تم وضع علامة: تم الاطلاع بنجاح", true);
        } else {
            showSingleGreenToast("تم إزالة علامة الاطلاع", false);
        }
    };

    return (
        <div className="flex items-center gap-1.5 relative">
            <button
                onClick={handleSave}
                title={saved ? "محفوظ في مكتبتك" : "حفظ المادة"}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${saved
                    ? "bg-[#449C40] text-white shadow-xs"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-400"
                    }`}
            >
                <FontAwesomeIcon icon={saved ? faBookmarkSolid : faBookmarkRegular} className="text-xs" />
            </button>

            {liked ? (
                <button
                    onClick={handleLike}
                    title="تم الاطلاع (انقر لإلغاء العلامة)"
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-[#449C40] dark:text-emerald-400 border border-[#449C40]/40 rounded-lg text-[11px] font-bold transition-all hover:bg-emerald-100"
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="text-xs text-[#449C40]" />
                    <span>تم الاطلاع</span>
                </button>
            ) : (
                <button
                    onClick={handleLike}
                    title="تعليم كـ تم الاطلاع"
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all bg-gray-100 hover:bg-emerald-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-400 hover:text-[#449C40]"
                >
                    <FontAwesomeIcon icon={faCheckCircle} className="text-xs" />
                </button>
            )}
        </div>
    );
}

// ===================================
// 3. شارة القسم الموحدة بدون شادو
// ===================================
export function CategoryBadge({ label }) {
    return (
        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-[#449C40] text-white">
            {label}
        </span>
    );
}

// ===================================
// 4. الباجنيشن المطور بدون شادو لدعم اللايت والدارك
// ===================================
export function EnhancedPagination({ links, basePath = "", onPageChange, isLoading = false }) {
    if (!links || (!links.prev && !links.next && links.pages_number <= 1)) {
        return null;
    }

    const currentPage = Number(links.current_page || 1);
    const totalPages = Number(links.pages_number || 1);
    const totalItems = Number(links.total_items || 0);

    const itemsPerPage = 25;
    const currentItemsCount = Math.min(totalItems, currentPage * itemsPerPage);
    const remainingItems = Math.max(0, totalItems - currentItemsCount);

    return (
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gray-200 dark:border-zinc-800">
            {links.prev === "" || !links.prev ? (
                <div className="w-full sm:w-32"></div>
            ) : (
                <Link
                    href={`${basePath}/${currentPage - 1}`}
                    onClick={() => onPageChange && onPageChange(currentPage - 1)}
                    className="flex items-center justify-center w-full sm:w-32 py-2.5 px-4 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-[#449C40] hover:text-white hover:border-[#449C40] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 transition-all"
                >
                    <FontAwesomeIcon className="ml-2" icon={faAngleDoubleRight} />
                    السابق
                </Link>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-2 text-center text-xs font-medium text-gray-700 dark:text-zinc-300">
                <span className="px-3.5 py-1.5 bg-gray-50 dark:bg-zinc-800 rounded-lg border border-gray-200/80 dark:border-zinc-700">
                    الصفحة <strong>{currentPage}</strong> من <strong>{totalPages}</strong>
                </span>

                {totalItems > 0 && (
                    <span className="px-3.5 py-1.5 bg-emerald-50 dark:bg-zinc-800 text-[#449C40] dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-zinc-700 font-semibold">
                        إجمالي العناصر: {totalItems} • المتبقي: {remainingItems}
                    </span>
                )}

                {isLoading && (
                    <span className="flex items-center gap-1.5 text-[#449C40]">
                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                        جارٍ التحميل...
                    </span>
                )}
            </div>

            {links.next === "" || !links.next ? (
                <div className="w-full sm:w-32"></div>
            ) : (
                <Link
                    href={`${basePath}/${currentPage + 1}`}
                    onClick={() => onPageChange && onPageChange(currentPage + 1)}
                    className="flex items-center justify-center w-full sm:w-32 py-2.5 px-4 text-xs font-bold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:bg-[#449C40] hover:text-white hover:border-[#449C40] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 transition-all"
                >
                    التالي
                    <FontAwesomeIcon className="mr-2" icon={faAngleDoubleLeft} />
                </Link>
            )}
        </div>
    );
}

// ===================================
// 5. واجهة الخطأ الحديثة بدون شادو
// ===================================
export function ModernErrorState({ message = "حدث خطأ أثناء تحميل البيانات", onRetry }) {
    return (
        <div className="min-h-[350px] flex items-center justify-center py-12 px-4">
            <div className="text-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl max-w-md w-full">
                <div className="w-16 h-16 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-100 dark:border-red-900/60">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl" />
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {message}
                </h3>

                <p className="text-xs text-gray-500 dark:text-zinc-400 mb-6">
                    يرجى التحقق من الاتصال بالإنترنت أو محاولة تنشيط الصفحة مرة أخرى.
                </p>

                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#449C40] hover:bg-[#00703C] text-white text-xs font-bold rounded-xl transition-colors active:scale-[0.99]"
                    >
                        <FontAwesomeIcon icon={faRotateRight} />
                        <span>إعادة المحاولة</span>
                    </button>
                )}
            </div>
        </div>
    );
}

// ===================================
// 6. واجهة الأرشيف الفارغ بدون شادو
// ===================================
export function EmptySavedState({ typeName = "المحفوظات" }) {
    return (
        <div className="min-h-[300px] flex items-center justify-center py-12 px-4">
            <div className="text-center bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-8 rounded-3xl max-w-md w-full">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-zinc-800 text-[#449C40] rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 dark:border-zinc-700">
                    <FontAwesomeIcon icon={faFolderOpen} className="text-xl" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    لا توجد عناصر في {typeName} حالياً
                </h3>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                    يمكنك إضافة المواد لقائمة {typeName} بالضغط على أيقونة الحفظ أو علامة (تم الاطلاع) على أي كرت.
                </p>
            </div>
        </div>
    );
}

// ===================================
// 7. مودال المعاينة التفاعلي بدون شادو
// ===================================
export function UniversalPreviewModal({ item, categoryType, onClose }) {
    const [itemDetail, setItemDetail] = useState(item);
    const [fetchingDetail, setFetchingDetail] = useState(false);
    const [selectedAttachmentIndex, setSelectedAttachmentIndex] = useState(0);
    const [copiedText, setCopiedText] = useState(false);

    useEffect(() => {
        if (!item || !item.id) return;
        const fetchFullDetail = async () => {
            try {
                setFetchingDetail(true);
                const res = await fetch(`https://api3.islamhouse.com/v3/${ISLAMHOUSE_API_KEY}/main/get-item/${item.id}/ar/json`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.id) {
                        setItemDetail((prev) => ({
                            ...prev,
                            ...data,
                            full_description: data.full_description || prev?.full_description || data.description || prev?.description,
                            attachments: (data.attachments && data.attachments.length > 0) ? data.attachments : prev?.attachments || []
                        }));
                    }
                }
            } catch (err) {
                console.error("Error fetching full item detail:", err);
            } finally {
                setFetchingDetail(false);
            }
        };

        fetchFullDetail();
    }, [item]);

    if (!item) return null;

    const attachments = itemDetail?.attachments || item?.attachments || [];
    const activeAttachment = attachments[selectedAttachmentIndex] || attachments[0];

    const rawFileUrl = getSingleFileUrl(activeAttachment);
    const fileUrl = typeof rawFileUrl === "string" ? rawFileUrl : "";
    const ext = activeAttachment?.extension_type?.toLowerCase() || "";

    const isPdf = ext === "pdf" || fileUrl.toLowerCase().includes(".pdf");
    const isDoc = ext === "doc" || ext === "docx" || fileUrl.toLowerCase().includes(".doc") || fileUrl.toLowerCase().includes(".docx");
    const isYouTube = fileUrl.includes("youtube.com") || fileUrl.includes("youtu.be");
    const isVideo = ext === "mp4" || categoryType === "videos" || fileUrl.toLowerCase().includes(".mp4") || isYouTube;
    const isAudio = !isVideo && !isPdf && !isDoc && (ext === "mp3" || categoryType === "audios" || fileUrl.toLowerCase().includes(".mp3"));

    const categoryTitle =
        categoryType === "books" ? "معاينة الكتاب" :
            categoryType === "articles" ? "معاينة المقال" :
                categoryType === "khotab" ? "معاينة الخطبة" :
                    categoryType === "fatwa" ? "معاينة الفتوى" :
                        categoryType === "audios" ? "مشغل الصوتيات والسلسلة" : "مشاهدة المرئيات والدروس";

    const copyFatwaText = () => {
        const textToCopy = itemDetail?.full_description || itemDetail?.description || itemDetail?.title || "";
        const cleanText = textToCopy.replace(/<[^>]*>?/gm, '');
        navigator.clipboard.writeText(cleanText);
        setCopiedText(true);
        showSingleGreenToast("تم نسخ نص الفتوى إلى الحافظة بنجاح", true);
        setTimeout(() => setCopiedText(false), 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto" onClick={onClose}>
            <div
                className="bg-white dark:bg-zinc-950 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[94vh] my-auto overflow-hidden border border-gray-200 dark:border-zinc-800 flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 shrink-0">
                    <div className="flex items-center gap-2 sm:gap-3 truncate pr-1">
                        <CategoryBadge label={categoryTitle} />
                        <h3 className="text-xs sm:text-base font-black text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                            {itemDetail.title || item.title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="إغلاق"
                        className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-gray-600 dark:text-zinc-300 rounded-full flex items-center justify-center transition-colors shrink-0"
                    >
                        <FontAwesomeIcon icon={faTimes} className="text-sm sm:text-base" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6 flex-grow bg-white dark:bg-zinc-950">
                    {fetchingDetail && (
                        <div className="flex items-center gap-2 text-xs font-bold text-[#449C40] bg-emerald-50 dark:bg-zinc-900 p-2.5 rounded-xl border border-emerald-100 dark:border-zinc-800">
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                            <span>جارٍ جلب وتحديث المرفقات من السيرفر...</span>
                        </div>
                    )}

                    {/* Active Player / Document Viewer */}
                    {fileUrl && (
                        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900">
                            {isPdf || isDoc ? (
                                <div className="w-full">
                                    <div className="bg-emerald-50 dark:bg-zinc-900 px-3 sm:px-4 py-2 text-[11px] sm:text-xs font-bold text-[#449C40] dark:text-emerald-400 flex items-center justify-between border-b border-emerald-100 dark:border-zinc-800">
                                        <span className="flex items-center gap-1.5 truncate">
                                            <FontAwesomeIcon icon={isDoc ? faFileAlt : faFilePdf} />
                                            <span className="truncate">
                                                {isDoc ? 'مستعرض مستندات الوورد (DOCX / DOC)' : 'مستعرض الـ PDF'} ({activeAttachment?.description || 'الملف المباشر'})
                                            </span>
                                        </span>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <a
                                                href={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="underline text-[11px]"
                                            >
                                                فتح نافذة مستقلة
                                            </a>
                                            <a
                                                href={fileUrl}
                                                download
                                                className="px-2.5 py-1 bg-[#449C40] hover:bg-[#00703C] text-white rounded-lg text-[10px] no-underline font-bold transition-colors"
                                            >
                                                تحميل {isDoc ? 'Word DOCX' : 'PDF'}
                                            </a>
                                        </div>
                                    </div>
                                    <iframe
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                                        className="w-full h-[340px] sm:h-[480px] border-0 bg-white"
                                        title={item.title}
                                    />
                                </div>
                            ) : isYouTube ? (
                                <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                                    <iframe
                                        src={getYouTubeEmbedUrl(fileUrl)}
                                        className="w-full h-full border-0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        title={item.title}
                                    />
                                </div>
                            ) : isVideo ? (
                                <div className="aspect-video w-full bg-black relative flex items-center justify-center">
                                    <video controls autoPlay key={fileUrl} className="w-full h-full" poster={item.image || undefined}>
                                        <source src={fileUrl} type="video/mp4" />
                                        متصفحك لا يدعم مشغل الفيديوهات المباشر.
                                    </video>
                                </div>
                            ) : isAudio ? (
                                <div className="p-4 sm:p-6 text-center bg-emerald-50/50 dark:bg-zinc-900 border-b border-emerald-100 dark:border-zinc-800">
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#449C40] text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                                        <FontAwesomeIcon icon={faHeadphones} className="text-xl sm:text-2xl" />
                                    </div>
                                    <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white mb-2">
                                        {activeAttachment?.description || item.title}
                                    </h4>
                                    <audio controls autoPlay key={fileUrl} className="w-full max-w-md mx-auto">
                                        <source src={fileUrl} type="audio/mpeg" />
                                        متصفحك لا يدعم مشغل الصوت المباشر.
                                    </audio>
                                </div>
                            ) : null}
                        </div>
                    )}

                    {/* Full Attachment Playlist */}
                    {attachments.length > 0 && (
                        <div className="bg-gray-50 dark:bg-zinc-900 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-3">
                            <div className="flex items-center justify-between border-b border-gray-200 dark:border-zinc-800 pb-2">
                                <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <FontAwesomeIcon icon={faListUl} className="text-[#449C40]" />
                                    <span>قائمة المرفقات والمقاطع ({attachments.length})</span>
                                </h4>
                            </div>

                            <div className="space-y-2 max-h-52 sm:max-h-60 overflow-y-auto pr-1">
                                {attachments.map((att, idx) => {
                                    const attSingleUrl = getSingleFileUrl(att);
                                    const isSelected = selectedAttachmentIndex === idx;
                                    const isAttPdf = att.extension_type?.toLowerCase() === "pdf" || attSingleUrl.toLowerCase().includes(".pdf");
                                    const isAttDoc = att.extension_type?.toLowerCase() === "doc" || att.extension_type?.toLowerCase() === "docx" || attSingleUrl.toLowerCase().includes(".doc") || attSingleUrl.toLowerCase().includes(".docx");
                                    const isAttAudio = att.extension_type?.toLowerCase() === "mp3" || attSingleUrl.toLowerCase().includes(".mp3");
                                    const isAttVideo = att.extension_type?.toLowerCase() === "mp4" || attSingleUrl.toLowerCase().includes(".mp4");

                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedAttachmentIndex(idx)}
                                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl border transition-all cursor-pointer gap-2 ${isSelected
                                                ? "bg-white dark:bg-zinc-800 border-[#449C40] text-gray-900 dark:text-white"
                                                : "bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-emerald-50/50 dark:hover:bg-zinc-900"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3 truncate">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${isSelected ? "bg-[#449C40] text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-300"
                                                    }`}>
                                                    {isAttAudio ? <FontAwesomeIcon icon={faVolumeUp} /> : isAttVideo ? <FontAwesomeIcon icon={faVideo} /> : isAttDoc ? <FontAwesomeIcon icon={faFileAlt} /> : <FontAwesomeIcon icon={faFilePdf} />}
                                                </div>

                                                <div className="truncate">
                                                    <h5 className="text-xs font-bold truncate">
                                                        {att.description || `المقطع / الجزء ${idx + 1}`}
                                                    </h5>
                                                    <p className="text-[10px] text-gray-500 dark:text-zinc-400">
                                                        {att.size || 'غير محدد'} • {att.extension_type || 'ملف'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedAttachmentIndex(idx);
                                                    }}
                                                    className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 ${isSelected
                                                        ? "bg-[#449C40] text-white"
                                                        : "bg-gray-100 dark:bg-zinc-800 hover:bg-emerald-100 dark:hover:bg-zinc-700 text-gray-700 dark:text-zinc-200"
                                                        }`}
                                                >
                                                    <FontAwesomeIcon icon={(isAttPdf || isAttDoc) ? faBook : faPlayCircle} />
                                                    <span>{isSelected ? "يعمل الآن" : (isAttDoc ? "قراءة المستند" : "تشغيل / قراءة")}</span>
                                                </button>

                                                {attSingleUrl && (
                                                    <a
                                                        href={attSingleUrl}
                                                        download
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 dark:bg-zinc-800 hover:bg-[#449C40] hover:text-white rounded-lg flex items-center justify-center text-gray-600 dark:text-zinc-300 transition-colors"
                                                        title="تحميل هذا الملف"
                                                    >
                                                        <FontAwesomeIcon icon={faDownload} className="text-xs" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Text Details */}
                    {(itemDetail.full_description || itemDetail.description) && (
                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between">
                                <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">التفاصيل والنص الكامل:</h4>
                                <button
                                    onClick={copyFatwaText}
                                    className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 text-xs font-bold rounded-lg transition-colors text-gray-700 dark:text-zinc-300"
                                >
                                    <FontAwesomeIcon icon={copiedText ? faCheck : faCopy} className={copiedText ? "text-emerald-500" : ""} />
                                    <span>{copiedText ? "تم النسخ" : "نسخ النص"}</span>
                                </button>
                            </div>

                            <div className="p-4 sm:p-5 bg-gray-50 dark:bg-zinc-900 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-zinc-800 text-xs sm:text-sm text-gray-800 dark:text-zinc-200 leading-relaxed font-sans overflow-x-auto">
                                {itemDetail.full_description ? (
                                    <div dangerouslySetInnerHTML={{ __html: itemDetail.full_description }} />
                                ) : (
                                    <p>{itemDetail.description}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {itemDetail.prepared_by && itemDetail.prepared_by.length > 0 && (
                        <div className="p-3 bg-emerald-50/50 dark:bg-zinc-900 rounded-xl border border-emerald-100 dark:border-zinc-800 text-xs flex items-center justify-between">
                            <span className="text-gray-600 dark:text-zinc-400 font-medium">المؤلف / المحاضر:</span>
                            <span className="font-bold text-gray-900 dark:text-zinc-100">{itemDetail.prepared_by[0].title}</span>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="px-4 sm:px-6 py-3.5 border-t border-gray-100 dark:border-zinc-800 flex flex-col-reverse sm:flex-row justify-between items-center gap-2.5 bg-gray-50 dark:bg-zinc-950 shrink-0">
                    {fileUrl ? (
                        <a
                            href={fileUrl}
                            download
                            className="w-full sm:w-auto px-5 py-2.5 bg-[#449C40] hover:bg-[#00703C] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                            <span>تحميل الملف المحدد ({activeAttachment?.extension_type || 'تحميل'})</span>
                        </a>
                    ) : (
                        <div></div>
                    )}

                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 text-gray-800 dark:text-zinc-200 text-xs font-bold rounded-xl transition-colors"
                    >
                        إغلاق
                    </button>
                </div>
            </div>
        </div>
    );
}
