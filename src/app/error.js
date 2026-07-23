"use client";

import Link from "next/link";

export default function ErrorPage() {
    return (
        <>
            <section className="py-5">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="text-xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500 mb-10">
                            500
                        </h1>
                        <p className="text-lg tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white mb-5">
                            خطا خادم
                        </p>
                        <p className="font-light text-gray-500 dark:text-zinc-400 mb-2">
                            تواصل مع مطور الموقع اذا استمرت هذه المشكله
                        </p>
                        <Link
                            href="/"
                            className="inline-flex text-white bg-lime-600 hover:bg-lime-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2"
                        >
                            العوده الي الصفحه الرئيسيه
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
