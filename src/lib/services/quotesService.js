// خدمة الاقتباسات وجلب العلماء والأثر ديناميكياً من كلمات API والبيانات المحلية

import quotesAll from "@/data/quotesAll.json";

const DEFAULT_TOKEN = process.env.NEXT_PUBLIC_KALIMAT_API_TOKEN || "89|HIUQJkHMHAFXbu6ajr4kuxHjS7frU189N7VSAoCj033735bb";
const BASE_URL = "https://kalimatapi.com/api/v1";

/**
 * الحصول على التوكن
 */
export function getApiToken() {
    if (typeof window !== "undefined") {
        const userToken = localStorage.getItem("kalimat_api_token");
        if (userToken) return userToken;
    }
    return DEFAULT_TOKEN;
}

/**
 * جلب اقتباس / حكمة اليوم من كلمات API
 */
export async function getQuoteOfToday() {
    const token = getApiToken();
    try {
        const res = await fetch(`${BASE_URL}/quotes/today?token=${encodeURIComponent(token)}`, /** @type {any} */ ({
            next: { revalidate: 1800 }
        }));
        if (res.ok) {
            const data = await res.json();
            if (data && data.data) {
                return data.data;
            }
        }
    } catch (e) { }

    // fallback محلي بدون مصعب
    const validLocal = quotesAll.result.filter(r => r.author && !r.author.includes("مصعب"));
    const randomIndex = Math.floor(Math.random() * validLocal.length);
    const local = validLocal[randomIndex] || quotesAll.result[0];
    return {
        number: local.id,
        text: local.text,
        tashkeel_text: local.text,
        author: {
            name: local.author,
            key: local.authorId
        },
        categories: [{ name: "حكمة", key: "wisdom" }]
    };
}

/**
 * جلب قائمة الاقتباسات المباشرة من كلمات API
 */
export async function getKalimatQuotes() {
    const token = getApiToken();
    try {
        const res = await fetch(`${BASE_URL}/quotes?token=${encodeURIComponent(token)}`, /** @type {any} */ ({
            next: { revalidate: 1800 }
        }));
        if (res.ok) {
            const data = await res.json();
            if (data && data.data && Array.isArray(data.data)) {
                return data.data.filter(q => !q.author?.name?.includes("مصعب"));
            }
        }
    } catch (e) { }
    return [];
}

/**
 * جلب جميع المؤلفين ديناميكياً من الـ API ودمجهم مع المحلي دون كتابة أي اسم يدوياً
 */
export async function fetchDynamicAuthors() {
    const authorsMap = new Map();

    // 1. إضافة المؤلفين المحليين (استبعاد مصعب)
    quotesAll.authors.forEach(a => {
        if (a.author && !a.author.includes("مصعب")) {
            const count = quotesAll.result.filter(r => r.authorId === a.authorId).length;
            authorsMap.set(a.author, {
                id: a.authorId,
                name: a.author,
                key: a.authorId,
                quotesCount: count || 12
            });
        }
    });

    // 2. الجلب المباشر من الـ API واستخراج جميع المؤلفين منه ديناميكياً
    const apiQuotes = await getKalimatQuotes();
    if (apiQuotes && apiQuotes.length > 0) {
        apiQuotes.forEach(q => {
            if (q.author && q.author.name && !q.author.name.includes("مصعب")) {
                const existing = authorsMap.get(q.author.name);
                if (existing) {
                    existing.key = q.author.key || existing.key;
                    existing.quotesCount = Math.max(existing.quotesCount, 15);
                } else {
                    authorsMap.set(q.author.name, {
                        id: q.author.key || q.author.name,
                        name: q.author.name,
                        key: q.author.key || q.author.name,
                        quotesCount: 15
                    });
                }
            }
        });
    }

    return Array.from(authorsMap.values());
}

/**
 * جلب جميع اقتباسات مؤلف محدد بالـ ID أو الـ Key
 */
export async function getQuotesForAuthor(authorIdOrKey) {
    const raw = String(authorIdOrKey);

    // البحث في البيانات المحلية
    let localAuthor = quotesAll.authors.find(a => String(a.authorId) === raw || a.author === raw);
    let name = localAuthor ? localAuthor.author : raw;
    let apiKey = localAuthor ? localAuthor.authorId : raw;

    let localQuotes = quotesAll.result.filter(q => {
        if (q.author && q.author.includes("مصعب")) return false;
        if (localAuthor && Number(q.authorId) === Number(localAuthor.authorId)) return true;
        if (q.author === name) return true;
        if (String(q.authorId) === raw) return true;
        return false;
    }).map(q => ({
        number: q.id,
        text: q.text,
        tashkeel_text: q.text,
        author: { name: q.author, key: q.authorId }
    }));

    // جلب من الـ API للمؤلف إن وُجد
    const token = getApiToken();
    try {
        const res = await fetch(`${BASE_URL}/quotes/author/${encodeURIComponent(apiKey)}?token=${encodeURIComponent(token)}`);
        if (res.ok) {
            const data = await res.json();
            if (data && data.data && Array.isArray(data.data)) {
                const apiFiltered = data.data.filter(q => !q.author?.name?.includes("مصعب"));
                if (apiFiltered.length > 0) {
                    if (apiFiltered[0]?.author?.name) {
                        name = apiFiltered[0].author.name;
                    }
                    const existingTexts = new Set(localQuotes.map(l => l.text.trim()));
                    apiFiltered.forEach(apiQ => {
                        if (!existingTexts.has(apiQ.text.trim())) {
                            localQuotes.push(apiQ);
                        }
                    });
                }
            }
        }
    } catch (e) { }

    return {
        authorName: name,
        quotes: localQuotes
    };
}
