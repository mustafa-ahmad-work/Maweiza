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
            "إمساكية شهر رمضان": "مواعيد الإفطار والإمساك والصلوات اليومية لشهر رمضان المبارك.",
            "يومي في رمضان": "جدول تفاعلي لمتابعة طاعاتك وأعمالك الصالحة خلال اليوم الرمضاني.",
            "أسئلة دينية": "اختبر معلوماتك الدينية وأجب عن أسئلة متنوعة لزيادة ثقافتك الشرعية.",
            "أداة الباحث في الحديث": "ابحث عن صحة الأحاديث الشريفة ورواياتها بسهولة وموثوقية عالية.",
            "أسماء الله الحسنى": "تدبر معاني أسماء الله الحسنى ودلالاتها الروحية والشرعية بوضوح.",
            "قسم القرآن الكريم": "استمع واقرأ سور القرآن الكريم بتلاوات خاشعة لقرّاء متعددين.",
            "قسم تفسير القرآن": "تأمل معاني الآيات والسور من خلال تفاسير شرعية موثوقة وميسرة.",
            "قسم الحديث": "اقرأ أحاديث الرسول صلى الله عليه وسلم المشروحة لتعلم السنة النبوية.",
            "أوقات الصلاة والمناسبات الإسلامية": "تابع مواقيت الصلاة بدقة لمختلف المدن مع تنبيهات المناسبات.",
            "قسم الأدعية والأذكار": "أذكار الصباح والمساء والأدعية المأثورة لكل الأوقات والأحوال.",
            "قسم التسبيح": "مسبحة إلكترونية تفاعلية لملازمة الذكر والاستغفار في يومك.",
            "قسم الاقتباسات": "حكم ومأثورات واقتباسات إسلامية لتبادلها ونشر الفائدة والوعي.",
            "قسم الكتب": "مكتبة إسلامية شاملة تضم كتباً قيمة في العقيدة والفقه والسيرة.",
            "قسم المقالات": "مقالات إسلامية متنوعة تتناول قضايا معاصرة وتوجيهات دعوية قيمة.",
            "قسم الخطب": "خطب منبرية مكتوبة ومعدة للإلقاء والاستفادة العلمية منها.",
            "قسم الفتاوى": "أجوبة شرعية ميسرة على فتاوى تهم المسلم في حياته اليومية.",
            "قسم المحاضرات الصوتية": "استمع لمحاضرات ودروس دينية لكبار العلماء والدعاة.",
            "قسم المحاضرات المرئية": "شاهد دروساً مرئية ومحاضرات توجيهية هادفة بجودة عالية.",
            "ما لا يسع أطفال المسلمين جهله": "محتوى مبسط لتعليم الصغار أساسيات العقيدة والعبادات والأخلاق.",
            "زكاة المال": "حاسبة زكاة المال والذهب والفضة بطريقة شرعية سهلة ومبسطة.",
        };
        return descMap[name] || "تصفح هذا القسم واستكشف المحتويات والدروس الإسلامية القيمة المتوفرة فيه.";
    };

    const showData = categoriesLinks.map((item, key) => {
        if (item.ramadan && !ramadan) return null;
        return (
            <div
                key={key}
                dir="rtl"
                className={`group relative transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${key * 50}ms` }}
            >
                <div className="relative h-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow hover:border-primary/20 transition-all duration-300 flex flex-col p-5 text-right">
                    {/* تأثير إضاءة خلفية ناعم للغاية عند تمرير الفأرة */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* الصورة وأيقونات التزيين */}
                    <div className="relative flex justify-center mb-4 mt-1">
                        <div className="relative w-28 h-28 ">
                            <Image
                                src={item.img}
                                alt={item.name}
                                width={112}
                                height={112}
                                className="object-cover w-full h-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
                                quality={85}
                                loading="lazy"
                            />
                        </div>

                        {/* شارة جديد يساراً */}
                        {item.new && (
                            <div className="absolute -top-1 -left-1 z-10">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-black bg-primary text-white shadow-sm">
                                    جديد
                                </span>
                            </div>
                        )}

                        {/* شارة رمضان يساراً */}
                        {item.ramadan && (
                            <div className="absolute -top-1 -left-1 z-10">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[9px] font-black bg-amber-500 text-white shadow-sm animate-pulse">
                                    رمضان
                                </span>
                            </div>
                        )}
                    </div>

                    {/* عنوان القسم */}
                    <h3 className="text-base font-black text-center text-gray-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors duration-200">
                        {item.name}
                    </h3>

                    {/* وصف القسم */}
                    <p className="text-xs text-gray-500 dark:text-zinc-400 text-center leading-relaxed mb-4 flex-grow font-semibold">
                        {getDescription(item.name)}
                    </p>

                    {/* رابط تصفح القسم المينيمال */}
                    <div className="mt-auto pt-3.5 border-t border-gray-50 dark:border-zinc-800 flex justify-center">
                        <Link href={item.path} className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-primary-alt transition-colors duration-200">
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
                        </Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-white dark:bg-zinc-950" id="categories">
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
