"use client";

import { useState } from "react";
import Link from "next/link";
import StorageDashboard from "@/components/shared/StorageDashboard";
import { performOfflineSearch } from "@/lib/offline/offlineSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faWifi,
    faSearch,
    faBookOpen,
    faHandsPraying,
    faClock,
    faCompass,
    faCalendarAlt,
    faHome,
} from "@fortawesome/free-solid-svg-icons";

export default function OfflinePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        const res = await performOfflineSearch(searchQuery);
        setSearchResults(res);
    };

    const QUICK_SECTIONS = [
        { title: "القرآن الكريم", href: "/qaran", icon: faBookOpen, desc: "تلاوة وتفسير أوفلاين" },
        { title: "الأذكار والأدعية", href: "/azekar", icon: faHandsPraying, desc: "حصن المسلم كاملاً" },
        { title: "مواقيت الصلاة", href: "/salah", icon: faClock, desc: "المواقيت المسبقة" },
        { title: "العداد والتسبيح", href: "/tasbih", icon: faCompass, desc: "المسبحة الإلكترونية" },
        { title: "التقويم الهجري", href: "/calendar", icon: faCalendarAlt, desc: "التقويم والمناسبات" },
    ];

    return (
        <div className="container max-w-4xl mx-auto px-4 py-8">
            {/* الترويسة والتنبيه */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-6 text-center mb-8">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/40 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                    <FontAwesomeIcon icon={faWifi} />
                </div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                    أنت تتصفح في الوضع الأوفلاين (بدون إنترنت)
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-md mx-auto mb-4">
                    جميع الأقسام والصفحات المحفوظة مسبقاً تعمل بكفاءة عالية. يمكنك استخدام البحث المحلي أو التنقل بين الأقسام المتاحة أوفلاين.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-lime-600 hover:bg-lime-700 text-white font-medium text-xs px-4 py-2 rounded-xl transition-all"
                >
                    <FontAwesomeIcon icon={faHome} />
                    الصفحة الرئيسية المحفوظة
                </Link>
            </div>

            {/* محرك البحث المحلي */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-8 shadow-sm">
                <h2 className="font-bold text-base text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <FontAwesomeIcon icon={faSearch} className="text-lime-600" />
                    البحث المحلي بدون إنترنت
                </h2>
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="ابحث في الأذكار، السور المخزنة، أو أسماء الله..."
                        className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-lime-500"
                    />
                    <button
                        type="submit"
                        className="bg-lime-600 hover:bg-lime-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors"
                    >
                        بحث محلي
                    </button>
                </form>

                {/* نتائج البحث المحلي */}
                {searchResults && (
                    <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                        <h3 className="text-xs font-bold text-zinc-400">نتائج البحث المحلي:</h3>
                        {searchResults.azekar.length === 0 && searchResults.quran.length === 0 && searchResults.names.length === 0 ? (
                            <p className="text-xs text-zinc-500">لم يتم العثور على نتائج مطابقة في البيانات المخزنة محلياً.</p>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {searchResults.azekar.map((item, i) => (
                                    <div key={i} className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg text-xs">
                                        <span className="font-bold text-lime-600">ذكر: </span>
                                        <span className="text-zinc-800 dark:text-zinc-200">{item.text || item.zekr || item.category}</span>
                                    </div>
                                ))}
                                {searchResults.quran.map((surah, i) => (
                                    <Link key={i} href={`/qaran`} className="block p-2.5 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-lime-50 dark:hover:bg-lime-950/30 rounded-lg text-xs transition-colors">
                                        <span className="font-bold text-lime-600">سورة: </span>
                                        <span className="text-zinc-800 dark:text-zinc-200">{surah.name || surah.arName}</span>
                                    </Link>
                                ))}
                                {searchResults.names.map((n, i) => (
                                    <div key={i} className="p-2.5 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg text-xs">
                                        <span className="font-bold text-lime-600">اسم الله: </span>
                                        <span className="text-zinc-800 dark:text-zinc-200">{n.name} - {n.meaning}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* الأقسام السريعة المتاحة أوفلاين */}
            <div className="mb-8">
                <h2 className="font-bold text-lg text-zinc-900 dark:text-white mb-4">الأقسام المتاحة أوفلاين:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {QUICK_SECTIONS.map((section, idx) => (
                        <Link
                            key={idx}
                            href={section.href}
                            className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-lime-500 transition-all flex items-start gap-3 group shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-lg bg-lime-50 dark:bg-lime-950/40 text-lime-600 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                                <FontAwesomeIcon icon={section.icon} />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-lime-600 transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-xs text-zinc-500 mt-0.5">{section.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* لوحة تحكم التخزين الأوفلاين */}
            <StorageDashboard />
        </div>
    );
}
