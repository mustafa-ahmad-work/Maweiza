"use client";

import { useState } from "react";
import Landing from "@/components/Layout/Landing";
import QuizApp from "@/components/Quiz/QuizApp";
import data from "@/data/questions.json";

export default function QuizPage() {
    const [quizSettings, setQuizSettings] = useState({
        category: null,
        topic: null,
        difficulty: null,
    });

    const handleSelect = (type, value) => {
        setQuizSettings((prev) => ({ ...prev, [type]: value }));
    };

    const renderSelectionStep = () => {
        if (!quizSettings.category) {
            return (
                <div className="space-y-8">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-emerald-700 mb-2">اختر القسم</h2>
                        <p className="text-gray-600 dark:text-gray-300">اختر الفئة التي تريد الاختبار فيها</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data?.mainCategories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => handleSelect("category", category)}
                                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center ml-4">
                                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{category.id}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-emerald-800 dark:text-white">{category.arabicName}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{category.description}</p>
                                    <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                        <span>اختر الآن</span>
                                        {/* <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (!quizSettings.topic) {
            return (
                <div className="space-y-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-700 mb-2">اختر الموضوع</h2>
                            <p className="text-gray-600 dark:text-gray-300">اختر الموضوع الذي ترغب في الاختبار فيه</p>
                        </div>
                        <button
                            onClick={() => handleSelect("category", null)}
                            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                        >
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            العودة
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizSettings.category.topics.map((topic, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect("topic", topic)}
                                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                                <div className="p-6">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center ml-3">
                                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-emerald-800 dark:text-white">{topic.name}</h3>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        {Object.keys(topic.levelsData).length} مستويات متاحة
                                    </div>
                                    <div className="mt-4 flex items-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                                        <span>اختر الآن</span>
                                        {/* <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        if (!quizSettings.difficulty) {
            return (
                <div className="space-y-8">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-emerald-700 mb-2">اختر مستوى الصعوبة</h2>
                            <p className="text-gray-600 dark:text-gray-300">اختر المستوى المناسب لك</p>
                        </div>
                        <button
                            onClick={() => handleSelect("topic", null)}
                            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                        >
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            العودة
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.keys(quizSettings.topic.levelsData).map((levelKey, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelect("difficulty", levelKey)}
                                className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
                                <div className="p-6">
                                    <div className="flex items-center mb-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ml-3 ${
                                            levelKey === "level1" ? "bg-blue-100 dark:bg-blue-900/30" :
                                            levelKey === "level2" ? "bg-purple-100 dark:bg-purple-900/30" :
                                            "bg-red-100 dark:bg-red-900/30"
                                        }`}>
                                            {levelKey === "level1" ? (
                                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            ) : levelKey === "level2" ? (
                                                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                        </div>
                                        <h3 className={`text-lg font-bold ${
                                            levelKey === "level1" ? "text-blue-700 dark:text-blue-300" :
                                            levelKey === "level2" ? "text-purple-700 dark:text-purple-300" :
                                            "text-red-700 dark:text-red-300"
                                        }`}>
                                            {levelKey == "level1" && "المستوى الأول"}
                                            {levelKey == "level2" && "المستوى الثاني"}
                                            {levelKey == "level3" && "المستوى الثالث"}
                                        </h3>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {quizSettings.topic.levelsData[levelKey].length} سؤال
                                    </div>
                                    <div className="mt-4 flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform">
                                        <span className={
                                            levelKey === "level1" ? "text-blue-600 dark:text-blue-400" :
                                            levelKey === "level2" ? "text-purple-600 dark:text-purple-400" :
                                            "text-red-600 dark:text-red-400"
                                        }>
                                            ابدأ الاختبار
                                        </span>
                                        {/* <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        return <QuizApp quizSettings={quizSettings} />;
    };

    // Progress indicator
    const steps = [
        { id: 'category', name: 'القسم', completed: !!quizSettings.category },
        { id: 'topic', name: 'الموضوع', completed: !!quizSettings.topic },
        { id: 'difficulty', name: 'الصعوبة', completed: !!quizSettings.difficulty }
    ];

    return (
        <>
            <Landing title="أسئلة دينية" />
            <div className="container mx-auto px-4 py-10 max-w-6xl">
                <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
                    {/* Progress bar */}
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {quizSettings.difficulty ? "اكتملت جميع الخطوات" :
                                 quizSettings.topic ? "الخطوة 3 من 3" :
                                 quizSettings.category ? "الخطوة 2 من 3" : "الخطوة 1 من 3"}
                            </span>
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                {steps.filter(step => step.completed).length}/{steps.length}
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${(steps.filter(step => step.completed).length / steps.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="flex justify-between mt-4">
                            {steps.map((step, index) => (
                                <div
                                    key={step.id}
                                    className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                            step.completed
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                                        }`}
                                    >
                                        {step.completed ? (
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        ) : index + 1}
                                    </div>
                                    <span className={`mt-2 text-xs font-medium ${
                                        step.completed
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-gray-500 dark:text-gray-400'
                                    }`}>
                                        {step.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8">
                        {renderSelectionStep()}
                    </div>
                </div>
            </div>
        </>
    );
}
