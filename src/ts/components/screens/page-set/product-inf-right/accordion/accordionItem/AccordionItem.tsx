import React, { FC } from 'react';
import styles from '../Accordion.module.scss';
import cn from 'classnames';

const AccordionItem: FC<{ 
    idOpen: number | null,
    openContent: (e: React.MouseEvent<HTMLButtonElement>) => void,
    content: Element | undefined,
    component: React.ReactElement,
    nameButton: string,
    id: string
 }> = ({ 
    idOpen,
    openContent,
    content,
    component,
    nameButton,
    id
 }) => {
    const currentId: number = Number(id);

    return (
        <div className={styles.inf}>
        <button className={cn(styles.textmini, styles.btn)} data-number={id} onClick={openContent}>
            {nameButton}
            <img src="../../../../../../img/arrow-down.svg" className={cn(styles.arrow, { [styles.arrow_rotate]: idOpen == currentId})}/>
        </button>
        <div className={cn(styles.content, {
            [styles.content_open]: idOpen == currentId
        })} style={{ maxHeight: idOpen == currentId ? content?.scrollHeight + 'px' : 0 }}><>{component}</></div>
        </div>
    )
}

export default React.memo(AccordionItem);