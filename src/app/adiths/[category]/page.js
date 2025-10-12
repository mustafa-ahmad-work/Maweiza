import CategoryAdith from "@/components/Adith/CategoryAdith";
import Landing from "@/components/Layout/Landing";

export default async function _({ params }) {
    const category = params.category;

    return (
        <>
            {/* <Landing title="قسم الحديث" text="" /> */}
            <CategoryAdith category={category} />
        </>
    );
}
