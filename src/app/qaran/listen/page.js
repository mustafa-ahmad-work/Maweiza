import Image from "next/image";

import Landing from "@/components/Layout/Landing";

import Reciters from "@/components/Qaran/Reciters";

export default async function _() {
    return (
        <>
            {/* <Landing title="قسم الاستماع لتلاوه القران الكريم" text="اذا كنت تريد الاستماع الي قراة القران الكريم فانت في المكان المناسب يحتوي هذا القسم علي عدد كثير من الشيوخ اختر الشيخ الذي تريد الاستماع لتلاوته استخدم البحث لتوفير الوقت" /> */}
            {/* <section className="py-10 relative"> */}

                {/* <Image
                    width={100}
                    height={100}
                    src="/img.png"
                    className="absolute w-32 top-16 left-0 -z-40"
                    alt="img"
                /> */}
                <Reciters type={"listen"} />
                {/* <Image
                    width={100}
                    height={100}
                    src="/img.png"
                    className="absolute bottom-10 right-0 rotate-180 -z-40"
                    alt="img"
                /> */}
            {/* </section> */}
        </>
    );
}
