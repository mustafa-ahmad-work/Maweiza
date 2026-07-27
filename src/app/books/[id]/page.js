import Landing from "@/components/Layout/Landing";
import Script from "next/script";
import { API } from "@/config/constants";
import BooksClient from "@/components/content/BooksClient";

export async function generateMetadata({ params }) {
    const pageNum = params.id || "1";
    const title = `المكتبة الإسلامية والكتب الشرعية - صفحة ${pageNum} | موقع موعظة`;
    const description = `تصفح وحمل آلاف الكتب الإسلامية النافعة والمجانية في الفقه، العقيدة، التفسير والحديث عبر موقع موعظة.`;
    const canonicalUrl = `/books/${pageNum}`;

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

export default async function Page({ params }) {
    let books = [];
    let links = {};
    let hasError = false;

    try {
        const response = await fetch(API.islamhouse("books", params.id));
        if (!response.ok) {
            hasError = true;
        } else {
            const data = await response.json();
            books = data.data || [];
            links = data.links || {};
        }
    } catch (errors) {
        console.error("Error fetching books:", errors);
        hasError = true;
    }

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
                "name": "المكتبة الإسلامية والكتب",
                "item": `https://maweiza.com/books/${params.id || 1}`
            }
        ]
    };

    return (
        <>
            <Script
                id="jsonld-breadcrumb-books"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Landing
                title="قسم الكتب الإسلامية"
                text={`مكتبة شاملة تضم أكثر من ${links?.total_items ? links.total_items.toLocaleString('ar-EG') : '5,000'} كتاب إسلامي تعليمي مفيد ونافع بإذن الله تعالى`}
            />

            <BooksClient
                initialBooks={books}
                links={links}
                pageId={params.id}
                hasError={hasError}
            />
        </>
    );
}
