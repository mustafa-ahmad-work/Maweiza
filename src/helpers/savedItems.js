"use client";

// مفاتيح التخزين في localStorage
const SAVED_ITEMS_KEY = "maweiza_saved_items";
const LIKED_ITEMS_KEY = "maweiza_liked_items";

// قراءة البيانات بأمان
const getStorageData = (key) => {
    if (typeof window === "undefined") return [];
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error("Error reading localStorage:", err);
        return [];
    }
};

// حفظ البيانات بأمان
const setStorageData = (key, data) => {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.error("Error writing localStorage:", err);
    }
};

// ========================
// خدمات المحفوظات (Bookmarks)
// ========================

export const getSavedItems = (type = null) => {
    const items = getStorageData(SAVED_ITEMS_KEY);
    if (!type) return items;
    return items.filter((item) => item.type === type);
};

export const isSaved = (type, id) => {
    const items = getStorageData(SAVED_ITEMS_KEY);
    return items.some((item) => item.type === type && String(item.id) === String(id));
};

export const toggleSave = (item, type) => {
    let items = getStorageData(SAVED_ITEMS_KEY);
    const existingIndex = items.findIndex((i) => i.type === type && String(i.id) === String(item.id));

    if (existingIndex >= 0) {
        items.splice(existingIndex, 1);
    } else {
        items.unshift({ ...item, type, savedAt: Date.now() });
    }

    setStorageData(SAVED_ITEMS_KEY, items);
    return existingIndex < 0; // return true if saved, false if removed
};

// ========================
// خدمات المفضلة (Likes)
// ========================

export const getLikedItems = (type = null) => {
    const items = getStorageData(LIKED_ITEMS_KEY);
    if (!type) return items;
    return items.filter((item) => item.type === type);
};

export const isLiked = (type, id) => {
    const items = getStorageData(LIKED_ITEMS_KEY);
    return items.some((item) => item.type === type && String(item.id) === String(id));
};

export const toggleLike = (item, type) => {
    let items = getStorageData(LIKED_ITEMS_KEY);
    const existingIndex = items.findIndex((i) => i.type === type && String(i.id) === String(item.id));

    if (existingIndex >= 0) {
        items.splice(existingIndex, 1);
    } else {
        items.unshift({ ...item, type, likedAt: Date.now() });
    }

    setStorageData(LIKED_ITEMS_KEY, items);
    return existingIndex < 0; // return true if liked, false if unliked
};
