"use client";

import { useState } from "react";
import useSWR from "swr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuran, faChevronDown, faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function SurahSelect({ selectedSurahId, onSelectSurah, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: surahsRes } = useSWR("https://api.alquran.cloud/v1/surah");
    const surahsList = surahsRes?.data || [];

    const filteredSurahs = surahsList.filter(s =>
        s.name.includes(searchQuery.trim()) ||
        String(s.number) === searchQuery.trim() ||
        s.englishName.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    const selectedSurah = surahsList.find(s => parseInt(s.number, 10) === parseInt(selectedSurahId, 10)) || {
        number: selectedSurahId || 1,
        name: `سورة ${selectedSurahId || 1}`,
        numberOfAyahs: 7
    };

    return (
        <div className={`relative ${className}`} dir="rtl">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:border-emerald-500 rounded-2xl px-4 py-2.5 shadow-xs transition-all flex items-center justify-between gap-3 text-right"
            >
                <div className="flex items-center gap-3 truncate">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {selectedSurah.number}
                    </div>
                    <div className="truncate">
                        <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                            {selectedSurah.name}
                        </div>
                        <div className="text-[11px] text-gray-400 dark:text-zinc-500 font-semibold truncate">
                            {selectedSurah.numberOfAyahs ? `${selectedSurah.numberOfAyahs} آية` : ""}
                        </div>
                    </div>
                </div>

                <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-xs text-gray-400 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {/* القائمة المنسدلة للبحث واختيار السورة */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                    <div className="absolute right-0 top-full mt-2 w-72 md:w-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl z-50 p-3 space-y-2 max-h-80 flex flex-col">
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ابحث برقم السورة أو اسمها..."
                                className="w-full bg-slate-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-xl py-2 pr-9 pl-3 text-xs font-semibold focus:outline-none focus:border-emerald-500"
                            />
                            <FontAwesomeIcon icon={faSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
                        </div>

                        <div className="overflow-y-auto custom-scrollbar flex-1 space-y-1 pr-1">
                            {filteredSurahs.length === 0 ? (
                                <p className="text-center py-4 text-xs text-gray-400">لا توجد سورة مطابقة للبحث</p>
                            ) : (
                                filteredSurahs.map((surah) => {
                                    const isSelected = parseInt(surah.number, 10) === parseInt(selectedSurahId, 10);
                                    return (
                                        <button
                                            key={surah.number}
                                            type="button"
                                            onClick={() => {
                                                onSelectSurah(surah);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full p-2.5 rounded-xl text-right transition-all flex items-center justify-between text-xs font-bold ${
                                                isSelected
                                                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-lime-400 border border-emerald-200 dark:border-emerald-800/40"
                                                    : "text-gray-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/60"
                                            }`}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 text-[11px] font-bold flex items-center justify-center">
                                                    {surah.number}
                                                </span>
                                                <span>{surah.name}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-gray-400 font-normal">
                                                    {surah.numberOfAyahs} آية
                                                </span>
                                                {isSelected && <FontAwesomeIcon icon={faCheck} className="text-emerald-500" />}
                                            </div>
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
