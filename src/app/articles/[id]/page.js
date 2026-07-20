import Script from "next/script";
import Landing from "@/components/Layout/Landing";
import Articles from "@/components/Articles/Articles";

export async function generateMetadata({ params }) {
    const pageNum = params.id || "1";
    const title = `المقالات والدروس الإسلامية - صفحة ${pageNum} | موقع موعظة`;
    const description = `تصفح أكثر من 1690 مقالاً إسلامياً تربوياً وفقهياً موثوقاً على موقع موعظة.`;
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
            <Landing title="قسم المقالات الإسلامية" text="يحتوي هذا القسم على أكثر من 1690 مقالاً وثقافياً إسلامياً مفيداً" />
            <Articles id={params.id} />
        </>
    );
}
