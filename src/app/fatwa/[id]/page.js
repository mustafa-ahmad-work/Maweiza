import Landing from "@/components/Layout/Landing";
import { API } from "@/config/constants";
import FatwaClient from "@/components/content/FatwaClient";

export const metadata = {
    title: "موقع موعظه | الفتاوي ",
};

export default async function page({ params }) {
    let fatwa = [];
    let links = {};
    let hasError = false;

    try {
        const response = await fetch(API.islamhouse("fatwa", params.id));
        if (!response.ok) {
            hasError = true;
        } else {
            const data = await response.json();
            fatwa = data.data || [];
            links = data.links || {};
        }
    } catch (errors) {
        console.error("Error fetching fatwa:", errors);
        hasError = true;
    }

    return (
        <>
            <Landing
                title="قسم الفتاوي"
                text="يحتوي هذا القسم علي اكثر من 1850 فتوي نافعة"
            />
            <FatwaClient
                initialFatwa={fatwa}
                links={links}
                pageId={params.id}
                hasError={hasError}
            />
        </>
    );
}
