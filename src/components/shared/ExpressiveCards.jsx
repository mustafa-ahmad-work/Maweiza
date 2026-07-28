"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faPlayCircle,
    faUser,
    faDownload,
    faFileVideo,
    faHeadphones,
    faBook,
    faFeather,
    faQuestionCircle,
    faMicrophone,
    faBookOpen,
    faCheckCircle,
    faVolumeHigh,
    faFileLines,
    faCompactDisc
} from "@fortawesome/free-solid-svg-icons";
import { CardActions } from "@/components/shared/CategoryControls";
import SafeImage from "@/components/shared/SafeImage";

{/* Clean Fallback when image is missing */}
export function CleanMediaFallback({ icon, title }) {
    return (
        <div className="w-full h-full bg-zinc-950 text-white p-4 flex flex-col justify-center items-center text-center">
            <FontAwesomeIcon icon={icon} className="text-3xl text-[#449C40] mb-2" />
            <h4 className="text-xs font-bold text-gray-200 line-clamp-2 max-w-[240px] leading-snug">
                {title}
            </h4>
        </div>
    );
}

{/* Shared Universal Expressive Card Component */}
export default function UniversalCategoryCard({ item, categoryType, onOpenModal, onUpdate, isSlider = false }) {
    if (!item) return null;

    const author = item.prepared_by?.[0]?.title || 'المحتوى الإسلامي الموثوق';
    const mainAttachment = item.attachments?.[0];
    const dateFormatted = item.add_date ? new Date(item.add_date * 1000).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }) : null;
    const countAttachments = item.num_attachments || (item.attachments?.length || 1);

    const secProps = {
        key: categoryType,
        badge: categoryType === "books" ? "كتاب إسلامي" :
               categoryType === "articles" ? "مقال صحفي" :
               categoryType === "khotab" ? "خطبة منبرية" :
               categoryType === "fatwa" ? "فتوى شرعية" :
               categoryType === "audios" ? "تسجيل صوتي" : "فيديو مرئي",
        icon: categoryType === "books" ? faBook :
              categoryType === "articles" ? faFeather :
              categoryType === "khotab" ? faMicrophone :
              categoryType === "fatwa" ? faQuestionCircle :
              categoryType === "audios" ? faHeadphones : faFileVideo
    };

    switch (categoryType) {
        case "books":
            return (
                <BookShapeCard
                    item={item}
                    sec={secProps}
                    author={author}
                    dateFormatted={dateFormatted}
                    countAttachments={countAttachments}
                    mainAttachment={mainAttachment}
                    onOpenModal={onOpenModal}
                    onUpdate={onUpdate}
                    isSlider={isSlider}
                />
            );
        case "articles":
            return (
                <ArticleShapeCard
                    item={item}
                    sec={secProps}
                    author={author}
                    dateFormatted={dateFormatted}
                    onOpenModal={onOpenModal}
                    onUpdate={onUpdate}
                    isSlider={isSlider}
                />
            );
        case "khotab":
            return (
                <KhotabShapeCard
                    item={item}
                    sec={secProps}
                    author={author}
                    dateFormatted={dateFormatted}
                    mainAttachment={mainAttachment}
                    onOpenModal={onOpenModal}
                    onUpdate={onUpdate}
                    isSlider={isSlider}
                />
            );
        case "fatwa":
            return (
                <FatwaShapeCard
                    item={item}
                    sec={secProps}
                    author={author}
                    dateFormatted={dateFormatted}
                    onOpenModal={onOpenModal}
                    onUpdate={onUpdate}
                    isSlider={isSlider}
                />
            );
        case "audios":
            return (
                <AudioShapeCard
                    item={item}
                    sec={secProps}
                    author={author}
                    dateFormatted={dateFormatted}
                    countAttachments={countAttachments}
                    mainAttachment={mainAttachment}
                    onOpenModal={onOpenModal}
                    onUpdate={onUpdate}
                    isSlider={isSlider}
                />
            );
        case "videos":
            return (
                <VideoShapeCard
                    item={item}
                    sec={secProps}
                    author={author}
                    dateFormatted={dateFormatted}
                    countAttachments={countAttachments}
                    mainAttachment={mainAttachment}
                    onOpenModal={onOpenModal}
                    onUpdate={onUpdate}
                    isSlider={isSlider}
                />
            );
        default:
            return null;
    }
}

/* =========================================================================
   1. BOOK SHAPE CARD (طراز كتاب حقيقي مجلد)
   ========================================================================= */
