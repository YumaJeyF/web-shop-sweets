import { useState, useEffect } from "react"

export const useChangeSizeWindow = () => {
    const [ size, setSize ] = useState<number>(window.innerWidth);

    const resize = () => setSize(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', resize);

        return () => window.removeEventListener('resize', resize);
    }, []);

    return size;
}