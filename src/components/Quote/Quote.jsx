"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faRefresh, faShare } from "@fortawesome/free-solid-svg-icons";

import quotesAll from "@/data/quotesAll.json";

export default function Quote() {
    const [quoteData, setQuote] = useState([]);
    const [refreshData, setRefreshData] = useState(false);

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function copyText(text) {
        navigator.clipboard.writeText(text);
        toast.success("تم نسخ الاقتباسة", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    function refreshText() {
        setRefreshData(!refreshData);
    }

    function shareText(text) {
        navigator.share({
            title: "",
            text: text,
            url: window.location.href,
        });
    }

    useEffect(() => {
        setQuote(
            quotesAll.result[getRndInteger(0, quotesAll.result.length - 1)]
        );
    }, [refreshData]);

    return (
        <>
            <ToastContainer />
            <section className="py-10">
                <h2 className="text-2xl mb-5 w-fit m-auto relative before:w-10 before:bg-lime-600 before:h-1 before:absolute before:top-1/2 before:right-full before:-translate-x-5 after:w-10 after:bg-lime-600 after:h-1 after:absolute after:top-1/2 after:left-full after:translate-x-5">
                    اقتباس عشوائي
                </h2>
                <div className="container m-auto px-3">
                    <div className="px-6 py-6">
                        <figure className="max-w-screen-md mx-auto text-center">
                            <svg
                                className="w-10 h-10 mx-auto mb-3 text-lime-600"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 14"
                            >
                                <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                            </svg>
                            <blockquote>
                                <p className="text-2xl italic font-medium">
                                    {quoteData.text}
                                </p>
                            </blockquote>
                            <p className="mt-5 block pr-3 font-medium">
                                {quoteData.author}
                            </p>
                        </figure>
                        <div className="flex justify-center items-center mt-5 gap-5">
                            <button
                                onClick={() =>
                                    copyText(
                                        `'${quoteData.text}' ${quoteData.author}`
                                    )
                                }
                                className="text-lime-600 border-2 border-lime-600 hover:bg-lime-600 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                            <button
                                onClick={refreshText}
                                className="text-lime-600 border-2 border-lime-600 hover:bg-lime-600 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                            >
                                <FontAwesomeIcon icon={faRefresh} />
                            </button>
                            <button
                                onClick={() =>
                                    shareText(
                                        `'${quoteData.text}' ${quoteData.author}`
                                    )
                                }
                                className="text-lime-600 border-2 border-lime-600 hover:bg-lime-600 hover:text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                            >
                                <FontAwesomeIcon icon={faShare} />
                            </button>
                        </div>
                    </div>
                </div>
                <Image
                    width={100}
                    height={100}
                    src="/img.png"
                    style={{ width: "auto", height: "auto" }}
                    className="absolute w-32 bottom-96 right-0 -z-40 rotate-180"
                    alt="img"
                />
            </section>
        </>
    );
}
