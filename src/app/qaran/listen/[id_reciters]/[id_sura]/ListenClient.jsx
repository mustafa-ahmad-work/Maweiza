"use client";

import QuranUnifiedHub from "@/components/quran/QuranUnifiedHub";

export default function ListenClient({ id, idRecitations }) {
    return (
        <main>
            <QuranUnifiedHub
                initialMode="listen"
                surahId={id}
                reciterId={idRecitations}
            />
        </main>
    );
}
