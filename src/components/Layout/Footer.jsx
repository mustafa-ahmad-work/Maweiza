"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { links1, links2 } from "@/data/links";
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");

    const socialLinks = [
        { icon: faFacebook, href: "https://www.facebook.com/profile.php?id=100074054749083", label: "فيسبوك" },
        { icon: faGithub, href: "https://github.com/mustafa-ahmad-work", label: "جيت هب" },
        { icon: faYoutube, href: "https://www.youtube.com/@MofoCode", label: "يوتيوب" }
    ];

    return (
        <footer className="relative bg-white dark:bg-gray-950 pt-20 pb-8 border-t border-gray-100 dark:border-gray-900 overflow-hidden">
            {/* زخارف دائرية خافتة جداً في الخلفية لمطابقة الهوية */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-10 left-10 w-64 h-64 border border-lime-100 dark:border-lime-950/10 rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 border border-lime-100 dark:border-lime-950/10 rounded-full"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 text-right" dir="rtl">
                    {/* معلومات الموقع والشعار */}
                    <div className="space-y-5">
                        <div className="flex items-center justify-start">
                            <Image
                                loading="lazy"
                                quality={95}
                                width="110"
                                height="32"
                                src="/logo.png"
                                alt="شعار موعظة"
                                className="transition-transform duration-300 hover:scale-102"
                            />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                            منصة إسلامية متكاملة تقدم القرآن الكريم وتفسيره، الأحاديث النبوية، الأذكار والأدعية، وأوقات الصلاة، وكل ما يحتاجه المسلم في حياته اليومية بأسلوب حديث ومبسط.
                        </p>
                    </div>

                    {/* الروابط الرئيسية */}
                    <div>
                        <h3 className="text-sm font-black text-gray-950 dark:text-white mb-6 uppercase tracking-wider">
                            الروابط الرئيسية
                        </h3>
                        <ul className="space-y-3.5">
                            {links1.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-lime-400 transition-all duration-200 transform hover:-translate-x-1.5 inline-block"
                                    >
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* المحتوى التعليمي */}
                    <div>
                        <h3 className="text-sm font-black text-gray-950 dark:text-white mb-6 uppercase tracking-wider">
                            المحتوى التعليمي
                        </h3>
                        <ul className="space-y-3.5">
                            {links2.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-lime-400 transition-all duration-200 transform hover:-translate-x-1.5 inline-block"
                                    >
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* معلومات المطور بطابع بطاقة بسيط وجميل */}
                    <div>
                        <h3 className="text-sm font-black text-gray-950 dark:text-white mb-6 uppercase tracking-wider">
                            تطوير وبرمجة
                        </h3>
                        <div className="bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl p-5 border border-gray-100 dark:border-gray-800/80 transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                                {/* الصورة الشخصية للمطور */}
                                <div className="relative w-20 h-20 mb-3.5">
                                    <Image
                                        src="/images/moustafa.jpg"
                                        alt="مطور الموقع"
                                        fill
                                        className="rounded-full object-cover border-2 border-primary/80 shadow-sm"
                                    />
                                </div>

                                {/* معلومات المبرمج */}
                                <h4 className="text-base font-black text-gray-900 dark:text-white mb-0.5">
                                    مصطفى أحمد
                                </h4>
                                <p className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-4">
                                    مبرمج ويب | Laravel & React
                                </p>

                                {/* قنوات التواصل الاجتماعي */}
                                <div className="flex justify-center gap-2">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="w-8.5 h-8.5 rounded-xl bg-white dark:bg-gray-850 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white border border-gray-100 dark:border-gray-800/60 transition-all duration-200"
                                        >
                                            <FontAwesomeIcon icon={social.icon} className="text-sm" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* حقوق النشر والتذييل */}
                <div className="border-t border-gray-100 dark:border-gray-900 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center gap-4">
                        <p className="text-xs font-bold text-gray-400 dark:text-gray-500">
                            جميع الحقوق محفوظة © {new Date().getFullYear()}
                            <span className="text-primary font-black mx-1">موقع موعظة</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
