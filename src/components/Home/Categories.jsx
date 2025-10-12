import Link from "next/link";
import Image from "next/image";
import { categoriesLinks } from "@/data/links";
import { useRamadan } from "@/context/ramadanContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faBook,
    faMosque,
    faQuran,
    faClock,
    faHands,
    faQuoteRight,
    faVideo,
    faMicrophone,
    faBookOpen,
    faNewspaper,
    faComments,
    faQuestionCircle,
    faSearch,
    faChild,
    faHandHoldingUsd,
    faCalendarAlt,
    faList,
    faPrayingHands
} from "@fortawesome/free-solid-svg-icons";

export default function Categories() {
    const { ramadan } = useRamadan();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // الحصول على الأيقونة المناسبة لكل قسم
    // 🧩 دالة إرجاع الأيقونة المناسبة لكل قسم
    const getIcon = (name) => {
        const iconMap = {
            "إمساكية شهر رمضان": faCalendarAlt,
            "يومي في رمضان": faList,
            "أسئلة دينية": faQuestionCircle,
            "أداة الباحث في الحديث": faSearch,
            "أسماء الله الحسنى": faStar,
            "قسم القرآن الكريم": faQuran,
            "قسم تفسير القرآن": faBookOpen,
            "قسم الحديث": faBook,
            "أوقات الصلاة والمناسبات الإسلامية": faClock,
            "قسم الأدعية والأذكار": faHands,
            "قسم التسبيح": faPrayingHands,
            "قسم الاقتباسات": faQuoteRight,
            "قسم الكتب": faBook,
            "قسم المقالات": faNewspaper,
            "قسم الخطب": faComments,
            "قسم الفتاوى": faComments,
            "قسم المحاضرات الصوتية": faMicrophone,
            "قسم المحاضرات المرئية": faVideo,
            "ما لا يسع أطفال المسلمين جهله": faChild,
            "زكاة المال": faHandHoldingUsd,
        };

        // ترجع الأيقونة المرتبطة بالاسم أو أيقونة افتراضية إن لم توجد
        return iconMap[name] || faBook;
    };

    // 🎨 دالة إرجاع لون الخلفية المناسب لكل قسم
    const getBgColor = (name) => {
        const colorMap = {
            "إمساكية شهر رمضان": "from-amber-500 to-orange-600",
            "يومي في رمضان": "from-amber-500 to-orange-600",
            "أسئلة دينية": "from-blue-500 to-indigo-600",
            "أداة الباحث في الحديث": "from-purple-500 to-indigo-600",
            "أسماء الله الحسنى": "from-emerald-500 to-teal-600",
            "قسم القرآن الكريم": "from-emerald-500 to-teal-600",
            "قسم تفسير القرآن": "from-emerald-500 to-teal-600",
            "قسم الحديث": "from-emerald-500 to-teal-600",
            "أوقات الصلاة والمناسبات الإسلامية": "from-cyan-500 to-blue-600",
            "قسم الأدعية والأذكار": "from-cyan-500 to-blue-600",
            "قسم التسبيح": "from-cyan-500 to-blue-600",
            "قسم الاقتباسات": "from-violet-500 to-purple-600",
            "قسم الكتب": "from-rose-500 to-pink-600",
            "قسم المقالات": "from-rose-500 to-pink-600",
            "قسم الخطب": "from-rose-500 to-pink-600",
            "قسم الفتاوى": "from-rose-500 to-pink-600",
            "قسم المحاضرات الصوتية": "from-orange-500 to-amber-600",
            "قسم المحاضرات المرئية": "from-orange-500 to-amber-600",
            "ما لا يسع أطفال المسلمين جهله": "from-lime-500 to-emerald-600",
            "زكاة المال": "from-lime-500 to-emerald-600",
        };

        // ترجع لون الخلفية المطابق أو لون افتراضي إن لم يُعرّف القسم
        return colorMap[name] || "from-gray-500 to-gray-700";
    };


    const showData = categoriesLinks.map((item, key) => {
        // إذا كان القسم خاصاً برمضان وليس شهر رمضان، لا عرضه
        if (item.ramadan && !ramadan) return null;
        return (
            <div
                key={key}
                dir="rtl"
                className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                style={{ transitionDelay: `${key * 70}ms` }}
            >
                <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 flex flex-col">
                    {/* تأثير إضاءة متدرج */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/40 via-transparent to-transparent dark:from-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* شارة جديد */}
                    {item.new && (
                        <div className="absolute top-4 right-4 z-10">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-md">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-200" />
                                جديد
                            </span>
                        </div>
                    )}

                    {/* شارة رمضان */}
                    {item.ramadan && (
                        <div className="absolute top-4 left-4 z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-md animate-pulse">
                                رمضان
                            </span>
                        </div>
                    )}

                    {/* زخرفة هندسية خفيفة */}
                    <div className="absolute -bottom-8 -left-8 w-40 h-40 opacity-10 dark:opacity-20 rotate-12 pointer-events-none">
                        <div className="w-full h-full border-4 border-emerald-400 rounded-full"></div>
                    </div>

                    <div className="relative z-10 flex flex-col h-full p-5 flex-grow">

                        {/* الصورة */}
                        <div className="flex justify-center mb-5">
                            <div className="relative w-32 h-32 overflow-hidden transform group-hover:scale-105 transition-transform duration-700">
                                <Image
                                    src={item.img}
                                    alt={item.name}
                                    width={160}
                                    height={160}
                                    className="object-cover w-full h-full rounded-2xl"
                                    quality={85}
                                    loading="lazy"
                                />
                            </div>
                        </div>

                        {/* العنوان */}
                        <h3 className="text-lg font-bold text-center text-gray-800 dark:text-white mb-4 line-clamp-2 leading-relaxed">
                            {item.name}
                        </h3>

                        {/* الزر */}
                        <div className="mt-auto">
                            <Link
                                href={item.path}
                                className={`group/btn block w-full py-3 px-5 text-center rounded-xl font-semibold bg-gradient-to-r ${getBgColor(
                                    item.name
                                )} text-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden`}
                            >
                                <span className="relative z-10 flex justify-center items-center gap-2">
                                    <svg
                                        className="w-4 h-4 transform group-hover/btn:-translate-x-1 transition-transform duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                                    </svg>
                                    اكتشف القسم
                                </span>

                                {/* تأثير لمعة زر */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 rounded-xl"></div>
                            </Link>
                        </div>
                    </div>

                    {/* خط متحرك بالأسفل */}
                    <div
                        className={`absolute bottom-0 right-0 left-0 h-[3px] bg-gradient-to-r ${getBgColor(
                            item.name
                        )} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right`}
                    ></div>
                </div>
            </div>
        )
    });

    return (
        <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800" id="categories">
            {/* زخارف خلفية إسلامية */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 border-4 border-emerald-200 dark:border-emerald-900 rounded-full opacity-30 dark:opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-emerald-200 dark:border-emerald-900 rounded-full opacity-30 dark:opacity-20"></div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-emerald-200 dark:border-emerald-900 transform rotate-45 opacity-30 dark:opacity-20"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* عنوان القسم */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-medium mb-4">
                        اكتشف محتوانا
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        أقسام الموقع
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        استكشف مجموعتنا المتنوعة من المحتوى الإسلامي عالي الجودة، المصمم لتعزيز معرفتك وتقربك من الله عز وجل
                    </p>

                    {/* خط زخرفي تحت العنوان */}
                    <div className="flex justify-center items-center mt-6">
                        <div className="h-px bg-gray-300 dark:bg-gray-700 w-16"></div>
                        <div className="mx-3 w-2 h-2 rounded-full bg-emerald-500"></div>
                        <div className="h-px bg-gray-300 dark:bg-gray-700 w-16"></div>
                    </div>
                </div>

                {/* شبكة الأقسام */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {showData.filter(Boolean)}
                </div>

                {/* قسم خاص لرمضان إذا كان الشهر الفضيل */}
                {ramadan && (
                    <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 mb-4">
                                <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                محتوى خاص بشهر رمضان
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
                                استمتع بمحتوى مخصص لشهر رمضان المبارك، بما في ذلك الإمساكية والجدول اليومي والأنشطة الرمضانية
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
