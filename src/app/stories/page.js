import Stories from "@/components/content/Stories";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function StoriesPage() {
    return (
        <section className="py-10">
            <div className="px-4 mx-auto max-w-screen-xl">
                <div className="mx-auto max-w-screen-sm text-center">
                    <FontAwesomeIcon
                        className="text-gray-500 text-4xl mb-3 dark:text-zinc-400"
                        icon={faPenRuler}
                    />
                    <h1 className="text-3xl text-primary-600 dark:text-primary-500 mb-3 ">
                        جاري العمل علي هذا القسم
                    </h1>
                    <p className="mb-3 text-lg font-light text-gray-500 dark:text-zinc-400">
                        هذا القسم لم يتم الانتهاء منه بعد وسيتم الانتهاء منه
                        وفتحه قريبا
                    </p>
                    <Link
                        href="/"
                        className="inline-flex text-white bg-lime-600 hover:bg-lime-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        العوده الي الصفحه الرئيسيه
                    </Link>
                </div>
            </div>
        </section>
        // <>
        //     <Stories />
        // </>
    );
}
