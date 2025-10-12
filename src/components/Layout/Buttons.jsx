"use client";

import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Cookie from "cookie-universal";
import { motion, AnimatePresence } from "framer-motion";

function Buttons() {
    const [dark, setDark] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const cookies = Cookie();

    // تهيئة الثيم عند تحميل المكون
    useEffect(() => {
        const savedTheme = localStorage.theme || cookies.get("theme");
        if (savedTheme === "dark") enableDarkMode();
        else enableLightMode();

        const handleScroll = () => {
            setShowBtn(window.scrollY >= 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const enableDarkMode = useCallback(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.theme = "dark";
        cookies.set("theme", "dark");
        setDark(true);
    }, [cookies]);

    const enableLightMode = useCallback(() => {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.theme = "light";
        cookies.set("theme", "light");
        setDark(false);
    }, [cookies]);

    const toggleTheme = useCallback(() => {
        dark ? enableLightMode() : enableDarkMode();
    }, [dark, enableDarkMode, enableLightMode]);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const btnVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <>
            {/* زر التمرير للأعلى */}
            <AnimatePresence>
                {showBtn && (
                    <motion.button
                        onClick={scrollToTop}
                        aria-label="العودة للأعلى"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={btnVariants}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`
                            fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center
                            rounded-full shadow-xl hover:shadow-2xl focus:outline-none focus:ring-2
                            focus:ring-offset-2 focus:ring-opacity-60
                            ${dark
                                ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white hover:from-gray-800 hover:to-gray-600 focus:ring-emerald-400"
                                : "bg-gradient-to-tr from-emerald-400 via-emerald-300 to-emerald-200 text-gray-900 hover:from-emerald-300 hover:to-emerald-100 focus:ring-emerald-500"
                            }
                        `}
                    >
                        <FontAwesomeIcon icon={faAngleUp} className="text-2xl" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* زر تبديل الثيم */}
            <motion.button
                onClick={toggleTheme}
                aria-label={dark ? "تبديل للوضع الفاتح" : "تبديل للوضع الداكن"}
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.95, rotate: -5 }}
                className={`
                    fixed bottom-6 left-6 z-50 w-14 h-14 flex items-center justify-center
                    rounded-full shadow-xl hover:shadow-2xl focus:outline-none transition-colors duration-300
                    ${dark
                        ? "bg-gray-900 text-emerald-300 hover:bg-gray-800 focus:ring-emerald-400"
                        : "bg-emerald-400 text-gray-900 hover:bg-emerald-300 focus:ring-emerald-500"
                    }
                `}
            >
                {dark ? (
                    <FontAwesomeIcon icon={faSun} className="text-2xl" />
                ) : (
                    <FontAwesomeIcon icon={faMoon} className="text-2xl" />
                )}
            </motion.button>
        </>
    );
}

export default Buttons;
