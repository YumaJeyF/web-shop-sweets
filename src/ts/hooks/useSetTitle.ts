import { useEffect } from "react";

export const useSetTitle = (title: string | undefined) => {
    useEffect(() => {
        if (title) document.title = title;
    }, [ title ]);
}