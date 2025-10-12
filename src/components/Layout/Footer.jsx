"use client";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faEnvelope, faPhone, faMapMarkerAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faTwitter, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { links1, links2, links3 } from "@/data/links";
import { useState } from "react";

function Footer() {
    const [email, setEmail] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // هنا يمكنك إضافة منطق إرسال البريد الإلكتروني
    //     alert(`شكراً لاشتراكك! ستم إرسال النشرة البريدية إلى: ${email}`);
    //     setEmail("");
    // };

    const socialLinks = [
        { icon: faFacebook, href: "https://www.facebook.com/profile.php?id=100074054749083", label: "فيسبوك" },
        { icon: faGithub, href: "https://github.com/Mostafa7Ahmad/", label: "جيت هب" },
        // { icon: faTwitter, href: "#", label: "تويتر" },
        // { icon: faInstagram, href: "#", label: "انستغرام" },
        { icon: faYoutube, href: "#", label: "يوتيوب" }
    ];

    const contactInfo = [
        { icon: faEnvelope, text: "contact@mawdha.com" },
        { icon: faPhone, text: "+966 50 123 4567" },
        { icon: faMapMarkerAlt, text: "المملكة العربية السعودية" }
    ];

    return (
        <footer className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16 pb-8 overflow-hidden">
            {/* زخارف إسلامية في الخلفية */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 border-4 border-emerald-200 dark:border-emerald-900 rounded-full opacity-20 dark:opacity-10"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 border-4 border-emerald-200 dark:border-emerald-900 rounded-full opacity-20 dark:opacity-10"></div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-emerald-200 dark:border-emerald-900 transform rotate-45 opacity-20 dark:opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* معلومات الموقع */}
                    <div className="transform transition-transform duration-300 hover:-translate-y-2">
                        <div className="flex items-center mb-6">
                            <Image
                                loading="lazy"
                                quality={90}
                                width="60"
                                height="60"
                                src="/logo.png"
                                alt="موعظة"
                                className="mr-3"
                            />
                            {/* <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">موعظة</h3> */}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                            موقع إسلامي شامل يقدم القرآن الكريم وتفسيره، الأحاديث النبوية، الأذكار والأدعية، وأوقات الصلاة، وكل ما يحتاجه المسلم في حياته اليومية.
                        </p>

                        {/* النشرة البريدية */}
                        {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
                            <h4 className="font-bold text-gray-800 dark:text-white mb-3">النشرة البريدية</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">اشترك للحصول على أحدث المحتويات</p>
                            <form onSubmit={handleSubmit} className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="بريدك الإلكتروني"
                                    className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-300"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </form>
                        </div> */}
                    </div>

                    {/* الروابط الأولى */}
                    <div className="transform transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b-2 border-emerald-600 dark:border-emerald-500 inline-block">
                            الروابط الرئيسية
                        </h3>
                        <ul className="space-y-3">
                            {links1.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 group"
                                    >
                                        <FontAwesomeIcon
                                            icon={faAngleDoubleLeft}
                                            className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-emerald-600 dark:text-emerald-500"
                                        />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* الروابط الثانية */}
                    <div className="transform transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b-2 border-emerald-600 dark:border-emerald-500 inline-block">
                            المحتوى التعليمي
                        </h3>
                        <ul className="space-y-3">
                            {links2.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 group"
                                    >
                                        <FontAwesomeIcon
                                            icon={faAngleDoubleLeft}
                                            className="ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-emerald-600 dark:text-emerald-500"
                                        />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* معلومات المطور */}
                    <div className="transform transition-transform duration-300 hover:-translate-y-2">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6 pb-2 border-b-2 border-emerald-600 dark:border-emerald-500 inline-block">
                            تطوير وبرمجة
                        </h3>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                            <div className="flex flex-col items-center text-center">
                                {/* الصورة الشخصية */}
                                <div className="relative w-28 h-28 mb-4">
                                    <Image
                                        src="/images/moustafa.jpg" // غيّر المسار حسب مكان الصورة
                                        alt="مطور الموقع"
                                        fill
                                        className="rounded-full object-cover border-4 border-emerald-500 shadow-md"
                                    />
                                </div>

                                {/* الاسم والعنوان */}
                                <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                                    مصطفى أحمد
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    مبرمج ويب | Laravel & React
                                </p>

                                {/* أزرار السوشيال ميديا */}
                                <div className="flex justify-center gap-3 mt-2">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.label}
                                            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-emerald-600 hover:text-white transition-colors duration-300"
                                        >
                                            <FontAwesomeIcon icon={social.icon} size="lg" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* حقوق النشر */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-600 dark:text-gray-400 text-sm pb-4 md:mb-0">
                            جميع الحقوق محفوظة © {new Date().getFullYear()}
                            <span className="text-emerald-600 dark:text-emerald-500 font-bold mx-1"> لموقع موعظة  </span>
                        </p>
                        {/* <div className="flex space-x-4 rtl:space-x-reverse">
                            <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors duration-300">
                                سياسة الخصوصية
                            </Link>
                            <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 text-sm transition-colors duration-300">
                                الشروط والأحكام
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
