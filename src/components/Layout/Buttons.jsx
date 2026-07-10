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
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <>
            {/* زر التمرير للأعلى - بنمط زجاجي بلوري مينيمال فاخر */}
            <AnimatePresence>
                {showBtn && (
                    <motion.button
                        onClick={scrollToTop}
                        aria-label="العودة للأعلى"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={btnVariants}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md hover:shadow-lg border border-gray-150/60 dark:border-gray-800 text-primary hover:text-primary-alt hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faAngleUp} className="text-xl" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* زر تبديل الثيم - بنمط زجاجي بلوري مطابق للناف بار */}
            <motion.button
                onClick={toggleTheme}
                aria-label={dark ? "تبديل للوضع الفاتح" : "تبديل للوضع الداكن"}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="fixed bottom-6 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md hover:shadow-lg border border-gray-150/60 dark:border-gray-800 focus:outline-none transition-all duration-200"
            >
                {dark ? (
                    <FontAwesomeIcon icon={faSun} className="text-lg text-amber-500 animate-[spin_8s_linear_infinite]" />
                ) : (
                    <FontAwesomeIcon icon={faMoon} className="text-lg text-primary" />
                )}
            </motion.button>
        </>
    );
}

export default Buttons;