function BookShapeCard({ item, sec, author, dateFormatted, countAttachments, mainAttachment, onOpenModal, onUpdate, isSlider }) {
    const containerClasses = isSlider
        ? "snap-start shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] md:w-[360px]"
        : "w-full h-full";

    const cleanBookFallback = (
        <div className="w-full h-full bg-zinc-950 text-white p-5 flex flex-col justify-between items-center text-center">
            <span className="text-[10px] font-bold text-emerald-400 bg-[#449C40]/20 px-3 py-1 rounded-full border border-[#449C40]/30">
                مجلد كتاب إسلامي
            </span>
            <h4 className="text-xs font-bold text-gray-200 line-clamp-3 leading-relaxed max-w-[240px]">
                {item.title}
            </h4>
            <span className="text-[10px] text-gray-400">
                {countAttachments} مجلدات متاحة
            </span>
        </div>
    );

    return (
        <div className={`${containerClasses} flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-l-2xl rounded-r-md border-y border-l border-gray-200 dark:border-zinc-800 border-r-4 border-r-[#449C40] hover:border-[#449C40] dark:hover:border-[#449C40] transition-all duration-300 overflow-hidden group shadow-lg hover:shadow-2xl relative`}>
            {/* Real Book Spine Crease Inner Shadow */}
            <div className="absolute top-0 right-0 bottom-0 w-2 bg-gradient-to-l from-black/15 via-transparent to-transparent pointer-events-none z-20" />

            <div>
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 pr-5 border-b border-gray-100 dark:border-zinc-800 bg-emerald-50/30 dark:bg-zinc-800/40">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold rounded bg-[#449C40] text-white shadow-xs">
                        <span>غلاف كتاب</span>
                    </span>
                    <CardActions item={item} categoryType="books" onUpdate={onUpdate} />
                </div>

                {/* Real Book Cover Frame */}
                <div className="relative h-48 bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 overflow-hidden cursor-pointer" onClick={onOpenModal}>
                    <SafeImage
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackComponent={cleanBookFallback}
                    />
                    {item.image && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />
                    )}
                    <div className="absolute bottom-2.5 right-3 left-3 text-white flex items-center justify-between z-10">
                        <span className="text-[10px] font-bold bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded text-emerald-300 border border-white/10">
                            متاح للقراءة
                        </span>
                        <span className="text-[10px] font-bold bg-[#449C40] px-2.5 py-0.5 rounded text-white shadow-xs">
                            {countAttachments} مجلدات
                        </span>
                    </div>
                </div>

                {/* Book Title & Description */}
                <div className="p-4 pr-5 space-y-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                        {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed">
                        {item.description || "كتاب وتصنيف علمي نافع يضم مسائل وفتاوى وتوجيهات شرعية قيمة في العلوم الإسلامية."}
                    </p>
                </div>
            </div>

            {/* Bottom Actions & Author */}
            <div className="p-4 pr-5 pt-0">
                <div className="flex items-center justify-between text-[11px] border-t border-gray-100 dark:border-zinc-800 pt-2.5 mb-3 text-gray-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 truncate">
                        <FontAwesomeIcon icon={faUser} className="text-[#449C40] shrink-0 text-xs" />
                        <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                    </div>
                    {dateFormatted && <span className="text-[10px] text-gray-400">{dateFormatted}</span>}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onOpenModal}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-all active:scale-95 shadow-xs"
                    >
                        <FontAwesomeIcon icon={faEye} />
                        <span>قراءة الكتاب بالكامل</span>
                    </button>
                    {mainAttachment?.url && (
                        <a
                            href={mainAttachment.url}
                            download
                            className="flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold text-[#449C40] bg-emerald-50 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all border border-emerald-100 dark:border-zinc-700"
                            title="تحميل الكتاب PDF"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* =========================================================================
   2. AUDIO SHAPE CARD (طراز اسطوانة الصوتيات Vinyl Disc)
   ========================================================================= */
function AudioShapeCard({ item, sec, author, dateFormatted, countAttachments, mainAttachment, onOpenModal, onUpdate, isSlider }) {
    const containerClasses = isSlider
        ? "snap-start shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] md:w-[360px]"
        : "w-full h-full";

    return (
        <div className={`${containerClasses} flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 hover:border-[#449C40] dark:hover:border-[#449C40] transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl relative`}>
            <div>
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-gray-100 dark:border-zinc-800 bg-gray-50/50 dark:bg-zinc-800/30">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-[#449C40] text-white">
                        <FontAwesomeIcon icon={faHeadphones} className="text-[10px]" />
                        <span>تسجيل صوتي</span>
                    </span>
                    <CardActions item={item} categoryType="audios" onUpdate={onUpdate} />
                </div>

                {/* Disc Header */}
                <div className="p-4 bg-zinc-950 text-white relative overflow-hidden cursor-pointer flex items-center justify-between gap-3 border-b border-zinc-800" onClick={onOpenModal}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-950 border-4 border-[#449C40] flex items-center justify-center shrink-0 shadow-lg relative group-hover:rotate-45 transition-transform duration-700">
                        <div className="w-5 h-5 rounded-full bg-[#449C40] flex items-center justify-center">
                            <FontAwesomeIcon icon={faCompactDisc} className="text-white text-xs" />
                        </div>
                    </div>

                    <div className="flex-1 truncate">
                        <span className="text-[10px] font-bold text-emerald-400 bg-[#449C40]/20 px-2 py-0.5 rounded border border-[#449C40]/30 inline-block mb-1">
                            {countAttachments} مقاطع صوتية
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                            {item.title}
                        </h4>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                    <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed">
                        {item.description || "تلاوة خاشعة وتسجيل صوتي محرر عالي الجودة متوفر للإنصات المباشر والتحميل."}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0">
                <div className="flex items-center justify-between text-[11px] border-t border-gray-100 dark:border-zinc-800 pt-2.5 mb-3 text-gray-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 truncate">
                        <FontAwesomeIcon icon={faUser} className="text-[#449C40] shrink-0 text-xs" />
                        <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                    </div>
                    {dateFormatted && <span className="text-[10px] text-gray-400">{dateFormatted}</span>}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onOpenModal}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-all active:scale-95 shadow-xs"
                    >
                        <FontAwesomeIcon icon={faHeadphones} />
                        <span>استماع للمادة الصوتية</span>
                    </button>
                    {mainAttachment?.url && (
                        <a
                            href={mainAttachment.url}
                            download
                            className="flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold text-[#449C40] bg-emerald-50 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all border border-emerald-100 dark:border-zinc-700"
                            title="تحميل MP3"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* =========================================================================
   3. ARTICLE SHAPE CARD (طراز الصحيفة والمجلة)
   ========================================================================= */
function ArticleShapeCard({ item, sec, author, dateFormatted, onOpenModal, onUpdate, isSlider }) {
    const containerClasses = isSlider
        ? "snap-start shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] md:w-[360px]"
        : "w-full h-full";

    return (
        <div className={`${containerClasses} flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 hover:border-[#449C40] dark:hover:border-[#449C40] transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl`}>
            <div>
                {/* Meta Top Bar */}
                <div className="flex items-center justify-between px-4 pt-3.5 pb-2.5 border-b border-gray-100 dark:border-zinc-800 bg-emerald-50/30 dark:bg-zinc-800/40">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-[#449C40] text-white">
                        <FontAwesomeIcon icon={faFeather} className="text-[10px]" />
                        <span>مقال صحفي</span>
                    </span>
                    <CardActions item={item} categoryType="articles" onUpdate={onUpdate} />
                </div>

                {/* Newspaper Content */}
                <div className="p-4 space-y-2 cursor-pointer" onClick={onOpenModal}>
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-2">
                        <span className="text-[11px] font-bold text-[#449C40] flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faFileLines} />
                            <span>مقال ورؤية شرعية</span>
                        </span>
                        {dateFormatted && <span className="text-[10px] text-gray-400 font-medium">{dateFormatted}</span>}
                    </div>

                    <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white line-clamp-3 leading-snug group-hover:text-[#449C40] transition-colors pt-1">
                        {item.title}
                    </h4>

                    <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-4 leading-relaxed font-sans">
                        {item.description || "دراسة تحريرية شرعية تناقش القضايا الاجتماعية والتربوية المعاصرة في ضوء الكتاب والسنة بفهم سديد ومبسط."}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0">
                <div className="flex items-center justify-between text-[11px] border-t border-gray-100 dark:border-zinc-800 pt-2.5 mb-3 text-gray-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 truncate">
                        <FontAwesomeIcon icon={faUser} className="text-[#449C40] shrink-0 text-xs" />
                        <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                    </div>
                </div>

                <button
                    onClick={onOpenModal}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-all active:scale-95 shadow-xs"
                >
                    <FontAwesomeIcon icon={faFileLines} />
                    <span>قراءة المقال بالكامل</span>
                </button>
            </div>
        </div>
    );
}

/* =========================================================================
   4. KHOTAB SHAPE CARD (طراز المحراب والمنبر الإسلامي)
   ========================================================================= */
function KhotabShapeCard({ item, sec, author, dateFormatted, mainAttachment, onOpenModal, onUpdate, isSlider }) {
    const containerClasses = isSlider
        ? "snap-start shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] md:w-[360px]"
        : "w-full h-full";

    return (
        <div className={`${containerClasses} flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-t-[42px] rounded-b-3xl border-t-4 border-t-[#449C40] border-x border-b border-gray-200 dark:border-zinc-800 hover:border-[#449C40] dark:hover:border-[#449C40] transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl relative`}>
            <div>
                {/* Mihrab Arch Decorative Top Header */}
                <div className="pt-2 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between px-5 pt-3 pb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 text-[11px] font-bold rounded-full bg-[#449C40] text-white shadow-xs">
                            <FontAwesomeIcon icon={faMicrophone} className="text-[10px]" />
                            <span>منبر الخطبة</span>
                        </span>
                        <CardActions item={item} categoryType="khotab" onUpdate={onUpdate} />
                    </div>

                    {/* Mihrab Arch Curve Outline */}
                    <div className="flex justify-center -mb-px">
                        <div className="w-16 h-3 bg-white dark:bg-zinc-900 rounded-t-full border-t border-x border-emerald-500/30"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2 cursor-pointer" onClick={onOpenModal}>
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-50 dark:bg-zinc-800 text-[#449C40] dark:text-emerald-400 rounded-md text-[11px] font-bold border border-emerald-100 dark:border-zinc-700">
                        خطبة جمعة مفرغة
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white line-clamp-3 leading-snug group-hover:text-[#449C40] transition-colors">
                        {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-4 leading-relaxed font-sans">
                        {item.description || "خطبة الجمعة المنبرية تتناول موضوعات إيمانية وسلوكية هامة مع الأدلة الشرعية من الكتاب والسنة."}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0">
                <div className="flex items-center justify-between text-[11px] border-t border-gray-100 dark:border-zinc-800 pt-2.5 mb-3 text-gray-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 truncate">
                        <FontAwesomeIcon icon={faUser} className="text-[#449C40] shrink-0 text-xs" />
                        <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                    </div>
                    {dateFormatted && <span className="text-[10px] text-gray-400">{dateFormatted}</span>}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onOpenModal}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-all active:scale-95 shadow-xs"
                    >
                        <FontAwesomeIcon icon={faEye} />
                        <span>معاينة وثيقة الخطبة</span>
                    </button>
                    {mainAttachment?.url && (
                        <a
                            href={mainAttachment.url}
                            download
                            className="flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold text-[#449C40] bg-emerald-50 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all border border-emerald-100 dark:border-zinc-700"
                            title="تحميل الخطبة"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

/* =========================================================================
   5. FATWA SHAPE CARD (طراز ورقة ووثيقة الفتوى الشرعية المعتمدة)
   ========================================================================= */
function FatwaShapeCard({ item, sec, author, dateFormatted, onOpenModal, onUpdate, isSlider }) {
    const containerClasses = isSlider
        ? "snap-start shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] md:w-[360px]"
        : "w-full h-full";

    return (
        <div className={`${containerClasses} flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-3xl border-2 border-emerald-500/40 hover:border-[#449C40] dark:hover:border-[#449C40] transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl relative p-1`}>
            {/* Inner Parchment Frame Border */}
            <div className="h-full flex flex-col justify-between border border-dashed border-emerald-500/30 rounded-[22px] p-3 bg-gradient-to-b from-emerald-50/20 via-transparent to-transparent dark:from-zinc-900/40">
                <div>
                    {/* Meta Top Bar */}
                    <div className="flex items-center justify-between pb-2.5 border-b border-gray-100 dark:border-zinc-800">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold rounded-md bg-[#449C40] text-white shadow-xs">
                            <span>وثيقة فتوى شرعية</span>
                        </span>
                        <CardActions item={item} categoryType="fatwa" onUpdate={onUpdate} />
                    </div>

                    {/* Scholarly Decree Question Box */}
                    <div className="pt-3 space-y-2.5 cursor-pointer" onClick={onOpenModal}>
                        <div className="flex items-center justify-between text-xs font-bold text-[#449C40]">
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faCheckCircle} />
                                <span>صك فتوى موثوق ومسبب</span>
                            </span>
                        </div>

                        <div className="bg-emerald-50/70 dark:bg-zinc-800/80 p-3 rounded-xl border border-emerald-200/60 dark:border-zinc-700">
                            <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-zinc-100 line-clamp-3 leading-snug">
                                السؤال: {item.title}
                            </h4>
                        </div>

                        <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-3 leading-relaxed font-sans px-0.5">
                            {item.description || "الجواب والفتوى الشرعية مسببة بالأدلة من كتاب الله وسنة رسوله صلى الله عليه وسلم."}
                        </p>
                    </div>
                </div>

                {/* Actions & Scholar Info */}
                <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] border-t border-gray-100 dark:border-zinc-800 pt-2 mb-2.5 text-gray-600 dark:text-zinc-400">
                        <div className="flex items-center gap-1.5 truncate">
                            <FontAwesomeIcon icon={faUser} className="text-[#449C40] shrink-0 text-xs" />
                            <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                        </div>
                        {dateFormatted && <span className="text-[10px] text-gray-400">{dateFormatted}</span>}
                    </div>

                    <button
                        onClick={onOpenModal}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-all active:scale-95 shadow-xs"
                    >
                        <FontAwesomeIcon icon={faEye} />
                        <span>عرض الفتوى بالكامل</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

/* =========================================================================
   6. VIDEO SHAPE CARD (طراز واجهة مشغل وفاتح المرئيات MWEIZA VIDEO PLAYER)
   ========================================================================= */
function VideoShapeCard({ item, sec, author, dateFormatted, countAttachments, mainAttachment, onOpenModal, onUpdate, isSlider }) {
    const containerClasses = isSlider
        ? "snap-start shrink-0 w-[85vw] max-w-[340px] sm:w-[340px] md:w-[360px]"
        : "w-full h-full";

    return (
        <div className={`${containerClasses} flex flex-col justify-between bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 hover:border-[#449C40] dark:hover:border-[#449C40] transition-all duration-300 overflow-hidden group shadow-md hover:shadow-xl relative`}>
            <div>
                {/* Video Player Window Header Bar */}
                <div className="flex items-center justify-between px-4 pt-3 pb-2.5 border-b border-gray-100 dark:border-zinc-800 bg-zinc-950 text-white">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#449C40]"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-300 mr-1">مشغل المرئيات المباشر</span>
                    </div>
                    <CardActions item={item} categoryType="videos" onUpdate={onUpdate} />
                </div>

                {/* Video Screen Window */}
                <div className="relative h-48 bg-black overflow-hidden cursor-pointer" onClick={onOpenModal}>
                    <SafeImage
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        fallbackComponent={<CleanMediaFallback icon={faFileVideo} title={item.title} />}
                    />
                    {item.image && (
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-13 h-13 bg-[#449C40] text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <FontAwesomeIcon icon={faPlayCircle} className="text-2xl" />
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-2.5 right-3 left-3 flex justify-between items-center text-white z-10">
                        <span className="text-[10px] font-bold bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded text-emerald-300 border border-white/10">
                            {countAttachments} مقاطع مصورة
                        </span>
                        <span className="text-[10px] font-bold bg-[#449C40] px-2.5 py-0.5 rounded text-white shadow-xs">
                            1080p HD
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#449C40] transition-colors">
                        {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-zinc-400 text-xs line-clamp-2 leading-relaxed font-sans">
                        {item.description || "درس وحلقة علمية مصورة عالية الجودة يمكنك مشاهدتها مباشرة على المنصة."}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 pt-0">
                <div className="flex items-center justify-between text-[11px] border-t border-gray-100 dark:border-zinc-800 pt-2.5 mb-3 text-gray-600 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 truncate">
                        <FontAwesomeIcon icon={faUser} className="text-[#449C40] shrink-0 text-xs" />
                        <span className="font-bold text-gray-800 dark:text-zinc-200 truncate">{author}</span>
                    </div>
                    {dateFormatted && <span className="text-[10px] text-gray-400">{dateFormatted}</span>}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={onOpenModal}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-[#449C40] hover:bg-[#00703C] rounded-xl transition-all active:scale-95 shadow-xs"
                    >
                        <FontAwesomeIcon icon={faPlayCircle} />
                        <span>تشغيل ومشاهدة الفيديو</span>
                    </button>
                    {mainAttachment?.url && (
                        <a
                            href={mainAttachment.url}
                            download
                            className="flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-bold text-[#449C40] bg-emerald-50 hover:bg-emerald-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl transition-all border border-emerald-100 dark:border-zinc-700"
                            title="تحميل الفيديو"
                        >
                            <FontAwesomeIcon icon={faDownload} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
