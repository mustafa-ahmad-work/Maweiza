import Landing from "@/components/Layout/Landing";

import Name from "@/components/worship/NamesOfAllah";

export const metadata = {
    title: "موقع موعظه | اسماء الله الحسني ",
    description: "يحتوي هذا القسم علي اسماء الله الحسني ",
};

export default function NamesPage() {
    return (<>
        <Landing title="قسم اسماء الله الحسني" text="" />
        <Name />
    </>);
}
