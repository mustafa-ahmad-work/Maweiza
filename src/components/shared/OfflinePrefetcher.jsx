"use client";

import { useEffect } from "react";
import { OfflineRepository } from "@/lib/offline/offlineRepository";

const STAGE_2_ROUTES = [
    "/qaran",
    "/azekar",
    "/salah",
    "/tasbih",
    "/calendar",
];

const STAGE_3_ROUTES = [
    "/books",
    "/stories",
    "/videos",
    "/articles",
    "/children",
    "/names",
    "/list-ramadan",
    "/application",
    "/search",
];

export default function OfflinePrefetcher() {
    useEffect(() => {
        if (typeof window === "undefined" || !("navigator" in window)) {
            return;
        }

        // التسجيل الصريح للـ Service Worker لضمان تفعيله فوراً
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((reg) => {
                    console.log("[SW] Service Worker registered with scope:", reg.scope);
                })
                .catch((err) => {
                    console.error("[SW] Service Worker registration error:", err);
                });
        }

        if (!navigator.onLine) return;

        // فحص وضع توفير البيانات أو الاتصال الضعيف
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection && (connection.saveData || connection.effectiveType === "2g" || connection.effectiveType === "slow-2g")) {
            console.log("[OfflinePrefetcher] Skipping background prefetch due to Data Saver or 2G connection.");
            return;
        }

        const prefetchUrls = async (urls) => {
            if (document.visibilityState !== "visible") return;

            // فحص التخزين المتاح Quota Check
            if (navigator.storage && navigator.storage.estimate) {
                try {
                    const { quota, usage } = await navigator.storage.estimate();
                    const available = quota - usage;
                    // إذا المتبقي أقل من 30 ميجابايت تتوقف العملية
                    if (available < 30 * 1024 * 1024) {
                        console.warn("[OfflinePrefetcher] Storage quota low, pausing prefetch.");
                        return;
                    }
                } catch (e) {
                    // تجاهل خطأ التقدير
                }
            }

            // إرسال طلبات fetch حقيقية لتخزين البيانات داخل SW Cache Storage
            for (const url of urls) {
                try {
                    fetch(url, { credentials: "same-origin", cache: "reload" }).catch(() => {});
                } catch (err) {
                    // ignore
                }
            }

            // إرسال قائمة المسارات إلى Service Worker
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: "PREFETCH_URLS",
                    urls: urls,
                });
            }
        };

        // المرحلة الأولى: سريعة وفورية (الصفحة الرئيسية)
        prefetchUrls(["/"]);

        // المرحلة الثانية: بعد ثانيتين (الأقسام الرئيسية الأكثر تصفحاً)
        const timer2 = setTimeout(() => {
            prefetchUrls(STAGE_2_ROUTES);
        }, 2000);

        // المرحلة الثالثة: عند خمول الجهاز requestIdleCallback (الأقسام الثانوية)
        let idleCallbackId = null;
        const startStage3 = () => {
            prefetchUrls(STAGE_3_ROUTES);
        };

        const timer3 = setTimeout(() => {
            if ("requestIdleCallback" in window) {
                idleCallbackId = window.requestIdleCallback(startStage3, { timeout: 10000 });
            } else {
                startStage3();
            }
        }, 6000);

        return () => {
            clearTimeout(timer2);
            clearTimeout(timer3);
            if (idleCallbackId && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleCallbackId);
            }
        };
    }, []);

    return null; // مكون يعمل في الخلفية دون واجهة مرئية
}
