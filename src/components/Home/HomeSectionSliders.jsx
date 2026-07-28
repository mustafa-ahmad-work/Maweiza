"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleRight,
    faAngleLeft,
    faArrowLeft,
    faSpinner,
    faFileVideo,
    faHeadphones,
    faBook,
    faFeather,
    faQuestionCircle,
    faMicrophone
} from "@fortawesome/free-solid-svg-icons";
import { API } from "@/config/constants";
import { UniversalPreviewModal } from "@/components/shared/CategoryControls";
import UniversalCategoryCard from "@/components/shared/ExpressiveCards";

const HOME_SECTIONS = [
    {
        key: "books",
        title: "أبرز الكتب والقطع العلمية",
        subtitle: "تصفح واقرأ أمهات الكتب الإسلامية القيمة بأسلوب ميسر",
        img: "/categories/books.png",
        path: "/books/1",
        badge: "كتاب إسلامي",
        icon: faBook
    },
    {
        key: "articles",
        title: "أبرز المقالات والدروس التحريرية",
        subtitle: "دراسات ومقالات تربوية وثقافية معاصرة وموثوقة",
        img: "/categories/articles.png",
        path: "/articles/1",
        badge: "مقال تحريري",
        icon: faFeather
    },
    {
        key: "khotab",
        title: "أبرز الخطب والمنبريات",
        subtitle: "خطب منبرية مكتوبة ومفرغة ومصنفة موضوعياً",
        img: "/categories/khotab.png",
        path: "/khotab/1",
        badge: "خطبة منبرية",
        icon: faMicrophone
    },
    {
        key: "fatwa",
        title: "أبرز الفتاوى الشرعية",
        subtitle: "إجابات ميسرة وموثوقة على الفتاوى والأحكام الشرعية اليومية",
        img: "/categories/fatwa.png",
        path: "/fatwa/1",
        badge: "فتوى شرعية",
        icon: faQuestionCircle
    },
    {
        key: "audios",
        title: "أبرز التسجيلات والصوتيات",
        subtitle: "تلاوات خاشعة ومحاضرات صوتية عالية الجودة",
        img: "/categories/audios.png",
        path: "/audios/1",
        badge: "تسجيل صوتي",
        icon: faHeadphones
    },
    {
        key: "videos",
        title: "أبرز المرئيات والدروس المصورة",
        subtitle: "شاهد المحاضرات والدروس العلمية المصورة بجودة عالية",
        img: "/categories/videos.png",
        path: "/videos/1",
        badge: "فيديو مرئي",
        icon: faFileVideo
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
        <section className="py-10 md:py-16 bg-transparent relative">
            <div className="container mx-auto px-4 sm:px-6 space-y-14 md:space-y-20">
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
            scrollContainerRef.current.scrollBy({ left: -360, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 360, behavior: "smooth" });
        }
    };

    return (
        <div className="space-y-5">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                    <Image
                        src={sec.img}
                        alt={sec.title}
                        width={40}
                        height={40}
                        className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
                    />
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg sm:text-xl font-black text-gray-900 dark:text-white tracking-tight">
                                {sec.title}
                            </h3>
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#449C40]/10 text-[#449C40] dark:bg-[#449C40]/20 dark:text-emerald-400">
                                <FontAwesomeIcon icon={sec.icon} className="text-[10px]" />
                                <span>{sec.badge}</span>
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 font-medium mt-0.5">
                            {sec.subtitle}
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={scrollRight}
                            title="التالي"
                            aria-label="التالي"
                            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-[#449C40] hover:text-white hover:border-[#449C40] text-gray-700 dark:text-zinc-300 flex items-center justify-center transition-colors active:scale-95"
                        >
                            <FontAwesomeIcon icon={faAngleRight} className="text-sm" />
                        </button>
                        <button
                            onClick={scrollLeft}
                            title="السابق"
                            aria-label="السابق"
                            className="w-9 h-9 rounded-xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-[#449C40] hover:text-white hover:border-[#449C40] text-gray-700 dark:text-zinc-300 flex items-center justify-center transition-colors active:scale-95"
                        >
                            <FontAwesomeIcon icon={faAngleLeft} className="text-sm" />
                        </button>
                    </div>

                    <Link
                        href={sec.path}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#449C40] hover:bg-[#00703C] text-white text-xs font-bold rounded-xl transition-all active:scale-95"
                    >
                        <span>تصفح الكل</span>
                        <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
                    </Link>
                </div>
            </div>

            {/* Slider Track */}
            {loading ? (
                <div className="flex items-center justify-center py-12 gap-2.5 text-xs font-bold text-[#449C40] bg-emerald-50/20 dark:bg-zinc-900/20 rounded-2xl border border-emerald-100/50 dark:border-zinc-800/50">
                    <FontAwesomeIcon icon={faSpinner} className="animate-spin text-base" />
                    <span>جارٍ تحميل المحتوى...</span>
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-10 text-xs text-gray-500 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800">
                    لا توجد عناصر متاحة حالياً
                </div>
            ) : (
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory scroll-smooth scrollbar-none"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {items.map((item, idx) => (
                        <UniversalCategoryCard
                            key={idx}
                            item={item}
                            categoryType={sec.key}
                            onOpenModal={() => onOpenModal(item, sec.key)}
                            isSlider={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
