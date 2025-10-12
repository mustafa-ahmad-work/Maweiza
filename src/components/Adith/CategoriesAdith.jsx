"use client";

import { useState } from "react";
import Link from "next/link";
import Adith from "@/data/adith.json";
import Search from "../Layout/Search";
import { optimizeString } from "@/helpers/optimizeString";

export default function CategoriesAdith() {
    let [dataAdiths, setDataAdiths] = useState(Adith);
    let [massage, setMassage] = useState(false);

    const showData = dataAdiths.map((item, key) => (
        <Link
            href={`/adiths/${item.id}`}
            key={key}
            className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 transition-all duration-300 hover:shadow-lg hover:border-transparent hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex flex-row gap-5 items-center">{item.title}</div>
            <span className="text-gray-300"> {item.hadeeths_count} حديث </span>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-lime-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </Link>
    ));

    function handleChange(e) {
        let dataFilter = Adith.filter((item) => optimizeString(item.title).includes(optimizeString(e.target.value)));
        setDataAdiths(dataFilter);
        dataFilter.length === 0 ? setMassage(true) : setMassage(false);
    }

    return (
        <>
            <Search handleChange={handleChange} />
            {massage ? (
                <div className="container m-auto"><p className="text-center">لا يوجد نتائج</p></div>) : (
                <div className="container gap-5 flex flex-col m-auto px-3 md:grid md:gap-3 md:grid-cols-2 lg:grid-cols-3">{showData}</div>
            )}
        </>
    );
}
