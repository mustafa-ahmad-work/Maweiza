import { redirect } from "next/navigation";

export default async function _() {
    redirect("/videos/1");

    return (
        <section className="pt-52 pb-5">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        جاري الانتقال
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-zinc-400">
                        هذه الصفحه غير موجوده ويتم الانتقال الان الي الصفحه
                        الجديده
                    </p>
                </div>
            </div>
        </section>
    );
}
