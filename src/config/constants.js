const API_BASE = {
    ALADHAN: "https://api.aladhan.com/v1",
    QURAN_CLOUD: "https://api.alquran.cloud/v1",
    ISLAMHOUSE: "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main",
    DORAR: "https://dorar.net/dorar_api.json",
    RECITERS: "https://abdoahmed26.github.io/api/arabic.json",
};

export const API = {
    ALADHAN_BASE: API_BASE.ALADHAN,
    QURAN_CLOUD: API_BASE.QURAN_CLOUD,
    ISLAMHOUSE_BASE: API_BASE.ISLAMHOUSE,
    DORAR_BASE: API_BASE.DORAR,
    RECITERS_JSON: API_BASE.RECITERS,
    islamhouse: (section, page = 1) =>
        `${API_BASE.ISLAMHOUSE}/${section}/ar/ar/${page}/25/json`,
    aladhan: (endpoint) => `${API_BASE.ALADHAN}/${endpoint}`,
    quranCloud: (endpoint) => `${API_BASE.QURAN_CLOUD}/${endpoint}`,
    dorar: (query) => `${API_BASE.DORAR}?skey=${query}`,
};

export const PAGINATION = {
    ITEMS_PER_PAGE: 25,
};

export const ISLAMHOUSE_API_KEY = "paV29H2gm56kvLPy";

export const COORDINATES = {
    CAIRO_LAT: "30.0444",
    CAIRO_LNG: "31.2357",
    DEFAULT_LAT: "30.0444",
    DEFAULT_LNG: "31.2357",
};

export const THEME = {
    STORAGE_KEY: "maweiza_theme",
    DARK: "dark",
    LIGHT: "light",
};

export const STORAGE_KEYS = {
    THEME: "maweiza_theme",
    LATITUDE: "maweiza_lat",
    LONGITUDE: "maweiza_lng",
    TASBIH: "maweiza_tasbih",
    SEARCH_ID: "maweiza_search_id",
    RAMADAN_CHECKS: "maweiza_ramadan_checks",
};
