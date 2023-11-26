import { vars } from "../vars";
import { useEffect, useState } from "react";

export const useModal = (isVisible: boolean) => {
    const { body, container } = vars;
    const [ firstRender, setFirstRender ] = useState<boolean>(true);
    
    const fnOpen = () => {
        if (body && container) {
            const paddingRight: string = window.innerWidth - body.offsetWidth + 'px';
            const scrollY: string = window.scrollY + 'px';
    
            if (scrollY != '0px') body.style.top = -window.scrollY + 'px';
            body.style.position = 'fixed';
            if (paddingRight != '0px') container.style.paddingRight = paddingRight;
        }
    }

    const fnClose = () => {
        if (body && container) {
            body.style.position = '';
            if (container.style.paddingRight) container.style.paddingRight = '';
            if (body.style.top != '' && body.style.top != '0px') window.scrollTo(0, parseInt(body.style.top) * -1);
            body.style.top = '';
        }
    }

    useEffect(() => {
        if (!firstRender) {
            if (body && container) {
                if (isVisible) fnOpen();
                else fnClose();
            }
        }
        else if (isVisible) fnOpen();
        setFirstRender(false);
    }, [ isVisible ]);
}