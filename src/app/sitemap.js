export default async function sitemap() {
    const baseUrl = "https://maweiza.com";

    // 1. الرئيسية والأقسام العامة الشاملة
    const mainRoutes = [
        "",
        "/qaran",
        "/adiths",
        "/azekar",
        "/salah",
        "/books",
        "/articles",
        "/fatwa",
        "/khotab",
        "/audios",
        "/videos",
        "/stories",
        "/tafsir",
        "/quiz",
        "/calendar",
        "/list-ramadan",
        "/names",
        "/zakat",
        "/tasbih",
        "/children",
        "/quotes"
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.9,
    }));

    // 2. تلاوات سور القرآن الكريم الـ 114
    const surahRoutes = Array.from({ length: 114 }, (_, i) => i + 1).map((surahId) => ({
        url: `${baseUrl}/qaran/listen/1/${surahId}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    // 3. تحفيظ سور القرآن الـ 114
    const memorizingRoutes = Array.from({ length: 114 }, (_, i) => i + 1).map((surahId) => ({
        url: `${baseUrl}/qaran/memorizing/1/${surahId}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    // 4. فئات الأذكار والأدعية اليومية
    const azkarRoutes = Array.from({ length: 15 }, (_, i) => i + 1).map((azkarId) => ({
        url: `${baseUrl}/azekar/${azkarId}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    return [...mainRoutes, ...surahRoutes, ...memorizingRoutes, ...azkarRoutes];
}
