"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import { API } from '@/config/constants';
const ramadanContext = createContext(null);

export const RamadanProvider = ({ children }) => {
    const [ramadan, setRamadan] = useState(false);
    const { data, error, isLoading } = useSWR(API.aladhan("currentIslamicMonth"));
    useEffect(() => {
        setRamadan(data?.data == 9)
    }, [data])
    return (
        <ramadanContext.Provider value={{ ramadan, isLoading }}>
            {children}
        </ramadanContext.Provider>
    );
};

export const useRamadan = () => useContext(ramadanContext);