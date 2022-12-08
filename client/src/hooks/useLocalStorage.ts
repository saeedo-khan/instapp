import { useEffect, useState } from "react";

const getLocalStorageValue = (key: string, defaultValue:string) => {
    if(typeof window !== "undefined"){
        const saved = localStorage.getItem(key)
        const init = saved !== null ? JSON.parse(saved) : defaultValue;
        return init ? init : defaultValue;
    }
}



export const useLocalStorage = (key: string, defaultValue: string) => {
    const [value, setValue] = useState(() => {
        return getLocalStorageValue(key, defaultValue);
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
