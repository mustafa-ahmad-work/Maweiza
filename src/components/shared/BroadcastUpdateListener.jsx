"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function BroadcastUpdateListener() {
    useEffect(() => {
        if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;

        const channel = new BroadcastChannel("maweiza-sw-updates");

        channel.onmessage = (event) => {
            if (event.data && event.data.type === "CACHE_UPDATED") {
                toast.info("تم تحديث محتوى الصفحة في الخلفية 🔄", {
                    position: "bottom-left",
                    autoClose: 3500,
                });
            }
        };

        return () => {
            channel.close();
        };
    }, []);

    return null;
}
