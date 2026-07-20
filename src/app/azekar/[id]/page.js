import Script from "next/script";
import azekar from "@/data/azekar.json";
import AzkarClient from "./AzkarClient";

export async function generateMetadata({ params }) {
    const id = params.id;
    const category = azekar[id - 1]?.category || "أذكار وأدعية إسلامية";

    const title = `${category} كاملة ومكتوبة | موقع موعظة`;
    const description = `اقرأ وتصفح ${category} كاملة ومكتوبة من القرآن والسنة النبوية الصحيحة عبر موقع موعظة.`;
    const canonicalUrl = `/azekar/${id}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: `https://maweiza.com${canonicalUrl}`,
            siteName: "موعظة | Maweiza",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default function Page({ params }) {
    const id = params.id;
    const category = azekar[id - 1]?.category || "أذكار";

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
                "name": "الأذكار والأدعية",
                "item": "https://maweiza.com/azekar"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": category,
                "item": `https://maweiza.com/azekar/${id}`
            }
        ]
    };

    return (
        <>
            <Script
                id="jsonld-breadcrumb-azkar"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <AzkarClient id={id} />
        </>
    );
}
