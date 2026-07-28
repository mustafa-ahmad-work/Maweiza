import { dbGet, dbGetAll, dbPut, dbPutMany, dbDelete, dbClear, STORES } from "./db";

export const OfflineRepository = {
    // 1. مواقيت الصلاة (مرتبطة بتاريخ اليوم والإحداثيات)
    async getPrayerTimes(dateStr, lat, lng, fetcherFn) {
        const key = `${dateStr}_${lat.toFixed(2)}_${lng.toFixed(2)}`;
        const cached = await dbGet(STORES.PRAYER_TIMES, key);
        if (cached && cached.data) {
            return cached.data;
        }
        if (typeof window !== "undefined" && !navigator.onLine) {
            return cached ? cached.data : null;
        }
        try {
            const data = await fetcherFn();
            if (data) {
                await dbPut(STORES.PRAYER_TIMES, { key, dateStr, lat, lng, data, updatedAt: Date.now() });
            }
            return data;
        } catch (err) {
            return cached ? cached.data : null;
        }
    },

    // 2. الأذكار
    async getAzkar(fetcherFn) {
        const cached = await dbGetAll(STORES.AZEKAR);
        if (cached && cached.length > 0) {
            // تحديث في الخلفية إذا كان متصلاً
            if (typeof window !== "undefined" && navigator.onLine && fetcherFn) {
                fetcherFn().then((data) => {
                    if (data && Array.isArray(data)) {
                        dbPutMany(STORES.AZEKAR, data.map((item, idx) => ({ id: item.id || idx, ...item })));
                    }
                }).catch(() => {});
            }
            return cached;
        }
        if (fetcherFn) {
            try {
                const data = await fetcherFn();
                if (data && Array.isArray(data)) {
                    const formatted = data.map((item, idx) => ({ id: item.id || idx, ...item }));
                    await dbPutMany(STORES.AZEKAR, formatted);
                    return formatted;
                }
                return data;
            } catch (err) {
                return [];
            }
        }
        return [];
    },

    // 3. أسماء الله الحسنى
    async getNames(fetcherFn) {
        const cached = await dbGetAll(STORES.NAMES);
        if (cached && cached.length > 0) {
            return cached;
        }
        if (fetcherFn) {
            try {
                const data = await fetcherFn();
                if (data && Array.isArray(data)) {
                    const formatted = data.map((item, idx) => ({ id: item.id || idx, ...item }));
                    await dbPutMany(STORES.NAMES, formatted);
                    return formatted;
                }
                return data;
            } catch (err) {
                return [];
            }
        }
        return [];
    },

    // 4. القرآن الكريم
    async getQuranSurahs(fetcherFn) {
        const cached = await dbGetAll(STORES.QURAN);
        if (cached && cached.length > 0) {
            return cached;
        }
        if (fetcherFn) {
            try {
                const data = await fetcherFn();
                if (data && Array.isArray(data)) {
                    const formatted = data.map((item) => ({ id: item.number || item.id, ...item }));
                    await dbPutMany(STORES.QURAN, formatted);
                    return formatted;
                }
                return data;
            } catch (err) {
                return [];
            }
        }
        return [];
    },

    // 5. علامات القراءة والمفضلة
    async getBookmarks() {
        return await dbGetAll(STORES.BOOKMARKS);
    },

    async saveBookmark(bookmark) {
        const id = bookmark.id || `${bookmark.type}_${Date.now()}`;
        return await dbPut(STORES.BOOKMARKS, { id, ...bookmark, createdAt: Date.now() });
    },

    async removeBookmark(id) {
        return await dbDelete(STORES.BOOKMARKS, id);
    },

    // 6. عداد التسبيح
    async getTasbihCount(id = "default") {
        return await dbGet(STORES.TASBIH, id);
    },

    async saveTasbihCount(id, count, target) {
        return await dbPut(STORES.TASBIH, { id, count, target, updatedAt: Date.now() });
    },

    // 7. حزم التنزيل والتحميل المسبق للأوفلاين
    async getDownloadedPackages() {
        return await dbGetAll(STORES.DOWNLOADS);
    },

    async isPackageDownloaded(pkgId) {
        const res = await dbGet(STORES.DOWNLOADS, pkgId);
        return res ? res.completed : false;
    },

    async setPackageStatus(pkgId, title, completed, sizeBytes = 0, totalItems = 0) {
        return await dbPut(STORES.DOWNLOADS, {
            pkgId,
            title,
            completed,
            sizeBytes,
            totalItems,
            updatedAt: Date.now(),
        });
    },

    async removePackageStatus(pkgId) {
        return await dbDelete(STORES.DOWNLOADS, pkgId);
    }
};
