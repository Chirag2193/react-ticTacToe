
import { useState, useEffect, useRef } from 'react';

export default function useLocalStorage(key, defaultValue = '', { serialize = JSON.stringify, deserialize = JSON.parse } = {}) {
    const [state, setState] = useState(() => {
        const localStorageValue = window.localStorage.getItem(key);
        if(localStorageValue) {
            return deserialize(localStorageValue);
        }else if(defaultValue && typeof defaultValue === 'function'){
            return defaultValue();
        }else {
            return defaultValue
        }
    });

    const prevKey = useRef(key);

    useEffect(() => {
        if(prevKey.current !== key) {
            window.localStorage.removeItem(prevKey.current);
            prevKey.current = key;
        }
        window.localStorage.setItem(key, serialize(state));
    }, [key, state, serialize])
    
    return [state, setState];
}