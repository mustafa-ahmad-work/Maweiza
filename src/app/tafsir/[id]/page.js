import Landing from "@/components/Layout/Landing";
import TafsirAyahs from "@/components/Tafsir/TafsirAyahs";

export default async function _({ params }) {
    return (
        <>
            {/* <Landing title="تفسير سوره" text="" /> */}
            <TafsirAyahs id={params.id} />
        </>
    );
}
