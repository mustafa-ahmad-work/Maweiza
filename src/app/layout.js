
import "./globals.css";

import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import Buttons from "@/components/Layout/Buttons";
import localFont from "next/font/local";

import Script from "next/script";

import { SWRProvider } from "@/components/Layout/SWRProvider";
import { RamadanProvider } from "@/context/ramadanContext";

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const cairoFont = localFont({
    src: [
        {
            path: "../fonts/Cairo/Cairo-Light.woff2",
            weight: "300",
        },
        {
            path: "../fonts/Cairo/Cairo-Regular.woff2",
            weight: "400",
        },
        {
            path: "../fonts/Cairo/Cairo-Bold.woff2",
            weight: "700",
        },
        {
            path: "../fonts/Cairo/Cairo-Black.woff2",
            weight: "900",
        },
    ],
    variable: "--font-cairo",
    weight: "300 400 700 900",
    display: "swap",
});

const thmanyahFont = localFont({
    src: [
        {
            path: "../fonts/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Regular.woff2",
            weight: "400",
        },
        {
            path: "../fonts/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Medium.woff2",
            weight: "500",
        },
        {
            path: "../fonts/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Bold.woff2",
            weight: "700",
        },
        {
            path: "../fonts/thmanyahserifdisplay/woff2/thmanyahserifdisplay-Black.woff2",
            weight: "900",
        },
    ],
    variable: "--font-thmanyah",
    display: "swap",
});


export const metadata = {
    metadataBase: new URL("https://maweiza.com"),

    title: {
        default: "موعظة | موقع إسلامي شامل",
        template: "%s | موعظة"
    },

    description:
        "موقع موعظة الإسلامي يقدم محتوى شامل من القرآن الكريم وتفسيره، الأحاديث النبوية، الأدعية والأذكار، الخطب، الفتاوى، الكتب والمقالات، والمحاضرات الصوتية والمرئية — لتجربة معرفية وروحية متكاملة.",

    applicationName: "موعظة",
    generator: "Next.js",
    publisher: "مصطفى أحمد",
    category: "Islamic",
    referrer: "origin-when-cross-origin",
    formatDetection: {
        telephone: false,
        address: false,
        email: false
    },
    manifest: "/manifest.webmanifest",
    appleWebApp: {
        title: "موعظة",
        statusBarStyle: "black-translucent",
        capable: true
    },

    keywords: [
        "موعظة",
        "موقع موعظة",
        "موعظة إسلامية",
        "القرآن الكريم",
        "تفسير القرآن",
        "أحاديث نبوية",
        "أذكار الصباح والمساء",
        "مواقيت الصلاة",
        "Maweiza"
    ],

    authors: [{ name: "مصطفى أحمد", url: "https://maweiza.com" }],

    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
            { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
        ],
        shortcut: ["/favicon.ico"],
        apple: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
            { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
            { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
            { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
            { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
            { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
            { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
            { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
            { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
            { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" }
        ],
        other: [
            { rel: "apple-touch-icon-precomposed", url: "/apple-icon-precomposed.png" },
            { rel: "mask-icon", url: "/favicon.ico", color: "#16a34a" }
        ]
    },

    openGraph: {
        type: "website",
        locale: "ar_EG",
        url: "https://maweiza.com",
        siteName: "موعظة | Maweiza",
        title: "موعظة | موقع إسلامي شامل للقرآن والأحاديث والأدعية",
        description:
            "اكتشف كنوز العلم والإيمان في موقع موعظة — القرآن الكريم، التفسير، الأحاديث، الأدعية، الخطب، الكتب والمزيد.",
        images: [
            {
                url: "https://maweiza.com/logo.png",
                width: 1200,
                height: 630,
                alt: "شعار موقع موعظة",
                type: "image/png"
            },
            {
                url: "https://maweiza.com/android-chrome-512x512.png",
                width: 512,
                height: 512,
                alt: "أيقونة موقع موعظة",
                type: "image/png"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        site: "@maweiza",
        creator: "@mostafaahmed",
        title: "موعظة | موقع إسلامي شامل",
        description:
            "منصة موعظة — مرجعك الكامل للقرآن الكريم، الأحاديث، الأدعية، الفتاوى، الكتب والمحاضرات الإسلامية.",
        images: ["https://maweiza.com/logo.png"]
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
        },
    },

    verification: {
        google: "google-site-verification-code",
    },

    alternates: {
        canonical: "/"
    }
};


export default function RootLayout({ children }) {
    return (
        <html lang="ar" className="scroll-smooth" dir="rtl">
            <head>
                <meta name="theme-color" content="#16a34a" />
                <meta name="msapplication-TileColor" content="#16a34a" />
                <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <meta name="mobile-web-app-capable" content="yes" />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <meta
                    name="google-adsense-account"
                    content="ca-pub-2830940611983404"
                />
                <Script id="google-analytics" strategy="lazyOnload">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WBZJG335');`}
                </Script>
                {/* JSON-LD Structured Data: WebSite & SearchAction */}
                <Script
                    id="json-ld-website"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "name": "موعظة",
                            "alternateName": ["موقع موعظة", "موعظة إسلامية", "Maweiza"],
                            "url": "https://maweiza.com",
                            "inLanguage": "ar",
                            "description": "منصة إسلامية شاملة تقدم القرآن الكريم وتفسيره، الأحاديث النبوية، الأذكار، مواقيت الصلاة، الكتب والفتاوى الشرعية.",
                            "image": "https://maweiza.com/android-chrome-512x512.png",
                            "potentialAction": {
                                "@type": "SearchAction",
                                "target": {
                                    "@type": "EntryPoint",
                                    "urlTemplate": "https://maweiza.com/search/{search_term_string}"
                                },
                                "query-input": "required name=search_term_string"
                            }
                        })
                    }}
                />
                {/* JSON-LD Structured Data: Organization */}
                <Script
                    id="json-ld-organization"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            "name": "موعظة",
                            "alternateName": "Maweiza",
                            "url": "https://maweiza.com",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://maweiza.com/android-chrome-512x512.png",
                                "width": 512,
                                "height": 512,
                                "caption": "شعار موعظة"
                            },
                            "image": "https://maweiza.com/logo.png",
                            "sameAs": [
                                "https://facebook.com/maweiza",
                                "https://twitter.com/maweiza"
                            ]
                        })
                    }}
                />
            </head>
            <SWRProvider>
                <RamadanProvider>
                    <body cz-shortcut-listen="true" className="bg-dotted text-sm dark:text-white transition-colors selection:bg-lime-600 selection:text-white min-h-screen">
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-WBZJG335"
                            height="0"
                            width="0"
                            title="google tag manager"
                        >
                        </iframe>
                        <main className={`${cairoFont.variable} ${thmanyahFont.variable} relative antialiased pt-24 sm:pt-28 lg:pt-36`}>
                            <Navbar />
                            {children}
                            <Footer />
                            <Buttons />
                        </main>
                    </body>
                </RamadanProvider>
            </SWRProvider>
        </html>
    );
}
