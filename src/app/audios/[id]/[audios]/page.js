"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faCalendarAlt,
    faUser,
    faHeadphones,
    faPlayCircle,
    faDownload,
    faTimes,
    faFileAudio,
    faClock,
    faVolumeUp
} from "@fortawesome/free-solid-svg-icons";

import Landing from "@/components/Layout/Landing";
import Image from "next/image";

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const getImportanceColor = (level) => {
    return level === "high"
        ? { bg: "bg-gradient-to-r from-yellow-500 to-amber-500", text: "عالية الأهمية", icon: "" }
        : { bg: "bg-gradient-to-r from-green-500 to-emerald-500", text: "عادية", icon: "" };
};

export default function AudiosPage({ params }) {
    const [audios, setAudios] = useState([]);
    const [links, setLinks] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(Number(params.id) || 1);
    const [playerModal, setPlayerModal] = useState({ isOpen: false, url: "", title: "" });

    const fetchAudios = async (pageNumber) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/audios/ar/ar/${pageNumber}/25/json`
            );
            const data = await response.json();
            setAudios(data.data);
            setLinks(data.links);
        } catch (err) {
            console.error("خطأ أثناء جلب البيانات:", err);
            setError("حدث خطأ أثناء تحميل المحاضرات");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAudios(page);
    }, [page]);

    const handleNext = () => {
        if (links?.next) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (links?.prev) setPage((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const openPlayer = (url, title) => {
        setPlayerModal({ isOpen: true, url, title });
    };

    const closePlayer = () => {
        setPlayerModal({ isOpen: false, url: "", title: "" });
    };

    return (
        <>
            <Landing title="قائمة المحاضرات الصوتية" text="استعرض جميع المحاضرات المتوفرة" />

            <section className="container m-auto px-4 py-10">
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">جاري تحميل البيانات...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-6 py-4 rounded-lg text-center max-w-md mx-auto">
                        <div className="font-bold text-lg mb-1">حدث خطأ</div>
                        <div>{error}</div>
                        <button
                            onClick={() => fetchAudios(page)}
                            className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                            إعادة المحاولة
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {audios.map((audio) => {
                                const importance = getImportanceColor(audio.importance_level);
                                return (
                                    <motion.div
                                        key={audio.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-200 dark:border-gray-700"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            {audio.image ? (
                                                <Image
                                                    src={audio.image}
                                                    alt={audio.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 hover:scale-110"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-600 to-emerald-800">
                                                    <FontAwesomeIcon icon={faHeadphones} className="text-6xl text-white/80" />
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3">
                                                <span
                                                    className={`${importance.bg} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center`}
                                                >
                                                    <span className="ml-1">{importance.icon}</span>
                                                    {importance.text}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                                                <h3 className="font-bold text-white text-lg line-clamp-1">
                                                    {audio.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                                                {audio.description}
                                            </p>

                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                                                <FontAwesomeIcon icon={faUser} className="ml-2 text-green-500" />
                                                <span>{audio.prepared_by[0]?.title || "غير محدد"}</span>
                                            </div>

                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="ml-2 text-green-500" />
                                                <span>{formatDate(audio.add_date)}</span>
                                            </div>

                                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-4">
                                                <FontAwesomeIcon icon={faFileAudio} className="ml-2 text-green-500" />
                                                <span>{audio.num_attachments} ملفات صوتية</span>
                                            </div>

                                            <div className="space-y-3 mt-4">
                                                {audio.attachments?.map((att, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                        <div className="flex items-center">
                                                            <FontAwesomeIcon icon={faVolumeUp} className="text-green-500 ml-2" />
                                                            <span className="text-sm font-medium mx-2">
                                                                {att.description || `الجزء ${index + 1}`}
                                                            </span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => openPlayer(att.url, att.description || audio.title)}
                                                                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                                                            >
                                                                <FontAwesomeIcon icon={faPlayCircle} size="lg" />
                                                            </button>
                                                            <a
                                                                href={att.url}
                                                                download
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                                            >
                                                                <FontAwesomeIcon icon={faDownload} size="lg" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* {audio.num_attachments > 3 && (
                                                    <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                        +{audio.num_attachments - 3} ملفات أخرى
                                                    </div>
                                                )} */}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* الباجينيشن */}
                        <div className="flex justify-center items-center gap-4 mt-12 mb-6">
                            <button
                                onClick={handlePrev}
                                disabled={!links?.prev}
                                className={`flex items-center px-5 py-3 rounded-xl font-medium transition-all ${
                                    links?.prev
                                        ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 shadow-sm"
                                        : "opacity-40 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400"
                                }`}
                            >
                                <FontAwesomeIcon icon={faAngleDoubleRight} className="ml-2" />
                                السابق
                            </button>

                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                                الصفحة {page} من {links?.pages_number || "?"}
                            </span>

                            <button
                                onClick={handleNext}
                                disabled={!links?.next}
                                className={`flex items-center px-5 py-3 rounded-xl font-medium transition-all ${
                                    links?.next
                                        ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 shadow-sm"
                                        : "opacity-40 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400"
                                }`}
                            >
                                التالي
                                <FontAwesomeIcon icon={faAngleDoubleLeft} className="mr-2" />
                            </button>
                        </div>
                    </>
                )}
            </section>

            {/* مودال المشغل الصوتي */}
            <AnimatePresence>
                {playerModal.isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate max-w-[70%]">
                                        {playerModal.title}
                                    </h3>
                                    <button
                                        onClick={closePlayer}
                                        className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                                    >
                                        <FontAwesomeIcon icon={faTimes} size="lg" />
                                    </button>
                                </div>

                                <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faHeadphones} className="text-6xl text-white/80" />
                                </div>

                                <div className="mb-6">
                                    <audio
                                        controls
                                        className="w-full rounded-lg"
                                        autoPlay
                                    >
                                        <source src={playerModal.url} type="audio/mpeg" />
                                        المتصفح لا يدعم تشغيل الصوت.
                                    </audio>
                                </div>

                                <div className="flex justify-center">
                                    <a
                                        href={playerModal.url}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faDownload} />
                                        تحميل الملف
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
