"use client";

import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const item = localStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item));
            }
        } catch (e) {
            console.warn(`useLocalStorage: error reading "${key}"`, e);
        }
        setIsHydrated(true);
    }, [key]);

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (e) {
            console.warn(`useLocalStorage: error setting "${key}"`, e);
        }
    };

    const removeValue = () => {
        try {
            localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (e) {
            console.warn(`useLocalStorage: error removing "${key}"`, e);
        }
    };

    return [storedValue, setValue, removeValue, isHydrated];
}
