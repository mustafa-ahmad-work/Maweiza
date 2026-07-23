import CategoryHadith from "@/components/hadith/CategoryHadith";
import Landing from "@/components/Layout/Landing";

export default async function AdithCategoryPage({ params }) {
    const category = params.category;

    return (
        <>
            {/* <Landing title="قسم الحديث" text="" /> */}
            <CategoryHadith category={category} />
        </>
    );
}
