import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";

export const useLoading = () => {
    const { ref, inView } = useInView();
    const [ isVisible, setIsVisible ] = useState<boolean>(false);

    useEffect(() => {
        if (inView) setIsVisible(true);
    }, [ inView ]);

    return { ref, isVisible }
}