import { useEffect } from "react";

export const useClickOutside = (
    oneParams: string,
    activeClass: string,
    callback: () => void,
    secondParams: string = 'empty',
    thirdParams: string = 'empty',
    fourParams: string = 'empty'
    ) => {

    const clickOutside = (e: Event):void => {
        const eTarget = e.target as HTMLElement;
        const domElements: NodeListOf<Element> | null = document.querySelectorAll(oneParams);

        if (domElements && domElements.length > 0) {
            domElements.forEach((domElement: Element) => {
                if (domElement.classList.contains(activeClass) && eTarget && !eTarget.closest(oneParams) && !eTarget.closest(secondParams) && !eTarget.closest(thirdParams) && !eTarget.closest(fourParams)) callback();
            });
        }
    }

    const closeOnEsc = (e: KeyboardEvent) => {
        if (e.key == 'Escape') {
            const domElements: NodeListOf<Element> | null = document.querySelectorAll(oneParams);

            if (domElements && domElements.length > 0) {
                domElements.forEach((domElement: Element) => {
                    if (domElement.classList.contains(activeClass)) callback();
                });
            }
        }
    }

    useEffect(() => {
        window.addEventListener('click', clickOutside);
        window.addEventListener('keydown', closeOnEsc);

        return () => {
            window.removeEventListener('click', clickOutside);
            window.removeEventListener('keydown', closeOnEsc);
        }
    }, []);

}