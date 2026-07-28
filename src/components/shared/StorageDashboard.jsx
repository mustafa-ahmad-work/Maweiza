"use client";

import { useState, useEffect } from "react";
import { OfflineRepository } from "@/lib/offline/offlineRepository";
import { dbClear, STORES } from "@/lib/offline/db";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDatabase,
    faDownload,
    faTrash,
    faCheckCircle,
    faSpinner,
    faHdd,
} from "@fortawesome/free-solid-svg-icons";

export default function StorageDashboard() {
    const [storageInfo, setStorageInfo] = useState({ usedMB: "0", totalMB: "0", percent: 0 });
    const [downloadingPkg, setDownloadingPkg] = useState(null);
    const [packagesStatus, setPackagesStatus] = useState({});

    const PACKAGES = [
        {
            id: "azekar_pkg",
            title: "الأذكار والأدعية اليومية",
            desc: "تحميل كافة الأذكار والأدعية للعمل أوفلاين دون إنترنت",
            urls: ["/azekar", "https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/azkar/ar/ar/1/25/json"],
        },
        {
            id: "quran_pkg",
            title: "بيانات القرآن والتفسير",
            desc: "فهرس سور القرآن الكريم والتفسير الميسر",
            urls: ["/qaran", "https://api.alquran.cloud/v1/surah"],
        },
        {
            id: "names_pkg",
            title: "أسماء الله الحسنى ومواقيت الصلاة",
            desc: "أسماء الله الحسنى ومعانيها مع حاسبة المواقيت",
            urls: ["/names", "/salah", "https://api.aladhan.com/v1/timingsByCity"],
        },
    ];

    const updateStorageInfo = async () => {
        if (typeof window !== "undefined" && navigator.storage && navigator.storage.estimate) {
            try {
                const { usage, quota } = await navigator.storage.estimate();
                const usedMB = (usage / (1024 * 1024)).toFixed(1);
                const totalMB = (quota / (1024 * 1024)).toFixed(0);
                const percent = Math.min(100, Math.round((usage / quota) * 100));
                setStorageInfo({ usedMB, totalMB, percent });
            } catch (e) {
                // ignore
            }
        }
    };

    const loadPackagesStatus = async () => {
        const pkgs = await OfflineRepository.getDownloadedPackages();
        const statusMap = {};
        pkgs.forEach((p) => {
            statusMap[p.pkgId] = p.completed;
        });
        setPackagesStatus(statusMap);
    };

    useEffect(() => {
        updateStorageInfo();
        loadPackagesStatus();
    }, []);

    const handleDownloadPackage = async (pkg) => {
        setDownloadingPkg(pkg.id);
        try {
            for (const url of pkg.urls) {
                await fetch(url, { cache: "reload" }).catch(() => {});
            }
            await OfflineRepository.setPackageStatus(pkg.id, pkg.title, true);
            setPackagesStatus((prev) => ({ ...prev, [pkg.id]: true }));
            await updateStorageInfo();
        } catch (err) {
            console.error(err);
        } finally {
            setDownloadingPkg(null);
        }
    };

    const handleRemovePackage = async (pkgId) => {
        await OfflineRepository.removePackageStatus(pkgId);
        setPackagesStatus((prev) => ({ ...prev, [pkgId]: false }));
        await updateStorageInfo();
    };

    const handleClearAllStorage = async () => {
        if (!confirm("هل أنت تأكد من مسح جميع البيانات المخزنة أوفلاين؟")) return;
        await dbClear(STORES.AZEKAR);
        await dbClear(STORES.QURAN);
        await dbClear(STORES.PRAYER_TIMES);
        await dbClear(STORES.DOWNLOADS);

        if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((k) => caches.delete(k)));
        }
        await updateStorageInfo();
        await loadPackagesStatus();
        alert("تم مسح ذاكرة التخزين بنجاح!");
    };

    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm my-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-lime-50 dark:bg-lime-950/40 text-lime-600 flex items-center justify-center">
                        <FontAwesomeIcon icon={faHdd} className="text-xl" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">إدارة التخزين والأوفلاين</h3>
                        <p className="text-xs text-zinc-500">استعراض المساحة وحزم المحتوى المحفوظ أوفلاين</p>
                    </div>
                </div>
                <button
                    onClick={handleClearAllStorage}
                    className="text-xs text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/30 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                >
                    <FontAwesomeIcon icon={faTrash} />
                    مسح ذاكرة الكاش
                </button>
            </div>

            {/* مؤشر استخدام المساحة */}
            <div className="my-5 bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-xl">
                <div className="flex justify-between text-xs font-semibold mb-2">
                    <span className="text-zinc-600 dark:text-zinc-400">المساحة المستخدمة</span>
                    <span className="text-lime-600 font-bold">{storageInfo.usedMB} MB من أصل {storageInfo.totalMB} MB</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2.5 rounded-full overflow-hidden">
                    <div
                        className="bg-lime-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(2, storageInfo.percent)}%` }}
                    ></div>
                </div>
            </div>

            {/* حزم التنزيل */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">حزم التنزيل أوفلاين</h4>
                {PACKAGES.map((pkg) => {
                    const isDownloaded = packagesStatus[pkg.id];
                    const isLoading = downloadingPkg === pkg.id;

                    return (
                        <div
                            key={pkg.id}
                            className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-lime-500/30 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDownloaded ? "bg-lime-100 text-lime-600 dark:bg-lime-900/40" : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"}`}>
                                    <FontAwesomeIcon icon={isDownloaded ? faCheckCircle : faDatabase} />
                                </div>
                                <div>
                                    <h5 className="font-semibold text-sm text-zinc-900 dark:text-white">{pkg.title}</h5>
                                    <p className="text-xs text-zinc-500">{pkg.desc}</p>
                                </div>
                            </div>

                            <div>
                                {isLoading ? (
                                    <span className="text-xs text-lime-600 flex items-center gap-1.5">
                                        <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> جاري التحميل...
                                    </span>
                                ) : isDownloaded ? (
                                    <button
                                        onClick={() => handleRemovePackage(pkg.id)}
                                        className="text-xs text-zinc-400 hover:text-rose-600 px-2.5 py-1 rounded-md transition-colors"
                                    >
                                        إزالة الحزمة
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDownloadPackage(pkg)}
                                        className="text-xs bg-lime-600 hover:bg-lime-700 text-white font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                                    >
                                        <FontAwesomeIcon icon={faDownload} /> تنزيل
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
