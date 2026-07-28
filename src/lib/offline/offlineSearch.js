import { dbGetAll, STORES } from "./db";

export async function performOfflineSearch(query) {
    if (!query || !query.trim()) return { azekar: [], quran: [], names: [] };

    const q = query.trim().toLowerCase();

    // البحث في الأذكار
    const azekar = await dbGetAll(STORES.AZEKAR);
    const matchedAzekar = azekar.filter((item) => {
        const text = (item.text || item.zekr || item.category || "").toLowerCase();
        return text.includes(q);
    }).slice(0, 15);

    // البحث في السور
    const quran = await dbGetAll(STORES.QURAN);
    const matchedQuran = quran.filter((surah) => {
        const name = (surah.name || surah.arName || surah.englishName || "").toLowerCase();
        return name.includes(q);
    }).slice(0, 15);

    // البحث في أسماء الله الحسنى
    const names = await dbGetAll(STORES.NAMES);
    const matchedNames = names.filter((n) => {
        const name = (n.name || n.meaning || "").toLowerCase();
        return name.includes(q);
    }).slice(0, 15);

    return {
        azekar: matchedAzekar,
        quran: matchedQuran,
        names: matchedNames,
    };
}
