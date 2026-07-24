"use client";

import QuranUnifiedHub from "@/components/quran/QuranUnifiedHub";

export default function MemorizingPage({ params }) {
    const idRecitations = params.id_reciters;
    const id = params.id_sura;

    return (
        <main>
            <QuranUnifiedHub
                initialMode="memorizing"
                surahId={id}
                reciterId={idRecitations}
            />
        </main>
    );
}
