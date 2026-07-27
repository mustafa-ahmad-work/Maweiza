"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAngleLeft,
    faArrowLeft,
    faEye,
    faPlayCircle,
    faUser,
    faSpinner,
    faDownload,
    faFileVideo,
    faHeadphones
} from "@fortawesome/free-solid-svg-icons";
import { API } from "@/config/constants";
import { UniversalPreviewModal, CategoryBadge, CardActions } from "@/components/shared/CategoryControls";
import SafeImage from "@/components/shared/SafeImage";

const HOME_SECTIONS = [
    {
        key: "books",
        title: "أبرز الكتب والقطع العلمية",
        subtitle: "تصفح واقرأ أمهات الكتب الإسلامية القيمة بأسلوب ميسر",
        img: "/categories/books.png",
        path: "/books/1",
        badge: "كتاب إسلامي"
    },
    {
        key: "articles",
        title: "أبرز المقالات والدروس التحريرية",
        subtitle: "دراسات ومقالات تربوية وثقافية معاصرة وموثوقة",
        img: "/categories/articles.png",
        path: "/articles/1",
        badge: "مقال تحريري"
    },
    {
        key: "khotab",
        title: "أبرز الخطب والمنبريات",
        subtitle: "خطب منبرية مكتوبة ومفرغة ومصنفة موضوعياً",
        img: "/categories/khotab.png",
        path: "/khotab/1",
        badge: "خطبة منبرية"
    },
    {
        key: "fatwa",
        title: "أبرز الفتاوى الشرعية",
        subtitle: "إجابات ميسرة وموثوقة على الفتاوى والأحكام الشرعية اليومية",
        img: "/categories/fatwa.png",
        path: "/fatwa/1",
        badge: "فتوى شرعية"
    },
    {
        key: "audios",
        title: "أبرز التسجيلات والصوتيات",
        subtitle: "تلاوات خاشعة ومحاضرات صوتية عالية الجودة",
        img: "/categories/audios.png",
        path: "/audios/1",
        badge: "تسجيل صوتي"
    },
    {
        key: "videos",
        title: "أبرز المرئيات والدروس المصورة",
        subtitle: "شاهد المحاضرات والدروس العلمية المصورة بجودة عالية",
        img: "/categories/videos.png",
        path: "/videos/1",
        badge: "فيديو مرئي"
    }
];

export default function HomeSectionSliders() {
    const [sectionData, setSectionData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategoryType, setSelectedCategoryType] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAllFeatured = async () => {
            setLoading(true);
            const results = {};

            for (const sec of HOME_SECTIONS) {
                try {
                    const randomPage = Math.floor(Math.random() * 3) + 1;
                    const res = await fetch(API.islamhouse(sec.key, randomPage));
                    if (res.ok) {
                        const json = await res.json();
                        let items = json.data || [];
                        items.sort((a, b) => {
                            if (a.importance_level === "high" && b.importance_level !== "high") return -1;
                            if (a.importance_level !== "high" && b.importance_level === "high") return 1;
                            return 0;
                        });
                        results[sec.key] = items.slice(0, 10);
                    } else {
                        results[sec.key] = [];
                    }
                } catch (e) {
                    console.error(`Error fetching home featured for ${sec.key}:`, e);
                    results[sec.key] = [];
                }
            }

            setSectionData(results);
            setLoading(false);
        };

        fetchAllFeatured();
    }, []);

    const openModal = (item, type) => {
        setSelectedItem(item);
        setSelectedCategoryType(type);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setSelectedCategoryType("");
        document.body.style.overflow = "auto";
    };

    return (
        <section className="py-16 md:py-24 bg-transparent border-t border-gray-100 dark:border-zinc-900 relative">
            <div className="container mx-auto px-4 sm:px-6 relative z-10 space-y-20">
                {HOME_SECTIONS.map((sec) => (
                    <SingleSectionSlider
                        key={sec.key}
                        sec={sec}
                        items={sectionData[sec.key] || []}
                        loading={loading}
                        onOpenModal={(item) => openModal(item, sec.key)}
                    />
                ))}
            </div>

            {/* Universal Preview Modal */}
            {isModalOpen && selectedItem && (
                <UniversalPreviewModal
                    item={selectedItem}
                    categoryType={selectedCategoryType}
                    onClose={closeModal}
                />
            )}
        </section>
    );
}

