import Script from "next/script";
import ListenClient from "./ListenClient";

export async function generateMetadata({ params }) {
    const surahId = params.id_sura;
    const reciterId = params.id_reciters;

    let surahName = `سورة رقم ${surahId}`;
    let reciterName = "القارئ المفصل";

    try {
        const responseSuaruh = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}`);
        const dataSuaruhJson = await responseSuaruh.json();
        if (dataSuaruhJson?.data?.name) {
            surahName = dataSuaruhJson.data.name;
        }

        const responseFileAudio = await fetch(`https://abdoahmed26.github.io/api/arabic.json`);
        const dataFileAudio = await responseFileAudio.json();
        const reciter = dataFileAudio?.reciters?.find((r) => r.id === reciterId);
        if (reciter?.name) {
            reciterName = reciter.name;
        }
    } catch (e) {
        console.error(e);
    }

    const title = `${surahName} مكتوبة وكاملة بصوت ${reciterName} | موقع موعظة`;
    const description = `استمع إلى ${surahName} كاملة بصوت القارئ ${reciterName} وتلاوة خاشعة على موقع موعظة. اقرأ آيات السورة مع الاستماع بوضوح عالي.`;
    const canonicalUrl = `https://maweiza.com/qaran/listen/${reciterId}/${surahId}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "موعظة | Maweiza",
            type: "music.song",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default function Page({ params }) {
    const surahId = params.id_sura;
    const reciterId = params.id_reciters;

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
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": `تلاوة السورة ${surahId}`,
                "item": `https://maweiza.com/qaran/listen/${reciterId}/${surahId}`
            }
        ]
    };

    const audioSchema = {
        "@context": "https://schema.org",
        "@type": "AudioObject",
        "name": `تلاوة سورة ${surahId}`,
        "description": `تلاوة خاشعة لسورة ${surahId} على موقع موعظة`,
        "inLanguage": "ar",
        "publisher": {
            "@type": "Organization",
            "name": "موعظة",
            "url": "https://maweiza.com"
        }
    };

    return (
        <>
            <Script
                id="jsonld-breadcrumb"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Script
                id="jsonld-audio"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(audioSchema) }}
            />
            <ListenClient id={surahId} idRecitations={reciterId} />
        </>
    );
}
