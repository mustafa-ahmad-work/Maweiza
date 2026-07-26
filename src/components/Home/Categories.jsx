import Link from "next/link";
import Image from "next/image";
import { categoriesLinks } from "@/data/links";
import { useRamadan } from "@/context/ramadanContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faBook,
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
    faPrayingHands,
    faList
} from "@fortawesome/free-solid-svg-icons";

export default function Categories() {
    const { ramadan } = useRamadan();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // دالة إرجاع الوصف المناسب لكل قسم
    const getDescription = (name) => {
        const descMap = {
            "إمساكية شهر رمضان": "دليلك الشامل لمواعيد الإفطار والإمساك ومواقيت الصلوات الخمس اليومية بدقة عالية لشهر رمضان المبارك.",
            "يومي في رمضان": "جدول تفاعلي متكامل لمتابعة طاعاتك اليومية، وختمات القرآن الكريم، والأعمال الصالحة خلال أيام رمضان.",
            "أسئلة دينية": "اختبر معلوماتك الشرعية وأجب عن أسئلة متنوعة وشيقة في العقيدة والفقه والسيرة لتعزيز ثقافتك الدينية.",
            "أداة الباحث في الحديث": "محرك بحث متقدم وذكي للتحقق من صحة الأحاديث النبوية الشريفة ورواياتها وتخريجها بسهولة وموثوقية.",
            "أسماء الله الحسنى": "تدبر معاني ودلالات أسماء الله الحسنى الروحية والشرعية، واكتشف الآثار الإيمانية لكل اسم في حياتك.",
            "قسم القرآن الكريم": "استمع واقرأ المصحف الشريف بتلاوات خاشعة لقرّاء العالم الإسلامي مع مزايا السرد والاستماع الشامل.",
            "قسم تفسير القرآن": "تأمل معاني القرآن العظيم عبر تفاسير شرعية موثوقة وميسرة توضح مقاصد الآيات وأسباب النزول.",
            "قسم الحديث": "اقرأ أحاديث النبي صلى الله عليه وسلم المشروحة والمدعمة بالفوائد الفقهية والتربوية المعتمدة.",
            "أوقات الصلاة والمناسبات الإسلامية": "مواقيت الصلاة الدقيقة لمختلف مدن العالم مع تنبيهات ومتابعة المناسبات والتقويم الهجري.",
            "قسم الأدعية والأذكار": "حصن المسلم الشامل لأذكار الصباح والمساء، أذكار النوم والصلاة، والأدعية الجامعة لكل الأوقات والأحوال.",
            "قسم التسبيح": "مسبحة إلكترونية ذكية وتفاعلية تساعدك على ملازمة الذكر والاستغفار وحفظ أعداد الأذكار اليومية.",
            "قسم الاقتباسات": "حكم ومأثورات ودرر إسلامية من كلام السلف والعلماء مصممة بشكل جمالي سهل للمشاركة والنشر.",
            "قسم الكتب": "مكتبة إسلامية شاملة ومجانية تتيح قراءة وتحميل أمهات الكتب في العقيدة والفقه والحديث والسيرة.",
            "قسم المقالات": "مقالات ودراسات شرعية متنوعة تناقش القضايا الفكرية والمعاصرة وتقدم توجيهات إيمانية ودعوية قيمة.",
            "قسم الخطب": "مجموعة واسعة من الخطب المنبرية المكتوبة والمصنفة موضوعياً والمعدة للإلقاء والاستفادة العلمية.",
            "قسم الفتاوى": "مرجع إجابات شرعية موثوقة وميسرة على الفتاوى والأسئلة اليومية التي تهم المسلم في عباداته ومعاملاته.",
            "قسم المحاضرات الصوتية": "مكتبة صوتية ضخمة تضم دروساً ومحاضرات والسلاسل العلمية لكبار العلماء والدعاة في مختلف العلوم.",
            "قسم المحاضرات المرئية": "شاهد المحاضرات والدروس المرئية التوجيهية بجودة عالية لتطوير معارفك الشرعية والإيمانية.",
            "ما لا يسع أطفال المسلمين جهله": "منهج مبسط وممتع لتعليم الناشئة والأطفال أساسيات العقيدة الصحيحة، الطهارة، الصلاة، والأخلاق الحميدة.",
            "زكاة المال": "حاسبة شرعية دقيقة وسهلة لحساب زكاة الأموال والذهب والفضة وتحديد المستحقين طبقاً للشريعة الإسلامية.",
        };
        return descMap[name] || "استكشف هذا القسم وتصفح محتوياته الإسلامية القيمة للانتفاع بالعلم الشرعي النافع.";
    };

    const showData = categoriesLinks.map((item, key) => {
        if (item.ramadan && !ramadan) return null;
        return (
            <div
                key={key}
                dir="rtl"
                className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${key * 40}ms` }}
            >
                <Link
                    href={item.path}
                    className="relative h-full flex flex-col items-center p-5 text-center rounded-t-[3.5rem] rounded-b-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 hover:border-primary/40 dark:hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 block overflow-hidden group shadow-none"
                >
                    {/* تأثير لمعان أبيض شفاف ناصع يمر فوق الكارت والأيقونة عند تمرير الفأرة */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/45 dark:via-white/20 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>

                    {/* الصورة مباشرة بدون إطار قوس إضافي */}
                    <div className="relative mb-4 mt-2 w-28 h-28 flex justify-center items-center">
                        <Image
                            src={item.img}
                            alt={item.name}
                            width={112}
                            height={112}
                            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105"
                            quality={90}
                            loading="lazy"
                        />

                        {/* شارة جديد */}
                        {item.new && (
                            <div className="absolute -top-1 -right-1 z-10">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black bg-primary text-white">
                                    جديد
                                </span>
                            </div>
                        )}

                        {/* شارة رمضان */}
                        {item.ramadan && (
                            <div className="absolute -top-1 -right-1 z-10">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-black bg-amber-500 text-white animate-pulse">
                                    رمضان
                                </span>
                            </div>
                        )}
                    </div>

                    {/* عنوان القسم */}
                    <h3 className="text-base font-black text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors duration-200">
                        {item.name}
                    </h3>

                    {/* وصف القسم المفصل والمعزز بالنصوص */}
                    <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed mb-4 flex-grow font-semibold">
                        {getDescription(item.name)}
                    </p>

                    {/* رابط تصفح القسم */}
                    <div className="mt-auto pt-3.5 border-t border-gray-100 dark:border-zinc-900 w-full flex justify-center">
                        <span className="inline-flex items-center gap-1.5 text-xs font-black text-primary group-hover:text-primary-alt transition-colors duration-200">
                            <span>اكتشف القسم</span>
                            <svg
                                className="w-3.5 h-3.5 transform group-hover:-translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </span>
                    </div>
                </Link>
            </div>
        );
    });

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-transparent" id="categories">
            {/* زخارف خلفية دائرية ناعمة */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 border-4 border-lime-100/20 dark:border-lime-950/10 rounded-full opacity-30 dark:opacity-20"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-lime-100/20 dark:border-lime-950/10 rounded-full opacity-30 dark:opacity-20"></div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-lime-100/20 dark:border-lime-950/10 transform rotate-45 opacity-30 dark:opacity-20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* عنوان القسم */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1.5 bg-lime-50 dark:bg-lime-950/20 text-primary dark:text-lime-400 rounded-full text-xs font-black tracking-wide border border-lime-100/30 dark:border-lime-900/10 mb-4">
                        اكتشف محتوانا
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white mb-3">
                        أقسام الموقع
                    </h2>
                    <p className="text-gray-500 dark:text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">
                        استكشف مجموعتنا المتنوعة من المحتوى الإسلامي عالي الجودة، المصمم لتعزيز معرفتك وتقربك من الله عز وجل
                    </p>

                    <div className="flex justify-center items-center mt-6">
                        <div className="h-px bg-gray-200 dark:bg-zinc-900 w-16"></div>
                        <div className="mx-3 w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <div className="h-px bg-gray-200 dark:bg-zinc-900 w-16"></div>
                    </div>
                </div>

                {/* شبكة الأقسام */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {showData.filter(Boolean)}
                </div>

                {/* قسم خاص لرمضان */}
                {ramadan && (
                    <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50/50 dark:from-amber-950/10 dark:to-orange-950/10 rounded-2xl p-8 border border-amber-100 dark:border-amber-900/30">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 mb-4 border border-amber-100/30 dark:border-amber-900/20">
                                <FontAwesomeIcon icon={faCalendarAlt} size="lg" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                محتوى خاص بشهر رمضان
                            </h3>
                            <p className="text-gray-500 dark:text-zinc-400 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
                                استمتع بمحتوى مخصص لشهر رمضان المبارك، بما في ذلك الإمساكية والجدول اليومي والأنشطة الرمضانية
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
