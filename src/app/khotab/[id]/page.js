import Landing from "@/components/Layout/Landing";
import { API } from "@/config/constants";
import KhotabClient from "@/components/content/KhotabClient";

export const metadata = {
    title: "موقع موعظه | الخطب ",
};

export default async function KhotabCategoryPage({ params }) {
    let khotab = [];
    let links = {};
    let hasError = false;

    try {
        const response = await fetch(API.islamhouse("khotab", params.id));
        if (!response.ok) {
            hasError = true;
        } else {
            const data = await response.json();
            khotab = data.data || [];
            links = data.links || {};
        }
    } catch (errors) {
        console.error("Error fetching khotab:", errors);
        hasError = true;
    }

    return (
        <>
            <Landing
                title="قسم الخطب"
                text="يحتوي هذا القسم علي اكثر من 280 خطبه نافعة"
            />
            <KhotabClient
                initialKhotab={khotab}
                links={links}
                pageId={params.id}
                hasError={hasError}
            />
        </>
    );
}
