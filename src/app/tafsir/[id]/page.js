import QuranUnifiedHub from "@/components/quran/QuranUnifiedHub";

export default async function TafsirDetailPage({ params }) {
    return (
        <main>
            <QuranUnifiedHub initialMode="tafsir" surahId={params.id} />
        </main>
    );
}
