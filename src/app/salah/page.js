import { Suspense } from "react";
import Script from "next/script";
import Salah from "@/components/worship/Salah";
import EventsTimer from "@/components/worship/EventsTimer";

export const metadata = {
    title: "مواقيت الصلاة اليوم واتجاه القبلة | موقع موعظة",
    description: "احسب مواقيت الصلاة اليومية الدقيقة (الفجر، الظهر، العصر، المغرب، العشاء) وتعرف على العد التنازلي للصلاة القادمة والمناسبات الإسلامية في موقع موعظة.",
    alternates: {
        canonical: "/salah",
    },
    openGraph: {
        title: "مواقيت الصلاة اليوم واتجاه القبلة | موقع موعظة",
        description: "مواقيت الصلاة الدقيقة والعد التنازلي لأوقات الصلوات والمناسبات الإسلامية.",
        url: "https://maweiza.com/salah",
        siteName: "موعظة | Maweiza",
    },
    twitter: {
        card: "summary_large_image",
        title: "مواقيت الصلاة | موقع موعظة",
        description: "مواقيت الصلاة الدقيقة حسب موقعك الجغرافي عبر موقع موعظة.",
    },
};

export default function SalahPage() {
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
                "name": "مواقيت الصلاة",
                "item": "https://maweiza.com/salah"
            }
        ]
    };

    return (
        <>
            <Script
                id="jsonld-breadcrumb-salah"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Suspense>
                <Salah />
            </Suspense>
            <EventsTimer />
        </>
    );
}
