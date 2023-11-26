import { useState } from "react";  

export const useAccordion = (nameDataAtr: string, elementId: number) => {
    const [ id, setId ] = useState<number>(0);

    const triggerAccordeon  = (): void => {
        setId((prev: number) => prev === elementId ? 0 : elementId);

        const content: HTMLElement | null = document.querySelector(`[data-accordion='${nameDataAtr}-${elementId}']`);

        if (content) {
            if (!content.style.maxHeight) content.style.maxHeight = content.scrollHeight + 'px';
            else content.style.maxHeight = '';
        }
    }

    return { id, triggerAccordeon }
}