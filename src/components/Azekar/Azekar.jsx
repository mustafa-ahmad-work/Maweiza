"use client";

import { useState } from "react";


import { faArrowRightRotate, faBookOpen, faPlus, faShare, faCopy, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { motion, AnimatePresence } from "framer-motion";

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from "../Layout/Landing";
import azekar from "@/data/azekar.json";
import Image from "next/image";

export default function Azekar() {
    const [counts, setCounts] = useState(Array(azekar[0].array.length).fill(0));
    const [expanded, setExpanded] = useState(Array(azekar[0].array.length).fill(false));

    const incrementCount = (index) => {
        const newCounts = [...counts];
        newCounts[index]++;
        setCounts(newCounts);
    };

    const resetCount = (index) => {
        const newCounts = [...counts];
        newCounts[index] = 0;
        setCounts(newCounts);
    };

    const toggleExpanded = (index) => {
        const newExpanded = [...expanded];
        newExpanded[index] = !newExpanded[index];
        setExpanded(newExpanded);
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => toast.success('تم النسخ بنجاح'))
            .catch(err => toast.error('حدث خطأ أثناء النسخ'));
    };

    const handleShare = (text) => {
        if (navigator.share) {
            navigator.share({
                title: "مشاركة",
                text: text,
                url: window.location.href,
            })
                .then(() => toast.success('تمت المشاركة بنجاح'))
                .catch(err => toast.error('حدث خطأ أثناء المشاركة'));
        } else {
            toast.error('المشاركة غير مدعومة على هذا المتصفح');
        }
    };

    const showData = azekar[0].array.map((item, index) => (
        <div key={index} className="relative px-6 py-6 mb-3 shadow-[0_0_15px_rgb(0_0_0_/_5%)] border border-gray-200 rounded-md bg-white dark:bg-gray-900 dark:border dark:border-gray-600 flex flex-col justify-between items-center">
            <p className={expanded[index] ? "" : "line-clamp-3"}>
                {item.text}
            </p>
            <div className="flex justify-between gap-2 mt-3 w-full">
                <div className="whitespace-nowrap bg-gray-600 text-white p-2 rounded-xl">
                    <span className="font-sans ml-1">{item.count}</span>
                    مرات
                </div>
                <div className="w-full whitespace-nowrap bg-gray-600 text-white rounded-xl flex justify-between items-center">
                    <span onClick={() => incrementCount(index)} className="p-3 bg-lime-600 flex cursor-pointer items-center rounded-xl">
                        <FontAwesomeIcon className="text-ml" icon={faPlus} />
                    </span>

                    <span className="font-sans text-xl">{counts[index]}</span>

                    <span onClick={() => resetCount(index)} className="p-3 bg-lime-600 flex cursor-pointer items-center rounded-xl">
                        <FontAwesomeIcon className="text-ml" icon={faArrowRightRotate} />
                    </span>
                </div>
                <div
                    onClick={() => toggleExpanded(index)}
                    className="p-3 bg-lime-600 flex items-center cursor-pointer rounded-xl text-white">
                    <FontAwesomeIcon icon={expanded[index] ? faBook : faBookOpen} />
                </div>
            </div>
            <AnimatePresence>
                {counts[index] >= item.count && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black bg-opacity-75 p-6 rounded-md gap-4 flex justify-center flex-col items-center"
                    >

                        <span className="w-full text-white text-center">
                            ممتاز انتهيت من عدد المرات هنيئا لك استمر
                        </span>
                        <div className=" flex justify-center gap-4 items-center">
                            <button
                                onClick={() => handleShare(item.text)}
                                className="p-3 bg-blue-500 text-white rounded-md flex items-center">
                                <FontAwesomeIcon icon={faShare} className="ml-2" />
                                مشاركة
                            </button>
                            <button
                                onClick={() => handleCopy(item.text)}
                                className="p-3 bg-emerald-500 text-white rounded-md flex items-center">
                                <FontAwesomeIcon icon={faCopy} className="ml-2" />
                                نسخ
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    ));

    return (
        <>
            <Landing title="اذكار الصباح والمساء" text="اذكار الصباح والمساء مع عداد التكرار استخدم ايقونه الكتاب لعرض النص بالكامل" />
            <div className="container m-auto gap-5 mt-4 flex flex-col px-3 md:grid md:gap-3 md:grid-cols-2 lg:grid-cols-3">
                {showData}
                <ToastContainer />
            </div>
            <Image
                width={100}
                height={100}
                src="/img.png"
                className="absolute w-32 bottom-0 rotate-180 right-0 -z-40"
                alt="img"
            />
        </>
    );
}
