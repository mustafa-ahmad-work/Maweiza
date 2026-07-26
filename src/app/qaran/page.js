import Link from "next/link";
import Landing from "@/components/Layout/Landing";
import AppSection from "@/components/Home/AppSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesSimple, faMicrophoneLines, faBookQuran, faFilePen, faClipboardCheck, faMedal } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import Script from "next/script";

export const metadata = {
    title: "القرآن الكريم تلاوة وحفظاً وتفسيراً | موقع موعظة",
    description: "استمع إلى تلاوات خاشعة لجميع سور القرآن الكريم بأصوات كبار القراء، واستخدم أدوات التكرار والحفظ المتقدمة في موقع موعظة.",
    alternates: {
        canonical: "/qaran",
    },
    openGraph: {
        title: "القرآن الكريم تلاوة وحفظاً وتفسيراً | موقع موعظة",
        description: "سور القرآن الكريم كاملاً مع تلاوات متعددة وأدوات تفاعلية للحفظ والتفسير.",
        url: "https://maweiza.com/qaran",
        siteName: "موعظة | Maweiza",
    },
    twitter: {
        card: "summary_large_image",
        title: "القرآن الكريم | موقع موعظة",
        description: "استمع واحفظ القرآن الكريم عبر موقع موعظة.",
    },
};

export default async function qaran() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "الرئيسية",
                "item": "https://maweiza.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "القرآن الكريم",
                "item": "https://maweiza.com/qaran"
            }
        ]
    };

    return (
        <>
            <Script
                id="jsonld-breadcrumb-qaran"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Landing
                title="قسم القران الكريم"
                text="اذا كنت تريد الاستماع الي تلاوه القران الكريم اختر وضع الاستماع لانه يحتوي علي عدد كبير من الشيوخ اما اذا كنت تريد الحفظ فختر وضع الحفظ لكي تتمكن من تحديد الايه التي تريد حفظها مع امكانيه التكرار وغيرها"
            />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                        {/* وضع الاستماع */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="relative h-80 md:h-96 overflow-hidden">
                                <Image
                                    fill
                                    src="/qaran/listen.jpeg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="استماع تلاوة القرآن الكريم - موقع موعظة"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">وضع الاستماع</h3>
                                    <p className="text-primary-100">استمع لتلاوات القرآن الكريم بمجموعة متنوعة من الشيوخ</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <Link
                                    href={`/qaran/listen`}
                                    className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-primary-600 to-primary-alt hover:from-primary-700 hover:to-lime-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl">
                                    <span>ابدأ الاستماع الآن</span>
                                    <FontAwesomeIcon className="mr-3 text-xl" icon={faHeadphonesSimple} />
                                </Link>
                            </div>

                            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                جديد
                            </div>
                        </div>

                        {/* وضع الحفظ */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="relative h-80 md:h-96 overflow-hidden">
                                <Image
                                    fill
                                    src="/qaran/memorizing.jpeg"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="حفظ القرآن الكريم وتكرار الآيات - موقع موعظة"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-lime-900/80 to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">وضع الحفظ</h3>
                                    <p className="text-lime-100">حدد الآيات، كرر التلاوة، وتتبع تقدمك في الحفظ</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <Link
                                    href={`/qaran/memorizing`}
                                    className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-lime-600 to-primary hover:from-lime-700 hover:to-primary-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl">
                                    <span>ابدأ الحفظ الآن</span>
                                    <FontAwesomeIcon className="mr-3 text-xl" icon={faMicrophoneLines} />
                                </Link>
                            </div>

                            <div className="absolute top-4 right-4 bg-lime-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                مميز
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <AppSection />
                    </div>

                    {/* <div className="mt-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">اختبارات القرآن الكريم</h2>
                            <p className="text-gray-600 dark:text-zinc-300 max-w-2xl mx-auto">اختبر معرفتك ومهاراتك في القرآن الكريم من خلال مجموعة متنوعة من الاختبارات التفاعلية</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        fill
                                        src="/qaran/memorize-test.jpg"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        alt="memorize test"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-80"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-xl font-bold mb-2">اختبار الحفظ</h3>
                                        <p className="text-purple-100 text-sm">اختبر مدى حفظك للآيات والسور</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <Link
                                        href={`/qaran/tests/memorize`}
                                        className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl">
                                        <span>ابدأ الاختبار</span>
                                        <FontAwesomeIcon className="mr-3 text-xl" icon={faBookQuran} />
                                    </Link>
                                </div>

                                <div className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    شائع
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 text-center max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">مميزات قسم الاختبارات</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FontAwesomeIcon icon={faClipboardCheck} className="text-purple-600 dark:text-purple-400 text-xl" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">تقييم دقيق</h3>
                                    <p className="text-gray-600 dark:text-zinc-300">احصل على نتائج دقيقة وتحليل مفصل لأدائك</p>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FontAwesomeIcon icon={faMedal} className="text-blue-600 dark:text-blue-400 text-xl" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">مستويات متعددة</h3>
                                    <p className="text-gray-600 dark:text-zinc-300">اختبارات مناسبة لجميع المستويات من المبتدئ إلى المتقدم</p>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">تتبع التقدم</h3>
                                    <p className="text-gray-600 dark:text-zinc-300">تابع تطور مستواك ورؤية تحسنك مع كل اختبار</p>
                                </div>
                            </div>
                        </div>

                    </div> */}
                </div>
            </section>
        </>
    );
}
