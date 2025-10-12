"use client";

import { useState } from "react";
import Link from "next/link";
import stories from "@/data/stories.json";
import Search from "../Layout/Search";
import Landing from "../Layout/Landing";
import { optimizeString } from "@/helpers/optimizeString";

export default function Stories() {
    let [dataStories, setDataStories] = useState(stories);
    let [massage, setMassage] = useState(false);

    const showData = dataStories.map((item, key) => (
        <Link
            key={key}
            href={`/stories/${item.id}`}
            className="flex transition-all flex-row justify-center p-5 border-2 border-solid bg-white dark:border-gray-500 dark:bg-gray-800 rounded-sm items-center dark:hover:border-lime-600 dark:hover:bg-gradient-to-r dark:hover:from-emerald-600 dark:hover:to-lime-500 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-lime-500 hover:border-none active:scale-90 hover:text-white"
        >
            {item.name}
        </Link>
    ));

    function handleChange(e) {
        let dataFilter = stories.filter((item) =>
            optimizeString(item.name).includes(optimizeString(e.target.value))
        );
        setDataStories(dataFilter);
        dataFilter.length === 0 ? setMassage(true) : setMassage(false);
    }

    return (
        <>
            <Landing
                title="قسم قصص الانبياء"
                text=""
            />
            <Search handleChange={handleChange} />
            {massage ? (
                <div className="container m-auto">
                    <p className="text-center">لا يوجد نتائج</p>
                </div>
            ) : (
                <div className="container gap-2 mb-4 flex flex-col m-auto px-3 md:grid md:gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {showData}
                </div>
            )}
        </>
    );
}
