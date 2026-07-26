import Link from "next/link";

export default function offline() {
    return (
        <section className="pt-8 sm:pt-16 pb-5">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <p className="mb-4 text-2xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                        لا يتوفر اتصال انترنت
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-zinc-400">
                        يبدو انك غير متصل بالانترنت تحقق من الاتصال واعد
                        المحاوله
                    </p>
                    <Link
                        href="/"
                        className="inline-flex text-white bg-lime-600 hover:bg-lime-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4">
                        رجوع
                    </Link>
                </div>
            </div>
        </section>
    );
}
