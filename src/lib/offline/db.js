const DB_NAME = "MaweizaDB";
const DB_VERSION = 1;

export const STORES = {
    AZEKAR: "azekar",
    QURAN: "quran",
    PRAYER_TIMES: "prayerTimes",
    NAMES: "names",
    BOOKMARKS: "bookmarks",
    TASBIH: "tasbih",
    DOWNLOADS: "downloads",
};

export function openDB() {
    return new Promise((resolve, reject) => {
        if (typeof window === "undefined" || !("indexedDB" in window)) {
            return resolve(null);
        }

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(STORES.AZEKAR)) {
                db.createObjectStore(STORES.AZEKAR, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(STORES.QURAN)) {
                db.createObjectStore(STORES.QURAN, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(STORES.PRAYER_TIMES)) {
                db.createObjectStore(STORES.PRAYER_TIMES, { keyPath: "key" });
            }
            if (!db.objectStoreNames.contains(STORES.NAMES)) {
                db.createObjectStore(STORES.NAMES, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(STORES.BOOKMARKS)) {
                db.createObjectStore(STORES.BOOKMARKS, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(STORES.TASBIH)) {
                db.createObjectStore(STORES.TASBIH, { keyPath: "id" });
            }
            if (!db.objectStoreNames.contains(STORES.DOWNLOADS)) {
                db.createObjectStore(STORES.DOWNLOADS, { keyPath: "pkgId" });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

export async function dbGet(storeName, key) {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const req = store.get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
    });
}

export async function dbGetAll(storeName) {
    const db = await openDB();
    if (!db) return [];
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, "readonly");
        const store = tx.objectStore(storeName);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
    });
}

export async function dbPut(storeName, data) {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.put(data);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
    });
}

export async function dbPutMany(storeName, items) {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        items.forEach((item) => store.put(item));
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => resolve(false);
    });
}

export async function dbDelete(storeName, key) {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.delete(key);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
    });
}

export async function dbClear(storeName) {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
        const tx = db.transaction(storeName, "readwrite");
        const store = tx.objectStore(storeName);
        const req = store.clear();
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
    });
}
