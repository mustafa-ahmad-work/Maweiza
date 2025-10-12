import Link from "next/link";
import Landing from "@/components/Layout/Landing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphonesSimple, faMicrophoneLines, faBookQuran, faFilePen, faClipboardCheck, faMedal } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export const metadata = {
    title: "موقع موعظه | قسم القران الكريم",
    description: "يحتوي هذا القسم علي جميع سور القران الكريم مع وضعين",
};

export default async function qaran() {
    return (
        <>
            <Landing
                title="قسم القران الكريم"
                text="اذا كنت تريد الاستماع الي تلاوه القران الكريم اختر وضع الاستماع لانه يحتوي علي عدد كبير من الشيوخ اما اذا كنت تريد الحفظ فختر وضع الحفظ لكي تتمكن من تحديد الايه التي تريد حفظها مع امكانيه التكرار وغيرها"
            />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                        {/* وضع الاستماع */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="relative h-80 md:h-96 overflow-hidden">
                                <Image
                                    fill
                                    src="/qaran/listen.jpeg"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="listen qaran"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-2">وضع الاستماع</h3>
                                    <p className="text-emerald-100">استمع لتلاوات القرآن الكريم بمجموعة متنوعة من الشيوخ</p>
                                </div>
                            </div>

                            <div className="p-6">
                                <Link
                                    href={`/qaran/listen`}
                                    className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-700 hover:to-lime-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl">
                                    <span>ابدأ الاستماع الآن</span>
                                    <FontAwesomeIcon className="mr-3 text-xl" icon={faHeadphonesSimple} />
                                </Link>
                            </div>

                            <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                جديد
                            </div>
                        </div>

                        {/* وضع الحفظ */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="relative h-80 md:h-96 overflow-hidden">
                                <Image
                                    fill
                                    src="/qaran/memorizing.jpeg"
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    alt="memorizing qaran"
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
                                    className="flex items-center justify-center w-full py-4 px-6 bg-gradient-to-r from-lime-600 to-emerald-500 hover:from-lime-700 hover:to-emerald-600 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-xl">
                                    <span>ابدأ الحفظ الآن</span>
                                    <FontAwesomeIcon className="mr-3 text-xl" icon={faMicrophoneLines} />
                                </Link>
                            </div>

                            <div className="absolute top-4 right-4 bg-lime-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                مميز
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">لماذا تختار قسم القرآن الكريم؟</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faHeadphonesSimple} className="text-emerald-600 dark:text-emerald-400 text-xl" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 whitespace-nowrap">مكتبة صوتية ضخمة</h3>
                                <p className="text-gray-600 dark:text-gray-300">استمع لتلاوات من أشهر القراء حول العالم</p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <div className="w-12 h-12 bg-lime-100 dark:bg-lime-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FontAwesomeIcon icon={faMicrophoneLines} className="text-lime-600 dark:text-lime-400 text-xl" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">أدوات حفظ متقدمة</h3>
                                <p className="text-gray-600 dark:text-gray-300">حدد الآيات، كرر التلاوة، وتتبع تقدمك</p>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">تجربة آمنة</h3>
                                <p className="text-gray-600 dark:text-gray-300">جميع المحتويات موثوقة ومصادقة من علماء الأزهر</p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-20">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">اختبارات القرآن الكريم</h2>
                            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">اختبر معرفتك ومهاراتك في القرآن الكريم من خلال مجموعة متنوعة من الاختبارات التفاعلية</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
                            <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
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
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FontAwesomeIcon icon={faClipboardCheck} className="text-purple-600 dark:text-purple-400 text-xl" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">تقييم دقيق</h3>
                                    <p className="text-gray-600 dark:text-gray-300">احصل على نتائج دقيقة وتحليل مفصل لأدائك</p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FontAwesomeIcon icon={faMedal} className="text-blue-600 dark:text-blue-400 text-xl" />
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">مستويات متعددة</h3>
                                    <p className="text-gray-600 dark:text-gray-300">اختبارات مناسبة لجميع المستويات من المبتدئ إلى المتقدم</p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                                    <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">تتبع التقدم</h3>
                                    <p className="text-gray-600 dark:text-gray-300">تابع تطور مستواك ورؤية تحسنك مع كل اختبار</p>
                                </div>
                            </div>
                        </div>

                    </div> */}
                </div>
            </section>
        </>
    );
}
