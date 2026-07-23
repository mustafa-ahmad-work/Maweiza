import Landing from "@/components/Layout/Landing";
import SearchHadithClient from "@/components/hadith/SearchHadithClient";

export function generateMetadata({ params }) {
    const rawQuery = params.id;
    const query = rawQuery && rawQuery !== "-" ? decodeURIComponent(rawQuery) : "";
    return {
        title: query ? `نتائج البحث عن ${query} | موعظة` : "البحث في الحديث النبوي | موعظة",
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default function HadithPage({ params }) {
    return (
        <main className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 text-gray-900 dark:text-white pb-20" dir="rtl">
            <Landing
                title="مكتبة الحديث النبوي الشريف"
                text="اكتشف كنوز السنة النبوية الصحيحة وابحث في آلاف الأحاديث المصنفة والموثقة"
            />

            <section className="relative py-12">
                <SearchHadithClient rawQuery={params.id} />
            </section>
        </main>
    );
}
