import Image from "next/image";

import Landing from "@/components/Layout/Landing";
import Tafsir from "@/components/Tafsir/Tafsir";

export const metadata = {
    title: 'موقع موعظه | قسم تفسير القران الكريم',
    description: 'يحتوي هذا القسم علي تفسير القران بالكامل وعرض جميع معلومات السوره',
}

export default function _() {
    return (
        <>
            {/* <Landing title="قسم تفسير القران الكريم" text="يحتوي هذا القسم علي تفسير القران بالكامل وعرض جميع معلومات السوره" /> */}
            {/* <section className="pb-10 relative mt-20"> */}
                <Image
                    width={100} height={100}
                    src="/img.png"
                    className="absolute w-32 top-16 left-0 -z-40"
                    alt="img"
                />
                <Tafsir />
                <Image
                    width={100} height={100}
                    src="/img.png"
                    className="absolute bottom-10 right-0 rotate-180 -z-40"
                    alt="img"
                />
            {/* </section> */}
        </>
    );
}
