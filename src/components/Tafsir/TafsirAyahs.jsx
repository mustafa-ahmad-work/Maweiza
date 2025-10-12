"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";

export default function TafsirAyahs({ id }) {
    const { data: surahData, error: surahError } = useSWR(`https://api.alquran.cloud/v1/surah/${id}`);
    const { data: tafsirData, error: tafsirError } = useSWR(`https://quranenc.com/api/v1/translation/sura/arabic_moyassar/${id}`);
    const { data: albitaqatData, error: albitaqatError } = useSWR(
        `https://raw.githubusercontent.com/Alsarmad/albitaqat_quran/main/albitaqat.json`
    );
    const [selectedAyah, setSelectedAyah] = useState(null);

    // إغلاق المودال عند الضغط على زر ESC
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setSelectedAyah(null);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    if (surahError || tafsirError || albitaqatError)
        return (
            <div className="text-center py-16">
                <p className="text-red-600 dark:text-red-400 font-medium text-lg">
                    حدث خطأ أثناء تحميل البيانات.
                </p>
            </div>
        );

    if (!surahData || !tafsirData || !albitaqatData)
        return (
            <div className="text-center pt-40 pb-40 py-16 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">جارٍ تحميل بيانات التفسير...</p>
            </div>
        );

    const albitaqat = albitaqatData[id - 1] || {};

    return (
        <section className="relative pt-28 py-16 px-4 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            {/* خلفية زخرفية */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[url('/patterns/islamic.svg')] bg-repeat"></div>

            {/* زخرفة إضافية */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-20 dark:bg-green-900"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-20 dark:bg-teal-900"></div>

            <div className="container mx-auto relative max-w-6xl">
                {/* عنوان السورة */}
                <div
                    className="text-center mb-10"
                >
                    <div className="inline-block px-6 py-3 rounded-full mb-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500">
                            معلومات عن السورة
                        </h2>
                    </div>
                </div>

                {/* بيانات البطاقة */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                    {[
                        { label: "آيَاتُها", value: albitaqat.ayaatiha },
                        { label: "مَعنَى اسْمِها", value: albitaqat.maeni_asamuha },
                        { label: "سَبَبُ تَسْمِيَتِها", value: albitaqat.sabab_tasmiatiha },
                        { label: "أَسْمَاؤُهـا", value: albitaqat.asmawuha },
                        { label: "مَقْصِدُها العَامُّ", value: albitaqat.maqsiduha_aleamu },
                        { label: "سَبَبُ نُزُولِهَا", value: albitaqat.sabab_nuzuliha },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900 border border-green-100 dark:border-gray-700 transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
                            <h3 className="text-green-600 dark:text-green-500 font-semibold mb-2 flex items-center">
                                <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2"></span>
                                {item.label}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                {item.value || "غير متوفر"}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* عنوان التفسير */}
                <div
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-500">
                        التفسير
                    </h2>
                </div>

                {/* ملاحظة للمستخدم */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-4 py-2 rounded-lg">
                        <p className="text-amber-700 dark:text-amber-300 text-lg">
                            اضغط على أي آية لعرض تفسيرها
                        </p>
                    </div>
                </motion.div>

                {/* عرض الآيات جنب بعض زي المصحف */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    dir="rtl"
                    className="text-right bg-gradient-to-r from-white/70 to-green-50/70 dark:from-gray-800/70 dark:to-gray-900/70 p-10 rounded-3xl shadow-xl border border-green-100 dark:border-gray-700 backdrop-blur-sm leading-loose md:leading-relaxed text-3xl md:text-4xl font-quran text-gray-900 dark:text-white"
                >
                    <p className="whitespace-normal break-words leading-[4rem] md:leading-[5rem] tracking-wide">
                        {tafsirData.result?.map((aya, index) => (
                            <motion.span
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedAyah(aya)}
                                className="cursor-pointer select-none transition-all font-quran !text-gray-900 dark:!text-gray-100 hover:!text-emerald-600 dark:hover:!text-emerald-400"
                            >
                                {aya.arabic_text}
                                <span
                                    className="inline-flex items-center font-cairo justify-center mx-2 text-base md:text-lg font-quran font-bold
                                !text-emerald-800 dark:!text-emerald-400
                                !border-2 !border-emerald-600 dark:!border-emerald-500
                                !rounded-full min-w-[2.7rem] min-h-[2.7rem] px-2 py-1
                                !bg-emerald-50 dark:!bg-emerald-900/40
                                !shadow-md dark:!shadow-emerald-950/30
                                relative
                                after:content-['۝'] after:absolute after:inset-0 after:flex after:items-center after:justify-center
                                after:!text-emerald-700 dark:after:!text-emerald-600 after:!opacity-15"
                                >
                                    <span className="relative z-10">{aya.aya}</span>
                                </span>{" "}
                            </motion.span>
                        ))}
                    </p>

                </motion.div>


                {/* مودال التفسير */}
                <AnimatePresence>
                    {selectedAyah && (
                        <>
                            {/* خلفية شفافة */}
                            <motion.div
                                className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedAyah(null)}
                            />

                            {/* المودال */}
                            <motion.div
                                className="fixed inset-0 flex items-center justify-center z-50 p-4"
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div
                                    className="bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl max-w-3xl w-full p-16 border border-green-200 dark:border-gray-700 relative overflow-hidden"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* زخرفة داخل المودال */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full filter blur-3xl opacity-30 dark:bg-green-900"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-200 rounded-full filter blur-3xl opacity-30 dark:bg-teal-900"></div>

                                    <button
                                        onClick={() => setSelectedAyah(null)}
                                        className="absolute top-4 left-4 text-gray-500 hover:text-green-600 dark:hover:text-green-500 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-all z-10"
                                        aria-label="إغلاق"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="relative z-10">
                                        <h3 className="text-xl md:text-2xl font-quran !leading-[70px] text-right text-gray-900 dark:text-white mb-8 p-6 bg-green-100/50 dark:bg-green-900/30 rounded-2xl border border-green-200 dark:border-green-800/50">
                                            {selectedAyah.arabic_text}
                                            <span
                                                className="inline-flex items-center justify-center mx-2 text-base md:text-lg font-cairo font-bold text-emerald-700 dark:text-emerald-400
                                                    border-2 border-emerald-500 dark:border-emerald-600
                                                    rounded-full min-w-[2.5rem] min-h-[2.5rem] px-2 py-1
                                                    bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-950
                                                    shadow-inner shadow-emerald-200 dark:shadow-emerald-900
                                                    relative after:content-['۝'] after:absolute after:inset-0 after:flex after:items-center after:justify-center after:text-emerald-500 dark:after:text-emerald-700 after:opacity-20"
                                            >
                                                {selectedAyah.aya}
                                            </span>
                                        </h3>
                                        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed bg-white/50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
                                            {selectedAyah.translation}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
