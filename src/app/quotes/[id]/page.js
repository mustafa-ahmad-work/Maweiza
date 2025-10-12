"use client";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faShare, faBookmark } from "@fortawesome/free-solid-svg-icons";

import Landing from "@/components/Layout/Landing";
import quotesAll from "@/data/quotesAll.json";
import { useState } from "react";

export default function AuthorQuotes({ params }) {
    const id = params.id;
    const [savedQuotes, setSavedQuotes] = useState([]);

    const filterData = quotesAll.result.filter((item) => item.authorId === Number(id));
    const author = quotesAll.authors.filter((item) => item.authorId === Number(id))[0]?.author || "مؤلف غير معروف";

    function copyText(text) {
        navigator.clipboard.writeText(text);
        toast.success("تم نسخ الاقتباس بنجاح", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    }

    function shareText(text) {
        if (navigator.share) {
            navigator.share({
                title: "اقتباس إسلامي",
                text: text,
                url: window.location.href,
            });
        } else {
            copyText(text);
            toast.info("تم نسخ الاقتباس للمشاركة", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
    }

    function saveQuote(quoteId) {
        if (savedQuotes.includes(quoteId)) {
            setSavedQuotes(savedQuotes.filter(id => id !== quoteId));
            toast.info("تم إزالة الاقتباس من المحفوظات", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        } else {
            setSavedQuotes([...savedQuotes, quoteId]);
            toast.success("تم حفظ الاقتباس بنجاح", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
    }

    const showData = filterData.map((item, index) => (
        <div
            key={index}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl mb-6 transform hover:-translate-y-1">
            {/* Decorative top border */}
            <div className="h-1 bg-gradient-to-r border-emerald-500 to-teal-400"></div>

            <div className="p-6 md:p-8">
                <div className="flex justify-center mb-5">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r border-emerald-400 to-teal-500 rounded-full opacity-70"></div>
                        <div className="relative bg-white dark:bg-gray-800 rounded-full p-3">
                            <svg
                                className="w-10 h-10 text-emerald-500"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 14">
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <blockquote className="text-center">
                    <p className="text-xl md:text-2xl leading-relaxed font-medium text-gray-800 dark:text-gray-200 mb-6">
                        {item.text}
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-16"></div>
                        <cite className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 not-italic">
                            {item.author}
                        </cite>
                        <div className="h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent w-16"></div>
                    </div>
                </blockquote>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 flex justify-center items-center gap-4">
                <button
                    onClick={() => copyText(`"${item.text}" - ${item.author}`)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                    aria-label="نسخ الاقتباس">
                    <FontAwesomeIcon icon={faCopy} className="text-lg" />
                </button>
                <button
                    onClick={() => shareText(`"${item.text}" - ${item.author}`)}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
                    aria-label="مشاركة الاقتباس">
                    <FontAwesomeIcon icon={faShare} className="text-lg" />
                </button>
                <button
                    onClick={() => saveQuote(item.id)}
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 ${savedQuotes.includes(item.id) ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'} border border-emerald-200 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50`}
                    aria-label="حفظ الاقتباس">
                    <FontAwesomeIcon icon={faBookmark} className={`text-lg ${savedQuotes.includes(item.id) ? 'fill-current' : ''}`} />
                </button>
            </div>
        </div>
    ));

    return (
        <>
            {/* <Landing
                title={author}
                text={`حكم وأقوال ${author} الخالدة`}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800"
            /> */}
            <ToastContainer
                theme="colored"
                toastClassName="rounded-xl shadow-lg"
                bodyClassName="font-medium"
            />
            <section className="py-12 relative mt-20 px-4 bg-gradient-to-b from-emerald-50/50 to-white dark:from-gray-900/50 dark:to-gray-900">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                            حكمة {author}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            مجموعة من أقوال {author} المأثورة التي تحمل في طياتها الحكمة والمعرفة
                        </p>
                    </div>

                    {filterData.length > 0 ? (
                        <div className="space-y-6">
                            {showData}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">لا توجد اقتباسات</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                لم نتمكن من العثور على اقتباسات لهذا المؤلف
                            </p>
                        </div>
                    )}

                    <div className="mt-12 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            عدد الاقتباسات: {filterData.length}
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}
