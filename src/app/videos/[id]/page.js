"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faRecordVinyl,
    faUser,
    faCalendar,
    faPlayCircle,
    faVideo,
    faFile,
    faDownload,
    faClock,
    faSearch,
    faBook,
    faUserTie,
    faTimes,
    faPlay,
    faEye,
    faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Landing from "@/components/Layout/Landing";
import Link from "next/link";
import Image from "next/image";

export default function VideosPage({ params }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [videos, setVideos] = useState([]);
    const [links, setLinks] = useState({});
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/videos/ar/ar/${params.id}/25/json`);

                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }

                const data = await response.json();
                setVideos(data.data);
                setLinks(data.links);
            } catch (err) {
                console.error('Error fetching videos:', err);
                setError('حدث خطأ أثناء تحميل الفيديوهات. يرجى المحاولة مرة أخرى لاحقاً.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, [params.id]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatFileSize = (size) => {
        return size;
    };

    const getImportanceBadge = (level) => {
        switch (level) {
            case "critical":
                return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">مهم جدًا</span>;
            case "high":
                return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">مهم</span>;
            case "normal":
                return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">عادي</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">غير مصنف</span>;
        }
    };

    // دالة للتحقق من صحة رابط الصورة
    const isValidImageUrl = (url) => {
        if (!url) return false;

        // تحقق من أن الرابط ليس فارغاً ويحتوي على امتداد صورة صالح
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const hasValidExtension = validExtensions.some(ext => url.toLowerCase().includes(ext));

        return hasValidExtension;
    };

    // فتح الموديل مع الفيديو المحدد
    const openVideoModal = (video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
        // منع التمرير في الخلفية عند فتح الموديل
        document.body.style.overflow = 'hidden';
    };

    // إغلاق الموديل
    const closeVideoModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
        // إعادة التمرير في الخلفية عند إغلاق الموديل
        document.body.style.overflow = 'auto';
    };

    // تحميل الملف
    const downloadFile = (url, filename) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <Landing title="المكتبة المرئية" text="مجموعة مختارة من المحاضرات والدروس الإسلامية" />

            <section className="py-6 md:py-10 container px-4 mx-auto max-w-7xl">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto"></div>
                            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">جاري التحميل...</p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-lg">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">
                                    {error}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                            {videos.map((item, key) => (
                                <div
                                    key={key}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                                >
                                    {/* قسم الصورة أو الأيقونة */}
                                    <div className="relative bg-gray-100 dark:bg-gray-700 h-40 md:h-48 flex items-center justify-center">
                                        {isValidImageUrl(item.image) ? (
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    priority={false}
                                                    onError={(e) => {
                                                        // في حالة فشل تحميل الصورة، إخفاء الصورة وإظهار الأيقونة البديلة
                                                        e.target.style.display = 'none';
                                                        const parent = e.target.parentNode;
                                                        const fallback = parent.nextElementSibling;
                                                        if (fallback) {
                                                            fallback.style.display = 'flex';
                                                        }
                                                    }}
                                                />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-300 bg-gray-100 dark:bg-gray-800" style={{ display: 'none' }}>
                                                    <FontAwesomeIcon icon={faVideo} className="text-4xl mb-2" />
                                                    <span className="text-sm">فيديو</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-300 w-full h-full bg-gray-100 dark:bg-gray-800">
                                                <FontAwesomeIcon icon={faVideo} className="text-4xl mb-2" />
                                                <span className="text-sm">فيديو</span>
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3">
                                            {getImportanceBadge(item.importance_level)}
                                        </div>
                                    </div>

                                    <div className="p-4 flex-grow flex flex-col">
                                        {/* قسم العنوان وعدد الملفات */}
                                        <div className="mb-3">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                <FontAwesomeIcon icon={faFile} className="ml-1" />
                                                <span>{item.num_attachments} ملف</span>
                                            </div>
                                        </div>

                                        {/* قسم الوصف */}
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                                            {item.description || 'لا يوجد وصف'}
                                        </p>

                                        {/* قسم التفاصيل */}
                                        <div className="space-y-2 mb-4 text-sm">
                                            {item.prepared_by.length > 0 && (
                                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                                    <FontAwesomeIcon icon={faUserTie} className="ml-2 text-gray-400 w-4" />
                                                    <span className="truncate">{item.prepared_by[0].title}</span>
                                                </div>
                                            )}

                                            <div className="flex items-center text-gray-700 dark:text-gray-300">
                                                <FontAwesomeIcon icon={faCalendar} className="ml-2 text-gray-400 w-4" />
                                                <span>{formatDate(item.add_date)}</span>
                                            </div>

                                            {item.attachments.length > 0 && (
                                                <div className="flex items-center text-gray-700 dark:text-gray-300">
                                                    <FontAwesomeIcon icon={faPlayCircle} className="ml-2 text-gray-400 w-4" />
                                                    <span>{formatFileSize(item.attachments[0].size)}</span>
                                                </div>
                                            )}
                                        </div>

                                        {item.attachments.length > 0 && (
                                            <button
                                                onClick={() => openVideoModal(item)}
                                                className="mt-auto flex items-center justify-center w-full py-2.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                                            >
                                                <FontAwesomeIcon icon={faPlay} className="ml-2" />
                                                فتح
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* أزرار التنقل بين الصفحات */}
                        <div className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
                            {links.prev ? (
                                <Link
                                    href={`/videos/${Number(params.id) - 1}`}
                                    className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    <FontAwesomeIcon icon={faAngleDoubleRight} className="ml-2" />
                                    السابق
                                </Link>
                            ) : (
                                <div className="w-full sm:w-auto"></div>
                            )}

                            <span className="text-gray-700 dark:text-gray-300 font-medium px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                الصفحة {links.current_page} من {links.pages_number}
                            </span>

                            {links.next ? (
                                <Link
                                    href={`/videos/${Number(params.id) + 1}`}
                                    className="flex items-center justify-center w-full sm:w-auto px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors"
                                >
                                    التالي
                                    <FontAwesomeIcon icon={faAngleDoubleLeft} className="ml-2" />
                                </Link>
                            ) : (
                                <div className="w-full sm:w-auto"></div>
                            )}
                        </div>
                    </>
                )}
            </section>

            {/* موديل عرض الفيديو */}
            {isModalOpen && selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeVideoModal}>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        {/* رأس الموديل */}
                        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate">
                                {selectedVideo.title}
                            </h3>
                            <button
                                onClick={closeVideoModal}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                <FontAwesomeIcon icon={faTimes} size="lg" />
                            </button>
                        </div>

                        {/* محتوى الموديل */}
                        <div className="p-4 overflow-y-auto max-h-[calc(90vh-180px)]">
                            {/* معلومات الفيديو */}
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedVideo.prepared_by.length > 0 && (
                                        <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                            <FontAwesomeIcon icon={faUserTie} className="ml-2 text-gray-500" />
                                            <span>{selectedVideo.prepared_by[0].title}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                                        <FontAwesomeIcon icon={faCalendar} className="ml-2 text-gray-500" />
                                        <span>{formatDate(selectedVideo.add_date)}</span>
                                    </div>

                                    {getImportanceBadge(selectedVideo.importance_level)}
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 mb-6">
                                    {selectedVideo.description || 'لا يوجد وصف'}
                                </p>
                            </div>

                            {/* قائمة الملفات */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">الملفات المتاحة</h4>

                                {selectedVideo.attachments.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedVideo.attachments.map((attachment, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div className="flex items-center">
                                                    <FontAwesomeIcon
                                                        icon={attachment.extension_type === 'MP4' ? faVideo : faHeadphones}
                                                        className="text-emerald-600 ml-3"
                                                    />
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">
                                                            {attachment.description || `ملف ${index + 1}`}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {attachment.size} • {attachment.extension_type}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex space-x-2 gap-3">

                                                    <button
                                                        onClick={() => {

                                                            window.open(attachment.url, '_blank');
                                                        }}
                                                        className="p-2 bg-blue-700 w-10 h-10 text-white rounded-lg transition-colors"
                                                        title="مشاهدة"
                                                    >
                                                        <FontAwesomeIcon icon={faEye} />
                                                    </button>


                                                    <button
                                                        onClick={() => downloadFile(attachment.url, attachment.description || `ملف_${index + 1}`)}
                                                        className="p-2 bg-emerald-700 w-10 h-10 text-white rounded-lg transition-colors"
                                                        title="تحميل"
                                                    >
                                                        <FontAwesomeIcon icon={faDownload} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        لا توجد ملفات متاحة
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* ذيل الموديل */}
                        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                            <button
                                onClick={closeVideoModal}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-colors"
                            >
                                إغلاق
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
