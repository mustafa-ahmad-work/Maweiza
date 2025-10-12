import Landing from "@/components/Layout/Landing";
import SearchHadith from "@/components/Adith/SearchHadith";
import { optimizeString } from "@/helpers/optimizeString";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function HadithPage({ params }) {
    const id = params.id;

    let hadiths = false;
    let showData = "";
    let length = 0;

    if (id !== "-") {
        try {
            const res = await fetch(`https://dorar.net/dorar_api.json?skey=${id}`);
            const data = await res.json();
            hadiths = data.ahadith.result;
            length = data.ahadith.result.length;

            hadiths = hadiths.split("--------------");
            hadiths.pop();

            showData = (
                    hadiths.map((hadith, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                            <div className="relative p-6 mb-6 font-quran bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full -mr-12 -mt-12 blur-xl" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-500/10 rounded-full -ml-8 -mb-8 blur-lg" />

                                <div className="relative z-10">
                                    <div className="flex items-start mb-3">
                                        {/* <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                                            <FontAwesomeIcon icon={["fas", "book"]} className="w-5 h-5" />
                                        </div> */}
                                        <span className="ml-3 text-sm font-medium text-amber-600 dark:text-amber-400">
                                            الحديث رقم {index + 1}
                                        </span>
                                    </div>

                                    <div
                                        className="text-lg leading-relaxed text-gray-800 dark:text-gray-100 mb-4"
                                        dangerouslySetInnerHTML={{ __html: optimizeString(hadith) }}
                                    />

                                    <div className="flex items-center justify-between pt-4 border-t border-amber-100 dark:border-amber-900/30">
                                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                            <FontAwesomeIcon icon={["fas", "star"]} className="text-amber-500" />
                                            <span>صحيح الإسناد</span>
                                        </div>
                                        <button className="px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 rounded-full hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors">
                                            تفاصيل
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
            );
        } catch (error) {
            console.error(error);
            showData = (
                <div
                    className="text-center py-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400 mb-4">
                        <FontAwesomeIcon icon={["fas", "exclamation-circle"]} className="w-8 h-8" />
                    </div>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">حدث خطأ أثناء البحث</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">يرجى المحاولة مرة أخرى لاحقًا</p>
                </div>
            );
        }
    }

    return (
        <>
            <Landing
                title="مكتبة الحديث النبوي الشريف"
                text="اكتشف كنوز السنة النبوية الصحيحة وابحث في آلاف الأحاديث المصنفة والموثقة"
            />

            <section className="relative py-12">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-soft-light filter blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full mix-blend-soft-light filter blur-3xl" />
                </div>

                <div className="container relative z-10 px-5 mx-auto">
                    <div className="max-w-4xl mx-auto">
                        <div
                        >
                            <SearchHadith id={id} />
                        </div>

                        <div className="mt-12">
                            {length > 0 && (
                                <div
                                    className="mb-6 flex items-center justify-between"
                                >
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                                        <FontAwesomeIcon icon={["fas", "book"]} className="ml-3 text-amber-500" />
                                        نتائج البحث ({length} حديث)
                                    </h2>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        من مصادر موثوقة
                                    </div>
                                </div>
                            )}

                            {length !== 153 ? (
                                showData
                            ) : (
                                <div
                                    className="text-center py-16"
                                >
                                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/50 text-amber-600 dark:text-amber-400 mb-6">
                                        <FontAwesomeIcon icon={["fas", "search"]} className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">لا توجد نتائج</h3>
                                    <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                                        لم يتم العثور على أي أحاديث تطابق بحثك. حاول استخدام كلمات مختلفة أو تحقق من التهجئة.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
