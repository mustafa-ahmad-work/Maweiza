"use client";

import { useState } from "react";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faChevronDown, faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";

export const DEFAULT_RECITERS = [
    { id: "ar.alafasy", name: "مشاري العفاسي", rewaya: "حفص عن عاصم" },
    { id: "ar.minshawi", name: "محمد صديق المنشاوي (المجود)", rewaya: "حفص عن عاصم - مجود" },
    { id: "ar.minshawimurattal", name: "محمد صديق المنشاوي (المرتل)", rewaya: "حفص عن عاصم - مرتل" },
    { id: "ar.husary", name: "محمود خليل الحصري", rewaya: "حفص عن عاصم" },
    { id: "ar.abdulbasitmurattal", name: "عبد الباسط عبد الصمد (المرتل)", rewaya: "حفص عن عاصم - مرتل" },
    { id: "ar.abdulbasitmojawwad", name: "عبد الباسط عبد الصمد (المجود)", rewaya: "حفص عن عاصم - مجود" },
    { id: "ar.sudais", name: "عبد الرحمن السديس", rewaya: "حفص عن عاصم" },
    { id: "ar.shuraym", name: "سعود الشريم", rewaya: "حفص عن عاصم" },
    { id: "ar.mahermuaiqly", name: "ماهر المعيقلي", rewaya: "حفص عن عاصم" }
];

export default function ReciterSelect({ selectedReciterId, onSelectReciter, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // جلب القراء من API التلاوات إن أمكن
    const { data: recitersRes } = useSWR("https://abdoahmed26.github.io/api/arabic.json");
    
    let recitersList = DEFAULT_RECITERS;
    if (recitersRes?.reciters && Array.isArray(recitersRes.reciters)) {
        recitersList = recitersRes.reciters.map(r => ({
            id: r.id,
            name: r.name,
            rewaya: r.rewaya || "حفص عن عاصم",
            server: r.Server
        }));
    }

    const filteredReciters = recitersList.filter(r =>
        r.name.includes(searchQuery.trim())
    );

    const selectedReciter = recitersList.find(r => String(r.id) === String(selectedReciterId)) || recitersList[0];

    return (
        <div className={`relative ${className}`} dir="rtl">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-primary rounded-2xl px-4 py-2.5 shadow-xs transition-all flex items-center justify-between gap-3 text-right"
            >
                <div className="flex items-center gap-3 truncate">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary flex items-center justify-center text-xs shrink-0">
                        <FontAwesomeIcon icon={faHeadphones} />
                    </div>
                    <div className="truncate">
                        <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            الشيخ {selectedReciter?.name}
                        </div>
                        <div className="text-[11px] text-gray-400 dark:text-zinc-500 font-semibold truncate">
                            {selectedReciter?.rewaya}
                        </div>
                    </div>
                </div>

                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-xs text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* القائمة المنسدلة للبحث وااختيار القارئ */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                    <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 p-3 space-y-2 max-h-80 flex flex-col">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ابحث باسم القارئ..."
                                className="w-full bg-slate-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl py-2 pr-9 pl-3 text-xs font-semibold focus:outline-none focus:border-primary"
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
                        </div>

                        <div className="overflow-y-auto custom-scrollbar flex-1 space-y-1 pr-1">
                            {filteredReciters.length === 0 ? (
                                <p className="text-center py-4 text-xs text-gray-400">لا يوجد قارئ بهذا الاسم</p>
                            ) : (
                                filteredReciters.map((reciter) => {
                                    const isSelected = String(reciter.id) === String(selectedReciterId);
                                    return (
                                        <button
                                            key={reciter.id}
                                            type="button"
                                            onClick={() => {
                                                onSelectReciter(reciter);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full p-2.5 rounded-xl text-right transition-all flex items-center justify-between text-xs font-bold ${
                                                isSelected
                                                    ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/20 dark:border-primary/30"
                                                    : "text-gray-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60"
                                            }`}
                                        >
                                            <span>الشيخ {reciter.name}</span>
                                            {isSelected && <FontAwesomeIcon icon={faCheck} className="text-primary" />}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
