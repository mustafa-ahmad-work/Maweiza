import { API } from "@/config/constants";
import useSWR from "swr";

import adithData from "@/data/adith.json";
import azekarData from "@/data/azekar.json";
import quotesData from "@/data/quotesAll.json";
import recitersData from "@/data/reciters.json";
import questionsData from "@/data/questions.json";

// Local Datasets Dynamic Counts
export const HADITH_COUNT = Array.isArray(adithData) ? adithData.length : Object.keys(adithData).length;

export const ADHKAR_CATEGORIES_COUNT = Object.keys(azekarData).length;

export const ADHKAR_ITEMS_COUNT = Object.values(azekarData).reduce((acc, cat) => {
    if (Array.isArray(cat)) return acc + cat.length;
    if (typeof cat === "object" && cat !== null) return acc + Object.keys(cat).length;
    return acc;
}, 0);

export const QUOTES_COUNT = quotesData.result?.length || quotesData.quotes?.length || 284;

export const RECITERS_COUNT = recitersData.reciters?.length || 115;

export const QUIZ_QUESTIONS_COUNT = (() => {
    let count = 0;
    if (questionsData.mainCategories) {
        questionsData.mainCategories.forEach((mc) => {
            if (mc.topics) {
                mc.topics.forEach((t) => {
                    if (t.levelsData) {
                        Object.values(t.levelsData).forEach((lvl) => {
                            if (Array.isArray(lvl)) count += lvl.length;
                        });
                    }
                });
            }
        });
    }
    return count || 5820;
})();

// Default API stats before live fetch completes
export const DEFAULT_STATS = {
    books: { totalItems: 5058, totalMedia: 7284 },
    audios: { totalItems: 3843, totalMedia: 13374 },
    articles: { totalItems: 1674, totalMedia: 1942 },
    videos: { totalItems: 841, totalMedia: 6291 },
    khotab: { totalItems: 285, totalMedia: 490 },
    fatwa: { totalItems: 482, totalMedia: 636 },
};

export const CATEGORIES_KEYS = ["books", "audios", "articles", "videos", "khotab", "fatwa"];

/**
 * Fetches statistics dynamically from IslamHouse API for all 6 main categories.
 * Calculates both total items (عناصر/مواد) and total content media (أجزاء وملفات صوتيات ومرئيات ومرفقات).
 */
export async function fetchCategoryStats() {
    const results = { ...DEFAULT_STATS };
    let totalAllItems = 0;
    let totalAllMedia = 0;

    await Promise.all(
        CATEGORIES_KEYS.map(async (key) => {
            try {
                const res = await fetch(API.islamhouse(key, 1), {
                    next: { revalidate: 3600 }
                });
                if (res.ok) {
                    const json = await res.json();
                    const totalItems = json.links?.total_items || DEFAULT_STATS[key].totalItems;
                    const items = json.data || [];

                    let sumAttachments = 0;
                    items.forEach((item) => {
                        sumAttachments += item.num_attachments || (item.attachments?.length || 1);
                    });

                    const avg = items.length > 0 ? sumAttachments / items.length : 1;
                    const totalMedia = Math.max(totalItems, Math.round(totalItems * avg));

                    results[key] = { totalItems, totalMedia };
                }
            } catch (err) {
                console.error(`Error fetching stats for category ${key}:`, err);
            }
        })
    );

    CATEGORIES_KEYS.forEach((k) => {
        totalAllItems += results[k].totalItems;
        totalAllMedia += results[k].totalMedia;
    });

    const localTotal = HADITH_COUNT + ADHKAR_ITEMS_COUNT + QUOTES_COUNT + RECITERS_COUNT + QUIZ_QUESTIONS_COUNT;

    return {
        sections: results,
        totalAllItems,
        totalAllMedia,
        grandTotalPlatformMedia: totalAllMedia + localTotal,
    };
}

/**
 * React SWR Hook to retrieve automatic live statistics for all sections across the platform.
 */
export function useCategoryStats() {
    const { data, error, isLoading } = useSWR(
        "islamhouse_all_category_stats",
        fetchCategoryStats,
        {
            revalidateOnFocus: false,
            dedupingInterval: 3600000, // 1 hour caching
            fallbackData: {
                sections: DEFAULT_STATS,
                totalAllItems: 12183,
                totalAllMedia: 30017,
                grandTotalPlatformMedia: 37377,
            },
        }
    );

    const stats = data?.sections || DEFAULT_STATS;
    const totalAllItems = data?.totalAllItems || 12183;
    const totalAllMedia = data?.totalAllMedia || 30017;
    const grandTotalPlatformMedia = data?.grandTotalPlatformMedia || 37377;

    return {
        stats,
        totalAllItems,
        totalAllMedia,
        grandTotalPlatformMedia,
        hadithCount: HADITH_COUNT,
        adhkarCategoriesCount: ADHKAR_CATEGORIES_COUNT,
        adhkarItemsCount: ADHKAR_ITEMS_COUNT,
        quotesCount: QUOTES_COUNT,
        recitersCount: RECITERS_COUNT,
        quizQuestionsCount: QUIZ_QUESTIONS_COUNT,
        isLoading,
        error,
    };
}
