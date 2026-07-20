import ApplicationClient from "./ApplicationClient";

export const metadata = {
    title: "تطبيق مفاتيح حفظ القرآن | منهجية علمية للتمكين والرسوخ",
    description: "تعرف على تطبيق مفاتيح حفظ القرآن ومنهجيته العلمية التراكمية القائمة على 5 مفاتيح أساسية لنقل الحفظ إلى الذاكرة بعيدة المدى، وحمّل التطبيق لهواتف الأندرويد والآيفون.",
    alternates: {
        canonical: "/application",
    },
    openGraph: {
        title: "تطبيق مفاتيح حفظ القرآن | منهجية علمية للتمكين والرسوخ",
        description: "انقل حفظك للقرآن الكريم إلى الذاكرة بعيدة المدى باستخدام تطبيق مفاتيح حفظ القرآن المبني على أسس دراسة علمية تراكمية.",
        url: "https://maweiza.com/application",
        siteName: "موعظة",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "تطبيق مفاتيح حفظ القرآن | منهجية علمية للتمكين والرسوخ",
        description: "احفظ القرآن الكريم بلا نسيان مع تطبيق مفاتيح الحفظ. متوفر للتحميل الآن.",
    },
};

export default function ApplicationPage() {
    return <ApplicationClient />;
}
