import HadithComponent from "@/components/hadith/Hadith";
import Landing from "@/components/Layout/Landing";

export default async function AdithDetailPage({ params }) {
    const id = params.id;

    return (
        <>
            <Landing title="عرض الحديث" />
            <HadithComponent id={id} />
        </>
    );
}
