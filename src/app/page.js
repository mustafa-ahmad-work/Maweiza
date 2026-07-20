import Script from "next/script";
import HomeClient from "./HomeClient";

export const metadata = {
    title: "موعظة | المنصة الإسلامية الشاملة للقرآن والحديث والأذكار",
    description: "موقع موعظة الإسلامي يقدم محتوى شامل من القرآن الكريم وتفسيره، الأحاديث النبوية، الأدعية والأذكار، مواقيت الصلاة، الكتب والمقالات الشرعية والمحاضرات.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "موعظة | المنصة الإسلامية الشاملة",
        description: "مرجعك الإسلامي الموثوق للقرآن الكريم وتفسيره، الأحاديث النبوية الشريفة، والأدعية والأذكار اليومية.",
        url: "https://maweiza.com",
        siteName: "موعظة",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "موعظة | المنصة الإسلامية الشاملة",
        description: "تصفح القرآن الكريم، الأحاديث النبوية، الأذكار اليومية، والمكتبة الإسلامية عبر موقع موعظة.",
    },
};

export default function Page() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "ما هو موقع موعظة؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "موقع موعظة هو منصة إسلامية شاملة تتيح قراءة واستماع القرآن الكريم بتلاوات خاشعة، وتصفح الأحاديث النبوية، الأذكار اليومية، مواقيت الصلاة، والمكتبة الإسلامية."
                }
            },
            {
                "@type": "Question",
                "name": "هل يمكن الاستماع للقرآن الكريم عبر موقع موعظة؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "نعم، يوفر موقع موعظة تلاوات خاشعة لجميع سور القرآن الكريم بأسوات أشهر القراء والمعلمين."
                }
            },
            {
                "@type": "Question",
                "name": "هل يوفر موعظة أذكار الصباح والمساء ومواقيت الصلاة؟",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "نعم، يضم الموقع جميع الأذكار والأدعية اليومية الصحيحة بالإضافة إلى حاسبة دقيقة لمواقيت الصلاة حسب الموقع الجغرافي."
                }
            }
        ]
    };

    return (
        <>
            <Script
                id="jsonld-faq"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <HomeClient />
        </>
    );
}
