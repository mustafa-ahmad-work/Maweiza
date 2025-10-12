"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import "moment/dist/locale/ar-dz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Layout/Loader";
import Landing from "../Layout/Landing";
import { useRamadan } from "@/context/ramadanContext";

moment.locale("ar");

export default function Salah() {
    const { ramadan } = useRamadan();

    const [timings, setTimings] = useState({
        Fajr: "00:00",
        Dhuhr: "00:00",
        Asr: "00:00",
        Sunset: "00:00",
        Isha: "00:00",
        Lastthird: "00:00",
        Imsak: "00:00",
    });

    const prayersArray = [
        { key: "Fajr", css: "Fajr", displayName: "الفجر" },
        { key: "Dhuhr", css: "Dhuhr", displayName: "الظهر" },
        { key: "Asr", css: "Asr", displayName: "العصر" },
        { key: "Sunset", css: "Sunset", displayName: "المغرب" },
        { key: "Isha", css: "Isha", displayName: "العشاء" },
    ];

    const ramadanTimingsArray = [
        { key: "Lastthird", css: "Lastthird", displayName: "سحور" },
        { key: "Imsak", css: "Imsak", displayName: "إمساك" },
        { key: "Sunset", css: "Aftar", displayName: "إفطار" },
    ];

    const [remainingPrayerTime, setRemainingPrayerTime] = useState({
        h: "00",
        m: "00",
        s: "00",
    });

    const [remainingRamadanTime, setRemainingRamadanTime] = useState({
        h: "00",
        m: "00",
        s: "00",
    });

    const [nextPrayerIndex, setNextPrayerIndex] = useState(0);
    const [nextRamadanIndex, setNextRamadanIndex] = useState(0);
    const [refreshGps, setRefreshGps] = useState(true);
    const [btnError, setBtnError] = useState(null);
    const [loadingScreen, setLoadingScreen] = useState(true);

    const setupPrayerCountdownTimer = () => {
        const momentNow = moment();
        let prayerIndex = 0;
        if (
            momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
        ) {
            prayerIndex = 1;
        } else if (
            momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
        ) {
            prayerIndex = 2;
        } else if (
            momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
        ) {
            prayerIndex = 3;
        } else if (
            momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
        ) {
            prayerIndex = 4;
        }
        setNextPrayerIndex(prayerIndex);
        const nextPrayerTime = timings[prayersArray[prayerIndex].key];
        let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
        if (prayerIndex === 0) {
            remainingTime =
                moment("23:59:59", "hh:mm:ss").diff(momentNow) +
                moment(nextPrayerTime, "hh:mm").diff(moment("00:00:00", "hh:mm:ss"));
        }
        const durationRemainingTime = moment.duration(remainingTime);
        setRemainingPrayerTime({
            h: durationRemainingTime.hours().toString().padStart(2, "0"),
            m: durationRemainingTime.minutes().toString().padStart(2, "0"),
            s: durationRemainingTime.seconds().toString().padStart(2, "0"),
        });
    };

    const setupRamadanCountdownTimer = () => {
        const momentNow = moment();
        let ramadanIndex = 0;
        if (
            momentNow.isAfter(moment(timings["Lastthird"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Imsak"], "hh:mm"))
        ) {
            ramadanIndex = 1;
        } else if (
            momentNow.isAfter(moment(timings["Imsak"], "hh:mm")) &&
            momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
        ) {
            ramadanIndex = 2;
        }
        setNextRamadanIndex(ramadanIndex);
        const nextRamadanTime = timings[ramadanTimingsArray[ramadanIndex].key];
        let remainingTime = moment(nextRamadanTime, "hh:mm").diff(momentNow);
        if (ramadanIndex === 0) {
            remainingTime =
                moment("23:59:59", "hh:mm:ss").diff(momentNow) +
                moment(nextRamadanTime, "hh:mm").diff(
                    moment("00:00:00", "hh:mm:ss")
                );
        }
        const durationRemainingTime = moment.duration(remainingTime);
        setRemainingRamadanTime({
            h: durationRemainingTime.hours().toString().padStart(2, "0"),
            m: durationRemainingTime.minutes().toString().padStart(2, "0"),
            s: durationRemainingTime.seconds().toString().padStart(2, "0"),
        });
    };

    useEffect(() => {
        let interval = setInterval(() => {
            setupPrayerCountdownTimer();
            if (ramadan) setupRamadanCountdownTimer();
        }, 1000);
        return () => clearInterval(interval);
    }, [timings]);

    useEffect(() => {
        setLoadingScreen(true);
        let date = new Date();
        async function getPlayer(latitude, longitude) {
            try {
                const response = await fetch(
                    `https://api.aladhan.com/v1/calendar/${date.getFullYear()}?latitude=${latitude}&longitude=${longitude}`
                );
                const pray = await response.json();
                let time = pray.data[date.getMonth() + 1][date.getDate() - 1];
                setTimings({
                    Fajr: time.timings.Fajr.slice(0, 5),
                    Dhuhr: time.timings.Dhuhr.slice(0, 5),
                    Asr: time.timings.Asr.slice(0, 5),
                    Sunset: time.timings.Maghrib.slice(0, 5),
                    Isha: time.timings.Isha.slice(0, 5),
                    Lastthird: time.timings.Lastthird.slice(0, 5),
                    Imsak: time.timings.Imsak.slice(0, 5),
                });
                setBtnError(null);
            } catch (error) {
                toast.error("تحقق من اتصال الانترنت", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                console.log(error);
            }
            setLoadingScreen(false);
        }

        function onSuccess(PositionCallback) {
            const { latitude, longitude } = PositionCallback.coords;
            localStorage.setItem("latitude", latitude);
            localStorage.setItem("longitude", longitude);
            getPlayer(latitude, longitude);
        }

        async function onErrors(PositionErrorCallback) {
            toast.warn("فشل تحديد الموقع", {
                position: toast.POSITION.TOP_RIGHT,
            });
            if (PositionErrorCallback.code === 1) {
                try {
                    const response = await fetch(
                        "https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt"
                    );
                    const data = await response.json();
                    let timings = data.data.timings;
                    setTimings({
                        Fajr: timings.Fajr,
                        Dhuhr: timings.Dhuhr,
                        Asr: timings.Asr,
                        Sunset: timings.Maghrib,
                        Isha: timings.Isha,
                        Lastthird: timings.Lastthird,
                        Imsak: timings.Imsak,
                    });
                } catch (error) {
                    toast.error("تحقق من اتصال الانترنت", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    console.log(error);
                }
                setBtnError(<> {/* محتوى btnError هنا */} </>);
                setLoadingScreen(false);
            }
        }

        function getPlayerLocalStorage() {
            const latitude = localStorage.getItem("latitude");
            const longitude = localStorage.getItem("longitude");
            getPlayer(latitude, longitude);
        }

        if (
            localStorage.getItem("latitude") !== null &&
            localStorage.getItem("longitude") !== null
        ) {
            getPlayerLocalStorage();
        } else {
            navigator.geolocation
                ? navigator.geolocation.getCurrentPosition(onSuccess, onErrors)
                : console.log("Not Found Location");
        }
    }, [refreshGps]);



    return (
        <>
            <Landing title="أوقات الصلاة" />
            <ToastContainer />
            <section className="pt-15 mt-4 salah pb-5 relative">
                <Image
                    width={100}
                    height={100}
                    src="/img.png"
                    className="absolute w-32 top-16 left-0 -z-40"
                    alt="img"
                />

                {loadingScreen ||
                    (timings.Fajr === "00:00" &&
                        timings.Asr === "00:00" &&
                        timings.Isha === "00:00") ? (
                    <Loader />
                ) : (
                    <>
                        <div className="prayer-times-section">
                            <div className="container px-5 m-auto mb-10 text-white md:grid lg:grid-cols-5 md:grid-cols-3 gap-5 justify-center items-center">
                                {prayersArray.map((prayer, index) => (
                                    <div
                                        key={prayer.key}
                                        className={`p-5 w-full ${prayer.css} time rounded-md mb-5 md:mb-0 bg-gradient-to-r from-emerald-600 to-lime-500 flex flex-col justify-center text-xl ${nextPrayerIndex === index
                                            ? "md:scale-110 sm:scale-105"
                                            : "text-gray-300 py-8"
                                            }`}>
                                        <span className="block mb-1">
                                            أذان {prayer.displayName}
                                        </span>
                                        <span className="block font-sans">
                                            {moment(timings[prayer.key], [
                                                "HH:mm",
                                            ]).format("hh:mm A")}
                                        </span>
                                        {nextPrayerIndex === index && (
                                            <>
                                                <span className="block mt-3 text-sm">
                                                    الصلاة التالية
                                                </span>
                                                <span className="block font-sans text-3xl">
                                                    {remainingPrayerTime.h}:
                                                    {remainingPrayerTime.m}:
                                                    {remainingPrayerTime.s}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {ramadan && (
                            <div className="ramadan-times-section mt-10">
                                <h2 className="text-white text-2xl text-center mb-5">
                                    أوقات رمضان
                                </h2>
                                <div className="container px-5 m-auto flex-wrap text-white flex gap-5 justify-center items-center">
                                    {ramadanTimingsArray.map(
                                        (ramadanTime, index) => (
                                            <div
                                                key={ramadanTime.key}
                                                className={`p-5 min-w-fit max-md:w-full pe-32 ${ramadanTime.css} time rounded-md mb-5 md:mb-0 bg-gradient-to-r from-blue-600 to-cyan-500 flex flex-col justify-center text-xl ${nextRamadanIndex === index
                                                    ? "md:scale-110 sm:scale-105"
                                                    : "text-gray-300 py-8"
                                                    }`}>
                                                <span className="block mb-1">
                                                    {ramadanTime.displayName}
                                                </span>
                                                <span className="block font-sans">
                                                    {moment(
                                                        timings[
                                                        ramadanTime.key
                                                        ],
                                                        ["HH:mm"]
                                                    ).format("hh:mm A")}
                                                </span>
                                                {nextRamadanIndex === index && (
                                                    <>
                                                        <span className="block mt-3 text-sm">
                                                            الوقت التالي
                                                        </span>
                                                        <span className="block font-sans text-3xl">
                                                            {remainingRamadanTime.h}
                                                            :{remainingRamadanTime.m}
                                                            :{remainingRamadanTime.s}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {btnError}
                    </>
                )}
            </section>
        </>
    );
}
