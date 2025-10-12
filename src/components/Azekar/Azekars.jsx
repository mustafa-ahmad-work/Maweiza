"use client";

import { useState } from "react";
import Link from "next/link";
import azekar from "@/data/azekar.json";
import Search from "../Layout/Search";
import { optimizeString } from "@/helpers/optimizeString";

export default function Azekar() {
    let [dataAzekar, setDataAzekar] = useState(azekar);
    let [massage, setMassage] = useState(false);


    const showData = dataAzekar.map((item, key) => (
        <Link
            href={`/azekar/${item.id}`}
            key={key}
            className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all duration-300 hover:shadow-lg hover:border-transparent hover:scale-[1.02] active:scale-[0.98]">
            {item.category}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-lime-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </Link>
    ));

    function handleChange(e) {
        let dataFilter = azekar.filter((item) =>
            optimizeString(item.category).includes(optimizeString(e.target.value))
        );
        setDataAzekar(dataFilter);
        dataFilter.length === 0 ? setMassage(true) : setMassage(false);
    }

    return (
        <>
            <Search handleChange={handleChange} />
            {massage ? (
                <div className="container m-auto">
                    <p className="text-center">لا يوجد نتائج</p>
                </div>
            ) : (
                <div className="container m-auto gap-5 flex flex-col px-3 md:grid md:gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {showData}
                </div>
            )}
        </>
    );
}
