import Script from "next/script";
import Landing from "@/components/Layout/Landing";
import Articles from "@/components/content/Articles";
import { API } from "@/config/constants";

export async function generateMetadata({ params }) {
    const pageNum = params.id || "1";
    let totalItems = 1670;
    try {
        const res = await fetch(API.islamhouse("articles", pageNum), { next: { revalidate: 3600 } });
        if (res.ok) {
            const data = await res.json();
            if (data.links?.total_items) totalItems = data.links.total_items;
        }
    } catch (e) {}

    const title = `المقالات والدروس الإسلامية - صفحة ${pageNum} | موقع موعظة`;
    const description = `تصفح أكثر من ${totalItems.toLocaleString('ar-EG')} مقالاً ودراسة إسلامية تربوية وفقهية موثوقة على موقع موعظة.`;
    const canonicalUrl = `/articles/${pageNum}`;

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

export default async function ArticlesPage({ params }) {
    let totalItems = 1670;
    try {
        const res = await fetch(API.islamhouse("articles", params.id || 1), { next: { revalidate: 3600 } });
        if (res.ok) {
            const data = await res.json();
            if (data.links?.total_items) totalItems = data.links.total_items;
        }
    } catch (e) {}

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
                "name": "المقالات والدروس",
                "item": `https://maweiza.com/articles/${params.id || 1}`
            }
        ]
    };

    return (
        <>
            <Script
                id="jsonld-breadcrumb-articles"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Landing title="قسم المقالات الإسلامية" text={`يحتوي هذا القسم على أكثر من ${totalItems.toLocaleString('ar-EG')} مقالاً ودراسة إسلامية نافعة`} />
            <Articles id={params.id} />
        </>
    );
}
