
"use client";

import Image from 'next/image'
import React from 'react'
import useSWR from "swr";

export default function Name() {
    const { data, error, isLoading } = useSWR("https://raw.githubusercontent.com/Alsarmad/Names_Of_Allah_Json/main/Names_Of_Allah.json");

    if (isLoading) {
        return (
            <>

                <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-200">جارٍ تحميل بيانات اسماء الله الحسني...</p>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="text-center py-8">
                    <p>حدث خطأ أثناء تحميل البيانات.</p>
                </div>
            </>
        );
    }

    return (
        <section className="py-10 relative">
            <Image
                width={100}
                height={100}
                src="/img.png"
                className="absolute w-32 top-16 left-0 -z-40"
                alt="img"
            />
            <div className="container gap-2 flex flex-col m-auto px-3 md:grid md:gap-3 md:grid-cols-2 lg:grid-cols-3">
                {data.map((item, key) => (
                    <span
                        key={key}
                        className="px-6 py-6 shadow-[0_0_15px_rgb(0_0_0_/_5%)] border border-gray-200 rounded-md bg-white dark:bg-gray-900 dark:border dark:border-gray-600"
                    >
                        <p className="pb-5 text-2xl block border-b mb-5 dark:border-gray-200">
                            {item.name}
                        </p>
                        <p className="text-xl">{item.text}</p>
                    </span>
                ))}
            </div>
            <Image
                width={100}
                height={100}
                src="/img.png"
                className="absolute bottom-10 right-0 rotate-180 -z-40"
                alt="img"
            />
        </section>
    )
}
