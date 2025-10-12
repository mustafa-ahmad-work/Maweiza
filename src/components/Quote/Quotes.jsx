"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import quotesAll from "@/data/quotesAll.json";
import Search from "../Layout/Search";
import { optimizeString } from "@/helpers/optimizeString";

export default function Quotes() {
    const [famousAuthors, setFamousAuthors] = useState([]);
    const [normalAuthors, setNormalAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [noResults, setNoResults] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // تقسيم المؤلفين عند تحميل المكون
        const famous = [];
        const normal = [];

        quotesAll.authors.forEach(author => {
            const isFamous = author.isFamous;

            if (isFamous) {
                famous.push(author);
            } else {
                normal.push(author);
            }
        });

        setFamousAuthors(famous);
        setNormalAuthors(normal);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        // تصفية النتائج عند تغيير مصطلح البحث
        if (searchTerm.trim() === "") {
            // إعادة تعيين القوائم الأصلية عند مسح البحث
            const famous = [];
            const normal = [];

            quotesAll.authors.forEach(author => {
                const isFamous = author.isFamous;

                if (isFamous) {
                    famous.push(author);
                } else {
                    normal.push(author);
                }
            });

            setFamousAuthors(famous);
            setNormalAuthors(normal);
            setNoResults(false);
            return;
        }

        const searchValue = optimizeString(searchTerm);

        const filteredFamous = quotesAll.authors.filter(author =>
            author.isFamous && optimizeString(author.author).includes(searchValue)
        );

        const filteredNormal = quotesAll.authors.filter(author =>
            !author.isFamous && optimizeString(author.author).includes(searchValue)
        );

        setFamousAuthors(filteredFamous);
        setNormalAuthors(filteredNormal);
        setNoResults(filteredFamous.length === 0 && filteredNormal.length === 0);
    }, [searchTerm]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const AuthorCard = ({ author, authorId, isFamous = false }) => (
        <Link
            href={`/quotes/${authorId}`}
            className={`group relative overflow-hidden rounded-xl border p-4 transition-all duration-300 hover:shadow-lg hover:border-transparent hover:scale-[1.02] active:scale-[0.98] ${
                isFamous
                    ? 'border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
        >
            <div className="flex flex-row gap-5 text-xl items-center">
                <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                    isFamous ? 'bg-amber-500' : 'bg-gray-400'
                }`}></div>
                <p className="font-medium">{author}</p>
            </div>
            <div className={`absolute bottom-0 left-0 w-full h-1 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${
                isFamous
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                    : 'bg-gradient-to-r from-emerald-500 to-lime-400'
            }`}></div>
        </Link>
    );

    if (isLoading) {
        return (
            <div className="container m-auto py-12 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">جاري تحميل البيانات...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 pt-28">
            <div className="container m-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        مكتبة الاقتباسات الإسلامية
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        اكتشف مجموعة واسعة من الاقتباسات والفتاوى من علماء ودعاة مسلمين مشهورين وناشئين
                    </p>
                </div>

                <div className="max-w-xl mx-auto mb-10">
                    <Search
                        handleChange={handleSearchChange}
                        placeholder="ابحث عن عالم أو داعية..."
                    />
                </div>

                {noResults ? (
                    <div className="container m-auto py-12 text-center">
                        <div className="text-gray-400 dark:text-gray-500 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">لا توجد نتائج</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            حاول البحث باسم آخر أو تحقق من تهجئة الكلمات
                        </p>
                    </div>
                ) : (
                    <>
                        {/* قسم المشايخ الكبار والعملاء */}
                        {famousAuthors.length > 0 && (
                            <section className="mb-16">
                                <div className="flex items-center mb-6">
                                    <div className="h-px bg-amber-300 dark:bg-amber-700 flex-grow"></div>
                                    <h2 className="px-4 text-2xl font-bold text-amber-700 dark:text-amber-400">
                                        المشايخ الكبار
                                    </h2>
                                    <div className="h-px bg-amber-300 dark:bg-amber-700 flex-grow"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {famousAuthors.map((author) => (
                                        <AuthorCard
                                            key={author.authorId}
                                            author={author.author}
                                            authorId={author.authorId}
                                            isFamous={true}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* قسم الناس العاديين والناشئين */}
                        {normalAuthors.length > 0 && (
                            <section>
                                <div className="flex items-center mb-6">
                                    <div className="h-px bg-emerald-300 dark:bg-emerald-700 flex-grow"></div>
                                    <h2 className="px-4 text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                                        دعاة ناشئون
                                    </h2>
                                    <div className="h-px bg-emerald-300 dark:bg-emerald-700 flex-grow"></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {normalAuthors.map((author) => (
                                        <AuthorCard
                                            key={author.authorId}
                                            author={author.author}
                                            authorId={author.authorId}
                                            isFamous={false}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
