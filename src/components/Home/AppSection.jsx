"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function AppSection() {
    const keys = [
        { num: "١", title: "الختمة المنهجية", desc: "قراءة جزأين بالحدر وسماع حزب للحصري يومياً." },
        { num: "٢", title: "التحضير الثلاثي", desc: "خطة أسبوعية، وليلية (١٥ مرة)، وقبلية قبل الحفظ." },
        { num: "٣", title: "الحفظ الجديد", desc: "تكرار الآية ١٠ مرات وسردها غيباً دون أخطاء." },
        { num: "٤", title: "مراجعة القريب", desc: "تسميع آخر ٢٠ صفحة يومياً لنقلها للذاكرة المستديمة." },
        { num: "٥", title: "مراجعة البعيد", desc: "ورد مراجعة بمعدل جزأين يومياً لضمان الرسوخ الأبدي." }
    ];

    const highlights = [
        "خوارزميات ذكية لجدولة المراجعة المتباعدة تلقائياً",
        "ميزان الرسوخ (IQ) بالألوان لمعرفة قوة حفظ السور",
        "دعم ٥ طبعات عالمية للقرآن مع مزامنة الخطة"
    ];

    return (
        <section className="py-20 md:py-24 relative overflow-hidden bg-white dark:bg-zinc-950 bg-[radial-gradient(#e2e8f0_1.2px,transparent_1.2px)] [background-size:32px_32px] dark:bg-[radial-gradient(#1e293b_1.2px,transparent_1.2px)] border-t border-gray-100 dark:border-zinc-900" id="application-section">
            <div className="container mx-auto px-6 relative z-10">

                {/* الجزء الأول: شبكة الهيرو الجانبية - تصميم ثنائي متناسق */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 text-right">

                    {/* الجانب الأيمن: المحتوى النصي والدعائي المبسط */}
                    <div className="lg:col-span-6 space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/15 text-primary dark:text-lime-400 text-xs font-black mb-4">
                                تطبيق الهاتف المحمول الرسمي
                            </span>

                            <h2 className="text-3xl md:text-5xl font-black text-gray-950 dark:text-white leading-[1.45] md:leading-[1.4] mb-5">
                                احفظ القرآن الكريم <br />
                                <span className="text-primary dark:text-lime-400">بلا تفلت أو نسيان</span>
                            </h2>

                            <p className="text-sm md:text-base text-gray-550 dark:text-zinc-450 leading-[1.8] md:leading-[1.85] font-semibold max-w-xl">
                                تطبيق 'مفاتيح حفظ القرآن' يدمج بين التقنيات الذكية والمنهجية العلمية التراكمية ليرافقك يومياً في تثبيت أورادك وسردها غيباً بكل طمأنينة ويقين.
                            </p>
                        </div>

                        {/* نقاط القوة والتميز */}
                        <ul className="space-y-4 pt-1">
                            {highlights.map((text, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-xs md:text-sm text-gray-800 dark:text-zinc-300 font-bold leading-[1.6]">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-primary dark:text-lime-400 text-base shrink-0" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>

                        {/* أزرار التحميل المباشر المتناسقة مع الموقع */}
                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <Link
                                href="/application"
                                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-alt text-white font-bold text-xs md:text-sm shadow-md shadow-primary/10 transition-all flex items-center gap-2 group"
                            >
                                <span>استكشف المنهجية ورابط التحميل</span>
                                <FontAwesomeIcon icon={faArrowLeft} className="text-xs group-hover:-translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/application#download"
                                className="px-6 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-150 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-800 dark:text-zinc-200 font-bold text-xs md:text-sm border border-gray-200/50 dark:border-zinc-800 transition-all flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faDownload} className="text-primary dark:text-lime-400" />
                                <span>تحميل التطبيق مباشرة</span>
                            </Link>
                        </div>
                    </div>

                    {/* الجانب الأيسر: عرض صورة الغلاف */}
                    <div className="lg:col-span-6 flex justify-center items-center">
                        <Image
                            src="/application/caver.png"
                            alt="تطبيق مفاتيح حفظ القرآن"
                            width={600}
                            height={375}
                            className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.015]"
                            priority
                            quality={95}
                        />
                    </div>

                </div>

                {/* الجزء الثاني: خريطة طريق مبسطة للمفاتيح الخمسة (Horizontal Roadmap) */}
                <div className="border-t border-gray-100 dark:border-zinc-900 pt-16">
                    <div className="text-center mb-12">
                        <h3 className="text-lg md:text-xl font-black text-gray-900 dark:text-white">أركان المنهجية العلمية الخمسة</h3>
                        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-2 font-medium">خطوات متسلسلة تنقل محفوظك للذاكرة العميقة</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {keys.map((k, idx) => (
                            <div key={idx} className="relative text-right group">
                                {/* خط التوصيل بين الخطوات على شاشات الديسكتوب */}
                                {idx < 4 && (
                                    <div className="hidden md:block absolute top-7 left-0 right-1/2 h-0.5 bg-gray-100 dark:bg-zinc-900 -z-10"></div>
                                )}

                                <div className="space-y-3">
                                    <span className="w-10 h-10 rounded-xl bg-primary/5 dark:bg-primary/10 text-primary dark:text-lime-400 border border-primary/20 font-black text-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-transparent">
                                        {k.num}
                                    </span>
                                    <h4 className="text-xs md:text-sm font-black text-gray-900 dark:text-white leading-[1.5]">
                                        {k.title}
                                    </h4>
                                    <p className="text-[11px] text-gray-550 dark:text-zinc-400 leading-[1.75] font-bold">
                                        {k.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
