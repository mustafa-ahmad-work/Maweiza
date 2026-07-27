import Landing from "@/components/Layout/Landing";
import { API } from "@/config/constants";
import AudiosClient from "@/components/content/AudiosClient";

export const metadata = {
    title: "موقع موعظه | الصوتيات ",
};

export default async function AudiosCategoryPage({ params }) {
    let audios = [];
    let links = {};
    let hasError = false;

    try {
        const response = await fetch(API.islamhouse("audios", params.id));
        if (!response.ok) {
            hasError = true;
        } else {
            const data = await response.json();
            audios = data.data || [];
            links = data.links || {};
        }
    } catch (errors) {
        console.error("Error fetching audios:", errors);
        hasError = true;
    }

    return (
        <>
            <Landing
                title="قسم الصوتيات الإسلامية"
                text="استمع وحمل المحاضرات والتلاوات والتسجيلات الصوتية النافعة"
            />
            <AudiosClient
                initialAudios={audios}
                links={links}
                pageId={params.id}
                hasError={hasError}
            />
        </>
    );
}