function SingleSectionSlider({ sec, items, loading, onOpenModal }) {
    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -380, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 380, behavior: "smooth" });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with Direct Image without Background */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3.5">
                    <Image
                        src={sec.img}
                        alt={sec.title}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain shrink-0"
                    />
                    <div>
                        <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                            <span>{sec.title}</span>
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium">
                            {sec.subtitle}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={scrollRight}
                            title="التالي"
                            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-[#449C40] hover:text-white hover:border-[#449C40] text-gray-700 dark:text-zinc-300 flex items-center justify-center transition-colors"
                        >
                            <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
                        </button>
                        <button
                            onClick={scrollLeft}
                            title="السابق"
                            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-[#449C40] hover:text-white hover:border-[#449C40] text-gray-700 dark:text-zinc-300 flex items-center justify-center transition-colors"
                        >
                            <FontAwesomeIcon icon={faAngleLeft} className="text-sm" />
                        </button>
                    </div>

                    <Link
                        href={sec.path}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#449C40] hover:bg-[#00703C] text-white text-xs font-bold rounded-xl transition-all"
                    >
                        <span>تصفح الكل</span>
                        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                    </Link>
                </div>
            </div>

            {/* Slider Track */}
            {loading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-xs font-bold text-[#449C40]">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
                    <span>جارٍ تحميل محتوى {sec.title}...</span>
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-8 text-xs text-gray-500 dark:text-zinc-400">
                    لا توجد عناصر متاحة حالياً
                </div>
            ) : (
                <div
                    ref={scrollContainerRef}
                    className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x scrollbar-none scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {items.map((item, idx) => {
                        const author = item.prepared_by?.[0]?.title || 'معلومات المادة';
                        const mainAttachment = item.attachments?.[0];
                        const dateFormatted = item.add_date ? new Date(item.add_date * 1000).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
                        const isVideoSec = sec.key === "videos";

                        const fallbackMediaComponent = isVideoSec ? (
                            <div
                                onClick={() => onOpenModal(item)}
                                className="w-full h-full bg-zinc-950 p-4 flex flex-col justify-between cursor-pointer relative group"
                            >
                                <div className="flex justify-between items-center text-xs text-[#449C40] font-bold border-b border-zinc-800 pb-1.5">
                                    <span className="flex items-center gap-1.5">
                                        <FontAwesomeIcon icon={faFileVideo} />
                                        <span>درس مرئي إسلامي</span>
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
                                    <span className="truncate max-w-[130px]">{author}</span>
                                    <span className="px-2 py-0.5 bg-[#449C40]/20 text-[#449C40] rounded font-bold">{item.num_attachments || 1} مقاطع</span>
                                </div>
                            </div>
                        ) : (
                            <div
                                onClick={() => onOpenModal(item)}
                                className="w-full h-full bg-emerald-50/40 dark:bg-zinc-800/80 p-4 flex flex-col justify-between cursor-pointer"
                            >
                                <div className="flex justify-between items-center text-xs text-[#449C40] dark:text-emerald-400 font-bold border-b border-emerald-100/60 dark:border-zinc-700 pb-1">
                                    <span className="flex items-center gap-1.5">
                                        <Image src={sec.img} alt={sec.title} width={20} height={20} className="w-5 h-5 object-contain" />
                                        <span>منصة موعظة</span>
                                    </span>
                                    <span className="font-mono text-[10px] text-gray-500">#{item.id}</span>
                                </div>

                                <div className="my-auto text-center py-1">
                                    <div className="w-10 h-10 mx-auto mb-1.5 flex items-center justify-center">
                                        <Image src={sec.img} alt={sec.title} width={36} height={36} className="w-9 h-9 object-contain" />
                                    </div>
                                    <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-100 line-clamp-2 leading-snug">
                                        {item.title}
                                    </h4>
                                </div>

                                <div className="text-[10px] text-gray-500 dark:text-zinc-400 border-t border-emerald-100/60 dark:border-zinc-700 pt-1 flex justify-between items-center font-medium">
                                    <span className="truncate max-w-[140px]">{author}</span>
                                    <span>{item.num_attachments || 1} مرفقات</span>
                                </div>
                            </div>
                        );

                        return (
                            <div
                                key={idx}
                                className="snap-start shrink-0 w-[320px] sm:w-[360px] h-[520px] flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 hover:border-[#449C40] dark:hover:border-[#449C40] transition-colors duration-300 overflow-hidden group"
                            >
                                <div>
                                    {/* Top Meta Bar */}
                                    <div className="flex items-center justify-between px-4 pt-3.5 pb-2 border-b border-gray-100 dark:border-zinc-800 bg-emerald-50/10 dark:bg-zinc-800/30">
                                        <CategoryBadge label={sec.badge} />
                                        <CardActions item={item} categoryType={sec.key} />
                                    </div>

                                    {/* Media Box with SafeImage */}
                                    <div className="relative h-48 bg-emerald-50/20 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
                                        <div className="relative w-full h-full cursor-pointer" onClick={() => onOpenModal(item)}>
                                            <SafeImage
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                fallbackComponent={fallbackMediaComponent}
                                            />
                                            {isVideoSec && item.image && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                                    <div className="w-13 h-13 bg-[#449C40] text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <FontAwesomeIcon icon={faPlayCircle} className="text-2xl" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="p-5 pb-0">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                                            {item.title}
                                        </h4>

                                        <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed font-sans">
                                            {item.description || "مادة إسلامية نافعة ومفيدة تنشر العلوم الشرعية وتثري الثقافة الدينية."}
                                        </p>
                                    </div>
                                </div>

                                {/* Locked Bottom Action Bar */}
                                <div className="p-5 pt-0">
                                    <div className="space-y-1.5 text-[11px] border-t border-gray-100 dark:border-zinc-800 pt-2.5 mb-4 text-gray-600 dark:text-zinc-400">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 truncate">
                                                <FontAwesomeIcon icon={faUser} className="text-[#449C40] w-3 shrink-0" />
                                                <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                                            </div>
                                            {dateFormatted && (
                                                <span className="text-[10px] text-gray-500 dark:text-zinc-400 font-medium">{dateFormatted}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onOpenModal(item)}
                                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-colors active:scale-[0.99]"
                                        >
                                            <FontAwesomeIcon icon={sec.key === "audios" ? faHeadphones : sec.key === "videos" ? faPlayCircle : faEye} />
                                            <span>معاينة وتصفح</span>
                                        </button>

                                        {mainAttachment?.url && (
                                            <a
                                                href={mainAttachment.url}
                                                download
                                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-gray-800 dark:text-zinc-200 bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-colors"
                                                title="تحميل المادة"
                                            >
                                                <FontAwesomeIcon icon={faDownload} />
                                                <span>تحميل</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
