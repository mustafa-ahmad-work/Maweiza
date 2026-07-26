"use client";

import { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import Cookie from "cookie-universal";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/config/constants";

function Buttons() {
    const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.THEME, "light");
    const [showBtn, setShowBtn] = useState(false);
    const cookies = Cookie();

    useEffect(() => {
        const savedTheme = theme === "dark" ? "dark" : (cookies.get("theme") || "light");
        if (savedTheme === "dark") enableDarkMode();
        else enableLightMode();

        const handleScroll = () => {
            setShowBtn(window.scrollY >= 500);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const enableDarkMode = useCallback(() => {
        document.documentElement.setAttribute("data-theme", "dark");
        setTheme("dark");
        cookies.set("theme", "dark");
    }, [setTheme, cookies]);

    const enableLightMode = useCallback(() => {
        document.documentElement.setAttribute("data-theme", "light");
        setTheme("light");
        cookies.set("theme", "light");
    }, [setTheme, cookies]);

    const toggleTheme = useCallback(() => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        isDark ? enableLightMode() : enableDarkMode();
    }, [enableDarkMode, enableLightMode]);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const btnVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { opacity: 1, y: 0, scale: 1 },
    };

    return (
        <>
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
                        className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-md hover:shadow-lg border border-gray-150/60 dark:border-zinc-700/80 text-primary hover:text-primary-alt hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={faAngleUp} className="text-xl" />
                    </motion.button>
                )}
            </AnimatePresence>

            <motion.button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "تبديل للوضع الفاتح" : "تبديل للوضع الداكن"}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="fixed bottom-6 left-6 z-50 w-12 h-12 flex items-center justify-center rounded-xl bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-md hover:shadow-lg border border-gray-150/60 dark:border-zinc-700/80 focus:outline-none transition-all duration-200"
            >
                {theme === "dark" ? (
                    <FontAwesomeIcon icon={faSun} className="text-lg text-amber-500 animate-[spin_8s_linear_infinite]" />
                ) : (
                    <FontAwesomeIcon icon={faMoon} className="text-lg text-primary" />
                )}
            </motion.button>
        </>
    );
}

export default Buttons;
