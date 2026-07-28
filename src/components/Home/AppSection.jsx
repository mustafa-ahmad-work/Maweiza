"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faCheckCircle, faRocket, faBrain, faBookOpen, faShieldHalved } from "@fortawesome/free-solid-svg-icons";

export default function AppSection() {
    const keys = [
        { num: "١", title: "الختمة المنهجية", desc: "قراءة وسماع يومي منظم يُهيئ عقلك وقلبك لاستقبال الآيات وانسيابها." },
        { num: "٢", title: "التحضير الثلاثي", desc: "تجهيز أسبوعي وطي ليلة الحفظ لترسيخ البناء قبل الشروع في الحفظ الجديد." },
        { num: "٣", title: "الحفظ الجديد", desc: "تكرار متقن للآيات وسردها غيباً بثقة تامة ودون أي تردد أو أخطاء." },
        { num: "٤", title: "مراجعة القريب", desc: "تثبيت الورد الحديث ونقله من الذاكرة المؤقتة إلى الذاكرة المستديمة." },
        { num: "٥", title: "مراجعة البعيد", desc: "ورد مراجعة تراكمي مستمر يضمن بقاء القرآن راسخاً في صدرك مدى الحياة." }
    ];

    const highlights = [
        "خوارزميات ذكية لجدولة المراجعة المتباعدة تلقائياً قبل وقوع النسيان",
        "ميزان الرسوخ (IQ) التفاعلي بالألوان لتحديد السور الأكثر احتياجاً للتثبيت",
        "دعم كامل لـ ٥ طبعات عالمية للمصحف مع مزامنة الخطة التلقائية",
        "تنبيهات يومية مشجعة ترافقك خطوة بخطوة حتى تمام حفظ كتاب الله"
    ];

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-transparent border-t border-gray-100 dark:border-zinc-900" id="application-section">
            <div className="container mx-auto px-6 relative z-10">

                {/* الجزء الأول: شبكة العرض التفاعلية المحمسة */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24 text-right">

                    {/* الجانب الأيمن: النص المشوق والدعوة للتحميل */}
                    <div className="lg:col-span-6 space-y-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary dark:text-primary-400 text-xs font-black mb-4 shadow-xs">
                                <FontAwesomeIcon icon={faRocket} className="text-xs" />
                                <span>الحل الذكي والنهائي لتثبيت حفظ القرآن الكريم</span>
                            </span>

                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-950 dark:text-white leading-snug md:leading-snug mb-4">
                                رحلتك نحو الحفظ المتقن تبدأ هنا!
                                <span className="text-primary dark:text-primary-400 block mt-1">احفظ القرآن بلا تفلت أو نسيان</span>
                            </h2>

                            <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed font-semibold max-w-xl">
                                تخيل أن تحفظ كتاب الله وتسرد السور عن ظهر قلب بكل ثقة وطمأنينة! يجمع تطبيق &quot;مفاتيح حفظ القرآن&quot; بين المنهجية التراكمية المعتمدة والتقنيات الذكية ليصمم لك خطة يومية تناسب وقتك وتنقل حفظك مباشرة إلى الذاكرة الدائمة.
                            </p>
                        </div>

                        {/* نقاط التميز التشويقية */}
                        <ul className="space-y-3.5 pt-1">
                            {highlights.map((text, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-800 dark:text-zinc-200 font-bold leading-relaxed">
                                    <FontAwesomeIcon icon={faCheckCircle} className="text-primary dark:text-primary-400 text-base shrink-0 mt-0.5" />
                                    <span>{text}</span>
                                </li>
                            ))}
                        </ul>

                        {/* أزرار الدعوة للتحميل والتجربة */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/application"
                                className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-alt text-white font-black text-xs md:text-sm shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2 group"
                            >
                                <span>انضم للآلاف وابدأ رحلة الحفظ الآن</span>
                                <FontAwesomeIcon icon={faArrowLeft} className="text-xs group-hover:-translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/application#download"
                                className="px-6 py-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-gray-900 dark:text-zinc-100 font-black text-xs md:text-sm border border-gray-200 dark:border-zinc-800 transition-all flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faDownload} className="text-primary dark:text-primary-400" />
                                <span>تحميل التطبيق مجاناً</span>
                            </Link>
                        </div>
                    </div>

                    {/* الجانب الأيسر: عرض صورة الغلاف محصورة اللمعان كلياً (overflow-hidden) */}
                    <div className="lg:col-span-6 flex justify-center items-center py-4">
                        {/* إطار الصورة الداخلي المائل والمحصور اللمعان */}
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100/80 dark:from-zinc-950 dark:to-zinc-900 border border-gray-100 dark:border-zinc-800/80 p-2 md:p-3 group">
                            {/* شريط اللمعان الزجاجي الانسيابي المحصور بالكامل داخل الإطار */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none z-20"></div>

                            <Image
                                src="/application/caver.png"
                                alt="تطبيق مفاتيح حفظ القرآن"
                                width={600}
                                height={375}
                                style={{ width: "100%", height: "auto" }}
                                className="w-full h-auto object-contain rounded-xl transform group-hover:scale-[1.03] transition-transform duration-700 relative z-10"
                                priority
                                quality={95}
                            />
                        </div>
                    </div>

                </div>

                {/* الجزء الثاني: خريطة الطريق التشويقية للمفاتيح الخمسة */}
                <div className="border-t border-gray-100 dark:border-zinc-900 pt-16">
                    <div className="text-center mb-14">
                        <span className="inline-block px-4 py-1 bg-primary/10 dark:bg-lime-950/40 text-primary dark:text-primary-400 rounded-full text-xs font-black border border-primary/20 dark:border-lime-900/30 mb-3">
                            خطة الإتقان الأبدي
                        </span>
                        <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">كيف ينقل التطبيق حفظك إلى الإتقان التام؟</h3>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400 mt-2 font-bold max-w-xl mx-auto">رحلة من ٥ خطوات متكاملة تضمن لك تثبيت حفظك وسرده بكل يسر وطمأنينة</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {keys.map((k, idx) => (
                            <div key={idx} className="relative text-right group p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900/80 hover:border-primary/30 transition-all duration-300">
                                {/* خط التوصيل بين الخطوات على شاشات الديسكتوب */}
                                {idx < 4 && (
                                    <div className="hidden md:block absolute top-9 left-0 right-1/2 h-0.5 bg-gray-100 dark:bg-zinc-900 -z-10"></div>
                                )}

                                <div className="space-y-3">
                                    <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary-alt dark:bg-primary/20 dark:text-primary-400 border border-primary/20 dark:border-primary-400/30 font-black text-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-lime-400 dark:group-hover:text-zinc-950 group-hover:border-transparent shadow-xs">
                                        {k.num}
                                    </span>
                                    <h4 className="text-xs md:text-sm font-black text-gray-900 dark:text-white leading-[1.5]">
                                        {k.title}
                                    </h4>
                                    <p className="text-[11px] text-gray-600 dark:text-zinc-400 leading-[1.8] font-semibold">
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
