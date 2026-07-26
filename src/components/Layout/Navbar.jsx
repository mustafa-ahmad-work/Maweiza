"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Headroom from "react-headroom";
import { navLinks } from "@/data/links";
import { useRamadan } from "@/context/ramadanContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const { ramadan } = useRamadan();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname();
    const dropdownRef = useRef(null);

    // تأثير التمرير
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // إغلاق القائمة عند تغيير حجم الشاشة
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // إغلاق القائمة المنسدلة عند النقر في الخارج
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const mainLinks = navLinks.slice(0, 5); // الصفحة الرئيسية، القرآن الكريم، تفسير القرآن، الحديث الشريف، الأدعية والأذكار
    
    const moreLinks = [
        { name: "تطبيق مفاتيح الحفظ", path: "/application" },
        { name: "قسم الاقتباسات", path: "/quotes" },
        { name: "قسم الكتب", path: "/books/1" },
        { name: "قسم المقالات", path: "/articles/1" },
        { name: "قسم الخطب", path: "/khotab/1" },
        { name: "قسم الفتاوى", path: "/fatwa/1" },
        { name: "المحاضرات الصوتية", path: "/audios/1" },
        { name: "المحاضرات المرئية", path: "/videos/1" },
        { name: "قسم التسبيح", path: "/tasbih" },
        { name: "أوقات الصلاة", path: "/salah" },
        { name: "أسماء الله الحسنى", path: "/names" },
        { name: "الباحث في الحديث", path: "/search/-" },
        { name: "زكاة المال", path: "/zakat" },
        { name: "أطفال المسلمين", path: "/children" }
    ];

    return (
        <>
            {/* شريط التنقل الرئيسي */}
            <Headroom className="fixed z-50 top-0 left-0 right-0 w-full max-w-full transition-all duration-300">
                <nav className={`relative transition-all duration-305 border-b w-full max-w-full ${scrolled ? 'backdrop-blur-xl bg-white/95 dark:bg-zinc-950/95 shadow-sm border-gray-100 dark:border-zinc-700/80 py-2 lg:py-3' : 'bg-transparent border-transparent py-2.5 lg:py-4'}`}>
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex justify-between items-center flex-row">
                            {/* الشعار - يمين في وضع RTL */}
                            <Link href="/" className="flex-shrink-0 flex items-center space-x-3 rtl:space-x-reverse">
                                <div className="relative w-[75px] sm:w-[90px] md:w-[105px] lg:w-[120px]">
                                    <Image
                                        priority
                                        quality={95}
                                        width={120}
                                        height={35}
                                        src="/logo.png"
                                        alt="شعار موعظة"
                                        style={{ width: "auto", height: "auto" }}
                                        className="w-full h-auto transition-transform duration-300 hover:scale-102"
                                    />
                                </div>
                            </Link>

                            {/* قائمة سطح المكتب - وسط في وضع RTL */}
                            <div className="hidden lg:flex items-center gap-2 xl:gap-6">
                                <div className="flex items-center gap-0.5 xl:gap-1 flex-row">
                                    {mainLinks.map((item, index) => {
                                        const isActive = pathname === item.path;
                                        return (
                                            <Link
                                                key={index}
                                                href={item.path}
                                                className={`px-1.5 xl:px-4 py-2 text-xs xl:text-sm font-bold transition-colors duration-200 whitespace-nowrap ${isActive ? 'text-primary dark:text-lime-400' : 'text-gray-700 dark:text-zinc-300 hover:text-primary dark:hover:text-lime-400'}`}
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}

                                    {/* زر "المزيد" المنسدل التفاعلي بنقرة زر */}
                                    <div className="relative" ref={dropdownRef}>
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className={`flex items-center gap-1 px-1.5 xl:px-4 py-2 text-xs xl:text-sm font-bold rounded-xl transition-colors duration-200 whitespace-nowrap text-gray-700 dark:text-zinc-300 hover:text-primary dark:hover:text-lime-400 ${isDropdownOpen ? 'text-primary dark:text-lime-400' : ''}`}
                                        >
                                            <span>المزيد</span>
                                            <svg className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-primary dark:text-lime-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                                            </svg>
                                        </button>

                                        {/* القائمة المنسدلة للأقسام الإضافية */}
                                        <div className={`absolute right-0 mt-2 w-[400px] max-w-[90vw] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-gray-100 dark:border-zinc-800/50 rounded-2xl shadow-xl p-4 transition-all duration-200 z-50 origin-top-right ${isDropdownOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}>
                                            <div className="grid grid-cols-2 gap-2 text-right">
                                                {moreLinks.map((item, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={item.path}
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="px-2.5 py-2 text-xs font-bold text-gray-700 dark:text-zinc-300 hover:text-primary dark:hover:text-lime-400 hover:bg-lime-50/50 dark:hover:bg-lime-950/20 rounded-xl transition-all duration-150 flex items-center gap-2 whitespace-nowrap"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-lime-500/60 flex-shrink-0"></span>
                                                        <span>{item.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* أزرار البحث والتنقل للهاتف وصفحات الموقع */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Link
                                    href="/search/-"
                                    className="flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-xl bg-lime-50/90 dark:bg-lime-950/30 border border-emerald-500/20 dark:border-emerald-500/30 text-primary dark:text-lime-400 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95"
                                    aria-label="البحث"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </Link>

                                {/* زر القائمة للهاتف - بنفس هوية وألوان الموقع */}
                                <button
                                    onClick={toggleMenu}
                                    className="lg:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-lime-50/90 dark:bg-lime-950/30 border border-emerald-500/20 dark:border-emerald-500/30 text-primary dark:text-lime-400 shadow-xs hover:shadow-sm transition-all duration-200 active:scale-95"
                                    aria-label="القائمة الرئيسية"
                                    aria-expanded={isOpen}
                                >
                                    <div className="w-4 h-4 flex flex-col justify-center items-center gap-[4px] relative">
                                        <span className={`h-[2px] bg-primary dark:bg-lime-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'w-4 rotate-45 translate-y-[6px]' : 'w-4'}`}></span>
                                        <span className={`h-[2px] bg-primary dark:bg-lime-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'w-0 opacity-0' : 'w-3 self-end'}`}></span>
                                        <span className={`h-[2px] bg-primary dark:bg-lime-400 rounded-full transition-all duration-300 ease-in-out ${isOpen ? 'w-4 -rotate-45 -translate-y-[6px]' : 'w-4'}`}></span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>
            </Headroom>

            {/* القائمة الجانبية للهاتف - تطابق هوية الموقع وألوانه والأخط الأصلية */}
            <div
                className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'}`}
                onClick={() => setIsOpen(false)}
            >
                <div
                    className={`fixed top-0 right-0 h-[100dvh] w-full sm:w-80 max-w-full sm:max-w-[340px] bg-white dark:bg-zinc-950 shadow-2xl border-l border-gray-100 dark:border-zinc-700/80 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full text-right" dir="rtl">
                        {/* رأس القائمة الجانبية */}
                        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-100 dark:border-zinc-700/80">
                            <div className="flex items-center gap-2.5">
                                <Image
                                    priority
                                    width={100}
                                    height={30}
                                    src="/logo.png"
                                    alt="موعظة"
                                    style={{ width: "auto", height: "auto" }}
                                    className="w-[80px] sm:w-[95px] h-auto"
                                />
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white bg-gray-100/80 dark:bg-zinc-800/80 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200"
                                aria-label="إغلاق القائمة"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* محتوى القائمة الجانبية للجوال - ألوان وخيارات الموقع الأصلية بنفس الخط Cairo وبترتيب رأسي */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar">
                            {/* القائمة الرئيسية */}
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-2 px-2">القائمة الرئيسية</h3>
                                <ul className="space-y-1">
                                    {mainLinks.map((item, index) => {
                                        const isActive = pathname === item.path;
                                        return (
                                            <li key={index}>
                                                <Link
                                                    onClick={() => setIsOpen(false)}
                                                    href={item.path}
                                                    className={`flex items-center justify-between px-3.5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${isActive ? 'text-primary dark:text-lime-400 bg-lime-50/60 dark:bg-lime-950/30 font-black' : 'text-gray-700 dark:text-zinc-300 hover:text-primary dark:hover:text-lime-400 hover:bg-gray-50 dark:hover:bg-zinc-900/60'}`}
                                                >
                                                    <span>{item.name}</span>
                                                    <svg className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-primary dark:text-lime-400' : 'text-gray-400 dark:text-zinc-600'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* أقسام موعظة مرتبة رأسياً تحت بعضها بنظام ألوان الموقع */}
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-wider mb-2 px-2">أقسام موقع موعظة</h3>
                                <ul className="space-y-1.5">
                                    {moreLinks.map((item, index) => {
                                        const isActive = pathname === item.path;
                                        return (
                                            <li key={index}>
                                                <Link
                                                    onClick={() => setIsOpen(false)}
                                                    href={item.path}
                                                    className={`flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all duration-200 border ${isActive ? 'text-primary dark:text-lime-400 bg-lime-50/60 dark:bg-lime-950/30 border-emerald-500/20 dark:border-emerald-500/30 font-black' : 'text-gray-700 dark:text-zinc-300 hover:text-primary dark:hover:text-lime-400 bg-gray-50/50 dark:bg-zinc-900/40 border-gray-100/80 dark:border-zinc-800/80 hover:bg-lime-50/40 dark:hover:bg-lime-950/20'}`}
                                                >
                                                    <div className="flex items-center gap-2.5">
                                                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive ? 'bg-primary dark:bg-lime-400' : 'bg-lime-500/60'}`}></span>
                                                        <span>{item.name}</span>
                                                    </div>
                                                    <svg className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-primary dark:text-lime-400' : 'text-gray-400 dark:text-zinc-600'}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


