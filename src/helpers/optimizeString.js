const NORMALIZE_MAP = [
    [/ة/g, "ه"],
    [/ى/g, "ي"],
    [/[أإآٱ]/g, "ا"],
    [/َ|ً|ُ|ٌ|ّ|ٍ|ِ|ْ|ٰ|ٓ|ـ|ۡ/g, ""],
    [/عبد ال/g, "عبدال"],
];

export function optimizeString(string) {
    let text = string;
    for (const [pattern, replacement] of NORMALIZE_MAP) {
        text = text.replace(pattern, replacement);
    }
    return text;
}