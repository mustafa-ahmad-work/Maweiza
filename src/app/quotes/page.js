import Image from "next/image";

import Landing from "@/components/Layout/Landing";
import Quotes from "@/components/Quote/Quotes";

export const metadata = {
    title: "موقع موعظه | قسم الاقتباسات",
    description: "يحتوي هذا القسم علي اقتباسات للائمه والعلماء",
};

export default function _() {
    return (
        <>
            {/* <Landing title="قسم الاقتباسات الأسلامية" text="يحتوي هذا القسم علي اجمل الاقتباسات المقتبسه من اقوال الائمه والعلماء" /> */}
            {/* <section className="pb-10 relative px-4"> */}
                {/* <Image width={100} height={100} src="/img.png" className="absolute w-32 top-16 left-0 -z-40" alt="img" /> */}
                <Quotes />
                {/* <Image width={100} height={100} src="/img.png" className="absolute w-32 bottom-0 rotate-180 right-0 -z-40" alt="img" */}
                {/* /> */}
            {/* </section> */}
        </>
    );
}
