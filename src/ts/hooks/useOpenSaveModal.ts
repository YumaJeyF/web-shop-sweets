import { Dispatch, SetStateAction, useEffect } from "react";

export const useOpenSaveModal = (nameItemStorage: string, setIsVisible: Dispatch<SetStateAction<boolean>>) => {

    useEffect(() => {
        if (sessionStorage.getItem(nameItemStorage)) {
            const windowScroll: number = JSON.parse(String(sessionStorage.getItem(nameItemStorage)));

            setIsVisible(true);
            window.scrollTo(0, windowScroll);
        }
    }, []);

    const openModal = (): void => {
        setIsVisible(true);

        sessionStorage.setItem(nameItemStorage, JSON.stringify(window.scrollY));
    }

    const closeModal = (): void => {
        setIsVisible(false);

        if (sessionStorage.getItem(nameItemStorage)) sessionStorage.removeItem(nameItemStorage);
    }

    return { openModal, closeModal };
}