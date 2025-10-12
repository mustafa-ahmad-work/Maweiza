"use client";

import { useState, useEffect } from "react";
import Landing from "@/components/Layout/Landing";
import SplashScreen from "@/components/Layout/SplashScreen";

// import moment from "moment";
import moment from 'moment-hijri';
import { useRamadan } from "@/context/ramadanContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faLock } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
    const { ramadan } = useRamadan();

    const [checks, setChecks] = useState({});

    const [selectedDay, setSelectedDay] = useState("all");

    const [ramadanInfo, setRamadanInfo] = useState({
        start: null,
        end: null,
        totalDays: 30,
    });

    const [isLoading, setIsLoading] = useState(true);

    const [location, setLocation] = useState({
        lat: "30.0444",
        lng: "31.2357",
    });

    useEffect(() => {
        const getLocation = () => {
            const storedLat = localStorage.getItem("latitude");
            const storedLng = localStorage.getItem("longitude");

            if (storedLat && storedLng) {
                setLocation({ lat: storedLat, lng: storedLng });
                return;
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const newLocation = {
                            lat: position.coords.latitude.toString(),
                            lng: position.coords.longitude.toString(),
                        };
                        setLocation(newLocation);
                        localStorage.setItem("latitude", newLocation.lat);
                        localStorage.setItem("longitude", newLocation.lng);
                    },
                    () => {
                        localStorage.setItem("latitude", location.lat);
                        localStorage.setItem("longitude", location.lng);
                    }
                );
            }
        };

        getLocation();
    }, [location.lat, location.lng]);

    useEffect(() => {
        const fetchRamadanDates = async () => {
            try {
                const currentYear = new Date().getFullYear();
                const apiUrl = `https://api.aladhan.com/v1/calendar?latitude=${location.lat}&longitude=${location.lng}&year=${currentYear}&method=2`;

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('فشل جلب البيانات');
                const { data } = await response.json();

                const ramadanDays = data.filter(monthData => monthData.date.hijri.month.number === 9)

                if (ramadanDays.length > 0) {
                    const firstDay = moment(ramadanDays[0].date.gregorian.date, "DD-MM-YYYY", true).toDate();
                    const lastDay = moment(ramadanDays[ramadanDays.length - 1].date.gregorian.date, "DD-MM-YYYY", true).toDate();

                    setRamadanInfo({
                        start: firstDay,
                        end: lastDay,
                        totalDays: ramadanDays.length,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch Ramadan dates:", error);
                // Set default dates for 2025
                setRamadanInfo({
                    start: new Date(2025, 1, 1), // February 1, 2025
                    end: new Date(2025, 1, 28),  // February 28, 2025
                    totalDays: 28,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchRamadanDates();
    }, [location]);



    useEffect(() => {
        const savedChecks = localStorage.getItem("ramadanChecks");
        if (savedChecks) setChecks(JSON.parse(savedChecks));
    }, []);

    useEffect(() => {
        localStorage.setItem("ramadanChecks", JSON.stringify(checks));
    }, [checks]);

    const getCurrentRamadanDay = () => {
        if (!ramadanInfo.start) return 1;
        const today = new Date();
        const diff = today.getTime() - ramadanInfo.start.getTime();
        const day = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
        return Math.max(1, Math.min(day, ramadanInfo.totalDays));
    };

    const [currentRamadanDay, setCurrentRamadanDay] = useState(getCurrentRamadanDay());

    useEffect(() => {
        setCurrentRamadanDay(getCurrentRamadanDay());
    }, [ramadanInfo.start]);

    if (isLoading) return <SplashScreen />;
    if (!ramadan) return null;

    return (
        <>
            <Landing title={`يومي في رمضان (${moment().iYear()} هـ - ${moment().year()} م)`} />
            <div className="container mx-auto mb-5 px-2">
                <div className="bg-emerald-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                    <h3 className="text-xl font-bold text-emerald-800 dark:text-white">
                        معلومات رمضان الحالية:
                    </h3>
                    <p className="text-emerald-700 dark:text-white">
                        البدء: {ramadanInfo.start ? moment(ramadanInfo.start).format("YYYY/MM/DD") : "غير معروف"}
                        <br />
                        الانتهاء: {ramadanInfo.end ? moment(ramadanInfo.end).format("YYYY/MM/DD") : "غير معروف"}
                        <br />
                        عدد الأيام: {ramadanInfo.totalDays}
                    </p>
                </div>
                <div className="pb-8">
                    <div className="flex gap-4 mb-4 p-3 rounded">
                        <select
                            value={selectedDay}
                            onChange={(e) => setSelectedDay(e.target.value)}
                            className="p-2 rounded border dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="all">كل الأيام</option>
                            {[...Array(ramadanInfo.totalDays)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    يوم {i + 1}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={() => setSelectedDay(getCurrentRamadanDay().toString())}
                            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
                            انتقل لليوم الحالي
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-sm shadow-sm border border-emerald-50 dark:border-gray-700">
                        <table className="w-full border-collapse text-sm md:text-base bg-white dark:bg-black whitespace-nowrap">
                            <thead className="sticky top-0">
                                <tr className="bg-emerald-600 text-white text-center">
                                    <span></span>
                                    <th className="p-3 font-semibold border-b border-emerald-500">اليوم</th>
                                    <th className="p-3 font-semibold border-b border-emerald-500">العبادات اليومية</th>
                                    <th className="p-3 font-semibold border-b border-emerald-500">النوافل</th>
                                    <th className="p-3 font-semibold border-b border-emerald-500">الأذكار</th>
                                    <th className="p-3 font-semibold border-b border-emerald-500">القرآن</th>
                                    <th className="p-3 font-semibold border-b border-emerald-500">الأعمال الصالحة</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-emerald-100 dark:divide-gray-500 whitespace-nowrap">
                                {[...Array(ramadanInfo.totalDays)].map((_, i) => {
                                    const dayNumber = i + 1;
                                    if (selectedDay !== "all" && dayNumber !== Number(selectedDay)) return null;


                                    return (
                                        <tr
                                            key={i}
                                            className={`hover:bg-emerald-50 relative ${i % 2 === 0 ? "bg-emerald-50/30 dark:bg-gray-800" : "bg-white dark:bg-black"}`}
                                        >
                                            {
                                                dayNumber > currentRamadanDay ?
                                                    <span className="absolute z-10 flex items-center gap-3 justify-center top-0 w-full text-white h-full bg-black/60">
                                                        يوم {dayNumber} - سيتم تفعيله عند دخول وقته
                                                        <FontAwesomeIcon icon={faLock} />
                                                    </span> : <span></span>
                                            }
                                            <td className="p-3 text-center font-medium text-emerald-600 border-r dark:border-gray-500">
                                                {dayNumber} رمضان
                                            </td>


                                            {/* الصلوات المفروضة */}
                                            <td className="p-3 border-r dark:border-gray-500">
                                                <div className="grid gap-2">
                                                    {["الفجر", "الظهر", "العصر", "المغرب", "العشاء"].map((prayer) => (
                                                        <div key={prayer} className="checkbox-wrapper-11 pe-5">
                                                            <input
                                                                id={`prayer-${prayer}-${dayNumber}`}
                                                                type="checkbox"
                                                                checked={checks[`day${dayNumber}-${prayer}`] || false}
                                                                onChange={(e) =>
                                                                    setChecks((prev) => ({
                                                                        ...prev,
                                                                        [`day${dayNumber}-${prayer}`]: e.target.checked,
                                                                    }))
                                                                }
                                                            />
                                                            <label htmlFor={`prayer-${prayer}-${dayNumber}`}>{prayer}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>

                                            {/* النوافل */}
                                            <td className="p-3 border-r dark:border-gray-500">
                                                <div className="grid gap-2">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-xs text-emerald-600 font-medium">رواتب اليوم</span>
                                                        {["2 قبل الفجر", "4 قبل الظهر", "2 بعد الظهر", "2 بعد المغرب", "2 بعد العشاء", "الوتر"].map((n) => (
                                                            <div key={n} className="checkbox-wrapper-11 pe-5">
                                                                <input
                                                                    id={`nawafil-${n}-${dayNumber}`}
                                                                    type="checkbox"
                                                                    checked={checks[`day${dayNumber}-${n}`] || false}
                                                                    onChange={(e) =>
                                                                        setChecks((prev) => ({
                                                                            ...prev,
                                                                            [`day${dayNumber}-${n}`]: e.target.checked,
                                                                        }))
                                                                    }
                                                                />
                                                                <label htmlFor={`nawafil-${n}-${dayNumber}`}>{n}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <div className="mt-2 pt-2 border-t dark:border-gray-500">
                                                        <div className="checkbox-wrapper-11 pe-5">
                                                            <input
                                                                id={`tarawih-${dayNumber}`}
                                                                type="checkbox"
                                                                checked={checks[`day${dayNumber}-تراويح`] || false}
                                                                onChange={(e) =>
                                                                    setChecks((prev) => ({
                                                                        ...prev,
                                                                        [`day${dayNumber}-تراويح`]: e.target.checked,
                                                                    }))
                                                                }
                                                            />
                                                            <label htmlFor={`tarawih-${dayNumber}`}>تراويح (20 ركعة)</label>
                                                        </div>
                                                        {dayNumber >= 20 && (
                                                            <div className="checkbox-wrapper-11 pe-5">
                                                                <input
                                                                    id={`qiyam-${dayNumber}`}
                                                                    type="checkbox"
                                                                    checked={checks[`day${dayNumber}-قيام`] || false}
                                                                    onChange={(e) =>
                                                                        setChecks((prev) => ({
                                                                            ...prev,
                                                                            [`day${dayNumber}-قيام`]: e.target.checked,
                                                                        }))
                                                                    }
                                                                />
                                                                <label htmlFor={`qiyam-${dayNumber}`}>قيام ليلة القدر</label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* الأذكار */}
                                            <td className="p-3 border-r dark:border-gray-500">
                                                <div className="grid gap-2">
                                                    {["أذكار الصباح", "أذكار المساء", "أذكار بعد الصلاة", "دعاء الإفطار"].map((dhikr) => (
                                                        <div key={dhikr} className="checkbox-wrapper-11 pe-5">
                                                            <input
                                                                id={`dhikr-${dhikr}-${dayNumber}`}
                                                                type="checkbox"
                                                                checked={checks[`day${dayNumber}-${dhikr}`] || false}
                                                                onChange={(e) =>
                                                                    setChecks((prev) => ({
                                                                        ...prev,
                                                                        [`day${dayNumber}-${dhikr}`]: e.target.checked,
                                                                    }))
                                                                }
                                                            />
                                                            <label htmlFor={`dhikr-${dhikr}-${dayNumber}`}>{dhikr}</label>
                                                        </div>
                                                    ))}
                                                    <div className="mt-2 pt-2 border-t dark:border-gray-500">
                                                        {["استغفار (100x)", "تسبيح (100x)", "صلاة على النبي (100x)"].map((dhikr) => (
                                                            <div key={dhikr} className="checkbox-wrapper-11 pe-5">
                                                                <input
                                                                    id={`dhikr-extra-${dhikr}-${dayNumber}`}
                                                                    type="checkbox"
                                                                    checked={checks[`day${dayNumber}-${dhikr}`] || false}
                                                                    onChange={(e) =>
                                                                        setChecks((prev) => ({
                                                                            ...prev,
                                                                            [`day${dayNumber}-${dhikr}`]: e.target.checked,
                                                                        }))
                                                                    }
                                                                />
                                                                <label htmlFor={`dhikr-extra-${dhikr}-${dayNumber}`}>{dhikr}</label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* القرآن */}
                                            <td className="p-3 border-r dark:border-gray-500">
                                                <div className="grid gap-2">
                                                    <div className="checkbox-wrapper-11 pe-5">
                                                        <input
                                                            id={`quran-juz-${dayNumber}`}
                                                            type="checkbox"
                                                            checked={checks[`day${dayNumber}-جزء`] || false}
                                                            onChange={(e) =>
                                                                setChecks((prev) => ({
                                                                    ...prev,
                                                                    [`day${dayNumber}-جزء`]: e.target.checked,
                                                                }))
                                                            }
                                                        />
                                                        <label htmlFor={`quran-juz-${dayNumber}`}>جزء يومي</label>
                                                    </div>
                                                    <div className="checkbox-wrapper-11 pe-5">
                                                        <input
                                                            id={`quran-tadabbur-${dayNumber}`}
                                                            type="checkbox"
                                                            checked={checks[`day${dayNumber}-تدبر`] || false}
                                                            onChange={(e) =>
                                                                setChecks((prev) => ({
                                                                    ...prev,
                                                                    [`day${dayNumber}-تدبر`]: e.target.checked,
                                                                }))
                                                            }
                                                        />
                                                        <label htmlFor={`quran-tadabbur-${dayNumber}`}>تدبر الآيات</label>
                                                    </div>
                                                    {dayNumber === 30 && (
                                                        <div className="checkbox-wrapper-11 pe-5">
                                                            <input
                                                                id={`quran-khatm-${dayNumber}`}
                                                                type="checkbox"
                                                                checked={checks[`day${dayNumber}-ختم`] || false}
                                                                onChange={(e) =>
                                                                    setChecks((prev) => ({
                                                                        ...prev,
                                                                        [`day${dayNumber}-ختم`]: e.target.checked,
                                                                    }))
                                                                }
                                                            />
                                                            <label htmlFor={`quran-khatm-${dayNumber}`} className="text-emerald-700">
                                                                ختم القرآن
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>

                                            {/* الأعمال الصالحة */}
                                            <td className="p-3 border-r dark:border-gray-500">
                                                <div className="grid gap-2">
                                                    {["إفطار صائم", "صدقة يومية", "بر الوالدين", "صلة الرحم"].map((deed) => (
                                                        <div key={deed} className="checkbox-wrapper-11 pe-5">
                                                            <input
                                                                id={`deed-${deed}-${dayNumber}`}
                                                                type="checkbox"
                                                                checked={checks[`day${dayNumber}-${deed}`] || false}
                                                                onChange={(e) =>
                                                                    setChecks((prev) => ({
                                                                        ...prev,
                                                                        [`day${dayNumber}-${deed}`]: e.target.checked,
                                                                    }))
                                                                }
                                                            />
                                                            <label htmlFor={`deed-${deed}-${dayNumber}`}>{deed}</label>
                                                        </div>
                                                    ))}
                                                    <div className="mt-2 pt-2 border-t dark:border-gray-500">
                                                        {dayNumber >= 20 && (
                                                            <>
                                                                <div className="checkbox-wrapper-11 pe-5">
                                                                    <input
                                                                        id={`deed-itikaf-${dayNumber}`}
                                                                        type="checkbox"
                                                                        checked={checks[`day${dayNumber}-اعتكاف`] || false}
                                                                        onChange={(e) =>
                                                                            setChecks((prev) => ({
                                                                                ...prev,
                                                                                [`day${dayNumber}-اعتكاف`]: e.target.checked,
                                                                            }))
                                                                        }
                                                                    />
                                                                    <label htmlFor={`deed-itikaf-${dayNumber}`} className="text-emerald-700">
                                                                        اعتكاف
                                                                    </label>
                                                                </div>
                                                                <div className="checkbox-wrapper-11 pe-5">
                                                                    <input
                                                                        id={`deed-zakat-${dayNumber}`}
                                                                        type="checkbox"
                                                                        checked={checks[`day${dayNumber}-زكاة`] || false}
                                                                        onChange={(e) =>
                                                                            setChecks((prev) => ({
                                                                                ...prev,
                                                                                [`day${dayNumber}-زكاة`]: e.target.checked,
                                                                            }))
                                                                        }
                                                                    />
                                                                    <label htmlFor={`deed-zakat-${dayNumber}`} className="text-emerald-700">
                                                                        زكاة الفطر
                                                                    </label>
                                                                </div>
                                                            </>
                                                        )}
                                                        <div className="checkbox-wrapper-11 pe-5">
                                                            <input
                                                                id={`deed-dawah-${dayNumber}`}
                                                                type="checkbox"
                                                                checked={checks[`day${dayNumber}-دعوة`] || false}
                                                                onChange={(e) =>
                                                                    setChecks((prev) => ({
                                                                        ...prev,
                                                                        [`day${dayNumber}-دعوة`]: e.target.checked,
                                                                    }))
                                                                }
                                                            />
                                                            <label htmlFor={`deed-dawah-${dayNumber}`}>دعوة إلى الخير</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 p-4 bg-emerald-50 text-emerald-600 dark:bg-gray-700 dark:text-white rounded-sm">
                        <h3 className="text-xl font-bold mb-3">ملاحظات هامة:</h3>
                        <ul className="list-disc pr-4 space-y-2">
                            <li>في العشر الأواخر: إحياء الليل - كثرة الدعاء - الاعتكاف</li>
                            <li>الاجتهاد في الدعاء خاصة في أوقات الإجابة</li>
                            <li>الإكثار من: (لا إله إلا الله - الاستغفار - الصلاة على النبي)</li>
                            <li>التوبة النصوح وترك المعاصي</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
