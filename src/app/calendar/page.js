"use client";
import Landing from "@/components/Layout/Landing";
import React, { useState, useEffect } from 'react';

import moment from 'moment-hijri';
import 'moment/locale/ar';
import { useRamadan } from "@/context/ramadanContext";

const RamadanSchedule = () => {
    const [prayerTimes, setPrayerTimes] = useState([]);
    const [ramadanDate, setRamadanDate] = useState({
        start: null,
        end: null,
        hijriYear: '',
        totalDays: 30
    });
    const [loading, setLoading] = useState(true);
    const [currentDay, setCurrentDay] = useState(1);
    const [location, setLocation] = useState({ lat: "30.0444", lng: "31.2357" });

    useEffect(() => {
        const initializeLocation = () => {
            const storedLat = localStorage.getItem("latitude");
            const storedLng = localStorage.getItem("longitude");

            if (storedLat && storedLng) {
                setLocation({ lat: storedLat, lng: storedLng });
                return;
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const newLocation = {
                            lat: position.coords.latitude.toFixed(4),
                            lng: position.coords.longitude.toFixed(4)
                        };
                        setLocation(newLocation);
                        localStorage.setItem("latitude", newLocation.lat);
                        localStorage.setItem("longitude", newLocation.lng);
                    },
                    () => {
                        setLocation({ lat: "30.0444", lng: "31.2357" });
                        localStorage.setItem("latitude", "30.0444");
                        localStorage.setItem("longitude", "31.2357");
                    }
                );
            } else {
                setLocation({ lat: "30.0444", lng: "31.2357" });
            }
        };
        initializeLocation();
    }, []);

    useEffect(() => {
        const fetchRamadanData = async () => {
            try {
                setLoading(true);
                const currentYear = new Date().getFullYear();
                const apiUrl = `https://api.aladhan.com/v1/calendar?latitude=${location.lat}&longitude=${location.lng}&year=${currentYear}&method=2`;

                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('فشل جلب البيانات');
                const { data } = await response.json();

                const ramadanDays = data.filter(monthData => monthData.date.hijri.month.number === 9)

                if (!ramadanDays.length) throw new Error('لا توجد بيانات لرمضان');

                const startDate = moment(ramadanDays[0].date.gregorian.date, 'DD-MM-YYYY');
                const endDate = moment(ramadanDays[ramadanDays.length - 1].date.gregorian.date, 'DD-MM-YYYY');

                const today = moment();
                const currentDay = today.isBetween(startDate, endDate, null, '[]') ?
                    today.diff(startDate, 'days') + 1 :
                    today.isBefore(startDate) ? 1 : ramadanDays.length;

                setRamadanDate({
                    start: startDate,
                    end: endDate,
                    hijriYear: ramadanDays[0].date.hijri.year,
                    totalDays: ramadanDays.length
                });
                setCurrentDay(currentDay);

                // إعداد بيانات الجدول
                setPrayerTimes(ramadanDays.map(day => ({
                    dayNumber: day.date.hijri.day,
                    gregorianDate: moment(day.date.gregorian.date, 'DD-MM-YYYY'),
                    hijriDate: day.date.hijri.date,
                    fajr: day.timings.Fajr,
                    sunrise: day.timings.Sunrise,
                    maghrib: day.timings.Maghrib,
                    isLast10: day.date.hijri.day >= 21
                })));

            } catch (error) {
                console.error('حدث خطأ:', error);
                const defaultStart = moment(moment().year() + '-03-11');
                const defaultEnd = moment(moment().year() + '-04-09');
                const defaultDays = Array.from({ length: 30 }, (_, i) => ({
                    dayNumber: i + 1,
                    gregorianDate: defaultStart.clone().add(i, 'days'),
                    hijriDate: `${i + 1} رمضان ${moment().iYear()}`,
                    fajr: '04:00',
                    sunrise: '06:00',
                    maghrib: '18:00',
                    isLast10: i + 1 >= 21
                }));

                setRamadanDate({
                    start: defaultStart,
                    end: defaultEnd,
                    hijriYear: String(moment().iYear()),
                    totalDays: 30
                });
                setCurrentDay(moment().isBetween(defaultStart, defaultEnd) ?
                    moment().diff(defaultStart, 'days') + 1 : 1);
                setPrayerTimes(defaultDays);
            } finally {
                setLoading(false);
            }
        };

        fetchRamadanData();
    }, [location]);

    const formatTime = (time) =>
        moment(time.split(' ')[0], 'HH:mm').format('HH:mm');

    if (loading) {
        return (
            <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-200">جارٍ تحميل بيانات رمضان...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto mb-5 px-2">
            <div className="mt-5">
                <div className="mx-auto p-10 bg-gradient-to-br from-emerald-900 to-emerald-600 rounded-2xl shadow-lg">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                تقويم رمضان {ramadanDate.hijriYear}
                            </h1>
                            <div className="text-emerald-100 text-lg">
                                <p>بداية: {ramadanDate.start.format('D MMMM YYYY')}</p>
                                <p>نهاية: {ramadanDate.end.format('D MMMM YYYY')}</p>
                                <p>عدد الأيام: {ramadanDate.totalDays}</p>
                            </div>
                        </div>

                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                            <div className="text-center">
                                <div className="text-5xl font-bold text-white mb-2">{currentDay}</div>
                                <div className="text-xl text-emerald-200">اليوم من رمضان</div>
                                <div className="mt-2 text-sm text-emerald-100">{moment().format('dddd، D MMMM YYYY')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="w-full whitespace-nowrap">
                    <thead className="bg-emerald-600 text-white">
                        <tr>
                            {["اليوم", "التاريخ الميلادي", "التاريخ الهجري", "السحور", "الإفطار"].map((h, i) => (
                                <th key={i} className="p-3 text-center">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {prayerTimes.map((day, i) => (
                            <tr key={i}
                                className={`${day.isLast10 ? 'bg-yellow-400 hover:bg-yellow-300 dark:hover:bg-yellow-300 text-white' : 'hover:bg-emerald-50 dark:hover:bg-gray-800'}`}>
                                <td className="p-3 text-center font-medium">{day.dayNumber} رمضان</td>
                                <td className="p-3 text-center">{day.gregorianDate.format('D MMMM YYYY')}</td>
                                <td className="p-3 text-center">{day.hijriDate}</td>
                                <td className="p-3 text-center">{formatTime(day.fajr)}</td>
                                <td className="p-3 text-center">{formatTime(day.maghrib)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {["السحور", "الإفطار", "ليلة القدر", "العشر الأواخر", "رمضان كريم"].map((title, index) => (
                    <div key={index} className="p-6 shadow-md border border-gray-200 rounded-md bg-white dark:bg-gray-900 dark:border dark:border-gray-600">
                        <h4 className="text-xl text-emerald-600 text-center mb-4">دعاء {title}</h4>
                        <p className="text-gray-600 dark:text-gray-200 text-center mb-4 text-sm leading-relaxed">
                            {title === "السحور" && "اللهم إني نويت صيام هذا اليوم فتقبله مني واغفر لي ما قدمت وما أخرت"}
                            {title === "الإفطار" && "اللهم لك صمت وعلى رزقك أفطرت، فتقبل مني إنك أنت السميع العليم"}
                            {title === "ليلة القدر" && "اللهم إنك عفو كريم تحب العفو فاعف عني وارحمني"}
                            {title === "العشر الأواخر" && "اللهم أعتق رقابنا من النار وأدخلنا الجنة بغير حساب"}
                            {title === "رمضان كريم" && "اللهم اجعل هذا الشهر شهر بركة وهداية لنا وللمسلمين جميعا"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Page() {
    const { ramadan } = useRamadan();
    if (!ramadan) return null;

    return (
        <>
            <Landing title="التقويم الرمضاني" />
            <RamadanSchedule />
        </>
    );
}
