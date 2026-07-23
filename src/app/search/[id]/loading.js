import Landing from "@/components/Layout/Landing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function SearchLoading() {
    return (
        <main className="bg-slate-50/50 dark:bg-zinc-950 text-gray-900 dark:text-white pb-20" dir="rtl">
            <Landing
                title="مكتبة الحديث النبوي الشريف"
                text="اكتشف كنوز السنة النبوية الصحيحة وابحث في آلاف الأحاديث المصنفة والموثقة"
            />

            <section className="relative py-12">
                <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-4xl">
                    <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-3xl border border-gray-200 dark:border-zinc-800 p-8 shadow-xs">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl">
                            <FontAwesomeIcon icon={faSpinner} className="animate-spin text-3xl" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">جاري البحث في مصادر السنة النبوية...</h3>
                        <p className="text-xs md:text-sm text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
                            يرجى الانتظار قليلاً بينما يتم جلب الأحاديث وتدقيق الشواهد.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
