"use client";

import React, { useState, useEffect } from "react";
import Landing from "@/components/Layout/Landing";
import { API } from "@/config/constants";
import AudiosClient from "@/components/content/AudiosClient";

export default function NestedAudiosPage({ params }) {
    const [audios, setAudios] = useState([]);
    const [links, setLinks] = useState({});
    const [loading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchAudios = async () => {
            setLoading(true);
            setHasError(false);
            try {
                const response = await fetch(API.islamhouse("audios", params.id || "1"));
                if (!response.ok) {
                    setHasError(true);
                } else {
                    const data = await response.json();
                    setAudios(data.data || []);
                    setLinks(data.links || {});
                }
            } catch (err) {
                console.error("Error fetching nested audios:", err);
                setHasError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchAudios();
    }, [params.id]);

    return (
        <>
            <Landing
                title="قائمة المحاضرات والسلاسل الصوتية"
                text="استمع وحمل المحاضرات والتلاوات المتوفرة بالكامل"
            />
            {loading ? (
                <div className="min-h-[400px] flex items-center justify-center py-12">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#449C40] mx-auto"></div>
                        <p className="mt-4 text-sm font-medium text-gray-700 dark:text-zinc-300">جارٍ تحميل الصوتيات والسلاسل...</p>
                    </div>
                </div>
            ) : (
                <AudiosClient
                    initialAudios={audios}
                    links={links}
                    pageId={params.id}
                    hasError={hasError}
                />
            )}
        </>
    );
}
