"use client";

import React from 'react';
import useSWR from 'swr';
import { motion } from 'framer-motion';

export default function Adith({ id }) {
    const { data, error, isLoading } = useSWR(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${id}`);

    if (isLoading) {
        return (
            <section className="py-16 px-4 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
                    <p className="mt-6 text-gray-600 dark:text-gray-200 text-lg">جارٍ تحميل بيانات الحديث...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16 px-4 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">حدث خطأ</h3>
                    <p className="text-gray-600 dark:text-gray-300">حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16 px-4 min-h-screen">
            {/* خلفية زخرفية */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[url('/patterns/islamic.svg')] bg-repeat"></div>

            {/* زخرفة إضافية */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200 rounded-full filter blur-3xl opacity-20 dark:bg-emerald-900"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200 rounded-full filter blur-3xl opacity-20 dark:bg-teal-900"></div>

            <div className="container mx-auto relative max-w-4xl">
                {/* بطاقة معلومات الحديث */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-emerald-100 dark:border-gray-700"
                >
                    <div className="p-6 md:p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                            <div className="flex items-center">
                                {/* <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center ml-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                    </svg>
                                </div> */}
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">الإسناد</span>
                                    <div className="text-lg font-semibold text-gray-800 dark:text-white">{data.attribution}</div>
                                </div>
                            </div>

                            <div className="flex items-center">
                                {/* <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center ml-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div> */}
                                <div>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">الدرجة</span>
                                    <div className="text-lg font-semibold text-gray-800 dark:text-white">{data.grade}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* بطاقة نص الحديث */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-gradient-to-r from-emerald-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-emerald-100 dark:border-gray-700 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full filter blur-3xl opacity-30 dark:bg-emerald-900"></div>

                    <div className="relative z-10">
                        <div className="flex items-center mb-4">
                            {/* <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center ml-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div> */}
                            <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400">نص الحديث</h3>
                        </div>

                        <div className="text-xl md:text-2xl text-gray-800 dark:text-white leading-relaxed bg-white/70 dark:bg-gray-800/50 p-6 rounded-xl border border-emerald-100 dark:border-gray-700">
                            {data.hadeeth}
                        </div>
                    </div>
                </motion.div>

                {/* بطاقة التوضيح */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-emerald-100 dark:border-gray-700"
                >
                    <div className="flex items-center mb-4">
                        {/* <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </div> */}
                        <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">التوضيح</h3>
                    </div>

                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed bg-amber-50/50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-100 dark:border-amber-900/20">
                        {data.explanation}
                    </div>
                </motion.div>

                {/* بطاقة ما يرشد إليه الحديث */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 border border-emerald-100 dark:border-gray-700"
                >
                    <div className="flex items-center mb-4">
                        {/* <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                        </div> */}
                        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">ما يرشد إليه الحديث</h3>
                    </div>

                    <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20">
                        <ol className="space-y-3">
                            {data.hints.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm ml-3 flex-shrink-0">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </motion.div>

                {/* بطاقة المراجع */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 border border-emerald-100 dark:border-gray-700"
                >
                    <div className="flex items-center mb-4">
                        {/* <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center ml-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                            </svg>
                        </div> */}
                        <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">المراجع</h3>
                    </div>

                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed bg-purple-50/50 dark:bg-purple-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-900/20">
                        {data.reference}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
