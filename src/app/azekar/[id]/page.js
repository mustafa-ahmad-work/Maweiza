"use client";

import Landing from "@/components/Layout/Landing";
import { motion } from "framer-motion";
import azekar from "@/data/azekar.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPray, faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function AzkarPage({ params }) {
    const id = params.id;

    const dataAzekar = azekar[id - 1];
    const dataAzekarArray = dataAzekar.array;

    return (
        <>
            {/* رأس الصفحة */}
            <Landing title={dataAzekar.category} text="مجموعة من الأذكار والأدعية المأثورة" />

            {/* قسم الأذكار */}
            <section className="py-10 relative px-6 min-h-screen">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col gap-6">
                        {dataAzekarArray.map((azkar, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                {/* خلفية زخرفية خفيفة */}
                                <div className="absolute inset-0 opacity-[0.05] bg-[url('/patterns/islamic-pattern.svg')] bg-center bg-cover rounded-2xl pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                                            <FontAwesomeIcon icon={faPray} />
                                            <span className="font-semibold text-sm">
                                                الذكر رقم {index + 1}
                                            </span>
                                        </div>
                                        <FontAwesomeIcon
                                            icon={faLeaf}
                                            className="text-lime-500 dark:text-lime-400"
                                        />
                                    </div>

                                    <p className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed text-justify">
                                        {azkar.text}
                                    </p>

                                    {/* خط زخرفي سفلي */}
                                    <div className="mt-4 h-1 w-1/3 bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
