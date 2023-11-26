import React, { Dispatch, FC, SetStateAction } from "react";
import styles from '../../Header.module.scss';
import cn from 'classnames';

import { useAccordion } from "../../../../hooks/useAccordion";
import { useChangeSizeWindow } from "../../../../hooks/useChangeSizeWindow";
import { removeTheFixation } from "../../../../functions/removeTheFixation";

const DropdownBlock: FC<{
    nowIdOpen: number,
    setNowIdOpen: Dispatch<SetStateAction<number>>,
    currentId: number,
    Links?: FC,
    name: string,
}> = ({
    nowIdOpen,
    setNowIdOpen,
    currentId,
    Links,
    name,
}) => {
    const size = useChangeSizeWindow();
    const { id, triggerAccordeon } = useAccordion('header', currentId);

    const workMenu = (): void  => {
        if (size > 1050) setNowIdOpen((prev: number) => prev === currentId ? 0 : currentId);
        else triggerAccordeon();
    }

    return (
        <div
            className={cn(styles.burger_pad_per, styles.dropdown_main, {
                [styles.active]: size > 1050 ? nowIdOpen === currentId : currentId === id,
                'active': size > 1050 ? nowIdOpen === currentId : currentId === id
            })}
            id="dp_bl"
            onClick={workMenu}>
            <div className={styles.block}>
                <p className={cn('textmini', styles.text)}>{name}</p>
            
                <img src="../../../../img/arrow-down.svg" alt="arrow down" className={cn(styles.arrow, {
                    [styles.arrow_open]: id === currentId
                })}/>
            </div>
        
            <ul onClick={removeTheFixation} className={cn(styles.dropdown,
                { [styles.dropdown_open]: size > 1050 ? nowIdOpen === currentId : currentId === id })} data-accordion={`header-${currentId}`} id="header-links">
                { Links && <Links/> }
            </ul>
        </div>
    )
}

export default React.memo(DropdownBlock);