import { useState, useEffect } from 'react';

const getSessionValue = (key:string, defaultValue:string) => {
    if(typeof window !== 'undefined') {
        const saved = sessionStorage.getItem(key);
        const initial = saved !== null ? JSON.parse(saved) : defaultValue;
        return initial? initial : defaultValue;
    }
}


export const useSessionStorage = (key:string, defaultValue:string) => {
    const [value, setValue] = useState(() => {
        return getSessionValue(key, defaultValue);
    })

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue]
};