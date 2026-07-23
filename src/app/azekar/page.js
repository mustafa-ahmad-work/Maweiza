import Image from "next/image";
import Script from "next/script";
import Landing from "@/components/Layout/Landing";
import Azekar from "@/components/adhkar/Adhkars";
import { Suspense } from "react";
import Loader from "@/components/Layout/Loader";

export const metadata = {
    title: "الأذكار والأدعية اليومية الصحيحة | موقع موعظة",
    description: "تصفح أذكار الصباح والمساء، أذكار النوم والاستيقاظ، أذكار الصلاة، وأدعية القرآن والسنة النبوية الصحيحة في موقع موعظة.",
    alternates: {
        canonical: "/azekar",
    },
    openGraph: {
        title: "الأذكار والأدعية اليومية الصحيحة | موقع موعظة",
        description: "أكثر من 140 قسماً للأذكار والأدعية الصحيحة المأثورة عن النبي ﷺ.",
        url: "https://maweiza.com/azekar",
        siteName: "موعظة | Maweiza",
    },
    twitter: {
        card: "summary_large_image",
        title: "الأذكار والأدعية اليومية الصحيحة | موقع موعظة",
        description: "حصن المسلم وأذكار الصباح والمساء والأدعية المأثورة على موقع موعظة.",
    },
};

export default function AzkarIndexPage() {
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
            }
        ]
    };

    return (
        <>
            <Script
                id="jsonld-breadcrumb-azkar-main"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Landing
                title="قسم الأذكار والأدعية"
                text="يحتوي هذا القسم على أكثر من 140 من الأذكار والأدعية المتنوعة من حصن المسلم"
            />
            <section className="pb-10 relative">
                <Image
                    width={100}
                    height={100}
                    src="/img.png"
                    className="absolute w-32 top-16 left-0 -z-40"
                    alt="زخرفة موعظة الإسلامية"
                />
                <Suspense fallback={<Loader />}>
                    <Azekar />
                </Suspense>
                <Image
                    width={100}
                    height={100}
                    src="/img.png"
                    className="absolute bottom-10 right-0 rotate-180 -z-40"
                    alt="زخرفة موعظة الإسلامية"
                />
            </section>
        </>
    );
}
