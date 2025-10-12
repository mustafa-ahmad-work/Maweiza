"use client";

import { useEffect, useState } from 'react';
import moment from 'moment-hijri';
import Landing from '../Layout/Landing';

const islamicEvents = [
    { name: 'رأس السنة الهجرية', hijriMonth: 1, hijriDay: 1 },
    { name: 'المولد النبوي', hijriMonth: 3, hijriDay: 12 },
    { name: 'الإسراء والمعراج', hijriMonth: 7, hijriDay: 27 },
    { name: 'النصف من شعبان', hijriMonth: 8, hijriDay: 15 },
    { name: 'أول رمضان', hijriMonth: 9, hijriDay: 1 },
    { name: 'عيد الفطر', hijriMonth: 10, hijriDay: 1 },
    { name: 'وقفة عرفة', hijriMonth: 12, hijriDay: 9 },
    { name: 'عيد الأضحى', hijriMonth: 12, hijriDay: 10 },
    { name: 'عاشوراء', hijriMonth: 1, hijriDay: 10 },
];

export default function EventsTimer() {
    const [eventsTimeLeft, setEventsTimeLeft] = useState([]);

    useEffect(() => {
        const calculateTimeLeft = (eventDate) => {
            const now = new Date();
            const timeDifference = eventDate - Number(now);

            if (timeDifference <= 0) {
                return 'اليوم';
            } else {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                return {
                    seconds: seconds,
                    minutes: minutes,
                    hours: hours,
                    days: days,
                };
            }
        };

        const updateTimers = () => {
            const updatedEventsTimeLeft = islamicEvents.map(event => {
                const currentHijriYear = moment().iYear();
                const nextHijriYear = currentHijriYear + 1;

                let eventHijriDate = moment(`${currentHijriYear}-${event.hijriMonth}-${event.hijriDay}`, 'iYYYY-iM-iD');

                if (eventHijriDate.isBefore(moment(), 'day')) {
                    eventHijriDate = moment(`${nextHijriYear}-${event.hijriMonth}-${event.hijriDay}`, 'iYYYY-iM-iD');
                }
                const eventDate = eventHijriDate.toDate();

                return {
                    name: event.name,
                    timeLeft: calculateTimeLeft(eventDate),
                };
            });

            setEventsTimeLeft(updatedEventsTimeLeft);
        };

        const timerInterval = setInterval(updateTimers, 1000);

        updateTimers();

        return () => clearInterval(timerInterval);
    }, []);

    return (
        <>
            {/* <Landing title="المناسبات الإسلامية القادمة" text="يحتفل بعيد الفطر والاضحي فقط والاحتفال بغير ذالك بدعة تم ذكر المناسبات للمعرفة لا للاحتفال" /> */}

            <div className="min-h-screen py-12 px-4 sm:px-6 relative overflow-hidden pt-20">
                {/* خلفية متدرجة */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-900 to-emerald-800 z-0"></div> */}

                {/* أنماط زخرفية */}
                {/* <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0"></div> */}

                {/* عناصر زخرفية متحركة */}
                {/* <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob z-0"></div>
                <div className="absolute top-40 left-20 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 z-0"></div>
                <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 z-0"></div> */}

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4 relative inline-block">
                            المناسبات الإسلامية القادمة
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full"></span>
                        </h2>
                        <p className="text-gray-300 max-w-2xl mx-auto">
يحتفل بعيد الفطر والاضحي فقط والاحتفال بغير ذالك بدعة تم ذكر المناسبات للمعرفة لا للاحتفال
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {eventsTimeLeft.map((event, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                            >
                                {/* تأثير التوهج عند التمرير */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-full group-hover:translate-x-full"></div>

                                {/* زخرفة داخلية */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/10 to-transparent rounded-full blur-xl"></div>

                                <div className="relative p-6 text-white">
                                    <div className="flex items-center mb-6">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center ml-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-bold">{event.name}</h3>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between mb-2 text-sm text-gray-400">
                                            <span className="w-1/4 text-center">ثانية</span>
                                            <span className="w-1/4 text-center">دقيقة</span>
                                            <span className="w-1/4 text-center">ساعة</span>
                                            <span className="w-1/4 text-center">يوم</span>
                                        </div>

                                        <div className="flex justify-between gap-2">
                                            {typeof event.timeLeft === 'string' ? (
                                                <div className="w-full py-4 text-center bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl text-xl font-bold">
                                                    {event.timeLeft}
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-1/4 py-4 bg-gray-700 rounded-xl flex flex-col items-center justify-center">
                                                        <div className="text-2xl font-bold">{event.timeLeft.seconds}</div>
                                                        <div className="text-xs text-gray-400 mt-1">ثانية</div>
                                                    </div>
                                                    <div className="w-1/4 py-4 bg-gray-700 rounded-xl flex flex-col items-center justify-center">
                                                        <div className="text-2xl font-bold">{event.timeLeft.minutes}</div>
                                                        <div className="text-xs text-gray-400 mt-1">دقيقة</div>
                                                    </div>
                                                    <div className="w-1/4 py-4 bg-gray-700 rounded-xl flex flex-col items-center justify-center">
                                                        <div className="text-2xl font-bold">{event.timeLeft.hours}</div>
                                                        <div className="text-xs text-gray-400 mt-1">ساعة</div>
                                                    </div>
                                                    <div className="w-1/4 py-4 bg-gray-700 rounded-xl flex flex-col items-center justify-center">
                                                        <div className="text-2xl font-bold">{event.timeLeft.days}</div>
                                                        <div className="text-xs text-gray-400 mt-1">يوم</div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                                        <span className="text-sm text-gray-400">المناسبة القادمة</span>
                                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center text-gray-400 text-sm">
                        <p>يحتفل بعيد الفطر والأضحى فقط، والاحتفال بغير ذلك بدعة. تم ذكر المناسبات للمعرفة لا للاحتفال.</p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                animation-delay: 2s;
                }
                .animation-delay-4000 {
                animation-delay: 4s;
                }
      `}</style>
        </>
    );
}
